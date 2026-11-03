/**
 * Renders a social card for every article (dist/og/writing/<lang>/<slug>.png) and every project
 * case study without images of its own (dist/og/work/<lang>/<slug>.png), so links shared on LinkedIn or anywhere else show
 * their own title. Generated on every build, like the CV, so a card can never go stale.
 * Run after `npm run build`.
 */
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { constellation, esc, fontFaces, openRenderer, root } from './og-shared.mjs';
import { readFrontmatter } from '../src/lib/frontmatter.ts';
import { articleCardPath, PROJECT_CARDS_DATA, projectCardPath } from '../src/lib/cards.ts';

const labels = {
  en: { kicker: 'Article', caseStudy: 'Case study', date: 'en-GB' },
  es: { kicker: 'Artículo', caseStudy: 'Caso de estudio', date: 'es-ES' },
};

/** Stable seed per slug, so every article gets its own constellation. */
const seedFor = (slug) => [...slug].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 2147483646, 7) + 1;

function card({ lang, title, date }, slug) {
  const size = title.length > 70 ? 62 : title.length > 48 ? 72 : 84;
  const when = new Intl.DateTimeFormat(labels[lang].date, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(date),
  );
  return /* html */ `<!doctype html>
<html lang="${lang}"><head><meta charset="utf-8" /><style>
  ${fontFaces}
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: #08090b; color: #eceae4; font-family: Geist; position: relative; overflow: hidden; }
  .glow { position: absolute; right: -260px; top: -200px; width: 760px; height: 760px; border-radius: 50%;
          background: radial-gradient(circle, rgb(200 255 46 / .2), transparent 62%); }
  svg { position: absolute; right: -90px; top: -110px; opacity: .9; }
  .wrap { position: absolute; inset: 64px 72px; display: flex; flex-direction: column; }
  .kicker { font-family: GeistMono; font-size: 20px; letter-spacing: .12em; text-transform: uppercase; color: #c8ff2e; display: flex; align-items: center; gap: 16px; }
  .kicker::before { content: ''; width: 44px; height: 1px; background: currentColor; }
  h1 { margin-top: auto; max-width: 980px; font-weight: 500; font-size: ${size}px; line-height: 1.02; letter-spacing: -.035em; text-wrap: balance; }
  .foot { margin-top: 48px; padding-top: 28px; border-top: 1px solid rgb(255 255 255 / .12); display: flex; justify-content: space-between; align-items: baseline; font-family: GeistMono; font-size: 21px; color: #a8a6a0; }
  .foot b { font-family: Geist; font-weight: 500; color: #eceae4; font-size: 26px; margin-right: 18px; }
</style></head><body>
  <div class="glow"></div>
  <svg width="520" height="520" viewBox="-1 -1 2 2">${constellation(seedFor(slug), 220, seedFor(slug))}</svg>
  <div class="wrap">
    <p class="kicker">${labels[lang].kicker}</p>
    <h1>${esc(title)}</h1>
    <div class="foot"><span><b>Jorge Hernández</b>${esc(when)}</span><span>r3b0rnjhs.github.io/writing</span></div>
  </div>
</body></html>`;
}

/** Project card for case studies without images: name, one-line pitch and a constellation in the project's colour. */
function projectCard({ lang, slug, title, kind, tagline, hue }) {
  const accent = `hsl(${hue} 90% 62%)`;
  return /* html */ `<!doctype html>
<html lang="${lang}"><head><meta charset="utf-8" /><style>
  ${fontFaces}
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: #08090b; color: #eceae4; font-family: Geist; position: relative; overflow: hidden; }
  .glow { position: absolute; right: -220px; top: -160px; width: 820px; height: 820px; border-radius: 50%;
          background: radial-gradient(circle, hsl(${hue} 90% 55% / .22), transparent 62%); }
  .field { position: absolute; right: -60px; top: 35px; }
  .wrap { position: absolute; inset: 64px 72px; display: flex; flex-direction: column; width: 660px; }
  .kicker { font-family: GeistMono; font-size: 19px; letter-spacing: .1em; text-transform: uppercase; color: ${accent}; display: flex; align-items: center; gap: 16px; }
  .kicker::before { content: ''; width: 44px; height: 1px; background: currentColor; flex-shrink: 0; }
  h1 { margin-top: auto; font-weight: 500; font-size: ${title.length > 18 ? 72 : 88}px; line-height: 1; letter-spacing: -.04em; }
  p.tag { margin-top: 22px; font-size: 24px; line-height: 1.35; color: #c4c2bb; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
  .foot { margin-top: 40px; padding-top: 26px; border-top: 1px solid rgb(255 255 255 / .12); display: flex; justify-content: space-between; align-items: baseline;
          width: 1056px; font-family: GeistMono; font-size: 21px; color: #a8a6a0; position: relative; z-index: 1; }
  .foot b { font-family: Geist; font-weight: 500; color: #eceae4; font-size: 26px; }
</style></head><body>
  <div class="glow"></div>
  <svg class="field" width="560" height="560" viewBox="-1 -1 2 2">${constellation(seedFor(slug), 240, seedFor(slug), accent)}</svg>
  <div class="wrap">
    <p class="kicker">${esc(labels[lang].caseStudy)} · ${esc(kind)}</p>
    <h1>${esc(title)}</h1>
    <p class="tag">${esc(tagline)}</p>
    <div class="foot"><b>Jorge Hernández</b><span>r3b0rnjhs.github.io/work</span></div>
  </div>
</body></html>`;
}

const renderer = await openRenderer();
for (const lang of Object.keys(labels)) {
  const dir = join(root, 'src/content/writing', lang);
  for (const file of (await readdir(dir)).filter((f) => f.endsWith('.md')).sort()) {
    const meta = readFrontmatter(await readFile(join(dir, file), 'utf8'));
    if (meta.draft === 'true') continue;
    const slug = file.replace(/\.md$/, '');
    const out = join(root, 'dist', articleCardPath(lang, slug));
    await renderer.render(card({ lang, title: String(meta.title), date: String(meta.date) }, slug), out);
    console.log(`✓ dist${articleCardPath(lang, slug)}`);
  }
}
const projects = JSON.parse(await readFile(join(root, 'dist', PROJECT_CARDS_DATA), 'utf8'));
for (const project of projects) {
  const path = projectCardPath(project.lang, project.slug);
  await renderer.render(projectCard(project), join(root, 'dist', path));
  console.log(`✓ dist${path}`);
}
await renderer.close();

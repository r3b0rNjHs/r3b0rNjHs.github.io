/**
 * Renders a social card for every article (dist/og/writing/<lang>/<slug>.png), so links shared on
 * LinkedIn or anywhere else show the article's own title. Generated from the Markdown on every
 * build, like the CV, so a card can never go stale. Run after `npm run build`.
 */
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { constellation, esc, fontFaces, openRenderer, root } from './og-shared.mjs';
import { articleCardPath, readFrontmatter } from '../src/lib/frontmatter.ts';

const labels = {
  en: { kicker: 'Article', date: 'en-GB' },
  es: { kicker: 'Artículo', date: 'es-ES' },
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
await renderer.close();

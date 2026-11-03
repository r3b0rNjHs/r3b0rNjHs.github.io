/**
 * Renders the social preview card (public/og.png, 1200×630) from an HTML template
 * using the same fonts and tokens as the site. Run with `npm run og`.
 * Set PW_CHROMIUM_PATH to use a pre-installed Chromium instead of Playwright's download.
 */
import { chromium } from '@playwright/test';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { resolve, join } from 'node:path';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';

const root = resolve(fileURLToPath(import.meta.url), '../..');
const font = (pkg, file) => pathToFileURL(resolve(root, 'node_modules', pkg, 'files', file)).href;

const html = /* html */ `<!doctype html>
<html><head><meta charset="utf-8" /><style>
  @font-face { font-family: Geist; src: url(${font('@fontsource-variable/geist', 'geist-latin-wght-normal.woff2')}); font-weight: 100 900; }
  @font-face { font-family: GeistMono; src: url(${font('@fontsource-variable/geist-mono', 'geist-mono-latin-wght-normal.woff2')}); font-weight: 100 900; }
  @font-face { font-family: Serif; font-style: italic; src: url(${font('@fontsource/instrument-serif', 'instrument-serif-latin-400-italic.woff2')}); }
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: #08090b; color: #eceae4; font-family: Geist; position: relative; overflow: hidden; }
  .glow { position: absolute; right: -160px; top: -40px; width: 760px; height: 760px; border-radius: 50%;
          background: radial-gradient(circle, rgb(200 255 46 / .22), transparent 62%); }
  svg { position: absolute; right: 40px; top: 35px; }
  .wrap { position: absolute; inset: 64px 72px; display: flex; flex-direction: column; }
  .kicker { font-family: GeistMono; font-size: 20px; letter-spacing: .12em; text-transform: uppercase; color: #c8ff2e; display: flex; align-items: center; gap: 16px; }
  .kicker::before { content: ''; width: 44px; height: 1px; background: currentColor; }
  h1 { margin-top: auto; font-weight: 450; font-size: 104px; line-height: .95; letter-spacing: -.045em; }
  h1 em { font-family: Serif; font-weight: 400; color: #c8ff2e; letter-spacing: -.01em; }
  h1 span { color: #8b8a85; }
  .foot { margin-top: 44px; display: flex; justify-content: space-between; font-family: GeistMono; font-size: 22px; color: #c4c2bb; }
  .foot b { font-family: Geist; font-weight: 500; color: #eceae4; font-size: 26px; }
</style></head><body>
  <div class="glow"></div>
  <svg width="560" height="560" viewBox="-1 -1 2 2">${nodes()}</svg>
  <div class="wrap">
    <p class="kicker">AI Engineer &amp; Systems Architect</p>
    <h1>I design <em>AI‑native</em> systems<br /><span>and ship them.</span></h1>
    <div class="foot"><b>Jorge Hernández</b><span>r3b0rnjhs.github.io</span></div>
  </div>
</body></html>`;

/** A deterministic constellation echoing the hero's neural field. */
function nodes() {
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  const pts = Array.from({ length: 260 }, (_, i) => {
    const y = 1 - (i / 259) * 2;
    const r = Math.sqrt(1 - y * y) * 0.92;
    const t = i * 2.39996;
    return [Math.cos(t) * r, y * 0.92, Math.sin(t) * r];
  });
  const lines = [];
  for (let i = 0; i < pts.length; i += 3) {
    const [ax, ay, az] = pts[i];
    if (az < 0) continue;
    const j = Math.min(pts.length - 1, i + 1 + Math.floor(rnd() * 20));
    const [bx, by] = pts[j];
    lines.push(`<line x1="${ax}" y1="${ay}" x2="${bx}" y2="${by}" stroke="#eceae4" stroke-opacity=".12" stroke-width=".004"/>`);
  }
  const dots = pts.map(([x, y, z]) => {
    const accent = rnd() > 0.9;
    const o = z > 0 ? 0.85 : 0.25;
    return `<circle cx="${x}" cy="${y}" r="${accent ? 0.012 : 0.006}" fill="${accent ? '#c8ff2e' : '#eceae4'}" opacity="${o}"/>`;
  });
  return lines.join('') + dots.join('');
}

const browser = await chromium.launch(process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
// Load from a file:// URL (not about:blank) so the local @font-face sources are allowed.
const dir = await mkdtemp(join(tmpdir(), 'og-'));
const file = join(dir, 'og.html');
await writeFile(file, html);
await page.goto(pathToFileURL(file).href, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: resolve(root, 'public/og.png') });
await browser.close();
await rm(dir, { recursive: true, force: true });
console.log('✓ public/og.png');

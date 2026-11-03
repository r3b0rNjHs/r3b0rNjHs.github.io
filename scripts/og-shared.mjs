/**
 * Shared pieces for every 1200×630 social card: the site fonts, a deterministic constellation
 * that echoes the hero, and a renderer that screenshots an HTML template with Chromium.
 */
import { chromium } from '@playwright/test';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const root = resolve(fileURLToPath(import.meta.url), '../..');
const font = (pkg, file) => pathToFileURL(resolve(root, 'node_modules', pkg, 'files', file)).href;

export const fontFaces = /* css */ `
  @font-face { font-family: Geist; src: url(${font('@fontsource-variable/geist', 'geist-latin-wght-normal.woff2')}); font-weight: 100 900; }
  @font-face { font-family: Geist; src: url(${font('@fontsource-variable/geist', 'geist-latin-ext-wght-normal.woff2')}); font-weight: 100 900; unicode-range: U+0100-024F; }
  @font-face { font-family: GeistMono; src: url(${font('@fontsource-variable/geist-mono', 'geist-mono-latin-wght-normal.woff2')}); font-weight: 100 900; }
  @font-face { font-family: Serif; font-style: italic; src: url(${font('@fontsource/instrument-serif', 'instrument-serif-latin-400-italic.woff2')}); }
`;

/** Escape text for safe interpolation into the HTML templates. */
export const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

/**
 * SVG constellation (viewBox -1 -1 2 2). The seed changes the accents and links and `spin` rotates the
 * sphere, so each card is unique. The defaults reproduce the site's main card.
 */
export function constellation(seed = 7, count = 260, spin = 0, accentColor = '#c8ff2e') {
  let s = seed;
  const rnd = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
  const pts = Array.from({ length: count }, (_, i) => {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y) * 0.92;
    const t = i * 2.39996 + spin;
    return [Math.cos(t) * r, y * 0.92, Math.sin(t) * r];
  });
  const lines = [];
  for (let i = 0; i < pts.length; i += 3) {
    const [ax, ay, az] = pts[i];
    if (az < 0) continue;
    const [bx, by] = pts[Math.min(pts.length - 1, i + 1 + Math.floor(rnd() * 20))];
    lines.push(`<line x1="${ax}" y1="${ay}" x2="${bx}" y2="${by}" stroke="#eceae4" stroke-opacity=".12" stroke-width=".004"/>`);
  }
  const dots = pts.map(([x, y, z]) => {
    const accent = rnd() > 0.9;
    return `<circle cx="${x}" cy="${y}" r="${accent ? 0.012 : 0.006}" fill="${accent ? accentColor : '#eceae4'}" opacity="${z > 0 ? 0.85 : 0.25}"/>`;
  });
  return lines.join('') + dots.join('');
}

/** Launch Chromium once for a batch of cards. Honors PW_CHROMIUM_PATH for pre-installed browsers. */
export async function openRenderer() {
  const browser = await chromium.launch(process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {});
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  const dir = await mkdtemp(join(tmpdir(), 'og-'));
  return {
    /** Render one HTML document to a PNG. Loaded from file:// so the local @font-face sources are allowed. */
    async render(html, outPath) {
      const file = join(dir, 'card.html');
      await writeFile(file, html);
      await page.goto(pathToFileURL(file).href, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      await mkdir(dirname(outPath), { recursive: true });
      await page.screenshot({ path: outPath });
    },
    async close() {
      await browser.close();
      await rm(dir, { recursive: true, force: true });
    },
  };
}

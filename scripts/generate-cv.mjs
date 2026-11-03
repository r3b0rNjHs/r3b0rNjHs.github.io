/**
 * Prints the built CV pages (/cv/ and /es/cv/) to A4 PDFs in dist/cv/, so the downloadable CV
 * is always generated from the same data as the site. Run after `npm run build`.
 * Set PW_CHROMIUM_PATH to use a pre-installed Chromium instead of Playwright's download.
 */
import { chromium } from '@playwright/test';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = resolve(fileURLToPath(import.meta.url), '../../dist');
const types = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.woff2': 'font/woff2',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
};

/** Minimal static server for dist/: enough for Chromium to render the CV with its CSS and fonts. */
const server = createServer(async (req, res) => {
  try {
    let path = normalize(decodeURIComponent(new URL(req.url ?? '/', 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
    let file = join(dist, path);
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((ok) => server.listen(0, ok));
const { port } = server.address();

const browser = await chromium.launch(process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {});
const page = await browser.newPage();
for (const [lang, route] of [
  ['en', '/cv/'],
  ['es', '/es/cv/'],
]) {
  await page.goto(`http://localhost:${port}${route}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const out = join(dist, 'cv', `jorge-hernandez-cv-${lang}.pdf`);
  await page.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true });
  console.log(`✓ ${out.replace(dist, 'dist')}`);
}
await browser.close();
server.close();

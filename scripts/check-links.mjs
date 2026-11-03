/**
 * Checks every internal link, image and #fragment in dist/ and fails if any of them is broken.
 * External links are checked separately on a schedule (.github/workflows/links.yml), so a slow
 * third-party site never blocks a deploy. Run after `npm run build` and `npm run cv`.
 */
import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { candidateFiles, extractIds, extractLinks } from '../src/lib/links.ts';

const dist = resolve(fileURLToPath(import.meta.url), '../../dist');

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((e) => (e.isDirectory() ? htmlFiles(join(dir, e.name)) : e.name.endsWith('.html') ? [join(dir, e.name)] : [])),
  );
  return files.flat();
}

const pages = new Map();
for (const file of await htmlFiles(dist)) {
  const rel = '/' + relative(dist, file).split(sep).join('/');
  const path = rel.endsWith('/index.html') ? rel.slice(0, -'index.html'.length) : rel;
  pages.set(path, { file, html: await readFile(file, 'utf8') });
}

const idCache = new Map();
const idsFor = (target) => {
  if (!idCache.has(target)) idCache.set(target, extractIds(pages.get(target)?.html ?? ''));
  return idCache.get(target);
};

const broken = [];
let checked = 0;
for (const [pagePath, { html }] of pages) {
  for (const link of extractLinks(html, pagePath)) {
    checked++;
    const file = candidateFiles(link.path).find((f) => existsSync(join(dist, f)));
    if (!file) {
      broken.push(`${pagePath} → ${link.raw} (no such file)`);
      continue;
    }
    if (link.hash && file.endsWith('.html')) {
      const target = file.endsWith('/index.html') ? file.slice(0, -'index.html'.length) : file;
      if (!idsFor(target).has(link.hash)) broken.push(`${pagePath} → ${link.raw} (no element with id "${link.hash}")`);
    }
  }
}

if (broken.length) {
  console.error(`✗ ${broken.length} broken link(s):\n  ${[...new Set(broken)].join('\n  ')}`);
  process.exit(1);
}
console.log(`✓ ${checked} internal links across ${pages.size} pages, all resolve`);

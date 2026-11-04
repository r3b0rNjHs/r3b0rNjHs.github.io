/**
 * Prints every unique external link in dist/ as Markdown, one per line with the pages it appears on,
 * for the weekly lychee check (.github/workflows/links.yml). Feeding lychee a plain list keeps it to
 * what it does best (checking URLs) and makes the report point at the page to fix.
 * Run after `npm run build`.
 */
import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { candidateFiles, extractAbsoluteLinks } from '../src/lib/links.ts';

const dist = resolve(fileURLToPath(import.meta.url), '../../dist');
const ownHost = 'r3b0rnjhs.github.io';

/**
 * External means another host, or a path on our own domain that this build doesn't serve
 * (other GitHub Pages projects, such as the Naruto Online Companion PWA, live under the same host).
 */
const isExternal = (url) =>
  url.host !== ownHost || !candidateFiles(decodeURIComponent(url.pathname)).some((f) => existsSync(join(dist, f)));

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((e) => (e.isDirectory() ? htmlFiles(join(dir, e.name)) : e.name.endsWith('.html') ? [join(dir, e.name)] : [])),
  );
  return files.flat();
}

const pagesByUrl = new Map();
for (const file of await htmlFiles(dist)) {
  const page =
    '/' +
    relative(dist, file)
      .split(sep)
      .join('/')
      .replace(/index\.html$/, '');
  for (const parsed of extractAbsoluteLinks(await readFile(file, 'utf8')).filter(isExternal)) {
    const url = parsed.toString();
    if (!pagesByUrl.has(url)) pagesByUrl.set(url, new Set());
    pagesByUrl.get(url).add(page);
  }
}

for (const [url, pages] of [...pagesByUrl].sort(([a], [b]) => a.localeCompare(b))) {
  const where = [...pages].sort();
  console.log(`- <${url}> (${where.slice(0, 3).join(', ')}${where.length > 3 ? `, +${where.length - 3} more` : ''})`);
}

/**
 * Pure helpers for the internal link checker (scripts/check-links.mjs).
 * No imports, so the checker can run this file directly with Node's built-in TypeScript support.
 */

export interface PageLink {
  /** Raw attribute value as written in the HTML. */
  raw: string;
  /** Pathname the link resolves to, e.g. "/es/work/pet-defense/". */
  path: string;
  /** Fragment without "#", or "" when there is none. */
  hash: string;
}

const SKIP = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

/** Every same-site link in a page: href, src and srcset values, resolved against the page's own path. */
export function extractLinks(html: string, pagePath: string): PageLink[] {
  const values: string[] = [];
  for (const m of html.matchAll(/\s(?:href|src)="([^"]*)"/g)) values.push(m[1]!);
  for (const m of html.matchAll(/\ssrcset="([^"]*)"/g)) {
    for (const candidate of m[1]!.split(',')) values.push(candidate.trim().split(/\s+/)[0]!);
  }
  const base = new URL(pagePath, 'https://site.invalid');
  const links: PageLink[] = [];
  for (const raw of values) {
    if (!raw || SKIP.test(raw)) continue;
    const url = new URL(decodeEntities(raw), base);
    links.push({ raw, path: decodeURIComponent(url.pathname), hash: decodeURIComponent(url.hash.slice(1)) });
  }
  return links;
}

/** All element ids in a page, used to validate "#fragment" links. */
export function extractIds(html: string): Set<string> {
  return new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]!));
}

/** Files that could serve a pathname on a static host, in the order GitHub Pages tries them. */
export function candidateFiles(path: string): string[] {
  if (path.endsWith('/')) return [`${path}index.html`];
  return [path, `${path}.html`, `${path}/index.html`];
}

function decodeEntities(value: string): string {
  return value.replace(/&amp;/g, '&').replace(/&#38;/g, '&');
}

/**
 * Minimal reader for the article frontmatter (flat `key: value` lines and `[a, b]` lists).
 * Lets build scripts read articles without Astro. Astro's own schema remains the source of validation.
 * No imports, so Node can run this file directly with its built-in TypeScript support.
 */
export function readFrontmatter(markdown: string): Record<string, string | string[]> {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(markdown);
  if (!match) return {};
  const data: Record<string, string | string[]> = {};
  for (const line of match[1]!.split(/\r?\n/)) {
    const m = /^([A-Za-z][\w-]*):\s*(.*)$/.exec(line);
    if (!m) continue;
    const value = m[2]!.trim();
    data[m[1]!] =
      value.startsWith('[') && value.endsWith(']') ? value.slice(1, -1).split(',').map(unquote).filter(Boolean) : unquote(value);
  }
  return data;
}

function unquote(value: string): string {
  const v = value.trim();
  return /^(['"]).*\1$/.test(v) ? v.slice(1, -1) : v;
}

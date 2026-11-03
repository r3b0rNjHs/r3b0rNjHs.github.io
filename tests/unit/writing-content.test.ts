import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = join(process.cwd(), 'src/content/writing');
const files = (lang: string) =>
  readdirSync(join(root, lang))
    .filter((f) => f.endsWith('.md'))
    .sort();

/** Phrases that read as machine-written boilerplate. Kept short on purpose: it's a smoke alarm, not a style guide. */
const STOCK_PHRASES = [
  /\bdelve\b/i,
  /\bgame[- ]changer\b/i,
  /\bin today's\b/i,
  /\bleverag(e|ing)\b/i,
  /\bseamless(ly)?\b/i,
  /\bin conclusion\b/i,
  /\bembark\b/i,
  /\btapestry\b/i,
  /\ben conclusión\b/i,
  /\bsin fisuras\b/i,
];

describe('articles', () => {
  it('exist in both languages with the same slugs', () => {
    expect(files('en').length).toBeGreaterThan(0);
    expect(files('es')).toEqual(files('en'));
  });

  it.each([...files('en').map((f) => `en/${f}`), ...files('es').map((f) => `es/${f}`)])('%s reads like a person wrote it', (file) => {
    const text = readFileSync(join(root, file), 'utf8');
    expect(text, 'no em dashes').not.toMatch(/—/);
    expect(text.replace(/```[\s\S]*?```/g, ''), 'no en dashes in prose').not.toMatch(/–/);
    for (const phrase of STOCK_PHRASES) expect(text, `stock phrase ${phrase}`).not.toMatch(phrase);
  });
});

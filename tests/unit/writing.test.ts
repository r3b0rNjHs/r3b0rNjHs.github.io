import { describe, expect, it } from 'vitest';
import { formatDate, parseEntryId, readingMinutes } from '@/lib/writing';

describe('readingMinutes', () => {
  it('rounds to whole minutes with a floor of one', () => {
    expect(readingMinutes('hello world')).toBe(1);
    expect(readingMinutes(Array.from({ length: 660 }, () => 'word').join(' '))).toBe(3);
  });

  it('ignores code blocks and punctuation-only tokens', () => {
    const code = '```ts\n' + Array.from({ length: 2000 }, () => 'x').join(' ') + '\n```';
    expect(readingMinutes(`${code} — · intro`)).toBe(1);
  });
});

describe('formatDate', () => {
  const date = new Date('2026-11-03T00:00:00Z');

  it('formats dates per locale', () => {
    expect(formatDate(date, 'en')).toBe('3 November 2026');
    expect(formatDate(date, 'es')).toBe('3 de noviembre de 2026');
  });
});

describe('parseEntryId', () => {
  it('splits language and slug', () => {
    expect(parseEntryId('es/my-post')).toEqual({ lang: 'es', slug: 'my-post' });
  });

  it('rejects ids outside a language folder', () => {
    expect(() => parseEntryId('fr/post')).toThrow();
    expect(() => parseEntryId('post')).toThrow();
  });
});

import { describe, expect, it } from 'vitest';
import { fuzzyFilter, fuzzyScore } from '@/lib/fuzzy';

describe('fuzzyScore', () => {
  it('returns null when the query is not a subsequence', () => {
    expect(fuzzyScore('xyz', 'Pet Defense')).toBeNull();
  });

  it('ignores case and accents', () => {
    expect(fuzzyScore('galeria', 'Galería')).not.toBeNull();
    expect(fuzzyScore('PET', 'pet defense')).not.toBeNull();
  });

  it('prefers contiguous, word-start matches', () => {
    expect(fuzzyScore('work', 'Work')!).toBeGreaterThan(fuzzyScore('work', 'Network ok')!);
  });
});

describe('fuzzyFilter', () => {
  const items = ['Home', 'Work', 'Contact', 'Copy email address', 'Toggle theme'];

  it('returns everything for an empty query', () => {
    expect(fuzzyFilter(items, '  ', (x) => x)).toEqual(items);
  });

  it('ranks the best match first', () => {
    expect(fuzzyFilter(items, 'cont', (x) => x)[0]).toBe('Contact');
    expect(fuzzyFilter(items, 'theme', (x) => x)).toEqual(['Toggle theme']);
  });
});

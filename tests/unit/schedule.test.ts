import { describe, expect, it } from 'vitest';
import { isPublished } from '@/lib/schedule';

describe('isPublished', () => {
  const now = new Date('2026-11-05T07:00:00Z');

  it('publishes articles whose date has arrived', () => {
    expect(isPublished({ date: new Date('2026-11-05') }, now)).toBe(true);
    expect(isPublished({ date: '2026-11-01' }, now)).toBe(true);
  });

  it('holds back future-dated articles', () => {
    expect(isPublished({ date: '2026-11-06' }, now)).toBe(false);
  });

  it('never publishes drafts, whatever the date', () => {
    expect(isPublished({ date: '2026-01-01', draft: true }, now)).toBe(false);
    expect(isPublished({ date: '2026-01-01', draft: 'true' }, now)).toBe(false);
  });

  it('rejects invalid dates', () => {
    expect(isPublished({ date: 'not a date' }, now)).toBe(false);
  });

  it('includes everything in preview mode', () => {
    expect(isPublished({ date: '2030-01-01', draft: true }, now, true)).toBe(true);
  });
});

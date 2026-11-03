import { describe, expect, it } from 'vitest';
import { formatClock, yearsBetween } from '@/lib/time';

describe('formatClock', () => {
  it('formats a 24h clock in the requested time zone', () => {
    const noonUtc = new Date('2026-01-15T12:00:00Z');
    expect(formatClock(noonUtc, 'Atlantic/Canary', 'en')).toBe('12:00');
    expect(formatClock(noonUtc, 'Europe/Madrid', 'es')).toBe('13:00');
  });
});

describe('yearsBetween', () => {
  it('uses the current year for ongoing roles', () => {
    expect(yearsBetween(2018, 2023)).toBe(5);
    expect(yearsBetween(2020, null, new Date('2026-06-01'))).toBe(6);
  });
});

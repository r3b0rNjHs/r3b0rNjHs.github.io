import { describe, expect, it } from 'vitest';
import { BAYER_4, bustIntensity } from '@/lib/portrait';

describe('bustIntensity', () => {
  it('is dark outside the silhouette', () => {
    expect(bustIntensity(-0.48, 0.05)).toBe(0);
    expect(bustIntensity(0.48, 0.5)).toBe(0);
  });

  it('is lit inside the head and shoulders', () => {
    expect(bustIntensity(0, 0.36)).toBeGreaterThan(0.4);
    expect(bustIntensity(0, 0.95)).toBeGreaterThan(0.3);
  });

  it('is brighter on the key-light side', () => {
    expect(bustIntensity(-0.08, 0.36)).toBeGreaterThan(bustIntensity(0.08, 0.36));
  });

  it('always stays within [0, 1]', () => {
    for (let y = 0; y <= 1; y += 0.05)
      for (let x = -0.5; x <= 0.5; x += 0.05) {
        const v = bustIntensity(x, y);
        expect(v).toBeGreaterThanOrEqual(0);
        expect(v).toBeLessThanOrEqual(1);
      }
  });
});

describe('BAYER_4', () => {
  it('is a permutation of 16 evenly spaced thresholds', () => {
    expect(new Set(BAYER_4).size).toBe(16);
    expect(Math.min(...BAYER_4)).toBeGreaterThan(0);
    expect(Math.max(...BAYER_4)).toBeLessThan(1);
  });
});

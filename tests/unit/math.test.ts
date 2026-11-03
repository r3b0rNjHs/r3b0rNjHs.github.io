import { describe, expect, it } from 'vitest';
import { clamp, createRng, damp, hashString, lerp, mapRange } from '@/lib/math';

describe('clamp', () => {
  it('defaults to the unit interval', () => {
    expect(clamp(-1)).toBe(0);
    expect(clamp(0.4)).toBe(0.4);
    expect(clamp(3)).toBe(1);
  });

  it('respects custom bounds', () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });
});

describe('lerp / mapRange', () => {
  it('interpolates linearly', () => {
    expect(lerp(10, 20, 0.25)).toBe(12.5);
  });

  it('maps and clamps between ranges', () => {
    expect(mapRange(5, 0, 10, 100, 200)).toBe(150);
    expect(mapRange(50, 0, 10, 100, 200)).toBe(200);
  });

  it('handles a degenerate input range', () => {
    expect(mapRange(5, 3, 3, 1, 2)).toBe(1);
  });
});

describe('damp', () => {
  it('converges towards the target', () => {
    let v = 0;
    for (let i = 0; i < 120; i++) v = damp(v, 1, 8, 1 / 60);
    expect(v).toBeGreaterThan(0.99);
  });

  it('is frame-rate independent', () => {
    let at30 = 0;
    let at120 = 0;
    for (let i = 0; i < 30; i++) at30 = damp(at30, 1, 4, 1 / 30);
    for (let i = 0; i < 120; i++) at120 = damp(at120, 1, 4, 1 / 120);
    expect(at30).toBeCloseTo(at120, 6);
  });
});

describe('createRng / hashString', () => {
  it('is deterministic for a given seed', () => {
    const a = createRng(42);
    const b = createRng(42);
    expect(Array.from({ length: 5 }, a)).toEqual(Array.from({ length: 5 }, b));
  });

  it('stays within [0, 1)', () => {
    const rng = createRng(7);
    for (let i = 0; i < 1000; i++) {
      const v = rng();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });

  it('hashes strings stably and distinctly', () => {
    expect(hashString('pet-defense')).toBe(hashString('pet-defense'));
    expect(hashString('pet-defense')).not.toBe(hashString('yoqze-agents'));
  });
});

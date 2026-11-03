import { describe, expect, it } from 'vitest';
import { fibonacciSphere, nearestNeighbourEdges } from '@/lib/geometry';

describe('fibonacciSphere', () => {
  it('returns `count` unit vectors', () => {
    const points = fibonacciSphere(500, 0.05, 3);
    expect(points).toHaveLength(1500);
    for (let i = 0; i < 500; i++) {
      const length = Math.hypot(points[i * 3]!, points[i * 3 + 1]!, points[i * 3 + 2]!);
      expect(length).toBeCloseTo(1, 5);
    }
  });

  it('is deterministic for the same seed', () => {
    expect(fibonacciSphere(64, 0.1, 9)).toEqual(fibonacciSphere(64, 0.1, 9));
  });
});

describe('nearestNeighbourEdges', () => {
  const line = new Float32Array([0, 0, 0, 1, 0, 0, 2, 0, 0, 10, 0, 0]);

  it('links each node to its nearest neighbours within range', () => {
    const edges = nearestNeighbourEdges(line, [0, 1, 2, 3], 1, 1.5);
    expect(edges).toEqual(
      expect.arrayContaining([
        [0, 1],
        [1, 2],
      ]),
    );
    expect(edges.flat()).not.toContain(3);
  });

  it('never returns duplicated or self edges', () => {
    const edges = nearestNeighbourEdges(line, [0, 1, 2], 2, 5);
    const keys = edges.map(([a, b]) => `${a}:${b}`);
    expect(new Set(keys).size).toBe(keys.length);
    expect(edges.every(([a, b]) => a < b)).toBe(true);
  });
});

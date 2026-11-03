import { describe, expect, it } from 'vitest';
import { fibonacciSphere, nearestNeighbourEdges, rotatePoints } from '@/lib/geometry';

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

describe('rotatePoints', () => {
  it('preserves vector length', () => {
    const rotated = rotatePoints(fibonacciSphere(50), 0.4, -0.7);
    for (let i = 0; i < 50; i++) {
      expect(Math.hypot(rotated[i * 3]!, rotated[i * 3 + 1]!, rotated[i * 3 + 2]!)).toBeCloseTo(1, 5);
    }
  });

  it('is the identity for zero rotation', () => {
    const points = fibonacciSphere(10);
    expect(Array.from(rotatePoints(points, 0, 0))).toEqual(Array.from(points).map((v) => expect.closeTo(v, 6)));
  });

  it('rotates +Z towards +X for a quarter turn around Y', () => {
    const [x, y, z] = rotatePoints(new Float32Array([0, 0, 1]), 0, Math.PI / 2);
    expect(x).toBeCloseTo(1, 6);
    expect(y).toBeCloseTo(0, 6);
    expect(z).toBeCloseTo(0, 6);
  });
});

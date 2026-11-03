import { createRng } from './math';

export type Vec3 = [x: number, y: number, z: number];

/**
 * Evenly distribute `count` points on a unit sphere using the Fibonacci lattice,
 * with optional deterministic jitter so the result feels organic rather than mechanical.
 */
export function fibonacciSphere(count: number, jitter = 0, seed = 1): Float32Array {
  const out = new Float32Array(count * 3);
  const rng = createRng(seed);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / Math.max(1, count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    let x = Math.cos(theta) * r;
    let yy = y;
    let z = Math.sin(theta) * r;
    if (jitter > 0) {
      x += (rng() - 0.5) * jitter;
      yy += (rng() - 0.5) * jitter;
      z += (rng() - 0.5) * jitter;
      const len = Math.hypot(x, yy, z) || 1;
      x /= len;
      yy /= len;
      z /= len;
    }
    out[i * 3] = x;
    out[i * 3 + 1] = yy;
    out[i * 3 + 2] = z;
  }
  return out;
}

/**
 * Build a sparse "synapse" graph: each of the sampled nodes is linked to its `k` nearest
 * neighbours within `maxDistance`. Returns unique undirected edges as index pairs.
 */
export function nearestNeighbourEdges(
  positions: Float32Array,
  nodeIndices: readonly number[],
  k: number,
  maxDistance: number,
): Array<[number, number]> {
  const edges = new Map<string, [number, number]>();
  const maxSq = maxDistance * maxDistance;
  for (const a of nodeIndices) {
    const candidates: Array<{ index: number; d: number }> = [];
    for (const b of nodeIndices) {
      if (a === b) continue;
      const dx = positions[a * 3]! - positions[b * 3]!;
      const dy = positions[a * 3 + 1]! - positions[b * 3 + 1]!;
      const dz = positions[a * 3 + 2]! - positions[b * 3 + 2]!;
      const d = dx * dx + dy * dy + dz * dz;
      if (d <= maxSq) candidates.push({ index: b, d });
    }
    candidates.sort((p, q) => p.d - q.d);
    for (const { index: b } of candidates.slice(0, k)) {
      const key = a < b ? `${a}:${b}` : `${b}:${a}`;
      if (!edges.has(key)) edges.set(key, a < b ? [a, b] : [b, a]);
    }
  }
  return [...edges.values()];
}

/**
 * Rotate unit-sphere points (Y axis, then X axis) and return them as [x, y, depth] triples,
 * ready for an orthographic 2D projection. Used to pre-render the static hero constellation.
 */
export function rotatePoints(points: Float32Array, rotX: number, rotY: number): Float32Array {
  const out = new Float32Array(points.length);
  const [cy, sy, cx, sx] = [Math.cos(rotY), Math.sin(rotY), Math.cos(rotX), Math.sin(rotX)];
  for (let i = 0; i < points.length; i += 3) {
    const x = points[i]!;
    const y = points[i + 1]!;
    const z = points[i + 2]!;
    const x1 = x * cy + z * sy;
    const z1 = -x * sy + z * cy;
    out[i] = x1;
    out[i + 1] = y * cx - z1 * sx;
    out[i + 2] = y * sx + z1 * cx;
  }
  return out;
}

/** Small, dependency-free numeric helpers shared by the interactive layers. */

export const clamp = (value: number, min = 0, max = 1): number => Math.min(max, Math.max(min, value));

export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

/** Map `value` from [inMin, inMax] to [outMin, outMax], clamped to the output range. */
export function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  if (inMax === inMin) return outMin;
  const t = clamp((value - inMin) / (inMax - inMin));
  return lerp(outMin, outMax, t);
}

/**
 * Frame-rate independent damping: approaches `target` with the same feel at 30fps or 144fps.
 * `lambda` is the smoothing speed (higher = snappier), `dt` is the delta time in seconds.
 */
export const damp = (current: number, target: number, lambda: number, dt: number): number =>
  lerp(current, target, 1 - Math.exp(-lambda * dt));

/** Deterministic PRNG (mulberry32) so generative visuals are stable across reloads. */
export function createRng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Hash a string into a 32-bit seed (FNV-1a). */
export function hashString(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

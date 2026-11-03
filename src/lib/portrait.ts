/**
 * Signed-distance style field for the placeholder portrait: a lit head-and-shoulders bust.
 * Returns brightness in [0, 1] for a point in normalised canvas space
 * (x in [-0.5, 0.5] left→right, y in [0, 1] top→bottom). Pure so it can be unit-tested.
 */
export function bustIntensity(x: number, y: number): number {
  const head = ellipse(x, y, 0, 0.36, 0.165, 0.205);
  const neck = Math.abs(x) < 0.07 && y > 0.5 && y < 0.7 ? 1 - Math.abs(x) / 0.07 : 0;
  const shoulders = ellipse(x, y, 0, 1.02, 0.43, 0.34);

  const body = Math.max(head, neck * 0.55, shoulders);
  if (body <= 0) return 0;

  // Key light from the upper left, soft rim on the right edge.
  const light = 0.55 - x * 0.9 - (y - 0.4) * 0.35;
  const rim = smoothstep(0.08, 0.0, Math.abs(body - 0.05)) * (x > 0 ? 0.35 : 0);
  return clamp01(body * 0.55 + light * 0.45 + rim);
}

/** 1 at the centre of the ellipse, falling to 0 at its edge (negative outside). */
function ellipse(x: number, y: number, cx: number, cy: number, rx: number, ry: number): number {
  const d = Math.hypot((x - cx) / rx, (y - cy) / ry);
  return d < 1 ? 1 - d * d : -1;
}

function smoothstep(edge0: number, edge1: number, v: number): number {
  const t = clamp01((v - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** Normalised 4×4 Bayer matrix for ordered dithering. */
export const BAYER_4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

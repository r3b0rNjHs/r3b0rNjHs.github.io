/** Renderer strings reported by CPU-based WebGL implementations (no real GPU behind them). */
const SOFTWARE_RENDERERS = /swiftshader|llvmpipe|softpipe|software|basic render driver|mesa offscreen/i;

/**
 * Whether a WebGL renderer string belongs to a software rasteriser. On those, a particle field
 * costs seconds of main-thread time per frame budget, so the hero keeps its static fallback.
 */
export function isSoftwareRenderer(renderer: string | null | undefined): boolean {
  return !!renderer && SOFTWARE_RENDERERS.test(renderer);
}

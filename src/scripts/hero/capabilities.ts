import { isSoftwareRenderer } from '@/lib/gpu';

/**
 * Cheap capability probe that runs *before* three.js is downloaded:
 * no WebGL, or WebGL backed by a CPU rasteriser, means the static fallback is the better experience.
 */
export function canRenderNeuralField(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl');
    if (!gl) return false;
    const info = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = info ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return !isSoftwareRenderer(String(renderer));
  } catch {
    return false;
  }
}

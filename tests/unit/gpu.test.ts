import { describe, expect, it } from 'vitest';
import { isSoftwareRenderer } from '@/lib/gpu';

describe('isSoftwareRenderer', () => {
  it.each([
    'Google SwiftShader',
    'ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero) (0x0000C0DE)), SwiftShader driver)',
    'llvmpipe (LLVM 15.0.7, 256 bits)',
    'Microsoft Basic Render Driver',
  ])('detects %s', (renderer) => {
    expect(isSoftwareRenderer(renderer)).toBe(true);
  });

  it.each(['Apple M2', 'ANGLE (NVIDIA, NVIDIA GeForce RTX 4070 Direct3D11 vs_5_0 ps_5_0, D3D11)', 'Adreno (TM) 740', 'Mali-G78'])(
    'accepts hardware GPU %s',
    (renderer) => {
      expect(isSoftwareRenderer(renderer)).toBe(false);
    },
  );

  it('treats an unknown renderer as hardware', () => {
    expect(isSoftwareRenderer(null)).toBe(false);
    expect(isSoftwareRenderer('')).toBe(false);
  });
});

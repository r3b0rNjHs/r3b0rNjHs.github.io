/**
 * GLSL for the hero "neural field": a sphere of nodes deformed by simplex noise,
 * bent by the pointer and rippled by click-triggered pulses. Every layer (nodes,
 * synapses, travelling signals) shares the same `displace()` so they stay in sync.
 */

const noise = /* glsl */ `
// Simplex 3D noise — Ashima Arts / Stefan Gustavson (MIT).
vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod(i, 289.0);
  vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 1.0/7.0;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

const field = /* glsl */ `
uniform float uTime;
uniform vec4  uPointer;      // xyz: pointer direction on the unit sphere, w: strength
uniform vec4  uPulse[4];     // xyz: origin direction, w: start time (negative = inactive)
uniform float uRadius;
uniform float uMorph;        // 0..1 — scroll-driven dispersion

float pulseAt(vec3 dir, vec4 pulse){
  if (pulse.w < 0.0) return 0.0;
  float age = uTime - pulse.w;
  float angle = acos(clamp(dot(dir, pulse.xyz), -1.0, 1.0));
  float front = age * 1.35;
  float ring = exp(-pow((angle - front) * 7.0, 2.0));
  return ring * exp(-age * 0.9);
}

// Returns displaced position; writes highlight intensity (0..1+) to h.
vec3 displace(vec3 dir, float seed, out float h){
  float t = uTime * 0.07;
  float n = snoise(dir * 1.35 + vec3(t, t * 0.7, -t));
  float n2 = snoise(dir * 3.2 - vec3(t * 1.3)) * 0.35;
  float r = uRadius * (1.0 + (n + n2) * 0.11);

  float pointer = smoothstep(0.75, 0.0, distance(dir, uPointer.xyz)) * uPointer.w;
  float pulse = 0.0;
  for (int i = 0; i < 4; i++) pulse += pulseAt(dir, uPulse[i]);

  r += pointer * 0.32 + pulse * 0.22;
  r *= 1.0 + uMorph * (0.6 + seed * 1.6);
  h = clamp(pointer * 0.9 + pulse * 1.4, 0.0, 1.5);
  return dir * r;
}
`;

export const nodeVertex = /* glsl */ `
${noise}
${field}
attribute float aSeed;
uniform float uSize;
uniform float uPixelRatio;
varying float vHighlight;
varying float vFacing;
varying float vSeed;

void main(){
  vec3 dir = normalize(position);
  float h;
  vec3 p = displace(dir, aSeed, h);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;

  vec3 worldNormal = normalize(mat3(modelMatrix) * dir);
  vFacing = worldNormal.z;            // camera looks down -z
  vHighlight = h;
  vSeed = aSeed;

  float twinkle = 0.75 + 0.25 * sin(uTime * (0.6 + aSeed * 1.8) + aSeed * 40.0);
  gl_PointSize = uSize * (0.45 + aSeed * 0.9) * twinkle * (1.0 + h * 1.6) * uPixelRatio / -mv.z;
}
`;

export const nodeFragment = /* glsl */ `
uniform vec3 uColor;
uniform vec3 uAccent;
uniform float uOpacity;
varying float vHighlight;
varying float vFacing;
varying float vSeed;

void main(){
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  if (d > 0.5) discard;
  float core = smoothstep(0.5, 0.0, d);
  float depth = mix(0.18, 1.0, smoothstep(-0.6, 0.7, vFacing));
  float accentMix = clamp(vHighlight + step(0.965, vSeed) * 0.85, 0.0, 1.0);
  vec3 color = mix(uColor, uAccent, accentMix);
  gl_FragColor = vec4(color, core * depth * uOpacity * (0.55 + vHighlight * 0.6));
}
`;

export const linkVertex = /* glsl */ `
${noise}
${field}
attribute float aSeed;
attribute float aEnd;
varying float vHighlight;
varying float vFacing;
varying float vEnd;

void main(){
  vec3 dir = normalize(position);
  float h;
  vec3 p = displace(dir, aSeed, h);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  vFacing = normalize(mat3(modelMatrix) * dir).z;
  vHighlight = h;
  vEnd = aEnd;
}
`;

export const linkFragment = /* glsl */ `
uniform vec3 uColor;
uniform vec3 uAccent;
uniform float uOpacity;
varying float vHighlight;
varying float vFacing;
varying float vEnd;

void main(){
  float depth = mix(0.05, 1.0, smoothstep(-0.4, 0.8, vFacing));
  vec3 color = mix(uColor, uAccent, clamp(vHighlight, 0.0, 1.0));
  float alpha = (0.12 + vHighlight * 0.55) * depth * uOpacity;
  gl_FragColor = vec4(color, alpha);
}
`;

export const signalVertex = /* glsl */ `
${noise}
${field}
attribute vec3 aFrom;
attribute vec3 aTo;
attribute float aSpeed;
attribute float aOffset;
uniform float uSize;
uniform float uPixelRatio;
varying float vFacing;
varying float vLife;

void main(){
  float t = fract(uTime * aSpeed + aOffset);
  vec3 dir = normalize(mix(aFrom, aTo, t));
  float h;
  vec3 p = displace(dir, aOffset, h);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  vFacing = normalize(mat3(modelMatrix) * dir).z;
  vLife = sin(t * 3.14159);
  gl_PointSize = uSize * (1.0 + h) * uPixelRatio * vLife / -mv.z;
}
`;

export const signalFragment = /* glsl */ `
uniform vec3 uAccent;
uniform float uOpacity;
varying float vFacing;
varying float vLife;

void main(){
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float glow = pow(smoothstep(0.5, 0.0, d), 1.6);
  float depth = smoothstep(-0.2, 0.6, vFacing);
  gl_FragColor = vec4(uAccent, glow * depth * vLife * uOpacity);
}
`;

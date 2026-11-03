import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  LineSegments,
  Matrix4,
  NormalBlending,
  PerspectiveCamera,
  Points,
  Ray,
  Scene,
  ShaderMaterial,
  Sphere,
  Vector2,
  Vector3,
  Vector4,
  WebGLRenderer,
  type Blending,
} from 'three';
import { clamp, createRng, damp } from '@/lib/math';
import { fibonacciSphere, nearestNeighbourEdges } from '@/lib/geometry';
import { linkFragment, linkVertex, nodeFragment, nodeVertex, signalFragment, signalVertex } from './shaders';

export interface NeuralFieldOptions {
  canvas: HTMLCanvasElement;
  reducedMotion: boolean;
  /** Called on every pointer pulse so the DOM can react (HUD counters, sound, etc.). */
  onPulse?: () => void;
}

interface Palette {
  base: Color;
  accent: Color;
  blending: Blending;
  opacity: number;
}

const MAX_PULSES = 4;
const RADIUS = 1.55;

/**
 * The hero's interactive "neural field".
 * Owns its renderer and render loop; call `dispose()` to free every GPU resource
 * (important with Astro view transitions, where pages are swapped without reloads).
 */
export class NeuralField {
  private readonly renderer: WebGLRenderer;
  private readonly scene = new Scene();
  private readonly camera = new PerspectiveCamera(38, 1, 0.1, 50);
  private readonly group = new Group();
  private readonly materials: ShaderMaterial[] = [];
  private readonly geometries: BufferGeometry[] = [];

  private readonly uniforms = {
    uTime: { value: 0 },
    uPointer: { value: new Vector4(0, 0, 1, 0) },
    uPulse: { value: Array.from({ length: MAX_PULSES }, () => new Vector4(0, 0, 1, -1)) },
    uRadius: { value: RADIUS },
    uMorph: { value: 0 },
    uPixelRatio: { value: 1 },
    uColor: { value: new Color() },
    uAccent: { value: new Color() },
    uOpacity: { value: 0 },
  };

  private readonly pointerNdc = new Vector2(10, 10);
  private readonly pointerDir = new Vector3(0, 0, 1);
  private pointerStrength = 0;
  private pointerActive = false;
  private tilt = new Vector2();
  private scroll = 0;
  private pulseCursor = 0;
  private visible = true;
  private frame = 0;
  private last = performance.now();
  private elapsed = 0;
  private readonly ray = new Ray();
  private readonly sphere = new Sphere(new Vector3(), RADIUS * 1.08);
  private readonly inverse = new Matrix4();
  private readonly hit = new Vector3();
  private readonly cleanups: Array<() => void> = [];
  private readonly reducedMotion: boolean;
  private readonly onPulse?: () => void;

  constructor({ canvas, reducedMotion, onPulse }: NeuralFieldOptions) {
    this.reducedMotion = reducedMotion;
    this.onPulse = onPulse;
    this.renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setClearColor(0x000000, 0);
    this.camera.position.set(0, 0, 6.2);
    this.scene.add(this.group);

    const isSmall = window.matchMedia('(max-width: 720px)').matches;
    this.build(isSmall ? 3200 : 7000, isSmall ? 260 : 520);
    this.applyPalette();
    this.resize();
    this.bindEvents(canvas);
    this.loop();
  }

  /** Re-read colours from CSS custom properties (called on theme change). */
  applyPalette(): void {
    const palette = readPalette();
    this.uniforms.uColor.value.copy(palette.base);
    this.uniforms.uAccent.value.copy(palette.accent);
    for (const material of this.materials) {
      material.blending = palette.blending;
      material.needsUpdate = true;
    }
    this.targetOpacity = palette.opacity;
  }

  /** Trigger a ripple from a direction on the sphere (defaults to the current pointer). */
  pulse(direction: Vector3 = this.pointerDir): void {
    const slot = this.uniforms.uPulse.value[this.pulseCursor % MAX_PULSES]!;
    slot.set(direction.x, direction.y, direction.z, this.elapsed);
    this.pulseCursor++;
    this.onPulse?.();
  }

  dispose(): void {
    cancelAnimationFrame(this.frame);
    for (const off of this.cleanups) off();
    for (const g of this.geometries) g.dispose();
    for (const m of this.materials) m.dispose();
    this.renderer.dispose();
  }

  // ───────────────────────── setup ─────────────────────────

  private targetOpacity = 1;

  private build(nodeCount: number, hubCount: number): void {
    const rng = createRng(20181001);
    const positions = fibonacciSphere(nodeCount, 0.045, 7);
    const seeds = new Float32Array(nodeCount);
    for (let i = 0; i < nodeCount; i++) seeds[i] = rng();

    // Nodes
    const nodes = new BufferGeometry();
    nodes.setAttribute('position', new BufferAttribute(positions, 3));
    nodes.setAttribute('aSeed', new BufferAttribute(seeds, 1));
    this.addLayer(new Points(nodes, this.material(nodeVertex, nodeFragment, { uSize: { value: 26 } })), nodes);

    // Synapses: link a subset of "hub" nodes to their nearest neighbours.
    const hubs = Array.from({ length: hubCount }, () => Math.floor(rng() * nodeCount));
    const edges = nearestNeighbourEdges(positions, hubs, 3, 0.42);
    const linkPos = new Float32Array(edges.length * 6);
    const linkSeed = new Float32Array(edges.length * 2);
    const linkEnd = new Float32Array(edges.length * 2);
    edges.forEach(([a, b], i) => {
      linkPos.set(positions.subarray(a * 3, a * 3 + 3), i * 6);
      linkPos.set(positions.subarray(b * 3, b * 3 + 3), i * 6 + 3);
      linkSeed[i * 2] = seeds[a]!;
      linkSeed[i * 2 + 1] = seeds[b]!;
      linkEnd[i * 2 + 1] = 1;
    });
    const links = new BufferGeometry();
    links.setAttribute('position', new BufferAttribute(linkPos, 3));
    links.setAttribute('aSeed', new BufferAttribute(linkSeed, 1));
    links.setAttribute('aEnd', new BufferAttribute(linkEnd, 1));
    this.addLayer(new LineSegments(links, this.material(linkVertex, linkFragment)), links);

    // Signals: bright packets travelling along a sample of synapses.
    const signalCount = Math.min(edges.length, Math.round(hubCount * 0.35));
    const from = new Float32Array(signalCount * 3);
    const to = new Float32Array(signalCount * 3);
    const speed = new Float32Array(signalCount);
    const offset = new Float32Array(signalCount);
    for (let i = 0; i < signalCount; i++) {
      const [a, b] = edges[Math.floor(rng() * edges.length)]!;
      const flip = rng() > 0.5;
      from.set(positions.subarray((flip ? b : a) * 3, (flip ? b : a) * 3 + 3), i * 3);
      to.set(positions.subarray((flip ? a : b) * 3, (flip ? a : b) * 3 + 3), i * 3);
      speed[i] = 0.25 + rng() * 0.5;
      offset[i] = rng();
    }
    const signals = new BufferGeometry();
    // `position` is required by three for bounding computations; the shader uses aFrom/aTo.
    signals.setAttribute('position', new BufferAttribute(from.slice(), 3));
    signals.setAttribute('aFrom', new BufferAttribute(from, 3));
    signals.setAttribute('aTo', new BufferAttribute(to, 3));
    signals.setAttribute('aSpeed', new BufferAttribute(speed, 1));
    signals.setAttribute('aOffset', new BufferAttribute(offset, 1));
    this.addLayer(new Points(signals, this.material(signalVertex, signalFragment, { uSize: { value: 70 } })), signals);

    this.group.rotation.set(0.35, -0.6, 0.12);
  }

  private material(vertexShader: string, fragmentShader: string, extra: Record<string, { value: unknown }> = {}) {
    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: { ...this.uniforms, ...extra },
      transparent: true,
      depthWrite: false,
    });
    this.materials.push(material);
    return material;
  }

  private addLayer(object: Points | LineSegments, geometry: BufferGeometry): void {
    object.frustumCulled = false;
    this.geometries.push(geometry);
    this.group.add(object);
  }

  private bindEvents(canvas: HTMLCanvasElement): void {
    const host = canvas.parentElement ?? canvas;
    const listen = <K extends keyof WindowEventMap>(
      target: Window | HTMLElement,
      type: K,
      handler: (e: WindowEventMap[K]) => void,
      options?: AddEventListenerOptions,
    ) => {
      target.addEventListener(type, handler as EventListener, options);
      this.cleanups.push(() => target.removeEventListener(type, handler as EventListener));
    };

    listen(window, 'resize', () => this.resize(), { passive: true });
    listen(
      window,
      'pointermove',
      (e) => {
        const rect = canvas.getBoundingClientRect();
        this.pointerNdc.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
        this.pointerActive = e.clientY < rect.bottom;
      },
      { passive: true },
    );
    listen(host as HTMLElement, 'pointerleave', () => (this.pointerActive = false));
    listen(
      host as HTMLElement,
      'pointerdown',
      (e) => {
        // Ignore clicks on real controls layered above the canvas.
        if ((e.target as HTMLElement).closest('a, button, input')) return;
        this.pulse();
      },
      { passive: true },
    );
    listen(window, 'scroll', () => (this.scroll = clamp(window.scrollY / window.innerHeight)), { passive: true });

    const io = new IntersectionObserver(([entry]) => {
      this.visible = entry?.isIntersecting ?? true;
      if (this.visible) this.loop();
    });
    io.observe(canvas);
    this.cleanups.push(() => io.disconnect());

    const onVisibility = () => {
      if (!document.hidden) {
        this.last = performance.now();
        this.loop();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    this.cleanups.push(() => document.removeEventListener('visibilitychange', onVisibility));
  }

  private resize(): void {
    const canvas = this.renderer.domElement;
    const { clientWidth: w, clientHeight: h } = canvas;
    if (!w || !h) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(w, h, false);
    this.uniforms.uPixelRatio.value = dpr;
    this.camera.aspect = w / h;
    // Keep the sphere framed on narrow screens.
    this.camera.position.z = w / h < 0.8 ? 8.6 : 6.2;
    this.camera.updateProjectionMatrix();
  }

  // ───────────────────────── frame ─────────────────────────

  private loop = (): void => {
    cancelAnimationFrame(this.frame);
    if (!this.visible || document.hidden) return;
    this.frame = requestAnimationFrame(this.loop);

    const now = performance.now();
    const dt = Math.min((now - this.last) / 1000, 1 / 20);
    this.last = now;
    const speed = this.reducedMotion ? 0.25 : 1;
    this.elapsed += dt * speed;
    this.uniforms.uTime.value = this.elapsed;

    this.updatePointer(dt);

    // Idle rotation + gentle parallax toward the pointer.
    this.tilt.x = damp(this.tilt.x, this.pointerActive ? this.pointerNdc.y * 0.18 : 0, 2.5, dt);
    this.tilt.y = damp(this.tilt.y, this.pointerActive ? this.pointerNdc.x * 0.25 : 0, 2.5, dt);
    this.group.rotation.y += dt * 0.045 * speed;
    this.group.rotation.x = 0.35 - this.tilt.x;
    this.group.rotation.z = 0.12 + this.tilt.y * 0.2;

    const morph = this.uniforms.uMorph;
    morph.value = damp(morph.value, this.reducedMotion ? 0 : this.scroll * 0.9, 4, dt);
    const opacity = this.uniforms.uOpacity;
    opacity.value = damp(opacity.value, this.targetOpacity * (1 - this.scroll * 0.85), 3, dt);

    this.renderer.render(this.scene, this.camera);
  };

  /** Project the pointer onto the (rotating) sphere so ripples land where the user points. */
  private updatePointer(dt: number): void {
    let target = 0;
    if (this.pointerActive) {
      this.ray.origin.setFromMatrixPosition(this.camera.matrixWorld);
      this.ray.direction.set(this.pointerNdc.x, this.pointerNdc.y, 0.5).unproject(this.camera).sub(this.ray.origin).normalize();
      this.group.updateMatrixWorld();
      this.inverse.copy(this.group.matrixWorld).invert();
      const localRay = this.ray.clone().applyMatrix4(this.inverse);
      if (localRay.intersectSphere(this.sphere, this.hit)) {
        this.pointerDir.lerp(this.hit.normalize(), 1 - Math.exp(-12 * dt)).normalize();
        target = 1;
      }
    }
    this.pointerStrength = damp(this.pointerStrength, target, 5, dt);
    this.uniforms.uPointer.value.set(this.pointerDir.x, this.pointerDir.y, this.pointerDir.z, this.pointerStrength);
  }
}

function readPalette(): Palette {
  const styles = getComputedStyle(document.documentElement);
  const light = document.documentElement.dataset.theme === 'light';
  return {
    base: new Color(light ? '#1a1b1f' : styles.getPropertyValue('--fg').trim() || '#eceae4'),
    accent: new Color(light ? '#5d8000' : styles.getPropertyValue('--accent').trim() || '#c8ff2e'),
    blending: light ? NormalBlending : AdditiveBlending,
    opacity: light ? 0.95 : 1,
  };
}

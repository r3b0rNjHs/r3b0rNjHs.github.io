# 0003 — WebGL hero as a progressive enhancement

- **Status:** Accepted
- **Date:** 2026-11-03

## Context

The hero needs a memorable, interactive signature that expresses "AI-native systems" without hurting performance, accessibility or battery life.

## Decision

A custom three.js scene, the _neural field_: a Fibonacci-sphere of nodes, nearest-neighbour "synapses" and travelling signal packets. All animation runs on the GPU in GLSL and shares one `displace()` function across layers.

Guardrails:

- three.js is **dynamically imported after `load` and `requestIdleCallback`**. The headline animates with pure CSS, so LCP never waits for script.
- A **build-time SVG snapshot** of the same field (generated with the same `src/lib/geometry` helpers) is server-rendered as the fallback. It is visible before WebGL boots, without JavaScript, and permanently on devices without a hardware GPU.
- A cheap **GPU probe runs before three.js is downloaded**: no WebGL, or a software rasteriser (SwiftShader, llvmpipe…), keeps the static snapshot. This avoids seconds of main-thread blocking on low-end devices and in lab tools such as Lighthouse.
- The render loop pauses when the canvas is off-screen or the tab is hidden, and resolution is capped at 2× DPR.
- `prefers-reduced-motion` slows time to 25% and disables scroll morphing.
- `dispose()` frees geometries, materials and the renderer on every view-transition swap.
- Pure helpers (`fibonacciSphere`, `nearestNeighbourEdges`, `damp`, seeded RNG) live in `src/lib` and are unit-tested.

## Consequences

- About 135 kB of JavaScript (gzipped, mostly three.js) loads lazily on the home page only, and only on capable devices.
- Lighthouse (mobile, simulated throttling): performance 98, accessibility 100, best practices 100, SEO 100.
- The canvas is decorative (`aria-hidden`), and all meaning lives in the HTML headline.

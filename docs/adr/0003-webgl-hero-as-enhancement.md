# 0003 — WebGL hero as a progressive enhancement

- **Status:** Accepted
- **Date:** 2026-11-03

## Context

The hero needs a memorable, interactive signature that expresses "AI-native systems" without hurting performance, accessibility or battery life.

## Decision

A custom three.js scene, the _neural field_: a Fibonacci-sphere of nodes, nearest-neighbour "synapses" and travelling signal packets. All animation runs on the GPU in GLSL and shares one `displace()` function across layers.

Guardrails:

- three.js is **dynamically imported after `requestIdleCallback`**, so the headline paints first and LCP is unaffected.
- A CSS gradient fallback renders when WebGL is unavailable.
- The render loop pauses when the canvas is off-screen or the tab is hidden, and resolution is capped at 2× DPR.
- `prefers-reduced-motion` slows time to 25% and disables scroll morphing.
- `dispose()` frees geometries, materials and the renderer on every view-transition swap.
- Pure helpers (`fibonacciSphere`, `nearestNeighbourEdges`, `damp`, seeded RNG) live in `src/lib` and are unit-tested.

## Consequences

- About 135 kB of JavaScript (gzipped, mostly three.js) loads lazily on the home page only.
- The canvas is decorative (`aria-hidden`), and all meaning lives in the HTML headline.

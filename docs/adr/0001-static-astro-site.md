# 0001 — Static Astro site on GitHub Pages

- **Status:** Accepted
- **Date:** 2026-11-03

## Context

A portfolio is read far more often than it changes. It must load instantly, rank well, work without JavaScript and cost nothing to host, while still allowing rich, interactive moments.

## Decision

Build with Astro in static output mode and deploy the `dist/` folder to GitHub Pages through GitHub Actions. Interactivity ships as small, framework-free TypeScript modules ("islands" of behaviour) instead of a client-side framework.

## Consequences

- Every page is pre-rendered HTML, and the baseline JavaScript is close to zero.
- Images are optimised at build time (`astro:assets`, WebP, responsive `srcset`).
- There is no server: features such as contact forms would need a third-party endpoint. That is acceptable, because email and LinkedIn cover contact.
- View transitions give SPA-like navigation without a SPA, so scripts must handle `astro:page-load` / `astro:before-swap` lifecycles. See [CLAUDE.md](../../CLAUDE.md).

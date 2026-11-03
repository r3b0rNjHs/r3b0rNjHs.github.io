# 0004 — Deploys gated by tests and accessibility checks

- **Status:** Accepted
- **Date:** 2026-11-03

## Context

A portfolio is a live demonstration of engineering standards. A broken link, a missing translation or a contrast regression undermines it more than on most sites.

## Decision

One workflow (`.github/workflows/ci.yml`) with three jobs:

1. **verify**: Prettier, `astro check`, Vitest and the production build. The build artifact is uploaded once and reused.
2. **e2e**: Playwright on desktop and mobile profiles against the built artifact, including axe-core WCAG 2.1 AA scans of key pages in both languages.
3. **deploy**: GitHub Pages, only on `main` and only when both jobs are green.

## Consequences

- What gets tested is exactly what gets deployed: the same artifact.
- Pull requests get the full gate without deploying.
- A CI run takes a few minutes. That is acceptable for the confidence it buys.

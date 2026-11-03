# Project memory

Personal portfolio for Jorge Hernández Suárez. Astro 7 static site, deployed to GitHub Pages.
Read this before changing anything; it is the contract for humans and AI agents alike.

## Commands

- `npm run dev` — local dev server
- `npm run verify` — formatting + type-check + unit tests + build (must pass before every commit)
- `npm run test:e2e` — Playwright e2e and axe accessibility suite (needs a build in `dist/`)
- `npm run og` — regenerate `public/og.png` after changing the headline or brand

## Architecture rules

1. **Content is data.** User-facing copy lives only in `src/data/*` and `src/i18n/ui.ts`. Never hard-code copy in components.
2. **Always bilingual.** Every user-facing string is `{ en, es }`. English is the default locale (no prefix), Spanish lives under `/es/`. `tests/unit/content.test.ts` enforces this.
3. **Pure logic in `src/lib`.** No DOM, no globals, deterministic, unit-tested. Components and scripts import from it.
4. **Progressive enhancement.** Pages must be complete and readable without JavaScript. Scripts must:
   - re-initialise on `astro:page-load`;
   - tear down listeners, observers and GPU resources on `astro:before-swap`;
   - respect `prefers-reduced-motion`.
5. **Links use `localePath()`.** Page URLs always end with a trailing slash, which matches how GitHub Pages serves the build.
6. **Design tokens only.** Use the CSS custom properties in `src/styles/global.css`. Colours must work in both themes and meet WCAG AA contrast.

## Conventions

- TypeScript strict. No `any`. Prefer small, named functions with a one-line doc comment explaining _why_.
- Commits follow Conventional Commits (`feat`, `fix`, `content`, `test`, `ci`, `chore`, `docs`), one logical change each.
- Images for case studies go in `src/assets/projects/<slug>/` and are imported in `src/data/projects.ts` so Astro optimises them.

## Content guardrails

- Never publish a phone number, private repository links, client or partner names, internal hostnames or business metrics that are not public.
- Fan projects must keep the "unofficial, not affiliated" note.
- Metrics must be traceable to a source (CV, public store page or repository).

## Definition of done

- `npm run verify` and `npm run test:e2e` are green.
- Checked visually in dark and light themes, on desktop and on a 390px-wide viewport.
- New decisions with trade-offs get an ADR in `docs/adr/`.

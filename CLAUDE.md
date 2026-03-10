# Agent Guide

This file provides guidance to AI coding agents when working with code in this repository.

## Project Overview

Personal academic website for Ronak Pradeep — a Next.js 15 static site deployed to GitHub Pages via the `master` branch.

## Commands

- `pnpm dev` — local dev server at localhost:3000
- `pnpm build` — production build (static export to `./out`)
- `pnpm lint` — ESLint
- `pnpm export` — alias for build + export

No test suite exists. Verify changes with `pnpm build` (strict TS errors are currently ignored during build).

## Architecture

**Framework:** Next.js 15 App Router with static export (`output: 'export'` in next.config.mjs). No SSR — everything is statically generated.

**Styling:** Tailwind CSS with a custom design system defined in `app/globals.css` (HSL color variables) and `tailwind.config.ts` (fonts, extended colors). Two themes: warm paper-tone light mode, true-black dark mode, both with violet primary accent. Custom spectral gradient utilities (`.text-spectrum`, `.border-spectrum`, `.chip-*` classes).

**Typography:** Playfair Display (display), Source Serif 4 (body), JetBrains Mono (code) — loaded via Google Fonts in `app/layout.tsx`.

**UI Components:** shadcn/ui (Radix primitives) in `components/ui/`. Config in `components.json` with path aliases `@/components`, `@/ui`, `@/lib`, `@/hooks`.

### Key Files

| File | Purpose |
|------|---------|
| `app/page.tsx` | All site content — sections for Home, Research, Updates, Papers, Mentorship, Playlists |
| `app/layout.tsx` | Root layout, font loading, theme provider |
| `app/globals.css` | CSS variables, custom utilities, theme colors |
| `components/DarkSideVoxel.tsx` | Three.js Newton's prism 3D visualization |
| `components/SketchSelfPortrait.tsx` | p5.js animated self-portrait with mouse-tracking eyes |
| `components/dark-mode-toggle.tsx` | Theme toggle |
| `tailwind.config.ts` | Design tokens (colors, fonts, animations) |

### Interactive Components

- **DarkSideVoxel** — Three.js prism with refracted rainbow beams, orbit controls, theme-aware colors. Heavy component; loaded client-side only.
- **SketchSelfPortrait** — p5.js sketch with procedural facial features, context-aware speech bubbles that vary by section, light/dark adaptation.

## CV Workflow

The CV lives in two places that should stay in sync:
- **Source:** `cv/main.tex` (LaTeX)
- **Compiled PDF:** `public/data/RonakPradeep-CV.pdf`

When updating CV content (publications, experience, etc.), update both `cv/main.tex` and the corresponding section in `app/page.tsx`. After editing the LaTeX, recompile and copy the PDF to `public/data/`. The CV directory's `.gitignore` only tracks `.tex` files — intermediate LaTeX artifacts are excluded.

## Deployment

Push to `master` triggers GitHub Actions (`.github/workflows/deploy.yml`): Node 18 + pnpm 9 → build → deploy to GitHub Pages. No branch workflow — commit and push directly to `master`.

## Gotchas

- Three.js requires webpack fallback config in `next.config.mjs` (path polyfill)
- Images use `unoptimized: true` since static export doesn't support Next.js image optimization
- Spotify embeds are lazy-loaded via Intersection Observer for performance
- The `components/ui/` directory contains ~50 shadcn components — these are generated/standard and rarely need manual editing

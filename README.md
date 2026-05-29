# cinematic-web

> The cinematic shadcn/ui — premium design systems as code, 6 presets, 3D mode, think-to-build pipeline.

[![CI](https://github.com/pushkarverma3698/website-builder-tool/actions/workflows/ci.yml/badge.svg)](https://github.com/pushkarverma3698/website-builder-tool/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/cinematic-web)](https://www.npmjs.com/package/cinematic-web)

---

## What It Is

`cinematic-web` scaffolds production-ready React landing pages with a cinematic design soul — no generic AI output, no locked-in platforms, no watermarks. Fully exported code you own.

**Two ways to use it:**

| Mode | How | Best for |
|------|-----|---------|
| **CLI** | `npx cinematic-web create` | Developers who want a working Vite project in seconds |
| **Prompt mode** | Load `CLAUDE.md` into Claude Code | AI-native workflows, custom modifications on the fly |

---

## Quick Start — CLI

```bash
npx cinematic-web create my-site
```

Answer 6 questions (brand, preset, value props, CTA) → get a Vite + React + GSAP project.

```bash
cd my-site
npm install
npm run dev
```

### All Commands

```bash
cinematic-web create [name]   # Scaffold a new landing page
cinematic-web think           # Walk through PRD → UX → MVP pipeline
cinematic-web init            # Add CLAUDE.md to an existing project
```

---

## Quick Start — Prompt Mode (Claude Code)

1. Clone this repo
2. Load `CLAUDE.md` into your Claude Code session  
3. Say: **"Build me a landing page"**
4. Answer the 6 questions → production-ready site

---

## Aesthetic Presets

| # | Preset | Feel | Primary Stack |
|---|--------|------|---------------|
| A | Organic Tech | Clinical Boutique | Moss + Clay + Cream |
| B | Midnight Luxe | Dark Editorial | Obsidian + Champagne |
| C | Brutalist Signal | Raw Precision | Paper + Signal Red |
| D | Vapor Clinic | Neon Biotech | Deep Void + Plasma |
| E | Antigravity Lift | Space-Tech Minimalist | Black + Aurora Glow |
| F | 3D Immersive | WebGL Canvas | React Three Fiber + GSAP |

All presets produce: React 19 + Vite + Tailwind CSS + GSAP ScrollTrigger + Google Fonts. Preset F adds React Three Fiber + Drei + Lenis smooth scroll.

---

## Think Pipeline (PRD → MVP)

```bash
cinematic-web think
```

Walks you through 5 sequential prompts from `prompts/product-development/`:

1. Guided PRD Creation
2. Guided UX & User Flow
3. Guided MVP Concept
4. Guided MVP Plan
5. Guided Test Plan

Outputs `docs/PRD.md`, `docs/UX.md`, `docs/MVP.md`. Then `cinematic-web create` pre-fills brand/purpose from the PRD.

---

## Repository Structure

```
website-builder-tool/
├── CLAUDE.md                          # Prompt-mode builder (Claude Code)
├── packages/
│   ├── cli/                           # cinematic-web CLI (npm package)
│   └── core/                          # @cinematic/core — shared types + tokens
├── presets/                           # 6 preset definitions (palette, fonts, identity)
│   ├── organic-tech/preset.json
│   ├── midnight-luxe/preset.json
│   ├── brutalist-signal/preset.json
│   ├── vapor-clinic/preset.json
│   ├── antigravity-lift/preset.json
│   └── 3d-immersive/preset.json
├── templates/
│   ├── base-react/                    # Presets A–E (Vite + React + Tailwind + GSAP)
│   └── three-fiber/                   # Preset F (+ React Three Fiber + Drei + Lenis)
├── prompts/
│   ├── 3d-immersive/                  # 3D build prompts
│   └── product-development/           # PRD → MVP workflow templates
├── examples/
│   └── turicks-3d/                    # Reference 3D implementation (frozen)
└── scripts/
    ├── verify-scaffold.mjs            # CI scaffold verification
    └── sync-claude.ts                 # Regenerates CLAUDE.md preset section from JSON
```

---

## Development

```bash
pnpm install
pnpm build                          # Build all packages
node scripts/verify-scaffold.mjs    # Verify all 6 presets scaffold + no token leaks
```

### Verify a specific preset

```bash
node scripts/verify-scaffold.mjs midnight-luxe
```

### Keep CLAUDE.md in sync

After editing a `preset.json`, regenerate the preset section in `CLAUDE.md`:

```bash
pnpm sync:claude
```

---

## Contributing

Contributions welcome:

- **New preset** — add `presets/<name>/preset.json` + `presets/<name>/README.md`, run `pnpm sync:claude`
- **Template improvements** — edit `templates/base-react/` or `templates/three-fiber/`; run verify script
- **Product prompts** — add to `prompts/landing-pages/`

See `CONTRIBUTING.md` (coming in Phase 2).

---

## Credits

- Design system & CLI — [@pushkarverma3698](https://github.com/pushkarverma3698)
- Product Development Prompts — [TechNomadCode/AI-Product-Development-Toolkit](https://github.com/TechNomadCode/AI-Product-Development-Toolkit)
- 3D Resources — [devanshutak25/3d-resources](https://github.com/devanshutak25/3d-resources)

---

## License

MIT

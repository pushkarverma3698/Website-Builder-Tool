# Cinematic Website Builder

> An AI-powered toolkit for building production-ready, cinematic, and immersive websites. Works with Claude Code, Gemini, and any large-context AI.

---

## What This Is

A collection of battle-tested AI prompts and design systems that turn any AI coding assistant into a world-class frontend engineer. Tell it your brand — it builds a cinematic, pixel-perfect site.

**Includes:**
- **5 Cinematic Presets** — Organic Tech, Midnight Luxe, Brutalist Signal, Vapor Clinic, Antigravity Lift
- **3D Immersive Mode** — React Three Fiber + GSAP scroll-driven 3D experiences
- **Product Development Prompts** — PRD → UX → MVP → Test pipeline
- **3D Resource Library** — Curated assets, libraries, and tools for 3D web

---

## Quick Start

### For Claude Code

1. Clone this repo into your project directory
2. Load `CLAUDE.md` into your session
3. Ask Claude: **"Build me a landing page"**
4. Answer 6 questions → get a production-ready cinematic site

### For Gemini / Other AI

1. Load `.tool/GEMINI.md` into your session
2. Same flow — ask "Build me a landing page"

### For 3D Websites

1. Load `prompts/3d-immersive/3d-website-builder.md`
2. Use the **Master Prompt** section
3. Answer 4 questions → get a full Three.js / React Three Fiber immersive experience

---

## Repository Structure

```
website-builder-tool/
├── CLAUDE.md                          # Claude Code builder script
├── .tool/
│   └── GEMINI.md                      # Gemini builder script
├── prompts/
│   ├── 3d-immersive/
│   │   └── 3d-website-builder.md      # 3D website prompts (R3F + GSAP)
│   ├── product-development/           # PRD → MVP workflow prompts
│   │   ├── Guided-PRD-Creation.md
│   │   ├── Guided-UX-User-Flow.md
│   │   ├── Guided-MVP-Concept.md
│   │   ├── Guided-MVP.md
│   │   ├── Guided-Test-Plan.md
│   │   └── v0-design-prompt.md
│   └── landing-pages/                 # (community contributions welcome)
└── resources/
    └── 3d-resources.md                # Curated 3D web resources
```

---

## Aesthetic Presets

| Preset | Identity | Colors |
|--------|----------|--------|
| A — Organic Tech | Clinical Boutique | Moss + Clay + Cream |
| B — Midnight Luxe | Dark Editorial | Obsidian + Champagne + Ivory |
| C — Brutalist Signal | Raw Precision | Paper + Signal Red + Black |
| D — Vapor Clinic | Neon Biotech | Deep Void + Plasma Purple |
| E — Antigravity Lift | Space-Tech Minimalist | Black + Off-White + Aurora |
| F — 3D Immersive | WebGL Canvas | Custom per brand |

---

## 3D Mode

The `prompts/3d-immersive/` directory contains a complete system for building immersive 3D websites:

- **Full Landing Page** — Complete 6-scene 3D scroll journey
- **Hero Section Only** — Drop-in 3D hero upgrade for existing sites
- **Product Demo Component** — 3D SaaS product visualization
- **Performance Checklist** — Ship 60fps 3D without breaking mobile

**Stack:** React Three Fiber + @react-three/drei + GSAP + Lenis + Three.js

See [prompts/3d-immersive/3d-website-builder.md](prompts/3d-immersive/3d-website-builder.md)

---

## Product Development Pipeline

Use the `prompts/product-development/` templates to go from idea to shipped product:

1. **PRD** — Define what you're building and why
2. **UX Flow** — Map the user journey
3. **MVP Concept** — Scope ruthlessly
4. **MVP Plan** — Build spec with tasks
5. **Test Plan** — QA strategy
6. **v0 Design** — Generate visual prompt for v0.dev

Source: [TechNomadCode/AI-Product-Development-Toolkit](https://github.com/TechNomadCode/AI-Product-Development-Toolkit)

---

## Technical Stack (Cinematic Presets A–E)

- React 19 + Vite
- Tailwind CSS v3.4.17
- GSAP 3 + ScrollTrigger
- Lucide React (icons)
- Google Fonts (preset-specific)

---

## Contributing

Contributions welcome:
- New aesthetic presets (add to `CLAUDE.md` and `.tool/GEMINI.md`)
- 3D scene templates (add to `prompts/3d-immersive/`)
- Industry-specific landing page prompts (add to `prompts/landing-pages/`)

---

## Credits

- Cinematic Builder design system — [@pushkarverma3698](https://github.com/pushkarverma3698)
- Product Development Prompts — [TechNomadCode/AI-Product-Development-Toolkit](https://github.com/TechNomadCode/AI-Product-Development-Toolkit)
- 3D Resources — [devanshutak25/3d-resources](https://github.com/devanshutak25/3d-resources)

---

## License

MIT — use freely, credit appreciated.

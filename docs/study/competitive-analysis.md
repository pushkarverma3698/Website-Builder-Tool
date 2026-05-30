# cinematic-web — Competitive Analysis & Positioning

> **Purpose:** Reference document for product improvisation. Update after each phase launch.  
> **Mandate:** Always be better than competitors. This document defines the battlefield.

---

## Executive Summary

`cinematic-web` occupies a **unique, uncontested positioning** at the intersection of:
- Open-source CLI distribution (no competitor ships a CLI)
- 6 opinionated cinematic design systems (no competitor has design philosophy)
- 3D WebGL mode (no competitor offers real-time 3D as a landing page preset)
- AI-agnostic think-to-build pipeline (no competitor bridges PRD → code)
- Full code ownership, zero lock-in (no competitor gives you the actual source)

No single competitor checks more than 2 of these 5 boxes. We check all 5.

---

## Competitive Landscape

### Tier 1 — Biggest Threats

#### v0.dev (Vercel)
- **What it does:** AI prompt → React component/page via chat interface
- **Distribution:** Web-only; Vercel login required
- **Design philosophy:** Zero. Generic shadcn/ui output every time
- **3D support:** None
- **Code export:** Yes (copy-paste)
- **Open source:** No
- **Our advantage:** We ship a CLI. We have design souls (6 presets). We work offline. We own the output. v0 has massive distribution but zero design differentiation — everything looks the same.
- **Threat level:** 🟡 Medium — they could add presets, but their incentive is Vercel hosting lock-in, not code ownership

#### Bolt.new (StackBlitz)
- **What it does:** Full-stack app builder in-browser with WebContainers
- **Distribution:** Web-only; account required
- **Design philosophy:** Zero. Bootstrap/generic output
- **3D support:** None
- **Code export:** Yes (zip download)
- **Open source:** No
- **Our advantage:** We're a CLI tool. We're focused on landing pages (they try to do everything). We have design identity.
- **Threat level:** 🟡 Medium — broad scope actually works against them for our use case

#### Lovable (formerly GPT Engineer)
- **What it does:** Full web app from description; targets non-technical users
- **Distribution:** Web-only; subscription required ($20-50/mo)
- **Design philosophy:** None
- **3D support:** None
- **Code export:** Yes
- **Open source:** No
- **Our advantage:** Developer-first CLI. Design philosophy. Lower cost.
- **Threat level:** 🟢 Low — targets different persona (non-technical)

#### Webflow
- **What it does:** Visual drag-and-drop website builder with CMS
- **Distribution:** Web-only; subscription ($14-39/mo + hosting)
- **Design philosophy:** None built-in (relies on templates marketplace)
- **3D support:** Partial (Spline embeds only)
- **Code export:** Read-only HTML/CSS export (not editable React)
- **Open source:** No
- **Our advantage:** Full React source code. Vite-native. No lock-in. Developer workflow.
- **Threat level:** 🟢 Low — different audience (designers vs developers)

### Tier 2 — Niche Competitors

#### Framer
- **What it does:** Design tool with code export; primarily used by designers
- **Distribution:** Web-only; subscription ($20-35/mo + hosting)
- **Design philosophy:** High quality templates, but generic directions
- **3D support:** None
- **Code export:** Limited (CSS-in-JS, not portable React)
- **Open source:** No
- **Our advantage:** Free CLI. Opinionated design systems. Full React source.
- **Threat level:** 🟢 Low — design tool, not developer tool

#### Spline
- **What it does:** 3D design tool for web; beautiful outputs but visual editor
- **Distribution:** Web-only; subscription ($12/mo+)
- **Design philosophy:** Visual/artistic
- **3D support:** Yes, but visual-editor based (not code-first)
- **Code export:** Embed script only; no React source
- **Open source:** No
- **Our advantage:** React Three Fiber = full code ownership. Scroll-driven camera. Developer-first.
- **Threat level:** 🟢 Low — their 3D output is artistic, ours is a functional landing page

#### Dora AI
- **What it does:** AI-generated 3D websites from prompts
- **Distribution:** Web-only; early access/waitlist
- **Design philosophy:** AI-generated (varies)
- **3D support:** Yes — their main differentiator
- **Code export:** No (platform-locked hosting)
- **Open source:** No
- **Our advantage:** Full React Three Fiber source code. No hosting lock-in. CLI workflow.
- **Threat level:** 🟠 High for 3D specifically — first well-funded competitor in our 3D lane. **Defense:** Be the code-ownership alternative.

#### shadcn/ui
- **What it does:** Open-source component library; not a landing page builder
- **Stars:** 200K+ (massive community)
- **Design philosophy:** Neutral (intentionally unstyled/customizable)
- **3D support:** None
- **Our relationship:** **Be shadcn-compatible, not competitive.** Position as a "cinematic layer on top of shadcn." Community crossover potential.
- **Threat level:** 🟢 Not a threat — potential partner/ally

### Tier 3 — Indirect

| Tool | Core Use Case | Why They're Not Threats |
|------|---------------|------------------------|
| Create React App / Vite templates | Basic scaffolding | Zero design, zero interactivity |
| Tailwind UI / Tailblocks | Component libraries | Copy-paste, no automation |
| Builder.io | Enterprise visual editing | $$$, enterprise focus |
| WordPress page builders | CMS-native drag-drop | Completely different stack |

---

## The 5 Moats (What Competitors Can't Copy Fast)

### Moat 1: The CLI Distribution Channel
Every competitor is a web app. We're an npm package. This means:
- Works in any AI coding environment (Claude Code, Cursor, GitHub Copilot)
- Zero signup friction — `npx cinematic-web create` is instant
- Scriptable, automatable, CI/CD-friendly
- Developer identity: "real devs use CLIs"

### Moat 2: 6 Opinionated Design Philosophies
Our presets aren't color themes — they're complete aesthetic **worldviews** with identity statements, typography systems, image mood guidance, and component personality.

| Competitor | Their "Presets" | Our Presets |
|-----------|-----------------|-------------|
| v0.dev | shadcn default | Identity statements with emotional direction |
| Bolt.new | None | Visual mood + typography + image atmosphere |
| Lovable | None | Component personality descriptions |
| Webflow | Generic Marketplace templates | Design system philosophies |

No competitor has thought this deeply about **why** a design feels a certain way.

### Moat 3: 3D as a First-Class Preset
The 3D Immersive preset is a full React Three Fiber environment:
- NetworkGraph, ParticleSystem, SocialProofBillboards WebGL components
- Scroll-driven CameraRig via Lenis
- 5 scene architecture types in the build prompt
- Fully parameterized via tokens — brand/purpose flow in

Dora AI has 3D but no code export. Spline has 3D but is a visual editor. We're the only tool that gives you 3D + React source + code ownership.

### Moat 4: Think-to-Build Pipeline
No competitor connects product strategy to code scaffolding:

```
cinematic-web think → PRD + UX + MVP docs (from brain dump)
                ↓
cinematic-web create → pre-fills from cinematic.json → scaffolds site
```

This is a complete product development accelerator, not just a site generator.

### Moat 5: AI-Agnostic CLAUDE.md
The `CLAUDE.md` prompt-mode keeps working with any AI coding assistant:
- Claude Code (primary)
- Cursor
- GitHub Copilot  
- Any tool that respects system prompt conventions

Competitors lock you into their own AI. We work with the AI you already have.

---

## Positioning Statement

**"The cinematic shadcn/ui — premium design systems as code, no platform lock-in, with 3D and a think-to-build pipeline."**

| Attribute | Them | Us |
|-----------|------|-----|
| Open source | ❌ | ✅ |
| CLI-first | ❌ | ✅ |
| 3D support | Partial (Dora only, no export) | ✅ Full React Three Fiber |
| Design philosophy | ❌ | ✅ 6 named worldviews |
| Code ownership | Partial | ✅ Full source |
| AI-agnostic | ❌ | ✅ |
| PRD pipeline | ❌ | ✅ |
| Price | $20-50/mo | Free (open source) |

---

## Top 4 Gaps to Exploit (Now)

1. **No competitor ships as a CLI.** This is the developer's natural habitat.
2. **No competitor is open source.** Community moat starts Day 1.
3. **No competitor combines cinematic design + 3D + code export.**
4. **No competitor is AI-agnostic.** Every AI assistant becomes our distribution channel.

---

## Competitive Watchlist (Review Quarterly)

| Alert | Trigger | Response |
|-------|---------|----------|
| v0.dev adds design presets | Announcement on Vercel blog | Double down on 3D + think pipeline |
| Dora AI adds code export | Product update | Emphasize CLI + developer workflow |
| Bolt.new adds landing page mode | Feature page | Emphasize design philosophy depth |
| shadcn/ui adds preset themes | GitHub release | Position as "cinematic layer on top" |

---

## Revenue Intelligence

| Competitor | Pricing | Weakness to Exploit |
|-----------|---------|---------------------|
| Lovable | $20-50/mo | Monthly recurring — our free CLI converts cost-conscious devs |
| Webflow | $14-39/mo + hosting | Lock-in — our "you own the code" messaging directly addresses this |
| Framer | $20-35/mo | Designer tool — "if you can npm, use cinematic-web" |
| v0.dev | Free tier (limited) | Same SaaS pricing anxiety — our CLI is free forever |

**Sweet spots for our paid tiers (Phase 3):**
- $20/mo — developer who ships for clients (replaces Webflow subscription)
- $49 one-time — premium template packs (impulse purchase, no SaaS anxiety)
- $79/mo — Pro with Vercel deploy + all packs (professional workflow)

---

## Phase 2 Demo Site Strategy (by competitor audience)

| Demo Preset | Target Audience | Message |
|-------------|----------------|---------|
| Organic Tech → Nura Health | Biotech/health startups | "Built in 30 seconds. No Webflow subscription." |
| Midnight Luxe → Atelier 23 | Luxury brands | "Cinematic, not generic. Framer can't do this." |
| Brutalist Signal → Praxis | B2B SaaS | "Information density. No decoration. v0 can't think about design this way." |
| Vapor Clinic → Helix.bio | Biotech/neon aesthetic | "Design system, not a template." |
| Antigravity Lift → Helios | AI/agentic startups | "Space-tech minimalist. Your AI startup deserves this." |
| 3D Immersive → Turicks | AI agents | "Full 3D. Full React source. No Spline. No Dora lock-in." |

---

*Last updated: Phase 1 completion. Update after each phase launch and each major competitor move.*

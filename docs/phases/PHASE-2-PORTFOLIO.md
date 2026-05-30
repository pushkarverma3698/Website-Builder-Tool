# Phase 2 — Portfolio + Premium Template Packs

**Status: NOT STARTED**
**Target start: 2026-05-31**
**Estimated effort: 10 weeks × 12h = 120h**

---

## Goal
Ship 6 deployed demo sites (Pushkar's portfolio) + launch first premium pack. First revenue + marketing surface.

---

## Deliverables Checklist

| Item | Status | Notes |
|------|--------|-------|
| `apps/portfolio/` Next.js 15 app | ⬜ | Showcase + about + Turicks CTA |
| Demo site A — Organic Tech (Nura Health) | ⬜ | longevity brand |
| Demo site B — Midnight Luxe (Atelier 23) | ⬜ | luxury watchmaker |
| Demo site C — Brutalist Signal (Praxis) | ⬜ | control software |
| Demo site D — Vapor Clinic (Helix.bio) | ⬜ | gene therapy |
| Demo site E — Antigravity Lift (Helios) | ⬜ | agentic platform |
| Demo site F — 3D Immersive (Turicks) | ⬜ | reuse `examples/turicks-3d` |
| Vercel deployments (all 6) | ⬜ | custom subdomains |
| "Fork this template" CTA on each demo | ⬜ | auto-copies `npx cinematic-web create` cmd |
| Premium Pack #1 — Industry Verticals | ⬜ | 4 templates: SaaS dashboard, e-comm, agency, restaurant |
| Gumroad product page + $49 pricing | ⬜ | |
| Sales page (built with cinematic-web) | ⬜ | eat own dog food |
| `prompts/landing-pages/` community folder | ⬜ | README + `_template.md` |
| GitHub Discussions enabled | ⬜ | |
| `CONTRIBUTING.md` | ⬜ | preset submission guidelines |
| Distribution push | ⬜ | Show HN, PH, Twitter, r/webdev |

---

## Timeline

| Weeks | Hours | Focus |
|-------|-------|-------|
| 7–9 | 36h | Portfolio app + 6 demo sites + Vercel deploys |
| 10–12 | 36h | Premium pack (4 industry templates) + Gumroad setup + sales page |
| 13–16 | 48h | Marketing push + community infra |

---

## Architecture

### `apps/portfolio/`
```
apps/portfolio/
├── app/
│   ├── page.tsx                    # meta-showcase landing page
│   ├── showcase/[preset]/page.tsx  # /showcase/organic-tech, etc.
│   └── about/page.tsx
├── next.config.ts
├── package.json
└── tsconfig.json
```

Stack: Next.js 15, App Router, Tailwind CSS, deployed to Vercel.

### Demo Sites (6 standalone Vite projects)
Each demo = `npx cinematic-web create <brand> --preset <x>` output, with:
- Real content (brand name, copy, images matching preset mood)
- "Fork this template" button linking to the npx command
- Deployed at `<preset-slug>.cinematic.dev` (or Vercel subdomain)

### Premium Pack #1 — Industry Verticals
- 4 new templates NOT in core: `saas-dashboard`, `ecommerce`, `agency`, `restaurant`
- Sold on Gumroad at $49 one-time
- Ships as: private GitHub repo access + zip download
- Delivery method: Gumroad sends zip OR GitHub invite on purchase
- Templates use same token system as base-react — add `"template": "saas-dashboard"` to preset.json

### Template Registration for Premium Pack
Premium templates are NOT bundled in the public CLI. Instead:
1. Buyer downloads zip
2. Runs `npx cinematic-web create <name> --template ./path/to/unpacked-template`
3. CLI `create` command needs a `--template` flag added (new feature for Phase 2)

---

## New CLI Features Needed (Phase 2)

These require new code in `packages/cli/src/commands/create.ts`:

| Feature | Description | Priority |
|---------|-------------|----------|
| `--template <path>` flag | Load template from local path (for premium packs) | HIGH |
| `--preset <id>` flag (non-interactive) | Skip interactive prompts, use flag values | HIGH |
| `--brand`, `--cta`, `--value-props` flags | Full non-interactive scaffold | MEDIUM |
| Version check on startup | Warn if outdated version of cinematic-web | LOW |

**TDD requirement:** All new CLI features must follow Red→Green→Refactor. Test framework: Vitest.

---

## Phase 2 Success Criteria

1. All 6 demo sites live on Vercel with custom URLs
2. Each demo's "Fork this template" CTA generates a working `npx` command
3. First Gumroad sale recorded (target: 10 sales in month 1 = $490)
4. Repo at 500+ GitHub stars after marketing push
5. ≥3 community PRs to `prompts/landing-pages/`

---

## Open Questions

- [ ] Domain: `cinematic.dev` available? Check before Vercel deploy naming
- [ ] Premium Pack #1 verticals: SaaS, e-commerce, agency, restaurant — confirm or swap
- [ ] GitHub Gumroad delivery method: zip vs repo access vs both
- [ ] Portfolio site domain: `pushkarverma.dev`? `cinematic.dev/about`?

---

## Notes

- Demo site F (3D Immersive / Turicks) = reuse `examples/turicks-3d/` directly, freeze it
- Portfolio site itself should be built with Preset E (Antigravity Lift) — meta-showcase moment
- All 6 demo sites serve double duty: portfolio piece AND canonical reference scaffold

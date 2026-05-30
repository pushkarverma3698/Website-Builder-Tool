# Phase 1 — Open-Source CLI

**Status: COMPLETE ✅**
**Shipped: 2026-05-30**
**npm: `cinematic-web@0.1.0` + `cinematic-core@0.1.0`**

---

## Goal
Ship `npx cinematic-web` that scaffolds any of the 6 presets and walks users through the PRD→MVP pipeline. Establish distribution.

---

## Deliverables Checklist

| Item | Status | Notes |
|------|--------|-------|
| pnpm monorepo workspace | ✅ | Root `pnpm-workspace.yaml` |
| `cinematic-core` package | ✅ | Preset registry, ProjectSpec schema, tokenReplace |
| `cinematic-web` CLI binary | ✅ | `create`, `think`, `init` commands |
| 6 `presets/*/preset.json` files | ✅ | A–F with full design tokens |
| `templates/base-react` | ✅ | Vite + React 19 + Tailwind + GSAP |
| `templates/three-fiber` | ✅ | Preset F — 3D immersive |
| Asset bundling (`copy-assets.mjs`) | ✅ | Presets/templates bundled into `packages/cli/assets/` |
| CI: build + verify + publish | ✅ | `.github/workflows/publish.yml` triggers on `v*` tags |
| `pnpm sync:claude` script | ✅ | Keeps CLAUDE.md preset list in sync |
| README | ✅ | `README.md` at repo root |

---

## Architecture Decisions

### Package naming
- Originally `@cinematic/core` → renamed to `cinematic-core` (unscoped)
- Reason: scoped npm packages require a matching org; unscoped removes that dependency
- Impact: CLI imports changed from `@cinematic/core` → `cinematic-core`

### Asset bundling strategy
- Templates + presets + prompts are **bundled inside the CLI package** at build time
- `copy-assets.mjs` runs before `tsup` → copies into `packages/cli/assets/`
- All CLI files resolve assets via: `resolve(fileURLToPath(import.meta.url), '..', '..', 'assets')`
- **Implication:** adding new templates requires a new CLI version publish (see Phase 2 notes)

### lucide-react version
- Template uses `^1.17.0` (not `^0.395.0`) — required for React 19 peer dep support
- Only icon used: `Check` in `Pricing.jsx`

---

## Published Packages

| Package | Version | npm URL |
|---------|---------|---------|
| `cinematic-web` | 0.1.0 | https://www.npmjs.com/package/cinematic-web |
| `cinematic-core` | 0.1.0 | https://www.npmjs.com/package/cinematic-core |

---

## Phase 1 Verification Results

```
✓ pnpm build (monorepo)
✓ verify-scaffold.mjs — all 6 presets, zero token leaks
✓ npm install && npm run build on scaffolded site
✓ CI: pnpm install --frozen-lockfile
✓ CI: Publish cinematic-core
✓ CI: Publish cinematic-web
✓ npx cinematic-web@0.1.0 --version → 0.1.0
```

---

## Adding New Templates (for future reference)

Templates are bundled at build time. Adding a new template requires:
1. Add `templates/<name>/` folder with full Vite project
2. Add matching `presets/<name>/preset.json` referencing `"template": "<name>"`
3. Bump version in `packages/cli/package.json` AND `packages/core/package.json`
4. `pnpm install` (update lockfile)
5. `git tag v<new-version> && git push origin v<new-version>` → CI auto-publishes

See `PHASE-2-PORTFOLIO.md` for the upcoming Industry Verticals template pack work.

---

## Known Issues / Tech Debt

- GitHub Actions using Node.js 20 (deprecation warning for 2026-09-16 — upgrade to v4 actions on Node 24 before then)
- `@studio-freight/lenis@1.0.42` deprecated warning in `templates/three-fiber` — monitor for replacement
- No automated tests yet (TDD adopted from Phase 2 onward)

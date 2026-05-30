# Phase 3 — SaaS: Cinematic Cloud

**Status: NOT STARTED**
**Target start: After Phase 2 complete (~Week 17)**
**Estimated effort: 12 weeks × 12h = 144h**

---

## Goal
Web app: 6 questions → live preview → one-click deploy. Recurring revenue + Turicks cross-sell engine.

---

## Deliverables Checklist

| Item | Status | Notes |
|------|--------|-------|
| `apps/cloud/` Next.js 15 SaaS app | ⬜ | |
| Clerk auth integration | ⬜ | Reuse bizsite-ai pattern |
| Supabase + Prisma DB | ⬜ | Project + Subscription tables |
| Stripe billing + webhooks | ⬜ | Reuse bizsite-ai pattern |
| 6-question onboarding flow | ⬜ | Mirrors CLI prompts |
| Sandpack live preview | ⬜ | Target: <60s to preview |
| ZIP export (free tier) | ⬜ | Downloads valid Vite project |
| GitHub push (paid tier) | ⬜ | Creates repo + commits |
| Vercel deploy (paid tier) | ⬜ | Returns live URL in <90s |
| `think` pipeline as side panel | ⬜ | PRD/MVP docs inline |
| Preset marketplace | ⬜ | Free + premium packs unlocked by tier |
| Turicks cross-sell button | ⬜ | "Generate landing page" in Turicks admin |
| Cinematic Cloud hosting | ⬜ | Top tier: host under customer subdomain |
| PostHog/Plausible analytics | ⬜ | Funnel: signup → project → export → upgrade |
| Resend email drip | ⬜ | Reuse bizsite-ai pattern |
| Load tested (50 concurrent) | ⬜ | |

---

## Timeline

| Weeks | Hours | Focus |
|-------|-------|-------|
| 17–19 | 36h | Next.js app + Clerk auth + Prisma DB + 6-question flow |
| 20–22 | 36h | LLM integration + Sandpack live preview + ZIP export |
| 23–25 | 36h | Stripe billing + GitHub push + Vercel deploy |
| 26–28 | 36h | Turicks cross-sell + analytics + launch |

---

## Architecture

### Monorepo addition
```
apps/cloud/
├── app/
│   ├── (auth)/          # Clerk-gated routes
│   ├── api/
│   │   ├── stripe/webhook/route.ts
│   │   ├── generate/route.ts       # calls cinematic-core + Claude
│   │   └── export/[type]/route.ts  # zip, github, vercel
│   ├── dashboard/page.tsx
│   ├── new/page.tsx                # 6-question onboarding
│   └── preview/[id]/page.tsx       # Sandpack iframe
├── lib/
│   ├── claude.ts                   # @anthropic-ai/sdk wrapper
│   ├── sandpack.ts                 # Sandpack config builder
│   └── linkedin-mcp-client.ts      # Turicks cross-sell MCP caller
├── prisma/schema.prisma
└── package.json
```

### Key: `cinematic-core` stays the single source of truth
`apps/cloud` imports the same `cinematic-core` package the CLI uses.
- Preset registry, token replacement, spec validation = identical in CLI and SaaS
- No duplicate business logic

### Sandpack vs StackBlitz SDK
- Decision deferred to Week 20 spike
- Sandpack preferred (no iframe cross-origin issues, better DX)
- StackBlitz fallback if Sandpack has bundler limitations with GSAP

---

## Pricing Tiers

| Tier | Price | Key Features |
|------|-------|-------------|
| Free | $0 | 1 project, ZIP export, watermark |
| Solo | $29/mo | Unlimited projects, GitHub push, all free presets |
| Pro | $79/mo | Premium packs included, Vercel deploy, priority |
| Agency | $499/yr | Multi-tenant, white-label, API access |
| Enterprise | Custom | SSO, custom presets, SLA |

---

## Turicks Cross-Sell (The Moat)

Every Turicks AI agent admin gets a "Generate landing page" button:
1. Pre-fills `brand` + `purpose` from agent config
2. Calls `apps/cloud` API → generates + deploys cinematic site
3. Site hosted under customer's Turicks subdomain
4. Turicks customers get 1 free Cinematic Cloud Pro seat (raises ACV without raising price)

Implementation: `lib/linkedin-mcp-client.ts` calls `linkedin_draft_post` after site generation.

---

## LinkedIn MCP Gateway (Parallel Track)

Ships alongside Phase 3. Lives in `~/Projects/linkedin-automation-tool/apps/mcp-gateway/`.

**Exposed tools:**
| Tool | Maps to |
|------|---------|
| `linkedin_draft_post` | `inngest.send("linkedin/draft.requested")` |
| `linkedin_get_drafts` | DB query on `drafts` table |
| `linkedin_approve_draft` | `inngest.send("linkedin/draft.approved")` |
| `linkedin_get_campaign_stats` | `getRecentLinkedInPosts()` + engagement_signals |
| `linkedin_create_outreach` | `inngest.send("linkedin/outreach.requested")` |

Architecture constraints (DO NOT VIOLATE):
- `apps/mcp-gateway` fires `inngest.send()` ONLY — never calls `packages/agents/*` directly
- Every call passes `entity_id = tenantId` through to Composio
- No `MemorySaver` — use PostgresSaver if state needed
- MCP gateway is stateless

---

## Reuse from `bizsite-ai`

| Pattern | Use for |
|---------|---------|
| Clerk auth wiring | `apps/cloud` auth |
| Prisma schema layout | Project + Subscription tables |
| Stripe webhook handler | `app/api/stripe/webhook/route.ts` |
| `@langchain/anthropic` LLM wrapper | `lib/claude.ts` |
| Resend email patterns | Drip campaigns |

---

## Phase 3 Success Criteria

1. New user signup → 6-question flow → live preview in <60s
2. Stripe webhook fires on subscription → immediate access granted
3. ZIP export downloads valid Vite project that builds and runs
4. GitHub push creates working repo
5. Vercel deploy returns live URL in <90s
6. Load test: 50 concurrent generations succeed
7. Turicks admin → "Generate landing page" → deploys under customer subdomain

---

## Revenue Targets

| Source | Year-1 Target |
|--------|---------------|
| SaaS subscriptions | $180K (250 paying × $30 avg × 12) |
| Agency / white-label | $50K (10 deals × $5K) |
| Turicks cross-sell uplift | $100K+ (bundled with agent deals) |

---

## Open Questions (decide before Phase 3 starts)

- [ ] Sandpack vs StackBlitz SDK — spike in Week 20
- [ ] `bizsite-ai` fold-in as Phase 4? (auto-discover business → auto-generate site → cold email)
- [ ] Self-hosted Vercel integration vs using Vercel Deploy API?
- [ ] Domain strategy: `cloud.cinematic.dev`?
- [ ] LinkedIn MCP timeline: confirm parallel with Weeks 23–28

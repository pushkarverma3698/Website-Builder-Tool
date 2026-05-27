# Turicks AI — 3D Immersive Marketing Site

**Date:** 2026-05-27  
**Project:** website-builder-tool / examples/turicks-3d/  
**Purpose:** Reference implementation demonstrating the 3D Immersive preset (Preset F) from the Cinematic Website Builder toolkit. Doubles as a real Turicks AI landing page.

---

## 1. Architecture Decision: Hybrid Canvas + Overlay HTML

**Chosen approach:** Fixed fullscreen R3F canvas as background layer. Standard React DOM sections scroll over it. GSAP ScrollTrigger syncs scroll position to 3D camera position and particle state.

**Rejected alternatives:**
- Pure R3F canvas (`<Html>` billboards) — unacceptable mobile GPU risk with 1000+ InstancedMesh nodes; accessibility/SEO significantly harder
- Per-section embedded canvases — not cinematic, no scroll journey, multiple WebGL contexts

**Rationale:** Industry standard pattern (Lusion.co, Bruno Simon, Awwwards winners). Degrades gracefully if WebGL unavailable — HTML sections remain fully readable. SEO-friendly.

---

## 2. Scene Breakdown

Six acts driven by a single GSAP ScrollTrigger timeline (0%–100% page scroll).

| % Scroll | Scene | Camera | 3D State | HTML Content |
|----------|-------|--------|----------|--------------|
| 0–16% | **The Network Awakens** | Pull back from single node → 1000-node graph | InstancedMesh spawns, purple glow, CatmullRomCurve3 fly-in | "LinkedIn automation, reimagined" + subtitle |
| 16–33% | **The Old Way** | Static wide shot | Nodes gray/disconnected, red failure particles drift down | "Manual outreach. 2% reply rates. Burned connections." |
| 33–50% | **The Turicks Effect** | Tighten on network center | Nodes light green sequentially, cyan connection beams | 3 value props: Personalized at scale / 48h replies / Warm connections |
| 50–66% | **How It Works** | Fly through 3 labeled nodes via CatmullRomCurve3 | Each node pulses as camera passes (Analyze → Craft → Send) | Step labels + one-line descriptions |
| 66–83% | **Social Proof** | Slow auto-rotate nebula drift | Floating Html billboard cards (drei) | 3 testimonials + metrics: 500+ users, 8.4% reply rate |
| 83–100% | **The CTA** | Fast pull-back, full network | Particle explosion outward, network pulses bright | "Ready to automate your outreach?" + CTA button |

---

## 3. Component Architecture

```
examples/turicks-3d/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                    # React root, Lenis init
    ├── App.jsx                     # Layout: Canvas layer + HTML scroll sections
    ├── components/
    │   ├── Scene.jsx               # R3F Canvas wrapper, ScrollTrigger wiring
    │   ├── NetworkGraph.jsx        # InstancedMesh 1000 nodes + connection lines
    │   ├── CameraRig.jsx           # CatmullRomCurve3 path, scroll-driven position
    │   ├── ParticleSystem.jsx      # Reusable particle field (failure/explosion states)
    │   └── Navbar.jsx              # Fixed pill navbar (standard DOM)
    └── sections/
        ├── Hero.jsx                # Scene 1 HTML overlay (DOM layer)
        ├── TheOldWay.jsx           # Scene 2 HTML overlay (DOM layer)
        ├── TuricksEffect.jsx       # Scene 3 HTML overlay (DOM layer)
        ├── HowItWorks.jsx          # Scene 4 HTML overlay (DOM layer)
        ├── SocialProof.jsx         # Scene 5 HTML overlay (DOM layer)
        │                           # NOTE: testimonial billboard cards are drei <Html>
        │                           # components inside Scene.jsx (3D canvas layer),
        │                           # not in this file. This file only holds the
        │                           # scroll-position trigger + metrics bar.
        └── CTA.jsx                 # Scene 6 HTML overlay (DOM layer)
```

**Key principle:** HTML sections are `position: relative` in a tall scroll container (600vh). The R3F canvas is `position: fixed; inset: 0; z-index: 0`. HTML sections sit at `z-index: 10`.

---

## 4. Data Flow

```
Browser scroll position
    ↓
Lenis smooth scroll driver
    ↓
GSAP ScrollTrigger (single timeline, scrub: true)
    ↓ dispatches to
    ├── CameraRig (useRef progress 0–1 → CatmullRomCurve3.getPoint)
    ├── NetworkGraph (scene index → node color/opacity transitions)
    └── ParticleSystem (scene index → spawn/despawn particles)
```

**State management:** React context `SceneContext` holds `{ progress: number, sceneIndex: 0-5 }`. Updated once per RAF tick from ScrollTrigger onUpdate. No Redux/Zustand needed.

---

## 5. 3D Technical Spec

### Color Palette (Three.js format)
```js
const COLORS = {
  background:  0x0A0A14,
  node:        0x7B61FF,   // purple — inactive node
  nodeGlow:    0xA78BFA,   // light purple — active node
  connection:  0x22D3EE,   // cyan — connection beam
  success:     0x10B981,   // green — Turicks effect
  danger:      0xEF4444,   // red — "the old way" particles
  nodeDark:    0x2A2A3A,   // dark gray — disconnected node
}
```

### InstancedMesh node layout
- 1000 nodes distributed via Fibonacci sphere algorithm (even distribution)
- Radius: 8 units
- Node size: 0.06 units base, 0.12 units for "hub" nodes (every 50th)
- Connection lines: `LineSegments` with `BufferGeometry`, max 3000 line pairs

### Camera path (CatmullRomCurve3)
```js
// 7 control points, one per scene transition + start/end
const cameraPath = new CatmullRomCurve3([
  new Vector3(0, 0, 20),    // Scene 1 start: far out
  new Vector3(0, 2, 12),    // Scene 1 end: network revealed
  new Vector3(-3, 0, 10),   // Scene 2: wide shot left
  new Vector3(0, -1, 7),    // Scene 3: tight center
  new Vector3(2, 1, 5),     // Scene 4: inside the network
  new Vector3(-2, 3, 9),    // Scene 5: nebula drift angle
  new Vector3(0, 0, 18),    // Scene 6: pull-back reveal
])
```

### Performance targets
- 60fps desktop (Chrome/Safari)
- 30fps minimum on mobile (iPhone 12+)
- `pixelRatio: Math.min(window.devicePixelRatio, 2)` — no 3x on retina
- Bloom post-processing: desktop only (detect via `navigator.hardwareConcurrency < 4` for mobile disable)

---

## 6. Dependencies

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@react-three/fiber": "^8.17.0",
    "@react-three/drei": "^9.109.0",
    "@react-three/postprocessing": "^2.16.0",
    "three": "^0.167.0",
    "gsap": "^3.12.5",
    "@studio-freight/lenis": "^1.0.42",
    "tailwindcss": "^3.4.17"
  },
  "devDependencies": {
    "vite": "^5.4.0",
    "@vitejs/plugin-react": "^4.3.0"
  }
}
```

---

## 7. Error Handling & Fallbacks

- **WebGL unavailable:** Detect with `WebGLRenderingContext` check before mounting Canvas. Show static gradient background with HTML sections fully readable.
- **Low-end mobile:** If `navigator.hardwareConcurrency <= 2`, reduce node count to 200, disable Bloom, disable particle system.
- **Canvas crash:** `ErrorBoundary` around `<Canvas>` — falls back to static background, all HTML sections still visible.

---

## 8. Content (Turicks copy)

**Headline (Scene 1):** "LinkedIn outreach, on autopilot"  
**Subheadline:** "Turicks sends personalized connection requests and follow-ups at scale — so you book meetings without burning your network."

**Value props (Scene 3):**
1. Personalized at scale — Every message tailored to the prospect's profile and activity
2. 8.4% reply rate — 4× industry average, because it reads like a human wrote it
3. Never get flagged — Smart pacing and send limits keep your LinkedIn account safe

**Steps (Scene 4):**
1. **Analyze** — Turicks reads the prospect's recent posts and profile
2. **Craft** — Generates a personalized message with your voice
3. **Send** — Delivers with human-like timing and follows up automatically

**Social proof (Scene 5):**
- "Booked 12 calls in the first week. My old outreach got maybe 2 a month." — Priya K., Founder
- "Finally an AI tool that doesn't sound like an AI." — Marcus T., Sales Lead  
- "I've tried everything. Turicks is the only one that actually works." — Alex M., Consultant
- Metrics: 500+ users · 8.4% avg reply rate · 50K+ messages sent

**CTA (Scene 6):** "Start your free trial" → /signup

---

## 9. Output Location

`/Users/pushkarverma/Projects/website-builder-tool/examples/turicks-3d/`

Committed to the website-builder-tool repo. Serves as the reference example for Preset F (3D Immersive).

---

## 10. Out of Scope

- Backend / actual Turicks API integration
- Authentication / account creation flows
- Analytics / tracking
- i18n
- Pricing page (separate concern)

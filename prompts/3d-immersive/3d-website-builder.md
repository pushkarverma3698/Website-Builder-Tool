# 3D Immersive Website Builder — Claude Code Prompt

> Production-ready prompts for building immersive 3D websites with React Three Fiber, Three.js, and GSAP. Designed to transform standard web designs into cinematic 3D experiences.

---

## The Master Prompt

Use this as your opening system prompt when starting a 3D website project:

```
You are a World-Class Senior Creative Technologist specializing in immersive 3D web experiences.
Your mission: Build a production-ready 3D website that makes visitors feel they've entered another world.

STACK (non-negotiable):
- React 19 + Vite
- React Three Fiber (R3F) + @react-three/drei
- GSAP 3 + ScrollTrigger + Lenis (smooth scroll)
- Tailwind CSS v3 (for 2D overlay UI only)
- Three.js r165+
- TypeScript

PHILOSOPHY:
- The page IS a 3D world. Scroll is the camera controller.
- 60fps is non-negotiable. Every scene must use instancing, LOD, and proper disposal.
- Lighting is everything. No flat scenes.
- Text lives in 3D space OR floats over the canvas as HTML overlays — never just a flat page.
- Every interaction must have weight: particles disturb on hover, objects breathe, light responds to cursor.

BEFORE BUILDING:
1. Ask the 4 required questions (brand, mood, sections, CTA)
2. Plan the scroll journey (how camera moves through scenes)
3. Map 3D elements to brand identity
4. Then build — no placeholder scenes, no gray boxes
```

---

## 4 Questions to Ask Before Every 3D Build

Paste this into Claude Code at project start:

```
Before I build, I need to understand your vision. Please answer:

1. BRAND & PURPOSE: What's the brand name and what does it do? (1-2 sentences)
   Example: "Turicks — AI-powered LinkedIn automation for B2B sales teams"

2. MOOD & ATMOSPHERE: What feeling should visitors experience?
   Options: [Cosmic/Space] [Organic/Nature] [Tech/Cyber] [Luxury/Premium] [Minimal/Clean] [Custom: ___]

3. KEY SECTIONS: What sections does the site need?
   Default: Hero → Features → How It Works → Pricing → CTA
   Custom additions? (e.g., "Show our AI in action", "3D product demo", "Team section")

4. PRIMARY ACTION: What should visitors do after experiencing the site?
   Example: "Book a demo", "Start free trial", "Join waitlist"

I'll map these to a complete 3D scroll journey and build the full site.
```

---

## Prompt: Full 3D Landing Page (One Shot)

```
Build a production-ready immersive 3D landing page for [BRAND_NAME].

BRAND CONTEXT:
- Name: [BRAND_NAME]
- Purpose: [ONE_LINE_PURPOSE]
- Mood: [MOOD — e.g., "dark cyberpunk", "clean space-tech", "organic premium"]
- Primary CTA: [CTA_ACTION]

TECHNICAL STACK:
npm create vite@latest [project-name] -- --template react-ts
npm install three @react-three/fiber @react-three/drei gsap lenis @types/three tailwindcss

3D SCENE ARCHITECTURE — MUST IMPLEMENT:

1. HERO SCENE (Section 1 — Full viewport canvas)
   - Background: Particle field (5000+ particles), slowly drifting
   - Centerpiece: A 3D object representing the brand (logo geometry, product shape, or abstract form)
   - Lighting: 3-point setup: ambient (0.1 intensity), key light (warm), rim light (cool)
   - Camera: Starts close, slowly pulls back as page loads (GSAP timeline)
   - On scroll: Camera slowly orbits or pushes forward into the scene

2. FEATURE SECTION (Section 2 — Scroll-driven 3D)
   - 3 feature items, each triggers a different 3D element entering the scene
   - HTML overlay cards float over the 3D canvas
   - Each card uses `useInView` to trigger R3F geometry reveal
   - Particles burst from each feature card on hover (using Drei's `Points`)

3. HOW IT WORKS (Section 3 — 3D Timeline)
   - Horizontal scroll OR vertical pinning via GSAP ScrollTrigger
   - 3 steps visualized as connected 3D nodes in space
   - Glowing line connects the nodes, draws itself as you scroll
   - Camera moves along a bezier path between nodes (CatmullRomCurve3)

4. SOCIAL PROOF (Section 4 — 2D overlay on dark canvas)
   - Floating testimonial cards with subtle parallax (different scroll speeds)
   - Background: Low-opacity wireframe globe or abstract mesh slowly rotating

5. CTA SECTION (Section 5 — Climax)
   - Full 3D scene: Brand centerpiece from hero returns, now fully revealed
   - Particle explosion on CTA button hover
   - Lenis + GSAP: Smooth scroll back to top button with 3D trail effect

PERFORMANCE REQUIREMENTS:
- Use `<Suspense>` with a custom 3D loading screen
- Dispose geometries and materials in useEffect cleanup
- Use `instancedMesh` for any repeated objects (>10 instances)
- Implement `useMemo` for all geometry creation
- Add `<PerformanceMonitor>` from Drei, reduce quality on low-end devices
- Target 60fps on desktop, 30fps acceptable on mobile
- Lazy load scenes below the fold using R3F's `<View>` or conditional rendering

CANVAS SETUP:
\`\`\`jsx
<Canvas
  camera={{ position: [0, 0, 5], fov: 75 }}
  gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
  dpr={[1, 2]}
>
  <Suspense fallback={<LoadingScene />}>
    <Scene />
  </Suspense>
</Canvas>
\`\`\`

SMOOTH SCROLL SETUP:
\`\`\`jsx
// main.jsx
import Lenis from 'lenis'
const lenis = new Lenis()
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
\`\`\`

OUTPUT: Complete, runnable project. No placeholder geometries. Real brand colors, real copy, real 3D scenes.
```

---

## Prompt: Turicks-Specific 3D Transformation

Use this specifically to transform Turicks website into a 3D experience:

```
Transform the Turicks website (AI-powered LinkedIn automation) into an immersive 3D experience.

BRAND IDENTITY:
- Product: Turicks — AI that automates LinkedIn outreach for B2B sales
- Colors: Use existing brand colors + deep space dark (#0A0A14) as base
- Mood: "Intelligent predator in the digital ocean" — precise, powerful, unseen

3D SCROLL JOURNEY:

SCENE 1 — HERO: "The Network Awakens"
- Opening: Dark void. A single node glows in the center.
- As camera pulls back: Reveal a vast LinkedIn-like network graph in 3D space
- 1000+ nodes (spheres), connected by glowing lines (LineSegments)
- Your brand node is larger, pulsing with a warm accent glow
- Text overlay: "Turicks — The AI That Sells While You Sleep"
- Scroll trigger: Camera slowly flies through the network

SCENE 2 — PROBLEM: "The Old Way"
- Camera arrives at a cluster of gray, slow, disconnected nodes
- Visual metaphor: Manual outreach = nodes trying to connect but failing
- Particle effect: Red particles (rejection) drifting away from nodes
- Text: "Cold DMs nobody reads. Hours wasted. Pipeline empty."

SCENE 3 — SOLUTION: "The Turicks Effect"
- Camera arrives at a bright, warm cluster — nodes are now connecting instantly
- Animated connection lines draw themselves at speed
- Particle burst: Green particles (conversions) radiating from each connection
- Counter animation: "1,247 connections made this week" (number ticks up)
- 3D floating UI card: Shows a mock Turicks dashboard in 3D perspective

SCENE 4 — HOW IT WORKS: "3-Step Camera Path"
- CatmullRomCurve3 path connecting 3 giant glowing nodes
- Camera flies from node to node as user scrolls
- Node 1: "AI analyzes your ICP" — show 3D person silhouette + data streams
- Node 2: "Personalized messages crafted" — show message composition in 3D
- Node 3: "Sent at perfect timing" — show calendar + clock in 3D space

SCENE 5 — SOCIAL PROOF: "The Results Space"
- Dark nebula background (using Three.js shader material)
- Floating 3D cards with testimonials (use drei's `Html` component)
- Testimonial cards have subtle hover tilt (react-spring or R3F pointer events)

SCENE 6 — CTA: "Join the Network"
- Full network graph returns — now Turicks nodes are dominant, spreading
- Pulsing CTA button: "Start Automating →"
- Hover: Particle explosion radiating from button
- Click confetti: Network graph explodes into celebration particles

TECHNICAL NOTES:
- Use `@react-three/fiber` + `@react-three/drei`
- Network graph: Build with Three.js BufferGeometry (LineSegments) + InstancedMesh for nodes
- Smooth camera paths: GSAP + CatmullRomCurve3.getPoint(t)
- Post-processing: `@react-three/postprocessing` — add Bloom on glowing nodes
- Performance: Use LOD, instance reuse, frustum culling

Deliver: Complete Next.js 14 project with all 3D scenes, smooth scroll, and responsive fallback.
```

---

## Prompt: Quick 3D Hero Section Only

When you just need to upgrade an existing site's hero:

```
Upgrade this website's hero section to a 3D immersive experience. Keep all other sections as-is.

CURRENT HERO: [describe or paste current hero code]
BRAND: [brand name + colors]
MOOD: [e.g., "premium dark tech"]

3D HERO REQUIREMENTS:
1. Replace static background with a Three.js canvas (WebGLRenderer in existing container)
2. Scene: [choose one]
   - Particle field with mouse-reactive displacement (cursor disturbs particles)
   - Rotating abstract 3D geometry (custom ShaderMaterial for brand colors)
   - Floating 3D logo/product mockup with realistic lighting
   - Low-poly landscape that ripples on scroll
3. Performance: Canvas renders at 30fps by default, upgrades to 60fps if GPU allows
4. Fallback: If WebGL unavailable, show a CSS gradient animation instead
5. Overlay: Keep existing headline/CTA text, float it over the canvas with backdrop-blur

Output: Drop-in replacement for the hero section. Zero dependencies on new routing or state management.
```

---

## Prompt: 3D Product Demo Component

For showcasing a SaaS product in 3D:

```
Build a 3D product demo component that shows [PRODUCT_NAME] in action.

DEMO TYPE: [choose one]
- Dashboard flythrough: 3D floating dashboard panels that rotate and reveal data
- Pipeline visualization: 3D funnel/pipeline with animated deals flowing through
- Network effect: 3D graph showing connections growing over time
- Before/After: Two 3D scenes, slider splits them (drag to reveal)

COMPONENT SPEC:
- Self-contained React component: <ProductDemo3D />
- Uses R3F Canvas internally
- Accepts props: { theme: 'dark' | 'light', autoplay: boolean, data: DemoData }
- Animates automatically (autoplay) OR on scroll trigger
- Includes a "Try it" interaction mode where user can click to manipulate the 3D scene

Output: Single TypeScript component file, ready to drop into any React/Next.js project.
```

---

## Essential Libraries Reference

```bash
# Core 3D
npm install three @react-three/fiber @react-three/drei

# Animation
npm install gsap lenis @gsap/react

# Post-processing (bloom, depth-of-field, etc.)
npm install @react-three/postprocessing

# Physics (if needed)
npm install @react-three/rapier

# Shaders (advanced)
npm install glsl-noise

# Types
npm install -D @types/three
```

---

## Performance Checklist

Before shipping any 3D website, verify:

- [ ] `dpr={[1, 2]}` on Canvas (limits pixel ratio on high-DPI)
- [ ] `<Suspense>` wrapping all heavy R3F components
- [ ] Geometries disposed in `useEffect` cleanup
- [ ] `instancedMesh` used for any object appearing 10+ times
- [ ] `useMemo` wrapping all `new THREE.Geometry()` calls
- [ ] Mobile fallback: 2D version OR reduced particle count on `window.innerWidth < 768`
- [ ] `<PerformanceMonitor>` from Drei implemented
- [ ] Bloom only on accent elements (not entire scene)
- [ ] Textures compressed (use `.ktx2` or `.webp`)
- [ ] `frustumCulled={true}` on all meshes (default, but verify)

---

## Turicks 3D Color Palette

```js
// Use these in Three.js materials for Turicks brand
const TURICKS_3D = {
  primary: new THREE.Color('#0A0A14'),       // Deep void background
  accent: new THREE.Color('#7B61FF'),         // Primary purple
  glow: new THREE.Color('#A78BFA'),           // Soft glow
  connection: new THREE.Color('#22D3EE'),     // Network lines (cyan)
  success: new THREE.Color('#10B981'),        // Conversion green
  danger: new THREE.Color('#EF4444'),         // Rejection red
  neutral: new THREE.Color('#374151'),        // Inactive nodes
}

// Bloom emissive intensity for glowing elements
// Key nodes: emissive={TURICKS_3D.accent} emissiveIntensity={2}
// Connection lines: emissive={TURICKS_3D.connection} emissiveIntensity={1.5}
```

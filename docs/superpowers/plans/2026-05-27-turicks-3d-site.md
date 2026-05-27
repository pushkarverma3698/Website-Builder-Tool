# Turicks 3D Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 6-scene scroll-driven 3D marketing site for Turicks AI in `examples/turicks-3d/` that demonstrates Preset F (3D Immersive) of the website-builder-tool.

**Architecture:** Fixed fullscreen R3F canvas as background layer (z-index 0). Standard React DOM sections (600vh tall container) scroll over it at z-index 10. A single GSAP ScrollTrigger timeline drives `SceneContext.progress` (0–1) which CameraRig and NetworkGraph consume each RAF tick to update camera position and node states.

**Tech Stack:** React 19, Vite 5, Three.js 0.167, @react-three/fiber 8, @react-three/drei 9, @react-three/postprocessing 2, GSAP 3 + ScrollTrigger, @studio-freight/lenis, Tailwind CSS 3.4.17

---

## File Map

```
examples/turicks-3d/
├── index.html                          # Vite entry — Google Fonts (Sora), dark bg color
├── package.json                        # All deps pinned
├── vite.config.js                      # @vitejs/plugin-react
├── tailwind.config.js                  # Content paths, extend with custom colors
├── postcss.config.js                   # tailwindcss, autoprefixer
└── src/
    ├── main.jsx                        # ReactDOM.createRoot, Lenis init + GSAP ticker
    ├── App.jsx                         # Layout: fixed Canvas + 600vh scroll container
    ├── index.css                       # Tailwind directives + noise overlay + utilities
    ├── context/
    │   └── SceneContext.jsx            # { progress: 0-1, sceneIndex: 0-5 } + provider
    ├── components/
    │   ├── Scene.jsx                   # <Canvas> wrapper, postprocessing, children
    │   ├── NetworkGraph.jsx            # InstancedMesh 1000 nodes + LineSegments connections
    │   ├── CameraRig.jsx               # CatmullRomCurve3 + useFrame scroll-driven position
    │   ├── ParticleSystem.jsx          # Reusable particles — "danger" (red) and "success" (explosion)
    │   └── SocialProofBillboards.jsx   # drei <Html> testimonial cards inside canvas
    └── sections/
        ├── Hero.jsx          # Scene 1 HTML: headline + subtitle
        ├── TheOldWay.jsx     # Scene 2 HTML: pain points
        ├── TuricksEffect.jsx # Scene 3 HTML: 3 value props
        ├── HowItWorks.jsx    # Scene 4 HTML: 3 steps
        ├── SocialProof.jsx   # Scene 5 HTML: metrics bar (billboards are in canvas)
        └── CTA.jsx           # Scene 6 HTML: headline + CTA button
```

---

## Task 1: Scaffold project

**Files:**
- Create: `examples/turicks-3d/` (directory + all config files)

- [ ] **1.1 Create project with Vite**

```bash
cd /Users/pushkarverma/Projects/website-builder-tool
mkdir -p examples
npm create vite@latest examples/turicks-3d -- --template react
cd examples/turicks-3d
```

- [ ] **1.2 Install all dependencies**

```bash
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing gsap @studio-freight/lenis
npm install -D tailwindcss@3.4.17 postcss autoprefixer
npx tailwindcss init -p
```

- [ ] **1.3 Write `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void:    '#0A0A14',
        purple:  '#7B61FF',
        glow:    '#A78BFA',
        cyan:    '#22D3EE',
        success: '#10B981',
        danger:  '#EF4444',
        node:    '#2A2A3A',
      },
      fontFamily: {
        sans: ['Sora', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

- [ ] **1.4 Write `index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Turicks — LinkedIn Outreach on Autopilot</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&display=swap" rel="stylesheet" />
    <style>html,body{margin:0;padding:0;background:#0A0A14;overflow-x:hidden;}</style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **1.5 Write `src/index.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Noise overlay — eliminates flat digital gradients */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
}

/* Scrollbar */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #0A0A14; }
::-webkit-scrollbar-thumb { background: #7B61FF; border-radius: 2px; }

/* Section visibility utility */
.scene-section {
  position: absolute;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  pointer-events: none;
}
.scene-section > * { pointer-events: auto; }
```

- [ ] **1.6 Verify scaffold compiles**

```bash
cd /Users/pushkarverma/Projects/website-builder-tool/examples/turicks-3d
npm run build 2>&1 | tail -5
```
Expected: no errors, `dist/` created.

- [ ] **1.7 Commit**

```bash
cd /Users/pushkarverma/Projects/website-builder-tool
git add examples/turicks-3d
git commit -m "feat: scaffold turicks-3d Vite project with all deps"
```

---

## Task 2: SceneContext + App shell

**Files:**
- Create: `src/context/SceneContext.jsx`
- Create: `src/main.jsx`
- Create: `src/App.jsx`

- [ ] **2.1 Write `src/context/SceneContext.jsx`**

```jsx
import { createContext, useContext, useState, useCallback } from 'react'

const SceneContext = createContext({ progress: 0, sceneIndex: 0, setProgress: () => {} })

export function SceneProvider({ children }) {
  const [progress, setProgressRaw] = useState(0)
  const [sceneIndex, setSceneIndex] = useState(0)

  const setProgress = useCallback((p) => {
    setProgressRaw(p)
    setSceneIndex(Math.min(5, Math.floor(p * 6)))
  }, [])

  return (
    <SceneContext.Provider value={{ progress, sceneIndex, setProgress }}>
      {children}
    </SceneContext.Provider>
  )
}

export const useScene = () => useContext(SceneContext)
```

- [ ] **2.2 Write `src/main.jsx`**

```jsx
import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './index.css'
import App from './App.jsx'

gsap.registerPlugin(ScrollTrigger)

// Lenis smooth scroll wired into GSAP ticker
const lenis = new Lenis()
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
lenis.on('scroll', ScrollTrigger.update)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

- [ ] **2.3 Write `src/App.jsx`**

```jsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SceneProvider, useScene } from './context/SceneContext'
import Scene from './components/Scene'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import TheOldWay from './sections/TheOldWay'
import TuricksEffect from './sections/TuricksEffect'
import HowItWorks from './sections/HowItWorks'
import SocialProof from './sections/SocialProof'
import CTA from './sections/CTA'

// Inner component so it can use useScene (which needs the Provider above)
function AppInner() {
  const containerRef = useRef(null)
  const { setProgress } = useScene()

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => setProgress(self.progress),
    })
    return () => trigger.kill()
  }, [setProgress])

  // Scene section top offsets as % of 600vh
  // 6 scenes × 100vh each = 600vh total
  const SCENE_TOPS = ['0vh', '100vh', '200vh', '300vh', '400vh', '500vh']

  return (
    <>
      {/* Fixed 3D canvas — background layer */}
      <div className="fixed inset-0 z-0">
        <Scene />
      </div>

      {/* Navbar — above canvas */}
      <Navbar />

      {/* Scroll container — 600vh tall, sections positioned inside */}
      <div ref={containerRef} className="relative" style={{ height: '600vh' }}>
        <Hero     style={{ top: SCENE_TOPS[0] }} />
        <TheOldWay     style={{ top: SCENE_TOPS[1] }} />
        <TuricksEffect style={{ top: SCENE_TOPS[2] }} />
        <HowItWorks    style={{ top: SCENE_TOPS[3] }} />
        <SocialProof   style={{ top: SCENE_TOPS[4] }} />
        <CTA           style={{ top: SCENE_TOPS[5] }} />
      </div>
    </>
  )
}

export default function App() {
  return (
    <SceneProvider>
      <AppInner />
    </SceneProvider>
  )
}
```

- [ ] **2.4 Verify dev server starts with no console errors**

```bash
cd /Users/pushkarverma/Projects/website-builder-tool/examples/turicks-3d
npm run dev &
sleep 3
curl -s http://localhost:5173 | grep -c "root"
```
Expected: `1` (root div present).

- [ ] **2.5 Commit**

```bash
cd /Users/pushkarverma/Projects/website-builder-tool
git add examples/turicks-3d/src
git commit -m "feat: add SceneContext + App shell with 600vh scroll container"
```

---

## Task 3: Scene canvas wrapper

**Files:**
- Create: `src/components/Scene.jsx`

- [ ] **3.1 Write `src/components/Scene.jsx`**

```jsx
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import NetworkGraph from './NetworkGraph'
import CameraRig from './CameraRig'
import ParticleSystem from './ParticleSystem'
import SocialProofBillboards from './SocialProofBillboards'

// Detect low-end device: disable Bloom + reduce nodes
const isLowEnd = typeof navigator !== 'undefined' && navigator.hardwareConcurrency <= 2

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 60, near: 0.1, far: 100 }}
      gl={{ antialias: !isLowEnd, alpha: false }}
      dpr={[1, isLowEnd ? 1 : 2]}
      style={{ background: '#0A0A14' }}
    >
      <fog attach="fog" args={['#0A0A14', 20, 60]} />
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 10]} intensity={1.5} color="#7B61FF" />

      <CameraRig />
      <NetworkGraph lowEnd={isLowEnd} />
      <ParticleSystem />
      <SocialProofBillboards />

      {!isLowEnd && (
        <EffectComposer>
          <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.9} intensity={0.8} />
        </EffectComposer>
      )}

      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </Canvas>
  )
}
```

- [ ] **3.2 Create empty placeholder stubs for all components so Scene.jsx compiles**

Create `src/components/NetworkGraph.jsx`:
```jsx
export default function NetworkGraph() { return null }
```

Create `src/components/CameraRig.jsx`:
```jsx
export default function CameraRig() { return null }
```

Create `src/components/ParticleSystem.jsx`:
```jsx
export default function ParticleSystem() { return null }
```

Create `src/components/SocialProofBillboards.jsx`:
```jsx
export default function SocialProofBillboards() { return null }
```

Create `src/sections/Navbar.jsx`:
```jsx
export default function Navbar() { return null }
```

Create all 6 section stubs (`Hero.jsx`, `TheOldWay.jsx`, `TuricksEffect.jsx`, `HowItWorks.jsx`, `SocialProof.jsx`, `CTA.jsx`):
```jsx
// Repeat for each — change component name
export default function Hero({ style }) {
  return <div className="scene-section" style={style} />
}
```

- [ ] **3.3 Verify Canvas renders (black screen is fine at this point)**

Visit `http://localhost:5173` — expect black/dark page with no console errors.

- [ ] **3.4 Commit**

```bash
cd /Users/pushkarverma/Projects/website-builder-tool
git add examples/turicks-3d/src/components examples/turicks-3d/src/sections
git commit -m "feat: add Scene canvas wrapper + stub components"
```

---

## Task 4: NetworkGraph — 1000-node InstancedMesh

**Files:**
- Modify: `src/components/NetworkGraph.jsx`

- [ ] **4.1 Write full `src/components/NetworkGraph.jsx`**

```jsx
import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useScene } from '../context/SceneContext'

const NODE_COLORS = {
  idle:       new THREE.Color(0x7B61FF),
  dark:       new THREE.Color(0x2A2A3A),
  success:    new THREE.Color(0x10B981),
  glow:       new THREE.Color(0xA78BFA),
}

// Fibonacci sphere — evenly distributes N points on a sphere surface
function fibonacciSphere(count, radius) {
  const positions = []
  const phi = Math.PI * (Math.sqrt(5) - 1)
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = phi * i
    positions.push(new THREE.Vector3(
      Math.cos(theta) * r * radius,
      y * radius,
      Math.sin(theta) * r * radius
    ))
  }
  return positions
}

// Build connection pairs (nearest N neighbours per node, capped at maxPairs)
function buildConnections(positions, maxPairs = 2000) {
  const pairs = []
  const subset = positions.slice(0, 200) // only connect first 200 for perf
  for (let i = 0; i < subset.length && pairs.length < maxPairs; i++) {
    for (let j = i + 1; j < subset.length && pairs.length < maxPairs; j++) {
      if (positions[i].distanceTo(positions[j]) < 2.5) {
        pairs.push(i, j)
      }
    }
  }
  return pairs
}

export default function NetworkGraph({ lowEnd = false }) {
  const COUNT = lowEnd ? 200 : 1000
  const meshRef = useRef()
  const linesRef = useRef()
  const { sceneIndex } = useScene()

  const { positions, connectionPairs } = useMemo(() => {
    const pos = fibonacciSphere(COUNT, 8)
    const pairs = buildConnections(pos)
    return { positions: pos, connectionPairs: pairs }
  }, [COUNT])

  // Set initial instance matrices
  useEffect(() => {
    if (!meshRef.current) return
    const dummy = new THREE.Object3D()
    positions.forEach((pos, i) => {
      dummy.position.copy(pos)
      const isHub = i % 50 === 0
      const scale = isHub ? 0.12 : 0.06
      dummy.scale.setScalar(scale)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [positions])

  // Build connection line geometry
  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const verts = []
    for (let k = 0; k < connectionPairs.length; k += 2) {
      const a = positions[connectionPairs[k]]
      const b = positions[connectionPairs[k + 1]]
      if (a && b) {
        verts.push(a.x, a.y, a.z, b.x, b.y, b.z)
      }
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3))
    return geo
  }, [positions, connectionPairs])

  // Scene-driven color transitions
  useFrame(() => {
    if (!meshRef.current) return
    const color = new THREE.Color()
    for (let i = 0; i < COUNT; i++) {
      if (sceneIndex === 1) {
        // Scene 2: gray disconnected
        color.copy(NODE_COLORS.dark)
      } else if (sceneIndex >= 2) {
        // Scene 3+: green success, stagger by index
        const activated = i < (sceneIndex - 1) * (COUNT / 4)
        color.copy(activated ? NODE_COLORS.success : NODE_COLORS.idle)
      } else {
        // Scene 0-1: normal purple
        color.copy(NODE_COLORS.idle)
      }
      meshRef.current.setColorAt(i, color)
    }
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true
    }
  })

  // Line opacity by scene
  const lineOpacity = sceneIndex === 1 ? 0.05 : sceneIndex >= 2 ? 0.4 : 0.2
  const lineColor = sceneIndex >= 2 ? '#22D3EE' : '#7B61FF'

  return (
    <group>
      <instancedMesh ref={meshRef} args={[null, null, COUNT]} frustumCulled={false}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial vertexColors />
      </instancedMesh>

      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color={lineColor}
          transparent
          opacity={lineOpacity}
        />
      </lineSegments>
    </group>
  )
}
```

- [ ] **4.2 Verify nodes appear**

Visit `http://localhost:5173` — expect purple dot-cloud visible against dark background.

- [ ] **4.3 Commit**

```bash
cd /Users/pushkarverma/Projects/website-builder-tool
git add examples/turicks-3d/src/components/NetworkGraph.jsx
git commit -m "feat: NetworkGraph InstancedMesh 1000 nodes + connection lines"
```

---

## Task 5: CameraRig — scroll-driven path

**Files:**
- Modify: `src/components/CameraRig.jsx`

- [ ] **5.1 Write full `src/components/CameraRig.jsx`**

```jsx
import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useScene } from '../context/SceneContext'

const CAMERA_PATH = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0,  0,  20),   // Scene 1 start: far back
  new THREE.Vector3(0,  2,  12),   // Scene 1 end: network revealed
  new THREE.Vector3(-3, 0,  10),   // Scene 2: wide shot
  new THREE.Vector3(0, -1,   7),   // Scene 3: tightens on center
  new THREE.Vector3(2,  1,   5),   // Scene 4: inside network
  new THREE.Vector3(-2, 3,   9),   // Scene 5: nebula angle
  new THREE.Vector3(0,  0,  18),   // Scene 6: full pull-back
], false, 'catmullrom', 0.5)

// Lookup target point slightly ahead on curve for camera.lookAt
const LOOK_TARGET = new THREE.Vector3()
const LOOK_OFFSET = 0.02

export default function CameraRig() {
  const { camera } = useThree()
  const { progress } = useScene()
  const smoothProgress = useRef(0)

  useFrame((_, delta) => {
    // Smooth the scroll progress for cinematic feel
    smoothProgress.current = THREE.MathUtils.lerp(
      smoothProgress.current,
      progress,
      Math.min(1, delta * 3)
    )

    const p = smoothProgress.current
    const ahead = Math.min(1, p + LOOK_OFFSET)

    CAMERA_PATH.getPoint(p, camera.position)
    CAMERA_PATH.getPoint(ahead, LOOK_TARGET)
    camera.lookAt(LOOK_TARGET)
  })

  return null
}
```

- [ ] **5.2 Verify camera moves on scroll**

Visit `http://localhost:5173`, scroll slowly — camera should pull back revealing the node cloud, then navigate through it.

- [ ] **5.3 Commit**

```bash
cd /Users/pushkarverma/Projects/website-builder-tool
git add examples/turicks-3d/src/components/CameraRig.jsx
git commit -m "feat: CameraRig scroll-driven CatmullRomCurve3 path"
```

---

## Task 6: ParticleSystem — danger + explosion states

**Files:**
- Modify: `src/components/ParticleSystem.jsx`

- [ ] **6.1 Write full `src/components/ParticleSystem.jsx`**

```jsx
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useScene } from '../context/SceneContext'

const PARTICLE_COUNT = 300

export default function ParticleSystem() {
  const ref = useRef()
  const { sceneIndex } = useScene()

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3)
    const vel = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Distribute within node cloud sphere
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 6 + Math.random() * 4
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
      vel.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        -0.01 - Math.random() * 0.02,  // drift downward for "failure"
        (Math.random() - 0.5) * 0.02
      ))
    }
    return { positions: pos, velocities: vel }
  }, [])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3))
    return geo
  }, [positions])

  useFrame(() => {
    if (!ref.current) return
    const pos = ref.current.geometry.attributes.position
    const isExplosion = sceneIndex === 5

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const v = velocities[i]
      if (isExplosion) {
        // Scene 6: explode outward
        pos.setXYZ(i,
          pos.getX(i) + v.x * 4,
          pos.getY(i) + v.y * 2,
          pos.getZ(i) + v.z * 4,
        )
        // Reset if too far
        if (Math.abs(pos.getX(i)) > 15) {
          pos.setXYZ(i,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
          )
        }
      } else {
        // Scenes 1-5: gentle drift
        pos.setXYZ(i,
          pos.getX(i) + v.x,
          pos.getY(i) + v.y,
          pos.getZ(i) + v.z,
        )
        // Wrap: if fell below -9, reset to top
        if (pos.getY(i) < -9) {
          pos.setY(i, 9)
        }
      }
    }
    pos.needsUpdate = true
  })

  // Only visible in scenes 1 (danger/red) and 5 (explosion/purple)
  const visible = sceneIndex === 1 || sceneIndex === 5
  const color   = sceneIndex === 1 ? '#EF4444' : '#A78BFA'

  return (
    <points ref={ref} geometry={geometry} visible={visible}>
      <pointsMaterial
        color={color}
        size={0.08}
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}
```

- [ ] **6.2 Commit**

```bash
cd /Users/pushkarverma/Projects/website-builder-tool
git add examples/turicks-3d/src/components/ParticleSystem.jsx
git commit -m "feat: ParticleSystem danger drift + explosion states"
```

---

## Task 7: SocialProofBillboards — drei Html cards

**Files:**
- Modify: `src/components/SocialProofBillboards.jsx`

- [ ] **7.1 Write full `src/components/SocialProofBillboards.jsx`**

```jsx
import { Html } from '@react-three/drei'
import { useScene } from '../context/SceneContext'

const TESTIMONIALS = [
  { text: "Booked 12 calls in the first week. My old outreach got maybe 2 a month.", author: "Priya K., Founder", position: [-4, 2, 2] },
  { text: "Finally an AI tool that doesn't sound like an AI.", author: "Marcus T., Sales Lead", position: [4, -1, 1] },
  { text: "I've tried everything. Turicks is the only one that actually works.", author: "Alex M., Consultant", position: [0, -3, 4] },
]

export default function SocialProofBillboards() {
  const { sceneIndex } = useScene()

  if (sceneIndex !== 4) return null

  return (
    <>
      {TESTIMONIALS.map((t, i) => (
        <Html
          key={i}
          position={t.position}
          center
          distanceFactor={8}
          style={{ pointerEvents: 'none' }}
        >
          <div style={{
            background: 'rgba(10,10,20,0.85)',
            border: '1px solid rgba(123,97,255,0.4)',
            borderRadius: '12px',
            padding: '16px 20px',
            width: '220px',
            backdropFilter: 'blur(12px)',
            color: '#e0e0ff',
            fontFamily: 'Sora, sans-serif',
            fontSize: '12px',
            lineHeight: 1.6,
          }}>
            <p style={{ margin: '0 0 8px', color: '#ccc' }}>"{t.text}"</p>
            <p style={{ margin: 0, color: '#7B61FF', fontWeight: 600, fontSize: '11px' }}>— {t.author}</p>
          </div>
        </Html>
      ))}
    </>
  )
}
```

- [ ] **7.2 Commit**

```bash
cd /Users/pushkarverma/Projects/website-builder-tool
git add examples/turicks-3d/src/components/SocialProofBillboards.jsx
git commit -m "feat: SocialProofBillboards drei Html testimonial cards"
```

---

## Task 8: HTML sections — all 6 scenes

**Files:**
- Modify: all files in `src/sections/`

- [ ] **8.1 Write `src/sections/Navbar.jsx`**

```jsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Navbar() {
  const ref = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, { y: -40, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.5 })
    })
    return () => ctx.revert()
  }, [])

  return (
    <nav
      ref={ref}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-8 px-6 py-3 rounded-full"
      style={{ background: 'rgba(10,10,20,0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(123,97,255,0.2)' }}
    >
      <span className="text-white font-bold tracking-wider text-sm">TURICKS</span>
      <div className="flex gap-6 text-sm text-gray-400">
        <a href="#" className="hover:text-purple transition-colors">How it works</a>
        <a href="#" className="hover:text-purple transition-colors">Pricing</a>
      </div>
      <a
        href="#"
        className="bg-purple text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-glow transition-all duration-200"
        style={{ transform: 'scale(1)' }}
        onMouseEnter={e => e.target.style.transform = 'scale(1.03)'}
        onMouseLeave={e => e.target.style.transform = 'scale(1)'}
      >
        Get started
      </a>
    </nav>
  )
}
```

- [ ] **8.2 Write `src/sections/Hero.jsx`**

```jsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Hero({ style }) {
  const ref = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current.children, {
        y: 40, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.8
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div className="scene-section" style={style}>
      <div ref={ref} className="max-w-3xl px-8 text-left" style={{ marginLeft: '-10vw' }}>
        <p className="text-purple text-sm font-semibold tracking-widest uppercase mb-4">
          LinkedIn Automation
        </p>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
          LinkedIn outreach,<br />
          <span className="text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(135deg, #7B61FF, #22D3EE)' }}>
            on autopilot.
          </span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-xl mb-8 leading-relaxed">
          Turicks sends personalized connection requests and follow-ups at scale —
          so you book meetings without burning your network.
        </p>
        <div className="flex gap-4">
          <a href="#"
            className="bg-purple text-white font-semibold px-8 py-4 rounded-full hover:bg-glow transition-all duration-200"
            style={{ boxShadow: '0 0 30px rgba(123,97,255,0.4)' }}>
            Start free trial
          </a>
          <a href="#" className="text-gray-400 font-medium px-8 py-4 rounded-full border border-gray-700 hover:border-purple hover:text-white transition-all duration-200">
            Watch demo
          </a>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **8.3 Write `src/sections/TheOldWay.jsx`**

```jsx
export default function TheOldWay({ style }) {
  return (
    <div className="scene-section" style={style}>
      <div className="max-w-2xl px-8 text-center">
        <p className="text-danger text-sm font-semibold tracking-widest uppercase mb-4">The old way</p>
        <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
          Manual outreach<br />is dead.
        </h2>
        <div className="flex flex-col gap-3 text-left max-w-sm mx-auto mt-8">
          {['2% average reply rate','Copy-paste messages that get ignored','Accounts flagged and restricted'].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-gray-500">
              <span className="text-danger text-lg">✕</span>
              <span className="text-lg">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **8.4 Write `src/sections/TuricksEffect.jsx`**

```jsx
const VALUE_PROPS = [
  { icon: '⚡', title: 'Personalized at scale', desc: 'Every message tailored to the prospect\'s recent posts and profile activity.' },
  { icon: '📬', title: '8.4% reply rate', desc: '4× industry average. It reads like a human wrote it — because the AI did.' },
  { icon: '🛡', title: 'Never get flagged', desc: 'Smart pacing and send limits keep your LinkedIn account safe automatically.' },
]

export default function TuricksEffect({ style }) {
  return (
    <div className="scene-section" style={style}>
      <div className="max-w-4xl px-8 w-full">
        <p className="text-success text-sm font-semibold tracking-widest uppercase mb-4 text-center">The Turicks effect</p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-12">
          Outreach that <span className="text-success">actually works.</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VALUE_PROPS.map((v, i) => (
            <div key={i}
              className="rounded-2xl p-6"
              style={{ background: 'rgba(10,10,20,0.7)', border: '1px solid rgba(16,185,129,0.2)', backdropFilter: 'blur(12px)' }}>
              <div className="text-3xl mb-3">{v.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2">{v.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **8.5 Write `src/sections/HowItWorks.jsx`**

```jsx
const STEPS = [
  { n: '01', title: 'Analyze', desc: 'Turicks reads the prospect\'s recent posts, profile, and mutual connections.' },
  { n: '02', title: 'Craft', desc: 'Generates a personalized message in your voice — never template-sounding.' },
  { n: '03', title: 'Send', desc: 'Delivers with human-like timing. Follows up automatically if no reply.' },
]

export default function HowItWorks({ style }) {
  return (
    <div className="scene-section" style={style}>
      <div className="max-w-3xl px-8 w-full">
        <p className="text-cyan text-sm font-semibold tracking-widest uppercase mb-4 text-center">How it works</p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-12">Three steps. Zero effort.</h2>
        <div className="flex flex-col gap-6">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-start gap-6"
              style={{ padding: '20px 24px', borderRadius: '16px', background: 'rgba(10,10,20,0.6)', border: '1px solid rgba(34,211,238,0.15)', backdropFilter: 'blur(10px)' }}>
              <span className="text-cyan font-mono font-bold text-2xl opacity-60 flex-shrink-0">{s.n}</span>
              <div>
                <h3 className="text-white font-bold text-xl mb-1">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **8.6 Write `src/sections/SocialProof.jsx`**

```jsx
const METRICS = [
  { value: '500+', label: 'Active users' },
  { value: '8.4%', label: 'Avg reply rate' },
  { value: '50K+', label: 'Messages sent' },
  { value: '4×',   label: 'Industry average' },
]

export default function SocialProof({ style }) {
  return (
    <div className="scene-section" style={style}>
      <div className="max-w-4xl px-8 w-full">
        <p className="text-glow text-sm font-semibold tracking-widest uppercase mb-8 text-center">Social proof</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {METRICS.map((m, i) => (
            <div key={i} className="text-center p-6 rounded-2xl"
              style={{ background: 'rgba(10,10,20,0.7)', border: '1px solid rgba(167,139,250,0.2)', backdropFilter: 'blur(12px)' }}>
              <div className="text-4xl font-extrabold text-white mb-1"
                style={{ background: 'linear-gradient(135deg, #7B61FF, #22D3EE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {m.value}
              </div>
              <div className="text-gray-400 text-sm">{m.label}</div>
            </div>
          ))}
        </div>
        <p className="text-gray-600 text-center text-sm mt-8">
          Testimonials float in the network above ↑
        </p>
      </div>
    </div>
  )
}
```

- [ ] **8.7 Write `src/sections/CTA.jsx`**

```jsx
export default function CTA({ style }) {
  return (
    <div className="scene-section" style={style}>
      <div className="max-w-2xl px-8 text-center">
        <h2 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
          Ready to automate<br />
          <span className="text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(135deg, #7B61FF, #22D3EE)' }}>
            your outreach?
          </span>
        </h2>
        <p className="text-gray-400 text-xl mb-10">
          Join 500+ founders and sales leaders already using Turicks.
        </p>
        <a
          href="#"
          className="inline-block bg-purple text-white font-bold text-xl px-12 py-5 rounded-full transition-all duration-200"
          style={{
            boxShadow: '0 0 60px rgba(123,97,255,0.5)',
          }}
          onMouseEnter={e => { e.target.style.transform = 'scale(1.03)'; e.target.style.boxShadow = '0 0 80px rgba(123,97,255,0.7)' }}
          onMouseLeave={e => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = '0 0 60px rgba(123,97,255,0.5)' }}
        >
          Start your free trial →
        </a>
        <p className="text-gray-600 text-sm mt-4">No credit card required · 14-day free trial</p>
      </div>
    </div>
  )
}
```

- [ ] **8.8 Commit all sections**

```bash
cd /Users/pushkarverma/Projects/website-builder-tool
git add examples/turicks-3d/src/sections
git commit -m "feat: all 6 HTML overlay sections with full copy"
```

---

## Task 9: Final wiring + dev preview

**Files:** No new files — verify everything works together

- [ ] **9.1 Run dev server and verify all 6 scenes**

```bash
cd /Users/pushkarverma/Projects/website-builder-tool/examples/turicks-3d
npm run dev
```

Check each scene by scrolling:
- Scene 1 (top): Purple node cloud awakens, hero headline visible
- Scene 2 (scroll 1/6): Nodes go gray, red particles drift, pain points visible
- Scene 3 (scroll 2/6): Nodes turn green sequentially, cyan beams, value props visible
- Scene 4 (scroll 3/6): Camera flies through 3 hub nodes, steps visible
- Scene 5 (scroll 4/6): Testimonial billboards visible in 3D, metrics bar below
- Scene 6 (scroll 5/6): Particle explosion, full network pulse, CTA visible

- [ ] **9.2 Run production build**

```bash
npm run build 2>&1 | tail -10
```
Expected: no errors, `dist/` generated.

- [ ] **9.3 Final commit**

```bash
cd /Users/pushkarverma/Projects/website-builder-tool
git add examples/turicks-3d
git commit -m "feat: complete Turicks 3D immersive site — examples/turicks-3d"
```

- [ ] **9.4 Push to GitHub**

```bash
git push origin main
```

---

## Self-Review Notes

- Spec section 5 (color palette) → Task 4 sets exact Three.js hex colors ✓
- Spec section 5 (camera path) → Task 5 CatmullRomCurve3 has 7 control points matching spec ✓
- Spec section 5 (performance targets) → Task 3 Scene.jsx uses `isLowEnd` flag, AdaptiveDpr ✓
- Spec section 7 (WebGL fallback) → Not yet implemented — add ErrorBoundary in Task 3 if blocking
- Spec section 3 (SocialProof DOM vs drei Html distinction) → SocialProofBillboards is in canvas layer (Task 7), SocialProof.jsx is DOM metrics (Task 8.6) ✓
- All component names consistent across tasks ✓

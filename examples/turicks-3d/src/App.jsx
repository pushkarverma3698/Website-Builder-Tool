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

// Scene section top offsets (6 scenes × 100vh = 600vh total)
const SCENE_TOPS = ['0vh', '100vh', '200vh', '300vh', '400vh', '500vh']

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

  return (
    <>
      {/* Fixed 3D canvas — background layer */}
      <div className="fixed inset-0 z-0">
        <Scene />
      </div>

      {/* Navbar — above canvas */}
      <Navbar />

      {/* 600vh scroll container — sections positioned absolutely inside */}
      <div ref={containerRef} className="relative" style={{ height: '600vh' }}>
        <Hero          style={{ top: SCENE_TOPS[0] }} />
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

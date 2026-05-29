import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import NetworkGraph from './NetworkGraph'
import CameraRig from './CameraRig'
import ParticleSystem from './ParticleSystem'
import SocialProofBillboards from './SocialProofBillboards'

// Detect low-end device: fewer nodes, no Bloom
const isLowEnd = typeof navigator !== 'undefined' && navigator.hardwareConcurrency <= 2

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 60, near: 0.1, far: 100 }}
      gl={{ antialias: !isLowEnd, alpha: false }}
      dpr={[1, isLowEnd ? 1 : 2]}
      style={{ background: '{{palette.background}}' }}
    >
      <fog attach="fog" args={['{{palette.background}}', 20, 60]} />
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 10]} intensity={1.5} color="{{palette.accent}}" />

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

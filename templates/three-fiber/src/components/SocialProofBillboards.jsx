import { Html } from '@react-three/drei'
import { useScene } from '../context/SceneContext'

const TESTIMONIALS = [
  {
    text: "{{brand}} delivered results in the first week. Nothing else came close.",
    author: "Priya K., Founder",
    position: [-4, 2, 2],
  },
  {
    text: "Finally a product that doesn't feel like every other AI tool out there.",
    author: "Marcus T., Director",
    position: [4, -1, 1],
  },
  {
    text: "I've tried everything. {{brand}} is the only one that actually works.",
    author: "Alex M., Consultant",
    position: [0, -3, 4],
  },
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
            border: '1px solid {{palette.accent}}66',
            borderRadius: '12px',
            padding: '16px 20px',
            width: '220px',
            backdropFilter: 'blur(12px)',
            color: '#e0e0ff',
            fontFamily: '{{typography.heading0}}, sans-serif',
            fontSize: '12px',
            lineHeight: 1.6,
          }}>
            <p style={{ margin: '0 0 8px', color: '#ccc' }}>"{t.text}"</p>
            <p style={{ margin: 0, color: '{{palette.accent}}', fontWeight: 600, fontSize: '11px' }}>— {t.author}</p>
          </div>
        </Html>
      ))}
    </>
  )
}

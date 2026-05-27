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
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 6 + Math.random() * 4
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
      vel.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        -0.01 - Math.random() * 0.02,  // drift downward (failure mode)
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
        pos.setXYZ(i,
          pos.getX(i) + v.x * 4,
          pos.getY(i) + v.y * 2,
          pos.getZ(i) + v.z * 4,
        )
        if (Math.abs(pos.getX(i)) > 15) {
          pos.setXYZ(i,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
          )
        }
      } else {
        pos.setXYZ(i,
          pos.getX(i) + v.x,
          pos.getY(i) + v.y,
          pos.getZ(i) + v.z,
        )
        if (pos.getY(i) < -9) pos.setY(i, 9)
      }
    }
    pos.needsUpdate = true
  })

  const visible = sceneIndex === 1 || sceneIndex === 5
  const color   = sceneIndex === 1 ? '#EF4444' : '#A78BFA'

  return (
    <points ref={ref} geometry={geometry} visible={visible}>
      <pointsMaterial color={color} size={0.08} transparent opacity={0.8} sizeAttenuation />
    </points>
  )
}

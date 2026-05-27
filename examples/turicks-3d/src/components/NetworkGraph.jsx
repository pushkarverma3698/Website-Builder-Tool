import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useScene } from '../context/SceneContext'

const NODE_COLORS = {
  idle:    new THREE.Color(0x7B61FF),
  dark:    new THREE.Color(0x2A2A3A),
  success: new THREE.Color(0x10B981),
  glow:    new THREE.Color(0xA78BFA),
}

// Fibonacci sphere — evenly distributes N points on sphere surface
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

// Build connection pairs (nodes within 2.5 units, capped at maxPairs)
function buildConnections(positions, maxPairs = 2000) {
  const pairs = []
  const subset = positions.slice(0, 200)
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
  const colorRef = useRef(new THREE.Color())

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
      dummy.scale.setScalar(isHub ? 0.12 : 0.06)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [positions])

  // Connection line geometry
  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const verts = []
    for (let k = 0; k < connectionPairs.length; k += 2) {
      const a = positions[connectionPairs[k]]
      const b = positions[connectionPairs[k + 1]]
      if (a && b) verts.push(a.x, a.y, a.z, b.x, b.y, b.z)
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3))
    return geo
  }, [positions, connectionPairs])

  // Scene-driven color transitions each frame
  useFrame(() => {
    if (!meshRef.current) return
    const c = colorRef.current
    for (let i = 0; i < COUNT; i++) {
      if (sceneIndex === 1) {
        c.copy(NODE_COLORS.dark)
      } else if (sceneIndex >= 2) {
        const activated = i < (sceneIndex - 1) * (COUNT / 4)
        c.copy(activated ? NODE_COLORS.success : NODE_COLORS.idle)
      } else {
        c.copy(NODE_COLORS.idle)
      }
      meshRef.current.setColorAt(i, c)
    }
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true
    }
  })

  const lineOpacity = sceneIndex === 1 ? 0.05 : sceneIndex >= 2 ? 0.4 : 0.2
  const lineColor   = sceneIndex >= 2 ? '#22D3EE' : '#7B61FF'

  return (
    <group>
      <instancedMesh ref={meshRef} args={[null, null, COUNT]} frustumCulled={false}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial vertexColors />
      </instancedMesh>

      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial color={lineColor} transparent opacity={lineOpacity} />
      </lineSegments>
    </group>
  )
}

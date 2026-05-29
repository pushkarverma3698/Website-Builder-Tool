import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useScene } from '../context/SceneContext'

// 7 control points: one per scene transition + start/end
const CAMERA_PATH = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0,  0,  20),   // Scene 1 start: far back
  new THREE.Vector3(0,  2,  12),   // Scene 1 end: network revealed
  new THREE.Vector3(-3, 0,  10),   // Scene 2: wide shot
  new THREE.Vector3(0, -1,   7),   // Scene 3: tight center
  new THREE.Vector3(2,  1,   5),   // Scene 4: inside network
  new THREE.Vector3(-2, 3,   9),   // Scene 5: nebula angle
  new THREE.Vector3(0,  0,  18),   // Scene 6: full pull-back
], false, 'catmullrom', 0.5)

const LOOK_TARGET = new THREE.Vector3()
const LOOK_OFFSET = 0.02

export default function CameraRig() {
  const { camera } = useThree()
  const { progress } = useScene()
  const smoothProgress = useRef(0)

  useFrame((_, delta) => {
    // Lerp scroll progress for cinematic smoothness
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

'use client'

import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

export default function AICore() {

  const core = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {

    const t = clock.getElapsedTime()

    if (core.current) {

      core.current.rotation.y = t * 0.3
      core.current.rotation.x = t * 0.1

      const scale = 1 + Math.sin(t * 2) * 0.1
      core.current.scale.set(scale, scale, scale)

    }

  })

  return (

    <mesh ref={core} position={[0,0,0]}>

      <sphereGeometry args={[0.9,64,64]} />

      <meshStandardMaterial
        color="#4f9cff"
        emissive="#4f9cff"
        emissiveIntensity={2}
      />

    </mesh>

  )

}
'use client'

import { Points } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'

export default function Starfield() {

  const texture = new THREE.TextureLoader().load(
    "https://threejs.org/examples/textures/sprites/disc.png"
  )

  const stars = useMemo(() => {

    const count = 12000
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {

      positions[i * 3] = (Math.random() - 0.5) * 800
      positions[i * 3 + 1] = (Math.random() - 0.5) * 400
      positions[i * 3 + 2] = (Math.random() - 0.5) * 800

    }

    return positions

  }, [])

  return (

    <Points positions={stars} stride={3}>

      <pointsMaterial
        map={texture}
        color="#60a5fa"
        size={0.12}
        sizeAttenuation
        transparent
        depthWrite={false}
      />

    </Points>

  )

}
'use client'

import { useFrame } from '@react-three/fiber'
import { Trail } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

export default function Comet() {

  const comet = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {

    const t = clock.getElapsedTime()

    if (comet.current) {

      comet.current.position.x = Math.sin(t * 0.8) * 14
      comet.current.position.z = Math.cos(t * 0.8) * 14
      comet.current.position.y = Math.sin(t * 0.4) * 4

    }

  })

  return (

    <Trail
      width={0.6}
      length={6}
      color="#4f9cff"
      attenuation={(t) => t * t}
    >

      <mesh ref={comet}>

        <sphereGeometry args={[0.2,16,16]} />

        <meshBasicMaterial color="#ffffff" />

      </mesh>

    </Trail>

  )

}
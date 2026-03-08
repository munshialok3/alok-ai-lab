'use client'

import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

export default function NeuralBeam({ start, end }: any) {

  const line = useRef<THREE.Line>(null!)
  const pulse = useRef<THREE.Mesh>(null!)

  const startVec = new THREE.Vector3(...start)
  const endVec = new THREE.Vector3(...end)

  const points = [startVec, endVec]

  const geometry = new THREE.BufferGeometry().setFromPoints(points)

  useFrame(({ clock }) => {

    const t = clock.getElapsedTime()

    if (pulse.current) {

      const progress = (Math.sin(t * 1.5) + 1) / 2

      pulse.current.position.lerpVectors(startVec, endVec, progress)

    }

  })

  return (
    <group>

      {/* Beam line */}

      <line ref={line} geometry={geometry}>

        <lineBasicMaterial
          color="#4f9cff"
          transparent
          opacity={0.25}
        />

      </line>

      {/* Moving pulse */}

      <mesh ref={pulse}>

        <sphereGeometry args={[0.15, 16, 16]} />

        <meshBasicMaterial color="#60a5fa" />

      </mesh>

    </group>
  )
}
'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useMemo } from 'react'

function Nodes() {

  const particles = useMemo(() => {
    const count = 60
    const arr = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 8
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8
    }

    return arr
  }, [])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particles}
          count={particles.length / 3}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#4f9cff"
        size={0.15}
        sizeAttenuation
      />
    </points>
  )
}

export default function SkillNetwork() {

  return (
    <section className="h-screen w-full flex items-center justify-center text-white">

      <div className="absolute text-center z-10">

        <h2 className="text-5xl font-bold">
          AI Systems Skill Network
        </h2>

        <p className="mt-4 text-gray-400">
          SQL · Data Infrastructure · AI Systems · Automation · System Design
        </p>

      </div>

      <Canvas camera={{ position: [0,0,10] }}>

        <ambientLight intensity={0.5} />

        <Nodes />

        <OrbitControls enableZoom={false} />

      </Canvas>

    </section>
  )
}
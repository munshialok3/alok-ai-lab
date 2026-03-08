'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { useRef, useMemo } from 'react'

function NeuralField() {
  const ref = useRef<THREE.Points>(null!)

  const particles = useMemo(() => {
    const count = 20000
    const arr = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 40
      arr[i * 3 + 1] = (Math.random() - 0.5) * 40
      arr[i * 3 + 2] = (Math.random() - 0.5) * 40
    }

    return arr
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    if (ref.current) {
      ref.current.rotation.y = t * 0.02
      ref.current.rotation.x = t * 0.01

      ref.current.rotation.y += state.mouse.x * 0.2
      ref.current.rotation.x += state.mouse.y * 0.2
    }
  })

  return (
    <points ref={ref}>
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
        size={0.03}
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  )
}

export default function NeuralBackground() {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 12] }}>

        <color attach="background" args={['#020617']} />

        <NeuralField />

        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>

      </Canvas>
    </div>
  )
}
'use client'

import { Points } from '@react-three/drei'
import { useMemo } from 'react'

export default function Nebula() {

  const particles = useMemo(() => {

    const count = 4000
    const arr = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {

      arr[i * 3] = (Math.random() - 0.5) * 120
      arr[i * 3 + 1] = (Math.random() - 0.5) * 40
      arr[i * 3 + 2] = (Math.random() - 0.5) * 120

    }

    return arr

  }, [])

  return (

    <Points positions={particles} stride={3}>

      <pointsMaterial
        color="#1d4ed8"
        size={0.6}
        transparent
        opacity={0.08}
        depthWrite={false}
      />

    </Points>

  )

}
'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'

export default function GalaxyCamera() {

  const { camera, mouse } = useThree()
  const time = useRef(0)

  useFrame((state, delta) => {

    time.current += delta

    camera.position.x += (mouse.x * 6 - camera.position.x) * 0.03
    camera.position.y += (6 + mouse.y * 3 - camera.position.y) * 0.03

    camera.position.z = 20 + Math.sin(time.current * 0.2) * 1.5

    camera.lookAt(0,0,0)

  })

  return null

}
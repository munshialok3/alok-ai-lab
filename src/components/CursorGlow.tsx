'use client'

import { useEffect, useState } from "react"

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: -200, y: -200 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY
      })
    }

    window.addEventListener("mousemove", move)

    return () => {
      window.removeEventListener("mousemove", move)
    }
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background: `radial-gradient(
          600px circle at ${position.x}px ${position.y}px,
          rgba(79,156,255,0.15),
          transparent 40%
        )`
      }}
    />
  )
}
'use client'
import { useRef, ReactNode, CSSProperties, MouseEvent } from 'react'

interface Props {
  children: ReactNode
  style?: CSSProperties
  className?: string
  depth?: number
  onClick?: () => void
}

export default function Tilt({ children, style, className = '', depth = 7, onClick }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: MouseEvent) => {
    const el = ref.current!
    const r  = el.getBoundingClientRect()
    const x  = (e.clientX - r.left) / r.width  - 0.5
    const y  = (e.clientY - r.top)  / r.height - 0.5
    el.style.transform = `perspective(900px) rotateX(${-y*depth}deg) rotateY(${x*depth}deg) scale3d(1.015,1.015,1.015)`
  }

  const onLeave = () => {
    ref.current!.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
  }

  return (
    <div
      ref={ref}
      className={`tilt ${className}`}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

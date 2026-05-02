'use client'
import { useRef, ReactNode, CSSProperties } from 'react'

interface Props {
  children: ReactNode
  style?: CSSProperties
  className?: string
  depth?: number
  onClick?: () => void
}

export default function Tilt({ children, style, className = '', depth = 7, onClick }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width)  - 0.5
    const y = ((e.clientY - r.top)  / r.height) - 0.5
    el.style.transform = `perspective(900px) rotateX(${-y * depth}deg) rotateY(${x * depth}deg) scale3d(1.015,1.015,1.015)`
  }

  const onLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? onKeyDown : undefined}
    >
      {children}
    </div>
  )
}

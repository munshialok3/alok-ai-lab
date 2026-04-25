'use client'
import { useEffect, useRef, useState } from 'react'

interface Props {
  to: number
  prefix?: string
  suffix?: string
  dur?: number
  className?: string
  style?: React.CSSProperties
}

export default function Count({ to, prefix = '', suffix = '', dur = 1900, className = '', style }: Props) {
  const ref    = useRef<HTMLSpanElement>(null)
  const fired  = useRef(false)
  const isFloat = !Number.isInteger(to)
  const [v, setV] = useState(0)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || fired.current) return
      fired.current = true
      const t0 = Date.now()
      const tick = () => {
        const p  = Math.min((Date.now() - t0) / dur, 1)
        const ep = 1 - Math.pow(1 - p, 4)
        setV(isFloat ? parseFloat((ep * to).toFixed(1)) : Math.round(ep * to))
        if (p < 1) requestAnimationFrame(tick)
        else setV(to)
      }
      requestAnimationFrame(tick)
      obs.disconnect()
    }, { threshold: 0.25 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [to, dur, isFloat])

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{v}{suffix}
    </span>
  )
}

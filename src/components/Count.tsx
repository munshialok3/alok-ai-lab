'use client'
import { useEffect, useRef, useState, CSSProperties } from 'react'

interface Props {
  to: number
  prefix?: string
  suffix?: string
  dur?: number
  style?: CSSProperties
  className?: string
}

export default function Count({ to, prefix='', suffix='', dur=1900, style, className='' }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const [v, setV] = useState(0)
  const fired = useRef(false)
  const isFloat = !Number.isInteger(to)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || fired.current) return
      fired.current = true
      const t0 = Date.now()
      const tick = () => {
        const p = Math.min((Date.now()-t0)/dur, 1)
        const e = 1 - Math.pow(1-p, 4)
        setV(isFloat ? parseFloat((e*to).toFixed(1)) : Math.round(e*to))
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
    <span ref={ref} style={style} className={className}>
      {prefix}{v}{suffix}
    </span>
  )
}

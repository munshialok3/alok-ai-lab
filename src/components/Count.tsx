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
  const ref     = useRef<HTMLSpanElement>(null)
  const fired   = useRef(false)
  const isFloat = !Number.isInteger(to)

  // null = not yet hydrated on client; avoids SSR rendering "0" into static HTML
  const [v, setV] = useState<number | null>(null)

  useEffect(() => {
    const run = () => {
      if (fired.current) return
      fired.current = true
      setV(0)
      const t0 = Date.now()
      const tick = () => {
        const p  = Math.min((Date.now() - t0) / dur, 1)
        const ep = 1 - Math.pow(1 - p, 4)
        setV(isFloat ? parseFloat((ep * to).toFixed(1)) : Math.round(ep * to))
        if (p < 1) requestAnimationFrame(tick)
        else setV(to)
      }
      requestAnimationFrame(tick)
    }

    const timer = setTimeout(() => {
      const el = ref.current
      if (!el) return
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { run(); obs.disconnect() }
      }, { threshold: 0.05, rootMargin: '0px 0px -10px 0px' })
      obs.observe(el)
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight && r.bottom > 0) { run(); obs.disconnect() }
      return () => obs.disconnect()
    }, 150)

    return () => clearTimeout(timer)
  }, [to, dur, isFloat])

  return (
    <span ref={ref} className={className} style={style}>
      {/* While null (SSR / pre-hydration), render final value invisibly so layout doesn't shift */}
      {v === null
        ? <span style={{ opacity: 0 }}>{prefix}{to}{suffix}</span>
        : <>{prefix}{v}{suffix}</>
      }
    </span>
  )
}

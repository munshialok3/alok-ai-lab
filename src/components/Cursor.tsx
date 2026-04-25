'use client'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dot  = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const d = dot.current!, r = ring.current!
    let mx = -200, my = -200, rx = -200, ry = -200

    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      d.style.left = mx + 'px'; d.style.top = my + 'px'
      const el = document.elementFromPoint(mx, my)
      const h  = !!el?.closest('a,button,[data-hover]')
      d.classList.toggle('big', h)
      r.classList.toggle('big', h)
    }

    let raf: number
    const loop = () => {
      rx += (mx - rx) * 0.09; ry += (my - ry) * 0.09
      r.style.left = rx + 'px'; r.style.top = ry + 'px'
      raf = requestAnimationFrame(loop)
    }
    loop()
    window.addEventListener('mousemove', move)
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      <div ref={dot}  className="cur-dot" />
      <div ref={ring} className="cur-ring" />
    </>
  )
}

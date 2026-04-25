'use client'
import { useEffect, useRef } from 'react'

export default function Neural() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current!
    const cx = cv.getContext('2d')!
    let W = 0, H = 0, raf = 0

    const resize = () => {
      W = cv.width  = window.innerWidth
      H = cv.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const COUNT = Math.min(70, Math.floor((window.innerWidth * window.innerHeight) / 14000))
    const pts = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .2, vy: (Math.random() - .5) * .2,
      r: Math.random() * 1.1 + .35, o: Math.random() * .25 + .06,
    }))

    const DIST = Math.min(140, W * 0.15)

    const draw = () => {
      cx.clearRect(0, 0, W, H)
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j]
          const dx = p.x - q.x, dy = p.y - q.y
          const d2 = dx*dx + dy*dy
          if (d2 < DIST * DIST) {
            const d = Math.sqrt(d2)
            cx.beginPath()
            cx.moveTo(p.x, p.y); cx.lineTo(q.x, q.y)
            cx.strokeStyle = `rgba(79,142,247,${.048 * (1 - d / DIST)})`
            cx.lineWidth = .5
            cx.stroke()
          }
        }
        cx.beginPath()
        cx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        cx.fillStyle = `rgba(79,142,247,${p.o})`
        cx.fill()
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} id="neural-bg" />
}

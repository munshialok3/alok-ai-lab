'use client'
import { useEffect, useRef } from 'react'

export default function NeuralCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current!
    const cx = cv.getContext('2d')!
    let W = 0, H = 0, raf = 0

    const resize = () => { W = cv.width = innerWidth; H = cv.height = innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const n = 85
    const pts = Array.from({ length: n }, () => ({
      x: Math.random() * innerWidth,  y: Math.random() * innerHeight,
      vx: (Math.random() - .5) * .22, vy: (Math.random() - .5) * .22,
      r: Math.random() * 1.1 + .35,  o: Math.random() * .28 + .07,
    }))

    const draw = () => {
      cx.clearRect(0, 0, W, H)
      for (let i = 0; i < n; i++) {
        const p = pts[i]
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
        for (let j = i + 1; j < n; j++) {
          const q = pts[j]
          const dx = p.x - q.x, dy = p.y - q.y
          const d  = Math.sqrt(dx*dx + dy*dy)
          if (d < 148) {
            cx.beginPath()
            cx.moveTo(p.x, p.y)
            cx.lineTo(q.x, q.y)
            cx.strokeStyle = `rgba(91,156,246,${.055*(1-d/148)})`
            cx.lineWidth = .5
            cx.stroke()
          }
        }
        cx.beginPath()
        cx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        cx.fillStyle = `rgba(91,156,246,${p.o})`
        cx.fill()
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={ref} id="nc" />
}

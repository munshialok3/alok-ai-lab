'use client'
import { useEffect, useRef } from 'react'

export default function Neural() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const cv = ref.current
    if (!cv) return
    const cx = cv.getContext('2d')
    if (!cx) return

    let W = 0, H = 0,raf =0
    let paused = false
    let resizeTimer: ReturnType<typeof setTimeout>

    const resize = () => {
      W = cv.width = window.innerWidth
      H = cv.height = window.innerHeight}
    resize()

    const debouncedResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, 150)
    }
    window.addEventListener('resize', debouncedResize, { passive: true })

    const COUNT = Math.min(70, Math.floor((window.innerWidth * window.innerHeight) / 14000))
    const pts = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .2, vy: (Math.random() - .5) * .2,
      r: Math.random() * 1.1+ .35, o: Math.random() * .25 + .06,
    }))

    const DIST = Math.min(140, W * 0.15)

    const draw = () => {
      if (paused) {raf = requestAnimationFrame(draw)
        return
      }

      cx.clearRect(0, 0, W, H)
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j]
          const dx = p.x - q.x, dy = p.y - q.y
          const d2 = dx * dx + dy * dy
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

    // Pause when tab is hidden
    const onVisibility = () => { paused = document.hidden }
    document.addEventListener('visibilitychange', onVisibility)

    // Pause when canvas is scrolled out of view
    const obs = new IntersectionObserver(
      ([e]) => { paused = !e.isIntersecting },
      { threshold: 0 }
    )
    obs.observe(cv)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', debouncedResize)
      document.removeEventListener('visibilitychange', onVisibility)
      obs.disconnect()
    }
  }, [])

  return<canvas ref={ref} id="neural-bg" aria-hidden="true" />
}
'use client'
import { useEffect, useRef } from 'react'
import { track } from '@vercel/analytics'

const MILESTONES = [25, 50, 75, 100]

export default function ScrollDepthTracker() {
  const fired = useRef<Set<number>>(new Set())

  useEffect(() => {
    const check = () => {
      const scrolled = window.scrollY + window.innerHeight
      const total    = document.documentElement.scrollHeight
      const pct      = (scrolled / total) * 100

      for (const m of MILESTONES) {
        if (pct >= m && !fired.current.has(m)) {
          fired.current.add(m)
          track('scroll_depth', { milestone: `${m}%` })
        }
      }
    }

    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [])

  return null
}

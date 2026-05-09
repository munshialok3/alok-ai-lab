'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { track } from '@vercel/analytics'

export default function NotFound() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
    track('404_hit', { path: window.location.pathname })
  }, [])

  const go = (id?: string) => {
    if (id) {
      window.location.href = `/#${id}`
    } else {
      window.location.href = '/'
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#060810',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 'clamp(24px,5vw,48px)',
      position: 'relative', overflow: 'hidden',
      fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '40%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 'min(600px,80vw)', height: 'min(400px,50vw)',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(79,142,247,0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {mounted && (
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', maxWidth: 520, width: '100%' }}
        >
          {/* 404 number */}
          <div style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(80px,18vw,160px)',
            letterSpacing: '-0.05em',
            lineHeight: 0.9,
            background: 'linear-gradient(170deg, #ffffff 15%, rgba(255,255,255,0.18) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: 'clamp(16px,3vh,24px)',
            userSelect: 'none',
          }}>
            404
          </div>

          {/* Eyebrow */}
          <p style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.26em',
            textTransform: 'uppercase', color: '#4f8ef7',
            marginBottom: 'clamp(12px,2vh,18px)',
          }}>
            Page not found
          </p>

          {/* Heading */}
          <h1 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800,
            fontSize: 'clamp(24px,4vw,36px)', letterSpacing: '-0.03em',
            color: '#e8edf5', lineHeight: 1.2,
            marginBottom: 'clamp(12px,2vh,18px)',
          }}>
            You found a dead end.
          </h1>

          {/* Body */}
          <p style={{
            fontSize: 'clamp(14px,1.5vw,16px)', color: 'rgba(232,237,245,0.45)',
            lineHeight: 1.75, fontWeight: 300,
            marginBottom: 'clamp(32px,5vh,48px)',
            maxWidth: 400, margin: '0 auto clamp(32px,5vh,48px)',
          }}>
            The page you&apos;re looking for doesn&apos;t exist. It may have moved, or the URL might be wrong.
            Either way — everything worth seeing is one click away.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => go()}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '12px 28px', borderRadius: 100,
                fontSize: 14, fontWeight: 600, fontFamily: 'inherit',
                color: '#fff', border: 'none',
                background: 'linear-gradient(135deg, #4f8ef7, #8b5cf6)',
                boxShadow: '0 0 32px rgba(79,142,247,0.25)',
                cursor: 'pointer',
                transition: 'transform .2s, box-shadow .2s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLButtonElement
                el.style.transform = 'translateY(-2px) scale(1.03)'
                el.style.boxShadow = '0 0 48px rgba(79,142,247,0.4)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLButtonElement
                el.style.transform = ''
                el.style.boxShadow = '0 0 32px rgba(79,142,247,0.25)'
              }}
            >
              ← Back to home
            </button>

            <button
              onClick={() => go('projects')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '12px 28px', borderRadius: 100,
                fontSize: 14, fontWeight: 500, fontFamily: 'inherit',
                color: 'rgba(232,237,245,0.55)',
                border: '1px solid rgba(255,255,255,0.09)',
                background: 'transparent', cursor: 'pointer',
                transition: 'all .2s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLButtonElement
                el.style.borderColor = 'rgba(255,255,255,0.2)'
                el.style.color = '#e8edf5'
                el.style.background = 'rgba(255,255,255,0.05)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLButtonElement
                el.style.borderColor = 'rgba(255,255,255,0.09)'
                el.style.color = 'rgba(232,237,245,0.55)'
                el.style.background = 'transparent'
              }}
            >
              See my work →
            </button>
          </div>

          {/* Subtle footer note */}
          <p style={{
            marginTop: 'clamp(40px,6vh,64px)',
            fontSize: 11, color: 'rgba(232,237,245,0.18)',
            letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>
            Alok Munshi · alok-munshi-portfolio.vercel.app
          </p>
        </motion.div>
      )}

      {/* Fallback for SSR / before mount */}
      {!mounted && (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 120, color: 'rgba(232,237,245,0.08)' }}>404</div>
        </div>
      )}
    </div>
  )
}

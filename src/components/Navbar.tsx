'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const LINKS = [
  { label: 'Impact',    id: 'impact' },
  { label: 'Projects',  id: 'projects' },
  { label: 'Journey',   id: 'journey' },
  { label: 'Skills',    id: 'skills' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active,   setActive]   = useState('')

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 55)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setActive(id)
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', justifyContent: 'center',
        padding: 'clamp(14px,2vw,22px) clamp(16px,3vw,32px)',
        pointerEvents: 'none',
      }}
    >
      <div style={{
        display: 'flex', alignItems: 'center',
        gap: 'clamp(2px,0.5vw,4px)',
        padding: '5px 5px 5px clamp(14px,2vw,18px)',
        borderRadius: 100,
        background: scrolled ? 'rgba(6,8,16,0.95)' : 'rgba(6,8,16,0.6)',
        border: '1px solid rgba(255,255,255,0.09)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,0.55)' : 'none',
        transition: 'background .4s, box-shadow .4s',
        pointerEvents: 'all',
        maxWidth: '100%',
      }}>
        {/* Home */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800,
            fontSize: 'clamp(11px,1.2vw,14px)', letterSpacing: '0.1em',
            color: '#fff', background: 'none', border: 'none',
            marginRight: 'clamp(6px,1vw,10px)',
            paddingRight: 'clamp(10px,1.2vw,14px)',
            borderRight: '1px solid rgba(255,255,255,0.09)',
            whiteSpace: 'nowrap',
          }}
        >
          Home
        </button>

        {LINKS.map(l => (
          <button
            key={l.id}
            onClick={() => go(l.id)}
            style={{
              padding: `7px clamp(10px,1.2vw,15px)`,
              borderRadius: 100,
              fontSize: 'clamp(11px,1.1vw,13px)',
              fontWeight: 500, border: 'none', fontFamily: 'inherit',
              color:      active === l.id ? '#fff' : 'rgba(232,237,245,0.45)',
              background: active === l.id ? 'rgba(255,255,255,0.09)' : 'transparent',
              transition: 'all .2s', whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              if (active !== l.id)(e.currentTarget as HTMLElement).style.color = 'rgba(232,237,245,0.85)'
            }}
            onMouseLeave={e => {
              if (active !== l.id)(e.currentTarget as HTMLElement).style.color = 'rgba(232,237,245,0.45)'
            }}
          >
            {l.label}
          </button>
        ))}

        <button
          onClick={() => go('contact')}
          className="btn-primary"
          style={{
            padding: `8px clamp(14px,1.8vw,20px)`,
            fontSize: 'clamp(11px,1.1vw,13px)',
            marginLeft: 'clamp(4px,0.5vw,6px)',
            color: '#fff',
          }}
        >
          Let&apos;s connect
        </button>
      </div>
    </motion.nav>
  )
}

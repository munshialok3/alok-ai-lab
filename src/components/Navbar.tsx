'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const LINKS = ['Impact', 'Projects', 'Journey', 'Skills', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setActive(id)
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', justifyContent: 'center', padding: '22px 24px',
        pointerEvents: 'none',
      }}
    >
      <div style={{
        display: 'flex', alignItems: 'center', gap: 2,
        padding: '5px 5px 5px 18px', borderRadius: 100,
        background: scrolled ? 'rgba(2,8,24,0.94)' : 'rgba(2,8,24,0.65)',
        border: '1px solid rgba(255,255,255,0.09)',
        backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
        boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05)' : 'none',
        transition: 'background 0.4s, box-shadow 0.4s',
        pointerEvents: 'all',
      }}>
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 13,
            letterSpacing: '0.12em', color: '#fff', background: 'none', border: 'none',
            marginRight: 8, paddingRight: 14,
            borderRight: '1px solid rgba(255,255,255,0.09)',
          }}
        >
          AM
        </button>

        {LINKS.map(l => (
          <button
            key={l}
            onClick={() => go(l)}
            style={{
              padding: '7px 14px', borderRadius: 100,
              fontSize: 12, fontWeight: 500, border: 'none',
              fontFamily: 'inherit',
              color: active === l ? '#fff' : 'rgba(255,255,255,0.48)',
              background: active === l ? 'rgba(255,255,255,0.09)' : 'transparent',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { if (active !== l) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.85)' }}
            onMouseLeave={e => { if (active !== l) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.48)' }}
          >
            {l}
          </button>
        ))}

        <button
          onClick={() => go('Contact')}
          className="btn-primary"
          style={{ padding: '8px 18px', fontSize: 12, marginLeft: 4, color: '#fff' }}
        >
          Let's talk →
        </button>
      </div>
    </motion.nav>
  )
}

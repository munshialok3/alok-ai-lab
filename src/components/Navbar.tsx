'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const LINKS = [
  { label: 'Impact',   id: 'impact' },
  { label: 'Projects', id: 'projects' },
  { label: 'Journey',  id: 'journey' },
  { label: 'Skills',   id: 'skills' },
]

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false)
  const [active,       setActive]       = useState('')
  const [isMobile,     setIsMobile]     = useState(false)
  const [menuOpen,     setMenuOpen]     = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 55)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Close menu on scroll
  useEffect(() => {
    const fn = () => { if (menuOpen) setMenuOpen(false) }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [menuOpen])

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setActive(id)
    setMenuOpen(false)
  }

  return (
    <>
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
        {/* ── DESKTOP NAV ── */}
        {!isMobile && (
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
          }}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 800,
                fontSize: 'clamp(11px,1.2vw,14px)', letterSpacing: '0.1em',
                color: '#fff', background: 'none', border: 'none',
                marginRight: 'clamp(6px,1vw,10px)',
                paddingRight: 'clamp(10px,1.2vw,14px)',
                borderRight: '1px solid rgba(255,255,255,0.09)',
                whiteSpace: 'nowrap', cursor: 'pointer',
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
                  transition: 'all .2s', whiteSpace: 'nowrap', cursor: 'pointer',
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
                color: '#fff', cursor: 'pointer',
              }}
            >
              Let&apos;s connect
            </button>
          </div>
        )}

        {/* ── MOBILE NAV ── */}
        {isMobile && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            width: '100%',
            padding: '8px 8px 8px 18px',
            borderRadius: 100,
            background: scrolled ? 'rgba(6,8,16,0.95)' : 'rgba(6,8,16,0.6)',
            border: '1px solid rgba(255,255,255,0.09)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,0.55)' : 'none',
            transition: 'background .4s, box-shadow .4s',
            pointerEvents: 'all',
          }}>
            {/* Home label */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 800,
                fontSize: 14, letterSpacing: '0.1em',
                color: '#fff', background: 'none', border: 'none',
                cursor: 'pointer', whiteSpace: 'nowrap',
              }}
            >
              Home
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {/* Let's connect */}
              <button
                onClick={() => go('contact')}
                className="btn-primary"
                style={{ padding: '7px 16px', fontSize: 12, color: '#fff', cursor: 'pointer' }}
              >
                Let&apos;s connect
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(o => !o)}
                style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  gap: 5, cursor: 'pointer',
                }}
                aria-label="Menu"
              >
                {[0, 1, 2].map(i => (
                  <span key={i} style={{
                    display: 'block',
                    width: menuOpen ? (i === 1 ? 0 : 16) : 16,
                    height: 1.5,
                    background: '#fff',
                    borderRadius: 2,
                    transition: 'all 0.2s',
                    transform: menuOpen
                      ? i === 0 ? 'translateY(6.5px) rotate(45deg)'
                      : i === 2 ? 'translateY(-6.5px) rotate(-45deg)'
                      : 'scaleX(0)'
                      : 'none',
                  }} />
                ))}
              </button>
            </div>
          </div>
        )}
      </motion.nav>

      {/* ── MOBILE DROPDOWN MENU ── */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed', zIndex: 99,
              top: 80, left: 16, right: 16,
              background: 'rgba(6,8,16,0.97)',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: 20,
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
              overflow: 'hidden',
            }}
          >
            {LINKS.map((l, i) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '16px 24px',
                  fontSize: 15, fontWeight: 500, fontFamily: 'inherit',
                  color: active === l.id ? '#fff' : 'rgba(232,237,245,0.6)',
                  background: active === l.id ? 'rgba(255,255,255,0.06)' : 'transparent',
                  border: 'none',
                  borderBottom: i < LINKS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  cursor: 'pointer',
                  transition: 'all .15s',
                }}
              >
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

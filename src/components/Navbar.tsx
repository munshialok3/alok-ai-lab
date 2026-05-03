'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useCallback, useRef } from 'react'
import { track } from '@vercel/analytics'

const LINKS = [
  { label: 'Impact', id: 'impact' },
  { label: 'Projects', id: 'projects' },
  { label: 'Journey', id: 'journey' },
  { label: 'Skills', id: 'skills' },
]

const EXPLORE_PAGES = [
  { label: 'Writing', href: '/writing', icon: '✍' },
  { label: "Arjun's Money Diaries", href: '/money-diaries', icon: '📖' },
]

export default function Navbar({ onResumeRequest }: { onResumeRequest: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [exploreOpen, setExploreOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const exploreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 55)
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? window.scrollY / total : 0)
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const el = document.getElementById('scroll-progress')
    if (el) el.style.transform = `scaleX(${progress})`
  }, [progress])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const fn = () => {
      if (menuOpen) setMenuOpen(false)
      if (exploreOpen) setExploreOpen(false)
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [menuOpen, exploreOpen])

  useEffect(() => {
    if (!exploreOpen) return
    const fn = (e: MouseEvent) => {
      if (exploreRef.current && !exploreRef.current.contains(e.target as Node)) {
        setExploreOpen(false)
      }
    }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [exploreOpen])

  useEffect(() => {
    const sectionIds = [...LINKS.map(l => l.id), 'about', 'contact']
    const observers: IntersectionObserver[] = []
    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-20% 0px -50% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setMenuOpen(false)
      setExploreOpen(false)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const goHome = () => {
    if (window.location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      window.location.href = '/'
    }setMenuOpen(false)
  }

  const go = (id: string) => {
    if (window.location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = `/#${id}`
    }
    setActive(id)
    setMenuOpen(false)
  }

  const navBg: React.CSSProperties = {
    background: scrolled ? 'rgba(6,8,16,0.95)' : 'rgba(6,8,16,0.6)',
    border: '1px solid rgba(255,255,255,0.09)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,0.55)' : 'none',
    transition: 'background .4s, box-shadow .4s',
    pointerEvents: 'all',
  }

  return (
    <>
      <div id="scroll-progress" />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          display: 'flex', justifyContent: 'center',
          padding: 'clamp(14px,2vw,22px) clamp(16px,3vw,32px)',
          pointerEvents: 'none',
        }}
      >
        {/* ── DESKTOP ── */}
        {!isMobile && (
          <div style={{
            display: 'flex', alignItems: 'center',
            gap: 'clamp(2px,0.5vw,4px)',
            padding: '5px 5px 5px clamp(14px,2vw,18px)',
            borderRadius: 100,...navBg,
          }}>
            {/* Home */}
            <button
              onClick={goHome}
              style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 800,
                fontSize: 'clamp(11px,1.2vw,14px)', letterSpacing: '0.1em',
                color: '#fff', background: 'none', border: 'none',
                marginRight: 'clamp(6px,1vw,10px)',
                paddingRight: 'clamp(10px,1.2vw,14px)',
                borderRight: '1px solid rgba(255,255,255,0.09)',
                whiteSpace: 'nowrap', cursor: 'pointer',
                transition: 'opacity .2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.75' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
            >
              Home
            </button>

            {/* Section links */}
            {LINKS.map(l => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                style={{
                  padding: '7px clamp(10px,1.2vw,15px)',
                  borderRadius: 100,
                  fontSize: 'clamp(11px,1.1vw,13px)', fontWeight: 500,
                  border: 'none', fontFamily: 'inherit',
                  color: active === l.id ? '#fff' : 'rgba(232,237,245,0.45)',
                  background: active === l.id ? 'rgba(255,255,255,0.09)' : 'transparent',
                  transition: 'all .2s', whiteSpace: 'nowrap', cursor: 'pointer',
                  position: 'relative',
                }}
                onMouseEnter={e => {
                  if (active !== l.id) {
                    (e.currentTarget as HTMLElement).style.color = '#fff'
                ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'
                  }
                }}
                onMouseLeave={e => {
                  if (active !== l.id) {
                    (e.currentTarget as HTMLElement).style.color = 'rgba(232,237,245,0.45)'
                    ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                  }
                }}
              >
                {l.label}
                {active === l.id && (
                  <span style={{
                    position: 'absolute', bottom: 3, left: '50%',
                    transform: 'translateX(-50%)',
                    width: 3, height: 3, borderRadius: '50%',
                    background: '#4f8ef7', display: 'block',
                  }} />
                )}
              </button>
            ))}

            {/* Divider */}
            <div style={{
              width: 1, height: 16,
              background: 'rgba(255,255,255,0.09)',
              margin: '0 clamp(4px,0.8vw,8px)',
              flexShrink: 0,
            }} />

            {/* Explore More dropdown */}
            <div ref={exploreRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setExploreOpen(o => !o)}
                style={{
                  padding: '7px clamp(10px,1.2vw,15px)',
                  borderRadius: 100,
                  fontSize: 'clamp(11px,1.1vw,13px)', fontWeight: 500,
                  border: 'none', fontFamily: 'inherit',
                  color: exploreOpen ? '#fff' : 'rgba(232,237,245,0.45)',
                  background: exploreOpen ? 'rgba(79,142,247,0.12)' : 'transparent',
                  transition: 'all .2s', whiteSpace: 'nowrap', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 5,
                }}
                onMouseEnter={e => {
                  if (!exploreOpen) {
                    (e.currentTarget as HTMLElement).style.color = '#fff'
                    ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'
                  }
                }}
                onMouseLeave={e => {
                  if (!exploreOpen) {
                    (e.currentTarget as HTMLElement).style.color = 'rgba(232,237,245,0.45)'
                    ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                  }
                }}
              >
                Explore More
                <span style={{
                  display: 'inline-block',
                  fontSize: 10,
                  transition: 'transform .2s',
                  transform: exploreOpen ? 'rotate(180deg)' : 'none',
                }}>
                  ▾
                </span>
              </button>

              <AnimatePresence>
                {exploreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 10px)',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      minWidth: 220,
                      background: 'rgba(10,15,30,0.98)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 14,
                      backdropFilter: 'blur(24px)',
                      WebkitBackdropFilter: 'blur(24px)',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
                      padding: 6,
                      zIndex: 101,
                    }}
                  >
                    {EXPLORE_PAGES.map(p => (
                      <a
                        key={p.href}
                        href={p.href}
                        onClick={() => track('navbar_explore_clicked', { page: p.label })}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          padding: '10px 14px',
                          borderRadius: 10,
                          fontSize: 13,
                          fontWeight: 500,
                          color: '#e8edf5',
                          textDecoration: 'none',
                          transition: 'background .15s',
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(79,142,247,0.1)' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                      >
                        <span style={{ fontSize: 14 }}>{p.icon}</span>
                        {p.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Resume */}
            <button
              onClick={() => { onResumeRequest(); track('resume_modal_opened', { source: 'navbar' }) }}
              className="btn-ghost"
              style={{ fontSize: 'clamp(11px,1.1vw,13px)', padding: '8px clamp(12px,1.4vw,16px)', marginLeft: 2, display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer' }}
            >
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d="M6 1v7M3.5 6l2.5 2.5L8.5 6M1.5 10.5h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Resume
            </button>

            {/* Let's connect */}
            <button
              onClick={() => go('contact')}
              className="btn-primary"
              style={{ padding: '8px clamp(14px,1.8vw,20px)', fontSize: 'clamp(11px,1.1vw,13px)', marginLeft: 'clamp(4px,0.5vw,6px)', color: '#fff', cursor: 'pointer' }}
            >
              Let&apos;s connect
            </button>
          </div>
        )}

        {/* ── MOBILE ── */}
        {isMobile && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            width: '100%', padding: '8px 8px 8px 18px',
            borderRadius: 100, ...navBg,
          }}>
            <button
              onClick={goHome}
              style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 14, letterSpacing: '0.1em', color: '#fff', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Home
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button onClick={() => go('contact')} className="btn-primary" style={{ padding: '7px 16px', fontSize: 12, color: '#fff', cursor: 'pointer' }}>
                Let&apos;s connect
              </button>
              <button
                onClick={() => setMenuOpen(o => !o)}
                style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, cursor: 'pointer' }}
                aria-label="Menu"
              >
                {[0, 1, 2].map(i => (
                  <span key={i} style={{ display: 'block', width: menuOpen ? (i === 1 ? 0 : 16) : 16, height: 1.5, background: '#fff', borderRadius: 2, transition: 'all 0.2s', transform: menuOpen ? i === 0 ? 'translateY(6.5px) rotate(45deg)' : i === 2 ? 'translateY(-6.5px) rotate(-45deg)' : 'scaleX(0)' : 'none' }} />
                ))}
              </button>
            </div>
          </div>
        )}
      </motion.nav>

      {/* ── MOBILE DROPDOWN ── */}
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
            {LINKS.map(l => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '16px 24px',
                  fontSize: 15, fontWeight: active === l.id ? 600 : 500, fontFamily: 'inherit',
                  color: active === l.id ? '#fff' : 'rgba(232,237,245,0.6)',
                  background: active === l.id ? 'rgba(79,142,247,0.08)' : 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  cursor: 'pointer', transition: 'all .15s',
                }}
              >
                {active === l.id ? `→ ${l.label}` : l.label}
              </button>
            ))}{EXPLORE_PAGES.map(p => (<a
                key={p.href}
                href={p.href}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  width: '100%', textAlign: 'left',
                  padding: '16px 24px',
                  fontSize: 15, fontWeight: 500, fontFamily: 'inherit',
                  color: 'rgba(232,237,245,0.6)',
                  background: 'transparent',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  textDecoration: 'none',
                }}
              >
                <span>{p.icon}</span>
                {p.label}
              </a>
            ))}
            <button
              onClick={() => { setMenuOpen(false); onResumeRequest(); track('resume_modal_opened', { source: 'mobile_menu' }) }}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '16px 24px',
                fontSize: 15, fontWeight: 500, fontFamily: 'inherit',
                color: 'rgba(232,237,245,0.6)',
                background: 'transparent', border: 'none',
                cursor: 'pointer',
              }}
            >↓ Request Resume
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
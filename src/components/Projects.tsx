'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Tilt from './Tilt'

const PROJ = [
  {
    id: 'wa', icon: '⚡', name: 'WhatsApp Campaign Engine',
    tagline: 'Zero-downtime campaign infrastructure across 9 WhatsApp Business accounts',
    status: 'LIVE', sc: '#10b981', ac: '#4f8ef7', featured: true,
    stack: ['Cloudflare Workers', 'KV Cache', 'Meta Graph API', 'Apps Script', 'Google Sheets'],
    metrics: [{ v: '9', l: 'WABAs unified' }, { v: '<3s', l: 'Auto-recovery' }, { v: '~$0', l: 'Monthly cost' }, { v: '100%', l: 'Uptime' }],
    desc: 'An intelligent proxy layer that sits between a CRM and WhatsApp messaging provider. When Meta pauses a template mid-campaign, the system auto-swaps to an approved backup in under 3 seconds. Built entirely solo — no vendor, no agency, no budget.',
    points: [
      'Intercepts every campaign send and checks template status via Meta Graph API in real-time',
      '3-minute KV cache eliminates Meta rate-limit risk at high campaign volume',
      'Swaps template name only — provider renders the backup body text automatically',
      'Multiple simultaneous campaigns per account, each with an independent backup chain',
      'Full audit log: every FORWARDED / SWAPPED / BLOCKED decision captured with context',
      'Instant email alerts on any swap or block — team is always informed before users notice',
      'Dashboard: bulk submit, batch management, proxy log with filters, live blocked badge',
    ],
    built: 'Solo · 2026',
    github: 'https://github.com/munshialok3/whatsapp-campaign-engine',
    deck: 'https://github.com/munshialok3/whatsapp-campaign-engine/raw/main/WA_CaseStudy.pdf',
    demo: null,
  },
  {
    id: 'resume', icon: '📄', name: 'AI Resume Builder',
    tagline: 'Parses resumes, rewrites in STAR format, generates ATS-optimised output',
    status: 'COMING SOON', sc: '#4f8ef7', ac: '#4f8ef7', featured: false,
    stack: ['Next.js', 'Claude API', 'TypeScript', 'Tailwind'],
    metrics: [{ v: 'AI', l: 'Powered' }, { v: 'ATS', l: 'Optimised' }, { v: 'STAR', l: 'Framework' }, { v: '~0', l: 'Manual work' }],
    desc: 'Built on the belief that most people undersell themselves on paper. Parses raw resume content, restructures achievements into STAR bullets, and generates polished ATS-optimised output — powered by Claude.',
    points: [
      'Upload any resume — PDF or text — and get a fully restructured version back',
      'Rewrites every bullet into STAR / XYZ impact format automatically',
      'Paste a job description to get ATS keyword-optimised output tailored to the role',
      'Tone and seniority controls to match the role and industry',
      'Professional, recruiter-ready output in under 30 seconds',
    ],
    built: 'Building now · 2026',
    github: null,
    deck: null,
    demo: null,
  },
  {
    id: 'intel', icon: '📊', name: 'Competitive Intel Dashboard',
    tagline: 'Real-time app store intelligence replacing manual weekly reporting — at Zomato',
    status: 'BUILT · INTERNAL', sc: '#f59e0b', ac: '#f59e0b', featured: false,
    stack: ['Python', 'Sensor Tower API', 'Google Sheets', 'Airflow', 'Google Data Studio'],
    metrics: [{ v: 'Live', l: 'Rankings' }, { v: 'Daily', l: 'Auto-report' }, { v: '20+', l: 'Stakeholders' }, { v: '0', l: 'Manual pulls' }],
    desc: 'Built at Zomato to replace a slow, manual weekly competitive reporting process with a live intelligence system. Tracks competitor app rankings, install trends, and keyword movements in real-time via Sensor Tower API — served automatically to cross-functional stakeholders and leadership, every morning.',
    points: [
      'Sensor Tower API integration pulling real-time app store rankings and install trend data',
      'Automated daily reports delivered to cross-functional stakeholders and leadership — zero manual effort',
      'Ranking shift alerts triggered automatically when a competitor moves significantly on a priority keyword',
      'Category-level benchmarking against key food-tech competitors',
      'Historical trend analysis enabling forward-looking channel strategy decisions',
      'Built solo in ~2 weeks; eliminated a recurring 5+ hour weekly manual reporting task entirely',
    ],
    built: 'At Zomato · 2025 · NDA protected',
    github: null,
    deck: null,
    demo: null,
  },
  {
    id: 'decision', icon: '🎯', name: 'Decision Management Interface',
    tagline: 'Product × channel targeting, dynamic offer logic and real-time segmentation — at AmEx',
    status: 'BUILT · INTERNAL', sc: '#8b5cf6', ac: '#8b5cf6', featured: false,
    stack: ['Python', 'SQL', 'Hive', 'Internal AmEx Stack'],
    metrics: [{ v: '24K+', l: 'Acquisitions' }, { v: '4', l: 'Markets' }, { v: '$30M+', l: 'Revenue' }, { v: '+11%', l: 'ROI lift' }],
    desc: 'Built at American Express to give the marketing team real-time control over acquisition targeting. Enabled product × channel segmentation, dynamic offer randomisation, and last-mile targeting logic — without engineering dependency. Contributed directly to $30M+ incremental revenue across UK, Australia, Canada, and Japan.',
    points: [
      'Product × channel level segmentation — target specific card × digital channel combinations in real-time',
      'Dynamic offer randomisation for multivariate testing across 12+ global campaigns simultaneously',
      'Flexible last-mile logic controls: marketers adjust targeting rules without waiting for engineering',
      'Real-time prospect targeting using behavioural signals: geolocation, cookie data, browsing patterns',
      'Anti-gaming detection layer and real-time alerts — improved campaign ROI by 11% by blocking offer abuse',
      'Supported 24K+ incremental card acquisitions and 60% conversion uplift via experimentation',
    ],
    built: 'At American Express · 2022–2024 · NDA protected',
    github: null,
    deck: null,
    demo: null,
  },
]

function Modal({ p, onClose }: { p: typeof PROJ[0]; onClose: () => void }) {
  useEffect(() => {
    // iOS-safe scroll lock: record current scroll, fix body in place
    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''
      window.scrollTo(0, scrollY)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.92)',
        zIndex: 200,
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        padding: 'clamp(16px,3vw,32px)',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'],
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 28 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 28 }}
        transition={{ type: 'spring', damping: 26, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: '#0a0f1e',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 'clamp(16px,2vw,28px)',
          width: '100%',
          maxWidth: 'min(680px,95vw)',
          position: 'relative',
          marginTop: 'clamp(16px,3vw,32px)',
          marginBottom: 'clamp(16px,3vw,32px)',
        }}
      >
        {/* Sticky close button — always visible on mobile */}
        <div style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '12px 12px 0',
          background: 'linear-gradient(180deg, #0a0f1e 70%, transparent 100%)',
          borderRadius: 'clamp(16px,2vw,28px) clamp(16px,2vw,28px) 0 0',
        }}>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.18)',
              color: '#fff',
              width: 38, height: 38,
              borderRadius: '50%',
              fontSize: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              cursor: 'pointer',
            }}
            aria-label="Close"
          >✕</button>
        </div>

        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${p.ac}80,transparent)` }} />
        <div style={{ padding: '0 clamp(24px,3vw,40px) clamp(24px,3vw,40px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'clamp(16px,2.5vh,24px)', gap: 12 }}>
            <div>
              <span style={{ fontSize: 'clamp(28px,4vw,40px)', display: 'block', marginBottom: 14, lineHeight: 1 }}>{p.icon}</span>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(20px,2.5vw,26px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', marginBottom: 6 }}>{p.name}</h3>
              <p style={{ fontSize: 'clamp(10px,1.1vw,12px)', color: p.ac, fontWeight: 600 }}>{p.stack.slice(0, 3).join(' · ')}</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginBottom: 'clamp(16px,2.5vh,24px)' }}>
            {p.metrics.map((m, i) => (
              <div key={i} style={{ background: `${p.ac}0e`, border: `1px solid ${p.ac}28`, borderRadius: 'clamp(10px,1.5vw,16px)', padding: 'clamp(12px,1.5vw,18px) 8px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(18px,2.5vw,24px)', fontWeight: 800, color: p.ac, marginBottom: 4 }}>{m.v}</div>
                <div style={{ fontSize: 'clamp(9px,1vw,11px)', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1.4 }}>{m.l}</div>
              </div>
            ))}
          </div>

          <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 'clamp(14px,2vh,20px)' }} />
          <p style={{ fontSize: 'clamp(13px,1.4vw,15px)', color: 'rgba(232,237,245,0.52)', lineHeight: 1.78, fontWeight: 300, marginBottom: 'clamp(14px,2vh,22px)' }}>{p.desc}</p>

          <p style={{ fontSize: 'clamp(9px,1vw,11px)', fontWeight: 600, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 14 }}>What it does</p>
          <ul style={{ listStyle: 'none', marginBottom: 'clamp(16px,2.5vh,24px)' }}>
            {p.points.map((pt, i) => (
              <li key={i} style={{ display: 'flex', gap: 10, marginBottom: 'clamp(8px,1.2vh,12px)', fontSize: 'clamp(12px,1.3vw,14px)', color: 'rgba(232,237,245,0.45)', lineHeight: 1.68, fontWeight: 300 }}>
                <span style={{ flexShrink: 0, width: 6, height: 6, borderRadius: '50%', background: p.ac, marginTop: 7 }} />
                {pt}
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {p.stack.map(s => (
              <span key={s} className="tag" style={{ background: `${p.ac}0d`, borderColor: `${p.ac}28`, color: p.ac }}>{s}</span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', paddingBottom: 'clamp(24px,3vh,36px)', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 20 }}>
            {p.github && (
              <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: 12, padding: '9px 18px', color: '#fff', textDecoration: 'none' }}>
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                Clone on GitHub
              </a>
            )}
            {p.deck && (
              <a href={p.deck} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: 12, padding: '9px 18px', color: '#fff', textDecoration: 'none' }}>
                📄 View case study
              </a>
            )}
            {p.demo && (
              <a href={p.demo} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: 12, padding: '9px 18px', color: '#fff', textDecoration: 'none' }}>
                ↗ Live demo
              </a>
            )}
            {!p.github && !p.deck && !p.demo && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: p.ac, display: 'inline-block', flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: 'rgba(232,237,245,0.32)', fontStyle: 'italic' }}>
                  {p.status === 'COMING SOON' ? 'In development — not yet released' : 'Internal project · NDA protected · Cannot share link or preview'}
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const fv = { initial: { opacity: 0, y: 22 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }

export default function Projects() {
  const [modal, setModal] = useState<typeof PROJ[0] | null>(null)
  const featured = PROJ[0]
  const rest = PROJ.slice(1)

  return (
    <section id="projects" className="section layer">
      <div className="inner">
        <motion.div {...fv} transition={{ duration: 0.7 }} style={{ marginBottom: 'clamp(32px,5vh,52px)' }}>
          <p className="eyebrow">Built &amp; shipped</p>
          <h2 className="font-display h-xl grad-white" style={{ marginBottom: 'clamp(10px,1.5vh,18px)' }}>
            Things I built.
          </h2>
          <p className="text-body" style={{ maxWidth: 480 }}>
            I don&apos;t just strategise — I build the infrastructure. Solo, fast, at near-zero cost.
            Two of these run in production at Zomato and AmEx today.
          </p>
        </motion.div>

        {/* Featured */}
        <motion.div {...fv} transition={{ duration: 0.7, delay: 0.1 }} style={{ marginBottom: 12 }}>
          <Tilt depth={4} onClick={() => setModal(featured)} style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(79,142,247,0.2)',
            borderRadius: 'clamp(16px,2vw,28px)',
            padding: 'clamp(24px,3.5vw,52px)',
            cursor: 'pointer',
            display: 'grid',
            gridTemplateColumns: 'clamp(200px,55%,1fr) clamp(160px,40%,280px)',
            gap: 'clamp(20px,3vw,52px)',
            alignItems: 'center',
            position: 'relative', overflow: 'hidden',
          }}
          className="feat-grid"
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(79,142,247,0.55),transparent)' }} />
            <div style={{ position: 'absolute', top: -60, right: -60, width: 'min(240px,35vw)', height: 'min(240px,35vw)', background: 'radial-gradient(circle,rgba(79,142,247,0.07),transparent 70%)', pointerEvents: 'none' }} />
            <div>
              <div className="live-badge" style={{ marginBottom: 'clamp(14px,2vh,20px)' }}>
                <span className="live-dot" />Live · In production
              </div>
              <h3 className="font-display" style={{ fontSize: 'clamp(20px,3vw,32px)', color: '#fff', marginBottom: 'clamp(10px,1.5vh,16px)', lineHeight: 1.1 }}>
                {featured.name}
              </h3>
              <p className="text-body" style={{ marginBottom: 'clamp(16px,2.5vh,26px)' }}>
                {featured.desc}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 'clamp(14px,2vh,22px)' }}>
                {featured.stack.map(s => <span key={s} className="tag">{s}</span>)}
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a href="https://github.com/munshialok3/whatsapp-campaign-engine" target="_blank" rel="noopener noreferrer"
                  className="btn-primary" style={{ fontSize: 12, padding: '9px 18px', color: '#fff', textDecoration: 'none' }}>
                  <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                  Clone on GitHub
                </a>
                <a href="https://github.com/munshialok3/whatsapp-campaign-engine/raw/main/WA_CaseStudy.pdf"
                  target="_blank" rel="noopener noreferrer"
                  className="btn-ghost" style={{ fontSize: 12, padding: '9px 18px', textDecoration: 'none' }}>
                  📄 Full case study →
                </a>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(8px,1.2vw,12px)' }}>
              {featured.metrics.map((m, i) => (
                <div key={i} style={{ background: 'rgba(79,142,247,0.07)', border: '1px solid rgba(79,142,247,0.18)', borderRadius: 'clamp(12px,1.8vw,18px)', padding: 'clamp(16px,2vw,22px) clamp(8px,1vw,12px)', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(22px,2.8vw,28px)', fontWeight: 800, color: '#4f8ef7', marginBottom: 4 }}>{m.v}</div>
                  <div style={{ fontSize: 'clamp(9px,1vw,11px)', color: 'rgba(232,237,245,0.3)', letterSpacing: '0.09em', textTransform: 'uppercase' }}>{m.l}</div>
                </div>
              ))}
            </div>
          </Tilt>
        </motion.div>

        {/* 3-col grid */}
        <div className="grid-3col">
          {rest.map((p, i) => (
            <motion.div key={p.id} {...fv} transition={{ duration: 0.65, delay: 0.12 + i * 0.09 }}>
              <Tilt onClick={() => setModal(p)} style={{
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid ${p.status === 'COMING SOON' ? 'rgba(255,255,255,0.08)' : `${p.ac}18`}`,
                borderRadius: 'clamp(14px,1.8vw,22px)',
                padding: 'clamp(20px,2.5vw,28px)',
                cursor: 'pointer', height: '100%',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'clamp(12px,1.8vh,18px)' }}>
                  <div style={{ width: 'clamp(34px,4vw,42px)', height: 'clamp(34px,4vw,42px)', borderRadius: 'clamp(8px,1.2vw,13px)', background: `${p.ac}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(16px,2vw,20px)' }}>
                    {p.icon}
                  </div>
                  <span style={{ fontSize: 'clamp(9px,1vw,11px)', fontWeight: 700, padding: '3px 10px', borderRadius: 100, letterSpacing: '0.06em', background: `${p.sc}12`, color: p.sc, border: `1px solid ${p.sc}2e`, whiteSpace: 'nowrap' }}>
                    {p.status}
                  </span>
                </div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(15px,1.8vw,18px)', fontWeight: 700, color: '#fff', marginBottom: 10, letterSpacing: '-0.015em', lineHeight: 1.2 }}>
                  {p.name}
                </h3>
                <p style={{ fontSize: 'clamp(12px,1.2vw,13px)', color: 'rgba(232,237,245,0.42)', lineHeight: 1.65, fontWeight: 300, marginBottom: 'clamp(14px,2vh,18px)' }}>
                  {p.tagline}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 'clamp(12px,1.8vh,18px)' }}>
                  {p.metrics.slice(0, 2).map((m, j) => (
                    <div key={j} style={{ background: `${p.ac}09`, borderRadius: 10, padding: 'clamp(8px,1.2vh,12px) 8px', textAlign: 'center' }}>
                      <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(14px,1.8vw,18px)', fontWeight: 800, color: p.ac, marginBottom: 2 }}>{m.v}</div>
                      <div style={{ fontSize: 'clamp(9px,0.9vw,10px)', color: 'rgba(232,237,245,0.28)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{m.l}</div>
                    </div>
                  ))}
                </div>
                <span style={{ fontSize: 'clamp(11px,1.2vw,13px)', color: p.ac, fontWeight: 600 }}>View details →</span>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {modal && <Modal p={modal} onClose={() => setModal(null)} />}
      </AnimatePresence>
    </section>
  )
}
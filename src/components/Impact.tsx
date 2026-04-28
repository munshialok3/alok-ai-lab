'use client'
import { motion } from 'framer-motion'
import Count from './Count'
import Tilt from './Tilt'

const BIG = [
  {
    to: 79, p: '+', s: '%', col: '#4f8ef7', glow: 'rgba(79,142,247,0.09)',
    label: 'Monthly new user acquisition growth',
    desc: 'Grew new user monthly acquisition by 79% at Eternal (Zomato), while maintaining a strong payback period. Owned strategy, capital allocation, and execution — end to end.',
  },
  {
    to: 30, p: '$', s: 'M+', col: '#f59e0b', glow: 'rgba(245,158,11,0.09)',
    label: 'Incremental revenue generated',
    desc: 'Designed digital acquisition strategies at American Express targeting high-LTV segments across UK, Australia, Canada, and Japan using behavioural and geolocation signals.',
  },
  {
    to: 60, p: '', s: '%', col: '#10b981', glow: 'rgba(16,185,129,0.09)',
    label: 'Conversion uplift delivered',
    desc: 'Led A/B and multivariate experimentation across the full user application journey at American Express. Rigorous test design, fast iteration, measurable results.',
  },
  {
    to: 29, p: '+', s: '%', col: '#8b5cf6', glow: 'rgba(139,92,246,0.09)',
    label: 'New-user order-through-rate',
    desc: 'Drove product growth initiatives — onboarding, homepage, menu, cart redesign — improving new-user retention and purchase conversion from day one at Zomato.',
  },
]

const MINI = [
  { to: 24,   s: 'K+', label: 'Card acquisitions at AmEx',  c: '#4f8ef7' },
  { to: 11,   s: '%',  label: 'Campaign ROI lift', c: '#10b981' },
  { to: 45,   s: '',   label: 'Districts — KioGo startup',   c: '#f59e0b' },
  { to: 8.57, s: '',   label: 'CGPA — IIT Kharagpur',        c: '#8b5cf6' },
]

const fv = { initial: { opacity: 0, y: 22 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }

export default function Impact() {
  return (
    <section id="impact" className="section layer">
      <div className="inner">
        <motion.div {...fv} transition={{ duration: 0.7 }}>
          <p className="eyebrow">Impact at scale</p>
          <h2 className="font-display h-xl grad-white" style={{ marginBottom: 'clamp(12px,2vh,20px)' }}>
            Numbers earned,<br />not inherited.
          </h2>
          <p className="text-body" style={{ maxWidth: 480, marginBottom: 0 }}>
            Every metric came from deliberate strategy, rigorous experimentation, and relentless execution — across Zomato, American Express, and beyond.
          </p>
        </motion.div>

        {/* 2×2 stat mosaic */}
        <div className="grid-2col" style={{ marginTop: 'clamp(36px,5vh,56px)', borderRadius: 'clamp(16px,2vw,28px)', overflow: 'hidden', gap: 2 }}>
          {BIG.map((s, i) => (
            <motion.div key={i} {...fv} transition={{ duration: 0.65, delay: i * 0.08 }}>
              <Tilt depth={5} style={{
                background: 'rgba(255,255,255,0.04)', height: '100%',
                padding: 'clamp(28px,3.5vw,52px) clamp(24px,3vw,44px)',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                  background: `linear-gradient(90deg,transparent,${s.col}55,transparent)`,
                }} />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `radial-gradient(circle at 5% 95%,${s.glow},transparent 55%)`,
                  pointerEvents: 'none',
                }} />
                <Count to={s.to} prefix={s.p} suffix={s.s} style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: 'clamp(48px,7vw,88px)',
                  fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1,
                  color: s.col, display: 'block', marginBottom: 'clamp(8px,1.2vh,14px)',
                  position: 'relative',
                }} />
                <p style={{
                  fontSize: 'clamp(13px,1.4vw,16px)', fontWeight: 500,
                  color: 'rgba(232,237,245,0.55)',
                  marginBottom: 'clamp(8px,1.2vh,12px)', position: 'relative',
                }}>
                  {s.label}
                </p>
                <p style={{
                  fontSize: 'clamp(12px,1.2vw,14px)',
                  color: 'rgba(232,237,245,0.3)',
                  lineHeight: 1.7, fontWeight: 300, position: 'relative',
                }}>
                  {s.desc}
                </p>
              </Tilt>
            </motion.div>
          ))}
        </div>

        {/* Mini row */}
        <div className="grid-4col" style={{ marginTop: 2, borderRadius: '0 0 clamp(16px,2vw,28px) clamp(16px,2vw,28px)', overflow: 'hidden' }}>
          {MINI.map((m, i) => (
            <motion.div key={i} {...fv} transition={{ duration: 0.6, delay: 0.3 + i * 0.07 }}>
              <div
                style={{ background: 'rgba(255,255,255,0.032)', padding: 'clamp(20px,2.5vw,28px) clamp(16px,2vw,22px)', transition: 'background .3s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.055)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.032)'}
              >
                <Count to={m.to} suffix={m.s} style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: 'clamp(26px,3.5vw,34px)',
                  fontWeight: 800, letterSpacing: '-0.03em',
                  color: m.c, display: 'block', marginBottom: 6,
                }} />
                <p style={{ fontSize: 'clamp(11px,1.1vw,13px)', color: 'rgba(232,237,245,0.3)', lineHeight: 1.5, fontWeight: 300 }}>
                  {m.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

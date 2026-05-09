'use client'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import Count from './Count'
import { track } from '@vercel/analytics'

const fd = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
})

const TICKER = [
  { label: 'New user growth',   val: '+79% monthly',   color: '#4f8ef7' },
  { label: 'Revenue generated', val: '$32M+',           color: '#f59e0b' },
  { label: 'Conversion uplift', val: '+60%',            color: '#10b981' },
  { label: 'OTR improvement',   val: '+29%',            color: '#8b5cf6' },
  { label: 'Card acquisitions', val: '24K+',            color: '#4f8ef7' },
  { label: 'IIT Kharagpur',     val: 'CGPA 8.57',       color: '#f59e0b' },
  { label: 'WhatsApp accounts', val: '9 WABAs · ~$0',   color: '#10b981' },
]

const METRICS = [
  { to: 79,  p: '+', s: '%',  label: 'New user growth',   c: '#4f8ef7' },
  { to: 32,  p: '$', s: 'M+', label: 'Revenue generated', c: '#f59e0b' },
  { to: 60,  p: '',  s: '%',  label: 'Conversion uplift', c: '#10b981' },
  { to: 29,  p: '+', s: '%',  label: 'OTR improvement',   c: '#8b5cf6' },
]

export default function Hero({ onResumeRequest }: { onResumeRequest: () => void }) {
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <section className="layer" style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(90px,12vh,130px) clamp(20px,5vw,48px) clamp(60px,8vh,100px)',
        textAlign: 'center', position: 'relative',
      }}>
        {/* Radial glow */}
        <div aria-hidden style={{
          position: 'absolute',
          top: '35%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 'min(700px, 90vw)', height: 'min(500px, 60vw)',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(79,142,247,0.09) 0%, transparent 68%)',
          pointerEvents: 'none',
        }} />

        <motion.p {...fd(0.1)} style={{
          fontSize: 'clamp(9px,1.1vw,11px)', fontWeight: 600,
          letterSpacing: '0.26em', textTransform: 'uppercase',
          color: '#4f8ef7', marginBottom: 'clamp(20px,3vh,32px)',
        }}>
          Senior Growth Analyst · Eternal (Zomato) · IIT Kharagpur &apos;22
        </motion.p>

        {/* Name with depth */}
        <motion.div {...fd(0.28)} style={{ position: 'relative', marginBottom: 'clamp(14px,2vh,22px)' }}>
          <div aria-hidden className="font-display h-hero" style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(79,142,247,0.2), transparent)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            top: 'clamp(6px,0.8vw,12px)',
            filter: 'blur(14px)',
          }}>
            Alok Munshi
          </div>
          <h1 className="font-display h-hero grad-white">Alok Munshi</h1>
        </motion.div>

        <motion.p {...fd(0.48)} style={{
          fontSize: 'clamp(15px,2.2vw,22px)', fontWeight: 300,
          color: 'rgba(232,237,245,0.52)',
          marginBottom: 'clamp(10px,1.5vh,16px)',
          letterSpacing: '0.01em',
        }}>
          Growth Strategist. Builder.{' '}
          <strong style={{ color: 'rgba(232,237,245,0.82)', fontWeight: 500 }}>
            Systems Thinker.
          </strong>
        </motion.p>

        {/* Typing line */}
        <motion.div {...fd(0.62)} style={{
          height: 'clamp(22px,3vh,32px)',
          marginBottom: 'clamp(28px,4vh,48px)',
          fontSize: 'clamp(13px,1.5vw,16px)',
          color: '#4f8ef7', fontWeight: 500,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <TypeAnimation
            sequence={[
              'I build the infrastructure others wait for.',    2700,
              'Built WhatsApp infra for 9 accounts solo.',      2700,
              'Strategy without execution is just theory.',     2700,
              'Generated $32M+ in incremental revenue.',        2700,
              'From IIT Kharagpur to the growth frontier.',     2700,
            ]}
            speed={50}
            repeat={Infinity}
            wrapper="span"
          />
        </motion.div>

        {/* CTA buttons */}
        <motion.div {...fd(0.78)} style={{
          display: 'flex', gap: 'clamp(8px,1.5vw,14px)',
          justifyContent: 'center', flexWrap: 'wrap',
          marginBottom: 'clamp(48px,7vh,80px)',
        }}>
          <button className="btn-primary" onClick={() => go('projects')}>
            See my work
          </button>
          <button
            onClick={() => go('contact')}
            className="btn-primary"
            style={{ background: 'transparent', border: '1px solid rgba(79,142,247,0.4)', color: '#7aadff' }}
          >
            Let&apos;s connect
          </button>
          <button
            onClick={() => { onResumeRequest(); track('resume_modal_opened', { source: 'hero' }) }}
            className="btn-ghost"
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v7M3.5 6l2.5 2.5L8.5 6M1.5 10.5h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Resume
          </button>
          <a
            href="https://linkedin.com/in/munshialok"
            target="_blank" rel="noopener noreferrer"
            className="btn-ghost"
            onClick={() => track('linkedin_clicked', { source: 'hero' })}
          >
            LinkedIn ↗
          </a>
        </motion.div>

        {/* Metric strip */}
        <motion.div {...fd(0.95)} style={{
          width: '100%', maxWidth: 'min(760px, 95vw)',
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
          gap: 1, borderRadius: 'clamp(14px,2vw,22px)', overflow: 'hidden',
        }} className="hero-metrics">
          {METRICS.map((m, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.038)',
              padding: 'clamp(16px,2.5vh,24px) clamp(10px,1.5vw,16px)',
              textAlign: 'center', position: 'relative',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                background: `linear-gradient(90deg,transparent,${m.c}55,transparent)`,
              }} />
              <Count to={m.to} prefix={m.p} suffix={m.s} style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: 'clamp(20px,2.8vw,28px)',
                fontWeight: 800, letterSpacing: '-0.03em',
                color: m.c, display: 'block', marginBottom: 5,
              }} />
              <span style={{
                fontSize: 'clamp(9px,1vw,11px)', fontWeight: 500,
                color: 'rgba(232,237,245,0.32)', letterSpacing: '0.07em',
                textTransform: 'uppercase', display: 'block', lineHeight: 1.4,
              }}>
                {m.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          style={{
            position: 'absolute', bottom: 'clamp(20px,4vh,36px)',
            left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          }}
        >
          <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.28em', color: 'rgba(232,237,245,0.22)', textTransform: 'uppercase' }}>scroll</span>
          <div style={{ width: 1, height: 'clamp(32px,5vh,48px)', background: 'linear-gradient(180deg, rgba(79,142,247,0.6), transparent)' }} />
        </motion.div>
      </section>

      {/* Ticker */}
      <div style={{
        background: 'rgba(255,255,255,0.02)',
        borderTop: '1px solid rgba(255,255,255,0.045)',
        borderBottom: '1px solid rgba(255,255,255,0.045)',
        overflow: 'hidden', padding: 'clamp(8px,1.2vh,12px) 0',
        position: 'relative', zIndex: 10,
      }}>
        <div className="ticker-track">
          {[...TICKER, ...TICKER].map(({ label, val, color }, i) => (
            <span key={i} style={{
              display: 'inline-flex', alignItems: 'center',
              gap: 'clamp(7px,1vw,12px)',
              padding: '0 clamp(18px,2.5vw,30px)',
              fontSize: 'clamp(10px,1.1vw,12px)', fontWeight: 500, whiteSpace: 'nowrap',
            }}>
              <span style={{ color: 'rgba(232,237,245,0.22)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {label}
              </span>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(11px,1.2vw,13px)', color }}>
                {val}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.08)' }}>◆</span>
            </span>
          ))}
        </div>
      </div>
    </>
  )
}

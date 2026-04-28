'use client'
import { motion } from 'framer-motion'

const fv = { initial: { opacity: 0, y: 22 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }

const SIGNALS = [
  {
    icon: '🏔️',
    label: 'Mountain person',
    detail: 'The Himalayas have a way of resetting your perspective on what actually matters.',
  },
  {
    icon: '🧠',
    label: 'First principles first',
    detail: 'Strategy before data, frameworks before tools — then I execute fast.',
  },
  {
    icon: '🚀',
    label: 'Builder at heart',
    detail: 'I get restless waiting for things to get built. If I can ship it myself, I will.',
  },
  {
    icon: '🐕',
    label: 'Future dog dad',
    detail: 'Don\'t have one yet. Working on it. Probably a Golden Retriever.',
  },
]

export default function About() {
  return (
    <section id="about" className="section layer">
      <div className="inner">
        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,5vw,80px)', alignItems: 'center' }}>

          {/* Left — text */}
          <motion.div {...fv} transition={{ duration: 0.7 }}>
            <p className="eyebrow">The person behind the metrics</p>
            <h2 className="font-display h-xl grad-white" style={{ marginBottom: 'clamp(18px,3vh,28px)' }}>
              I think in<br />systems.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px,2vh,20px)' }}>
              <p className="text-body" style={{ maxWidth: 460 }}>
                I started in Chemical Engineering at IIT Kharagpur — not because I wanted to become an engineer,
                but because hard problems with real-world constraints were the most interesting things I could find.
                That instinct didn&apos;t change. It just found a better domain.
              </p>
              <p className="text-body" style={{ maxWidth: 460 }}>
                Growth, to me, is an engineering problem with human variables. You zoom out to understand the system,
                identify the highest-leverage point, form a hypothesis, then ship fast and measure honestly.
                I&apos;ve done that at OYO, American Express, and Zomato — and when the right tool didn&apos;t exist,
                I built it myself.
              </p>
              <p className="text-body" style={{ maxWidth: 460 }}>
                I&apos;m drawn to problems that are genuinely hard and matter at scale — the kind where the solution
                has to hold for millions of people, not just work in a demo.
              </p>
            </div>
          </motion.div>

          {/* Right — signal cards */}
          <motion.div {...fv} transition={{ duration: 0.65, delay: 0.15 }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'clamp(8px,1.2vw,12px)',
            }}>
              {SIGNALS.map((s, i) => (
                <motion.div
                  key={i}
                  {...fv}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 'clamp(14px,1.8vw,20px)',
                    padding: 'clamp(18px,2.2vw,24px)',
                    transition: 'border-color .3s, background .3s',
                    cursor: 'default',
                    /* Equal height via flex column */
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                    minHeight: 'clamp(130px,14vw,160px)',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'rgba(255,255,255,0.055)'
                    el.style.borderColor = 'rgba(255,255,255,0.12)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'rgba(255,255,255,0.03)'
                    el.style.borderColor = 'rgba(255,255,255,0.07)'
                  }}
                >
                  <span style={{ fontSize: 'clamp(22px,2.4vw,28px)', lineHeight: 1 }}>
                    {s.icon}
                  </span>
                  <p style={{
                    fontFamily: 'Syne, sans-serif', fontWeight: 700,
                    fontSize: 'clamp(12px,1.2vw,13px)',
                    color: 'rgba(232,237,245,0.88)',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.3,
                  }}>
                    {s.label}
                  </p>
                  <p style={{
                    fontSize: 'clamp(11px,1vw,12px)',
                    color: 'rgba(232,237,245,0.38)',
                    lineHeight: 1.65,
                    fontWeight: 300,
                    flexGrow: 1,
                  }}>
                    {s.detail}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Currently exploring strip */}
            <motion.div {...fv} transition={{ duration: 0.6, delay: 0.45 }}
              style={{
                marginTop: 'clamp(10px,1.5vw,12px)',
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 'clamp(10px,1.2vw,14px)',
                padding: 'clamp(12px,1.8vh,16px) clamp(14px,1.8vw,20px)',
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>🌍</span>
              <div>
                <p style={{ fontSize: 'clamp(9px,1vw,10px)', fontWeight: 600, letterSpacing: '0.14em', color: 'rgba(232,237,245,0.28)', textTransform: 'uppercase', marginBottom: 3 }}>
                  Currently exploring
                </p>
                <p style={{ fontSize: 'clamp(11px,1.2vw,13px)', color: 'rgba(232,237,245,0.52)', fontWeight: 300 }}>
                  AI-native growth infrastructure · next Himalayan trek · and what comes after Zomato.
                </p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

'use client'
import { motion } from 'framer-motion'

const fv = { initial: { opacity: 0, y: 22 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }

const SIGNALS = [
  {
    icon: '🏔️',
    label: 'Mountain person',
    detail: 'Kedarkantha. Kuari Pass. The Himalayas have a way of resetting your perspective on what actually matters.',
  },
  {
    icon: '🧠',
    label: 'First principles first',
    detail: 'I zoom out before I dive in. Strategy before data, frameworks before tools — then I execute fast.',
  },
  {
    icon: '🚀',
    label: 'Builder at heart',
    detail: 'I get restless waiting for things to get built. If I can ship it myself, I will — solo or as part of a team.',
  },
  {
    icon: '🐕',
    label: 'Future dog dad',
    detail: 'Don\'t have one yet. Working on it. Probably a Labrador.',
  },
]

export default function About() {
  return (
    <section id="about" className="section layer">
      <div className="inner">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,5vw,80px)', alignItems: 'center' }}>

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
                I&apos;m drawn to problems that are genuinely hard and matter at scale — the kind where solving it
                changes something real for a lot of people. Scaling from 1.4M to 2.5M users isn&apos;t just a number.
                That&apos;s millions of first orders, first experiences, first impressions.
              </p>
            </div>
          </motion.div>

          {/* Right — signal cards */}
          <motion.div {...fv} transition={{ duration: 0.65, delay: 0.15 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(8px,1.2vw,14px)' }}>
              {SIGNALS.map((s, i) => (
                <motion.div
                  key={i}
                  {...fv}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                >
                  <div
                    className="card"
                    style={{ height: '100%', position: 'relative', overflow: 'hidden' }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'
                      ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = ''
                      ;(e.currentTarget as HTMLElement).style.borderColor = ''
                    }}
                  >
                    <div className="p-card" style={{ padding: 'clamp(16px,2vw,22px)' }}>
                      <span style={{ fontSize: 'clamp(20px,2.5vw,26px)', display: 'block', marginBottom: 10 }}>
                        {s.icon}
                      </span>
                      <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(12px,1.3vw,14px)', color: 'rgba(232,237,245,0.9)', marginBottom: 6, letterSpacing: '-0.01em' }}>
                        {s.label}
                      </p>
                      <p style={{ fontSize: 'clamp(11px,1.1vw,12px)', color: 'rgba(232,237,245,0.38)', lineHeight: 1.6, fontWeight: 300 }}>
                        {s.detail}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Currently reading / exploring strip */}
            <motion.div {...fv} transition={{ duration: 0.6, delay: 0.45 }}
              style={{ marginTop: 'clamp(10px,1.5vw,14px)', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 'clamp(10px,1.2vw,14px)', padding: 'clamp(12px,1.8vh,18px) clamp(14px,1.8vw,20px)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>🌍</span>
              <div>
                <p style={{ fontSize: 'clamp(9px,1vw,11px)', fontWeight: 600, letterSpacing: '0.14em', color: 'rgba(232,237,245,0.28)', textTransform: 'uppercase', marginBottom: 3 }}>
                  Currently exploring
                </p>
                <p style={{ fontSize: 'clamp(11px,1.2vw,13px)', color: 'rgba(232,237,245,0.55)', fontWeight: 300 }}>
                  AI-native growth infrastructure · next Himalayan trek · and what comes after Zomato.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Mobile: stack columns */}
      <style>{`
        @media (max-width: 700px) {
          #about .inner > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

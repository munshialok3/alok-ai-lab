'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

const STOPS = [
  {
    yr: '2018 – 22',
    role: 'B.Tech, Chemical Engineering',
    co: 'IIT Kharagpur',
    col: '#4f8ef7',
    current: false,
    sub: 'CGPA 8.57 / 10 · One of India\'s top engineering institutions',
    desc: 'Chose IIT Kharagpur not to become a chemical engineer, but because it was the hardest problem-set I could find. Four years of building analytical rigour, systems thinking, and the habit of asking "why does this actually work?" before accepting anything at face value.',
    highlight: 'In my final year, co-founded KioGo — an ambulance booking platform built to fix a real, broken system. Scaled to 45 districts across Madhya Pradesh, 200+ ambulances, 90+ drivers, and partnerships with 5 regional hospitals and 50+ pharmacies. Built from scratch, while finishing a degree.',
    tags: ['IIT Kharagpur', 'Chemical Engineering', 'CGPA 8.57', 'Founder'],
  },
  {
    yr: 'May 2021 – May 2022',
    role: 'Product / Business Analyst Intern',
    co: 'OYO',
    col: '#f59e0b',
    current: false,
    sub: '+10K monthly installs · 4.7★ App Store · –7% funnel drop-off',
    desc: 'Two stints at OYO across back-to-back internships — the second one offered because of the first. This is where I first saw that small, precise product changes compound into large growth numbers. App store optimisation doesn\'t sound glamorous until you watch 10,000 extra people install your app in a month because you changed 3 words in a description.',
    highlight: 'Built an in-app rating mechanism that lifted OYO\'s Play Store rating to 4.4 and App Store rating to 4.7. Designed 3 CRM campaigns with gamification features that measurably improved repeat engagement — and reduced booking funnel drop-off by 7% through iterative A/B testing.',
    tags: ['Product', 'A/B Testing', 'ASO', 'CRM', 'Growth'],
  },
  {
    yr: 'May 2022 – Oct 2024',
    role: 'Analyst — Data Science',
    co: 'American Express',
    col: '#10b981',
    current: false,
    sub: '$32M revenue · 24K+ acquisitions · UK · Australia · Canada · Japan',
    desc: 'Joined AmEx straight out of IIT and owned precision digital acquisition across four global markets. The work was equal parts strategy and engineering — designing targeting logic using geolocation and behavioural signals, running multivariate experiments, and building interfaces that gave non-technical marketers real-time control over campaign logic.',
    highlight: 'Built a Decision Management Interface enabling product × channel targeting, dynamic offer randomisation, and last-mile segmentation without engineering dependency. Added an anti-gaming detection layer that blocked promotional abuse and improved campaign ROI by 11%. Delivered 60% conversion uplift across 12+ global campaigns. Contributed to $30M+ incremental revenue across UK, Australia, Canada, and Japan.',
    tags: ['Data Science', 'Experimentation', 'Global Markets', 'AmEx', 'Builder'],
  },
  {
    yr: 'Nov 2024 – Present',
    role: 'Senior Marketing Analyst — Growth & Retention',
    co: 'Eternal (Zomato)',
    col: '#8b5cf6',
    current: true,
    sub: '+79% new user growth · +29% OTR · WhatsApp Engine built solo',
    desc: 'Own end-to-end growth strategy, investment decisions, and unit economics for Zomato\'s new user funnel — spanning performance marketing across Meta, Google UAC, and Apple Search Ads, product growth initiatives with design teams, and cohort-level capital allocation. When a tool I needed didn\'t exist, I built it.',
    highlight: 'Built the WhatsApp Campaign Engine solo — a production-grade proxy layer across 9 WhatsApp Business accounts that auto-swaps Meta-paused templates in under 3 seconds, at ~$0 monthly infrastructure cost. Zero downtime since launch. Also built a real-time Competitive Intel Dashboard via Sensor Tower API, served daily to cross-functional stakeholders and leadership.',
    tags: ['Growth', 'Performance Marketing', 'Builder', 'Zomato', 'P&L Owner'],
  },
]

const fv = { initial: { opacity: 0, y: 22 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }

export default function Journey() {
  const [active, setActive] = useState(3)

  return (
    <section id="journey" className="section layer">
      <div className="inner">
        <motion.div {...fv} transition={{ duration: 0.7 }} style={{ marginBottom: 'clamp(32px,5vh,56px)' }}>
          <p className="eyebrow">Career journey</p>
          <h2 className="font-display h-xl grad-white" style={{ marginBottom: 'clamp(10px,1.5vh,18px)' }}>
            The story so far.
          </h2>
          <p className="text-body" style={{ maxWidth: 440 }}>
            From startup founder in college to scaling growth at one of India&apos;s most ambitious companies.
            Every stop was intentional. Every role left something behind.
          </p>
        </motion.div>

        <div className="tl-grid" style={{ display: 'grid', gridTemplateColumns: 'clamp(180px,26%,280px) 1fr', gap: 'clamp(16px,2.5vw,32px)' }}>
          {/* Left nav */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {STOPS.map((s, i) => (
              <motion.button
                key={i}
                {...fv} transition={{ duration: 0.55, delay: i * 0.08 }}
                onClick={() => setActive(i)}
                style={{
                  textAlign: 'left',
                  padding: 'clamp(10px,1.5vh,14px) clamp(12px,1.5vw,16px)',
                  borderRadius: 'clamp(10px,1.2vw,14px)',
                  background: active === i ? `${s.col}10` : 'transparent',
                  border: active === i ? `1px solid ${s.col}35` : '1px solid transparent',
                  transition: 'all .25s',
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(9px,1vw,11px)', fontWeight: 700, color: s.col, letterSpacing: '0.07em', marginBottom: 4 }}>
                  {s.yr}
                </div>
                <div style={{ fontSize: 'clamp(12px,1.3vw,14px)', fontWeight: 600, color: active === i ? '#fff' : 'rgba(232,237,245,0.5)', lineHeight: 1.3 }}>
                  {s.co}
                </div>
                <div style={{ fontSize: 'clamp(10px,1.1vw,12px)', color: 'rgba(232,237,245,0.28)', marginTop: 2, lineHeight: 1.4 }}>
                  {s.role.split(' —')[0].split('–')[0].trim()}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right panel */}
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38 }}
          >
            <div className="card" style={{ height: '100%' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${STOPS[active].col}70,transparent)` }} />
              <div style={{ position: 'absolute', top: -30, right: -30, width: 'min(180px,30vw)', height: 'min(180px,30vw)', borderRadius: '50%', background: `radial-gradient(circle,${STOPS[active].col}08,transparent 70%)`, pointerEvents: 'none' }} />
              <div className="p-card">
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 'clamp(14px,2vh,20px)' }}>
                  <div>
                    <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(17px,2vw,22px)', fontWeight: 800, letterSpacing: '-0.025em', color: '#fff', marginBottom: 5 }}>
                      {STOPS[active].role}
                    </h3>
                    <p style={{ fontSize: 'clamp(13px,1.5vw,16px)', fontWeight: 600, color: STOPS[active].col, marginBottom: 4 }}>
                      {STOPS[active].co}
                    </p>
                    <p style={{ fontSize: 'clamp(9px,1vw,11px)', color: 'rgba(232,237,245,0.3)', fontFamily: 'Syne, sans-serif', letterSpacing: '0.06em' }}>
                      {STOPS[active].yr}
                    </p>
                  </div>
                  {STOPS[active].current && (
                    <div className="live-badge">
                      <span className="live-dot" />Current role
                    </div>
                  )}
                </div>

                <p style={{ fontSize: 'clamp(11px,1.2vw,13px)', color: 'rgba(232,237,245,0.42)', fontStyle: 'italic', marginBottom: 'clamp(12px,1.8vh,20px)', lineHeight: 1.6 }}>
                  {STOPS[active].sub}
                </p>

                <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 'clamp(12px,1.8vh,20px)' }} />

                <p style={{ fontSize: 'clamp(13px,1.3vw,15px)', color: 'rgba(232,237,245,0.5)', lineHeight: 1.78, marginBottom: 'clamp(14px,2vh,22px)', fontWeight: 300 }}>
                  {STOPS[active].desc}
                </p>

                <div style={{
                  background: `${STOPS[active].col}0d`,
                  border: `1px solid ${STOPS[active].col}28`,
                  borderRadius: 'clamp(8px,1.2vw,12px)',
                  padding: 'clamp(12px,1.5vh,16px) clamp(14px,1.8vw,18px)',
                  marginBottom: 'clamp(14px,2vh,22px)',
                  display: 'flex', gap: 10, alignItems: 'flex-start',
                }}>
                  <span style={{ flexShrink: 0, width: 18, height: 1, background: STOPS[active].col, marginTop: 10 }} />
                  <p style={{ fontSize: 'clamp(12px,1.3vw,14px)', color: 'rgba(232,237,245,0.65)', lineHeight: 1.65, fontWeight: 400 }}>
                    {STOPS[active].highlight}
                  </p>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {STOPS[active].tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile: stack the grid */}
      <style>{`
        @media (max-width: 640px) {
          .tl-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

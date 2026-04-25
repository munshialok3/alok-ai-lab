'use client'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const GROWTH = [
  { n: 'Growth Strategy',        p: 95 },
  { n: 'Performance Marketing',  p: 90 },
  { n: 'A/B Experimentation',    p: 92 },
  { n: 'Cohort & LTV Analytics', p: 88 },
  { n: 'Unit Economics',         p: 87 },
  { n: 'Product Growth',         p: 90 },
]
const BUILD = [
  { n: 'SQL / Hive',          p: 90 },
  { n: 'Python',              p: 82 },
  { n: 'Cloudflare Workers',  p: 80 },
  { n: 'System Design',       p: 83 },
  { n: 'API Integration',     p: 88 },
  { n: 'Next.js / React',     p: 76 },
]
const TOOLS = [
  'CleverTap', 'AppsFlyer', 'Sensor Tower', 'Meta Ads Manager',
  'Google UAC', 'Apple Search Ads', 'Redash', 'Airflow',
  'Jupyter', 'GitHub', 'Google Analytics', 'Excel',
]

function SkillPanel({ title, sub, col, items }: { title: string; sub: string; col: string; items: { n: string; p: number }[] }) {
  const ref    = useRef<HTMLDivElement>(null)
  const [go, setGo] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setGo(true); obs.disconnect() }
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className="card" style={{ position: 'relative', overflow: 'hidden', height: '100%' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${col},transparent)` }} />
      <div style={{ position: 'absolute', top: -20, right: -20, width: 'min(160px,25vw)', height: 'min(160px,25vw)', borderRadius: '50%', background: `radial-gradient(circle,${col}08,transparent 70%)`, pointerEvents: 'none' }} />
      <div className="p-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 'clamp(20px,3vh,30px)' }}>
          <div style={{ width: 'clamp(32px,4vw,38px)', height: 'clamp(32px,4vw,38px)', borderRadius: 'clamp(8px,1vw,11px)', background: `${col}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(14px,1.8vw,18px)' }}>
            {col === '#4f8ef7' ? '📈' : '⚙️'}
          </div>
          <div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(13px,1.5vw,16px)', fontWeight: 700, color: col }}>
              {title}
            </div>
            <div style={{ fontSize: 'clamp(10px,1.1vw,12px)', color: 'rgba(232,237,245,0.32)', marginTop: 2 }}>
              {sub}
            </div>
          </div>
        </div>

        {items.map((s, i) => (
          <div key={i} style={{ marginBottom: 'clamp(14px,2vh,20px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
              <span style={{ fontSize: 'clamp(12px,1.3vw,14px)', fontWeight: 500, color: 'rgba(232,237,245,0.65)' }}>
                {s.n}
              </span>
              <span style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(11px,1.2vw,13px)', fontWeight: 700, color: col }}>
                {s.p}
              </span>
            </div>
            <div className="bar-track">
              <div
                className="bar-fill"
                style={{
                  width: go ? `${s.p}%` : '0%',
                  background: `linear-gradient(90deg,${col}55,${col})`,
                  transitionDelay: `${i * 80}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const fv = { initial: { opacity: 0, y: 22 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }

export default function Skills() {
  return (
    <section id="skills" className="section layer">
      <div className="inner">
        <motion.div {...fv} transition={{ duration: 0.7 }} style={{ marginBottom: 'clamp(32px,5vh,52px)' }}>
          <p className="eyebrow">Dual identity</p>
          <h2 className="font-display h-xl grad-white" style={{ marginBottom: 'clamp(10px,1.5vh,18px)' }}>
            Growth brain.<br />Builder brain.
          </h2>
          <p className="text-body" style={{ maxWidth: 460 }}>
            What makes this rare: I think in funnels, LTV, and incremental impact — and then I build the system myself. No hand-offs. No dependencies.
          </p>
        </motion.div>

        <div className="grid-2col" style={{ marginBottom: 'clamp(10px,1.5vw,14px)' }}>
          <motion.div {...fv} transition={{ duration: 0.65, delay: 0.1 }}>
            <SkillPanel title="Growth Strategist" sub="Zomato · AmEx · OYO" col="#4f8ef7" items={GROWTH} />
          </motion.div>
          <motion.div {...fv} transition={{ duration: 0.65, delay: 0.18 }}>
            <SkillPanel title="Builder / Engineer" sub="Cloudflare · Apps Script · Python" col="#8b5cf6" items={BUILD} />
          </motion.div>
        </div>

        <motion.div {...fv} transition={{ duration: 0.65, delay: 0.28 }}>
          <div className="card">
            <div className="p-card" style={{ paddingTop: 'clamp(18px,2.5vh,26px)', paddingBottom: 'clamp(18px,2.5vh,26px)' }}>
              <p style={{ fontSize: 'clamp(9px,1vw,11px)', fontWeight: 600, color: 'rgba(232,237,245,0.28)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 'clamp(12px,1.8vh,18px)' }}>
                Tools &amp; Platforms
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(6px,1vw,10px)' }}>
                {TOOLS.map(t => (
                  <span
                    key={t} className="tag"
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.background = 'rgba(79,142,247,0.12)'
                      el.style.borderColor = 'rgba(79,142,247,0.28)'
                      el.style.color = '#4f8ef7'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.background = 'rgba(255,255,255,0.07)'
                      el.style.borderColor = 'rgba(255,255,255,0.08)'
                      el.style.color = 'rgba(232,237,245,0.28)'
                    }}
                    style={{ transition: 'all .2s' }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

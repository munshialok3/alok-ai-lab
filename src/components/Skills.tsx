'use client'
import { motion } from 'framer-motion'

// ── Skill categories: no arbitrary percentages, context instead ──────────────
const STRATEGY = [
  { skill: 'Growth Strategy & P&L',     ctx: 'End-to-end funnel ownership · Zomato new user acquisition' },
  { skill: 'Performance Marketing',     ctx: 'Meta · Google UAC · Apple Search Ads · multi-million monthly scale' },
  { skill: 'A/B & Multivariate Testing',ctx: '60% conversion uplift · 12+ global campaigns · AmEx' },
  { skill: 'Cohort & LTV Analytics',    ctx: 'Payback period modelling · retention curve analysis' },
  { skill: 'Unit Economics',            ctx: 'CAC, ROAS, LTV-based capital allocation across channels' },
  { skill: 'Product Growth',            ctx: 'Onboarding · homepage · menu · cart redesign · +29% OTR' },
]

const ENGINEERING = [
  { skill: 'SQL / Hive',               ctx: 'Daily query work across Redash, Hive · complex funnel analysis' },
  { skill: 'Python',                   ctx: 'Automation scripts · data pipelines · Airflow DAGs' },
  { skill: 'Cloudflare Workers',       ctx: 'WhatsApp Campaign Engine — production infra at near-zero cost' },
  { skill: 'API Integration',          ctx: 'Meta Graph API · Sensor Tower API · WhatsApp Business API' },
  { skill: 'System Design',            ctx: 'Proxy architecture · KV caching · audit logging · alerting' },
  { skill: 'Next.js / React',          ctx: 'This portfolio · AI Resume Builder (in progress)' },
]

// Tools grouped by category
const TOOL_GROUPS = [
  {
    label: 'CRM & Attribution',
    col: '#4f8ef7',
    tools: ['CleverTap', 'MoEngage', 'AppsFlyer', 'Google Analytics'],
  },
  {
    label: 'Performance & ASO',
    col: '#10b981',
    tools: ['Meta Ads Manager', 'Google UAC', 'Apple Search Ads', 'Sensor Tower', 'Google Play Console'],
  },
  {
    label: 'Data & Infrastructure',
    col: '#f59e0b',
    tools: ['Redash', 'Hive', 'Airflow', 'JupyterHub', 'GitHub'],
  },
  {
    label: 'Productivity & Infra',
    col: '#8b5cf6',
    tools: ['Excel', 'Google Sheets', 'Cloudflare', 'Vercel'],
  },
]

const fv = { initial: { opacity: 0, y: 22 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }

function SkillCard({
  icon, title, sub, col, items,
}: {
  icon: string
  title: string
  sub: string
  col: string
  items: { skill: string; ctx: string }[]
}) {
  return (
    <div className="card" style={{ position: 'relative', overflow: 'hidden', height: '100%' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${col},transparent)` }} />
      <div style={{ position: 'absolute', top: -20, right: -20, width: 'min(160px,25vw)', height: 'min(160px,25vw)', borderRadius: '50%', background: `radial-gradient(circle,${col}08,transparent 70%)`, pointerEvents: 'none' }} />
      <div className="p-card">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 'clamp(20px,3vh,28px)' }}>
          <div style={{ width: 'clamp(32px,4vw,38px)', height: 'clamp(32px,4vw,38px)', borderRadius: 'clamp(8px,1vw,11px)', background: `${col}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(14px,1.8vw,18px)', flexShrink: 0 }}>
            {icon}
          </div>
          <div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(13px,1.5vw,16px)', fontWeight: 700, color: col }}>{title}</div>
            <div style={{ fontSize: 'clamp(10px,1.1vw,12px)', color: 'rgba(232,237,245,0.32)', marginTop: 2 }}>{sub}</div>
          </div>
        </div>

        {/* Skills list — no bars, no % numbers */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(10px,1.5vh,14px)' }}>
          {items.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ flexShrink: 0, width: 5, height: 5, borderRadius: '50%', background: col, marginTop: 7, opacity: 0.7 }} />
              <div>
                <span style={{ fontSize: 'clamp(12px,1.3vw,14px)', fontWeight: 600, color: 'rgba(232,237,245,0.82)', display: 'block', marginBottom: 2 }}>
                  {s.skill}
                </span>
                <span style={{ fontSize: 'clamp(10px,1.1vw,12px)', color: 'rgba(232,237,245,0.35)', lineHeight: 1.5, fontWeight: 300 }}>
                  {s.ctx}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section layer">
      <div className="inner">
        {/* Header */}
        <motion.div {...fv} transition={{ duration: 0.7 }} style={{ marginBottom: 'clamp(32px,5vh,52px)' }}>
          <p className="eyebrow">Dual identity</p>
          <h2 className="font-display h-xl grad-white" style={{ marginBottom: 'clamp(10px,1.5vh,18px)' }}>
            Growth brain.<br />Builder brain.
          </h2>
          <p className="text-body" style={{ maxWidth: 480 }}>
            What makes this rare: I think in strategy and first principles — then I build the system myself.
            No hand-offs. No dependencies. No waiting.
          </p>
        </motion.div>

        {/* Two skill cards */}
        <div className="grid-2col" style={{ marginBottom: 'clamp(10px,1.5vw,14px)' }}>
          <motion.div {...fv} transition={{ duration: 0.65, delay: 0.1 }}>
            <SkillCard
              icon="📈"
              title="Growth Strategist"
              sub="Zomato · AmEx · OYO"
              col="#4f8ef7"
              items={STRATEGY}
            />
          </motion.div>
          <motion.div {...fv} transition={{ duration: 0.65, delay: 0.18 }}>
            <SkillCard
              icon="⚙️"
              title="Builder / Engineer"
              sub="Cloudflare · Python · Next.js"
              col="#8b5cf6"
              items={ENGINEERING}
            />
          </motion.div>
        </div>

        {/* Tool groups */}
        <motion.div {...fv} transition={{ duration: 0.65, delay: 0.28 }}>
          <div className="card">
            <div className="p-card" style={{ paddingTop: 'clamp(18px,2.5vh,26px)', paddingBottom: 'clamp(18px,2.5vh,26px)' }}>
              <p style={{ fontSize: 'clamp(9px,1vw,11px)', fontWeight: 600, color: 'rgba(232,237,245,0.28)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 'clamp(16px,2.5vh,24px)' }}>
                Tools &amp; Platforms
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px,2vh,20px)' }}>
                {TOOL_GROUPS.map(g => (
                  <div key={g.label}>
                    <p style={{ fontSize: 'clamp(9px,1vw,11px)', fontWeight: 600, color: g.col, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
                      {g.label}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(6px,1vw,10px)' }}>
                      {g.tools.map(t => (
                        <span
                          key={t}
                          className="tag"
                          onMouseEnter={e => {
                            const el = e.currentTarget as HTMLElement
                            el.style.background = `${g.col}14`
                            el.style.borderColor = `${g.col}40`
                            el.style.color = g.col
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
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

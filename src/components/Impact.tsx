'use client'
import { motion } from 'framer-motion'
import Count from './Count'
import Tilt from './Tilt'

const BIG = [
  { to:2.5, p:'',  s:'M', col:'#5b9cf6', glow:'rgba(91,156,246,0.08)',
    label:'Monthly new users scaled',
    desc:'Grew new user acquisition from 1.4M to 2.5M at Eternal (Zomato), maintaining customer payback under 15 months. Owned strategy, capital allocation, and execution — end to end.' },
  { to:32,  p:'$', s:'M', col:'#f59e0b', glow:'rgba(245,158,11,0.08)',
    label:'Incremental revenue generated',
    desc:'Designed digital acquisition strategies at American Express targeting high-LTV segments across UK, Australia, Canada, and Japan using precision behavioural and geolocation signals.' },
  { to:60,  p:'',  s:'%', col:'#10b981', glow:'rgba(16,185,129,0.08)',
    label:'Conversion uplift delivered',
    desc:'Led A/B and multivariate experimentation across the full user application journey at American Express. Rigorous test design, fast iteration, measurable results.' },
  { to:29,  p:'+', s:'%', col:'#8b5cf6', glow:'rgba(139,92,246,0.08)',
    label:'New-user order-through-rate',
    desc:'Drove product growth initiatives with product and design teams — onboarding, homepage, menu, and cart redesign — improving retention from day one at Zomato.' },
]

const MINI = [
  { to:24, s:'K+', label:'Card acquisitions at AmEx', c:'#5b9cf6' },
  { to:11, s:'%',  label:'Campaign ROI lift (anti-gaming)', c:'#10b981' },
  { to:45, s:'',   label:'Districts — KioGo', c:'#f59e0b' },
  { to:8.57, s:'', label:'CGPA — IIT Kharagpur', c:'#8b5cf6' },
]

const fv = { initial:{opacity:0,y:22}, whileInView:{opacity:1,y:0}, viewport:{once:true} }

export default function Impact() {
  return (
    <section id="impact" className="section layer">
      <div className="inner">
        <motion.div {...fv} transition={{ duration:0.7 }}>
          <p className="eyebrow">Impact at scale</p>
          <h2 className="section-heading">Numbers earned,<br />not inherited.</h2>
          <p className="section-sub" style={{ marginBottom:0 }}>
            Every metric came from deliberate strategy, rigorous experimentation, and shipping fast — across Zomato, American Express, and beyond.
          </p>
        </motion.div>

        {/* 2×2 big stat grid */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2, marginTop:56, borderRadius:28, overflow:'hidden' }}>
          {BIG.map((s,i) => (
            <motion.div key={i} {...fv} transition={{ duration:0.7, delay:i*0.08 }}>
              <Tilt depth={5} style={{ background:'var(--surface)', padding:'clamp(30px,4vw,52px) clamp(26px,4vw,44px)', height:'100%', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,${s.col}55,transparent)` }} />
                <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 0% 100%,${s.glow} 0%,transparent 55%)`, pointerEvents:'none' }} />
                <Count to={s.to} prefix={s.p} suffix={s.s}
                  style={{ fontFamily:'var(--font-syne)', fontSize:'clamp(52px,7vw,86px)', fontWeight:800, letterSpacing:'-0.04em', lineHeight:1, color:s.col, display:'block', marginBottom:12 }}
                />
                <p style={{ fontSize:15, fontWeight:500, color:'rgba(241,245,249,0.5)', marginBottom:12 }}>{s.label}</p>
                <p style={{ fontSize:13, color:'var(--dim)', lineHeight:1.7, fontWeight:300 }}>{s.desc}</p>
              </Tilt>
            </motion.div>
          ))}
        </div>

        {/* Mini row */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:2, marginTop:2, borderRadius:'0 0 28px 28px', overflow:'hidden' }}>
          {MINI.map((m,i) => (
            <motion.div key={i} {...fv} transition={{ duration:0.6, delay:0.3+i*0.07 }}>
              <div style={{ background:'rgba(255,255,255,0.032)', padding:'26px 22px', transition:'background .3s', cursor:'default' }}
                onMouseEnter={e=>(e.currentTarget as HTMLElement).style.background='rgba(255,255,255,0.058)'}
                onMouseLeave={e=>(e.currentTarget as HTMLElement).style.background='rgba(255,255,255,0.032)'}
              >
                <Count to={m.to} suffix={m.s}
                  style={{ fontFamily:'var(--font-syne)', fontSize:30, fontWeight:800, letterSpacing:'-0.03em', color:m.c, display:'block', marginBottom:7 }}
                />
                <p style={{ fontSize:12, color:'var(--dim)', lineHeight:1.55, fontWeight:300 }}>{m.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

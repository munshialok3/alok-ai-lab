'use client'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const GROWTH = [
  { n:'Growth Strategy',       p:95 },
  { n:'Performance Marketing', p:90 },
  { n:'A/B Experimentation',   p:92 },
  { n:'Cohort & LTV Analytics',p:88 },
  { n:'Unit Economics',        p:87 },
  { n:'Product Growth',        p:90 },
]
const BUILD = [
  { n:'SQL / Hive',            p:90 },
  { n:'Python',                p:82 },
  { n:'Cloudflare Workers',    p:80 },
  { n:'System Design',         p:83 },
  { n:'API Integration',       p:88 },
  { n:'Next.js / React',       p:76 },
]
const TOOLS = ['CleverTap','AppsFlyer','Sensor Tower','Meta Ads Manager','Google UAC','Apple Search Ads','Redash','Airflow','Jupyter','GitHub','Google Analytics','Excel']

function SkillPanel({ title, sub, col, items }: { title:string; sub:string; col:string; items:{n:string;p:number}[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [go, setGo] = useState(false)

  useEffect(()=>{
    const obs = new IntersectionObserver(([e])=>{ if(e.isIntersecting){ setGo(true); obs.disconnect() } },{ threshold:0.3 })
    if(ref.current) obs.observe(ref.current)
    return ()=>obs.disconnect()
  },[])

  return (
    <div ref={ref} className="card" style={{ position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,${col},transparent)` }} />
      <div style={{ position:'absolute', top:-20, right:-20, width:160, height:160, borderRadius:'50%', background:`radial-gradient(circle,${col}08,transparent 70%)`, pointerEvents:'none' }} />
      <div className="card-inner">
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:28 }}>
          <div style={{ width:36, height:36, borderRadius:10, background:`${col}14`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>
            {col==='#5b9cf6'?'📈':'⚙️'}
          </div>
          <div>
            <div style={{ fontFamily:'var(--font-syne)', fontSize:15, fontWeight:700, color:col }}>{title}</div>
            <div style={{ fontSize:11, color:'var(--dim)', marginTop:2 }}>{sub}</div>
          </div>
        </div>
        {items.map((s,i)=>(
          <div key={i} style={{ marginBottom:18 }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:7 }}>
              <span style={{ fontSize:13, fontWeight:500, color:'rgba(241,245,249,0.62)' }}>{s.n}</span>
              <span style={{ fontFamily:'var(--font-syne)', fontSize:12, fontWeight:700, color:col }}>{s.p}</span>
            </div>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: go ? `${s.p}%` : '0%', background:`linear-gradient(90deg,${col}55,${col})`, transitionDelay:`${i*80}ms` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const fv = { initial:{opacity:0,y:22}, whileInView:{opacity:1,y:0}, viewport:{once:true} }

export default function Skills() {
  return (
    <section id="skills" className="section layer">
      <div className="inner">
        <motion.div {...fv} transition={{ duration:0.7 }} style={{ marginBottom:52 }}>
          <p className="eyebrow">Dual identity</p>
          <h2 className="section-heading">Growth brain.<br />Builder brain.</h2>
          <p className="section-sub">What makes this combination rare: I think in funnels, LTV, and incremental impact — and then I go build the system myself. No hand-offs. No dependencies.</p>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }}>
          <motion.div {...fv} transition={{ duration:0.65, delay:0.1 }}>
            <SkillPanel title="Growth Strategist" sub="Zomato · AmEx · OYO" col="#5b9cf6" items={GROWTH} />
          </motion.div>
          <motion.div {...fv} transition={{ duration:0.65, delay:0.2 }}>
            <SkillPanel title="Builder / Engineer" sub="Cloudflare · Apps Script · Python" col="#8b5cf6" items={BUILD} />
          </motion.div>
        </div>

        <motion.div {...fv} transition={{ duration:0.65, delay:0.3 }}>
          <div className="card">
            <div className="card-inner" style={{ paddingTop:24, paddingBottom:24 }}>
              <p style={{ fontSize:10, fontWeight:600, color:'var(--dim)', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:16 }}>Tools &amp; Platforms</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                {TOOLS.map(t=>(
                  <span key={t} className="tag"
                    onMouseEnter={e=>{const el=e.currentTarget as HTMLElement; el.style.background='var(--blue-dim)'; el.style.borderColor='rgba(91,156,246,0.28)'; el.style.color='var(--blue)'}}
                    onMouseLeave={e=>{const el=e.currentTarget as HTMLElement; el.style.background='var(--surface2)'; el.style.borderColor='var(--border)'; el.style.color='var(--muted)'}}
                    style={{ transition:'all 0.2s' }}
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

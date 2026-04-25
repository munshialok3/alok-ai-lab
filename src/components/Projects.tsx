'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Tilt from './Tilt'

const PROJ = [
  {
    id:'wa', icon:'⚡', name:'WhatsApp Campaign Engine',
    tagline:'Zero-downtime campaign infrastructure across 9 WhatsApp Business accounts',
    status:'LIVE', statusColor:'#10b981', accentColor:'#5b9cf6', featured:true,
    stack:['Cloudflare Workers','KV Storage','Meta Graph API','Google Apps Script','Google Sheets'],
    metrics:[{v:'9',l:'WABAs unified'},{v:'<3s',l:'Auto-recovery'},{v:'~$0',l:'Monthly cost'},{v:'100%',l:'Uptime'}],
    desc:'An intelligent proxy layer between a CRM platform and WhatsApp messaging provider. When Meta pauses a template mid-campaign, the system auto-swaps to an approved backup in under 3 seconds. Built entirely solo — no vendor, no budget, just code.',
    points:[
      'Intercepts every campaign send, checks template status via Meta Graph API in real-time',
      '3-minute KV cache eliminates Meta rate-limit risk at high campaign volume',
      'Swaps template name only — provider renders the backup body text automatically from its own records',
      'Multiple simultaneous active campaigns per account, each with an independent backup chain',
      'Full audit log: every FORWARDED / SWAPPED / BLOCKED decision captured with context',
      'Instant email alerts on any swap or block event — team always knows before users do',
      'Dashboard: bulk submit, batch management, proxy log with filters, live blocked badge',
    ],
    built:'Solo · 2025', link:'https://github.com/munshialok3',
  },
  {
    id:'resume', icon:'📄', name:'AI Resume Builder',
    tagline:'Parses resumes, rewrites in STAR format, generates ATS-optimised output',
    status:'LIVE', statusColor:'#10b981', accentColor:'#5b9cf6', featured:false,
    stack:['Next.js','Claude API','TypeScript','Tailwind CSS'],
    metrics:[{v:'AI',l:'Powered'},{v:'ATS',l:'Optimised'},{v:'STAR',l:'Framework'},{v:'0',l:'Manual work'}],
    desc:'Built on the belief most people undersell themselves on paper. Parses raw resume content, rewrites achievements into impact-first STAR bullets, and generates polished ATS-optimised output.',
    points:['Parses existing resumes and restructures content for maximum impact','Rewrites bullets automatically using STAR / XYZ framework','ATS keyword optimisation against job description input','Professional output ready for submission'],
    built:'Solo · 2025', link:'https://github.com/munshialok3',
  },
  {
    id:'intel', icon:'📊', name:'Competitive Intel Dashboard',
    tagline:'Real-time competitor tracking via Sensor Tower API at Zomato',
    status:'INTERNAL', statusColor:'#f59e0b', accentColor:'#f59e0b', featured:false,
    stack:['Python','Sensor Tower API','Google Sheets','Airflow'],
    metrics:[{v:'Live',l:'Rankings'},{v:'Auto',l:'Alerts'},{v:'Daily',l:'Reports'},{v:'0',l:'Manual pulls'}],
    desc:'Replaced a manual weekly competitive reporting process with a live, always-on intelligence system. Tracks competitor app rankings, install trends, and keyword movements in real time.',
    points:['Sensor Tower API integration for real-time data','Automated ranking shift alerts','Category-level benchmarking','Weekly reports to leadership — automated'],
    built:'At Zomato · 2024', link:null,
  },
  {
    id:'decision', icon:'🎯', name:'Decision Management Interface',
    tagline:'Product × channel targeting, dynamic offers, real-time segmentation — AmEx',
    status:'INTERNAL', statusColor:'#f59e0b', accentColor:'#8b5cf6', featured:false,
    stack:['Python','SQL','Hive','Internal AmEx Stack'],
    metrics:[{v:'24K+',l:'Acquisitions'},{v:'4',l:'Markets'},{v:'$32M',l:'Revenue'},{v:'+11%',l:'ROI lift'}],
    desc:'Built at American Express — a targeting interface enabling dynamic offer logic and real-time prospect segmentation. Drove $32M revenue across four global markets with anti-gaming detection protecting ROI.',
    points:['Product × channel targeting for high-LTV segments','Dynamic offer logic via behavioural signals','Anti-gaming detection improving ROI by 11%','60% conversion uplift via multivariate experimentation'],
    built:'At American Express · 2022–2024', link:null,
  },
]

function Modal({ p, onClose }:{ p:typeof PROJ[0]; onClose:()=>void }) {
  return (
    <motion.div
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      onClick={onClose}
      style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.88)', backdropFilter:'blur(22px)', WebkitBackdropFilter:'blur(22px)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}
    >
      <motion.div
        initial={{ opacity:0, scale:0.9, y:28 }}
        animate={{ opacity:1, scale:1, y:0 }}
        exit={{ opacity:0, scale:0.9, y:28 }}
        transition={{ type:'spring', damping:26, stiffness:300 }}
        onClick={e=>e.stopPropagation()}
        style={{ background:'#040d22', border:'1px solid rgba(255,255,255,0.1)', borderRadius:28, width:'100%', maxWidth:680, maxHeight:'90vh', overflowY:'auto', position:'relative' }}
      >
        <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,${p.accentColor}80,transparent)` }} />
        <div style={{ padding:'36px 36px 0' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24 }}>
            <div>
              <span style={{ fontSize:36, display:'block', marginBottom:14, lineHeight:1 }}>{p.icon}</span>
              <h3 style={{ fontFamily:'var(--font-syne)', fontSize:26, fontWeight:800, letterSpacing:'-0.03em', color:'#fff', marginBottom:6 }}>{p.name}</h3>
              <p style={{ fontSize:12, color:p.accentColor, fontWeight:600 }}>{p.stack.slice(0,3).join(' · ')}</p>
            </div>
            <button onClick={onClose} style={{ background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.55)', width:36, height:36, borderRadius:'50%', fontSize:15, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>✕</button>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8, marginBottom:24 }}>
            {p.metrics.map((m,i)=>(
              <div key={i} style={{ background:`${p.accentColor}0e`, border:`1px solid ${p.accentColor}28`, borderRadius:14, padding:'16px 8px', textAlign:'center' }}>
                <div style={{ fontFamily:'var(--font-syne)', fontSize:22, fontWeight:800, color:p.accentColor, marginBottom:4 }}>{m.v}</div>
                <div style={{ fontSize:10, color:'rgba(255,255,255,0.28)', letterSpacing:'0.08em', textTransform:'uppercase', lineHeight:1.4 }}>{m.l}</div>
              </div>
            ))}
          </div>

          <div style={{ height:1, background:'rgba(255,255,255,0.06)', marginBottom:20 }} />
          <p style={{ fontSize:14, color:'rgba(241,245,249,0.5)', lineHeight:1.78, fontWeight:300, marginBottom:22 }}>{p.desc}</p>
          <p style={{ fontSize:10, fontWeight:600, color:'rgba(255,255,255,0.28)', letterSpacing:'0.18em', textTransform:'uppercase', marginBottom:14 }}>What it does</p>
          <ul style={{ listStyle:'none', marginBottom:24 }}>
            {p.points.map((pt,i)=>(
              <li key={i} style={{ display:'flex', gap:10, marginBottom:11, fontSize:13, color:'rgba(241,245,249,0.42)', lineHeight:1.68, fontWeight:300 }}>
                <span style={{ flexShrink:0, width:6, height:6, borderRadius:'50%', background:p.accentColor, marginTop:7 }} />
                {pt}
              </li>
            ))}
          </ul>
          <div style={{ display:'flex', flexWrap:'wrap', gap:8, paddingBottom:32 }}>
            {p.stack.map(s=><span key={s} className="tag-blue tag">{s}</span>)}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const fv = { initial:{opacity:0,y:22}, whileInView:{opacity:1,y:0}, viewport:{once:true} }

export default function Projects() {
  const [modal, setModal] = useState<typeof PROJ[0]|null>(null)
  const featured = PROJ[0]
  const rest = PROJ.slice(1)

  return (
    <section id="projects" className="section layer">
      <div className="inner">
        <motion.div {...fv} transition={{ duration:0.7 }} style={{ marginBottom:48 }}>
          <p className="eyebrow">Built &amp; shipped</p>
          <h2 className="section-heading">Things I built.</h2>
          <p className="section-sub">I don&apos;t just strategise — I build the infrastructure. Solo, fast, near-zero cost.</p>
        </motion.div>

        {/* Featured */}
        <motion.div {...fv} transition={{ duration:0.7, delay:0.1 }} style={{ marginBottom:12 }}>
          <Tilt depth={4} onClick={() => setModal(featured)} style={{
            background:'var(--surface)', border:'1px solid rgba(91,156,246,0.2)',
            borderRadius:28, padding:'clamp(28px,4vw,52px)',
            cursor:'pointer',
            display:'grid', gridTemplateColumns:'1fr minmax(240px,300px)',
            gap:'clamp(24px,4vw,52px)', alignItems:'center',
            position:'relative', overflow:'hidden',
          }}>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(91,156,246,0.55),transparent)' }} />
            <div style={{ position:'absolute', top:-60, right:-60, width:240, height:240, background:'radial-gradient(circle,rgba(91,156,246,0.07),transparent 70%)', pointerEvents:'none' }} />

            <div>
              <div className="live-badge" style={{ marginBottom:20 }}><span className="live-dot" />Live · In production</div>
              <h3 style={{ fontFamily:'var(--font-syne)', fontSize:'clamp(22px,3.5vw,32px)', fontWeight:800, letterSpacing:'-0.03em', color:'#fff', marginBottom:14, lineHeight:1.1 }}>
                {featured.name}
              </h3>
              <p style={{ fontSize:15, color:'var(--muted)', lineHeight:1.78, marginBottom:24, fontWeight:300 }}>{featured.desc}</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:24 }}>
                {featured.stack.map(s=><span key={s} className="tag">{s}</span>)}
              </div>
              <span style={{ fontSize:13, color:'var(--blue)', fontWeight:600 }}>View full case study →</span>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              {featured.metrics.map((m,i)=>(
                <div key={i} style={{ background:'rgba(91,156,246,0.07)', border:'1px solid rgba(91,156,246,0.18)', borderRadius:18, padding:'22px 10px', textAlign:'center' }}>
                  <div style={{ fontFamily:'var(--font-syne)', fontSize:28, fontWeight:800, color:'#5b9cf6', marginBottom:5 }}>{m.v}</div>
                  <div style={{ fontSize:10, color:'var(--dim)', letterSpacing:'0.1em', textTransform:'uppercase' }}>{m.l}</div>
                </div>
              ))}
            </div>
          </Tilt>
        </motion.div>

        {/* Grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
          {rest.map((p,i)=>(
            <motion.div key={p.id} {...fv} transition={{ duration:0.65, delay:0.12+i*0.09 }}>
              <Tilt onClick={()=>setModal(p)} style={{
                background:'var(--surface)', border:'1px solid var(--border)',
                borderRadius:24, padding:26, cursor:'pointer', height:'100%',
              }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:18 }}>
                  <div style={{ width:40, height:40, borderRadius:12, background:`${p.accentColor}14`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>{p.icon}</div>
                  <span style={{ fontSize:10, fontWeight:700, padding:'3px 10px', borderRadius:100, letterSpacing:'0.06em', background:`${p.statusColor}12`, color:p.statusColor, border:`1px solid ${p.statusColor}2e` }}>{p.status}</span>
                </div>
                <h3 style={{ fontFamily:'var(--font-syne)', fontSize:17, fontWeight:700, color:'#fff', marginBottom:10, letterSpacing:'-0.015em', lineHeight:1.2 }}>{p.name}</h3>
                <p style={{ fontSize:13, color:'var(--muted)', lineHeight:1.65, fontWeight:300, marginBottom:18 }}>{p.tagline}</p>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:18 }}>
                  {p.metrics.slice(0,2).map((m,j)=>(
                    <div key={j} style={{ background:`${p.accentColor}09`, borderRadius:10, padding:'10px 8px', textAlign:'center' }}>
                      <div style={{ fontFamily:'var(--font-syne)', fontSize:16, fontWeight:800, color:p.accentColor, marginBottom:2 }}>{m.v}</div>
                      <div style={{ fontSize:9, color:'var(--dim)', letterSpacing:'0.08em', textTransform:'uppercase' }}>{m.l}</div>
                    </div>
                  ))}
                </div>
                <span style={{ fontSize:12, color:p.accentColor, fontWeight:600 }}>View details →</span>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>{modal && <Modal p={modal} onClose={()=>setModal(null)} />}</AnimatePresence>
    </section>
  )
}

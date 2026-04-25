'use client'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import Count from './Count'

const fd = (d: number) => ({
  initial:{ opacity:0, y:30 },
  animate:{ opacity:1, y:0 },
  transition:{ duration:0.85, delay:d, ease:[0.16,1,0.3,1] as [number,number,number,number] },
})

const TICKER = [
  ['New users scaled','1.4M → 2.5M','#5b9cf6'],
  ['Incremental revenue','$32M','#f59e0b'],
  ['Conversion uplift','+60%','#10b981'],
  ['OTR improvement','+29%','#8b5cf6'],
  ['Card acquisitions','24K+','#5b9cf6'],
  ['IIT Kharagpur','CGPA 8.57','#f59e0b'],
  ['WhatsApp Engine','9 WABAs · ~$0/mo','#10b981'],
]

export default function Hero() {
  const go = (id:string) => document.getElementById(id)?.scrollIntoView({ behavior:'smooth' })

  return (
    <>
      <section className="layer" style={{
        minHeight:'100vh', display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center',
        padding:'104px 24px 56px', textAlign:'center',
        position:'relative',
      }}>
        {/* Radial hero glow */}
        <div aria-hidden style={{
          position:'absolute', top:'30%', left:'50%', transform:'translate(-50%,-50%)',
          width:'700px', height:'500px', borderRadius:'50%',
          background:'radial-gradient(ellipse,rgba(91,156,246,0.07) 0%,transparent 65%)',
          pointerEvents:'none',
        }} />

        <motion.p {...fd(0.15)} style={{ fontSize:11, fontWeight:600, letterSpacing:'0.28em', textTransform:'uppercase', color:'var(--blue)', marginBottom:28 }}>
          Senior Growth Analyst · Eternal (Zomato) · IIT Kharagpur &#39;22
        </motion.p>

        {/* Name — with layered depth effect */}
        <motion.div {...fd(0.3)} style={{ position:'relative', marginBottom:20 }}>
          <div aria-hidden style={{
            position:'absolute', inset:0,
            fontFamily:'var(--font-syne)', fontWeight:800, letterSpacing:'-0.04em', lineHeight:0.95,
            fontSize:'clamp(68px,12vw,130px)',
            background:'linear-gradient(180deg,rgba(91,156,246,0.22),transparent)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
            top:10, filter:'blur(12px)',
          }}>Alok Munshi</div>
          <h1 className="font-display grad-white" style={{ fontSize:'clamp(68px,12vw,130px)' }}>
            Alok Munshi
          </h1>
        </motion.div>

        <motion.p {...fd(0.5)} style={{ fontSize:'clamp(17px,2.4vw,22px)', fontWeight:300, color:'var(--muted)', marginBottom:10, letterSpacing:'0.01em' }}>
          Growth Strategist. Builder.{' '}
          <span style={{ color:'rgba(241,245,249,0.82)', fontWeight:400 }}>Systems Thinker.</span>
        </motion.p>

        <motion.div {...fd(0.65)} style={{ height:30, marginBottom:44, fontSize:15, color:'var(--blue)', fontWeight:500 }}>
          <TypeAnimation
            sequence={[
              'Scaled 1.4M → 2.5M new users monthly.',2800,
              'Generated $32M in incremental revenue.',2800,
              'Built WhatsApp infra for 9 accounts — solo.',2800,
              '60% conversion uplift via experimentation.',2800,
              'From IIT Kharagpur to the frontier of growth.',2800,
            ]}
            speed={50} repeat={Infinity} wrapper="span"
          />
        </motion.div>

        <motion.div {...fd(0.8)} style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap', marginBottom:72 }}>
          <button className="btn-primary" onClick={() => go('projects')}>See my work</button>
          <button className="btn-ghost" onClick={() => go('journey')}>My journey →</button>
          <a href="https://linkedin.com/in/munshialok" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ textDecoration:'none' }}>
            LinkedIn ↗
          </a>
        </motion.div>

        {/* Metric pill strip */}
        <motion.div {...fd(1.0)} style={{
          display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:1,
          width:'100%', maxWidth:740, borderRadius:22, overflow:'hidden',
        }}>
          {[
            { to:2.5, s:'M', label:'Monthly users scaled', c:'#5b9cf6' },
            { to:32,  p:'$', s:'M', label:'Revenue generated', c:'#f59e0b' },
            { to:60,  s:'%', label:'Conversion uplift', c:'#10b981' },
            { to:29,  p:'+', s:'%', label:'OTR improvement', c:'#8b5cf6' },
          ].map((m,i) => (
            <div key={i} style={{ background:'rgba(255,255,255,0.038)', padding:'22px 14px', textAlign:'center', position:'relative' }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,${m.c}55,transparent)` }} />
              <Count to={m.to} prefix={m.p||''} suffix={m.s} style={{ fontFamily:'var(--font-syne)', fontSize:24, fontWeight:800, letterSpacing:'-0.03em', color:m.c, display:'block', marginBottom:6 }} />
              <span style={{ fontSize:10, fontWeight:500, color:'var(--dim)', letterSpacing:'0.08em', textTransform:'uppercase' }}>{m.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2.6 }}
          style={{ position:'absolute', bottom:28, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}
        >
          <span style={{ fontSize:9, fontWeight:600, letterSpacing:'0.3em', color:'var(--dim)', textTransform:'uppercase' }}>scroll</span>
          <div style={{ width:1, height:44, background:'linear-gradient(180deg,rgba(91,156,246,0.6),transparent)' }} />
        </motion.div>
      </section>

      {/* Ticker */}
      <div style={{ background:'rgba(255,255,255,0.02)', borderTop:'1px solid rgba(255,255,255,0.045)', borderBottom:'1px solid rgba(255,255,255,0.045)', overflow:'hidden', padding:'10px 0', position:'relative', zIndex:10 }}>
        <div className="ticker-run">
          {[...TICKER,...TICKER].map(([lbl,val,col],i) => (
            <span key={i} style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'0 28px', whiteSpace:'nowrap', fontSize:11, fontWeight:500 }}>
              <span style={{ color:'rgba(255,255,255,0.22)', letterSpacing:'0.1em', textTransform:'uppercase' }}>{lbl}</span>
              <span style={{ fontFamily:'var(--font-syne)', fontWeight:700, fontSize:12, color:col as string }}>{val}</span>
              <span style={{ color:'rgba(255,255,255,0.08)' }}>◆</span>
            </span>
          ))}
        </div>
      </div>
    </>
  )
}

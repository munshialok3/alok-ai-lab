'use client'
import { motion } from 'framer-motion'

const fv = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }

export default function Contact() {
  return (
    <section id="contact" className="section layer" style={{ textAlign: 'center' }}>
      <div style={{ maxWidth: 'min(640px, 92vw)', margin: '0 auto' }}>

        <motion.div {...fv} transition={{ duration: 0.7 }}>
          <p className="eyebrow" style={{ justifyContent: 'center' }}>
            Let&apos;s connect
          </p>
          <h2 className="font-display" style={{
            fontSize: 'clamp(44px,8.5vw,100px)',
            letterSpacing: '-0.045em', lineHeight: 0.92,
            background: 'linear-gradient(170deg,#fff 0%,rgba(255,255,255,0.42) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: 'clamp(18px,3vh,28px)',
          }}>
            Let&apos;s build<br />something<br />great.
          </h2>
          <p className="text-body" style={{ marginBottom: 'clamp(28px,5vh,48px)', margin: '0 auto clamp(28px,5vh,48px)' }}>
            I&apos;m a growth strategist who builds the infrastructure himself. If you&apos;re working on something ambitious — a hard scaling challenge, an ambitious product, or a team that needs both strategic thinking and technical execution — I&apos;d love to hear about it.
          </p>
        </motion.div>

        <motion.div {...fv} transition={{ duration: 0.65, delay: 0.15 }} style={{ display: 'flex', gap: 'clamp(8px,1.5vw,14px)', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 'clamp(40px,6vh,64px)' }}>
          <a
            href="https://linkedin.com/in/munshialok"
            target="_blank" rel="noopener noreferrer"
            className="btn-primary"
          >
            <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            Connect on LinkedIn
          </a>
          <a
            href="https://github.com/munshialok3"
            target="_blank" rel="noopener noreferrer"
            className="btn-ghost"
          >
            <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
          <a href="mailto:munshialok3@gmail.com" className="btn-ghost">
            Email me
          </a>
        </motion.div>

        <motion.div {...fv} transition={{ duration: 0.6, delay: 0.28 }}>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 'clamp(24px,4vh,36px)' }}>
            <p style={{ fontSize: 'clamp(12px,1.3vw,14px)', color: 'rgba(232,237,245,0.32)', lineHeight: 1.75, fontStyle: 'italic', fontWeight: 300 }}>
              Open to senior growth, product growth, and strategy roles — as well as advisory, consulting, and collaborative builds. I bring both the strategy and the execution.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: 'clamp(60px,8vh,100px)', paddingTop: 'clamp(20px,3vh,32px)', borderTop: '1px solid rgba(255,255,255,0.04)', textAlign: 'center' }}>
        <p style={{ fontSize: 'clamp(10px,1.1vw,12px)', color: 'rgba(232,237,245,0.2)', letterSpacing: '0.12em', fontWeight: 500, textTransform: 'uppercase' }}>
          Alok Munshi · Gurugram, India · IIT Kharagpur &apos;22 · Built with Next.js &amp; Vercel
        </p>
      </div>
    </section>
  )
}

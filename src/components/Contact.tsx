'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { track } from '@vercel/analytics'

const EMAILJS_PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? ''
const EMAILJS_SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? ''
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? ''

// ─── REPLACE THIS with your Google Calendar appointment link ───────────────
// Go to calendar.google.com → click gear icon → Appointment schedule →
// Create schedule → copy the booking URL and paste it here
const CALENDAR_BOOKING_URL = 'https://cal.com/alok-munshi/quick-chat-with-alok'
// ──────────────────────────────────────────────────────────────────────────

const fv = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }

const inp: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 'clamp(10px,1.2vw,12px)',
  padding: '12px 16px',
  fontSize: 14,
  color: '#e8edf5',
  outline: 'none',
  fontFamily: 'inherit',
  transition: 'border-color .2s, background .2s',
  boxSizing: 'border-box',
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label style={{
      display: 'block', fontSize: 11, fontWeight: 600,
      letterSpacing: '0.1em', color: 'rgba(232,237,245,0.35)',
      textTransform: 'uppercase', marginBottom: 7,
    }}>
      {children}
    </label>
  )
}

function Field({ children }: { children: React.ReactNode }) {
  return <div style={{ marginBottom: 12 }}>{children}</div>
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', body: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [ejsReady, setEjsReady] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).emailjs) { setEjsReady(true); return }
    const s = document.createElement('script')
    s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js'
    s.onload = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(window as any).emailjs.init(EMAILJS_PUBLIC_KEY)
      setEjsReady(true)
    }
    document.head.appendChild(s)
  }, [])

  const ch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const focusOn = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'rgba(79,142,247,0.6)'
    e.target.style.background  = 'rgba(79,142,247,0.04)'
  }
  const focusOff = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'rgba(255,255,255,0.12)'
    e.target.style.background  = 'rgba(255,255,255,0.04)'
  }

  const canSend = form.name.trim() && form.email.trim() && form.subject.trim() && form.body.trim()

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText('munshialok3@gmail.com') }
    catch {
      const tmp = document.createElement('input')
      tmp.value = 'munshialok3@gmail.com'
      document.body.appendChild(tmp); tmp.select()
      document.execCommand('copy'); document.body.removeChild(tmp)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
    track('email_copied')
  }

  const sendViaEmailJS = async () => {
    if (!ejsReady || !canSend) return
    setStatus('sending')
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (window as any).emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: form.name, from_email: form.email,
        phone: form.phone || 'Not provided',
        subject: form.subject, message: form.body,
      })
      setStatus('sent')
      setForm({ name: '', email: '', phone: '', subject: '', body: '' })
      track('contact_form_submitted')
    } catch {
      setStatus('error')
      track('contact_form_failed')
    }
  }

  const openMailClient = () => {
    track('mail_app_opened')
    const bodyText = [
      form.body, '',
      '─────────────────',
      `Name: ${form.name || '(not filled)'}`,
      form.email ? `Email: ${form.email}` : '',
      form.phone ? `Phone / WhatsApp: ${form.phone}` : '',
    ].filter(Boolean).join('\n')
    const sub = encodeURIComponent(form.subject || 'Reaching out from your portfolio')
    window.location.href = `mailto:munshialok3@gmail.com?subject=${sub}&body=${encodeURIComponent(bodyText)}`
  }

  const isDisabled = !canSend || status === 'sending' || status === 'sent'

  return (
    <section id="contact" className="section layer">
      <div style={{ maxWidth: 'min(720px, 92vw)', margin: '0 auto' }}>

        {/* ── Header ── */}
        <motion.div {...fv} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: 'clamp(36px,5vh,56px)' }}>
          <p className="eyebrow" style={{ justifyContent: 'center' }}>Let&apos;s connect</p>
          <h2 className="font-display" style={{
            fontSize: 'clamp(44px,8.5vw,100px)',
            letterSpacing: '-0.045em', lineHeight: 0.92,
            background: 'linear-gradient(170deg,#fff 0%,rgba(255,255,255,0.42) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text', marginBottom: 'clamp(18px,3vh,28px)',
          }}>
            Let&apos;s build<br />something<br />great.
          </h2>
          <p className="text-body" style={{ margin: '0 auto clamp(10px,1.5vh,16px)', maxWidth: 520 }}>
            I&apos;m a growth strategist who builds the infrastructure himself. If you&apos;re working on
            something ambitious — a hard scaling challenge, an ambitious product, or a team that needs
            both strategic thinking and technical execution — I&apos;d love to hear about it.
          </p>
          <p style={{ fontSize: 'clamp(12px,1.2vw,13px)', color: 'rgba(232,237,245,0.3)', fontStyle: 'italic' }}>
            Open to senior growth, product growth &amp; strategy roles — advisory, consulting, and collaborative builds.
          </p>
        </motion.div>

        {/* ── Quick links ── */}
        <motion.div {...fv} transition={{ duration: 0.65, delay: 0.1 }}
          style={{ display: 'flex', gap: 'clamp(8px,1.5vw,12px)', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 'clamp(40px,6vh,56px)', alignItems: 'center' }}>

          <a href="https://linkedin.com/in/munshialok" target="_blank" rel="noopener noreferrer" className="btn-primary"
            onClick={() => track('linkedin_clicked', { source: 'contact' })}>
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            Connect on LinkedIn
          </a>

          <a href="https://github.com/munshialok3" target="_blank" rel="noopener noreferrer" className="btn-ghost"
            onClick={() => track('github_clicked', { source: 'contact' })}>
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>

          {/* Email + inline copy icon */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <a href="mailto:munshialok3@gmail.com" className="btn-ghost"
              onClick={() => track('email_direct_clicked')}>
              ✉ Email directly
            </a>
            <button
              onClick={copyEmail}
              aria-label="Copy email address"
              title={copied ? 'Copied!' : 'Copy email address'}
              style={{
                width: 36, height: 36, borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.12)',
                background: copied ? 'rgba(16,185,129,0.12)' : 'rgba(255,255,255,0.04)',
                color: copied ? '#10b981' : 'rgba(232,237,245,0.5)',
                fontSize: 14, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all .2s', flexShrink: 0,
              }}
            >
              {copied ? '✓' : '⎘'}
            </button>
          </div>
        </motion.div>

        {/* ── Book a call card ── */}
        <motion.div {...fv} transition={{ duration: 0.65, delay: 0.15 }} style={{ marginBottom: 'clamp(24px,4vh,36px)' }}>
          <div style={{
            background: 'rgba(79,142,247,0.06)',
            border: '1px solid rgba(79,142,247,0.18)',
            borderRadius: 'clamp(16px,2vw,22px)',
            padding: 'clamp(20px,2.8vw,28px) clamp(20px,3vw,32px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              {/* Calendar icon */}
              <div style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                background: 'rgba(79,142,247,0.12)',
                border: '1px solid rgba(79,142,247,0.22)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20,
              }}>
                📅
              </div>
              <div>
                <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(14px,1.5vw,16px)', color: '#fff', marginBottom: 3 }}>
                  Prefer to talk directly?
                </p>
                <p style={{ fontSize: 'clamp(12px,1.2vw,13px)', color: 'rgba(232,237,245,0.45)', fontWeight: 300 }}>
                  Book a 20-minute slot on my Google Calendar — pick whatever works for you.
                </p>
              </div>
            </div>
            <a
              href={CALENDAR_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('calendar_booking_clicked')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '10px 22px',
                borderRadius: 100,
                background: 'rgba(79,142,247,0.15)',
                border: '1px solid rgba(79,142,247,0.35)',
                color: '#7aadff',
                fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
                textDecoration: 'none', whiteSpace: 'nowrap',
                transition: 'all .2s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = 'rgba(79,142,247,0.25)'
                el.style.borderColor = 'rgba(79,142,247,0.55)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = 'rgba(79,142,247,0.15)'
                el.style.borderColor = 'rgba(79,142,247,0.35)'
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              Book 20 mins →
            </a>
          </div>
        </motion.div>

        {/* ── Contact Form ── */}
        <motion.div {...fv} transition={{ duration: 0.65, delay: 0.2 }}>
          <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(79,142,247,0.55),transparent)' }} />
            <div style={{ position: 'absolute', top: -20, right: -20, width: 'min(200px,30vw)', height: 'min(200px,30vw)', borderRadius: '50%', background: 'radial-gradient(circle,rgba(79,142,247,0.05),transparent 70%)', pointerEvents: 'none' }} />

            <div className="p-card">
              <div style={{ marginBottom: 'clamp(20px,3vh,28px)' }}>
                <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(16px,1.8vw,20px)', color: '#fff', marginBottom: 6 }}>
                  Send me a message
                </p>
                <p style={{ fontSize: 'clamp(12px,1.2vw,13px)', color: 'rgba(232,237,245,0.35)', margin: 0 }}>
                  Hit <strong style={{ color: 'rgba(232,237,245,0.6)' }}>Send message</strong> to deliver it directly from this page, or use{' '}
                  <strong style={{ color: 'rgba(232,237,245,0.6)' }}>Open in mail app</strong> to send from your own email client.
                </p>
              </div>

              <div className="contact-row">
                <Field>
                  <Label>Your name *</Label>
                  <input name="name" value={form.name} onChange={ch} onFocus={focusOn} onBlur={focusOff} placeholder="Jane Smith" style={inp} />
                </Field>
                <Field>
                  <Label>Your email *</Label>
                  <input name="email" type="email" value={form.email} onChange={ch} onFocus={focusOn} onBlur={focusOff} placeholder="jane@company.com" style={inp} />
                </Field>
              </div>

              <div className="contact-row">
                <Field>
                  <Label>Phone / WhatsApp</Label>
                  <input name="phone" value={form.phone} onChange={ch} onFocus={focusOn} onBlur={focusOff} placeholder="+91 xxxxx xxxxx" style={inp} />
                </Field>
                <Field>
                  <Label>Subject *</Label>
                  <input name="subject" value={form.subject} onChange={ch} onFocus={focusOn} onBlur={focusOff} placeholder="Growth role at [Company]" style={inp} />
                </Field>
              </div>

              <Field>
                <Label>Message *</Label>
                <textarea name="body" value={form.body} onChange={ch} onFocus={focusOn} onBlur={focusOff}
                  rows={5} placeholder="Tell me about what you're working on, the challenge you're facing, or the role you have in mind..."
                  style={{ ...inp, resize: 'vertical', minHeight: 120, lineHeight: 1.6 }} />
              </Field>

              {status === 'sent' && (
                <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 10, padding: '12px 16px', marginBottom: 16, color: '#10b981', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                  ✓ Message sent — I&apos;ll get back to you soon!
                </div>
              )}
              {status === 'error' && (
                <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.22)', borderRadius: 10, padding: '12px 16px', marginBottom: 16, color: '#ef4444', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                  ⚠ Something went wrong. Try the mail app button, or email munshialok3@gmail.com directly.
                </div>
              )}

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginTop: 8 }}>
                <button
                  onClick={sendViaEmailJS}
                  disabled={isDisabled}
                  className="btn-primary"
                  style={{
                    opacity: isDisabled ? 0.4 : 1,
                    filter: isDisabled ? 'saturate(0.6)' : 'none',
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                  }}
                >
                  {status === 'sending' ? (
                    <>
                      <span style={{ display: 'inline-block', width: 12, height: 12, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin .7s linear infinite' }} />
                      Sending…
                    </>
                  ) : status === 'sent' ? '✓ Sent!' : 'Send message →'}
                </button>
                <button onClick={openMailClient} className="btn-ghost" style={{ fontSize: 13 }}>
                  ✉ Open in mail app
                </button>
                <span style={{ fontSize: 11, color: 'rgba(232,237,245,0.22)' }}>* required</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Footer ── */}
        <div style={{ marginTop: 'clamp(60px,8vh,100px)', paddingTop: 'clamp(20px,3vh,32px)', borderTop: '1px solid rgba(255,255,255,0.04)', textAlign: 'center' }}>
          <p style={{ fontSize: 'clamp(10px,1.1vw,12px)', color: 'rgba(232,237,245,0.2)', letterSpacing: '0.12em', fontWeight: 500, textTransform: 'uppercase' }}>
            Alok Munshi · Gurugram, India · IIT Kharagpur &apos;22 · Eternal · American Express · OYO
          </p>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div className={`copy-toast${copied ? ' show' : ''}`}>munshialok3@gmail.com copied!</div>
    </section>
  )
}

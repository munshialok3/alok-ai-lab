'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback, useRef } from 'react'
import { track } from '@vercel/analytics'

const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function ResumeGateModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name,     setName]     = useState('')
  const [email,    setEmail]    = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [reason,   setReason]   = useState('')
  const [status,   setStatus]   = useState<Status>('idle')
  const [errMsg,   setErrMsg]   = useState('')
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.paddingRight = `${scrollbarWidth}px`
    document.documentElement.classList.add('modal-open')
    const nav = document.querySelector('nav') as HTMLElement | null
    if (nav) nav.classList.add('nav-modal-hidden')
    setTimeout(() => closeButtonRef.current?.focus(), 50)
    return () => {
      document.body.style.paddingRight = ''
      document.documentElement.classList.remove('modal-open')
      if (nav) nav.classList.remove('nav-modal-hidden')
    }
  }, [open])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && open) onClose()
  }, [open, onClose])
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setName(''); setEmail(''); setLinkedin(''); setReason('')
        setStatus('idle'); setErrMsg('')
      }, 300)
    }
  }, [open])

  const valid = name.trim().length > 1 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  async function handleSubmit() {
    if (!valid || status === 'submitting') return
    if (!APPS_SCRIPT_URL) {
      setStatus('error')
      setErrMsg('Resume request service is not configured. Please reach out directly on LinkedIn.')
      return
    }
    setStatus('submitting')
    setErrMsg('')
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 8000)
      const params = new URLSearchParams({
        name: name.trim(), email: email.trim().toLowerCase(),
        linkedin: linkedin.trim(), reason: reason.trim(),
        timestamp: new Date().toISOString(),
      })
      await fetch(`${APPS_SCRIPT_URL}?${params.toString()}`, { method: 'GET', mode: 'no-cors', signal: controller.signal })
      clearTimeout(timeout)
      setStatus('success')
      // Track successful resume request
      track('resume_requested', {
        has_linkedin: linkedin.trim().length > 0 ? 'yes' : 'no',
        has_reason:   reason.trim().length > 0 ? 'yes' : 'no',
      })
    } catch (err) {
      setErrMsg(err instanceof Error && err.name === 'AbortError'
        ? 'Request timed out. Please try again or reach out directly on LinkedIn.'
        : 'Something went wrong. Please try again or reach out directly on LinkedIn.')
      setStatus('error')
      track('resume_request_failed')
    }
  }

  const inp: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 10, padding: '11px 14px', fontSize: 14,
    color: '#e8edf5', outline: 'none',
    transition: 'border-color .2s', boxSizing: 'border-box', fontFamily: 'inherit',
  }
  const lbl: React.CSSProperties = {
    fontSize: 11, fontWeight: 600, letterSpacing: '0.12em',
    textTransform: 'uppercase', color: 'rgba(232,237,245,0.4)',
    display: 'block', marginBottom: 7,
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog" aria-modal="true"
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            zIndex: 300,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 'clamp(16px,3vw,32px)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            onClick={e => e.stopPropagation()}
            style={{
              background: '#0a0f1e',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 24, width: '100%', maxWidth: 480,
              position: 'relative', overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(79,142,247,0.7),transparent)' }} />
            <div style={{ padding: 'clamp(28px,4vw,40px)' }}>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                aria-label="Close"
                style={{
                  position: 'absolute', top: 18, right: 18,
                  background: 'rgba(255,255,255,0.10)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  color: 'rgba(255,255,255,0.8)',
                  width: 32, height: 32, borderRadius: '50%',
                  fontSize: 15, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >✕</button>

              {status !== 'success' ? (
                <>
                  <div style={{ marginBottom: 24 }}>
                    <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4f8ef7', marginBottom: 10 }}>Resume Request</p>
                    <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(20px,3vw,24px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', marginBottom: 10 }}>
                      Let&apos;s make sure it&apos;s a fit.
                    </h2>
                    <p style={{ fontSize: 13, color: 'rgba(232,237,245,0.45)', lineHeight: 1.65, fontWeight: 300 }}>
                      I review every request personally and respond within 24 hours. A LinkedIn URL helps me understand the context.
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div>
                      <label htmlFor="rg-name" style={lbl}>Full Name <span style={{ color: '#4f8ef7' }}>*</span></label>
                      <input id="rg-name" style={inp} value={name} onChange={e => setName(e.target.value)} placeholder="Jane Smith"
                        maxLength={100} autoComplete="name"
                        onFocus={e => (e.target.style.borderColor = 'rgba(79,142,247,0.6)')}
                        onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')} />
                    </div>
                    <div>
                      <label htmlFor="rg-email" style={lbl}>Email <span style={{ color: '#4f8ef7' }}>*</span></label>
                      <input id="rg-email" style={inp} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jane@company.com"
                        maxLength={254} autoComplete="email"
                        onFocus={e => (e.target.style.borderColor = 'rgba(79,142,247,0.6)')}
                        onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')} />
                    </div>
                    <div>
                      <label htmlFor="rg-linkedin" style={lbl}>LinkedIn URL <span style={{ color: 'rgba(232,237,245,0.3)' }}>(recommended)</span></label>
                      <input id="rg-linkedin" style={inp} value={linkedin} onChange={e => setLinkedin(e.target.value)} placeholder="linkedin.com/in/yourprofile"
                        maxLength={200}
                        onFocus={e => (e.target.style.borderColor = 'rgba(79,142,247,0.6)')}
                        onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')} />
                    </div>
                    <div>
                      <label htmlFor="rg-reason" style={lbl}>Why are you reaching out? <span style={{ color: 'rgba(232,237,245,0.3)' }}>(optional)</span></label>
                      <textarea id="rg-reason" style={{ ...inp, resize: 'none', minHeight: 80, lineHeight: 1.6 }}
                        value={reason} onChange={e => setReason(e.target.value)}
                        placeholder="e.g. Hiring for a growth role at our company, exploring collaboration..."
                        maxLength={1000}
                        onFocus={e => (e.target.style.borderColor = 'rgba(79,142,247,0.6)')}
                        onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')} />
                    </div>
                    {errMsg && <p role="alert" style={{ fontSize: 12, color: '#f87171', lineHeight: 1.5 }}>{errMsg}</p>}
                    <button
                      onClick={handleSubmit}
                      disabled={!valid || status === 'submitting'}
                      className="btn-primary"
                      style={{
                        width: '100%', justifyContent: 'center', fontSize: 14, padding: '13px 0', marginTop: 4,
                        opacity: (!valid || status === 'submitting') ? 0.45 : 1,
                        cursor: (!valid || status === 'submitting') ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {status === 'submitting' ? 'Sending request…' : 'Request Resume →'}
                    </button>
                    <p style={{ fontSize: 11, color: 'rgba(232,237,245,0.22)', textAlign: 'center', lineHeight: 1.6 }}>
                      Your details are only used to evaluate this request. No spam, ever.
                    </p>
                    <p style={{ fontSize: 11, color: 'rgba(232,237,245,0.22)', textAlign: 'center', lineHeight: 1.6, marginTop: 4 }}>
                      <a href="/privacy" style={{ color: 'rgba(232,237,245,0.35)', textDecoration: 'underline' }}>Privacy policy</a>
                    </p>
                  </div>
                </>
              ) : (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', padding: '16px 0 8px' }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, margin: '0 auto 20px' }}>✓</div>
                  <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 12 }}>Request received.</h2>
                  <p style={{ fontSize: 14, color: 'rgba(232,237,245,0.45)', lineHeight: 1.7, fontWeight: 300, maxWidth: 340, margin: '0 auto 28px' }}>
                    I review every request personally. If it&apos;s a fit, you&apos;ll get my resume directly in your inbox — typically within 24 hours.
                  </p>
                  <button onClick={onClose} className="btn-ghost" style={{ fontSize: 13, padding: '10px 24px' }}>Close</button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

// ─── PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL HERE ───────────────────────────
const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL!
// ──────────────────────────────────────────────────────────────────────────────

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function ResumeGateModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [reason, setReason]     = useState('')
  const [status, setStatus]     = useState<Status>('idle')
  const [errMsg, setErrMsg]     = useState('')

  // Lock html scroll only — no body position change, no scroll jump on close
  useEffect(() => {
    if (!open) return
    const html = document.documentElement
    const prev = html.style.overflow
    html.style.overflow = 'hidden'
    return () => {
      html.style.overflow = prev
    }
  }, [open])

  // Reset form when modal closes
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
    setStatus('submitting')
    setErrMsg('')
    try {
      const params = new URLSearchParams({
        name:      name.trim(),
        email:     email.trim().toLowerCase(),
        linkedin:  linkedin.trim(),
        reason:    reason.trim(),
        timestamp: new Date().toISOString(),
      })
      await fetch(`${APPS_SCRIPT_URL}?${params.toString()}`, {
        method: 'GET',
        mode: 'no-cors',
      })
      // no-cors means we can't read the response — assume success if no throw
      setStatus('success')
    } catch {
      setStatus('error')
      setErrMsg('Something went wrong. Please try again or reach out directly on LinkedIn.')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: '11px 14px',
    fontSize: 14,
    color: 'rgba(232,237,245,0.88)',
    outline: 'none',
    transition: 'border-color .2s',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'rgba(232,237,245,0.35)',
    display: 'block',
    marginBottom: 7,
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
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
              borderRadius: 24,
              width: '100%',
              maxWidth: 480,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Top accent line */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 1,
              background: 'linear-gradient(90deg,transparent,rgba(79,142,247,0.7),transparent)',
            }} />

            <div style={{ padding: 'clamp(28px,4vw,40px)' }}>
              {/* Close */}
              <button
                onClick={onClose}
                style={{
                  position: 'absolute', top: 18, right: 18,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.5)',
                  width: 32, height: 32, borderRadius: '50%',
                  fontSize: 14, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >✕</button>

              {status !== 'success' ? (
                <>
                  <div style={{ marginBottom: 24 }}>
                    <p style={{
                      fontSize: 11, fontWeight: 600, letterSpacing: '0.2em',
                      textTransform: 'uppercase', color: '#4f8ef7', marginBottom: 10,
                    }}>
                      Resume Request
                    </p>
                    <h2 style={{
                      fontFamily: 'Syne, sans-serif', fontSize: 'clamp(20px,3vw,24px)',
                      fontWeight: 800, letterSpacing: '-0.03em', color: '#fff',
                      marginBottom: 10,
                    }}>
                      Let&apos;s make sure it&apos;s a fit.
                    </h2>
                    <p style={{
                      fontSize: 13, color: 'rgba(232,237,245,0.4)',
                      lineHeight: 1.65, fontWeight: 300,
                    }}>
                      I review every request personally and respond within 24 hours.
                      A LinkedIn URL helps me understand the context.
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {/* Name */}
                    <div>
                      <label style={labelStyle}>Full Name <span style={{ color: '#4f8ef7' }}>*</span></label>
                      <input
                        style={inputStyle}
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Jane Smith"
                        onFocus={e => (e.target.style.borderColor = 'rgba(79,142,247,0.5)')}
                        onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label style={labelStyle}>Email <span style={{ color: '#4f8ef7' }}>*</span></label>
                      <input
                        style={inputStyle}
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="jane@company.com"
                        onFocus={e => (e.target.style.borderColor = 'rgba(79,142,247,0.5)')}
                        onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                      />
                    </div>

                    {/* LinkedIn */}
                    <div>
                      <label style={labelStyle}>LinkedIn URL <span style={{ color: 'rgba(232,237,245,0.22)' }}>(recommended)</span></label>
                      <input
                        style={inputStyle}
                        value={linkedin}
                        onChange={e => setLinkedin(e.target.value)}
                        placeholder="linkedin.com/in/yourprofile"
                        onFocus={e => (e.target.style.borderColor = 'rgba(79,142,247,0.5)')}
                        onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                      />
                    </div>

                    {/* Reason */}
                    <div>
                      <label style={labelStyle}>Why are you reaching out? <span style={{ color: 'rgba(232,237,245,0.22)' }}>(optional)</span></label>
                      <textarea
                        style={{ ...inputStyle, resize: 'none', minHeight: 80, lineHeight: 1.6 }}
                        value={reason}
                        onChange={e => setReason(e.target.value)}
                        placeholder="e.g. Hiring for a growth role at our company, exploring collaboration..."
                        onFocus={e => (e.target.style.borderColor = 'rgba(79,142,247,0.5)')}
                        onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                      />
                    </div>

                    {errMsg && (
                      <p style={{ fontSize: 12, color: '#f87171', lineHeight: 1.5 }}>{errMsg}</p>
                    )}

                    <button
                      onClick={handleSubmit}
                      disabled={!valid || status === 'submitting'}
                      className="btn-primary"
                      style={{
                        width: '100%',
                        opacity: (!valid || status === 'submitting') ? 0.45 : 1,
                        cursor: (!valid || status === 'submitting') ? 'not-allowed' : 'pointer',
                        justifyContent: 'center',
                        fontSize: 14,
                        padding: '13px 0',
                        marginTop: 4,
                      }}
                    >
                      {status === 'submitting' ? 'Sending request…' : 'Request Resume →'}
                    </button>

                    <p style={{
                      fontSize: 11, color: 'rgba(232,237,245,0.2)',
                      textAlign: 'center', lineHeight: 1.6,
                    }}>
                      Your details are only used to evaluate this request. No spam, ever.
                    </p>
                  </div>
                </>
              ) : (
                /* Success state */
                <motion.div
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  style={{ textAlign: 'center', padding: '16px 0 8px' }}
                >
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: 'rgba(16,185,129,0.1)',
                    border: '1px solid rgba(16,185,129,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 24, margin: '0 auto 20px',
                  }}>
                    ✓
                  </div>
                  <h2 style={{
                    fontFamily: 'Syne, sans-serif', fontSize: 22,
                    fontWeight: 800, color: '#fff', marginBottom: 12,
                  }}>
                    Request received.
                  </h2>
                  <p style={{
                    fontSize: 14, color: 'rgba(232,237,245,0.45)',
                    lineHeight: 1.7, fontWeight: 300, maxWidth: 340, margin: '0 auto 28px',
                  }}>
                    I review every request personally. If it&apos;s a fit, you&apos;ll get my resume
                    directly in your inbox — typically within 24 hours.
                  </p>
                  <button
                    onClick={onClose}
                    className="btn-ghost"
                    style={{ fontSize: 13, padding: '10px 24px' }}
                  >
                    Close
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
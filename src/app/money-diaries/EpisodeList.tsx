'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface Episode {
  episodeNo: string
  title: string
  concept: string
  hookLine: string
  character: string
  postText: string
  postUrl: string
  postedDate: string
  likes: string
  comments: string
}

function EpisodeModal({ ep, onClose }: { ep: Episode; onClose: () => void }) {
  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.paddingRight = `${scrollbarWidth}px`
    document.documentElement.classList.add('modal-open')
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.paddingRight = ''
      document.documentElement.classList.remove('modal-open')
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const num = ep.episodeNo.replace(/\D/g, '')
  const likes    = ep.likes    && ep.likes    !== '0' ? ep.likes    : null
  const comments = ep.comments && ep.comments !== '0' ? ep.comments : null

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog" aria-modal="true" aria-label={ep.title}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.9)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        zIndex: 300,
        overflowY: 'auto', overflowX: 'hidden',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}
    >
      {/* Sticky close bar */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'sticky', top: 0, zIndex: 10,
          width: '100%', maxWidth: 'min(660px, 95vw)',
          display: 'flex', justifyContent: 'flex-end',
          padding: '16px 12px 8px',
          background: 'rgba(0,0,0,0.9)',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            background: 'rgba(255,255,255,0.12)',
            border: '1.5px solid rgba(255,255,255,0.4)',
            color: 'rgba(255,255,255,0.9)',
            width: 44, height: 44, borderRadius: '50%',
            fontSize: 18, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}
        >✕</button>
      </div>

      {/* Modal card */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 'min(660px, 95vw)',
          margin: '0 auto 48px',
          background: '#0a0f1e',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 'clamp(16px,2vw,24px)',
          overflow: 'hidden',
        }}
      >
        {/* Top accent line */}
        <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(79,142,247,0.6),transparent)' }} />

        <div style={{ padding: 'clamp(24px,3vw,36px)' }}>
          {/* Header */}
          <div style={{ marginBottom: 'clamp(20px,3vh,28px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
              <span style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 800,
                fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
                background: 'rgba(79,142,247,0.15)', border: '1px solid rgba(79,142,247,0.3)',
                color: '#7aadff', padding: '4px 12px', borderRadius: 100,
              }}>
                Episode {num}
              </span>
              {ep.character && (
                <span style={{
                  fontSize: 11, color: 'rgba(232,237,245,0.4)',
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                  padding: '4px 10px', borderRadius: 100,
                }}>
                  ft. {ep.character}
                </span>
              )}
            </div>
            <h2 style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 800,
              fontSize: 'clamp(20px,2.8vw,26px)', letterSpacing: '-0.03em',
              color: '#fff', lineHeight: 1.2, marginBottom: 10,
            }}>
              {ep.title}
            </h2>
            {ep.concept && (
              <span style={{
                display: 'inline-block', fontSize: 11, fontWeight: 600,
                color: '#4f8ef7', background: 'rgba(79,142,247,0.1)',
                border: '1px solid rgba(79,142,247,0.2)',
                padding: '3px 10px', borderRadius: 100,
              }}>
                {ep.concept}
              </span>
            )}
          </div>

          {/* Stats row */}
          {(ep.postedDate || likes || comments) && (
            <div style={{
              display: 'flex', gap: 16, flexWrap: 'wrap',
              padding: '12px 0', marginBottom: 20,
              borderTop: '1px solid rgba(255,255,255,0.06)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              {ep.postedDate && (
                <span style={{ fontSize: 12, color: 'rgba(232,237,245,0.4)' }}>
                  📅 {ep.postedDate}
                </span>
              )}
              {likes && (
                <span style={{ fontSize: 12, color: 'rgba(232,237,245,0.4)' }}>
                  👍 {likes} likes
                </span>
              )}
              {comments && (
                <span style={{ fontSize: 12, color: 'rgba(232,237,245,0.4)' }}>
                  💬 {comments} comments
                </span>
              )}
            </div>
          )}

          {/* Full post text */}
          {ep.postText ? (
            <div style={{
              fontSize: 'clamp(13px,1.4vw,15px)',
              color: 'rgba(232,237,245,0.75)',
              lineHeight: 1.85, fontWeight: 300,
              whiteSpace: 'pre-wrap',
              marginBottom: 'clamp(24px,3vh,32px)',
            }}>
              {ep.postText}
            </div>
          ) : (
            <p style={{ fontSize: 14, color: 'rgba(232,237,245,0.3)', fontStyle: 'italic', marginBottom: 32 }}>
              Full episode text not available.
            </p>
          )}

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {ep.postUrl ? (
              <a
                href={ep.postUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  padding: '10px 22px', borderRadius: 100,
                  background: 'linear-gradient(135deg, #4f8ef7, #8b5cf6)',
                  color: '#fff', fontSize: 13, fontWeight: 600,
                  textDecoration: 'none', fontFamily: 'inherit',
                }}
              >
                <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Read on LinkedIn ↗
              </a>
            ) : (
              <span style={{ fontSize: 12, color: 'rgba(232,237,245,0.3)', fontStyle: 'italic', alignSelf: 'center' }}>
                LinkedIn link not yet available
              </span>
            )}
            <button
              onClick={onClose}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '10px 22px', borderRadius: 100,
                background: 'transparent', border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(232,237,245,0.5)', fontSize: 13, fontWeight: 500,
                cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const fv = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }

export default function EpisodeList({ episodes }: { episodes: Episode[] }) {
  const [active, setActive] = useState<Episode | null>(null)

  return (
    <>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
        gap: 'clamp(10px,1.5vw,16px)',
      }}>
        {episodes.map((ep, i) => {
          const num     = ep.episodeNo.replace(/\D/g, '').padStart(2, '0')
          const likes   = ep.likes    && ep.likes    !== '0' ? ep.likes    : null
          const comments = ep.comments && ep.comments !== '0' ? ep.comments : null

          return (
            <motion.button
              key={ep.episodeNo}
              {...fv}
              transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.3) }}
              onClick={() => setActive(ep)}
              style={{
                all: 'unset',
                display: 'block',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 'clamp(14px,1.8vw,20px)',
                padding: 'clamp(18px,2.2vw,24px)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'border-color .25s, background .25s, transform .2s',
                position: 'relative', overflow: 'hidden',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLButtonElement
                el.style.borderColor = 'rgba(79,142,247,0.3)'
                el.style.background  = 'rgba(79,142,247,0.04)'
                el.style.transform   = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLButtonElement
                el.style.borderColor = 'rgba(255,255,255,0.08)'
                el.style.background  = 'rgba(255,255,255,0.03)'
                el.style.transform   = 'translateY(0)'
              }}
            >
              {/* Top accent */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(79,142,247,0.25),transparent)' }} />

              {/* Episode number + date row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <span style={{
                  fontFamily: 'Syne, sans-serif', fontWeight: 800,
                  fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: '#4f8ef7',
                }}>
                  Ep {num}
                </span>
                {ep.postedDate && (
                  <span style={{ fontSize: 10, color: 'rgba(232,237,245,0.28)', letterSpacing: '0.06em' }}>
                    {ep.postedDate}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 700,
                fontSize: 'clamp(14px,1.6vw,17px)', color: '#fff',
                letterSpacing: '-0.02em', lineHeight: 1.3,
                marginBottom: 10,
              }}>
                {ep.title}
              </h3>

              {/* Concept tag */}
              {ep.concept && (
                <div style={{ marginBottom: 12 }}>
                  <span style={{
                    display: 'inline-block',
                    fontSize: 10, fontWeight: 600, letterSpacing: '0.06em',
                    color: '#4f8ef7', background: 'rgba(79,142,247,0.1)',
                    border: '1px solid rgba(79,142,247,0.18)',
                    padding: '3px 9px', borderRadius: 100,
                  }}>
                    {ep.concept.length > 40 ? ep.concept.slice(0, 38) + '…' : ep.concept}
                  </span>
                </div>
              )}

              {/* Hook line */}
              {ep.hookLine && (
                <p style={{
                  fontSize: 'clamp(12px,1.2vw,13px)',
                  color: 'rgba(232,237,245,0.45)',
                  lineHeight: 1.65, fontWeight: 300, fontStyle: 'italic',
                  marginBottom: 16,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  &ldquo;{ep.hookLine}&rdquo;
                </p>
              )}

              {/* Footer row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: '#4f8ef7', fontWeight: 600 }}>
                  Read episode →
                </span>
                {(likes || comments) && (
                  <div style={{ display: 'flex', gap: 10 }}>
                    {likes && <span style={{ fontSize: 10, color: 'rgba(232,237,245,0.28)' }}>👍 {likes}</span>}
                    {comments && <span style={{ fontSize: 10, color: 'rgba(232,237,245,0.28)' }}>💬 {comments}</span>}
                  </div>
                )}
              </div>
            </motion.button>
          )
        })}
      </div>

      <AnimatePresence>
        {active && <EpisodeModal ep={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </>
  )
}

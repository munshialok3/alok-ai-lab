'use client'
import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import type { Episode } from '@/lib/money-diaries'
import { getEpisodeColor } from '@/lib/money-diaries'

const fv = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }

export default function EpisodeList({ episodes }: { episodes: Episode[] }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return episodes
    const q = query.trim().toLowerCase()
    return episodes.filter(ep =>
      ep.title.toLowerCase().includes(q) ||
      ep.concept.toLowerCase().includes(q) ||
      ep.hookLine.toLowerCase().includes(q) ||
      ep.character.toLowerCase().includes(q) ||
      ep.episodeNumber.toString() === q ||
      `ep ${ep.episodeNumber}` === q ||
      `episode ${ep.episodeNumber}` === q
    )
  }, [query, episodes])

  return (
    <>
      {/* Search bar */}
      <div style={{
        position: 'relative',
        marginBottom: 'clamp(20px,2.5vw,28px)',
      }}>
        <svg
          width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
          style={{
            position: 'absolute',
            left: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'rgba(232,237,245,0.35)',
            pointerEvents: 'none',
          }}
        >
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search episodes by title, concept, or number..."
          style={{
            width: '100%',
            padding: '14px 48px 14px 44px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 'clamp(12px,1.5vw,16px)',
            color: '#e8edf5',
            fontSize: 14,
            fontFamily: 'inherit',
            outline: 'none',
            transition: 'border-color .2s, background .2s',
            boxSizing: 'border-box',
          }}
          onFocus={e => {
            e.target.style.borderColor = 'rgba(79,142,247,0.5)'
            e.target.style.background = 'rgba(79,142,247,0.04)'
          }}
          onBlur={e => {
            e.target.style.borderColor = 'rgba(255,255,255,0.08)'
            e.target.style.background = 'rgba(255,255,255,0.04)'
          }}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            aria-label="Clear search"
            style={{
              position: 'absolute',
              right: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 28, height: 28,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
              border: 'none',
              color: 'rgba(232,237,245,0.6)',
              fontSize: 14,
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'inherit',
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Results count */}
      {query && (
        <p style={{
          fontSize: 12,
          color: 'rgba(232,237,245,0.4)',
          marginBottom: 20,
          fontWeight: 300,
        }}>
          {filtered.length} {filtered.length === 1 ? 'episode' : 'episodes'} found
        </p>
      )}

      {/* Episode grid */}
      {filtered.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: 'clamp(40px,6vw,60px) 20px',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: 20,
        }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>🔍</div>
          <p style={{ fontSize: 14, color: 'rgba(232,237,245,0.5)', fontWeight: 300 }}>
            No episodes match &ldquo;{query}&rdquo;
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))',
          gap: 'clamp(12px,1.8vw,18px)',
        }}>
          {filtered.map((ep, i) => {
            const col = getEpisodeColor(ep.episodeNumber)
            const num = ep.episodeNumber.toString().padStart(2, '0')
            const likes = ep.likes && ep.likes !== '0' ? ep.likes : null
            const comments = ep.comments && ep.comments !== '0' ? ep.comments : null

            return (
              <motion.div
                key={ep.slug}
                {...fv}
                transition={{ duration: 0.5, delay: Math.min(i * 0.03, 0.3) }}
              >
                <Link
                  href={`/money-diaries/${ep.slug}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 'clamp(14px,1.8vw,20px)',
                    padding: 'clamp(20px,2.5vw,28px)',
                    textDecoration: 'none',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'border-color .3s, background .3s, transform .2s',
                    minHeight: 220,
                    height: '100%',
                  }}
                >
                  {/* Top accent */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                    background: `linear-gradient(90deg, transparent, ${col}80, transparent)`,
                  }} />

                  {/* Corner glow */}
                  <div style={{
                    position: 'absolute', top: -30, right: -30,
                    width: 'min(160px,25vw)', height: 'min(160px,25vw)',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${col}10, transparent 70%)`,
                    pointerEvents: 'none',
                  }} />

                  {/* Episode number + date */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <span style={{
                      fontFamily: 'Syne, sans-serif', fontWeight: 800,
                      fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
                      color: col,
                    }}>Ep {num}
                    </span>
                    <span style={{
                      fontSize: 10, color: 'rgba(232,237,245,0.3)',
                      letterSpacing: '0.06em',}}>
                      {ep.readingTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontFamily: 'Syne, sans-serif', fontWeight: 700,
                    fontSize: 'clamp(15px,1.7vw,18px)', color: '#fff',
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
                        color: col, background: `${col}12`,
                        border: `1px solid ${col}28`,
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
                      color: 'rgba(232,237,245,0.5)',
                      lineHeight: 1.65, fontWeight: 300, fontStyle: 'italic',
                      marginBottom: 16,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      flexGrow: 1,
                    }}>
                      &ldquo;{ep.hookLine}&rdquo;
                    </p>
                  )}

                  {/* Footer */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <span style={{ fontSize: 11, color: col, fontWeight: 600 }}>
                      Read episode →
                    </span>
                    {(likes || comments || ep.postedDate) && (
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        {ep.postedDate && <span style={{ fontSize: 10, color: 'rgba(232,237,245,0.28)' }}>{ep.postedDate}</span>}
                        {likes && <span style={{ fontSize: 10, color: 'rgba(232,237,245,0.3)' }}>👍 {likes}</span>}
                        {comments && <span style={{ fontSize: 10, color: 'rgba(232,237,245,0.3)' }}>💬 {comments}</span>}
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      )}
    </>
  )
}

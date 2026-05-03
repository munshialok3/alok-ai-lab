import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/writing'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Writing — Alok Munshi',
  description: 'Thoughts on growth strategy, building infrastructure, and navigating a career in tech.',
}

export default function WritingPage() {
  const posts = getAllPosts()

  return (
    <div style={{
      minHeight: '100vh',
      background: '#060810',
      color: '#e8edf5',
      fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
    }}>
      <div style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,40px) clamp(48px,6vw,80px)', maxWidth: 1080, margin: '0 auto' }}>

        <Link href="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 13, color: 'rgba(232,237,245,0.4)',
          textDecoration: 'none', marginBottom: 44,
        }}>
          ← Back to portfolio
        </Link>

        {/* Header */}
        <div style={{ marginBottom: 'clamp(40px,6vw,64px)' }}>
          <p style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.26em',
            textTransform: 'uppercase', color: '#4f8ef7', marginBottom: 14,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ display: 'block', width: 22, height: 1, background: '#4f8ef7', flexShrink: 0 }} />
            Writing
          </p>
          <h1 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800,
            fontSize: 'clamp(36px,6vw,68px)', letterSpacing: '-0.04em',
            lineHeight: 0.95, color: '#fff', marginBottom: 'clamp(16px,2vw,22px)',
          }}>
            Thinking<br />out loud.
          </h1>
          <p style={{
            fontSize: 'clamp(14px,1.4vw,16px)',
            color: 'rgba(232,237,245,0.5)',
            lineHeight: 1.75, fontWeight: 300, maxWidth: 500,
          }}>
            Notes on growth strategy, building things, career decisions, and whatever else I find worth writing about.
          </p>
        </div>

        {/* Posts grid */}
        {posts.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: 'clamp(60px,10vw,100px) 20px',
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 24,}}>
            <div style={{ fontSize: 32, marginBottom: 16 }}>✍️</div>
            <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 10 }}>
              Coming soon
            </p>
            <p style={{ fontSize: 13, color: 'rgba(232,237,245,0.3)', fontWeight: 300, maxWidth: 320, margin: '0 auto' }}>
              First post is in the works. Check back soon.
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))',
            gap: 'clamp(12px,1.8vw,18px)',
          }}>
            {posts.map((post, i) => {
              const colors = ['#4f8ef7', '#8b5cf6', '#10b981', '#f59e0b']
              const col = colors[i % colors.length]

              return (
                <Link
                  key={post.slug}
                  href={`/writing/${post.slug}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 'clamp(14px,1.8vw,20px)',
                    padding: 'clamp(22px,2.8vw,32px)',
                    textDecoration: 'none',
                    position: 'relative',
                    overflow: 'hidden',
                transition: 'border-color .3s, background .3s, transform .2s',
                    minHeight: 220,
                  }}
                >
                  {/* Top accent line */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                    background: `linear-gradient(90deg, transparent, ${col}80, transparent)`,
                  }} />

                  {/* Corner glow */}
                  <div style={{
                    position: 'absolute', top: -30, right: -30,
                    width: 'min(160px,25vw)', height: 'min(160px,25vw)',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${col}08, transparent 70%)`,
                    pointerEvents: 'none',
                  }} />

                  {/* Date + reading time */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, gap: 12 }}>
                    <span style={{
                      fontSize: 10, fontWeight: 600, letterSpacing: '0.1em',
                      textTransform: 'uppercase', color: col, opacity: 0.8,
                    }}>
                      {post.date}
                    </span>
                    <span style={{
                      fontSize: 10, color: 'rgba(232,237,245,0.25)',
                      letterSpacing: '0.06em',
                    }}>
                      {post.readingTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 style={{
                    fontFamily: 'Syne, sans-serif', fontWeight: 700,
                    fontSize: 'clamp(16px,1.8vw,20px)', color: '#fff',
                    letterSpacing: '-0.02em', lineHeight: 1.25,
                    marginBottom: 10,
                  }}>
                    {post.title}
                  </h2>

                  {/* Description */}
                  {post.description && (
                    <p style={{
                      fontSize: 'clamp(12px,1.2vw,13px)',
                      color: 'rgba(232,237,245,0.42)',
                      lineHeight: 1.65, fontWeight: 300,
                      marginBottom: 16,
                      flexGrow: 1,
                    }}>
                      {post.description}
                    </p>
                  )}

                  {/* Tags + read link */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 }}>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {post.tags.map(tag => (
                        <span key={tag} style={{
                          display: 'inline-block',
                          padding: '3px 9px',
                          borderRadius:100,
                          fontSize: 10,
                          fontWeight: 600,
                          background: `${col}12`,
                          border: `1px solid ${col}28`,
                          color: col,
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span style={{ fontSize: 11, color: col, fontWeight: 600, flexShrink: 0 }}>
                      Read →
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: '28px 40px', borderTop: '1px solid rgba(255,255,255,0.04)', textAlign: 'center' }}>
        <p style={{ fontSize: 11, color: 'rgba(232,237,245,0.18)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Alok Munshi · Gurugram, India
        </p>
      </div>
    </div>
  )
}
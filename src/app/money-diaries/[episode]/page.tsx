import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getEpisodeBySlug, getEpisodes, getEpisodeColor } from '@/lib/money-diaries'

interface Props {
  params: { episode: string }
}

export const revalidate = 60

export async function generateStaticParams() {
  const { episodes } = await getEpisodes()
  return episodes.map(ep => ({ episode: ep.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ep = await getEpisodeBySlug(params.episode)
  if (!ep) return { title: 'Episode not found' }

  return {
    title: `Ep ${ep.episodeNumber}: ${ep.title} — Arjun's Money Diaries`,
    description: ep.hookLine || ep.concept || `Episode ${ep.episodeNumber} of Arjun's Money Diaries.`,
    openGraph: {
      title: `Ep ${ep.episodeNumber}: ${ep.title}`,
      description: ep.hookLine || ep.concept,
      type: 'article',},
  }
}

export default async function EpisodePage({ params }: Props) {
  const ep = await getEpisodeBySlug(params.episode)
  if (!ep) notFound()

  const col = getEpisodeColor(ep.episodeNumber)
  const num = ep.episodeNumber.toString().padStart(2, '0')
  const likes = ep.likes && ep.likes !== '0' ? ep.likes : null
  const comments = ep.comments && ep.comments !== '0' ? ep.comments : null

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Ep ${ep.episodeNumber}: ${ep.title}`,
    description: ep.hookLine || ep.concept,
    author: { '@type': 'Person', name: 'Alok Munshi' },
    datePublished: ep.postedDate,
    url: `https://alok-munshi-portfolio.vercel.app/money-diaries/${ep.slug}`,
    isPartOf: {
      '@type': 'CreativeWorkSeries',
      name: "Arjun's Money Diaries",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div style={{
        minHeight: '100vh',
        background: '#060810',
        color: '#e8edf5',
        fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
      }}>
        <article style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,40px) clamp(48px,6vw,80px)', maxWidth: 680, margin: '0 auto' }}><Link href="/money-diaries" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 13, color: 'rgba(232,237,245,0.4)',
            textDecoration: 'none', marginBottom: 44,
          }}>
            ← Back to all episodes
          </Link>

          {/* Header */}
          <header style={{ marginBottom: 'clamp(24px,3vw,32px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
              <span style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 800,
                fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
                background: `${col}15`, border: `1px solid ${col}30`,
                color: col, padding: '4px 12px', borderRadius: 100,
              }}>
                Episode {num}
              </span>
              <span style={{ fontSize: 11, color: 'rgba(232,237,245,0.35)' }}>
                {ep.readingTime}
              </span>{ep.postedDate && (
                <>
                  <span style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.1)' }} />
                  <span style={{ fontSize: 11, color: 'rgba(232,237,245,0.35)' }}>
                    {ep.postedDate}
                  </span>
                </>
              )}
            </div><h1 style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 800,
              fontSize: 'clamp(28px,5vw,44px)', letterSpacing: '-0.03em',
              lineHeight: 1.15, color: '#fff', marginBottom: 14,
            }}>
              {ep.title}
            </h1>

            {ep.hookLine && (
              <p style={{
                fontSize: 'clamp(14px,1.4vw,16px)',
                color: 'rgba(232,237,245,0.55)',
                lineHeight: 1.7, fontWeight: 300, fontStyle: 'italic',
                marginBottom: 16,}}>
                &ldquo;{ep.hookLine}&rdquo;
              </p>
            )}

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {ep.concept && (
                <span style={{
                  display: 'inline-block',
                  padding: '3px 10px',
                  borderRadius: 100,
                  fontSize: 10,
                  fontWeight: 600,
                  background: `${col}12`,
                  border: `1px solid ${col}28`,
                  color: col,
                }}>
                  {ep.concept}
                </span>
              )}
              {ep.character && (
                <span style={{
                  display: 'inline-block',
                  padding: '3px 10px',
                  borderRadius: 100,
                  fontSize: 10,
                  fontWeight: 500,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(232,237,245,0.55)',
                }}>ft. {ep.character}
                </span>
              )}</div>
          </header>

          {/* Engagement strip */}
          {(likes || comments) && (
            <div style={{
              display: 'flex', gap: 16, flexWrap: 'wrap',
              padding: '12px 16px', marginBottom: 'clamp(20px,2.5vw,28px)',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: 12,
            }}>
              {likes && (
                <span style={{ fontSize: 12, color: 'rgba(232,237,245,0.5)' }}>
                  👍 <strong style={{ color: '#fff', fontWeight: 600 }}>{likes}</strong> likes
                </span>
              )}
              {comments && (
                <span style={{ fontSize: 12, color: 'rgba(232,237,245,0.5)' }}>
                  💬 <strong style={{ color: '#fff', fontWeight: 600 }}>{comments}</strong> comments
                </span>
              )}
              <span style={{ fontSize: 12, color: 'rgba(232,237,245,0.3)', marginLeft: 'auto' }}>
                on LinkedIn
              </span>
            </div>
          )}

          {/* Divider */}
          <div style={{
            height: 1,
            background: `linear-gradient(90deg, transparent, ${col}40, transparent)`,
            marginBottom: 'clamp(24px,3vw,32px)',
          }} />

          {/* Post text */}
          {ep.postText? (
            <div style={{
              fontSize: 'clamp(15px,1.4vw,17px)',
              color: 'rgba(232,237,245,0.75)',
              lineHeight: 1.85,
              fontWeight: 300,
              whiteSpace: 'pre-wrap',
              marginBottom: 'clamp(32px,4vw,48px)',
            }}>
              {ep.postText}
            </div>
          ) : (
            <div style={{
              padding: 'clamp(32px,4vw,48px)20px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: 16,
              textAlign: 'center',
              marginBottom: 'clamp(32px,4vw,48px)',
            }}>
              <p style={{ fontSize: 14, color: 'rgba(232,237,245,0.4)', fontStyle: 'italic' }}>
                Full episode text not available yet. Read it on LinkedIn.
              </p>
            </div>
          )}

          {/* Actions */}
          <div style={{
            display: 'flex', gap: 10, flexWrap: 'wrap',
            padding: 'clamp(20px,2.5vw,28px) 0',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            marginBottom: 'clamp(32px,4vw,48px)',
          }}>
            {ep.postUrl ? (
              <a
                href={ep.postUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  padding: '11px 22px', borderRadius: 100,
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
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '11px 22px',
                fontSize: 12, color: 'rgba(232,237,245,0.35)',
                fontStyle: 'italic',
              }}>
                LinkedIn link not yet available
              </span>
            )}
            <Link
              href="/money-diaries"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '11px 22px', borderRadius: 100,
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(232,237,245,0.6)',
                fontSize: 13, fontWeight: 500,
                textDecoration: 'none', fontFamily: 'inherit',
              }}
            >
              More episodes →
            </Link>
          </div>

          {/* Footer nav */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/money-diaries" style={{
              fontSize: 13, color: col, fontWeight: 600, textDecoration: 'none',
            }}>
              ← All episodes
            </Link>
            <Link href="/" style={{
              fontSize: 13, color: 'rgba(232,237,245,0.4)', textDecoration: 'none',
            }}>
              Portfolio →
            </Link>
          </div>
        </article>
      </div>
    </>
  )
}

import type { Metadata } from 'next'
import EpisodeList from './EpisodeList'
import { getEpisodes } from '@/lib/money-diaries'

export const metadata: Metadata = {
  title: "Arjun's Money Diaries — Episode Archive | Alok Munshi",
  description: "All episodes of Arjun's Money Diaries — a serialised personal finance LinkedIn series. Arjun, 25, learns money the hard way. One concept. Every two days.",
}

export const revalidate = 60

export default async function MoneyDiariesPage() {
  const { episodes, error } = await getEpisodes()

  const moneyDiariesSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: "Arjun's Money Diaries — Episode Archive",
    description: 'A serialised personal finance LinkedIn series. One concept. One story. Every two days.',
    url: 'https://alok-munshi-portfolio.vercel.app/money-diaries',
    author: { '@type': 'Person', name: 'Alok Munshi' },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: episodes.length,
      itemListElement: episodes.slice(0, 20).map((ep, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: ep.title,
        description: ep.concept,
        url: `https://alok-munshi-portfolio.vercel.app/money-diaries/${ep.slug}`,
      })),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(moneyDiariesSchema) }}
      />
      <div style={{
        minHeight: '100vh',
        background: '#060810',
        color: '#e8edf5',
        fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
      }}>
        <div style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,40px) clamp(48px,6vw,80px)', maxWidth: 1080, margin: '0 auto' }}>
          <a href="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 13, color: 'rgba(232,237,245,0.4)',
            textDecoration: 'none', marginBottom: 44,
          }}>
            ← Back to portfolio
          </a>

          {/* Page header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 28, marginBottom: 'clamp(40px,6vw,64px)' }}>
            <div>
              <p style={{
                fontSize: 11, fontWeight: 600, letterSpacing: '0.26em',
                textTransform: 'uppercase', color: '#4f8ef7', marginBottom: 14,
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <span style={{ display: 'block', width: 22, height: 1, background: '#4f8ef7', flexShrink: 0 }} />
                Automated LinkedIn Series
              </p>
              <h1 style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 800,
                fontSize: 'clamp(36px,6vw,68px)', letterSpacing: '-0.04em',
                lineHeight: 0.95, color: '#fff', marginBottom: 'clamp(16px,2vw,22px)',
              }}>
                Arjun&apos;s<br />Money Diaries
              </h1>
              <p style={{
                fontSize: 'clamp(14px,1.4vw,16px)',
                color: 'rgba(232,237,245,0.5)',
                lineHeight: 1.75, fontWeight: 300, maxWidth: 500,
              }}>
                A serialised personal finance series on LinkedIn. Follow Arjun — 25, just moved to Bengaluru — as he learns money the hard way. One concept. One story. Every two days.
              </p>
            </div>

            {/* Stats + RSS */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 16, flexShrink: 0 }}>
              <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px,4vw,44px)', fontWeight: 800, color: '#4f8ef7', lineHeight: 1 }}>
                    {episodes.length}
                  </div>
                  <div style={{ fontSize: 10, color: 'rgba(232,237,245,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 6 }}>
                    Live
                  </div>
                </div>
                <div style={{ width: 1, height: 36, background: 'rgba(255,255,255,0.08)', flexShrink: 0 }} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px,4vw,44px)', fontWeight: 800, color: 'rgba(232,237,245,0.25)', lineHeight: 1 }}>
                    44
                  </div>
                  <div style={{ fontSize: 10, color: 'rgba(232,237,245,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 6 }}>
                    Planned
                  </div>
                </div>
              </div>

              {/* RSS link */}
              <a
                href="/money-diaries/rss.xml"
                title="Subscribe via RSS"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 11, color: 'rgba(232,237,245,0.3)',
                  textDecoration: 'none',
                  transition: 'color .2s',
                }}
                
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z"/>
                </svg>
                RSS feed
              </a>
            </div>
          </div>

          {/* How it works strip */}
          <div style={{
            background: 'rgba(79,142,247,0.05)', border: '1px solid rgba(79,142,247,0.15)',
            borderRadius: 'clamp(12px,1.5vw,18px)', padding: '14px 20px',
            marginBottom: 'clamp(32px,4vw,48px)', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
          }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#4f8ef7', letterSpacing: '0.1em', textTransform: 'uppercase', flexShrink: 0 }}>
              Auto-published
            </span>
            <span style={{ width: 1, height: 14, background: 'rgba(79,142,247,0.3)', flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: 'rgba(232,237,245,0.45)', fontWeight: 300 }}>
              Claude API writes each episode → quality check → one-word Telegram approval → auto-posts to LinkedIn → appears here within 60 seconds.
            </span>
          </div>

          {/* Episode grid or empty state */}
          {episodes.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: 'clamp(60px,10vw,100px) 20px',
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 24,
            }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{error ? '⚠️' : '🤖'}</div>
              <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 10 }}>
                {error ? 'Couldn\u2019t load episodes' : 'Episodes coming soon'}
              </p>
              <p style={{ fontSize: 13, color: 'rgba(232,237,245,0.3)', fontWeight: 300, maxWidth: 320, margin: '0 auto' }}>
                {error
                  ? 'There was a problem fetching the latest episodes. Try refreshing the page.'
                  : 'The series hasn\u2019t launched yet. Episodes will appear here automatically as they go live on LinkedIn.'}
              </p>
            </div>
          ) : (
            <EpisodeList episodes={episodes} />
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '28px 40px', borderTop: '1px solid rgba(255,255,255,0.04)', textAlign: 'center' }}>
          <p style={{ fontSize: 11, color: 'rgba(232,237,245,0.18)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Alok Munshi · Powered by GitHub Actions + Claude API · Auto-updates every 60s
          </p>
        </div>
      </div>
    </>
  )
}

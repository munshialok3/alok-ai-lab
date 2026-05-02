import type { Metadata } from 'next'
import EpisodeList, { type Episode } from './EpisodeList'

export const metadata: Metadata = {
  title: "Arjun's Money Diaries — Episode Archive | Alok Munshi",
  description: "All episodes of Arjun's Money Diaries — a serialised personal finance LinkedIn series. Arjun, 25, learns money the hard way. One concept. Every two days.",
}

export const revalidate = 60

const SHEET_ID = '1vsJkdHva1TFpm0JyXFxek16J3PxkZgfGHMhL_Lu5EF8'

function parseCSV(text: string): Record<string, string>[] {
  const lines = text.split('\n')
  if (lines.length < 2) return []

  const parseRow = (line: string): string[] => {
    const result: string[] = []
    let current = ''
    let inQuotes = false
    for (let i = 0; i < line.length; i++) {
      const ch = line[i]
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') { current += '"'; i++ }
        else inQuotes = !inQuotes
      } else if (ch === ',' && !inQuotes) {
        result.push(current); current = ''
      } else {
        current += ch
      }
    }
    result.push(current)
    return result
  }

  const headers = parseRow(lines[0])
  return lines.slice(1)
    .filter(l => l.trim())
    .map(line => {
      const values = parseRow(line)
      const obj: Record<string, string> = {}
      headers.forEach((h, i) => { obj[h.trim()] = (values[i] || '').trim() })
      return obj
    })
}

function toLinkedInUrl(raw: string): string {
  if (!raw) return ''
  if (raw.startsWith('http')) return raw
  if (raw.startsWith('urn:')) return `https://www.linkedin.com/feed/update/${raw}/`
  return ''
}

async function getEpisodes(): Promise<Episode[]> {
  try {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=Episodes`
    const res = await fetch(url, { next: { revalidate: 60 } })
    if (!res.ok) return []
    const csv = await res.text()
    const rows = parseCSV(csv)
    return rows
      .filter(r => r.Status?.toLowerCase() === 'posted')
      .map(r => ({
        episodeNo:  r.Episode_No || '',
        title:      r.Title || '',
        concept:    r.Concept || '',
        hookLine:   r.Hook_Line || '',
        character:  r.Supporting_Character || '',
        postText:   r.post_text || '',
        postUrl:    toLinkedInUrl(r.Post_URL || ''),
        postedDate: r.Posted_Date || '',
        likes:      r.Likes || '0',
        comments:   r.Comments || '0',
      }))
      .sort((a, b) => {
        const na = parseInt(a.episodeNo.replace(/\D/g, '')) || 0
        const nb = parseInt(b.episodeNo.replace(/\D/g, '')) || 0
        return nb - na
      })
  } catch {
    return []
  }
}

export default async function MoneyDiariesPage() {
  const episodes = await getEpisodes()

  return (
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
              lineHeight: 0.95, color: '#fff',
              marginBottom: 'clamp(16px,2vw,22px)',
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

          {/* Stats */}
          <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexShrink: 0, flexWrap: 'wrap' }}>
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
        </div>

        {/* How it works strip */}
        <div style={{
          background: 'rgba(79,142,247,0.05)', border: '1px solid rgba(79,142,247,0.15)',
          borderRadius: 'clamp(12px,1.5vw,18px)', padding: '14px 20px',
          marginBottom: 'clamp(32px,4vw,48px)',
          display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
        }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#4f8ef7', letterSpacing: '0.1em', textTransform: 'uppercase', flexShrink: 0 }}>
            Auto-published
          </span>
          <span style={{ width: 1, height: 14, background: 'rgba(79,142,247,0.3)', flexShrink: 0 }} />
          <span style={{ fontSize: 12, color: 'rgba(232,237,245,0.45)', fontWeight: 300 }}>
            Claude AI writes each episode → quality check → Telegram approval → auto-posts to LinkedIn → appears here within 60 seconds. Zero manual publishing.
          </span>
        </div>

        {/* Episode grid or empty state */}
        {episodes.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: 'clamp(60px,10vw,100px) 20px',
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 24,
          }}>
            <div style={{ fontSize: 32, marginBottom: 16 }}>🤖</div>
            <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 10 }}>
              Episodes coming soon
            </p>
            <p style={{ fontSize: 13, color: 'rgba(232,237,245,0.3)', fontWeight: 300, maxWidth: 320, margin: '0 auto' }}>
              The series hasn&apos;t launched yet. Episodes will appear here automatically as they go live on LinkedIn.
            </p>
          </div>
        ) : (
          <EpisodeList episodes={episodes} />
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: '28px 40px', borderTop: '1px solid rgba(255,255,255,0.04)', textAlign: 'center' }}>
        <p style={{ fontSize: 11, color: 'rgba(232,237,245,0.18)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Alok Munshi · Powered by n8n + Claude AI · Auto-updates every 60s
        </p>
      </div>
    </div>
  )
}

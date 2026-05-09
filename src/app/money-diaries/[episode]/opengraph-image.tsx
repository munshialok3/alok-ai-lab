import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const SHEET_ID = '1vsJkdHva1TFpm0JyXFxek16J3PxkZgfGHMhL_Lu5EF8'
const COLORS = ['#4f8ef7', '#8b5cf6', '#10b981', '#f59e0b']

function slugToEpisodeNumber(slug: string): number {
  const m = slug.match(/^ep-(\d+)-/)
  return m ? parseInt(m[1]) : 0
}

async function getEpisodeData(slug: string) {
  try {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=Episodes`
    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) return null
    const csv = await res.text()
    const lines = csv.split('\n')
    const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim())
    const epNumIndex = headers.indexOf('Episode_No')
    const titleIndex = headers.indexOf('Title')
    const hookIndex = headers.indexOf('Hook_Line')
    const epNum = slugToEpisodeNumber(slug)
    for (const line of lines.slice(1)) {
      const cols = line.split(',')
      const num = parseInt((cols[epNumIndex] || '').replace(/"/g, ''))
      if (num === epNum) {
        return {
          episodeNumber: num,
          title: (cols[titleIndex] || '').replace(/"/g, '').trim(),
          hookLine: (cols[hookIndex] || '').replace(/"/g, '').trim(),
        }
      }
    }
    return null
  } catch {
    return null
  }
}

export default async function OGImage({ params }: { params: { episode: string } }) {
  const ep = await getEpisodeData(params.episode)
  const epNum = ep?.episodeNumber ?? slugToEpisodeNumber(params.episode)
  const title = ep?.title ?? "Arjun's Money Diaries"
  const hook = ep?.hookLine ?? ''
  const col = COLORS[epNum % COLORS.length]
  const num = epNum.toString().padStart(2, '0')

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#060810',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: col,
            display: 'flex',
          }}
        />

        {/* Top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: col }}>
            EPISODE {num}
          </span>
          <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: '0.1em', color: 'rgba(232,237,245,0.35)', textTransform: 'uppercase' }}>
            ARJUN&apos;S MONEY DIARIES
          </span>
        </div>

        {/* Middle — title + hook */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', fontSize: 60, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#ffffff' }}>
            {title}
          </div>
          {hook ? (
            <div style={{ display: 'flex', fontSize: 22, fontWeight: 300, color: 'rgba(232,237,245,0.55)', lineHeight: 1.5, fontStyle: 'italic', maxWidth: 900 }}>
              &ldquo;{hook}&rdquo;
            </div>
          ) : null}
        </div>

        {/* Bottom row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ display: 'flex', fontSize: 15, color: 'rgba(232,237,245,0.3)', fontWeight: 400 }}>
            alok-munshi-portfolio.vercel.app
          </span>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: `${col}22`,
            border: `1px solid ${col}50`,
            borderRadius: 100,
            padding: '8px 20px',
          }}>
            <span style={{ display: 'flex', fontSize: 14, fontWeight: 600, color: col }}>
              Personal Finance Series
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}

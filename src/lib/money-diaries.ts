import readingTime from 'reading-time'

const SHEET_ID = '1vsJkdHva1TFpm0JyXFxek16J3PxkZgfGHMhL_Lu5EF8'

export interface Episode {
  episodeNo: string
  episodeNumber: number
  slug: string
  title: string
  concept: string
  hookLine: string
  character: string
  postText: string
  postUrl: string
  postedDate: string
  likes: string
  comments: string
  readingTime: string
}

function parseCSV(text: string): Record<string, string>[] {
  // Proper CSV parser that handles newlines inside quoted fields
  const rows: string[][] = []
  let currentRow: string[] = []
  let currentField = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    const next = text[i + 1]

    if (ch === '"') {
      if (inQuotes && next === '"') {
        currentField += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (ch === ',' && !inQuotes) {
      currentRow.push(currentField)
      currentField = ''
    } else if((ch === '\n' || ch === '\r') && !inQuotes) {
      if (ch === '\r' && next === '\n') i++
      currentRow.push(currentField)
      if (currentRow.some(v => v.trim() !== '')) rows.push(currentRow)
      currentRow = []
      currentField = ''
    } else {
      currentField += ch
    }
  }

  // Flush last field/row
  if (currentField !== '' || currentRow.length > 0) {
    currentRow.push(currentField)
    if (currentRow.some(v => v.trim() !== '')) rows.push(currentRow)
  }

  if (rows.length < 2) return []

  const headers = rows[0]
  return rows.slice(1).map(values => {
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

function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '').substring(0, 60)
}

function makeSlug(episodeNumber: number, title: string): string {
  return `ep-${episodeNumber}-${titleToSlug(title)}`
}

export async function getEpisodes(): Promise<{ episodes: Episode[]; error: boolean }> {
  try {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=Episodes`
    const res = await fetch(url, { next: { revalidate: 60 } })
    if (!res.ok) return { episodes: [], error: true }
    const csv = await res.text()
    const rows = parseCSV(csv)
    const episodes = rows
      .filter(r => r.Status?.toLowerCase() === 'posted')
      .map((r): Episode => {
        const episodeNumber = parseInt((r.Episode_No || '').replace(/\D/g, '')) || 0
        const title = r.Title || ''
        const postText = r.post_text || ''
        const rt = postText ? readingTime(postText).text : '1 min read'
        return {
          episodeNo: r.Episode_No || '',
          episodeNumber,
          slug: makeSlug(episodeNumber, title),
          title,
          concept: r.Concept || '',
          hookLine: r.Hook_Line || '',
          character: r.Supporting_Character || '',
          postText,
          postUrl: toLinkedInUrl(r.Post_URL || ''),
          postedDate: r.Posted_Date || '',
          likes: r.Likes || '0',
          comments: r.Comments || '0',
          readingTime: rt,
        }
      })
      .sort((a, b) => b.episodeNumber - a.episodeNumber)
    return { episodes, error: false }
  } catch {
    return { episodes: [], error: true }
  }
}

export async function getEpisodeBySlug(slug: string): Promise<Episode | null> {
  const { episodes } = await getEpisodes()
  return episodes.find(e => e.slug === slug) || null
}

export function getEpisodeColor(episodeNumber: number): string {
  const colors = ['#4f8ef7', '#8b5cf6', '#10b981', '#f59e0b']
  return colors[episodeNumber % colors.length]
}
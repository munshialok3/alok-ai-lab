import { getEpisodes } from '@/lib/money-diaries'

const BASE_URL = 'https://alok-munshi-portfolio.vercel.app'

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export const revalidate = 300

export async function GET() {
  const { episodes } = await getEpisodes()
  const now = new Date().toUTCString()

  const items = episodes.map(ep => {
    const pubDate = ep.postedDate ? new Date(ep.postedDate).toUTCString() : now
    const url = `${BASE_URL}/money-diaries/${ep.slug}`
    const title = `Ep ${ep.episodeNumber}: ${ep.title}`
    const description = ep.hookLine || ep.concept || `Episode ${ep.episodeNumber}`
    return `    <item>
      <title>${escapeXml(title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(description)}</description>
      ${ep.concept ? `<category>${escapeXml(ep.concept)}</category>` : ''}
    </item>`
  }).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Arjun's Money Diaries — Alok Munshi</title>
    <link>${BASE_URL}/money-diaries</link>
    <atom:link href="${BASE_URL}/money-diaries/rss.xml" rel="self" type="application/rss+xml" />
    <description>A serialised personal finance LinkedIn series. Arjun,25, learns money the hard way.</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
    },
  })
}

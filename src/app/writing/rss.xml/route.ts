import { getAllPosts } from '@/lib/writing'

const BASE_URL = 'https://alok-munshi-portfolio.vercel.app'

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const posts = getAllPosts()
  const now = new Date().toUTCString()

  const items = posts.map(post => {
    const pubDate = post.date? new Date(post.date).toUTCString() : now
    const url = `${BASE_URL}/writing/${post.slug}`
    return `<item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.description)}</description>
      ${post.tags.map(t => `<category>${escapeXml(t)}</category>`).join('\n      ')}
    </item>`
  }).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Alok Munshi — Writing</title>
    <link>${BASE_URL}/writing</link>
    <atom:link href="${BASE_URL}/writing/rss.xml" rel="self" type="application/rss+xml" />
    <description>Notes on growth strategy, building things, and navigating a career in tech.</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}

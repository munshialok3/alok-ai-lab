import type { Metadata } from 'next'
import { getPostBySlug, getAllPosts } from '@/lib/writing'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPostBySlug(params.slug)
  if (!post) return { title: 'Not Found' }

  return {
    title: `${post.title} — Alok Munshi`,
    description: post.description,
  }
}

export default function WritingPost({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post || !post.published) notFound()

  const colors = ['#4f8ef7', '#8b5cf6', '#10b981', '#f59e0b']
  const tagHash = post.tags.length > 0 ? post.tags[0].length % colors.length : 0
  const col = colors[tagHash]

  return (
    <div style={{
      minHeight: '100vh',
      background: '#060810',
      color: '#e8edf5',
      fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
    }}>
      <article style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,40px) clamp(48px,6vw,80px)', maxWidth: 680, margin: '0 auto' }}>

        <Link href="/writing" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 13, color: 'rgba(232,237,245,0.4)',
          textDecoration: 'none', marginBottom: 44,
        }}>
          ← Back to writing
        </Link>

        {/* Header */}
        <header style={{ marginBottom: 'clamp(24px,3vw,32px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: col }}>
              {post.date}
            </span>
            <span style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.1)' }} />
            <span style={{ fontSize: 11, color: 'rgba(232,237,245,0.35)' }}>
              {post.readingTime}
            </span>
          </div>

          <h1 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800,
            fontSize: 'clamp(28px,5vw,44px)', letterSpacing: '-0.03em',
            lineHeight: 1.1, color: '#fff',marginBottom: 12,
          }}>
            {post.title}
          </h1>

          {post.description && (
            <p style={{
              fontSize: 'clamp(14px,1.4vw,16px)',
              color: 'rgba(232,237,245,0.45)',
              lineHeight: 1.7, fontWeight: 300,
              marginBottom: 14,
            }}>
              {post.description}
            </p>
          )}

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {post.tags.map(tag => (
              <span key={tag} style={{
                display: 'inline-block',
                padding: '3px 10px',
                borderRadius: 100,
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
        </header>

        {/* Divider */}
        <div style={{
          height: 1,
          background: `linear-gradient(90deg, transparent, ${col}40, transparent)`,
          marginBottom: 'clamp(24px,3vw,32px)',
        }} />

        {/* Body */}
        <div
          className="prose-content"
          style={{
            fontSize: 'clamp(15px,1.4vw,17px)',
            color: 'rgba(232,237,245,0.7)',
            lineHeight: 1.85,
            fontWeight: 300,}}
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
        />

        {/* Footer nav */}
        <div style={{
          marginTop: 'clamp(48px,6vw,72px)', paddingTop: 24,
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <Link href="/writing" style={{
            fontSize: 13, color: col, fontWeight: 600, textDecoration: 'none',}}>
            ← All posts
          </Link>
          <Link href="/" style={{
            fontSize: 13, color: 'rgba(232,237,245,0.4)', textDecoration: 'none',
          }}>
            Portfolio →
          </Link>
        </div>
      </article>
    </div>
  )
}

function renderMarkdown(content: string): string {
  let html = content
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br/>')
  return `<p>${html}</p>`
}
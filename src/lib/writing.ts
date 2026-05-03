import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const CONTENT_DIR = path.join(process.cwd(), 'src/content/writing')

export interface Post {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  published: boolean
  readingTime: string
  content: string
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(CONTENT_DIR)) return []

  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.mdx'))

  const posts = files.map(filename => {
    const slug = filename.replace('.mdx', '')
    const filePath = path.join(CONTENT_DIR, filename)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)
    const rt = readingTime(content)

    return {
      slug,
      title: data.title ||'Untitled',
      description: data.description || '',
      date: data.date || '',
      tags: data.tags || [],
      published: data.published ?? false,
      readingTime: rt.text,
      content,
    }
  })

  return posts.filter(p => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const rt = readingTime(content)

  return {
    slug,
    title: data.title || 'Untitled',
    description: data.description || '',
    date: data.date || '',
    tags: data.tags || [],
    published: data.published ?? false,
    readingTime: rt.text,
    content,
  }
}

export function getPostColor(slug: string): string {
  const colors = ['#4f8ef7', '#8b5cf6', '#10b981', '#f59e0b']
  const posts = getAllPosts()
  const index = posts.findIndex(p => p.slug === slug)
  if (index === -1) {
    let hash = 0
    for (let i = 0; i < slug.length; i++) {
      hash = ((hash << 5) - hash) + slug.charCodeAt(i)
      hash |= 0
    }
    return colors[Math.abs(hash) % colors.length]
  }
  return colors[index % colors.length]
}
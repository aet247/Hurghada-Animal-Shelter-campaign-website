import { parseFrontmatter } from '../parseFrontmatter'

export interface BlogPost {
  slug:    string
  title:   string
  date:    string
  author:  string
  image:   string
  excerpt: string
  body:    string
}

const blogModules = import.meta.glob('/content/blog/*.md', {
  eager:  true,
  query:  '?raw',
  import: 'default',
}) as Record<string, string>

function slugFromPath(path: string): string {
  return path.split('/').pop()?.replace('.md', '') ?? ''
}

export function loadBlogPosts(): BlogPost[] {
  return Object.entries(blogModules)
    .map(([path, raw]) => {
      const { data, content } = parseFrontmatter(raw)
      return {
        slug:    slugFromPath(path),
        title:   data.title   ?? 'Untitled',
        date:    data.date    ?? '',
        author:  data.author  ?? 'Ahmed Fathi',
        image:   data.image   ?? '',
        excerpt: data.excerpt ?? content.slice(0, 160) + '…',
        body:    content,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function loadBlogPostBySlug(slug: string): BlogPost | undefined {
  return loadBlogPosts().find(p => p.slug === slug)
}

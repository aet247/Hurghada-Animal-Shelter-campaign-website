/**
 * Simple YAML-like frontmatter parser that runs in the browser.
 * Replaces gray-matter which depends on Node.js built-ins.
 *
 * Supports: string, number, boolean, and simple quoted strings.
 */
export interface FrontmatterResult {
  data:    Record<string, string>
  content: string
}

export function parseFrontmatter(raw: string): FrontmatterResult {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, content: raw.trim() }

  const data: Record<string, string> = {}

  for (const line of match[1].split('\n')) {
    const colonIdx = line.indexOf(':')
    if (colonIdx < 1) continue

    const key = line.slice(0, colonIdx).trim()
    const raw = line.slice(colonIdx + 1).trim()

    // Strip surrounding quotes if present
    const value = raw.replace(/^["']|["']$/g, '')
    if (key) data[key] = value
  }

  return { data, content: match[2].trim() }
}

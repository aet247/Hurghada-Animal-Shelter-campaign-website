import { useEffect } from 'react'

interface PageMeta {
  title:        string
  description?: string
  path?:        string
}

const SITE_NAME = 'Hurghada Animal Shelter'
const DEFAULT_DESC = "Support Ahmed Fathi's campaign to build a shelter for stray animals in Hurghada, Egypt."
const SITE_URL  = import.meta.env.VITE_SITE_URL || 'https://hurghada-animal-shelter.netlify.app'

export function usePageMeta({ title, description, path }: PageMeta) {
  useEffect(() => {
    const fullTitle = `${title} — ${SITE_NAME}`
    document.title = fullTitle

    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector<HTMLMetaElement | HTMLLinkElement>(selector)
      if (!el) return
      el.setAttribute(attr, value)
    }

    setMeta('meta[name="description"]',    'content', description || DEFAULT_DESC)
    setMeta('meta[property="og:title"]',   'content', fullTitle)
    setMeta('meta[property="og:description"]', 'content', description || DEFAULT_DESC)
    if (path) {
      setMeta('meta[property="og:url"]',   'content', `${SITE_URL}${path}`)
      setMeta('link[rel="canonical"]',     'href',    `${SITE_URL}${path}`)
    }
  }, [title, description, path])
}

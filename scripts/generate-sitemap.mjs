import { writeFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SITE_URL  = process.env.VITE_SITE_URL ?? 'https://hurghada-animal-shelter.netlify.app'

const pages = [
  { path: '/',            priority: '1.0', changefreq: 'weekly' },
  { path: '/about',       priority: '0.8', changefreq: 'monthly' },
  { path: '/animals',     priority: '0.7', changefreq: 'weekly' },
  { path: '/budget',      priority: '0.9', changefreq: 'weekly' },
  { path: '/blog',        priority: '0.7', changefreq: 'weekly' },
  { path: '/gallery',     priority: '0.6', changefreq: 'weekly' },
  { path: '/get-involved',priority: '0.8', changefreq: 'monthly' },
  { path: '/contact',     priority: '0.6', changefreq: 'monthly' },
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>${SITE_URL}${p.path}</loc>
    <priority>${p.priority}</priority>
    <changefreq>${p.changefreq}</changefreq>
  </url>`).join('\n')}
</urlset>`

const outDir  = resolve(__dirname, '..', 'public')
mkdirSync(outDir, { recursive: true })
writeFileSync(resolve(outDir, 'sitemap.xml'), sitemap, 'utf-8')
console.log('✅  sitemap.xml generated →', resolve(outDir, 'sitemap.xml'))

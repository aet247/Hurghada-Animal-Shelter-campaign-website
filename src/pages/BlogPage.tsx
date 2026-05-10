import { Rss } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PageHeader, EmptyState } from '../components/ui/index'
import BlogCard from '../components/BlogCard'
import { usePageMeta } from '../lib/usePageMeta'
import { loadBlogPosts } from '../lib/content/loadBlog'

export default function BlogPage() {
  const { t }   = useTranslation()
  const posts   = loadBlogPosts()

  usePageMeta({
    title: t('blog.title'),
    description: t('blog.subtitle'),
    path: '/blog',
  })

  return (
    <>
      <PageHeader title={t('blog.title')} subtitle={t('blog.subtitle')} />

      <section className="bg-shelter-cream py-14 md:py-20">
        <div className="container-content">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(p => <BlogCard key={p.slug} post={p} />)}
            </div>
          ) : (
            <EmptyState
              icon={<Rss className="w-12 h-12 text-amber-300 mx-auto" />}
              title={t('blog.noPosts')}
              message={t('blog.noPosts')}
            />
          )}
        </div>
      </section>
    </>
  )
}

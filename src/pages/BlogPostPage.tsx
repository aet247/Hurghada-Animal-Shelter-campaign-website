import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Calendar, User, Heart } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { usePageMeta } from '../lib/usePageMeta'
import { loadBlogPostBySlug } from '../lib/content/loadBlog'
import ShareButtons from '../components/ShareButtons'
import { CAMPAIGN } from '../lib/constants'

export default function BlogPostPage() {
  const { t }    = useTranslation()
  const { slug } = useParams<{ slug: string }>()
  const post     = loadBlogPostBySlug(slug ?? '')

  usePageMeta({
    title:       post?.title ?? 'Post Not Found',
    description: post?.excerpt,
    path:        `/blog/${slug}`,
  })

  if (!post) {
    return (
      <div className="container-content py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-shelter-bark mb-4">{t('blog.notFound')}</h1>
        <Link to="/blog" className="btn-primary inline-flex">{t('blog.backToBlog')}</Link>
      </div>
    )
  }

  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : ''

  return (
    <div className="bg-shelter-cream min-h-screen">
      {/* Back link */}
      <div className="container-content pt-8">
        <Link to="/blog" className="inline-flex items-center gap-2 text-shelter-bark2 hover:text-primary text-sm font-medium transition-colors">
          <ArrowLeft className="w-4 h-4" /> {t('blog.backToBlog')}
        </Link>
      </div>

      <article className="container-content py-10 max-w-3xl">
        {/* Hero image */}
        {post.image && (
          <div className="rounded-3xl overflow-hidden shadow-xl mb-8 aspect-[16/7] bg-amber-50">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-shelter-bark2 mb-5">
          {formattedDate && (
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> {formattedDate}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4" /> {post.author}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-display text-4xl md:text-5xl font-bold text-shelter-bark mb-8 leading-tight text-balance">
          {post.title}
        </h1>

        {/* Body */}
        <div className="prose prose-lg prose-amber max-w-none text-shelter-bark2">
          <Markdown remarkPlugins={[remarkGfm]}>{post.body}</Markdown>
        </div>

        {/* Divider */}
        <hr className="my-10 border-amber-200" />

        {/* Share + CTA */}
        <div className="space-y-6">
          <ShareButtons
            url={`${CAMPAIGN.siteUrl}/blog/${post.slug}`}
            title={post.title}
          />

          <div className="bg-gradient-to-r from-amber-700 to-orange-600 rounded-2xl p-6 text-white text-center">
            <p className="font-display text-xl font-bold mb-2">{t('home.ctaSection')}</p>
            <p className="text-amber-100 text-sm mb-4">{t('home.ctaText')}</p>
            <a
              href={CAMPAIGN.donateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-amber-800 font-bold px-6 py-3 rounded-full hover:bg-amber-50 transition-colors"
            >
              <Heart className="w-4 h-4 fill-current text-red-500" />
              {t('site.donate')}
            </a>
          </div>
        </div>
      </article>
    </div>
  )
}

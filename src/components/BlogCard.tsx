import { Link } from 'react-router-dom'
import { Calendar, User, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { BlogPost } from '../lib/content/loadBlog'

export default function BlogCard({ post }: { post: BlogPost }) {
  const { t } = useTranslation()

  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : ''

  return (
    <Link to={`/blog/${post.slug}`} className="group">
      <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-amber-100/60 h-full hover:shadow-md hover:-translate-y-1 transition-all duration-200">
        {post.image && (
          <div className="h-48 bg-amber-50 overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <div className="p-6">
          <div className="flex flex-wrap items-center gap-3 text-xs text-shelter-bark2 mb-3">
            {formattedDate && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {formattedDate}
              </span>
            )}
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" /> {post.author}
            </span>
          </div>

          <h3 className="font-display text-xl font-bold text-shelter-bark mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>

          <p className="text-shelter-bark2 text-sm leading-relaxed line-clamp-3 mb-4">
            {post.excerpt}
          </p>

          <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold group-hover:gap-2 transition-all">
            {t('blog.readMore')} <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </article>
    </Link>
  )
}

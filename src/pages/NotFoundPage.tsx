import { Link } from 'react-router-dom'
import { PawPrint } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { usePageMeta } from '../lib/usePageMeta'

export default function NotFoundPage() {
  const { t } = useTranslation()
  usePageMeta({ title: t('notFound.title') })

  return (
    <div className="bg-shelter-cream min-h-[70vh] flex items-center justify-center">
      <div className="text-center px-4">
        <PawPrint className="w-20 h-20 text-amber-300 mx-auto mb-6" />
        <h1 className="font-display text-7xl font-bold text-primary mb-3">404</h1>
        <h2 className="font-display text-2xl font-bold text-shelter-bark mb-3">{t('notFound.title')}</h2>
        <p className="text-shelter-bark2 mb-8 max-w-sm mx-auto">{t('notFound.message')}</p>
        <Link to="/" className="btn-primary inline-flex">{t('notFound.backHome')}</Link>
      </div>
    </div>
  )
}

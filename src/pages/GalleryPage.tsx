import { Images } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PageHeader, EmptyState } from '../components/ui/index'
import GalleryGrid from '../components/GalleryGrid'
import { usePageMeta } from '../lib/usePageMeta'
import { loadGallery } from '../lib/content/loadGallery'

export default function GalleryPage() {
  const { t }  = useTranslation()
  const items  = loadGallery()

  usePageMeta({
    title: t('gallery.title'),
    description: t('gallery.subtitle'),
    path: '/gallery',
  })

  return (
    <>
      <PageHeader title={t('gallery.title')} subtitle={t('gallery.subtitle')} />

      <section className="bg-shelter-cream py-14 md:py-20">
        <div className="container-content">
          {items.length > 0 ? (
            <GalleryGrid items={items} />
          ) : (
            <EmptyState
              icon={<Images className="w-12 h-12 text-amber-300 mx-auto" />}
              title={t('gallery.noMedia')}
              message={t('gallery.noMedia')}
            />
          )}
        </div>
      </section>
    </>
  )
}

import { useState } from 'react'
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { GalleryItem } from '../lib/content/loadGallery'

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const { t } = useTranslation()
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  const photos = items.filter(i => i.type === 'photo')
  const videos = items.filter(i => i.type === 'video')

  const openLightbox = (idx: number) => setLightboxIdx(idx)
  const closeLightbox = () => setLightboxIdx(null)
  const prev = () => setLightboxIdx(i => i !== null ? (i - 1 + photos.length) % photos.length : null)
  const next = () => setLightboxIdx(i => i !== null ? (i + 1) % photos.length : null)

  return (
    <>
      {/* Photos */}
      {photos.length > 0 && (
        <div>
          <h2 className="font-display text-2xl font-bold text-shelter-bark mb-6">{t('gallery.photo')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {photos.map((item, idx) => (
              <button
                key={idx}
                onClick={() => openLightbox(idx)}
                className="group relative aspect-square rounded-xl overflow-hidden bg-amber-50 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <img
                  src={item.file}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                {item.title && (
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-xs font-medium truncate">{item.title}</p>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Videos */}
      {videos.length > 0 && (
        <div className="mt-12">
          <h2 className="font-display text-2xl font-bold text-shelter-bark mb-6">{t('gallery.video')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((item, idx) => (
              <div key={idx} className="rounded-2xl overflow-hidden bg-shelter-bark shadow-md">
                {item.videoUrl ? (
                  <div className="aspect-video">
                    <iframe
                      src={item.videoUrl.replace('watch?v=', 'embed/')}
                      title={item.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="aspect-video relative bg-gray-900 flex items-center justify-center">
                    {item.file && <img src={item.file} alt={item.title} className="absolute inset-0 w-full h-full object-cover opacity-50" />}
                    <Play className="w-14 h-14 text-white/80 relative z-10" />
                  </div>
                )}
                {item.title && (
                  <div className="p-3">
                    <p className="text-amber-100 text-sm font-medium">{item.title}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 end-4 text-white/70 hover:text-white bg-white/10 rounded-full p-2"
            aria-label={t('gallery.close')}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev */}
          {photos.length > 1 && (
            <button
              onClick={e => { e.stopPropagation(); prev() }}
              className="absolute start-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 rounded-full p-3"
              aria-label={t('gallery.previous')}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Image */}
          <div onClick={e => e.stopPropagation()} className="max-w-4xl max-h-[85vh] w-full">
            <img
              src={photos[lightboxIdx].file}
              alt={photos[lightboxIdx].title}
              className="w-full h-full object-contain rounded-xl"
            />
            {photos[lightboxIdx].title && (
              <p className="text-white/70 text-sm text-center mt-3">{photos[lightboxIdx].title}</p>
            )}
          </div>

          {/* Next */}
          {photos.length > 1 && (
            <button
              onClick={e => { e.stopPropagation(); next() }}
              className="absolute end-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 rounded-full p-3"
              aria-label={t('gallery.next')}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>
      )}
    </>
  )
}

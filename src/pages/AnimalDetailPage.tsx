import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Calendar, PawPrint, Heart } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { usePageMeta } from '../lib/usePageMeta'
import { loadAnimalBySlug, loadAnimals } from '../lib/content/loadAnimals'
import ShareButtons from '../components/ShareButtons'
import AnimalCard from '../components/AnimalCard'
import { CAMPAIGN } from '../lib/constants'

const PLACEHOLDER = 'data:image/svg+xml;base64,' + btoa(`
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
  <rect width="800" height="500" fill="#FDE68A"/>
  <g fill="#D97706" opacity="0.3">
    <ellipse cx="400" cy="340" rx="120" ry="95"/>
    <circle cx="235" cy="245" r="50"/>
    <circle cx="320" cy="190" r="50"/>
    <circle cx="480" cy="190" r="50"/>
    <circle cx="565" cy="245" r="50"/>
  </g>
</svg>`)

function GenderIcon({ gender }: { gender: string }) {
  const isFemale = gender.toLowerCase() === 'female'
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
         strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      {isFemale ? (
        <>
          <circle cx="12" cy="7" r="5" />
          <line x1="12" y1="12" x2="12" y2="20" />
          <line x1="9" y1="17" x2="15" y2="17" />
        </>
      ) : (
        <>
          <circle cx="14" cy="10" r="6" />
          <line x1="18" y1="6" x2="8" y2="16" />
          <line x1="10" y1="6" x2="18" y2="6" />
          <line x1="18" y1="6" x2="18" y2="14" />
        </>
      )}
    </svg>
  )
}

export default function AnimalDetailPage() {
  const { t }    = useTranslation()
  const { slug } = useParams<{ slug: string }>()
  const animal   = loadAnimalBySlug(slug ?? '')
  const related  = loadAnimals().filter(a => a.slug !== slug).slice(0, 3)

  usePageMeta({
    title:       animal ? animal.name : 'Animal Not Found',
    description: animal?.needs,
    path:        `/animals/${slug}`,
  })

  if (!animal) {
    return (
      <div className="container-content py-24 text-center">
        <PawPrint className="w-16 h-16 text-amber-300 mx-auto mb-4" />
        <h1 className="font-display text-3xl font-bold text-shelter-bark mb-4">{t('animals.noAnimals')}</h1>
        <Link to="/animals" className="btn-primary inline-flex">{t('animals.backToAll')}</Link>
      </div>
    )
  }

  return (
    <div className="bg-shelter-cream min-h-screen">
      {/* Back link */}
      <div className="container-content pt-8 pb-0">
        <Link to="/animals" className="inline-flex items-center gap-2 text-shelter-bark2 hover:text-primary text-sm font-medium transition-colors">
          <ArrowLeft className="w-4 h-4" /> {t('animals.backToAll')}
        </Link>
      </div>

      <div className="container-content py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Photo */}
          <div className="rounded-3xl overflow-hidden shadow-xl bg-amber-50 aspect-[4/3]">
            <img
              src={animal.photo || PLACEHOLDER}
              alt={animal.name}
              className="w-full h-full object-cover"
              onError={e => { (e.target as HTMLImageElement).src = PLACEHOLDER }}
            />
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="font-display text-4xl font-bold text-shelter-bark">{animal.name}</h1>
              {animal.gender && (
                <span className={animal.gender.toLowerCase() === 'female' ? 'text-pink-500' : 'text-blue-500'}>
                  <GenderIcon gender={animal.gender} />
                </span>
              )}
            </div>

            {/* Metadata chips */}
            <div className="flex flex-wrap gap-3 mb-6">
              {animal.age && (
                <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 px-3 py-1.5 rounded-full text-sm font-medium">
                  <PawPrint className="w-3.5 h-3.5" /> {animal.age}
                </span>
              )}
              {animal.rescued && (
                <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 px-3 py-1.5 rounded-full text-sm font-medium">
                  <Calendar className="w-3.5 h-3.5" /> {t('animals.rescued')}: {animal.rescued}
                </span>
              )}
            </div>

            {/* Story */}
            {animal.story && (
              <div className="prose prose-amber max-w-none text-shelter-bark2 mb-6">
                <Markdown remarkPlugins={[remarkGfm]}>{animal.story}</Markdown>
              </div>
            )}

            {/* Needs */}
            {animal.needs && (
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-6">
                <p className="text-sm font-semibold text-orange-800 mb-1">{t('animals.needs')}</p>
                <p className="text-orange-700">{animal.needs}</p>
              </div>
            )}

            {/* CTA */}
            <a
              href={CAMPAIGN.donateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center mb-4"
            >
              <Heart className="w-5 h-5" />
              {t('animals.helpCta', { name: animal.name })}
            </a>

            <ShareButtons url={`${CAMPAIGN.siteUrl}/animals/${animal.slug}`} title={`Help ${animal.name} — ${t('site.name')}`} />
          </div>
        </div>

        {/* Related animals */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold text-shelter-bark mb-6">{t('home.meetTheAnimals')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(a => <AnimalCard key={a.slug} animal={a} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

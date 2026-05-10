import { Scale, PawPrint, Stethoscope, Clock, Eye, Heart } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '../components/ui/index'
import Section from '../components/ui/Section'
import { usePageMeta } from '../lib/usePageMeta'
import { CAMPAIGN } from '../lib/constants'

const AHMED_PLACEHOLDER = 'data:image/svg+xml;base64,' + btoa(`
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500">
  <rect width="400" height="500" fill="#FDE68A"/>
  <circle cx="200" cy="180" r="90" fill="#D97706" opacity="0.3"/>
  <ellipse cx="200" cy="420" rx="130" ry="100" fill="#D97706" opacity="0.2"/>
  <text x="200" y="260" text-anchor="middle" font-size="80" fill="#B45309" opacity="0.3">👤</text>
</svg>`)

export default function AboutPage() {
  const { t } = useTranslation()

  usePageMeta({
    title: t('about.title'),
    description: t('about.bio1'),
    path: '/about',
  })

  const credentials = [
    { icon: Scale,        text: t('about.cred1') },
    { icon: PawPrint,     text: t('about.cred2') },
    { icon: Stethoscope,  text: t('about.cred3') },
    { icon: Clock,        text: t('about.cred4') },
  ]

  const trustBadges = [
    { label: t('about.trust1'), color: 'bg-green-100 text-green-800 border border-green-200' },
    { label: t('about.trust2'), color: 'bg-blue-100 text-blue-800 border border-blue-200' },
    { label: t('about.trust3'), color: 'bg-amber-100 text-amber-800 border border-amber-200' },
  ]

  return (
    <>
      <PageHeader title={t('about.title')} subtitle={t('about.subtitle')} />

      {/* Bio section */}
      <Section bg="white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Photo */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-xl aspect-[4/5] max-w-sm mx-auto lg:mx-0">
              <img
                src={AHMED_PLACEHOLDER}
                alt="Ahmed Fathi"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating trust badges */}
            <div className="absolute -bottom-4 -end-4 bg-white rounded-2xl shadow-lg p-4 border border-amber-100">
              <div className="flex items-center gap-2">
                <PawPrint className="w-8 h-8 text-primary" />
                <div>
                  <p className="font-bold text-shelter-bark text-sm">Ahmed Fathi</p>
                  <p className="text-xs text-shelter-bark2">Founder &amp; Lawyer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="space-y-5">
            {/* Trust badges row */}
            <div className="flex flex-wrap gap-2 mb-6">
              {trustBadges.map((b, i) => (
                <span key={i} className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${b.color}`}>
                  {b.label}
                </span>
              ))}
            </div>

            <p className="text-shelter-bark2 leading-relaxed text-lg">{t('about.bio1')}</p>
            <p className="text-shelter-bark2 leading-relaxed">{t('about.bio2')}</p>
            <p className="text-shelter-bark2 leading-relaxed">{t('about.bio3')}</p>

            <a
              href={CAMPAIGN.donateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex mt-4"
            >
              <Heart className="w-5 h-5" /> {t('site.donate')}
            </a>
          </div>
        </div>
      </Section>

      {/* Credentials */}
      <Section bg="cream" title={t('about.credentials')}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {credentials.map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-amber-100/60 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-shelter-bark leading-relaxed font-medium">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Vision */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-6">
            <Eye className="w-7 h-7 text-primary" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-shelter-bark mb-5">
            {t('about.vision')}
          </h2>
          <p className="text-shelter-bark2 text-lg leading-relaxed mb-8">
            {t('about.visionText')}
          </p>
          <a
            href={CAMPAIGN.donateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex"
          >
            <Heart className="w-5 h-5" /> {t('site.donate')}
          </a>
        </div>
      </Section>
    </>
  )
}

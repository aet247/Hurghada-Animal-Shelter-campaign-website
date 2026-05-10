import { Heart, HandHelping, Share2, Handshake } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '../components/ui/index'
import Card from '../components/ui/Card'
import ShareButtons from '../components/ShareButtons'
import { usePageMeta } from '../lib/usePageMeta'
import { CAMPAIGN } from '../lib/constants'

export default function GetInvolvedPage() {
  const { t } = useTranslation()

  usePageMeta({
    title: t('getInvolved.title'),
    description: t('getInvolved.subtitle'),
    path: '/get-involved',
  })

  const ways = [
    {
      icon: Heart,
      color: 'text-red-500 bg-red-50',
      title: t('getInvolved.donateTitle'),
      text:  t('getInvolved.donateText'),
      cta:   t('getInvolved.donateCta'),
      href:  CAMPAIGN.donateUrl,
      external: true,
      primary: true,
    },
    {
      icon: HandHelping,
      color: 'text-blue-500 bg-blue-50',
      title: t('getInvolved.volunteerTitle'),
      text:  t('getInvolved.volunteerText'),
      cta:   t('getInvolved.volunteerCta'),
      href:  '/contact',
      external: false,
      primary: false,
    },
    {
      icon: Handshake,
      color: 'text-green-600 bg-green-50',
      title: t('getInvolved.partnerTitle'),
      text:  t('getInvolved.partnerText'),
      cta:   t('getInvolved.partnerCta'),
      href:  `mailto:${CAMPAIGN.email}?subject=Partnership Inquiry`,
      external: true,
      primary: false,
    },
  ]

  return (
    <>
      <PageHeader title={t('getInvolved.title')} subtitle={t('getInvolved.subtitle')} />

      <section className="bg-shelter-cream py-14 md:py-20">
        <div className="container-content space-y-10">

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ways.map(({ icon: Icon, color, title, text, cta, href, external, primary }) => (
              <Card key={title} hover className="flex flex-col">
                <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-shelter-bark mb-2">{title}</h3>
                <p className="text-shelter-bark2 text-sm leading-relaxed mb-6 flex-1">{text}</p>
                {external ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={primary ? 'btn-primary text-center justify-center' : 'btn-outline text-center justify-center'}
                  >
                    {cta}
                  </a>
                ) : (
                  <a href={href} className="btn-outline text-center justify-center">{cta}</a>
                )}
              </Card>
            ))}
          </div>

          {/* Share section */}
          <Card className="text-center py-10">
            <div className="w-12 h-12 rounded-xl text-amber-600 bg-amber-50 flex items-center justify-center mx-auto mb-4">
              <Share2 className="w-6 h-6" />
            </div>
            <h3 className="font-display text-2xl font-bold text-shelter-bark mb-2">
              {t('getInvolved.shareTitle')}
            </h3>
            <p className="text-shelter-bark2 max-w-lg mx-auto mb-6 leading-relaxed">
              {t('getInvolved.shareText')}
            </p>
            <div className="flex justify-center">
              <ShareButtons />
            </div>
          </Card>

        </div>
      </section>
    </>
  )
}

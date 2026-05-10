import { MessageCircle, Mail, MapPin, Instagram, Facebook, Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '../components/ui/index'
import Card from '../components/ui/Card'
import { usePageMeta } from '../lib/usePageMeta'
import { CAMPAIGN } from '../lib/constants'

export default function ContactPage() {
  const { t } = useTranslation()

  usePageMeta({
    title: t('contact.title'),
    description: t('contact.subtitle'),
    path: '/contact',
  })

  const cards = [
    {
      icon: MessageCircle,
      iconColor: 'text-green-600 bg-green-50',
      label: t('contact.whatsapp'),
      value: CAMPAIGN.whatsapp,
      href: `https://wa.me/${CAMPAIGN.whatsapp.replace(/\D/g, '')}`,
      hint: t('contact.whatsappHint'),
      external: true,
    },
    {
      icon: Mail,
      iconColor: 'text-amber-600 bg-amber-50',
      label: t('contact.email'),
      value: CAMPAIGN.email,
      href: `mailto:${CAMPAIGN.email}`,
      hint: t('contact.responseTime'),
      external: false,
    },
    {
      icon: MapPin,
      iconColor: 'text-red-500 bg-red-50',
      label: t('contact.location'),
      value: t('contact.locationDesc'),
      href: 'https://maps.google.com/?q=Hurghada,Egypt',
      hint: t('contact.map'),
      external: true,
    },
  ]

  return (
    <>
      <PageHeader title={t('contact.title')} subtitle={t('contact.subtitle')} />

      <section className="bg-shelter-cream py-14 md:py-20">
        <div className="container-content space-y-10 max-w-4xl">
          {/* Contact cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {cards.map(({ icon: Icon, iconColor, label, value, href, hint, external }) => (
              <Card key={label} hover>
                <div className={`w-11 h-11 rounded-xl ${iconColor} flex items-center justify-center mb-4`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-xs text-shelter-bark2 font-semibold uppercase tracking-wider mb-1">{label}</p>
                <p className="font-semibold text-shelter-bark mb-2">{value}</p>
                {hint && <p className="text-xs text-shelter-bark2 flex items-center gap-1 mb-4">
                  <Clock className="w-3 h-3" /> {hint}
                </p>}
                <a
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="btn-outline text-sm py-2 px-4 inline-flex"
                >
                  {label} →
                </a>
              </Card>
            ))}
          </div>

          {/* Social section */}
          <Card>
            <h3 className="font-display text-xl font-bold text-shelter-bark mb-5">{t('contact.social')}</h3>
            <div className="flex flex-wrap gap-4">
              {CAMPAIGN.instagram && (
                <a
                  href={CAMPAIGN.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-pink-50 text-pink-700 px-4 py-2.5 rounded-xl font-medium text-sm hover:bg-pink-100 transition-colors"
                >
                  <Instagram className="w-4 h-4" /> Instagram
                </a>
              )}
              {CAMPAIGN.facebook && (
                <a
                  href={CAMPAIGN.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2.5 rounded-xl font-medium text-sm hover:bg-blue-100 transition-colors"
                >
                  <Facebook className="w-4 h-4" /> Facebook
                </a>
              )}
              <a
                href={`https://wa.me/${CAMPAIGN.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2.5 rounded-xl font-medium text-sm hover:bg-green-100 transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </Card>

          {/* Map embed placeholder */}
          <div className="rounded-2xl overflow-hidden h-64 bg-shelter-sand border border-amber-200 flex items-center justify-center">
            <div className="text-center text-shelter-bark2">
              <MapPin className="w-10 h-10 text-primary mx-auto mb-2" />
              <p className="font-semibold text-shelter-bark">{t('contact.locationDesc')}</p>
              <a
                href="https://maps.google.com/?q=Hurghada,Egypt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary text-sm hover:underline mt-1 inline-block"
              >
                {t('contact.map')} →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

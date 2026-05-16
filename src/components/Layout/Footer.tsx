import { Link } from 'react-router-dom'
import { Heart, PawPrint, Instagram, Facebook, Mail, MessageCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { NAV_LINKS, CAMPAIGN } from '../../lib/constants'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-shelter-bark text-amber-100">
      {/* Main footer */}
      <div className="container-content py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow">
                <PawPrint className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-white text-lg">{t('site.name')}</span>
            </div>
            <p className="text-amber-200/80 text-sm leading-relaxed mb-5">
              {t('footer.description')}
            </p>
            <a
              href={CAMPAIGN.donateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors shadow"
            >
              <Heart className="w-4 h-4" /> {t('site.donate')}
            </a>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map(({ key, path }) => (
                <li key={key}>
                  <Link to={path} className="text-amber-200/70 hover:text-white text-sm transition-colors">
                    {t(`nav.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {t('footer.connect')}
            </h3>
            <div className="space-y-3">
              {CAMPAIGN.whatsapp && (
                <a
                  href={`https://wa.me/${CAMPAIGN.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-amber-200/70 hover:text-white text-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-green-400" /> WhatsApp
                </a>
              )}
              <a
                href={`mailto:${CAMPAIGN.email}`}
                className="flex items-center gap-2 text-amber-200/70 hover:text-white text-sm transition-colors"
              >
                <Mail className="w-4 h-4 text-amber-400" /> {CAMPAIGN.email}
              </a>
              {CAMPAIGN.instagram && (
                <a
                  href={CAMPAIGN.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-amber-200/70 hover:text-white text-sm transition-colors"
                >
                  <Instagram className="w-4 h-4 text-pink-400" /> Instagram
                </a>
              )}
              {CAMPAIGN.facebook && (
                <a
                  href={CAMPAIGN.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-amber-200/70 hover:text-white text-sm transition-colors"
                >
                  <Facebook className="w-4 h-4 text-blue-400" /> Facebook
                </a>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-content py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-amber-200/50">
          <span>{t('footer.copyright')}</span>
          <span>{t('footer.madeWith')}</span>
        </div>
      </div>
    </footer>
  )
}

import { Heart } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { CAMPAIGN } from '../../lib/constants'

export default function FloatingDonateCTA() {
  const { t } = useTranslation()

  return (
    <a
      href={CAMPAIGN.donateUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 end-6 z-40
                 flex items-center gap-2 bg-primary text-white font-semibold
                 px-5 py-3 rounded-full shadow-xl
                 hover:bg-primary-dark hover:scale-105
                 transition-all duration-200
                 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                 animate-pulse-slow"
      aria-label={t('site.donate')}
    >
      <Heart className="w-5 h-5 fill-current" />
      <span className="hidden md:inline">{t('site.donate')}</span>
    </a>
  )
}

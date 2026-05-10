import { Heart, ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { CAMPAIGN } from '../lib/constants'
import ProgressBar from './ProgressBar'

export default function HeroSection() {
  const { t } = useTranslation()

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-amber-700 to-orange-600" />

      {/* Grain texture overlay */}
      <div className="absolute inset-0 bg-grain opacity-40" />

      {/* Decorative paw silhouettes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-10 end-10 w-64 h-64 text-white/5" viewBox="0 0 100 100" fill="currentColor">
          <ellipse cx="50" cy="68" rx="22" ry="18"/>
          <circle cx="28" cy="48" r="9"/><circle cx="44" cy="38" r="9"/>
          <circle cx="60" cy="38" r="9"/><circle cx="74" cy="48" r="9"/>
        </svg>
        <svg className="absolute bottom-20 start-10 w-40 h-40 text-white/5" viewBox="0 0 100 100" fill="currentColor">
          <ellipse cx="50" cy="68" rx="22" ry="18"/>
          <circle cx="28" cy="48" r="9"/><circle cx="44" cy="38" r="9"/>
          <circle cx="60" cy="38" r="9"/><circle cx="74" cy="48" r="9"/>
        </svg>
      </div>

      {/* Content */}
      <div className="relative container-content py-24 md:py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 text-amber-100 text-sm font-medium px-4 py-2 rounded-full mb-8 backdrop-blur-sm border border-white/10 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Hurghada, Red Sea Governorate, Egypt
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 text-balance animate-fade-up">
            {t('home.heroTitle')}
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-amber-100/90 leading-relaxed mb-10 max-w-xl animate-fade-up animate-delay-100">
            {t('home.heroSubtitle')}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 mb-12 animate-fade-up animate-delay-200">
            <a
              href={CAMPAIGN.donateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-amber-800 font-bold
                         px-8 py-4 rounded-full shadow-xl text-lg
                         hover:bg-amber-50 hover:scale-[1.02] transition-all duration-200"
            >
              <Heart className="w-5 h-5 fill-current text-red-500" />
              {t('home.heroCta')}
            </a>
            <a
              href="/about"
              className="inline-flex items-center gap-2 border-2 border-white/50 text-white font-semibold
                         px-8 py-4 rounded-full backdrop-blur-sm text-lg
                         hover:bg-white/10 hover:border-white transition-all duration-200"
            >
              {t('site.learnMore')}
            </a>
          </div>

          {/* Progress bar */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10 max-w-md animate-fade-up animate-delay-300">
            <p className="text-amber-100/80 text-sm font-medium mb-3">{t('home.statsLabel')}</p>
            <ProgressBar
              raised={CAMPAIGN.raisedAmount}
              goal={CAMPAIGN.goalAmount}
              light
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#how-it-works"
        className="absolute bottom-8 start-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-7 h-7" />
      </a>
    </section>
  )
}

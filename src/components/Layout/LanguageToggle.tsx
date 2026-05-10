import { useTranslation } from 'react-i18next'
import { Languages } from 'lucide-react'

export default function LanguageToggle({ mobile = false }: { mobile?: boolean }) {
  const { t, i18n } = useTranslation()
  const isAr = i18n.language === 'ar'

  const toggle = () => i18n.changeLanguage(isAr ? 'en' : 'ar')

  if (mobile) {
    return (
      <button
        onClick={toggle}
        className="flex items-center gap-2 w-full px-4 py-3 rounded-xl text-shelter-bark hover:bg-amber-50 transition-colors font-medium"
      >
        <Languages className="w-5 h-5 text-primary" />
        {t('site.language')}
      </button>
    )
  }

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 text-sm font-medium text-shelter-bark2 hover:text-primary transition-colors px-3 py-1.5 rounded-full hover:bg-amber-50"
      aria-label={`Switch to ${isAr ? 'English' : 'Arabic'}`}
    >
      <Languages className="w-4 h-4" />
      {t('site.language')}
    </button>
  )
}

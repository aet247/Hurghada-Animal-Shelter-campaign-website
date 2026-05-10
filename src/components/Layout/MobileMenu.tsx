import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { X, Heart } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { NAV_LINKS, CAMPAIGN } from '../../lib/constants'
import LanguageToggle from './LanguageToggle'

interface Props {
  open:    boolean
  onClose: () => void
}

export default function MobileMenu({ open, onClose }: Props) {
  const { t }    = useTranslation()
  const { pathname } = useLocation()

  // Close on route change
  useEffect(() => { onClose() }, [pathname, onClose])

  // Trap focus / close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <nav
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-y-0 end-0 w-80 max-w-full bg-white z-50 shadow-2xl flex flex-col
                    transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-amber-100">
          <span className="font-display font-bold text-shelter-bark">{t('site.name')}</span>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Close menu">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav links */}
        <div className="flex-1 overflow-y-auto py-4 px-4">
          {NAV_LINKS.map(({ key, path }) => (
            <Link
              key={key}
              to={path}
              className="flex items-center px-4 py-3 rounded-xl text-shelter-bark hover:bg-amber-50 hover:text-primary transition-colors font-medium"
            >
              {t(`nav.${key}`)}
            </Link>
          ))}

          <div className="mt-4 pt-4 border-t border-amber-100">
            <LanguageToggle mobile />
          </div>
        </div>

        {/* Donate CTA */}
        <div className="p-4 border-t border-amber-100">
          <a
            href={CAMPAIGN.donateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full justify-center py-4 text-base"
          >
            <Heart className="w-5 h-5" />
            {t('site.donate')}
          </a>
        </div>
      </nav>
    </>
  )
}

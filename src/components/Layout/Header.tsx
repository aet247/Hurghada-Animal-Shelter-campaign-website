import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, Heart, PawPrint } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { NAV_LINKS, CAMPAIGN } from '../../lib/constants'
import LanguageToggle from './LanguageToggle'
import MobileMenu from './MobileMenu'

export default function Header() {
  const { t }       = useTranslation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled,   setScrolled]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-30 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-amber-100/60'
            : 'bg-white/80 backdrop-blur-sm'
        }`}
      >
        <div className="container-content">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow group-hover:scale-110 transition-transform">
                <PawPrint className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-shelter-bark text-lg hidden sm:block">
                {t('site.name')}
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {NAV_LINKS.filter(l => l.key !== 'home').map(({ key, path }) => (
                <NavLink
                  key={key}
                  to={path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-primary bg-amber-50'
                        : 'text-shelter-bark2 hover:text-primary hover:bg-amber-50'
                    }`
                  }
                >
                  {t(`nav.${key}`)}
                </NavLink>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <LanguageToggle />

              <a
                href={CAMPAIGN.donateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2 btn-primary py-2 px-4 text-sm"
              >
                <Heart className="w-4 h-4" />
                {t('site.donate')}
              </a>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Open menu"
                aria-expanded={mobileOpen}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}

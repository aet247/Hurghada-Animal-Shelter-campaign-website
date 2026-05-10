import { Outlet } from 'react-router-dom'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import FloatingDonateCTA from '../components/Layout/FloatingDonateCTA'
import { useRTL } from '../lib/useRTL'
import { useScrollToTop } from '../lib/useScrollToTop'

export default function RootLayout() {
  useRTL()
  useScrollToTop()

  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingDonateCTA />
    </div>
  )
}

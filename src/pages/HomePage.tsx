import { Link } from 'react-router-dom'
import { Heart, DollarSign, Users, PawPrint, Stethoscope, Hammer, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import HeroSection from '../components/HeroSection'
import StatCard from '../components/StatCard'
import AnimalCard from '../components/AnimalCard'
import BlogCard from '../components/BlogCard'
import ShareButtons from '../components/ShareButtons'
import Section from '../components/ui/Section'
import { usePageMeta } from '../lib/usePageMeta'
import { CAMPAIGN } from '../lib/constants'
import { loadAnimals } from '../lib/content/loadAnimals'
import { loadBlogPosts } from '../lib/content/loadBlog'

export default function HomePage() {
  const { t }   = useTranslation()
  const animals = loadAnimals().slice(0, 3)
  const posts   = loadBlogPosts().slice(0, 2)

  usePageMeta({
    title: t('site.name'),
    description: t('site.tagline'),
    path: '/',
  })

  const impactCards = [
    { icon: <DollarSign className="w-7 h-7" />, title: t('home.card1Title'), desc: t('home.card1Desc'), color: 'bg-amber-50 border-amber-200' },
    { icon: <Stethoscope className="w-7 h-7" />, title: t('home.card2Title'), desc: t('home.card2Desc'), color: 'bg-green-50 border-green-200' },
    { icon: <Hammer className="w-7 h-7" />, title: t('home.card3Title'), desc: t('home.card3Desc'), color: 'bg-orange-50 border-orange-200' },
  ]

  return (
    <>
      <HeroSection />

      {/* Stats bar */}
      <Section bg="white" id="stats">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={<Heart className="w-7 h-7" />} value={`$${CAMPAIGN.raisedAmount.toLocaleString()}`} label={t('home.raised')} />
          <StatCard icon={<DollarSign className="w-7 h-7" />} value={`$${CAMPAIGN.goalAmount.toLocaleString()}`} label={t('home.goal')} color="text-shelter-bark" />
          <StatCard icon={<Users className="w-7 h-7" />} value={CAMPAIGN.donorCount} label={t('home.donors')} color="text-secondary" />
          <StatCard icon={<PawPrint className="w-7 h-7" />} value={CAMPAIGN.animalsHelped} label={t('home.animalsHelped')} color="text-orange-500" />
        </div>
      </Section>

      {/* How it works */}
      <Section
        id="how-it-works"
        bg="cream"
        title={t('home.howItWorks')}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {impactCards.map((card, i) => (
            <div key={i} className={`rounded-2xl border p-6 ${card.color}`}>
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 text-primary">
                {card.icon}
              </div>
              <h3 className="font-display text-xl font-bold text-shelter-bark mb-2">{card.title}</h3>
              <p className="text-shelter-bark2 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Meet the Animals */}
      <Section bg="white" title={t('home.meetTheAnimals')}>
        {animals.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              {animals.map(a => <AnimalCard key={a.slug} animal={a} />)}
            </div>
            <Link to="/animals" className="btn-outline inline-flex items-center gap-2">
              {t('site.viewAll')} {t('nav.animals')} <ArrowRight className="w-4 h-4" />
            </Link>
          </>
        ) : (
          <p className="text-shelter-bark2">{t('home.noAnimals')}</p>
        )}
      </Section>

      {/* Latest updates */}
      <Section bg="cream" title={t('home.recentUpdates')}>
        {posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {posts.map(p => <BlogCard key={p.slug} post={p} />)}
            </div>
            <Link to="/blog" className="btn-outline inline-flex items-center gap-2">
              {t('site.viewAll')} {t('nav.blog')} <ArrowRight className="w-4 h-4" />
            </Link>
          </>
        ) : (
          <p className="text-shelter-bark2">{t('home.noPosts')}</p>
        )}
      </Section>

      {/* CTA section */}
      <section className="bg-gradient-to-br from-amber-800 to-orange-700 py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-30" />
        <div className="container-content text-center relative">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-5 text-balance">
            {t('home.ctaSection')}
          </h2>
          <p className="text-amber-100/90 text-lg max-w-xl mx-auto mb-10">
            {t('home.ctaText')}
          </p>
          <a
            href={CAMPAIGN.donateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-amber-800 font-bold px-10 py-4 rounded-full shadow-xl text-lg hover:bg-amber-50 hover:scale-[1.02] transition-all"
          >
            <Heart className="w-5 h-5 fill-current text-red-500" />
            {t('home.heroCta')}
          </a>

          <div className="mt-10 flex justify-center">
            <ShareButtons />
          </div>
        </div>
      </section>
    </>
  )
}

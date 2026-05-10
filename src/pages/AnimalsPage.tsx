import { PawPrint } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PageHeader, EmptyState } from '../components/ui/index'
import AnimalCard from '../components/AnimalCard'
import { usePageMeta } from '../lib/usePageMeta'
import { loadAnimals } from '../lib/content/loadAnimals'

export default function AnimalsPage() {
  const { t }   = useTranslation()
  const animals = loadAnimals()

  usePageMeta({
    title: t('animals.title'),
    description: t('animals.subtitle'),
    path: '/animals',
  })

  return (
    <>
      <PageHeader title={t('animals.title')} subtitle={t('animals.subtitle')} />

      <section className="bg-shelter-cream py-14 md:py-20">
        <div className="container-content">
          {animals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {animals.map(a => <AnimalCard key={a.slug} animal={a} />)}
            </div>
          ) : (
            <EmptyState
              icon={<PawPrint className="w-12 h-12 text-amber-300 mx-auto" />}
              title={t('animals.noAnimals')}
              message={t('animals.noAnimals')}
            />
          )}
        </div>
      </section>
    </>
  )
}

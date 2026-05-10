import { ShieldCheck, TrendingUp, TrendingDown, Wallet } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '../components/ui/index'
import BudgetTable from '../components/BudgetTable'
import { usePageMeta } from '../lib/usePageMeta'
import { loadBudget, computeTotals } from '../lib/content/loadBudget'
import { CAMPAIGN } from '../lib/constants'

export default function BudgetPage() {
  const { t }   = useTranslation()
  const entries = loadBudget()
  const totals  = computeTotals(entries)

  usePageMeta({
    title: t('budget.title'),
    description: t('budget.subtitle'),
    path: '/budget',
  })

  const summaryCards = [
    { label: t('budget.totalReceived'), value: `$${totals.received.toFixed(2)}`, icon: TrendingUp,  color: 'bg-green-50 border-green-200 text-green-700' },
    { label: t('budget.totalSpent'),    value: `$${totals.spent.toFixed(2)}`,    icon: TrendingDown, color: 'bg-red-50 border-red-200 text-red-700' },
    { label: t('budget.balance'),       value: `$${totals.balance.toFixed(2)}`,  icon: Wallet,       color: 'bg-amber-50 border-amber-200 text-amber-800' },
  ]

  return (
    <>
      <PageHeader title={t('budget.title')} subtitle={t('budget.subtitle')} />

      <section className="bg-shelter-cream py-14 md:py-20">
        <div className="container-content space-y-10">
          {/* Summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {summaryCards.map(({ label, value, icon: Icon, color }) => (
              <div key={label} className={`rounded-2xl border p-6 ${color}`}>
                <div className="flex items-center gap-3 mb-2">
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-semibold opacity-80">{label}</span>
                </div>
                <p className="font-display text-3xl font-bold">{value}</p>
              </div>
            ))}
          </div>

          {/* Ledger table */}
          <BudgetTable entries={entries} />

          {/* Trust statement */}
          <div className="flex items-start gap-4 bg-white rounded-2xl border border-amber-100 p-6 shadow-sm">
            <ShieldCheck className="w-7 h-7 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-shelter-bark mb-1">Full Financial Transparency</p>
              <p className="text-shelter-bark2 text-sm leading-relaxed">
                All donations and expenses are published here in real time.
                Receipts are available for every expense. If you have any questions,
                please <a href={`mailto:${CAMPAIGN.email}`} className="text-primary underline">contact Ahmed directly</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

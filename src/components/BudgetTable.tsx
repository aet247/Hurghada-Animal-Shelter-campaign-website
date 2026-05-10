import { useTranslation } from 'react-i18next'
import { Receipt, TrendingUp, TrendingDown } from 'lucide-react'
import type { BudgetEntry } from '../lib/content/loadBudget'
import { Badge } from './ui/index'

export default function BudgetTable({ entries }: { entries: BudgetEntry[] }) {
  const { t } = useTranslation()

  if (entries.length === 0) {
    return (
      <div className="text-center py-16 text-shelter-bark2">
        <Receipt className="w-12 h-12 mx-auto mb-3 opacity-30" />
        <p className="font-semibold text-shelter-bark">{t('budget.noEntries')}</p>
        <p className="text-sm mt-1">{t('budget.comingSoon')}</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-amber-100 shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-shelter-sand border-b border-amber-100">
          <tr>
            {[
              t('budget.date'),
              t('budget.description'),
              t('budget.type'),
              t('budget.amount'),
              t('budget.receipt'),
            ].map(col => (
              <th key={col} className="text-start px-5 py-4 font-semibold text-shelter-bark2 text-xs uppercase tracking-wider">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-amber-50 bg-white">
          {entries.map((entry, i) => (
            <tr key={i} className="hover:bg-amber-50/40 transition-colors">
              <td className="px-5 py-4 text-shelter-bark2 whitespace-nowrap">{entry.date}</td>
              <td className="px-5 py-4 text-shelter-bark font-medium">{entry.description}</td>
              <td className="px-5 py-4">
                {entry.type === 'donation' ? (
                  <Badge variant="success">
                    <TrendingUp className="w-3 h-3 me-1 inline" />
                    {t('budget.donation')}
                  </Badge>
                ) : (
                  <Badge variant="danger">
                    <TrendingDown className="w-3 h-3 me-1 inline" />
                    {t('budget.expense')}
                  </Badge>
                )}
              </td>
              <td className={`px-5 py-4 font-bold tabular-nums ${entry.type === 'donation' ? 'text-green-700' : 'text-red-600'}`}>
                {entry.type === 'donation' ? '+' : '-'}${entry.amount.toFixed(2)}
              </td>
              <td className="px-5 py-4">
                {entry.receipt ? (
                  <a href={entry.receipt} target="_blank" rel="noopener noreferrer"
                     className="text-primary text-xs font-medium hover:underline">
                    {t('budget.viewReceipt')}
                  </a>
                ) : (
                  <span className="text-gray-300">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

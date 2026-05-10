import budgetData from '../../../content/budget.json'

export interface BudgetEntry {
  date:        string
  description: string
  type:        'donation' | 'expense'
  amount:      number
  receipt?:    string
  notes?:      string
}

export interface BudgetTotals {
  received: number
  spent:    number
  balance:  number
}

export function loadBudget(): BudgetEntry[] {
  return (budgetData.entries as BudgetEntry[]) ?? []
}

export function computeTotals(entries: BudgetEntry[]): BudgetTotals {
  const received = entries
    .filter(e => e.type === 'donation')
    .reduce((sum, e) => sum + e.amount, 0)
  const spent = entries
    .filter(e => e.type === 'expense')
    .reduce((sum, e) => sum + e.amount, 0)
  return { received, spent, balance: received - spent }
}

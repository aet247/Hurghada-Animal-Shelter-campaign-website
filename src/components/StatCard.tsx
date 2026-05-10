import type { ReactNode } from 'react'

interface Props {
  icon:    ReactNode
  value:   string | number
  label:   string
  color?:  string
}

export default function StatCard({ icon, value, label, color = 'text-primary' }: Props) {
  return (
    <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-amber-100/60">
      <div className={`text-3xl mb-2 ${color}`}>{icon}</div>
      <div className="font-display text-3xl font-bold text-shelter-bark mb-1">{value}</div>
      <div className="text-sm text-shelter-bark2 font-medium">{label}</div>
    </div>
  )
}

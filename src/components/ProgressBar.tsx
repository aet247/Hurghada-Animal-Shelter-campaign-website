import { useTranslation } from 'react-i18next'

interface Props {
  raised:      number
  goal:        number
  donorCount?: number
  showLabels?: boolean
  light?:      boolean
}

export default function ProgressBar({ raised, goal, donorCount, showLabels = true, light = false }: Props) {
  const { t }    = useTranslation()
  const pct      = goal > 0 ? Math.min(Math.round((raised / goal) * 100), 100) : 0
  const textCls  = light ? 'text-amber-100' : 'text-shelter-bark'
  const mutedCls = light ? 'text-amber-100/70' : 'text-shelter-bark2'
  const trackCls = light ? 'bg-white/20' : 'bg-amber-100'
  const fillCls  = light ? 'bg-white' : 'bg-primary'

  return (
    <div className="w-full">
      {showLabels && (
        <div className="flex justify-between mb-2 text-sm">
          <span className={mutedCls}>{t('home.raised')}</span>
          <span className={`font-bold ${textCls}`}>{pct}% funded</span>
        </div>
      )}

      {/* Track */}
      <div className={`w-full ${trackCls} rounded-full h-3 overflow-hidden`}>
        <div
          className={`${fillCls} h-full rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={raised}
          aria-valuemin={0}
          aria-valuemax={goal}
          aria-label={`${pct}% funded`}
        />
      </div>

      {/* Amounts */}
      <div className="flex justify-between mt-2 text-sm">
        <span className={`font-bold ${textCls}`}>${raised.toLocaleString()} {t('home.raised')}</span>
        <span className={mutedCls}>{t('home.goal')}: ${goal.toLocaleString()}</span>
      </div>

      {donorCount !== undefined && (
        <p className={`text-xs ${mutedCls} mt-1`}>{donorCount} {t('home.donors')}</p>
      )}
    </div>
  )
}

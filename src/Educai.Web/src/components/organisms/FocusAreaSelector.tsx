import { Badge } from '../atoms/Badge'
import { Card } from '../atoms/Card'

interface FocusArea {
  key: string
  label: string
  icon: string
}

export const FOCUS_AREAS: FocusArea[] = [
  { key: 'Matematik', label: 'Matematik', icon: '⚙️' },
  { key: 'Geometri', label: 'Geometri', icon: '🔷' },
  { key: 'Fizik', label: 'Fizik', icon: '🗄️' },
  { key: 'Biyoloji', label: 'Biyoloji', icon: '🧬' },
  { key: 'Coğrafya', label: 'Coğrafya', icon: '🔭' },
  { key: 'Kimya', label: 'Kimya', icon: '⚗️' },
  { key: 'Tarih', label: 'Tarih', icon: '📖' },
  { key: 'Edebiyat', label: 'Edebiyat', icon: '📝' },
]

interface FocusAreaSelectorProps {
  selected: string[]
  onToggle: (area: string) => void
}

export function FocusAreaSelector({ selected, onToggle }: FocusAreaSelectorProps) {
  return (
    <Card className="!p-8 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-white">
            Öğrenme Odak Alanları
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            En az bir alan seçmen gerekiyor.
          </p>
        </div>
        <Badge variant="danger">Zorunlu</Badge>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {FOCUS_AREAS.map((area) => {
          const isSelected = selected.includes(area.key)
          return (
            <button
              key={area.key}
              onClick={() => onToggle(area.key)}
              className={`flex flex-col items-center justify-center gap-2 px-3 py-4 rounded-xl border transition-all duration-200 active:scale-[0.97] hover:scale-105 ${
                isSelected
                  ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-100 shadow-[0_0_25px_rgba(16,185,129,0.35)]'
                  : 'bg-white/[0.02] border-white/10 text-[var(--text-secondary)] hover:bg-white/5 hover:border-white/20 hover:text-white'
              }`}
            >
              <span className="text-2xl shrink-0">{area.icon}</span>
              <span className="text-xs font-semibold truncate tracking-wide">
                {area.label}
              </span>
            </button>
          )
        })}
      </div>
    </Card>
  )
}

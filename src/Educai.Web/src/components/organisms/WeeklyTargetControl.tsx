import { Button } from '../atoms/Button'
import { Card } from '../atoms/Card'

interface WeeklyTargetControlProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
}

export function WeeklyTargetControl({
  value,
  onChange,
  min = 10,
  max = 500,
  step = 10,
}: WeeklyTargetControlProps) {
  const clamp = (v: number) => Math.min(max, Math.max(min, v))

  return (
    <Card className="!p-8 flex flex-col gap-5">
      <div>
        <h2 className="text-base font-semibold text-white">Haftalık Soru Hedefi</h2>
        <p className="text-xs text-[var(--text-muted)] mt-0.5">
          Bu haftaki hedef soru sayını ayarla.
        </p>
      </div>

      <div className="flex items-center justify-between gap-6 py-3">
        <Button
          variant="secondary"
          size="md"
          className="!rounded-full !w-12 !h-12 !p-0 text-2xl"
          onClick={() => onChange(clamp(value - step))}
          disabled={value <= min}
          aria-label="Azalt"
        >
          −
        </Button>

        <div className="text-center flex-1">
          <div className="text-5xl font-extrabold text-amber-300 tabular-nums drop-shadow-[0_0_20px_rgba(245,158,11,0.35)]">
            {value}
          </div>
          <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest mt-1">
            soru / hafta
          </p>
        </div>

        <Button
          variant="secondary"
          size="md"
          className="!rounded-full !w-12 !h-12 !p-0 text-2xl"
          onClick={() => onChange(clamp(value + step))}
          disabled={value >= max}
          aria-label="Arttır"
        >
          +
        </Button>
      </div>
    </Card>
  )
}

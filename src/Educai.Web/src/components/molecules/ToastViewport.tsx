import { useToast, type ToastKind } from '../../context/ToastContext'

const kindStyles: Record<ToastKind, string> = {
  success: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
  error: 'border-red-500/40 bg-red-500/10 text-red-300',
  info: 'border-purple-500/40 bg-purple-500/10 text-purple-200',
}

const kindIcon: Record<ToastKind, string> = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
}

export function ToastViewport() {
  const { toasts, dismissToast } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 pointer-events-none">
      {toasts.map((t) => (
        <button
          key={t.id}
          onClick={() => dismissToast(t.id)}
          className={`pointer-events-auto min-w-[260px] max-w-sm flex items-center gap-3 px-4 py-3 rounded-2xl border backdrop-blur-xl text-sm font-medium animate-[var(--animate-slide-in-right)] shadow-xl shadow-black/40 ${kindStyles[t.kind]}`}
        >
          <span
            className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
              t.kind === 'success'
                ? 'bg-emerald-500/20'
                : t.kind === 'error'
                  ? 'bg-red-500/20'
                  : 'bg-purple-500/20'
            }`}
          >
            {kindIcon[t.kind]}
          </span>
          <span className="flex-1 text-left">{t.message}</span>
        </button>
      ))}
    </div>
  )
}

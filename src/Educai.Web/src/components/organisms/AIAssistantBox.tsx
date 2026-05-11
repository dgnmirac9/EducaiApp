import { Card } from '../atoms/Card'

export function AIAssistantBox() {
  return (
    <Card gradient>
      <div className="flex items-start gap-4 p-2">
        <div className="w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center text-2xl shadow-lg shadow-purple-500/40">
          🤖
        </div>
        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          <p className="text-sm font-semibold text-white tracking-tight">
            AI Asistan
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Öğrenme hedeflerini analiz ediyorum. Sana en uygun soruları
            hazırlamak için bu tercihler çok önemli. Aşağıdaki seçimlerin
            ardından <span className="text-white font-medium">Tercihleri Kaydet</span>'e bas — gerisini bana bırak.
          </p>
        </div>
      </div>
    </Card>
  )
}

import { Icon } from './Icons'
import { Glass } from './Glass'

const MOCK_DAYS = [
  { d: 'PZT', v: 28, done: true },
  { d: 'SAL', v: 22, done: true },
  { d: 'ÇAR', v: 35, done: true },
  { d: 'PER', v: 18, done: true },
  { d: 'CUM', v: 25, today: true },
  { d: 'CMT', v: 0 },
  { d: 'PAZ', v: 0 },
]

export function WeeklyGoal({ goal, setGoal, solved, loading }) {
  const days = MOCK_DAYS
  const total = solved ?? days.reduce((s, d) => s + d.v, 0)
  return (
    <Glass className="weekly" style={loading ? { opacity: 0.7 } : undefined}>
      <div className="section-h">
        <h3>Haftalık Soru Hedefi</h3>
        <span className="pill">{total}/{goal} tamamlandı</span>
      </div>
      <div className="goal-row">
        <div>
          <div className="goal-num">{goal}</div>
          <div className="goal-sub"><Icon.target /> Hedefini gün başına böl: ~{Math.round(goal / 7)} soru/gün</div>
        </div>
        <div className="stepper">
          <button className="step-btn" onClick={() => setGoal(Math.max(10, goal - 10))}>−</button>
          <input
            className="goal-input"
            value={goal}
            onChange={(e) => {
              const v = parseInt(e.target.value) || 0
              setGoal(Math.max(0, Math.min(999, v)))
            }}
          />
          <button className="step-btn" onClick={() => setGoal(Math.min(999, goal + 10))}>+</button>
        </div>
      </div>
      <div className="week-days">
        {days.map((d, i) => (
          <div key={i} className={`day ${d.done ? 'done' : ''} ${d.today ? 'today' : ''}`}>
            <div className="d">{d.d}</div>
            <div className="v">{d.v}</div>
          </div>
        ))}
      </div>
    </Glass>
  )
}

import { Icon } from './Icons'

export function Topbar({ name, loading }) {
  const display = loading ? '…' : (name || 'misafir')
  return (
    <div className="topbar">
      <div className="greeting">
        <h1>Selam, <span style={{ color: '#FFE074' }}>{display}</span> 👋</h1>
        <p>Bugün 3 görev seni bekliyor. Haftalık hedefe 22 soru kaldı.</p>
      </div>
      <div className="search">
        <Icon.search style={{ color: '#B5A4DC' }} />
        <input placeholder="Konu, soru ya da arkadaş ara…" />
        <span className="kbd">⌘K</span>
      </div>
      <div className="streak">
        <div className="flame"><Icon.flame /></div>
        <div>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 11 }}>12 gün</div>
          <div className="small">streak</div>
        </div>
      </div>
      <div className="icon-btn"><Icon.bell /><span className="dot" /></div>
      <div className="icon-btn"><Icon.settings /></div>
    </div>
  )
}

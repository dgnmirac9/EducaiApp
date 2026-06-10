import { useNavigate } from 'react-router-dom'
import { Icon } from './Icons'

export function Sidebar({ active, setActive }) {
  const navigate = useNavigate()

  const scrollToSubjects = () => {
    const el = document.querySelector('.subjects')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const items = [
    {
      id: 'home',
      label: 'Ana Sayfa',
      icon: Icon.home,
      onClick: () => { setActive('home'); navigate('/') },
    },
    {
      id: 'subjects',
      label: 'Dersler',
      icon: Icon.books,
      badge: '6',
      onClick: () => { setActive('subjects'); scrollToSubjects() },
    },
    {
      id: 'challenges',
      label: 'Görevler',
      icon: Icon.trophy,
      badge: '3',
      onClick: () => { setActive('challenges') },
    },
    {
      id: 'profile',
      label: 'Profil',
      icon: Icon.user,
      onClick: () => { setActive('profile'); navigate('/profile') },
    },
  ]

  const tools = [
    {
      id: 'notif',
      label: 'Bildirimler',
      icon: Icon.bell,
      onClick: () => alert('Yakında!'),
    },
    {
      id: 'settings',
      label: 'Ayarlar',
      icon: Icon.settings,
      onClick: () => alert('Yakında!'),
    },
  ]

  return (
    <aside className="sidebar glass">
      <div className="brand">
        <div className="brand-mark">E</div>
        <div>
          <div className="brand-name">Educ<span>ai</span></div>
          <div className="small">Learning Quest</div>
        </div>
      </div>
      <div className="nav-section">Ana</div>
      {items.map((it) => (
        <div key={it.id} className={`nav-item ${active === it.id ? 'active' : ''}`} onClick={it.onClick}>
          <div className="ico"><it.icon /></div>
          <div>{it.label}</div>
          {it.badge && <div className="badge">{it.badge}</div>}
        </div>
      ))}
      <div className="nav-section">Hesap</div>
      {tools.map((it) => (
        <div key={it.id} className="nav-item" onClick={it.onClick}>
          <div className="ico"><it.icon /></div>
          <div>{it.label}</div>
        </div>
      ))}
      <div className="nav-foot">
        <div className="upgrade">
          <div className="row" style={{ marginBottom: 8 }}>
            <Icon.sparkles style={{ color: '#FFE074' }} />
            <span className="premium-tag">PREMIUM</span>
          </div>
          <h4>Unlock AI tutor</h4>
          <p>Unlimited nicknames, daily challenges, voice study mode.</p>
          <button className="upgrade-btn">Upgrade — 49₺ / ay</button>
        </div>
      </div>
    </aside>
  )
}

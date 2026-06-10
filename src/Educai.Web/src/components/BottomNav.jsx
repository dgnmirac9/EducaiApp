import { useLocation, useNavigate } from 'react-router-dom'

export function BottomNav({ active, setActive }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const items = [
    {
      id: 'home',
      label: 'Ana Sayfa',
      icon: '🏠',
      onClick: () => { navigate('/'); setActive && setActive('home') },
      isActive: pathname === '/' && active === 'home',
    },
    {
      id: 'subjects',
      label: 'Dersler',
      icon: '📚',
      onClick: () => { setActive && setActive('subjects'); window.scrollTo(0, 0) },
      isActive: active === 'subjects',
    },
    {
      id: 'duel',
      label: 'Düello',
      icon: '⚔️',
      onClick: () => navigate('/duel'),
      isActive: pathname.startsWith('/duel'),
    },
    {
      id: 'profile',
      label: 'Profil',
      icon: '👤',
      onClick: () => navigate('/profile'),
      isActive: pathname.startsWith('/profile'),
    },
  ]

  return (
    <nav className="bottom-nav" aria-label="Alt navigasyon">
      {items.map((it) => (
        <button
          key={it.id}
          className={`bottom-nav-item ${it.isActive ? 'active' : ''}`}
          onClick={it.onClick}
        >
          <span className="ico" aria-hidden>{it.icon}</span>
          <span className="lbl">{it.label}</span>
        </button>
      ))}
    </nav>
  )
}

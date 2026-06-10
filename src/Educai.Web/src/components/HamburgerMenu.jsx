import { useEffect, useState } from 'react'
import { Sidebar } from './Sidebar'

export function HamburgerMenu({ active, setActive }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const handleSidebarSelect = (id) => {
    setActive(id)
    setOpen(false)
  }

  return (
    <>
      <button
        className="hamburger-btn"
        aria-label="Menüyü aç"
        onClick={() => setOpen(true)}
      >
        ☰
      </button>

      {open && (
        <div className="drawer-backdrop" onClick={() => setOpen(false)}>
          <div className="sidebar-drawer" onClick={(e) => e.stopPropagation()}>
            <Sidebar active={active} setActive={handleSidebarSelect} />
          </div>
        </div>
      )}
    </>
  )
}

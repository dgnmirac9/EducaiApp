export const Icon = {
  home: (p) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"/></svg>
  ),
  books: (p) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 5a2 2 0 0 1 2-2h5v18H6a2 2 0 0 1-2-2Z"/><path d="M13 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5Z"/><path d="M7 7h2M7 11h2M16 7h2M16 11h2"/></svg>
  ),
  trophy: (p) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M8 4h8v4a4 4 0 0 1-8 0Z"/><path d="M4 5h4v3a2 2 0 0 1-4 0Z"/><path d="M16 5h4v3a2 2 0 0 1-4 0Z"/><path d="M9 14h6l-1 4h-4Z"/><path d="M8 21h8"/></svg>
  ),
  rocket: (p) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14 4c4 0 6 2 6 6l-7 7-6-1-1-6Z"/><circle cx="14.5" cy="9.5" r="1.6"/><path d="M7 14l-3 3 4 0"/><path d="M10 17l0 4 3-3"/></svg>
  ),
  user: (p) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>
  ),
  bell: (p) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4Z"/><path d="M10 21a2 2 0 0 0 4 0"/></svg>
  ),
  settings: (p) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 13.5a1.7 1.7 0 0 1 0-3l1.1-.7-1.5-2.6-1.3.3a1.7 1.7 0 0 1-2-1.2L15.4 5h-3l-.3 1.3a1.7 1.7 0 0 1-2 1.2l-1.3-.3-1.5 2.6 1 .7a1.7 1.7 0 0 1 0 3l-1 .7 1.5 2.6 1.3-.3a1.7 1.7 0 0 1 2 1.2L12 19h3l.3-1.3a1.7 1.7 0 0 1 2-1.2l1.3.3 1.5-2.6Z"/></svg>
  ),
  search: (p) => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>),
  flame: (p) => (<svg width="18" height="18" viewBox="0 0 24 24" fill="#FF8AA3" stroke="#FFE074" strokeWidth="1.2" {...p}><path d="M12 3c1.5 3 4 4 4 8a4 4 0 1 1-8 0c0-1.5.5-2.5 1.5-3.5C9.5 9 9 6 12 3Z"/></svg>),
  pencil: (p) => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 20h4l11-11-4-4L4 16Z"/><path d="m14 6 4 4"/></svg>),
  arrowL: (p) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M15 6l-6 6 6 6"/></svg>),
  arrowR: (p) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9 6l6 6-6 6"/></svg>),
  send: (p) => (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M3 11.5 21 3l-8 18-2.5-7.5Z" opacity=".95"/></svg>),
  sparkles: (p) => (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2l1.6 4.4L18 8l-4.4 1.6L12 14l-1.6-4.4L6 8l4.4-1.6Z"/><path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8Z"/></svg>),
  target: (p) => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/></svg>),
  star: (p) => (<svg viewBox="0 0 24 24" width="20" height="20" fill="#FFE074" stroke="#7A3D00" strokeWidth="1.2" {...p}><path d="M12 3l2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1L3.2 9.4l6.1-.9Z"/></svg>),
}

export const SubjectIcon = {
  math: (color) => (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="24" height="24" rx="6"/>
      <path d="M9 11h6M12 8v6"/>
      <path d="M19 9l4 4M19 13l4-4"/>
      <path d="M8 20h7M9 24h5"/>
      <circle cx="22" cy="20" r="1.6" fill={color}/>
      <circle cx="22" cy="24" r="1.6" fill={color}/>
    </svg>
  ),
  geo: (color) => (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4l12 22H4Z"/>
      <circle cx="16" cy="14" r="2" fill={color}/>
      <path d="M10 24h12"/>
    </svg>
  ),
  physics: (color) => (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="16" r="2.4" fill={color}/>
      <ellipse cx="16" cy="16" rx="12" ry="5"/>
      <ellipse cx="16" cy="16" rx="12" ry="5" transform="rotate(60 16 16)"/>
      <ellipse cx="16" cy="16" rx="12" ry="5" transform="rotate(120 16 16)"/>
    </svg>
  ),
  biology: (color) => (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 26C12 22 12 14 6 10"/>
      <path d="M26 6C20 10 20 18 26 22"/>
      <path d="M10 22c2-2 6-2 8 0"/>
      <path d="M14 10c2-2 6-2 8 0"/>
      <circle cx="9" cy="14" r="1.6" fill={color}/>
      <circle cx="23" cy="18" r="1.6" fill={color}/>
    </svg>
  ),
  geography: (color) => (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="16" r="11"/>
      <path d="M5 16h22"/>
      <path d="M16 5c4 4 4 18 0 22"/>
      <path d="M16 5c-4 4-4 18 0 22"/>
    </svg>
  ),
  chemistry: (color) => (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 4v8L7 24a3 3 0 0 0 2.6 4.4h12.8A3 3 0 0 0 25 24l-6-12V4"/>
      <path d="M11 4h10"/>
      <circle cx="13" cy="22" r="1.4" fill={color}/>
      <circle cx="18" cy="19" r="1.2" fill={color}/>
    </svg>
  ),
  history: (color) => (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="16" r="11"/>
      <path d="M16 9v7l5 3"/>
      <path d="M5 16c0-6 5-11 11-11" strokeDasharray="2 2"/>
    </svg>
  ),
  literature: (color) => (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6h14a4 4 0 0 1 4 4v16H10a4 4 0 0 1-4-4Z"/>
      <path d="M10 11h8M10 15h8M10 19h6"/>
    </svg>
  ),
  cs: (color) => (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="6" width="24" height="16" rx="3"/>
      <path d="M11 11l-3 3 3 3M21 11l3 3-3 3M18 11l-4 6"/>
      <path d="M11 26h10"/>
    </svg>
  ),
}

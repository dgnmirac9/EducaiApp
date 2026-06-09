export function Glass({ className = '', strong = false, children, style }) {
  return (
    <div className={`${strong ? 'glass-strong' : 'glass'} ${className}`} style={style}>
      {children}
    </div>
  )
}

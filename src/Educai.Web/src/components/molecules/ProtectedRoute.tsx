import { Navigate } from 'react-router-dom'
import { useUser } from '../../context/UserContext'
import { type ReactNode } from 'react'

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { currentUser } = useUser()
  if (!currentUser) return <Navigate to="/" replace />
  return <>{children}</>
}

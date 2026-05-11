import { createContext, useContext, useState, type ReactNode } from 'react'

interface UserContextType {
  currentUser: string | null
  login: (userId: string) => void
  logout: () => void
}

const UserContext = createContext<UserContextType | null>(null)

export function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<string | null>(
    () => localStorage.getItem('userId')
  )

  const login = (userId: string) => {
    localStorage.setItem('userId', userId)
    setCurrentUser(userId)
  }

  const logout = () => {
    localStorage.removeItem('userId')
    setCurrentUser(null)
  }

  return (
    <UserContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be used within UserProvider')
  return ctx
}

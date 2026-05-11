import { type ReactNode } from 'react'
import { AppSidebar } from '../organisms/AppSidebar'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen bg-[var(--bg-base)] text-[var(--text-primary)]">
      <AppSidebar />
      <main className="flex-1 min-w-0 overflow-y-auto flex justify-center animate-[var(--animate-fade-in)]">
        <div className="w-full max-w-6xl mx-auto px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}

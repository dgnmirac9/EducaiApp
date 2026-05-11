import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import { ToastProvider } from './context/ToastContext'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { DuelPage } from './pages/DuelPage'
import { DuelLobbyPage } from './pages/DuelLobbyPage'
import { ProfilePage } from './pages/ProfilePage'
import { ProtectedRoute } from './components/molecules/ProtectedRoute'
import { ToastViewport } from './components/molecules/ToastViewport'

function App() {
  return (
    <ToastProvider>
      <UserProvider>
        <BrowserRouter>
          <ToastViewport />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/duel"
              element={
                <ProtectedRoute>
                  <DuelLobbyPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/duel/:matchId"
              element={
                <ProtectedRoute>
                  <DuelPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </ToastProvider>
  )
}

export default App

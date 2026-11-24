import { useState } from 'react'
import AuthProvider from './auth/AuthContext.jsx'
import useAuth from './auth/useAuth'
import { ForgotPasswordPage, LoginHelpPage, SignInPage } from './pages/auth'
import ITDashboard from './roles/it/ITDashboard.jsx'
import OSASDashboard from './roles/osas/OSASDashboard.jsx'
import RegistrarDashboard from './roles/registrar/RegistrarDashboard.jsx'
import StudentDashboard from './roles/student/StudentDashboard.jsx'

const authPages = {
  'forgot-password': ForgotPasswordPage,
  'login-help': LoginHelpPage,
  'sign-in': SignInPage,
}

const dashboards = {
  Student: StudentDashboard,
  Registrar: RegistrarDashboard,
  IT: ITDashboard,
  OSAS: OSASDashboard,
}

function AppContent() {
  const { user, isAuthenticated, signIn, signOut } = useAuth()
  const [authPage, setAuthPage] = useState('sign-in')

  if (isAuthenticated) {
    const Dashboard = dashboards[user?.role]
    return Dashboard ? <Dashboard user={user} onLogout={signOut} /> : null
  }

  const AuthPage = authPages[authPage] ?? SignInPage

  return <AuthPage onSignIn={signIn} onNavigate={setAuthPage} />
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App

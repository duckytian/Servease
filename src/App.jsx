import { useState } from 'react'
import AuthProvider from './auth/AuthContext.jsx'
import useAuth from './auth/useAuth'
import { ForgotPasswordPage, LoginHelpPage, SignInPage } from './pages/auth'
import StudentDashboard from './roles/student/StudentDashboard.jsx'

const authPages = {
  'forgot-password': ForgotPasswordPage,
  'login-help': LoginHelpPage,
  'sign-in': SignInPage,
}

function AppContent() {
  const { user, isAuthenticated, signIn, signOut } = useAuth()
  const [authPage, setAuthPage] = useState('sign-in')

  if (isAuthenticated) {
    return <StudentDashboard user={user} onLogout={signOut} />
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

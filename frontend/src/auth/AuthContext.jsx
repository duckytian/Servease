import { useEffect, useMemo, useState } from 'react'
import { AuthContext } from './context'
import { api, clearSession } from '../api.js'

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (!token) { setLoading(false); return }
    let cancelled = false
    api('/auth/me')
      .then((account) => {
        if (cancelled) return
        setUser({
          role: { student: 'Student', osas: 'OSAS', registrar: 'Registrar', it: 'IT' }[account.role] || account.role,
          userId: account.userId,
          id: account.id,
          name: account.name,
          email: account.email,
          course: account.course,
          yearLevel: account.yearLevel,
          contactNumber: account.contactNumber,
        })
      })
      .catch(() => clearSession())
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  const signIn = (userData) => setUser(userData)
  const signOut = () => {
    clearSession()
    setUser(null)
  }

  const value = useMemo(
    () => ({ user, isAuthenticated: Boolean(user), loading, signIn, signOut }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
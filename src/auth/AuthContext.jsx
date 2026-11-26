import { useMemo, useState } from 'react'
import { AuthContext } from './context'
import { clearSession } from '../api.js'

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const signIn = (userData) => setUser(userData)
  const signOut = () => {
    clearSession()
    setUser(null)
  }

  const value = useMemo(
    () => ({ user, isAuthenticated: Boolean(user), signIn, signOut }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider

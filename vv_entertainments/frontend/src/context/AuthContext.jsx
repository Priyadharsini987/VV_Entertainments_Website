import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('vv_token')
    if (token) {
      axios.get('/api/auth/verify', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => setAdmin(res.data))
        .catch(() => localStorage.removeItem('vv_token'))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (username, password) => {
    const res = await axios.post('/api/auth/login', { username, password })
    localStorage.setItem('vv_token', res.data.token)
    setAdmin({ username: res.data.username })
    return res.data
  }

  const logout = () => {
    localStorage.removeItem('vv_token')
    setAdmin(null)
  }

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export const getAuthHeader = () => {
  const token = localStorage.getItem('vv_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

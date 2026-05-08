import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import { FaLock, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa'
import './AdminLogin.css'

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login, admin } = useAuth()
  const navigate = useNavigate()

  if (admin) { navigate('/admin'); return null }

  const submit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(form.username, form.password)
      toast.success('Welcome back, Vijay Vishwa! 🌸')
      navigate('/admin')
    } catch {
      toast.error('Invalid credentials. Access denied.')
    }
    setLoading(false)
  }

  return (
    <div className="admin-login-page">
      <div className="login-bg">
        <div className="login-particles">
          {[...Array(15)].map((_, i) => (
            <span key={i} className="login-particle" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }} />
          ))}
        </div>
      </div>

      <div className="login-card">
        <div className="login-logo">
          <img src="/logo.jpg" alt="VV Logo" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 10px' }} />
          <div>
            <div className="login-brand">VV</div>
            <div className="login-brand-sub">ENTERTAINMENTS</div>
          </div>
        </div>

        <div className="login-header">
          <div className="login-lock-icon"><FaLock /></div>
          <h2>Admin Portal</h2>
          <p>Authorized personnel only</p>
        </div>

        <form onSubmit={submit} className="login-form">
          <div className="login-field">
            <FaUser className="field-icon" />
            <input
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={e => setForm({...form, username: e.target.value})}
              required
              autoComplete="username"
            />
          </div>

          <div className="login-field">
            <FaLock className="field-icon" />
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Password"
              value={form.password}
              onChange={e => setForm({...form, password: e.target.value})}
              required
              autoComplete="current-password"
            />
            <button type="button" className="eye-btn" onClick={() => setShowPass(!showPass)}>
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <a href="/" className="back-home">← Back to Website</a>
      </div>
    </div>
  )
}

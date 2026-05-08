import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import {
  FaTachometerAlt, FaImages, FaConciergeBell,
  FaEnvelope, FaStar, FaSignOutAlt, FaGlobe, FaBars
} from 'react-icons/fa'
import './AdminSidebar.css'

const navItems = [
  { to: '/admin', icon: <FaTachometerAlt />, label: 'Dashboard' },
  { to: '/admin/gallery', icon: <FaImages />, label: 'Gallery' },
  { to: '/admin/services', icon: <FaConciergeBell />, label: 'Services' },
  { to: '/admin/messages', icon: <FaEnvelope />, label: 'Messages' },
  { to: '/admin/testimonials', icon: <FaStar />, label: 'Testimonials' },
]

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const { logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/')
  }

  return (
    <>
      <div className="mobile-admin-header">
        <div className="mobile-brand">VV Admin</div>
        <button onClick={() => setIsOpen(!isOpen)}><FaBars /></button>
      </div>

      {isOpen && <div className="admin-overlay" onClick={() => setIsOpen(false)} />}

      <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <img src="/logo.jpg" alt="VV Logo" style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover', marginRight: '10px' }} />
          <div>
            <div className="sidebar-brand">VV</div>
            <div className="sidebar-sub">Admin Panel</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className={`sidebar-link ${location.pathname === item.to ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <Link to="/" className="sidebar-link view-site">
            <span className="sidebar-icon"><FaGlobe /></span>
            <span>View Site</span>
          </Link>
          <button className="sidebar-link logout-btn" onClick={handleLogout}>
            <span className="sidebar-icon"><FaSignOutAlt /></span>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}

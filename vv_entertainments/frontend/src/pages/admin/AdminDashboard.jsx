import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'
import AdminSidebar from '../../components/admin/AdminSidebar'
import { getAuthHeader } from '../../context/AuthContext'
import { FaImages, FaConciergeBell, FaEnvelope, FaStar } from 'react-icons/fa'
import './AdminPages.css'

export default function AdminDashboard() {
  const { admin } = useAuth()
  const [stats, setStats] = useState({ gallery: 0, services: 0, messages: 0, testimonials: 0, unread: 0 })

  useEffect(() => {
    const h = getAuthHeader()
    Promise.all([
      axios.get('/api/gallery/all', { headers: h }),
      axios.get('/api/services/all', { headers: h }),
      axios.get('/api/contact', { headers: h }),
      axios.get('/api/testimonials/all', { headers: h }),
      axios.get('/api/contact/unread-count', { headers: h }),
    ]).then(([g, s, m, t, u]) => {
      setStats({
        gallery: g.data.length,
        services: s.data.length,
        messages: m.data.length,
        testimonials: t.data.length,
        unread: u.data.count
      })
    }).catch(() => {})
  }, [])

  const cards = [
    { icon: <FaImages />, label: 'Gallery Photos', value: stats.gallery, color: '#c9a84c', link: '/admin/gallery' },
    { icon: <FaConciergeBell />, label: 'Services', value: stats.services, color: '#27ae60', link: '/admin/services' },
    { icon: <FaEnvelope />, label: 'Messages', value: stats.messages, color: '#3498db', link: '/admin/messages', badge: stats.unread },
    { icon: <FaStar />, label: 'Testimonials', value: stats.testimonials, color: '#e67e22', link: '/admin/testimonials' },
  ]

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        <div className="admin-header">
          <div>
            <h1>Welcome back, <span className="gold-text">Vijay Vishwa</span> 👋</h1>
            <p>Here's what's happening with VV Entertainments today.</p>
          </div>
          <div className="admin-date">
            {new Date().toLocaleDateString('en-IN', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}
          </div>
        </div>

        <div className="stats-grid">
          {cards.map((c, i) => (
            <a key={i} href={c.link} className="stat-card">
              <div className="stat-card-icon" style={{ color: c.color, background: `${c.color}15` }}>
                {c.icon}
              </div>
              <div className="stat-card-info">
                <div className="stat-card-value">{c.value}</div>
                <div className="stat-card-label">{c.label}</div>
              </div>
              {c.badge > 0 && (
                <div className="stat-card-badge">{c.badge} new</div>
              )}
            </a>
          ))}
        </div>

        <div className="dashboard-welcome">
          <div className="welcome-inner">
            <img src="/logo.jpg" alt="VV Logo" style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 1rem', display: 'block' }} />
            <h2>VV Entertainments Admin Panel</h2>
            <p>Use the sidebar to manage your gallery, services, messages, and testimonials. All changes reflect on the public website instantly.</p>
            <div className="quick-links">
              <a href="/admin/gallery" className="quick-link">📸 Add Photos</a>
              <a href="/admin/services" className="quick-link">➕ Add Service</a>
              <a href="/admin/messages" className="quick-link">📬 View Messages</a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

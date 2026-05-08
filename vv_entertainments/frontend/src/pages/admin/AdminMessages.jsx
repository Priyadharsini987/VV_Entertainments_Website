import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import AdminSidebar from '../../components/admin/AdminSidebar'
import { getAuthHeader } from '../../context/AuthContext'
import { FaEnvelope, FaEnvelopeOpen, FaTrash, FaPhone, FaCalendar } from 'react-icons/fa'
import './AdminPages.css'

export default function AdminMessages() {
  const [messages, setMessages] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)

  const load = () => axios.get('/api/contact', { headers: getAuthHeader() })
    .then(r => setMessages(r.data)).catch(() => toast.error('Failed to load')).finally(() => setLoading(false))

  useEffect(() => { load() }, [])

  const markRead = async (msg) => {
    if (msg.read) return
    try {
      await axios.put(`/api/contact/${msg.id}/read`, {}, { headers: getAuthHeader() })
      load()
    } catch {}
  }

  const del = async (id) => {
    if (!confirm('Delete this message?')) return
    try {
      await axios.delete(`/api/contact/${id}`, { headers: getAuthHeader() })
      toast.success('Deleted'); setSelected(null); load()
    } catch { toast.error('Failed to delete') }
  }

  const openMsg = (msg) => { setSelected(msg); markRead(msg) }

  const unread = messages.filter(m => !m.read).length

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        <div className="admin-header">
          <div>
            <h1>Messages <span className="gold-text">Inbox</span></h1>
            <p>{unread > 0 ? `${unread} unread message${unread > 1 ? 's' : ''}` : 'All messages read'}</p>
          </div>
          <div className="header-count">{messages.length} total</div>
        </div>

        <div className="messages-layout">
          {/* Sidebar */}
          <div className="messages-list admin-card">
            {loading ? <div className="admin-loading">Loading...</div> :
             messages.length === 0 ? <div className="admin-empty">No messages yet</div> :
             messages.map(msg => (
              <div
                key={msg.id}
                className={`message-item ${!msg.read ? 'unread' : ''} ${selected?.id === msg.id ? 'selected' : ''}`}
                onClick={() => openMsg(msg)}
              >
                <div className="message-icon">
                  {msg.read ? <FaEnvelopeOpen /> : <FaEnvelope />}
                </div>
                <div className="message-preview">
                  <div className="message-name">{msg.name}</div>
                  <div className="message-type">{msg.eventType || 'General Enquiry'}</div>
                  <div className="message-snippet">{msg.message?.substring(0, 60)}...</div>
                </div>
                {!msg.read && <div className="unread-dot" />}
              </div>
            ))}
          </div>

          {/* Detail */}
          <div className="message-detail admin-card">
            {selected ? (
              <>
                <div className="detail-header">
                  <div>
                    <h3>{selected.name}</h3>
                    <span>{selected.eventType || 'General Enquiry'}</span>
                  </div>
                  <button className="admin-icon-btn delete-btn" onClick={() => del(selected.id)}><FaTrash /></button>
                </div>

                <div className="detail-meta">
                  <div className="meta-item"><FaEnvelope /> {selected.email}</div>
                  {selected.phone && <div className="meta-item"><FaPhone /> {selected.phone}</div>}
                  {selected.eventDate && <div className="meta-item"><FaCalendar /> Event Date: {selected.eventDate}</div>}
                  <div className="meta-item" style={{color:'#444', fontSize:'0.8rem'}}>
                    Received: {new Date(selected.submittedAt).toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="detail-message">
                  <h4>Message:</h4>
                  <p>{selected.message}</p>
                </div>

                <div className="detail-actions">
                  <a href={`mailto:${selected.email}`} className="btn-primary">Reply via Email</a>
                  {selected.phone && (
                    <a href={`tel:${selected.phone}`} className="btn-outline">Call Now</a>
                  )}
                </div>
              </>
            ) : (
              <div className="detail-empty">
                <FaEnvelope />
                <p>Select a message to view details</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

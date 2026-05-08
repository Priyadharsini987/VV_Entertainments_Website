import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import AdminSidebar from '../../components/admin/AdminSidebar'
import { getAuthHeader } from '../../context/AuthContext'
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa'
import './AdminPages.css'

const ICONS = ['🎉', '💍', '🏢', '🎂', '🎭', '🎤', '🥂', '🎊', '🌟', '🎪', '🎨', '🎵']
const blank = { title: '', description: '', icon: '🎉', displayOrder: 0, active: true }

export default function AdminServices() {
  const [services, setServices] = useState([])
  const [editing, setEditing] = useState(null)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState(blank)

  const load = () => axios.get('/api/services/all', { headers: getAuthHeader() })
    .then(r => setServices(r.data)).catch(() => toast.error('Failed to load'))

  useEffect(() => { load() }, [])

  const save = async () => {
    if (!form.title || !form.description) { toast.error('Title and description are required'); return }
    try {
      if (editing) {
        await axios.put(`/api/services/${editing}`, form, { headers: getAuthHeader() })
        toast.success('Service updated!')
      } else {
        await axios.post('/api/services', form, { headers: getAuthHeader() })
        toast.success('Service added!')
      }
      setEditing(null); setAdding(false); setForm(blank); load()
    } catch { toast.error('Failed to save') }
  }

  const del = async (id) => {
    if (!confirm('Delete this service?')) return
    try {
      await axios.delete(`/api/services/${id}`, { headers: getAuthHeader() })
      toast.success('Deleted'); load()
    } catch { toast.error('Failed to delete') }
  }

  const edit = (s) => { setEditing(s.id); setAdding(false); setForm({ title: s.title, description: s.description, icon: s.icon, displayOrder: s.displayOrder, active: s.active }) }
  const cancel = () => { setEditing(null); setAdding(false); setForm(blank) }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        <div className="admin-header">
          <div>
            <h1>Services <span className="gold-text">Management</span></h1>
            <p>Add, edit, or remove the services shown on your website.</p>
          </div>
          <button className="btn-primary" onClick={() => { setAdding(true); setEditing(null); setForm(blank) }}>
            <FaPlus /> Add Service
          </button>
        </div>

        {/* Add/Edit Form */}
        {(adding || editing) && (
          <div className="admin-card form-card">
            <h3>{editing ? 'Edit Service' : 'Add New Service'}</h3>
            <div className="service-form">
              <div className="form-group">
                <label>Icon</label>
                <div className="icon-picker">
                  {ICONS.map(ic => (
                    <button key={ic} className={`icon-opt ${form.icon === ic ? 'selected' : ''}`}
                      onClick={() => setForm({...form, icon: ic})}>{ic}</button>
                  ))}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Service Title *</label>
                  <input type="text" placeholder="e.g. Wedding Events" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Display Order</label>
                  <input type="number" min="0" value={form.displayOrder} onChange={e => setForm({...form, displayOrder: parseInt(e.target.value)})} />
                </div>
              </div>
              <div className="form-group">
                <label>Description *</label>
                <textarea rows={4} placeholder="Describe the service..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select value={form.active} onChange={e => setForm({...form, active: e.target.value === 'true'})}>
                  <option value="true">Active (Visible)</option>
                  <option value="false">Inactive (Hidden)</option>
                </select>
              </div>
              <div className="form-actions">
                <button className="btn-primary" onClick={save}><FaSave /> Save Service</button>
                <button className="btn-outline" onClick={cancel}><FaTimes /> Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Services List */}
        <div className="admin-card">
          <h3>All Services ({services.length})</h3>
          <div className="services-list">
            {services.map(s => (
              <div key={s.id} className={`service-list-item ${!s.active ? 'inactive' : ''}`}>
                <div className="service-list-icon">{s.icon}</div>
                <div className="service-list-content">
                  <h4>{s.title}</h4>
                  <p>{s.description.substring(0, 120)}...</p>
                  <div className="service-list-meta">
                    <span className={`status-badge ${s.active ? 'active' : 'inactive'}`}>
                      {s.active ? 'Active' : 'Hidden'}
                    </span>
                    <span className="order-badge">Order: {s.displayOrder}</span>
                  </div>
                </div>
                <div className="service-list-actions">
                  <button className="admin-icon-btn edit-btn" onClick={() => edit(s)}><FaEdit /></button>
                  <button className="admin-icon-btn delete-btn" onClick={() => del(s.id)}><FaTrash /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

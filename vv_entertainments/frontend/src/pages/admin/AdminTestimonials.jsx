import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import AdminSidebar from '../../components/admin/AdminSidebar'
import { getAuthHeader } from '../../context/AuthContext'
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaStar } from 'react-icons/fa'
import './AdminPages.css'

const blank = { clientName: '', designation: '', company: '', review: '', rating: 5, active: true }

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [editing, setEditing] = useState(null)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState(blank)

  const load = () => axios.get('/api/testimonials/all', { headers: getAuthHeader() })
    .then(r => setTestimonials(r.data)).catch(() => toast.error('Failed to load'))

  useEffect(() => { load() }, [])

  const save = async () => {
    if (!form.clientName || !form.review) { toast.error('Name and review are required'); return }
    try {
      if (editing) {
        await axios.put(`/api/testimonials/${editing}`, form, { headers: getAuthHeader() })
        toast.success('Testimonial updated!')
      } else {
        await axios.post('/api/testimonials', form, { headers: getAuthHeader() })
        toast.success('Testimonial added!')
      }
      setEditing(null); setAdding(false); setForm(blank); load()
    } catch { toast.error('Failed to save') }
  }

  const del = async (id) => {
    if (!confirm('Delete this testimonial?')) return
    try {
      await axios.delete(`/api/testimonials/${id}`, { headers: getAuthHeader() })
      toast.success('Deleted'); load()
    } catch { toast.error('Failed to delete') }
  }

  const edit = (t) => { setEditing(t.id); setAdding(false); setForm({ clientName: t.clientName, designation: t.designation, company: t.company, review: t.review, rating: t.rating, active: t.active }) }
  const cancel = () => { setEditing(null); setAdding(false); setForm(blank) }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        <div className="admin-header">
          <div>
            <h1>Testimonials <span className="gold-text">Management</span></h1>
            <p>Manage client reviews displayed on your website.</p>
          </div>
          <button className="btn-primary" onClick={() => { setAdding(true); setEditing(null); setForm(blank) }}>
            <FaPlus /> Add Testimonial
          </button>
        </div>

        {/* Form */}
        {(adding || editing) && (
          <div className="admin-card form-card">
            <h3>{editing ? 'Edit Testimonial' : 'Add New Testimonial'}</h3>
            <div className="service-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Client Name *</label>
                  <input type="text" placeholder="e.g. Priya Sharma" value={form.clientName} onChange={e => setForm({...form, clientName: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Designation</label>
                  <input type="text" placeholder="e.g. Bride" value={form.designation} onChange={e => setForm({...form, designation: e.target.value})} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Company / Location</label>
                  <input type="text" placeholder="e.g. Coimbatore" value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Rating</label>
                  <div className="rating-picker">
                    {[1,2,3,4,5].map(r => (
                      <button key={r} type="button" className={`star-btn ${r <= form.rating ? 'active' : ''}`}
                        onClick={() => setForm({...form, rating: r})}>
                        <FaStar />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Review *</label>
                <textarea rows={4} placeholder="Client's review..." value={form.review} onChange={e => setForm({...form, review: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select value={form.active} onChange={e => setForm({...form, active: e.target.value === 'true'})}>
                  <option value="true">Active (Visible)</option>
                  <option value="false">Hidden</option>
                </select>
              </div>
              <div className="form-actions">
                <button className="btn-primary" onClick={save}><FaSave /> Save</button>
                <button className="btn-outline" onClick={cancel}><FaTimes /> Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* List */}
        <div className="admin-card">
          <h3>All Testimonials ({testimonials.length})</h3>
          <div className="testimonials-admin-grid">
            {testimonials.map(t => (
              <div key={t.id} className={`testimonial-admin-card ${!t.active ? 'inactive' : ''}`}>
                <div className="testimonial-admin-header">
                  <div className="testimonial-admin-avatar">{t.clientName?.[0]}</div>
                  <div>
                    <h4>{t.clientName}</h4>
                    <span>{t.designation}{t.company ? ` — ${t.company}` : ''}</span>
                  </div>
                  <div className="service-list-actions">
                    <button className="admin-icon-btn edit-btn" onClick={() => edit(t)}><FaEdit /></button>
                    <button className="admin-icon-btn delete-btn" onClick={() => del(t.id)}><FaTrash /></button>
                  </div>
                </div>
                <div className="testimonial-admin-stars">
                  {[...Array(t.rating)].map((_, i) => <FaStar key={i} />)}
                </div>
                <p className="testimonial-admin-review">"{t.review}"</p>
                <div className="testimonial-admin-footer">
                  <span className={`status-badge ${t.active ? 'active' : 'inactive'}`}>
                    {t.active ? 'Visible' : 'Hidden'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import AdminSidebar from '../../components/admin/AdminSidebar'
import { getAuthHeader } from '../../context/AuthContext'
import { FaUpload, FaTrash, FaToggleOn, FaToggleOff, FaPlus } from 'react-icons/fa'
import './AdminPages.css'

export default function AdminGallery() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({ title: '', category: '', description: '' })
  const [selectedFiles, setSelectedFiles] = useState([])
  const [previews, setPreviews] = useState([])
  const fileRef = useRef()

  const categories = ['Wedding', 'Corporate', 'Birthday', 'Cultural', 'Concert', 'Private Party', 'Other']

  const load = () => {
    axios.get('/api/gallery/all', { headers: getAuthHeader() })
      .then(r => setImages(r.data))
      .catch(() => toast.error('Failed to load gallery'))
      .finally(() => setLoading(false))
  }

  const getImageUrl = (url) => {
    if (!url) return ''
    return url.replace(
      'http://localhost:8080',
      import.meta.env.VITE_API_BASE_URL || 'https://vv-entertainments-website-1.onrender.com'
    )
  }

  const isVideo = (url) => {
    if (!url) return false
    return url.match(/\.(mp4|webm|ogg|mov)$/i)
  }

  useEffect(() => { load() }, [])

  const onFileChange = (e) => {
    const files = Array.from(e.target.files)
    setSelectedFiles(files)
    const ps = files.map(f => ({ url: URL.createObjectURL(f), isVid: f.type.startsWith('video/') }))
    setPreviews(ps)
  }

  const upload = async () => {
    if (!selectedFiles.length) { toast.error('Please select at least one image'); return }
    setUploading(true)
    let success = 0
    for (const file of selectedFiles) {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('title', form.title)
      fd.append('category', form.category)
      fd.append('description', form.description)
      try {
        await axios.post('/api/gallery/upload', fd, {
          headers: { ...getAuthHeader(), 'Content-Type': 'multipart/form-data' }
        })
        success++
      } catch { toast.error(`Failed to upload ${file.name}`) }
    }
    if (success > 0) toast.success(`${success} photo(s) uploaded successfully!`)
    setSelectedFiles([])
    setPreviews([])
    setForm({ title: '', category: '', description: '' })
    if (fileRef.current) fileRef.current.value = ''
    load()
    setUploading(false)
  }

  const toggleActive = async (img) => {
    try {
      await axios.put(`/api/gallery/${img.id}`, { ...img, active: !img.active }, { headers: getAuthHeader() })
      toast.success(img.active ? 'Hidden from public' : 'Visible to public')
      load()
    } catch { toast.error('Failed to update') }
  }

  const deleteImg = async (id) => {
    if (!confirm('Delete this image permanently?')) return
    try {
      await axios.delete(`/api/gallery/${id}`, { headers: getAuthHeader() })
      toast.success('Image deleted')
      load()
    } catch { toast.error('Failed to delete') }
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        <div className="admin-header">
          <div>
            <h1>Gallery <span className="gold-text">Management</span></h1>
            <p>Upload and manage event photos for the public gallery.</p>
          </div>
          <div className="header-count">{images.length} photos</div>
        </div>

        {/* Upload Panel */}
        <div className="admin-card upload-panel">
          <h3><FaUpload /> Upload New Photos</h3>
          <div className="upload-form">
            <div
              className="upload-dropzone"
              onClick={() => fileRef.current?.click()}
              onDragOver={e => e.preventDefault()}
              onDrop={e => { e.preventDefault(); const files = Array.from(e.dataTransfer.files); setSelectedFiles(files); setPreviews(files.map(f => URL.createObjectURL(f))) }}
            >
              {previews.length > 0 ? (
                <div className="preview-grid">
                  {previews.map((p, i) => (
                    p.isVid 
                      ? <video key={i} src={p.url} className="preview-img" muted loop autoPlay playsInline />
                      : <img key={i} src={p.url} alt="" className="preview-img" />
                  ))}
                </div>
              ) : (
                <div className="dropzone-placeholder">
                  <FaUpload />
                  <p>Click or drag & drop media here</p>
                  <span>Supports JPG, PNG, WebP, MP4, MOV (max 100MB each)</span>
                </div>
              )}
              <input ref={fileRef} type="file" accept="image/*,video/*" multiple onChange={onFileChange} style={{ display: 'none' }} />
            </div>

            <div className="upload-meta">
              <div className="form-group">
                <label>Title (optional)</label>
                <input type="text" placeholder="e.g. Sharma Wedding" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                  <option value="">Select category</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Description (optional)</label>
                <input type="text" placeholder="Brief description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
              </div>
              <button className="btn-primary upload-btn" onClick={upload} disabled={uploading}>
                {uploading ? 'Uploading...' : <><FaPlus /> Upload {selectedFiles.length > 0 ? `(${selectedFiles.length})` : ''}</>}
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="admin-card">
          <h3>All Photos ({images.length})</h3>
          {loading ? (
            <div className="admin-loading">Loading...</div>
          ) : images.length === 0 ? (
            <div className="admin-empty">No photos uploaded yet. Upload your first photo above!</div>
          ) : (
            <div className="gallery-admin-grid">
              {images.map(img => (
                <div key={img.id} className={`gallery-admin-item ${!img.active ? 'hidden-item' : ''}`}>
                  {isVideo(img.imageUrl)
                    ? <video src={getImageUrl(img.imageUrl)} muted loop autoPlay playsInline />
                    : <img src={getImageUrl(img.imageUrl)} alt={img.title || 'Event'} />}
                  <div className="gallery-admin-overlay">
                    <div className="gallery-admin-info">
                      {img.category && <span className="gallery-cat-badge">{img.category}</span>}
                      {img.title && <p>{img.title}</p>}
                    </div>
                    <div className="gallery-admin-actions">
                      <button
                        className={`admin-icon-btn ${img.active ? 'active-btn' : 'inactive-btn'}`}
                        onClick={() => toggleActive(img)}
                        title={img.active ? 'Hide' : 'Show'}
                      >
                        {img.active ? <FaToggleOn /> : <FaToggleOff />}
                      </button>
                      <button
                        className="admin-icon-btn delete-btn"
                        onClick={() => deleteImg(img.id)}
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  {!img.active && <div className="hidden-badge">Hidden</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

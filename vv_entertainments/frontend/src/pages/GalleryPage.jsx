import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/public/Navbar'
import Footer from '../components/public/Footer'
import './GalleryPage.css'

export default function GalleryPage() {
  const [images, setImages] = useState([])
  const [filtered, setFiltered] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightbox, setLightbox] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/gallery')
      .then(r => {
        setImages(r.data)
        setFiltered(r.data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

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

  const categories = ['All', ...new Set(images.map(i => i.category).filter(Boolean))]

  const filterByCategory = (cat) => {
    setActiveCategory(cat)
    setFiltered(cat === 'All' ? images : images.filter(i => i.category === cat))
  }

  const openLightbox = (img) => setLightbox(img)
  const closeLightbox = () => setLightbox(null)

  const navigate = (dir) => {
    const idx = filtered.indexOf(lightbox)
    const next = (idx + dir + filtered.length) % filtered.length
    setLightbox(filtered[next])
  }

  return (
    <div className="gallery-page">
      <Navbar />

      <div className="page-hero">
        <div className="page-hero-bg" />
        <div className="container">
          <p className="section-eyebrow">Our Portfolio</p>
          <h1 className="section-title">
            Event <span className="gold-text">Gallery</span>
          </h1>
          <div className="section-divider" />
          <p className="section-subtitle">
            Relive the magic of events we've crafted with love and precision.
          </p>
        </div>
      </div>

      <section className="page-section">
        <div className="container">

          {/* Category Filters */}
          <div className="gallery-filters">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => filterByCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="gallery-loading">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="gallery-skeleton" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="gallery-empty">
              <span>📷</span>
              <p>No images in this category yet.</p>
            </div>
          ) : (
            <div className="gallery-masonry">
              {filtered.map((img) => (
                <div
                  key={img.id}
                  className="gallery-item"
                  onClick={() => openLightbox(img)}
                >
                  {isVideo(img.imageUrl)
                    ? <video src={getImageUrl(img.imageUrl)} muted loop autoPlay playsInline />
                    : <img
                        src={getImageUrl(img.imageUrl)}
                        alt={img.title || 'Event'}
                        loading="lazy"
                      />}
                  <div className="gallery-item-overlay">
                    <div className="gallery-item-info">
                      {img.category && (
                        <span className="gallery-category">
                          {img.category}
                        </span>
                      )}

                      {img.title && <h4>{img.title}</h4>}

                      <div className="gallery-zoom">🔍</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={closeLightbox}>
          <button
            className="lightbox-close"
            onClick={closeLightbox}
          >
            ✕
          </button>

          <button
            className="lightbox-nav prev"
            onClick={e => {
              e.stopPropagation()
              navigate(-1)
            }}
          >
            ‹
          </button>

          <div
            className="lightbox-content"
            onClick={e => e.stopPropagation()}
          >
            {isVideo(lightbox.imageUrl)
              ? <video src={getImageUrl(lightbox.imageUrl)} controls autoPlay playsInline style={{ maxWidth: '100%', maxHeight: '80vh', display: 'block', margin: '0 auto', borderRadius: '8px' }} />
              : <img
                  src={getImageUrl(lightbox.imageUrl)}
                  alt={lightbox.title || 'Event'}
                />}
            {(lightbox.title || lightbox.description) && (
              <div className="lightbox-caption">
                {lightbox.title && <h3>{lightbox.title}</h3>}
                {lightbox.description && <p>{lightbox.description}</p>}
                {lightbox.category && (
                  <span className="lightbox-tag">
                    {lightbox.category}
                  </span>
                )}
              </div>
            )}
          </div>

          <button
            className="lightbox-nav next"
            onClick={e => {
              e.stopPropagation()
              navigate(1)
            }}
          >
            ›
          </button>
        </div>
      )}

      <Footer />
    </div>
  )
}
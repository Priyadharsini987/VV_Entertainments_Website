import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/public/Navbar'
import Footer from '../components/public/Footer'
import { FaPlay, FaStar, FaArrowRight, FaCalendarAlt, FaUsers, FaTrophy, FaHeart } from 'react-icons/fa'
import './HomePage.css'

export default function HomePage() {
  const [services, setServices] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [gallery, setGallery] = useState([])
  const [activeTestimonial, setActiveTestimonial] = useState(0)

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

  useEffect(() => {
    axios.get('/api/services').then(r => setServices(r.data)).catch(() => {})
    axios.get('/api/testimonials').then(r => setTestimonials(r.data)).catch(() => {})
    axios.get('/api/gallery').then(r => setGallery(r.data.slice(0, 6))).catch(() => {})
  }, [])

  useEffect(() => {
    if (testimonials.length === 0) return
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 4000)
    return () => clearInterval(t)
  }, [testimonials])

  const stats = [
    { icon: <FaCalendarAlt />, value: '500+', label: 'Events Hosted' },
    { icon: <FaUsers />, value: '50K+', label: 'Happy Guests' },
    { icon: <FaTrophy />, value: '8+', label: 'Years Experience' },
    { icon: <FaHeart />, value: '100%', label: 'Client Satisfaction' },
  ]

  return (
    <div className="home-page">
      <Navbar />

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-overlay" />
          <div className="hero-particles">
            {[...Array(20)].map((_, i) => (
              <span key={i} className="particle" style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }} />
            ))}
          </div>
        </div>

        <div className="hero-content container">

          <h1 className="hero-title">
            Creating <span className="gold-text">Extraordinary</span>
            <br />Moments That Last
            <br />A <span className="gold-text">Lifetime</span>
          </h1>
          <p className="hero-subtitle">
            VV Entertainments — where every event is a masterpiece. From grand weddings
            to corporate summits, we craft unforgettable experiences with passion and precision.
          </p>
          <div className="hero-actions">
            <Link to="/contact" className="btn-primary">
              Plan Your Event <FaArrowRight />
            </Link>
            <Link to="/gallery" className="btn-outline">
              <FaPlay style={{ fontSize: '0.8rem' }} /> View Our Work
            </Link>
          </div>

          <div className="hero-stats">
            {stats.map((s, i) => (
              <div key={i} className="hero-stat">
                <span className="stat-icon">{s.icon}</span>
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-scroll-hint">
          <span />
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="page-section services-section">
        <div className="container">
          <p className="section-eyebrow">What We Do</p>
          <h2 className="section-title">Our <span className="gold-text">Services</span></h2>
          <div className="section-divider" />
          <p className="section-subtitle">
            From intimate celebrations to grand spectacles, we offer end-to-end event management tailored to your vision.
          </p>

          <div className="services-grid">
            {services.slice(0, 6).map(s => (
              <div key={s.id} className="service-card card">
                <div className="service-icon">{s.icon || '🎉'}</div>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <Link to="/services" className="service-link">
                  Learn More <FaArrowRight />
                </Link>
              </div>
            ))}
          </div>

          <div className="section-cta">
            <Link to="/services" className="btn-outline">View All Services <FaArrowRight /></Link>
          </div>
        </div>
      </section>

      {/* ── ABOUT STRIP ── */}
      <section className="about-strip">
        <div className="container about-strip-inner">
          <div className="about-strip-text">
            <p className="section-eyebrow">Who We Are</p>
            <h2>Meet <span className="gold-text">Vijay Vishwa</span> — The Visionary Behind VV Entertainments</h2>
            <p>
              Founded and led by <strong style={{ color: '#c9a84c' }}>Vijay Vishwa</strong>, VV Entertainments has grown from a passionate idea
              into Coimbatore's most trusted event management company. With 8+ years of experience and
              a team of dedicated professionals, we turn every event into a story worth telling.
            </p>
            <p>
              Our commitment is simple — your happiness is our success. Every event we manage gets
              our full heart, creativity, and expertise.
            </p>
            <Link to="/about" className="btn-primary" style={{ marginTop: '1.5rem' }}>
              Our Story <FaArrowRight />
            </Link>
          </div>
          <div className="about-strip-visual">
            <div className="ceo-card">
              <div className="ceo-avatar">VV</div>
              <div className="ceo-info">
                <h3>Vijay Vishwa</h3>
                <span>CEO & Founder</span>
                <div className="ceo-quote">"Every event is a canvas — we paint it with magic."</div>
              </div>
              <div className="ceo-glow" />
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY PREVIEW ── */}
      {gallery.length > 0 && (
        <section className="page-section gallery-preview-section">
          <div className="container">
            <p className="section-eyebrow">Our Work</p>
            <h2 className="section-title">Event <span className="gold-text">Gallery</span></h2>
            <div className="section-divider" />
            <p className="section-subtitle">
              A glimpse into the magical moments we've created for our beloved clients.
            </p>

            <div className="gallery-preview-grid">
              {gallery.map((img, i) => (
                <div key={img.id} className={`gallery-preview-item ${i === 0 ? 'large' : ''}`}>
                  {isVideo(img.imageUrl)
                    ? <video src={getImageUrl(img.imageUrl)} muted loop autoPlay playsInline />
                    : <img src={getImageUrl(img.imageUrl)} alt={img.title || 'Event'} />}
                  <div className="gallery-overlay">
                    <span>{img.category || 'Event'}</span>
                    <h4>{img.title || 'VV Entertainments'}</h4>
                  </div>
                </div>
              ))}
            </div>

            <div className="section-cta">
              <Link to="/gallery" className="btn-primary">
                View Full Gallery <FaArrowRight />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── TESTIMONIALS ── */}
      {testimonials.length > 0 && (
        <section className="page-section testimonials-section">
          <div className="container">
            <p className="section-eyebrow">Client Love</p>
            <h2 className="section-title">What They <span className="gold-text">Say</span></h2>
            <div className="section-divider" />

            <div className="testimonial-carousel">
              <div className="testimonial-card">
                <div className="testimonial-stars">
                  {[...Array(testimonials[activeTestimonial]?.rating || 5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <p className="testimonial-review">"{testimonials[activeTestimonial]?.review}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    {testimonials[activeTestimonial]?.clientName?.[0]}
                  </div>
                  <div>
                    <strong>{testimonials[activeTestimonial]?.clientName}</strong>
                    <span>{testimonials[activeTestimonial]?.designation} {testimonials[activeTestimonial]?.company ? `— ${testimonials[activeTestimonial].company}` : ''}</span>
                  </div>
                </div>
              </div>

              <div className="testimonial-dots">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    className={`dot ${i === activeTestimonial ? 'active' : ''}`}
                    onClick={() => setActiveTestimonial(i)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA BANNER ── */}
      <section className="cta-banner">
        <div className="cta-banner-glow" />
        <div className="container cta-banner-inner">
          <h2>Ready to Create Something <span className="gold-text">Extraordinary?</span></h2>
          <p>Let's bring your dream event to life. Get in touch with us today.</p>
          <Link to="/contact" className="btn-primary" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
            Get a Free Quote <FaArrowRight />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}

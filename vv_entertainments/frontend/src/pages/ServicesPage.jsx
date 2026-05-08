import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import Navbar from '../components/public/Navbar'
import Footer from '../components/public/Footer'
import './ServicesPage.css'

export default function ServicesPage() {
  const [services, setServices] = useState([])

  useEffect(() => {
    axios.get('/api/services').then(r => setServices(r.data)).catch(() => {})
  }, [])

  return (
    <div className="services-page">
      <Navbar />

      <div className="page-hero">
        <div className="page-hero-bg" />
        <div className="container">
          <p className="section-eyebrow">What We Offer</p>
          <h1 className="section-title">Our <span className="gold-text">Services</span></h1>
          <div className="section-divider" />
          <p className="section-subtitle">
            End-to-end event management solutions crafted with expertise, creativity, and passion.
          </p>
        </div>
      </div>

      <section className="page-section">
        <div className="container">
          <div className="services-full-grid">
            {services.map((s, i) => (
              <div key={s.id} className="service-full-card card">
                <div className="service-full-icon">{s.icon || '🎉'}</div>
                <div className="service-full-content">
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                </div>
                <div className="service-full-num">{String(i + 1).padStart(2, '0')}</div>
              </div>
            ))}
          </div>

          <div className="services-cta-block">
            <h2>Ready to Plan Your <span className="gold-text">Perfect Event?</span></h2>
            <p>Get in touch with us and let's make your vision a reality.</p>
            <Link to="/contact" className="btn-primary">
              Contact Us <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

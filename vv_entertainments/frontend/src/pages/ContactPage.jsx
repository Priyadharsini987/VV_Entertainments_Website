import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaPaperPlane } from 'react-icons/fa'
import Navbar from '../components/public/Navbar'
import Footer from '../components/public/Footer'
import './ContactPage.css'

export default function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', eventType:'', eventDate:'', message:'' })
  const [loading, setLoading] = useState(false)

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields')
      return
    }
    setLoading(true)
    try {
      await axios.post('/api/contact', form)
      toast.success('Message sent! We\'ll get back to you soon. 🎉')
      setForm({ name:'', email:'', phone:'', eventType:'', eventDate:'', message:'' })
    } catch {
      toast.error('Failed to send message. Please try again.')
    }
    setLoading(false)
  }

  const eventTypes = ['Wedding', 'Corporate Event', 'Birthday Party', 'Cultural Event', 'Concert / Show', 'Private Party', 'Other']

  return (
    <div className="contact-page">
      <Navbar />

      <div className="page-hero">
        <div className="page-hero-bg" />
        <div className="container">
          <p className="section-eyebrow">Let's Talk</p>
          <h1 className="section-title">Get In <span className="gold-text">Touch</span></h1>
          <div className="section-divider" />
          <p className="section-subtitle">
            Ready to plan your dream event? Reach out to us and we'll make it happen.
          </p>
        </div>
      </div>

      <section className="page-section">
        <div className="container">
          <div className="contact-grid">
            {/* Info */}
            <div className="contact-info">
              <h2>Let's Create <span className="gold-text">Something Amazing</span></h2>
              <p>Fill out the form and our team will contact you within 24 hours to discuss your event requirements.</p>

              <div className="contact-info-cards">
                <div className="contact-info-card">
                  <div className="contact-info-icon"><FaPhone /></div>
                  <div>
                    <h4>Call Us</h4>
                    <p>+91 93842 72666</p>
                  </div>
                </div>
                <div className="contact-info-card">
                  <div className="contact-info-icon"><FaWhatsapp /></div>
                  <div>
                    <h4>WhatsApp</h4>
                    <p>+91 93842 72666</p>
                  </div>
                </div>
                <div className="contact-info-card">
                  <div className="contact-info-icon"><FaEnvelope /></div>
                  <div>
                    <h4>Email</h4>
                    <p>info@vventertainments.in</p>
                  </div>
                </div>
                <div className="contact-info-card">
                  <div className="contact-info-icon"><FaMapMarkerAlt /></div>
                  <div>
                    <h4>Location</h4>
                    <p>Madurai, Tamil Nadu</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form className="contact-form card" onSubmit={submit}>
              <h3>Send Us a Message</h3>

              <div className="form-row">
                <div className="form-group">
                  <label>Your Name *</label>
                  <input type="text" name="name" value={form.name} onChange={handle} placeholder="eg. PriyaArjun" required />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input type="email" name="email" value={form.email} onChange={handle} placeholder="your@email.com" required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handle} placeholder="+91 XXXXX XXXXX" />
                </div>
                <div className="form-group">
                  <label>Event Type</label>
                  <select name="eventType" value={form.eventType} onChange={handle}>
                    <option value="">Select event type</option>
                    {eventTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Event Date</label>
                <input type="date" name="eventDate" value={form.eventDate} onChange={handle} />
              </div>

              <div className="form-group">
                <label>Message *</label>
                <textarea name="message" value={form.message} onChange={handle} rows={5} placeholder="Tell us about your event — venue, guest count, theme, special requirements..." required />
              </div>

              <button type="submit" className="btn-primary submit-btn" disabled={loading}>
                {loading ? 'Sending...' : <><FaPaperPlane /> Send Message</>}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

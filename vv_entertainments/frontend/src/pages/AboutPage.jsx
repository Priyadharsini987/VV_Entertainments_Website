import { Link } from 'react-router-dom'
import { FaArrowRight, FaTrophy, FaHandshake, FaLightbulb, FaHeart } from 'react-icons/fa'
import Navbar from '../components/public/Navbar'
import Footer from '../components/public/Footer'
import './AboutPage.css'

export default function AboutPage() {
  const values = [
    { icon: <FaHeart />, title: 'Passion', desc: 'Every event is handled with genuine passion and love for creating perfect moments.' },
    { icon: <FaTrophy />, title: 'Excellence', desc: 'We set the highest standards in event management, delivering nothing less than perfection.' },
    { icon: <FaHandshake />, title: 'Trust', desc: 'Built on a foundation of trust and transparency with every client we serve.' },
    { icon: <FaLightbulb />, title: 'Creativity', desc: 'Unique, creative concepts tailored specifically to each client\'s vision and personality.' },
  ]

  return (
    <div className="about-page">
      <Navbar />

      <div className="page-hero">
        <div className="page-hero-bg" />
        <div className="container">
          <p className="section-eyebrow">Our Story</p>
          <h1 className="section-title">About <span className="gold-text">VV Entertainments</span></h1>
          <div className="section-divider" />
          <p className="section-subtitle">
            A journey of passion, creativity, and unforgettable moments.
          </p>
        </div>
      </div>

      {/* CEO Section */}
      <section className="page-section">
        <div className="container">
          <div className="about-ceo-section">
            <div className="about-ceo-visual">
              <div className="ceo-big-card">
                <div className="ceo-big-avatar">VV</div>
                <div className="ceo-big-glow" />
                <div className="ceo-badge">CEO & Founder</div>
              </div>
            </div>
            <div className="about-ceo-text">
              <p className="section-eyebrow" style={{textAlign:'left'}}>Leadership</p>
              <h2>Meet <span className="gold-text">Vijay Vishwa</span></h2>
              <div className="section-divider" style={{margin:'1rem 0 1.5rem'}} />
              <p>
                Vijay Vishwa founded VV Entertainments with a singular vision — to transform every event into a timeless memory. With over 8 years in the event management industry, Vijay Vishwa has led a team that has successfully executed 500+ events ranging from intimate wedding ceremonies to large-scale corporate conferences.
              </p>
              <p>
                His attention to detail, creative direction, and unwavering commitment to client satisfaction have made VV Entertainments the most sought-after event management company in Coimbatore and beyond.
              </p>
              <p>
                "For me, every event is personal. When clients trust us with their most important moments, we treat that responsibility with the utmost dedication." — <em style={{color:'#c9a84c'}}>Vijay Vishwa, CEO</em>
              </p>
              <Link to="/contact" className="btn-primary" style={{marginTop:'1.5rem', display:'inline-flex'}}>
                Work With Us <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats-section">
        <div className="container">
          <div className="about-stats-grid">
            {[
              { value: '500+', label: 'Events Hosted' },
              { value: '8+', label: 'Years Experience' },
              { value: '50K+', label: 'Happy Guests' },
              { value: '100%', label: 'Client Satisfaction' },
            ].map((s, i) => (
              <div key={i} className="about-stat-card">
                <div className="about-stat-value">{s.value}</div>
                <div className="about-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="page-section">
        <div className="container">
          <p className="section-eyebrow">What Drives Us</p>
          <h2 className="section-title">Our Core <span className="gold-text">Values</span></h2>
          <div className="section-divider" />
          <div className="values-grid">
            {values.map((v, i) => (
              <div key={i} className="value-card card">
                <div className="value-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

import { Link } from 'react-router-dom'
import { FaInstagram, FaFacebook, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/logo.jpg" alt="VV Logo" className="logo-image" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', marginRight: '10px' }} />
              <div>
                <div className="footer-logo-main">VV</div>
                <div className="footer-logo-sub">ENTERTAINMENTS</div>
              </div>
            </div>
            <p className="footer-desc">
              Transforming your dreams into extraordinary memories. Premium event management since 2015, crafting unforgettable moments across Tamil Nadu.
            </p>
            <div className="footer-socials">
              <a href="https://instagram.com/vv_entertainments_" target="_blank" rel="noreferrer" className="social-btn"><FaInstagram /></a>
              <a href="https://wa.me/919384272666" target="_blank" rel="noreferrer" className="social-btn whatsapp"><FaWhatsapp /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Our Services</h4>
            <ul>
              <li><Link to="/services">Wedding Events</Link></li>
              <li><Link to="/services">Corporate Events</Link></li>
              <li><Link to="/services">Birthday Parties</Link></li>
              <li><Link to="/services">Cultural Events</Link></li>
              <li><Link to="/services">Concerts & Shows</Link></li>
              <li><Link to="/services">Private Parties</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact Us</h4>
            <div className="footer-contact">
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <span>Madurai, Tamil Nadu, India</span>
              </div>
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <span>+91 93842 72666</span>
              </div>
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <span>info@vventertainments.in</span>
              </div>
              <div className="contact-item">
                <FaInstagram className="contact-icon" />
                <span>@vv_entertainments_</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} VV Entertainments. All Rights Reserved.</p>
          <p>Crafted with ❤️ for extraordinary events</p>
        </div>
      </div>
    </footer>
  )
}

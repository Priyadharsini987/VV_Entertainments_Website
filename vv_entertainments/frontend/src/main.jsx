import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import App from './App.jsx'
import './index.css'

// Set backend base URL from environment variable.
// In production, add VITE_API_BASE_URL to your Vercel project's Environment Variables.
// In local dev, create frontend/.env.local with:
//   VITE_API_BASE_URL=http://localhost:8080
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || 'https://vv-entertainments-website-1.onrender.com'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
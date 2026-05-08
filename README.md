# 🦅 Eagle Entertainment — Full Stack Web Application

A professional event management website for **Eagle Entertainment**, built with React + Spring Boot.

---

## 🏗️ Tech Stack

| Layer    | Technology                              |
|----------|-----------------------------------------|
| Frontend | React 18, Vite, React Router, Axios     |
| Backend  | Spring Boot 3.2, Spring Security, JWT  |
| Database | H2 (file-based, auto-created)           |
| Auth     | JWT Token-based Admin Authentication   |

---

## 🔐 Admin Credentials

| Field    | Value                   |
|----------|-------------------------|
| Username | `arjun`                 |
| Password | `ArjunPriya1718@Eagle`  |
| URL      | `http://localhost:3000/admin/login` |

---

## 🚀 How to Run

### Prerequisites
- Java 17+
- Node.js 18+
- Maven 3.8+

---

### Step 1 — Start the Backend

```bash
cd backend
mvn spring-boot:run
```

The backend starts at **http://localhost:8080**

- H2 database is auto-created at `./eagledb`
- Uploaded images are stored in `./uploads/`
- Default services and testimonials are seeded automatically

---

### Step 2 — Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend starts at **http://localhost:3000**

---

## 🌐 Public Pages

| Page      | URL                          |
|-----------|------------------------------|
| Home      | `http://localhost:3000/`     |
| About     | `http://localhost:3000/about`    |
| Services  | `http://localhost:3000/services` |
| Gallery   | `http://localhost:3000/gallery`  |
| Contact   | `http://localhost:3000/contact`  |

---

## 🔧 Admin Panel

| Page         | URL                                     |
|--------------|-----------------------------------------|
| Login        | `http://localhost:3000/admin/login`     |
| Dashboard    | `http://localhost:3000/admin`           |
| Gallery Mgmt | `http://localhost:3000/admin/gallery`   |
| Services     | `http://localhost:3000/admin/services`  |
| Messages     | `http://localhost:3000/admin/messages`  |
| Testimonials | `http://localhost:3000/admin/testimonials` |

---

## ✨ Features

### Public Website
- ✅ Hero section with animated particles
- ✅ Services showcase (loaded from DB)
- ✅ Event Gallery with category filter & lightbox
- ✅ About page with CEO (Arjun) profile
- ✅ Contact form (saved to DB)
- ✅ Testimonials carousel
- ✅ Fully responsive (mobile + desktop)

### Admin Panel
- ✅ JWT-secured login (Arjun only)
- ✅ Dashboard with stats
- ✅ Gallery: upload multiple photos, set category/title, show/hide, delete
- ✅ Services: add, edit, reorder, toggle visibility
- ✅ Messages: inbox with unread indicator, reply via email/phone
- ✅ Testimonials: add, edit, star rating, toggle visibility

---

## 📁 Project Structure

```
eagle-entertainment/
├── backend/                   # Spring Boot
│   ├── src/main/java/com/eagle/entertainment/
│   │   ├── controller/        # REST endpoints
│   │   ├── model/             # JPA entities
│   │   ├── repository/        # Data repos
│   │   ├── security/          # JWT auth
│   │   └── config/            # CORS, security, init
│   └── src/main/resources/
│       └── application.properties
│
└── frontend/                  # React + Vite
    └── src/
        ├── pages/             # Public + Admin pages
        ├── components/        # Navbar, Footer, AdminSidebar
        └── context/           # Auth context
```

---

## 🎨 Theme

- **Background:** `#0a0a0a` (Deep black)
- **Accent:** `#c9a84c` (Premium gold)
- **Font (headings):** Playfair Display
- **Font (body):** Inter

---

## 🔄 Production Build

```bash
# Build frontend
cd frontend
npm run build

# The dist/ folder can be served via Nginx or copied into Spring Boot's static resources
```

---

Built with ❤️ for Eagle Entertainment — *Turning dreams into extraordinary memories.*

# VV Entertainments — Setup Guide

## Credentials
- **Username:** `vv_entertainments`
- **Password:** `vv_entertainments@1718`

---

## 🖥️ Local Development

### Step 1 — Start the Backend (Spring Boot)
```bash
cd backend
./mvnw spring-boot:run
```
Backend runs at: **http://localhost:8080**

> First run takes ~2 min to download dependencies.

### Step 2 — Start the Frontend (Vite + React)
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at: **http://localhost:3000**

### Step 3 — Open the App
- Public site: http://localhost:3000
- Admin login: http://localhost:3000/admin/login
- Use the credentials above

> The `.env.local` file is already included. No manual env setup needed for local dev.

---

## 🚀 Production Deployment

### Backend → Render

1. Push the `backend/` folder to a GitHub repo (or the whole project)
2. Create a new **Web Service** on [render.com](https://render.com)
3. Set these settings:
   - **Build Command:** `./mvnw clean package -DskipTests`
   - **Start Command:** `java -jar target/*.jar`
4. Add this **Environment Variable** in Render dashboard:
   ```
   APP_BASE_URL = https://your-render-app-name.onrender.com
   ```
   (Replace with your actual Render URL — found in the Render dashboard)

### Frontend → Vercel

1. Push the `frontend/` folder to GitHub
2. Import the project on [vercel.com](https://vercel.com)
3. Add this **Environment Variable** in Vercel dashboard:
   ```
   VITE_API_BASE_URL = https://your-render-app-name.onrender.com
   ```
4. Deploy — Vercel auto-detects Vite

---

## ⚠️ Important Notes

### Render Free Tier Cold Starts
Render free tier **spins down after 15 min of inactivity**. First request after sleep takes 30–60 seconds. If login seems slow, just wait — it will work.

To avoid this, upgrade to Render Starter ($7/mo) or use a free uptime monitor like [UptimeRobot](https://uptimerobot.com) to ping your backend every 10 min.

### Gallery Images in Production
Images are stored on Render's local disk. They **will be wiped on each redeploy** on free tier (ephemeral filesystem). For permanent storage, upgrade to Render's Persistent Disk or migrate to Cloudinary.

---

## 🐛 Bugs Fixed in This Version

| # | Bug | Fix |
|---|-----|-----|
| 1 | Admin login always said "Invalid credentials" locally | `AuthContext` was hardcoded to hit production Render URL. Fixed to use `''` (empty) so Vite proxy routes to `localhost:8080` |
| 2 | All admin pages hit a different server than login | All admin pages now use the shared `api` axios instance from `AuthContext` instead of raw `axios` |
| 3 | Auth token had to be manually attached to every request | Added axios request interceptor — token is now attached automatically |
| 4 | Gallery image URLs stored as `localhost:8080/uploads/...` in production | `app.base-url` now reads from `APP_BASE_URL` env var on Render |
| 5 | H2 database console exposed publicly | Disabled `spring.h2.console.enabled` in production config |

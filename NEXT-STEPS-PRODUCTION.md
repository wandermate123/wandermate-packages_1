# Production Next Steps

Your app is **deployed and running** (wandermate-packages-1.vercel.app). Use this list to harden it for production.

---

## ✅ Already Done

- Database (Supabase) connected
- Env vars (DATABASE_URL, JWT_SECRET, etc.) in Vercel
- Build fixes (relative imports, tailwind/typescript in dependencies)
- Placeholder/stock images
- Skeleton loaders and performance tweaks
- Security headers in `next.config.js`
- Input validation (Zod), Prisma
- Health check: `/api/health`

---

## 1. Verify Production (Do First)

- [ ] **Env vars in Vercel**  
  Project → Settings → Environment Variables  
  Ensure: `DATABASE_URL`, `JWT_SECRET`, `NEXT_PUBLIC_APP_URL` (your live URL) for **Production** (and Preview if you use it).

- [ ] **Live checks**  
  - Open: `https://wandermate-packages-1.vercel.app/api/health`  
    - Expect: `"db": { "status": "connected" }`  
  - Open: `https://wandermate-packages-1.vercel.app/packages`  
    - Expect: Packages list loads (no 500).

- [ ] **Seed data (if empty)**  
  If packages list is empty, run seed against production DB once (from your machine with production `DATABASE_URL` in `.env`):  
  `npm run db:seed`  
  (Use a separate `.env.production` or override only for this run.)

---

## 2. Security (Recommended)

- [ ] **Protect write APIs**  
  POST/PUT/DELETE on `/api/packages`, `/api/bookings`, `/api/payments` currently have no auth.  
  - Either: Add a simple API key or JWT check for “admin” calls.  
  - Or: Keep as-is for now and restrict later (e.g. when you add an admin UI).

- [ ] **Strong JWT secret**  
  Ensure `JWT_SECRET` in Vercel is long and random (e.g. 32+ chars).  
  Generate: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`

---

## 3. Monitoring & Reliability (Optional)

- [ ] **Vercel Analytics**  
  In Vercel: Project → Analytics → enable (if you want traffic/Web Vitals).

- [ ] **Error tracking**  
  e.g. Sentry: add `@sentry/nextjs`, set `SENTRY_DSN` in Vercel.

- [ ] **Uptime check**  
  Use a free uptime checker (e.g. UptimeRobot) for your production URL.

---

## 4. Go-Live Polish (Optional)

- [ ] **Custom domain**  
  Vercel → Project → Settings → Domains → add your domain.

- [ ] **Reduce console noise**  
  Strip or guard `console.log` in API routes for production (e.g. only log when `NODE_ENV === 'development'`).

- [ ] **Backups**  
  Supabase has point-in-time recovery; confirm it’s enabled for your project if you rely on it.

---

## Quick Order of Operations

1. **Today:** Verify env vars and hit `/api/health` + `/packages` on the live URL. Seed DB if needed.
2. **This week:** Decide on protecting write APIs and set a strong JWT secret.
3. **When ready:** Add analytics/error tracking, then custom domain and backups.

For detailed env and deployment steps, see **ADD-ENV-VARIABLES.md** and **PRODUCTION-READY.md**.

# 🚀 Production Readiness Guide

## ✅ Pre-Deployment Checklist

### 1. Database & Migrations
- [x] Database connection working
- [x] Schema defined in Prisma
- [ ] **Create initial migration** (instead of db:push)
- [ ] Set up production database
- [ ] Configure connection pooling
- [ ] Set up automated backups

### 2. Environment Variables
- [x] `.env.example` created
- [ ] **Generate strong JWT secret**
- [ ] Set up production environment variables
- [ ] Remove console.logs from production code
- [ ] Validate all required env vars at startup

### 3. Security
- [x] Input validation (Zod)
- [x] SQL injection prevention (Prisma)
- [ ] **Add rate limiting**
- [ ] **Add CORS configuration**
- [ ] **Add security headers**
- [ ] **Hash admin password** (bcrypt)
- [ ] **Add authentication middleware** for admin routes
- [ ] Remove sensitive data from error messages

### 4. Performance
- [x] Database indexing
- [x] Pagination implemented
- [ ] **Add image optimization**
- [ ] **Add caching strategy**
- [ ] **Optimize bundle size**
- [ ] **Add compression**

### 5. Monitoring & Logging
- [ ] **Set up error tracking** (Sentry)
- [ ] **Add analytics** (Google Analytics/Vercel Analytics)
- [ ] **Set up uptime monitoring**
- [ ] **Configure logging** (structured logs)

### 6. Build & Deployment
- [x] Next.js configured
- [ ] **Create Vercel configuration**
- [ ] **Set up CI/CD pipeline**
- [ ] **Test production build locally**
- [ ] **Configure build optimizations**

### 7. Testing
- [x] Manual testing complete
- [ ] **Add API endpoint tests**
- [ ] **Test error scenarios**
- [ ] **Load testing** (optional)

---

## 🔧 Step-by-Step Production Setup

### Step 1: Create Production Migration

```bash
# Create initial migration
npx prisma migrate dev --name init

# This creates a migration file instead of using db:push
# Migrations are version-controlled and production-safe
```

### Step 2: Generate Strong Secrets

```bash
# Generate JWT secret (32+ characters)
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Step 3: Set Up Production Database

1. **Create new Supabase project** (or use existing)
2. **Copy production connection string**
3. **Update `.env.production`**:
   ```env
   DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres?sslmode=require"
   ```

### Step 4: Configure Environment Variables

Create `.env.production` with:
```env
# Database
DATABASE_URL="your_production_database_url"

# App
NEXT_PUBLIC_APP_URL="https://your-domain.com"
NODE_ENV="production"

# Security
JWT_SECRET="your-generated-strong-secret-here"

# Payment (if needed)
RAZORPAY_KEY_ID=""
RAZORPAY_KEY_SECRET=""

# Email (if needed)
RESEND_API_KEY=""
EMAIL_FROM="noreply@yourdomain.com"

# Admin
ADMIN_EMAIL="admin@yourdomain.com"
ADMIN_PASSWORD="secure-hashed-password"
```

### Step 5: Deploy to Vercel

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Production ready"
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to https://vercel.com
   - Import GitHub repository
   - Add all environment variables
   - Set build command: `npm run build`
   - Deploy!

3. **Run migrations**:
   ```bash
   # After first deploy, run migrations
   DATABASE_URL="your_prod_url" npx prisma migrate deploy
   DATABASE_URL="your_prod_url" npm run db:seed
   ```

---

## 🔐 Security Improvements Needed

### 1. Rate Limiting
Add rate limiting to prevent abuse:
```bash
npm install @upstash/ratelimit @upstash/redis
```

### 2. Security Headers
Add to `next.config.js`:
```js
headers: async () => [
  {
    source: '/:path*',
    headers: [
      { key: 'X-DNS-Prefetch-Control', value: 'on' },
      { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-XSS-Protection', value: '1; mode=block' },
    ],
  },
]
```

### 3. Hash Admin Password
Update seed script to hash password:
```typescript
import bcrypt from 'bcryptjs';
const hashedPassword = await bcrypt.hash(adminPassword, 10);
```

---

## 📊 Monitoring Setup

### 1. Error Tracking (Sentry)
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

### 2. Analytics
- **Vercel Analytics**: Built-in, enable in dashboard
- **Google Analytics**: Add to `_app.tsx` or `layout.tsx`

### 3. Uptime Monitoring
- **Uptime Robot**: Free tier available
- Monitor: `https://your-domain.com/api/health`

---

## 🚀 Quick Deploy Commands

```bash
# 1. Test production build locally
npm run build
npm run start

# 2. Create migration
npx prisma migrate dev --name production_init

# 3. Deploy to Vercel (after GitHub push)
vercel --prod

# 4. Run migrations on production
vercel env pull .env.production
npx prisma migrate deploy
```

---

## 📝 Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test API endpoints
- [ ] Test booking form submission
- [ ] Verify database connection
- [ ] Check error tracking is working
- [ ] Verify analytics is tracking
- [ ] Test on mobile devices
- [ ] Check page load speeds
- [ ] Verify SSL certificate
- [ ] Set up domain (if custom)

---

## 🆘 Troubleshooting Production Issues

### Database Connection
- Verify `DATABASE_URL` is correct
- Check database allows connections from Vercel IPs
- Ensure SSL is enabled (`?sslmode=require`)

### Build Failures
- Check all environment variables are set
- Verify Prisma Client is generated
- Check build logs in Vercel dashboard

### API Errors
- Check Vercel function logs
- Verify database is accessible
- Check environment variables

---

**Ready to deploy?** Follow the steps above! 🎉

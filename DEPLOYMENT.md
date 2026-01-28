# Deployment Guide - Wandermate Packages

## 🚀 Production Deployment Steps

### Prerequisites
- PostgreSQL database (local or cloud)
- GitHub account (for Vercel deployment)
- Domain name (optional)

### Step 1: Set Up Production Database

#### Option A: Supabase (Recommended - Free Tier)
1. Go to https://supabase.com
2. Create a new project
3. Copy the connection string from Settings > Database
4. Format: `postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres`

#### Option B: Railway (Free Tier)
1. Go to https://railway.app
2. Create new project > Add PostgreSQL
3. Copy connection string from Variables tab

#### Option C: Neon (Free Tier)
1. Go to https://neon.tech
2. Create project
3. Copy connection string

### Step 2: Prepare Environment Variables

Create `.env.production` with:

```env
# Database
DATABASE_URL="your_production_database_url"

# App URL
NEXT_PUBLIC_APP_URL="https://your-domain.com"

# JWT Secret (generate: openssl rand -base64 32)
JWT_SECRET="your-production-jwt-secret"

# Payment Gateway
RAZORPAY_KEY_ID="your_razorpay_key"
RAZORPAY_KEY_SECRET="your_razorpay_secret"

# Email Service
RESEND_API_KEY="your_resend_api_key"
EMAIL_FROM="noreply@yourdomain.com"

# Admin
ADMIN_EMAIL="admin@yourdomain.com"
ADMIN_PASSWORD="secure-password"
```

### Step 3: Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to https://vercel.com
   - Import your GitHub repository
   - Add all environment variables from `.env.production`
   - Deploy!

3. **Run Database Migrations**
   ```bash
   # In Vercel dashboard, add build command:
   npm run db:generate && npm run build
   
   # Or run migrations manually after first deploy:
   npx prisma db push --skip-generate
   npx prisma db seed
   ```

### Step 4: Initialize Database

After deployment, initialize the database:

```bash
# Connect to your production database
DATABASE_URL="your_production_url" npx prisma db push
DATABASE_URL="your_production_url" npx prisma db seed
```

Or use Prisma Studio:
```bash
DATABASE_URL="your_production_url" npx prisma studio
```

### Step 5: Verify Deployment

1. Visit your deployed URL
2. Check `/api/packages` endpoint
3. Test booking submission
4. Verify database connection

## 🔧 Post-Deployment Checklist

- [ ] Database migrations completed
- [ ] Environment variables configured
- [ ] API endpoints responding
- [ ] Booking form working
- [ ] Database seeded with packages
- [ ] SSL certificate active
- [ ] Domain configured (if using custom domain)
- [ ] Error monitoring set up (Sentry)
- [ ] Analytics configured (Google Analytics)

## 📊 Monitoring

### Recommended Tools:
- **Vercel Analytics** - Built-in performance monitoring
- **Sentry** - Error tracking
- **Google Analytics** - User analytics
- **Uptime Robot** - Uptime monitoring

## 🔄 Updates & Maintenance

### Update Packages:
1. Update data in database via Prisma Studio or API
2. Or use admin panel (when implemented)

### Database Backups:
- Set up automated backups in your database provider
- Or use Prisma migrations for schema changes

## 🆘 Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Check database allows connections from Vercel IPs
- Ensure SSL is enabled if required

### Build Failures
- Check all environment variables are set
- Verify Prisma Client is generated: `npm run db:generate`
- Check build logs in Vercel dashboard

### API Errors
- Check Vercel function logs
- Verify database is accessible
- Check environment variables

---

**Ready for Production!** 🎉

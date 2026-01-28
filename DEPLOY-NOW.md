# 🚀 Quick Deploy Guide - Deploy in 10 Minutes

## Prerequisites
- ✅ GitHub account
- ✅ Vercel account (free)
- ✅ Supabase account (free)

---

## Step 1: Prepare Your Code (2 min)

### 1.1 Create Initial Migration

**If you used `db:push` earlier (like we did):**
```bash
# Baseline the migration (keeps your data)
# Migration file already created at prisma/migrations/0_init/migration.sql
npx prisma migrate resolve --applied 0_init
```

**If starting fresh:**
```bash
# Create migration from scratch
npx prisma migrate dev --name init
```

### 1.2 Generate Strong JWT Secret
```bash
# Windows PowerShell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Copy the output - you'll need it!
```

### 1.3 Commit to Git
```bash
git init
git add .
git commit -m "Production ready"
```

---

## Step 2: Push to GitHub (2 min)

### 2.1 Create GitHub Repository
1. Go to https://github.com/new
2. Name it: `wandermate-packages`
3. Click "Create repository"

### 2.2 Push Your Code
```bash
git remote add origin https://github.com/YOUR_USERNAME/wandermate-packages.git
git branch -M main
git push -u origin main
```

---

## Step 3: Set Up Production Database (3 min)

### 3.1 Create Supabase Project
1. Go to https://supabase.com
2. Click "New Project"
3. Fill in:
   - Name: `wandermate-prod`
   - Database Password: (save this!)
   - Region: Choose closest
4. Wait 2-3 minutes for setup

### 3.2 Get Connection String
1. Go to **Settings** → **Database**
2. Copy **Connection string** (URI format)
3. Format: `postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres?sslmode=require`

---

## Step 4: Deploy to Vercel (3 min)

### 4.1 Import Project
1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Click "Import"

### 4.2 Configure Environment Variables
Add these in Vercel dashboard:

**Required:**
```
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres?sslmode=require
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
JWT_SECRET=[paste-your-generated-secret-here]
NODE_ENV=production
```

**Optional (add later if needed):**
```
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RESEND_API_KEY=
EMAIL_FROM=noreply@wandermate.com
ADMIN_EMAIL=admin@wandermate.com
ADMIN_PASSWORD=[your-secure-password]
```

### 4.3 Deploy!
1. Click "Deploy"
2. Wait 2-3 minutes
3. Your site is live! 🎉

---

## Step 5: Initialize Database (2 min)

### 5.1 Run Migrations
After deployment, run:
```bash
# Get your production DATABASE_URL from Vercel
# Then run:
DATABASE_URL="your_prod_url" npx prisma migrate deploy
DATABASE_URL="your_prod_url" npm run db:seed
```

**Or use Vercel CLI:**
```bash
npm install -g vercel
vercel env pull .env.production
npx prisma migrate deploy
npm run db:seed
```

---

## ✅ Verify Deployment

1. **Visit your site**: `https://your-project.vercel.app`
2. **Check packages**: `https://your-project.vercel.app/packages`
3. **Test API**: `https://your-project.vercel.app/api/health`
4. **Test booking**: Submit a test booking

---

## 🔧 Post-Deployment

### Add Custom Domain (Optional)
1. Go to Vercel Dashboard → Settings → Domains
2. Add your domain
3. Follow DNS instructions

### Set Up Monitoring
1. **Vercel Analytics**: Enable in dashboard
2. **Error Tracking**: Add Sentry (optional)
3. **Uptime**: Set up Uptime Robot

---

## 🆘 Troubleshooting

### Database Connection Error
- Verify `DATABASE_URL` is correct in Vercel
- Check Supabase allows connections (Settings → Database → Connection Pooling)

### Build Fails
- Check Vercel build logs
- Ensure `DATABASE_URL` is set
- Run `npm run build` locally first

### Packages Not Showing
- Run `npm run db:seed` on production database
- Check database with Prisma Studio

---

**That's it! Your app is live! 🚀**

Need help? Check `PRODUCTION-READY.md` for detailed guide.

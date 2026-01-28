# 🔧 Fix 500 Error - Step by Step Guide

## What's Causing the 500 Error?

The 500 error means your API is failing. Most likely causes:
1. **Missing Environment Variables** (DATABASE_URL, JWT_SECRET, etc.)
2. **Database Not Connected** (connection string wrong or database not accessible)
3. **Database Not Initialized** (tables don't exist yet)

---

## ✅ Solution: Add Environment Variables & Initialize Database

### Step 1: Add Environment Variables in Vercel

Go to: **Vercel Dashboard → Your Project → Settings → Environment Variables**

Add these **one by one**:

#### 1. DATABASE_URL
```
Name: DATABASE_URL
Value: postgresql://postgres:Seema9889%40%40@db.iyesmohdbhuxhdeodxny.supabase.co:5432/postgres?sslmode=require
Environments: ✅ Production ✅ Preview
```

#### 2. JWT_SECRET
```
Name: JWT_SECRET
Value: wNlG0oaVPu2QY+okmg5X4ntPQxn573IJq2OJmGdBkhA=
Environments: ✅ Production ✅ Preview
```

#### 3. NEXT_PUBLIC_APP_URL
```
Name: NEXT_PUBLIC_APP_URL
Value: https://wandermate-packages-[YOUR-ACTUAL-URL].vercel.app
Environments: ✅ Production ✅ Preview
```
*(Get your actual URL from Vercel dashboard)*

#### 4. NODE_ENV
```
Name: NODE_ENV
Value: production
Environments: ✅ Production ✅ Preview
```

---

### Step 2: Redeploy After Adding Variables

**Important:** Environment variables only load during deployment!

1. Go to **Deployments** tab
2. Click **"..."** on latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

---

### Step 3: Initialize Production Database

After deployment, you need to run migrations and seed the database:

#### Option A: Using Vercel CLI (Recommended)

```bash
# 1. Pull environment variables
npx vercel env pull .env.production

# 2. Run migrations
npx prisma migrate deploy

# 3. Seed database
npm run db:seed
```

#### Option B: Using Supabase Dashboard

1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to **SQL Editor**
4. Run the migration SQL from `prisma/migrations/0_init/migration.sql`
5. Or use Prisma Studio: `DATABASE_URL="your_url" npx prisma studio`

#### Option C: One-Line Command

```bash
DATABASE_URL="postgresql://postgres:Seema9889%40%40@db.iyesmohdbhuxhdeodxny.supabase.co:5432/postgres?sslmode=require" npx prisma migrate deploy && DATABASE_URL="postgresql://postgres:Seema9889%40%40@db.iyesmohdbhuxhdeodxny.supabase.co:5432/postgres?sslmode=require" npm run db:seed
```

---

## 🔍 Verify Everything Works

### 1. Check Environment Variables
- Go to Vercel → Settings → Environment Variables
- Verify all 4 required variables are there
- Make sure they're set for **Production** environment

### 2. Check Database Connection
- Visit: `https://your-app.vercel.app/api/health`
- Should return: `{"status":"ok",...}`

### 3. Check Packages API
- Visit: `https://your-app.vercel.app/api/packages`
- Should return JSON with packages (or empty array if not seeded)

### 4. Check Function Logs
- Go to Vercel → Deployments → Latest → Functions
- Check for any error messages
- Look for database connection errors

---

## 🐛 Common Issues & Fixes

### Issue: "Can't reach database server"
**Fix:** 
- Check DATABASE_URL is correct
- Verify Supabase database is running (not paused)
- Check if your IP needs to be whitelisted

### Issue: "Database schema not found"
**Fix:**
- Run migrations: `npx prisma migrate deploy`
- Or use: `npx prisma db push` (for development)

### Issue: "No packages showing"
**Fix:**
- Seed the database: `npm run db:seed`
- Check database with Prisma Studio

### Issue: "Environment variables not loading"
**Fix:**
- Make sure variables are set for **Production** environment
- Redeploy after adding variables
- Check variable names are exact (case-sensitive)

---

## 📝 Quick Checklist

- [ ] DATABASE_URL added in Vercel
- [ ] JWT_SECRET added in Vercel
- [ ] NEXT_PUBLIC_APP_URL added in Vercel
- [ ] NODE_ENV set to "production"
- [ ] Redeployed after adding variables
- [ ] Ran database migrations (`prisma migrate deploy`)
- [ ] Seeded database (`npm run db:seed`)
- [ ] Verified `/api/health` endpoint works
- [ ] Verified `/api/packages` endpoint works

---

## 🆘 Still Getting 500 Error?

1. **Check Vercel Function Logs:**
   - Go to Deployments → Latest → Functions → View Logs
   - Look for specific error messages

2. **Test Database Connection:**
   ```bash
   DATABASE_URL="your_url" npx prisma db pull
   ```

3. **Check Supabase Dashboard:**
   - Verify database is active (not paused)
   - Check connection settings
   - Verify password is correct

4. **Share Error Details:**
   - Copy the exact error from Vercel logs
   - Check browser console for more details

---

**After completing these steps, your app should work!** 🎉

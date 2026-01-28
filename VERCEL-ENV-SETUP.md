# 🚀 Quick Setup: Environment Variables for Vercel

## Copy-Paste Ready Values

Use these values in Vercel Dashboard → Settings → Environment Variables:

---

## ✅ Required Variables (Add These First)

### 1. DATABASE_URL
```
postgresql://postgres:Seema9889%40%40@db.iyesmohdbhuxhdeodxny.supabase.co:5432/postgres?sslmode=require
```
*(This is your current database connection string)*

### 2. NEXT_PUBLIC_APP_URL
```
https://wandermate-packages-[YOUR-PROJECT-ID].vercel.app
```
*(Replace [YOUR-PROJECT-ID] with your actual Vercel project URL - you'll get this after first deployment)*

### 3. JWT_SECRET
Generate one with:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```
Or use this example (but generate your own!):
```
your-super-secret-jwt-key-change-this-in-production-min-32-chars
```

### 4. NODE_ENV
```
production
```

---

## 📋 Step-by-Step Instructions

1. **Open Vercel Dashboard**
   - Go to: https://vercel.com/dashboard
   - Click on your `wandermate-packages` project

2. **Go to Settings**
   - Click **Settings** tab
   - Click **Environment Variables** in left sidebar

3. **Add Each Variable**
   - Click **"Add New"**
   - Paste Name and Value from above
   - Select: ✅ Production ✅ Preview
   - Click **Save**
   - Repeat for each variable

4. **Redeploy**
   - Go to **Deployments** tab
   - Click **"..."** on latest deployment
   - Click **Redeploy**
   - Wait for deployment to complete

---

## 🔍 Verify Variables Are Set

After redeploy, check:
1. Go to **Deployments** → Latest deployment
2. Click **Build Logs**
3. Look for: `Environment variables loaded`

---

## ⚠️ Important

- **Redeploy after adding variables** - They only load during build
- **Update NEXT_PUBLIC_APP_URL** - Use your actual Vercel URL
- **Generate new JWT_SECRET** - Don't use the example above

---

**That's it!** Your app should now work with the database! 🎉

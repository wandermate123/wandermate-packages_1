# 🔐 How to Add Environment Variables in Vercel

## Step-by-Step Guide

### Method 1: Via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Sign in if needed

2. **Select Your Project**
   - Click on `wandermate-packages` project

3. **Navigate to Settings**
   - Click **Settings** tab (top navigation)
   - Click **Environment Variables** (left sidebar)

4. **Add Environment Variables**
   - Click **Add New** button
   - Enter the variable name (e.g., `DATABASE_URL`)
   - Enter the variable value
   - Select environments:
     - ✅ **Production** (for live site)
     - ✅ **Preview** (for preview deployments)
     - ✅ **Development** (for local dev, optional)
   - Click **Save**

5. **Redeploy** (Important!)
   - After adding variables, go to **Deployments** tab
   - Click **"..."** menu on latest deployment
   - Click **Redeploy**
   - Or wait for next automatic deployment

---

## Required Environment Variables

Add these variables one by one:

### 1. Database Connection
```
Name: DATABASE_URL
Value: postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres?sslmode=require
Environment: Production, Preview
```

### 2. App URL
```
Name: NEXT_PUBLIC_APP_URL
Value: https://wandermate-packages-[your-random].vercel.app
Environment: Production, Preview
```

**🔍 How to Find Your Actual URL (3 Easy Methods):**

**Method 1 - Project Overview (Easiest):**
1. Go to Vercel Dashboard → Click your `wandermate-packages` project
2. Look at the **top of the page** - you'll see:
   ```
   Production: https://wandermate-packages-abc123def.vercel.app
   ```
3. **Copy this URL** - that's your `NEXT_PUBLIC_APP_URL`!

**Method 2 - Deployments Tab:**
1. Go to **Deployments** tab
2. Click on the **latest deployment**
3. Copy the URL shown at the top

**Method 3 - Browser Address Bar:**
- If you're viewing your deployed site, copy the URL from your browser's address bar

**📝 See `FIND-YOUR-VERCEL-URL.md` for detailed step-by-step guide with screenshots!**

**Quick Tip:** You can also leave this empty initially, deploy, then update it with the actual URL and redeploy.

### 3. JWT Secret
```
Name: JWT_SECRET
Value: [generate with: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"]
Environment: Production, Preview
```

### 4. Node Environment
```
Name: NODE_ENV
Value: production
Environment: Production, Preview
```

---

## Optional Environment Variables

### Payment Gateway (Razorpay)
```
Name: RAZORPAY_KEY_ID
Value: [your razorpay key]
Environment: Production, Preview

Name: RAZORPAY_KEY_SECRET
Value: [your razorpay secret]
Environment: Production, Preview
```

### Email Service (Resend)
```
Name: RESEND_API_KEY
Value: [your resend API key]
Environment: Production, Preview

Name: EMAIL_FROM
Value: noreply@wandermate.com
Environment: Production, Preview
```

### Admin Account
```
Name: ADMIN_EMAIL
Value: admin@wandermate.com
Environment: Production, Preview

Name: ADMIN_PASSWORD
Value: [your secure password]
Environment: Production, Preview
```

### WhatsApp (Optional)
```
Name: WHATSAPP_NUMBER
Value: 91921313559
Environment: Production, Preview
```

---

## Method 2: Via Vercel CLI

If you prefer command line:

```bash
# Add environment variable
npx vercel env add DATABASE_URL production

# List all environment variables
npx vercel env ls

# Pull environment variables to local file
npx vercel env pull .env.production
```

---

## Important Notes

### ⚠️ After Adding Variables

1. **Redeploy Required**: Environment variables are only loaded during build/deployment
2. **Redeploy**: Go to Deployments → Click "..." → Redeploy
3. **Verify**: Check build logs to ensure variables are loaded

### 🔒 Security Best Practices

- ✅ Never commit `.env` files to Git
- ✅ Use different values for Production vs Development
- ✅ Rotate secrets regularly
- ✅ Use Vercel's built-in secret management

### 📝 Quick Checklist

- [ ] DATABASE_URL added
- [ ] NEXT_PUBLIC_APP_URL added (update with actual URL)
- [ ] JWT_SECRET added (strong random value)
- [ ] NODE_ENV set to "production"
- [ ] Redeployed after adding variables
- [ ] Verified deployment succeeded

---

## Troubleshooting

### Variables Not Working?

1. **Check Spelling**: Variable names are case-sensitive
2. **Redeploy**: Variables only load during deployment
3. **Check Environment**: Make sure variables are added to correct environment (Production)
4. **Check Logs**: View deployment logs to see if variables are loaded

### How to Verify Variables Are Loaded

1. Go to **Deployments** tab
2. Click on latest deployment
3. Click **Build Logs**
4. Look for: `Environment variables loaded from .env`

---

## Generate JWT Secret

Run this locally to generate a strong secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copy the output and use it as `JWT_SECRET` value.

---

**Need Help?** Check Vercel docs: https://vercel.com/docs/projects/environment-variables

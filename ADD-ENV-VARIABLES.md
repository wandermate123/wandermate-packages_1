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
Value: [generate wit19:45:43.560 Running build in Washington, D.C., USA (East) – iad1
19:45:43.561 Build machine configuration: 2 cores, 8 GB
19:45:43.574 Cloning github.com/wandermate123/wandermate-packages_1 (Branch: main, Commit: 1992381)
19:45:43.575 Skipping build cache, deployment was triggered without cache.
19:45:43.984 Cloning completed: 409.000ms
19:45:44.435 Running "vercel build"
19:45:45.523 Vercel CLI 50.5.2
19:45:45.873 Running "install" command: `npm install`...
19:45:57.051 
19:45:57.052 added 46 packages, and audited 47 packages in 11s
19:45:57.052 
19:45:57.053 5 packages are looking for funding
19:45:57.053   run `npm fund` for details
19:45:57.085 
19:45:57.086 1 high severity vulnerability
19:45:57.086 
19:45:57.087 To address all issues (including breaking changes), run:
19:45:57.087   npm audit fix --force
19:45:57.087 
19:45:57.088 Run `npm audit` for details.
19:45:57.132 Detected Next.js version: 14.2.35
19:45:57.134 Running "prisma generate && next build"
19:45:57.592 Prisma schema loaded from prisma/schema.prisma
19:45:58.006 
19:45:58.007 ✔ Generated Prisma Client (v5.22.0) to ./node_modules/@prisma/client in 121ms
19:45:58.008 
19:45:58.008 Start by importing your Prisma Client (See: https://pris.ly/d/importing-client)
19:45:58.008 
19:45:58.008 Tip: Need your database queries to be 1000x faster? Accelerate offers you that and more: https://pris.ly/tip-2-accelerate
19:45:58.008 
19:45:58.906 Attention: Next.js now collects completely anonymous telemetry regarding usage.
19:45:58.908 This information is used to shape Next.js' roadmap and prioritize features.
19:45:58.908 You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
19:45:58.908 https://nextjs.org/telemetry
19:45:58.908 
19:45:58.958   ▲ Next.js 14.2.35
19:45:58.959 
19:45:58.982    Creating an optimized production build ...
19:46:02.543 Failed to compile.
19:46:02.543 
19:46:02.543 ./src/app/packages/[id]/page.tsx
19:46:02.544 Module not found: Can't resolve '@/components/ImageSlideshow'
19:46:02.544 
19:46:02.544 https://nextjs.org/docs/messages/module-not-found
19:46:02.544 
19:46:02.544 ./src/app/packages/[id]/page.tsx
19:46:02.544 Module not found: Can't resolve '@/components/BookingModal'
19:46:02.544 
19:46:02.544 https://nextjs.org/docs/messages/module-not-found
19:46:02.544 
19:46:02.544 ./src/app/packages/[id]/page.tsx
19:46:02.544 Module not found: Can't resolve '@/components/PackageCard'
19:46:02.546 
19:46:02.546 https://nextjs.org/docs/messages/module-not-found
19:46:02.546 
19:46:02.546 ./src/app/packages/[id]/page.tsx
19:46:02.546 Module not found: Can't resolve '@/lib/api-client'
19:46:02.546 
19:46:02.547 https://nextjs.org/docs/messages/module-not-found
19:46:02.547 
19:46:02.547 ./src/app/packages/page.tsx
19:46:02.547 Module not found: Can't resolve '@/components/PackageCard'
19:46:02.547 
19:46:02.547 https://nextjs.org/docs/messages/module-not-found
19:46:02.547 
19:46:02.557 
19:46:02.559 > Build failed because of webpack errors
19:46:02.577 Error: Command "prisma generate && next build" exited with 1h: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"]
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
Required for "Pay now" on the View Booking page. Get keys from [Razorpay Dashboard](https://dashboard.razorpay.com/app/keys) (use Test mode for development).
```
Name: RAZORPAY_KEY_ID
Value: [your razorpay key]
Environment: Production, Preview

Name: RAZORPAY_KEY_SECRET
Value: [your razorpay secret]
Environment: Production, Preview
```

### Email Service (Resend)
Used to send booking confirmation emails after payment. Get API key from [Resend](https://resend.com). Verify your domain for production.
```
Name: RESEND_API_KEY
Value: [your resend API key]
Environment: Production, Preview

Name: EMAIL_FROM
Value: Wandermate <noreply@yourdomain.com>
Environment: Production, Preview
```

### WhatsApp Notifications (Twilio)
Used to send booking confirmation WhatsApp messages after payment. Get credentials from [Twilio Console](https://console.twilio.com). Use [WhatsApp Sandbox](https://www.twilio.com/docs/whatsapp/sandbox) for development.
```
Name: TWILIO_ACCOUNT_SID
Value: [your twilio account sid]
Environment: Production, Preview

Name: TWILIO_AUTH_TOKEN
Value: [your twilio auth token]
Environment: Production, Preview

Name: TWILIO_WHATSAPP_FROM
Value: whatsapp:+14155238886
Environment: Production, Preview
```
*(Sandbox "From" number is shown in Twilio WhatsApp Sandbox setup. For production, use your Twilio WhatsApp-enabled number.)*

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

### Deployment showing error after adding env vars?

**1. See the actual error**
- Vercel Dashboard → your project → **Deployments** → click the **failed** deployment
- Open **Building** or **Functions** logs and copy the error message

**2. Common causes and fixes**

| Problem | Fix |
|--------|-----|
| **Build fails** (e.g. "Missing env", "undefined") | Env validation is now skipped on Vercel during build. Commit the latest code (updated `env.ts` and `vercel.json`) and redeploy. |
| **Wrong Prisma client** | Removed `PRISMA_GENERATE_DATAPROXY` from `vercel.json` so the normal Postgres client is used. Redeploy. |
| **DATABASE_URL** has `#` or `&` | In Vercel, paste the value with no extra spaces; special chars are OK. If it still fails, wrap in quotes in Vercel (some setups need it). |
| **NEXT_PUBLIC_APP_URL** wrong | Use the exact Production URL from Vercel (e.g. `https://wandermate-packages-xxx.vercel.app`). No trailing slash. |
| **Vars only in Development** | Add each variable to **Production** (and **Preview** if you use it). Redeploy after changing env. |
| **500 after deploy** | Build passed but runtime fails. Check **Functions** / **Runtime Logs** for the real error (often DATABASE_URL or JWT_SECRET). |
| **"An unexpected error" or packages don't load** | **Add DATABASE_URL** in Vercel: Settings → Environment Variables → add `DATABASE_URL` with your Supabase Postgres URL (Production + Preview) → Save → Redeploy. Then check `https://your-app.vercel.app/api/health` — if `db.status` is `"error"`, the URL is wrong. |

**3. Redeploy after any env change**
- Settings → Environment Variables → save
- Deployments → **⋯** on latest → **Redeploy**

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

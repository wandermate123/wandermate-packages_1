# 🔍 How to Find Your Vercel Deployment URL

## Method 1: From Vercel Dashboard (Easiest)

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Sign in if needed

2. **Select Your Project**
   - Click on `wandermate-packages` project

3. **Find the URL**
   - Look at the **top of the page** - you'll see:
     ```
     wandermate-packages
     wandermate-packages-xxxxx.vercel.app
     ```
   - Or check the **Deployments** tab
   - Click on any deployment
   - Copy the URL shown (e.g., `https://wandermate-packages-abc123.vercel.app`)

---

## Method 2: From Deployment Details

1. Go to **Deployments** tab
2. Click on the **latest deployment**
3. You'll see the URL at the top:
   ```
   Production: https://wandermate-packages-xxxxx.vercel.app
   ```
4. Copy this URL

---

## Method 3: Using Vercel CLI

```bash
# List all deployments
npx vercel ls

# Get project info
npx vercel inspect
```

---

## What to Do With the URL

Once you have your URL:

1. **Add to Environment Variables:**
   - Go to **Settings** → **Environment Variables**
   - Add/Update `NEXT_PUBLIC_APP_URL`
   - Value: `https://wandermate-packages-xxxxx.vercel.app` (your actual URL)
   - Select: ✅ Production ✅ Preview
   - Click **Save**

2. **Redeploy:**
   - Go to **Deployments** → Click **"..."** → **Redeploy**

---

## Example URLs

Your URL will look like one of these:
- `https://wandermate-packages-abc123def.vercel.app` (default)
- `https://wandermate-packages.vercel.app` (if you set custom domain)
- `https://yourdomain.com` (if you configured custom domain)

---

**Note:** If you haven't deployed yet, the URL will be generated after your first successful deployment!

# 📊 Monitoring & Error Tracking Setup

## 1. Error Tracking with Sentry (Recommended)

### Installation
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

### Configuration
The wizard will:
- Create `sentry.client.config.ts`
- Create `sentry.server.config.ts`
- Update `next.config.js`
- Add Sentry environment variables

### Environment Variables
Add to Vercel:
```
SENTRY_DSN=your_sentry_dsn
SENTRY_ORG=your_org
SENTRY_PROJECT=your_project
SENTRY_AUTH_TOKEN=your_auth_token
```

### Manual Setup (Alternative)
Create `sentry.client.config.ts`:
```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});
```

---

## 2. Analytics Setup

### Vercel Analytics (Built-in)
1. Go to Vercel Dashboard → Your Project → Analytics
2. Enable "Web Analytics"
3. Free tier includes basic analytics

### Google Analytics
1. Get GA4 Measurement ID
2. Add to `src/app/layout.tsx`:
```typescript
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
        {children}
      </body>
    </html>
  )
}
```

---

## 3. Uptime Monitoring

### Uptime Robot (Free)
1. Go to https://uptimerobot.com
2. Create account (free)
3. Add monitor:
   - Type: HTTP(s)
   - URL: `https://your-domain.com/api/health`
   - Interval: 5 minutes
4. Get email alerts when site is down

### Alternative: Better Uptime
- https://betteruptime.com (free tier available)

---

## 4. Logging

### Structured Logging
For production, consider:
- **Logtail** (free tier)
- **LogRocket** (paid)
- **Datadog** (paid)

### Basic Console Logging
Already implemented in:
- `src/lib/api-utils.ts` - API errors
- `src/app/api/**/route.ts` - Request logs

---

## 5. Performance Monitoring

### Vercel Analytics
- Built-in performance metrics
- Core Web Vitals tracking
- Enable in dashboard

### Lighthouse CI
```bash
npm install -D @lhci/cli
```

Add to `package.json`:
```json
{
  "scripts": {
    "lhci": "lhci autorun"
  }
}
```

---

## 6. Database Monitoring

### Supabase Dashboard
- Built-in query performance
- Connection monitoring
- Database size tracking

### Prisma Studio
```bash
DATABASE_URL="prod_url" npx prisma studio
```

---

## 📊 Recommended Monitoring Stack

**Free Tier:**
- ✅ Vercel Analytics (built-in)
- ✅ Sentry (free tier: 5k errors/month)
- ✅ Uptime Robot (50 monitors free)
- ✅ Supabase Dashboard (built-in)

**Paid (Optional):**
- LogRocket ($99/month)
- Datadog ($15/month)
- New Relic ($25/month)

---

## 🚨 Alert Setup

### Critical Alerts
1. **Site Down** - Uptime Robot → Email/SMS
2. **High Error Rate** - Sentry → Slack/Email
3. **Database Connection Issues** - Supabase → Email

### Warning Alerts
1. **Slow Response Times** - Vercel Analytics
2. **High API Usage** - Vercel Dashboard
3. **Database Size** - Supabase Dashboard

---

## 📝 Monitoring Checklist

- [ ] Sentry error tracking configured
- [ ] Analytics enabled (Vercel/Google)
- [ ] Uptime monitoring set up
- [ ] Alerts configured
- [ ] Performance monitoring active
- [ ] Database monitoring enabled

---

**Need help?** Check Sentry docs: https://docs.sentry.io/platforms/javascript/guides/nextjs/

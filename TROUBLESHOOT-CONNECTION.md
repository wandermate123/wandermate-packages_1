# Troubleshooting Supabase Connection

## Current Issue: Can't reach database server

### Step 1: Check if Supabase Project is Active

1. Go to: https://supabase.com/dashboard/project/iyesmohdbhuxhdeodxny
2. Check if you see any message about the project being **paused**
3. If paused, click **"Restore"** or **"Resume"** to activate it
4. Wait 1-2 minutes for it to fully start

### Step 2: Try Connection Pooling URL

Supabase provides a **Connection Pooling** URL that's more reliable. To get it:

1. Go to: **Settings** → **Database**
2. Scroll to **"Connection string"** section
3. Click the **"Connection pooling"** tab (not "URI")
4. Copy that connection string

It should look like:
```
postgresql://postgres.iyesmohdbhuxhdeodxny:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

**Important**: 
- Port is **6543** (not 5432)
- Uses `pooler.supabase.com` domain
- Password encoding: `@@` becomes `%40%40`

### Step 3: Test Connection

Once you have the connection pooling URL, update `.env`:

```env
DATABASE_URL="postgresql://postgres.iyesmohdbhuxhdeodxny:Seema9889%40%40@aws-0-[YOUR-REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
```

Replace `[YOUR-REGION]` with your actual region (e.g., `ap-south-1`, `us-east-1`, `eu-west-1`)

### Step 4: Alternative - Check Direct Connection

If connection pooling doesn't work, verify:
- Your Supabase project is **active** (not paused)
- You can access the Supabase dashboard
- The database password is correct

### Quick Test Command

After updating `.env`, test:
```bash
npm run db:push
```

---

## What Region Am I Using?

To find your region:
1. Go to Supabase Dashboard → **Settings** → **General**
2. Look for **"Region"** field
3. Common regions:
   - `ap-south-1` (Mumbai, India)
   - `us-east-1` (US East)
   - `eu-west-1` (Europe)

---

**Next Steps:**
1. Check if project is active
2. Get Connection Pooling URL from Supabase
3. Share the region or the full connection pooling URL (mask password)
4. I'll format it correctly and test the connection

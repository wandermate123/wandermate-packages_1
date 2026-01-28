# Fix Database Connection

## The Issue
The connection string format might be incorrect. Supabase provides different connection strings for different use cases.

## Solution: Get the Correct Connection String

### Step 1: Go to Supabase Dashboard
1. Open https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** → **Database**

### Step 2: Copy Connection String
You'll see multiple options. Use one of these:

#### Option A: Connection Pooling (Recommended)
- Click **"Connection pooling"** tab
- Copy the **"Connection string"** 
- Format: `postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres`
- **Port: 6543** (not 5432)

#### Option B: Direct Connection
- Use **"Connection string"** tab
- Copy the URI format
- Format: `postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`
- **Port: 5432**

### Step 3: URL Encode Password
If your password has special characters, encode them:
- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `&` → `%26`

**Example:**
- Password: `Seema9889@@`
- Encoded: `Seema9889%40%40`

### Step 4: Update .env File
Replace the `DATABASE_URL` in `.env` with the correct format.

## Try This Format (Connection Pooling):

```
postgresql://postgres.iyesmohdbhuxhdeodxny:Seema9889%40%40@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true
```

**Note:** Replace `[region]` with your actual region (e.g., `us-east-1`, `ap-south-1`, etc.)

## Or Try Direct Connection:

```
postgresql://postgres:Seema9889%40%40@db.iyesmohdbhuxhdeodxny.supabase.co:5432/postgres?sslmode=require
```

---

**Please:**
1. Go to Supabase Dashboard > Settings > Database
2. Copy the **Connection Pooling** connection string
3. Share it here (you can mask the password) and I'll help format it correctly

Or if you want to proceed, update `.env` with the correct connection string and run:
```bash
npm run db:push
```

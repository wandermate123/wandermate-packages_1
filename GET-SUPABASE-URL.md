# How to Get Correct Supabase Connection String

## Step-by-Step Instructions:

### 1. Go to Supabase Dashboard
- Visit: https://supabase.com/dashboard
- Select your project: `iyesmohdbhuxhdeodxny`

### 2. Get Connection String
- Click **Settings** (gear icon) in left sidebar
- Click **Database** in settings menu
- Scroll down to **"Connection string"** section

### 3. Choose the Right Format

You'll see tabs: **"URI"**, **"JDBC"**, **"Connection pooling"**

**Use "Connection pooling" tab:**
- Click on **"Connection pooling"** tab
- Copy the **"Connection string"** 
- It should look like:
  ```
  postgresql://postgres.iyesmohdbhuxhdeodxny:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres
  ```

**OR use "URI" tab:**
- Click on **"URI"** tab  
- Copy the connection string
- Format: `postgresql://postgres:[PASSWORD]@db.iyesmohdbhuxhdeodxny.supabase.co:5432/postgres`

### 4. Important: Password Encoding

If your password is `Seema9889@@`, you need to URL encode it:
- `@` becomes `%40`
- So `Seema9889@@` becomes `Seema9889%40%40`

### 5. Final Format for .env

**For Connection Pooling (Recommended):**
```env
DATABASE_URL="postgresql://postgres.iyesmohdbhuxhdeodxny:Seema9889%40%40@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
```

**For Direct Connection:**
```env
DATABASE_URL="postgresql://postgres:Seema9889%40%40@db.iyesmohdbhuxhdeodxny.supabase.co:5432/postgres?sslmode=require"
```

### 6. What Region?

In the connection string, replace `[region]` with your actual region. Common ones:
- `us-east-1` (US East)
- `ap-south-1` (Asia Pacific - Mumbai)
- `eu-west-1` (Europe)

You can find your region in Supabase Settings > General > Region

---

## Quick Test

After updating `.env`, test the connection:

```bash
npm run db:push
```

This will:
1. Connect to your database
2. **Automatically create all tables** (you don't need to create them manually!)
3. Set up the schema

---

**Need Help?** 
- Share the connection string format you see in Supabase (you can mask the password)
- Or tell me which region your Supabase project is in

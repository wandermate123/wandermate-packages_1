# Quick Fix: Get Supabase Connection String

## Easy Steps:

1. **Open**: https://supabase.com/dashboard/project/iyesmohdbhuxhdeodxny

2. **Go to**: Settings (⚙️) → Database

3. **Find**: "Connection string" section

4. **Copy**: The **URI** connection string (it should look like):
   ```
   postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres
   ```
   OR
   ```
   postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   ```

5. **Paste it here** (you can mask password like `Seema9889***`) and I'll format it correctly!

---

## Or Try This:

If your password is exactly `Seema9889@@`, try these formats:

**Format 1 (Direct):**
```
postgresql://postgres:Seema9889%40%40@db.iyesmohdbhuxhdeodxny.supabase.co:5432/postgres
```

**Format 2 (With SSL):**
```
postgresql://postgres:Seema9889%40%40@db.iyesmohdbhuxhdeodxny.supabase.co:5432/postgres?sslmode=require
```

**Format 3 (Connection Pooling - if available):**
```
postgresql://postgres.iyesmohdbhuxhdeodxny:Seema9889%40%40@aws-0-[YOUR-REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
```

---

**Once you have the correct connection string, update `.env` and run:**
```bash
npm run db:push    # This will CREATE all tables automatically!
npm run db:seed    # This will add your packages
```

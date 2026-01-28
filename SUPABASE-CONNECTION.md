# Getting Correct Supabase Connection String

## Steps to Get the Right Connection String:

1. **Go to your Supabase project dashboard**
2. **Click on "Settings" (gear icon)**
3. **Go to "Database" section**
4. **Scroll down to "Connection string"**

## You'll see multiple options:

### Option 1: **URI** (Recommended for Prisma)
```
postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true
```

### Option 2: **Connection Pooling** (Use this!)
- Click on "Connection pooling" tab
- Copy the "Connection string" 
- Format: `postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres`

### Option 3: **Direct Connection**
- Use port **5432** (not 6543)
- Format: `postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

## Important Notes:

1. **Password Encoding**: If your password has special characters:
   - `@` becomes `%40`
   - `#` becomes `%23`
   - `$` becomes `%24`
   - etc.

2. **Use Connection Pooling** (port 6543) for better performance

3. **Add SSL parameter**: Append `?sslmode=require` or `?pgbouncer=true&sslmode=require`

## Example (with password encoding):

If your password is `Seema9889@@`:
- Encoded: `Seema9889%40%40`
- Full URL: `postgresql://postgres.xxxxx:Seema9889%40%40@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require`

## Quick Fix:

1. Go to Supabase Dashboard > Settings > Database
2. Copy the **Connection Pooling** connection string
3. Replace `[YOUR-PASSWORD]` with your actual password (URL encoded)
4. Update `.env` file

---

**Need help?** Share your connection string format and I'll help you format it correctly!

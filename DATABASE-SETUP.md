# Database Setup Guide

## 🚀 Option 1: Cloud Database (Recommended - Easiest & Free)

### Supabase (Recommended)
1. Go to https://supabase.com
2. Sign up (free account)
3. Click "New Project"
4. Fill in:
   - Project name: `wandermate`
   - Database password: (choose a strong password - save it!)
   - Region: Choose closest to you
5. Wait 2-3 minutes for setup
6. Go to **Settings** > **Database**
7. Copy the **Connection string** (URI format)
8. It looks like: `postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres`
9. Update `.env.local`:
   ```env
   DATABASE_URL="paste-your-connection-string-here"
   ```

### Alternative: Railway (Also Free)
1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" > "Add PostgreSQL"
4. Click on PostgreSQL service
5. Go to **Variables** tab
6. Copy the `DATABASE_URL`
7. Paste into `.env.local`

### Alternative: Neon (Also Free)
1. Go to https://neon.tech
2. Sign up
3. Create project
4. Copy connection string
5. Paste into `.env.local`

---

## 💻 Option 2: Local PostgreSQL (If you prefer)

### Install PostgreSQL on Windows

1. **Download PostgreSQL:**
   - Go to https://www.postgresql.org/download/windows/
   - Download PostgreSQL installer
   - Run installer
   - Remember the password you set for `postgres` user

2. **Add to PATH (if needed):**
   - PostgreSQL usually adds itself to PATH
   - If not, add: `C:\Program Files\PostgreSQL\[version]\bin`

3. **Create Database:**
   ```powershell
   # Open PowerShell as Administrator
   psql -U postgres
   
   # Enter your password when prompted
   # Then run:
   CREATE DATABASE wandermate_db;
   \q
   ```

4. **Update .env.local:**
   ```env
   DATABASE_URL="postgresql://postgres:your-password@localhost:5432/wandermate_db?schema=public"
   ```

---

## ✅ After Database Setup

Once you have `DATABASE_URL` in `.env.local`:

```bash
# 1. Generate Prisma Client
npm run db:generate

# 2. Create tables in database
npm run db:push

# 3. Add sample packages
npm run db:seed

# 4. Start development server
npm run dev
```

## 🔍 Verify Database Connection

```bash
# Open Prisma Studio (database GUI)
npm run db:studio
```

This will open a browser window where you can see and manage your database.

## 🆘 Troubleshooting

### "Connection refused" or "Connection timeout"
- Check your `DATABASE_URL` is correct
- For cloud databases, ensure you're using the correct port (usually 6543 for Supabase pooler, 5432 for direct)
- Check if your IP needs to be whitelisted (some cloud providers)

### "Database does not exist"
- Create the database first (for local PostgreSQL)
- For cloud databases, the database is usually created automatically

### "Authentication failed"
- Double-check your password in the connection string
- For Supabase, make sure you're using the password you set during project creation

---

**Recommendation**: Use **Supabase** - it's free, fast to set up, and includes a nice dashboard!

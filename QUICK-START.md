# 🚀 Quick Start Guide

## First Time Setup (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Database

**Option A: Local PostgreSQL**
```bash
# Create database
createdb wandermate_db

# Update .env.local
DATABASE_URL="postgresql://username:password@localhost:5432/wandermate_db?schema=public"
```

**Option B: Cloud Database (Easiest)**
1. Go to https://supabase.com (free)
2. Create project
3. Copy connection string to `.env.local`

### 3. Initialize Database
```bash
npm run db:generate  # Generate Prisma Client
npm run db:push      # Create tables
npm run db:seed      # Add sample packages
```

### 4. Start Development Server
```bash
npm run dev
```

Visit: http://localhost:3000/packages

## ✅ Verify Everything Works

1. **Packages Page**: Should show all packages from database
2. **Package Detail**: Click any package, should load details
3. **Booking Form**: Click "Book Now", fill form, submit
4. **Check Database**: `npm run db:studio` to see bookings

## 🔧 Common Commands

```bash
# Database
npm run db:generate    # After schema changes
npm run db:push        # Push schema to DB
npm run db:studio      # Open database GUI
npm run db:seed        # Seed with sample data

# Development
npm run dev            # Start dev server
npm run build          # Build for production
```

## 📝 Environment Variables

Required in `.env.local`:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Random secret (for future auth)
- `NEXT_PUBLIC_APP_URL` - Your app URL

## 🎯 What's Working

✅ Package listing from database  
✅ Package detail pages  
✅ Booking submission  
✅ Search & filtering  
✅ Similar packages  
✅ Error handling  
✅ Loading states  

## 🐛 Troubleshooting

**"Prisma Client not generated"**
```bash
npm run db:generate
```

**"Database connection error"**
- Check `.env.local` has correct `DATABASE_URL`
- Ensure PostgreSQL is running
- Verify database exists

**"Packages not showing"**
- Run `npm run db:seed` to add sample data
- Check database with `npm run db:studio`

---

**Ready to go!** 🎉

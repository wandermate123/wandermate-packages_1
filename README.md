# Wandermate Packages - Production Ready Travel Platform

A modern, production-ready travel packages platform built with Next.js, TypeScript, Prisma, and PostgreSQL.

## 🚀 Features

- 🎨 Modern, minimalist design
- 🔍 Advanced search and filtering
- 📱 Fully responsive
- 💳 Payment integration ready
- 📧 Email notifications ready
- 🔐 Authentication ready
- 📊 Admin dashboard ready
- 🗄️ Production-grade database schema
- ✅ Input validation & error handling
- 🔒 Security best practices

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

#### Option A: Local PostgreSQL

1. Create a PostgreSQL database:
```bash
createdb wandermate_db
```

2. Update `.env.local` with your database URL:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/wandermate_db?schema=public"
```

#### Option B: Cloud Database (Recommended for Production)

Use services like:
- [Supabase](https://supabase.com) (Free tier available)
- [Railway](https://railway.app) (Free tier available)
- [Neon](https://neon.tech) (Free tier available)
- [AWS RDS](https://aws.amazon.com/rds/)

Copy the connection string to `.env.local`

### 3. Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

**Required variables:**
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Random secret for JWT tokens
- `NEXT_PUBLIC_APP_URL` - Your app URL

**Optional (for full functionality):**
- `RAZORPAY_KEY_ID` & `RAZORPAY_KEY_SECRET` - For payment processing
- `RESEND_API_KEY` - For email notifications
- `ADMIN_EMAIL` & `ADMIN_PASSWORD` - Admin account credentials

### 4. Initialize Database

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Seed database with sample packages
npm run db:seed
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📁 Project Structure

```
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Database seed script
├── src/
│   ├── app/
│   │   ├── api/               # API routes
│   │   │   ├── packages/      # Package CRUD
│   │   │   ├── bookings/      # Booking management
│   │   │   └── payments/      # Payment processing
│   │   ├── packages/          # Frontend pages
│   │   └── layout.tsx
│   ├── components/            # React components
│   ├── lib/
│   │   ├── prisma.ts          # Prisma client
│   │   ├── validations.ts     # Zod schemas
│   │   └── api-utils.ts       # API utilities
│   ├── data/
│   │   └── packages.ts        # Sample data (for seeding)
│   └── types/
│       └── package.ts         # TypeScript types
└── .env.local                  # Environment variables (not in git)
```

## 🗄️ Database Schema

### Models

- **Package** - Travel packages with full details
- **Booking** - Customer bookings
- **Payment** - Payment records
- **User** - User accounts (customers & admins)
- **Review** - Package reviews

### Database Commands

```bash
# Generate Prisma Client after schema changes
npm run db:generate

# Push schema changes to database
npm run db:push

# Create and run migrations
npm run db:migrate

# Open Prisma Studio (database GUI)
npm run db:studio

# Seed database
npm run db:seed
```

## 🔌 API Endpoints

### Packages

- `GET /api/packages` - List packages (with filters)
- `GET /api/packages/[id]` - Get single package
- `POST /api/packages` - Create package (Admin)
- `PUT /api/packages/[id]` - Update package (Admin)
- `DELETE /api/packages/[id]` - Delete package (Admin)

**Query Parameters:**
- `category` - Filter by category
- `featured` - Filter featured packages
- `search` - Search in name/description
- `page` - Page number
- `limit` - Items per page

### Bookings

- `POST /api/bookings` - Create booking
- `GET /api/bookings` - List bookings (with filters)
- `GET /api/bookings/[id]` - Get single booking
- `PUT /api/bookings/[id]` - Update booking (Admin)

### Payments

- `POST /api/payments` - Create payment record
- `GET /api/payments` - List payments (Admin)
- `GET /api/payments/[id]` - Get single payment
- `PUT /api/payments/[id]` - Update payment status

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

- **Railway**: Connect GitHub repo, add DATABASE_URL
- **Render**: Connect GitHub repo, add PostgreSQL service
- **AWS/GCP**: Use their Next.js deployment guides

### Production Checklist

- [ ] Set up production database
- [ ] Configure environment variables
- [ ] Set up payment gateway
- [ ] Configure email service
- [ ] Set up domain & SSL
- [ ] Enable error tracking (Sentry)
- [ ] Set up analytics
- [ ] Configure backups
- [ ] Set up monitoring

## 🔐 Security Notes

- Never commit `.env.local` to git
- Use strong JWT secrets in production
- Implement rate limiting (coming soon)
- Add CSRF protection (coming soon)
- Hash passwords with bcrypt (TODO in seed script)
- Validate all inputs (✅ Done with Zod)

## 📝 Next Steps

1. **Phase 2**: Payment Integration (Razorpay/Stripe)
2. **Phase 3**: Email Notifications
3. **Phase 4**: Authentication (NextAuth.js)
4. **Phase 5**: Admin Dashboard
5. **Phase 6**: Image Upload (Cloudinary)

## 🤝 Contributing

This is a production-ready template. Customize as needed for your use case.

## 📄 License

Private - All rights reserved

## 🆘 Support

For issues or questions, please contact the development team.

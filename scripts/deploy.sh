#!/bin/bash

# Production Deployment Script
# Usage: ./scripts/deploy.sh

set -e

echo "🚀 Starting production deployment..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "❌ Error: DATABASE_URL environment variable is not set"
  exit 1
fi

# Generate Prisma Client
echo "📦 Generating Prisma Client..."
npx prisma generate

# Run migrations
echo "🗄️  Running database migrations..."
npx prisma migrate deploy

# Seed database (optional - comment out if not needed)
echo "🌱 Seeding database..."
npm run db:seed || echo "⚠️  Seed script failed or skipped"

# Build Next.js app
echo "🏗️  Building Next.js application..."
npm run build

echo "✅ Deployment preparation complete!"
echo "📝 Next steps:"
echo "   1. Push to GitHub"
echo "   2. Deploy on Vercel"
echo "   3. Set environment variables in Vercel dashboard"

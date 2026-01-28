# Production Deployment Script for Windows PowerShell
# Usage: .\scripts\deploy.ps1

$ErrorActionPreference = "Stop"

Write-Host "🚀 Starting production deployment..." -ForegroundColor Green

# Check if DATABASE_URL is set
if (-not $env:DATABASE_URL) {
    Write-Host "❌ Error: DATABASE_URL environment variable is not set" -ForegroundColor Red
    exit 1
}

# Generate Prisma Client
Write-Host "📦 Generating Prisma Client..." -ForegroundColor Cyan
npx prisma generate

# Run migrations
Write-Host "🗄️  Running database migrations..." -ForegroundColor Cyan
npx prisma migrate deploy

# Seed database (optional)
Write-Host "🌱 Seeding database..." -ForegroundColor Cyan
try {
    npm run db:seed
} catch {
    Write-Host "⚠️  Seed script failed or skipped" -ForegroundColor Yellow
}

# Build Next.js app
Write-Host "🏗️  Building Next.js application..." -ForegroundColor Cyan
npm run build

Write-Host "✅ Deployment preparation complete!" -ForegroundColor Green
Write-Host "📝 Next steps:" -ForegroundColor Yellow
Write-Host "   1. Push to GitHub"
Write-Host "   2. Deploy on Vercel"
Write-Host "   3. Set environment variables in Vercel dashboard"

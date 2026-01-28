import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { packages } from '../src/data/packages';

const prisma = new PrismaClient();

// Map category from frontend format to database enum
function mapCategory(category: string): 'VARANASI_BUDGET' | 'VARANASI_PREMIUM' | 'SPIRITUAL_TRIANGLE' {
  switch (category) {
    case 'varanasi-budget':
      return 'VARANASI_BUDGET';
    case 'varanasi-premium':
      return 'VARANASI_PREMIUM';
    case 'spiritual-triangle':
      return 'SPIRITUAL_TRIANGLE';
    default:
      return 'VARANASI_BUDGET';
  }
}

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data (optional - comment out in production)
  console.log('🧹 Cleaning existing data...');
  await prisma.review.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.package.deleteMany();
  await prisma.user.deleteMany();

  // Seed packages
  console.log('📦 Seeding packages...');
  for (const pkg of packages) {
    const packageData = {
      name: pkg.name,
      destination: pkg.destination,
      description: pkg.description,
      duration: pkg.duration,
      price: pkg.price,
      category: mapCategory(pkg.category),
      featured: pkg.featured || false,
      highlights: pkg.highlights || [],
      images: pkg.images || [],
      itinerary: pkg.itinerary ? JSON.parse(JSON.stringify(pkg.itinerary)) : null,
      inclusions: pkg.inclusions || [],
      exclusions: pkg.exclusions || [],
      terms: pkg.terms ? JSON.parse(JSON.stringify(pkg.terms)) : null,
      mapLocation: pkg.mapLocation ? JSON.parse(JSON.stringify(pkg.mapLocation)) : null,
      isActive: true,
    };

    const createdPackage = await prisma.package.create({
      data: packageData,
    });

    // Seed reviews if they exist
    if (pkg.reviews && pkg.reviews.length > 0) {
      console.log(`  📝 Adding ${pkg.reviews.length} reviews for ${pkg.name}...`);
      for (const review of pkg.reviews) {
        await prisma.review.create({
          data: {
            packageId: createdPackage.id,
            rating: review.rating,
            comment: review.comment,
            name: review.name,
            verified: review.verified || false,
          },
        });
      }
    }

    console.log(`  ✅ Created package: ${pkg.name}`);
  }

  // Create admin user (optional)
  console.log('👤 Creating admin user...');
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@wandermate.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  
  // Hash password with bcrypt for security
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  
  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword, // Update password if user exists
    },
    create: {
      email: adminEmail,
      name: 'Admin User',
      role: 'ADMIN',
      password: hashedPassword,
    },
  });

  console.log(`  ✅ Admin user created: ${adminEmail}`);

  console.log('✨ Seed completed successfully!');
  console.log(`📊 Summary:`);
  console.log(`   - Packages: ${packages.length}`);
  console.log(`   - Total reviews: ${packages.reduce((sum, p) => sum + (p.reviews?.length || 0), 0)}`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

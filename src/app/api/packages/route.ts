import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { handleApiError, successResponse, paginatedResponse } from '@/lib/api-utils';
import { packageSchema, packageQuerySchema } from '@/lib/validations';

// GET /api/packages - Get all packages with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query with safe defaults - convert null to undefined
    const queryParams: any = {
      category: searchParams.get('category') || 'all',
      page: searchParams.get('page') || '1',
      limit: searchParams.get('limit') || '10',
    };
    
    // Only add optional params if they exist (not null)
    const featured = searchParams.get('featured');
    if (featured !== null) {
      queryParams.featured = featured;
    }
    
    const search = searchParams.get('search');
    if (search !== null) {
      queryParams.search = search;
    }
    
    console.log('[API] Packages request params:', queryParams);
    
    const query = packageQuerySchema.parse(queryParams);

    const skip = (query.page - 1) * query.limit;
    const take = query.limit;

    // Build where clause
    const where: any = {
      isActive: true,
    };

    if (query.category && query.category !== 'all') {
      where.category = query.category;
    }

    if (query.featured !== undefined) {
      where.featured = query.featured;
    }

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' as any } },
        { destination: { contains: query.search, mode: 'insensitive' as any } },
        { description: { contains: query.search, mode: 'insensitive' as any } },
      ];
    }

    // Fetch packages and total count
    const [packages, total] = await Promise.all([
      prisma.package.findMany({
        where,
        skip,
        take,
        orderBy: [
          { featured: 'desc' },
          { createdAt: 'desc' },
        ],
        include: {
          reviews: {
            where: { verified: true },
            orderBy: { createdAt: 'desc' },
            take: 5, // Limit reviews per package in list view
          },
        },
      }),
      prisma.package.count({ where }),
    ]);

    console.log(`[API] Found ${packages.length} packages, total: ${total}`);
    return paginatedResponse(packages, query.page, query.limit, total);
  } catch (error) {
    console.error('[API] Error in GET /api/packages:', error);
    
    // Provide more helpful error messages
    if (error instanceof Error) {
      if (error.message.includes('Can\'t reach database')) {
        console.error('[API] Database connection failed. Check DATABASE_URL environment variable.');
      }
      if (error.message.includes('P1001')) {
        console.error('[API] Database connection timeout. Check DATABASE_URL and network access.');
      }
    }
    
    return handleApiError(error);
  }
}

// POST /api/packages - Create a new package (Admin only)
export async function POST(request: NextRequest) {
  try {
    // TODO: Add admin authentication middleware
    const body = await request.json();
    const validatedData = packageSchema.parse(body);

    const newPackage = await prisma.package.create({
      data: validatedData,
    });

    return successResponse(newPackage, 201);
  } catch (error) {
    return handleApiError(error);
  }
}

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { handleApiError, successResponse, paginatedResponse } from '@/lib/api-utils';
import { bookingSchema } from '@/lib/validations';

// POST /api/bookings - Create a new booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = bookingSchema.parse(body);

    // Verify package exists and is active
    const packageData = await prisma.package.findUnique({
      where: { id: validatedData.packageId },
    });

    if (!packageData || !packageData.isActive) {
      return handleApiError(new Error('Package not found or inactive'));
    }

    // Calculate total price
    const totalPrice = packageData.price * validatedData.numberOfPeople;

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        packageId: validatedData.packageId,
        numberOfPeople: validatedData.numberOfPeople,
        startDate: new Date(validatedData.startDate),
        endDate: new Date(validatedData.endDate),
        totalPrice,
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        specialRequests: validatedData.specialRequests,
        status: 'PENDING',
        paymentStatus: 'PENDING',
      },
      include: {
        package: true,
      },
    });

    return successResponse(booking, 201);
  } catch (error) {
    return handleApiError(error);
  }
}

// GET /api/bookings - Get bookings (with optional filters)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const skip = (page - 1) * limit;

    const where: any = {};
    if (email) {
      where.email = email;
    }
    if (status) {
      where.status = status;
    }

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          package: {
            select: {
              id: true,
              name: true,
              destination: true,
              duration: true,
            },
          },
        },
      }),
      prisma.booking.count({ where }),
    ]);

    return paginatedResponse(bookings, page, limit, total);
  } catch (error) {
    return handleApiError(error);
  }
}

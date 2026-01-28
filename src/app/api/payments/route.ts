import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { handleApiError, successResponse } from '@/lib/api-utils';
import { paymentSchema } from '@/lib/validations';

// POST /api/payments - Create payment record
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = paymentSchema.parse(body);

    // Verify booking exists
    const booking = await prisma.booking.findUnique({
      where: { id: validatedData.bookingId },
    });

    if (!booking) {
      return handleApiError(new Error('Booking not found'));
    }

    // Check if payment already exists
    const existingPayment = await prisma.payment.findUnique({
      where: { bookingId: validatedData.bookingId },
    });

    if (existingPayment) {
      return handleApiError(new Error('Payment already exists for this booking'));
    }

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        bookingId: validatedData.bookingId,
        amount: validatedData.amount,
        currency: 'INR',
        gateway: validatedData.gateway,
        paymentMethod: validatedData.paymentMethod,
        metadata: validatedData.metadata,
        status: 'PENDING',
      },
      include: {
        booking: {
          include: {
            package: true,
          },
        },
      },
    });

    return successResponse(payment, 201);
  } catch (error) {
    return handleApiError(error);
  }
}

// GET /api/payments - Get payments (Admin only)
export async function GET(request: NextRequest) {
  try {
    // TODO: Add admin authentication middleware
    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get('bookingId');
    const status = searchParams.get('status');

    const where: any = {};
    if (bookingId) {
      where.bookingId = bookingId;
    }
    if (status) {
      where.status = status;
    }

    const payments = await prisma.payment.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        booking: {
          include: {
            package: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return successResponse(payments);
  } catch (error) {
    return handleApiError(error);
  }
}

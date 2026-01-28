import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { handleApiError, successResponse } from '@/lib/api-utils';

// GET /api/bookings/[id] - Get a single booking
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: params.id },
      include: {
        package: true,
        payment: true,
      },
    });

    if (!booking) {
      return handleApiError(new Error('Booking not found'));
    }

    return successResponse(booking);
  } catch (error) {
    return handleApiError(error);
  }
}

// PUT /api/bookings/[id] - Update booking status (Admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Add admin authentication middleware
    const body = await request.json();
    const { status, paymentStatus } = body;

    const updatedBooking = await prisma.booking.update({
      where: { id: params.id },
      data: {
        ...(status && { status }),
        ...(paymentStatus && { paymentStatus }),
      },
      include: {
        package: true,
      },
    });

    return successResponse(updatedBooking);
  } catch (error) {
    return handleApiError(error);
  }
}

import { NextRequest } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { handleApiError, successResponse } from '../../../../lib/api-utils';

// GET /api/bookings/[id] - Get a single booking (optional email verification for public lookup)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email')?.trim().toLowerCase();

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

    // If email was provided (e.g. from lookup page), require it to match
    if (email && booking.email.trim().toLowerCase() !== email) {
      return NextResponse.json(
        { error: 'FORBIDDEN', message: 'Booking not found or access denied.' },
        { status: 403 }
      );
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

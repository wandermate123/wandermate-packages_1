import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { handleApiError, successResponse } from '@/lib/api-utils';

// GET /api/payments/[id] - Get a single payment
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const payment = await prisma.payment.findUnique({
      where: { id: params.id },
      include: {
        booking: {
          include: {
            package: true,
          },
        },
      },
    });

    if (!payment) {
      return handleApiError(new Error('Payment not found'));
    }

    return successResponse(payment);
  } catch (error) {
    return handleApiError(error);
  }
}

// PUT /api/payments/[id] - Update payment status (for webhooks)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { status, gatewayPaymentId, gatewayOrderId, metadata } = body;

    const updatedPayment = await prisma.payment.update({
      where: { id: params.id },
      data: {
        ...(status && { status }),
        ...(gatewayPaymentId && { gatewayPaymentId }),
        ...(gatewayOrderId && { gatewayOrderId }),
        ...(metadata && { metadata }),
      },
    });

    // Update booking payment status if payment is successful
    if (status === 'PAID') {
      await prisma.booking.update({
        where: { id: updatedPayment.bookingId },
        data: {
          paymentStatus: 'PAID',
          status: 'CONFIRMED',
        },
      });
    }

    return successResponse(updatedPayment);
  } catch (error) {
    return handleApiError(error);
  }
}

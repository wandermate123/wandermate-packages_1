import { NextRequest } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { handleApiError, successResponse, ApiError } from '../../../../lib/api-utils';

const RAZORPAY_BASE = 'https://api.razorpay.com/v1';

// POST /api/payments/create-order - Create Razorpay order for a booking
export async function POST(request: NextRequest) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return handleApiError(new ApiError(503, 'Payment gateway is not configured'));
    }

    const body = await request.json();
    const bookingId = (body.bookingId as string)?.trim();
    const email = (body.email as string)?.trim().toLowerCase();

    if (!bookingId) {
      return handleApiError(new ApiError(400, 'Booking ID is required'));
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { package: true },
    });

    if (!booking) {
      return handleApiError(new ApiError(404, 'Booking not found'));
    }

    if (email && booking.email.trim().toLowerCase() !== email) {
      return handleApiError(new ApiError(403, 'Access denied for this booking'));
    }

    if (booking.paymentStatus === 'PAID') {
      return handleApiError(new ApiError(400, 'This booking is already paid'));
    }

    const amountPaise = Math.round(Number(booking.totalPrice) * 100);
    if (amountPaise < 100) {
      return handleApiError(new ApiError(400, 'Amount must be at least ₹1'));
    }

    let payment = await prisma.payment.findUnique({
      where: { bookingId },
    });

    if (!payment) {
      payment = await prisma.payment.create({
        data: {
          bookingId,
          amount: booking.totalPrice,
          currency: 'INR',
          gateway: 'razorpay',
          status: 'PENDING',
        },
      });
    } else if (payment.status === 'PAID') {
      return handleApiError(new ApiError(400, 'Payment already completed'));
    }

    const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
    const orderRes = await fetch(`${RAZORPAY_BASE}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        amount: amountPaise,
        currency: 'INR',
        receipt: bookingId.slice(0, 40),
        notes: { bookingId, paymentId: payment.id },
      }),
    });

    if (!orderRes.ok) {
      const err = await orderRes.json().catch(() => ({}));
      console.error('[Razorpay] Create order failed:', orderRes.status, err);
      return handleApiError(
        new ApiError(502, err.error?.description || 'Could not create payment order')
      );
    }

    const razorpayOrder = (await orderRes.json()) as { id: string; amount: number; currency: string };

    await prisma.payment.update({
      where: { id: payment.id },
      data: { gatewayOrderId: razorpayOrder.id },
    });

    return successResponse({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency || 'INR',
      key: keyId,
      paymentId: payment.id,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

import { NextRequest } from 'next/server';
import crypto from 'crypto';
import { prisma } from '../../../../lib/prisma';
import { handleApiError, successResponse, ApiError } from '../../../../lib/api-utils';
import { sendPaymentConfirmations } from '../../../../lib/notifications';

// POST /api/payments/verify - Verify Razorpay payment and update booking
export async function POST(request: NextRequest) {
  try {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return handleApiError(new ApiError(503, 'Payment gateway is not configured'));
    }

    const body = await request.json();
    const {
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: signature,
      paymentId: ourPaymentId,
    } = body as {
      razorpay_order_id?: string;
      razorpay_payment_id?: string;
      razorpay_signature?: string;
      paymentId?: string;
    };

    if (!orderId || !paymentId || !signature) {
      return handleApiError(new ApiError(400, 'Missing payment verification data'));
    }

    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    if (expectedSignature !== signature) {
      return handleApiError(new ApiError(400, 'Invalid payment signature'));
    }

    const payment = await prisma.payment.findFirst({
      where: ourPaymentId ? { id: ourPaymentId } : { gatewayOrderId: orderId },
      include: { booking: true },
    });

    if (!payment) {
      return handleApiError(new ApiError(404, 'Payment record not found'));
    }

    if (payment.gatewayOrderId !== orderId) {
      return handleApiError(new ApiError(400, 'Order ID does not match'));
    }

    if (payment.status === 'PAID') {
      return successResponse({
        verified: true,
        bookingId: payment.bookingId,
        message: 'Payment already recorded',
      });
    }

    await prisma.$transaction([
      prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: 'PAID',
          gatewayPaymentId: paymentId,
        },
      }),
      prisma.booking.update({
        where: { id: payment.bookingId },
        data: {
          paymentStatus: 'PAID',
          status: 'CONFIRMED',
        },
      }),
    ]);

    // Send confirmation email and WhatsApp (non-blocking; failures logged only)
    const bookingWithPackage = await prisma.booking.findUnique({
      where: { id: payment.bookingId },
      include: {
        package: {
          select: { name: true, destination: true, duration: true },
        },
      },
    });
    if (bookingWithPackage) {
      sendPaymentConfirmations(bookingWithPackage).catch((err) => {
        console.error('[Payments] Confirmations failed:', err);
      });
    }

    return successResponse({
      verified: true,
      bookingId: payment.bookingId,
      message: 'Payment verified and booking confirmed',
    });
  } catch (error) {
    return handleApiError(error);
  }
}

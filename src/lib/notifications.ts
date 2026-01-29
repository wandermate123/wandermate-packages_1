/**
 * Post-payment notifications: email (Resend) and WhatsApp (Twilio).
 * Both are optional; failures are logged and do not block the payment flow.
 */

type BookingWithPackage = {
  id: string;
  name: string;
  email: string;
  phone: string;
  numberOfPeople: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  package: {
    name: string;
    destination: string;
    duration: string;
  } | null;
};

const RESEND_API = 'https://api.resend.com/emails';
const TWILIO_API_BASE = 'https://api.twilio.com/2010-04-01';

function formatDate(d: Date): string {
  return new Date(d).toLocaleDateString('en-IN', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/** Send booking confirmation email via Resend. No-op if RESEND_API_KEY not set. */
export async function sendConfirmationEmail(
  booking: BookingWithPackage,
  appUrl: string
): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || 'Wandermate <noreply@wandermate.com>';

  if (!apiKey) {
    console.warn('[Notifications] RESEND_API_KEY not set; skipping confirmation email');
    return { ok: false, error: 'Email not configured' };
  }

  const pkg = booking.package;
  const subject = `Booking confirmed – ${pkg?.name || 'Your trip'}`;
  const viewBookingUrl = `${appUrl.replace(/\/$/, '')}/booking?ref=${booking.id}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmed</title>
</head>
<body style="margin:0;font-family:system-ui,-apple-system,sans-serif;background:#f5f5f5;padding:24px;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
    <div style="background:#111;color:#fff;padding:24px;text-align:center;">
      <h1 style="margin:0;font-size:22px;font-weight:600;">Booking Confirmed</h1>
      <p style="margin:8px 0 0;opacity:0.9;font-size:14px;">Thank you for your payment</p>
    </div>
    <div style="padding:24px;">
      <p style="margin:0 0 16px;color:#374151;">Hi ${booking.name},</p>
      <p style="margin:0 0 20px;color:#4b5563;line-height:1.6;">Your payment was successful and your booking is confirmed. Here are the details:</p>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;">Booking reference</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-weight:600;">${booking.id}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;">Package</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">${pkg?.name ?? '—'}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;">Destination</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">${pkg?.destination ?? '—'}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;">Duration</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">${pkg?.duration ?? '—'}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;">Travelers</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">${booking.numberOfPeople}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;">Start date</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">${formatDate(booking.startDate)}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;">End date</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">${formatDate(booking.endDate)}</td></tr>
        <tr><td style="padding:10px 0;color:#6b7280;">Amount paid</td><td style="padding:10px 0;font-weight:600;">₹${Number(booking.totalPrice).toLocaleString()}</td></tr>
      </table>
      <p style="margin:0 0 20px;color:#4b5563;font-size:14px;">You can view and manage your booking anytime:</p>
      <p style="margin:0 0 24px;"><a href="${viewBookingUrl}" style="display:inline-block;background:#111;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:500;">View my booking</a></p>
      <p style="margin:0;color:#9ca3af;font-size:13px;">If you have any questions, reply to this email or contact us on WhatsApp.</p>
    </div>
    <div style="padding:16px 24px;background:#f9fafb;border-top:1px solid #e5e7eb;color:#6b7280;font-size:12px;text-align:center;">Wandermate – Curated travel experiences</div>
  </div>
</body>
</html>
  `.trim();

  try {
    const res = await fetch(RESEND_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: from.includes('<') ? from : `Wandermate <${from}>`,
        to: [booking.email],
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error('[Notifications] Resend error:', res.status, err);
      return { ok: false, error: (err as { message?: string }).message || res.statusText };
    }

    return { ok: true };
  } catch (e) {
    console.error('[Notifications] Email send failed:', e);
    return { ok: false, error: e instanceof Error ? e.message : 'Unknown error' };
  }
}

/** Normalize phone to E.164 for WhatsApp (e.g. 91XXXXXXXXXX -> +91XXXXXXXXXX). */
function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10 && digits.startsWith('6') === false) {
    return `+91${digits}`;
  }
  if (digits.length === 12 && digits.startsWith('91')) {
    return `+${digits}`;
  }
  return digits ? `+${digits}` : '';
}

/** Send booking confirmation WhatsApp message via Twilio. No-op if Twilio not configured. */
export async function sendConfirmationWhatsApp(
  booking: BookingWithPackage,
  appUrl: string
): Promise<{ ok: boolean; error?: string }> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_WHATSAPP_FROM; // e.g. whatsapp:+14155238886 (sandbox)

  if (!accountSid || !authToken || !fromNumber) {
    console.warn('[Notifications] Twilio WhatsApp not configured; skipping WhatsApp message');
    return { ok: false, error: 'WhatsApp not configured' };
  }

  const to = normalizePhone(booking.phone);
  if (!to || to.length < 10) {
    console.warn('[Notifications] Invalid phone for WhatsApp:', booking.phone);
    return { ok: false, error: 'Invalid phone number' };
  }

  const pkg = booking.package;
  const viewBookingUrl = `${appUrl.replace(/\/$/, '')}/booking?ref=${booking.id}`;

  const body = [
    `✅ *Booking confirmed!*`,
    ``,
    `Hi ${booking.name}, your payment was successful.`,
    ``,
    `*Booking reference:* ${booking.id}`,
    `*Package:* ${pkg?.name ?? '—'}`,
    `*Destination:* ${pkg?.destination ?? '—'}`,
    `*Duration:* ${pkg?.duration ?? '—'}`,
    `*Travelers:* ${booking.numberOfPeople}`,
    `*Dates:* ${formatDate(booking.startDate)} – ${formatDate(booking.endDate)}`,
    `*Amount paid:* ₹${Number(booking.totalPrice).toLocaleString()}`,
    ``,
    `View your booking: ${viewBookingUrl}`,
    ``,
    `Questions? Reply here or contact us. Have a great trip! 🧳`,
  ].join('\n');

  const url = `${TWILIO_API_BASE}/Accounts/${accountSid}/Messages.json`;
  const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');

  try {
    const params = new URLSearchParams({
      To: `whatsapp:${to}`,
      From: fromNumber.startsWith('whatsapp:') ? fromNumber : `whatsapp:${fromNumber}`,
      Body: body,
    });

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error('[Notifications] Twilio WhatsApp error:', res.status, err);
      return { ok: false, error: (err as { message?: string }).message || res.statusText };
    }

    return { ok: true };
  } catch (e) {
    console.error('[Notifications] WhatsApp send failed:', e);
    return { ok: false, error: e instanceof Error ? e.message : 'Unknown error' };
  }
}

/** Send both email and WhatsApp confirmation. Runs in parallel; logs errors only. */
export async function sendPaymentConfirmations(
  booking: BookingWithPackage
): Promise<void> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const [emailResult, whatsappResult] = await Promise.all([
    sendConfirmationEmail(booking, appUrl),
    sendConfirmationWhatsApp(booking, appUrl),
  ]);

  if (!emailResult.ok && emailResult.error !== 'Email not configured') {
    console.error('[Notifications] Confirmation email failed:', emailResult.error);
  }
  if (!whatsappResult.ok && whatsappResult.error !== 'WhatsApp not configured') {
    console.error('[Notifications] Confirmation WhatsApp failed:', whatsappResult.error);
  }
}

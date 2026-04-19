import { NextRequest, NextResponse } from 'next/server';

/**
 * PayPal webhook handler (optional but recommended for production).
 *
 * Setup:
 *   1. In PayPal Developer Dashboard → your app → Webhooks → add URL:
 *        https://skillmint.courses/api/paypal/webhook
 *   2. Subscribe to events: PAYMENT.CAPTURE.COMPLETED, PAYMENT.CAPTURE.REFUNDED,
 *      PAYMENT.CAPTURE.DENIED, CHECKOUT.ORDER.APPROVED
 *   3. Copy the webhook ID and set PAYPAL_WEBHOOK_ID in .env
 *   4. Verify incoming events via POST /v1/notifications/verify-webhook-signature
 *      (implementation left as a TODO — see docs linked below).
 *
 * Docs: https://developer.paypal.com/api/rest/webhooks/
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const eventType = body.event_type as string;

    // TODO: verify webhook signature before trusting the payload.
    //       See: https://developer.paypal.com/api/rest/webhooks/rest/#link-listeningforwebhooksevents
    //       Without verification, this endpoint should only log events.

    console.log('[PayPal webhook]', eventType, body.resource?.id);

    switch (eventType) {
      case 'PAYMENT.CAPTURE.COMPLETED':
        // Enrollment is already created in /capture-order — this is a safety net.
        break;
      case 'PAYMENT.CAPTURE.REFUNDED':
      case 'PAYMENT.CAPTURE.REVERSED':
        // TODO: mark enrollment refunded / revoke access.
        break;
      case 'PAYMENT.CAPTURE.DENIED':
        // TODO: mark payment denied.
        break;
      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('PayPal webhook error:', err);
    return NextResponse.json(
      { error: err.message || 'Webhook processing failed' },
      { status: 500 },
    );
  }
}

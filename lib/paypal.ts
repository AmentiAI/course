/**
 * PayPal REST API helpers — thin wrapper around the Orders v2 API.
 *
 * Setup:
 *   1. Create an app at https://developer.paypal.com/dashboard/applications
 *   2. Copy Client ID + Secret (sandbox first, then live)
 *   3. Add to .env:
 *        PAYPAL_CLIENT_ID=...
 *        PAYPAL_SECRET=...
 *        NEXT_PUBLIC_PAYPAL_CLIENT_ID=...       (same as above, exposed to client)
 *        PAYPAL_MODE=sandbox                    (or "live")
 *        NEXTAUTH_URL=https://skillmint.courses (used for return/cancel URLs)
 */

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || '';
const PAYPAL_SECRET = process.env.PAYPAL_SECRET || '';
const PAYPAL_MODE = process.env.PAYPAL_MODE === 'live' ? 'live' : 'sandbox';

export const PAYPAL_API_BASE =
  PAYPAL_MODE === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';

export function isPaypalConfigured(): boolean {
  return PAYPAL_CLIENT_ID.length > 0 && PAYPAL_SECRET.length > 0;
}

export async function getPaypalAccessToken(): Promise<string> {
  if (!isPaypalConfigured()) {
    throw new Error('PayPal credentials not configured');
  }
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString('base64');
  const res = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayPal auth failed: ${res.status} ${text}`);
  }
  const data = await res.json();
  return data.access_token as string;
}

interface CreateOrderArgs {
  amountUsd: number;
  courseId: string;
  returnUrl: string;
  cancelUrl: string;
  description?: string;
}

export async function createPaypalOrder(args: CreateOrderArgs) {
  const token = await getPaypalAccessToken();
  const res = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: args.courseId,
          description: args.description?.slice(0, 127),
          amount: {
            currency_code: 'USD',
            value: args.amountUsd.toFixed(2),
          },
        },
      ],
      application_context: {
        brand_name: 'SkillMint',
        shipping_preference: 'NO_SHIPPING',
        user_action: 'PAY_NOW',
        return_url: args.returnUrl,
        cancel_url: args.cancelUrl,
      },
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayPal order create failed: ${res.status} ${text}`);
  }
  return (await res.json()) as {
    id: string;
    status: string;
    links: { href: string; rel: string; method: string }[];
  };
}

export async function capturePaypalOrder(orderId: string) {
  const token = await getPaypalAccessToken();
  const res = await fetch(
    `${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayPal capture failed: ${res.status} ${text}`);
  }
  return await res.json();
}

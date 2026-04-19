import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { capturePaypalOrder, isPaypalConfigured } from '@/lib/paypal';
import { trackEvent } from '@/lib/events';

/**
 * PayPal redirects the buyer to this route with ?token=<orderId>&PayerID=<id>
 * (plus any params we passed to create-order, e.g. courseSlug / courseId).
 *
 * We capture the order server-side, grant enrollment, then redirect the user
 * into their course.
 */
export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const token = url.searchParams.get('token');
  const courseSlug = url.searchParams.get('courseSlug') || '';
  const courseId = url.searchParams.get('courseId') || '';

  const redirectFail = (msg: string) =>
    NextResponse.redirect(
      `${url.origin}/checkout/${courseId}?error=${encodeURIComponent(msg)}`,
    );

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.redirect(`${url.origin}/auth/signin`);
    }
    if (!token) return redirectFail('Missing PayPal order token');
    if (!isPaypalConfigured()) return redirectFail('PayPal not configured');

    const capture = await capturePaypalOrder(token);

    if (capture.status !== 'COMPLETED') {
      return redirectFail(`Payment not completed (status: ${capture.status})`);
    }

    const purchaseUnit = capture.purchase_units?.[0];
    const captureId = purchaseUnit?.payments?.captures?.[0]?.id;
    const captureAmount = parseFloat(
      purchaseUnit?.payments?.captures?.[0]?.amount?.value || '0',
    );

    if (!courseId) return redirectFail('Missing courseId');

    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) return redirectFail('Course not found');

    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: { userId: session.user.id, courseId },
      },
    });

    if (!existingEnrollment) {
      await prisma.$transaction([
        prisma.enrollment.create({
          data: {
            userId: session.user.id,
            courseId,
            paymentMethod: 'paypal',
            paymentStatus: 'completed',
          },
        }),
        prisma.payment.create({
          data: {
            userId: session.user.id,
            courseId,
            txHash: captureId || token,
            currency: 'USD',
            chain: 'paypal',
            amount: Math.round(captureAmount * 100),
            usdAmount: course.price,
            status: 'CONFIRMED',
            paymentAddress: 'paypal',
            confirmedAt: new Date(),
          },
        }),
      ]);

      await trackEvent({
        type: 'PAYMENT_CONFIRM',
        userId: session.user.id,
        courseId,
        metadata: { method: 'paypal', amount: captureAmount, captureId },
      });
      await trackEvent({
        type: 'ENROLLMENT',
        userId: session.user.id,
        courseId,
        metadata: { method: 'paypal' },
      });
    }

    return NextResponse.redirect(
      `${url.origin}/learn/${courseSlug || course.slug}`,
    );
  } catch (err: any) {
    console.error('PayPal capture error:', err);
    return redirectFail(err.message || 'PayPal capture failed');
  }
}

/**
 * Optional alternate flow: capture via POST (if you're using the PayPal JS SDK
 * client-side and want to capture from the browser).
 */
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!isPaypalConfigured()) {
      return NextResponse.json({ error: 'PayPal not configured' }, { status: 503 });
    }

    const { orderId, courseId } = await req.json();
    if (!orderId || !courseId) {
      return NextResponse.json(
        { error: 'Missing orderId or courseId' },
        { status: 400 },
      );
    }

    const capture = await capturePaypalOrder(orderId);

    if (capture.status !== 'COMPLETED') {
      return NextResponse.json(
        { error: `Payment not completed (${capture.status})` },
        { status: 400 },
      );
    }

    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    const captureId =
      capture.purchase_units?.[0]?.payments?.captures?.[0]?.id || orderId;
    const captureAmount = parseFloat(
      capture.purchase_units?.[0]?.payments?.captures?.[0]?.amount?.value || '0',
    );

    const existing = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: { userId: session.user.id, courseId },
      },
    });

    if (!existing) {
      await prisma.$transaction([
        prisma.enrollment.create({
          data: {
            userId: session.user.id,
            courseId,
            paymentMethod: 'paypal',
            paymentStatus: 'completed',
          },
        }),
        prisma.payment.create({
          data: {
            userId: session.user.id,
            courseId,
            txHash: captureId,
            currency: 'USD',
            chain: 'paypal',
            amount: Math.round(captureAmount * 100),
            usdAmount: course.price,
            status: 'CONFIRMED',
            paymentAddress: 'paypal',
            confirmedAt: new Date(),
          },
        }),
      ]);

      await trackEvent({
        type: 'PAYMENT_CONFIRM',
        userId: session.user.id,
        courseId,
        metadata: { method: 'paypal', amount: captureAmount, captureId },
      });
      await trackEvent({
        type: 'ENROLLMENT',
        userId: session.user.id,
        courseId,
        metadata: { method: 'paypal' },
      });
    }

    return NextResponse.json({ success: true, courseSlug: course.slug });
  } catch (err: any) {
    console.error('PayPal capture error:', err);
    return NextResponse.json(
      { error: err.message || 'PayPal capture failed' },
      { status: 500 },
    );
  }
}

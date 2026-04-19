import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { createPaypalOrder, isPaypalConfigured } from '@/lib/paypal';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!isPaypalConfigured()) {
      return NextResponse.json(
        {
          error:
            'PayPal is not configured yet. Add PAYPAL_CLIENT_ID and PAYPAL_SECRET to your environment variables.',
        },
        { status: 503 },
      );
    }

    const { courseId } = await req.json();
    if (!courseId) {
      return NextResponse.json({ error: 'Missing courseId' }, { status: 400 });
    }

    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    const existing = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: { userId: session.user.id, courseId },
      },
    });
    if (existing) {
      return NextResponse.json({ error: 'Already enrolled' }, { status: 400 });
    }

    const baseUrl =
      process.env.NEXTAUTH_URL || req.nextUrl.origin || 'https://skillmint.courses';

    const order = await createPaypalOrder({
      amountUsd: course.price,
      courseId,
      description: `SkillMint — ${course.title}`,
      returnUrl: `${baseUrl}/api/paypal/capture-order?courseSlug=${course.slug}&courseId=${course.id}`,
      cancelUrl: `${baseUrl}/checkout/${course.id}?cancelled=1`,
    });

    const approvalUrl = order.links.find((l) => l.rel === 'approve')?.href;

    if (!approvalUrl) {
      return NextResponse.json(
        { error: 'PayPal did not return an approval URL' },
        { status: 502 },
      );
    }

    return NextResponse.json({
      orderId: order.id,
      approvalUrl,
    });
  } catch (err: any) {
    console.error('PayPal create-order error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to create PayPal order' },
      { status: 500 },
    );
  }
}

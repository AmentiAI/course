import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const DUST_LIMIT = 600; // 600 sats minimum

interface MempoolTransaction {
  txid: string;
  vout: Array<{
    scriptpubkey_address: string;
    value: number;
  }>;
  status: {
    confirmed: boolean;
    block_height?: number;
  };
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { txid, courseId, expectedAmount, paymentAddress } = await req.json();

    if (!txid || !courseId || !expectedAmount || !paymentAddress) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if already enrolled
    const existing = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId,
        },
      },
    });

    if (existing) {
      return NextResponse.json({
        success: true,
        message: 'Already enrolled',
        alreadyEnrolled: true,
      });
    }

    // Fetch transaction from mempool.space API
    const txResponse = await fetch(
      `https://mempool.space/api/tx/${txid}`,
      { cache: 'no-store' }
    );

    if (!txResponse.ok) {
      return NextResponse.json(
        { error: 'Transaction not found in mempool' },
        { status: 404 }
      );
    }

    const tx: MempoolTransaction = await txResponse.json();

    // Check if transaction has our payment address with correct amount
    const ourOutput = tx.vout.find(
      (output) => output.scriptpubkey_address === paymentAddress
    );

    if (!ourOutput) {
      return NextResponse.json(
        { error: 'Payment address not found in transaction' },
        { status: 400 }
      );
    }

    // Check dust limit
    if (ourOutput.value < DUST_LIMIT) {
      return NextResponse.json(
        { error: `Payment too small. Minimum ${DUST_LIMIT} sats required.` },
        { status: 400 }
      );
    }

    // Verify amount (allow 1% tolerance for price fluctuation during payment)
    const tolerance = expectedAmount * 0.01;
    if (ourOutput.value < expectedAmount - tolerance) {
      return NextResponse.json(
        {
          error: 'Insufficient payment',
          expected: expectedAmount,
          received: ourOutput.value,
        },
        { status: 400 }
      );
    }

    // Check if in mempool (confirmed or unconfirmed)
    // For immediate access, we accept mempool confirmation
    // For extra security, you could require tx.status.confirmed === true

    // Check if this txid was already used
    const existingPayment = await prisma.payment.findUnique({
      where: { txHash: txid },
    });

    if (existingPayment) {
      return NextResponse.json(
        { error: 'This transaction has already been used' },
        { status: 400 }
      );
    }

    // Get course details
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // Create enrollment and record payment
    await prisma.$transaction([
      prisma.enrollment.create({
        data: {
          userId: session.user.id,
          courseId,
          paymentMethod: 'bitcoin',
          paymentStatus: 'completed',
        },
      }),
      prisma.payment.create({
        data: {
          userId: session.user.id,
          courseId,
          txHash: txid,
          currency: 'BTC',
          chain: 'bitcoin',
          amount: ourOutput.value,
          usdAmount: course.price,
          status: tx.status.confirmed ? 'CONFIRMED' : 'PENDING',
          paymentAddress,
          confirmedAt: tx.status.confirmed ? new Date() : null,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: 'Payment verified and enrollment successful!',
      txid,
      confirmed: tx.status.confirmed,
    });
  } catch (error) {
    console.error('BTC verification error:', error);
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    );
  }
}

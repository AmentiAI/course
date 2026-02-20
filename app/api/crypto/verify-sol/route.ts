import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

// Use public RPC endpoint (or set SOLANA_RPC_URL in env for faster/private RPC)
const SOLANA_RPC = process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { signature, courseId, expectedAmount, paymentAddress } = await req.json();

    if (!signature || !courseId || !expectedAmount || !paymentAddress) {
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

    // Connect to Solana network
    const connection = new Connection(SOLANA_RPC, 'confirmed');

    // Fetch transaction details
    const tx = await connection.getTransaction(signature, {
      maxSupportedTransactionVersion: 0,
    });

    if (!tx) {
      return NextResponse.json(
        { error: 'Transaction not found on Solana network' },
        { status: 404 }
      );
    }

    // Verify transaction succeeded
    if (tx.meta?.err) {
      return NextResponse.json(
        { error: 'Transaction failed on-chain' },
        { status: 400 }
      );
    }

    // Get payment address public key
    const paymentPubkey = new PublicKey(paymentAddress);

    // Find the account index for our payment address
    const accountKeys = tx.transaction.message.getAccountKeys();
    const paymentIndex = accountKeys.staticAccountKeys.findIndex((key) =>
      key.equals(paymentPubkey)
    );

    if (paymentIndex === -1) {
      return NextResponse.json(
        { error: 'Payment address not found in transaction' },
        { status: 400 }
      );
    }

    // Calculate amount received by checking pre/post balances
    const preBalance = tx.meta?.preBalances[paymentIndex] || 0;
    const postBalance = tx.meta?.postBalances[paymentIndex] || 0;
    const amountReceived = postBalance - preBalance;

    if (amountReceived <= 0) {
      return NextResponse.json(
        { error: 'No SOL received at payment address' },
        { status: 400 }
      );
    }

    // Convert lamports to SOL
    const solReceived = amountReceived / LAMPORTS_PER_SOL;

    // Verify amount (allow 1% tolerance for price fluctuation)
    const tolerance = expectedAmount * 0.01;
    if (solReceived < expectedAmount - tolerance) {
      return NextResponse.json(
        {
          error: 'Insufficient payment',
          expected: expectedAmount,
          received: solReceived,
        },
        { status: 400 }
      );
    }

    // Check if this signature was already used
    const existingPayment = await prisma.payment.findUnique({
      where: { txHash: signature },
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
          paymentMethod: 'solana',
          paymentStatus: 'completed',
        },
      }),
      prisma.payment.create({
        data: {
          userId: session.user.id,
          courseId,
          txHash: signature,
          currency: 'SOL',
          chain: 'solana',
          amount: solReceived, // Store SOL amount
          usdAmount: course.price,
          status: 'CONFIRMED',
          paymentAddress,
          confirmedAt: new Date(),
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: 'Payment verified and enrollment successful!',
      signature,
      solReceived,
    });
  } catch (error) {
    console.error('SOL verification error:', error);
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    );
  }
}

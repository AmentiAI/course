import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const ADMIN_SECRET = 'seed-database-2026';

export async function POST(req: NextRequest) {
  try {
    const { secret } = await req.json();

    if (secret !== ADMIN_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('Adding $5 test course...');

    // Check if test course already exists
    const existing = await prisma.course.findUnique({
      where: { slug: 'test-payment-course' },
    });

    if (existing) {
      return NextResponse.json({
        message: 'Test course already exists',
        courseId: existing.id,
        url: `/courses/test-payment-course`,
      });
    }

    // Create test course
    const course = await prisma.course.create({
      data: {
        slug: 'test-payment-course',
        title: 'Payment Test Course - $5',
        shortDesc: 'Quick test course for crypto payment verification',
        description: 'This is a test course for verifying Bitcoin and Solana payment integration. Only $5 to test the full payment flow!',
        introduction: '# Payment Test Course\n\nThis course is designed for testing the crypto payment system.\n\n## What You\'ll Get\n- Quick access for payment testing\n- Full payment flow verification\n- Instant enrollment after payment\n\nPerfect for testing Bitcoin wallet integration!',
        thumbnail: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800',
        banner: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1200',
        price: 5,
        originalPrice: 10,
        category: 'Testing',
        level: 'BEGINNER',
        language: 'English',
        tags: ['test', 'payment', 'bitcoin', 'crypto'],
        isFeatured: true,
        isPublished: true,
        totalLessons: 3,
        totalHours: 0.5,
      },
    });

    // Create a module
    const module = await prisma.module.create({
      data: {
        courseId: course.id,
        title: 'Test Module',
        order: 1,
      },
    });

    // Create 3 test lessons
    await prisma.lesson.createMany({
      data: [
        {
          moduleId: module.id,
          title: 'Welcome to Payment Testing',
          content: `# Welcome!

This is a test course for verifying the crypto payment system.

## What We're Testing
- Bitcoin wallet connection (LaserEyes)
- Transaction signing
- Mempool verification
- Automatic enrollment

## How to Test
1. Go to checkout
2. Select Bitcoin
3. Connect your wallet (Unisat/Xverse)
4. Sign the transaction
5. Wait for mempool confirmation
6. You're enrolled!

The price is only $5 (~7,500 sats at current prices) so you can test without spending much.`,
          duration: 10,
          order: 1,
          isFree: true,
        },
        {
          moduleId: module.id,
          title: 'Payment Flow Explained',
          content: `# Payment Flow

Here's what happens behind the scenes:

## Step 1: Price Calculation
- Fetches live BTC/USD price from CoinGecko
- Converts $5 to sats (e.g., $5 / $67,926 = 0.0000736 BTC = 7,360 sats)

## Step 2: Wallet Connection
- User clicks "Connect Bitcoin Wallet"
- Selects wallet type (Unisat, Xverse, etc.)
- LaserEyes handles the connection

## Step 3: Transaction
- Pre-filled with amount and address
- User signs in their wallet
- Transaction broadcasts to Bitcoin network

## Step 4: Verification
- Backend polls mempool.space API
- Checks transaction exists
- Verifies amount ≥ expected (with 1% tolerance)
- Confirms payment address matches

## Step 5: Enrollment
- Creates Enrollment record
- Creates Payment record with txid
- Redirects to course
- User has instant access!`,
          duration: 10,
          order: 2,
          isFree: false,
        },
        {
          moduleId: module.id,
          title: 'Congratulations!',
          content: `# You Did It! 🎉

If you're reading this, the payment system worked perfectly!

## What Just Happened
- ✅ Wallet connected successfully
- ✅ Transaction signed and broadcast
- ✅ Payment verified on-chain
- ✅ Enrollment created
- ✅ Access granted instantly

## Technical Details
Check the Payment table in the database to see your transaction record:
- txHash: Your Bitcoin transaction ID
- amount: Sats you paid
- status: CONFIRMED or PENDING
- confirmedAt: Timestamp of verification

## Next Steps
This test course confirms the payment system is working. You can now:
- Add more payment methods (Solana, Lightning)
- Customize the checkout flow
- Add receipt emails
- Build payment history pages

Thanks for testing! 🚀`,
          duration: 10,
          order: 3,
          isFree: false,
        },
      ],
    });

    // Create discussion
    await prisma.discussion.create({
      data: {
        courseId: course.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Test course added successfully!',
      course: {
        id: course.id,
        slug: course.slug,
        title: course.title,
        price: course.price,
      },
      url: `/courses/test-payment-course`,
    });
  } catch (error: any) {
    console.error('Error adding test course:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to add test course' },
      { status: 500 }
    );
  }
}

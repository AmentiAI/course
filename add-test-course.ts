import { prisma } from './lib/prisma';

async function addTestCourse() {
  console.log('Adding $5 test course...');

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
      isFeatured: false,
      isPublished: true,
      totalLessons: 3,
      totalHours: 0.5,
    },
  });

  console.log('Course created:', course.id);

  // Create a module
  const module = await prisma.module.create({
    data: {
      courseId: course.id,
      title: 'Test Module',
      description: 'Quick test lessons',
      order: 1,
    },
  });

  console.log('Module created:', module.id);

  // Create 3 test lessons
  const lessons = await prisma.lesson.createMany({
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

  console.log('Created 3 lessons');

  // Create discussion
  const discussion = await prisma.discussion.create({
    data: {
      courseId: course.id,
      title: 'Test Course Discussion',
    },
  });

  console.log('Discussion created:', discussion.id);
  console.log('\n✅ Test course added successfully!');
  console.log(`Course URL: /courses/test-payment-course`);
  console.log(`Price: $${course.price}`);
}

addTestCourse()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  });

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { trackEvent } from "@/lib/events";

async function verifyBtcTransaction(
  txHash: string,
  expectedAmount: number
): Promise<boolean> {
  try {
    const res = await fetch(`https://mempool.space/api/tx/${txHash}`);
    const data = await res.json();
    if (!data || !data.vout) return false;

    const treasury = process.env.BTC_TREASURY!;
    const received = data.vout
      .filter((o: any) => o.scriptpubkey_address === treasury)
      .reduce((sum: number, o: any) => sum + o.value, 0);

    const btcReceived = received / 1e8;
    return btcReceived >= expectedAmount * 0.98;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { courseId, txHash, chain, amountCrypto } = await req.json();

  if (!courseId || !txHash || !chain || !amountCrypto) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (chain !== "BTC") {
    return NextResponse.json(
      { error: "Unsupported chain. Only BTC is accepted." },
      { status: 400 }
    );
  }

  const course = await prisma.course.findUnique({ where: { id: courseId } });
  if (!course)
    return NextResponse.json({ error: "Course not found" }, { status: 404 });

  const existingPayment = await prisma.payment.findFirst({
    where: { txHash, status: "CONFIRMED" },
  });
  if (existingPayment) {
    return NextResponse.json(
      { error: "Transaction already used" },
      { status: 400 }
    );
  }

  const valid = await verifyBtcTransaction(txHash, parseFloat(amountCrypto));

  if (!valid) {
    await prisma.payment.create({
      data: {
        userId: session.user.id,
        courseId,
        amount: course.price,
        currency: chain,
        chain,
        txHash,
        status: "FAILED",
      },
    });
    return NextResponse.json(
      {
        error:
          "Transaction not verified. Please check the tx hash and try again.",
      },
      { status: 400 }
    );
  }

  await prisma.payment.create({
    data: {
      userId: session.user.id,
      courseId,
      amount: course.price,
      currency: chain,
      chain,
      txHash,
      status: "CONFIRMED",
      confirmedAt: new Date(),
    },
  });

  await prisma.enrollment.upsert({
    where: { userId_courseId: { userId: session.user.id, courseId } },
    create: { userId: session.user.id, courseId },
    update: {},
  });

  await trackEvent({
    type: "PAYMENT_CONFIRM",
    userId: session.user.id,
    courseId,
    metadata: { amount: course.price, currency: chain, chain, txHash },
  });
  await trackEvent({
    type: "ENROLLMENT",
    userId: session.user.id,
    courseId,
    metadata: { method: "crypto" },
  });

  await prisma.notification.create({
    data: {
      userId: session.user.id,
      title: "Enrollment confirmed",
      message: `You're now enrolled in "${course.title}". Start learning now.`,
      link: `/courses/${course.slug}`,
    },
  });

  return NextResponse.json({
    ok: true,
    message: "Payment confirmed. You are now enrolled.",
  });
}

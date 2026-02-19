import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const HELIUS_RPC = process.env.SOLANA_RPC_URL!;

async function verifySolTransaction(txHash: string, expectedAmount: number): Promise<boolean> {
  try {
    const res = await fetch(HELIUS_RPC, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getTransaction",
        params: [txHash, { encoding: "jsonParsed", maxSupportedTransactionVersion: 0 }],
      }),
    });
    const data = await res.json();
    if (!data.result) return false;

    const treasury = process.env.SOL_TREASURY!;
    const accountKeys = data.result.transaction?.message?.accountKeys ?? [];
    const postBalances = data.result.meta?.postBalances ?? [];
    const preBalances = data.result.meta?.preBalances ?? [];

    const treasuryIndex = accountKeys.findIndex(
      (k: any) => (typeof k === "string" ? k : k.pubkey) === treasury
    );

    if (treasuryIndex === -1) return false;

    const received = (postBalances[treasuryIndex] - preBalances[treasuryIndex]) / 1e9;
    return received >= expectedAmount * 0.98; // 2% slippage tolerance
  } catch {
    return false;
  }
}

async function verifyBtcTransaction(txHash: string, expectedAmount: number): Promise<boolean> {
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

  const course = await prisma.course.findUnique({ where: { id: courseId } });
  if (!course) return NextResponse.json({ error: "Course not found" }, { status: 404 });

  // Check for duplicate
  const existingPayment = await prisma.payment.findFirst({
    where: { txHash, status: "CONFIRMED" },
  });
  if (existingPayment) {
    return NextResponse.json({ error: "Transaction already used" }, { status: 400 });
  }

  // Verify on-chain
  let valid = false;
  if (chain === "SOL") {
    valid = await verifySolTransaction(txHash, parseFloat(amountCrypto));
  } else if (chain === "BTC") {
    valid = await verifyBtcTransaction(txHash, parseFloat(amountCrypto));
  }

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
      { error: "Transaction not verified. Please check the tx hash and try again." },
      { status: 400 }
    );
  }

  // Confirm payment
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

  // Create enrollment
  await prisma.enrollment.upsert({
    where: { userId_courseId: { userId: session.user.id, courseId } },
    create: { userId: session.user.id, courseId },
    update: {},
  });

  // Notification
  await prisma.notification.create({
    data: {
      userId: session.user.id,
      title: "Enrollment Confirmed! 🎉",
      message: `You're now enrolled in "${course.title}". Start learning now!`,
      link: `/courses/${course.slug}`,
    },
  });

  return NextResponse.json({ ok: true, message: "Payment confirmed! You are now enrolled." });
}

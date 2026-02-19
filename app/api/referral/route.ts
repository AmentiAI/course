import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createHash } from "crypto";

// GET /api/referral - get current user's referral code and stats
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Generate deterministic referral code from userId
  const code = createHash("sha256")
    .update(session.user.id)
    .digest("hex")
    .slice(0, 8)
    .toUpperCase();

  const referralUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://coursehub-gold.vercel.app"}/r/${code}`;

  return NextResponse.json({
    code,
    referralUrl,
    stats: {
      referrals: 0,
      earnings: 0,
      // TODO: implement actual tracking once Referral model is added to schema
    },
  });
}

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { courseId, rating, comment } = await req.json();

  if (!courseId || !rating || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  // Only enrolled students can review
  const enrollment = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId: session.user.id, courseId } },
  });

  if (!enrollment) {
    return NextResponse.json(
      { error: "You must be enrolled to leave a review" },
      { status: 403 }
    );
  }

  const review = await prisma.review.upsert({
    where: { userId_courseId: { userId: session.user.id, courseId } },
    create: {
      userId: session.user.id,
      courseId,
      rating,
      comment: comment || "",
    },
    update: { rating, comment: comment || "" },
  });

  return NextResponse.json({ review });
}

export async function GET(req: NextRequest) {
  const courseId = req.nextUrl.searchParams.get("courseId");
  if (!courseId) {
    return NextResponse.json({ reviews: [] });
  }

  const reviews = await prisma.review.findMany({
    where: { courseId },
    include: {
      user: { select: { name: true, image: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return NextResponse.json({ reviews });
}

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { courseId } = await req.json();

  const existing = await prisma.wishlist.findUnique({
    where: { userId_courseId: { userId: session.user.id, courseId } },
  });

  if (existing) {
    await prisma.wishlist.delete({
      where: { userId_courseId: { userId: session.user.id, courseId } },
    });
    return NextResponse.json({ wishlisted: false });
  }

  await prisma.wishlist.create({
    data: { userId: session.user.id, courseId },
  });

  return NextResponse.json({ wishlisted: true });
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ items: [] });
  }

  const items = await prisma.wishlist.findMany({
    where: { userId: session.user.id },
    include: {
      course: {
        include: {
          _count: { select: { enrollments: true, reviews: true } },
          reviews: { select: { rating: true } },
        },
      },
    },
  });

  return NextResponse.json({ items });
}

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import CheckoutClient from "./CheckoutClient";

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect(`/auth/signin?redirect=/checkout/${courseId}`);
  }

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    select: {
      id: true,
      title: true,
      shortDesc: true,
      thumbnail: true,
      price: true,
      originalPrice: true,
      slug: true,
      totalLessons: true,
      totalHours: true,
      level: true,
    },
  });

  if (!course) notFound();

  // Check if already enrolled
  const existing = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId: session.user.id, courseId } },
  });

  if (existing) {
    redirect(`/learn/${course.slug}`);
  }

  return (
    <CheckoutClient
      course={course}
      btcAddress={process.env.BTC_TREASURY!}
      solAddress={process.env.SOL_TREASURY!}
    />
  );
}

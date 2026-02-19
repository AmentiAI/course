import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { lessonId, courseId } = await req.json();

  // Upsert progress
  await prisma.lessonProgress.upsert({
    where: { userId_lessonId: { userId: session.user.id, lessonId } },
    create: {
      userId: session.user.id,
      lessonId,
      completed: true,
      completedAt: new Date(),
    },
    update: { completed: true, completedAt: new Date() },
  });

  // Calculate course progress
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      modules: { include: { lessons: { select: { id: true } } } },
    },
  });

  if (!course) return NextResponse.json({ ok: true });

  const allLessonIds = course.modules.flatMap((m) => m.lessons.map((l) => l.id));
  const completedCount = await prisma.lessonProgress.count({
    where: {
      userId: session.user.id,
      lessonId: { in: allLessonIds },
      completed: true,
    },
  });

  const progressPct = Math.round((completedCount / allLessonIds.length) * 100);

  await prisma.enrollment.update({
    where: { userId_courseId: { userId: session.user.id, courseId } },
    data: { progress: progressPct },
  });

  // Issue certificate if 100%
  let courseCompleted = false;
  if (progressPct === 100) {
    await prisma.certificate.upsert({
      where: { userId_courseId: { userId: session.user.id, courseId } },
      create: { userId: session.user.id, courseId },
      update: {},
    });
    await prisma.enrollment.update({
      where: { userId_courseId: { userId: session.user.id, courseId } },
      data: { completedAt: new Date() },
    });
    courseCompleted = true;

    // Notification
    await prisma.notification.create({
      data: {
        userId: session.user.id,
        title: "Course Completed! 🎉",
        message: `Congratulations! You've completed "${course.title}" and earned your certificate.`,
        link: `/dashboard`,
      },
    });
  }

  return NextResponse.json({ ok: true, progress: progressPct, courseCompleted });
}

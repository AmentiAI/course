import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Find free lessons
    const freeLessons = await prisma.lesson.findMany({
      where: { isFree: true },
      include: { quiz: true },
      take: 5,
      select: {
        id: true,
        title: true,
        isFree: true,
        quiz: { select: { id: true } }
      }
    });
    
    // Count stats
    const totalLessons = await prisma.lesson.count();
    const lessonsWithQuiz = await prisma.quiz.count();
    const freeLessonsCount = await prisma.lesson.count({ where: { isFree: true } });
    const paidLessons = totalLessons - freeLessonsCount;
    
    return NextResponse.json({
      freeLessons: freeLessons.map(l => ({
        title: l.title,
        isFree: l.isFree,
        hasQuiz: !!l.quiz
      })),
      stats: {
        totalLessons,
        freeLessons: freeLessonsCount,
        paidLessons,
        lessonsWithQuiz,
        expectedQuizzes: paidLessons,
        correct: lessonsWithQuiz === paidLessons
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { trackEvent } from '@/lib/events';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { lessonId, answers, score } = await req.json();

    if (!lessonId || !answers || typeof score !== 'number') {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get the quiz for this lesson
    const quiz = await prisma.quiz.findUnique({
      where: { lessonId },
    });

    if (!quiz) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
    }

    const attempt = await prisma.quizAttempt.create({
      data: {
        userId: session.user.id,
        quizId: quiz.id,
        score,
        answers,
      },
    });

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { module: { select: { courseId: true } } },
    });

    await trackEvent({
      type: score >= 80 ? "QUIZ_PASS" : "QUIZ_FAIL",
      userId: session.user.id,
      courseId: lesson?.module.courseId,
      lessonId,
      metadata: { score, quizId: quiz.id, attemptId: attempt.id },
    });

    if (score >= 80) {
      if (lesson) {
        await prisma.lessonProgress.upsert({
          where: {
            userId_lessonId: {
              userId: session.user.id,
              lessonId,
            },
          },
          create: {
            userId: session.user.id,
            lessonId,
            completed: true,
            completedAt: new Date(),
          },
          update: {
            completed: true,
            completedAt: new Date(),
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      attemptId: attempt.id,
      score,
      passed: score >= 80,
    });
  } catch (error) {
    console.error('Quiz submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit quiz' },
      { status: 500 }
    );
  }
}

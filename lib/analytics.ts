import { prisma } from "@/lib/prisma";
import type { EventType, Prisma } from "@prisma/client";

export type DailyPoint = { day: string; count: number };

function rangeStart(days: number): Date {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  d.setUTCDate(d.getUTCDate() - (days - 1));
  return d;
}

/**
 * Time-series of events of a given type, one row per day for the last N days.
 * Missing days are filled with zero so the chart has a continuous x-axis.
 */
export async function getDailyEventCounts(
  type: EventType,
  days = 30,
): Promise<DailyPoint[]> {
  const start = rangeStart(days);
  const rows = await prisma.$queryRaw<
    { day: Date; count: bigint }[]
  >`SELECT date_trunc('day', "createdAt") AS day, COUNT(*)::bigint AS count
    FROM "Event"
    WHERE "type" = ${type}::"EventType"
      AND "createdAt" >= ${start}
    GROUP BY day
    ORDER BY day ASC`;

  const byDay = new Map<string, number>();
  for (const r of rows) {
    byDay.set(r.day.toISOString().slice(0, 10), Number(r.count));
  }

  const out: DailyPoint[] = [];
  for (let i = 0; i < days; i++) {
    const d = new Date(start);
    d.setUTCDate(start.getUTCDate() + i);
    const key = d.toISOString().slice(0, 10);
    out.push({ day: key, count: byDay.get(key) ?? 0 });
  }
  return out;
}

export type FunnelStage = {
  key: string;
  label: string;
  count: number;
};

/**
 * Distinct-user counts at each funnel stage over the last N days.
 * SIGNUP → COURSE_VIEW → ENROLLMENT → LESSON_COMPLETE → CERTIFICATE_ISSUED
 */
export async function getFunnel(days = 30): Promise<FunnelStage[]> {
  const start = rangeStart(days);
  const types: EventType[] = [
    "SIGNUP",
    "COURSE_VIEW",
    "ENROLLMENT",
    "LESSON_COMPLETE",
    "CERTIFICATE_ISSUED",
  ];
  const labels: Record<EventType, string> = {
    SIGNUP: "Admitted",
    COURSE_VIEW: "Browsed",
    ENROLLMENT: "Enrolled",
    LESSON_COMPLETE: "Studied",
    CERTIFICATE_ISSUED: "Conferred",
  } as Record<EventType, string>;

  const rows = await prisma.$queryRaw<
    { type: EventType; users: bigint }[]
  >`SELECT "type", COUNT(DISTINCT "userId")::bigint AS users
    FROM "Event"
    WHERE "createdAt" >= ${start}
      AND "userId" IS NOT NULL
      AND "type" = ANY(${types}::"EventType"[])
    GROUP BY "type"`;

  const byType = new Map<EventType, number>();
  for (const r of rows) byType.set(r.type, Number(r.users));

  return types.map((t) => ({
    key: t,
    label: labels[t] ?? t,
    count: byType.get(t) ?? 0,
  }));
}

export type TopCourse = {
  id: string;
  slug: string;
  title: string;
  enrollments: number;
  completions: number;
  revenueUsd: number;
};

export async function getTopCoursesByEnrollment(
  days = 30,
  limit = 8,
): Promise<TopCourse[]> {
  const start = rangeStart(days);

  const enrollmentRows = await prisma.enrollment.groupBy({
    by: ["courseId"],
    where: { enrolledAt: { gte: start } },
    _count: { _all: true },
    orderBy: { _count: { courseId: "desc" } },
    take: limit,
  });

  if (enrollmentRows.length === 0) return [];

  const courseIds = enrollmentRows.map((r) => r.courseId);
  const courses = await prisma.course.findMany({
    where: { id: { in: courseIds } },
    select: { id: true, slug: true, title: true, price: true },
  });
  const courseMap = new Map(courses.map((c) => [c.id, c]));

  const completions = await prisma.enrollment.groupBy({
    by: ["courseId"],
    where: {
      courseId: { in: courseIds },
      completedAt: { not: null, gte: start },
    },
    _count: { _all: true },
  });
  const completionMap = new Map(
    completions.map((c) => [c.courseId, c._count._all]),
  );

  const revenue = await prisma.payment.groupBy({
    by: ["courseId"],
    where: {
      courseId: { in: courseIds },
      status: "CONFIRMED",
      confirmedAt: { gte: start },
    },
    _sum: { usdAmount: true, amount: true },
  });
  const revenueMap = new Map(
    revenue.map((r) => [
      r.courseId,
      r._sum.usdAmount ?? r._sum.amount ?? 0,
    ]),
  );

  return enrollmentRows.map((r) => {
    const c = courseMap.get(r.courseId);
    return {
      id: r.courseId,
      slug: c?.slug ?? "",
      title: c?.title ?? "(deleted course)",
      enrollments: r._count._all,
      completions: completionMap.get(r.courseId) ?? 0,
      revenueUsd: Number(revenueMap.get(r.courseId) ?? 0),
    };
  });
}

export type RevenuePoint = { day: string; usd: number };

export async function getRevenueSeries(days = 30): Promise<RevenuePoint[]> {
  const start = rangeStart(days);
  const rows = await prisma.$queryRaw<
    { day: Date; usd: number | null }[]
  >`SELECT date_trunc('day', COALESCE("confirmedAt", "createdAt")) AS day,
           COALESCE(SUM("usdAmount"), SUM("amount"))::float AS usd
    FROM "Payment"
    WHERE "status" = 'CONFIRMED'
      AND COALESCE("confirmedAt", "createdAt") >= ${start}
    GROUP BY day
    ORDER BY day ASC`;

  const byDay = new Map<string, number>();
  for (const r of rows) {
    byDay.set(r.day.toISOString().slice(0, 10), Number(r.usd ?? 0));
  }

  const out: RevenuePoint[] = [];
  for (let i = 0; i < days; i++) {
    const d = new Date(start);
    d.setUTCDate(start.getUTCDate() + i);
    const key = d.toISOString().slice(0, 10);
    out.push({ day: key, usd: byDay.get(key) ?? 0 });
  }
  return out;
}

export type RevenueSummary = {
  totalUsd: number;
  confirmedCount: number;
  pendingCount: number;
  failedCount: number;
};

export async function getRevenueSummary(days = 30): Promise<RevenueSummary> {
  const start = rangeStart(days);
  const [confirmed, pending, failed] = await Promise.all([
    prisma.payment.aggregate({
      where: { status: "CONFIRMED", createdAt: { gte: start } },
      _sum: { usdAmount: true, amount: true },
      _count: { _all: true },
    }),
    prisma.payment.count({
      where: { status: "PENDING", createdAt: { gte: start } },
    }),
    prisma.payment.count({
      where: { status: "FAILED", createdAt: { gte: start } },
    }),
  ]);
  const totalUsd =
    (confirmed._sum.usdAmount ?? confirmed._sum.amount ?? 0) as number;
  return {
    totalUsd: Number(totalUsd),
    confirmedCount: confirmed._count._all,
    pendingCount: pending,
    failedCount: failed,
  };
}

export type RecentEvent = {
  id: string;
  type: EventType;
  createdAt: Date;
  userName: string | null;
  userEmail: string | null;
  courseTitle: string | null;
  metadata: Prisma.JsonValue | null;
};

export type QuizQuestionRow = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
};

export type QuizAnalytics = {
  quizId: string;
  lessonId: string;
  lessonTitle: string;
  courseTitle: string;
  courseSlug: string;
  questionCount: number;
  attempts: number;
  uniqueUsers: number;
  passCount: number;
  passRate: number;
  avgScore: number;
  questions: Array<{
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    correctIndexLabel: string;
    accuracy: number;
    answered: number;
    choiceDistribution: number[];
  }>;
};

export async function getQuizAnalytics(
  quizId: string,
): Promise<QuizAnalytics | null> {
  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      lesson: {
        include: {
          module: {
            include: {
              course: { select: { title: true, slug: true } },
            },
          },
        },
      },
      attempts: {
        select: { score: true, answers: true, userId: true },
      },
    },
  });
  if (!quiz) return null;

  const questions = (quiz.questions as unknown as QuizQuestionRow[]) ?? [];
  const attempts = quiz.attempts;

  const totalScore = attempts.reduce((acc, a) => acc + a.score, 0);
  const passCount = attempts.filter((a) => a.score >= 80).length;
  const userSet = new Set(attempts.map((a) => a.userId));

  const perQ = questions.map((q) => {
    let correct = 0;
    let answered = 0;
    const dist = q.options.map(() => 0);
    for (const a of attempts) {
      const arr = (a.answers as unknown as (number | null)[]) ?? [];
      const idx = questions.findIndex((qq) => qq.id === q.id);
      const chosen = arr[idx];
      if (chosen == null) continue;
      answered++;
      if (chosen === q.correctAnswer) correct++;
      if (dist[chosen] !== undefined) dist[chosen]++;
    }
    return {
      id: q.id,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      correctIndexLabel: q.options[q.correctAnswer] ?? `Option ${q.correctAnswer + 1}`,
      accuracy: answered ? Math.round((correct / answered) * 100) : 0,
      answered,
      choiceDistribution: dist,
    };
  });

  return {
    quizId: quiz.id,
    lessonId: quiz.lessonId,
    lessonTitle: quiz.lesson.title,
    courseTitle: quiz.lesson.module.course.title,
    courseSlug: quiz.lesson.module.course.slug,
    questionCount: questions.length,
    attempts: attempts.length,
    uniqueUsers: userSet.size,
    passCount,
    passRate: attempts.length
      ? Math.round((passCount / attempts.length) * 100)
      : 0,
    avgScore: attempts.length ? Math.round(totalScore / attempts.length) : 0,
    questions: perQ,
  };
}

export type QuizSummary = {
  quizId: string;
  lessonId: string;
  lessonTitle: string;
  courseTitle: string;
  courseSlug: string;
  attempts: number;
  avgScore: number;
  passRate: number;
  questionCount: number;
};

export async function getAllQuizSummaries(): Promise<QuizSummary[]> {
  const quizzes = await prisma.quiz.findMany({
    include: {
      lesson: {
        include: {
          module: {
            include: { course: { select: { title: true, slug: true } } },
          },
        },
      },
      attempts: { select: { score: true } },
    },
  });

  return quizzes
    .map((q) => {
      const attempts = q.attempts;
      const avg = attempts.length
        ? Math.round(
            attempts.reduce((acc, a) => acc + a.score, 0) / attempts.length,
          )
        : 0;
      const passCount = attempts.filter((a) => a.score >= 80).length;
      const qs = (q.questions as unknown as QuizQuestionRow[]) ?? [];
      return {
        quizId: q.id,
        lessonId: q.lessonId,
        lessonTitle: q.lesson.title,
        courseTitle: q.lesson.module.course.title,
        courseSlug: q.lesson.module.course.slug,
        attempts: attempts.length,
        avgScore: avg,
        passRate: attempts.length
          ? Math.round((passCount / attempts.length) * 100)
          : 0,
        questionCount: qs.length,
      };
    })
    .sort((a, b) => b.attempts - a.attempts);
}

export async function getRecentEvents(limit = 25): Promise<RecentEvent[]> {
  const rows = await prisma.event.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    include: {
      user: { select: { name: true, email: true } },
      course: { select: { title: true } },
    },
  });
  return rows.map((e) => ({
    id: e.id,
    type: e.type,
    createdAt: e.createdAt,
    userName: e.user?.name ?? null,
    userEmail: e.user?.email ?? null,
    courseTitle: e.course?.title ?? null,
    metadata: e.metadata,
  }));
}

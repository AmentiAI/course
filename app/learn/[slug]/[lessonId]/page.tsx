import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Play,
  Lock,
  Award,
} from "lucide-react";
import LessonContent from "@/components/LessonContent";
import MobileSidebarToggle from "@/components/MobileSidebarToggle";
import LessonAudioPlayer from "@/components/LessonAudioPlayer";
import MarkdownContent from "@/components/MarkdownContent";
import LessonQuiz from "@/components/LessonQuiz";
import { isIntroductionLesson } from "@/lib/lesson-utils";

async function getLessonData(slug: string, lessonId: string, userId?: string) {
  const course = await prisma.course.findUnique({
    where: { slug },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            orderBy: { order: "asc" },
          },
        },
      },
    },
  });

  if (!course) return null;

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      quiz: true,
      module: { select: { title: true, order: true } },
    },
  });

  if (!lesson) return null;

  const enrollment = userId
    ? await prisma.enrollment.findUnique({
        where: { userId_courseId: { userId, courseId: course.id } },
        include: { course: true },
      })
    : null;

  const progress = userId
    ? await prisma.lessonProgress.findMany({
        where: { userId },
        select: { lessonId: true, completed: true },
      })
    : [];

  const completedIds = new Set(
    progress.filter((p) => p.completed).map((p) => p.lessonId)
  );

  return { course, lesson, enrollment, completedIds };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lessonId: string }>;
}): Promise<Metadata> {
  const { slug, lessonId } = await params;
  const data = await getLessonData(slug, lessonId);
  if (!data) {
    return { title: "Lesson Not Found | SkillMint" };
  }
  const { course, lesson } = data;
  return {
    title: `${lesson.title} — ${course.title} | SkillMint`,
    description: `Learn ${lesson.title} in the ${course.title} course on SkillMint`,
    openGraph: {
      title: `${lesson.title} — ${course.title}`,
      description: `Learn ${lesson.title}`,
      type: "article",
    },
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; lessonId: string }>;
}) {
  const { slug, lessonId } = await params;
  const session = await getServerSession(authOptions);

  const data = await getLessonData(slug, lessonId, session?.user?.id);
  if (!data) notFound();

  const { course, lesson, enrollment, completedIds } = data;

  if (!lesson.isFree && !enrollment) {
    redirect(`/courses/${slug}?unlock=true`);
  }

  const allLessons = course.modules.flatMap((m) =>
    m.lessons.map((l) => ({ ...l, moduleTitle: m.title }))
  );

  const currentIdx = allLessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIdx > 0 ? allLessons[currentIdx - 1] : null;
  const nextLesson =
    currentIdx < allLessons.length - 1 ? allLessons[currentIdx + 1] : null;

  const totalLessons = allLessons.length;
  const completedCount = allLessons.filter((l) => completedIds.has(l.id)).length;
  const progressPct =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div className="flex h-[calc(100vh-64px)] bg-white">
      <MobileSidebarToggle
        courseSlug={slug}
        courseTitle={course.title}
        modules={course.modules}
        currentLessonId={lessonId}
        completedIds={Array.from(completedIds)}
        isEnrolled={!!enrollment}
        progressPct={progressPct}
        completedCount={completedCount}
        totalLessons={totalLessons}
      />

      {/* Sidebar (desktop) */}
      <aside className="hidden lg:flex flex-col w-80 shrink-0 border-r border-slate-200 bg-[#fafaf9] overflow-hidden">
        <div className="p-5 border-b border-slate-200 bg-white">
          <Link
            href={`/courses/${slug}`}
            className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#98753f] hover:text-[#0a2540] flex items-center gap-1 mb-3 transition-colors"
          >
            <ChevronLeft className="h-3 w-3" />
            Return to Program
          </Link>
          <h2 className="font-serif text-base font-bold text-[#0a2540] leading-snug line-clamp-2 tracking-tight">
            {course.title}
          </h2>
          {enrollment && (
            <div className="mt-4">
              <div className="flex justify-between text-xs font-medium mb-1.5">
                <span className="text-slate-600">Course progress</span>
                <span className="text-[#14532d] font-semibold">{progressPct}%</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0a2540] rounded-full transition-all"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-1.5">
                {completedCount} of {totalLessons} lessons completed
              </p>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          {course.modules.map((module, idx) => (
            <div key={module.id}>
              <div className="px-5 py-3 bg-[#0a2540] border-b border-[#0a2540]">
                <p className="text-[9px] font-bold tracking-[0.22em] uppercase text-[#b08d57] mb-0.5">
                  Module {idx + 1}
                </p>
                <span className="text-xs font-semibold text-white tracking-tight">
                  {module.title}
                </span>
              </div>
              {module.lessons.map((l) => {
                const isCompleted = completedIds.has(l.id);
                const isCurrent = l.id === lessonId;
                const isAccessible = l.isFree || !!enrollment;

                return (
                  <div
                    key={l.id}
                    className={`flex items-center gap-3 px-5 py-3 border-b border-slate-100 transition-colors ${
                      isCurrent
                        ? "bg-[#f5ecd7] border-l-[3px] border-l-[#b08d57]"
                        : "hover:bg-white"
                    }`}
                  >
                    <div className="shrink-0">
                      {isCompleted ? (
                        <div className="h-5 w-5 rounded-full bg-[#dcfce7] border border-[#14532d]/40 flex items-center justify-center">
                          <Check className="h-3 w-3 text-[#14532d]" strokeWidth={2.5} />
                        </div>
                      ) : isAccessible ? (
                        <div
                          className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                            isCurrent ? "border-[#b08d57] bg-white" : "border-slate-300"
                          }`}
                        >
                          <Play
                            className={`h-2.5 w-2.5 ${
                              isCurrent
                                ? "text-[#0a2540] fill-[#0a2540]"
                                : "text-slate-400 fill-slate-400"
                            }`}
                          />
                        </div>
                      ) : (
                        <div className="h-5 w-5 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center">
                          <Lock className="h-2.5 w-2.5 text-slate-400" />
                        </div>
                      )}
                    </div>
                    {isAccessible ? (
                      <Link
                        href={`/learn/${slug}/${l.id}`}
                        className={`flex-1 text-xs leading-snug transition-colors ${
                          isCurrent
                            ? "text-[#0a2540] font-semibold"
                            : isCompleted
                            ? "text-slate-500"
                            : "text-slate-700 hover:text-[#0a2540]"
                        }`}
                      >
                        {l.title}
                      </Link>
                    ) : (
                      <span className="flex-1 text-xs text-slate-400 leading-snug">
                        {l.title}
                      </span>
                    )}
                    <span className="text-[11px] text-slate-400 shrink-0 font-medium">
                      {l.duration}m
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </aside>

      {/* Main lesson area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto bg-white">
          {lesson.videoUrl && (
            <div className="relative bg-slate-900 aspect-video max-h-[55vh]">
              <iframe
                src={lesson.videoUrl.replace("watch?v=", "embed/")}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-10 py-10 sm:py-14">
            <div className="flex items-start justify-between gap-4 mb-12 pb-7 border-b border-slate-100">
              <div className="min-w-0">
                <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#98753f] mb-3">
                  {allLessons[currentIdx]?.moduleTitle}
                </p>
                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#0a2540] tracking-tight leading-[1.1]">
                  {lesson.title}
                </h1>
                <p className="text-[15px] text-slate-500 mt-4">
                  Lesson {currentIdx + 1} of {totalLessons} &middot; {lesson.duration} min
                </p>
              </div>
              <LessonContent
                lessonId={lesson.id}
                courseId={course.id}
                enrolled={!!enrollment}
                initialCompleted={completedIds.has(lesson.id)}
                nextLessonUrl={
                  nextLesson ? `/learn/${slug}/${nextLesson.id}` : null
                }
                courseSlug={slug}
                allLessonsCount={totalLessons}
                completedCount={completedCount}
              />
            </div>

            {lesson.content && (
              <LessonAudioPlayer
                content={lesson.content}
                lessonTitle={lesson.title}
              />
            )}

            <div className="max-w-none">
              <MarkdownContent content={lesson.content} />
            </div>

            {lesson.quiz &&
              !isIntroductionLesson({
                lessonTitle: lesson.title,
                lessonOrder: lesson.order,
                moduleTitle: lesson.module.title,
                moduleOrder: lesson.module.order,
              }) && (
                <LessonQuiz
                  lessonId={lesson.id}
                  questions={lesson.quiz.questions as any}
                  lessonTitle={lesson.title}
                />
              )}
          </div>
        </div>

        {/* Bottom navigation */}
        <div className="border-t border-slate-200 bg-white px-4 py-3 flex items-center justify-between">
          {prevLesson ? (
            <Link
              href={`/learn/${slug}/${prevLesson.id}`}
              className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-[#0a2540] transition-colors rounded-md border border-slate-200 hover:border-[#b08d57] bg-white px-3.5 py-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Link>
          ) : (
            <div />
          )}

          <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-slate-500">
            {currentIdx + 1} / {totalLessons}
          </span>

          {nextLesson ? (
            <Link
              href={`/learn/${slug}/${nextLesson.id}`}
              className="flex items-center gap-2 text-sm bg-[#0a2540] hover:bg-[#123258] text-white transition-colors rounded-md px-4 py-2 font-semibold tracking-wide"
            >
              Next Lesson
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <Link
              href={`/dashboard`}
              className="flex items-center gap-2 text-sm bg-[#14532d] hover:bg-[#0f3d21] text-white transition-colors rounded-md px-4 py-2 font-semibold tracking-wide"
            >
              <Award className="h-4 w-4" />
              Complete Program
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

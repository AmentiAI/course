import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Play,
  Lock,
  BookOpen,
  Award,
  Menu,
} from "lucide-react";
import LessonContent from "@/components/LessonContent";
import MobileSidebarToggle from "@/components/MobileSidebarToggle";
import LessonAudioPlayer from "@/components/LessonAudioPlayer";
import MarkdownContent from "@/components/MarkdownContent";

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
    include: { quiz: true },
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

  // Check access
  if (!lesson.isFree && !enrollment) {
    redirect(`/courses/${slug}?unlock=true`);
  }

  // Flat list of lessons for navigation
  const allLessons = course.modules.flatMap((m) =>
    m.lessons.map((l) => ({ ...l, moduleTitle: m.title }))
  );

  const currentIdx = allLessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIdx > 0 ? allLessons[currentIdx - 1] : null;
  const nextLesson =
    currentIdx < allLessons.length - 1 ? allLessons[currentIdx + 1] : null;

  const totalLessons = allLessons.length;
  const completedCount = allLessons.filter((l) => completedIds.has(l.id)).length;
  const progressPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div className="flex h-[calc(100vh-64px)] bg-[#09090b]">
      {/* Mobile sidebar toggle */}
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
      <aside className="hidden lg:flex flex-col w-72 shrink-0 border-r border-zinc-800 overflow-hidden">
        {/* Course header */}
        <div className="p-4 border-b border-zinc-800">
          <Link
            href={`/courses/${slug}`}
            className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-1 mb-2 transition-colors"
          >
            <ChevronLeft className="h-3 w-3" />
            Back to course
          </Link>
          <h2 className="text-sm font-semibold text-white leading-snug line-clamp-2">
            {course.title}
          </h2>
          {enrollment && (
            <div className="mt-3">
              <div className="flex justify-between text-xs text-zinc-500 mb-1">
                <span>Progress</span>
                <span className="text-green-400">{progressPct}%</span>
              </div>
              <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full progress-bar"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="text-xs text-zinc-600 mt-1">
                {completedCount} / {totalLessons} lessons
              </p>
            </div>
          )}
        </div>

        {/* Curriculum */}
        <div className="flex-1 overflow-y-auto">
          {course.modules.map((module) => (
            <div key={module.id}>
              <div className="px-4 py-2 bg-zinc-900/50 border-b border-zinc-800">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">
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
                    className={`flex items-center gap-2.5 px-4 py-2.5 border-b border-zinc-800/50 transition-colors ${
                      isCurrent
                        ? "bg-purple-600/10 border-l-2 border-l-purple-500"
                        : "hover:bg-zinc-800/30"
                    }`}
                  >
                    <div className="shrink-0">
                      {isCompleted ? (
                        <div className="h-5 w-5 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center">
                          <Check className="h-3 w-3 text-green-400" />
                        </div>
                      ) : isAccessible ? (
                        <div className="h-5 w-5 rounded-full border border-zinc-600 flex items-center justify-center">
                          <Play className="h-2.5 w-2.5 text-zinc-400 fill-zinc-400" />
                        </div>
                      ) : (
                        <div className="h-5 w-5 rounded-full border border-zinc-700 flex items-center justify-center">
                          <Lock className="h-2.5 w-2.5 text-zinc-600" />
                        </div>
                      )}
                    </div>
                    {isAccessible ? (
                      <Link
                        href={`/learn/${slug}/${l.id}`}
                        className={`flex-1 text-xs leading-snug transition-colors ${
                          isCurrent
                            ? "text-purple-300 font-medium"
                            : isCompleted
                            ? "text-zinc-500"
                            : "text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        {l.title}
                      </Link>
                    ) : (
                      <span className="flex-1 text-xs text-zinc-600 leading-snug">
                        {l.title}
                      </span>
                    )}
                    <span className="text-xs text-zinc-700 shrink-0">
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
        {/* Lesson content */}
        <div className="flex-1 overflow-y-auto">
          {/* Video area - only show if there's actually a video */}
          {lesson.videoUrl && (
            <div className="relative bg-black aspect-video max-h-[55vh]">
              <iframe
                src={lesson.videoUrl.replace("watch?v=", "embed/")}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {/* Lesson info and content */}
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <p className="text-sm text-zinc-500 mb-1">
                  {allLessons[currentIdx]?.moduleTitle}
                </p>
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  {lesson.title}
                </h1>
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

            {/* Audio Player */}
            {lesson.content && (
              <LessonAudioPlayer
                content={lesson.content}
                lessonTitle={lesson.title}
              />
            )}

            {/* Lesson content */}
            <div className="max-w-none">
              <MarkdownContent content={lesson.content} />
            </div>

            {/* Quiz placeholder */}
            {lesson.quiz && (
              <div className="mt-8 rounded-xl border border-purple-500/30 bg-purple-900/10 p-6">
                <h3 className="font-semibold text-purple-300 mb-2 flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Lesson Quiz
                </h3>
                <p className="text-sm text-zinc-400">
                  Test your knowledge of this lesson.
                </p>
                <button className="mt-4 rounded-lg bg-purple-600 hover:bg-purple-500 px-4 py-2 text-sm font-medium text-white transition-colors">
                  Start Quiz
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom navigation */}
        <div className="border-t border-zinc-800 bg-zinc-900/80 backdrop-blur px-4 py-3 flex items-center justify-between">
          {prevLesson ? (
            <Link
              href={`/learn/${slug}/${prevLesson.id}`}
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors rounded-lg border border-zinc-700 hover:border-zinc-500 px-3 py-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Link>
          ) : (
            <div />
          )}

          <span className="text-xs text-zinc-600">
            {currentIdx + 1} / {totalLessons}
          </span>

          {nextLesson ? (
            <Link
              href={`/learn/${slug}/${nextLesson.id}`}
              className="flex items-center gap-2 text-sm bg-purple-600 hover:bg-purple-500 text-white transition-colors rounded-lg px-3 py-2 font-medium"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <Link
              href={`/dashboard`}
              className="flex items-center gap-2 text-sm bg-green-600 hover:bg-green-500 text-white transition-colors rounded-lg px-3 py-2 font-medium"
            >
              <Award className="h-4 w-4" />
              Complete
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

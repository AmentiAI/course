import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  BookOpen,
  Award,
  TrendingUp,
  Play,
  Star,
  Clock,
  ChevronRight,
  Zap,
} from "lucide-react";
import MobileNav from "@/components/MobileNav";

async function getDashboardData(userId: string) {
  const [enrollments, certificates, notifications, recommendedCourses, lessonProgress] =
    await Promise.all([
      prisma.enrollment.findMany({
        where: { userId },
        include: {
          course: {
            include: {
              modules: {
                include: { lessons: { orderBy: { order: "asc" } } },
                orderBy: { order: "asc" },
              },
              _count: { select: { enrollments: true } },
            },
          },
        },
        orderBy: { enrolledAt: "desc" },
      }),
      prisma.certificate.findMany({
        where: { userId },
        include: { course: { select: { title: true, slug: true, thumbnail: true } } },
        orderBy: { issuedAt: "desc" },
      }),
      prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.course.findMany({
        where: {
          isPublished: true,
          enrollments: { none: { userId } },
        },
        include: {
          _count: { select: { enrollments: true, reviews: true } },
          reviews: { select: { rating: true } },
        },
        take: 3,
        orderBy: { enrollments: { _count: "desc" } },
      }),
      prisma.lessonProgress.findMany({
        where: { userId, completed: true },
        orderBy: { completedAt: "desc" },
        select: { lessonId: true, completedAt: true },
      }),
    ]);

  return { enrollments, certificates, notifications, recommendedCourses, lessonProgress };
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/auth/signin?redirect=/dashboard");

  const { enrollments, certificates, notifications, recommendedCourses, lessonProgress } =
    await getDashboardData(session.user.id);

  // Build a map of courseId -> last completed lessonId for the "resume" feature
  const completedLessonIds = new Set(lessonProgress.map((p) => p.lessonId));

  const inProgress = enrollments.filter(
    (e) => e.progress > 0 && !e.completedAt
  );
  const notStarted = enrollments.filter((e) => e.progress === 0);
  const completed = enrollments.filter((e) => e.completedAt);

  return (
    <div className="min-h-screen bg-[#09090b] px-4 py-10 pb-24 md:pb-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
            Welcome back, {session.user.name?.split(" ")[0] ?? "learner"}! 👋
          </h1>
          <p className="text-zinc-500 text-sm">
            {enrollments.length === 0
              ? "Start your first course today"
              : `You're enrolled in ${enrollments.length} course${enrollments.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Enrolled",
              value: enrollments.length,
              icon: BookOpen,
              color: "text-blue-400",
              bg: "bg-blue-400/10",
            },
            {
              label: "In Progress",
              value: inProgress.length,
              icon: TrendingUp,
              color: "text-purple-400",
              bg: "bg-purple-400/10",
            },
            {
              label: "Completed",
              value: completed.length,
              icon: Zap,
              color: "text-green-400",
              bg: "bg-green-400/10",
            },
            {
              label: "Certificates",
              value: certificates.length,
              icon: Award,
              color: "text-amber-400",
              bg: "bg-amber-400/10",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
            >
              <div className={`inline-flex p-2 rounded-lg ${stat.bg} mb-3`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-zinc-500">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main: Enrolled Courses */}
          <div className="lg:col-span-2 space-y-5">
            {/* In Progress */}
            {inProgress.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-white mb-4">
                  Continue Learning
                </h2>
                <div className="space-y-3">
                  {inProgress.map((enrollment) => {
                    const allLessons = enrollment.course.modules.flatMap((m) => m.lessons);
                    // Find next incomplete lesson
                    const nextLesson = allLessons.find((l) => !completedLessonIds.has(l.id)) || allLessons[0];
                    return (
                      <div
                        key={enrollment.id}
                        className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 flex gap-4"
                      >
                        <img
                          src={enrollment.course.thumbnail}
                          alt={enrollment.course.title}
                          className="h-20 w-32 rounded-lg object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-white mb-1 line-clamp-1">
                            {enrollment.course.title}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3">
                            <Clock className="h-3 w-3" />
                            <span>{enrollment.progress}% complete</span>
                          </div>
                          {/* Progress bar */}
                          <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden mb-3">
                            <div
                              className="h-full bg-green-500 rounded-full"
                              style={{ width: `${enrollment.progress}%` }}
                            />
                          </div>
                          <Link
                            href={
                              nextLesson
                                ? `/learn/${enrollment.course.slug}/${nextLesson.id}`
                                : `/courses/${enrollment.course.slug}`
                            }
                            className="inline-flex items-center gap-1.5 text-xs bg-purple-600 hover:bg-purple-500 text-white px-3 py-1.5 rounded-lg transition-colors font-medium"
                          >
                            <Play className="h-3 w-3 fill-white" />
                            Resume
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Not Started */}
            {notStarted.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-white mb-4">
                  Not Started Yet
                </h2>
                <div className="space-y-3">
                  {notStarted.map((enrollment) => {
                    const firstLesson =
                      enrollment.course.modules[0]?.lessons[0];
                    return (
                      <div
                        key={enrollment.id}
                        className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 flex gap-4"
                      >
                        <img
                          src={enrollment.course.thumbnail}
                          alt={enrollment.course.title}
                          className="h-20 w-32 rounded-lg object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-white mb-1 line-clamp-1">
                            {enrollment.course.title}
                          </h3>
                          <p className="text-xs text-zinc-500 mb-3">
                            Ready to start • {enrollment.course._count.enrollments} students enrolled
                          </p>
                          <Link
                            href={
                              firstLesson
                                ? `/learn/${enrollment.course.slug}/${firstLesson.id}`
                                : `/courses/${enrollment.course.slug}`
                            }
                            className="inline-flex items-center gap-1.5 text-xs bg-zinc-700 hover:bg-zinc-600 text-white px-3 py-1.5 rounded-lg transition-colors font-medium"
                          >
                            <Play className="h-3 w-3" />
                            Start Now
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Completed */}
            {completed.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-white mb-4">
                  Completed Courses
                </h2>
                <div className="space-y-3">
                  {completed.map((enrollment) => (
                    <div
                      key={enrollment.id}
                      className="rounded-xl border border-green-500/20 bg-green-500/5 p-4 flex gap-4"
                    >
                      <img
                        src={enrollment.course.thumbnail}
                        alt={enrollment.course.title}
                        className="h-16 w-24 rounded-lg object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-white mb-1 line-clamp-1">
                          {enrollment.course.title}
                        </h3>
                        <p className="text-xs text-green-400 mb-2">
                          ✓ Completed{" "}
                          {enrollment.completedAt
                            ? new Date(enrollment.completedAt).toLocaleDateString()
                            : ""}
                        </p>
                        <div className="flex gap-2">
                          <Link
                            href={`/courses/${enrollment.course.slug}`}
                            className="text-xs text-zinc-400 hover:text-white transition-colors"
                          >
                            Review →
                          </Link>
                          <Link
                            href={`/dashboard`}
                            className="text-xs text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
                          >
                            <Award className="h-3 w-3" />
                            Certificate
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Empty state */}
            {enrollments.length === 0 && (
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-12 text-center">
                <BookOpen className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  No courses yet
                </h3>
                <p className="text-sm text-zinc-500 mb-6">
                  Pick a course and start your income journey
                </p>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 px-6 py-3 text-sm font-semibold text-white transition-all"
                >
                  Browse Courses
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Certificates */}
            {certificates.length > 0 && (
              <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <Award className="h-4 w-4 text-amber-400" />
                  My Certificates
                </h3>
                <div className="space-y-3">
                  {certificates.map((cert) => (
                    <Link
                      key={cert.id}
                      href={`/certificate/${cert.id}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                    >
                      <img
                        src={cert.course.thumbnail}
                        alt=""
                        className="h-10 w-14 rounded object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-white line-clamp-1">
                          {cert.course.title}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {new Date(cert.issuedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Notifications */}
            {notifications.length > 0 && (
              <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                <h3 className="font-semibold text-white mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {notifications.map((n) => (
                    <div key={n.id} className="flex gap-3">
                      <div className="h-7 w-7 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center shrink-0 mt-0.5">
                        <Zap className="h-3.5 w-3.5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-white">{n.title}</p>
                        <p className="text-xs text-zinc-500 leading-snug mt-0.5">
                          {n.message}
                        </p>
                        <p className="text-xs text-zinc-700 mt-1">
                          {new Date(n.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Recommended */}
            {recommendedCourses.length > 0 && (
              <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-400" />
                  Recommended
                </h3>
                <div className="space-y-3">
                  {recommendedCourses.map((course) => (
                    <Link
                      key={course.id}
                      href={`/courses/${course.slug}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-800 transition-colors group"
                    >
                      <img
                        src={course.thumbnail}
                        alt=""
                        className="h-10 w-14 rounded object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-white line-clamp-1 group-hover:text-purple-300 transition-colors">
                          {course.title}
                        </p>
                        <p className="text-xs text-amber-400 font-semibold">
                          ${course.price}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
      <MobileNav />
    </div>
  );
}

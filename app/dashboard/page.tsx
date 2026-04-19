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
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import MobileNav from "@/components/MobileNav";
import ProgressBar from "@/components/ProgressBar";

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

  const completedLessonIds = new Set(lessonProgress.map((p) => p.lessonId));
  const inProgress = enrollments.filter((e) => e.progress > 0 && !e.completedAt);
  const notStarted = enrollments.filter((e) => e.progress === 0);
  const completed = enrollments.filter((e) => e.completedAt);

  return (
    <div className="min-h-screen bg-white pb-24 md:pb-16">
      {/* Header band */}
      <section className="hero-backdrop border-b border-slate-200 px-4 sm:px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <p className="academic-label mb-3">Student Portal</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#0a2540] tracking-tight leading-tight mb-3">
            Welcome back, {session.user.name?.split(" ")[0] ?? "student"}.
          </h1>
          <p className="text-slate-600 text-[17px] leading-relaxed max-w-2xl">
            {enrollments.length === 0
              ? "Begin a program from the catalog to start coursework in the Student Portal."
              : `You are enrolled in ${enrollments.length} program${
                  enrollments.length !== 1 ? "s" : ""
                }. Resume coursework or view completed credentials below.`}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">
          {[
            { label: "Enrolled", value: enrollments.length, icon: BookOpen },
            { label: "In Progress", value: inProgress.length, icon: TrendingUp },
            { label: "Completed", value: completed.length, icon: CheckCircle2 },
            { label: "Credentials", value: certificates.length, icon: Award },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-slate-200 bg-white p-6 border-t-2 border-t-[#b08d57]"
            >
              <stat.icon className="h-5 w-5 text-[#98753f] mb-4" strokeWidth={1.75} />
              <div className="font-serif text-3xl font-bold text-[#0a2540] tracking-tight">
                {stat.value}
              </div>
              <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-slate-500 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-8">
            {inProgress.length > 0 && (
              <section>
                <p className="academic-label mb-2">Coursework</p>
                <h2 className="font-serif text-2xl font-bold text-[#0a2540] mb-5 tracking-tight">
                  Continue Coursework.
                </h2>
                <div className="space-y-3">
                  {inProgress.map((enrollment) => {
                    const allLessons = enrollment.course.modules.flatMap((m) => m.lessons);
                    const nextLesson =
                      allLessons.find((l) => !completedLessonIds.has(l.id)) || allLessons[0];
                    return (
                      <div
                        key={enrollment.id}
                        className="rounded-lg border border-slate-200 bg-white p-5 flex gap-4"
                      >
                        <img
                          src={enrollment.course.thumbnail}
                          alt={enrollment.course.title}
                          className="h-20 w-32 rounded-md object-cover shrink-0 border border-slate-200"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-serif text-[15px] font-bold text-[#0a2540] mb-1 line-clamp-1 tracking-tight">
                            {enrollment.course.title}
                          </h3>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                            <Clock className="h-3 w-3 text-[#98753f]" />
                            <span>{enrollment.progress}% complete</span>
                          </div>
                          <ProgressBar progress={enrollment.progress} size="sm" className="mb-3" />
                          <Link
                            href={
                              nextLesson
                                ? `/learn/${enrollment.course.slug}/${nextLesson.id}`
                                : `/courses/${enrollment.course.slug}`
                            }
                            className="inline-flex items-center gap-1.5 text-xs bg-[#0a2540] hover:bg-[#123258] text-white px-3.5 py-2 rounded-md transition-colors font-semibold tracking-wide"
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

            {notStarted.length > 0 && (
              <section>
                <p className="academic-label mb-2">Ready to Begin</p>
                <h2 className="font-serif text-2xl font-bold text-[#0a2540] mb-5 tracking-tight">
                  Not Yet Started.
                </h2>
                <div className="space-y-3">
                  {notStarted.map((enrollment) => {
                    const firstLesson = enrollment.course.modules[0]?.lessons[0];
                    return (
                      <div
                        key={enrollment.id}
                        className="rounded-lg border border-slate-200 bg-white p-5 flex gap-4"
                      >
                        <img
                          src={enrollment.course.thumbnail}
                          alt={enrollment.course.title}
                          className="h-20 w-32 rounded-md object-cover shrink-0 border border-slate-200"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-serif text-[15px] font-bold text-[#0a2540] mb-1 line-clamp-1 tracking-tight">
                            {enrollment.course.title}
                          </h3>
                          <p className="text-xs text-slate-500 mb-3">
                            Ready to begin &middot; {enrollment.course._count.enrollments} students enrolled
                          </p>
                          <Link
                            href={
                              firstLesson
                                ? `/learn/${enrollment.course.slug}/${firstLesson.id}`
                                : `/courses/${enrollment.course.slug}`
                            }
                            className="inline-flex items-center gap-1.5 text-xs border border-[#b08d57] hover:bg-[#f5ecd7] text-[#0a2540] px-3.5 py-2 rounded-md transition-colors font-semibold tracking-wide"
                          >
                            <Play className="h-3 w-3" />
                            Begin Program
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {completed.length > 0 && (
              <section>
                <p className="academic-label mb-2">Completed</p>
                <h2 className="font-serif text-2xl font-bold text-[#0a2540] mb-5 tracking-tight">
                  Completed Programs.
                </h2>
                <div className="space-y-3">
                  {completed.map((enrollment) => (
                    <div
                      key={enrollment.id}
                      className="rounded-lg border border-[#bbf7d0] bg-[#f0fdf4] p-5 flex gap-4"
                    >
                      <img
                        src={enrollment.course.thumbnail}
                        alt={enrollment.course.title}
                        className="h-16 w-24 rounded-md object-cover shrink-0 border border-[#bbf7d0]"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-[15px] font-bold text-[#0a2540] mb-1 line-clamp-1 tracking-tight">
                          {enrollment.course.title}
                        </h3>
                        <p className="text-xs text-[#14532d] font-semibold mb-2 flex items-center gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Completed{" "}
                          {enrollment.completedAt
                            ? new Date(enrollment.completedAt).toLocaleDateString()
                            : ""}
                        </p>
                        <div className="flex gap-4 text-xs">
                          <Link
                            href={`/courses/${enrollment.course.slug}`}
                            className="text-slate-600 hover:text-[#0a2540] transition-colors font-medium"
                          >
                            Review Program →
                          </Link>
                          <Link
                            href={`/dashboard`}
                            className="text-[#98753f] hover:text-[#0a2540] transition-colors flex items-center gap-1 font-medium"
                          >
                            <Award className="h-3 w-3" />
                            Credential
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {enrollments.length === 0 && (
              <div className="rounded-lg border border-slate-200 bg-white p-14 text-center">
                <div className="inline-flex h-14 w-14 rounded-md bg-[#f5ecd7] border border-[#e7d7b0] items-center justify-center mb-5">
                  <BookOpen className="h-6 w-6 text-[#98753f]" strokeWidth={1.75} />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0a2540] mb-3 tracking-tight">
                  No Enrolled Programs.
                </h3>
                <p className="text-slate-600 mb-7 max-w-sm mx-auto leading-relaxed">
                  Review the program catalog to begin your first program in the
                  Student Portal.
                </p>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 rounded-md bg-[#0a2540] hover:bg-[#123258] px-6 py-3 text-sm font-semibold tracking-wide text-white transition-colors"
                >
                  Explore Programs
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {certificates.length > 0 && (
              <section className="rounded-lg border border-slate-200 bg-white p-6">
                <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#98753f] mb-4 flex items-center gap-2">
                  <Award className="h-3.5 w-3.5" />
                  Credentials Issued
                </p>
                <div className="space-y-2">
                  {certificates.map((cert) => (
                    <Link
                      key={cert.id}
                      href={`/certificate/${cert.id}`}
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-[#fafaf9] transition-colors"
                    >
                      <img
                        src={cert.course.thumbnail}
                        alt=""
                        className="h-10 w-14 rounded-md object-cover shrink-0 border border-slate-200"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-[#0a2540] line-clamp-1">
                          {cert.course.title}
                        </p>
                        <p className="text-xs text-slate-500">
                          Issued {new Date(cert.issuedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {notifications.length > 0 && (
              <section className="rounded-lg border border-slate-200 bg-white p-6">
                <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#98753f] mb-4">
                  Recent Activity
                </p>
                <div className="space-y-4">
                  {notifications.map((n) => (
                    <div key={n.id} className="flex gap-3">
                      <div className="h-8 w-8 rounded-md bg-[#f5ecd7] border border-[#e7d7b0] flex items-center justify-center shrink-0 mt-0.5">
                        <Sparkles className="h-3.5 w-3.5 text-[#98753f]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-[#0a2540]">{n.title}</p>
                        <p className="text-xs text-slate-500 leading-snug mt-0.5">
                          {n.message}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-1 font-medium">
                          {new Date(n.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {recommendedCourses.length > 0 && (
              <section className="rounded-lg border border-slate-200 bg-white p-6">
                <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#98753f] mb-4 flex items-center gap-2">
                  <Star className="h-3.5 w-3.5" />
                  Suggested Programs
                </p>
                <div className="space-y-2">
                  {recommendedCourses.map((course) => (
                    <Link
                      key={course.id}
                      href={`/courses/${course.slug}`}
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-[#fafaf9] transition-colors group"
                    >
                      <img
                        src={course.thumbnail}
                        alt=""
                        className="h-10 w-14 rounded-md object-cover shrink-0 border border-slate-200"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-[#0a2540] line-clamp-1 group-hover:underline decoration-[#b08d57] underline-offset-4 transition-colors">
                          {course.title}
                        </p>
                        <p className="text-xs text-slate-500 font-semibold">
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

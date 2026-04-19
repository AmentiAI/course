import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Users } from "lucide-react";
import DiscussionClient from "./DiscussionClient";

async function getCourseAndEnrollment(slug: string, userId?: string) {
  const course = await prisma.course.findUnique({
    where: { slug },
    select: {
      id: true,
      slug: true,
      title: true,
      thumbnail: true,
      _count: { select: { enrollments: true } },
    },
  });
  if (!course) return null;

  const enrollment = userId
    ? await prisma.enrollment.findUnique({
        where: { userId_courseId: { userId, courseId: course.id } },
      })
    : null;

  return { course, enrollment };
}

export default async function DiscussPage({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await params;
  const session = await getServerSession(authOptions);

  const data = await getCourseAndEnrollment(courseSlug, session?.user?.id);
  if (!data) notFound();

  const { course, enrollment } = data;

  return (
    <div className="min-h-screen bg-white">
      <section className="hero-backdrop border-b border-slate-200 px-4 sm:px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <Link
            href={`/courses/${courseSlug}`}
            className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#98753f] hover:text-[#0a2540] inline-flex items-center gap-1 mb-5 transition-colors"
          >
            <ChevronLeft className="h-3 w-3" />
            Return to Program
          </Link>

          <div className="flex items-start gap-5">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="h-16 w-24 rounded-md object-cover shrink-0 border border-slate-200"
            />
            <div>
              <p className="academic-label mb-2">Seminar Discussion</p>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0a2540] tracking-tight leading-tight mb-2">
                {course.title}.
              </h1>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                <Users className="h-3 w-3" strokeWidth={1.75} />
                {course._count.enrollments} students enrolled
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
        <DiscussionClient
          courseSlug={courseSlug}
          courseId={course.id}
          isEnrolled={!!enrollment}
          isLoggedIn={!!session}
        />
      </div>
    </div>
  );
}

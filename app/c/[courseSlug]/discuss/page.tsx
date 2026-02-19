import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MessageSquare, ArrowLeft, Users } from "lucide-react";
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
    <div className="min-h-screen bg-[#09090b] px-4 py-10">
      <div className="mx-auto max-w-3xl">
        {/* Back link */}
        <Link
          href={`/courses/${courseSlug}`}
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to course
        </Link>

        {/* Header */}
        <div className="flex items-start gap-4 mb-8">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-16 w-24 rounded-lg object-cover shrink-0"
          />
          <div>
            <h1 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-purple-400" />
              Discussion Board
            </h1>
            <p className="text-zinc-400 text-sm">{course.title}</p>
            <p className="text-zinc-600 text-xs mt-1 flex items-center gap-1">
              <Users className="h-3 w-3" />
              {course._count.enrollments} students enrolled
            </p>
          </div>
        </div>

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

import { requireRole } from "@/lib/roles";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CourseEditor from "./CourseEditor";

export const dynamic = "force-dynamic";

export default async function AdminCoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  await requireRole("MODERATOR");
  const { courseId } = await params;

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            orderBy: { order: "asc" },
            select: {
              id: true,
              title: true,
              order: true,
              isFree: true,
              duration: true,
            },
          },
        },
      },
      instructor: { select: { id: true, name: true, email: true } },
    },
  });

  if (!course) notFound();

  const instructors = await prisma.user.findMany({
    where: { role: { in: ["INSTRUCTOR", "ADMIN"] } },
    select: { id: true, name: true, email: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="min-h-screen bg-white">
      <section className="hero-backdrop border-b border-slate-200 px-4 sm:px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/admin/courses"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.15em] uppercase text-[#98753f] hover:text-[#0a2540] mb-4"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
            Program Catalogue
          </Link>
          <p className="academic-label mb-3">{course.category}</p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0a2540] tracking-tight leading-tight">
            {course.title}.
          </h1>
          <p className="text-slate-600 text-[15px] leading-relaxed mt-3 max-w-2xl">
            {course.shortDesc}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
        <CourseEditor course={course} instructors={instructors} />
      </div>
    </div>
  );
}

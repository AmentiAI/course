import { requireRole } from "@/lib/roles";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import UserDetailClient from "./UserDetailClient";

export const dynamic = "force-dynamic";

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { role: actorRole } = await requireRole("MODERATOR");
  const { userId } = await params;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      enrollments: {
        orderBy: { enrolledAt: "desc" },
        include: {
          course: { select: { id: true, slug: true, title: true } },
        },
      },
      certificates: {
        orderBy: { issuedAt: "desc" },
        include: { course: { select: { id: true, title: true, slug: true } } },
      },
      payments: {
        orderBy: { createdAt: "desc" },
        take: 25,
        include: { course: { select: { title: true } } },
      },
    },
  });

  if (!user) notFound();

  const courses = await prisma.course.findMany({
    where: { isPublished: true },
    select: { id: true, title: true },
    orderBy: { title: "asc" },
  });

  const enrolledIds = new Set(user.enrollments.map((e) => e.course.id));
  const certifiedIds = new Set(user.certificates.map((c) => c.course.id));

  return (
    <div className="min-h-screen bg-white">
      <section className="hero-backdrop border-b border-slate-200 px-4 sm:px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/admin/users"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.15em] uppercase text-[#98753f] hover:text-[#0a2540] mb-4"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
            Student Records
          </Link>
          <p className="academic-label mb-3">Student Record</p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0a2540] tracking-tight leading-tight">
            {user.name || user.email || "Unknown Student"}.
          </h1>
          <p className="text-slate-600 text-[15px] mt-2">{user.email}</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <UserDetailClient
          actorRole={actorRole}
          user={{
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt.toISOString(),
          }}
          enrollments={user.enrollments.map((e) => ({
            courseId: e.course.id,
            courseTitle: e.course.title,
            courseSlug: e.course.slug,
            progress: e.progress,
            completedAt: e.completedAt?.toISOString() ?? null,
            enrolledAt: e.enrolledAt.toISOString(),
            certified: certifiedIds.has(e.course.id),
          }))}
          payments={user.payments.map((p) => ({
            id: p.id,
            amount: p.amount,
            currency: p.currency,
            chain: p.chain,
            status: p.status,
            createdAt: p.createdAt.toISOString(),
            courseTitle: p.course?.title ?? null,
          }))}
          availableCourses={courses.filter((c) => !enrolledIds.has(c.id))}
        />
      </div>
    </div>
  );
}

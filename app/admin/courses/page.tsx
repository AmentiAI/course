import { requireRole } from "@/lib/roles";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, ChevronRight, CheckCircle2, Circle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminCoursesPage() {
  await requireRole("MODERATOR");

  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { enrollments: true, modules: true } },
      instructor: { select: { name: true, email: true } },
    },
  });

  return (
    <div className="min-h-screen bg-white">
      <section className="hero-backdrop border-b border-slate-200 px-4 sm:px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.15em] uppercase text-[#98753f] hover:text-[#0a2540] mb-4"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
            Administrative Console
          </Link>
          <p className="academic-label mb-3">Office of the Dean</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#0a2540] tracking-tight leading-tight">
            Curriculum Control.
          </h1>
          <p className="text-slate-600 text-[17px] leading-relaxed mt-3 max-w-2xl">
            Edit program catalogue, organise modules and lessons, and manage
            publication status. Changes take effect immediately.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="rounded-lg border border-slate-200 bg-white p-7">
          <p className="academic-label mb-2">Program Catalogue</p>
          <h2 className="font-serif text-xl font-bold text-[#0a2540] mb-5 tracking-tight">
            All Programs.
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  {["Program", "Category", "Price", "Modules", "Students", "Status", ""].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left text-[10px] text-[#98753f] uppercase tracking-[0.18em] font-bold pb-3 pr-4"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {courses.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-[#fafaf9] transition-colors"
                  >
                    <td className="py-3 pr-4">
                      <div className="text-[#0a2540] font-semibold text-sm truncate max-w-[240px]">
                        {c.title}
                      </div>
                      {c.instructor && (
                        <div className="text-xs text-slate-500 truncate max-w-[240px]">
                          {c.instructor.name || c.instructor.email}
                        </div>
                      )}
                    </td>
                    <td className="py-3 pr-4 text-xs text-slate-600">
                      {c.category}
                    </td>
                    <td className="py-3 pr-4 font-serif font-bold text-[#14532d]">
                      ${c.price}
                    </td>
                    <td className="py-3 pr-4 font-serif font-bold text-[#0a2540]">
                      {c._count.modules}
                    </td>
                    <td className="py-3 pr-4 font-serif font-bold text-[#0a2540]">
                      {c._count.enrollments}
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex gap-2">
                        <StatusPill label="Published" on={c.isPublished} />
                        <StatusPill label="Featured" on={c.isFeatured} />
                      </div>
                    </td>
                    <td className="py-3 text-right">
                      <Link
                        href={`/admin/courses/${c.id}`}
                        className="inline-flex items-center gap-1 text-xs font-bold tracking-[0.15em] uppercase text-[#98753f] hover:text-[#0a2540]"
                      >
                        Edit
                        <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
                      </Link>
                    </td>
                  </tr>
                ))}
                {courses.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-10 text-center text-slate-500 text-sm italic"
                    >
                      No programs in catalogue.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusPill({ label, on }: { label: string; on: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-bold tracking-[0.15em] uppercase px-2 py-0.5 rounded-sm border ${
        on
          ? "bg-[#dcfce7] text-[#14532d] border-[#bbf7d0]"
          : "bg-[#fafaf9] text-slate-500 border-slate-200"
      }`}
    >
      {on ? (
        <CheckCircle2 className="h-3 w-3" strokeWidth={2} />
      ) : (
        <Circle className="h-3 w-3" strokeWidth={2} />
      )}
      {label}
    </span>
  );
}

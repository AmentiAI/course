import { requireRole } from "@/lib/roles";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  Users,
  BookOpen,
  DollarSign,
  Award,
  TrendingUp,
  CheckCircle,
  Clock,
  XCircle,
  BarChart3,
  ArrowRight,
} from "lucide-react";

async function getAdminStats() {
  const [
    totalUsers,
    totalCourses,
    totalEnrollments,
    totalPayments,
    recentPayments,
    recentUsers,
    courseStats,
    totalCerts,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.course.count(),
    prisma.enrollment.count(),
    prisma.payment.aggregate({
      where: { status: "CONFIRMED" },
      _sum: { amount: true },
      _count: true,
    }),
    prisma.payment.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      include: {
        user: { select: { name: true, email: true } },
        course: { select: { title: true } },
      },
    }),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        _count: { select: { enrollments: true } },
      },
    }),
    prisma.course.findMany({
      orderBy: { enrollments: { _count: "desc" } },
      include: {
        _count: { select: { enrollments: true, reviews: true } },
      },
    }),
    prisma.certificate.count(),
  ]);

  return {
    totalUsers,
    totalCourses,
    totalEnrollments,
    totalRevenue: totalPayments._sum.amount ?? 0,
    paymentCount: totalPayments._count,
    recentPayments,
    recentUsers,
    courseStats,
    totalCerts,
  };
}

export default async function AdminPage() {
  await requireRole("MODERATOR");
  const stats = await getAdminStats();

  return (
    <div className="min-h-screen bg-white">
      <section className="hero-backdrop border-b border-slate-200 px-4 sm:px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <p className="academic-label mb-3">Office of the Registrar</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#0a2540] tracking-tight leading-tight">
            Administrative Console.
          </h1>
          <p className="text-slate-600 text-[17px] leading-relaxed mt-3 max-w-2xl">
            Institutional records, enrollment statistics, tuition receipts, and
            academic standing — maintained by the Office of the Registrar.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/admin/analytics"
              className="inline-flex items-center gap-2 rounded-md bg-[#0a2540] text-white px-4 py-2 text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#0f3460] transition-colors"
            >
              <BarChart3 className="h-4 w-4" strokeWidth={2} />
              Institutional Analytics
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
            </Link>
            <Link
              href="/admin/courses"
              className="inline-flex items-center gap-2 rounded-md border border-[#b08d57] bg-white hover:bg-[#f5ecd7] px-4 py-2 text-xs font-bold tracking-[0.15em] uppercase text-[#0a2540] transition-colors"
            >
              <BookOpen className="h-4 w-4" strokeWidth={2} />
              Curriculum Control
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
            </Link>
            <Link
              href="/admin/users"
              className="inline-flex items-center gap-2 rounded-md border border-[#b08d57] bg-white hover:bg-[#f5ecd7] px-4 py-2 text-xs font-bold tracking-[0.15em] uppercase text-[#0a2540] transition-colors"
            >
              <Users className="h-4 w-4" strokeWidth={2} />
              Student Records
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        {/* Primary stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Student Body", value: stats.totalUsers, icon: Users },
            { label: "Programs", value: stats.totalCourses, icon: BookOpen },
            { label: "Enrollments", value: stats.totalEnrollments, icon: TrendingUp },
            {
              label: "Tuition Revenue",
              value: `$${stats.totalRevenue.toFixed(0)}`,
              icon: DollarSign,
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-slate-200 bg-white p-5 border-t-2 border-t-[#b08d57]"
            >
              <stat.icon
                className="h-4 w-4 text-[#98753f] mb-3"
                strokeWidth={1.75}
              />
              <div className="font-serif text-2xl font-bold text-[#0a2540] tracking-tight leading-tight">
                {stat.value}
              </div>
              <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-500 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Secondary stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-[#14532d]" strokeWidth={1.75} />
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-500">
                Confirmed Payments
              </span>
            </div>
            <div className="font-serif text-xl font-bold text-[#0a2540]">
              {stats.paymentCount}
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2 mb-2">
              <Award className="h-4 w-4 text-[#98753f]" strokeWidth={1.75} />
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-500">
                Credentials Conferred
              </span>
            </div>
            <div className="font-serif text-xl font-bold text-[#0a2540]">
              {stats.totalCerts}
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-[#0a2540]" strokeWidth={1.75} />
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-500">
                Tuition per Student
              </span>
            </div>
            <div className="font-serif text-xl font-bold text-[#0a2540]">
              $
              {stats.totalUsers > 0
                ? (stats.totalRevenue / stats.totalUsers).toFixed(0)
                : "0"}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Program enrollment */}
          <div className="rounded-lg border border-slate-200 bg-white p-7">
            <p className="academic-label mb-2">Program Enrollment</p>
            <h2 className="font-serif text-xl font-bold text-[#0a2540] mb-5 tracking-tight">
              Program Register.
            </h2>
            <div className="space-y-1">
              {stats.courseStats.map((course: any) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.slug}`}
                  className="flex items-center justify-between p-3 rounded-md hover:bg-[#fafaf9] transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[#0a2540] line-clamp-1">
                      {course.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">
                      ${course.price} &middot; {course.level}
                    </p>
                  </div>
                  <div className="flex gap-5 ml-4 shrink-0 text-right">
                    <div>
                      <div className="font-serif text-sm font-bold text-[#0a2540]">
                        {course._count.enrollments}
                      </div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-[0.15em] font-bold">
                        Students
                      </div>
                    </div>
                    <div>
                      <div className="font-serif text-sm font-bold text-[#14532d]">
                        ${(course.price * course._count.enrollments).toFixed(0)}
                      </div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-[0.15em] font-bold">
                        Tuition
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent matriculations */}
          <div className="rounded-lg border border-slate-200 bg-white p-7">
            <p className="academic-label mb-2">Admissions Ledger</p>
            <h2 className="font-serif text-xl font-bold text-[#0a2540] mb-5 tracking-tight">
              Recent Matriculations.
            </h2>
            <div className="space-y-1">
              {stats.recentUsers.map((u: any) => (
                <div
                  key={u.id}
                  className="flex items-center gap-3 p-3 rounded-md hover:bg-[#fafaf9] transition-colors"
                >
                  <div className="h-9 w-9 rounded-full bg-[#0a2540] border border-[#b08d57] flex items-center justify-center text-xs font-bold text-white shrink-0 tracking-wider">
                    {u.name?.[0]?.toUpperCase() ?? "?"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[#0a2540] truncate font-serif">
                      {u.name || "Unknown"}
                    </p>
                    <p className="text-xs text-slate-500 truncate">{u.email}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="text-xs text-[#0a2540] font-semibold">
                      {u._count.enrollments} programs
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium mt-0.5">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent tuition receipts */}
        <div className="rounded-lg border border-slate-200 bg-white p-7">
          <p className="academic-label mb-2">Bursar&apos;s Office</p>
          <h2 className="font-serif text-xl font-bold text-[#0a2540] mb-5 tracking-tight">
            Recent Tuition Receipts.
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  {["Student", "Program", "Amount", "Method", "Status", "Date"].map(
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
                {stats.recentPayments.map((payment: any) => (
                  <tr
                    key={payment.id}
                    className="hover:bg-[#fafaf9] transition-colors"
                  >
                    <td className="py-3 pr-4">
                      <div className="text-[#0a2540] text-xs font-semibold truncate max-w-[120px]">
                        {payment.user.name}
                      </div>
                      <div className="text-slate-500 text-xs truncate max-w-[120px]">
                        {payment.user.email}
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <div className="text-slate-700 text-xs truncate max-w-[140px]">
                        {payment.course.title}
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="font-serif text-[#14532d] font-bold">
                        ${payment.amount.toFixed(0)}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="text-[10px] bg-[#fafaf9] border border-slate-200 px-2 py-0.5 rounded-sm text-slate-600 font-bold uppercase tracking-[0.15em]">
                        {payment.chain || payment.currency}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-[0.15em] ${
                          payment.status === "CONFIRMED"
                            ? "bg-[#dcfce7] text-[#14532d] border border-[#bbf7d0]"
                            : payment.status === "PENDING"
                            ? "bg-[#f5ecd7] text-[#98753f] border border-[#e7d7b0]"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {payment.status === "CONFIRMED" ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : payment.status === "PENDING" ? (
                          <Clock className="h-3 w-3" />
                        ) : (
                          <XCircle className="h-3 w-3" />
                        )}
                        {payment.status}
                      </span>
                    </td>
                    <td className="py-3 text-xs text-slate-500 font-medium">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {stats.recentPayments.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-10 text-center text-slate-500 text-sm italic"
                    >
                      No tuition receipts on record.
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

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
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
  Shield,
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
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/auth/signin");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  if (user?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const stats = await getAdminStats();

  return (
    <div className="min-h-screen bg-[#09090b] px-4 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-9 w-9 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
            <Shield className="h-4 w-4 text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
            <p className="text-sm text-zinc-500">SkillMint platform overview</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total Users",
              value: stats.totalUsers,
              icon: Users,
              color: "text-blue-400",
              bg: "bg-blue-400/10",
            },
            {
              label: "Total Courses",
              value: stats.totalCourses,
              icon: BookOpen,
              color: "text-purple-400",
              bg: "bg-purple-400/10",
            },
            {
              label: "Enrollments",
              value: stats.totalEnrollments,
              icon: TrendingUp,
              color: "text-green-400",
              bg: "bg-green-400/10",
            },
            {
              label: "Revenue",
              value: `$${stats.totalRevenue.toFixed(0)}`,
              icon: DollarSign,
              color: "text-amber-400",
              bg: "bg-amber-400/10",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
            >
              <div className={`inline-flex p-2 rounded-lg ${stat.bg} mb-3`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-zinc-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Secondary stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span className="text-sm text-zinc-400">Confirmed Payments</span>
            </div>
            <div className="text-xl font-bold text-white">{stats.paymentCount}</div>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
            <div className="flex items-center gap-2 mb-1">
              <Award className="h-4 w-4 text-amber-400" />
              <span className="text-sm text-zinc-400">Certificates Issued</span>
            </div>
            <div className="text-xl font-bold text-white">{stats.totalCerts}</div>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-zinc-400">Avg Revenue / User</span>
            </div>
            <div className="text-xl font-bold text-white">
              ${stats.totalUsers > 0 ? (stats.totalRevenue / stats.totalUsers).toFixed(0) : "0"}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Course Performance */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <h2 className="font-semibold text-white mb-4">Course Performance</h2>
            <div className="space-y-2">
              {stats.courseStats.map((course: any) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.slug}`}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white line-clamp-1">
                      {course.title}
                    </p>
                    <p className="text-xs text-zinc-500">
                      ${course.price} · {course.level}
                    </p>
                  </div>
                  <div className="flex gap-4 ml-4 shrink-0 text-right">
                    <div>
                      <div className="text-sm font-bold text-white">
                        {course._count.enrollments}
                      </div>
                      <div className="text-xs text-zinc-600">students</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-amber-400">
                        ${(course.price * course._count.enrollments).toFixed(0)}
                      </div>
                      <div className="text-xs text-zinc-600">revenue</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Users */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <h2 className="font-semibold text-white mb-4">Recent Users</h2>
            <div className="space-y-2">
              {stats.recentUsers.map((u: any) => (
                <div
                  key={u.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  <div className="h-8 w-8 rounded-full bg-purple-600/30 border border-purple-500/30 flex items-center justify-center text-xs font-bold text-purple-300 shrink-0">
                    {u.name?.[0]?.toUpperCase() ?? "?"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white truncate">
                      {u.name || "Unknown"}
                    </p>
                    <p className="text-xs text-zinc-500 truncate">{u.email}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="text-xs text-zinc-400">
                      {u._count.enrollments} courses
                    </div>
                    <div className="text-xs text-zinc-600">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Payments */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h2 className="font-semibold text-white mb-4">Recent Payments</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left text-xs text-zinc-500 pb-3 pr-4">User</th>
                  <th className="text-left text-xs text-zinc-500 pb-3 pr-4">Course</th>
                  <th className="text-left text-xs text-zinc-500 pb-3 pr-4">Amount</th>
                  <th className="text-left text-xs text-zinc-500 pb-3 pr-4">Chain</th>
                  <th className="text-left text-xs text-zinc-500 pb-3 pr-4">Status</th>
                  <th className="text-left text-xs text-zinc-500 pb-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {stats.recentPayments.map((payment: any) => (
                  <tr key={payment.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="py-3 pr-4">
                      <div className="text-white text-xs font-medium truncate max-w-[120px]">
                        {payment.user.name}
                      </div>
                      <div className="text-zinc-600 text-xs truncate max-w-[120px]">
                        {payment.user.email}
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <div className="text-zinc-300 text-xs truncate max-w-[140px]">
                        {payment.course.title}
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="text-amber-400 font-semibold">
                        ${payment.amount.toFixed(0)}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="text-xs bg-zinc-800 px-2 py-0.5 rounded text-zinc-400">
                        {payment.chain || payment.currency}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <span
                        className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${
                          payment.status === "CONFIRMED"
                            ? "bg-green-500/10 text-green-400"
                            : payment.status === "PENDING"
                            ? "bg-amber-500/10 text-amber-400"
                            : "bg-red-500/10 text-red-400"
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
                    <td className="py-3 text-xs text-zinc-500">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {stats.recentPayments.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-zinc-600 text-sm">
                      No payments yet
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

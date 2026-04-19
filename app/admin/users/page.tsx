import { requireRole } from "@/lib/roles";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Search } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; role?: string }>;
}) {
  await requireRole("MODERATOR");
  const { q, role } = await searchParams;

  const users = await prisma.user.findMany({
    where: {
      AND: [
        q
          ? {
              OR: [
                { name: { contains: q, mode: "insensitive" as const } },
                { email: { contains: q, mode: "insensitive" as const } },
              ],
            }
          : {},
        role &&
        ["STUDENT", "INSTRUCTOR", "MODERATOR", "ADMIN"].includes(role)
          ? { role: role as "STUDENT" | "INSTRUCTOR" | "MODERATOR" | "ADMIN" }
          : {},
      ],
    },
    orderBy: { createdAt: "desc" },
    take: 100,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      _count: {
        select: {
          enrollments: true,
          certificates: true,
          payments: true,
        },
      },
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
          <p className="academic-label mb-3">Office of Student Services</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#0a2540] tracking-tight leading-tight">
            Student Records.
          </h1>
          <p className="text-slate-600 text-[17px] leading-relaxed mt-3 max-w-2xl">
            Search the student roll. Select a record to adjust role, enrol
            manually, reset progress, or confer credentials.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <form className="flex flex-wrap gap-3 mb-6" action="/admin/users">
          <div className="flex items-center gap-2 flex-1 min-w-[240px] rounded-md border border-slate-200 bg-white px-3">
            <Search className="h-4 w-4 text-slate-400" strokeWidth={1.75} />
            <input
              name="q"
              defaultValue={q}
              placeholder="Search by name or email"
              className="flex-1 py-2 text-sm text-[#0a2540] bg-transparent focus:outline-none"
            />
          </div>
          <select
            name="role"
            defaultValue={role || ""}
            className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-[#0a2540] focus:outline-none focus:border-[#b08d57]"
          >
            <option value="">All roles</option>
            <option value="STUDENT">Student</option>
            <option value="INSTRUCTOR">Instructor</option>
            <option value="MODERATOR">Moderator</option>
            <option value="ADMIN">Admin</option>
          </select>
          <button
            type="submit"
            className="rounded-md bg-[#0a2540] text-white px-4 py-2 text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#123258] transition-colors"
          >
            Filter
          </button>
        </form>

        <div className="rounded-lg border border-slate-200 bg-white p-7">
          <p className="academic-label mb-2">Student Roll</p>
          <h2 className="font-serif text-xl font-bold text-[#0a2540] mb-5 tracking-tight">
            {users.length} Record{users.length === 1 ? "" : "s"}.
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  {["Student", "Role", "Enrollments", "Certificates", "Payments", "Joined", ""].map(
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
                {users.map((u) => (
                  <tr
                    key={u.id}
                    className="hover:bg-[#fafaf9] transition-colors"
                  >
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-[#0a2540] border border-[#b08d57] flex items-center justify-center text-xs font-bold text-white shrink-0 tracking-wider">
                          {u.name?.[0]?.toUpperCase() ??
                            u.email?.[0]?.toUpperCase() ??
                            "?"}
                        </div>
                        <div className="min-w-0">
                          <div className="text-[#0a2540] font-semibold text-sm truncate max-w-[200px] font-serif">
                            {u.name || "Unknown"}
                          </div>
                          <div className="text-xs text-slate-500 truncate max-w-[200px]">
                            {u.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <RoleBadge role={u.role} />
                    </td>
                    <td className="py-3 pr-4 font-serif font-bold text-[#0a2540]">
                      {u._count.enrollments}
                    </td>
                    <td className="py-3 pr-4 font-serif font-bold text-[#98753f]">
                      {u._count.certificates}
                    </td>
                    <td className="py-3 pr-4 font-serif font-bold text-[#14532d]">
                      {u._count.payments}
                    </td>
                    <td className="py-3 pr-4 text-xs text-slate-500 font-medium">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 text-right">
                      <Link
                        href={`/admin/users/${u.id}`}
                        className="inline-flex items-center gap-1 text-xs font-bold tracking-[0.15em] uppercase text-[#98753f] hover:text-[#0a2540]"
                      >
                        Open
                        <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
                      </Link>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-10 text-center text-slate-500 text-sm italic"
                    >
                      No students found.
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

function RoleBadge({ role }: { role: "STUDENT" | "INSTRUCTOR" | "MODERATOR" | "ADMIN" }) {
  const tone =
    role === "ADMIN"
      ? "bg-[#0a2540] text-white border-[#0a2540]"
      : role === "MODERATOR"
      ? "bg-[#f5ecd7] text-[#98753f] border-[#e7d7b0]"
      : role === "INSTRUCTOR"
      ? "bg-[#dcfce7] text-[#14532d] border-[#bbf7d0]"
      : "bg-[#fafaf9] text-slate-600 border-slate-200";
  return (
    <span
      className={`text-[10px] font-bold tracking-[0.15em] uppercase px-2 py-0.5 rounded-sm border ${tone}`}
    >
      {role}
    </span>
  );
}

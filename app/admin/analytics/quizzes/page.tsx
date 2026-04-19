import { requireRole } from "@/lib/roles";
import { getAllQuizSummaries } from "@/lib/analytics";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function QuizAnalyticsPage() {
  await requireRole("MODERATOR");
  const summaries = await getAllQuizSummaries();

  return (
    <div className="min-h-screen bg-white">
      <section className="hero-backdrop border-b border-slate-200 px-4 sm:px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/admin/analytics"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.15em] uppercase text-[#98753f] hover:text-[#0a2540] mb-4"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
            Institutional Analytics
          </Link>
          <p className="academic-label mb-3">Office of Assessment</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#0a2540] tracking-tight leading-tight">
            Assessment Performance.
          </h1>
          <p className="text-slate-600 text-[17px] leading-relaxed mt-3 max-w-2xl">
            Per-assessment attempt counts, pass rates, and average scores.
            Select a quiz to view question-level accuracy.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="rounded-lg border border-slate-200 bg-white p-7">
          <p className="academic-label mb-2">Assessment Register</p>
          <h2 className="font-serif text-xl font-bold text-[#0a2540] mb-5 tracking-tight">
            All Assessments.
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  {["Assessment", "Program", "Questions", "Attempts", "Avg Score", "Pass Rate", ""].map(
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
                {summaries.map((q) => (
                  <tr
                    key={q.quizId}
                    className="hover:bg-[#fafaf9] transition-colors"
                  >
                    <td className="py-3 pr-4 text-[#0a2540] font-semibold text-sm max-w-[280px] truncate">
                      {q.lessonTitle}
                    </td>
                    <td className="py-3 pr-4 text-slate-600 text-xs max-w-[200px] truncate">
                      {q.courseTitle}
                    </td>
                    <td className="py-3 pr-4 font-serif font-bold text-[#0a2540]">
                      {q.questionCount}
                    </td>
                    <td className="py-3 pr-4 font-serif font-bold text-[#0a2540]">
                      {q.attempts}
                    </td>
                    <td className="py-3 pr-4 font-serif font-bold text-[#0a2540]">
                      {q.attempts ? `${q.avgScore}%` : "—"}
                    </td>
                    <td className="py-3 pr-4">
                      {q.attempts ? (
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-24 rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className={`h-full ${
                                q.passRate >= 70
                                  ? "bg-[#14532d]"
                                  : q.passRate >= 40
                                  ? "bg-[#98753f]"
                                  : "bg-rose-600"
                              }`}
                              style={{ width: `${q.passRate}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold text-[#0a2540] w-10">
                            {q.passRate}%
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                    </td>
                    <td className="py-3 text-right">
                      <Link
                        href={`/admin/analytics/quizzes/${q.quizId}`}
                        className="inline-flex items-center gap-1 text-xs font-bold tracking-[0.15em] uppercase text-[#98753f] hover:text-[#0a2540]"
                      >
                        Detail
                        <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
                      </Link>
                    </td>
                  </tr>
                ))}
                {summaries.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-10 text-center text-slate-500 text-sm italic"
                    >
                      No assessments recorded.
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

import { requireRole } from "@/lib/roles";
import { getQuizAnalytics } from "@/lib/analytics";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function QuizDetailPage({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  await requireRole("MODERATOR");
  const { quizId } = await params;
  const data = await getQuizAnalytics(quizId);
  if (!data) notFound();

  return (
    <div className="min-h-screen bg-white">
      <section className="hero-backdrop border-b border-slate-200 px-4 sm:px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/admin/analytics/quizzes"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.15em] uppercase text-[#98753f] hover:text-[#0a2540] mb-4"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
            Assessment Register
          </Link>
          <p className="academic-label mb-3">
            {data.courseTitle} &middot; Assessment Detail
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0a2540] tracking-tight leading-tight">
            {data.lessonTitle}.
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat label="Attempts" value={data.attempts} />
          <Stat label="Unique Students" value={data.uniqueUsers} />
          <Stat label="Avg Score" value={`${data.avgScore}%`} />
          <Stat label="Pass Rate" value={`${data.passRate}%`} />
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-7">
          <p className="academic-label mb-2">Question Register</p>
          <h2 className="font-serif text-xl font-bold text-[#0a2540] mb-5 tracking-tight">
            Per-Question Accuracy.
          </h2>
          <div className="space-y-5">
            {data.questions.map((q, i) => {
              const totalAnswers = q.choiceDistribution.reduce(
                (a, b) => a + b,
                0,
              );
              return (
                <div
                  key={q.id}
                  className="border border-slate-200 rounded-md p-5"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#98753f] mb-1">
                        Question {i + 1}
                      </p>
                      <p className="text-sm text-[#0a2540] font-semibold leading-snug">
                        {q.question}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <div
                        className={`font-serif text-2xl font-bold tracking-tight ${
                          q.accuracy >= 70
                            ? "text-[#14532d]"
                            : q.accuracy >= 40
                            ? "text-[#98753f]"
                            : "text-rose-700"
                        }`}
                      >
                        {q.accuracy}%
                      </div>
                      <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-500">
                        {q.answered} answers
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    {q.options.map((opt, idx) => {
                      const count = q.choiceDistribution[idx] ?? 0;
                      const pct = totalAnswers
                        ? Math.round((count / totalAnswers) * 100)
                        : 0;
                      const isCorrect = idx === q.correctAnswer;
                      return (
                        <div
                          key={idx}
                          className="flex items-center gap-3 text-xs"
                        >
                          <div className="w-4 shrink-0">
                            {isCorrect && (
                              <CheckCircle2
                                className="h-4 w-4 text-[#14532d]"
                                strokeWidth={2}
                              />
                            )}
                          </div>
                          <div
                            className={`w-56 shrink-0 truncate ${
                              isCorrect
                                ? "text-[#14532d] font-semibold"
                                : "text-slate-600"
                            }`}
                          >
                            {opt}
                          </div>
                          <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className={`h-full ${
                                isCorrect ? "bg-[#14532d]" : "bg-slate-400"
                              }`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <div className="w-16 text-right tabular-nums text-slate-500 font-medium">
                            {count} &middot; {pct}%
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 border-t-2 border-t-[#b08d57]">
      <div className="font-serif text-2xl font-bold text-[#0a2540] tracking-tight leading-tight">
        {value}
      </div>
      <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-500 mt-1">
        {label}
      </div>
    </div>
  );
}

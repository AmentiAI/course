import { requireRole } from "@/lib/roles";
import {
  getDailyEventCounts,
  getFunnel,
  getRecentEvents,
  getRevenueSeries,
  getRevenueSummary,
  getTopCoursesByEnrollment,
  type DailyPoint,
  type FunnelStage,
  type RevenuePoint,
} from "@/lib/analytics";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  Users,
  BookOpen,
  Award,
  DollarSign,
  ClipboardList,
} from "lucide-react";

export const dynamic = "force-dynamic";

const RANGE_DAYS = 30;

export default async function AnalyticsPage() {
  await requireRole("MODERATOR");

  const [
    signups,
    enrollments,
    lessonCompletes,
    certificates,
    funnel,
    revSeries,
    revSummary,
    topCourses,
    recent,
  ] = await Promise.all([
    getDailyEventCounts("SIGNUP", RANGE_DAYS),
    getDailyEventCounts("ENROLLMENT", RANGE_DAYS),
    getDailyEventCounts("LESSON_COMPLETE", RANGE_DAYS),
    getDailyEventCounts("CERTIFICATE_ISSUED", RANGE_DAYS),
    getFunnel(RANGE_DAYS),
    getRevenueSeries(RANGE_DAYS),
    getRevenueSummary(RANGE_DAYS),
    getTopCoursesByEnrollment(RANGE_DAYS, 10),
    getRecentEvents(25),
  ]);

  const totalSignups = sumSeries(signups);
  const totalEnrollments = sumSeries(enrollments);
  const totalCompletes = sumSeries(lessonCompletes);
  const totalCerts = sumSeries(certificates);

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
          <p className="academic-label mb-3">Office of Institutional Research</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#0a2540] tracking-tight leading-tight">
            Institutional Analytics.
          </h1>
          <p className="text-slate-600 text-[17px] leading-relaxed mt-3 max-w-2xl">
            A {RANGE_DAYS}-day register of admissions, enrollment progression,
            tuition receipts, and credentials conferred — compiled from the
            institution&apos;s event ledger.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/admin/analytics/quizzes"
              className="inline-flex items-center gap-2 rounded-md border border-[#b08d57] bg-white hover:bg-[#f5ecd7] px-4 py-2 text-xs font-bold tracking-[0.15em] uppercase text-[#0a2540] transition-colors"
            >
              <ClipboardList className="h-4 w-4" strokeWidth={2} />
              Assessment Performance
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 space-y-10">
        {/* Top KPI strip */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <KpiCard
            label="Admissions"
            value={totalSignups}
            icon={Users}
            tone="navy"
          />
          <KpiCard
            label="Enrollments"
            value={totalEnrollments}
            icon={BookOpen}
            tone="navy"
          />
          <KpiCard
            label="Lessons Studied"
            value={totalCompletes}
            icon={TrendingUp}
            tone="navy"
          />
          <KpiCard
            label="Credentials"
            value={totalCerts}
            icon={Award}
            tone="gold"
          />
          <KpiCard
            label="Tuition (USD)"
            value={`$${Math.round(revSummary.totalUsd).toLocaleString()}`}
            icon={DollarSign}
            tone="forest"
          />
        </div>

        {/* Time-series charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            label="Admissions Register"
            title="Daily Admissions."
            series={signups}
            accent="#0a2540"
            suffix=" admitted"
          />
          <ChartCard
            label="Enrollment Register"
            title="Daily Enrollments."
            series={enrollments}
            accent="#b08d57"
            suffix=" enrolled"
          />
          <ChartCard
            label="Academic Progress"
            title="Lessons Completed."
            series={lessonCompletes}
            accent="#14532d"
            suffix=" lessons"
          />
          <ChartCard
            label="Bursar's Ledger"
            title="Tuition Receipts."
            series={revSeries.map((r) => ({ day: r.day, count: r.usd }))}
            accent="#14532d"
            prefix="$"
            suffix=""
          />
        </div>

        {/* Funnel */}
        <div className="rounded-lg border border-slate-200 bg-white p-7">
          <p className="academic-label mb-2">Student Progression</p>
          <h2 className="font-serif text-xl font-bold text-[#0a2540] mb-5 tracking-tight">
            Conversion Funnel.
          </h2>
          <FunnelChart stages={funnel} />
        </div>

        {/* Top courses */}
        <div className="rounded-lg border border-slate-200 bg-white p-7">
          <p className="academic-label mb-2">Program Performance</p>
          <h2 className="font-serif text-xl font-bold text-[#0a2540] mb-5 tracking-tight">
            Top Programs by Enrollment.
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  {["Program", "Enrollments", "Completions", "Completion %", "Tuition"].map(
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
                {topCourses.map((c) => {
                  const rate = c.enrollments
                    ? Math.round((c.completions / c.enrollments) * 100)
                    : 0;
                  return (
                    <tr key={c.id} className="hover:bg-[#fafaf9] transition-colors">
                      <td className="py-3 pr-4">
                        <Link
                          href={`/courses/${c.slug}`}
                          className="text-[#0a2540] text-sm font-semibold hover:underline decoration-[#b08d57] underline-offset-4"
                        >
                          {c.title}
                        </Link>
                      </td>
                      <td className="py-3 pr-4 font-serif text-[#0a2540] font-bold">
                        {c.enrollments}
                      </td>
                      <td className="py-3 pr-4 font-serif text-[#0a2540] font-bold">
                        {c.completions}
                      </td>
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-24 rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className="h-full bg-[#14532d]"
                              style={{ width: `${rate}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold text-[#14532d] w-8">
                            {rate}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 pr-4 font-serif text-[#14532d] font-bold">
                        ${Math.round(c.revenueUsd).toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
                {topCourses.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-10 text-center text-slate-500 text-sm italic"
                    >
                      No enrollments recorded in this period.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent events */}
        <div className="rounded-lg border border-slate-200 bg-white p-7">
          <p className="academic-label mb-2">Event Ledger</p>
          <h2 className="font-serif text-xl font-bold text-[#0a2540] mb-5 tracking-tight">
            Recent Activity.
          </h2>
          <div className="space-y-1">
            {recent.map((e) => (
              <div
                key={e.id}
                className="flex items-center gap-3 p-3 rounded-md hover:bg-[#fafaf9] transition-colors"
              >
                <span
                  className={`text-[10px] font-bold tracking-[0.15em] uppercase px-2 py-0.5 rounded-sm border ${toneForEvent(
                    e.type,
                  )}`}
                >
                  {e.type.replace(/_/g, " ")}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-[#0a2540] truncate">
                    <span className="font-semibold">
                      {e.userName || e.userEmail || "anonymous"}
                    </span>
                    {e.courseTitle && (
                      <>
                        <span className="text-slate-400 mx-2">·</span>
                        <span className="text-slate-700">{e.courseTitle}</span>
                      </>
                    )}
                  </p>
                </div>
                <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
                  {new Date(e.createdAt).toLocaleString()}
                </span>
              </div>
            ))}
            {recent.length === 0 && (
              <p className="py-10 text-center text-slate-500 text-sm italic">
                No events recorded yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function sumSeries(series: DailyPoint[]): number {
  return series.reduce((acc, p) => acc + p.count, 0);
}

function KpiCard({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  tone: "navy" | "gold" | "forest";
}) {
  const iconColor =
    tone === "forest" ? "text-[#14532d]" : tone === "gold" ? "text-[#98753f]" : "text-[#0a2540]";
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 border-t-2 border-t-[#b08d57]">
      <Icon className={`h-4 w-4 ${iconColor} mb-3`} strokeWidth={1.75} />
      <div className="font-serif text-2xl font-bold text-[#0a2540] tracking-tight leading-tight">
        {value}
      </div>
      <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-500 mt-1">
        {label}
      </div>
    </div>
  );
}

function ChartCard({
  label,
  title,
  series,
  accent,
  prefix = "",
  suffix = "",
}: {
  label: string;
  title: string;
  series: { day: string; count: number }[];
  accent: string;
  prefix?: string;
  suffix?: string;
}) {
  const total = series.reduce((a, p) => a + p.count, 0);
  const peak = Math.max(1, ...series.map((p) => p.count));
  const width = 600;
  const height = 140;
  const barGap = 2;
  const barWidth = Math.max(
    2,
    (width - (series.length - 1) * barGap) / series.length,
  );

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-7">
      <p className="academic-label mb-2">{label}</p>
      <div className="flex items-end justify-between mb-5">
        <h2 className="font-serif text-xl font-bold text-[#0a2540] tracking-tight">
          {title}
        </h2>
        <div className="text-right">
          <div className="font-serif text-lg font-bold text-[#0a2540] tracking-tight">
            {prefix}
            {Math.round(total).toLocaleString()}
            {suffix}
          </div>
          <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-500">
            {RANGE_DAYS}-day total
          </div>
        </div>
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="w-full h-32"
        role="img"
        aria-label={title}
      >
        {series.map((p, i) => {
          const h = (p.count / peak) * (height - 8);
          const x = i * (barWidth + barGap);
          const y = height - h;
          return (
            <rect
              key={p.day}
              x={x}
              y={y}
              width={barWidth}
              height={h}
              fill={accent}
              opacity={p.count === 0 ? 0.1 : 1}
            />
          );
        })}
      </svg>
      <div className="flex justify-between mt-2 text-[10px] text-slate-400 font-medium">
        <span>{formatShort(series[0]?.day)}</span>
        <span>{formatShort(series[series.length - 1]?.day)}</span>
      </div>
    </div>
  );
}

function FunnelChart({ stages }: { stages: FunnelStage[] }) {
  const peak = Math.max(1, ...stages.map((s) => s.count));
  return (
    <div className="space-y-3">
      {stages.map((s, i) => {
        const pct = Math.round((s.count / peak) * 100);
        const prev = i === 0 ? null : stages[i - 1].count;
        const dropRate =
          prev && prev > 0 ? Math.round((s.count / prev) * 100) : null;
        return (
          <div key={s.key}>
            <div className="flex items-center justify-between text-sm mb-1">
              <div className="flex items-baseline gap-3">
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#98753f]">
                  Stage {i + 1}
                </span>
                <span className="font-serif text-base font-bold text-[#0a2540]">
                  {s.label}
                </span>
              </div>
              <div className="flex items-baseline gap-3">
                {dropRate !== null && (
                  <span
                    className={`text-[10px] font-bold tracking-[0.15em] uppercase ${
                      dropRate >= 50 ? "text-[#14532d]" : "text-rose-700"
                    }`}
                  >
                    {dropRate}% carry-over
                  </span>
                )}
                <span className="font-serif text-base font-bold text-[#0a2540] tabular-nums">
                  {s.count}
                </span>
              </div>
            </div>
            <div className="h-3 rounded-sm bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-[#0a2540]"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function toneForEvent(type: string): string {
  if (type === "PAYMENT_CONFIRM" || type === "ENROLLMENT")
    return "bg-[#dcfce7] text-[#14532d] border-[#bbf7d0]";
  if (type === "CERTIFICATE_ISSUED")
    return "bg-[#f5ecd7] text-[#98753f] border-[#e7d7b0]";
  if (type === "QUIZ_FAIL" || type === "PAYMENT_INIT")
    return "bg-rose-50 text-rose-700 border-rose-200";
  return "bg-[#fafaf9] text-[#0a2540] border-slate-200";
}

function formatShort(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

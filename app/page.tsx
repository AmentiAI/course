import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  ArrowRight,
  BookOpen,
  ShieldCheck,
  Clock,
  Award,
  CheckCircle2,
  Zap,
  Layers,
} from "lucide-react";

async function getFeaturedCourses() {
  const featured = await prisma.course.findMany({
    where: { isFeatured: true, isPublished: true },
    include: { _count: { select: { enrollments: true } } },
    take: 6,
    orderBy: { createdAt: "desc" },
  });
  if (featured.length > 0) return featured;
  return prisma.course.findMany({
    where: { isPublished: true },
    include: { _count: { select: { enrollments: true } } },
    take: 6,
    orderBy: { createdAt: "desc" },
  });
}

async function getEnrollmentCount() {
  return prisma.enrollment.count();
}

async function getCourseCount() {
  return prisma.course.count({ where: { isPublished: true } });
}

const CATEGORIES = [
  { name: "AI & Automation", href: "/courses?category=AI" },
  { name: "Trading & Markets", href: "/courses?category=Trading" },
  { name: "E-commerce", href: "/courses?category=Ecommerce" },
  { name: "Marketing", href: "/courses?category=Marketing" },
  { name: "Development", href: "/courses?category=Development" },
  { name: "Finance", href: "/courses?category=Finance" },
];

const PILLARS = [
  {
    icon: Zap,
    title: "Made by skilled professionals",
    desc: "Every course is created by someone who does the work for a living — not a generic content farm or celebrity host.",
  },
  {
    icon: Clock,
    title: "Self-paced, lifetime access",
    desc: "Buy once. Learn on your schedule. Revisit the material whenever you need a refresh.",
  },
  {
    icon: Layers,
    title: "Web2 and Web3, one catalog",
    desc: "AI, trading, commerce, marketing, development, and finance — without hopping between platforms.",
  },
  {
    icon: ShieldCheck,
    title: "30-day money-back",
    desc: "If a course isn’t for you, email us within 30 days and we’ll refund it. No drama.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Pick a course",
    desc: "Filter by category, level, or price. Each page shows outcomes, modules, and what you’ll walk away with.",
  },
  {
    step: "02",
    title: "Enroll instantly",
    desc: "Pay with card, PayPal, or crypto. Access unlocks the moment payment clears.",
  },
  {
    step: "03",
    title: "Learn & ship",
    desc: "Work through lessons at your pace. Finish with a project, playbook, or skill you can use right away.",
  },
];

export default async function HomePage() {
  const [courses, totalEnrollments, totalCourses] = await Promise.all([
    getFeaturedCourses(),
    getEnrollmentCount(),
    getCourseCount(),
  ]);

  return (
    <div className="bg-white text-[#0b1727]">
      {/* Hero — brand + logo mark */}
      <section className="relative min-h-[min(88vh,820px)] overflow-hidden bg-[#061525]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 75% 45%, rgba(52, 211, 153, 0.22), transparent 55%), radial-gradient(ellipse 45% 40% at 15% 75%, rgba(56, 189, 248, 0.12), transparent 50%), linear-gradient(160deg, #061525 0%, #0a2540 50%, #0d2f4a 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative mx-auto flex min-h-[min(88vh,820px)] max-w-7xl flex-col justify-center px-4 pb-16 pt-28 sm:px-6 sm:pb-20 lg:pb-24 lg:pt-28">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6">
              <h1 className="mb-5 max-w-xl text-[2.75rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.5rem] animate-[fadeUp_0.7s_ease_both]">
                Skills that pay for themselves.
              </h1>
              <p className="mb-9 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg animate-[fadeUp_0.7s_ease_0.08s_both]">
                Self-paced courses in AI, trading, commerce, marketing, and
                digital business — each one made by a skilled professional,
                built to be used, not just watched.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row animate-[fadeUp_0.7s_ease_0.16s_both]">
                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-400 px-7 py-3.5 text-sm font-semibold tracking-wide text-[#061525] transition-transform hover:bg-emerald-300 hover:scale-[1.02] active:scale-[0.99]"
                >
                  Browse Courses
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition-colors hover:bg-white/10"
                >
                  Sign Up Free
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-7 gap-y-2 text-[13px] text-white/55 animate-[fadeUp_0.7s_ease_0.24s_both]">
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  Lifetime access
                </span>
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  Instant enrollment
                </span>
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  30-day refund
                </span>
              </div>
            </div>

            {/* Big logo mark */}
            <div className="relative flex items-center justify-center lg:col-span-6 animate-[fadeUp_0.9s_ease_0.12s_both]">
              <div
                className="pointer-events-none absolute h-[340px] w-[340px] rounded-full sm:h-[420px] sm:w-[420px] lg:h-[480px] lg:w-[480px]"
                style={{
                  background:
                    "radial-gradient(circle, rgba(52,211,153,0.28) 0%, rgba(52,211,153,0.08) 40%, transparent 70%)",
                }}
              />
              <div className="relative flex flex-col items-center">
                <img
                  src="/logo.png"
                  alt="SkillMint"
                  width={420}
                  height={420}
                  className="h-[220px] w-[220px] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)] sm:h-[300px] sm:w-[300px] lg:h-[380px] lg:w-[380px] animate-[logoFloat_6s_ease-in-out_infinite]"
                />
                <p className="mt-4 text-center text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
                  SkillMint
                </p>
                <p className="mt-1 text-[11px] font-semibold tracking-[0.28em] uppercase text-emerald-300/80">
                  Online Courses
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category strip */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-4 sm:px-6 scrollbar-none">
          {CATEGORIES.map((c) => (
            <Link
              key={c.name}
              href={c.href}
              className="shrink-0 rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-[#0a2540] hover:text-[#0a2540]"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured courses */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <h2 className="mb-3 font-serif text-3xl font-bold tracking-tight text-[#0a2540] sm:text-4xl">
              Featured courses
            </h2>
            <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
              Practical paths across AI, markets, commerce, and digital
              business — pick one and start shipping.
            </p>
          </div>
          <Link
            href="/courses"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#0a2540] transition-colors hover:text-emerald-700"
          >
            View all {totalCourses}+ courses
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((p) => (
            <Link
              key={p.id}
              href={`/courses/${p.slug}`}
              className="group flex flex-col overflow-hidden border border-slate-200 bg-white transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[#0a2540]/40"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                {p.thumbnail ? (
                  <img
                    src={p.thumbnail}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#0a2540]" />
                )}
                <div className="absolute left-3 top-3 bg-white/95 px-2.5 py-1 text-[10px] font-bold tracking-[0.14em] uppercase text-[#0a2540]">
                  {p.category || "Course"}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="mb-2 font-serif text-xl font-bold leading-snug tracking-tight text-[#0a2540] group-hover:underline decoration-emerald-500/60 underline-offset-4">
                  {p.title}
                </h3>
                <p className="mb-5 flex-1 line-clamp-2 text-sm leading-relaxed text-slate-600">
                  {p.shortDesc}
                </p>
                <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
                  <span className="font-semibold text-[#0a2540]">
                    ${p.price}
                  </span>
                  <span className="text-slate-500">
                    {p.totalHours}h · {p.level?.toLowerCase() || "all levels"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why */}
      <section className="border-y border-slate-200 bg-[#f7f8fa]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="mb-12 max-w-2xl">
            <h2 className="mb-3 font-serif text-3xl font-bold tracking-tight text-[#0a2540] sm:text-4xl">
              Built for people who actually use what they learn
            </h2>
            <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
              Less theater. More output. Each course is made by a skilled
              professional and structured so you leave with something you can
              put to work.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((item) => (
              <div key={item.title} className="border-t-2 border-emerald-500/70 pt-5">
                <item.icon
                  className="mb-4 h-5 w-5 text-[#0a2540]"
                  strokeWidth={1.75}
                />
                <h3 className="mb-2 text-[15px] font-semibold text-[#0a2540]">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="mb-12 max-w-2xl">
          <h2 className="mb-3 font-serif text-3xl font-bold tracking-tight text-[#0a2540] sm:text-4xl">
            Three steps from browse to skill
          </h2>
          <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
            No cohorts, no waitlists. Enroll and start the same day.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.map((item) => (
            <div key={item.step} className="relative border border-slate-200 bg-white p-7">
              <p className="mb-4 font-mono text-sm font-bold tracking-wider text-emerald-600">
                {item.step}
              </p>
              <h3 className="mb-2 font-serif text-xl font-bold tracking-tight text-[#0a2540]">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Proof strip */}
      <section className="bg-[#0a2540] text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:py-16">
          {[
            {
              value: totalEnrollments.toLocaleString(),
              label: "Learners enrolled",
            },
            { value: `${totalCourses}+`, label: "Courses available" },
            { value: "Lifetime", label: "Course access" },
            { value: "30 days", label: "Money-back window" },
          ].map((s) => (
            <div key={s.label}>
              <p className="mb-1 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
                {s.value}
              </p>
              <p className="text-xs font-semibold tracking-wider uppercase text-white/50">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #f0fdf4 0%, #ffffff 40%, #eff6ff 100%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
          <Award
            className="mx-auto mb-6 h-8 w-8 text-emerald-600"
            strokeWidth={1.75}
          />
          <h2 className="mb-4 font-serif text-3xl font-bold tracking-tight text-[#0a2540] sm:text-4xl">
            Ready when you are
          </h2>
          <p className="mx-auto mb-9 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg">
            {totalEnrollments > 0
              ? `Join ${totalEnrollments.toLocaleString()}+ learners building practical skills on their own schedule.`
              : "Pick a course, enroll instantly, and learn on your own schedule."}
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#0a2540] px-8 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#123258]"
            >
              <BookOpen className="h-4 w-4" />
              Browse Courses
            </Link>
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-8 py-3.5 text-sm font-semibold tracking-wide text-[#0a2540] transition-colors hover:border-emerald-500 hover:bg-emerald-50"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

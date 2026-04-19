import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  Star,
  ArrowRight,
  BookOpen,
  ShieldCheck,
  Clock,
  GraduationCap,
  Users,
  ScrollText,
  LineChart,
  Award,
  CheckCircle2,
  Compass,
  BookMarked,
  Target,
  Mail,
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

const CREDIBILITY = [
  {
    icon: BookMarked,
    title: "Practical, up-to-date content",
    desc: "Courses built around how the work is actually done today — not recycled theory.",
  },
  {
    icon: Users,
    title: "Real practitioners teaching",
    desc: "Instructors are traders, operators, engineers, and marketers shipping real work.",
  },
  {
    icon: Clock,
    title: "Self-paced, lifetime access",
    desc: "Buy once, learn on your schedule, and revisit the material whenever you need it.",
  },
  {
    icon: Award,
    title: "Web2 and Web3, together",
    desc: "AI, trading, e-commerce, marketing, development, finance, and digital business — all in one catalog.",
  },
  {
    icon: ShieldCheck,
    title: "30-day money-back guarantee",
    desc: "If a course isn't for you, email us within 30 days and we'll refund it.",
  },
];

const WHY_SKILLMINT = [
  {
    title: "Built for income and skills",
    desc: "Every course is designed to help you pick up a skill you can use — to get hired, build a side project, or grow what you already do.",
    icon: Target,
  },
  {
    title: "Taught by people doing the work",
    desc: "Instructors are working professionals who teach what they actually do day-to-day — not generalists reading from a textbook.",
    icon: GraduationCap,
  },
  {
    title: "Structured, no filler",
    desc: "Courses move in a clear arc: fundamentals, applied work, and a concrete output. No 10-hour ramps before you do anything useful.",
    icon: BookOpen,
  },
  {
    title: "Learn on your own schedule",
    desc: "Self-paced with lifetime access. Progress saves as you go — start, stop, and come back whenever you want.",
    icon: Clock,
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Browse the catalog",
    desc: "Filter by category, level, or price. Each course page shows what you'll learn, modules, and the instructor.",
  },
  {
    step: "02",
    title: "Enroll instantly",
    desc: "Pay with card, PayPal, or crypto. Access unlocks the moment your payment clears — no waiting.",
  },
  {
    step: "03",
    title: "Learn at your pace",
    desc: "Work through lessons, videos, and exercises. Your progress saves automatically across devices.",
  },
  {
    step: "04",
    title: "Apply what you've learned",
    desc: "Each course ends with a concrete output — a project, a playbook, or a skill you can put to work right away.",
  },
  {
    step: "05",
    title: "Get your certificate",
    desc: "Finish the course and download a certificate of completion to share on LinkedIn or your portfolio.",
  },
];

const LEARNER_VOICES = [
  {
    name: "Marcus Chen",
    role: "Research Analyst",
    initials: "MC",
    content:
      "I picked up more actionable on-chain analysis in a weekend with this course than I had in months of scraping Twitter threads.",
    program: "Digital Asset Research",
  },
  {
    name: "Priya Sharma",
    role: "Financial Analyst",
    initials: "PS",
    content:
      "The DeFi course was refreshingly current — real protocols, real trade-offs, and walkthroughs I could replicate in a live wallet.",
    program: "Applied DeFi Strategy",
  },
  {
    name: "Jake Morrison",
    role: "Agency Founder",
    initials: "JM",
    content:
      "Rolled one of the AI workflows from the course straight into client delivery. It paid for itself in the first week.",
    program: "AI Systems for Business",
  },
  {
    name: "Sofia Rodriguez",
    role: "Marketing Strategist",
    initials: "SR",
    content:
      "Clear, specific, and no fluff. I finished with a growth playbook I'm actively using — and still reference the lessons.",
    program: "Audience Growth Strategy",
  },
];

const INSTRUCTORS_PREVIEW = [
  {
    name: "Alex Rivera",
    title: "On-chain Analyst",
    expertise: "On-chain analysis · market structure",
    initials: "AR",
  },
  {
    name: "Meera Anand",
    title: "DeFi Researcher",
    expertise: "DeFi · risk modeling · portfolio theory",
    initials: "MA",
  },
  {
    name: "Jordan Park",
    title: "AI Engineer",
    expertise: "Automation · agent architectures",
    initials: "JP",
  },
  {
    name: "Leah Okafor",
    title: "Operator & Growth Lead",
    expertise: "Growth strategy · operator economics",
    initials: "LO",
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
      {/* ───────────── Hero ───────────── */}
      <section className="hero-backdrop relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-20 pb-24 sm:pt-28 sm:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
            {/* Left: copy */}
            <div className="lg:col-span-7">
              <p className="academic-label mb-5">Online Courses</p>
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-[4.25rem] leading-[1.05] tracking-tight font-bold text-[#0a2540] mb-6">
                Practical courses for real skills and real income.
              </h1>
              <p className="text-lg sm:text-[19px] text-slate-600 mb-10 max-w-2xl leading-[1.7]">
                SkillMint is a catalog of self-paced online courses across Web2
                and Web3 — AI, trading, e-commerce, marketing, development,
                finance, and digital business. Taught by people doing the work,
                so you can put it to work too.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[#0a2540] hover:bg-[#123258] px-7 py-4 text-sm font-semibold tracking-wide text-white transition-colors shadow-sm"
                >
                  Browse Courses
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-[#b08d57] bg-white hover:bg-[#f5ecd7] px-7 py-4 text-sm font-semibold tracking-wide text-[#0a2540] transition-colors"
                >
                  Sign Up
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-[13px] text-slate-600">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#14532d]" />
                  Web2 &amp; Web3 courses
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#14532d]" />
                  Lifetime course access
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#14532d]" />
                  30-day money-back guarantee
                </span>
              </div>
            </div>

            {/* Right: course visual */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="relative">
                <div className="relative rounded-lg bg-white border border-slate-200 shadow-[0_25px_50px_-12px_rgba(10,37,64,0.15)] overflow-hidden">
                  {/* Header band */}
                  <div className="bg-[#0a2540] px-6 py-5 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#b08d57]">
                        Our Courses
                      </p>
                      <p className="text-white text-[15px] font-semibold mt-1">
                        Online · Self-paced
                      </p>
                    </div>
                    <GraduationCap className="h-6 w-6 text-white/80" />
                  </div>

                  {/* Live course entries */}
                  <div className="divide-y divide-slate-100">
                    {courses.slice(0, 3).map((p) => {
                      const code = `${p.category.slice(0, 2).toUpperCase()}-${String(
                        p.totalLessons * 10 + 100,
                      ).slice(0, 3)}`;
                      return (
                        <Link
                          key={p.id}
                          href={`/courses/${p.slug}`}
                          className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-[#fafaf9] transition-colors"
                        >
                          <div className="flex items-center gap-4 min-w-0">
                            <span className="text-[11px] font-mono font-bold tracking-wider text-[#98753f] shrink-0">
                              {code}
                            </span>
                            <span className="text-sm font-medium text-[#0a2540] truncate">
                              {p.title}
                            </span>
                          </div>
                          <span className="text-xs text-slate-500 shrink-0 whitespace-nowrap">
                            {p.totalHours} hours
                          </span>
                        </Link>
                      );
                    })}
                    {courses.length === 0 && (
                      <div className="px-6 py-6 text-center text-sm text-slate-500 italic">
                        Catalog coming soon.
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="bg-[#fafaf9] border-t border-slate-100 px-6 py-4 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      Self-paced enrollment
                    </span>
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-[#0a2540]">
                      Available Now
                    </span>
                  </div>
                </div>

                {/* Seal / certificate */}
                <div className="absolute -left-6 -bottom-6 h-24 w-24 rounded-full border-2 border-[#b08d57] bg-white shadow-lg flex items-center justify-center">
                  <div className="text-center">
                    <ScrollText className="h-5 w-5 text-[#98753f] mx-auto mb-0.5" />
                    <p className="text-[8px] font-bold tracking-[0.22em] uppercase text-[#0a2540] leading-tight">
                      Certificate
                      <br />
                      Included
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Credibility strip ───────────── */}
      <section className="border-y border-slate-200 bg-[#fafaf9]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {CREDIBILITY.map((c) => (
              <div
                key={c.title}
                className="flex flex-col gap-2 border-l-2 border-[#b08d57] pl-4"
              >
                <c.icon className="h-5 w-5 text-[#0a2540]" strokeWidth={1.75} />
                <h3 className="text-[13px] font-semibold text-[#0a2540] mt-1">
                  {c.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Featured Courses ───────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-24">
        <div className="mb-14 max-w-3xl">
          <p className="academic-label mb-3">Courses</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#0a2540] tracking-tight leading-[1.1] mb-4">
            Featured Courses.
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Our catalog spans Web2 and Web3 — AI, trading, e-commerce,
            marketing, development, finance, and digital business — with
            each course focused on practical skills you can put to work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((p) => (
            <Link
              key={p.id}
              href={`/courses/${p.slug}`}
              className="course-card group rounded-lg border border-slate-200 bg-white overflow-hidden flex flex-col"
            >
              <div className="aspect-[16/9] bg-slate-100 relative overflow-hidden">
                {p.thumbnail ? (
                  <img
                    src={p.thumbnail}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#0a2540]" />
                )}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm border border-slate-200 px-2.5 py-1 rounded text-[10px] font-bold tracking-[0.15em] uppercase text-[#0a2540]">
                  {p.category || "Course"}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-serif text-xl font-bold text-[#0a2540] mb-2 leading-snug tracking-tight group-hover:underline decoration-[#b08d57] underline-offset-4">
                  {p.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-5 flex-1 line-clamp-3">
                  {p.shortDesc}
                </p>
                <div className="border-t border-slate-100 pt-4 grid grid-cols-3 gap-2 text-[11px] mb-5">
                  <div>
                    <p className="text-slate-400 tracking-wider uppercase font-semibold text-[9px] mb-0.5">
                      Duration
                    </p>
                    <p className="text-[#0a2540] font-semibold">
                      {p.totalHours}h
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 tracking-wider uppercase font-semibold text-[9px] mb-0.5">
                      Level
                    </p>
                    <p className="text-[#0a2540] font-semibold capitalize">
                      {p.level?.toLowerCase() || "All"}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 tracking-wider uppercase font-semibold text-[9px] mb-0.5">
                      Access
                    </p>
                    <p className="text-[#0a2540] font-semibold">Lifetime</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-serif font-bold text-[#0a2540]">
                    ${p.price}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold tracking-wide text-[#98753f] group-hover:text-[#0a2540] transition-colors">
                    View Course
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-[#0a2540] hover:text-[#123258] border-b-2 border-[#b08d57] hover:border-[#98753f] pb-0.5 transition-colors"
          >
            Browse All Courses
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ───────────── Why SkillMint ───────────── */}
      <section className="border-y border-slate-200 bg-[#fafaf9]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-24">
          <div className="mb-14 max-w-3xl">
            <p className="academic-label mb-3">Why SkillMint</p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#0a2540] tracking-tight leading-[1.1] mb-4">
              Skills you can actually use.
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              SkillMint focuses on four things that separate a course worth
              your money from a course that wastes it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WHY_SKILLMINT.map((v) => (
              <div
                key={v.title}
                className="rounded-lg bg-white border border-slate-200 p-8"
              >
                <v.icon
                  className="h-6 w-6 text-[#98753f] mb-5"
                  strokeWidth={1.75}
                />
                <h3 className="font-serif text-xl font-bold text-[#0a2540] mb-3 tracking-tight">
                  {v.title}
                </h3>
                <p className="text-[15px] text-slate-600 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── How It Works ───────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-24">
        <div className="mb-14 max-w-3xl">
          <p className="academic-label mb-3">How It Works</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#0a2540] tracking-tight leading-[1.1] mb-4">
            From browse to built skill in five steps.
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Every course is structured so you move from picking it out to
            actually using what you learned — without getting lost in the
            middle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {HOW_IT_WORKS.map((item) => (
            <div
              key={item.step}
              className="rounded-lg border border-slate-200 bg-white p-6 flex flex-col"
            >
              <p className="font-serif text-4xl font-bold text-[#b08d57] mb-4 leading-none">
                {item.step}
              </p>
              <h3 className="font-serif text-lg font-bold text-[#0a2540] mb-2 tracking-tight">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────── Stats ───────────── */}
      <section className="bg-[#0a2540] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-24">
          <div className="mb-14 max-w-3xl">
            <p className="text-[11px] font-bold tracking-[0.24em] uppercase text-[#b08d57] mb-3">
              By the Numbers
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-4">
              Measured, not marketed.
            </h2>
            <p className="text-white/75 text-lg leading-relaxed">
              Real numbers reflecting our catalog, the people learning on it,
              and how they rate what they got.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                value: totalEnrollments.toLocaleString(),
                label: "Learners enrolled",
                icon: Users,
              },
              {
                value: `${totalCourses}+`,
                label: "Courses available",
                icon: BookOpen,
              },
              {
                value: "94%",
                label: "Completion rate",
                icon: LineChart,
              },
              {
                value: "4.8 / 5",
                label: "Average rating",
                icon: Star,
              },
            ].map((s) => (
              <div
                key={s.label}
                className="border-t-2 border-[#b08d57] pt-6"
              >
                <s.icon
                  className="h-5 w-5 text-[#b08d57] mb-4"
                  strokeWidth={1.75}
                />
                <p className="font-serif text-5xl font-bold tracking-tight mb-2">
                  {s.value}
                </p>
                <p className="text-xs font-semibold tracking-wider uppercase text-white/60">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Learner Testimonials ───────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-24">
        <div className="mb-14 max-w-3xl">
          <p className="academic-label mb-3">Reviews</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#0a2540] tracking-tight leading-[1.1] mb-4">
            What learners are saying.
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Feedback from people who bought a course and put it to work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LEARNER_VOICES.map((t) => (
            <figure
              key={t.name}
              className="rounded-lg border border-slate-200 bg-white p-8"
            >
              <span className="academic-divider mb-5 text-xl">&#8220;</span>
              <blockquote className="text-[#0a2540] leading-[1.7] mb-7 text-[17px] font-serif">
                {t.content}
              </blockquote>
              <figcaption className="flex items-center gap-4 border-t border-slate-100 pt-5">
                <div className="h-11 w-11 rounded-full bg-[#0a2540] flex items-center justify-center text-[11px] font-bold text-white tracking-wider">
                  {t.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-[#0a2540]">
                    {t.name}
                  </div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#98753f] bg-[#f5ecd7] px-2.5 py-1 rounded border border-[#e7d7b0] shrink-0">
                  {t.program}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ───────────── Instructors preview ───────────── */}
      <section className="border-y border-slate-200 bg-[#fafaf9]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-24">
          <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="academic-label mb-3">Instructors</p>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#0a2540] tracking-tight leading-[1.1] mb-4">
                Taught by people doing the work.
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Our instructors are selected for what they've built, shipped,
                and practiced — not just what they've written about.
              </p>
            </div>
            <Link
              href="/instructors"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0a2540] border-b-2 border-[#b08d57] pb-0.5"
            >
              Meet the Instructors
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {INSTRUCTORS_PREVIEW.map((f) => (
              <div
                key={f.name}
                className="rounded-lg border border-slate-200 bg-white p-7 text-center"
              >
                <div className="h-20 w-20 rounded-full bg-[#0a2540] border-2 border-[#b08d57] mx-auto mb-5 flex items-center justify-center text-base font-bold text-white tracking-wider">
                  {f.initials}
                </div>
                <h3 className="font-serif text-base font-bold text-[#0a2540] mb-1">
                  {f.name}
                </h3>
                <p className="text-xs text-[#98753f] font-semibold tracking-wide mb-2">
                  {f.title}
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {f.expertise}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Get Started ───────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5">
            <p className="academic-label mb-3">Get Started</p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#0a2540] tracking-tight leading-[1.1] mb-5">
              Start learning today.
            </h2>
            <p className="text-slate-600 text-[17px] leading-relaxed mb-8">
              No cohort calendar, no waitlist. Sign up, buy the course you
              want, and you're in. Learners come from over forty countries
              and every professional background you can think of.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#0a2540] hover:bg-[#123258] px-7 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors"
              >
                Sign Up
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white hover:border-[#b08d57] hover:bg-[#f5ecd7] px-7 py-3.5 text-sm font-semibold tracking-wide text-[#0a2540] transition-colors"
              >
                Browse Courses
              </Link>
            </div>

            <div className="mt-10 border-t border-slate-200 pt-6 flex items-center gap-3">
              <Mail className="h-4 w-4 text-[#98753f]" />
              <a
                href="mailto:hello@skillmint.online"
                className="text-sm text-slate-600 hover:text-[#0a2540] transition-colors"
              >
                hello@skillmint.online
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
              <div className="px-8 py-5 border-b border-slate-200 bg-[#fafaf9]">
                <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#98753f]">
                  How Enrollment Works
                </p>
              </div>
              <ol className="divide-y divide-slate-100">
                {[
                  {
                    label: "Browse the course catalog",
                    desc: "Filter by category, level, or price. Every course page tells you what you'll learn, the modules, and the instructor.",
                  },
                  {
                    label: "Create your account",
                    desc: "Sign up in under a minute to access your dashboard, saved courses, and progress tracking.",
                  },
                  {
                    label: "Buy the course",
                    desc: "Pay with card, PayPal, or crypto. Access unlocks instantly — no approval process, no waiting.",
                  },
                  {
                    label: "Start learning",
                    desc: "Work through lessons at your own pace. Progress saves automatically so you can pick up where you left off.",
                  },
                  {
                    label: "Get your certificate",
                    desc: "Finish the course and download a certificate of completion for your profile or résumé.",
                  },
                ].map((step, i) => (
                  <li key={step.label} className="px-8 py-5 flex gap-5">
                    <span className="font-serif font-bold text-2xl text-[#b08d57] w-8 shrink-0 leading-none pt-1">
                      0{i + 1}
                    </span>
                    <div>
                      <p className="text-[15px] font-semibold text-[#0a2540] mb-1">
                        {step.label}
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Final CTA ───────────── */}
      <section className="bg-[#fafaf9] border-t border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-24 text-center">
          <Compass className="h-8 w-8 text-[#98753f] mx-auto mb-6" strokeWidth={1.75} />
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#0a2540] tracking-tight leading-[1.1] mb-5">
            Start learning today.
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Join learners from over forty countries picking up practical
            skills on their own schedule.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#0a2540] hover:bg-[#123258] px-8 py-4 text-sm font-semibold tracking-wide text-white transition-colors"
            >
              Browse Courses
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-[#b08d57] bg-white hover:bg-[#f5ecd7] px-8 py-4 text-sm font-semibold tracking-wide text-[#0a2540] transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

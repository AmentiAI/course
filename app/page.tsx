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

async function getFeaturedPrograms() {
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
    title: "Industry-focused curriculum",
    desc: "Programs built around current practice, not outdated theory.",
  },
  {
    icon: Users,
    title: "Expert instructors",
    desc: "Faculty drawn from working professionals and practitioners.",
  },
  {
    icon: Clock,
    title: "Flexible online learning",
    desc: "Self-paced coursework designed around working adults.",
  },
  {
    icon: Award,
    title: "Web2 and Web3, together",
    desc: "AI, trading, e-commerce, marketing, development, finance, and digital business — all in one catalog.",
  },
  {
    icon: ShieldCheck,
    title: "Student-first support",
    desc: "Lifetime access, responsive support, and a 30-day guarantee.",
  },
];

const WHY_SKILLMINT = [
  {
    title: "Structured Curriculum",
    desc: "Every program follows a deliberate arc — fundamentals, applied work, and a capstone deliverable. No filler modules, no wandering content.",
    icon: BookOpen,
  },
  {
    title: "Career-Focused Education",
    desc: "Coursework is measured against industry outcomes. Students leave with portfolio pieces, working projects, or verifiable results.",
    icon: Target,
  },
  {
    title: "Expert-Led Instruction",
    desc: "Faculty include practicing professionals — analysts, engineers, operators — who teach from the reality of the work, not textbook summaries.",
    icon: GraduationCap,
  },
  {
    title: "Flexible Academic Schedule",
    desc: "Programs are self-paced with lifetime access. Study on the schedule of working life. Progress is tracked across every module.",
    icon: Clock,
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Apply or Enroll",
    desc: "Browse the program catalog and enroll directly. No waiting period — access begins immediately after enrollment.",
  },
  {
    step: "02",
    title: "Begin Coursework",
    desc: "Orient to the program overview, meet your instructor, and work through the foundational modules at your own pace.",
  },
  {
    step: "03",
    title: "Complete Guided Modules",
    desc: "Progress through structured lessons with worked examples, reading materials, and applied exercises.",
  },
  {
    step: "04",
    title: "Assessments & Capstone",
    desc: "Demonstrate mastery through module assessments and a culminating project that reflects real-world application.",
  },
  {
    step: "05",
    title: "Earn Your Credential",
    desc: "Receive a verifiable certificate of completion to add to your professional profile or résumé.",
  },
];

const STUDENT_VOICES = [
  {
    name: "Marcus Chen",
    role: "Research Analyst",
    initials: "MC",
    content:
      "The curriculum is unusually disciplined. Each module built on the last, and I finished the program with a portfolio I could actually defend in interviews.",
    program: "Digital Asset Research",
  },
  {
    name: "Priya Sharma",
    role: "Financial Analyst",
    initials: "PS",
    content:
      "What distinguished the program was the instructor's depth. The case studies reflected current practice, and the feedback on my capstone project was substantive.",
    program: "Applied DeFi Strategy",
  },
  {
    name: "Jake Morrison",
    role: "Agency Founder",
    initials: "JM",
    content:
      "I've paid for executive education that wasn't as rigorous. SkillMint's program framework held me to a standard I couldn't have set for myself.",
    program: "AI Systems for Business",
  },
  {
    name: "Sofia Rodriguez",
    role: "Marketing Strategist",
    initials: "SR",
    content:
      "The program was structured like a real academic course — readings, assessments, a final project reviewed by the instructor. I recommend it to colleagues regularly.",
    program: "Audience Growth Strategy",
  },
];

const FACULTY_PREVIEW = [
  {
    name: "Dr. Alex Rivera",
    title: "Chair, Digital Economy Studies",
    expertise: "On-chain analysis · market structure",
    initials: "AR",
  },
  {
    name: "Meera Anand",
    title: "Lecturer in Applied Finance",
    expertise: "DeFi · risk modeling · portfolio theory",
    initials: "MA",
  },
  {
    name: "Jordan Park",
    title: "Senior Instructor, AI Systems",
    expertise: "Automation · agent architectures",
    initials: "JP",
  },
  {
    name: "Leah Okafor",
    title: "Lecturer in Digital Business",
    expertise: "Growth strategy · operator economics",
    initials: "LO",
  },
];

export default async function HomePage() {
  const [programs, totalEnrollments, totalCourses] = await Promise.all([
    getFeaturedPrograms(),
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
              <p className="academic-label mb-5">Online Learning Academy</p>
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-[4.25rem] leading-[1.05] tracking-tight font-bold text-[#0a2540] mb-6">
                Professional Education Designed for Real Career Growth.
              </h1>
              <p className="text-lg sm:text-[19px] text-slate-600 mb-10 max-w-2xl leading-[1.7]">
                SkillMint.Courses helps students gain practical, job-ready
                skills through structured programs, expert instruction, and a
                modern academic experience — delivered entirely online.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[#0a2540] hover:bg-[#123258] px-7 py-4 text-sm font-semibold tracking-wide text-white transition-colors shadow-sm"
                >
                  Explore Programs
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
                  Lifetime program access
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#14532d]" />
                  30-day enrollment guarantee
                </span>
              </div>
            </div>

            {/* Right: academic visual */}
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

                  {/* Live program entries */}
                  <div className="divide-y divide-slate-100">
                    {programs.slice(0, 3).map((p) => {
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
                    {programs.length === 0 && (
                      <div className="px-6 py-6 text-center text-sm text-slate-500 italic">
                        Catalogue coming soon.
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="bg-[#fafaf9] border-t border-slate-100 px-6 py-4 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      Rolling admissions
                    </span>
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-[#0a2540]">
                      Admissions Open
                    </span>
                  </div>
                </div>

                {/* Seal / credential */}
                <div className="absolute -left-6 -bottom-6 h-24 w-24 rounded-full border-2 border-[#b08d57] bg-white shadow-lg flex items-center justify-center">
                  <div className="text-center">
                    <ScrollText className="h-5 w-5 text-[#98753f] mx-auto mb-0.5" />
                    <p className="text-[8px] font-bold tracking-[0.22em] uppercase text-[#0a2540] leading-tight">
                      Credential
                      <br />
                      Issued
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

      {/* ───────────── Featured Programs ───────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-24">
        <div className="mb-14 max-w-3xl">
          <p className="academic-label mb-3">Programs</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#0a2540] tracking-tight leading-[1.1] mb-4">
            Featured Programs &amp; Curricula.
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Our program catalog spans Web2 and Web3 — AI, trading, e-commerce,
            marketing, development, finance, and digital business — each
            structured around applied coursework and assessments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((p) => (
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
                  {p.category || "Program"}
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
                      Credential
                    </p>
                    <p className="text-[#0a2540] font-semibold">Certificate</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-serif font-bold text-[#0a2540]">
                    ${p.price}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold tracking-wide text-[#98753f] group-hover:text-[#0a2540] transition-colors">
                    View Program
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
            View Full Program Catalog
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ───────────── Why SkillMint ───────────── */}
      <section className="border-y border-slate-200 bg-[#fafaf9]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-24">
          <div className="mb-14 max-w-3xl">
            <p className="academic-label mb-3">The SkillMint Approach</p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#0a2540] tracking-tight leading-[1.1] mb-4">
              Academic Rigor Meets Modern Practice.
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              SkillMint is built on four academic principles that distinguish
              our programs from generic online courses.
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

      {/* ───────────── How Learning Works ───────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-24">
        <div className="mb-14 max-w-3xl">
          <p className="academic-label mb-3">The Student Journey</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#0a2540] tracking-tight leading-[1.1] mb-4">
            How Learning Works at SkillMint.
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Every student moves through a structured academic path — from
            enrollment to credential — supported at each stage.
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

      {/* ───────────── Student Outcomes (stats) ───────────── */}
      <section className="bg-[#0a2540] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-24">
          <div className="mb-14 max-w-3xl">
            <p className="text-[11px] font-bold tracking-[0.24em] uppercase text-[#b08d57] mb-3">
              Student Outcomes
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-4">
              Measured, Not Marketed.
            </h2>
            <p className="text-white/75 text-lg leading-relaxed">
              Our outcomes reflect the composition of our student body and the
              quality of the programs we offer.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                value: totalEnrollments.toLocaleString(),
                label: "Students enrolled",
                icon: Users,
              },
              {
                value: `${totalCourses}+`,
                label: "Programs offered",
                icon: BookOpen,
              },
              {
                value: "94%",
                label: "Program completion",
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

      {/* ───────────── Student Testimonials ───────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-24">
        <div className="mb-14 max-w-3xl">
          <p className="academic-label mb-3">Student Success</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#0a2540] tracking-tight leading-[1.1] mb-4">
            In Students' Own Words.
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Reflections from graduates of our programs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {STUDENT_VOICES.map((t) => (
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

      {/* ───────────── Faculty preview ───────────── */}
      <section className="border-y border-slate-200 bg-[#fafaf9]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-24">
          <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="academic-label mb-3">Faculty</p>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#0a2540] tracking-tight leading-[1.1] mb-4">
                Taught by Working Professionals.
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Our faculty are selected for what they've built, shipped, and
                practiced — not just what they've written about.
              </p>
            </div>
            <Link
              href="/instructors"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0a2540] border-b-2 border-[#b08d57] pb-0.5"
            >
              Meet the Faculty
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FACULTY_PREVIEW.map((f) => (
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

      {/* ───────────── Admissions ───────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5">
            <p className="academic-label mb-3">Admissions</p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#0a2540] tracking-tight leading-[1.1] mb-5">
              Enrollment is Open.
            </h2>
            <p className="text-slate-600 text-[17px] leading-relaxed mb-8">
              SkillMint operates on rolling admissions. Programs begin the day
              you enroll — no cohort calendar, no waitlist. Students come from
              over forty countries and a range of professional backgrounds.
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
                Browse Programs
              </Link>
            </div>

            <div className="mt-10 border-t border-slate-200 pt-6 flex items-center gap-3">
              <Mail className="h-4 w-4 text-[#98753f]" />
              <a
                href="mailto:admissions@skillmint.courses"
                className="text-sm text-slate-600 hover:text-[#0a2540] transition-colors"
              >
                admissions@skillmint.courses
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
              <div className="px-8 py-5 border-b border-slate-200 bg-[#fafaf9]">
                <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#98753f]">
                  Enrollment Process
                </p>
              </div>
              <ol className="divide-y divide-slate-100">
                {[
                  {
                    label: "Review the program catalog",
                    desc: "Explore programs by discipline. Each listing includes duration, prerequisites, and learning outcomes.",
                  },
                  {
                    label: "Create your student account",
                    desc: "Set up your account to access your Student Portal, saved programs, and credentials.",
                  },
                  {
                    label: "Enroll in your chosen program",
                    desc: "Complete enrollment with PayPal, credit card, or Bitcoin. Access is granted immediately.",
                  },
                  {
                    label: "Begin coursework",
                    desc: "Meet your instructor, orient to the curriculum, and work through structured modules at your pace.",
                  },
                  {
                    label: "Receive your credential",
                    desc: "Complete the program assessments and capstone to receive your verifiable certificate.",
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
            Begin your program today.
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Join students from over forty countries advancing their careers
            through rigorous, flexible online study.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#0a2540] hover:bg-[#123258] px-8 py-4 text-sm font-semibold tracking-wide text-white transition-colors"
            >
              Explore Programs
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

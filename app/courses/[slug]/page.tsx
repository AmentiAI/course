import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Clock,
  BookOpen,
  Award,
  ChevronDown,
  Play,
  Lock,
  Check,
  ArrowRight,
  Globe,
  BarChart3,
  MessageSquare,
  CreditCard,
  ShieldCheck,
  GraduationCap,
  Monitor,
} from "lucide-react";
import CourseEnrollButton from "@/components/CourseEnrollButton";
import WishlistButton from "@/components/WishlistButton";

async function getCourse(slug: string) {
  return prisma.course.findUnique({
    where: { slug },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            orderBy: { order: "asc" },
            select: {
              id: true,
              title: true,
              duration: true,
              isFree: true,
              order: true,
            },
          },
        },
      },
      _count: { select: { enrollments: true } },
    },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) return { title: "Program Not Found" };

  return {
    title: course.title,
    description: course.shortDesc || course.description?.slice(0, 160),
    openGraph: {
      title: course.title,
      description: course.shortDesc || "",
      type: "website",
      images: course.thumbnail ? [course.thumbnail] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: course.title,
      description: course.shortDesc || "",
      images: course.thumbnail ? [course.thumbnail] : [],
    },
  };
}

const LEARNING_OUTCOMES: Record<string, string[]> = {
  "nft-flipping-masterclass": [
    "Identify undervalued digital assets before broader market recognition",
    "Apply rarity-scoring methodology and floor-sweep analysis",
    "Use professional-grade market tools (NFTNerds, Icy.tools, Blur) effectively",
    "Time position exits for maximized return",
    "Construct a repeatable trading system with measurable performance",
    "Implement tax-efficient strategies for digital asset trading",
    "Recognize and avoid high-frequency beginner errors",
    "Analyze real case studies of 10x+ position outcomes",
  ],
  "bitcoin-ordinals-brc20": [
    "Explain Bitcoin Ordinals architecture and their economic significance",
    "Mint inscriptions on Unisat, Gamma, and OrdinalsBot platforms",
    "Evaluate early Ordinals projects using on-chain and market data",
    "Navigate BRC-20 token mechanics and secondary marketplaces",
    "Use Magic Eden Ordinals and Ordinals Market proficiently",
    "Identify project-level risk indicators and protect capital",
    "Configure secure Bitcoin wallet infrastructure for Ordinals",
    "Construct a research-driven Ordinals portfolio methodology",
  ],
};

const DEFAULT_OUTCOMES = [
  "Apply discipline-specific skills with immediate professional utility",
  "Execute structured frameworks used by working practitioners",
  "Use the tools, platforms, and resources professionals rely on",
  "Recognize and avoid the most common early-career errors",
  "Build repeatable systems for sustained performance",
  "Participate in the SkillMint alumni community",
  "Complete applied exercises that reinforce each module",
  "Earn a verifiable credential on program completion",
];

const DEFAULT_PREREQS = [
  "No formal prerequisites — admission is open.",
  "Reliable internet connection and a modern browser.",
  "Willingness to complete applied exercises and the capstone deliverable.",
];

const FAQS = [
  {
    q: "What format is the program delivered in?",
    a: "All programs are delivered online and are self-paced. Students access video lessons, written materials, assessments, and a capstone project through the Student Portal.",
  },
  {
    q: "How long do I have to complete the program?",
    a: "Enrollment includes lifetime access. Most students complete a program within 6 to 16 weeks depending on program length and weekly availability.",
  },
  {
    q: "Is the credential accredited?",
    a: "SkillMint credentials are not accredited academic degrees. They are verifiable certificates of applied coursework completion, intended to complement traditional credentials and professional experience.",
  },
  {
    q: "What if the program is not a fit?",
    a: "Enrollment is backed by a 30-day refund policy. If the program is not the right fit within 30 days of enrollment, students may request a full refund.",
  },
];

function levelBadge(level: string) {
  const classes: Record<string, string> = {
    BEGINNER: "text-[#14532d] bg-[#dcfce7] border-[#bbf7d0]",
    INTERMEDIATE: "text-[#0a2540] bg-[#e0e7f1] border-[#c7d2e1]",
    ADVANCED: "text-[#7a1f1f] bg-rose-50 border-rose-200",
  };
  return classes[level] || "text-slate-600 bg-slate-50 border-slate-200";
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getCourse(slug);
  if (!course) notFound();

  const session = await getServerSession(authOptions);

  const enrollment = session?.user?.id
    ? await prisma.enrollment.findUnique({
        where: {
          userId_courseId: { userId: session.user.id, courseId: course.id },
        },
      })
    : null;

  const wishlisted = session?.user?.id
    ? await prisma.wishlist.findUnique({
        where: {
          userId_courseId: { userId: session.user.id, courseId: course.id },
        },
      })
    : null;

  const firstFreeLesson = course.modules[0]?.lessons.find((l) => l.isFree);
  const outcomes = LEARNING_OUTCOMES[slug] || DEFAULT_OUTCOMES;
  const programCode = `${course.category.slice(0, 2).toUpperCase()}-${String(
    course.totalLessons * 10 + 100
  ).slice(0, 3)}`;

  return (
    <div className="min-h-screen bg-white">
      {/* Program Header */}
      <section className="hero-backdrop border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 lg:py-20">
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6">
            <Link href="/" className="hover:text-[#0a2540]">
              Academy
            </Link>
            <span className="text-slate-300">/</span>
            <Link href="/courses" className="hover:text-[#0a2540]">
              Programs
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-[#0a2540]">{course.category}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#98753f]">
                  {programCode} &middot; {course.category}
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] font-bold text-[#0a2540] mb-6 leading-[1.05] tracking-tight">
                {course.title}
              </h1>

              <p className="text-lg sm:text-[19px] text-slate-600 mb-8 leading-[1.7] max-w-3xl">
                {course.shortDesc}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded border ${levelBadge(
                    course.level
                  )}`}
                >
                  {course.level}
                </span>
                <span className="text-xs text-slate-600 bg-white border border-slate-200 px-3 py-1 rounded-md inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-[#98753f]" />
                  {course.totalHours}h of coursework
                </span>
                <span className="text-xs text-slate-600 bg-white border border-slate-200 px-3 py-1 rounded-md inline-flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-[#98753f]" />
                  {course.totalLessons} lessons
                </span>
                <span className="text-xs text-slate-600 bg-white border border-slate-200 px-3 py-1 rounded-md inline-flex items-center gap-1.5">
                  <Award className="h-3.5 w-3.5 text-[#98753f]" />
                  Certificate of Completion
                </span>
              </div>
            </div>

            {/* Enrollment Card */}
            <aside className="lg:col-span-5 xl:col-span-4">
              <div className="lg:sticky lg:top-20">
                <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
                  <div className="relative aspect-video bg-slate-100 overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    {course.previewVideo && (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#0a2540]/25">
                        <button className="h-14 w-14 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform shadow-md">
                          <Play className="h-6 w-6 text-[#0a2540] fill-[#0a2540] ml-0.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="p-7">
                    <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#98753f] mb-2">
                      Tuition
                    </p>
                    <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-slate-100">
                      <span className="font-serif text-4xl font-bold text-[#0a2540]">
                        ${course.price}
                      </span>
                      {course.originalPrice &&
                        course.originalPrice > course.price && (
                          <>
                            <span className="text-lg text-slate-400 line-through">
                              ${course.originalPrice}
                            </span>
                            <span className="ml-auto text-[10px] font-bold tracking-widest text-[#14532d] bg-[#dcfce7] px-2 py-1 rounded border border-[#bbf7d0]">
                              {Math.round(
                                ((course.originalPrice - course.price) /
                                  course.originalPrice) *
                                  100
                              )}
                              % OFF
                            </span>
                          </>
                        )}
                    </div>

                    <div className="space-y-2.5 mb-6">
                      <CourseEnrollButton
                        courseId={course.id}
                        courseSlug={course.slug}
                        enrolled={!!enrollment}
                        firstLessonId={firstFreeLesson?.id}
                      />
                      <WishlistButton
                        courseId={course.id}
                        initialWishlisted={!!wishlisted}
                        variant="full"
                        size="md"
                      />
                    </div>

                    <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#98753f] mb-3">
                      This Program Includes
                    </p>
                    <ul className="space-y-2.5 text-sm">
                      {[
                        {
                          icon: Clock,
                          label: `${course.totalHours} hours of coursework`,
                        },
                        {
                          icon: BookOpen,
                          label: `${course.totalLessons} structured lessons`,
                        },
                        {
                          icon: Monitor,
                          label: "Online, self-paced delivery",
                        },
                        {
                          icon: Award,
                          label: "Verifiable certificate",
                        },
                        {
                          icon: ShieldCheck,
                          label: "30-day refund policy",
                        },
                        {
                          icon: CreditCard,
                          label: "PayPal, card, and Bitcoin",
                        },
                      ].map(({ icon: Icon, label }) => (
                        <li
                          key={label}
                          className="flex items-center gap-2.5 text-slate-700"
                        >
                          <Icon className="h-4 w-4 text-[#98753f] shrink-0" />
                          {label}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Program Facts Strip */}
      <section className="border-b border-slate-200 bg-[#fafaf9]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:col-span-7 xl:col-span-8">
            {[
              { label: "Credential", value: "Certificate" },
              { label: "Format", value: "Online · Self-paced" },
              {
                label: "Duration",
                value: `${course.totalHours}h · ${course.totalLessons} lessons`,
              },
              { label: "Level", value: course.level.charAt(0) + course.level.slice(1).toLowerCase() },
            ].map((f) => (
              <div key={f.label} className="border-l-2 border-[#b08d57] pl-4">
                <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#98753f] mb-1.5">
                  {f.label}
                </p>
                <p className="font-serif text-lg font-bold text-[#0a2540] tracking-tight">
                  {f.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main body */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-14">
            {/* Program Overview */}
            <section>
              <p className="academic-label mb-3">Program Overview</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0a2540] mb-6 tracking-tight leading-tight">
                About This Program.
              </h2>
              <div className="prose-school whitespace-pre-line">
                {course.description}
              </div>
            </section>

            {/* Learning Outcomes */}
            <section>
              <p className="academic-label mb-3">Learning Outcomes</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0a2540] mb-6 tracking-tight leading-tight">
                What Students Will Learn.
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6 max-w-2xl">
                On successful completion, students will be able to demonstrate
                the following applied competencies:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {outcomes.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4"
                  >
                    <div className="h-5 w-5 rounded-full bg-[#dcfce7] border border-[#bbf7d0] flex items-center justify-center shrink-0 mt-0.5">
                      <Check
                        className="h-3 w-3 text-[#14532d]"
                        strokeWidth={3}
                      />
                    </div>
                    <span className="text-[15px] text-slate-700 leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Curriculum */}
            <section>
              <div className="flex items-end justify-between mb-6 gap-4 flex-wrap">
                <div>
                  <p className="academic-label mb-3">Curriculum</p>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0a2540] tracking-tight leading-tight">
                    Course Structure &amp; Modules.
                  </h2>
                  <p className="text-sm text-slate-500 mt-2">
                    {course.modules.length} modules &middot; {course.totalLessons}{" "}
                    lessons &middot; {course.totalHours} hours
                  </p>
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white overflow-hidden divide-y divide-slate-200">
                {course.modules.map((module, idx) => (
                  <CurriculumModule
                    key={module.id}
                    module={module}
                    index={idx + 1}
                    enrolled={!!enrollment}
                    courseSlug={course.slug}
                  />
                ))}
              </div>
            </section>

            {/* Requirements */}
            <section>
              <p className="academic-label mb-3">Prerequisites</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0a2540] mb-6 tracking-tight leading-tight">
                Requirements &amp; Prerequisites.
              </h2>
              <ul className="space-y-3">
                {DEFAULT_PREREQS.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-5"
                  >
                    <Check
                      className="h-5 w-5 text-[#14532d] shrink-0 mt-0.5"
                      strokeWidth={2.5}
                    />
                    <span className="text-[15px] text-slate-700 leading-relaxed">
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* FAQ */}
            <section>
              <p className="academic-label mb-3">Frequently Asked</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0a2540] mb-6 tracking-tight leading-tight">
                Program Questions.
              </h2>
              <div className="rounded-lg border border-slate-200 bg-white overflow-hidden divide-y divide-slate-200">
                {FAQS.map((f) => (
                  <details key={f.q} className="group">
                    <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none select-none hover:bg-[#fafaf9] transition-colors">
                      <span className="font-serif text-lg font-bold text-[#0a2540] tracking-tight">
                        {f.q}
                      </span>
                      <ChevronDown className="h-4 w-4 text-[#98753f] group-open:rotate-180 transition-transform shrink-0" />
                    </summary>
                    <div className="px-6 pb-6 text-[15px] text-slate-600 leading-relaxed">
                      {f.a}
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* Discussion link */}
            <section>
              <Link
                href={`/c/${course.slug}/discuss`}
                className="flex items-center gap-5 rounded-lg border border-slate-200 bg-white p-6 hover:border-[#b08d57] transition-colors group"
              >
                <div className="h-12 w-12 rounded-md bg-[#f5ecd7] border border-[#e7d7b0] flex items-center justify-center shrink-0">
                  <MessageSquare className="h-5 w-5 text-[#98753f]" />
                </div>
                <div className="flex-1">
                  <p className="font-serif text-lg font-bold text-[#0a2540] group-hover:underline decoration-[#b08d57] underline-offset-4 tracking-tight">
                    Student Discussion Forum
                  </p>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Ask questions of faculty and peers; share work, receive
                    feedback.
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-[#98753f] shrink-0" />
              </Link>
            </section>
          </div>

          {/* Secondary sidebar column */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="rounded-lg border border-slate-200 bg-white p-7">
              <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#98753f] mb-4">
                Program at a Glance
              </p>
              <dl className="space-y-3.5 text-sm">
                {[
                  { dt: "Department", dd: course.category },
                  {
                    dt: "Level",
                    dd:
                      course.level.charAt(0) +
                      course.level.slice(1).toLowerCase(),
                  },
                  { dt: "Language", dd: course.language },
                  { dt: "Lessons", dd: String(course.totalLessons) },
                  { dt: "Duration", dd: `${course.totalHours} hours` },
                  {
                    dt: "Format",
                    dd: "Online · Self-paced",
                  },
                  { dt: "Credential", dd: "Certificate" },
                  {
                    dt: "Admissions",
                    dd: "Rolling",
                  },
                ].map((row) => (
                  <div
                    key={row.dt}
                    className="flex justify-between gap-3 pb-3 border-b border-slate-100 last:border-b-0 last:pb-0"
                  >
                    <dt className="text-slate-500">{row.dt}</dt>
                    <dd className="font-medium text-[#0a2540] text-right">
                      {row.dd}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-lg border border-slate-200 bg-[#fafaf9] p-7">
              <GraduationCap
                className="h-6 w-6 text-[#98753f] mb-4"
                strokeWidth={1.75}
              />
              <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#98753f] mb-2">
                Admissions
              </p>
              <p className="font-serif text-lg font-bold text-[#0a2540] tracking-tight mb-3">
                Rolling Enrollment.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mb-5">
                Programs begin the day you enroll. No fixed cohort dates, no
                prerequisites, no application fee.
              </p>
              <Link
                href="/admissions"
                className="text-xs font-semibold tracking-wide text-[#98753f] hover:text-[#0a2540] inline-flex items-center gap-1.5 transition-colors"
              >
                View Admissions
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function CurriculumModule({
  module,
  index,
  enrolled,
  courseSlug,
}: {
  module: {
    id: string;
    title: string;
    lessons: {
      id: string;
      title: string;
      duration: number;
      isFree: boolean;
      order: number;
    }[];
  };
  index: number;
  enrolled: boolean;
  courseSlug: string;
}) {
  const totalDuration = module.lessons.reduce((a, b) => a + b.duration, 0);

  return (
    <details className="group">
      <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none select-none hover:bg-[#fafaf9] transition-colors">
        <div className="flex items-center gap-4 min-w-0">
          <span className="font-serif h-10 w-10 rounded-md bg-[#f5ecd7] border border-[#e7d7b0] text-[#98753f] text-sm font-bold flex items-center justify-center shrink-0">
            {String(index).padStart(2, "0")}
          </span>
          <div className="min-w-0">
            <span className="font-serif text-[17px] font-bold text-[#0a2540] tracking-tight block truncate">
              Module {index}: {module.title}
            </span>
            <span className="text-xs text-slate-500">
              {module.lessons.length} lessons &middot; {totalDuration} min
            </span>
          </div>
        </div>
        <ChevronDown className="h-4 w-4 text-[#98753f] group-open:rotate-180 transition-transform shrink-0 ml-3" />
      </summary>
      <div className="border-t border-slate-200 bg-[#fafaf9]">
        {module.lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="flex items-center justify-between px-6 py-3 border-b border-slate-200 last:border-b-0 hover:bg-white transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-7 w-7 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0">
                {lesson.isFree || enrolled ? (
                  <Play className="h-3 w-3 text-[#0a2540] fill-[#0a2540] ml-0.5" />
                ) : (
                  <Lock className="h-3 w-3 text-slate-400" />
                )}
              </div>
              {lesson.isFree || enrolled ? (
                <Link
                  href={`/learn/${courseSlug}/${lesson.id}`}
                  className="text-sm text-slate-700 hover:text-[#0a2540] hover:underline decoration-[#b08d57] underline-offset-4 transition-colors truncate"
                >
                  {lesson.title}
                </Link>
              ) : (
                <span className="text-sm text-slate-500 truncate">
                  {lesson.title}
                </span>
              )}
              {lesson.isFree && (
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#14532d] bg-[#dcfce7] border border-[#bbf7d0] px-1.5 py-0.5 rounded">
                  Preview
                </span>
              )}
            </div>
            <span className="text-xs text-slate-500 shrink-0 ml-3 font-mono">
              {lesson.duration}m
            </span>
          </div>
        ))}
      </div>
    </details>
  );
}

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
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
} from "lucide-react";
import CourseEnrollButton from "@/components/CourseEnrollButton";

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

const WHAT_YOU_LEARN: Record<string, string[]> = {
  "nft-flipping-masterclass": [
    "Identify undervalued NFTs before the market catches on",
    "Read rarity scores and floor sweep opportunities",
    "Use pro tools: NFTNerds, Icy.tools, and Blur effectively",
    "Time your exits for maximum profit",
    "Build a repeatable flipping system that generates consistent income",
    "Tax optimization strategies for NFT traders",
    "Avoid common beginner mistakes that cost thousands",
    "Real case studies of 10x+ flips",
  ],
  "bitcoin-ordinals-brc20": [
    "Understand Bitcoin Ordinals technically and why they matter",
    "Mint inscriptions on Unisat, Gamma, and OrdinalsBot",
    "Evaluate early Ordinals projects before they pump",
    "Navigate BRC-20 token mechanics and marketplaces",
    "Use Magic Eden Ordinals and Ordinals Market effectively",
    "Spot rug pulls and protect your BTC",
    "Secure Bitcoin wallet setup for Ordinals",
    "Build a profitable Ordinals portfolio strategy",
  ],
};

const DEFAULT_LEARN = [
  "Real-world skills you can monetize immediately",
  "Step-by-step frameworks from active practitioners",
  "Tools and resources professionals actually use",
  "How to avoid costly beginner mistakes",
  "Systems for generating consistent income",
  "Community access for ongoing support",
  "Practical exercises to reinforce each concept",
  "Certificate of completion upon finishing",
];

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
          userId_courseId: {
            userId: session.user.id,
            courseId: course.id,
          },
        },
      })
    : null;

  const firstFreeLesson = course.modules[0]?.lessons.find((l) => l.isFree);
  const whatYouLearn = WHAT_YOU_LEARN[slug] || DEFAULT_LEARN;

  const discount = course.originalPrice
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : null;

  return (
    <div className="min-h-screen bg-[#09090b]">
      {/* Hero */}
      <div className="bg-zinc-900 border-b border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 py-4 lg:py-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-zinc-500 mb-2">
            <Link href="/courses" className="hover:text-zinc-300">
              Courses
            </Link>
            <span>/</span>
            <span className="text-zinc-400">{course.category}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
            {course.title}
          </h1>

          <p className="text-zinc-400 text-base mb-4 leading-relaxed">
            {course.shortDesc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs border border-zinc-700 text-zinc-400 px-2.5 py-1 rounded-full">
              {course.level.charAt(0) + course.level.slice(1).toLowerCase()}
            </span>
            <span className="text-xs border border-zinc-700 text-zinc-400 px-2.5 py-1 rounded-full flex items-center gap-1">
              <Globe className="h-3 w-3" />
              {course.language}
            </span>
            {course.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-xs border border-zinc-700 text-zinc-500 px-2.5 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Horizontal Purchase Card */}
          <div className="rounded-xl border border-zinc-700 bg-zinc-950 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
              {/* Thumbnail - left side */}
              <div className="md:col-span-3">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  {course.previewVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                        <Play className="h-5 w-5 text-white fill-white" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Price & Enroll - middle */}
              <div className="md:col-span-4 flex flex-col justify-center">
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-3xl font-bold text-amber-400">
                    ${course.price}
                  </span>
                  {course.originalPrice && (
                    <>
                      <span className="text-base text-zinc-500 line-through">
                        ${course.originalPrice}
                      </span>
                      {discount && (
                        <span className="text-xs font-bold text-green-400">
                          {discount}% OFF
                        </span>
                      )}
                    </>
                  )}
                </div>
                <CourseEnrollButton
                  courseId={course.id}
                  courseSlug={course.slug}
                  enrolled={!!enrollment}
                  firstLessonId={firstFreeLesson?.id}
                />
              </div>

              {/* Stats - right side */}
              <div className="md:col-span-5 flex flex-col justify-center">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                  {[
                    {
                      icon: Clock,
                      label: `${course.totalHours}h content`,
                    },
                    {
                      icon: BookOpen,
                      label: `${course.totalLessons} lessons`,
                    },
                    {
                      icon: BarChart3,
                      label: `${course.level.charAt(0) + course.level.slice(1).toLowerCase()}`,
                    },
                    { icon: Globe, label: course.language },
                    {
                      icon: Award,
                      label: "Certificate",
                    },
                    {
                      icon: CreditCard,
                      label: "Card · SOL · BTC",
                    },
                  ].map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-1.5 text-zinc-400"
                    >
                      <Icon className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
                      <span className="truncate">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="space-y-4">
            {/* What You'll Learn */}
            <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <h2 className="text-xl font-bold text-white mb-4">
                What You&apos;ll Learn
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {whatYouLearn.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Curriculum */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4">
                Course Curriculum
              </h2>
              <div className="text-sm text-zinc-500 mb-3">
                {course.totalLessons} lessons · {course.totalHours} hours total
              </div>
              <div className="space-y-2">
                {course.modules.map((module) => (
                  <CurriculumModule
                    key={module.id}
                    module={module}
                    enrolled={!!enrollment}
                    courseSlug={course.slug}
                  />
                ))}
              </div>
            </section>

            {/* Description */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4">
                About This Course
              </h2>
              <div className="prose prose-invert prose-sm max-w-none text-zinc-400 leading-relaxed whitespace-pre-line">
                {course.description}
              </div>
            </section>

            {/* Discussion board link */}
            <section>
              <div className="mb-6">
                <Link
                  href={`/c/${course.slug}/discuss`}
                  className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 hover:border-purple-500/40 transition-all group"
                >
                  <div className="h-10 w-10 rounded-lg bg-purple-600/20 flex items-center justify-center shrink-0">
                    <MessageSquare className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors">
                      Join the Discussion
                    </p>
                    <p className="text-xs text-zinc-500">
                      Ask questions, get answers from the instructor & community
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-zinc-600 group-hover:text-purple-400 ml-auto transition-colors" />
                </Link>
              </div>
            </section>
        </div>
      </div>
    </div>
  );
}

function CurriculumModule({
  module,
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
  enrolled: boolean;
  courseSlug: string;
}) {
  const totalDuration = module.lessons.reduce((a, b) => a + b.duration, 0);

  return (
    <details className="group rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
      <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none select-none">
        <div>
          <span className="font-medium text-white">{module.title}</span>
          <span className="ml-3 text-sm text-zinc-500">
            {module.lessons.length} lessons · {totalDuration} min
          </span>
        </div>
        <ChevronDown className="h-4 w-4 text-zinc-500 group-open:rotate-180 transition-transform" />
      </summary>
      <div className="border-t border-zinc-800">
        {module.lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="flex items-center justify-between px-5 py-3 hover:bg-zinc-800/50 transition-colors border-b border-zinc-800/50 last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 rounded-full border border-zinc-700 flex items-center justify-center shrink-0">
                {lesson.isFree || enrolled ? (
                  <Play className="h-3 w-3 text-purple-400 fill-purple-400" />
                ) : (
                  <Lock className="h-3 w-3 text-zinc-500" />
                )}
              </div>
              {lesson.isFree || enrolled ? (
                <Link
                  href={`/learn/${courseSlug}/${lesson.id}`}
                  className="text-sm text-zinc-300 hover:text-purple-400 transition-colors"
                >
                  {lesson.title}
                </Link>
              ) : (
                <span className="text-sm text-zinc-500">{lesson.title}</span>
              )}
              {lesson.isFree && (
                <span className="text-xs text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded">
                  Free
                </span>
              )}
            </div>
            <span className="text-xs text-zinc-600 shrink-0 ml-3">
              {lesson.duration} min
            </span>
          </div>
        ))}
      </div>
    </details>
  );
}

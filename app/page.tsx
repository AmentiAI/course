import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Star, Users, BookOpen, Award, ArrowRight, TrendingUp, Zap, Shield, Clock, Search, CreditCard, GraduationCap } from "lucide-react";
import CourseCard from "@/components/CourseCard";

async function getFeaturedCourses() {
  return prisma.course.findMany({
    where: { isFeatured: true, isPublished: true },
    include: {
      _count: { select: { enrollments: true } },
    },
    take: 6,
    orderBy: { createdAt: "desc" },
  });
}

async function getAllCourses() {
  return prisma.course.findMany({
    where: { isPublished: true },
    include: {
      _count: { select: { enrollments: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 10,
  });
}

const CATEGORIES = [
  { name: "Web3 & Crypto", color: "from-purple-600 to-purple-800" },
  { name: "AI & Automation", color: "from-blue-600 to-blue-800" },
  { name: "Trading", color: "from-green-600 to-green-800" },
  { name: "E-Commerce", color: "from-orange-600 to-orange-800" },
  { name: "Social Media", color: "from-pink-600 to-pink-800" },
  { name: "Freelancing", color: "from-yellow-600 to-yellow-800" },
];

const TESTIMONIALS = [
  {
    name: "Marcus Chen",
    role: "NFT Trader → $12k/mo",
    avatar: "MC",
    content:
      "The NFT Flipping Masterclass changed everything for me. I went from knowing nothing to flipping consistently profitable. The tools section alone saved me hours of research time. Made back my course fee in the first week.",
    rating: 5,
    course: "NFT Flipping Masterclass",
  },
  {
    name: "Priya Sharma",
    role: "DeFi Yield Farmer",
    avatar: "PS",
    content:
      "Solana DeFi Yield Strategies is the most practical DeFi course I've found. It doesn't just explain theory — it walks you through real positions with real numbers. My portfolio is up 340% since taking this.",
    rating: 5,
    course: "Solana DeFi Yield Strategies",
  },
  {
    name: "Jake Morrison",
    role: "AI Agency Owner → $10k/mo",
    avatar: "JM",
    content:
      "Built my first AI automation agency using exactly the frameworks from the AI Automation Business course. The case study at the end is gold. Step-by-step, real numbers, no BS. Went from $0 to $10k in 3 months.",
    rating: 5,
    course: "AI Automation Business",
  },
  {
    name: "Sofia Rodriguez",
    role: "Twitter Creator → 45k followers",
    avatar: "SR",
    content:
      "Twitter Growth to $10k/Month gave me the exact viral tweet formulas that 10x'd my account in 60 days. I'm now making $8k/month just from affiliate deals and digital product sales. Worth every penny.",
    rating: 5,
    course: "Twitter/X Growth to $10k/Month",
  },
];

export default async function HomePage() {
  const [featuredCourses, allCourses] = await Promise.all([
    getFeaturedCourses(),
    getAllCourses(),
  ]);

  const coursesToShow = featuredCourses.length > 0 ? featuredCourses : allCourses.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#09090b]">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-20 pb-24 sm:pt-32 sm:pb-32">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />
          <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-purple-800/15 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-full max-w-2xl rounded-full bg-purple-900/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm text-purple-300">
            <Zap className="h-3.5 w-3.5" />
            <span>500+ students already earning online</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6">
            Turn Skills Into{" "}
            <span className="relative">
              <span className="gradient-text">Income</span>
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-zinc-400 mb-10">
            Master Web3, crypto trading, AI automation, and digital business with
            courses built by people actually doing it. Real strategies. Real results.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 px-8 py-4 text-base font-semibold text-white transition-all hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5"
            >
              Browse All Courses
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 px-8 py-4 text-base font-semibold text-zinc-300 hover:text-white transition-all"
            >
              <BookOpen className="h-4 w-4" />
              See Free Previews
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-16">
            {[
              { value: "10+", label: "Premium Courses", icon: BookOpen },
              { value: "500+", label: "Active Students", icon: Users },
              { value: "4.8★", label: "Average Rating", icon: Star },
              { value: "100%", label: "Practical Content", icon: Award },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-zinc-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 py-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Explore Categories
            </h2>
            <p className="text-zinc-500">Find your path to financial independence</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                href={`/courses?category=${encodeURIComponent(cat.name)}`}
                className="group flex flex-col items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 hover:border-purple-500/50 hover:bg-zinc-900 transition-all cursor-pointer"
              >
                <span className="text-sm font-medium text-zinc-400 group-hover:text-white text-center transition-colors">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              How It Works
            </h2>
            <p className="text-zinc-500 max-w-xl mx-auto">
              From zero to income in three steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-8 left-[calc(33%+1rem)] right-[calc(33%+1rem)] h-px bg-gradient-to-r from-purple-600 to-purple-600/20" />
            {[
              {
                step: "01",
                icon: Search,
                title: "Browse & Choose",
                desc: "Pick from 10+ courses taught by practitioners actively earning in their niche. Filter by category, level, or income potential.",
                color: "text-purple-400",
                bg: "bg-purple-400/10",
              },
              {
                step: "02",
                icon: CreditCard,
                title: "Enroll & Pay",
                desc: "Pay securely with card, Solana, or Bitcoin. Instant access — no waiting, no approval needed.",
                color: "text-blue-400",
                bg: "bg-blue-400/10",
              },
              {
                step: "03",
                icon: GraduationCap,
                title: "Learn & Earn",
                desc: "Watch at your pace, complete lessons, get certified. Apply the strategies immediately and start generating income.",
                color: "text-green-400",
                bg: "bg-green-400/10",
              },
            ].map((item) => (
              <div key={item.step} className="relative flex flex-col items-center text-center">
                <div className={`relative z-10 inline-flex p-4 rounded-2xl ${item.bg} mb-5`}>
                  <item.icon className={`h-7 w-7 ${item.color}`} />
                  <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-zinc-800 border border-zinc-700 text-xs font-bold text-zinc-400 flex items-center justify-center">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-purple-500/25"
            >
              Start Your Journey
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                Featured Courses
              </h2>
              <p className="text-zinc-500">Hand-picked for maximum income potential</p>
            </div>
            <Link
              href="/courses"
              className="hidden sm:flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {coursesToShow.map((course, idx) => (
              <CourseCard
                key={course.id}
                course={course}
                isNew={idx >= 7}
                isPopular={idx < 3}
              />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 hover:border-purple-500/50 bg-zinc-800/50 hover:bg-zinc-800 px-6 py-3 text-sm font-medium text-zinc-300 hover:text-white transition-all"
            >
              View All {allCourses.length} Courses
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why SkillMint */}
      <section className="px-4 py-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Why SkillMint?
            </h2>
            <p className="text-zinc-500 max-w-xl mx-auto">
              We don't sell theory. Every course is built by practitioners who are
              actively earning in the fields they teach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: TrendingUp,
                title: "Income-Focused",
                desc: "Every lesson connects back to real monetization strategies you can implement today.",
                color: "text-green-400",
                bg: "bg-green-400/10",
              },
              {
                icon: Users,
                title: "Built by Earners",
                desc: "Our instructors are actively making money in their fields — not just teaching from textbooks.",
                color: "text-purple-400",
                bg: "bg-purple-400/10",
              },
              {
                icon: Shield,
                title: "Crypto Payments",
                desc: "Pay with SOL, BTC, or card. We're Web3 native because we believe in what we teach.",
                color: "text-blue-400",
                bg: "bg-blue-400/10",
              },
              {
                icon: Clock,
                title: "Learn at Your Pace",
                desc: "Lifetime access to all course content. Watch, rewatch, and implement on your schedule.",
                color: "text-amber-400",
                bg: "bg-amber-400/10",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5"
              >
                <div className={`inline-flex p-2.5 rounded-lg ${feature.bg} mb-4`}>
                  <feature.icon className={`h-5 w-5 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Real Results, Real People
            </h2>
            <p className="text-zinc-500">Don't take our word for it</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed mb-5">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold text-white">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{t.name}</div>
                    <div className="text-xs text-zinc-500">{t.role}</div>
                  </div>
                  <div className="ml-auto">
                    <span className="text-xs text-purple-400 bg-purple-400/10 px-2 py-1 rounded-full">
                      {t.course}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-3xl text-center">
          <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-900/30 to-zinc-900 p-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Start Earning?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Join hundreds of students who turned their curiosity into cashflow.
              Pick a course and start today.
            </p>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 px-8 py-4 text-base font-semibold text-white transition-all hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5"
            >
              Start Learning Now
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-4 text-xs text-zinc-600">
              Crypto payments accepted · Instant access · Lifetime content
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-7 w-7 rounded-lg bg-purple-600 flex items-center justify-center">
                  <Zap className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="font-bold text-white">
                  Skill<span className="text-purple-400">Mint</span>
                </span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Where Skills Become Income. Premium courses on Web3, crypto, AI,
                and digital business.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-zinc-300 mb-3">Learn</h4>
              <ul className="space-y-2 text-sm text-zinc-600">
                <li><Link href="/courses" className="hover:text-zinc-400 transition-colors">All Courses</Link></li>
                <li><Link href="/courses?category=Web3+%26+Crypto" className="hover:text-zinc-400 transition-colors">Web3</Link></li>
                <li><Link href="/courses?category=Trading" className="hover:text-zinc-400 transition-colors">Trading</Link></li>
                <li><Link href="/courses?category=AI+%26+Automation" className="hover:text-zinc-400 transition-colors">AI</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-zinc-300 mb-3">Account</h4>
              <ul className="space-y-2 text-sm text-zinc-600">
                <li><Link href="/auth/signin" className="hover:text-zinc-400 transition-colors">Sign In</Link></li>
                <li><Link href="/auth/signup" className="hover:text-zinc-400 transition-colors">Sign Up Free</Link></li>
                <li><Link href="/dashboard" className="hover:text-zinc-400 transition-colors">Dashboard</Link></li>
                <li><Link href="/bundles" className="hover:text-zinc-400 transition-colors">Course Bundles</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-zinc-300 mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-zinc-600">
                <li><Link href="/about" className="hover:text-zinc-400 transition-colors">About</Link></li>
                <li><Link href="/instructors" className="hover:text-zinc-400 transition-colors">Instructors</Link></li>
                <li><Link href="/bundles" className="hover:text-zinc-400 transition-colors">Bundles</Link></li>
                <li><Link href="/privacy" className="hover:text-zinc-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-zinc-400 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-zinc-700">
              © 2026 SkillMint. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="text-xs text-zinc-700 hover:text-zinc-500 transition-colors">Privacy</Link>
              <Link href="/terms" className="text-xs text-zinc-700 hover:text-zinc-500 transition-colors">Terms</Link>
              <p className="text-xs text-zinc-700">
                Not financial advice. Educational content only.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

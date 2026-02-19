import Link from "next/link";
import { Star, Users, BookOpen, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

const FEATURED_INSTRUCTORS = [
  {
    id: "1",
    name: "Alex Rivera",
    avatar: "AR",
    title: "NFT Trader & Web3 Strategist",
    bio: "Full-time NFT trader since 2021. Generated $2M+ in trading volume across 15 collections. Specializes in identifying undervalued projects before they pump.",
    rating: 4.9,
    students: 847,
    courses: ["NFT Flipping Masterclass", "Bitcoin Ordinals & BRC-20"],
    earnings: "$180k/yr from trading",
    color: "from-purple-600 to-blue-600",
    tags: ["NFT", "Web3", "Trading"],
  },
  {
    id: "2",
    name: "Sarah Kim",
    avatar: "SK",
    title: "DeFi Yield Farmer & Solana Dev",
    bio: "Early Solana ecosystem contributor. Manages $500k+ in DeFi positions. Built automated yield strategies that run 24/7. Regular speaker at Breakpoint conference.",
    rating: 4.8,
    students: 623,
    courses: ["Solana DeFi Yield Strategies"],
    earnings: "$25k/mo from DeFi",
    color: "from-green-600 to-teal-600",
    tags: ["DeFi", "Solana", "Yield Farming"],
  },
  {
    id: "3",
    name: "Marcus Johnson",
    avatar: "MJ",
    title: "AI Agency Owner & Automation Expert",
    bio: "Built a $300k/yr AI automation agency from scratch in 18 months. Serves 40+ clients across e-commerce, real estate, and SaaS. Former software engineer turned entrepreneur.",
    rating: 4.9,
    students: 1204,
    courses: ["AI Automation Business"],
    earnings: "$300k/yr agency",
    color: "from-blue-600 to-indigo-600",
    tags: ["AI", "Automation", "Business"],
  },
  {
    id: "4",
    name: "Priya Nair",
    avatar: "PN",
    title: "Crypto Options Trader",
    bio: "Institutional-grade options strategies applied to crypto markets. 3 years of consistent profits using systematic approaches. Former quant trader at a hedge fund.",
    rating: 4.7,
    students: 412,
    courses: ["Crypto Options Trading"],
    earnings: "30-40% annual returns",
    color: "from-amber-600 to-orange-600",
    tags: ["Options", "Trading", "Crypto"],
  },
  {
    id: "5",
    name: "Tyler Brooks",
    avatar: "TB",
    title: "Twitter Growth Expert & Creator",
    bio: "Grew from 0 to 250k followers in 2 years. Makes $15k/month from Twitter alone through affiliate deals, digital products, and sponsored content. Teaches real growth tactics.",
    rating: 4.8,
    students: 2341,
    courses: ["Twitter/X Growth to $10k/Month"],
    earnings: "$15k/mo from Twitter",
    color: "from-sky-600 to-cyan-600",
    tags: ["Social Media", "Content", "Growth"],
  },
  {
    id: "6",
    name: "Emma Weston",
    avatar: "EW",
    title: "Dropshipping & E-Commerce CEO",
    bio: "Built and scaled 3 dropshipping stores to 7-figures each. Now teaches the exact systems and supplier relationships that made it possible. Zero inventory, maximum profit.",
    rating: 4.9,
    students: 1876,
    courses: ["Dropshipping to $10k/Month"],
    earnings: "$1.2M/yr e-commerce",
    color: "from-pink-600 to-rose-600",
    tags: ["E-Commerce", "Dropshipping", "Business"],
  },
];

export default async function InstructorsPage() {
  // Get real course data for student counts
  const courses = await prisma.course.findMany({
    where: { isPublished: true },
    select: { title: true, _count: { select: { enrollments: true } } },
  });

  return (
    <div className="min-h-screen bg-[#09090b] px-4 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm text-purple-300 mb-5">
            <Star className="h-3.5 w-3.5 fill-purple-300" />
            <span>Learn from active earners, not academics</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Meet Your Instructors
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Every instructor on SkillMint is actively earning in their field.
            No theory. No outdated knowledge. Just real strategies from real practitioners.
          </p>
        </div>

        {/* Instructor grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {FEATURED_INSTRUCTORS.map((instructor) => (
            <div
              key={instructor.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden hover:border-purple-500/40 transition-all group"
            >
              {/* Header gradient */}
              <div className={`h-20 bg-gradient-to-r ${instructor.color} relative`}>
                <div className="absolute -bottom-8 left-5">
                  <div className="h-16 w-16 rounded-2xl bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center text-xl font-bold text-white shadow-lg">
                    {instructor.avatar}
                  </div>
                </div>
              </div>

              <div className="pt-12 px-5 pb-5">
                <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                  {instructor.name}
                </h3>
                <p className="text-sm text-purple-400 mb-1">{instructor.title}</p>
                <p className="text-xs text-green-400 font-medium mb-3">
                  💰 {instructor.earnings}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1 text-xs text-zinc-500">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-medium text-amber-400">{instructor.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-zinc-500">
                    <Users className="h-3.5 w-3.5" />
                    {instructor.students.toLocaleString()} students
                  </div>
                  <div className="flex items-center gap-1 text-xs text-zinc-500">
                    <BookOpen className="h-3.5 w-3.5" />
                    {instructor.courses.length} course{instructor.courses.length !== 1 ? "s" : ""}
                  </div>
                </div>

                <p className="text-sm text-zinc-400 leading-relaxed mb-4 line-clamp-3">
                  {instructor.bio}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {instructor.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Course links */}
                <div className="border-t border-zinc-800 pt-4">
                  <p className="text-xs font-medium text-zinc-500 mb-2">Courses</p>
                  {instructor.courses.map((course) => (
                    <Link
                      key={course}
                      href={`/courses?q=${encodeURIComponent(course)}`}
                      className="flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 transition-colors mt-1"
                    >
                      <ArrowRight className="h-3 w-3" />
                      {course}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-zinc-900 p-10">
          <h2 className="text-2xl font-bold text-white mb-3">
            Want to Teach on SkillMint?
          </h2>
          <p className="text-zinc-400 mb-6 max-w-lg mx-auto">
            We&apos;re always looking for practitioners who are actively earning in their niche.
            If you have a proven track record and want to monetize your knowledge, reach out.
          </p>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 px-6 py-3 text-sm font-semibold text-white transition-all"
          >
            Browse All Courses
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

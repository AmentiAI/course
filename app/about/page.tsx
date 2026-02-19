import Link from "next/link";
import { Zap, Users, TrendingUp, Award, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#09090b] px-4 py-16">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="h-12 w-12 rounded-2xl bg-purple-600 flex items-center justify-center">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-3xl font-bold text-white">
              Skill<span className="text-purple-400">Mint</span>
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">
            Where Skills Become Income
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
            SkillMint was built by practitioners frustrated with theory-heavy courses
            that don&apos;t translate to real results. We only teach what works — right now,
            in today&apos;s economy.
          </p>
        </div>

        {/* Mission */}
        <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-zinc-900 p-8 mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-zinc-300 leading-relaxed text-lg">
            Most online education teaches you what someone learned 5 years ago. We
            believe that&apos;s broken. At SkillMint, every instructor must be actively
            earning in their field right now. No academics. No outdated playbooks.
            Just proven strategies from people doing it today.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { value: "10+", label: "Expert Instructors", icon: Users },
            { value: "500+", label: "Active Students", icon: Users },
            { value: "4.8★", label: "Average Rating", icon: Award },
            { value: "$2M+", label: "Student Earnings", icon: TrendingUp },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 text-center"
            >
              <div className="text-2xl font-bold text-purple-400 mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-zinc-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                title: "Practitioner-Led",
                desc: "Every instructor is verified to be actively earning in their niche. We don't allow theory-only educators.",
              },
              {
                title: "Results-Focused",
                desc: "We measure success by student outcomes — income generated, skills monetized, businesses launched.",
              },
              {
                title: "Web3 Native",
                desc: "We accept crypto payments because we believe in the technology. Bitcoin, Solana, and card all welcome.",
              },
              {
                title: "No Fluff",
                desc: "Dense, actionable content only. If a lesson doesn't teach something you can implement, it gets cut.",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5"
              >
                <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                  {v.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 px-8 py-4 text-base font-semibold text-white transition-all hover:shadow-lg hover:shadow-purple-500/25"
          >
            Browse Courses
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

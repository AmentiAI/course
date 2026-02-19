import Link from "next/link";
import { Package, Star, ArrowRight, Check, Zap, TrendingUp } from "lucide-react";

const BUNDLES = [
  {
    id: "web3-stack",
    name: "Complete Web3 Stack",
    description:
      "Master every layer of Web3 — from NFT flipping to DeFi yields to Bitcoin Ordinals. The complete income playbook for crypto natives.",
    courses: [
      { title: "NFT Flipping Masterclass", price: 197 },
      { title: "Solana DeFi Yield Strategies", price: 147 },
      { title: "Bitcoin Ordinals & BRC-20", price: 127 },
    ],
    originalTotal: 471,
    bundlePrice: 297,
    savings: 37,
    badge: "🔥 Most Popular",
    color: "from-purple-600 to-blue-600",
    borderColor: "border-purple-500/40",
    features: [
      "All 3 courses with lifetime access",
      "Private Web3 community Discord",
      "Weekly live trading sessions",
      "Certificates for all courses",
      "Priority instructor support",
    ],
  },
  {
    id: "creator-stack",
    name: "Digital Creator Empire",
    description:
      "Build an audience and monetize it. Twitter growth, dropshipping, and freelancing combined into the ultimate creator income stack.",
    courses: [
      { title: "Twitter/X Growth to $10k/Month", price: 97 },
      { title: "Dropshipping to $10k/Month", price: 147 },
      { title: "Freelancing to $5k/Month", price: 97 },
    ],
    originalTotal: 341,
    bundlePrice: 197,
    savings: 42,
    badge: "⚡ Best Value",
    color: "from-amber-600 to-orange-600",
    borderColor: "border-amber-500/40",
    features: [
      "All 3 courses with lifetime access",
      "Content calendar templates",
      "Supplier contact list (100+ verified)",
      "Client outreach scripts",
      "Monthly group coaching call",
    ],
  },
  {
    id: "ai-future",
    name: "AI & Future of Work",
    description:
      "The skills that will matter in 5 years. AI automation, crypto options, and advanced trading strategies for the next economic wave.",
    courses: [
      { title: "AI Automation Business", price: 197 },
      { title: "Crypto Options Trading", price: 197 },
    ],
    originalTotal: 394,
    bundlePrice: 247,
    savings: 37,
    badge: "🤖 Future-Proof",
    color: "from-blue-600 to-indigo-600",
    borderColor: "border-blue-500/40",
    features: [
      "Both courses with lifetime access",
      "AI tool templates library",
      "Options strategy backtest data",
      "Certificates for all courses",
      "Email support for 6 months",
    ],
  },
];

export default function BundlesPage() {
  return (
    <div className="min-h-screen bg-[#09090b] px-4 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm text-amber-300 mb-5">
            <Package className="h-3.5 w-3.5" />
            <span>Save up to 42% with course bundles</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Course Bundles
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Get more for less. Curated bundles of complementary courses, designed to
            build complete income streams — not just isolated skills.
          </p>
        </div>

        {/* Bundles */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {BUNDLES.map((bundle) => (
            <div
              key={bundle.id}
              className={`rounded-2xl border ${bundle.borderColor} bg-zinc-900/50 overflow-hidden flex flex-col`}
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${bundle.color} p-6`}>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-medium bg-white/20 text-white px-2.5 py-1 rounded-full">
                    {bundle.badge}
                  </span>
                  <div className="text-right">
                    <p className="text-xs text-white/60 line-through">
                      ${bundle.originalTotal}
                    </p>
                    <p className="text-2xl font-bold text-white">
                      ${bundle.bundlePrice}
                    </p>
                    <p className="text-xs text-green-300 font-medium">
                      Save {bundle.savings}%
                    </p>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">{bundle.name}</h2>
                <p className="text-sm text-white/70 leading-relaxed">
                  {bundle.description}
                </p>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                {/* Included courses */}
                <div className="mb-5">
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-3">
                    Included Courses ({bundle.courses.length})
                  </p>
                  <div className="space-y-2">
                    {bundle.courses.map((course) => (
                      <div
                        key={course.title}
                        className="flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2">
                          <Zap className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                          <span className="text-sm text-zinc-300">{course.title}</span>
                        </div>
                        <span className="text-xs text-zinc-500 shrink-0">
                          ${course.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6 flex-1">
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-3">
                    What&apos;s Included
                  </p>
                  <div className="space-y-2">
                    {bundle.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
                        <span className="text-sm text-zinc-400">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href="/courses"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-purple-500/20"
                >
                  Get Bundle — ${bundle.bundlePrice}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="text-xs text-zinc-600 text-center mt-2">
                  Lifetime access · Crypto & card accepted
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Why bundles */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Why Choose a Bundle?</h2>
            <p className="text-zinc-500">Multiple skills compound. One skill is a job. Multiple skills are a business.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: TrendingUp,
                title: "Compound Learning",
                desc: "Skills learned together reinforce each other. NFT trading + DeFi + BTC together = complete Web3 income playbook.",
                color: "text-purple-400",
                bg: "bg-purple-400/10",
              },
              {
                icon: Package,
                title: "Massive Savings",
                desc: "Save 37-42% versus buying individually. Use the savings to invest in your first trade or business launch.",
                color: "text-amber-400",
                bg: "bg-amber-400/10",
              },
              {
                icon: Star,
                title: "Community Access",
                desc: "Bundle buyers get exclusive community access with other serious learners and monthly group coaching sessions.",
                color: "text-green-400",
                bg: "bg-green-400/10",
              },
            ].map((f) => (
              <div key={f.title} className="text-center">
                <div className={`inline-flex p-3 rounded-xl ${f.bg} mb-4`}>
                  <f.icon className={`h-6 w-6 ${f.color}`} />
                </div>
                <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

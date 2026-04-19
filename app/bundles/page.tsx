import Link from "next/link";
import { BookOpen, ArrowRight, Check, GraduationCap } from "lucide-react";

const BUNDLES = [
  {
    id: "web3-stack",
    name: "Web3 & Digital Assets Bundle",
    description:
      "Three courses that cover NFT markets, DeFi yield, and Bitcoin Ordinals — the core stack for anyone working with digital assets.",
    courses: [
      { title: "NFT Market Analysis", price: 197 },
      { title: "DeFi Yield Strategy", price: 147 },
      { title: "Bitcoin Ordinals & BRC-20", price: 127 },
    ],
    originalTotal: 471,
    price: 297,
    savings: 37,
    badge: "Most Popular",
    certificate: "Digital Assets Bundle Certificate",
    features: [
      "Lifetime access to all three courses",
      "Every course's exercises and resources",
      "Certificate of completion for each course",
      "30-day money-back guarantee",
    ],
  },
  {
    id: "creator-stack",
    name: "Creator & Commerce Bundle",
    description:
      "Audience growth, DTC commerce, and running an independent practice — the bundle for modern creator-operators.",
    courses: [
      { title: "Audience Development on X", price: 97 },
      { title: "Direct-to-Consumer Commerce", price: 147 },
      { title: "Independent Professional Practice", price: 97 },
    ],
    originalTotal: 341,
    price: 197,
    savings: 42,
    badge: "Best Value",
    certificate: "Creator & Commerce Bundle Certificate",
    features: [
      "Lifetime access to all three courses",
      "Editorial calendar and templates",
      "Supplier directory and playbooks",
      "30-day money-back guarantee",
    ],
  },
  {
    id: "ai-future",
    name: "AI & Strategy Bundle",
    description:
      "Applied AI automation and derivatives strategy — a forward-looking pair for where the economy is going.",
    courses: [
      { title: "AI Automation in Practice", price: 197 },
      { title: "Derivatives & Options Strategy", price: 197 },
    ],
    originalTotal: 394,
    price: 247,
    savings: 37,
    badge: "Forward-Looking",
    certificate: "AI & Strategy Bundle Certificate",
    features: [
      "Lifetime access to both courses",
      "Reference library and cheatsheets",
      "Strategy backtest datasets",
      "30-day money-back guarantee",
    ],
  },
];

export default function BundlesPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="hero-backdrop border-b border-slate-200 px-4 sm:px-6 py-14">
        <div className="mx-auto max-w-4xl">
          <p className="academic-label mb-3">Bundles</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#0a2540] tracking-tight leading-tight">
            Course bundles.
          </h1>
          <p className="text-slate-600 text-[17px] leading-relaxed mt-3 max-w-2xl">
            Grab related courses together and save. Each bundle combines
            courses that reinforce each other — for less than buying them
            one by one.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {BUNDLES.map((bundle) => (
            <div
              key={bundle.id}
              className="rounded-lg border border-slate-200 bg-white overflow-hidden flex flex-col"
            >
              <div className="bg-[#0a2540] p-7 text-white border-b-2 border-[#b08d57]">
                <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#b08d57] mb-3">
                  {bundle.badge}
                </p>
                <h2 className="font-serif text-xl font-bold mb-3 tracking-tight leading-snug">
                  {bundle.name}
                </h2>
                <p className="text-sm text-white/80 leading-relaxed mb-5">
                  {bundle.description}
                </p>
                <div className="flex items-end justify-between pt-4 border-t border-white/15">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#b08d57]">
                      Price
                    </p>
                    <p className="font-serif text-3xl font-bold tracking-tight mt-1">
                      ${bundle.price}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/60 line-through">
                      ${bundle.originalTotal}
                    </p>
                    <p className="text-xs text-[#b08d57] font-semibold tracking-wide">
                      Save {bundle.savings}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-7 flex-1 flex flex-col">
                <div className="mb-6">
                  <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#98753f] mb-3">
                    Courses Included ({bundle.courses.length})
                  </p>
                  <div className="space-y-2.5">
                    {bundle.courses.map((course) => (
                      <div
                        key={course.title}
                        className="flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <BookOpen
                            className="h-3.5 w-3.5 text-[#98753f] shrink-0"
                            strokeWidth={1.75}
                          />
                          <span className="text-sm text-[#0a2540] truncate font-medium">
                            {course.title}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400 shrink-0 font-medium">
                          ${course.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6 flex-1">
                  <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#98753f] mb-3">
                    What's Included
                  </p>
                  <div className="space-y-2">
                    {bundle.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-[#14532d] shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-700 leading-relaxed">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href="/courses"
                  className="w-full flex items-center justify-center gap-2 rounded-md bg-[#0a2540] hover:bg-[#123258] px-4 py-3 text-sm font-semibold tracking-wide text-white transition-colors"
                >
                  Get Bundle
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="text-xs text-slate-500 text-center mt-3 italic">
                  Lifetime access &middot; Card, PayPal, or crypto
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-10">
          <div className="text-center mb-10">
            <p className="academic-label mb-3">Why bundle</p>
            <h2 className="font-serif text-3xl font-bold text-[#0a2540] mb-3 tracking-tight">
              Skills compound when you stack them.
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto leading-relaxed">
              A single course teaches you a skill. A bundle of related
              courses teaches you to apply them together — which is where
              the real value shows up.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: GraduationCap,
                title: "Designed to fit together",
                desc: "Bundles pair courses that actually reinforce each other — no random grab-bag.",
              },
              {
                icon: BookOpen,
                title: "Save 37–42%",
                desc: "Bundles are priced below the sum of their parts — a real discount for committing to the stack.",
              },
              {
                icon: Check,
                title: "Certificate per course",
                desc: "You get a certificate of completion for every course in the bundle as you finish it.",
              },
            ].map((f) => (
              <div key={f.title} className="text-center">
                <div className="inline-flex w-12 h-12 rounded-md bg-[#f5ecd7] border border-[#e7d7b0] items-center justify-center mb-4">
                  <f.icon
                    className="h-6 w-6 text-[#98753f]"
                    strokeWidth={1.75}
                  />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#0a2540] mb-2 tracking-tight">
                  {f.title}.
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

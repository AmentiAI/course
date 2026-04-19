import Link from "next/link";
import { BookOpen, ArrowRight, Check, GraduationCap } from "lucide-react";

const CURRICULA = [
  {
    id: "web3-stack",
    name: "Web3 & Digital Assets Certificate",
    description:
      "A rigorous curriculum across NFT markets, DeFi yield structures, and Bitcoin Ordinals — the foundational tracks for the digital-asset professional.",
    programs: [
      { title: "NFT Market Analysis", price: 197 },
      { title: "DeFi Yield Strategy", price: 147 },
      { title: "Bitcoin Ordinals & BRC-20", price: 127 },
    ],
    originalTotal: 471,
    tuition: 297,
    savings: 37,
    badge: "Most Requested",
    credential: "Certificate in Digital Assets",
    features: [
      "Lifetime access to all three programs",
      "Invitation to the Digital Assets cohort",
      "Weekly faculty office hours",
      "Credentials issued for each program",
      "Priority correspondence with faculty",
    ],
  },
  {
    id: "creator-stack",
    name: "Digital Enterprise Certificate",
    description:
      "An integrated curriculum in audience development, commerce, and independent practice — structured to equip the modern creator-operator.",
    programs: [
      { title: "Audience Development on X", price: 97 },
      { title: "Direct-to-Consumer Commerce", price: 147 },
      { title: "Independent Professional Practice", price: 97 },
    ],
    originalTotal: 341,
    tuition: 197,
    savings: 42,
    badge: "Best Value",
    credential: "Certificate in Digital Enterprise",
    features: [
      "Lifetime access to all three programs",
      "Editorial calendar framework",
      "Curated supplier directory",
      "Client engagement correspondence library",
      "Monthly group advisory session",
    ],
  },
  {
    id: "ai-future",
    name: "AI & Applied Strategy Certificate",
    description:
      "A forward-looking curriculum in applied artificial intelligence and derivatives strategy — designed for the economic shifts of the coming decade.",
    programs: [
      { title: "AI Automation in Practice", price: 197 },
      { title: "Derivatives & Options Strategy", price: 197 },
    ],
    originalTotal: 394,
    tuition: 247,
    savings: 37,
    badge: "Forward-Looking",
    credential: "Certificate in Applied AI & Strategy",
    features: [
      "Lifetime access to both programs",
      "Curated reference library",
      "Strategy backtest datasets",
      "Credentials issued for each program",
      "Correspondence with faculty for six months",
    ],
  },
];

export default function CurriculaPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="hero-backdrop border-b border-slate-200 px-4 sm:px-6 py-14">
        <div className="mx-auto max-w-4xl">
          <p className="academic-label mb-3">Integrated Curricula</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#0a2540] tracking-tight leading-tight">
            Certificate Curricula.
          </h1>
          <p className="text-slate-600 text-[17px] leading-relaxed mt-3 max-w-2xl">
            Structured, multi-program pathways that combine complementary disciplines
            into a coherent course of study — issued with an institutional certificate
            upon completion.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {CURRICULA.map((curriculum) => (
            <div
              key={curriculum.id}
              className="rounded-lg border border-slate-200 bg-white overflow-hidden flex flex-col"
            >
              <div className="bg-[#0a2540] p-7 text-white border-b-2 border-[#b08d57]">
                <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#b08d57] mb-3">
                  {curriculum.badge}
                </p>
                <h2 className="font-serif text-xl font-bold mb-3 tracking-tight leading-snug">
                  {curriculum.name}
                </h2>
                <p className="text-sm text-white/80 leading-relaxed mb-5">
                  {curriculum.description}
                </p>
                <div className="flex items-end justify-between pt-4 border-t border-white/15">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#b08d57]">
                      Tuition
                    </p>
                    <p className="font-serif text-3xl font-bold tracking-tight mt-1">
                      ${curriculum.tuition}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/60 line-through">
                      ${curriculum.originalTotal}
                    </p>
                    <p className="text-xs text-[#b08d57] font-semibold tracking-wide">
                      Save {curriculum.savings}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-7 flex-1 flex flex-col">
                <div className="mb-6">
                  <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#98753f] mb-3">
                    Included Programs ({curriculum.programs.length})
                  </p>
                  <div className="space-y-2.5">
                    {curriculum.programs.map((program) => (
                      <div
                        key={program.title}
                        className="flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <BookOpen
                            className="h-3.5 w-3.5 text-[#98753f] shrink-0"
                            strokeWidth={1.75}
                          />
                          <span className="text-sm text-[#0a2540] truncate font-medium">
                            {program.title}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400 shrink-0 font-medium">
                          ${program.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6 flex-1">
                  <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#98753f] mb-3">
                    Enrollment Includes
                  </p>
                  <div className="space-y-2">
                    {curriculum.features.map((feature) => (
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
                  Enroll in Curriculum
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="text-xs text-slate-500 text-center mt-3 italic">
                  Lifetime access &middot; PayPal &amp; Bitcoin accepted
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-10">
          <div className="text-center mb-10">
            <p className="academic-label mb-3">On the Curricular Method</p>
            <h2 className="font-serif text-3xl font-bold text-[#0a2540] mb-3 tracking-tight">
              Disciplines Reinforce One Another.
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto leading-relaxed">
              A single skill produces competence. A curriculum of complementary
              disciplines produces judgement — the true mark of a practitioner.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: GraduationCap,
                title: "Coherent Study",
                desc: "Programs sequenced to compound — strategy reinforces analysis; analysis sharpens execution.",
              },
              {
                icon: BookOpen,
                title: "Institutional Savings",
                desc: "Curricula are priced 37–42% below the sum of their programs, in recognition of the commitment.",
              },
              {
                icon: Check,
                title: "Credential Issued",
                desc: "Completion of a curriculum yields a certificate attesting to breadth of study, not merely a single course.",
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

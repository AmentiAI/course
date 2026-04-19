import Link from "next/link";
import { ArrowRight, GraduationCap, Mail, BookOpen, Users } from "lucide-react";

export const metadata = {
  title: "Instructors",
  description:
    "Meet the SkillMint instructors — working practitioners who build and teach our courses. Each instructor is selected for real, hands-on expertise in what they teach.",
};

const INSTRUCTORS = [
  {
    id: "1",
    name: "Alex Rivera",
    initials: "AR",
    title: "On-chain Analyst",
    focus: "Digital Asset Research",
    expertise: "Market structure · on-chain analysis · applied research",
    bio: "Fifteen years in capital markets, the last five focused on digital assets. Advises institutional desks on on-chain data and market structure.",
    courses: ["NFT Market Research", "Bitcoin Ordinals &amp; BRC-20"],
  },
  {
    id: "2",
    name: "Sarah Kim",
    initials: "SK",
    title: "Quant Researcher",
    focus: "Applied Finance",
    expertise: "Decentralized finance · risk modeling · portfolio theory",
    bio: "Quantitative researcher with published work on decentralized market microstructure. Teaches applied finance with an emphasis on measurable risk.",
    courses: ["Applied DeFi Strategy"],
  },
  {
    id: "3",
    name: "Marcus Johnson",
    initials: "MJ",
    title: "AI Engineer",
    focus: "AI Systems",
    expertise: "Agent architectures · workflow automation · systems integration",
    bio: "Former software engineer running an applied AI practice for mid-market firms. Teaches the AI Systems track from real client work.",
    courses: ["AI Systems for Business"],
  },
  {
    id: "4",
    name: "Priya Nair",
    initials: "PN",
    title: "Quant Trader",
    focus: "Derivatives & Systematic Strategy",
    expertise: "Derivatives · systematic strategy · quantitative research",
    bio: "Previously a quantitative trader at a systematic fund. Brings real-world desk discipline to the derivatives and systematic strategy course.",
    courses: ["Derivative Strategy Seminar"],
  },
  {
    id: "5",
    name: "Tyler Brooks",
    initials: "TB",
    title: "Writer & Operator",
    focus: "Audience Growth",
    expertise: "Audience strategy · editorial craft · platform economics",
    bio: "Writer and operator who built and sold two media properties. Teaches the editorial and audience strategy track.",
    courses: ["Audience Growth Strategy"],
  },
  {
    id: "6",
    name: "Emma Weston",
    initials: "EW",
    title: "DTC Operator",
    focus: "Commerce Operations",
    expertise: "Commerce operations · supply chain · operator finance",
    bio: "Scaled three direct-to-consumer brands through successive growth stages. Teaches applied operator economics with a focus on unit performance.",
    courses: ["Commerce Operations Seminar"],
  },
];

export default function InstructorsPage() {
  return (
    <div className="bg-white text-[#0b1727]">
      {/* Header */}
      <section className="hero-backdrop border-b border-slate-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-20 sm:py-24">
          <p className="academic-label mb-4">Instructors</p>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-[#0a2540] tracking-tight leading-[1.05] mb-6">
            Taught by people doing the work.
          </h1>
          <p className="text-lg sm:text-[19px] text-slate-600 leading-[1.7] max-w-3xl">
            SkillMint instructors are working practitioners who teach from
            what they're doing day-to-day — not from a deck of textbook
            theory.
          </p>
        </div>
      </section>

      {/* Instructor grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INSTRUCTORS.map((f) => (
            <article
              key={f.id}
              className="rounded-lg border border-slate-200 bg-white overflow-hidden flex flex-col"
            >
              {/* Portrait band */}
              <div className="bg-[#fafaf9] border-b border-slate-200 p-8 flex flex-col items-center text-center">
                <div className="h-24 w-24 rounded-full bg-[#0a2540] border-[3px] border-[#b08d57] flex items-center justify-center text-xl font-bold text-white tracking-wider mb-5">
                  {f.initials}
                </div>
                <h2 className="font-serif text-xl font-bold text-[#0a2540] tracking-tight mb-1">
                  {f.name}
                </h2>
                <p className="text-[13px] font-semibold text-[#98753f] tracking-wide">
                  {f.title}
                </p>
                <p className="text-[11px] text-slate-500 tracking-widest uppercase mt-1">
                  {f.focus}
                </p>
              </div>

              {/* Body */}
              <div className="p-7 flex-1 flex flex-col">
                <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#0a2540] mb-2">
                  Expertise
                </p>
                <p className="text-sm text-slate-700 mb-5 leading-relaxed">
                  {f.expertise}
                </p>

                <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#0a2540] mb-2">
                  About
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-1">
                  {f.bio}
                </p>

                <div className="border-t border-slate-100 pt-5">
                  <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#0a2540] mb-2.5">
                    Courses
                  </p>
                  <ul className="space-y-1.5">
                    {f.courses.map((course) => (
                      <li key={course}>
                        <Link
                          href={`/courses?q=${encodeURIComponent(
                            course.replace(/&amp;/g, "&")
                          )}`}
                          className="inline-flex items-center gap-2 text-sm text-[#0a2540] hover:text-[#123258] font-medium group"
                        >
                          <ArrowRight className="h-3.5 w-3.5 text-[#b08d57]" />
                          <span
                            className="group-hover:underline decoration-[#b08d57] underline-offset-4"
                            dangerouslySetInnerHTML={{ __html: course }}
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Selection standards */}
      <section className="border-y border-slate-200 bg-[#fafaf9]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-20">
          <div className="mb-10 max-w-3xl">
            <p className="academic-label mb-3">How we pick them</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0a2540] tracking-tight leading-tight mb-4">
              Instructor standards.
            </h2>
            <p className="text-slate-600 leading-relaxed">
              The same bar applies to every course on the platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: Users,
                title: "Active practitioners",
                desc: "Everyone teaching is actively doing the work they teach — not coasting on past experience.",
              },
              {
                icon: BookOpen,
                title: "Owns the course",
                desc: "Each instructor authors and owns the structure of their course. No course-mill content.",
              },
              {
                icon: GraduationCap,
                title: "Reviewed on outcomes",
                desc: "Instructors are reviewed on learner feedback, completion, and how useful the course actually is.",
              },
            ].map((s) => (
              <div
                key={s.title}
                className="rounded-lg border border-slate-200 bg-white p-7"
              >
                <s.icon
                  className="h-6 w-6 text-[#98753f] mb-4"
                  strokeWidth={1.75}
                />
                <h3 className="font-serif text-lg font-bold text-[#0a2540] mb-2 tracking-tight">
                  {s.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor inquiries */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-20">
        <div className="rounded-lg border border-slate-200 bg-white p-10 sm:p-12 text-center">
          <GraduationCap
            className="h-8 w-8 text-[#98753f] mx-auto mb-5"
            strokeWidth={1.75}
          />
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0a2540] tracking-tight mb-4">
            Want to teach on SkillMint?
          </h2>
          <p className="text-slate-600 leading-relaxed mb-8 max-w-xl mx-auto">
            If you're a practitioner and want to build a course around what
            you do, we'd like to hear from you.
          </p>
          <a
            href="mailto:instructors@skillmint.online"
            className="inline-flex items-center gap-2 rounded-md border border-[#b08d57] bg-white hover:bg-[#f5ecd7] px-7 py-3.5 text-sm font-semibold tracking-wide text-[#0a2540] transition-colors"
          >
            <Mail className="h-4 w-4" />
            instructors@skillmint.online
          </a>
        </div>
      </section>
    </div>
  );
}

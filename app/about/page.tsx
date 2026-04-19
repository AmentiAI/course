import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  BookMarked,
  Scale,
  Compass,
  Award,
} from "lucide-react";

export const metadata = {
  title: "About SkillMint",
  description:
    "SkillMint is a catalog of self-paced online courses across Web2 and Web3 — taught by working practitioners. Learn about who we are and how we build our courses.",
};

export default function AboutPage() {
  return (
    <div className="bg-white text-[#0b1727]">
      {/* Header */}
      <section className="hero-backdrop border-b border-slate-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-20 sm:py-24">
          <p className="academic-label mb-4">About SkillMint</p>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-[#0a2540] tracking-tight leading-[1.05] mb-6">
            Practical courses, built by people doing the work.
          </h1>
          <p className="text-lg sm:text-[19px] text-slate-600 leading-[1.7] max-w-3xl">
            SkillMint is a catalog of self-paced online courses across Web2
            and Web3 — AI, trading, e-commerce, marketing, development,
            finance, and digital business. Every course is designed to
            teach skills you can actually use.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-20">
        <p className="academic-label mb-3">Why we exist</p>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0a2540] tracking-tight leading-tight mb-6">
          Skills, not theater.
        </h2>
        <p className="text-[17px] text-slate-700 leading-[1.8] mb-5">
          Most online courses waste your time. Too much fluff, not enough
          substance, and rarely taught by anyone who has actually shipped
          anything. We built SkillMint to fix that.
        </p>
        <p className="text-[17px] text-slate-700 leading-[1.8]">
          SkillMint courses span Web2 and Web3 — AI, trading, e-commerce,
          marketing, development, finance, and digital business — taught by
          working practitioners. Every course is focused on helping you pick
          up a skill you can put to work: to get hired, build something, or
          grow what you already do.
        </p>
      </section>

      {/* Principles */}
      <section className="border-y border-slate-200 bg-[#fafaf9]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-20">
          <div className="mb-12 max-w-3xl">
            <p className="academic-label mb-3">How We Build Courses</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0a2540] tracking-tight leading-tight mb-4">
              What makes a SkillMint course.
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Four things that separate a course worth your money from one
              that wastes it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                icon: BookMarked,
                title: "No filler",
                desc: "Courses move in a clear arc — fundamentals, applied work, and a concrete output. No 10-hour ramps before you do anything useful.",
              },
              {
                icon: GraduationCap,
                title: "Practitioners, not generalists",
                desc: "Instructors are people actively doing the work — traders, operators, engineers, marketers — not generalists reading from a deck.",
              },
              {
                icon: Scale,
                title: "Open to anyone",
                desc: "No prerequisites, no application. If you're willing to put in the work, the course is yours.",
              },
              {
                icon: Award,
                title: "Web2 and Web3, together",
                desc: "AI, trading, e-commerce, marketing, development, finance, and digital business — all in one catalog.",
              },
            ].map((p) => (
              <div
                key={p.title}
                className="rounded-lg border border-slate-200 bg-white p-8"
              >
                <p.icon
                  className="h-6 w-6 text-[#98753f] mb-5"
                  strokeWidth={1.75}
                />
                <h3 className="font-serif text-xl font-bold text-[#0a2540] mb-3 tracking-tight">
                  {p.title}
                </h3>
                <p className="text-[15px] text-slate-600 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* At a glance */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-20">
        <div className="mb-10 max-w-3xl">
          <p className="academic-label mb-3">At a Glance</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0a2540] tracking-tight leading-tight mb-4">
            SkillMint at a glance.
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { value: "Online", label: "Format" },
            { value: "Self-paced", label: "Schedule" },
            { value: "Lifetime", label: "Course access" },
            { value: "Instant", label: "Enrollment" },
          ].map((s) => (
            <div key={s.label} className="border-t-2 border-[#b08d57] pt-5">
              <p className="font-serif text-3xl font-bold text-[#0a2540] tracking-tight mb-1">
                {s.value}
              </p>
              <p className="text-xs font-semibold tracking-wider uppercase text-slate-500">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* What the certificate means */}
      <section className="border-y border-slate-200 bg-[#fafaf9]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-20">
          <p className="academic-label mb-3">Certificates</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0a2540] tracking-tight leading-tight mb-6">
            What a SkillMint certificate is.
          </h2>
          <div className="space-y-5 text-[17px] text-slate-700 leading-[1.8]">
            <p>
              Finish a course and you can download a certificate of
              completion with a unique verification link you can share on
              your LinkedIn profile or attach to a résumé.
            </p>
            <p>
              Certificates are <em>not</em> accredited academic degrees —
              they're proof that you finished the course. Use them alongside
              the work you've actually put together.
            </p>
            <p>
              Anyone you share the certificate with can verify it through
              the link on the certificate itself.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-24">
        <div className="rounded-lg border border-slate-200 bg-white p-12 text-center">
          <Compass
            className="h-8 w-8 text-[#98753f] mx-auto mb-6"
            strokeWidth={1.75}
          />
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0a2540] tracking-tight mb-4">
            Start learning today.
          </h2>
          <p className="text-slate-600 leading-relaxed mb-8 max-w-xl mx-auto">
            Browse the catalog, meet the instructors, or sign up and get
            started.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#0a2540] hover:bg-[#123258] px-7 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors"
            >
              Browse Courses
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-[#b08d57] bg-white hover:bg-[#f5ecd7] px-7 py-3.5 text-sm font-semibold tracking-wide text-[#0a2540] transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

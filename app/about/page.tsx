import Link from "next/link";
import {
  ArrowRight,
  BookMarked,
  Scale,
  Award,
  Briefcase,
  Clock,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export const metadata = {
  title: "About SkillMint",
  description:
    "SkillMint is a catalog of self-paced online courses across Web2 and Web3. Each course is made by a skilled professional.",
};

const PRINCIPLES = [
  {
    icon: Briefcase,
    title: "Made by skilled professionals",
    desc: "Every course is created by someone who does the work for a living — not a content mill or celebrity host.",
  },
  {
    icon: BookMarked,
    title: "No filler",
    desc: "Clear arc from fundamentals to applied work to a concrete output. You start using what you learn early.",
  },
  {
    icon: Clock,
    title: "Self-paced, lifetime access",
    desc: "Buy once. Learn on your schedule. Come back whenever you need a refresh — the course stays yours.",
  },
  {
    icon: Scale,
    title: "Open to anyone",
    desc: "No application, no cohort waitlist. If you’re willing to put in the work, you’re in.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white text-[#0b1727]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#061525]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 80% 30%, rgba(52, 211, 153, 0.2), transparent 55%), linear-gradient(160deg, #061525 0%, #0a2540 60%, #0d2f4a 100%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="mb-8 flex items-center gap-4">
            <img
              src="/logo.png"
              alt=""
              width={72}
              height={72}
              className="h-16 w-16 object-contain sm:h-[72px] sm:w-[72px]"
            />
            <div>
              <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-emerald-300/90">
                About
              </p>
              <p className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                SkillMint
              </p>
            </div>
          </div>
          <h1 className="mb-6 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
            Practical courses, made by skilled professionals.
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            SkillMint is a catalog of self-paced online courses across Web2
            and Web3 — AI, trading, e-commerce, marketing, development,
            finance, and digital business. Built to teach skills you can
            actually use.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-[#0a2540] sm:text-4xl">
              Skills, not theater.
            </h2>
          </div>
          <div className="space-y-5 lg:col-span-7">
            <p className="text-[17px] leading-[1.8] text-slate-700">
              Most online courses waste your time — too much fluff, not enough
              substance, and rarely built by anyone who has actually shipped
              anything. We built SkillMint to fix that.
            </p>
            <p className="text-[17px] leading-[1.8] text-slate-700">
              Each course is made by a skilled professional and focused on
              helping you pick up a skill you can put to work: get hired, build
              something, or grow what you already do.
            </p>
            <ul className="space-y-3 pt-2">
              {[
                "Web2 and Web3 in one catalog",
                "Instant enrollment — card, PayPal, or crypto",
                "Certificate of completion when you finish",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[15px] text-slate-700"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="border-y border-slate-200 bg-[#f7f8fa]">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="mb-12 max-w-2xl">
            <h2 className="mb-3 font-serif text-3xl font-bold tracking-tight text-[#0a2540] sm:text-4xl">
              How we build courses
            </h2>
            <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
              Four things that separate a course worth your money from one that
              wastes it.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="border-t-2 border-emerald-500/70 pt-5">
                <p.icon
                  className="mb-4 h-5 w-5 text-[#0a2540]"
                  strokeWidth={1.75}
                />
                <h3 className="mb-2 text-[15px] font-semibold text-[#0a2540]">
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* At a glance */}
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <h2 className="mb-10 font-serif text-3xl font-bold tracking-tight text-[#0a2540] sm:text-4xl">
          At a glance
        </h2>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {[
            { value: "Online", label: "Format" },
            { value: "Self-paced", label: "Schedule" },
            { value: "Lifetime", label: "Course access" },
            { value: "30 days", label: "Money-back" },
          ].map((s) => (
            <div key={s.label} className="border-t-2 border-[#0a2540] pt-5">
              <p className="mb-1 font-serif text-3xl font-bold tracking-tight text-[#0a2540]">
                {s.value}
              </p>
              <p className="text-xs font-semibold tracking-wider uppercase text-slate-500">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Certificates */}
      <section className="border-y border-slate-200 bg-[#0a2540] text-white">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="grid items-start gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Award
                className="mb-5 h-8 w-8 text-emerald-400"
                strokeWidth={1.75}
              />
              <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
                What a certificate means
              </h2>
            </div>
            <div className="space-y-5 text-[17px] leading-[1.8] text-white/75 lg:col-span-7">
              <p>
                Finish a course and download a certificate of completion with a
                unique verification link for LinkedIn or your résumé.
              </p>
              <p>
                Certificates are not accredited academic degrees — they&apos;re
                proof you finished the course. Use them alongside the work
                you&apos;ve actually put together.
              </p>
              <p className="flex items-start gap-3 text-white/90">
                <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-emerald-400" />
                Anyone you share it with can verify it through the link on the
                certificate itself.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
        <div className="relative overflow-hidden bg-[#f7f8fa] px-8 py-14 text-center sm:px-12">
          <img
            src="/logo.png"
            alt=""
            width={64}
            height={64}
            className="mx-auto mb-6 h-14 w-14 object-contain opacity-90"
          />
          <h2 className="mb-4 font-serif text-3xl font-bold tracking-tight text-[#0a2540] sm:text-4xl">
            Start learning today
          </h2>
          <p className="mx-auto mb-8 max-w-lg text-slate-600 leading-relaxed">
            Browse the catalog or sign up — every course is made by a skilled
            professional.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#0a2540] px-7 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#123258]"
            >
              Browse Courses
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold tracking-wide text-[#0a2540] transition-colors hover:border-emerald-500 hover:bg-emerald-50"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

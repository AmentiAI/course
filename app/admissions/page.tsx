import Link from "next/link";
import {
  ArrowRight,
  Mail,
  CheckCircle2,
  ScrollText,
  CalendarCheck,
  FileText,
  GraduationCap,
  Users,
} from "lucide-react";

export const metadata = {
  title: "Admissions",
  description:
    "Admissions information for SkillMint Online Academy. Rolling enrollment, flexible prerequisites, and verifiable credentials upon program completion.",
};

const APPLICANT_FIT = [
  "Working professionals seeking applied, career-relevant skills.",
  "Career changers moving into digital economy disciplines.",
  "Students supplementing traditional education with practical programs.",
  "Founders and operators building in crypto, AI, or digital business.",
  "Self-directed learners who value structured curricula.",
];

const REQUIREMENTS = [
  {
    title: "Open enrollment",
    desc: "Our programs do not require formal prerequisites. Admissions are open on a rolling basis to all prospective students age 16 or older.",
  },
  {
    title: "Technical requirements",
    desc: "A modern web browser, a stable internet connection, and the ability to complete written and applied coursework online.",
  },
  {
    title: "Program-specific recommendations",
    desc: "Some advanced programs recommend foundational coursework first. Recommended sequences are noted on each program page.",
  },
  {
    title: "Language of instruction",
    desc: "Instruction is delivered in English. All program materials, assessments, and support are conducted in English.",
  },
];

const STEPS = [
  {
    icon: FileText,
    title: "Review the program catalog",
    desc: "Browse programs by discipline and level. Each listing details curriculum, duration, instructor, and learning outcomes.",
  },
  {
    icon: Users,
    title: "Create your student account",
    desc: "Set up a free account to save programs, track progress, and access your Student Portal.",
  },
  {
    icon: CalendarCheck,
    title: "Enroll in your program",
    desc: "Complete enrollment with PayPal, credit card, or Bitcoin. Admissions are rolling — your program begins the day you enroll.",
  },
  {
    icon: GraduationCap,
    title: "Begin coursework",
    desc: "Meet your instructor, orient to the curriculum, and progress through modules at your own pace with lifetime access.",
  },
  {
    icon: ScrollText,
    title: "Complete &amp; earn your credential",
    desc: "Complete assessments and the capstone project to receive a verifiable certificate of completion.",
  },
];

export default function AdmissionsPage() {
  return (
    <div className="bg-white text-[#0b1727]">
      {/* Header */}
      <section className="hero-backdrop border-b border-slate-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-20 sm:py-24">
          <p className="academic-label mb-4">Admissions</p>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-[#0a2540] tracking-tight leading-[1.05] mb-6">
            Join SkillMint Online Academy.
          </h1>
          <p className="text-lg sm:text-[19px] text-slate-600 leading-[1.7] max-w-3xl">
            SkillMint operates on rolling admissions. Prospective students may
            enroll at any time, with immediate access to course materials and
            instructors. Programs are delivered entirely online with lifetime
            access.
          </p>
        </div>
      </section>

      {/* Who should apply */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-20">
        <div className="mb-10 max-w-3xl">
          <p className="academic-label mb-3">Who Should Apply</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0a2540] tracking-tight leading-tight mb-4">
            Applicant Profile.
          </h2>
          <p className="text-slate-600 leading-relaxed">
            SkillMint admits students from a range of professional and academic
            backgrounds. Our programs are well suited to:
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {APPLICANT_FIT.map((line) => (
            <li
              key={line}
              className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-5"
            >
              <CheckCircle2 className="h-5 w-5 text-[#14532d] shrink-0 mt-0.5" />
              <span className="text-[15px] text-slate-700 leading-relaxed">
                {line}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Requirements */}
      <section className="border-y border-slate-200 bg-[#fafaf9]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-20">
          <div className="mb-10 max-w-3xl">
            <p className="academic-label mb-3">Requirements</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0a2540] tracking-tight leading-tight mb-4">
              Admissions Requirements.
            </h2>
            <p className="text-slate-600 leading-relaxed">
              SkillMint maintains accessible, non-competitive admissions.
              Programs are open to all qualified applicants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {REQUIREMENTS.map((r) => (
              <div
                key={r.title}
                className="rounded-lg border border-slate-200 bg-white p-7"
              >
                <h3 className="font-serif text-lg font-bold text-[#0a2540] mb-2 tracking-tight">
                  {r.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Start dates */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-20">
        <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
          <div className="bg-[#0a2540] px-8 py-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#b08d57] mb-1">
                Academic Calendar
              </p>
              <p className="text-white text-lg font-semibold">
                Rolling Admissions &middot; Enrollment Open Year-Round
              </p>
            </div>
            <CalendarCheck className="h-8 w-8 text-white/80" />
          </div>
          <div className="p-8">
            <p className="text-slate-700 leading-relaxed mb-5">
              SkillMint does not operate on fixed cohort start dates. Programs
              begin the day you enroll. Coursework is self-paced, with
              recommended module sequences and suggested weekly time
              commitments listed on each program page.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm">
              Students typically complete a program within 6 to 16 weeks of
              enrollment, depending on program length and weekly availability.
            </p>
          </div>
        </div>
      </section>

      {/* Enrollment process */}
      <section className="border-y border-slate-200 bg-[#fafaf9]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-20">
          <div className="mb-12 max-w-3xl">
            <p className="academic-label mb-3">Enrollment Process</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0a2540] tracking-tight leading-tight mb-4">
              Five Steps From Inquiry to Credential.
            </h2>
          </div>

          <ol className="space-y-4">
            {STEPS.map((s, i) => (
              <li
                key={s.title}
                className="flex gap-6 rounded-lg border border-slate-200 bg-white p-7"
              >
                <div className="shrink-0">
                  <div className="h-12 w-12 rounded-md bg-[#f5ecd7] border border-[#e7d7b0] flex items-center justify-center">
                    <s.icon className="h-5 w-5 text-[#98753f]" strokeWidth={1.75} />
                  </div>
                  <p className="font-serif text-lg font-bold text-[#b08d57] text-center mt-3">
                    0{i + 1}
                  </p>
                </div>
                <div className="flex-1">
                  <h3
                    className="font-serif text-xl font-bold text-[#0a2540] mb-2 tracking-tight"
                    dangerouslySetInnerHTML={{ __html: s.title }}
                  />
                  <p className="text-[15px] text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Contact / next step */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-24">
        <div className="rounded-lg border border-slate-200 bg-white p-10 sm:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <p className="academic-label mb-3">Next Steps</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0a2540] tracking-tight leading-tight mb-4">
                Ready to Enroll?
              </h2>
              <p className="text-slate-600 leading-relaxed mb-8">
                Review the program catalog or contact the admissions office
                with questions about program fit, prerequisites, or enrollment.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[#0a2540] hover:bg-[#123258] px-7 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors"
                >
                  View Program Catalog
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-[#b08d57] bg-white hover:bg-[#f5ecd7] px-7 py-3.5 text-sm font-semibold tracking-wide text-[#0a2540] transition-colors"
                >
                  Create Student Account
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-lg border border-slate-200 bg-[#fafaf9] p-6">
                <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#98753f] mb-3">
                  Admissions Office
                </p>
                <div className="flex items-center gap-2.5 text-sm text-slate-700 mb-2">
                  <Mail className="h-4 w-4 text-[#0a2540]" />
                  <a
                    href="mailto:admissions@skillmint.courses"
                    className="hover:text-[#0a2540] transition-colors font-medium"
                  >
                    admissions@skillmint.courses
                  </a>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mt-3">
                  Replies are typically issued within one business day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

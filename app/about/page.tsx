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
    "SkillMint Online Academy delivers structured, career-focused programs taught by working professionals. Learn about our mission, standards, and academic approach.",
};

export default function AboutPage() {
  return (
    <div className="bg-white text-[#0b1727]">
      {/* Header */}
      <section className="hero-backdrop border-b border-slate-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-20 sm:py-24">
          <p className="academic-label mb-4">About the Academy</p>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-[#0a2540] tracking-tight leading-[1.05] mb-6">
            A Modern Online Academy for Applied Education.
          </h1>
          <p className="text-lg sm:text-[19px] text-slate-600 leading-[1.7] max-w-3xl">
            SkillMint.Courses was established to deliver serious, structured
            online education in disciplines of the modern digital economy — at
            the academic standards of a traditional institution, in a format
            built for working adults.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-20">
        <p className="academic-label mb-3">Mission</p>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0a2540] tracking-tight leading-tight mb-6">
          Our Mission.
        </h2>
        <p className="text-[17px] text-slate-700 leading-[1.8] mb-5">
          To provide accessible, rigorous, and career-focused education in
          disciplines that shape the modern economy — and to do so with the
          academic standards that prospective students, employers, and
          institutions can trust.
        </p>
        <p className="text-[17px] text-slate-700 leading-[1.8]">
          SkillMint programs are structured, taught by practicing faculty, and
          concluded with a verifiable credential. Every program is built to be
          defensible: to colleagues, to interviewers, and to students' own
          standards for time well spent.
        </p>
      </section>

      {/* Academic principles */}
      <section className="border-y border-slate-200 bg-[#fafaf9]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-20">
          <div className="mb-12 max-w-3xl">
            <p className="academic-label mb-3">Principles</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0a2540] tracking-tight leading-tight mb-4">
              Academic Principles.
            </h2>
            <p className="text-slate-600 leading-relaxed">
              The following principles guide program design, faculty
              selection, and how we serve students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                icon: BookMarked,
                title: "Curricular rigor",
                desc: "Programs are designed as structured curricula — not content libraries. Each has defined learning outcomes and measured progression.",
              },
              {
                icon: GraduationCap,
                title: "Faculty of practice",
                desc: "Instructors are working professionals, selected for applied expertise and evaluated on student outcomes.",
              },
              {
                icon: Scale,
                title: "Accessible admission",
                desc: "Admission is open and non-competitive. We believe serious programs should be available to anyone prepared to do the work.",
              },
              {
                icon: Award,
                title: "Verifiable credentials",
                desc: "Program completion is recognized with a credential students can share, reference, and defend.",
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
            SkillMint at a Glance.
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { value: "Online", label: "Delivery format" },
            { value: "Self-paced", label: "Study schedule" },
            { value: "Lifetime", label: "Program access" },
            { value: "Rolling", label: "Admissions" },
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

      {/* What the credential means */}
      <section className="border-y border-slate-200 bg-[#fafaf9]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-20">
          <p className="academic-label mb-3">Credentials</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0a2540] tracking-tight leading-tight mb-6">
            What a SkillMint Credential Represents.
          </h2>
          <div className="space-y-5 text-[17px] text-slate-700 leading-[1.8]">
            <p>
              A SkillMint certificate is issued only upon completion of all
              program modules, required assessments, and the capstone
              deliverable. Each credential is accompanied by a unique
              verification identifier.
            </p>
            <p>
              Credentials are <em>not</em> accredited degrees — they are
              recognitions of completed applied coursework, intended to be
              used alongside (not in place of) traditional credentials,
              professional experience, or licensure.
            </p>
            <p>
              Students and employers may verify the authenticity of any
              issued credential at any time through the unique verification
              URL printed on the certificate.
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
            Explore the Academy.
          </h2>
          <p className="text-slate-600 leading-relaxed mb-8 max-w-xl mx-auto">
            Review the program catalog, meet the faculty, or begin the
            admissions process.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#0a2540] hover:bg-[#123258] px-7 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors"
            >
              Explore Programs
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

import Link from "next/link";
import { ArrowRight, GraduationCap, Mail, BookOpen, Users } from "lucide-react";

export const metadata = {
  title: "Faculty",
  description:
    "Meet the SkillMint faculty — working professionals and practitioners who deliver our programs. Each instructor is selected for applied expertise in their discipline.",
};

const FACULTY = [
  {
    id: "1",
    name: "Alex Rivera",
    initials: "AR",
    title: "Lecturer, Digital Asset Research",
    department: "Department of Digital Economy",
    expertise: "Market structure · on-chain analysis · applied research",
    bio: "Fifteen years of capital-markets experience, the last five focused on digital assets. Advises institutional desks on on-chain data methodology and market structure.",
    programs: ["NFT Market Research", "Bitcoin Ordinals &amp; BRC-20"],
  },
  {
    id: "2",
    name: "Sarah Kim",
    initials: "SK",
    title: "Lecturer, Applied Finance",
    department: "Department of Digital Economy",
    expertise: "Decentralized finance · risk modeling · portfolio theory",
    bio: "Quantitative researcher with published work on decentralized market microstructure. Teaches the applied finance track with an emphasis on measurable risk.",
    programs: ["Applied DeFi Strategy"],
  },
  {
    id: "3",
    name: "Marcus Johnson",
    initials: "MJ",
    title: "Senior Instructor, AI Systems",
    department: "Department of AI &amp; Systems",
    expertise: "Agent architectures · workflow automation · systems integration",
    bio: "Former software engineer now operating an applied AI practice for mid-market firms. Leads the AI Systems concentration and its capstone seminars.",
    programs: ["AI Systems for Business"],
  },
  {
    id: "4",
    name: "Priya Nair",
    initials: "PN",
    title: "Lecturer, Quantitative Strategy",
    department: "Department of Applied Finance",
    expertise: "Derivatives · systematic strategy · quantitative research",
    bio: "Previously a quantitative trader at a systematic fund. Brings institutional discipline to applied coursework in derivative and systematic strategy.",
    programs: ["Derivative Strategy Seminar"],
  },
  {
    id: "5",
    name: "Tyler Brooks",
    initials: "TB",
    title: "Lecturer, Digital Communication",
    department: "Department of Digital Business",
    expertise: "Audience strategy · editorial craft · platform economics",
    bio: "Writer and operator who built and sold two media properties. Teaches the editorial and audience strategy track within the digital business concentration.",
    programs: ["Audience Growth Strategy"],
  },
  {
    id: "6",
    name: "Emma Weston",
    initials: "EW",
    title: "Lecturer, Operator Economics",
    department: "Department of Digital Business",
    expertise: "Commerce operations · supply chain · operator finance",
    bio: "Scaled three direct-to-consumer ventures through successive growth stages. Teaches applied operator economics with a focus on unit performance.",
    programs: ["Commerce Operations Seminar"],
  },
];

export default function FacultyPage() {
  return (
    <div className="bg-white text-[#0b1727]">
      {/* Header */}
      <section className="hero-backdrop border-b border-slate-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-20 sm:py-24">
          <p className="academic-label mb-4">Faculty</p>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-[#0a2540] tracking-tight leading-[1.05] mb-6">
            Taught by Working Professionals.
          </h1>
          <p className="text-lg sm:text-[19px] text-slate-600 leading-[1.7] max-w-3xl">
            SkillMint faculty are selected for applied expertise and active
            practice in their disciplines. Our instructors teach from the
            reality of working in the field — not from summarized theory.
          </p>
        </div>
      </section>

      {/* Faculty grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FACULTY.map((f) => (
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
                <p
                  className="text-[13px] font-semibold text-[#98753f] tracking-wide"
                  dangerouslySetInnerHTML={{ __html: f.title }}
                />
                <p
                  className="text-[11px] text-slate-500 tracking-widest uppercase mt-1"
                  dangerouslySetInnerHTML={{ __html: f.department }}
                />
              </div>

              {/* Body */}
              <div className="p-7 flex-1 flex flex-col">
                <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#0a2540] mb-2">
                  Area of Expertise
                </p>
                <p className="text-sm text-slate-700 mb-5 leading-relaxed">
                  {f.expertise}
                </p>

                <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#0a2540] mb-2">
                  Biography
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-1">
                  {f.bio}
                </p>

                <div className="border-t border-slate-100 pt-5">
                  <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#0a2540] mb-2.5">
                    Programs Taught
                  </p>
                  <ul className="space-y-1.5">
                    {f.programs.map((program) => (
                      <li key={program}>
                        <Link
                          href={`/courses?q=${encodeURIComponent(
                            program.replace(/&amp;/g, "&")
                          )}`}
                          className="inline-flex items-center gap-2 text-sm text-[#0a2540] hover:text-[#123258] font-medium group"
                        >
                          <ArrowRight className="h-3.5 w-3.5 text-[#b08d57]" />
                          <span
                            className="group-hover:underline decoration-[#b08d57] underline-offset-4"
                            dangerouslySetInnerHTML={{ __html: program }}
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

      {/* Faculty values / summary */}
      <section className="border-y border-slate-200 bg-[#fafaf9]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-20">
          <div className="mb-10 max-w-3xl">
            <p className="academic-label mb-3">Standards</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0a2540] tracking-tight leading-tight mb-4">
              Faculty Selection Standards.
            </h2>
            <p className="text-slate-600 leading-relaxed">
              SkillMint applies consistent standards in selecting instructors
              across every department.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: Users,
                title: "Active practice",
                desc: "Instructors are working professionals, currently practicing in the discipline they teach.",
              },
              {
                icon: BookOpen,
                title: "Curriculum authorship",
                desc: "Each instructor is responsible for the structure and integrity of their program curriculum.",
              },
              {
                icon: GraduationCap,
                title: "Student outcomes",
                desc: "Faculty are reviewed annually against student outcomes, completion, and instructional quality.",
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

      {/* Faculty inquiries */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-20">
        <div className="rounded-lg border border-slate-200 bg-white p-10 sm:p-12 text-center">
          <GraduationCap
            className="h-8 w-8 text-[#98753f] mx-auto mb-5"
            strokeWidth={1.75}
          />
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0a2540] tracking-tight mb-4">
            Faculty Inquiries.
          </h2>
          <p className="text-slate-600 leading-relaxed mb-8 max-w-xl mx-auto">
            SkillMint accepts proposals from practitioners interested in
            developing and leading a program. Faculty candidates may contact
            the Office of Academic Affairs.
          </p>
          <a
            href="mailto:faculty@skillmint.courses"
            className="inline-flex items-center gap-2 rounded-md border border-[#b08d57] bg-white hover:bg-[#f5ecd7] px-7 py-3.5 text-sm font-semibold tracking-wide text-[#0a2540] transition-colors"
          >
            <Mail className="h-4 w-4" />
            faculty@skillmint.courses
          </a>
        </div>
      </section>
    </div>
  );
}

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Award, GraduationCap, ChevronLeft } from "lucide-react";
import CertificatePrint from "@/components/CertificatePrint";

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const cert = await prisma.certificate.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, email: true } },
      course: { select: { title: true, slug: true, totalHours: true, category: true } },
    },
  });

  if (!cert) notFound();

  return (
    <div className="min-h-screen bg-[#fafaf9] flex flex-col items-center justify-center px-4 py-12">
      <div className="no-print mb-8 flex gap-3 w-full max-w-3xl justify-between">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white hover:bg-white hover:border-[#b08d57] px-4 py-2.5 text-sm font-semibold tracking-wide text-[#0a2540] transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Student Portal
        </Link>
        <CertificatePrint />
      </div>

      <div
        id="certificate"
        className="w-full max-w-3xl overflow-hidden bg-white border-2 border-[#0a2540] relative"
      >
        {/* Double-rule gold trim */}
        <div className="h-1.5 w-full bg-[#b08d57]" />
        <div className="h-px w-full bg-[#0a2540]" />

        <div className="px-10 py-14 text-center relative">
          {/* Watermark */}
          <div className="absolute inset-0 -z-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
            <GraduationCap className="h-[400px] w-[400px] text-[#0a2540]" strokeWidth={1} />
          </div>

          <div className="relative z-10">
            {/* Institutional seal */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-12 w-12 rounded-md bg-[#0a2540] border-2 border-[#b08d57] flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-[#b08d57]" strokeWidth={1.75} />
              </div>
              <div className="text-left">
                <div className="font-serif text-2xl font-bold text-[#0a2540] tracking-tight leading-none">
                  SkillMint
                </div>
                <div className="text-[9px] font-bold tracking-[0.28em] uppercase text-[#98753f] mt-1">
                  Online Academy
                </div>
              </div>
            </div>

            <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-8 text-[#98753f]">
              Certificate of Completion
            </p>

            <p className="text-slate-600 text-sm italic mb-5">This is to certify that</p>

            <h1 className="font-serif text-5xl sm:text-6xl text-[#0a2540] mb-6 font-bold tracking-tight leading-none">
              {cert.user.name || "Student"}
            </h1>

            <p className="text-slate-600 text-sm italic mb-5">
              has satisfied all requirements of the program of study in
            </p>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0a2540] mb-10 tracking-tight leading-tight">
              {cert.course.title}
            </h2>

            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="h-px flex-1 max-w-[120px] bg-[#b08d57]/40" />
              <Award className="h-5 w-5 text-[#b08d57]" strokeWidth={1.75} />
              <div className="h-px flex-1 max-w-[120px] bg-[#b08d57]/40" />
            </div>

            <div className="flex flex-wrap justify-center gap-10 mb-12 text-sm">
              <div className="text-center">
                <div className="text-[10px] text-[#98753f] mb-1 uppercase tracking-[0.18em] font-bold">
                  Discipline
                </div>
                <div className="font-serif text-[#0a2540] font-bold">
                  {cert.course.category}
                </div>
              </div>
              <div className="text-center">
                <div className="text-[10px] text-[#98753f] mb-1 uppercase tracking-[0.18em] font-bold">
                  Duration
                </div>
                <div className="font-serif text-[#0a2540] font-bold">
                  {cert.course.totalHours} Hours
                </div>
              </div>
              <div className="text-center">
                <div className="text-[10px] text-[#98753f] mb-1 uppercase tracking-[0.18em] font-bold">
                  Conferred
                </div>
                <div className="font-serif text-[#0a2540] font-bold">
                  {new Date(cert.issuedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-12 mb-10">
              <div className="text-center">
                <div className="font-serif text-2xl italic font-bold text-[#0a2540] mb-1">
                  SkillMint
                </div>
                <div className="h-px bg-[#0a2540] w-48 mx-auto mb-1.5" />
                <div className="text-[10px] text-[#98753f] uppercase tracking-[0.18em] font-bold">
                  Office of the Registrar
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-[#fafaf9] px-4 py-1.5">
              <span className="text-[10px] text-[#98753f] uppercase tracking-[0.18em] font-bold">
                Credential ID
              </span>
              <code className="text-xs text-[#0a2540] font-mono font-semibold">
                {cert.id}
              </code>
            </div>

            <p className="mt-3 text-xs text-slate-500 italic">
              Verify at skillmint.courses/certificate/{cert.id}
            </p>
          </div>
        </div>

        <div className="h-px w-full bg-[#0a2540]" />
        <div className="h-1.5 w-full bg-[#b08d57]" />
      </div>
    </div>
  );
}

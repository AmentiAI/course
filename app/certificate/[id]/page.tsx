import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Award, Printer } from "lucide-react";
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
    <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center px-4 py-10">
      {/* Print button */}
      <div className="no-print mb-8 flex gap-3">
        <CertificatePrint />
        <a
          href="/dashboard"
          className="rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-300 hover:text-white transition-all"
        >
          ← Dashboard
        </a>
      </div>

      {/* Certificate */}
      <div
        id="certificate"
        className="w-full max-w-3xl rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a0a3e 0%, #0f0720 40%, #1a0a3e 100%)",
          border: "2px solid rgba(124, 58, 237, 0.5)",
          boxShadow: "0 0 60px rgba(124, 58, 237, 0.2), 0 0 120px rgba(124, 58, 237, 0.1)",
        }}
      >
        {/* Top decorative border */}
        <div
          className="h-2 w-full"
          style={{
            background: "linear-gradient(90deg, #7c3aed, #f59e0b, #7c3aed)",
          }}
        />

        <div className="px-10 py-12 text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-xl bg-purple-600 flex items-center justify-center">
              <Award className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">
              Skill<span className="text-purple-400">Mint</span>
            </span>
          </div>

          {/* Certificate title */}
          <div className="mb-6">
            <div
              className="inline-block text-xs font-semibold tracking-[0.3em] uppercase mb-3"
              style={{ color: "#f59e0b" }}
            >
              ✦ Certificate of Completion ✦
            </div>
          </div>

          <p className="text-zinc-400 text-sm mb-4">This is to certify that</p>

          {/* Student name */}
          <h1
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{
              background: "linear-gradient(135deg, #ffffff, #e0d0ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
            }}
          >
            {cert.user.name || "Student"}
          </h1>

          <p className="text-zinc-400 text-sm mb-4">
            has successfully completed the course
          </p>

          {/* Course name */}
          <h2
            className="text-2xl sm:text-3xl font-bold text-white mb-6"
            style={{ lineHeight: "1.3" }}
          >
            {cert.course.title}
          </h2>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div
              className="h-px flex-1 max-w-[100px]"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.6))",
              }}
            />
            <Award className="h-5 w-5 text-amber-400" />
            <div
              className="h-px flex-1 max-w-[100px]"
              style={{
                background: "linear-gradient(90deg, rgba(124, 58, 237, 0.6), transparent)",
              }}
            />
          </div>

          {/* Details */}
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
            <div className="text-center">
              <div className="text-zinc-500 text-xs mb-1">Category</div>
              <div className="text-zinc-300 font-medium">{cert.course.category}</div>
            </div>
            <div className="text-center">
              <div className="text-zinc-500 text-xs mb-1">Duration</div>
              <div className="text-zinc-300 font-medium">{cert.course.totalHours} hours</div>
            </div>
            <div className="text-center">
              <div className="text-zinc-500 text-xs mb-1">Issued On</div>
              <div className="text-zinc-300 font-medium">
                {new Date(cert.issuedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>

          {/* Signature area */}
          <div className="flex justify-center gap-12 mb-8">
            <div className="text-center">
              <div
                className="text-xl font-bold mb-1"
                style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: "#a78bfa" }}
              >
                SkillMint
              </div>
              <div className="h-px bg-zinc-700 mb-1" />
              <div className="text-xs text-zinc-500">Platform Authority</div>
            </div>
          </div>

          {/* Certificate ID */}
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5">
            <span className="text-xs text-zinc-500">Certificate ID:</span>
            <code className="text-xs text-purple-400 font-mono">{cert.id}</code>
          </div>

          <p className="mt-3 text-xs text-zinc-700">
            Verify at skillmint.io/certificate/{cert.id}
          </p>
        </div>

        {/* Bottom decorative border */}
        <div
          className="h-2 w-full"
          style={{
            background: "linear-gradient(90deg, #7c3aed, #f59e0b, #7c3aed)",
          }}
        />
      </div>
    </div>
  );
}

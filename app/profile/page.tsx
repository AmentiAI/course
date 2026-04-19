import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { User, Award, BookOpen, Share2, ArrowRight } from "lucide-react";
import { createHash } from "crypto";
import ProfileClient from "./ProfileClient";
import MobileNav from "@/components/MobileNav";

async function getProfileData(userId: string) {
  const [user, enrollments, certificates] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, image: true, createdAt: true, role: true },
    }),
    prisma.enrollment.count({ where: { userId } }),
    prisma.certificate.count({ where: { userId } }),
  ]);

  return { user, enrollments, certificates };
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/auth/signin?redirect=/profile");

  const { user, enrollments, certificates } = await getProfileData(session.user.id);

  const referralCode = createHash("sha256")
    .update(session.user.id)
    .digest("hex")
    .slice(0, 8)
    .toUpperCase();

  const referralUrl = `https://skillmint.courses/r/${referralCode}`;

  return (
    <div className="min-h-screen bg-white pb-24 md:pb-16">
      <section className="hero-backdrop border-b border-slate-200 px-4 sm:px-6 py-14">
        <div className="mx-auto max-w-3xl">
          <p className="academic-label mb-3">Student Record</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#0a2540] tracking-tight leading-tight">
            Account &amp; Profile.
          </h1>
          <p className="text-slate-600 text-[17px] leading-relaxed mt-3">
            Review your student record, referral program details, and Academy resources.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
        {/* Profile card */}
        <div className="rounded-lg border border-slate-200 bg-white p-8 mb-6">
          <div className="flex items-center gap-5 mb-7 pb-6 border-b border-slate-100">
            <div className="h-16 w-16 rounded-full bg-[#0a2540] border-2 border-[#b08d57] flex items-center justify-center text-xl font-bold text-white shrink-0 tracking-wider">
              {user?.name?.[0]?.toUpperCase() ?? "S"}
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-[#0a2540] tracking-tight">
                {user?.name}
              </h2>
              <p className="text-slate-600 text-sm">{user?.email}</p>
              <p className="text-xs text-slate-500 mt-1.5 font-medium tracking-wide">
                Matriculated{" "}
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  : ""}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Programs", value: enrollments, icon: BookOpen },
              { label: "Credentials", value: certificates, icon: Award },
              { label: "Standing", value: session.user.role === "ADMIN" ? "Admin" : "Student", icon: User },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-slate-200 bg-white p-5 text-center border-t-2 border-t-[#b08d57]"
              >
                <stat.icon className="h-4 w-4 text-[#98753f] mx-auto mb-3" strokeWidth={1.75} />
                <div className="font-serif text-2xl font-bold text-[#0a2540] leading-tight tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-500 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Referral section */}
        <div className="rounded-lg border border-slate-200 bg-white p-7 mb-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-10 w-10 rounded-md bg-[#f5ecd7] border border-[#e7d7b0] flex items-center justify-center">
              <Share2 className="h-5 w-5 text-[#98753f]" strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#0a2540] tracking-tight">
                Referral Program.
              </h3>
              <p className="text-xs text-slate-500">
                Earn 20% commission on every referred enrollment
              </p>
            </div>
          </div>

          <div className="rounded-md bg-[#fafaf9] border border-slate-200 p-4 mb-3">
            <p className="text-[10px] text-[#98753f] mb-1.5 font-bold uppercase tracking-[0.18em]">
              Your Referral Link
            </p>
            <p className="text-sm text-[#0a2540] font-mono break-all">{referralUrl}</p>
          </div>

          <ProfileClient referralUrl={referralUrl} />

          <div className="mt-5 grid grid-cols-3 gap-3 text-center">
            {[
              { label: "Referrals", value: "0" },
              { label: "Pending", value: "$0" },
              { label: "Earned", value: "$0" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-md border border-slate-200 bg-white p-3"
              >
                <div className="font-serif text-lg font-bold text-[#0a2540]">{stat.value}</div>
                <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-500 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-4 text-center">
            Referral tracking is rolling out soon — the link is live and attributed.
          </p>
        </div>

        {/* Quick links */}
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#98753f] mb-4">
            Academy Resources
          </p>
          <div className="space-y-1">
            {[
              { href: "/dashboard", label: "Student Portal" },
              { href: "/dashboard/wishlist", label: "Saved Programs" },
              { href: "/courses", label: "Program Catalog" },
              { href: "/instructors", label: "Faculty Directory" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between p-3 rounded-md hover:bg-[#fafaf9] transition-colors group"
              >
                <span className="text-sm font-medium text-slate-700 group-hover:text-[#0a2540] transition-colors">
                  {link.label}
                </span>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-[#98753f] group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <MobileNav />
    </div>
  );
}

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { User, Award, BookOpen, Share2, Copy, ArrowRight } from "lucide-react";
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

  const referralUrl = `https://coursehub-gold.vercel.app/r/${referralCode}`;

  return (
    <div className="min-h-screen bg-[#09090b] px-4 py-10 pb-24 md:pb-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-white mb-8">My Profile</h1>

        {/* Profile card */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 mb-6">
          <div className="flex items-center gap-5 mb-6">
            <div className="h-16 w-16 rounded-2xl bg-purple-600 flex items-center justify-center text-2xl font-bold text-white shrink-0">
              {user?.name?.[0]?.toUpperCase() ?? "U"}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{user?.name}</h2>
              <p className="text-zinc-500 text-sm">{user?.email}</p>
              <p className="text-xs text-zinc-600 mt-0.5">
                Member since{" "}
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  : ""}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Courses", value: enrollments, icon: BookOpen, color: "text-blue-400" },
              { label: "Certificates", value: certificates, icon: Award, color: "text-amber-400" },
              { label: "Role", value: session.user.role ?? "Student", icon: User, color: "text-purple-400" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl bg-zinc-800/50 p-3 text-center">
                <stat.icon className={`h-5 w-5 ${stat.color} mx-auto mb-1`} />
                <div className="text-lg font-bold text-white">{stat.value}</div>
                <div className="text-xs text-zinc-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Referral section */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-amber-400/10 flex items-center justify-center">
              <Share2 className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Referral Program</h3>
              <p className="text-xs text-zinc-500">Earn 20% commission on every referred sale</p>
            </div>
          </div>

          <div className="rounded-xl bg-zinc-800 border border-zinc-700 p-3 mb-3">
            <p className="text-xs text-zinc-500 mb-1">Your referral link</p>
            <p className="text-sm text-white font-mono break-all">{referralUrl}</p>
          </div>

          <ProfileClient referralUrl={referralUrl} />

          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            {[
              { label: "Referrals", value: "0" },
              { label: "Pending", value: "$0" },
              { label: "Earned", value: "$0" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl bg-zinc-800/50 p-3">
                <div className="text-lg font-bold text-white">{stat.value}</div>
                <div className="text-xs text-zinc-500">{stat.label}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-zinc-600 mt-3 text-center">
            Referral tracking coming soon — your link is live and working
          </p>
        </div>

        {/* Quick links */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
          <h3 className="font-semibold text-white mb-4">Quick Links</h3>
          <div className="space-y-2">
            {[
              { href: "/dashboard", label: "My Dashboard" },
              { href: "/dashboard/wishlist", label: "Saved Courses" },
              { href: "/courses", label: "Browse All Courses" },
              { href: "/instructors", label: "Meet the Instructors" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-800 transition-colors group"
              >
                <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">
                  {link.label}
                </span>
                <ArrowRight className="h-4 w-4 text-zinc-600 group-hover:text-purple-400 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <MobileNav />
    </div>
  );
}

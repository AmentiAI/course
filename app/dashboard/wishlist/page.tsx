import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Bookmark, ArrowRight, BookOpen } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import MobileNav from "@/components/MobileNav";

async function getWishlist(userId: string) {
  return prisma.wishlist.findMany({
    where: { userId },
    include: {
      course: {
        include: {
          _count: { select: { enrollments: true } },
        },
      },
    },
    orderBy: { id: "desc" },
  });
}

export default async function WishlistPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/auth/signin?redirect=/dashboard/wishlist");

  const wishlistItems = await getWishlist(session.user.id);

  return (
    <div className="min-h-screen bg-white pb-24 md:pb-16">
      <section className="hero-backdrop border-b border-slate-200 px-4 sm:px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <p className="academic-label mb-3">Dashboard</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#0a2540] tracking-tight leading-tight mb-3">
            Saved courses.
          </h1>
          <p className="text-slate-600 text-[17px] leading-relaxed max-w-2xl">
            {wishlistItems.length === 0
              ? "Save courses you want to come back to later."
              : `${wishlistItems.length} course${
                  wishlistItems.length !== 1 ? "s" : ""
                } saved. Buy when you're ready to start.`}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <CourseCard key={item.id} course={item.course} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-slate-200 bg-white p-14 text-center max-w-md mx-auto">
            <div className="inline-flex h-14 w-14 rounded-md bg-[#f5ecd7] border border-[#e7d7b0] items-center justify-center mb-5">
              <Bookmark className="h-6 w-6 text-[#98753f]" strokeWidth={1.75} />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#0a2540] mb-3 tracking-tight">
              Nothing saved yet.
            </h3>
            <p className="text-slate-600 mb-7 max-w-xs mx-auto leading-relaxed">
              Tap the bookmark on any course card to save it here.
            </p>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-md bg-[#0a2540] hover:bg-[#123258] px-6 py-3 text-sm font-semibold tracking-wide text-white transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              Browse Courses
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>

      <MobileNav />
    </div>
  );
}

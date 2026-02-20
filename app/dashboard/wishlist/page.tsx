import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Heart, ArrowRight, BookOpen } from "lucide-react";
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
    <div className="min-h-screen bg-[#09090b] px-4 py-10 pb-24 md:pb-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 flex items-center gap-3">
            <Heart className="h-7 w-7 text-red-400 fill-red-400" />
            My Wishlist
          </h1>
          <p className="text-zinc-500 text-sm">
            {wishlistItems.length === 0
              ? "Save courses to your wishlist"
              : `${wishlistItems.length} course${wishlistItems.length !== 1 ? "s" : ""} saved`}
          </p>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {wishlistItems.map((item) => (
              <CourseCard
                key={item.id}
                course={item.course}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-12 text-center max-w-md mx-auto">
            <Heart className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              No saved courses yet
            </h3>
            <p className="text-sm text-zinc-500 mb-6">
              Click the heart icon on any course to save it here
            </p>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 px-6 py-3 text-sm font-semibold text-white transition-all"
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

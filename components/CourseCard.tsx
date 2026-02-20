"use client";

import Link from "next/link";
import { Clock, Heart } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface CourseCardProps {
  course: {
    id: string;
    slug: string;
    title: string;
    shortDesc: string;
    thumbnail: string;
    price: number;
    originalPrice?: number | null;
    level: string;
    category: string;
    totalLessons: number;
    totalHours: number;
    _count: { enrollments: number };
  };
  avgRating?: number;
  isNew?: boolean;
  isPopular?: boolean;
  initialWishlisted?: boolean;
}

export default function CourseCard({
  course,
  avgRating,
  isNew,
  isPopular,
  initialWishlisted = false,
}: CourseCardProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [wishlisted, setWishlisted] = useState(initialWishlisted);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!session) {
      router.push("/auth/signin");
      return;
    }
    setWishlistLoading(true);
    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: course.id }),
      });
      if (res.ok) {
        const data = await res.json();
        setWishlisted(data.wishlisted ?? !wishlisted);
      }
    } finally {
      setWishlistLoading(false);
    }
  };

  const levelColors: Record<string, string> = {
    BEGINNER: "text-green-400 bg-green-400/10",
    INTERMEDIATE: "text-blue-400 bg-blue-400/10",
    ADVANCED: "text-red-400 bg-red-400/10",
  };

  const discount =
    course.originalPrice
      ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
      : null;

  return (
    <Link href={`/courses/${course.slug}`} className="group block">
      <div className="course-card rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden h-full flex flex-col hover:border-purple-500/40">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-zinc-800">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Badges */}
          <div className="absolute top-2 left-2 flex gap-1.5">
            {isPopular && (
              <span className="badge-popular">🔥 Popular</span>
            )}
            {isNew && (
              <span className="badge-new">✨ New</span>
            )}
          </div>
          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            disabled={wishlistLoading}
            className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors"
          >
            <Heart
              className={`h-3.5 w-3.5 transition-colors ${
                wishlisted
                  ? "fill-red-400 text-red-400"
                  : "text-white"
              }`}
            />
          </button>
          {/* Category */}
          <div className="absolute bottom-2 left-2">
            <span className="text-xs bg-black/60 backdrop-blur-sm text-zinc-300 px-2 py-0.5 rounded-full">
              {course.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                levelColors[course.level] || "text-zinc-400 bg-zinc-700"
              }`}
            >
              {course.level}
            </span>
          </div>

          <h3 className="font-semibold text-white text-sm leading-snug mb-1.5 group-hover:text-purple-300 transition-colors line-clamp-2">
            {course.title}
          </h3>

          <p className="text-xs text-zinc-500 leading-relaxed mb-3 flex-1 line-clamp-2">
            {course.shortDesc}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-zinc-500 mb-3">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {course.totalHours}h
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="h-3 w-3" />
              {course.totalLessons} lessons
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-amber-400">
                ${course.price}
              </span>
              {course.originalPrice && (
                <>
                  <span className="text-xs text-zinc-600 line-through">
                    ${course.originalPrice}
                  </span>
                  {discount && (
                    <span className="text-xs text-green-400 font-medium">
                      -{discount}%
                    </span>
                  )}
                </>
              )}
            </div>
            <span className="text-xs bg-purple-600/20 text-purple-300 px-2.5 py-1 rounded-lg border border-purple-500/20 font-medium">
              Enroll →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Fix import
function BookOpen({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

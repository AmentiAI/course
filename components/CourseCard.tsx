"use client";

import Link from "next/link";
import { Clock, BookOpen, Users, ArrowRight } from "lucide-react";
import WishlistButton from "./WishlistButton";

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

const levelClasses: Record<string, string> = {
  BEGINNER: "text-[#14532d] bg-[#dcfce7] border-[#bbf7d0]",
  INTERMEDIATE: "text-[#0a2540] bg-[#e0e7f1] border-[#c7d2e1]",
  ADVANCED: "text-[#7a1f1f] bg-rose-50 border-rose-200",
};

export default function CourseCard({
  course,
  isNew,
  isPopular,
  initialWishlisted = false,
}: CourseCardProps) {
  return (
    <Link href={`/courses/${course.slug}`} className="group block h-full">
      <article className="course-card relative rounded-lg bg-white border border-slate-200 overflow-hidden h-full flex flex-col">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-slate-100">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex gap-1.5">
            {isPopular && <span className="badge-popular">Popular</span>}
            {isNew && <span className="badge-new">New</span>}
          </div>
          <div className="absolute top-3 right-3">
            <WishlistButton
              courseId={course.id}
              initialWishlisted={initialWishlisted}
              size="sm"
            />
          </div>
          <div className="absolute bottom-3 left-3">
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase bg-white/95 backdrop-blur-sm text-[#0a2540] px-2.5 py-1 rounded border border-slate-200 shadow-sm">
              {course.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`text-[9px] font-bold tracking-[0.12em] uppercase px-2 py-0.5 rounded border ${
                levelClasses[course.level] ||
                "text-slate-600 bg-slate-50 border-slate-200"
              }`}
            >
              {course.level}
            </span>
            {course._count.enrollments > 0 && (
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Users className="h-3 w-3" />
                {course._count.enrollments}
              </span>
            )}
          </div>

          <h3 className="font-serif text-[19px] font-bold text-[#0a2540] leading-snug tracking-tight mb-2 group-hover:underline decoration-[#b08d57] underline-offset-4 line-clamp-2">
            {course.title}
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed mb-5 flex-1 line-clamp-2">
            {course.shortDesc}
          </p>

          <div className="flex items-center gap-4 text-xs text-slate-500 mb-5">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#98753f]" />
              {course.totalHours}h
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-[#98753f]" />
              {course.totalLessons} lessons
            </span>
          </div>

          <div className="flex items-center justify-between pt-5 border-t border-slate-100">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-xl font-bold text-[#0a2540]">
                ${course.price}
              </span>
              {course.originalPrice && course.originalPrice > course.price && (
                <span className="text-xs text-slate-400 line-through">
                  ${course.originalPrice}
                </span>
              )}
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold tracking-wide text-[#98753f] group-hover:text-[#0a2540] transition-colors">
              View Program
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

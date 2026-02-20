import { prisma } from "@/lib/prisma";
import CourseCard from "@/components/CourseCard";
import CoursesFilter from "@/components/CoursesFilter";
import { SlidersHorizontal } from "lucide-react";

interface SearchParams {
  q?: string;
  category?: string;
  level?: string;
  sort?: string;
  page?: string;
}

async function getCourses(params: SearchParams) {
  const { q, category, level, sort, page } = params;
  const pageNum = parseInt(page || "1");
  const pageSize = 9;

  const where: any = { isPublished: true };

  if (q) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { shortDesc: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
      { tags: { has: q } },
    ];
  }

  if (category && category !== "all") {
    where.category = category;
  }

  if (level && level !== "all") {
    where.level = level.toUpperCase();
  }

  const orderBy: any =
    sort === "price-asc"
      ? { price: "asc" }
      : sort === "price-desc"
      ? { price: "desc" }
      : sort === "newest"
      ? { createdAt: "desc" }
      : { enrollments: { _count: "desc" } };

  const [courses, total] = await Promise.all([
    prisma.course.findMany({
      where,
      include: {
        _count: { select: { enrollments: true, reviews: true } },
        reviews: { select: { rating: true } },
      },
      orderBy,
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
    }),
    prisma.course.count({ where }),
  ]);

  return { courses, total, pages: Math.ceil(total / pageSize), pageNum };
}

function getAvgRating(reviews: { rating: number }[]) {
  if (!reviews.length) return 4.8;
  return reviews.reduce((a, b) => a + b.rating, 0) / reviews.length;
}

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { courses, total, pages, pageNum } = await getCourses(params);

  return (
    <div className="min-h-screen bg-[#09090b] px-4 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {params.q
              ? `Search: "${params.q}"`
              : params.category
              ? `${params.category} Courses`
              : "All Courses"}
          </h1>
          <p className="text-zinc-500">
            {total} course{total !== 1 ? "s" : ""} available
          </p>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filter */}
          <aside className="hidden lg:block w-60 shrink-0">
            <CoursesFilter current={params} />
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile filter + sort bar */}
            <div className="flex items-center gap-3 mb-5 lg:hidden">
              <CoursesFilter current={params} mobile />
            </div>

            {/* Sort bar */}
            <div className="hidden lg:flex items-center justify-between mb-5">
              <span className="text-sm text-zinc-500">
                Showing {Math.min((pageNum - 1) * 9 + 1, total)}–
                {Math.min(pageNum * 9, total)} of {total} results
              </span>
              <CoursesFilter current={params} sortOnly />
            </div>

            {/* Course Grid */}
            {courses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {courses.map((course, idx) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    avgRating={getAvgRating(course.reviews)}
                    isPopular={course._count.enrollments > 20}
                    isNew={
                      new Date(course.createdAt).getTime() >
                      Date.now() - 7 * 24 * 60 * 60 * 1000
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-4xl mb-3">🔍</div>
                <p className="text-zinc-400 font-medium mb-1">No courses found</p>
                <p className="text-sm text-zinc-600">
                  Try adjusting your filters or search term
                </p>
              </div>
            )}

            {/* Pagination */}
            {pages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                {Array.from({ length: pages }).map((_, i) => {
                  const p = i + 1;
                  const url = new URLSearchParams(params as any);
                  url.set("page", String(p));
                  return (
                    <a
                      key={p}
                      href={`/courses?${url.toString()}`}
                      className={`w-9 h-9 rounded-lg text-sm font-medium flex items-center justify-center border transition-colors ${
                        p === pageNum
                          ? "bg-purple-600 border-purple-600 text-white"
                          : "border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white"
                      }`}
                    >
                      {p}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

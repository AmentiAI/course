import { prisma } from "@/lib/prisma";
import CourseCard from "@/components/CourseCard";
import CoursesFilter from "@/components/CoursesFilter";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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
      include: { _count: { select: { enrollments: true } } },
      orderBy,
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
    }),
    prisma.course.count({ where }),
  ]);

  return { courses, total, pages: Math.ceil(total / pageSize), pageNum };
}

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { courses, total, pages, pageNum } = await getCourses(params);

  const session = await getServerSession(authOptions);
  const wishlistCourseIds = session?.user?.id
    ? (
        await prisma.wishlist.findMany({
          where: { userId: session.user.id },
          select: { courseId: true },
        })
      ).map((w) => w.courseId)
    : [];

  const heading = params.q
    ? `Search results for "${params.q}"`
    : params.category
    ? `${params.category}`
    : "Program Catalog";

  return (
    <div className="min-h-screen bg-white">
      {/* Header band */}
      <section className="hero-backdrop border-b border-slate-200 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="academic-label mb-3">SkillMint Catalog</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#0a2540] tracking-tight leading-tight mb-3">
            {heading}
          </h1>
          <p className="text-slate-600 text-[17px] leading-relaxed max-w-2xl">
            {total} program{total !== 1 ? "s" : ""} across Web2 and Web3 — AI, trading,
            e-commerce, marketing, development, and more — taught by working
            professionals and delivered online.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-20">
              <CoursesFilter current={params} />
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-6 lg:hidden">
              <CoursesFilter current={params} mobile />
            </div>

            <div className="hidden lg:flex items-center justify-between mb-6">
              <span className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-semibold text-[#0a2540]">
                  {Math.min((pageNum - 1) * 9 + 1, total)}–
                  {Math.min(pageNum * 9, total)}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-[#0a2540]">{total}</span> programs
              </span>
              <CoursesFilter current={params} sortOnly />
            </div>

            {courses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    isPopular={course._count.enrollments > 20}
                    isNew={
                      new Date(course.createdAt).getTime() >
                      Date.now() - 7 * 24 * 60 * 60 * 1000
                    }
                    initialWishlisted={wishlistCourseIds.includes(course.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 rounded-lg border border-dashed border-slate-200 bg-[#fafaf9]">
                <p className="font-serif text-lg text-[#0a2540] font-bold mb-1">
                  No programs match your filters
                </p>
                <p className="text-sm text-slate-500">
                  Try adjusting your filters or searching a different term.
                </p>
              </div>
            )}

            {pages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                {Array.from({ length: pages }).map((_, i) => {
                  const p = i + 1;
                  const url = new URLSearchParams(params as any);
                  url.set("page", String(p));
                  return (
                    <a
                      key={p}
                      href={`/courses?${url.toString()}`}
                      className={`w-10 h-10 rounded-md text-sm font-semibold flex items-center justify-center border transition-colors ${
                        p === pageNum
                          ? "bg-[#0a2540] border-[#0a2540] text-white"
                          : "border-slate-200 text-slate-600 hover:border-[#b08d57] hover:text-[#0a2540] hover:bg-white"
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

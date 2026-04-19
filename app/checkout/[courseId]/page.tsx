import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import {
  ChevronLeft,
  Check,
  ShieldCheck,
  Lock,
  Clock,
  BookOpen,
  Award,
} from 'lucide-react';
import PaymentOptions from '@/components/PaymentOptions';

async function getCourse(courseId: string) {
  return prisma.course.findUnique({ where: { id: courseId } });
}

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect(`/auth/signin?redirect=/checkout/${courseId}`);
  }

  const course = await getCourse(courseId);
  if (!course) notFound();

  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: { userId: session.user.id, courseId },
    },
  });

  if (enrollment) {
    redirect(`/learn/${course.slug}`);
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="hero-backdrop border-b border-slate-200 px-4 sm:px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <Link
            href={`/courses/${course.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-[#0a2540] mb-5 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Return to program
          </Link>

          <p className="academic-label mb-3">Enrollment</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#0a2540] tracking-tight leading-tight">
            Complete Your Enrollment.
          </h1>
          <p className="text-slate-600 text-[17px] leading-relaxed max-w-2xl mt-3">
            Review the program summary, then complete payment to begin
            coursework immediately in the Student Portal.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Payment */}
          <div className="lg:col-span-3">
            <div className="rounded-lg border border-slate-200 bg-white p-7">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="h-3.5 w-3.5 text-[#14532d]" />
                <span className="text-[10px] font-bold text-[#14532d] uppercase tracking-[0.22em]">
                  256-bit Encrypted &middot; PCI Compliant
                </span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#0a2540] mb-6 tracking-tight">
                Payment Method.
              </h2>
              <PaymentOptions
                courseId={courseId}
                coursePrice={course.price}
                courseSlug={course.slug}
              />
            </div>

            <div className="mt-5 flex items-center gap-5 text-xs text-slate-500 justify-center flex-wrap">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[#14532d]" />
                Buyer protection
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-[#14532d]" />
                Immediate access
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-[#14532d]" />
                30-day refund policy
              </span>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border border-slate-200 bg-white p-6 sticky top-20">
              <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#98753f] mb-4">
                Program Summary
              </p>

              <div className="flex gap-3 mb-5">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="h-20 w-28 rounded-md object-cover border border-slate-200 shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="font-serif text-[15px] font-bold text-[#0a2540] leading-snug line-clamp-2 tracking-tight">
                    {course.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    {course.category}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 py-4 border-y border-slate-200 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Tuition</span>
                  <span className="font-medium text-[#0a2540]">
                    ${course.price.toFixed(2)}
                  </span>
                </div>
                {course.originalPrice &&
                  course.originalPrice > course.price && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">Discount</span>
                      <span className="font-medium text-[#14532d]">
                        -$
                        {(course.originalPrice - course.price).toFixed(2)}
                      </span>
                    </div>
                  )}
              </div>

              <div className="flex justify-between items-baseline py-5">
                <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#98753f]">
                  Total (USD)
                </span>
                <span className="font-serif text-3xl font-bold text-[#0a2540] tracking-tight">
                  ${course.price.toFixed(2)}
                </span>
              </div>

              <div className="pt-5 border-t border-slate-200 space-y-2.5">
                <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#98753f] mb-3">
                  Included With Enrollment
                </p>
                {[
                  {
                    icon: Clock,
                    label: `${course.totalHours} hours of coursework`,
                  },
                  {
                    icon: BookOpen,
                    label: `${course.totalLessons} lessons`,
                  },
                  { icon: Award, label: 'Verifiable credential' },
                  { icon: Check, label: 'Lifetime access' },
                  { icon: Check, label: 'Discussion forum access' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2.5 text-xs text-slate-700"
                  >
                    <item.icon className="h-3.5 w-3.5 text-[#98753f] shrink-0" />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

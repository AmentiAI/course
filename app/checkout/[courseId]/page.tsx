import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ChevronLeft, Check, CreditCard } from 'lucide-react';
import CryptoPayment from '@/components/CryptoPayment';

async function getCourse(courseId: string) {
  return prisma.course.findUnique({
    where: { id: courseId },
  });
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

  // Check if already enrolled
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: session.user.id,
        courseId,
      },
    },
  });

  if (enrollment) {
    redirect(`/learn/${course.slug}`);
  }

  return (
    <div className="min-h-screen bg-[#09090b] py-12">
      <div className="mx-auto max-w-4xl px-4">
        {/* Back button */}
        <Link
          href={`/courses/${course.slug}`}
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 mb-6 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to course
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Payment options */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Complete Your Enrollment</h1>
              <p className="text-zinc-400">Choose your payment method</p>
            </div>

            {/* Crypto payment */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
                  <svg className="h-5 w-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.167-1.064-.25l.526-2.127-1.32-.33-.54 2.165c-.285-.067-.565-.132-.84-.2l-1.815-.45-.35 1.407s.975.225.955.236c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.406-.614.314.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.242-.54 2.19 1.32.327.54-2.17c.36.1.705.19 1.05.273l-.51 2.154 1.32.33.545-2.19c2.24.427 3.93.257 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.524 2.75 2.084v.006z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Cryptocurrency</h3>
                  <p className="text-xs text-zinc-500">Pay with Bitcoin or Solana</p>
                </div>
              </div>

              <CryptoPayment
                courseId={courseId}
                coursePrice={course.price}
                courseSlug={course.slug}
              />
            </div>

            {/* Card payment (placeholder) */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 opacity-50">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-zinc-700/50 border border-zinc-600 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-zinc-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-400">Credit / Debit Card</h3>
                  <p className="text-xs text-zinc-600">Coming soon</p>
                </div>
              </div>
              <p className="text-sm text-zinc-600">
                Traditional payment methods will be available soon. Use crypto for instant access.
              </p>
            </div>
          </div>

          {/* Right: Order summary */}
          <div className="lg:col-span-1">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 sticky top-6">
              <h3 className="font-semibold text-white mb-4">Order Summary</h3>

              {/* Course info */}
              <div className="mb-4">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full aspect-video rounded-lg object-cover mb-3"
                />
                <h4 className="text-sm font-medium text-white line-clamp-2">
                  {course.title}
                </h4>
                <p className="text-xs text-zinc-500 mt-1">{course.category}</p>
              </div>

              {/* Price breakdown */}
              <div className="space-y-2 py-4 border-t border-b border-zinc-800">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Course price</span>
                  <span className="text-white">${course.price.toFixed(2)}</span>
                </div>
                {course.originalPrice && course.originalPrice > course.price && (
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Discount</span>
                    <span className="text-green-400">
                      -${(course.originalPrice - course.price).toFixed(2)}
                    </span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center pt-4 mb-6">
                <span className="font-semibold text-white">Total</span>
                <span className="text-2xl font-bold text-amber-400">
                  ${course.price.toFixed(2)}
                </span>
              </div>

              {/* Benefits */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-zinc-400 mb-3">Included:</p>
                {[
                  'Lifetime access',
                  `${course.totalLessons} lessons`,
                  `${course.totalHours}h of content`,
                  'Certificate of completion',
                  'Discussion access',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-zinc-500">
                    <Check className="h-3 w-3 text-green-400 shrink-0" />
                    {item}
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

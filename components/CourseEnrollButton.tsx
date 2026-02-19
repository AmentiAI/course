"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Play, ArrowRight } from "lucide-react";

interface Props {
  courseId: string;
  courseSlug: string;
  enrolled: boolean;
  firstLessonId?: string;
}

export default function CourseEnrollButton({
  courseId,
  courseSlug,
  enrolled,
  firstLessonId,
}: Props) {
  const { data: session } = useSession();
  const router = useRouter();

  if (enrolled) {
    return (
      <Link
        href={
          firstLessonId
            ? `/learn/${courseSlug}/${firstLessonId}`
            : `/learn/${courseSlug}`
        }
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 hover:bg-green-500 px-5 py-3.5 font-semibold text-white transition-all"
      >
        <Play className="h-4 w-4 fill-white" />
        Continue Learning
      </Link>
    );
  }

  return (
    <Link
      href={session ? `/checkout/${courseId}` : `/auth/signin?redirect=/checkout/${courseId}`}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 px-5 py-3.5 font-semibold text-white transition-all hover:shadow-lg hover:shadow-purple-500/25"
    >
      Enroll Now
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

"use client";

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

  if (enrolled) {
    return (
      <Link
        href={
          firstLessonId
            ? `/learn/${courseSlug}/${firstLessonId}`
            : `/learn/${courseSlug}`
        }
        className="flex w-full items-center justify-center gap-2 rounded-md bg-[#14532d] hover:bg-[#0f3d21] px-5 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors"
      >
        <Play className="h-4 w-4 fill-white" />
        Continue Program
      </Link>
    );
  }

  return (
    <Link
      href={session ? `/checkout/${courseId}` : `/auth/signin?redirect=/checkout/${courseId}`}
      className="flex w-full items-center justify-center gap-2 rounded-md bg-[#0a2540] hover:bg-[#123258] px-5 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors"
    >
      Enroll in Program
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

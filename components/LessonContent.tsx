"use client";

import { useState } from "react";
import { Check, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  lessonId: string;
  courseId: string;
  enrolled: boolean;
  initialCompleted: boolean;
  nextLessonUrl: string | null;
  courseSlug: string;
  allLessonsCount: number;
  completedCount: number;
}

export default function LessonContent({
  lessonId,
  courseId,
  enrolled,
  initialCompleted,
  nextLessonUrl,
  courseSlug,
  allLessonsCount,
  completedCount,
}: Props) {
  const [completed, setCompleted] = useState(initialCompleted);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const markComplete = async () => {
    if (!enrolled || loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, courseId }),
      });
      if (res.ok) {
        setCompleted(true);
        const data = await res.json();
        if (data.courseCompleted) {
          router.push(`/certificate/${courseId}`);
        } else {
          router.refresh();
        }
      }
    } finally {
      setLoading(false);
    }
  };

  if (!enrolled) return null;

  return (
    <button
      onClick={markComplete}
      disabled={completed || loading}
      className={`shrink-0 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
        completed
          ? "bg-green-600/20 border border-green-500/50 text-green-400 cursor-default"
          : "bg-zinc-800 border border-zinc-700 text-zinc-300 hover:border-purple-500 hover:text-purple-300"
      }`}
    >
      {completed ? (
        <>
          <CheckCircle className="h-4 w-4" />
          Completed
        </>
      ) : loading ? (
        <span className="animate-pulse">Saving...</span>
      ) : (
        <>
          <Check className="h-4 w-4" />
          Mark Complete
        </>
      )}
    </button>
  );
}

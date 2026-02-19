"use client";

import { useState } from "react";
import { Menu, X, ChevronLeft, Check, Play, Lock } from "lucide-react";
import Link from "next/link";

interface Lesson {
  id: string;
  title: string;
  duration: number;
  isFree: boolean;
  moduleTitle: string;
}

interface Module {
  id: string;
  title: string;
  lessons: {
    id: string;
    title: string;
    duration: number;
    isFree: boolean;
    order: number;
  }[];
}

interface Props {
  courseSlug: string;
  courseTitle: string;
  modules: Module[];
  currentLessonId: string;
  completedIds: string[];
  isEnrolled: boolean;
  progressPct: number;
  completedCount: number;
  totalLessons: number;
}

export default function MobileSidebarToggle({
  courseSlug,
  courseTitle,
  modules,
  currentLessonId,
  completedIds,
  isEnrolled,
  progressPct,
  completedCount,
  totalLessons,
}: Props) {
  const [open, setOpen] = useState(false);
  const completedSet = new Set(completedIds);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed bottom-20 right-4 z-40 flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2.5 rounded-xl shadow-lg text-sm font-medium transition-colors"
      >
        <Menu className="h-4 w-4" />
        Lessons
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slide-in sidebar */}
      <div
        className={`lg:hidden fixed top-0 left-0 bottom-0 w-[85vw] max-w-sm z-50 bg-[#09090b] border-r border-zinc-800 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <Link
            href={`/courses/${courseSlug}`}
            className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-1 transition-colors"
          >
            <ChevronLeft className="h-3 w-3" />
            Back to course
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="p-1 text-zinc-500 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 border-b border-zinc-800">
          <h2 className="text-sm font-semibold text-white leading-snug line-clamp-2 mb-3">
            {courseTitle}
          </h2>
          {isEnrolled && (
            <div>
              <div className="flex justify-between text-xs text-zinc-500 mb-1">
                <span>Progress</span>
                <span className="text-green-400">{progressPct}%</span>
              </div>
              <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="text-xs text-zinc-600 mt-1">
                {completedCount} / {totalLessons} lessons
              </p>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto h-[calc(100%-160px)]">
          {modules.map((module) => (
            <div key={module.id}>
              <div className="px-4 py-2 bg-zinc-900/50 border-b border-zinc-800">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">
                  {module.title}
                </span>
              </div>
              {module.lessons.map((l) => {
                const isCompleted = completedSet.has(l.id);
                const isCurrent = l.id === currentLessonId;
                const isAccessible = l.isFree || isEnrolled;

                return (
                  <div
                    key={l.id}
                    className={`flex items-center gap-2.5 px-4 py-2.5 border-b border-zinc-800/50 transition-colors ${
                      isCurrent
                        ? "bg-purple-600/10 border-l-2 border-l-purple-500"
                        : "hover:bg-zinc-800/30"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    <div className="shrink-0">
                      {isCompleted ? (
                        <div className="h-5 w-5 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center">
                          <Check className="h-3 w-3 text-green-400" />
                        </div>
                      ) : isAccessible ? (
                        <div className="h-5 w-5 rounded-full border border-zinc-600 flex items-center justify-center">
                          <Play className="h-2.5 w-2.5 text-zinc-400 fill-zinc-400" />
                        </div>
                      ) : (
                        <div className="h-5 w-5 rounded-full border border-zinc-700 flex items-center justify-center">
                          <Lock className="h-2.5 w-2.5 text-zinc-600" />
                        </div>
                      )}
                    </div>
                    {isAccessible ? (
                      <Link
                        href={`/learn/${courseSlug}/${l.id}`}
                        className={`flex-1 text-xs leading-snug transition-colors ${
                          isCurrent
                            ? "text-purple-300 font-medium"
                            : isCompleted
                            ? "text-zinc-500"
                            : "text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        {l.title}
                      </Link>
                    ) : (
                      <span className="flex-1 text-xs text-zinc-600 leading-snug">
                        {l.title}
                      </span>
                    )}
                    <span className="text-xs text-zinc-700 shrink-0">
                      {l.duration}m
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

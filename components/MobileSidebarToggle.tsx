"use client";

import { useState } from "react";
import { Menu, X, ChevronLeft, Check, Play, Lock } from "lucide-react";
import Link from "next/link";

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
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed bottom-20 right-4 z-40 flex items-center gap-2 bg-[#0a2540] hover:bg-[#123258] text-white px-4 py-2.5 rounded-md shadow-md text-sm font-semibold tracking-wide transition-colors"
      >
        <Menu className="h-4 w-4" />
        Curriculum
      </button>

      {open && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-[#0a2540]/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`lg:hidden fixed top-0 left-0 bottom-0 w-[85vw] max-w-sm z-50 bg-[#fafaf9] border-r border-slate-200 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-white">
          <Link
            href={`/courses/${courseSlug}`}
            className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#98753f] hover:text-[#0a2540] flex items-center gap-1 transition-colors"
          >
            <ChevronLeft className="h-3 w-3" />
            Back to Course
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="p-1 text-slate-500 hover:text-[#0a2540]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 border-b border-slate-200 bg-white">
          <h2 className="font-serif text-base font-bold text-[#0a2540] leading-snug line-clamp-2 tracking-tight mb-3">
            {courseTitle}
          </h2>
          {isEnrolled && (
            <div>
              <div className="flex justify-between text-xs font-medium mb-1.5">
                <span className="text-slate-600">Course progress</span>
                <span className="text-[#14532d] font-semibold">{progressPct}%</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0a2540] rounded-full"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-1.5">
                {completedCount} of {totalLessons} lessons completed
              </p>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto h-[calc(100%-170px)]">
          {modules.map((module, idx) => (
            <div key={module.id}>
              <div className="px-5 py-3 bg-[#0a2540] border-b border-[#0a2540]">
                <p className="text-[9px] font-bold tracking-[0.22em] uppercase text-[#b08d57] mb-0.5">
                  Section {idx + 1}
                </p>
                <span className="text-xs font-semibold text-white tracking-tight">
                  {module.title.replace(/^module\s*\d+\s*[:\-–]\s*/i, "")}
                </span>
              </div>
              {module.lessons.map((l) => {
                const isCompleted = completedSet.has(l.id);
                const isCurrent = l.id === currentLessonId;
                const isAccessible = l.isFree || isEnrolled;

                return (
                  <div
                    key={l.id}
                    className={`flex items-center gap-3 px-5 py-3 border-b border-slate-100 transition-colors ${
                      isCurrent
                        ? "bg-[#f5ecd7] border-l-[3px] border-l-[#b08d57]"
                        : "hover:bg-white"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    <div className="shrink-0">
                      {isCompleted ? (
                        <div className="h-5 w-5 rounded-full bg-[#dcfce7] border border-[#14532d]/40 flex items-center justify-center">
                          <Check className="h-3 w-3 text-[#14532d]" strokeWidth={2.5} />
                        </div>
                      ) : isAccessible ? (
                        <div
                          className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                            isCurrent ? "border-[#b08d57] bg-white" : "border-slate-300"
                          }`}
                        >
                          <Play
                            className={`h-2.5 w-2.5 ${
                              isCurrent
                                ? "text-[#0a2540] fill-[#0a2540]"
                                : "text-slate-400 fill-slate-400"
                            }`}
                          />
                        </div>
                      ) : (
                        <div className="h-5 w-5 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center">
                          <Lock className="h-2.5 w-2.5 text-slate-400" />
                        </div>
                      )}
                    </div>
                    {isAccessible ? (
                      <Link
                        href={`/learn/${courseSlug}/${l.id}`}
                        className={`flex-1 text-xs leading-snug transition-colors ${
                          isCurrent
                            ? "text-[#0a2540] font-semibold"
                            : isCompleted
                            ? "text-slate-500"
                            : "text-slate-700 hover:text-[#0a2540]"
                        }`}
                      >
                        {l.title}
                      </Link>
                    ) : (
                      <span className="flex-1 text-xs text-slate-400 leading-snug">
                        {l.title}
                      </span>
                    )}
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

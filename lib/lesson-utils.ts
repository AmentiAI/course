const INTRO_PATTERNS = [
  /^introduction$/i,
  /^introduction and overview$/i,
  /^course introduction\b/i,
  /^welcome\b/i,
  /^overview$/i,
  /^getting started\b/i,
];

function looksLikeIntro(title: string): boolean {
  const t = title?.trim() ?? "";
  return INTRO_PATTERNS.some((p) => p.test(t));
}

/**
 * An "introduction section" is one of:
 *  - the lesson's module title is an intro-ish phrase (e.g. "Introduction")
 *  - the lesson title itself is an intro-ish phrase (but NOT "Introduction to X")
 *  - the very first lesson of the very first module (fallback for courses
 *    whose opening module is named something content-y like "Fundamentals")
 */
export function isIntroductionLesson(args: {
  lessonTitle: string;
  lessonOrder: number;
  moduleTitle: string;
  moduleOrder: number;
}): boolean {
  if (looksLikeIntro(args.moduleTitle)) return true;
  if (looksLikeIntro(args.lessonTitle)) return true;
  if (args.lessonOrder === 0 && args.moduleOrder === 0) return true;
  return false;
}

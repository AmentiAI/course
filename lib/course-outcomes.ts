// Derive course-specific learning outcomes from a course's title, category,
// and module structure. The goal is to make the "What Students Will Learn"
// section read as though it were written for this specific program, not a
// generic template.

type CourseForOutcomes = {
  title: string;
  category: string;
  shortDesc?: string | null;
  description?: string | null;
  level?: string | null;
  modules?: { title: string }[];
};

const GENERIC_MODULE_WORDS = new Set([
  "fundamentals",
  "strategy",
  "implementation",
  "optimization",
  "advanced",
  "mastery",
  "introduction",
  "overview",
  "getting started",
  "basics",
  "intermediate",
  "module",
]);

// Strip the "Module N:" prefix and anything generic so we can detect whether
// the course has meaningful, content-specific module titles.
function cleanModuleTitle(raw: string): string {
  return raw
    .replace(/^module\s*\d+\s*[:\-–]\s*/i, "")
    .trim();
}

function isGenericModule(cleaned: string): boolean {
  const lower = cleaned.toLowerCase();
  if (!lower) return true;
  if (GENERIC_MODULE_WORDS.has(lower)) return true;
  // Single plain word templates we seeded ("Fundamentals", "Strategy" …).
  return lower.split(/\s+/).length === 1 && GENERIC_MODULE_WORDS.has(lower);
}

// Pull a clean subject phrase out of the course title so it reads naturally
// inside a sentence ("Build repeatable systems for X"). Drops leading marketing
// verbs like "Mastering" and trailing qualifiers like "Masterclass".
export function getCourseSubject(title: string): string {
  let s = title.trim();
  s = s.replace(
    /^(mastering|master|applied|complete|ultimate|the|a|an|introduction to|intro to|learn|learning|guide to|guide)\s+/i,
    ""
  );
  s = s.replace(
    /\s+(masterclass|bootcamp|program|course|crash course|essentials|fundamentals|playbook|handbook|certificate|certification)$/i,
    ""
  );
  return s.trim() || title.trim();
}

function articleFor(word: string): string {
  return /^[aeiou]/i.test(word) ? "an" : "a";
}

export function generateCourseOutcomes(course: CourseForOutcomes): string[] {
  const subject = getCourseSubject(course.title);
  const subjectLower = subject.toLowerCase();
  const category = (course.category || "this field").trim();
  const categoryLower = category.toLowerCase();

  // Any module titles that actually describe content (not the generic template)?
  const contentModules = (course.modules || [])
    .map((m) => cleanModuleTitle(m.title))
    .filter((t) => t && !isGenericModule(t));

  const outcomes: string[] = [];

  outcomes.push(
    `Explain the core concepts, terminology, and working models behind ${subjectLower}`
  );
  outcomes.push(
    `Apply the frameworks and decision criteria practitioners use in ${categoryLower}`
  );

  // Incorporate 1-2 module-specific outcomes when the course has real,
  // non-template module names — this is what makes the list feel tailored.
  if (contentModules.length > 0) {
    outcomes.push(
      `Work through ${contentModules[0].toLowerCase()} from first principles to applied use`
    );
  }
  if (contentModules.length > 1) {
    outcomes.push(
      `Translate ${contentModules[1].toLowerCase()} into repeatable workflows you can run on your own`
    );
  }

  // Fill the remaining slots with subject-anchored outcomes so the list is
  // always about THIS course, not generic academy copy.
  const remaining: string[] = [
    `Evaluate real-world ${subjectLower} situations and choose the right tool for the job`,
    `Identify the high-frequency mistakes beginners make in ${subjectLower} and avoid them`,
    `Build ${articleFor(subject)} ${subjectLower} project you can showcase in a portfolio or on the job`,
    `Use the platforms, data sources, and tooling working ${categoryLower} professionals rely on`,
    `Develop a measurable, repeatable ${subjectLower} process for ongoing practice`,
    `Interpret results and iterate on your ${subjectLower} approach based on outcomes`,
  ];

  for (const o of remaining) {
    if (outcomes.length >= 8) break;
    outcomes.push(o);
  }

  // Cap at 8 and sentence-case the first letter of each.
  return outcomes
    .slice(0, 8)
    .map((o) => o.charAt(0).toUpperCase() + o.slice(1));
}

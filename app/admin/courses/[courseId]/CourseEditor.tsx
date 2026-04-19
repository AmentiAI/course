"use client";

import { useState, useTransition } from "react";
import {
  updateCourseAction,
  createModuleAction,
  renameModuleAction,
  deleteModuleAction,
  moveModuleAction,
  createLessonAction,
  renameLessonAction,
  deleteLessonAction,
  toggleLessonFreeAction,
  moveLessonAction,
} from "../actions";
import {
  ChevronUp,
  ChevronDown,
  Trash2,
  Plus,
  Save,
  Pencil,
  Check,
  X,
} from "lucide-react";

type Lesson = {
  id: string;
  title: string;
  order: number;
  isFree: boolean;
  duration: number;
};

type Module = {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
};

type Course = {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  price: number;
  originalPrice: number | null;
  category: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  isPublished: boolean;
  isFeatured: boolean;
  instructorId: string | null;
  modules: Module[];
};

type InstructorOption = { id: string; name: string | null; email: string | null };

export default function CourseEditor({
  course,
  instructors,
}: {
  course: Course;
  instructors: InstructorOption[];
}) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="space-y-8">
      <MetadataCard
        course={course}
        instructors={instructors}
        pending={pending}
        startTransition={startTransition}
      />
      <ModulesCard
        courseId={course.id}
        modules={course.modules}
        pending={pending}
        startTransition={startTransition}
      />
    </div>
  );
}

function MetadataCard({
  course,
  instructors,
  pending,
  startTransition,
}: {
  course: Course;
  instructors: InstructorOption[];
  pending: boolean;
  startTransition: (cb: () => void) => void;
}) {
  const [form, setForm] = useState({
    title: course.title,
    shortDesc: course.shortDesc,
    price: course.price,
    originalPrice: course.originalPrice ?? "",
    category: course.category,
    level: course.level,
    isPublished: course.isPublished,
    isFeatured: course.isFeatured,
    instructorId: course.instructorId ?? "",
  });

  const save = () => {
    startTransition(() => {
      updateCourseAction(course.id, {
        title: form.title,
        shortDesc: form.shortDesc,
        price: Number(form.price),
        originalPrice:
          form.originalPrice === "" ? null : Number(form.originalPrice),
        category: form.category,
        level: form.level,
        isPublished: form.isPublished,
        isFeatured: form.isFeatured,
        instructorId: form.instructorId || null,
      });
    });
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-7">
      <p className="academic-label mb-2">Program Metadata</p>
      <h2 className="font-serif text-xl font-bold text-[#0a2540] mb-5 tracking-tight">
        Course Record.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Title">
          <input
            className={inputCls}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </Field>
        <Field label="Category">
          <input
            className={inputCls}
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
        </Field>
        <Field label="Short Description" full>
          <input
            className={inputCls}
            value={form.shortDesc}
            onChange={(e) => setForm({ ...form, shortDesc: e.target.value })}
          />
        </Field>
        <Field label="Price (USD)">
          <input
            type="number"
            className={inputCls}
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          />
        </Field>
        <Field label="Original Price (USD)">
          <input
            type="number"
            className={inputCls}
            value={form.originalPrice}
            onChange={(e) =>
              setForm({ ...form, originalPrice: e.target.value })
            }
          />
        </Field>
        <Field label="Level">
          <select
            className={inputCls}
            value={form.level}
            onChange={(e) =>
              setForm({ ...form, level: e.target.value as Course["level"] })
            }
          >
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCED">Advanced</option>
          </select>
        </Field>
        <Field label="Instructor">
          <select
            className={inputCls}
            value={form.instructorId}
            onChange={(e) =>
              setForm({ ...form, instructorId: e.target.value })
            }
          >
            <option value="">— Unassigned —</option>
            {instructors.map((i) => (
              <option key={i.id} value={i.id}>
                {i.name || i.email || i.id}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <div className="flex flex-wrap items-center gap-4 mt-5">
        <Toggle
          label="Published"
          on={form.isPublished}
          onChange={(v) => setForm({ ...form, isPublished: v })}
        />
        <Toggle
          label="Featured"
          on={form.isFeatured}
          onChange={(v) => setForm({ ...form, isFeatured: v })}
        />
        <button
          onClick={save}
          disabled={pending}
          className="ml-auto inline-flex items-center gap-2 rounded-md bg-[#0a2540] text-white px-4 py-2 text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#123258] disabled:opacity-60 transition-colors"
        >
          <Save className="h-3.5 w-3.5" strokeWidth={2} />
          {pending ? "Saving…" : "Save Record"}
        </button>
      </div>
    </div>
  );
}

function ModulesCard({
  courseId,
  modules,
  pending,
  startTransition,
}: {
  courseId: string;
  modules: Module[];
  pending: boolean;
  startTransition: (cb: () => void) => void;
}) {
  const [newModuleTitle, setNewModuleTitle] = useState("");

  const addModule = () => {
    const t = newModuleTitle.trim();
    if (!t) return;
    startTransition(() => {
      createModuleAction(courseId, t);
    });
    setNewModuleTitle("");
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-7">
      <p className="academic-label mb-2">Curriculum Structure</p>
      <h2 className="font-serif text-xl font-bold text-[#0a2540] mb-5 tracking-tight">
        Modules & Lessons.
      </h2>

      <div className="space-y-3 mb-6">
        {modules.map((m, mIdx) => (
          <ModuleRow
            key={m.id}
            courseId={courseId}
            module={m}
            isFirst={mIdx === 0}
            isLast={mIdx === modules.length - 1}
            pending={pending}
            startTransition={startTransition}
          />
        ))}
        {modules.length === 0 && (
          <p className="text-center text-slate-500 text-sm italic py-6">
            No modules yet. Create the first module below.
          </p>
        )}
      </div>

      <div className="flex gap-2 pt-4 border-t border-slate-200">
        <input
          placeholder="New module title"
          className={inputCls}
          value={newModuleTitle}
          onChange={(e) => setNewModuleTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addModule()}
        />
        <button
          onClick={addModule}
          disabled={pending || !newModuleTitle.trim()}
          className="inline-flex items-center gap-2 rounded-md bg-[#0a2540] text-white px-4 py-2 text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#123258] disabled:opacity-60 whitespace-nowrap transition-colors"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2} />
          Add Module
        </button>
      </div>
    </div>
  );
}

function ModuleRow({
  courseId,
  module: mod,
  isFirst,
  isLast,
  pending,
  startTransition,
}: {
  courseId: string;
  module: Module;
  isFirst: boolean;
  isLast: boolean;
  pending: boolean;
  startTransition: (cb: () => void) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(mod.title);
  const [newLesson, setNewLesson] = useState("");

  const saveTitle = () => {
    const t = title.trim();
    if (!t || t === mod.title) {
      setEditing(false);
      setTitle(mod.title);
      return;
    }
    startTransition(() => {
      renameModuleAction(mod.id, courseId, t);
    });
    setEditing(false);
  };

  const addLesson = () => {
    const t = newLesson.trim();
    if (!t) return;
    startTransition(() => {
      createLessonAction(mod.id, courseId, t);
    });
    setNewLesson("");
  };

  const remove = () => {
    if (!confirm(`Delete module "${mod.title}" and all its lessons?`)) return;
    startTransition(() => {
      deleteModuleAction(mod.id, courseId);
    });
  };

  return (
    <div className="border border-slate-200 rounded-md p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex flex-col">
          <button
            disabled={pending || isFirst}
            onClick={() =>
              startTransition(() => moveModuleAction(mod.id, courseId, "up"))
            }
            className="text-slate-400 hover:text-[#0a2540] disabled:opacity-30"
            aria-label="Move up"
          >
            <ChevronUp className="h-4 w-4" strokeWidth={2} />
          </button>
          <button
            disabled={pending || isLast}
            onClick={() =>
              startTransition(() => moveModuleAction(mod.id, courseId, "down"))
            }
            className="text-slate-400 hover:text-[#0a2540] disabled:opacity-30"
            aria-label="Move down"
          >
            <ChevronDown className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
        <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#98753f]">
          Module {mod.order + 1}
        </span>
        {editing ? (
          <>
            <input
              className={`${inputCls} flex-1`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") saveTitle();
                if (e.key === "Escape") {
                  setEditing(false);
                  setTitle(mod.title);
                }
              }}
            />
            <button
              onClick={saveTitle}
              className="text-[#14532d] hover:text-[#0a2540]"
              aria-label="Save"
            >
              <Check className="h-4 w-4" strokeWidth={2} />
            </button>
            <button
              onClick={() => {
                setEditing(false);
                setTitle(mod.title);
              }}
              className="text-slate-400 hover:text-rose-600"
              aria-label="Cancel"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>
          </>
        ) : (
          <>
            <h3 className="font-serif font-bold text-[#0a2540] tracking-tight flex-1">
              {mod.title}
            </h3>
            <button
              onClick={() => setEditing(true)}
              className="text-slate-400 hover:text-[#0a2540]"
              aria-label="Rename"
            >
              <Pencil className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
            <button
              onClick={remove}
              disabled={pending}
              className="text-slate-400 hover:text-rose-600"
              aria-label="Delete"
            >
              <Trash2 className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
          </>
        )}
      </div>

      <div className="space-y-1 ml-6">
        {mod.lessons.map((l, lIdx) => (
          <LessonRow
            key={l.id}
            moduleId={mod.id}
            courseId={courseId}
            lesson={l}
            isFirst={lIdx === 0}
            isLast={lIdx === mod.lessons.length - 1}
            pending={pending}
            startTransition={startTransition}
          />
        ))}
      </div>

      <div className="flex gap-2 mt-3 ml-6">
        <input
          placeholder="New lesson title"
          className={inputCls}
          value={newLesson}
          onChange={(e) => setNewLesson(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addLesson()}
        />
        <button
          onClick={addLesson}
          disabled={pending || !newLesson.trim()}
          className="inline-flex items-center gap-1 rounded-md border border-[#b08d57] bg-white hover:bg-[#f5ecd7] px-3 py-1.5 text-[10px] font-bold tracking-[0.15em] uppercase text-[#0a2540] disabled:opacity-60 whitespace-nowrap transition-colors"
        >
          <Plus className="h-3 w-3" strokeWidth={2} />
          Lesson
        </button>
      </div>
    </div>
  );
}

function LessonRow({
  moduleId,
  courseId,
  lesson,
  isFirst,
  isLast,
  pending,
  startTransition,
}: {
  moduleId: string;
  courseId: string;
  lesson: Lesson;
  isFirst: boolean;
  isLast: boolean;
  pending: boolean;
  startTransition: (cb: () => void) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(lesson.title);

  const saveTitle = () => {
    const t = title.trim();
    if (!t || t === lesson.title) {
      setEditing(false);
      setTitle(lesson.title);
      return;
    }
    startTransition(() => {
      renameLessonAction(lesson.id, courseId, t);
    });
    setEditing(false);
  };

  const remove = () => {
    if (!confirm(`Delete lesson "${lesson.title}"?`)) return;
    startTransition(() => {
      deleteLessonAction(lesson.id, courseId);
    });
  };

  return (
    <div className="flex items-center gap-2 py-1.5 text-sm">
      <div className="flex flex-col">
        <button
          disabled={pending || isFirst}
          onClick={() =>
            startTransition(() =>
              moveLessonAction(lesson.id, moduleId, courseId, "up"),
            )
          }
          className="text-slate-400 hover:text-[#0a2540] disabled:opacity-30"
          aria-label="Move up"
        >
          <ChevronUp className="h-3.5 w-3.5" strokeWidth={2} />
        </button>
        <button
          disabled={pending || isLast}
          onClick={() =>
            startTransition(() =>
              moveLessonAction(lesson.id, moduleId, courseId, "down"),
            )
          }
          className="text-slate-400 hover:text-[#0a2540] disabled:opacity-30"
          aria-label="Move down"
        >
          <ChevronDown className="h-3.5 w-3.5" strokeWidth={2} />
        </button>
      </div>
      {editing ? (
        <>
          <input
            className={`${inputCls} flex-1`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") saveTitle();
              if (e.key === "Escape") {
                setEditing(false);
                setTitle(lesson.title);
              }
            }}
          />
          <button
            onClick={saveTitle}
            className="text-[#14532d] hover:text-[#0a2540]"
            aria-label="Save"
          >
            <Check className="h-4 w-4" strokeWidth={2} />
          </button>
          <button
            onClick={() => {
              setEditing(false);
              setTitle(lesson.title);
            }}
            className="text-slate-400 hover:text-rose-600"
            aria-label="Cancel"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </>
      ) : (
        <>
          <span className="text-[#0a2540] flex-1 truncate">{lesson.title}</span>
          <label className="inline-flex items-center gap-1 text-[10px] font-bold tracking-[0.15em] uppercase text-slate-500 cursor-pointer">
            <input
              type="checkbox"
              checked={lesson.isFree}
              onChange={(e) =>
                startTransition(() =>
                  toggleLessonFreeAction(
                    lesson.id,
                    courseId,
                    e.target.checked,
                  ),
                )
              }
              className="accent-[#14532d]"
            />
            Free
          </label>
          <button
            onClick={() => setEditing(true)}
            className="text-slate-400 hover:text-[#0a2540]"
            aria-label="Rename"
          >
            <Pencil className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
          <button
            onClick={remove}
            disabled={pending}
            className="text-slate-400 hover:text-rose-600"
            aria-label="Delete"
          >
            <Trash2 className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
        </>
      )}
    </div>
  );
}

function Field({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${full ? "md:col-span-2" : ""}`}>
      <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#98753f]">
        {label}
      </span>
      {children}
    </label>
  );
}

function Toggle({
  label,
  on,
  onChange,
}: {
  label: string;
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.15em] uppercase text-[#0a2540] cursor-pointer">
      <input
        type="checkbox"
        checked={on}
        onChange={(e) => onChange(e.target.checked)}
        className="accent-[#14532d] h-4 w-4"
      />
      {label}
    </label>
  );
}

const inputCls =
  "rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-[#0a2540] focus:outline-none focus:border-[#b08d57]";

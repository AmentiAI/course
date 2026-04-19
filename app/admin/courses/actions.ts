"use server";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/roles";
import { revalidatePath } from "next/cache";

export async function updateCourseAction(
  courseId: string,
  data: {
    title?: string;
    shortDesc?: string;
    description?: string;
    price?: number;
    originalPrice?: number | null;
    category?: string;
    level?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
    isPublished?: boolean;
    isFeatured?: boolean;
    instructorId?: string | null;
  },
) {
  await requireRole("MODERATOR");
  await prisma.course.update({ where: { id: courseId }, data });
  revalidatePath(`/admin/courses/${courseId}`);
  revalidatePath("/admin/courses");
}

export async function createModuleAction(courseId: string, title: string) {
  await requireRole("MODERATOR");
  const count = await prisma.module.count({ where: { courseId } });
  await prisma.module.create({
    data: { courseId, title, order: count },
  });
  revalidatePath(`/admin/courses/${courseId}`);
}

export async function renameModuleAction(
  moduleId: string,
  courseId: string,
  title: string,
) {
  await requireRole("MODERATOR");
  await prisma.module.update({ where: { id: moduleId }, data: { title } });
  revalidatePath(`/admin/courses/${courseId}`);
}

export async function deleteModuleAction(moduleId: string, courseId: string) {
  await requireRole("MODERATOR");
  await prisma.module.delete({ where: { id: moduleId } });
  revalidatePath(`/admin/courses/${courseId}`);
}

export async function moveModuleAction(
  moduleId: string,
  courseId: string,
  direction: "up" | "down",
) {
  await requireRole("MODERATOR");
  const modules = await prisma.module.findMany({
    where: { courseId },
    orderBy: { order: "asc" },
    select: { id: true, order: true },
  });
  const idx = modules.findIndex((m) => m.id === moduleId);
  const swap = direction === "up" ? idx - 1 : idx + 1;
  if (idx < 0 || swap < 0 || swap >= modules.length) return;
  const a = modules[idx];
  const b = modules[swap];
  await prisma.$transaction([
    prisma.module.update({
      where: { id: a.id },
      data: { order: b.order },
    }),
    prisma.module.update({
      where: { id: b.id },
      data: { order: a.order },
    }),
  ]);
  revalidatePath(`/admin/courses/${courseId}`);
}

export async function createLessonAction(
  moduleId: string,
  courseId: string,
  title: string,
) {
  await requireRole("MODERATOR");
  const count = await prisma.lesson.count({ where: { moduleId } });
  await prisma.lesson.create({
    data: { moduleId, title, order: count, content: "", duration: 0 },
  });
  revalidatePath(`/admin/courses/${courseId}`);
}

export async function renameLessonAction(
  lessonId: string,
  courseId: string,
  title: string,
) {
  await requireRole("MODERATOR");
  await prisma.lesson.update({ where: { id: lessonId }, data: { title } });
  revalidatePath(`/admin/courses/${courseId}`);
}

export async function deleteLessonAction(lessonId: string, courseId: string) {
  await requireRole("MODERATOR");
  await prisma.lesson.delete({ where: { id: lessonId } });
  revalidatePath(`/admin/courses/${courseId}`);
}

export async function toggleLessonFreeAction(
  lessonId: string,
  courseId: string,
  isFree: boolean,
) {
  await requireRole("MODERATOR");
  await prisma.lesson.update({ where: { id: lessonId }, data: { isFree } });
  revalidatePath(`/admin/courses/${courseId}`);
}

export async function moveLessonAction(
  lessonId: string,
  moduleId: string,
  courseId: string,
  direction: "up" | "down",
) {
  await requireRole("MODERATOR");
  const lessons = await prisma.lesson.findMany({
    where: { moduleId },
    orderBy: { order: "asc" },
    select: { id: true, order: true },
  });
  const idx = lessons.findIndex((l) => l.id === lessonId);
  const swap = direction === "up" ? idx - 1 : idx + 1;
  if (idx < 0 || swap < 0 || swap >= lessons.length) return;
  const a = lessons[idx];
  const b = lessons[swap];
  await prisma.$transaction([
    prisma.lesson.update({
      where: { id: a.id },
      data: { order: b.order },
    }),
    prisma.lesson.update({
      where: { id: b.id },
      data: { order: a.order },
    }),
  ]);
  revalidatePath(`/admin/courses/${courseId}`);
}

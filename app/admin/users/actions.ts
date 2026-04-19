"use server";

import { prisma } from "@/lib/prisma";
import { requireRole, hasRole } from "@/lib/roles";
import { revalidatePath } from "next/cache";
import type { Role } from "@prisma/client";

export async function setUserRoleAction(userId: string, role: Role) {
  const { role: actorRole } = await requireRole("MODERATOR");
  // Only ADMIN can promote another user to ADMIN or MODERATOR
  if ((role === "ADMIN" || role === "MODERATOR") && !hasRole(actorRole, "ADMIN")) {
    throw new Error("Insufficient privileges to assign elevated role");
  }
  await prisma.user.update({ where: { id: userId }, data: { role } });
  revalidatePath(`/admin/users/${userId}`);
  revalidatePath("/admin/users");
}

export async function manualEnrollAction(userId: string, courseId: string) {
  await requireRole("MODERATOR");
  const existing = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId } },
  });
  if (existing) return;
  await prisma.enrollment.create({
    data: {
      userId,
      courseId,
      paymentMethod: "manual",
      paymentStatus: "completed",
    },
  });
  await prisma.event.create({
    data: { type: "ENROLLMENT", userId, courseId, metadata: { manual: true } },
  });
  revalidatePath(`/admin/users/${userId}`);
}

export async function unenrollAction(userId: string, courseId: string) {
  await requireRole("MODERATOR");
  await prisma.enrollment.delete({
    where: { userId_courseId: { userId, courseId } },
  });
  revalidatePath(`/admin/users/${userId}`);
}

export async function resetProgressAction(userId: string, courseId: string) {
  await requireRole("MODERATOR");
  const lessons = await prisma.lesson.findMany({
    where: { module: { courseId } },
    select: { id: true },
  });
  const lessonIds = lessons.map((l) => l.id);
  await prisma.$transaction([
    prisma.lessonProgress.deleteMany({
      where: { userId, lessonId: { in: lessonIds } },
    }),
    prisma.enrollment.update({
      where: { userId_courseId: { userId, courseId } },
      data: { progress: 0, completedAt: null },
    }),
  ]);
  revalidatePath(`/admin/users/${userId}`);
}

export async function grantCertificateAction(
  userId: string,
  courseId: string,
) {
  await requireRole("MODERATOR");
  const existing = await prisma.certificate.findUnique({
    where: { userId_courseId: { userId, courseId } },
  });
  if (existing) return;
  await prisma.$transaction([
    prisma.certificate.create({ data: { userId, courseId } }),
    prisma.enrollment.update({
      where: { userId_courseId: { userId, courseId } },
      data: { progress: 100, completedAt: new Date() },
    }),
    prisma.event.create({
      data: {
        type: "CERTIFICATE_ISSUED",
        userId,
        courseId,
        metadata: { manual: true },
      },
    }),
  ]);
  revalidatePath(`/admin/users/${userId}`);
}

export async function revokeCertificateAction(
  userId: string,
  courseId: string,
) {
  await requireRole("ADMIN");
  await prisma.certificate.delete({
    where: { userId_courseId: { userId, courseId } },
  });
  revalidatePath(`/admin/users/${userId}`);
}

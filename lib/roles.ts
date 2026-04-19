import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { Role } from "@prisma/client";

export type AppRole = Role;

const HIERARCHY: Record<AppRole, number> = {
  STUDENT: 0,
  INSTRUCTOR: 10,
  MODERATOR: 20,
  ADMIN: 100,
};

export function roleRank(role: AppRole | null | undefined): number {
  if (!role) return -1;
  return HIERARCHY[role] ?? -1;
}

export function hasRole(role: AppRole | null | undefined, min: AppRole): boolean {
  return roleRank(role) >= roleRank(min);
}

export async function getSessionRole() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { userId: null, role: null as AppRole | null };
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });
  return { userId: session.user.id, role: (user?.role ?? null) as AppRole | null };
}

export async function requireRole(min: AppRole, redirectTo = "/dashboard") {
  const { userId, role } = await getSessionRole();
  if (!userId) redirect("/auth/signin");
  if (!hasRole(role, min)) redirect(redirectTo);
  return { userId: userId!, role: role! };
}

export async function canEditCourse(
  userId: string,
  role: AppRole,
  courseId: string,
): Promise<boolean> {
  if (hasRole(role, "ADMIN")) return true;
  if (role !== "INSTRUCTOR") return false;
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    select: { instructorId: true },
  });
  return course?.instructorId === userId;
}

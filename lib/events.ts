import { prisma } from "@/lib/prisma";
import type { EventType } from "@prisma/client";

export type TrackArgs = {
  type: EventType;
  userId?: string | null;
  sessionId?: string | null;
  courseId?: string | null;
  lessonId?: string | null;
  utm?: { source?: string; medium?: string; campaign?: string };
  metadata?: Record<string, unknown>;
};

export async function trackEvent(args: TrackArgs): Promise<void> {
  try {
    await prisma.event.create({
      data: {
        type: args.type,
        userId: args.userId ?? null,
        sessionId: args.sessionId ?? null,
        courseId: args.courseId ?? null,
        lessonId: args.lessonId ?? null,
        utmSource: args.utm?.source ?? null,
        utmMedium: args.utm?.medium ?? null,
        utmCampaign: args.utm?.campaign ?? null,
        metadata: (args.metadata as object) ?? undefined,
      },
    });
  } catch (err) {
    console.error("[trackEvent] failed", args.type, err);
  }
}

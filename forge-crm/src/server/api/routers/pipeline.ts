import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { db } from "@/lib/db";
import { deals, dealActivities, tasks, contacts } from "@/lib/db/schema";
import { and, eq, desc, sql } from "drizzle-orm";

const dealStages = ["inbound", "reviewing", "negotiating", "active", "complete", "lost"] as const;
const dealTypes = ["collab", "partnership", "sponsorship", "wl_swap", "joint_mint", "other"] as const;

export const pipelineRouter = createTRPCRouter({

  // ─── Get all deals (grouped by stage for kanban) ───
  getBoard: protectedProcedure.query(async ({ ctx }) => {
    const allDeals = await db.select({
      deal: deals,
      contact: {
        displayName: contacts.displayName,
        twitterUsername: contacts.twitterUsername,
        avatarUrl: contacts.avatarUrl,
      },
    })
      .from(deals)
      .leftJoin(contacts, eq(deals.contactId, contacts.id))
      .where(eq(deals.orgId, ctx.orgId))
      .orderBy(desc(deals.createdAt));

    // Group by stage
    const board: Record<string, typeof allDeals> = {};
    for (const stage of dealStages) board[stage] = [];
    for (const deal of allDeals) {
      board[deal.deal.stage].push(deal);
    }

    return board;
  }),

  // ─── Get deal by ID ───
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const [deal] = await db.select().from(deals)
        .where(and(eq(deals.id, input.id), eq(deals.orgId, ctx.orgId)))
        .limit(1);
      if (!deal) throw new Error("Deal not found");

      const activities = await db.select().from(dealActivities)
        .where(eq(dealActivities.dealId, input.id))
        .orderBy(desc(dealActivities.createdAt));

      const dealTasks = await db.select().from(tasks)
        .where(and(eq(tasks.dealId, input.id), eq(tasks.orgId, ctx.orgId)));

      return { deal, activities, tasks: dealTasks };
    }),

  // ─── Create deal ───
  create: protectedProcedure
    .input(z.object({
      title: z.string(),
      type: z.enum(dealTypes),
      contactId: z.string().optional(),
      value: z.number().optional(),
      currency: z.string().optional(),
      description: z.string().optional(),
      expectedCloseAt: z.date().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const [deal] = await db.insert(deals).values({
        orgId: ctx.orgId,
        ...input,
        stage: "inbound",
      }).returning();

      // Log activity
      await db.insert(dealActivities).values({
        dealId: deal.id,
        userId: ctx.userId,
        type: "note",
        content: "Deal created",
      });

      return deal;
    }),

  // ─── Move deal to new stage ───
  moveStage: protectedProcedure
    .input(z.object({
      id: z.string(),
      stage: z.enum(dealStages),
    }))
    .mutation(async ({ input, ctx }) => {
      const [prev] = await db.select({ stage: deals.stage }).from(deals)
        .where(eq(deals.id, input.id)).limit(1);

      const [updated] = await db.update(deals)
        .set({
          stage: input.stage,
          updatedAt: new Date(),
          wonAt: input.stage === "complete" ? new Date() : undefined,
          lostAt: input.stage === "lost" ? new Date() : undefined,
        })
        .where(and(eq(deals.id, input.id), eq(deals.orgId, ctx.orgId)))
        .returning();

      await db.insert(dealActivities).values({
        dealId: input.id,
        userId: ctx.userId,
        type: "stage_change",
        content: `Moved from "${prev?.stage}" to "${input.stage}"`,
      });

      return updated;
    }),

  // ─── Add note to deal ───
  addNote: protectedProcedure
    .input(z.object({ dealId: z.string(), content: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await db.insert(dealActivities).values({
        dealId: input.dealId,
        userId: ctx.userId,
        type: "note",
        content: input.content,
      });
      return { success: true };
    }),

  // ─── Update deal ───
  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      data: z.object({
        title: z.string().optional(),
        value: z.number().optional(),
        currency: z.string().optional(),
        description: z.string().optional(),
        assignedTo: z.string().optional(),
        expectedCloseAt: z.date().optional(),
        lostReason: z.string().optional(),
      }),
    }))
    .mutation(async ({ input, ctx }) => {
      const [updated] = await db.update(deals)
        .set({ ...input.data, updatedAt: new Date() })
        .where(and(eq(deals.id, input.id), eq(deals.orgId, ctx.orgId)))
        .returning();
      return updated;
    }),

  // ─── Delete deal ───
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await db.delete(deals)
        .where(and(eq(deals.id, input.id), eq(deals.orgId, ctx.orgId)));
      return { success: true };
    }),

  // ─── Pipeline stats ───
  getStats: protectedProcedure.query(async ({ ctx }) => {
    const rows = await db.select({
      stage: deals.stage,
      count: sql<number>`count(*)`,
      totalValue: sql<number>`sum(value)`,
    })
      .from(deals)
      .where(eq(deals.orgId, ctx.orgId))
      .groupBy(deals.stage);

    return rows;
  }),
});

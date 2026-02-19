import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { db } from "@/lib/db";
import {
  contacts, contactActivities, holders,
  campaigns, campaignRecipients, tasks,
} from "@/lib/db/schema";
import { and, eq, ilike, inArray, desc, sql, gte, or } from "drizzle-orm";
import { nanoid } from "nanoid";
import { subDays } from "date-fns";

// ─────────────────────────────────────────────
// INPUT SCHEMAS
// ─────────────────────────────────────────────
const contactFiltersSchema = z.object({
  search: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isHolder: z.boolean().optional(),
  isWhale: z.boolean().optional(),
  isInfluencer: z.boolean().optional(),
  isOg: z.boolean().optional(),
  minEngagement: z.number().optional(),
  source: z.string().optional(),
  limit: z.number().default(50),
  offset: z.number().default(0),
});

const createContactSchema = z.object({
  displayName: z.string().optional(),
  twitterUsername: z.string().optional(),
  discordUsername: z.string().optional(),
  telegramUsername: z.string().optional(),
  email: z.string().email().optional(),
  btcWallet: z.string().optional(),
  ethWallet: z.string().optional(),
  solWallet: z.string().optional(),
  tags: z.array(z.string()).default([]),
  notes: z.string().optional(),
  source: z.enum(["twitter", "discord", "telegram", "wallet", "manual", "csv_import", "whitelist"]).default("manual"),
});

// ─────────────────────────────────────────────
// ROUTER
// ─────────────────────────────────────────────
export const contactsRouter = createTRPCRouter({

  // ─── List contacts with filters ───
  list: protectedProcedure
    .input(contactFiltersSchema)
    .query(async ({ input, ctx }) => {
      const { orgId } = ctx;
      const conditions = [eq(contacts.orgId, orgId)];

      if (input.search) {
        conditions.push(
          or(
            ilike(contacts.displayName, `%${input.search}%`),
            ilike(contacts.twitterUsername, `%${input.search}%`),
            ilike(contacts.discordUsername, `%${input.search}%`),
            ilike(contacts.email, `%${input.search}%`),
            ilike(contacts.btcWallet, `%${input.search}%`),
            ilike(contacts.ethWallet, `%${input.search}%`),
          )!
        );
      }
      if (input.isHolder !== undefined) conditions.push(eq(contacts.isHolder, input.isHolder));
      if (input.isWhale !== undefined) conditions.push(eq(contacts.isWhale, input.isWhale));
      if (input.isInfluencer !== undefined) conditions.push(eq(contacts.isInfluencer, input.isInfluencer));
      if (input.isOg !== undefined) conditions.push(eq(contacts.isOg, input.isOg));
      if (input.source) conditions.push(eq(contacts.source, input.source as any));
      if (input.minEngagement !== undefined) {
        conditions.push(gte(contacts.engagementScore, input.minEngagement));
      }

      const [rows, [countRow]] = await Promise.all([
        db.select().from(contacts)
          .where(and(...conditions))
          .orderBy(desc(contacts.engagementScore))
          .limit(input.limit)
          .offset(input.offset),
        db.select({ count: sql<number>`count(*)` })
          .from(contacts)
          .where(and(...conditions)),
      ]);

      // Filter by tags client-side (jsonb array filtering in Postgres is complex)
      const filtered = input.tags?.length
        ? rows.filter((c) =>
            input.tags!.every((tag) => (c.tags as string[]).includes(tag))
          )
        : rows;

      return { contacts: filtered, total: countRow?.count ?? 0 };
    }),

  // ─── Get single contact with full history ───
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const [contact] = await db.select().from(contacts)
        .where(and(eq(contacts.id, input.id), eq(contacts.orgId, ctx.orgId)))
        .limit(1);

      if (!contact) throw new Error("Contact not found");

      const [activities, contactHoldings, contactTasks] = await Promise.all([
        db.select().from(contactActivities)
          .where(eq(contactActivities.contactId, input.id))
          .orderBy(desc(contactActivities.occurredAt))
          .limit(50),
        db.select().from(holders)
          .where(eq(holders.contactId, input.id)),
        db.select().from(tasks)
          .where(and(eq(tasks.contactId, input.id), eq(tasks.orgId, ctx.orgId)))
          .orderBy(desc(tasks.createdAt))
          .limit(10),
      ]);

      return { contact, activities, holdings: contactHoldings, tasks: contactTasks };
    }),

  // ─── Create contact ───
  create: protectedProcedure
    .input(createContactSchema)
    .mutation(async ({ input, ctx }) => {
      const [contact] = await db.insert(contacts).values({
        orgId: ctx.orgId,
        ...input,
        displayName: input.displayName ?? input.twitterUsername ?? input.discordUsername ?? "Unknown",
      }).returning();

      return contact;
    }),

  // ─── Update contact ───
  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      data: createContactSchema.partial(),
    }))
    .mutation(async ({ input, ctx }) => {
      const [updated] = await db.update(contacts)
        .set({ ...input.data, updatedAt: new Date() })
        .where(and(eq(contacts.id, input.id), eq(contacts.orgId, ctx.orgId)))
        .returning();

      return updated;
    }),

  // ─── Delete contact ───
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await db.delete(contacts)
        .where(and(eq(contacts.id, input.id), eq(contacts.orgId, ctx.orgId)));
      return { success: true };
    }),

  // ─── Add tag to contact ───
  addTag: protectedProcedure
    .input(z.object({ id: z.string(), tag: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const [contact] = await db.select({ tags: contacts.tags })
        .from(contacts)
        .where(and(eq(contacts.id, input.id), eq(contacts.orgId, ctx.orgId)))
        .limit(1);

      if (!contact) throw new Error("Not found");

      const tags = [...new Set([...(contact.tags as string[]), input.tag])];

      await db.update(contacts)
        .set({ tags, updatedAt: new Date() })
        .where(eq(contacts.id, input.id));

      // Log activity
      await db.insert(contactActivities).values({
        contactId: input.id,
        orgId: ctx.orgId,
        type: "tag_added",
        title: `Tag "${input.tag}" added`,
        occurredAt: new Date(),
      });

      return { success: true };
    }),

  // ─── Add note ───
  addNote: protectedProcedure
    .input(z.object({ id: z.string(), content: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await db.update(contacts)
        .set({ notes: input.content, updatedAt: new Date() })
        .where(and(eq(contacts.id, input.id), eq(contacts.orgId, ctx.orgId)));

      await db.insert(contactActivities).values({
        contactId: input.id,
        orgId: ctx.orgId,
        type: "note_added",
        title: "Note added",
        description: input.content,
        occurredAt: new Date(),
      });

      return { success: true };
    }),

  // ─── Bulk import from CSV/wallet list ───
  bulkImport: protectedProcedure
    .input(z.object({
      contacts: z.array(createContactSchema),
      source: z.enum(["csv_import", "wallet", "whitelist"]),
    }))
    .mutation(async ({ input, ctx }) => {
      const values = input.contacts.map((c) => ({
        orgId: ctx.orgId,
        ...c,
        source: input.source as any,
        displayName: c.displayName ?? c.twitterUsername ?? c.btcWallet ?? "Unknown",
      }));

      const inserted = await db.insert(contacts)
        .values(values)
        .onConflictDoNothing()
        .returning({ id: contacts.id });

      return { imported: inserted.length };
    }),

  // ─── Get segments (aggregated stats for dashboard) ───
  getSegmentStats: protectedProcedure.query(async ({ ctx }) => {
    const [total, holders_, whales, influencers, ogs, recentlyAdded] =
      await Promise.all([
        db.select({ count: sql<number>`count(*)` }).from(contacts).where(eq(contacts.orgId, ctx.orgId)),
        db.select({ count: sql<number>`count(*)` }).from(contacts).where(and(eq(contacts.orgId, ctx.orgId), eq(contacts.isHolder, true))),
        db.select({ count: sql<number>`count(*)` }).from(contacts).where(and(eq(contacts.orgId, ctx.orgId), eq(contacts.isWhale, true))),
        db.select({ count: sql<number>`count(*)` }).from(contacts).where(and(eq(contacts.orgId, ctx.orgId), eq(contacts.isInfluencer, true))),
        db.select({ count: sql<number>`count(*)` }).from(contacts).where(and(eq(contacts.orgId, ctx.orgId), eq(contacts.isOg, true))),
        db.select({ count: sql<number>`count(*)` }).from(contacts).where(and(eq(contacts.orgId, ctx.orgId), gte(contacts.createdAt, subDays(new Date(), 7)))),
      ]);

    return {
      total: total[0]?.count ?? 0,
      holders: holders_[0]?.count ?? 0,
      whales: whales[0]?.count ?? 0,
      influencers: influencers[0]?.count ?? 0,
      ogs: ogs[0]?.count ?? 0,
      recentlyAdded: recentlyAdded[0]?.count ?? 0,
    };
  }),

  // ─── Get all unique tags ───
  getTags: protectedProcedure.query(async ({ ctx }) => {
    const rows = await db.select({ tags: contacts.tags })
      .from(contacts)
      .where(eq(contacts.orgId, ctx.orgId));

    const allTags = new Set<string>();
    for (const row of rows) {
      for (const tag of (row.tags as string[]) ?? []) {
        allTags.add(tag);
      }
    }

    return Array.from(allTags).sort();
  }),
});

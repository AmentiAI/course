import { Inngest } from "inngest";
import { db } from "@/lib/db";
import {
  organizations, collections, connectedAccounts, holders,
  onchainEvents, revenueSnapshots, socialSnapshots, contacts,
  notifications, automations,
} from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import {
  getOrdinalsHolders, getOrdinalsSales, getOrdinalsFloorPrice,
} from "@/lib/blockchain/bitcoin";
import {
  fetchUserTweets, fetchUserMentions, fetchUserProfile,
  calculateEngagementScore, analyzeSentiment, getUserTwitterClient,
} from "@/lib/twitter/client";
import { nanoid } from "nanoid";

export const inngest = new Inngest({ id: "forge-crm" });

// ─────────────────────────────────────────────
// JOB 1: Sync Ordinals Collection (runs every 4 hours)
// ─────────────────────────────────────────────
export const syncOrdinalsCollection = inngest.createFunction(
  { id: "sync-ordinals-collection", concurrency: { limit: 3 } },
  { cron: "0 */4 * * *" },
  async ({ step }) => {
    const allCollections = await step.run("get-collections", async () => {
      return db.select().from(collections).where(eq(collections.chain, "bitcoin"));
    });

    for (const collection of allCollections) {
      if (!collection.ordinalsInscriptionRange) continue;

      // 1. Sync floor price
      await step.run(`floor-${collection.id}`, async () => {
        if (!collection.collectionSlug) return;
        const stats = await getOrdinalsFloorPrice(collection.collectionSlug);
        if (!stats) return;

        await db.update(collections).set({
          floorPrice: stats.floorPrice ?? undefined,
          holderCount: stats.holderCount ?? undefined,
          listedCount: stats.listedCount ?? undefined,
          lastSyncedAt: new Date(),
        }).where(eq(collections.id, collection.id));

        // Take revenue snapshot
        await db.insert(revenueSnapshots).values({
          collectionId: collection.id,
          date: new Date(),
          floorPrice: stats.floorPrice ?? undefined,
          volume24h: stats.volume24h ?? undefined,
          holderCount: stats.holderCount ?? undefined,
          listedCount: stats.listedCount ?? undefined,
        }).onConflictDoNothing();
      });

      // 2. Sync recent sales
      await step.run(`sales-${collection.id}`, async () => {
        if (!collection.collectionSlug) return;
        const sales = await getOrdinalsSales(collection.collectionSlug, 20);

        for (const sale of sales) {
          await db.insert(onchainEvents).values({
            collectionId: collection.id,
            orgId: collection.orgId,
            eventType: "sale",
            tokenId: sale.tokenId,
            fromWallet: sale.fromWallet,
            toWallet: sale.toWallet,
            price: sale.price,
            priceUsd: sale.priceUsd,
            marketplace: sale.marketplace,
            txHash: sale.txHash,
            occurredAt: sale.occurredAt,
            currency: "BTC",
          }).onConflictDoNothing();

          // Check if buyer is a whale (large purchase or multiple buys)
          // Fire automation trigger
          await inngest.send({
            name: "collection/sale.detected",
            data: {
              orgId: collection.orgId,
              collectionId: collection.id,
              sale,
            },
          });
        }
      });
    }

    return { collections: allCollections.length };
  }
);

// ─────────────────────────────────────────────
// JOB 2: Sync Twitter Analytics (runs hourly)
// ─────────────────────────────────────────────
export const syncTwitter = inngest.createFunction(
  { id: "sync-twitter", concurrency: { limit: 5 } },
  { cron: "0 * * * *" },
  async ({ step }) => {
    const twitterAccounts = await step.run("get-twitter-accounts", async () => {
      return db.select().from(connectedAccounts)
        .where(and(
          eq(connectedAccounts.platform, "twitter"),
          eq(connectedAccounts.isActive, true),
        ));
    });

    for (const account of twitterAccounts) {
      if (!account.accessToken) continue;

      await step.run(`twitter-${account.id}`, async () => {
        const client = getUserTwitterClient(account.accessToken!);

        // Update follower count
        const profile = await fetchUserProfile(client, account.platformUsername!);
        if (profile) {
          const followerCount = profile.public_metrics?.followers_count ?? 0;

          await db.update(connectedAccounts).set({
            metadata: {
              ...account.metadata as any,
              followerCount,
              followingCount: profile.public_metrics?.following_count ?? 0,
              tweetCount: profile.public_metrics?.tweet_count ?? 0,
            },
            lastSyncedAt: new Date(),
          }).where(eq(connectedAccounts.id, account.id));

          // Daily social snapshot
          const today = new Date();
          today.setUTCHours(0, 0, 0, 0);

          const prevCount = (account.metadata as any)?.followerCount ?? 0;

          await db.insert(socialSnapshots).values({
            connectedAccountId: account.id,
            date: today,
            followerCount,
            followerDelta: followerCount - prevCount,
          }).onConflictDoNothing();
        }

        // Fetch mentions
        const { tweets, users } = await fetchUserMentions(client, account.platformId);
        for (const tweet of tweets) {
          const author = users.find((u) => u.id === tweet.author_id);
          const { sentiment, score } = analyzeSentiment(tweet.text);

          // Check if it's a high-value mention (influencer with 10k+ followers)
          const authorFollowers = author?.public_metrics?.followers_count ?? 0;
          const isInfluencer = authorFollowers >= 10000;

          // Find or create contact
          if (author) {
            const existingContacts = await db.select({ id: contacts.id })
              .from(contacts)
              .where(and(
                eq(contacts.orgId, account.orgId),
                eq(contacts.twitterId, author.id),
              ))
              .limit(1);

            if (existingContacts.length === 0) {
              await db.insert(contacts).values({
                orgId: account.orgId,
                twitterId: author.id,
                twitterUsername: author.username,
                displayName: author.name,
                twitterFollowers: authorFollowers,
                source: "twitter",
                isInfluencer,
              }).onConflictDoNothing();
            }
          }

          // Alert on high-value mentions
          if (isInfluencer || authorFollowers >= 50000) {
            await db.insert(notifications).values({
              orgId: account.orgId,
              type: "mention",
              title: `🔥 High-value mention from @${author?.username}`,
              body: `${author?.name} (${authorFollowers.toLocaleString()} followers) mentioned you: "${tweet.text.slice(0, 100)}..."`,
              metadata: { tweetId: tweet.id, authorFollowers },
            });
          }
        }
      });
    }
  }
);

// ─────────────────────────────────────────────
// JOB 3: Process Automation Rules
// ─────────────────────────────────────────────
export const processAutomations = inngest.createFunction(
  { id: "process-automations" },
  [
    { event: "collection/sale.detected" },
    { event: "contact/new_holder.detected" },
    { event: "twitter/new_follower.detected" },
  ],
  async ({ event, step }) => {
    const { orgId } = event.data as { orgId: string };

    // Get all active automations for this org matching trigger
    const orgAutomations = await step.run("get-automations", async () => {
      return db.select().from(automations)
        .where(and(
          eq(automations.orgId, orgId),
          eq(automations.isActive, true),
        ));
    });

    for (const automation of orgAutomations) {
      // Match trigger to event
      const triggerMap: Record<string, string> = {
        "collection/sale.detected": "new_holder",
        "contact/new_holder.detected": "new_holder",
        "twitter/new_follower.detected": "new_follower",
      };

      if (triggerMap[event.name] !== automation.trigger) continue;

      await step.run(`run-automation-${automation.id}`, async () => {
        // Execute the action
        switch (automation.action) {
          case "notify_team":
            await db.insert(notifications).values({
              orgId,
              type: "automation",
              title: `⚡ Automation: ${automation.name}`,
              body: `Triggered by: ${event.name}`,
              metadata: event.data,
            });
            break;

          case "create_task":
            // Create a follow-up task
            // (would need contact/deal context from event data)
            break;

          // Additional actions would be implemented here
        }

        // Update run count
        await db.update(automations)
          .set({
            runCount: (automation.runCount ?? 0) + 1,
            lastRunAt: new Date(),
          })
          .where(eq(automations.id, automation.id));
      });
    }
  }
);

// ─────────────────────────────────────────────
// JOB 4: Whale Alert (runs every 15 minutes)
// ─────────────────────────────────────────────
export const checkWhaleActivity = inngest.createFunction(
  { id: "whale-alerts" },
  { cron: "*/15 * * * *" },
  async ({ step }) => {
    // Get recent large sales (over 0.5 BTC or equivalent)
    const recentSales = await step.run("get-large-sales", async () => {
      return db.select().from(onchainEvents)
        .where(and(
          eq(onchainEvents.eventType, "sale"),
          // Filter for large sales - would use gte on price
        ))
        .limit(20);
    });

    for (const sale of recentSales) {
      const isWhaleSale = (sale.price ?? 0) >= 0.5; // 0.5 BTC
      if (!isWhaleSale) continue;

      await step.run(`whale-alert-${sale.id}`, async () => {
        await db.insert(notifications).values({
          orgId: sale.orgId,
          type: "whale_buy",
          title: `🐳 Whale activity detected!`,
          body: `${sale.price?.toFixed(4)} BTC sale to ${sale.toWallet?.slice(0, 8)}...`,
          metadata: { saleId: sale.id, price: sale.price },
        });
      });
    }
  }
);

export const functions = [
  syncOrdinalsCollection,
  syncTwitter,
  processAutomations,
  checkWhaleActivity,
];

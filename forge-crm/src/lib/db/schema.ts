import {
  pgTable, pgEnum, text, varchar, integer, bigint,
  boolean, timestamp, jsonb, index, uniqueIndex, real,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
const id = () => varchar("id", { length: 128 }).primaryKey().$defaultFn(createId);
const now = () => timestamp("created_at").defaultNow().notNull();
const updatedAt = () => timestamp("updated_at").defaultNow().notNull();

// ─────────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────────
export const planEnum = pgEnum("plan", ["starter", "pro", "studio", "enterprise"]);
export const subscriptionStatusEnum = pgEnum("subscription_status", ["active", "canceled", "past_due", "trialing", "inactive"]);
export const contactSourceEnum = pgEnum("contact_source", ["twitter", "discord", "telegram", "wallet", "manual", "csv_import", "whitelist"]);
export const dealStageEnum = pgEnum("deal_stage", ["inbound", "reviewing", "negotiating", "active", "complete", "lost"]);
export const dealTypeEnum = pgEnum("deal_type", ["collab", "partnership", "sponsorship", "wl_swap", "joint_mint", "other"]);
export const campaignStatusEnum = pgEnum("campaign_status", ["draft", "scheduled", "running", "paused", "complete", "failed"]);
export const campaignTypeEnum = pgEnum("campaign_type", ["twitter_dm", "discord_announcement", "telegram_broadcast", "email", "airdrop", "whitelist"]);
export const chainEnum = pgEnum("chain", ["bitcoin", "ethereum", "solana", "polygon", "base"]);
export const taskPriorityEnum = pgEnum("task_priority", ["low", "medium", "high", "urgent"]);
export const taskStatusEnum = pgEnum("task_status", ["todo", "in_progress", "done", "canceled"]);
export const automationTriggerEnum = pgEnum("automation_trigger", ["new_follower", "new_holder", "whale_buy", "whale_sell", "mention", "new_collab_inbound", "low_floor", "new_sale", "schedule"]);
export const automationActionEnum = pgEnum("automation_action", ["send_dm", "send_discord", "send_email", "add_to_whitelist", "add_tag", "create_task", "notify_team"]);
export const holderStatusEnum = pgEnum("holder_status", ["active", "sold", "transferred"]);

// ─────────────────────────────────────────────
// ORGANIZATIONS (workspace per team/project)
// ─────────────────────────────────────────────
export const organizations = pgTable("organizations", {
  id: id(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  logoUrl: text("logo_url"),
  plan: planEnum("plan").default("starter").notNull(),
  stripeCustomerId: varchar("stripe_customer_id", { length: 255 }).unique(),
  // Limits
  contactLimit: integer("contact_limit").default(500).notNull(),
  collectionLimit: integer("collection_limit").default(1).notNull(),
  teamMemberLimit: integer("team_member_limit").default(1).notNull(),
  createdAt: now(),
  updatedAt: updatedAt(),
});

// ─────────────────────────────────────────────
// USERS & TEAM
// ─────────────────────────────────────────────
export const users = pgTable("users", {
  id: varchar("id", { length: 191 }).primaryKey(), // Clerk ID
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  avatarUrl: text("avatar_url"),
  createdAt: now(),
  updatedAt: updatedAt(),
});

export const teamMembers = pgTable("team_members", {
  id: id(),
  orgId: varchar("org_id", { length: 128 }).notNull().references(() => organizations.id, { onDelete: "cascade" }),
  userId: varchar("user_id", { length: 191 }).notNull().references(() => users.id, { onDelete: "cascade" }),
  role: varchar("role", { length: 50 }).default("member").notNull(), // owner | admin | member
  createdAt: now(),
}, (t) => ({
  orgUserIdx: uniqueIndex("team_members_org_user_idx").on(t.orgId, t.userId),
}));

// ─────────────────────────────────────────────
// SUBSCRIPTIONS
// ─────────────────────────────────────────────
export const subscriptions = pgTable("subscriptions", {
  id: varchar("id", { length: 191 }).primaryKey(), // Stripe subscription ID
  orgId: varchar("org_id", { length: 128 }).notNull().references(() => organizations.id, { onDelete: "cascade" }),
  status: subscriptionStatusEnum("status").notNull(),
  plan: planEnum("plan").notNull(),
  stripePriceId: varchar("stripe_price_id", { length: 255 }).notNull(),
  currentPeriodStart: timestamp("current_period_start").notNull(),
  currentPeriodEnd: timestamp("current_period_end").notNull(),
  cancelAtPeriodEnd: boolean("cancel_at_period_end").default(false).notNull(),
  createdAt: now(),
  updatedAt: updatedAt(),
});

// ─────────────────────────────────────────────
// CONNECTED ACCOUNTS (Social + Blockchain)
// ─────────────────────────────────────────────
export const connectedAccounts = pgTable("connected_accounts", {
  id: id(),
  orgId: varchar("org_id", { length: 128 }).notNull().references(() => organizations.id, { onDelete: "cascade" }),
  platform: varchar("platform", { length: 50 }).notNull(), // twitter | discord | telegram | wallet_btc | wallet_eth | wallet_sol
  platformId: varchar("platform_id", { length: 255 }).notNull(), // Twitter user ID / Discord server ID / wallet address
  platformUsername: varchar("platform_username", { length: 255 }),
  platformName: varchar("platform_name", { length: 255 }),
  avatarUrl: text("avatar_url"),
  accessToken: text("access_token"),   // encrypted
  refreshToken: text("refresh_token"), // encrypted
  tokenExpiresAt: timestamp("token_expires_at"),
  metadata: jsonb("metadata").$type<Record<string, any>>().default({}),
  isActive: boolean("is_active").default(true).notNull(),
  lastSyncedAt: timestamp("last_synced_at"),
  createdAt: now(),
}, (t) => ({
  orgPlatformIdx: uniqueIndex("connected_accounts_org_platform_idx").on(t.orgId, t.platform, t.platformId),
}));

// ─────────────────────────────────────────────
// NFT COLLECTIONS
// ─────────────────────────────────────────────
export const collections = pgTable("collections", {
  id: id(),
  orgId: varchar("org_id", { length: 128 }).notNull().references(() => organizations.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  chain: chainEnum("chain").notNull(),
  contractAddress: varchar("contract_address", { length: 255 }), // ETH/SOL
  ordinalsInscriptionRange: jsonb("ordinals_range").$type<{ start: number; end: number }>(), // BTC
  collectionSlug: varchar("collection_slug", { length: 255 }), // Magic Eden slug etc
  imageUrl: text("image_url"),
  totalSupply: integer("total_supply"),
  mintPrice: real("mint_price"),
  mintDate: timestamp("mint_date"),
  // Cached stats (updated by cron)
  floorPrice: real("floor_price"),
  totalVolume: real("total_volume"),
  holderCount: integer("holder_count").default(0),
  listedCount: integer("listed_count").default(0),
  lastSyncedAt: timestamp("last_synced_at"),
  createdAt: now(),
  updatedAt: updatedAt(),
});

// ─────────────────────────────────────────────
// CONTACTS (The CRM core)
// ─────────────────────────────────────────────
export const contacts = pgTable("contacts", {
  id: id(),
  orgId: varchar("org_id", { length: 128 }).notNull().references(() => organizations.id, { onDelete: "cascade" }),
  // Identity
  displayName: varchar("display_name", { length: 255 }),
  avatarUrl: text("avatar_url"),
  // Social handles
  twitterId: varchar("twitter_id", { length: 191 }),
  twitterUsername: varchar("twitter_username", { length: 50 }),
  twitterFollowers: integer("twitter_followers").default(0),
  discordId: varchar("discord_id", { length: 191 }),
  discordUsername: varchar("discord_username", { length: 100 }),
  telegramId: varchar("telegram_id", { length: 191 }),
  telegramUsername: varchar("telegram_username", { length: 100 }),
  email: varchar("email", { length: 255 }),
  // Wallet addresses
  btcWallet: varchar("btc_wallet", { length: 255 }),
  ethWallet: varchar("eth_wallet", { length: 255 }),
  solWallet: varchar("sol_wallet", { length: 255 }),
  // Classification
  source: contactSourceEnum("source").default("manual").notNull(),
  tags: jsonb("tags").$type<string[]>().default([]),
  // CRM fields
  engagementScore: integer("engagement_score").default(0).notNull(), // 0-1000
  isHolder: boolean("is_holder").default(false).notNull(),
  isInfluencer: boolean("is_influencer").default(false).notNull(),
  isWhale: boolean("is_whale").default(false).notNull(),
  isOg: boolean("is_og").default(false).notNull(),
  notes: text("notes"),
  lastContactedAt: timestamp("last_contacted_at"),
  lastActivityAt: timestamp("last_activity_at"),
  createdAt: now(),
  updatedAt: updatedAt(),
}, (t) => ({
  orgIdIdx: index("contacts_org_id_idx").on(t.orgId),
  twitterIdx: index("contacts_twitter_idx").on(t.twitterId),
  ethWalletIdx: index("contacts_eth_wallet_idx").on(t.ethWallet),
  btcWalletIdx: index("contacts_btc_wallet_idx").on(t.btcWallet),
  engagementIdx: index("contacts_engagement_idx").on(t.engagementScore),
}));

// ─────────────────────────────────────────────
// CONTACT ACTIVITIES (timeline)
// ─────────────────────────────────────────────
export const contactActivities = pgTable("contact_activities", {
  id: id(),
  contactId: varchar("contact_id", { length: 128 }).notNull().references(() => contacts.id, { onDelete: "cascade" }),
  orgId: varchar("org_id", { length: 128 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(), // tweet_mention | discord_message | dm_sent | nft_purchase | nft_sale | wl_added | note_added | tag_added
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  metadata: jsonb("metadata").$type<Record<string, any>>().default({}),
  occurredAt: timestamp("occurred_at").notNull(),
  createdAt: now(),
}, (t) => ({
  contactIdIdx: index("activities_contact_id_idx").on(t.contactId),
  occurredAtIdx: index("activities_occurred_at_idx").on(t.occurredAt),
}));

// ─────────────────────────────────────────────
// NFT HOLDERS (onchain data)
// ─────────────────────────────────────────────
export const holders = pgTable("holders", {
  id: id(),
  collectionId: varchar("collection_id", { length: 128 }).notNull().references(() => collections.id, { onDelete: "cascade" }),
  orgId: varchar("org_id", { length: 128 }).notNull(),
  contactId: varchar("contact_id", { length: 128 }).references(() => contacts.id),
  walletAddress: varchar("wallet_address", { length: 255 }).notNull(),
  tokenIds: jsonb("token_ids").$type<string[]>().default([]),
  quantity: integer("quantity").default(1).notNull(),
  status: holderStatusEnum("status").default("active").notNull(),
  acquiredAt: timestamp("acquired_at"),
  purchasePrice: real("purchase_price"),
  currentValue: real("current_value"),
  unrealizedPnl: real("unrealized_pnl"),
  // Enriched wallet data
  walletAge: integer("wallet_age_days"),
  totalNftCount: integer("total_nft_count"),
  ethBalance: real("eth_balance"),
  solBalance: real("sol_balance"),
  btcBalance: real("btc_balance"),
  isWhale: boolean("is_whale").default(false),
  updatedAt: updatedAt(),
  createdAt: now(),
}, (t) => ({
  collectionWalletIdx: uniqueIndex("holders_collection_wallet_idx").on(t.collectionId, t.walletAddress),
  orgIdIdx: index("holders_org_id_idx").on(t.orgId),
}));

// ─────────────────────────────────────────────
// ONCHAIN EVENTS (sales, mints, transfers)
// ─────────────────────────────────────────────
export const onchainEvents = pgTable("onchain_events", {
  id: id(),
  collectionId: varchar("collection_id", { length: 128 }).notNull().references(() => collections.id, { onDelete: "cascade" }),
  orgId: varchar("org_id", { length: 128 }).notNull(),
  eventType: varchar("event_type", { length: 50 }).notNull(), // mint | sale | transfer | list | delist
  tokenId: varchar("token_id", { length: 255 }),
  fromWallet: varchar("from_wallet", { length: 255 }),
  toWallet: varchar("to_wallet", { length: 255 }),
  price: real("price"),
  currency: varchar("currency", { length: 20 }),
  priceUsd: real("price_usd"),
  txHash: varchar("tx_hash", { length: 255 }),
  marketplace: varchar("marketplace", { length: 50 }),
  occurredAt: timestamp("occurred_at").notNull(),
  createdAt: now(),
}, (t) => ({
  collectionIdx: index("events_collection_idx").on(t.collectionId),
  occurredAtIdx: index("events_occurred_at_idx").on(t.occurredAt),
}));

// ─────────────────────────────────────────────
// REVENUE SNAPSHOTS (daily)
// ─────────────────────────────────────────────
export const revenueSnapshots = pgTable("revenue_snapshots", {
  id: id(),
  collectionId: varchar("collection_id", { length: 128 }).notNull().references(() => collections.id, { onDelete: "cascade" }),
  date: timestamp("date").notNull(),
  floorPrice: real("floor_price"),
  volume24h: real("volume_24h"),
  sales24h: integer("sales_24h").default(0),
  royalties24h: real("royalties_24h"),
  listedCount: integer("listed_count"),
  holderCount: integer("holder_count"),
  createdAt: now(),
}, (t) => ({
  collectionDateIdx: uniqueIndex("revenue_collection_date_idx").on(t.collectionId, t.date),
}));

// ─────────────────────────────────────────────
// SOCIAL ANALYTICS SNAPSHOTS (daily per platform)
// ─────────────────────────────────────────────
export const socialSnapshots = pgTable("social_snapshots", {
  id: id(),
  connectedAccountId: varchar("connected_account_id", { length: 128 }).notNull().references(() => connectedAccounts.id, { onDelete: "cascade" }),
  date: timestamp("date").notNull(),
  // Followers/Members
  followerCount: integer("follower_count"),
  followerDelta: integer("follower_delta"),
  // Engagement
  impressions: integer("impressions"),
  engagements: integer("engagements"),
  engagementRate: integer("engagement_rate"), // basis points
  // Discord specific
  memberCount: integer("member_count"),
  activeMembers: integer("active_members"),
  messageCount: integer("message_count"),
  createdAt: now(),
}, (t) => ({
  accountDateIdx: uniqueIndex("social_snapshots_account_date_idx").on(t.connectedAccountId, t.date),
}));

// ─────────────────────────────────────────────
// PIPELINE (Collab & Deal Tracking)
// ─────────────────────────────────────────────
export const deals = pgTable("deals", {
  id: id(),
  orgId: varchar("org_id", { length: 128 }).notNull().references(() => organizations.id, { onDelete: "cascade" }),
  contactId: varchar("contact_id", { length: 128 }).references(() => contacts.id),
  title: varchar("title", { length: 255 }).notNull(),
  type: dealTypeEnum("type").default("collab").notNull(),
  stage: dealStageEnum("stage").default("inbound").notNull(),
  value: real("value"), // estimated dollar/ETH value
  currency: varchar("currency", { length: 20 }),
  description: text("description"),
  assignedTo: varchar("assigned_to", { length: 191 }).references(() => users.id),
  closedAt: timestamp("closed_at"),
  expectedCloseAt: timestamp("expected_close_at"),
  wonAt: timestamp("won_at"),
  lostAt: timestamp("lost_at"),
  lostReason: text("lost_reason"),
  metadata: jsonb("metadata").$type<Record<string, any>>().default({}),
  createdAt: now(),
  updatedAt: updatedAt(),
}, (t) => ({
  orgIdIdx: index("deals_org_id_idx").on(t.orgId),
  stageIdx: index("deals_stage_idx").on(t.stage),
}));

export const dealActivities = pgTable("deal_activities", {
  id: id(),
  dealId: varchar("deal_id", { length: 128 }).notNull().references(() => deals.id, { onDelete: "cascade" }),
  userId: varchar("user_id", { length: 191 }).references(() => users.id),
  type: varchar("type", { length: 50 }).notNull(), // note | stage_change | email | dm | call
  content: text("content"),
  metadata: jsonb("metadata").$type<Record<string, any>>().default({}),
  createdAt: now(),
});

// ─────────────────────────────────────────────
// CAMPAIGNS
// ─────────────────────────────────────────────
export const campaigns = pgTable("campaigns", {
  id: id(),
  orgId: varchar("org_id", { length: 128 }).notNull().references(() => organizations.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  type: campaignTypeEnum("type").notNull(),
  status: campaignStatusEnum("status").default("draft").notNull(),
  // Content
  subject: varchar("subject", { length: 500 }),
  body: text("body").notNull(),
  // Targeting
  targetSegment: jsonb("target_segment").$type<{
    tags?: string[];
    isHolder?: boolean;
    isWhale?: boolean;
    minEngagement?: number;
    platforms?: string[];
  }>().default({}),
  // Scheduling
  scheduledAt: timestamp("scheduled_at"),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  // Stats
  recipientCount: integer("recipient_count").default(0),
  sentCount: integer("sent_count").default(0),
  failedCount: integer("failed_count").default(0),
  openCount: integer("open_count").default(0),
  clickCount: integer("click_count").default(0),
  createdBy: varchar("created_by", { length: 191 }).references(() => users.id),
  createdAt: now(),
  updatedAt: updatedAt(),
}, (t) => ({
  orgIdIdx: index("campaigns_org_id_idx").on(t.orgId),
  statusIdx: index("campaigns_status_idx").on(t.status),
}));

export const campaignRecipients = pgTable("campaign_recipients", {
  id: id(),
  campaignId: varchar("campaign_id", { length: 128 }).notNull().references(() => campaigns.id, { onDelete: "cascade" }),
  contactId: varchar("contact_id", { length: 128 }).notNull().references(() => contacts.id, { onDelete: "cascade" }),
  status: varchar("status", { length: 50 }).default("pending").notNull(), // pending | sent | failed | opened | clicked
  sentAt: timestamp("sent_at"),
  error: text("error"),
  createdAt: now(),
}, (t) => ({
  campaignContactIdx: uniqueIndex("campaign_recipients_idx").on(t.campaignId, t.contactId),
}));

// ─────────────────────────────────────────────
// WHITELIST
// ─────────────────────────────────────────────
export const whitelists = pgTable("whitelists", {
  id: id(),
  orgId: varchar("org_id", { length: 128 }).notNull().references(() => organizations.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  maxSpots: integer("max_spots"),
  isPublic: boolean("is_public").default(false),
  closesAt: timestamp("closes_at"),
  createdAt: now(),
  updatedAt: updatedAt(),
});

export const whitelistEntries = pgTable("whitelist_entries", {
  id: id(),
  whitelistId: varchar("whitelist_id", { length: 128 }).notNull().references(() => whitelists.id, { onDelete: "cascade" }),
  contactId: varchar("contact_id", { length: 128 }).references(() => contacts.id),
  walletAddress: varchar("wallet_address", { length: 255 }).notNull(),
  twitterUsername: varchar("twitter_username", { length: 50 }),
  discordUsername: varchar("discord_username", { length: 100 }),
  addedBy: varchar("added_by", { length: 191 }).references(() => users.id),
  addedAt: now(),
}, (t) => ({
  wlWalletIdx: uniqueIndex("wl_entries_wl_wallet_idx").on(t.whitelistId, t.walletAddress),
}));

// ─────────────────────────────────────────────
// AUTOMATIONS
// ─────────────────────────────────────────────
export const automations = pgTable("automations", {
  id: id(),
  orgId: varchar("org_id", { length: 128 }).notNull().references(() => organizations.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  trigger: automationTriggerEnum("trigger").notNull(),
  triggerConfig: jsonb("trigger_config").$type<Record<string, any>>().default({}),
  action: automationActionEnum("action").notNull(),
  actionConfig: jsonb("action_config").$type<Record<string, any>>().default({}),
  runCount: integer("run_count").default(0),
  lastRunAt: timestamp("last_run_at"),
  createdAt: now(),
  updatedAt: updatedAt(),
});

// ─────────────────────────────────────────────
// TASKS
// ─────────────────────────────────────────────
export const tasks = pgTable("tasks", {
  id: id(),
  orgId: varchar("org_id", { length: 128 }).notNull().references(() => organizations.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 500 }).notNull(),
  description: text("description"),
  priority: taskPriorityEnum("priority").default("medium").notNull(),
  status: taskStatusEnum("status").default("todo").notNull(),
  assignedTo: varchar("assigned_to", { length: 191 }).references(() => users.id),
  contactId: varchar("contact_id", { length: 128 }).references(() => contacts.id),
  dealId: varchar("deal_id", { length: 128 }).references(() => deals.id),
  dueAt: timestamp("due_at"),
  completedAt: timestamp("completed_at"),
  createdBy: varchar("created_by", { length: 191 }).references(() => users.id),
  createdAt: now(),
  updatedAt: updatedAt(),
}, (t) => ({
  orgIdIdx: index("tasks_org_id_idx").on(t.orgId),
  assignedToIdx: index("tasks_assigned_to_idx").on(t.assignedTo),
  statusIdx: index("tasks_status_idx").on(t.status),
}));

// ─────────────────────────────────────────────
// NOTIFICATIONS
// ─────────────────────────────────────────────
export const notifications = pgTable("notifications", {
  id: id(),
  orgId: varchar("org_id", { length: 128 }).notNull(),
  userId: varchar("user_id", { length: 191 }).references(() => users.id),
  type: varchar("type", { length: 50 }).notNull(), // whale_buy | new_holder | mention | deal_update | task_due
  title: varchar("title", { length: 255 }).notNull(),
  body: text("body"),
  link: text("link"),
  isRead: boolean("is_read").default(false).notNull(),
  metadata: jsonb("metadata").$type<Record<string, any>>().default({}),
  createdAt: now(),
}, (t) => ({
  userReadIdx: index("notifications_user_read_idx").on(t.userId, t.isRead),
}));

// ─────────────────────────────────────────────
// MENTIONS (Twitter mentions of your project)
// ─────────────────────────────────────────────
export const mentions = pgTable("mentions", {
  id: varchar("id", { length: 191 }).primaryKey(), // Twitter tweet ID
  connectedAccountId: varchar("connected_account_id", { length: 128 }).notNull().references(() => connectedAccounts.id, { onDelete: "cascade" }),
  orgId: varchar("org_id", { length: 128 }).notNull(),
  contactId: varchar("contact_id", { length: 128 }).references(() => contacts.id),
  authorTwitterId: varchar("author_twitter_id", { length: 191 }).notNull(),
  authorUsername: varchar("author_username", { length: 50 }).notNull(),
  authorFollowers: integer("author_followers").default(0),
  text: text("text").notNull(),
  likeCount: integer("like_count").default(0),
  retweetCount: integer("retweet_count").default(0),
  replyCount: integer("reply_count").default(0),
  impressionCount: integer("impression_count"),
  sentiment: varchar("sentiment", { length: 20 }),
  sentimentScore: integer("sentiment_score"),
  isInfluencer: boolean("is_influencer").default(false),
  publishedAt: timestamp("published_at").notNull(),
  createdAt: now(),
}, (t) => ({
  orgIdx: index("mentions_org_idx").on(t.orgId),
  publishedIdx: index("mentions_published_idx").on(t.publishedAt),
}));

// ─────────────────────────────────────────────
// RELATIONS
// ─────────────────────────────────────────────
export const orgRelations = relations(organizations, ({ many, one }) => ({
  teamMembers: many(teamMembers),
  connectedAccounts: many(connectedAccounts),
  collections: many(collections),
  contacts: many(contacts),
  deals: many(deals),
  campaigns: many(campaigns),
  whitelists: many(whitelists),
  automations: many(automations),
  tasks: many(tasks),
  subscription: one(subscriptions, { fields: [organizations.id], references: [subscriptions.orgId] }),
}));

export const contactRelations = relations(contacts, ({ one, many }) => ({
  org: one(organizations, { fields: [contacts.orgId], references: [organizations.id] }),
  activities: many(contactActivities),
  holders: many(holders),
  deals: many(deals),
  tasks: many(tasks),
  campaignRecipients: many(campaignRecipients),
}));

export const collectionRelations = relations(collections, ({ one, many }) => ({
  org: one(organizations, { fields: [collections.orgId], references: [organizations.id] }),
  holders: many(holders),
  events: many(onchainEvents),
  revenueSnapshots: many(revenueSnapshots),
}));

export const dealRelations = relations(deals, ({ one, many }) => ({
  org: one(organizations, { fields: [deals.orgId], references: [organizations.id] }),
  contact: one(contacts, { fields: [deals.contactId], references: [contacts.id] }),
  assignedUser: one(users, { fields: [deals.assignedTo], references: [users.id] }),
  activities: many(dealActivities),
  tasks: many(tasks),
}));

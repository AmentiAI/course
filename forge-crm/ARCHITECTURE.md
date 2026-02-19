# FORGE CRM — Full Tech Stack
## Complete Architecture

---

## Stack Overview

| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | Next.js 14 (App Router) | Full-stack, serverless, Vercel-native |
| **Language** | TypeScript | End-to-end type safety |
| **Database** | Neon (serverless Postgres) | Scales to zero, branching for dev/prod |
| **ORM** | Drizzle ORM | Lightweight, TypeScript-first, fast |
| **Cache** | Upstash Redis | Serverless, edge-compatible |
| **Auth** | Clerk | Twitter OAuth, wallet connect built-in |
| **Payments** | Stripe | Subscriptions + usage billing |
| **API** | tRPC | Type-safe API, no codegen |
| **Background Jobs** | Inngest | Cron jobs, event-driven workflows |
| **Realtime** | Pusher | Live notifications, activity feed |
| **File Storage** | Uploadthing | Profile pics, CSV imports |
| **Email** | Resend + React Email | Transactional + campaign emails |
| **Onchain (BTC)** | Hiro API + Ordiscan API | Bitcoin/Ordinals data |
| **Onchain (ETH/SOL)** | Alchemy / Helius | EVM + Solana wallet data |
| **Twitter API** | twitter-api-v2 | Social data |
| **Discord API** | discord.js | Discord community data |
| **Hosting** | Vercel | Zero-config deployment |
| **Monitoring** | Sentry + Axiom | Errors + logs |
| **Analytics** | PostHog | Product analytics |

---

## Project Structure

```
forge-crm/
├── src/
│   ├── app/
│   │   ├── (marketing)/           # Public pages
│   │   │   ├── page.tsx           # Landing page
│   │   │   ├── pricing/
│   │   │   ├── blog/
│   │   │   └── changelog/
│   │   ├── (auth)/                # Sign-in/up
│   │   ├── (app)/                 # Authenticated app
│   │   │   ├── layout.tsx         # Sidebar + navigation
│   │   │   ├── dashboard/         # Home overview
│   │   │   ├── contacts/          # CRM contacts
│   │   │   │   ├── page.tsx       # Contact list
│   │   │   │   └── [id]/          # Contact detail
│   │   │   ├── analytics/         # Multi-platform analytics
│   │   │   │   ├── twitter/
│   │   │   │   ├── discord/
│   │   │   │   └── overview/
│   │   │   ├── holders/           # NFT holder intel
│   │   │   │   ├── page.tsx       # Holder list
│   │   │   │   └── [wallet]/      # Wallet detail
│   │   │   ├── revenue/           # Revenue dashboard
│   │   │   ├── pipeline/          # Collab pipeline (kanban)
│   │   │   ├── campaigns/         # Campaign management
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   ├── automations/       # Automation rules
│   │   │   ├── whitelist/         # WL management
│   │   │   ├── tasks/             # Team tasks
│   │   │   ├── team/              # Team members
│   │   │   └── settings/          # Org settings, billing
│   │   └── api/
│   │       ├── trpc/[trpc]/
│   │       ├── webhooks/
│   │       │   ├── stripe/
│   │       │   ├── clerk/
│   │       │   └── discord/
│   │       └── inngest/
│   ├── components/
│   │   ├── ui/                    # shadcn/ui base
│   │   ├── contacts/              # Contact components
│   │   ├── analytics/             # Chart components
│   │   ├── pipeline/              # Kanban board
│   │   ├── campaigns/             # Campaign builder
│   │   ├── holders/               # Holder components
│   │   └── shared/                # Shared layout
│   ├── lib/
│   │   ├── db/
│   │   │   ├── index.ts
│   │   │   └── schema.ts          # All 20+ tables
│   │   ├── twitter/               # Twitter API client
│   │   ├── discord/               # Discord API client
│   │   ├── blockchain/
│   │   │   ├── bitcoin.ts         # Hiro/Ordiscan API
│   │   │   ├── solana.ts          # Helius API
│   │   │   └── ethereum.ts        # Alchemy API
│   │   ├── stripe/                # Billing
│   │   ├── redis/                 # Cache layer
│   │   ├── pusher/                # Realtime
│   │   └── inngest/               # Background jobs
│   └── server/
│       └── api/
│           ├── root.ts
│           └── routers/
│               ├── contacts.ts
│               ├── analytics.ts
│               ├── holders.ts
│               ├── revenue.ts
│               ├── pipeline.ts
│               ├── campaigns.ts
│               ├── automations.ts
│               ├── whitelist.ts
│               ├── tasks.ts
│               └── billing.ts
├── emails/                        # React Email templates
├── drizzle/migrations/
├── public/
├── drizzle.config.ts
├── next.config.ts
└── package.json
```

---

## Environment Variables

```env
# ─── App ───
NEXT_PUBLIC_APP_URL=https://forge.so

# ─── Neon Database ───
DATABASE_URL=postgresql://...          # Pooled (app queries)
DATABASE_URL_UNPOOLED=postgresql://... # Direct (migrations)

# ─── Auth (Clerk) ───
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=

# ─── Stripe ───
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_STARTER_PRICE_ID=
STRIPE_PRO_PRICE_ID=
STRIPE_STUDIO_PRICE_ID=
STRIPE_ENTERPRISE_PRICE_ID=

# ─── Twitter API ───
TWITTER_CLIENT_ID=
TWITTER_CLIENT_SECRET=
TWITTER_BEARER_TOKEN=

# ─── Discord ───
DISCORD_BOT_TOKEN=
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=

# ─── Blockchain ───
HIRO_API_KEY=          # Bitcoin/Ordinals
ORDISCAN_API_KEY=      # Ordinals marketplace data
HELIUS_API_KEY=        # Solana
ALCHEMY_API_KEY=       # Ethereum/Polygon

# ─── Cache ───
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# ─── Background Jobs ───
INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=

# ─── Realtime ───
PUSHER_APP_ID=
PUSHER_KEY=
PUSHER_SECRET=
PUSHER_CLUSTER=
NEXT_PUBLIC_PUSHER_KEY=
NEXT_PUBLIC_PUSHER_CLUSTER=

# ─── Email ───
RESEND_API_KEY=

# ─── File Upload ───
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

# ─── Monitoring ───
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_SENTRY_DSN=
AXIOM_DATASET=
AXIOM_TOKEN=
```

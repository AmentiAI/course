import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_g8SvCD9MhLip@ep-green-mountain-ainx1go9-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require",
  ssl: { rejectUnauthorized: false },
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as any);

const COURSES = [
  // =====================================================
  // COURSE 1: NFT Flipping Masterclass (EXISTING - IMPROVED)
  // =====================================================
  {
    title: "NFT Flipping Masterclass",
    slug: "nft-flipping-masterclass",
    shortDesc: "Learn to spot undervalued NFTs, execute floor sweeps, and build a consistent flipping system that generates income.",
    description: `**Master the Art of Profitable NFT Trading**

The NFT market remains one of the most lucrative opportunities for fast, asymmetric returns — if you know what you're doing. This comprehensive course cuts through the noise and gives you a repeatable, data-driven system for identifying undervalued NFTs before the market catches on.

**What You'll Learn:**
- How to read on-chain signals and understand rarity mechanics
- Tools that 99% of retail buyers don't know exist
- Real examples of 10x+ flips with exact entry and exit points
- Building a complete flipping workflow you can run daily in under 2 hours

**Who This Is For:**
Whether you're new to NFTs or have been trading casually, this course transforms your approach from guessing to systematic execution. You'll learn how professional flippers actually think — not by luck, but by reading data others miss.

This isn't theory. This is what's working right now in the NFT market.`,
    thumbnail: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=800&q=80",
    price: 49,
    originalPrice: 129,
    category: "Web3 & Crypto",
    level: "BEGINNER" as const,
    tags: ["NFT", "Web3", "Trading", "Crypto", "Passive Income"],
    isFeatured: true,
    totalHours: 6,
    modules: [
      {
        title: "NFT Fundamentals That Actually Matter",
        lessons: [
          {
            title: "How NFT Markets Really Work (On-Chain Mechanics)",
            duration: 22,
            isFree: true,
            content: `Welcome to the NFT Flipping Masterclass. Before we get into strategies, you need to understand how NFT markets actually function at the infrastructure level — because this understanding is what separates profitable flippers from people who lose money.

**The Mechanics Most People Miss**

Most people treat NFT marketplaces like eBay — you list something, someone buys it, transaction done. But NFTs work differently in ways that create profit opportunities.

When you buy an NFT, you're not buying a file. You're buying a token on a blockchain that *points* to a file. The actual ownership record is immutable on the blockchain, which means:

1. **Provenance is verifiable** — every single transaction in that NFT's history is public
2. **Rarity is calculable** — because trait data is on-chain, you can mathematically determine how rare each attribute combination is
3. **Market activity is trackable** — sales velocity, floor movement, and wallet behavior are all public data

**Why This Creates Flip Opportunities**

The average retail buyer doesn't analyze any of this. They see a picture they like, check the floor price, and buy. This is exactly why undervalued NFTs exist — the market isn't perfectly efficient, especially in low-to-mid cap collections.

**The Three Types of NFT Opportunities**

1. **Trait underpricing**: An NFT with rare traits listed below its calculated rarity value
2. **Floor sweeps**: Buying the cheapest NFTs in a collection right before a catalyst event
3. **Cross-platform arbitrage**: NFTs listed on one marketplace at a lower price than another

In this module, we'll build your foundation so every subsequent lesson makes sense.

**Your First Action**
Install MetaMask (if you haven't) and bookmark these sites: NFTNerds.ai, Icy.tools, Blur.io, and OpenSea. You'll use all four in this course.`,
          },
          {
            title: "Reading Rarity: Trait Floors vs. Collection Floors",
            duration: 28,
            content: `One of the most powerful edge cases in NFT flipping is the gap between a collection's floor price and an individual NFT's *trait floor* — the actual price buyers pay for NFTs with specific rare traits.

**Understanding Rarity Scores**

Every NFT in a collection is assigned a rarity score based on how unusual its trait combination is. The two main scoring systems are:

- **Rarity Score** (NFTNerds): Weight each trait by how rare it is across the collection, sum the weights
- **Rarity Rank**: Simply order all NFTs in a collection from rarest to most common

Here's the key insight: **rarity score ≠ market price.** The market prices specific *desirable* traits more than others. A trait that's rare but ugly (like an awkward face) might not command a premium, while a popular trait (like a golden background) might trade at 3-5x floor even if it's not the rarest.

**The Trait Floor Concept**

Instead of looking at the collection floor, look at the *trait floor* for specific attributes:

1. Go to NFTNerds or Blur and filter by specific traits
2. Find the lowest listed price for NFTs with that trait
3. Compare it to recently sold prices for that same trait
4. If the current listing is below recent sales → that's your opportunity

**Practical Example: How This Works**

Let's say you're looking at a pfp collection with a floor of 0.1 ETH. You notice:
- 5 NFTs with "Gold Background" are listed between 0.15-0.3 ETH
- The last 10 "Gold Background" sales averaged 0.35 ETH
- One listing at 0.15 ETH just appeared

That 0.15 ETH NFT is underpriced relative to trait floor. That's a flip.

**Tools to Use**
- NFTNerds.ai → click any collection → filter by traits → sort by price low to high
- Blur.io → trait filtering built into the interface
- Icy.tools → great for tracking recent sales by trait`,
          },
        ],
      },
      {
        title: "Tools, Data, and Signals",
        lessons: [
          {
            title: "Mastering NFTNerds, Icy.tools, and Blur",
            duration: 35,
            content: `Professional NFT flippers use tools that give them an informational edge over retail buyers. In this lesson, we'll do a deep dive into the three platforms that matter most.

**Tool #1: NFTNerds**

NFTNerds is the most powerful rarity and analytics platform in the NFT space. Here's how to use it:

*Rarity Analysis*
- Search any collection
- Click on an NFT to see its full trait breakdown
- The "Sniper" tab shows recently listed NFTs sorted by rarity score vs. list price — this is your primary hunting ground

*The Sniper Alert System*
Set up NFTNerds alerts for specific collections:
1. Go to the collection page
2. Click "Set Alert"
3. Filter by: rarity rank < [your threshold] AND price < [your target]
4. Get notified via Discord/Telegram when a match lists

This is how serious flippers operate — they don't browse, they get alerted.

**Tool #2: Icy.tools**

Icy.tools is better for market intelligence than individual NFT analysis:

*Sales Velocity*: Shows how many NFTs are selling per hour. High velocity = active market = safer to flip
*Whale Tracker*: See which wallets are buying. If known flippers/collectors are accumulating, that's bullish
*Price History*: Visualize how the floor has moved over 7/30/90 days

**Tool #3: Blur**

Blur is the dominant professional NFT marketplace. Key features:

*Bidding Pools*: You can place bids on entire collections, not just individual NFTs. If you set a collection bid at 0.09 ETH for a 0.1 ETH floor collection, you might get filled on motivated sellers
*Portfolio Analytics*: Track your unrealized P&L across all holdings
*Sweep Function*: One-click buy the N cheapest listings in a collection

**Your Daily Workflow**
Morning: Check Icy.tools for trending collections and volume spikes
Afternoon: Run NFTNerds sniper on your target collections
Evening: Bid on Blur for any collections showing bullish momentum`,
          },
          {
            title: "Volume Analysis: Reading the Signals That Predict Price",
            duration: 25,
            content: `Volume is the heartbeat of NFT markets. Learn to read it correctly and you'll know when to buy, hold, and sell before most of the market figures it out.

**The Volume-Price Relationship**

In efficient markets, price follows volume. In NFT markets, this relationship is even more pronounced because collections are illiquid — a handful of purchases can move the floor significantly.

**Key Metrics to Track**

1. **24h Volume** — the raw number. Context matters more than the absolute figure
2. **Sales Count** — how many individual NFTs sold. High volume but low sales count = fewer, higher-value transactions (premium buyers entering). High sales count + moderate volume = retail activity
3. **Unique Buyers** — how many different wallets bought. Many unique buyers = organic demand (bullish). Few buyers with many purchases each = potential wash trading (suspicious)
4. **Floor Price Change %** — what percentage has the floor moved in 24h? Compare this to volume

**The Accumulation Pattern**

One of the most reliable signals for a short-term flip:
1. Floor has been flat for 2-4 weeks
2. Volume slowly increases over 3-5 days
3. Unique buyer count increases
4. A known flipper wallet starts buying

This pattern often precedes a 20-50% floor spike within days.

**Identifying Wash Trading**

Watch out for these red flags:
- Same wallet appearing on both sides of transactions
- Sudden volume spike with no community activity
- Price moving up with no new buyers, just existing holders transferring

Clean volume looks organic — lots of different wallets, prices gradually increasing with each sale.

**Setting Your Volume Alerts**
Use Icy.tools to set alerts when a collection's 24h volume crosses a threshold you define. When your target collection hits 3x its weekly average volume, that's your signal to pay close attention.`,
          },
        ],
      },
    ],
  },

  // =====================================================
  // COURSE 2: Bitcoin Ordinals & BRC-20 Mastery (EXISTING - IMPROVED)
  // =====================================================
  {
    title: "Bitcoin Ordinals & BRC-20 Mastery",
    slug: "bitcoin-ordinals-brc20",
    shortDesc: "Master Bitcoin Ordinals, mint inscriptions, evaluate early projects, and profit from the BRC-20 ecosystem.",
    description: `**Unlock the Bitcoin NFT Revolution**

Bitcoin Ordinals is the most technically interesting and potentially lucrative opportunity in crypto right now — and almost no one understands it properly. This course gives you a deep technical understanding of how Ordinals work, paired with practical trading strategies.

**What Makes This Course Different:**
- Deep dive into inscription mechanics and BRC-20 token standards
- Hands-on tutorials for minting on Unisat, Gamma, and OrdinalsBot
- Framework for evaluating projects before they explode
- Security best practices for protecting your Bitcoin inscriptions

**Course Highlights:**
- Understand satoshi numbering and why it creates value
- Learn to use every major Ordinals platform profitably
- Master the art of early project evaluation
- Build a diversified Ordinals portfolio strategy

Whether you're a Bitcoin maximalist exploring NFTs or an Ethereum NFT trader looking at new opportunities, this course gives you the edge to profit from Bitcoin's newest asset class.`,
    thumbnail: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&q=80",
    price: 79,
    originalPrice: 199,
    category: "Web3 & Crypto",
    level: "INTERMEDIATE" as const,
    tags: ["Bitcoin", "Ordinals", "BRC-20", "Web3", "Crypto"],
    isFeatured: true,
    totalHours: 8,
    modules: [
      {
        title: "The Bitcoin Ordinals Revolution",
        lessons: [
          {
            title: "What Are Ordinals? The Technical Foundation",
            duration: 30,
            isFree: true,
            content: `Bitcoin Ordinals are one of the most fascinating developments in Bitcoin's history. Unlike NFTs on Ethereum or Solana, Ordinals don't require a smart contract. They're embedded directly into the Bitcoin blockchain using a specific mechanism.

**The Satoshi Numbering System**

Every Bitcoin is divisible into 100,000,000 satoshis (sats). Bitcoin's creator specified no particular importance to individual sats — they're fungible. Ordinals changed this.

The Ordinals protocol, created by Casey Rodarmor, assigns a serial number (ordinal) to each satoshi based on the order it was mined. The first satoshi ever mined is satoshi #0. The 100 millionth satoshi is satoshi #99,999,999. And so on, up to the current total supply.

Because the order of mining is deterministic and immutable, these ordinal numbers are permanent. They can be tracked and transferred between wallets.

**Inscriptions: Writing Data to Sats**

The innovation of Ordinals comes from Bitcoin's Taproot upgrade (2021), which allows more data to be stored in Bitcoin transactions. Rodarmor's protocol uses this to "inscribe" data — images, text, video, audio — onto specific satoshis.

Once inscribed:
- The data is immutable and stored forever on Bitcoin
- The satoshi carrying the inscription can be bought and sold
- Ownership is tracked by which wallet holds that satoshi

This is fundamentally different from Ethereum NFTs where the "NFT" is often just a pointer to an image stored on IPFS or even centralized servers. Ordinals data is *on Bitcoin itself*.

**Why This Matters for Value**

Bitcoin is the most secure, most decentralized blockchain ever created. Data inscribed on Bitcoin is:
- More permanent than any Ethereum NFT
- More secure (Bitcoin's hash rate is 100x+ greater)
- More immutable (no smart contract can be exploited to destroy the NFT)

This gives Ordinals a legitimate claim to being "the most permanent digital artifacts ever created."`,
          },
          {
            title: "BRC-20 Tokens: The Bitcoin Token Standard Explained",
            duration: 28,
            content: `BRC-20 is an experimental token standard on Bitcoin that uses Ordinals inscriptions to create and transfer fungible tokens directly on the Bitcoin blockchain.

**How BRC-20 Works**

A BRC-20 token is simply a JSON inscription that follows a specific format:
\`\`\`json
{
  "p": "brc-20",
  "op": "deploy",
  "tick": "ordi",
  "max": "21000000",
  "lim": "1000"
}
\`\`\`

The operations are:
- **deploy**: Create a new token (specify name, max supply, mint limit per tx)
- **mint**: Mint tokens (must be within the limit per inscription)
- **transfer**: Send tokens to another address

**The Wild West Opportunity**

Unlike ERC-20 tokens on Ethereum, BRC-20 has no smart contract functionality. It's experimental and has significant limitations. But it also created an enormous wealth transfer:

- The ORDI token (the first BRC-20) launched at essentially $0 and eventually hit a $1B+ market cap
- Early minters paid only the Bitcoin transaction fee (a few dollars) to mint thousands of tokens
- Many early participants made life-changing money

**Current Market Landscape**

As of 2024, the BRC-20 ecosystem includes thousands of tokens. Most are worthless — just like most altcoins and most NFT collections. The skill is identifying:

1. First-movers with genuine community interest
2. Tokens with narrative alignment (Bitcoin, scarcity, permabull themes)
3. Tokens with upcoming exchange listings

**The Risk**

BRC-20 is not "real" Bitcoin. It's an inscription-based system with no enforcement mechanism. The protocol is maintained by the community, not Bitcoin miners. Future developments could make BRC-20 tokens unreadable or untrackable. Invest with this risk in mind.`,
          },
        ],
      },
      {
        title: "Minting and Trading",
        lessons: [
          {
            title: "How to Mint Inscriptions: Unisat, Gamma, and OrdinalsBot",
            duration: 35,
            content: `Now let's get hands-on. You'll learn to mint Ordinals inscriptions using the three main platforms.

**Platform #1: Unisat (unisat.io)**

Unisat is the most popular Ordinals wallet and marketplace. It supports both Ordinals NFTs and BRC-20 tokens.

*Setting Up Unisat*:
1. Install Unisat Chrome extension
2. Create a new wallet OR import existing Bitcoin wallet using seed phrase
3. Fund with Bitcoin (you'll need at least $20-50 in BTC to cover gas for inscriptions)

*Minting on Unisat*:
1. Go to unisat.io/inscribe
2. Select file type (image, text, JSON for BRC-20)
3. Upload your file
4. Set fee rate (higher fee = faster confirmation; check mempool.space for current rates)
5. Pay and wait for confirmation (usually 10-30 minutes)

*BRC-20 Minting on Unisat*:
1. Go to unisat.io/brc20
2. Search for the token you want to mint
3. Check: Has max supply been reached? (If so, you can only buy on secondary)
4. Click Mint, set quantity, pay fee

**Platform #2: Gamma.io**

Gamma specializes in artist-focused Ordinals projects with a cleaner UX. Better for:
- Launching collections as an artist
- Discovering curated Ordinals art projects
- Minting from artist launchpads

**Platform #3: OrdinalsBot**

OrdinalsBot is API-first and developer-friendly. Also has a user-facing inscription tool.
- Good for batch inscriptions
- Lower fees for bulk operations
- Advanced fee management

**Best Practices for Minting**
- Never mint during Bitcoin network congestion (check mempool.space for fee levels)
- Always double-check file size — inscription fees scale with file size
- For BRC-20: Check if the token is still mintable before sending transactions`,
          },
          {
            title: "Evaluating Early Ordinals Projects Before They Pump",
            duration: 32,
            content: `The biggest gains in Ordinals come from identifying projects in their early days — before the broader market notices. This lesson teaches you the framework for evaluation.

**The 5-Factor Evaluation Framework**

**Factor 1: Art and Aesthetic Quality**
The Ordinals community has developed sophisticated taste quickly. Projects with lazy or derivative art rarely achieve lasting value. Look for:
- Original art style (not copied from existing NFT trends)
- Consistent visual identity
- Rarity system that makes visual sense

**Factor 2: Team and Transparency**
Because there are no smart contracts on Bitcoin, you're trusting the team completely. Red flags:
- Fully anonymous team with no reputation or prior work
- No clear roadmap or communication
- Discord full of bots and empty engagement

Green flags:
- Doxxed founders or well-known pseudonymous wallets with reputation
- Active, genuine community discussions
- Clear technical explanation of how inscriptions were done

**Factor 3: Inscription Numbers**

Lower inscription numbers = earlier in Bitcoin's Ordinals history = more historical significance. 
- Sub-1000 inscriptions: Extremely rare, considered artifacts
- Sub-100k: Early adopter territory, command premium
- 1M+: More common, need stronger project fundamentals to stand out

**Factor 4: Community and Twitter Presence**

Check:
- How engaged is the Discord (not just active, but genuinely discussing)
- Are real wallets (not bots) in the community?
- Is there organic Twitter activity or just team-generated content?

**Factor 5: Market Dynamics**

Before minting or buying on secondary:
- What's the current floor?
- What was the mint price?
- How many have sold vs. how many exist?
- Are there whale wallets accumulating?

If a 1,000-piece collection has 600 pieces sold in the last 7 days with the floor rising — that's momentum.`,
          },
        ],
      },
    ],
  },

  // =====================================================
  // COURSE 3: Solana DeFi Yield Strategies (EXISTING - IMPROVED)
  // =====================================================
  {
    title: "Solana DeFi Yield Strategies",
    slug: "solana-defi-yield",
    shortDesc: "Master Solana DeFi: liquidity pools, yield farming, liquid staking, and the $1k to $10k DeFi roadmap.",
    description: `**Generate Sustainable Yields on Solana's Fast DeFi Ecosystem**

Solana's DeFi ecosystem offers some of the highest sustainable yields in crypto — if you know how to navigate it. This course takes you from beginner to confident DeFi participant with strategies for every risk level.

**Deep Technical Understanding:**
- How AMMs and liquidity pools actually work (with the math)
- Impermanent loss explained — when it matters and when it doesn't
- Concentrated liquidity strategies on Orca and Raydium
- Liquid staking with JitoSOL, mSOL, and bSOL

**Actionable Strategy Roadmaps:**
- The $1k to $10k DeFi portfolio growth plan
- Risk management and rebalancing frameworks
- Compounding strategies that maximize returns
- Protocol-specific deep dives on Raydium, Orca, and Meteora

This course gives you both the theoretical foundation and the practical playbook to grow your capital systematically through Solana DeFi.`,
    thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
    price: 99,
    originalPrice: 249,
    category: "Web3 & Crypto",
    level: "INTERMEDIATE" as const,
    tags: ["Solana", "DeFi", "Yield Farming", "Crypto", "Passive Income"],
    isFeatured: true,
    totalHours: 10,
    modules: [
      {
        title: "DeFi Fundamentals on Solana",
        lessons: [
          {
            title: "How AMMs Work: The Math Behind Liquidity Pools",
            duration: 35,
            isFree: true,
            content: `Automated Market Makers (AMMs) are the engine of DeFi. Understanding how they work at a mathematical level is essential for anyone who wants to provide liquidity profitably.

**The Traditional Market Problem**

Traditional financial markets use order books — lists of buy and sell orders at specific prices. Market makers provide liquidity by sitting on both sides of the market. In crypto, replicating this on-chain is expensive and slow (especially on Ethereum's high-fee network).

AMMs solve this by replacing order books with a mathematical formula.

**The Constant Product Formula**

The core formula used by Uniswap (and adopted by most AMMs including Raydium) is:

x × y = k

Where:
- x = quantity of Token A in the pool
- y = quantity of Token B in the pool
- k = a constant that never changes

Example: A SOL/USDC pool has 1,000 SOL and 200,000 USDC. So k = 1,000 × 200,000 = 200,000,000. This implies 1 SOL = 200 USDC.

**How Trades Change the Pool**

If someone wants to buy 10 SOL, they add USDC and remove SOL:
New state: (1,000 - 10) SOL and new USDC amount
To maintain k: 990 × new_USDC = 200,000,000
new_USDC = 202,020 USDC

They paid 2,020 USDC for 10 SOL (202 USDC per SOL), slightly more than the 200 USDC implied by the initial ratio. This is "price impact" — larger trades cause more slippage.

**What This Means for Liquidity Providers**

As a liquidity provider, you deposit both tokens and receive LP (liquidity provider) tokens representing your share. You earn:
1. Trading fees from every swap (typically 0.3% per trade)
2. Any additional incentive rewards the protocol provides

The risk is impermanent loss — explained in the next lesson.

**Concentrated Liquidity (Raydium, Orca)**

Modern AMMs like Raydium CLMM and Orca Whirlpools use "concentrated liquidity" where you provide liquidity only within a specific price range. This gives you more fee income per dollar when the price is in your range — but more risk if price moves outside it.`,
          },
          {
            title: "Impermanent Loss: The Real Risk of Yield Farming",
            duration: 30,
            content: `Impermanent loss is the most misunderstood concept in DeFi, and it's the reason many yield farmers end up with less value than if they'd just held their tokens. This lesson will make sure you never make that mistake.

**What Impermanent Loss Actually Is**

Impermanent loss (IL) occurs when the price ratio of the two tokens in a liquidity pair changes after you deposit. The more the ratio changes, the more IL you experience.

"Impermanent" because if prices return to their original ratio, the loss disappears. But in practice, prices often don't return — so "impermanent" loss becomes very permanent.

**Calculating IL with a Real Example**

You deposit $1,000 of SOL and $1,000 of USDC into a pool.

- Day 1: SOL = $100. You deposit 10 SOL + 1,000 USDC (k = 10,000)
- Day 30: SOL = $200. New pool state to maintain k=10,000:
  - New SOL: √(10,000/200) = √50 = 7.07 SOL
  - New USDC: √(10,000×200) = 1,414 USDC

Your position: 7.07 SOL ($1,414) + 1,414 USDC = $2,828

If you'd just held: 10 SOL ($2,000) + 1,000 USDC = $3,000

Impermanent loss: $3,000 - $2,828 = $172 (5.7%)

**The IL/APY Trade-off**

IL is only worth it if the fees + rewards you earn exceed the IL. This is the core calculation every liquidity provider must make:

Net return = Fee income + Reward income - Impermanent loss

If fee income + rewards > IL → profitable LP
If fee income + rewards < IL → you would have been better off just holding

**How to Minimize IL**

1. **Stable pairs**: USDC/USDT pools have essentially zero IL because both track $1
2. **Correlated pairs**: SOL/mSOL (mSOL tracks SOL price closely) has low IL
3. **Concentrated range strategy**: By providing in a tight range that matches the current price, you earn more fees that can offset IL
4. **High-volume pools**: More trading volume = more fee income = more IL buffer

**The Stable Pair Strategy**

For beginners or risk-averse participants: 100% of your LP capital goes into stable pairs (USDC/USDT, USDC/USDH). You earn 5-15% APY with near-zero IL risk. This is your "base" strategy.`,
          },
        ],
      },
      {
        title: "Solana DeFi Protocols Deep Dive",
        lessons: [
          {
            title: "Raydium, Orca, and Meteora: Which Pool Is Right for You",
            duration: 40,
            content: `The three dominant liquidity protocols on Solana each have distinct characteristics. Understanding them lets you deploy capital where it'll earn the most.

**Raydium**

Raydium is the most established AMM on Solana, built on top of OpenBook (formerly Serum) order books. This hybrid model gives it unique advantages.

*Products*:
- Standard AMM pools (constant product formula)
- CLMM (Concentrated Liquidity Market Maker) pools
- Fusion pools (with external reward incentives)
- Farms (staking LP tokens for additional RAY rewards)

*Best for*: High-volume pairs, SOL/USDC, mainstream token pairs

*Fees*: 0.25% for standard pools, varies for CLMM

*Risks*: Smart contract risk, IL, complex position management for CLMM

**Orca**

Orca is the most user-friendly Solana AMM, famous for its Whirlpools (concentrated liquidity). Their focus on UX makes it ideal for newcomers to DeFi.

*Products*:
- Whirlpools (concentrated liquidity, similar to Uniswap v3)
- Standard pools

*Best for*: Beginners, users who want a clean interface, stablecoin LPs

*Key Feature*: Orca's concentrated liquidity implementation is arguably the most refined on Solana

**Meteora**

Meteora (formerly Mercurial Finance) specializes in stable assets and innovative vault strategies. Their DLMM (Dynamic Liquidity Market Maker) is unique.

*Products*:
- Stable pools (low-slippage stablecoin swaps)
- Dynamic Liquidity pools
- Vault strategies (auto-compound)

*Best for*: Stablecoin LPs, users who want automated strategies

**The Decision Framework**

| Scenario | Best Platform |
|----------|---------------|
| Stablecoin LP, passive | Meteora |
| Active SOL/USDC LP | Orca Whirlpools |
| Farming small caps with rewards | Raydium Fusion |
| Max simplicity | Orca |
| Max yield on stable pairs | Meteora |

**APY Reality Check**

Displayed APY is often annualized from the last 24h of fee income. This can be misleading:
- A pool that earned a lot yesterday due to a news event shows inflated APY
- Always check 7-day and 30-day averages
- Factor in IL before deciding the "real" APY`,
          },
          {
            title: "Liquid Staking: JitoSOL, mSOL, and bSOL Explained",
            duration: 30,
            content: `Liquid staking is one of the best risk-adjusted yield strategies in all of crypto. You earn staking rewards on your SOL while keeping your capital liquid and deployable in DeFi.

**How Solana Staking Works**

Solana validators run the network and earn rewards. When you stake SOL, you delegate it to a validator and earn a portion of their rewards (~7% APY as of 2024).

The problem with native staking: your SOL is locked for the duration of the epoch (2-3 days) and you can't use it while staked.

**Liquid Staking: The Solution**

Liquid staking protocols let you:
1. Deposit SOL → receive a liquid staking token (mSOL, jitoSOL, bSOL, etc.)
2. Your liquid token automatically appreciates as staking rewards accrue
3. Use your liquid token in DeFi while still earning staking rewards

**The Three Main Options**

*mSOL (Marinade Finance)*
- Oldest and most established Solana liquid staking
- mSOL/SOL ratio increases as rewards are earned
- Can be used as collateral in lending protocols
- Current APY: ~7-8%

*jitoSOL (Jito)*
- Captures MEV (Maximal Extractable Value) in addition to base staking rewards
- MEV adds extra yield vs. regular staking
- Generally 0.5-1% higher APY than mSOL
- Strong validator network with sophisticated routing

*bSOL (BlazeStake)*
- Community-run, decentralized validator approach
- Competitive APY to mSOL and jitoSOL
- Good governance participation

**The DeFi Multiplier**

The real power of liquid staking: deposit your jitoSOL into Orca or Raydium in a jitoSOL/SOL pool.

- Staking yield: ~8%
- LP fees from jitoSOL/SOL pool: ~5-8% (low IL since both track SOL)
- Total: ~13-16% APY on your SOL

This is the "base layer" strategy for sophisticated Solana DeFi participants.

**Risk Factors**

- Smart contract risk in the liquid staking protocol
- Depegging risk (though liquid staking tokens have maintained their peg well)
- Slashing risk (rare on Solana, but validators can be penalized for downtime)`,
          },
        ],
      },
    ],
  },

  // =====================================================
  // COURSE 4: Crypto Day Trading Blueprint (EXISTING - IMPROVED)
  // =====================================================
  {
    title: "Crypto Day Trading Blueprint",
    slug: "crypto-day-trading-blueprint",
    shortDesc: "Master technical analysis, risk management, and trading psychology to trade crypto profitably.",
    description: `**Build a Complete Trading System from the Ground Up**

Day trading crypto is one of the most challenging skills to develop — but also one of the most lucrative once you have a proven edge. This course gives you the complete system: technical analysis, risk management, trading psychology, and a backtested strategy you can start applying immediately.

**Technical Analysis Mastery:**
- TradingView setup optimized for crypto trading
- The 8 candlestick patterns that actually predict price
- Support and resistance identification that works
- RSI, MACD, and Bollinger Bands used correctly

**Risk Management Framework:**
- The 2% rule that keeps you in the game
- Stop loss placement and position sizing
- The trading journal that reveals your blind spots
- Backtesting your strategy before risking real money

No indicators-as-magic, no promises of easy money. Real trading skills built through fundamentals and deliberate practice.`,
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    price: 149,
    originalPrice: 399,
    category: "Trading",
    level: "INTERMEDIATE" as const,
    tags: ["Trading", "Technical Analysis", "Crypto", "Day Trading", "Risk Management"],
    isFeatured: true,
    totalHours: 14,
    modules: [
      {
        title: "The Trading Foundation",
        lessons: [
          {
            title: "Setting Up TradingView for Crypto Trading",
            duration: 25,
            isFree: true,
            content: `TradingView is the industry-standard charting platform for crypto traders. Setting it up correctly from the start will make everything else in this course more effective.

**Creating Your Account**

Free TradingView accounts are sufficient for most traders. The paid tiers add:
- Multiple charts on screen (Pro: 2, Pro+: 4, Premium: 8)
- More saved chart layouts
- Real-time data for some traditional markets

For pure crypto trading on major pairs, the free tier is adequate.

**Connecting Your Exchange**

TradingView integrates with most major exchanges including Binance, Coinbase, ByBit, and others. To connect:
1. Go to your TradingView profile → Trading Panel
2. Select your exchange
3. Enter your API credentials (read + trading permissions only, never withdrawal permissions)

You can now execute trades directly from TradingView charts.

**Your Essential Chart Setup**

For the style of trading in this course, we use:
- **Candle type**: Standard candlesticks (not Heikin Ashi)
- **Timeframes**: Primarily 4H for swing setups, 15M for entry precision
- **Background**: Dark theme (easier on the eyes for long sessions)

**The Five Indicators We'll Use**

We keep it simple. More indicators do not mean more accuracy — they create noise.

1. **Volume** (built-in) — confirms or denies price moves
2. **200 EMA** (Exponential Moving Average) — identifies trend direction
3. **RSI (14)** — measures momentum and identifies overbought/oversold
4. **MACD (12, 26, 9)** — trend-following momentum indicator
5. **Bollinger Bands (20, 2)** — volatility measurement

To add an indicator in TradingView: click "Indicators" button → search by name → click to add.

**Setting Up Your First Chart Layout**

Save a layout with:
- Top panel: Price chart (4H candlesticks) with 200 EMA and Bollinger Bands
- Bottom panel 1: Volume with 20-period volume MA
- Bottom panel 2: RSI (14) with overbought line at 70, oversold at 30
- Bottom panel 3: MACD

Name this layout "Main Setup" and save it. This is your workspace for the rest of the course.`,
          },
          {
            title: "Reading Candlestick Patterns That Actually Predict Price",
            duration: 35,
            content: `Most candlestick pattern guides teach dozens of patterns. We teach eight that actually have statistical edge. Memorizing 50 patterns is useless — understanding 8 deeply is profitable.

**What Each Candle Tells You**

Every candlestick tells a 4-part story:
- **Open**: Where price started
- **Close**: Where price ended
- **High**: How high buyers pushed it
- **Low**: How low sellers pushed it

The body (open-to-close) and wicks (extremes beyond body) tell you about the battle between buyers and sellers.

**The 8 Patterns Worth Trading**

**1. Hammer / Inverted Hammer (Reversal Bottom)**
Long lower wick, small body at the top. Shows buyers aggressively rejected low prices. High reliability after a downtrend.

**2. Shooting Star / Hanging Man (Reversal Top)**
Long upper wick, small body at the bottom. Buyers tried to push higher but failed. Sellers took control. High reliability after an uptrend.

**3. Engulfing Patterns (Strong Reversal)**
Bullish: A green candle completely engulfs the previous red candle
Bearish: A red candle completely engulfs the previous green candle
These are among the highest-probability reversal patterns.

**4. Doji (Indecision / Potential Reversal)**
Open and close at almost the same price. Neither buyers nor sellers won. At support/resistance levels, this often precedes a reversal.

**5. Morning Star / Evening Star (3-Candle Reversal)**
Morning Star: Large red candle → small indecision candle → large green candle (bullish reversal)
Evening Star: Large green candle → small indecision candle → large red candle (bearish reversal)

**The Critical Context Rule**

Candlestick patterns ONLY have meaning at significant price levels (support, resistance, prior highs/lows). A hammer in the middle of a trend has no predictive power. A hammer at a major support level after a strong downtrend is highly significant.

Always ask: "Where is this pattern occurring in the overall structure?"`,
          },
        ],
      },
      {
        title: "Technical Analysis Mastery",
        lessons: [
          {
            title: "Support and Resistance: Finding the Levels That Matter",
            duration: 40,
            content: `Support and resistance are the backbone of technical analysis. Everything else — indicators, patterns — is secondary to understanding where price is likely to pause or reverse.

**What Are Support and Resistance?**

Support: A price level where buyers have historically stepped in to prevent further decline. The floor.

Resistance: A price level where sellers have historically stepped in to prevent further advance. The ceiling.

When price approaches these levels, it often reacts — either bouncing or consolidating — before breaking through.

**The Three Types of S/R**

**1. Horizontal Levels**
Look for areas where price has bounced multiple times. Draw a horizontal line across those points. The more touches, the stronger the level.

Example: If Bitcoin bounced off $42,000 three times in the last 6 months, that's a major support level.

**2. Dynamic Levels (Moving Averages)**
The 200 EMA acts as dynamic support in uptrends and dynamic resistance in downtrends. When price pulls back to the 200 EMA in an uptrend, it often bounces.

**3. Previous High/Low (Level Flip)**
When a previous resistance is broken, it becomes support (and vice versa). This is called a "level flip" and is one of the most reliable setups in trading.

**Drawing Levels Correctly**

Common mistake: Drawing too many levels. You want the 3-5 most significant levels on your chart, not 20 lines.

How to identify significant levels:
1. Zoom out to the weekly or monthly chart
2. Identify where price spent significant time consolidating
3. Identify major historical highs and lows
4. Mark 3-5 levels that keep reappearing

**The Higher the Timeframe, the More Reliable**

A support level on the weekly chart is more significant than one on the 1-hour chart. Trade in the direction of higher timeframe structure.`,
          },
          {
            title: "RSI, MACD, and Bollinger Bands: Your Edge in Context",
            duration: 32,
            content: `Indicators don't predict the future — they measure current market conditions. Used correctly, they give you probabilistic edges. Used incorrectly, they generate constant false signals.

**RSI (Relative Strength Index)**

RSI measures momentum: how strongly is price moving compared to its recent history?

- RSI above 70 = "overbought" — price has moved up fast, may be due for correction
- RSI below 30 = "oversold" — price has moved down fast, may be due for bounce

*The biggest RSI mistake*: Buying when RSI crosses 30 or selling when it crosses 70. In strong trends, RSI stays extreme for weeks.

*The correct RSI use*:
1. **RSI Divergence**: Price makes a new high, but RSI makes a lower high → bearish divergence → potential reversal incoming
2. **RSI Confirmation**: Price breaks a key resistance AND RSI is trending up + above 50 → confirms the breakout is real

**MACD (Moving Average Convergence Divergence)**

MACD shows the relationship between two exponential moving averages (12-period and 26-period EMA).

Key signals:
- MACD line crosses above signal line → bullish momentum
- MACD line crosses below signal line → bearish momentum
- Histogram growing → momentum increasing in that direction
- Histogram shrinking → momentum weakening

*Best use*: MACD divergence (same concept as RSI divergence, just a different measurement)

**Bollinger Bands**

Bollinger Bands are price channels that expand when volatility is high and contract when volatility is low.

Key signals:
1. **Band Squeeze**: When bands are very narrow (low volatility), a breakout is coming. You don't know the direction yet, but you know price is about to move.
2. **Band Touch**: Price touching the upper band in an uptrend often marks a short-term top. Price touching the lower band in a downtrend often marks a short-term bottom.
3. **Band Walk**: In strong trends, price "walks" along the upper or lower band. This is NOT a reversal signal — it means the trend is very strong.`,
          },
        ],
      },
    ],
  },

  // =====================================================
  // COURSE 5: Prompt Engineering for Income (EXISTING - IMPROVED)
  // =====================================================
  {
    title: "Prompt Engineering for Income",
    slug: "prompt-engineering-income",
    shortDesc: "Master ChatGPT, Claude, and Midjourney to build prompt packs, sell them online, and create a $5k/month business.",
    description: `**Turn AI Skills Into a Profitable Digital Product Business**

Prompt engineering is one of the fastest-growing skills in 2024 — and almost nobody is doing it strategically. This course shows you how to go from "I use ChatGPT sometimes" to building a systematic income stream from selling prompts and AI services.

**Master the Craft:**
- The six elements of high-performance prompts
- Chain-of-thought, few-shot, and self-critique techniques
- Platform-specific optimization for ChatGPT, Claude, and Midjourney
- Building prompts that produce professional-grade outputs consistently

**Build the Business:**
- The 10 niches that sell best on PromptBase and Gumroad
- Building and packaging your first prompt pack
- Real case study: $0 to $5k/month in 90 days
- Pricing, positioning, and scaling your prompt business

Whether you want passive income or a full-time AI consulting business, this course gives you the skills and the strategy.`,
    thumbnail: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    price: 39,
    originalPrice: 99,
    category: "AI & Automation",
    level: "BEGINNER" as const,
    tags: ["AI", "ChatGPT", "Prompt Engineering", "Passive Income", "Digital Products"],
    isFeatured: true,
    totalHours: 5,
    modules: [
      {
        title: "Mastering AI Models for Income",
        lessons: [
          {
            title: "The Anatomy of a Profitable Prompt",
            duration: 28,
            isFree: true,
            content: `A great prompt isn't just a well-phrased question. It's a structured instruction set that consistently produces high-quality, monetizable output from an AI model.

**The Six Elements of High-Performance Prompts**

**1. Role/Persona**
Tell the AI who it is. This dramatically changes the quality of output.

Bad: "Write a marketing email for my product"
Good: "You are a direct response copywriter with 15 years of experience writing high-converting B2B SaaS emails. Your emails always include a strong hook, clear value proposition, and a single compelling CTA."

**2. Context/Background**
Provide the relevant information the AI needs. The more specific your context, the more targeted the output.

**3. Task**
Clearly state what you want. Be explicit.

Bad: "Help me with my pitch deck"
Good: "Write a 10-slide pitch deck outline for a mobile app that helps freelancers track their invoices. The audience is seed-stage investors. The goal is to communicate: the problem, solution, market size, business model, team, and funding ask."

**4. Format**
Specify how you want the output structured.

"Format your response as:
- Executive Summary (2-3 sentences)
- Key Points (bullet list)
- Recommended Actions (numbered list)"

**5. Tone and Style**
"Write in a conversational tone, like you're explaining to a smart friend who has no technical background."

**6. Constraints**
"Keep it under 300 words. Do not use jargon. Do not suggest expensive tools."

**The Formula in Practice**

[Role] + [Context] + [Task] + [Format] + [Tone] + [Constraints]

Use this structure for every prompt you build, and you'll produce outputs that clients and customers will pay for.`,
          },
          {
            title: "ChatGPT and Claude Mastery: Advanced Techniques",
            duration: 32,
            content: `Beyond basic prompting, there are techniques that separate beginner AI users from professionals. These methods can 10x the quality of AI outputs.

**Technique #1: Chain-of-Thought Prompting**

Instead of asking for a final answer directly, ask the AI to reason step by step.

"Before answering, think through this problem step by step. List each step explicitly."

This is especially powerful for:
- Complex writing tasks (better structured output)
- Analysis tasks (more comprehensive consideration)
- Code generation (fewer bugs)

**Technique #2: Few-Shot Examples**

Provide 2-3 examples of what you want before the actual task:

"Here are two examples of product descriptions in the style I want:

Example 1: [your example]
Example 2: [your example]

Now write a product description for [your actual product] in the same style."

Few-shot prompting is incredibly powerful for establishing a consistent style.

**Technique #3: The Self-Critique Loop**

After getting an initial output, ask the AI to critique it and improve it:

"Review your response above. What are its weaknesses? What's missing? Now rewrite it addressing those weaknesses."

You'll often find the second version is significantly better.

**Technique #4: Iterative Refinement**

Build on outputs iteratively rather than starting over when something isn't right:

"Good start. Now make the tone more authoritative. Add three specific statistics. Remove the third paragraph."

**Technique #5: System Prompt Priming**

For Claude specifically, you can establish a detailed system prompt that governs the entire conversation. Use this for long creative or analytical projects.

"For this entire conversation, you are [detailed persona]. Your goal is [specific goal]. You always [specific behavior]. You never [specific restriction]."

**Platform Comparison**

| Task | Best Model |
|------|-----------|
| Creative writing | Claude |
| Code generation | GPT-4 |
| Data analysis | GPT-4 with Code Interpreter |
| Image prompts | Claude or GPT-4 |
| Long documents | Claude (200k context) |`,
          },
        ],
      },
      {
        title: "Building Sellable Prompt Products",
        lessons: [
          {
            title: "The 10 Niches That Sell: Building Your First Prompt Pack",
            duration: 35,
            content: `Not all prompt packs sell equally. This lesson gives you the 10 highest-demand niches on PromptBase and Gumroad, with a framework for building prompt packs in each.

**The 10 Best-Selling Prompt Niches**

**1. Social Media Content (Instagram, LinkedIn, Twitter)**
Every business needs content. AI helps them create it faster.

Best-selling examples:
- "30-Day LinkedIn Content Calendar Generator" — $15-39
- "Instagram Caption That Drives Sales" — $9-19
- "Twitter Thread Frameworks for Thought Leaders" — $15-29

**2. Email Marketing**
Email converts better than any other channel. Marketers pay for prompts that write high-converting emails.

**3. E-commerce Product Descriptions**
Shopify sellers need hundreds of product descriptions. A prompt that writes SEO-optimized descriptions in a specific style is extremely valuable.

**4. Real Estate Listing Copy**
Real estate agents need to write compelling listings constantly. A prompt specifically designed for real estate listings (with the right prompts for luxury, commercial, residential) sells well.

**5. Job Applications and Career**
Resume optimization, cover letter writing, LinkedIn profile optimization — job seekers will pay for prompts that help them get hired.

**6. Business Plans and Pitch Decks**
Entrepreneurs need these but often can't afford expensive consultants.

**7. Code Generation and Documentation**
For developers who want to speed up their workflow.

**8. Legal Document Templates**
Simple contracts, NDAs, terms of service (always with disclaimer that these aren't legal advice).

**9. Fitness and Nutrition Plans**
Personalized workout and meal plan generators.

**10. Niche Industry Prompts**
Pick any industry — restaurant menus, therapy notes, medical summaries (non-clinical), automotive descriptions — and build the best prompt pack for that niche.

**Building Your First Pack**

Structure a prompt pack as:
- 10-20 related prompts on a single topic
- PDF format with instructions
- Each prompt clearly labeled with when and how to use it
- Bonus: Example outputs showing what the prompt produces

Pricing: $9-$49 depending on niche and pack size.`,
          },
          {
            title: "Selling on Gumroad and PromptBase: $5k/Month Case Study",
            duration: 30,
            content: `Let's look at exactly how a real prompt seller grew to $5,000/month and build your own launch strategy from their playbook.

**The Case Study: "PromptMaster Alex"**

Background: Alex was a marketing copywriter who started selling prompts in early 2023. After 8 months, his prompt business generates $5,200-6,800/month passively.

*Month 1-2: Finding the Niche*
Alex noticed that small e-commerce businesses were constantly asking for help with product descriptions. He built a 20-prompt pack for Shopify store owners.

Launch: Listed on Gumroad for $29. First 30 days: 12 sales = $348. Not life-changing, but validation.

*Month 3-4: Expanding the Library*
He built 5 more packs in adjacent niches: email sequences for e-commerce, Instagram content for online stores, Facebook ad copy for physical products.

At this point, his Gumroad store had 6 products priced $19-49. Monthly revenue: $1,200-1,800.

*Month 5-6: PromptBase + Twitter Distribution*
He listed his top 3 packs on PromptBase (which has its own audience). He also started posting on Twitter about prompt engineering, always ending posts with "Link to my prompt packs in bio."

Monthly revenue: $2,800-3,500.

*Month 7-8: The Bundle Strategy*
He packaged all 6 packs into a "Complete E-Commerce AI Toolkit" for $149. Buyers who saw the individual products at $19-49 viewed the bundle as exceptional value.

The bundle now generates 40% of his monthly revenue.

**Your 90-Day Launch Plan**

- Week 1-2: Research top-selling prompts on PromptBase. Pick your niche.
- Week 3-4: Build your first prompt pack (10-15 prompts, PDF format)
- Week 5: List on Gumroad + PromptBase. Set price at $19.
- Week 6-8: Post on Twitter about the topic. Start building an audience.
- Week 9-12: Build 2-3 more packs. Create bundle. Raise prices on proven packs.

**The Math**

At $2,500/month in Gumroad sales:
- 50 sales at $49/month, or
- 125 sales at $19/month, or
- Mix of both

Achievable within 4-6 months of consistent effort.`,
          },
        ],
      },
    ],
  },

  // =====================================================
  // COURSE 6: Web3 Freelancing: $100k Roadmap (EXISTING - IMPROVED)
  // =====================================================
  {
    title: "Web3 Freelancing: $100k Roadmap",
    slug: "web3-freelancing-100k",
    shortDesc: "Build a high-income Web3 freelancing business: the skills that pay, how to find clients, and how to scale to $100k.",
    description: `**Your Path to Six-Figure Web3 Freelance Income**

Web3 companies pay the highest freelance rates in the market — for skills that are more learnable than you think. This course maps your path from $0 to $100k/year in Web3 freelancing income.

**The Skills That Pay:**
- The 10 highest-paying Web3 skills ranked by hourly rate
- Which skills match your existing background
- The 30-day portfolio building strategy
- Open source contributions that build credibility fast

**Finding and Closing Clients:**
- Cold DM templates that actually get responses
- The free audit close that converts prospects
- Pricing your services at market rate (not undercutting)
- Building retainer relationships for predictable income

Whether you're a developer, writer, designer, or community manager, there's a highly-paid Web3 role that matches your existing skills. We'll show you exactly how to get there.`,
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    price: 89,
    originalPrice: 229,
    category: "Freelancing",
    level: "BEGINNER" as const,
    tags: ["Web3", "Freelancing", "Crypto", "Income", "Remote Work"],
    isFeatured: false,
    totalHours: 7,
    modules: [
      {
        title: "The Web3 Opportunity",
        lessons: [
          {
            title: "The 10 Highest-Paying Web3 Skills in 2024",
            duration: 32,
            isFree: true,
            content: `The Web3 industry has a massive talent gap. Demand for qualified professionals exceeds supply in almost every role. This shortage keeps rates high even as the market matures.

**The Top-Tier Skills ($150-500/hour)**

**1. Smart Contract Development (Solidity/Rust)**
The highest-paid technical skill in Web3. Senior Solidity developers command $150-300/hour as freelancers.

Learning path: 3-6 months of serious study. Resources: CryptoZombies (Solidity), Anchor Framework docs (Rust/Solana), Alchemy University (free).

**2. Smart Contract Auditing**
Security auditors review code for vulnerabilities. Protocol hacks cost millions — companies will pay $10k-100k+ for security audits.

Learning path: Deep Solidity knowledge + security focus. Resources: DeFiHackLabs, Damn Vulnerable DeFi.

**3. DeFi Protocol Development**
Building AMMs, lending protocols, yield optimizers. Smaller demand than general smart contract dev but even higher rates when you have a track record.

**The Mid-Tier Skills ($75-150/hour)**

**4. Technical Writing and Documentation**
Every protocol needs documentation. Technical writers who understand DeFi/NFTs command $75-150/hour because they're rare.

**5. Web3 Frontend Development**
React + Web3.js or ethers.js + wallet integration. Significantly higher rates than traditional web dev.

**6. Community Management (Senior)**
Running Discord servers, moderating, creating engagement programs for protocols. Senior CMs at major protocols can make $80-150k/year.

**7. Tokenomics Consulting**
Designing token economic systems. Usually project-based ($5k-50k per engagement).

**The Entry-Level but Growth Skills ($30-80/hour)**

**8. Content Writing/Social Media**
Writing blog posts, threads, and content for Web3 companies. Entry-level, but with expertise and a portfolio you can scale quickly.

**9. Graphic Design (Web3 Native)**
NFT art, protocol branding, UI mockups. Designers who understand the aesthetic are in demand.

**10. Data Analysis**
On-chain data analysis using tools like Dune Analytics or Nansen. Growing demand.`,
          },
          {
            title: "Building Your Portfolio Fast",
            duration: 28,
            content: `The fastest path to Web3 freelance clients is a credible portfolio. You don't need years of experience — you need proof that you can do the work.

**The Portfolio-First Mindset**

Traditional freelancers build a portfolio after getting their first clients. In Web3, where everyone is remote and reputation-based, you build the portfolio FIRST to get the clients.

**Strategy 1: Open Source Contributions**

Contributing to open-source Web3 projects is the fastest credibility builder:
1. Find a protocol you respect on GitHub
2. Look for "good first issue" tags
3. Submit a PR (pull request) to fix it
4. After 3-5 merged PRs, you have demonstrated code quality to any employer

For non-technical skills: contribute documentation, translations, or community resources.

**Strategy 2: Build a Public Project**

Build something and document it publicly:
- Technical: A simple DeFi protocol on testnet, an NFT minting site, a wallet dashboard
- Non-technical: A comprehensive research report on a protocol, a community guide

Post about it on Twitter. Share in Web3 Discord communities. This demonstrates initiative and builds your reputation.

**Strategy 3: The Spec Work Approach**

Pick a Web3 company you want to work with. Do a sample of the work (unpaid) and share it with them:
- Writer: Write a blog post about their protocol as if you were their content writer
- Designer: Redesign one page of their app and share the mockup
- CM: Create a sample community event calendar and post format guide

Lead with the work, not the pitch. "Here's what I made for you" is 10x more compelling than "here's what I could do for you."

**Your Portfolio in 30 Days**

Week 1: Define your skill niche. Study the landscape.
Week 2: Build or contribute one project. Document it thoroughly.
Week 3: Write a case study of what you built and what you learned.
Week 4: Publish everything to a personal website and/or Twitter thread.

By day 30, you have: a project, a case study, and a public presence. That's a portfolio.`,
          },
        ],
      },
      {
        title: "Getting Clients",
        lessons: [
          {
            title: "Cold DM Templates That Actually Get Responses",
            duration: 25,
            content: `Cold outreach in Web3 is different from traditional industries. The community is more transparent, more open to talent, and less formal. Use this to your advantage.

**The Twitter/X Strategy**

Web3 founders and decision-makers are extremely active on Twitter. This is your primary hunting ground.

Who to target:
- Founders of early-stage Web3 protocols (sub-50 employees)
- CTOs and lead developers
- Marketing leads at mid-stage protocols
- Community managers at large protocols (for CM sub-contracting)

Finding targets:
1. Follow the feeds of known Web3 VCs (a16z crypto, Multicoin, Paradigm)
2. Watch who they retweet and invest in
3. Look at the team pages of protocols you admire

**The Perfect DM Formula**

Template structure:
1. Compliment something SPECIFIC (shows you did your homework)
2. Mention a problem you noticed + solution you can provide
3. Proof: One specific example of relevant work
4. The ask: Small, low-commitment

---

Example for a content writer targeting a DeFi protocol:

"Hey [Name], your thread on [specific topic] was the clearest explanation of [concept] I've seen — you definitely have a gift for making complex ideas accessible.

I noticed your docs haven't been updated since [date], and some of the new features aren't reflected there. I wrote a similar guide for [related protocol] that resulted in a 23% reduction in support tickets — [link to example].

Would it be useful to do a quick audit of your current docs and show you where the gaps are? Happy to do this for free — just want to see if there's a fit."

---

Key elements:
- Specific compliment (not "I love your work")
- Problem they have (not "I can write content")
- Proof with a number (reduction in support tickets)
- Low-commitment ask (free audit, not "hire me")

**Response Rates**

Well-targeted DMs in Web3 convert at 15-30%. If you're getting less than 10% responses, adjust your targeting or messaging.

Send 10 DMs per day for 30 days = 300 DMs = 45-90 responses = 10-20 calls = 3-5 clients.`,
          },
          {
            title: "Pricing Your Services and Scaling to $100k",
            duration: 30,
            content: `Most Web3 freelancers underprice by 50-100%. This lesson resets your pricing psychology and gives you the path to $100k/year.

**Market Rates for Web3 Freelancers (2024)**

Content/Writing:
- Blog posts: $300-800 per post
- Research reports: $1,000-5,000 per report
- Twitter thread strategy + execution: $2,000-5,000/month retainer

Community Management:
- Part-time CM: $2,000-4,000/month
- Full-time CM: $5,000-10,000/month

Development:
- Smart contract development: $150-300/hour
- Frontend Web3 dev: $80-150/hour
- Full-stack dApp: $100-200/hour

Design:
- Brand identity: $3,000-15,000 per project
- UI/UX design: $75-150/hour

**Pricing Strategy: Start at the Top of the Range**

Most beginners price at the bottom to be competitive. This is wrong. Price at the market rate for your skill level.

Reasons:
1. High prices signal quality. Low prices signal desperation.
2. Web3 companies are flush with funding and expect to pay for talent.
3. Clients who negotiate hard are often the worst to work with.

If you have a portfolio, don't undercut yourself.

**The $100k Math**

$100k/year = $8,333/month

Ways to get there:
- 2 retainer clients at $4,000/month each (CM or writing)
- 1 $8,333/month client (senior developer)
- Mix: 1 retainer at $5,000 + project work averaging $3,333/month

**Scaling Beyond $100k**

Once you have 2-3 clients:
1. Document your processes as if training someone else
2. Hire a junior to handle lower-level tasks
3. Move yourself to strategy/oversight roles only
4. Take on more clients with your freed time
5. Eventually transition from "freelancer" to "Web3 agency"

This is how most $200-500k/year Web3 agencies start.`,
          },
        ],
      },
    ],
  },

  // =====================================================
  // COURSE 7: Twitter/X Growth to $10k/Month (EXISTING - IMPROVED)
  // =====================================================
  {
    title: "Twitter/X Growth to $10k/Month",
    slug: "twitter-growth-10k",
    shortDesc: "Build a profitable Twitter/X audience from scratch: viral formulas, monetization strategies, and a real $10k/month breakdown.",
    description: `**Build an Audience That Pays You Every Month**

Twitter/X is still the most powerful platform for building authority, finding clients, and selling digital products — especially in business, tech, and finance niches.

**Audience Building Fundamentals:**
- Niche selection that determines 80% of your success
- The 5 tweet categories that consistently perform
- Hook formulas that stop the scroll
- Thread structures that gain followers

**Monetization Strategies:**
- Digital products that sell to your audience
- Consulting and services at premium rates
- Affiliate marketing done authentically
- Brand deals and sponsorships
- Newsletter monetization

This isn't about chasing viral moments. It's about building a systematic, monetizable Twitter presence that generates income from multiple streams.`,
    thumbnail: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&q=80",
    price: 59,
    originalPrice: 149,
    category: "Social Media",
    level: "BEGINNER" as const,
    tags: ["Twitter", "Social Media", "Monetization", "Content Creation", "Income"],
    isFeatured: false,
    totalHours: 6,
    modules: [
      {
        title: "Foundation and Strategy",
        lessons: [
          {
            title: "Niche Selection: The Decision That Determines Everything",
            duration: 28,
            isFree: true,
            content: `Your niche selection on Twitter is 80% of your success. The right niche gives you an audience who buys from you, shares your content, and refers you to clients. The wrong niche is a dead end no matter how good your content is.

**The Three Niche Requirements**

For a Twitter niche to be monetizable, it needs:

**1. Passionate Community**
The niche must have people who talk about it constantly. Finance Twitter, Crypto Twitter, Business Twitter, Fitness Twitter, Developer Twitter — these are all passionate communities where people engage deeply.

Test: Search your potential niche on Twitter. Are there active conversations? Are posts getting likes and replies from real people?

**2. Buyer Intent**
The audience must be willing to spend money on solutions to their problems.

High-buyer-intent niches: Making money, investing, marketing, software/tech, health/fitness, relationships
Low-buyer-intent niches: Entertainment, humor, celebrity gossip (large audiences, low conversion)

**3. Alignment with Your Expertise**

You don't need to be a world-class expert. You need to be 10 steps ahead of your audience. If you know more than 90% of people about a subject, you can build an audience in it.

**The 10 Best Niches for Monetization**

1. Crypto/Web3 trading and investing
2. AI and automation tools for businesses
3. SaaS growth and startup advice
4. Copywriting and marketing
5. Real estate investing
6. Fitness and nutrition (with a specific angle)
7. Personal finance and investing
8. Software development careers
9. Freelancing and consulting
10. E-commerce and dropshipping

**Your Niche Formula**

The most successful Twitter accounts combine:
[Specific skill] + [Specific audience] + [Specific outcome]

Example: "I help [SaaS founders] with [growth marketing] to [reach their first 1,000 customers]"

This is better than "I tweet about marketing." It signals exactly who you serve and what they'll get from following you.`,
          },
          {
            title: "Viral Tweet Formulas That Consistently Perform",
            duration: 32,
            content: `The best Twitter creators don't guess what will go viral — they understand the patterns and execute against them consistently.

**The Five Tweet Categories That Perform**

**1. Insight Tweets**
Share a non-obvious truth about your niche. These spread because people want to share knowledge that makes them look smart.

Formula: "Counterintuitive observation about [your niche] that most people get wrong: [2-3 sentence explanation]"

Example: "Most people think more followers = more money. Wrong. I make 10x more per follower than accounts with 10x my following. Here's why engagement rate matters more than size:"

**2. Story Tweets (Threads)**
Personal narrative or case study format. Shows transformation.

Formula: "I [did something] and went from [bad state] to [good state]. Here's exactly what I did:"

Then bullet points or numbered steps for the thread body.

**3. List Tweets**
"X things I wish I knew before [thing]" or "X tools that will save you [Y hours/dollars]"

High shareability because people can quickly scan and find value.

**4. Opinion Tweets**
Take a clear, defensible stance on something in your niche. Be willing to be disagreed with.

"Hot take: [strong opinion that might get pushback]" — then support with evidence.

**5. How-To Threads**
Step-by-step process for something valuable in your niche. These drive followers because they're useful enough to save and share.

**The Anatomy of a High-Performing Tweet**

1. Hook (first line): The only thing that determines if people read the rest
2. Body: Value delivery — insight, steps, data
3. CTA: "Follow for daily [niche] content" or "Retweet if this helped"

**Hook Formulas That Work**

- "The [topic] strategy that [result] in [timeframe]:"
- "Nobody talks about [counterintuitive insight]"
- "I made [specific mistake]. Here's how to avoid it:"
- "[Number] [topic] frameworks used by [impressive group]:"
- "If I had to start [niche] over with [constraint], this is what I'd do:"

**Post 3x per day:**
- Morning: Opinion or insight tweet (standalone)
- Midday: Educational thread (5-10 tweets)
- Evening: Engagement tweet (question or poll)`,
          },
        ],
      },
      {
        title: "Monetization",
        lessons: [
          {
            title: "The $10k Month Breakdown: Multiple Revenue Streams",
            duration: 35,
            content: `At 10,000-20,000 engaged Twitter followers, a $10k/month is absolutely achievable. Here's exactly how it's done across multiple income streams.

**Revenue Stream 1: Digital Products ($2,000-5,000/month)**

Your Twitter audience trusts you. They'll buy products that solve their problems in your niche.

Product types that sell best on Twitter:
- Templates and frameworks ($29-99 each)
- Mini-courses ($49-149 each)
- Ebooks and playbooks ($19-49 each)
- Notion dashboards ($19-79 each)

To launch your first product:
1. Find the most common question you get asked in comments/DMs
2. Create the definitive answer to that question as a product
3. Pre-announce it to your audience ("Working on something for [audience pain point]—interested?")
4. Soft launch at 20-30% discount to early buyers
5. Full launch with testimonials from early buyers

Realistic earnings: 20 people at $49/month = $980. 50 at $49 = $2,450. 100 at $49 = $4,900.

**Revenue Stream 2: Consulting and Services ($2,000-4,000/month)**

Your expertise + Twitter authority = high-value consulting at premium rates.

At 5,000+ followers in a business niche, you can charge:
- $200-500/hour for consulting calls
- $1,000-3,000/month for ongoing advisory retainers
- $500-2,000 for workshops

Add a simple booking link (Cal.com or Calendly) to your bio and mention "I have 2 consulting slots open" once a month.

**Revenue Stream 3: Affiliate Marketing ($500-2,000/month)**

Recommend tools your audience already uses or would benefit from. Earn 20-30% commission.

Top affiliate programs for Twitter creators:
- SaaS tools (most have affiliate programs)
- Courses and info products (often 30-50% commission)
- Books (Amazon Associates)

Key rule: Only promote what you genuinely use and believe in. One bad recommendation tanks your trust.

**Revenue Stream 4: Brand Deals/Sponsorships ($1,000-3,000/month)**

At 10,000+ followers in a business niche, brands will pay $500-2,000 per sponsored tweet.

Platforms to find sponsorships:
- Creator.co
- Passionfroot
- Newsletter sponsorships via Beehiiv Boosts

**Revenue Stream 5: Newsletter ($500-2,000/month)**

Capture your Twitter audience into an email list (Beehiiv or Kit). Monetize through:
- Paid newsletter tier ($10-20/month/subscriber)
- Newsletter sponsorships
- Product launches to email list

The $10k breakdown at 15k followers:
- Digital products: $3,000
- Consulting: $3,000
- Affiliate: $1,500
- Brand deals: $1,500
- Newsletter: $1,000
Total: $10,000`,
          },
        ],
      },
    ],
  },

  // =====================================================
  // COURSE 8: Dropshipping Mastery (EXISTING - IMPROVED)
  // =====================================================
  {
    title: "Dropshipping Mastery: $10k/Month Blueprint",
    slug: "dropshipping-mastery",
    shortDesc: "Find winning products, build a Shopify store, run profitable ads, and scale to $10k/month with dropshipping.",
    description: `**Build a Profitable E-Commerce Business Without Inventory**

Dropshipping in 2024 is more competitive than ever — but it's also more profitable for those who execute correctly. This course teaches the real dropshipping playbook: product research that finds winners, Shopify setup that converts, and advertising strategies that scale.

**Product Research Mastery:**
- Finding winning products with AutoDS and Minea
- The 6-point framework for evaluating products
- TikTok Creative Center for trending product discovery
- Supplier evaluation: Zendrop vs CJ Dropshipping

**Store Building and Scaling:**
- Shopify store setup optimized for conversions
- Product page elements that drive purchases
- Facebook and TikTok ads that scale profitably
- Reading your numbers and calculating break-even ROAS

Skip the generic advice and learn what's working in the current market.`,
    thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    price: 129,
    originalPrice: 299,
    category: "E-Commerce",
    level: "INTERMEDIATE" as const,
    tags: ["Dropshipping", "E-Commerce", "Shopify", "Facebook Ads", "Income"],
    isFeatured: false,
    totalHours: 12,
    modules: [
      {
        title: "Product Research",
        lessons: [
          {
            title: "Finding Winning Products with AutoDS and Minea",
            duration: 38,
            isFree: true,
            content: `Product research is the foundation of successful dropshipping. One winning product can build a $10k/month store. Most people waste months testing products that never had a chance.

**The Winning Product Framework**

A dropshipping product needs to check most of these boxes:

1. **Solves a specific problem** — not just cool-looking, but solves a real pain
2. **Demonstrates well in video** — essential for TikTok/Facebook video ads
3. **Has a "wow factor"** — someone watching the ad thinks "I need that"
4. **Not easily found in local stores** — if it's at Walmart, customers will just buy it there
5. **Profit margin of 3x or higher** — product costs $15, you sell for $45+
6. **Not fragile** — shipping electronics and glass = constant refunds

**Using Minea**

Minea is a product research tool that scrapes winning ads from Facebook, TikTok, and Pinterest.

How to use it:
1. Go to minea.com → TikTok Ads or Facebook Ads section
2. Filter by: Posted in last 30 days, Sort by "Most Liked"
3. Look for ads with high likes, shares, and comments
4. Click to see the ad, the landing page, and estimates on ad spend

What you're looking for:
- High engagement on the ad video
- Comments saying "Where do I get this?!"
- Product that's unique but clearly useful
- Competitor stores running the same product profitably

**Using AutoDS**

AutoDS is a product automation tool that also has a product research marketplace.

AutoDS Product Research:
1. Browse their "Winning Products" section
2. Filter by category, shipping time, price range
3. Every product shows: AliExpress price, suggested retail price, estimated margin

For each product you find interesting:
1. Check AliExpress reviews and supplier reliability
2. Search the product on Facebook Ad Library (free tool) to see if competitors are running ads
3. Search TikTok for organic videos of the product — high organic views indicate demand

**TikTok Creative Center**

Go to ads.tiktok.com → Creative Center → Top Ads. Filter by product category, region, and time period. This shows you what's currently working on TikTok — often before it's been discovered by other dropshippers.`,
          },
          {
            title: "Evaluating Suppliers: Zendrop vs CJ Dropshipping",
            duration: 28,
            content: `Your supplier is your business partner. A bad supplier means slow shipping, bad quality, and angry customers. This lesson covers how to evaluate and work with the two best suppliers for dropshipping.

**Why Supplier Choice is Critical**

Your store's reviews are determined largely by:
1. Product quality
2. Shipping speed
3. Packaging

Your supplier controls all three. The cheapest supplier is almost never the best choice.

**Zendrop**

Zendrop is the premium dropshipping supplier designed specifically for Shopify stores. Key advantages:

*Speed*: US-based fulfillment center means 3-7 day shipping for US customers (vs. 15-30 days from China)
*Quality Control*: Zendrop inspects products before shipping
*Custom Branding*: Can add your logo to packaging for brand building
*Customer Service*: English-speaking support team

Pricing: $49-79/month for pro features. Worth every penny for serious stores.

Best for: US-focused stores, higher-ticket products, building a real brand

**CJ Dropshipping**

CJ is more affordable and has a massive product catalog. Good for testing products before committing to Zendrop's pricing.

Key features:
- Free to use (no monthly fee)
- Products ship from China or US warehouses (US is faster/more expensive)
- Can negotiate pricing for high-volume orders
- Good for unique/niche products not on Zendrop

Best for: Testing new products, international markets, lower-budget starts

**The Hybrid Strategy**

Start with CJ to test products. When you find a winner (making $300+/day consistently), switch that product to Zendrop for faster shipping and better customer experience.

**Evaluating Any Supplier**

Before going live, order a test unit yourself:
1. Place an order on your own store
2. See the real shipping time
3. Check the actual product quality
4. Review the packaging

Would you be happy receiving this? If not, your customers won't be either.`,
          },
        ],
      },
      {
        title: "Store Setup and Ads",
        lessons: [
          {
            title: "Building a Converting Shopify Store",
            duration: 40,
            content: `A beautiful store that doesn't convert is useless. This lesson focuses on the specific store elements that drive purchases.

**The Minimal Viable Store**

Don't over-build before you validate. Your initial store needs:
1. Professional theme (Dawn or Sense from Shopify are free and convert well)
2. One focus product (not 50 products — confuse and lose)
3. Polished product page
4. Basic trust signals

**The Converting Product Page**

This is the most important page in your store. Elements that convert:

*Above the Fold (before scrolling)*:
- High-quality product images (GIFs/videos perform better)
- Clear product name and benefit statement
- Price with original price crossed out
- "Add to Cart" button (large, high-contrast color)
- Shipping time and free shipping notice

*Social Proof Section*:
- Star rating (4.5-4.9 stars looks authentic)
- Review count (ideally 100+)
- Featured reviews with specific outcomes

*Product Benefits*:
- 3-5 benefit bullets (what it does for the customer, not features)
- Problem → Solution framing

*Trust Badges*:
- Secure checkout
- 30-day return guarantee
- USA shipping (if applicable)

*FAQ Section*:
Answer the objections before they're asked:
- How long is shipping?
- What if I don't like it?
- Is this legit?

**Converting Copy Formula**

Instead of: "High-quality stainless steel water bottle with 3 lid options"
Write: "Stop spending $5 every day on coffee shop drinks. This insulated bottle keeps your drinks hot for 12 hours — so you drink what you want, when you want it."

Lead with the outcome, not the specs.

**Required Apps**

- Vitals: Reviews, upsells, urgency timers (all in one, $30/month)
- Loox or Judge.me: Photo reviews
- Privy or Klaviyo: Email capture and marketing

**Checkout Optimization**

Enable "Express checkout" on your Shopify store. This one change typically increases conversion rates by 20-30% because buyers can pay with Apple Pay/Google Pay in seconds.`,
          },
          {
            title: "Facebook Ads That Scale: Creative, Targeting, and Budget",
            duration: 45,
            content: `Facebook ads are still the highest-leverage customer acquisition channel for dropshipping. Mastering them is the skill that determines whether your store generates $1k or $10k/month.

**The Testing Phase**

Never skip testing. Every successful Facebook ad campaign starts with finding your winning creative.

Week 1 Testing Setup:
- Budget: $20-30/day
- Ad Sets: 5 different ad sets testing different audiences
- Creatives: 3 different video ads per ad set
- Goal: Find which combination produces purchases at profitable cost

What you're looking for:
- Cost per click (CPC) under $1.50
- Click-through rate (CTR) above 2%
- Cost per purchase under 30% of product price (for 3x markup)

**Creative Strategy**

Video beats image in most categories. Your product video should:
1. Hook within 3 seconds (problem hook: "If you have [problem]...")
2. Show the product solving that problem (demonstration)
3. Show testimonial or social proof
4. Clear CTA ("Get yours at [store] - link in bio")

Where to get video creative:
1. Film it yourself (phone camera is fine for testing)
2. Order from the supplier and film an unboxing
3. Use UGC creators on platforms like Billo.app
4. Buy pre-made creative for common products on Viral Ecom Adz

**The Three-Audience Strategy**

Test these three audience types simultaneously:

1. **Interest Targeting**: Facebook interests related to your product
2. **Lookalike Audiences (LAL)**: Upload your customer list → Facebook finds similar people (best used after 50+ purchases)
3. **Broad Targeting**: No interests, just age and gender → Facebook's AI finds buyers on its own (often the best performer for winning products)

**Scaling What Works**

When you find a winning ad set (5+ purchases at profitable cost):
- Duplicate it and increase budget by 20-30% every 2-3 days
- Do not touch the original winning ad set
- Test new creatives based on the winning angle

The "Don't Touch the Winner" rule: Many beginners kill their winning ad sets by editing them. Edits reset Facebook's learning phase.

**Reading Your Numbers**

The only metrics that matter:
- ROAS (Return on Ad Spend): You want 2.5x+ consistently
- Profit per order: (Revenue - Product cost - Shipping - Ad spend) / Number of orders
- Break-even ROAS: [Price] / ([Price] - [Product cost] - [Shipping cost])

If product sells for $45, costs $12, ships for $5: Break-even ROAS = 45/(45-12-5) = 1.6x. Any ROAS above 1.6x is profitable.`,
          },
        ],
      },
    ],
  },

  // =====================================================
  // COURSE 9: Print on Demand: $5k/Month Passive (EXISTING - IMPROVED)
  // =====================================================
  {
    title: "Print on Demand: $5k/Month Passive",
    slug: "print-on-demand-passive",
    shortDesc: "Design products in Canva, list on Etsy and Redbubble, and build a passive income stream with print on demand.",
    description: `**Build True Passive Income with Zero Inventory**

Print on demand is one of the most accessible passive income businesses available today. You design products once, list them on multiple platforms, and earn royalties every time someone buys — without ever touching inventory or shipping.

**Design Without Being a Designer:**
- Canva setup optimized for POD products
- The 5 design styles that convert on Etsy
- Font pairing and color principles for shirts
- Using free assets to create professional designs

**Platform and SEO Mastery:**
- Niche research: Dog breeds, hobbies, and professions that sell
- Etsy SEO that gets your products found
- Printful vs Printify comparison
- Scaling to multiple platforms for maximum reach

This course gives you the complete POD playbook from first design to $5k/month in passive royalties.`,
    thumbnail: "https://images.unsplash.com/photo-1503602642458-232111445657?w=800&q=80",
    price: 59,
    originalPrice: 149,
    category: "E-Commerce",
    level: "BEGINNER" as const,
    tags: ["Print on Demand", "Passive Income", "Etsy", "E-Commerce", "Design"],
    isFeatured: false,
    totalHours: 7,
    modules: [
      {
        title: "POD Fundamentals",
        lessons: [
          {
            title: "The POD Business Model: How It Really Works",
            duration: 22,
            isFree: true,
            content: `Print on demand (POD) is a business model where you design products, list them for sale, and when someone orders — the print provider prints, packages, and ships the order automatically. You earn the profit margin between what the customer pays and what the print provider charges.

**The Complete POD Stack**

*Design Tool*: Canva (free), Adobe Illustrator, or Photoshop
*Print Provider*: Printful, Printify, Gooten (they handle printing and shipping)
*Sales Channels*: Etsy, Redbubble, Amazon Merch, your own Shopify store

The Flow:
1. You design a t-shirt graphic in Canva (30 minutes)
2. Upload to Printify, set your price ($29.99)
3. List it on Etsy with SEO-optimized title and description
4. Customer orders → Printify auto-fulfills → You receive the margin ($12-18 on a $30 shirt)

**Economics of Print on Demand**

A basic t-shirt example:
- Printify fulfillment cost: $13.50 (including base product and printing)
- Your Etsy listing price: $29.99
- Etsy fees: ~15% = $4.50
- Your profit per sale: $29.99 - $13.50 - $4.50 = **$12.00 per shirt**

At 10 shirts sold/day (achievable with a good niche and SEO): $120/day = $3,600/month
At 15 shirts/day: $5,400/month

This is why people love POD — the margin is real and the business scales without inventory.

**Advantages of POD**

1. Zero inventory (no upfront stock to buy)
2. Zero shipping (handled by the provider)
3. Unlimited products (list as many designs as you want)
4. True passive income (designs earn while you sleep)
5. Low startup cost ($0-200 to get started)

**Disadvantages (Be Honest)**

1. Lower margins than private label
2. You can't control shipping speed
3. Competitive — you need SEO and design quality to stand out
4. Some niches are saturated`,
          },
          {
            title: "Niche Research: Dog Breeds, Hobbies, and Professions That Sell",
            duration: 30,
            content: `The secret to POD success is niche selection. General designs compete with thousands of similar products. Specific niche designs compete with far fewer sellers while targeting buyers who are passionate and willing to spend.

**The Best POD Niches**

**Niche Type 1: Pet Breeds**
Dog and cat breed-specific designs are among the highest-converting POD products. Why? Pet owners are OBSESSED with their specific breed.

Best-selling breeds:
- Golden Retriever, Labrador, German Shepherd (massive audiences)
- French Bulldog, Dachshund, Shih Tzu (highly passionate communities)
- Maine Coon, British Shorthair (cats)

Design approach: "Golden Retriever Mom" with cute design, "My Dachshund is My Therapist", breed silhouettes with minimalist style.

**Niche Type 2: Hobbies**
People spend heavily on their hobbies and love merch that represents their passion.

High-converting hobby niches:
- Fishing ("Reel Therapy", "Fish Don't Care How Bad My Day Was")
- Golf (huge buyer base, high disposable income)
- Hiking ("I Hike Because Punching People is Frowned Upon")
- Gardening ("Gardening: Cheaper Than Therapy")
- CrossFit/weightlifting

**Niche Type 3: Professions**
Every professional identity is a potential niche: nurses, teachers, firefighters, lawyers, engineers.

High performers:
- Nurses and healthcare workers (huge community, high gift-giving occasions)
- Teachers ("Teaching is a Work of Heart")
- Veterinarians

**Finding What's Actually Selling (Research Method)**

1. Go to Etsy
2. Search "[breed/hobby/profession] shirt"
3. Sort by "Bestseller" or look for listings with 500+ reviews
4. Note what designs, phrases, and styles perform
5. Create something different but in the same proven territory

This is not copying — it's market validation. You're confirming demand before designing.`,
          },
        ],
      },
      {
        title: "Design and Platform Setup",
        lessons: [
          {
            title: "Canva for POD: Design Principles That Sell",
            duration: 38,
            content: `You don't need to be a designer to create successful POD products. You need to understand what buyers want and execute it competently with the tools available.

**Canva Setup for POD**

Canva Pro ($13/month) unlocks:
- More fonts (crucial for text-heavy t-shirt designs)
- Background remover (for mockups)
- Brand kit
- Unlimited storage

For POD specifically, create designs at:
- T-shirts: 4500 x 5400 pixels (300 DPI), PNG with transparent background
- Mugs: 3000 x 2000 pixels, PNG
- Tote bags: 3300 x 3300 pixels, PNG

**The Five Design Styles That Convert on Etsy**

**1. Minimalist Text Designs**
Clean font, simple message, small accent graphic.

Example: "[Profession] Mode On" in large font with a coffee cup icon.

These are the easiest to design and often the best sellers because they're readable even as thumbnails.

**2. Illustrated Character Designs**
Cartoon or illustrated animal/person with niche-specific elements.

Example: Illustrated golden retriever wearing sunglasses with "Golden Retriever Gang" text.

**3. Vintage/Retro Badges**
Badge or stamp design with vintage color palette (aged look).

Works especially well for hobby niches (fishing, camping, hiking).

**4. Floral/Botanical Frame**
Decorative frame with niche text inside.

Popular for professions: "World's Best Teacher" surrounded by flowers.

**5. Bold Statement Typography**
Large, impactful text with a strong message or quote.

**Font Principles**

- Use maximum 2 fonts per design
- Pair a serif (formal) with a sans-serif (modern)
- Or pair a script (decorative) with a clean sans-serif
- Ensure legibility at small sizes

**Color Principles for Shirts**

Your designs will print on many shirt colors. Design with:
- Dark designs: work on light shirts
- Light designs: work on dark shirts
- High contrast is always better

Test your design on both white and black background in Canva before submitting to Printful/Printify.

**Free Assets in Canva**

Canva has millions of free graphic elements:
- Icons and illustrations
- Photos
- Frames and shapes

Search your niche in the elements section and build from what you find.`,
          },
          {
            title: "Etsy SEO Mastery: Getting Found by Buyers",
            duration: 32,
            content: `Great designs with no SEO will not be found. Mediocre designs with great SEO will outsell great designs with no SEO. This is the most practical lesson in the course.

**How Etsy Search Works**

Etsy's algorithm matches buyer search queries to product listings based on:
1. Relevance (do your tags and title match what they searched?)
2. Listing quality score (how many clicks, saves, and purchases does your listing get?)
3. Customer experience (your reviews and shipping speed)
4. Recency (newer listings sometimes get a temporary boost)

**The Perfect Etsy Title**

Bad title: "Cute Dog Shirt Funny Tee"
Good title: "Golden Retriever Mom Shirt - Dog Lover Gift for Women - Golden Retriever Owner TShirt - Dog Mom Shirt Gift"

Why the good title works:
- Contains the most specific search term first ("Golden Retriever Mom Shirt")
- Includes buyer intent keywords ("Gift for Women", "Owner")
- Separated by dashes for readability
- Contains multiple long-tail keyword variations

**Finding Your Keywords (Free Method)**

1. Go to Etsy search
2. Type the beginning of your niche (e.g., "golden retriever mom")
3. Look at Etsy's autocomplete suggestions — these are real buyer searches
4. Use those exact phrases in your title and tags

**Tags (The Hidden SEO Power)**

You get 13 tags per listing. Use all 13. Each tag can be a phrase.

For a Golden Retriever Mom shirt:
- golden retriever mom shirt
- dog mom gift
- golden retriever owner
- dog lover gift women
- golden retriever lover tee
- funny dog shirt
- dog mom tshirt
... and so on

**Listing Description**

Etsy's algorithm doesn't read much description text, but buyers do.

Include:
1. Product details (fabric, sizes available)
2. Print quality note
3. Shipping timeframe
4. "Perfect gift for..." section (helps buyers self-identify)
5. Care instructions

**Photos: Your Second Most Important Factor**

Lifestyle photos outperform flat lays. Use Printify/Printful's free mockup generator, or use Placeit.net for lifestyle mockup photos.

Show:
- Front of the design on a model
- Detail shot of the design
- Lifestyle photo (in context)
- Size chart (reduces "wrong size" returns)`,
          },
        ],
      },
    ],
  },

  // =====================================================
  // COURSE 10: AI Automation Business (EXISTING - IMPROVED)
  // =====================================================
  {
    title: "AI Automation Business: $0 to $10k",
    slug: "ai-automation-business",
    shortDesc: "Build an AI automation agency from zero: master the best AI tools, build automated workflows, and sign your first clients.",
    description: `**Launch Your Own AI Automation Agency**

The AI automation industry is exploding. Businesses are paying $3,000-15,000/month for AI systems that save them time and money — and most of them have no idea how to build these systems themselves.

**Master the Tool Stack:**
- The 10 AI tools that power a $10k/month agency
- Building automated workflows with Make.com
- Content generation systems that run on autopilot
- Customer support bots that handle 80% of tickets

**Build the Agency:**
- Finding your first AI automation clients
- Cold outreach templates that get responses
- Pricing productized services for recurring revenue
- Case study: $0 to $10k/month in 90 days

This course gives you the complete roadmap for building an AI automation agency from scratch.`,
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    price: 99,
    originalPrice: 249,
    category: "AI & Automation",
    level: "BEGINNER" as const,
    tags: ["AI", "Automation", "Agency", "Make.com", "Zapier"],
    isFeatured: true,
    totalHours: 9,
    modules: [
      {
        title: "The AI Tool Stack",
        lessons: [
          {
            title: "The 10 AI Tools That Power a $10k/Month Agency",
            duration: 35,
            isFree: true,
            content: `The AI tool landscape changes rapidly, but the core stack for an AI automation agency in 2024 is well-established. Mastering these 10 tools gives you the capability to serve a wide range of client needs.

**Category 1: Content Generation**

**ChatGPT (GPT-4 / GPT-4o)**
The backbone of most AI workflows. Best for:
- Long-form content (blog posts, reports, documentation)
- Coding tasks (Python scripts, API integrations)
- Data analysis with Code Interpreter
- Custom GPT creation for client-specific tools

API access unlocks the ability to automate at scale.

**Claude (Anthropic)**
Superior to GPT-4 for:
- Long document processing (200k context window)
- Nuanced writing tasks
- Reading and analyzing uploaded files
- Tasks requiring careful reasoning

**Gemini (Google)**
Free tier is surprisingly capable. Best for:
- Integration with Google Workspace (Docs, Sheets, Gmail)
- Real-time web search within prompts
- Multimodal tasks (text + image)

**Category 2: Image and Video Generation**

**Midjourney**
Industry standard for high-quality AI image generation. Used in:
- Marketing creative production
- Social media content
- Brand asset creation
- Concept visualization for clients

**Runway ML**
Leading video generation platform. Key for:
- AI video ads (huge demand from e-commerce clients)
- Video editing automation
- Product visualization videos

**ElevenLabs**
Best-in-class AI voice generation. Used for:
- Podcast production
- Video voiceovers
- Customer service voice bots

**Category 3: Automation Infrastructure**

**Make.com (formerly Integromat)**
Visual workflow automation. Connect APIs, automate repetitive tasks, build complex multi-step automations without code.

**Zapier**
More user-friendly, fewer features, higher price. Good for simple automations and clients who need to manage their own workflows.

**Python (Basic)**
Even basic Python skills let you build custom automations beyond what Make.com/Zapier can do. Not required to start, but valuable as you scale.

**The Entry Stack (Start Here)**

For your first 3 months, master:
1. ChatGPT/Claude for content
2. Midjourney for images
3. Make.com for automation
4. ElevenLabs for voice/video

These four tools can generate $10k/month in client revenue before you need anything else.`,
          },
          {
            title: "Building AI Workflows with Make.com",
            duration: 45,
            content: `Make.com is the infrastructure that turns one-time AI tasks into automated, scalable systems. This lesson walks you through building your first real workflows.

**Understanding Make.com Architecture**

A Make.com scenario (workflow) consists of:
- **Trigger**: What starts the workflow (new email, form submission, schedule, etc.)
- **Modules**: Actions that happen in sequence (HTTP request to AI API, sending email, updating spreadsheet)
- **Filters**: Conditions that determine if the workflow continues
- **Routers**: Split workflows into branches based on conditions

**Workflow #1: Automated Blog Post System**

This workflow generates a blog post from a keyword input:

Trigger: Form submission (client submits keyword + topic)
→ HTTP module: Call OpenAI API with prompt "Write a 1500-word blog post about [keyword], targeting [audience]"
→ Google Docs: Create new document with the response
→ Email module: Send document link to client

Value to client: $200-500 worth of content, created in 2 minutes.

How to build it:
1. Create Make.com account (free tier works)
2. Create new scenario
3. Add Typeform/Google Forms trigger
4. Add HTTP module → set up OpenAI API connection
5. Add Google Docs module → create document
6. Add Gmail module → send email with link

**Workflow #2: Social Media Content Machine**

This workflow generates a week of social media posts:

Trigger: Schedule (Monday 9am)
→ OpenAI: Generate 7 Instagram captions based on brand guidelines
→ OpenAI: Generate 7 LinkedIn posts from the same themes
→ Midjourney (via API): Generate 7 images for the Instagram posts
→ Google Sheets: Log all content with dates
→ Email: Send weekly content calendar to client

Value to client: 6-10 hours of content work automated, every week.

**Workflow #3: Customer Support Bot**

Trigger: New email to support address
→ GPT-4: Analyze email and categorize (refund, technical, shipping, general)
→ Router: Branch based on category
→ For refunds: GPT-4 generates empathetic refund response following policy
→ For technical: GPT-4 generates solution using product documentation
→ Gmail: Send response, CC human team member

This workflow handles 70-80% of support tickets automatically.

**Pricing Your Make.com Workflows**

Build once, sell the system:
- Simple workflows: $500-1,500 setup + $200-500/month maintenance
- Complex multi-workflow systems: $2,000-8,000 setup + $500-2,000/month

The maintenance retainer is your recurring revenue. It's how you build a stable income.`,
          },
        ],
      },
      {
        title: "Building Your Agency",
        lessons: [
          {
            title: "Finding Your First AI Automation Clients",
            duration: 32,
            content: `Getting your first client is the hardest part. After that, referrals and case studies make it progressively easier. This lesson gives you the exact outreach strategy.

**The Perfect Target Client**

The best AI automation clients have:
1. Repetitive, time-consuming tasks (content creation, data entry, customer service)
2. Revenue to pay for automation ($500k+ annual revenue is a good baseline)
3. Tech-openness (some founders resist "AI" due to fear or ignorance)
4. Pain (they're already spending too much time or money on a manual process)

Industries with highest AI automation demand:
- E-commerce (content, customer service, ad creative)
- Real estate (email follow-up, market reports, listing descriptions)
- Digital agencies (content, reports, client communication)
- Financial advisors (research, client communication)
- Healthcare practices (documentation, patient communication)

**Finding Clients: The 5 Channels**

**1. LinkedIn (Best for B2B)**
Search for operations managers, marketing directors, and founders at companies in your target industry.

Profile optimization first:
- Clear headline: "I help [industry] businesses automate [specific process] with AI → Save [X hours]/week"
- Detailed about section with your specific value proposition
- Portfolio or case study in the featured section

Outreach DM formula:
"I noticed you're [scaling/growing/posting content daily] — are you doing that manually? I recently helped [similar company] automate their [specific process] and saved them 20 hours/week. Would a quick 15-minute call be worth it to see if I could do the same for you?"

**2. Cold Email**

Find emails of decision-makers using Apollo.io or Hunter.io.

Subject line: "Cut your [specific task] time by 80%?"

Body: Short, specific, one example, one question.

**3. Referrals (After First Client)**

Ask every client: "Who do you know in [industry] who might benefit from this?"

Give them a referral incentive: one month free, or 20% of any deal they refer.

**4. Content Marketing**

Post on LinkedIn and Twitter about AI automation:
- "I automated [specific task] for a client in 3 days. Here's what I built:"
- "The AI workflow that saves my client 40 hours/month:"

This attracts inbound leads who are already sold on automation.

**5. Cold Call (Underused)**

Especially effective for local businesses. Call, introduce yourself, and offer a free 15-minute automation audit.

**The Free Audit Close**

"I'd like to offer you a free 15-minute AI automation audit. I'll look at your current workflow, identify the top 3 processes that could be automated, and give you a specific roadmap — no obligation, completely free."

Almost everyone says yes to free value. Use the audit to demonstrate expertise and close the paid engagement.`,
          },
          {
            title: "Case Study: $0 to $10k/Month in 90 Days",
            duration: 38,
            content: `This lesson walks through the real journey of building an AI automation agency from zero to $10k/month. Some numbers and details have been slightly adjusted for privacy, but the arc is accurate.

**Month 1: Foundation**

The founder (we'll call him David) was a marketing manager with no technical background. He took 3 weeks to master his initial tool stack:
- ChatGPT API (with basic Python scripting)
- Make.com (visual workflow builder)
- Midjourney (image generation)

His test project: Built a content generation workflow for his own LinkedIn account. In 4 hours, he built a system that generated 30 LinkedIn posts per month from a simple brief. He used this as his "portfolio."

First client: His former employer (a digital marketing agency). They hired him to automate their monthly client report generation.

Deal: $800 one-time + $300/month maintenance. Total Month 1: $1,100.

**Month 2: Systematizing**

With one client case study, David approached 20 similar agencies on LinkedIn. His message: "I just built a system that automated [former employer]'s monthly reports from 8 hours to 20 minutes. Would that be useful for your agency?"

Month 2 new clients: 3 agencies at $500-1,200/month each.

Month 2 revenue: $1,100 + $2,400 new = $3,500.

**Month 3: Expanding Services**

David identified that his agency clients all struggled with the same problem: creating social media content for multiple clients at scale. He built a social media automation package:

- Content brief intake form
- AI generates posts for all platforms
- Human review step built in
- Auto-scheduling via Buffer API

Package price: $2,000 setup + $800/month.

Two agencies purchased the package in Month 3.

Month 3 revenue: $3,500 recurring + $4,000 new setup fees + $1,600 new recurring = **$9,100**

**The $10k+ Foundation**

By Month 4, David's recurring revenue base was $7,200/month with minimal ongoing work. He spent his time:
- 2 hours/day: Client communication and iteration
- 3 hours/day: Sales and outreach
- 2 hours/day: Building new automation capabilities

By Month 6: 12 clients, $14,800/month recurring revenue.

**Your 90-Day Blueprint**

- Days 1-21: Build your tool expertise. Create 1-2 portfolio automations.
- Days 22-45: First outreach. Goal: 1 paid client.
- Days 46-70: Deliver excellent results. Get testimonial. Expand outreach.
- Days 71-90: Land 2 more clients. Raise your rates. Create a signature service package.

$10k is Month 3-4 realistic for someone who executes this plan seriously.`,
          },
        ],
      },
    ],
  },

  // =====================================================
  // NEW COURSE 11: AI Side Hustles: $5k/Month Blueprint
  // =====================================================
  {
    title: "AI Side Hustles: $5k/Month Blueprint",
    slug: "ai-side-hustles-5k",
    shortDesc: "Discover 12 proven AI-powered side hustles you can start this week and scale to $5k/month or more.",
    description: `**Turn AI Into Your Personal Money-Making Machine**

AI isn't just changing how we work — it's creating entirely new income opportunities for people who know how to leverage it. This course reveals 12 battle-tested AI side hustles that real people are using to generate $5,000+ per month, often working just 10-15 hours per week.

**What Makes This Different:**
- No fluff or theory — every hustle comes with step-by-step implementation
- Real income proof and case studies from people doing each hustle
- Tool recommendations and exact workflows you can copy
- Scaling strategies to go from $500 to $5,000/month

**The 12 Hustles You'll Master:**
From AI content agencies to automated Etsy stores, voice-over services to AI-powered research consulting — you'll learn which hustles match your skills, how to get started with minimal investment, and the exact path to scaling each one.

Whether you want passive income or a full-time AI business, this blueprint shows you how.`,
    thumbnail: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    price: 79,
    originalPrice: 199,
    category: "AI & Automation",
    level: "BEGINNER" as const,
    tags: ["AI", "Side Hustle", "Passive Income", "ChatGPT", "Automation"],
    isFeatured: true,
    totalHours: 8,
    modules: [
      {
        title: "High-Income AI Hustles",
        lessons: [
          {
            title: "The AI Content Agency Model: $3-10k/Month",
            duration: 42,
            isFree: true,
            content: `The AI content agency is one of the most accessible and scalable side hustles available today. You're essentially becoming a middleman between businesses that need content and AI tools that can produce it — adding your expertise in quality control, strategy, and client management.

**Why This Works**

Businesses need content more than ever: blog posts, social media, email newsletters, product descriptions. But most business owners either can't write well, don't have time, or can't afford traditional agencies charging $500+ per blog post.

Enter you: Using AI tools strategically, you can produce high-quality content at 3-5x the speed of traditional writers, charge competitive rates, and maintain healthy profit margins.

**The Service Stack**

Start with these core offerings:

1. **Blog Content Packages**
   - 4 posts/month: $400-600
   - 8 posts/month: $700-1,000
   - Your cost: 2-3 hours per post (including AI generation, editing, optimization)

2. **Social Media Content**
   - 30 posts/month: $300-500
   - Your cost: 3-4 hours total with proper systems

3. **Email Newsletter Management**
   - 4 emails/month: $200-400
   - Your cost: 1-2 hours per email

**Your Workflow**

The key is having a systematic process:

Step 1: Client onboarding questionnaire (brand voice, target audience, competitors)
Step 2: Generate content briefs using Claude or GPT-4
Step 3: Use AI to draft content with specific prompts tailored to their brand
Step 4: Human editing pass (this is where you add real value)
Step 5: SEO optimization and formatting
Step 6: Client review and revisions

**Getting Your First Clients**

Start with these channels:
- LinkedIn outreach to small business owners
- Cold email to local businesses without active blogs
- Upwork/Fiverr for initial portfolio building
- Referrals from your network

**The Math to $5k/Month**

- 5 blog clients at $500/month = $2,500
- 3 social media clients at $400/month = $1,200
- 4 email newsletter clients at $300/month = $1,200
- Total: $4,900/month

Time investment: 15-20 hours/week once systems are in place.

**Scaling Beyond $5k**

Once you hit capacity, you have two options:
1. Raise prices (your track record justifies it)
2. Hire a VA to handle first drafts while you focus on editing and client management

Many AI content agencies scale to $20-50k/month by building small teams.`,
          },
          {
            title: "AI Voice-Over and Audio Services",
            duration: 38,
            content: `AI voice technology has reached a point where it's genuinely difficult to distinguish from human voices. This creates a massive opportunity for entrepreneurs who can bridge the gap between businesses needing audio content and AI voice tools.

**The Market Opportunity**

Businesses need voice content for:
- YouTube videos and ads
- Podcast intros/outros
- E-learning courses
- IVR phone systems
- Audiobook narration
- Explainer videos

Traditional voice-over artists charge $100-500+ for a few minutes of audio. AI can produce similar quality at a fraction of the cost, creating room for you to profit.

**The Tool Stack**

**ElevenLabs** — The gold standard for AI voice generation
- Natural-sounding voices in multiple languages
- Voice cloning capability
- $5-22/month for starter plans

**Murf.ai** — Great for business/corporate content
- 120+ voices
- Built-in video editor
- Good for e-learning content

**Play.ht** — Strong for long-form content
- Realistic voices
- Good API for automation
- Audiobook-quality output

**Service Packages to Offer**

1. **YouTube/Social Video Voice-Overs**
   - Up to 5 minutes: $50-100
   - 5-15 minutes: $100-200
   - Your time: 30-60 minutes including editing

2. **E-Learning Course Narration**
   - Per hour of finished audio: $150-300
   - Corporate clients often need 5-20 hours
   - This is where the big money is

3. **Podcast Production**
   - Intro/outro creation: $50-100
   - Full episode editing + AI enhancement: $100-200

4. **Audiobook Services**
   - Per finished hour: $100-200
   - A typical book = 5-10 hours = $500-2,000

**Quality Control Process**

Raw AI output isn't enough. Your value-add is:
1. Script optimization for natural speech patterns
2. Proper pacing and pauses
3. Audio editing (noise reduction, normalization)
4. Quality assurance review
5. Revisions and client satisfaction

**Finding Clients**

- Fiverr and Upwork (search "voice over" and see the demand)
- YouTube creator communities and Discord servers
- E-learning platforms and course creator networks
- Direct outreach to businesses with video content

**Income Potential**

Conservative: 20 small jobs/month at $75 avg = $1,500
Moderate: 10 medium jobs at $150 + 2 large at $500 = $2,500
Aggressive: 5 e-learning contracts at $1,000+ = $5,000+

The key is moving toward larger, recurring contracts rather than one-off gigs.`,
          },
        ],
      },
      {
        title: "Scaling Your AI Side Hustle",
        lessons: [
          {
            title: "Productizing Your Services for Passive Income",
            duration: 35,
            content: `The biggest limitation of service-based AI hustles is that you're trading time for money. This lesson shows you how to productize your services — creating assets that generate income without your direct involvement.

**The Productization Framework**

Instead of doing custom work for each client, you create standardized products that can be sold repeatedly:

**Product Type 1: Templates and Prompt Packs**

Take the prompts and workflows you've developed for clients and package them for sale:

- "50 ChatGPT Prompts for Real Estate Agents" — $29
- "AI Content Calendar Generator for Coaches" — $49
- "E-commerce Product Description Prompt Pack" — $39

These sell on Gumroad, PromptBase, and Etsy. Once created, they require zero ongoing work.

**Product Type 2: Mini-Courses and Tutorials**

Document your process and sell it as education:

- "How to Start an AI Content Agency" — $97
- "AI Voice-Over Business in a Box" — $149
- "Automated Social Media Content System" — $79

Host on Gumroad, Teachable, or your own site.

**Product Type 3: Done-For-You Systems**

Create systems that clients can use themselves:

- Notion templates with built-in AI workflows
- Google Sheets with AI integrations via Make.com
- Custom GPTs for specific use cases

Price: $50-500 depending on complexity

**Product Type 4: Subscription Content**

- Weekly AI-generated content packs for specific niches
- Monthly prompt library updates
- AI tool reviews and tutorials

Price: $10-50/month per subscriber

**The Hybrid Model**

The most successful AI entrepreneurs combine:
- High-ticket services (custom work, $1,000-5,000/project)
- Mid-ticket products (courses, systems, $100-500)
- Low-ticket products (templates, prompts, $20-50)
- Recurring subscriptions ($10-50/month)

This creates multiple income streams and smooths out revenue fluctuations.

**Building Your Product Funnel**

1. Start with free content (Twitter threads, YouTube videos, blog posts)
2. Capture emails with a lead magnet (free template or mini-guide)
3. Sell low-ticket products to your list ($20-50)
4. Upsell to courses and systems ($100-500)
5. Offer high-ticket services to qualified leads ($1,000+)

**Timeline to $5k/Month Passive**

Month 1-2: Build your service business, document everything
Month 3-4: Create your first 2-3 products from your documented processes
Month 5-6: Launch products, start building audience
Month 7-12: Scale product sales while maintaining service revenue

Goal: 50% of income from products by month 12.`,
          },
          {
            title: "Automation: Running Your Hustle on Autopilot",
            duration: 40,
            content: `The ultimate goal of an AI side hustle is to minimize your active involvement while maintaining income. This lesson covers the automation stack that lets you run your business in 5-10 hours per week.

**The Four Pillars of AI Hustle Automation**

**Pillar 1: Lead Generation Automation**

Stop manually hunting for clients. Set up systems that bring leads to you:

*Content Automation*
- Use AI to generate daily LinkedIn posts (scheduled via Buffer)
- Create Twitter threads that drive traffic to your offers
- Set up automated YouTube video production pipelines

*Outreach Automation*
- Cold email sequences via Instantly.ai or Lemlist
- LinkedIn connection automation (carefully, to avoid bans)
- Automated follow-ups for non-responders

*SEO Content*
- AI-written blog posts targeting buyer keywords
- Automated internal linking and optimization
- Passive traffic that converts to leads

**Pillar 2: Sales Process Automation**

*Booking and Calls*
- Calendly for automated scheduling
- Pre-call questionnaires that qualify leads
- Automated reminders and follow-ups

*Proposals and Contracts*
- Template-based proposals via PandaDoc or Better Proposals
- E-signatures for instant contract execution
- Automated invoicing upon signature

**Pillar 3: Service Delivery Automation**

*Client Onboarding*
- Automated welcome email sequence
- Self-service brand questionnaire
- Asset collection via automated forms

*Content Production*
- Templated AI workflows for each service type
- Quality control checklists
- Automated delivery and revision tracking

*Project Management*
- Notion or ClickUp for client dashboards
- Automated status updates
- Due date reminders and notifications

**Pillar 4: Admin and Finance Automation**

- Automated invoicing and payment reminders (Stripe, QuickBooks)
- Expense tracking via receipt scanning
- Automated bookkeeping categorization
- Tax preparation data export

**The Make.com Master Workflow**

Connect all your tools with Make.com:

New lead form → Add to CRM → Send welcome email → Create project in Notion → Schedule kickoff call → Generate first content draft → Notify you for review

This single workflow saves 2-3 hours per new client.

**Time Audit: Before vs After Automation**

Before automation (typical week):
- Lead generation: 10 hours
- Sales calls and follow-up: 5 hours
- Client work: 15 hours
- Admin: 5 hours
- Total: 35 hours

After automation:
- Lead gen oversight: 2 hours
- Sales calls only: 3 hours
- Client work (QC only): 8 hours
- Admin oversight: 1 hour
- Total: 14 hours

That's 21 hours saved per week — time you can use to scale, create products, or simply enjoy life.`,
          },
        ],
      },
    ],
  },

  // =====================================================
  // NEW COURSE 12: Crypto Options Trading Mastery
  // =====================================================
  {
    title: "Crypto Options Trading Mastery",
    slug: "crypto-options-trading",
    shortDesc: "Master crypto options on Deribit and Bybit: strategies for income, hedging, and asymmetric bets.",
    description: `**Unlock the Most Powerful Tool in Crypto Trading**

Options are the most versatile and potentially profitable instruments in crypto — yet 95% of traders don't understand them. This course changes that, taking you from options beginner to confident trader with strategies for any market condition.

**What You'll Master:**
- Options fundamentals: calls, puts, Greeks, and pricing
- Platform setup on Deribit (the dominant crypto options exchange)
- Income strategies: covered calls, cash-secured puts, spreads
- Volatility trading: straddles, strangles, and volatility arbitrage
- Risk management specific to options trading

**Who This Is For:**
If you already understand basic crypto trading and want to level up to more sophisticated strategies — or if you want to generate consistent income from your existing crypto holdings — this course gives you the complete framework.

Options aren't gambling. They're precision tools. Learn to use them.`,
    thumbnail: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&q=80",
    price: 129,
    originalPrice: 349,
    category: "Trading",
    level: "ADVANCED" as const,
    tags: ["Crypto", "Options", "Trading", "Deribit", "Income"],
    isFeatured: false,
    totalHours: 10,
    modules: [
      {
        title: "Options Fundamentals",
        lessons: [
          {
            title: "Calls, Puts, and the Options Contract",
            duration: 45,
            isFree: true,
            content: `Options are contracts that give you the right (but not the obligation) to buy or sell an asset at a specific price before a specific date. Understanding this definition deeply is the foundation of everything else.

**The Two Types of Options**

**Call Options**
A call gives you the right to BUY the underlying asset (Bitcoin, Ethereum, etc.) at a specific price (the strike price) before the expiration date.

You buy calls when you're bullish — you think the price will go up.

Example: You buy a BTC call option with:
- Strike price: $50,000
- Expiration: 30 days
- Premium paid: $2,000

If BTC is at $60,000 at expiration, your option is worth $10,000 (the difference between market price and strike). Your profit: $10,000 - $2,000 premium = $8,000.

If BTC is below $50,000 at expiration, your option expires worthless. Your loss: $2,000 (the premium you paid).

**Put Options**
A put gives you the right to SELL the underlying asset at the strike price before expiration.

You buy puts when you're bearish — you think the price will go down.

Example: You buy a BTC put option with:
- Strike price: $50,000
- Expiration: 30 days
- Premium paid: $2,000

If BTC is at $40,000 at expiration, your option is worth $10,000. Profit: $8,000.

If BTC is above $50,000, your option expires worthless. Loss: $2,000.

**Key Options Terminology**

*Strike Price*: The price at which you can buy (call) or sell (put) the underlying

*Expiration Date*: When the option contract ends

*Premium*: The price you pay for the option

*In the Money (ITM)*: Option has intrinsic value
- Call is ITM when market price > strike price
- Put is ITM when market price < strike price

*Out of the Money (OTM)*: Option has no intrinsic value (yet)

*At the Money (ATM)*: Strike price ≈ current market price

**Why Trade Options Instead of Spot?**

1. **Leverage without liquidation**: Options give you leveraged exposure, but you can't lose more than your premium (unlike futures)

2. **Defined risk**: You know your maximum loss upfront

3. **Flexibility**: Profit from up, down, or sideways markets

4. **Income generation**: Sell options to collect premium (covered in later lessons)

5. **Hedging**: Protect your spot holdings against downside

**The Options Edge in Crypto**

Crypto options markets are less efficient than traditional markets. Implied volatility (how expensive options are) often misprice actual price movements, creating opportunities for informed traders.`,
          },
          {
            title: "The Greeks: Understanding Options Pricing",
            duration: 50,
            content: `The "Greeks" are measurements that tell you how an option's price will change based on various factors. Understanding them is essential for managing positions and predicting profits.

**Delta: Direction Sensitivity**

Delta measures how much an option's price changes when the underlying moves $1.

- Call deltas range from 0 to 1
- Put deltas range from -1 to 0
- ATM options have delta around 0.5 (calls) or -0.5 (puts)

Example: A call with delta 0.6 will gain $0.60 in value for every $1 increase in BTC price.

**How to Use Delta**

Delta also approximates the probability of an option expiring ITM:
- 0.3 delta ≈ 30% chance of expiring ITM
- 0.7 delta ≈ 70% chance of expiring ITM

When building positions, sum the deltas to understand your overall directional exposure:
- Net positive delta = bullish position
- Net negative delta = bearish position
- Near-zero delta = market neutral

**Gamma: Delta's Rate of Change**

Gamma measures how much delta changes when the underlying moves $1.

High gamma means your delta is very sensitive to price moves. This is highest for ATM options near expiration.

*Practical implication*: Near expiration, ATM options can swing wildly in value. Gamma is your friend when you're right (accelerating gains) and your enemy when you're wrong.

**Theta: Time Decay**

Theta measures how much value an option loses each day due to time passing.

All options lose value over time (assuming price doesn't move). This decay accelerates as expiration approaches.

Example: A 30-day option might have theta of -$50, meaning it loses $50 in value each day (all else equal).

*For option buyers*: Theta is your enemy. The clock is always ticking against you.
*For option sellers*: Theta is your friend. You collect premium as time passes.

**Vega: Volatility Sensitivity**

Vega measures how much an option's price changes with a 1% change in implied volatility.

When volatility increases, all options become more valuable (calls and puts). When volatility decreases, they become less valuable.

*Practical implication*: If you expect a big move but aren't sure of direction, you might buy options (long vega). If you think the market will be calm, you might sell options (short vega).

**The Greek Hierarchy**

In practice, focus on:
1. Delta — your directional exposure
2. Theta — your time exposure
3. Vega — your volatility exposure

Gamma matters most near expiration. Rho (interest rate sensitivity) rarely matters in crypto.

**Putting It Together**

A BTC call with:
- Delta: 0.5
- Theta: -$100/day
- Vega: $200

Interpretation: For every $1,000 BTC moves up, this option gains ~$500. It loses $100/day in time decay. If implied volatility rises 1%, it gains $200.

Understanding these relationships lets you construct positions that profit from specific market views.`,
          },
        ],
      },
      {
        title: "Income Strategies",
        lessons: [
          {
            title: "Covered Calls: Generating Yield on Your Crypto",
            duration: 40,
            content: `Covered calls are the most conservative options strategy and one of the best ways to generate consistent income from crypto you already hold. If you're holding BTC or ETH long-term, this strategy can add 15-40% annual yield on top of any price appreciation.

**How Covered Calls Work**

A covered call involves:
1. Owning the underlying asset (BTC, ETH)
2. Selling call options against your holdings

By selling a call, you collect premium upfront. In exchange, you agree to sell your crypto at the strike price if it's reached by expiration.

**The Trade-Off**

*What you gain*: Immediate premium income
*What you give up*: Upside above the strike price

Example:
- You own 1 BTC at $50,000
- You sell a 30-day call with $55,000 strike
- You collect $1,500 premium

Scenario 1: BTC stays below $55,000
- Call expires worthless
- You keep your BTC AND the $1,500 premium
- Return: 3% in 30 days = 36% annualized

Scenario 2: BTC rises to $60,000
- Your BTC gets "called away" at $55,000
- You receive $55,000 + $1,500 premium = $56,500
- You missed $3,500 of upside, but still profited

Scenario 3: BTC drops to $45,000
- Call expires worthless
- You still hold BTC (now worth $45,000)
- The $1,500 premium partially offsets your loss

**Strike Selection Strategy**

The strike you choose determines your risk/reward:

*Conservative (0.1-0.2 delta)*: 
- Strike far above current price
- Lower premium, but less likely to be called away
- Best for: Long-term holders who don't want to sell

*Moderate (0.25-0.35 delta)*:
- Strike moderately above current price
- Balanced premium and call risk
- Best for: Maximizing yield while accepting some call risk

*Aggressive (0.4-0.5 delta)*:
- Strike near current price
- Higher premium, higher chance of being called away
- Best for: Taking profits at a target price

**The Weekly vs Monthly Decision**

*Weekly calls*:
- More management required (rolling positions)
- Slightly higher annualized yield
- More flexibility to adjust

*Monthly calls*:
- Less management
- Lower yield but more convenient
- Better for part-time traders

**Managing Covered Calls**

If the market moves against you, you have options:

*Price dropping*: Let the call expire, sell another one. The premium you collect cushions the drop.

*Price rising toward strike*: 
1. Let it get called away (take profits)
2. "Roll up and out" — buy back the call, sell a higher strike with later expiration
3. Buy back the call for a loss (if you really don't want to sell)

**Realistic Income Expectations**

Conservative covered call strategy on BTC/ETH:
- Monthly premium: 2-4% of position value
- Annual yield: 20-40% (plus any price appreciation)
- Win rate: 70-80% of months are profitable

This is real, sustainable income from crypto holdings.`,
          },
          {
            title: "Cash-Secured Puts: Getting Paid to Buy the Dip",
            duration: 38,
            content: `Cash-secured puts are the mirror image of covered calls — instead of generating income on crypto you own, you generate income while waiting to buy crypto at a lower price. It's getting paid to place limit buy orders.

**How Cash-Secured Puts Work**

A cash-secured put involves:
1. Having cash (stablecoins) ready to buy crypto
2. Selling put options at your target buy price

By selling a put, you collect premium upfront. In exchange, you agree to buy the crypto at the strike price if it falls that low.

**The Mechanics**

Example:
- BTC is at $50,000
- You want to buy BTC, but would prefer to buy at $45,000
- You sell a 30-day put with $45,000 strike
- You collect $1,000 premium

Scenario 1: BTC stays above $45,000
- Put expires worthless
- You keep the $1,000 premium
- You can sell another put next month

Scenario 2: BTC drops to $42,000
- Put is exercised, you buy BTC at $45,000
- Your effective cost basis: $45,000 - $1,000 premium = $44,000
- You got BTC at a discount compared to just buying at $50,000

**Why This Strategy Works**

You're essentially saying: "I want to buy BTC at $45,000. If it gets there, great — I'll buy. If it doesn't, pay me for my patience."

*Compared to limit orders*: A limit buy order at $45,000 pays you nothing while you wait. Selling puts pays you premium while you wait.

**Strike Selection for Cash-Secured Puts**

*Conservative (0.15-0.25 delta)*:
- Strike well below current price
- Lower premium, lower chance of assignment
- Best for: Accumulating during corrections

*Moderate (0.3-0.4 delta)*:
- Strike moderately below current price
- Balanced premium and assignment probability
- Best for: Actively building a position

**The "Wheel" Strategy**

Combine covered calls and cash-secured puts into a cycle:

1. Sell cash-secured puts at your target buy price
2. If assigned, you now own the crypto
3. Sell covered calls against your new position
4. If called away, you're back to cash
5. Return to step 1

This wheel generates income in both directions while systematically accumulating and taking profits.

**Risk Management**

The main risk: The price crashes well below your strike. You're forced to buy at your strike price while the market is much lower.

Mitigation:
- Only sell puts on crypto you genuinely want to own long-term
- Keep position sizes reasonable (never more than you're willing to hold)
- Choose strikes at prices you'd be happy to buy at regardless

**Income Expectations**

Cash-secured puts on BTC/ETH:
- Monthly premium: 1.5-3% of capital committed
- Annual yield: 15-30% (if never assigned)
- Assignment rate: 20-30% of positions

When combined with covered calls in the wheel, annual yields of 30-50% are achievable — not including any underlying price appreciation.`,
          },
        ],
      },
    ],
  },

  // =====================================================
  // NEW COURSE 13: Passive Income with Dividend Stocks
  // =====================================================
  {
    title: "Passive Income with Dividend Stocks",
    slug: "dividend-stocks-passive-income",
    shortDesc: "Build a portfolio that pays you monthly: dividend investing fundamentals, stock selection, and DRIP strategies.",
    description: `**Build Wealth While You Sleep**

Dividend investing is one of the most time-tested paths to financial freedom. This course teaches you how to build a portfolio of quality dividend-paying stocks that generates reliable passive income — and grows over time through reinvestment.

**What You'll Learn:**
- How dividends work and why they're powerful for wealth-building
- Screening for quality dividend stocks (yield, payout ratio, growth)
- Building a diversified dividend portfolio
- DRIP strategies for compounding
- Tax optimization for dividend income

**The Math That Changes Everything:**
With a 4% yield portfolio and consistent reinvestment, your dividend income doubles roughly every 10-12 years — even if share prices don't move. Add price appreciation and the compounding becomes extraordinary.

This isn't get-rich-quick. It's get-rich-for-certain, over time.`,
    thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80",
    price: 59,
    originalPrice: 149,
    category: "Investing",
    level: "BEGINNER" as const,
    tags: ["Dividends", "Stocks", "Passive Income", "Investing", "FIRE"],
    isFeatured: true,
    totalHours: 6,
    modules: [
      {
        title: "Dividend Investing Fundamentals",
        lessons: [
          {
            title: "How Dividends Work: The Basics of Getting Paid",
            duration: 32,
            isFree: true,
            content: `Dividends are cash payments that companies make to shareholders from their profits. When you own dividend-paying stocks, you literally get paid just for holding them — usually every quarter.

**The Mechanics of Dividend Payments**

When a company declares a dividend, four dates matter:

1. **Declaration Date**: Company announces the dividend amount
2. **Ex-Dividend Date**: You must own shares BEFORE this date to receive the dividend
3. **Record Date**: Company checks who owns shares
4. **Payment Date**: Cash hits your brokerage account

Example: Apple declares a $0.24 per share quarterly dividend. If you own 100 shares, you receive $24 every quarter ($96/year) just for holding the stock.

**Dividend Yield: The Key Metric**

Dividend yield = Annual dividend / Stock price × 100

Example: 
- Stock price: $100
- Annual dividend: $4
- Yield: 4%

This means you earn 4% per year in cash payments, independent of stock price movement.

**Why Dividend Investing Works**

1. **Forced discipline**: Companies that pay dividends must generate real cash flow. This filters out speculative businesses.

2. **Compounding machine**: Reinvest dividends to buy more shares, which pay more dividends, which buy more shares...

3. **Downside cushion**: In bear markets, dividend income continues while you wait for recovery.

4. **Inflation hedge**: Quality companies raise dividends over time, often faster than inflation.

**The Power of Dividend Growth**

A company that grows its dividend 7% annually will double its payout in ~10 years.

If you buy a stock yielding 3% today, and it grows dividends 7% annually:
- Year 1: 3% yield
- Year 5: ~4.2% yield on your original cost
- Year 10: ~5.9% yield on original cost
- Year 20: ~11.6% yield on original cost

This is called "yield on cost" — your effective yield gets higher over time even though the stock's current yield stays similar.

**Dividend Stocks vs Growth Stocks**

Growth stocks (like early Amazon or Tesla) reinvest all profits back into the business. Dividend stocks return profits to shareholders.

Neither is "better" — they serve different purposes:
- Growth stocks: Maximum long-term appreciation potential, higher volatility
- Dividend stocks: Income + moderate growth, lower volatility, psychological stability

For most investors, a mix of both makes sense. This course focuses on the dividend side.`,
          },
          {
            title: "Screening for Quality: Beyond High Yield",
            duration: 38,
            content: `The biggest mistake new dividend investors make is chasing high yields. A 10% yield might seem amazing, but it often signals a company in trouble — and the dividend may get cut. Quality matters more than yield.

**The Dividend Quality Framework**

Evaluate every dividend stock on these five factors:

**1. Payout Ratio**
Payout ratio = Dividends paid / Earnings

A company earning $4/share and paying $2 in dividends has a 50% payout ratio.

*What to look for*:
- 40-60%: Healthy, sustainable
- 60-80%: Acceptable for stable businesses (utilities, REITs)
- 80%+: Yellow flag — little room for error
- 100%+: Red flag — paying more than they earn

**2. Dividend Growth History**

How consistently has the company raised dividends?

*Dividend Aristocrats*: S&P 500 companies that raised dividends for 25+ consecutive years (Johnson & Johnson, Coca-Cola, Procter & Gamble)

*Dividend Kings*: 50+ consecutive years of increases

Companies with long dividend growth streaks take their dividends seriously. Management knows cutting would be catastrophic for their reputation.

**3. Earnings Stability**

Dividends are paid from earnings. If earnings are volatile, dividends are at risk.

Look for:
- Consistent earnings growth over 5-10 years
- Low cyclicality (avoid heavy industrial, commodities)
- Resilient business model during recessions

**4. Debt Levels**

High debt means interest payments come before dividends. If earnings drop, dividends get cut to pay debt.

Check debt-to-equity ratio:
- <0.5: Conservative, safe
- 0.5-1.0: Moderate, acceptable
- >1.0: Higher risk, needs justification

**5. Free Cash Flow Coverage**

Even better than earnings: does the company generate enough free cash flow (FCF) to cover dividends?

FCF payout ratio = Dividends / Free cash flow

If FCF easily covers dividends, the payment is sustainable regardless of accounting earnings.

**Screening Tools**

Free resources:
- Finviz.com: Stock screener with dividend filters
- Seeking Alpha: Dividend safety grades
- Simply Safe Dividends: Dividend safety scores

Paid (worth it for serious dividend investors):
- Morningstar: Deep fundamental analysis
- FAST Graphs: Visualization of dividend sustainability

**Your Screening Checklist**

Before buying any dividend stock:
✓ Yield between 2-6% (higher needs extra scrutiny)
✓ Payout ratio under 70%
✓ 10+ years of dividend payments (5+ years of growth preferred)
✓ Debt-to-equity under 1.0
✓ Free cash flow covers dividend by 1.5x or more

This filters out 90% of "dividend traps" before they trap you.`,
          },
        ],
      },
      {
        title: "Building Your Portfolio",
        lessons: [
          {
            title: "Portfolio Construction: Diversification Done Right",
            duration: 35,
            content: `A dividend portfolio isn't just a random collection of high-yield stocks. It's a deliberately constructed income machine with diversification across sectors, geographies, and risk levels.

**Sector Diversification**

Don't concentrate in one sector, even if it offers high yields. Each sector has unique risks:

*Recommended sector allocation*:
- Consumer Staples: 15-20% (Procter & Gamble, Coca-Cola, PepsiCo)
- Healthcare: 15-20% (Johnson & Johnson, Pfizer, AbbVie)
- Utilities: 10-15% (Duke Energy, NextEra Energy)
- Technology: 10-15% (Microsoft, Apple, Broadcom)
- Financials: 10-15% (JPMorgan, Bank of America)
- Industrials: 10% (3M, Caterpillar)
- REITs: 10-15% (Realty Income, Prologis)
- Energy: 5-10% (Chevron, ExxonMobil)

*Why this matters*: In 2020, energy dividends were cut across the board. If you were 50% energy, your income crashed. Diversified portfolios barely noticed.

**The Core vs Satellite Approach**

*Core holdings (70-80% of portfolio)*:
- Dividend Aristocrats and Kings
- Large-cap, stable businesses
- Companies you'd hold for 20+ years
- Examples: JNJ, PG, KO, PEP, MMM

*Satellite holdings (20-30% of portfolio)*:
- Higher yield opportunities
- Smaller companies with growth potential
- More actively managed positions
- Examples: High-yield REITs, BDCs, MLPs

**Position Sizing**

*Single stock maximum*: 5% of portfolio
- Even the best company can have problems
- No single dividend cut should hurt you badly

*Sector maximum*: 20% of portfolio
- Protects against sector-wide issues

**Building Over Time**

Don't invest everything at once. Dollar-cost average over 6-12 months:

Month 1-3: Core Aristocrats (JNJ, PG, KO)
Month 4-6: Add Healthcare and Technology dividends
Month 7-9: Add Utilities and REITs
Month 10-12: Fill in Financials, Industrials, Energy

This avoids buying everything at a market peak.

**Portfolio Size for Meaningful Income**

Reality check on dividend income:

| Portfolio Size | 4% Yield Annual Income | Monthly Income |
|----------------|------------------------|----------------|
| $25,000 | $1,000 | $83 |
| $100,000 | $4,000 | $333 |
| $250,000 | $10,000 | $833 |
| $500,000 | $20,000 | $1,666 |
| $1,000,000 | $40,000 | $3,333 |

Most people need $500k-1M invested to replace a typical income through dividends alone. This is a long-term strategy.`,
          },
          {
            title: "DRIP and Compounding: The Snowball Effect",
            duration: 30,
            content: `DRIP (Dividend Reinvestment Plan) is the strategy that transforms dividend investing from "nice income" to "wealth building machine." By automatically reinvesting dividends to buy more shares, you create a compounding snowball.

**How DRIP Works**

Without DRIP:
- You receive dividend cash in your account
- It sits there until you decide to invest it
- Often stays as uninvested cash

With DRIP:
- Dividends automatically buy more shares (including fractional shares)
- No transaction fees
- No decisions required
- Compounding happens automatically

**The Math of DRIP Compounding**

Starting portfolio: $100,000 at 4% yield = $4,000/year dividends

*Without DRIP (dividends taken as cash)*:
- Year 10: Still $100,000 invested, $4,000/year income

*With DRIP (all dividends reinvested)*:
- Year 10: ~$148,000 invested, ~$5,900/year income (48% more)
- Year 20: ~$219,000 invested, ~$8,800/year income (120% more)
- Year 30: ~$324,000 invested, ~$13,000/year income (224% more)

That's $224,000 of wealth created from $100,000 — just by reinvesting dividends. Add price appreciation and the numbers get even better.

**When to Use DRIP vs Take Cash**

*Use DRIP when*:
- You're in the accumulation phase (building wealth)
- You don't need the income for living expenses
- You're 10+ years from retirement

*Take cash when*:
- You're in retirement and need income
- You want to rebalance to different stocks
- A position has become too large (over 5% of portfolio)

**Setting Up DRIP**

Most brokerages offer automatic DRIP. In your account settings:
1. Find "Dividend Reinvestment" or "DRIP" settings
2. Enable for all holdings or specific positions
3. Confirm fractional shares are allowed

Some companies offer direct DRIP through their transfer agents (like Computershare), sometimes with discount pricing.

**The Tax Consideration**

Important: Reinvested dividends are still taxable income in the year received. You don't get a tax break just because you reinvested.

This is why dividend investing is often best done in tax-advantaged accounts (IRA, 401k, Roth IRA) during the accumulation phase. In retirement, you might shift to taxable accounts for the income.

**DRIP + Dollar Cost Averaging**

DRIP naturally dollar-cost averages your purchases:
- When prices are low, dividends buy more shares
- When prices are high, dividends buy fewer shares
- Over time, this averages out to favorable prices

Combine with regular monthly contributions and you're systematically building wealth regardless of market conditions.`,
          },
        ],
      },
    ],
  },

  // =====================================================
  // NEW COURSE 14: Shopify Dropshipping to $50k/Month
  // =====================================================
  {
    title: "Shopify Dropshipping to $50k/Month",
    slug: "shopify-dropshipping-50k",
    shortDesc: "The advanced playbook for scaling dropshipping stores past $10k to $50k/month with systems and team building.",
    description: `**Scale Beyond the Plateau**

Most dropshipping courses stop at $10k/month. This one starts there. If you've already built a working store and want to scale to serious money — $50,000+ per month — this is the advanced playbook you need.

**What You'll Master:**
- Product line expansion and catalog building
- Advanced Facebook and TikTok ad scaling strategies
- Building a team: VAs, media buyers, customer service
- Systems and SOPs that run without you
- Cash flow management at scale
- Brand building for long-term value

**The $50k/Month Framework:**
This isn't about finding one winning product. It's about building a real e-commerce business with multiple products, professional operations, and sustainable growth. Most $50k/month stores are actually small businesses with 3-5 team members.

Ready to go from side hustle to real business?`,
    thumbnail: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80",
    price: 149,
    originalPrice: 399,
    category: "E-Commerce",
    level: "ADVANCED" as const,
    tags: ["Dropshipping", "Shopify", "Scaling", "E-Commerce", "Facebook Ads"],
    isFeatured: false,
    totalHours: 12,
    modules: [
      {
        title: "Scaling Foundations",
        lessons: [
          {
            title: "The $50k/Month Store Architecture",
            duration: 45,
            isFree: true,
            content: `A $50k/month dropshipping store looks fundamentally different from a $5k/month store. It's not just "more sales" — it's a different business structure. This lesson maps out what that architecture looks like.

**Revenue Breakdown at $50k/Month**

Typical $50k/month store metrics:
- Average order value (AOV): $50-80
- Orders per day: 25-40
- Conversion rate: 2-3%
- Ad spend: $15-25k/month
- Net profit margin: 15-25%
- Take-home: $7,500-12,500/month

These numbers require multiple products, not just one winner.

**The Product Portfolio Model**

At $50k/month, successful stores typically have:

*Hero Products (60% of revenue)*:
- 2-3 proven winners you've been scaling for months
- Established ad creative that works
- Reliable supplier relationships
- These are your cash cows

*Growth Products (25% of revenue)*:
- 3-5 products you're actively testing and scaling
- Not yet at hero status but showing promise
- Where you spend testing budget

*Test Products (15% of revenue)*:
- 5-10 new products in early testing
- Most will fail, some will become growth products
- Constant pipeline of potential winners

**The Team You Need**

$50k/month is too much for one person to handle well. Minimum team:

*Customer Service VA ($500-800/month)*:
- Handles all support tickets
- Processes returns/refunds
- Manages order issues

*Media Buyer or Ad Manager ($1,500-3,000/month)*:
- Manages Facebook/TikTok campaigns
- Creates and tests ad creative
- Optimizes for ROAS

*You (CEO role)*:
- Strategy and product selection
- Team management
- Cash flow and finances
- Big-picture growth

**The Systems Stack**

At scale, you need systems that run without you:

*Fulfillment*:
- Automated order routing to suppliers
- Tracking sync to customer notifications
- Returns processing workflow

*Customer Service*:
- Helpdesk (Gorgias or Zendesk)
- Response templates for common issues
- Escalation procedures

*Advertising*:
- Campaign naming conventions
- Testing protocols
- Scaling rules (when to increase budget, when to cut)

*Financial*:
- Daily revenue tracking
- Weekly profit analysis
- Cash flow forecasting

**The Mindset Shift**

At $10k/month, you're an operator doing everything.
At $50k/month, you're a CEO managing a business.

Your job becomes hiring the right people, building systems, and making strategic decisions — not processing orders and responding to emails.`,
          },
          {
            title: "Advanced Facebook Ads Scaling",
            duration: 50,
            content: `Scaling Facebook ads from $100/day to $500+/day requires different tactics than what got you to $100/day. The algorithm behaves differently at higher budgets, and mistakes are more expensive.

**The Scaling Methods**

**Method 1: Vertical Scaling (Budget Increases)**

Increase budget on winning ad sets gradually:
- Never increase by more than 20-30% per day
- Monitor performance for 24-48 hours after each increase
- If performance drops significantly, revert

*The "Learning Phase" trap*: Large budget jumps reset Facebook's learning phase. Your $100/day winning ad set at 3.0 ROAS might drop to 1.5 ROAS at $300/day because it's re-learning.

**Method 2: Horizontal Scaling (Duplication)**

Instead of increasing budget on one ad set, duplicate it:
- Create 3-5 copies of your winning ad set
- Each runs at the original budget
- Total spend increases, but each individual ad set remains stable

This avoids the learning phase reset.

**Method 3: CBO Scaling (Campaign Budget Optimization)**

Create a CBO campaign with:
- Your winning ad sets inside
- Let Facebook allocate budget to the best performers
- Set campaign budget to your total desired spend

CBOs work well when you have multiple proven ad sets because Facebook can shift budget to whoever is performing best that day.

**Creative Scaling**

You can't scale on the same creative forever. Frequency (how often the same people see your ad) will increase, and performance will decline.

*Creative refresh schedule*:
- Test 2-3 new creatives per week per product
- Kill underperformers within 3-4 days
- Winning creatives become part of your "creative library"
- Rotate creatives to manage frequency

**Audience Scaling**

At higher budgets, you'll exhaust narrow audiences. Expansion strategies:

*Lookalike stacking*:
- 1% LAL of purchasers (tightest)
- 2-3% LAL of purchasers (broader)
- 1% LAL of add-to-carts (different signal)
- Stack these in CBO and let Facebook optimize

*Broad targeting*:
- Remove all interests
- Target only country + age + gender
- Let Facebook's AI find buyers
- Often outperforms interest targeting at scale

**The Scale Killers**

Watch out for these issues as you scale:

*Frequency > 2.0*: Audience is seeing your ad too often. Need new creative or broader audiences.

*CPM rising*: You're competing against yourself. Check for audience overlap between ad sets.

*Conversion rate dropping*: Quality of traffic may be declining. Tighten targeting or improve landing page.

*Support tickets exploding*: More sales = more issues. Make sure your team can handle volume before scaling.`,
          },
        ],
      },
      {
        title: "Building the Machine",
        lessons: [
          {
            title: "Hiring and Managing Your Team",
            duration: 42,
            content: `At $50k/month, your team is your biggest asset — and potentially your biggest liability. Hiring the right people and managing them well determines whether you scale smoothly or crash.

**The First Three Hires**

In order of priority:

**Hire 1: Customer Service VA**
*Why first*: Customer service scales directly with orders. This is the first thing that will overwhelm you.

*Where to find*: OnlineJobs.ph (Philippines), Upwork
*Cost*: $500-800/month full-time
*Training time*: 1-2 weeks

*What they handle*:
- Responding to all customer inquiries
- Processing refunds and exchanges
- Tracking order status issues
- Managing review requests

**Hire 2: Ad Manager / Media Buyer**
*Why second*: Managing ads at scale requires daily attention. If you're doing it yourself, you're not doing strategy.

*Where to find*: Referrals, Facebook groups, Upwork (carefully)
*Cost*: $1,500-3,000/month OR performance-based
*Training time*: 2-4 weeks

*What they handle*:
- Daily ad account management
- Creative testing and iteration
- Budget allocation and scaling
- Reporting on performance

**Hire 3: Operations Manager**
*Why third*: Once you have CS and ads handled, you need someone to manage everything else.

*Where to find*: Referrals, Indeed, remote job boards
*Cost*: $2,000-4,000/month
*Training time*: 1-2 months

*What they handle*:
- Supplier relationships
- Inventory and product launches
- Managing the CS team
- Process improvement

**Management Fundamentals**

*Clear expectations*: Document exactly what each role does in an SOP. "Handle customer service" isn't clear. "Respond to all tickets within 4 hours with these templates" is clear.

*Regular check-ins*: Weekly 30-minute calls with each team member. Review metrics, discuss issues, give feedback.

*Performance metrics*: Each role should have measurable KPIs:
- CS: Response time, resolution rate, customer satisfaction
- Ads: ROAS, cost per acquisition, ad spend managed
- Operations: Order accuracy, supplier issues, process completion

**Common Hiring Mistakes**

*Hiring too fast*: Taking the first applicant without proper vetting. Always do a paid trial project.

*Hiring friends/family*: Rarely works. Mixing personal relationships with business creates problems.

*Not training properly*: Expecting new hires to figure things out. Invest 2-4 weeks in proper training.

*Micromanaging*: Watching every action instead of managing by results. Set clear KPIs and trust your team.

**The SOP Library**

Before hiring, document everything you do:
- How to process a refund
- How to respond to common customer questions
- How to launch a new ad campaign
- How to evaluate a new product

These SOPs become your training materials and ensure consistency.`,
          },
          {
            title: "Cash Flow Management at Scale",
            duration: 38,
            content: `Cash flow kills more dropshipping businesses than bad products. At $50k/month, you're managing significant money — and the timing of payments can make or break you.

**Understanding Dropshipping Cash Flow**

The timeline:
- Day 0: Customer pays you $50
- Day 1-3: You pay supplier $20
- Day 3-7: Supplier ships product
- Day 7-14: Customer receives product
- Day 14-21: Payment processor releases funds (Shopify Payments, Stripe)

*The gap*: You pay suppliers before you receive customer payments. This creates cash flow pressure.

At $1,000/day in sales:
- Daily supplier payments: ~$400
- Funds released: Whatever you sold 14-21 days ago
- If you're growing, you're always "underwater"

**Cash Flow Math Example**

Month 1: $30,000 revenue
- You collect: $30,000 (eventually)
- You pay suppliers: $12,000
- You pay ads: $10,000
- Gross profit: $8,000

But timing matters:
- Week 1: You spend $5,000 on ads, pay $3,000 to suppliers
- Week 1: You receive $0 (payment processing delay)
- Week 2: You spend another $5,000, pay another $3,000
- Week 2: You receive $7,500 (last week's sales)

You need cash reserves to bridge the gap during growth periods.

**The Cash Reserve Rule**

Maintain cash reserves equal to:
- 2 weeks of ad spend + 2 weeks of supplier costs

At $15k/month ad spend and $8k/month COGS:
- Reserve needed: ~$11,500

This covers you if payment processing delays or supplier issues occur.

**Improving Cash Flow**

*Negotiate payment terms with suppliers*:
- Ask for Net 7 or Net 14 payment terms
- Pay weekly instead of per-order
- Larger suppliers are more flexible

*Speed up payment releases*:
- Shopify Payments: Apply for daily payouts
- Use PayPal for some transactions (faster access)
- Build good processing history to reduce holds

*Finance options*:
- Shopify Capital: Loans based on sales history
- Clearco/Wayflyer: Revenue-based financing for ad spend
- Business credit cards with good limits

**Financial Tracking**

At scale, you need clear visibility:

*Daily tracking*:
- Revenue
- Ad spend
- ROAS

*Weekly tracking*:
- Gross profit
- Net profit
- Cash position
- Accounts payable (what you owe suppliers)

*Monthly tracking*:
- P&L statement
- Cash flow statement
- Runway (how long can you operate at current burn)

**The Profit Reinvestment Strategy**

Don't spend all profits. Follow this framework:

- 30% Reinvest in growth (more ads, new products)
- 30% Cash reserves (build your buffer)
- 20% Pay yourself
- 20% Taxes (set aside, don't touch)

This keeps the business healthy while you grow.`,
          },
        ],
      },
    ],
  },

  // =====================================================
  // NEW COURSE 15: YouTube Automation: Faceless Channels
  // =====================================================
  {
    title: "YouTube Automation: Faceless Channels",
    slug: "youtube-automation-faceless",
    shortDesc: "Build profitable YouTube channels without showing your face using AI tools, freelancers, and proven content systems.",
    description: `**Build a YouTube Empire Without Being on Camera**

Faceless YouTube channels generate millions of views and thousands of dollars monthly — all without the creator ever appearing on screen. This course shows you exactly how to build and scale these channels using AI, freelancers, and proven systems.

**What You'll Learn:**
- Niche selection for faceless channels (what works, what doesn't)
- Content production systems using AI and freelancers
- YouTube SEO and algorithm optimization
- Monetization beyond AdSense (sponsors, affiliates, products)
- Scaling from one channel to a portfolio

**Why Faceless Works:**
Viewers watch for content, not personality. Channels like "Bright Side" (45M subs), "Infographics Show" (14M subs), and countless others prove that compelling content wins — no face required.

Build once, earn forever.`,
    thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
    price: 69,
    originalPrice: 179,
    category: "Content Creation",
    level: "BEGINNER" as const,
    tags: ["YouTube", "Passive Income", "Content Creation", "AI", "Automation"],
    isFeatured: true,
    totalHours: 8,
    modules: [
      {
        title: "Channel Foundation",
        lessons: [
          {
            title: "Niche Selection for Faceless Channels",
            duration: 38,
            isFree: true,
            content: `Not all niches work for faceless channels. Some require a personality; others thrive with pure content value. This lesson shows you which niches print money and which to avoid.

**The Faceless-Friendly Niche Framework**

Faceless channels work when viewers want INFORMATION or ENTERTAINMENT, not PERSONALITY.

**Tier 1: Proven Faceless Niches (Start Here)**

*Compilation/List Channels*:
- "Top 10" and "Top 15" videos on any topic
- Examples: WatchMojo, TheRichest, Screen Rant
- Why it works: Viewers want the list, not a face
- Revenue potential: $3-10 per 1,000 views (CPM)

*Educational/Explainer*:
- History, science, psychology, "how things work"
- Examples: Kurzgesagt, Infographics Show, Real Life Lore
- Why it works: Animation/visuals carry the content
- Revenue potential: $5-15 CPM

*Meditation/Relaxation*:
- Sleep music, nature sounds, ambient content
- Examples: Yellow Brick Cinema, Calm
- Why it works: No one needs a face for relaxation
- Revenue potential: Lower CPM ($1-3) but high watch time

*Scary Stories/Creepypasta*:
- Horror narration, mystery stories
- Examples: Mr. Nightmare, Chills
- Why it works: AI voices actually enhance the creepy factor
- Revenue potential: $3-8 CPM

**Tier 2: Viable with More Effort**

*Finance/Business*:
- Stock market, crypto, business news
- Requires authority and accuracy
- Revenue potential: $10-25 CPM (highest paying)

*Gaming Compilations*:
- Funny moments, fails, highlights
- High competition but proven demand
- Revenue potential: $2-5 CPM

*Luxury/Motivation*:
- Luxury lifestyle, motivational content
- Stock footage heavy
- Revenue potential: $3-8 CPM

**Niches to Avoid**

*Personality-driven niches*:
- Vlogging, "day in my life"
- Drama/commentary
- Personal advice

*Oversaturated niches*:
- Basic gaming content
- Generic motivation quotes
- Low-effort compilations

**Validation Before You Start**

Before committing to a niche:

1. Search your niche on YouTube
2. Find 5 faceless channels in that niche
3. Check their Socialblade stats: Are they growing?
4. Check recent video views: Are new videos getting views?
5. Check monetization: Are they running ads? Sponsors?

If multiple faceless channels are growing and monetizing, the niche is validated.`,
          },
          {
            title: "Setting Up Your Channel for Success",
            duration: 32,
            content: `Your channel setup determines how the YouTube algorithm perceives you and how viewers decide whether to subscribe. Get these fundamentals right from day one.

**Channel Branding Essentials**

*Channel Name*:
- Brandable and memorable
- Relevant to your niche
- Easy to spell and search
- Examples: "History Dose," "Wealth Wire," "Mystery Hour"

*Profile Picture*:
- Simple, recognizable logo
- Works at small sizes (on mobile)
- Consistent with your brand colors
- Create free on Canva or hire on Fiverr ($10-30)

*Banner Image*:
- 2560 x 1440 pixels (YouTube's required size)
- Clear value proposition: "Daily mysteries explained"
- Upload schedule: "New videos every Tuesday"
- Clean, professional design

*Channel Description*:
- First 1-2 sentences: What your channel is about
- Keywords naturally included
- Upload schedule mentioned
- Links to other platforms if relevant

**Content Pillars**

Define 3-4 content pillars — recurring themes or formats:

Example for a History channel:
1. "Mysteries of History" (unexplained events)
2. "History Explained" (how X happened)
3. "Top 10 Historical" (list format)
4. "Ancient Civilizations" (deep dives)

Each pillar becomes a playlist. This helps the algorithm understand your channel and recommend your videos together.

**Playlist Strategy**

Create playlists immediately:
- One playlist per content pillar
- Well-written playlist descriptions with keywords
- Featured playlists on your channel homepage

Playlists increase session time because YouTube auto-plays the next video.

**Thumbnail Style Guide**

Develop a consistent thumbnail style:
- Consistent color scheme (2-3 brand colors)
- Consistent font
- Consistent layout
- Viewers should recognize your thumbnails instantly

Study successful faceless channels in your niche and note their thumbnail patterns.

**Video Settings Template**

Create a template for every video:
- Title structure you'll use
- Description template with links
- Default tags for your niche
- End screen template
- Cards placement strategy

Having templates saves hours and ensures consistency.`,
          },
        ],
      },
      {
        title: "Content Production System",
        lessons: [
          {
            title: "AI-Powered Video Production Pipeline",
            duration: 45,
            content: `The key to profitable faceless channels is producing quality videos efficiently. This lesson details the exact production pipeline using AI tools and systems.

**The Production Pipeline Overview**

A single video requires:
1. Topic/script research
2. Script writing
3. Voice-over
4. Visuals (footage/images/animations)
5. Video editing
6. Thumbnail creation
7. Upload and optimization

Each step can be AI-assisted or outsourced.

**Step 1: Topic Research (30 minutes)**

Use AI to accelerate research:

*ChatGPT prompt*: "Give me 20 video ideas for a [niche] YouTube channel. Focus on topics with high search interest but moderate competition."

*Validate topics*:
- Search on YouTube: Are similar videos getting views?
- Check Google Trends: Is interest growing or declining?
- Use TubeBuddy/VidIQ: What's the search volume?

**Step 2: Script Writing (1-2 hours or outsourced)**

*AI approach*:
1. Research the topic thoroughly
2. Use Claude or GPT-4 to draft a script
3. Edit for flow, accuracy, and your channel's voice
4. Add hooks, transitions, and CTAs

*Script structure*:
- Hook (first 30 seconds): Why should they keep watching?
- Introduction: What they'll learn
- Main content: The meat of the video
- Conclusion: Summary and CTA

**Step 3: Voice-Over (15 minutes)**

*AI voice tools*:
- ElevenLabs: Most natural, best for long-form
- Murf.ai: Good for business/educational
- LOVO: Good value option

*Tips*:
- Choose a voice that fits your niche
- Adjust pacing (slower for educational, faster for entertainment)
- Add pauses at transitions
- Review for pronunciation errors

**Step 4: Visuals (1-2 hours or outsourced)**

*Stock footage sources*:
- Pexels and Pixabay (free)
- Storyblocks ($20-30/month, unlimited downloads)
- Envato Elements ($33/month, huge library)

*AI image generation*:
- Midjourney for custom visuals
- DALL-E for quick illustrations

*Screen recordings*:
- Loom for walkthroughs
- OBS for game footage

**Step 5: Editing (2-4 hours or outsourced)**

*DIY tools*:
- DaVinci Resolve (free, professional)
- CapCut (free, easier learning curve)

*Outsourcing*:
- Fiverr editors: $30-100 per video
- Full-time VA editor: $500-1,000/month

**Step 6: Thumbnail (30 minutes)**

*Tools*:
- Canva (free, easy)
- Photoshop (professional)

*The formula*:
- Big, readable text (3-5 words max)
- Contrasting colors
- Emotional face or dramatic image
- Curiosity gap

**Step 7: Upload and Optimize (30 minutes)**

- SEO-optimized title
- Keyword-rich description
- Relevant tags
- Custom thumbnail
- End screens and cards
- Schedule for optimal time`,
          },
          {
            title: "Outsourcing and Team Building",
            duration: 40,
            content: `To scale beyond 1-2 videos per week, you need a team. This lesson shows you how to build a content production team that runs without your constant involvement.

**The Faceless Channel Team**

*Minimum viable team*:
- Scriptwriter
- Voice-over (AI or human)
- Video editor

*Scaled team*:
- Add: Research assistant
- Add: Thumbnail designer
- Add: Channel manager

**Hiring Scriptwriters**

*Where to find*:
- Upwork: Most options, variable quality
- ProBlogger job board: Higher quality, higher cost
- Contently: Professional writers

*What to pay*:
- Entry level: $20-50 per script
- Experienced: $50-150 per script
- Premium: $150-300+ per script

*How to evaluate*:
- Ask for samples in your niche
- Do a paid test project (one script)
- Check for research quality, not just writing

*Brief template for writers*:
- Topic and angle
- Target length (in words)
- Tone and style guidelines
- Key points to cover
- Sources to reference

**Hiring Video Editors**

*Where to find*:
- Fiverr: Budget option ($30-100/video)
- Upwork: Mid-range ($50-200/video)
- OnlineJobs.ph: Full-time Filipino editors ($400-800/month)

*What to look for*:
- Experience with your video style
- Quick turnaround time
- Ability to source footage
- Good communication

*Providing assets*:
- Script with visual notes
- Voice-over file
- Brand assets (fonts, colors, logo)
- Example videos for reference

**Managing the Team**

*Project management*:
- Use Notion or Trello for tracking
- Each video = one card with stages
- Clear deadlines for each stage

*Communication*:
- Slack or Discord for quick questions
- Weekly check-in calls
- Loom for feedback on edits

*Quality control*:
- Review scripts before voice-over
- Review rough cuts before final edit
- Final review before upload

**The Workflow at Scale**

Week 1:
- Monday: Assign 4 topics to scriptwriter
- Wednesday: Scripts delivered
- Thursday: Review scripts, order voice-over
- Friday: Voice-over delivered, sent to editor

Week 2:
- Monday-Wednesday: Editor creates rough cuts
- Thursday: You review, provide feedback
- Friday: Final videos delivered

Week 3:
- Upload one video per day (Monday-Thursday)
- Schedule for optimal times

With this system, you can produce 8-16 videos per month spending 5-10 hours/week on management.`,
          },
        ],
      },
    ],
  },

  // =====================================================
  // NEW COURSE 16: Freelance Copywriting: $200/hr Formula
  // =====================================================
  {
    title: "Freelance Copywriting: $200/hr Formula",
    slug: "freelance-copywriting-200hr",
    shortDesc: "Master direct response copywriting and build a freelance business charging $200+/hour.",
    description: `**Write Words That Sell — And Get Paid Accordingly**

Copywriting is one of the highest-paid freelance skills because great copy directly generates revenue. This course teaches you the fundamentals of direct response copywriting AND the business skills to command premium rates.

**What You'll Master:**
- Direct response principles that drive conversions
- Email sequences, landing pages, and sales pages
- Finding and landing high-paying clients
- Pricing strategies that get you to $200/hour
- Building a sustainable freelance copywriting business

**Why Copywriting Pays So Well:**
A good sales email can generate $50,000+ in revenue. A high-converting landing page can generate millions. Companies gladly pay $5,000-20,000 for copy that produces results — and that works out to $200-500/hour for skilled copywriters.

Learn the skill that turns words into money.`,
    thumbnail: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80",
    price: 89,
    originalPrice: 229,
    category: "Freelancing",
    level: "INTERMEDIATE" as const,
    tags: ["Copywriting", "Freelancing", "Direct Response", "Marketing", "Income"],
    isFeatured: false,
    totalHours: 7,
    modules: [
      {
        title: "Copywriting Fundamentals",
        lessons: [
          {
            title: "The Psychology of Persuasion in Copy",
            duration: 40,
            isFree: true,
            content: `Great copywriting isn't about clever words — it's about understanding human psychology and using it to move people to action. This lesson covers the psychological principles that make copy convert.

**The Core Persuasion Principles**

**Principle 1: Pain > Pleasure**

People are more motivated to avoid pain than to seek pleasure. This is why negative framing often outperforms positive framing in copy.

*Weak*: "Our software helps you work faster"
*Strong*: "Stop wasting 10 hours every week on manual work that should take 10 minutes"

Lead with the problem. Make them feel it. Then present your solution.

**Principle 2: Specificity = Credibility**

Vague claims feel like marketing. Specific claims feel like truth.

*Weak*: "Our clients get amazing results"
*Strong*: "Our clients see an average 47% increase in email open rates within 30 days"

Numbers, percentages, timeframes, and details make claims believable.

**Principle 3: Social Proof Removes Risk**

Humans are tribal. We do what others like us are doing.

Types of social proof (in order of power):
1. Specific testimonials with results
2. Recognizable client logos
3. Number of customers/users
4. Expert endorsements
5. Media mentions

**Principle 4: Objection Handling**

Every reader has objections. If you don't address them, they leave.

Common objections:
- "Is this worth the money?"
- "Will this work for me?"
- "Is this legit or a scam?"
- "What if it doesn't work?"

Your copy must preemptively address each objection before it kills the sale.

**Principle 5: Urgency and Scarcity**

Without a reason to act now, people delay. Delay often means never.

Real urgency: "Sale ends Friday at midnight"
Real scarcity: "Only 50 spots available"

*Warning*: Fake urgency destroys trust. Only use when genuine.

**The AIDA Framework**

Classic formula that still works:

*Attention*: Hook them immediately (headline, first sentence)
*Interest*: Build intrigue with relevant information
*Desire*: Make them want what you're selling
*Action*: Clear call-to-action

Every piece of copy should move through this sequence.

**The PAS Framework**

Even simpler and highly effective:

*Problem*: Identify and agitate their pain
*Agitate*: Make the problem feel urgent
*Solution*: Present your offering as the answer

"Tired of spending 20 hours a week on social media with no results? [PROBLEM]

Every hour you waste on ineffective posts is an hour you're not growing your business. Your competitors are automating this. You're doing it manually. [AGITATE]

Our AI social media tool generates a month of posts in 10 minutes. Try it free. [SOLUTION]"`,
          },
          {
            title: "Writing High-Converting Sales Emails",
            duration: 42,
            content: `Email remains the highest-ROI marketing channel, and sales email sequences are where copywriters deliver the most measurable value. This lesson teaches you to write emails that convert.

**The Sales Email Sequence Structure**

A typical sales sequence is 5-7 emails over 7-14 days:

*Email 1: The Hook*
- Grab attention
- Identify the problem
- Promise a solution
- Soft CTA (learn more, read on)

*Email 2: The Story*
- Share a relevant story (yours or a client's)
- Demonstrate transformation
- Build emotional connection
- Soft CTA

*Email 3: The Value*
- Educate on the topic
- Provide genuine insights
- Position yourself as expert
- Medium CTA

*Email 4: The Objection Handler*
- Address the top 3 objections
- Use testimonials and proof
- Reduce perceived risk
- Strong CTA

*Email 5: The Close*
- Create urgency (deadline, scarcity)
- Recap the value
- Clear, strong CTA
- Make action feel easy

**Writing the Subject Line**

Subject lines determine open rates. Everything else is irrelevant if they don't open.

*Formulas that work*:
- Curiosity: "The [topic] mistake I see everywhere"
- Personal: "Quick question about [their situation]"
- Direct: "Your [desired outcome] starts here"
- Social proof: "How [person/company] achieved [result]"

*Subject line rules*:
- Keep under 50 characters
- Avoid spam triggers ("FREE," all caps, excessive punctuation)
- Match subject line promise to email content

**Email Body Structure**

*Opening line*: Hook immediately. No "I hope this email finds you well."

*Body*: One main idea per email. If you have multiple points, use bullet points or numbered lists for scannability.

*CTA*: Clear, specific, single action. "Click here to schedule your call" not "Let me know if you're interested."

**Personalization at Scale**

The best emails feel personal even when sent to thousands:

- Use first name: "Hi {FirstName},"
- Reference their segment: "As a [their industry/role]..."
- Use conversational tone: Write like you're emailing a friend
- Be specific: Vague emails feel like mass blasts

**Measuring What Matters**

When writing email copy, you're optimizing for:
- Open rate (subject line performance): Industry avg 20-25%
- Click-through rate (body/CTA performance): Industry avg 2-5%
- Reply rate (for cold emails): Good is 5-15%
- Conversion rate: Depends on offer

Track these metrics and iterate. Small improvements compound.`,
          },
        ],
      },
      {
        title: "Building the Business",
        lessons: [
          {
            title: "Finding and Landing High-Paying Clients",
            duration: 38,
            content: `The difference between a $50/hour and $200/hour copywriter isn't just skill — it's who you're selling to and how. This lesson shows you how to find clients who pay premium rates.

**Where Premium Clients Live**

*Not on Fiverr or Upwork*. Those platforms race to the bottom. Premium clients are found through:

**1. Direct Outreach to Businesses**
- Identify companies that invest in marketing
- Find decision-makers on LinkedIn
- Send personalized pitches demonstrating value

**2. Referrals from Existing Clients**
- Best source once you have traction
- Ask satisfied clients: "Who else do you know?"
- Offer referral bonuses

**3. Content Marketing**
- Write about copywriting on LinkedIn/Twitter
- Create case studies of your results
- Position yourself as an expert

**4. Industry Communities**
- SaaS Slack groups, marketing communities
- Answer questions, provide value
- Become the known expert

**The Outreach Formula**

*Step 1: Research*
- Study their current marketing
- Identify specific improvements you could make
- Find a recent trigger (funding, launch, hiring)

*Step 2: Craft the Pitch*

Subject: Quick idea for [Company] emails

Hi [Name],

I noticed your recent [product launch/campaign]. Really smart positioning.

I had an idea that could boost your email conversions — specifically, [one specific suggestion based on your research].

This is something I recently did for [similar company], where we increased click-through rates by 34%.

Worth a 15-minute call to explore?

[Your name]

*Step 3: Follow Up*
Most responses come from follow-ups, not initial emails. Follow up 3-4 times over 2 weeks.

**Qualifying High-Paying Clients**

Not every client is worth your time. Look for:

*Green flags*:
- Established business with revenue
- Marketing budget (they're running ads, have a team)
- Previous experience with freelancers/agencies
- Clear project scope

*Red flags*:
- "We're a startup with no budget but huge equity potential"
- Can't articulate what they need
- Asking for spec work before paying
- Wants unlimited revisions

**The Sales Call**

Once you have a call, your goal is to understand their needs and demonstrate value:

1. Ask about their business goals
2. Ask about their current marketing challenges
3. Identify how copywriting specifically could help
4. Share relevant experience/results
5. Propose a project scope
6. Discuss pricing

Don't give away strategies on the call. Demonstrate expertise through questions and past results.`,
          },
          {
            title: "Pricing Strategies for $200+/Hour",
            duration: 35,
            content: `Most copywriters charge hourly and stay stuck at low rates. Premium copywriters use value-based pricing and project fees that work out to $200-500/hour. This lesson shows you how.

**The Hourly Rate Trap**

Hourly billing punishes efficiency. If you write a sales page in 8 hours instead of 20, you earn less — even if the result is the same.

Clients also dislike hourly because they can't predict total cost.

Solution: Project-based and value-based pricing.

**Project-Based Pricing**

Quote fixed prices for defined deliverables:

*Standard rates (experienced copywriter)*:
- Single email: $200-500
- 5-email sequence: $1,000-3,000
- Landing page: $1,500-5,000
- Sales page (long-form): $3,000-10,000
- Website copy (5-page): $3,000-7,000

If a sales page takes you 15 hours, a $5,000 fee = $333/hour.

**Value-Based Pricing**

Price based on value delivered, not time spent:

Formula: Projected revenue increase × small percentage = your fee

Example:
- Client's email list: 50,000 people
- Current email revenue: $20,000/month
- You believe you can increase conversions by 30%
- Projected increase: $6,000/month = $72,000/year
- Your fee: 10% of Year 1 increase = $7,200

This is harder to sell but extremely lucrative when you have proof of results.

**The Pricing Conversation**

Never quote price without understanding scope. The conversation:

1. Understand their goals and current situation
2. Propose a solution (deliverables)
3. Present price confidently: "Investment for this project is $5,000"
4. Wait. Don't fill silence with discounts.

If they push back, explore scope reduction — not price reduction:
"If $5,000 is outside budget, we could do a 3-email sequence instead of 5, which would be $3,500."

**Building to Premium Rates**

You can't charge $5,000 for a sales page on day one. The progression:

*Stage 1: Building proof*
- Take lower-paying projects to build portfolio
- Focus on measurable results
- Document everything

*Stage 2: Raising rates*
- Each new client, raise prices 10-20%
- Use results from previous clients as leverage
- Be willing to lose price-sensitive clients

*Stage 3: Premium positioning*
- Specialize in a profitable niche
- Have documented ROI from past projects
- Clients come to you, not vice versa

Timeline: 1-2 years from beginner to $200+/hour with dedicated effort.`,
          },
        ],
      },
    ],
  },

  // =====================================================
  // NEW COURSE 17: Solana NFT Creation & Launch
  // =====================================================
  {
    title: "Solana NFT Creation & Launch",
    slug: "solana-nft-creation-launch",
    shortDesc: "Create, deploy, and sell your own NFT collection on Solana — from art generation to successful mint.",
    description: `**Launch Your NFT Project on the Fastest Blockchain**

Solana is the go-to blockchain for NFT projects thanks to low fees and fast transactions. This course teaches you everything needed to create and launch a successful NFT collection — from generating art to marketing your mint.

**What You'll Build:**
- AI-assisted art generation for 10,000+ piece collections
- Smart contract deployment on Solana
- Minting website with candy machine
- Community building and marketing strategy
- Post-mint roadmap execution

**No Coding Required:**
While we'll touch on technical concepts, this course uses no-code and low-code tools that anyone can use. You don't need to be a developer to launch a successful NFT project.

Turn your creative vision into a Web3 asset.`,
    thumbnail: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&q=80",
    price: 99,
    originalPrice: 249,
    category: "Web3 & Crypto",
    level: "INTERMEDIATE" as const,
    tags: ["NFT", "Solana", "Web3", "Art", "Crypto"],
    isFeatured: false,
    totalHours: 9,
    modules: [
      {
        title: "Collection Creation",
        lessons: [
          {
            title: "Designing Your NFT Collection Concept",
            duration: 42,
            isFree: true,
            content: `Every successful NFT collection starts with a strong concept. This lesson walks you through developing your collection idea, target audience, and unique positioning.

**The Collection Concept Framework**

Before creating any art, answer these questions:

*1. What's the theme?*
- Animals, characters, abstract art, photography?
- Is there a story or universe?
- What emotion does it evoke?

*2. Who's the target collector?*
- NFT degens looking for flips?
- Art collectors wanting aesthetics?
- Community members wanting membership?
- Gamers wanting utility?

*3. What's the unique angle?*
- What makes this different from existing collections?
- Why would someone choose this over others?
- What's the "hook" that creates buzz?

**Successful Collection Archetypes**

Study what's worked:

*PFP Collections (Profile Pictures)*
- 10,000 unique characters
- Traits with varying rarity
- Strong community identity
- Examples: DeGods, SMB, Mad Lads

*Art Collections*
- Smaller supply (100-500)
- Focus on aesthetic quality
- Artist reputation matters
- Examples: Individual artist collections

*Utility Collections*
- Access to tools, games, or benefits
- Value comes from utility, not just art
- Requires ongoing development
- Examples: Gaming NFTs, membership passes

**Rarity and Trait Design**

For PFP collections, rarity drives value:

*Base traits* (everyone has):
- Background
- Body/skin
- Clothing

*Varying traits*:
- Accessories
- Special items
- Expression/pose

*Rarity distribution*:
- Common traits: 50-70% of supply
- Uncommon: 20-30%
- Rare: 5-10%
- Ultra-rare: 1-2%
- Legendary: <0.5%

Example for 10,000 collection:
- 5 backgrounds (20% each)
- 10 body types (10% each)
- 20 clothing options (5% each)
- 15 accessories (3-10% each)
- 5 legendary traits (0.5% each)

**The Concept Document**

Before moving forward, create a one-page concept doc:

1. Collection name and size
2. Theme and visual style
3. Target audience
4. Unique positioning
5. Trait categories and rarity outline
6. Initial utility/roadmap ideas
7. Target mint price

This document guides all future decisions.`,
          },
          {
            title: "AI-Assisted Art Generation for NFT Collections",
            duration: 48,
            content: `Creating 10,000 unique pieces manually is impossible. This lesson shows you how to use AI and generative tools to create professional NFT art at scale.

**The Art Generation Stack**

**For AI Art Style (Generated from prompts)**:
- Midjourney: Highest quality, best for establishing style
- DALL-E 3: Good for variations and specific concepts
- Stable Diffusion: Free, most customizable, steeper learning curve

**For Layer-Based Generative Art**:
- HashLips Art Engine: Free, code-based generation
- Bueno Art: No-code, drag-and-drop layers
- NightCafe: AI generation with NFT export features

**Method 1: AI + Manual Curation (Smaller Collections)**

For collections of 100-1,000:

Step 1: Use Midjourney to generate base images
- Create 10-20 prompts for variations
- Generate 50-100 options per prompt
- Curate the best manually

Step 2: Edit and refine in Photoshop/Procreate
- Ensure consistency
- Remove AI artifacts
- Add collection-specific elements

Step 3: Export with unique metadata

*Pros*: Higher quality, more artistic
*Cons*: Time-intensive, harder to scale

**Method 2: Layer-Based Generation (Large Collections)**

For collections of 5,000-10,000+:

Step 1: Create base layers
- Use AI to generate different backgrounds
- Create or commission body variations
- Design all trait layers (clothing, accessories, etc.)

Step 2: Prepare layers in PNG format
- Transparent backgrounds
- Consistent sizing (2000x2000px standard)
- Organized folders by trait category

Step 3: Use generation software
- Upload layers to Bueno Art or HashLips
- Set rarity percentages per trait
- Define incompatibilities (some traits shouldn't combine)
- Generate all combinations

Step 4: Manual review
- Check for broken combinations
- Remove poor-looking generations
- Ensure even distribution

**Quality Standards for NFT Art**

- Resolution: 2000x2000px minimum (4000x4000 for premium)
- File format: PNG for images, MP4 for animations
- File size: Under 50MB for optimal loading
- Consistency: All pieces should feel like one collection

**Building Your Art Pipeline**

Week 1: Establish style with AI tools
- Generate 50+ concept images
- Identify the aesthetic direction
- Create style guide

Week 2: Create base layers
- Design or generate all layer categories
- Prepare PNG files
- Test combinations manually

Week 3: Generation and curation
- Run generative software
- Review all outputs
- Replace or regenerate issues

Week 4: Finalize and prepare metadata
- Final quality check
- Create metadata JSON files
- Prepare for minting`,
          },
        ],
      },
      {
        title: "Launch and Mint",
        lessons: [
          {
            title: "Setting Up Your Solana Minting Infrastructure",
            duration: 45,
            content: `The technical side of launching an NFT collection on Solana has become much easier with modern tools. This lesson walks you through setting up everything needed for a successful mint.

**The Tech Stack Overview**

For a Solana NFT launch, you need:
1. Wallet with SOL for deployment fees
2. Candy Machine (Solana's minting program)
3. Minting website
4. Metadata hosting

**Step 1: Wallet Setup**

Create a Solana wallet for your project:
- Download Phantom wallet (most popular)
- Create new wallet dedicated to this project
- Fund with ~5-10 SOL for deployment and testing

*Security*: Use a hardware wallet (Ledger) for mainnet deployment. Store seed phrase securely.

**Step 2: Candy Machine Setup**

Candy Machine is Metaplex's standard for NFT mints on Solana.

*Using Sugar (CLI tool)*:
1. Install Sugar command-line tool
2. Prepare your assets folder (images + metadata JSON)
3. Configure your candy machine (price, start date, limits)
4. Upload to Arweave (permanent storage)
5. Deploy to Solana devnet (test) then mainnet

*Using No-Code Tools*:
- Launchpad.art: Upload images, configure settings, deploy
- Magic Eden Launchpad: For approved collections
- Shyft: No-code deployment tools

**Step 3: Metadata Preparation**

Each NFT needs a JSON metadata file:

\`\`\`json
{
  "name": "Collection Name #1",
  "symbol": "COLL",
  "description": "Description of your collection",
  "image": "1.png",
  "attributes": [
    {"trait_type": "Background", "value": "Blue"},
    {"trait_type": "Body", "value": "Gold"},
    {"trait_type": "Accessory", "value": "Crown"}
  ]
}
\`\`\`

Tools like Bueno Art automatically generate these when you create your collection.

**Step 4: Minting Website**

Options from easiest to most custom:

*Pre-built solutions*:
- Otomate: Connect candy machine, get instant mint page
- Bifrost: Beautiful templates, easy setup

*Custom website*:
- Use mint page templates from GitHub
- Customize branding and design
- Requires basic web development or developer hire

**Step 5: Testing on Devnet**

Always test before mainnet:
1. Deploy to Solana devnet (free, test SOL)
2. Test minting process end-to-end
3. Verify metadata displays correctly
4. Test with multiple wallets
5. Fix any issues

**Deployment Costs**

Approximate costs for a 10,000 NFT collection:
- Arweave storage: ~100-300 SOL ($5,000-15,000)
- Candy Machine deployment: ~2-5 SOL
- Website hosting: $0-50/month

Many of these costs have decreased over time as tools have improved.`,
          },
          {
            title: "Community Building and Marketing for NFT Success",
            duration: 42,
            content: `The art and tech are table stakes. What separates successful mints from failures is community and marketing. This lesson teaches you how to build hype and sell out your collection.

**The Community Building Timeline**

*Weeks 1-4: Foundation*
- Create Twitter account
- Create Discord server
- Establish brand identity
- Start posting content

*Weeks 5-8: Growth*
- Daily Twitter engagement
- Collaborations with other projects
- Building Discord activity
- Teasers and reveals

*Weeks 9-12: Launch prep*
- Whitelist distribution
- Final marketing push
- Mint coordination

**Twitter Strategy**

Twitter is the primary NFT marketing channel.

*Content pillars*:
- Art reveals and teasers
- Behind-the-scenes development
- Engagement threads (questions, polls)
- Giveaways and collaborations
- Founder/team personality content

*Growth tactics*:
- Engage with other projects daily
- Reply to influential accounts
- Run raffles with retweet mechanics
- Collaborate on Twitter Spaces

*Metrics to track*:
- Followers growth rate
- Engagement rate
- Click-through to Discord

**Discord Community Building**

Discord is where you convert followers into minters.

*Server structure*:
- Welcome/verification channel
- Announcements
- General chat
- Art reveals
- Whitelist/raffle channels
- Support

*Keeping it active*:
- Daily engagement from team
- Regular events (game nights, AMAs)
- Reward active members
- Exclusive sneak peeks

**The Whitelist Strategy**

Whitelist = guaranteed mint spots. Use this strategically:

*Allocation*:
- 50-70% through community engagement
- 20-30% for collaborations with other projects
- 10-20% for influencers and marketing

*Distribution methods*:
- Discord activity rewards
- Twitter engagement contests
- Raffle for engaged followers
- Collaboration swaps with other projects

**Launch Day Execution**

*Pre-mint checklist*:
- Announce exact date/time 1 week ahead
- Send reminders 24h, 1h, 15min before
- Have team standing by for support
- Test mint site under load

*During mint*:
- Live updates on Discord and Twitter
- Real-time minting stats
- Address issues immediately
- Celebrate milestones

*Post-mint*:
- Announce sellout (or update on remaining)
- Share secondary market listings (Magic Eden)
- Begin roadmap execution
- Maintain community engagement`,
          },
        ],
      },
    ],
  },

  // =====================================================
  // NEW COURSE 18: ChatGPT for Business: 50 Money-Making Uses
  // =====================================================
  {
    title: "ChatGPT for Business: 50 Money-Making Uses",
    slug: "chatgpt-business-50-uses",
    shortDesc: "50 practical ways to use ChatGPT to make money, save time, and grow your business.",
    description: `**Put AI to Work for Your Bottom Line**

ChatGPT isn't just a chatbot — it's a business tool that can help you make more money, work faster, and operate more efficiently. This practical course shows you 50 specific ways to use ChatGPT for business results.

**What You'll Learn:**
- Content creation and marketing automation
- Sales and customer service enhancement
- Research and analysis acceleration
- Product development and ideation
- Operations and productivity optimization

**No Theory — All Action:**
Each of the 50 uses comes with exact prompts you can copy, real examples, and step-by-step implementation guides. You'll finish this course with dozens of ChatGPT workflows you can immediately apply to make or save money.

Start getting ROI from AI today.`,
    thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    price: 49,
    originalPrice: 99,
    category: "AI & Automation",
    level: "BEGINNER" as const,
    tags: ["ChatGPT", "AI", "Business", "Productivity", "Automation"],
    isFeatured: true,
    totalHours: 5,
    modules: [
      {
        title: "Revenue Generation",
        lessons: [
          {
            title: "20 Ways to Make Money with ChatGPT",
            duration: 45,
            isFree: true,
            content: `These aren't theoretical possibilities — they're real ways people are making money with ChatGPT right now. Each comes with the prompt and implementation approach.

**CONTENT SERVICES**

**1. Blog Writing Service**
Offer blog writing to businesses. Use ChatGPT for drafts, add your editing.
*Prompt*: "Write a 1500-word blog post about [topic] for [target audience]. Include an engaging introduction, 5 main sections with headers, and a conclusion with a call-to-action."
*Rate*: $150-400 per post

**2. Social Media Content Packages**
Create monthly content calendars for clients.
*Prompt*: "Create 30 LinkedIn post ideas for a [industry] business. Include a mix of educational, engagement, and promotional content."
*Rate*: $500-1,500/month per client

**3. Email Copywriting**
Write email sequences for businesses.
*Prompt*: "Write a 5-email welcome sequence for a [type of business]. Email 1 should welcome and deliver the lead magnet. Emails 2-4 should provide value and build trust. Email 5 should make an offer."
*Rate*: $500-2,000 per sequence

**4. Product Descriptions**
Bulk product descriptions for e-commerce.
*Prompt*: "Write a compelling product description for [product name]. Include key features, benefits, ideal customer, and emotional appeal. Keep under 200 words."
*Rate*: $5-20 per description, at volume

**5. YouTube Scripts**
Scripts for YouTube videos.
*Prompt*: "Write a YouTube script for a 10-minute video about [topic]. Include a hook for the first 30 seconds, clear sections, and a call-to-subscribe at the end."
*Rate*: $100-300 per script

**CONSULTING SERVICES**

**6. AI Implementation Consulting**
Help businesses adopt AI tools.
- Audit their workflows
- Identify AI opportunities
- Implement ChatGPT solutions
*Rate*: $100-300/hour

**7. Prompt Engineering Services**
Create custom prompts for businesses.
*Rate*: $50-200 per prompt/workflow

**8. Business Strategy Research**
Use ChatGPT for market research and analysis.
*Prompt*: "Analyze the competitive landscape for [industry] businesses targeting [market]. Include 5 major competitors, their positioning, and potential differentiation opportunities."
*Rate*: $500-2,000 per research project

**DIGITAL PRODUCTS**

**9. Prompt Packs**
Sell collections of prompts on Gumroad/PromptBase.
*Price*: $9-49 per pack

**10. ChatGPT Courses/Tutorials**
Teach others to use ChatGPT.
*Price*: $50-500 per course

**AUTOMATION SERVICES**

**11. Customer Service Bot Setup**
Help businesses create AI-powered support.
*Rate*: $1,000-5,000 per setup

**12. Sales Outreach Automation**
Create personalized cold email systems using ChatGPT + automation.
*Rate*: $500-2,000 setup + monthly retainer

**CREATIVE SERVICES**

**13. Story/Book Writing**
Use ChatGPT to draft books, edit yourself.
*Platforms*: Amazon KDP, Gumroad
*Earnings*: Varies widely

**14. Marketing Campaign Ideation**
Generate campaign concepts for agencies.
*Prompt*: "Generate 10 creative marketing campaign ideas for a [product] targeting [audience] during [season/event]."
*Rate*: $200-500 per ideation session

**15. Ad Copy Creation**
Facebook/Google ad variations.
*Prompt*: "Write 5 variations of Facebook ad copy for [product]. Include headline, primary text, and call-to-action. Focus on [pain point/benefit]."
*Rate*: $100-300 per ad set`,
          },
          {
            title: "Saving Time and Money with AI Automation",
            duration: 38,
            content: `Beyond making money directly, ChatGPT can save you significant time and money in your existing business. Time saved = capacity for revenue-generating work.

**RESEARCH AND ANALYSIS**

**16. Competitor Analysis**
*Before*: Hours of manual research
*With ChatGPT*: 30 minutes

*Prompt*: "Analyze [competitor website] and create a summary of: their target audience, unique value proposition, pricing strategy, main products/services, and marketing channels. Identify 3 strengths and 3 weaknesses."

**17. Market Research Summaries**
*Prompt*: "Summarize the key trends in [industry] for 2024 based on recent developments. Include market size, growth rate, major players, and emerging opportunities."

**18. Customer Feedback Analysis**
*Prompt*: "Analyze these customer reviews and identify: top 5 most common complaints, top 5 most praised features, and 3 improvement opportunities. Reviews: [paste reviews]"

**CONTENT REPURPOSING**

**19. Turn Blog Posts into Social Content**
*Prompt*: "Convert this blog post into 10 LinkedIn post excerpts, each highlighting a key insight. Keep each under 200 characters."

**20. Turn Podcasts into Articles**
*Prompt*: "Convert this podcast transcript into a structured blog post with headers, key takeaways, and a conclusion."

**21. Create Thread from Long-Form Content**
*Prompt*: "Convert this article into a Twitter thread of 10 tweets. Start with a strong hook, provide value in each tweet, and end with a call-to-action."

**BUSINESS OPERATIONS**

**22. Meeting Summaries and Action Items**
*Prompt*: "Summarize this meeting transcript and extract: key decisions made, action items with owners, and unresolved questions. Format as bullet points."

**23. Process Documentation**
*Prompt*: "Create a step-by-step SOP document for [process]. Include purpose, tools needed, each step in detail, and common troubleshooting tips."

**24. Job Description Writing**
*Prompt*: "Write a job description for a [position] at a [type of company]. Include responsibilities, required qualifications, nice-to-haves, and company culture elements."

**25. Performance Review Drafts**
*Prompt*: "Based on these bullet points about an employee's performance, draft a performance review summary that covers achievements, areas for improvement, and goals for next quarter."

**SALES AND MARKETING**

**26. Cold Email Personalization**
*Prompt*: "Based on this LinkedIn profile summary, write a personalized cold email opening that references something specific about their work and connects it to [our service]."

**27. Proposal Templates**
*Prompt*: "Create a proposal template for [type of service] that includes sections for: executive summary, scope of work, timeline, investment, team credentials, and next steps."

**28. FAQ Generation**
*Prompt*: "Based on this product/service description, generate 20 frequently asked questions that potential customers would have, and write clear answers to each."

**CUSTOMER SUPPORT**

**29. Support Response Templates**
*Prompt*: "Create 10 email templates for common customer support situations: order confirmation, shipping delay, refund request, technical issue, feature request, etc."

**30. Knowledge Base Articles**
*Prompt*: "Write a knowledge base article explaining how to [specific process]. Include step-by-step instructions, screenshots description placeholders, and common issues with solutions."`,
          },
        ],
      },
      {
        title: "Advanced Applications",
        lessons: [
          {
            title: "ChatGPT for Product Development and Innovation",
            duration: 35,
            content: `Beyond content and operations, ChatGPT can accelerate product development and help you build better offerings. These applications save weeks of work and thousands in consulting fees.

**IDEATION AND BRAINSTORMING**

**31. New Product Ideas**
*Prompt*: "I run a [type of business] serving [target audience]. Generate 15 new product or service ideas that would complement our existing offerings. For each, include the concept, target customer, and potential revenue model."

**32. Feature Prioritization**
*Prompt*: "Here are 20 potential features for our product. Based on customer value and implementation complexity, create a prioritized list organized by: must-have, should-have, nice-to-have. Explain your reasoning."

**33. Problem Identification**
*Prompt*: "What are the top 10 problems faced by [target audience] in their daily work/life? For each problem, describe the pain, current solutions, and gaps in the market."

**MARKET VALIDATION**

**34. Customer Interview Questions**
*Prompt*: "Create a customer discovery interview guide for validating [product idea]. Include 15 open-ended questions that uncover problems, current solutions, and willingness to pay."

**35. Survey Design**
*Prompt*: "Design a market validation survey for [product concept]. Include a mix of multiple choice and open-ended questions. Focus on problem validation, solution interest, and pricing sensitivity."

**36. Persona Development**
*Prompt*: "Based on this information about our customers, create 3 detailed buyer personas. For each, include demographics, goals, challenges, information sources, and objections to purchase."

**PRODUCT STRATEGY**

**37. Competitive Positioning**
*Prompt*: "Here's information about our product and 3 competitors. Create a positioning map and develop a unique value proposition that differentiates us from each competitor."

**38. Pricing Strategy**
*Prompt*: "We're launching [product]. Our costs are [X], competitors charge [Y-Z]. Recommend 3 pricing strategies with pros/cons of each, including psychological pricing tactics."

**39. Go-to-Market Plan**
*Prompt*: "Create a go-to-market plan for [product] targeting [audience]. Include launch phases, marketing channels, messaging, and success metrics for the first 90 days."

**CONTENT FOR PRODUCTS**

**40. Course Curriculum Design**
*Prompt*: "I want to create a course teaching [topic]. Design a curriculum with modules, lessons within each module, and learning objectives. The course should take students from beginner to [desired outcome]."

**41. Ebook Outline**
*Prompt*: "Create a detailed outline for an ebook about [topic] targeting [audience]. Include chapter summaries, key points per chapter, and suggested length for each section."

**42. Template/Tool Creation**
*Prompt*: "Create a [Notion template/spreadsheet/checklist] for [use case]. Include all relevant sections, formulas (for spreadsheets), and example content."

**TESTING AND FEEDBACK**

**43. Beta Test Feedback Questions**
*Prompt*: "Create a feedback questionnaire for beta testers of [product]. Cover: first impressions, feature usability, missing features, willingness to recommend, and suggested improvements."

**44. A/B Test Hypotheses**
*Prompt*: "Generate 10 A/B test hypotheses for our [website/app]. For each, include: what to test, the hypothesis, expected outcome, and how to measure success."

**45. User Story Writing**
*Prompt*: "Write user stories for [feature] using the format: As a [user type], I want [goal] so that [benefit]. Include acceptance criteria for each story."`,
          },
          {
            title: "Building ChatGPT Systems for Scale",
            duration: 32,
            content: `The real power of ChatGPT comes from building repeatable systems that scale. These final 5 uses show you how to create AI-powered systems that grow with your business.

**46. Custom GPTs for Your Business**

OpenAI's Custom GPTs let you create specialized assistants for specific tasks.

*Use cases*:
- Customer support bot trained on your documentation
- Sales assistant with your product knowledge
- Content creator with your brand voice

*How to build*:
1. Go to ChatGPT → Explore GPTs → Create
2. Define the GPT's purpose
3. Upload relevant documents (product info, FAQs, style guides)
4. Set conversation starters
5. Test and refine

*Business applications*:
- Internal: Team productivity tools
- External: Embed in website for customer support
- Product: Create GPTs as part of your service offering

**47. Automated Workflows with Zapier/Make**

Connect ChatGPT to your business tools:

*Example: Automated Email Response*
Trigger: New email received
Action 1: Send email content to ChatGPT via API
Action 2: ChatGPT drafts appropriate response
Action 3: Response sent to your inbox for review and send

*Example: Content Pipeline*
Trigger: New item in content calendar (Notion)
Action 1: ChatGPT generates first draft
Action 2: Draft added to Google Doc
Action 3: Slack notification sent to editor

**48. ChatGPT API for Custom Applications**

For technical users or with developer help:

*Applications*:
- Embedded chat on your website
- Custom content generation tools
- Automated reporting systems
- Integration with existing software

*Pricing*: API is usage-based; far cheaper than manual labor for most applications

**49. Knowledge Management Systems**

Build a company "brain" using ChatGPT:

*System design*:
1. Document all processes and knowledge in a central repository
2. Feed this to a Custom GPT or use API with context
3. Team members query the system instead of asking each other

*Benefits*:
- New employee onboarding acceleration
- Consistent answers to common questions
- Institutional knowledge preserved

**50. Client-Facing AI Services**

The ultimate ChatGPT business: building AI solutions for clients.

*Service offerings*:
- Custom GPT development
- Workflow automation setup
- AI strategy consulting
- Training and implementation

*Pricing models*:
- Per-project: $2,000-20,000
- Retainer: $1,000-5,000/month
- Revenue share: Percentage of client savings/earnings

**Implementation Priority**

Start with quick wins:
1. Content creation assistance (immediate time savings)
2. Research and analysis (immediate quality improvement)
3. Email and communication (immediate efficiency)

Then build systems:
4. Automated workflows (scalable efficiency)
5. Custom GPTs (unique competitive advantage)
6. Client services (new revenue streams)

Each step builds on the previous, creating compounding returns from your ChatGPT expertise.`,
          },
        ],
      },
    ],
  },

  // =====================================================
  // NEW COURSE 19: Real Estate Wholesaling Basics
  // =====================================================
  {
    title: "Real Estate Wholesaling Basics",
    slug: "real-estate-wholesaling-basics",
    shortDesc: "Learn to find distressed properties, negotiate contracts, and assign them for $5-20k profit per deal.",
    description: `**Make Money in Real Estate Without Buying Property**

Real estate wholesaling is one of the best ways to break into real estate investing with little to no capital. You find discounted properties, get them under contract, and assign that contract to a buyer for a fee — typically $5,000-20,000 per deal.

**What You'll Learn:**
- How wholesaling works (legally and profitably)
- Finding motivated sellers and distressed properties
- Analyzing deals and calculating maximum offer prices
- Negotiation scripts and contract basics
- Building your buyer list and closing deals

**No Money Down:**
Unlike traditional real estate investing, wholesaling requires minimal upfront capital. Your investment is time and hustle — the profits come from your ability to find deals others can't.

Start your real estate journey the smart way.`,
    thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    price: 119,
    originalPrice: 299,
    category: "Real Estate",
    level: "BEGINNER" as const,
    tags: ["Real Estate", "Wholesaling", "Investing", "Income", "No Money Down"],
    isFeatured: false,
    totalHours: 8,
    modules: [
      {
        title: "Wholesaling Fundamentals",
        lessons: [
          {
            title: "How Real Estate Wholesaling Works",
            duration: 38,
            isFree: true,
            content: `Real estate wholesaling is the art of finding deeply discounted properties and selling the right to purchase them to real estate investors. You never actually buy the property — you're selling the contract.

**The Wholesaling Process Step by Step**

**Step 1: Find a Motivated Seller**
Motivated sellers have a reason they need to sell quickly: divorce, inheritance, foreclosure, job relocation, tired landlords. They'll accept below-market prices for speed and certainty.

**Step 2: Negotiate and Get Under Contract**
You negotiate a purchase price below market value and sign a purchase contract. This contract gives you the right to buy the property — or assign that right to someone else.

**Step 3: Find a Cash Buyer**
Cash buyers are investors looking for properties to flip or rent. They're willing to pay more than your contract price because the property is still below market value after repairs.

**Step 4: Assign the Contract**
You assign your contract to the cash buyer, who pays you an assignment fee (typically $5,000-20,000). They close directly with the seller. You never own the property.

**The Math of a Wholesale Deal**

Property after-repair value (ARV): $200,000
Repairs needed: $30,000
Investor's target price (70% ARV - repairs): $110,000

Your contract price with seller: $90,000
Assignment fee: $110,000 - $90,000 = $20,000

The seller gets a quick, certain sale at $90,000.
The investor gets a deal at $110,000 (below their maximum).
You get $20,000 for finding and coordinating the deal.

**Why Motivated Sellers Accept Low Offers**

"Why would anyone sell a $200,000 house for $90,000?"

Because to them, it's not worth $200,000 right now:
- It needs $30,000 in repairs they can't afford
- They're facing foreclosure in 60 days
- They inherited a house 3 states away
- They're divorcing and need to sell immediately
- They've been a landlord for 20 years and are exhausted

For these sellers, a fast, certain, cash sale is worth more than maximum price through traditional channels.

**Legal Structure**

Wholesaling is legal when done correctly:
- You have a valid purchase contract
- The contract has an assignment clause (or you use a double close)
- You disclose your role appropriately

*State variations*: Some states have specific requirements. Check your state's laws or consult a real estate attorney before your first deal.

**Capital Requirements**

Minimal startup costs:
- Marketing: $100-500/month
- Earnest money (refundable): $100-1,000 per deal
- LLC formation: $100-500
- Basic education: Already covered!

This makes wholesaling the most accessible entry point into real estate investing.`,
          },
          {
            title: "Finding Motivated Sellers",
            duration: 42,
            content: `Finding motivated sellers is the most important skill in wholesaling. Without sellers willing to take below-market offers, you have no deals. This lesson covers every major method for finding them.

**Understanding Motivation**

Sellers become motivated when something forces speed over price:

*Financial distress*:
- Pre-foreclosure
- Tax liens
- Job loss
- Medical bills

*Life transitions*:
- Divorce
- Inheritance
- Estate sales
- Job relocation

*Property problems*:
- Major repairs needed
- Problem tenants
- Code violations
- Vacant/abandoned

**Marketing Method 1: Driving for Dollars**

The classic method: Drive through neighborhoods looking for distressed properties.

*Signs of distress*:
- Overgrown lawn
- Boarded windows
- Peeling paint
- Mail piling up
- Code violation notices

*Process*:
1. Drive target neighborhoods
2. Note addresses of distressed properties
3. Look up owner info (county records)
4. Send direct mail or skip trace for phone

*Tools*: DealMachine app automates property lookup while driving

**Marketing Method 2: Direct Mail**

Send targeted mail to high-probability sellers:

*Lists to target*:
- Pre-foreclosure
- Absentee owners (landlords not living nearby)
- High equity (own home 15+ years)
- Probate (inherited properties)
- Tax delinquent

*Mail types*:
- Yellow letters (handwritten look, highest response)
- Postcards (cheapest, good for volume)
- Professional letters (good for probate/attorneys)

*Response rates*: Expect 0.5-2% response, of which 5-10% become deals

**Marketing Method 3: Online Marketing**

*SEO/Website*:
- "Sell my house fast [city]"
- Captures motivated seller searches
- Requires time investment or ad spend

*Facebook Ads*:
- Target by location, age, homeowner status
- "Need to sell your house quickly?"
- Can generate leads for $20-50 each

*Google Ads*:
- High intent traffic
- More expensive ($50-150 per lead)
- Higher quality leads

**Marketing Method 4: Networking**

Build relationships with:
- Estate attorneys
- Divorce attorneys
- Property managers
- Real estate agents (they'll refer deals they can't list)
- Other wholesalers

These referral sources can provide warm leads consistently.

**Marketing Method 5: Cold Calling**

Skip trace phone numbers for target lists, then call:

*Script*:
"Hi, I'm [name], a local investor. I'm calling because I noticed [property address]. Is this something you might consider selling if the terms were right?"

Cold calling is high effort but effective when done consistently.

**Building Your Marketing Machine**

Start with one method and master it:
1. Month 1-2: Driving for dollars + direct mail
2. Month 3-4: Add cold calling
3. Month 5+: Add online marketing

Consistency beats strategy. Any method works if you do it enough.`,
          },
        ],
      },
      {
        title: "Analyzing Deals and Closing",
        lessons: [
          {
            title: "Deal Analysis: Calculating Your Maximum Offer",
            duration: 40,
            content: `The fastest way to fail in wholesaling is overpaying for properties. This lesson teaches you the formulas and process for calculating offers that leave room for everyone to profit.

**The MAO Formula**

Maximum Allowable Offer (MAO) = ARV × 0.70 - Repairs - Your Fee

Where:
- ARV = After Repair Value (what the property is worth fixed up)
- 0.70 = Most investors want to buy at 70% or less
- Repairs = Cost to renovate
- Your Fee = Your assignment fee (typically $5,000-20,000)

**Step 1: Determine ARV**

*Methods*:
1. Comparable sales (best)
   - Find 3-5 similar homes sold in last 90 days
   - Same neighborhood, similar size/condition
   - Average the sale prices

2. Real estate agent BPO
   - Ask a local agent for a Broker Price Opinion
   - Offer to pay $50-100 or promise future referrals

3. Online tools (least accurate)
   - Zillow, Redfin estimates
   - Use as sanity check only

*Example*: 
3 bed/2 bath homes in the area recently sold for:
$195,000, $210,000, $205,000
Average ARV: $203,000

**Step 2: Estimate Repairs**

*Quick estimation method*:
- Light cosmetic (paint, carpet, clean): $5,000-15,000
- Medium rehab (kitchen, bathrooms, flooring): $20,000-40,000
- Heavy rehab (structural, full gut): $50,000-100,000+

*Per square foot method*:
- Light: $5-15/sqft
- Medium: $15-30/sqft
- Heavy: $30-50+/sqft

*Get contractor bids*: For accuracy, walk the property with a contractor before making your offer

*Example*:
1,500 sqft home needing medium rehab
Estimate: $20/sqft × 1,500 = $30,000

**Step 3: Calculate MAO**

Using our example:
- ARV: $203,000
- 70% of ARV: $142,100
- Repairs: $30,000
- Your fee: $10,000

MAO = $142,100 - $30,000 - $10,000 = $102,100

Offer: $95,000-102,000 (round down for negotiating room)

**The 70% Rule Variations**

- 70%: Standard for most flippers
- 65%: More conservative markets, higher risk deals
- 75%: Hot markets where investors will pay more

Know your local market and adjust accordingly.

**Deal or No Deal?**

Quick screening checklist:
✓ Seller motivation is real
✓ ARV is verifiable with comps
✓ Repairs are accurately estimated
✓ Numbers work at 70% formula
✓ You have buyers for this type of property

If any of these fail, either negotiate harder or walk away.`,
          },
          {
            title: "Building Your Buyer List and Assigning Contracts",
            duration: 38,
            content: `A wholesale deal isn't done until you have a buyer. Building a strong buyer list is what separates consistent wholesalers from those who occasionally get lucky.

**Why Your Buyer List is Everything**

With a strong buyer list:
- Contracts get assigned quickly (often within 24 hours)
- You can confidently make offers knowing you have buyers
- Repeat buyers become reliable partners
- Word spreads that you bring good deals

**Finding Cash Buyers**

**Method 1: Cash Transaction Records**
County records show which purchases were cash (no mortgage). Look for:
- Recent cash purchases in your target areas
- LLCs or company names (usually investors)
- Repeat buyers (most active investors)

**Method 2: Real Estate Investment Groups**
Local REI groups meet regularly:
- Attend meetings and network
- Present your deals
- Collect contact info
- Follow up after meetings

**Method 3: Craigslist and Facebook**
Post your deals in:
- Craigslist "real estate for sale" section
- Facebook Marketplace
- Local real estate investment Facebook groups

**Method 4: Other Wholesalers**
Other wholesalers are often buyers too:
- They might have buyers you don't
- Partnering can split fees but complete deals
- Build relationships in wholesale communities

**Method 5: Property Management Companies**
Property managers know landlords:
- They can refer your deals to clients
- Offer referral fees for closed deals

**What Buyers Want to Know**

When marketing to buyers, include:
1. Property address
2. ARV (with comp support)
3. Repair estimate
4. Your price (contract + assignment fee)
5. Photos (interior and exterior)
6. Key details (beds, baths, sqft, lot size)

**The Assignment Process**

Once you have a buyer:

*Step 1: Negotiate assignment fee*
- Standard: $5,000-20,000
- Based on deal quality and market
- Be transparent about your fee

*Step 2: Sign assignment agreement*
- Transfers your contract rights to buyer
- Buyer pays assignment fee at closing
- Use a standard assignment contract

*Step 3: Coordinate closing*
- Title company handles paperwork
- Buyer wires purchase price + your fee
- Seller receives their contracted amount
- You receive assignment fee at closing

**Double Closing Alternative**

If you don't want to disclose your fee:

1. Close with seller (you buy the property)
2. Immediately close with buyer (you sell the property)
3. Both transactions happen same day
4. Your profit is the difference

Requires more capital (even if just for a few hours) but keeps your spread private.

**Building Long-Term Buyer Relationships**

Your best buyers become partners:
- Understand their criteria (property type, location, price range)
- Bring them deals first before marketing widely
- Be honest about property condition
- Deliver what you promise

A reliable buyer list is the most valuable asset in your wholesale business.`,
          },
        ],
      },
    ],
  },

  // =====================================================
  // NEW COURSE 20: TikTok Shop Affiliate Marketing
  // =====================================================
  {
    title: "TikTok Shop Affiliate Marketing",
    slug: "tiktok-shop-affiliate",
    shortDesc: "Earn commissions promoting products on TikTok Shop — the fastest-growing social commerce opportunity.",
    description: `**Cash In on the TikTok Shopping Revolution**

TikTok Shop is exploding, and affiliate marketing on the platform is one of the fastest ways to earn money from content. Create videos showcasing products, and earn 10-30% commission on every sale — no inventory, no customer service, no shipping.

**What You'll Learn:**
- Getting approved for TikTok Shop affiliate program
- Finding high-commission products that convert
- Creating content that drives sales
- Scaling your TikTok Shop income
- Building toward your own TikTok Shop

**Why TikTok Shop Works:**
TikTok's algorithm shows your content to interested buyers. When someone purchases through your video, you earn commission automatically. Top creators are making $10,000+/month with simple product review videos.

Join the social commerce wave while it's still early.`,
    thumbnail: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80",
    price: 59,
    originalPrice: 129,
    category: "Social Media",
    level: "BEGINNER" as const,
    tags: ["TikTok", "Affiliate Marketing", "E-Commerce", "Social Commerce", "Income"],
    isFeatured: true,
    totalHours: 6,
    modules: [
      {
        title: "TikTok Shop Fundamentals",
        lessons: [
          {
            title: "Getting Started with TikTok Shop Affiliate",
            duration: 35,
            isFree: true,
            content: `TikTok Shop combines the viral potential of TikTok with the buying intent of e-commerce. As an affiliate, you earn money by promoting products in your content — every purchase through your content earns you commission.

**How TikTok Shop Affiliate Works**

1. You create TikTok videos featuring products
2. Products appear as a shopping link on your video
3. Viewers tap and purchase without leaving TikTok
4. You earn 10-30% commission on each sale

**Getting Approved**

Requirements for TikTok Shop Affiliate:
- 1,000+ followers (some regions lower)
- 18 years or older
- Account in good standing
- Public account

*Application process*:
1. Open TikTok → Profile → Menu
2. Find "TikTok Shop" or "Creator tools"
3. Apply for TikTok Shop
4. Complete identity verification
5. Wait for approval (typically 1-3 days)

**Understanding the Commission Structure**

Commission varies by:
- Product category (beauty 20-30%, electronics 5-10%)
- Seller-set commission (some offer above-standard rates)
- Promotional periods (sellers sometimes boost commissions)

*Where to find commission rates*:
TikTok Shop → Affiliate → Product listings show commission percentage

**The Product Selection Strategy**

Not all products convert equally. Look for:

*Product criteria*:
- Visual appeal (looks good in video)
- Under $50 (impulse buy range)
- Clear benefit (obvious why you'd want it)
- Positive reviews on TikTok Shop
- Adequate commission (15%+ preferred)

*Categories that perform well*:
- Beauty and skincare
- Kitchen gadgets
- Phone accessories
- Fitness items
- Home organization

**Your First Video**

Keep it simple:
1. Show the product in use
2. Explain the key benefit
3. Natural, authentic feel
4. Product link appears automatically

No need for fancy production. Authentic, relatable content often outperforms polished ads.

**Understanding the Metrics**

Key metrics to track:
- Video views
- Product link clicks
- Orders
- Commission earned

TikTok Shop dashboard shows all of this in real-time.`,
          },
          {
            title: "Finding Products That Convert",
            duration: 38,
            content: `Your product selection determines 80% of your success in TikTok Shop affiliate marketing. This lesson shows you how to find products that actually sell.

**The Product Research Process**

**Step 1: Browse the TikTok Shop Affiliate Marketplace**

Open TikTok Shop → Affiliate → Find Products

*Sort and filter by*:
- Commission rate (highest first)
- Sales volume (most sold)
- Category (your niche)

*What high sales volume indicates*:
- Product is proven to convert on TikTok
- Viewers are willing to buy
- Content style is validated

**Step 2: Analyze Top-Selling Products**

When you find a high-seller, research:
- What videos are promoting it?
- How are they presenting the product?
- What's the hook they're using?
- What's the price point?

This tells you what works.

**Step 3: Check the Competition**

*High competition (many creators promoting)*:
- Pros: Proven demand
- Cons: Harder to stand out

*Low competition*:
- Pros: Less noise
- Cons: Might not convert well

Balance: Find products with some proven sales but room for your unique angle.

**The Product Sweet Spot**

Best TikTok Shop products have:
- Price: $15-50 (impulse buy range)
- Commission: 15-30%
- Visual appeal: Looks interesting on video
- Clear transformation: Before/after or problem/solution
- Broad appeal: Relatable to many viewers

**Category-Specific Tips**

*Beauty*:
- Before/after transformations perform best
- Skin care routines showing application
- "Dupe" videos comparing to expensive brands

*Kitchen gadgets*:
- Show the gadget solving a cooking problem
- Satisfying videos (peeling, slicing, organizing)
- Recipe content featuring the product

*Home organization*:
- Messy-to-clean transformations
- "Amazon finds" style reveals
- Small space solutions

**Sample Finding Strategy**

Use the TikTok Shop affiliate finder:
- Commission rate high to low
- Sales volume medium-high (1,000+ but not over-saturated)
- Your category
- Price $15-40

Review top 20 products. Pick 3-5 that:
- You can authentically promote
- Have clear content angles
- Aren't oversaturated yet

Create 2-3 videos per product and see what performs.`,
          },
        ],
      },
      {
        title: "Creating Content That Sells",
        lessons: [
          {
            title: "Video Formats That Drive TikTok Shop Sales",
            duration: 40,
            content: `Certain video formats consistently outperform others for TikTok Shop sales. This lesson covers the proven formats and how to execute each one.

**Format 1: The Product Demo**

Show the product being used in real life.

*Structure*:
- Hook: "This [product] changed my [routine]"
- Demo: Show yourself using it
- Result: Show the outcome
- CTA: "Link in bio" or shopping bag appears

*Example for a face massager*:
"My morning skincare routine was missing this..." [show using the massager] "Look at the difference after 2 weeks" [show result]

**Format 2: The Problem-Solution**

Identify a relatable problem, present product as solution.

*Structure*:
- Problem: "I was struggling with [issue]"
- Failed solutions: "I tried [alternatives]"
- Solution: "Then I found this [product]"
- Proof: Show it working

*Example for kitchen organizer*:
"My cabinet was a disaster..." [show messy cabinet] "I tried bins, I tried labels..." [show failures] "Then I found this" [show product] [transformation to organized]

**Format 3: The Review/Honest Opinion**

Authentic review with pros and cons.

*Structure*:
- Introduction: "I tried [product] so you don't have to"
- Pros: What you liked (be specific)
- Cons: What could be better (builds trust)
- Verdict: "Worth it if..." or "Skip if..."

*Why this works*: Authenticity builds trust. Viewers know you're not just selling.

**Format 4: The Comparison**

Compare product to alternatives or expensive brands.

*Structure*:
- Setup: "Everyone's been asking about [product] vs [alternative]"
- Comparison: Side-by-side demonstration
- Verdict: Which wins and why

*Example*:
"This $15 face cream vs the $80 brand name..." [compare application, results, ingredients] "Honestly, the dupe is 90% as good"

**Format 5: The Transformation/Before-After**

Most powerful for beauty, fitness, home products.

*Structure*:
- Before: Show the problem state
- Process: Show using the product
- After: Dramatic reveal

*Tips*:
- Same lighting for before/after
- Genuine transformation (don't fake it)
- Text overlay with timeline

**Content Creation Best Practices**

*Hook in first 2 seconds*: 
- Text on screen
- Movement/action
- Intriguing statement

*Keep it short*:
- 15-30 seconds for most products
- Up to 60 seconds for detailed reviews

*Sound matters*:
- Trending sounds boost discovery
- Clear voiceover for explanation
- Music that matches energy

*Lighting*:
- Natural light is best
- Product should be clearly visible
- Clean, uncluttered background

**Posting Strategy**

- 1-3 videos per day (consistency wins)
- Test different times (your analytics show best times)
- Rotate products to find winners
- Double down on what works`,
          },
          {
            title: "Scaling to $5k/Month and Beyond",
            duration: 35,
            content: `Once you've validated what works, it's time to scale. This lesson covers how to turn occasional sales into consistent $5,000+/month income.

**The Scaling Math**

To hit $5,000/month in commissions:
- $5,000 ÷ 20% avg commission = $25,000 in product sales
- $25,000 ÷ $30 avg product = ~833 orders
- 833 orders ÷ 30 days = ~28 orders/day

At 2% conversion on link clicks:
- 28 orders ÷ 2% = 1,400 link clicks/day
- 1,400 clicks ÷ 2% CTR = 70,000 views/day

This is achievable with consistent posting and occasional viral content.

**Scaling Strategy 1: Volume**

More content = more opportunities for sales

*The volume approach*:
- Post 3 videos/day minimum
- Test multiple products
- Track what converts
- Double down on winners

*Batching content*:
- Film multiple videos in one session
- Schedule posts throughout the day
- Create variations of winning formats

**Scaling Strategy 2: Optimization**

Improve conversion on existing content:

*Analyze your best performers*:
- What hook did you use?
- What product type?
- What format?
- What time posted?

*Replicate success*:
- Create similar videos for similar products
- Use the same hooks with variations
- Post at your best-performing times

**Scaling Strategy 3: Product Expansion**

*Niche down, then expand*:
1. Master one category (e.g., skincare)
2. Build audience around that niche
3. Expand to adjacent categories (beauty tools, makeup)
4. Test new categories with proven formats

*Build relationships with sellers*:
- High performers get exclusive rates
- Sellers may send free products
- Early access to new products

**Scaling Strategy 4: Multiple Accounts**

Advanced strategy for serious scaling:

*Why multiple accounts*:
- Different niches/audiences
- Diversification
- More content surface area

*Execution*:
- Different email per account
- Different niche per account
- Can repurpose content strategies

**Moving Beyond Affiliate**

Ultimate scale: Your own TikTok Shop

*Progression*:
1. Affiliate: Learn what sells (no risk)
2. Source products: Find suppliers for winning products
3. Own shop: Higher margins (30-50% vs 15-20% commission)

*Requirements for own shop*:
- Business registration
- Product sourcing
- Customer service capability
- Inventory/fulfillment solution

Many top affiliates transition to their own shops within 6-12 months.

**The $5k/Month Reality**

Realistic timeline:
- Month 1: Learning, first sales ($100-500)
- Month 2-3: Finding winning products ($500-1,500)
- Month 4-6: Scaling what works ($1,500-3,000)
- Month 7-12: Consistent scaling ($3,000-5,000+)

Keys to success:
- Consistency over virality
- Data-driven product selection
- Authentic content style
- Patience during the learning phase`,
          },
        ],
      },
    ],
  },
];

async function main() {
  console.log("🌱 Starting seed with 20 courses...");

  // Delete related data first (cascading), but preserve users if possible
  console.log("🗑️ Clearing course-related data...");
  
  await prisma.quizAttempt.deleteMany();
  await prisma.lessonProgress.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.wishlist.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.review.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.module.deleteMany();
  await prisma.course.deleteMany();

  console.log("✅ Cleared existing course data");

  // Upsert admin user
  const adminPassword = await bcrypt.hash("Admin123!@#", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@skillmint.io" },
    update: {},
    create: {
      name: "SkillMint Admin",
      email: "admin@skillmint.io",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  // Upsert demo students
  const studentPassword = await bcrypt.hash("Student123!", 12);
  const studentEmails = ["marcus@example.com", "priya@example.com", "jake@example.com", "sofia@example.com"];
  const studentNames = ["Marcus Chen", "Priya Sharma", "Jake Morrison", "Sofia Rodriguez"];
  
  const students = await Promise.all(
    studentEmails.map((email, i) =>
      prisma.user.upsert({
        where: { email },
        update: {},
        create: {
          name: studentNames[i],
          email,
          password: studentPassword,
          role: "STUDENT",
        },
      })
    )
  );

  console.log("✅ Users ready");

  // Seed courses
  for (const courseData of COURSES) {
    const { modules: modulesData, ...courseFields } = courseData;

    const totalLessons = modulesData.reduce((sum, m) => sum + m.lessons.length, 0);

    const course = await prisma.course.create({
      data: {
        ...courseFields,
        totalLessons,
      },
    });

    // Create modules and lessons
    for (let mIdx = 0; mIdx < modulesData.length; mIdx++) {
      const moduleData = modulesData[mIdx];
      const module = await prisma.module.create({
        data: {
          courseId: course.id,
          title: moduleData.title,
          order: mIdx + 1,
        },
      });

      for (let lIdx = 0; lIdx < moduleData.lessons.length; lIdx++) {
        const lessonData = moduleData.lessons[lIdx];
        await prisma.lesson.create({
          data: {
            moduleId: module.id,
            title: lessonData.title,
            order: lIdx + 1,
            duration: lessonData.duration,
            content: lessonData.content,
            isFree: (lessonData as any).isFree || lIdx === 0,
            videoUrl: null,
          },
        });
      }
    }

    // Add enrollments and reviews
    const numStudents = Math.floor(Math.random() * 4) + 1;
    const selectedStudents = students.slice(0, numStudents);

    for (const student of selectedStudents) {
      const progress = Math.floor(Math.random() * 100);
      await prisma.enrollment.create({
        data: {
          userId: student.id,
          courseId: course.id,
          progress,
          completedAt: progress === 100 ? new Date() : null,
        },
      });

      const reviews = [
        "This course completely changed how I approach this topic. The practical examples are gold.",
        "Best investment I've made this year. Clear, actionable, and taught by someone who actually does it.",
        "I've taken many courses on this subject, and this one is leagues ahead. Real strategies, not theory.",
        "Exactly what I needed. The step-by-step approach made it easy to follow even as a beginner.",
      ];

      await prisma.review.create({
        data: {
          userId: student.id,
          courseId: course.id,
          rating: Math.floor(Math.random() * 2) + 4,
          comment: reviews[Math.floor(Math.random() * reviews.length)],
        },
      });
    }

    console.log(`✅ Created: ${course.title}`);
  }

  // Issue certificates
  const completedEnrollments = await prisma.enrollment.findMany({
    where: { completedAt: { not: null } },
  });

  for (const enrollment of completedEnrollments) {
    await prisma.certificate.upsert({
      where: {
        userId_courseId: {
          userId: enrollment.userId,
          courseId: enrollment.courseId,
        },
      },
      create: {
        userId: enrollment.userId,
        courseId: enrollment.courseId,
        issuedAt: enrollment.completedAt!,
      },
      update: {},
    });
  }

  console.log("✅ Issued certificates");
  console.log("\n🎉 Seed complete with 20 courses!");
  console.log("\n📧 Admin: admin@skillmint.io / Admin123!@#");
  console.log("📧 Demo: marcus@example.com / Student123!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
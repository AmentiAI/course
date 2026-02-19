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
  {
    title: "NFT Flipping Masterclass",
    slug: "nft-flipping-masterclass",
    shortDesc:
      "Learn to spot undervalued NFTs, execute floor sweeps, and build a consistent flipping system that generates income.",
    description: `The NFT market is still one of the most lucrative opportunities for fast, asymmetric returns — if you know what you're doing. This course cuts through the noise and gives you a repeatable, data-driven system for identifying undervalued NFTs before the market catches on.

You'll learn how professional flippers actually think: not by guessing, but by reading on-chain signals, understanding rarity mechanics, and using tools that 99% of retail buyers don't even know exist.

By the end of this course, you'll have a full flipping workflow — from discovery to exit — that you can run daily in under 2 hours. We'll cover real examples of 10x+ flips with exact entry and exit points, so you can learn from trades that actually happened.

This isn't theory. This is what's working right now.`,
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
      {
        title: "Execution: Buying, Holding, and Exiting",
        lessons: [
          {
            title: "Timing Your Entries: Floor Sweeps and Catalyst Events",
            duration: 30,
            content: `The difference between a 2x flip and a 5x flip is usually timing. In this lesson, we'll build your playbook for identifying the right entry points.

**The Catalyst Framework**

Every significant NFT price move is driven by a catalyst. Your job is to identify catalysts *before* they become common knowledge. Here are the main types:

**1. Announcement Catalysts**
- Team roadmap updates (new utility, token airdrops, game launches)
- Partnership announcements
- Exchange listings for the project's token
- Celebrity endorsements

How to track: Join the project's Discord, follow key team members on Twitter, use DappRadar for project news

**2. Market Catalysts**
- ETH/SOL price appreciation (rising tide)
- Broader NFT market bull phase
- Blue chip floor movements (when BAYC pumps, everything tends to follow)

**3. Technical Catalysts**
- Floor approaching a psychological support level after a correction
- Major whale accumulation detected
- Upcoming mint/burn event

**The Floor Sweep Strategy**

Floor sweeping means buying multiple cheap NFTs in a collection simultaneously. This is typically done when:

1. You have high conviction in a coming catalyst
2. The floor has recently compressed (short-term sellers capitulating)
3. Volume is picking up before the catalyst is public knowledge

**Calculating Your Position Size**

Never sweep more than you can afford to hold for 3-6 months if the trade goes wrong. The rule for beginners:
- Max 20% of your portfolio in any single collection
- Max 5-7 NFTs from the same collection in one sweep
- Keep 30% of your portfolio in stablecoins/ETH for opportunities

**Entry Checklist**
Before any purchase, verify:
✓ Volume trending up in last 48h
✓ Unique buyers increasing
✓ No major negative news in the Discord
✓ Price is at or below your calculated trait floor
✓ You have a clear exit plan`,
          },
          {
            title: "Timing Your Exits: When to Sell for Maximum Profit",
            duration: 26,
            content: `Most NFT flippers are decent at buying. The best ones are exceptional at selling. This lesson is about maximizing your exit.

**The Psychology of Holding Too Long**

Every trader does this at some point: you buy at 0.1 ETH, it runs to 0.3 ETH, you get greedy and wait for 0.5 ETH, it corrects back to 0.15 ETH, and you exit at breakeven or a small loss. This is the greed trap.

**The Rules-Based Exit Strategy**

Remove emotion by setting rules in advance:

**Rule 1: The 2x Auto-Sell**
If you bought with the intention of flipping (not holding), set a limit order to sell at 2x your purchase price. Take the guaranteed win. You can always buy back lower.

**Rule 2: The Time-Stop**
If you haven't 2x'd within 4 weeks, reassess. What was the original catalyst? Did it not materialize? If the thesis is broken, exit at whatever price you can. Capital tied up in a dead trade is capital you can't use elsewhere.

**Rule 3: The Trailing Floor**
As the floor rises, raise your mental stop-loss. If you bought at 0.1 ETH and floor runs to 0.3 ETH, your stop is now 0.2 ETH. If it hits 0.2 ETH, exit. This lets you ride momentum while protecting most of your gains.

**Listing Tactics for Maximum Sale Price**

- Don't list at the exact floor — list slightly above (5-10%). Your NFT will appear as a "deal" when compared to less rare ones at similar prices
- Use Blur for zero royalty sales (more profit to you)
- Update your listing price as the floor moves — stale listings get passed over by snipers

**Taking Profits in Crypto**
Always take profits in ETH or SOL, not in the collection's token. The collection token is almost always more volatile and will dump harder in a bear market. Your profit isn't real until it's in ETH.`,
          },
          {
            title: "Tax Optimization for NFT Traders",
            duration: 20,
            content: `Nobody wants to talk about taxes, but ignoring them is one of the most expensive mistakes NFT traders make. This lesson will help you keep more of your profits.

**How NFT Profits Are Taxed (US Focus)**

In the US and most jurisdictions, NFT flipping income is treated as either:
- **Short-term capital gains** if held < 1 year: taxed as ordinary income (up to 37%)
- **Long-term capital gains** if held > 1 year: taxed at 0%, 15%, or 20%

**The wash sale rule technically doesn't apply to crypto/NFTs** (as of 2024), which means you can sell an NFT at a loss and immediately rebuy the same NFT to lock in the loss for tax purposes. This may change with legislation — always consult a tax professional.

**Tracking Your Trades**

You MUST track every transaction. Tools that help:
- **Koinly**: Imports from MetaMask, Coinbase, Blur, etc. Generates tax reports
- **CoinTracker**: Similar functionality, good UI
- **TaxBit**: Enterprise-grade, better for high-volume traders

**Legal Strategies to Reduce Tax Burden**

1. **Offset gains with losses**: If you made $10,000 in gains but lost $3,000 on bad flips, you only pay on $7,000
2. **Hold for long-term rates**: If you're holding with conviction, waiting 366 days dramatically reduces your tax rate
3. **Business expenses**: If you're operating as a business, many expenses are deductible (software subscriptions, hardware, education)
4. **Retirement accounts**: Some self-directed IRAs now allow crypto investments

**The Golden Rule**
Set aside 30-40% of every profit in a stablecoin from day one. Tax season should never surprise you.`,
          },
        ],
      },
      {
        title: "Building Your Flipping System",
        lessons: [
          {
            title: "Case Study: Anatomy of a 10x Flip",
            duration: 32,
            content: `Let's break down three real flip opportunities step by step — what the entry looked like, what signals were present, and how the exit played out.

**Case Study #1: The Degen Toonz Floor Sweep (2022)**

*Entry*: 
- Collection had dropped 80% from its ATH during the bear market
- Floor: 0.06 ETH (down from 0.3 ETH ATH)
- Signal: Volume starting to tick up, team announced new partnership
- Position: Bought 5 floor NFTs at 0.06 ETH each = 0.3 ETH total

*Hold*:
- Week 1: Floor held at 0.06 ETH, volume steady
- Week 2: Partnership news dropped, volume 3x'd in 24h
- Week 3: Floor pushed to 0.18 ETH as collectors entered

*Exit*:
- Listed all 5 at 0.19 ETH (just above floor)
- All sold within 48 hours
- Total exit: 0.95 ETH
- P&L: +0.65 ETH (~$1,100 at the time)

**Case Study #2: The Trait Snipe (Any Collection)**

*Setup*: Use NFTNerds Sniper with these parameters:
- Collection: [any mid-tier pfp with 10k supply]
- Rarity rank: top 500
- Price: less than 2x floor

*Execution*: 
A top-200 rarity NFT lists at 1.3x floor. Based on recent sales, top-200 ranks sell at 2.5-3x floor. This is underpriced by 50%.

Buy immediately. List at 2.3x floor. Sell within 1 week.

**Case Study #3: The Ecosystem Play**

When a major protocol airdropped tokens to NFT holders, every collection in that ecosystem pumped 50-200%. Those who held NFTs from that ecosystem in the 2 weeks before the announcement 3-5x'd their investment.

*The lesson*: Follow the money. Track which protocols are building NFT integrations and position before the announcement is public.

**Your System Checklist**
Daily (30 min):
□ Check Icy.tools top movers
□ Monitor NFTNerds alerts for your watchlist
□ Review your open positions against their traits

Weekly (1 hour):
□ Update watchlist based on upcoming catalysts
□ Review trades won and lost — what did you miss?
□ Adjust position sizes based on current portfolio value`,
          },
          {
            title: "Building Your Repeatable Flipping Workflow",
            duration: 24,
            content: `The goal of this course is to give you a system, not just knowledge. In this final lesson, we assemble everything into a workflow you can run every day to generate consistent NFT flipping income.

**The Daily Flipping Stack**

Morning Routine (20 minutes):
1. Check ETH/SOL price. Is the broader market up or down? Adjust risk accordingly.
2. Open Icy.tools → sort by 24h volume → look for collections with 2x+ their weekly average volume
3. Open Twitter/X → search "NFT" sorted by Latest → scan for collection news
4. Check your Discord watchlist → any alpha from communities you're in?

Midday (30 minutes, optional):
1. Open NFTNerds Sniper → check any new listings in your target collections
2. Check active bids on Blur → are whales bidding aggressively?
3. Review open positions → adjust listings if floor has moved

Evening (15 minutes):
1. Check for any pending sales
2. Update your trading journal
3. Prepare tomorrow's watchlist

**The Trading Journal**

You must track every trade. Your journal should include:
- Date bought / sold
- Collection and token ID
- Entry price and reason
- Exit price and reason
- P&L in ETH and USD

After 30 trades, patterns will emerge. You'll see which types of opportunities you're best at identifying and which you consistently miss.

**Scaling Up**

Start with small positions (0.05-0.1 ETH per NFT) until you have 10 successful flips. Then scale position sizes gradually. The goal is:
- Month 1: Learn and validate the system
- Month 2-3: Scale to 0.2-0.5 ETH positions
- Month 4+: Target 1-5 ETH positions where trades net $1,000-$5,000+ each

**Final Thoughts**

The NFT market is cyclical. There are periods of high activity where daily flips are easy, and bear markets where you need to be more selective. The system works in both — you just adjust your position sizing and holding periods.

Congratulations on completing the NFT Flipping Masterclass. The knowledge you have now puts you ahead of 95% of NFT participants. Now execute.`,
          },
        ],
      },
    ],
  },
  {
    title: "Bitcoin Ordinals & BRC-20 Mastery",
    slug: "bitcoin-ordinals-brc20",
    shortDesc:
      "Master Bitcoin Ordinals, mint inscriptions, evaluate early projects, and profit from the BRC-20 ecosystem.",
    description: `Bitcoin Ordinals is the most technically interesting and potentially lucrative opportunity in crypto right now — and almost no one understands it properly.

This course gives you a deep technical understanding of how Ordinals work, paired with practical trading strategies for profiting from inscriptions, BRC-20 tokens, and early project evaluations.

You'll learn to use every major Ordinals platform, evaluate projects before they explode, and secure your Bitcoin properly for this new asset class.`,
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
      {
        title: "Security and Portfolio Management",
        lessons: [
          {
            title: "Bitcoin Wallet Security for Ordinals",
            duration: 25,
            content: `Ordinals introduce unique security challenges because your valuable inscriptions are tied to specific satoshis. One wrong move can destroy them permanently.

**The Core Risk: UTXO Management**

Bitcoin doesn't work like Ethereum. Your balance is actually a collection of UTXOs (Unspent Transaction Outputs) — pieces of Bitcoin from previous transactions. When you spend Bitcoin, you're actually selecting which UTXOs to spend.

Your inscribed satoshis live inside specific UTXOs. If you use a regular Bitcoin wallet to send Bitcoin, it might accidentally spend the UTXO containing your inscription — destroying or losing it forever.

**The Golden Rule: Use Ordinals-Aware Wallets**

Only use wallets that understand Ordinals:
- Unisat Wallet
- Xverse Wallet  
- Hiro Wallet (also works on Stacks)

These wallets mark your inscribed UTXOs as "unspendable" to prevent accidental losses.

**Hardware Wallet Integration**

For high-value inscriptions:
1. Unisat supports Ledger hardware wallets for extra security
2. Keep your most valuable inscriptions in a hardware wallet
3. Use a "hot" Unisat wallet only for new mints and trading

**Seed Phrase Security**

This applies to all crypto, but it's critical:
- Write your seed phrase on paper (multiple copies)
- Store in physically secure locations (safe, safety deposit box)
- NEVER store seed phrases digitally (no photos, no cloud storage)
- NEVER share seed phrases with anyone or any website

**Common Scams in the Ordinals Space**

1. Fake mint sites that steal your keys
2. Discord phishing (fake admin DMs)
3. "Free claim" scams that drain your wallet
4. Counterfeit collections that copy legitimate art

Always verify you're on the official project website. Bookmark it. Never click links from Discord or Twitter DMs.`,
          },
          {
            title: "Building a Profitable Ordinals Portfolio",
            duration: 28,
            content: `The Ordinals ecosystem is maturing fast. This lesson covers portfolio construction principles for long-term profitability.

**Portfolio Allocation for Ordinals**

Treat your Ordinals portfolio as high-risk speculation. Allocation guidelines:
- Never put more than 10-20% of total crypto portfolio into Ordinals
- Within your Ordinals allocation:
  - 40-50% in established "blue chips" (sub-1000 inscriptions, proven collections like Bitcoin Punks, Ordinal Punks)
  - 30-40% in mid-tier bets (collections with 3-6 months of history and active communities)
  - 10-20% in early-stage speculation (new mints, unproven projects)

**The Blue Chips: What Counts**

Established Ordinals collections that have proven staying power:
- Bitcoin Punks (first 10k pfp collection on Ordinals)
- Ordinal Punks (sub-100 inscription ultra-rare collection)
- Taproot Wizards (community-first, Casey Rodarmor involvement)
- Bitcoin Frogs (established pfp with strong holder community)

These have passed the test of time in a rapidly evolving space.

**Trading Strategy: The Position Ladder**

Instead of buying all at once:
1. Start with 25% of your intended position
2. If thesis plays out (volume increases, community grows), add another 25%
3. At 50% position, wait for a pullback to add the rest

This avoids buying at local tops.

**Exit Strategy for Ordinals**

Ordinals are less liquid than typical crypto. Plan exits in advance:
- Set alerts for floor price targets on Unisat or Magic Eden
- Have a "good enough" price in mind (don't aim for the absolute top)
- During bull phases, it's better to sell slightly early at high liquidity than wait for the peak and struggle to exit`,
          },
        ],
      },
    ],
  },
  {
    title: "Solana DeFi Yield Strategies",
    slug: "solana-defi-yield",
    shortDesc:
      "Master Solana DeFi: liquidity pools, yield farming, liquid staking, and the $1k to $10k DeFi roadmap.",
    description: `Solana's DeFi ecosystem offers some of the highest sustainable yields in crypto — if you know how to navigate it. This course takes you from beginner to confident DeFi participant with strategies for every risk level.

You'll understand how every yield mechanism actually works (not just the surface level), and you'll build a personalized DeFi strategy based on your risk tolerance and capital.`,
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
      {
        title: "Strategy and Capital Deployment",
        lessons: [
          {
            title: "The $1k to $10k DeFi Roadmap",
            duration: 45,
            content: `This is the lesson most people signed up for — a concrete, actionable roadmap for growing a DeFi portfolio from $1,000 to $10,000+.

**Phase 1: $1,000 — Capital Preservation and Learning ($0-$3k portfolio)**

At this stage, your primary goal is NOT to maximize yield. Your primary goal is to avoid losing capital while learning the ecosystem.

*Allocation*:
- 50% SOL (bare SOL, not in DeFi yet — just holding)
- 30% Stable LP on Meteora or Orca (USDC/USDT) — earning 5-10% with zero IL risk
- 20% mSOL or jitoSOL — earning base staking yield

*Why this conservative?*
- You're still learning to use wallets and protocols safely
- Small mistakes in DeFi (wrong transaction, rug pull) can wipe you out
- The learning curve has a real cost

*Time to master Phase 1*: 4-8 weeks
*Target growth from Phase 1*: 8-12% annually, zero major loss

**Phase 2: $3,000-$6,000 — Moderate Yield Optimization**

Once you've used DeFi safely for 2 months, you can add complexity.

*Allocation*:
- 30% SOL (bare holding for volatility upside)
- 25% jitoSOL/SOL LP on Orca Whirlpools (13-16% APY)
- 25% USDC/USDT stable LP with Meteora vaults (8-12%)
- 20% Higher-yield opportunity (new pool with farming rewards, 20-40% APY but higher risk)

*Adding Farming Rewards*
Raydium and Orca regularly launch new pools with extra reward incentives. These are often temporary (30-90 day campaigns) with high APY. Strategy:
1. Enter when rewards are high
2. Exit before rewards end (APY collapses when rewards stop)
3. Rotate to the next rewarded pool

**Phase 3: $6,000-$10,000+ — Advanced Strategies**

*Leverage Yield Farming*
Platforms like Tulip Protocol let you leverage your LP positions — borrow against your LP to add more capital and earn more yield. Risk: liquidation if price moves significantly.

For experienced users only. Start with 1.5x leverage max.

*Delta-Neutral Strategies*
Long SOL spot + Short SOL perp on Drift Protocol. This hedges price exposure while earning funding rates and LP fees. Complex but powerful.

**The Timeline Reality**

$1k → $2k through DeFi yield alone: ~2 years at 15% APY
$1k → $10k through DeFi yield + price appreciation: possible in 1-2 bull market years

DeFi yields alone won't make you rich — but they preserve your capital while you wait for price appreciation and protect against downside.`,
          },
          {
            title: "Rebalancing and Risk Management",
            duration: 28,
            content: `The biggest enemy of long-term DeFi investors isn't bad yields — it's portfolio drift and emotional decision-making. This lesson builds your risk framework.

**Portfolio Drift**

Your carefully constructed allocation breaks down over time as different assets perform differently. If SOL 3x's while your stablecoins stay flat, suddenly 70% of your portfolio is in SOL instead of your intended 30%. This concentrates your risk.

**Monthly Rebalancing Process**

Once a month:
1. Calculate current allocation percentages
2. Compare to your target allocation
3. If any asset is >5% above target → sell down to target
4. Deploy proceeds into underweight categories

This forces you to "sell high, buy low" systematically, removing emotion from the process.

**Defining Your Risk Budget**

Before any trade, answer: "What's the maximum I can afford to lose here?"

For DeFi positions:
- Conservative (stablecoins): 0% expected loss beyond fees
- Moderate (blue-chip LP): accept up to 20% IL in exchange for high yield
- Aggressive (new protocol farming): accept up to 50% loss as a real possibility

If losing 50% of a position would cause you panic or financial stress, don't enter it.

**Smart Contract Risk Management**

Every DeFi protocol carries smart contract risk — the code could have a bug that's exploited by hackers. To manage this:

1. Never put more than 30% of your DeFi capital in any single protocol
2. Prefer audited protocols (check if they have Certik, OtterSec, or other audits)
3. Don't chase extreme yields on brand-new, unaudited protocols
4. Follow DeFi security accounts on Twitter for early warning on exploits

**The "Sleep Test"**

If you'd lose sleep worrying about a position, reduce it until you won't. Your ability to make rational decisions is worth more than the extra 5% APY.`,
          },
          {
            title: "Compounding Strategies: Making Your Yields Work Harder",
            duration: 22,
            content: `Compounding is how small yields turn into significant income. On Solana's fast, cheap network, you can compound frequently without fees eating your gains.

**The Math of Compounding Frequency**

$10,000 at 20% APY:
- Annual compounding: $12,000
- Monthly compounding: $12,194 (+$194)
- Daily compounding: $12,214 (+$214)
- Continuous: $12,214

The difference is real but not enormous at modest capital. At $100,000, however, daily vs. annual compounding = $2,140 more per year.

**Auto-Compounding Tools on Solana**

Rather than manually harvesting and reinvesting, use protocols that do it for you:

*Tulip Protocol*: Deposits into underlying farms and auto-compounds
*Symmetry*: Automated rebalancing and compounding for index-like strategies
*Meteora Vaults*: Auto-compounds stable yield strategies

**Manual Compounding Protocol**

If using basic Raydium/Orca:
1. Harvest pending rewards weekly (Solana fees are low enough to make this worth it)
2. Convert rewards to the pair tokens
3. Add back to LP

This weekly compounding vs. monthly makes a meaningful difference over a year.

**Reinvesting Profits During Bull Markets**

When your DeFi positions are in profit:
- Take 50-75% of profits and reinvest into your LP or staking positions
- Keep 25-50% as "dry powder" (stablecoins or bare SOL) for new opportunities

During bear markets:
- Reduce your LP exposure (convert to stables)
- Keep more in liquid staking (still earns yield with less risk)
- Wait for better entry points on higher-risk farms

**Final Portfolio Check**

Review your DeFi portfolio against these benchmarks:
✓ No single protocol holds >30% of your capital
✓ You have at least 20% in stables or near-stable assets
✓ All protocols you're in have been audited
✓ You know exactly where to withdraw if something goes wrong
✓ Your total yield exceeds your cost basis for the year`,
          },
        ],
      },
    ],
  },
  {
    title: "Crypto Day Trading Blueprint",
    slug: "crypto-day-trading-blueprint",
    shortDesc:
      "Master technical analysis, risk management, and trading psychology to trade crypto profitably.",
    description: `Day trading crypto is one of the most challenging skills to develop — but also one of the most lucrative once you have a proven edge. This course gives you the complete system: technical analysis, risk management, trading psychology, and a backtested strategy you can start applying immediately.

No indicators-as-magic, no promises of easy money. Real trading skills built through fundamentals and practice.`,
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
          {
            title: "The 2% Rule and Stop Loss Mastery",
            duration: 28,
            content: `The 2% rule is the single most important risk management principle in trading. It determines the professional longevity of every trader.

**The 2% Rule Defined**

Never risk more than 2% of your total trading account on a single trade.

If your account is $10,000, maximum risk per trade = $200.
If your account is $1,000, maximum risk per trade = $20.

**Why This Matters: The Math of Ruin**

If you risk 10% per trade and lose 10 consecutive trades (which happens to every trader eventually), your account is down to 35% of its original value — a 65% drawdown.

At 2% per trade, 10 consecutive losses = 18% drawdown. Your account is still at 82%. You can recover from this.

At 10% per trade, recovering from a 65% drawdown requires a 186% gain. Almost impossible.

The 2% rule is about survival, not comfort.

**Setting Stop Losses**

Every trade needs a stop loss placed *before* entry. The stop loss is where your thesis is proven wrong.

*Technical stop placement*:
- For a long trade: Stop goes below the most recent significant swing low
- For a short trade: Stop goes above the most recent significant swing high
- For a breakout trade: Stop goes below the breakout level (if price reclaims resistance → trade invalid)

*Position Sizing from Stop Distance*:

Position Size = (Account Size × Risk %) / (Entry Price - Stop Price)

Example: 
- Account: $5,000
- Risk: 2% = $100
- Entry: $40,000 (BTC)
- Stop: $38,000 (distance = $2,000)

Position size = $100 / $2,000 = 0.05 BTC

This ensures that if your stop is hit, you lose exactly $100 (2% of account).

**Stop Loss Types**

1. **Hard stop**: Order on the exchange automatically executes if price reaches your level
2. **Mental stop**: You watch and manually close if price reaches level (NOT recommended for crypto — markets move fast)

Always use hard stops on exchanges.`,
          },
        ],
      },
      {
        title: "Trading Psychology and Systems",
        lessons: [
          {
            title: "The Trading Journal: Your Most Valuable Tool",
            duration: 20,
            content: `The trading journal is the practice that separates traders who improve from those who make the same mistakes for years. After 6 months of disciplined journaling, most traders see their win rate improve significantly — not because the market changed, but because they identified and corrected their patterns.

**What to Record for Every Trade**

Create a spreadsheet (or use an app like Tradervue) with these columns:
1. Date and time
2. Asset (BTC, ETH, SOL, etc.)
3. Direction (Long / Short)
4. Entry price
5. Stop loss price
6. Target price
7. Position size
8. Risk amount ($)
9. Exit price
10. P&L ($)
11. P&L (%)
12. Trade reason (why did you enter?)
13. Exit reason (why did you exit?)
14. Emotional state (1-5 scale)
15. Was this a plan-adherent trade? (Yes/No)
16. Chart screenshot

**Monthly Review Process**

At the end of each month:
1. Calculate win rate, average win, average loss, risk-reward ratio
2. Filter by setup type — which setups are profitable? Which aren't?
3. Look at emotional state vs. outcome — are you making worse decisions when stressed?
4. Check plan adherence — are you following your rules?

Most traders discover one or two fatal patterns:
- Taking profits too early on winners
- Moving stops when trades go against them
- Revenge trading after losses

These patterns only become visible through the journal.`,
          },
          {
            title: "FOMO, Revenge Trading, and the Psychology of Losses",
            duration: 30,
            content: `The psychology of trading is where most technical knowledge goes to die. You can know every indicator and still lose consistently if your emotional management is poor.

**The Big Three Trading Emotions**

**1. FOMO (Fear of Missing Out)**

You've been watching Bitcoin for two days. It just broke resistance and is running hard. You didn't catch the initial move. Now it's up 15% from your ideal entry. 

The FOMO response: "I need to buy NOW before it goes higher."
The correct response: "This setup no longer meets my criteria. I'll wait for the next one."

FOMO entries almost always have poor risk-reward ratios — the move you're chasing has already happened.

Rule: If you missed the entry, miss the trade. The market always presents another opportunity.

**2. Revenge Trading**

You just lost 2% on a trade. You're angry. You immediately open another position, larger than your rules allow, to "win it back."

This is the second most dangerous pattern in trading. Losses beget losses when emotion takes over.

The fix: After any loss, mandatory 30-minute break before your next trade. Walk away from the screen. The market will still be there.

**3. Overconfidence After Wins**

After a hot streak, you start increasing position sizes beyond your rules. This often coincides with when the market regime changes, leading to an outsized loss.

The fix: Position sizes never change based on recent performance. Your rules govern sizes, not your recent P&L.

**The Pre-Trade Checklist**

Before entering any trade, answer these questions:
- Is this trade in my trading plan?
- What's my risk amount? Does it follow the 2% rule?
- Is this a quality setup or am I forcing a trade out of boredom?
- Am I in a good emotional state to trade right now?

If any answer is "no," don't trade.`,
          },
          {
            title: "Backtesting Your Strategy: Building Confidence Before Real Money",
            duration: 35,
            content: `Backtesting is the process of applying your strategy to historical data to see how it would have performed. It's the closest thing to a "free trial" of your trading strategy.

**Why Backtesting Matters**

Trading with an untested strategy is gambling. Backtesting transforms a hypothesis into a statistically-backed approach with known characteristics:
- Expected win rate
- Expected average win/loss
- Maximum historical drawdown
- Expected annual return

With these numbers, you can set realistic expectations and size positions appropriately.

**Manual Backtesting Method (TradingView)**

1. Open a chart and go back to a starting date (e.g., January 2022)
2. Cover the right side of the chart with a piece of paper (simulate not knowing what happened)
3. Apply your entry rules — would you have entered this trade?
4. Record the theoretical entry, stop, and target
5. Reveal what actually happened
6. Record the outcome

Repeat 50-100 times. This gives you a statistically meaningful sample.

**What to Look for in Your Results**

Good strategy characteristics:
- Win rate: 40-60% (lower win rate is fine if average wins >> average losses)
- Risk-reward ratio: 1.5:1 minimum (target 2:1+)
- Max drawdown: Should not exceed 15-20% even in worst case

Red flags:
- Win rate below 35% with 1:1 risk-reward (you'll trend toward ruin)
- Profitable only in trending markets, not range-bound (fine if you account for this)
- Works great on 5 sample trades, inconsistent on 50+ (overfitting)

**Automated Backtesting with Pine Script**

TradingView has a scripting language (Pine Script) that lets you code and automatically backtest any strategy. Resources for learning Pine Script are widely available on YouTube and TradingView's documentation.

For serious traders, this is worth learning — it eliminates manual backtest bias.`,
          },
        ],
      },
    ],
  },
  {
    title: "Prompt Engineering for Income",
    slug: "prompt-engineering-income",
    shortDesc:
      "Master ChatGPT, Claude, and Midjourney to build prompt packs, sell them online, and create a $5k/month business.",
    description: `Prompt engineering is one of the fastest-growing skills in 2024 — and almost nobody is doing it strategically. This course shows you how to go from "I use ChatGPT sometimes" to building a systematic income stream from selling prompts and AI services.

You'll learn to write prompts that produce professional-grade outputs, build marketable prompt packs in high-demand niches, and sell them on multiple platforms.`,
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
  {
    title: "Web3 Freelancing: $100k Roadmap",
    slug: "web3-freelancing-100k",
    shortDesc:
      "Build a high-income Web3 freelancing business: the skills that pay, how to find clients, and how to scale to $100k.",
    description: `Web3 companies pay the highest freelance rates in the market — for skills that are more learnable than you think. This course maps your path from $0 to $100k/year in Web3 freelancing income.

Whether you're a developer, writer, designer, or community manager, there's a highly-paid Web3 role that matches your existing skills. We'll show you exactly how to position yourself, find clients, and scale.`,
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
  {
    title: "Twitter/X Growth to $10k/Month",
    slug: "twitter-growth-10k",
    shortDesc:
      "Build a profitable Twitter/X audience from scratch: viral formulas, monetization strategies, and a real $10k/month breakdown.",
    description: `Twitter/X is still the most powerful platform for building authority, finding clients, and selling digital products — especially in the niches this course covers.

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
  {
    title: "Dropshipping Mastery: $10k/Month Blueprint",
    slug: "dropshipping-mastery",
    shortDesc:
      "Find winning products, build a Shopify store, run profitable ads, and scale to $10k/month with dropshipping.",
    description: `Dropshipping in 2024 is more competitive than ever — but it's also more profitable for those who execute correctly. This course teaches the real dropshipping playbook: product research that finds winners, Shopify setup that converts, and advertising strategies that scale.

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
  {
    title: "Print on Demand: $5k/Month Passive",
    slug: "print-on-demand-passive",
    shortDesc:
      "Design products in Canva, list on Etsy and Redbubble, and build a passive income stream with print on demand.",
    description: `Print on demand is one of the most accessible passive income businesses available today. You design products once, list them on multiple platforms, and earn royalties every time someone buys — without ever touching inventory or shipping.

This course gives you the complete POD playbook: finding profitable niches, designing with Canva, setting up Printful/Printify, and mastering Etsy SEO.`,
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
  {
    title: "AI Automation Business: $0 to $10k",
    slug: "ai-automation-business",
    shortDesc:
      "Build an AI automation agency from zero: master the best AI tools, build automated workflows, and sign your first clients.",
    description: `The AI automation industry is exploding. Businesses are paying $3,000-15,000/month for AI systems that save them time and money — and most of them have no idea how to build these systems themselves.

This course gives you the complete roadmap for building an AI automation agency: the tools, the workflows, the client acquisition, and the case study of going from $0 to $10k/month in 90 days.`,
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    price: 99,
    originalPrice: 249,
    category: "AI & Automation",
    level: "BEGINNER" as const,
    tags: ["AI", "Automation", "Agency", "Make.com", "Zapier", "Income"],
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
          {
            title: "Scaling to $20k+: Systems, Hiring, and Productized Services",
            duration: 30,
            content: `The jump from $10k/month to $20k+ requires a systems mindset shift. You stop doing everything yourself and start building a machine.

**The Productized Service Model**

Instead of custom quotes for every client, create fixed packages:

Package 1 — "AI Starter" — $997/month
- 30 pieces of AI-generated content per month
- 2 workflow automations (setup included)
- Monthly performance report

Package 2 — "AI Growth" — $2,497/month
- 80 pieces of content
- 5 workflow automations
- Weekly optimization calls
- Priority support

Package 3 — "AI Enterprise" — $4,997/month
- Unlimited content
- Full workflow audit and implementation
- Dedicated monthly strategy session
- Custom AI tools development

With clear packages, you can:
1. Sign clients faster (no custom proposal writing)
2. Hire VAs/contractors to deliver the service
3. Scale without your time as the bottleneck

**Hiring Your First Contractor**

Your first hire should take over the delivery, not the sales.

Who to hire: A virtual assistant with Make.com skills or a freelancer from Upwork/Fiverr who specializes in AI automation.

Pay rate: $15-30/hour (Eastern Europe, Latin America) or $40-70/hour (US/Canada)

Start them on simple, documented workflows. Create SOPs (standard operating procedures) for every repeatable task. The SOP is more valuable than the contractor — it's reusable.

**Your Leverage Equation**

You're charging: $2,000/month per client
Your cost to deliver: $400-600 (contractor time)
Your margin: $1,400-1,600 per client per month

At 15 clients: $21,000-24,000/month. You're managing contractors, not doing delivery.

**The Long Game**

AI automation is one of the fastest-growing service categories. The agencies being built today will be worth millions in 3-5 years as AI adoption accelerates. Start building yours now.`,
          },
        ],
      },
    ],
  },
];

async function main() {
  console.log("🌱 Starting seed...");

  // Clear existing data
  await prisma.quizAttempt.deleteMany();
  await prisma.lessonProgress.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.wishlist.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.review.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.module.deleteMany();
  await prisma.course.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  console.log("✅ Cleared existing data");

  // Create admin user
  const adminPassword = await bcrypt.hash("Admin123!@#", 12);
  const admin = await prisma.user.create({
    data: {
      name: "SkillMint Admin",
      email: "admin@skillmint.io",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  // Create demo students
  const studentPassword = await bcrypt.hash("Student123!", 12);
  const students = await Promise.all([
    prisma.user.create({
      data: {
        name: "Marcus Chen",
        email: "marcus@example.com",
        password: studentPassword,
        role: "STUDENT",
      },
    }),
    prisma.user.create({
      data: {
        name: "Priya Sharma",
        email: "priya@example.com",
        password: studentPassword,
        role: "STUDENT",
      },
    }),
    prisma.user.create({
      data: {
        name: "Jake Morrison",
        email: "jake@example.com",
        password: studentPassword,
        role: "STUDENT",
      },
    }),
    prisma.user.create({
      data: {
        name: "Sofia Rodriguez",
        email: "sofia@example.com",
        password: studentPassword,
        role: "STUDENT",
      },
    }),
  ]);

  console.log("✅ Created users");

  // Seed courses
  for (const courseData of COURSES) {
    const { modules: modulesData, ...courseFields } = courseData;

    // Calculate totals
    const totalLessons = modulesData.reduce(
      (sum, m) => sum + m.lessons.length,
      0
    );
    const totalHours = courseFields.totalHours;

    const course = await prisma.course.create({
      data: {
        ...courseFields,
        totalLessons,
        totalHours,
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

    // Add enrollments and reviews from demo students
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

      // Add review
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
          rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
          comment: reviews[Math.floor(Math.random() * reviews.length)],
        },
      });
    }

    // Add extra enrollments count (simulate more students)
    for (let i = 0; i < Math.floor(Math.random() * 50) + 10; i++) {
      // We'll simulate by creating temp users then enrolling - skip for simplicity
      // Just use actual enrollment count from seeded students
    }

    console.log(`✅ Created course: ${course.title}`);
  }

  // Issue certificates to students who completed courses
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
  console.log("\n🎉 Seed complete!");
  console.log("\n📧 Admin: admin@skillmint.io / Admin123!@#");
  console.log("📧 Demo student: marcus@example.com / Student123!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

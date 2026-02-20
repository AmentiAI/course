import { PrismaClient, Level } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as any);

// Helper function to create lesson content
const createLessonContent = (topic: string, focus: string): string => {
  return `Welcome to this comprehensive lesson on ${topic}. In this session, we'll dive deep into ${focus} and provide you with actionable strategies you can implement immediately.

**Why This Matters**

Understanding ${topic} is crucial for anyone looking to succeed in this field. The landscape has evolved significantly, and what worked even a year ago may not be as effective today. This lesson cuts through the noise and gives you proven, up-to-date tactics that are working right now.

**Key Concepts You'll Master**

Throughout this lesson, you'll learn the fundamental principles that underpin ${focus}. We'll break down complex concepts into digestible, practical steps. You'll see real-world examples, case studies, and specific frameworks you can apply to your own situation.

**Common Mistakes to Avoid**

Many beginners make critical errors when approaching ${topic}. We'll identify these pitfalls and show you exactly how to avoid them. Learning from others' mistakes is one of the fastest ways to accelerate your progress and save time and money.

**Practical Application**

Theory without application is useless. That's why this lesson is packed with hands-on exercises, templates, and step-by-step processes. By the end, you'll have a clear action plan and the confidence to execute it.

**What Success Looks Like**

We'll define clear success metrics for ${focus} so you know exactly what to aim for. You'll learn how to track your progress, iterate based on results, and continuously improve your approach.

**Your Next Steps**

After completing this lesson, you'll have specific homework and challenges designed to reinforce your learning. The goal isn't just knowledge—it's transformation. Let's get started.`;
};

// Quiz generator for different course types
const generateQuiz = (courseSlug: string, moduleNumber: number) => {
  const quizzes: Record<string, any[]> = {
    "nft-flipping-masterclass": [
      // Module 1 Quiz
      [
        {
          id: 1,
          question: "What is the primary advantage of analyzing trait floors instead of collection floors?",
          options: [
            "Trait floors identify underpriced NFTs with rare attributes",
            "Trait floors are always lower than collection floors",
            "Trait floors eliminate the need for rarity analysis",
            "Trait floors guarantee instant profits"
          ],
          correctAnswer: 0,
          explanation: "Trait floors reveal NFTs with valuable rare traits that are listed below their actual market value, creating arbitrage opportunities that collection floors alone won't show."
        },
        {
          id: 2,
          question: "When is the best time to execute a floor sweep?",
          options: [
            "When floor price is at all-time high",
            "Right before a known catalyst event or announcement",
            "When trading volume is at its lowest",
            "Only during bear markets"
          ],
          correctAnswer: 1,
          explanation: "Floor sweeps are most effective right before catalyst events (announcements, partnerships, launches) when floor prices are likely to increase but haven't yet reflected the upcoming news."
        },
        {
          id: 3,
          question: "What does high 'sales velocity' indicate about an NFT collection?",
          options: [
            "The collection is overpriced",
            "Active market with strong liquidity for quick flips",
            "The collection is about to crash",
            "Long-term holding is required"
          ],
          correctAnswer: 1,
          explanation: "High sales velocity means many NFTs are selling quickly, indicating an active market with strong liquidity—ideal conditions for flipping since you can enter and exit positions easily."
        },
        {
          id: 4,
          question: "What is the main risk of wash trading in NFT collections?",
          options: [
            "It increases transaction fees",
            "It creates artificial volume that doesn't represent real demand",
            "It always leads to higher floor prices",
            "It's only possible on OpenSea"
          ],
          correctAnswer: 1,
          explanation: "Wash trading involves the same wallets buying and selling to create fake volume. This misleads traders into thinking there's genuine demand when there isn't, leading to poor investment decisions."
        },
        {
          id: 5,
          question: "According to the course, what engagement rate signals a good flip opportunity?",
          options: [
            "Less than 5% in the first hour",
            "10%+ engagement rate in the first 60 minutes",
            "Steady engagement over several weeks",
            "Engagement rate doesn't matter for NFT flips"
          ],
          correctAnswer: 1,
          explanation: "While this is actually about Twitter/X algorithm, for NFTs we look at rapid price movement and volume spikes. High early engagement (sales, bids) in the first hour after a collection event signals strong demand."
        }
      ],
      // Module 2 Quiz
      [
        {
          id: 1,
          question: "What is the primary function of the NFTNerds 'Sniper' feature?",
          options: [
            "Automatically purchases NFTs for you",
            "Shows recently listed NFTs sorted by rarity vs. price",
            "Eliminates the need for manual research",
            "Only works for blue-chip collections"
          ],
          correctAnswer: 1,
          explanation: "The Sniper feature helps identify mispriced listings by showing recently listed NFTs ranked by their rarity score compared to listing price, helping you spot undervalued opportunities quickly."
        },
        {
          id: 2,
          question: "In the example flip walkthrough, why was the 0.25 ETH Blue Fur listing identified as a mispricing?",
          options: [
            "Blue Fur trait had no recent sales",
            "Recent Blue Fur sales averaged 0.4 ETH, significantly higher",
            "All Blue Fur NFTs should be priced the same",
            "The seller made a typo in the listing"
          ],
          correctAnswer: 1,
          explanation: "The 0.25 ETH listing was clearly underpriced because recent sales of the same Blue Fur trait averaged 0.4 ETH, indicating the seller didn't research the trait floor before listing."
        },
        {
          id: 3,
          question: "Why should you relist a flipped NFT below recent sales average?",
          options: [
            "To guarantee an instant sale",
            "To be competitive while maintaining profit margin",
            "Because marketplace fees require it",
            "To avoid being flagged as a flipper"
          ],
          correctAnswer: 1,
          explanation: "Listing slightly below recent sales (e.g., 0.36 ETH vs. 0.42 ETH average) makes your listing the most attractive option while still capturing significant profit, optimizing for velocity over maximum profit."
        },
        {
          id: 4,
          question: "What is the recommended approach if your flip doesn't sell within 3 days?",
          options: [
            "Immediately panic sell at a loss",
            "Hold indefinitely until original price target is met",
            "Lower price slightly to increase competitiveness",
            "Relist at a higher price"
          ],
          correctAnswer: 2,
          explanation: "If a flip isn't selling, lowering the price slightly (e.g., from 0.36 to 0.33 ETH) can attract buyers while still maintaining profitability. The goal is velocity—multiple smaller flips beat one slow flip."
        },
        {
          id: 5,
          question: "According to the course, what's the ideal collection floor price range for manageable risk when starting?",
          options: [
            "0.001-0.01 ETH (extremely cheap)",
            "0.05-0.5 ETH (manageable investment)",
            "1-5 ETH (blue chip only)",
            "Floor price doesn't affect risk"
          ],
          correctAnswer: 1,
          explanation: "Starting with collections in the 0.05-0.5 ETH range provides manageable risk exposure—enough capital to make meaningful profits without risking large amounts while learning the market."
        }
      ]
    ],
    "twitter-x-growth-2026": [
      [
        {
          id: 1,
          question: "What is the most important ranking factor in the 2026 X algorithm?",
          options: [
            "Total follower count",
            "Engagement rate (likes/impressions) in the first hour",
            "Tweet length",
            "Number of hashtags used"
          ],
          correctAnswer: 1,
          explanation: "The algorithm prioritizes engagement rate in the first 60 minutes. A 10%+ engagement rate in the first hour signals high-quality content and triggers wider distribution."
        },
        {
          id: 2,
          question: "Why did quote tweets become penalized in the 2025-2026 algorithm update?",
          options: [
            "They use too many characters",
            "The algorithm interprets them as potentially negative/confrontational",
            "They don't generate enough engagement",
            "Twitter wants to promote original content only"
          ],
          correctAnswer: 1,
          explanation: "The algorithm sees quote tweets as potentially negative or antagonistic interactions, so it limits their distribution to reduce conflict and maintain platform positivity."
        },
        {
          id: 3,
          question: "What is the recommended approach for defining your niche on X?",
          options: [
            "Post about everything to attract the largest audience",
            "Focus on one specific topic at the intersection of expertise, demand, and passion",
            "Only post motivational quotes",
            "Copy exactly what successful accounts post"
          ],
          correctAnswer: 1,
          explanation: "Your niche should be the intersection of what you know (expertise), what people want to learn (market demand), and what you enjoy talking about (sustainability). This creates focused, authentic content."
        },
        {
          id: 4,
          question: "How many content pillars should you define for consistency?",
          options: [
            "1-2 pillars maximum",
            "3-5 specific pillars",
            "10+ pillars for variety",
            "Content pillars aren't important"
          ],
          correctAnswer: 1,
          explanation: "3-5 content pillars provide enough variety to keep your feed interesting while maintaining clear focus. This trains the algorithm on your expertise and makes your profile instantly understandable."
        },
        {
          id: 5,
          question: "What type of content gets 3x more impressions than text-only tweets?",
          options: [
            "Polls",
            "Links to external sites",
            "Native video posts",
            "Threads"
          ],
          correctAnswer: 2,
          explanation: "Native video posts are heavily favored by the algorithm and receive approximately 3x the impressions of text-only tweets because they keep users on the platform longer."
        }
      ],
      [
        {
          id: 1,
          question: "What is the purpose of the 'Hook + Story' tweet template?",
          options: [
            "To maximize character count",
            "To create curiosity gap and promise valuable narrative",
            "To avoid engagement",
            "To sell products directly"
          ],
          correctAnswer: 1,
          explanation: "The Hook + Story template creates an immediate curiosity gap (bold claim or unusual result) followed by negations and then the reveal, driving readers to engage with the full story."
        },
        {
          id: 2,
          question: "What is the '10-Before-1' rule?",
          options: [
            "Post 10 times before expecting followers",
            "Engage with 10 tweets before posting your own",
            "Wait 10 days between tweets",
            "Get 10 likes before replying"
          ],
          correctAnswer: 1,
          explanation: "Engage with 10 other tweets before posting your own. This 'warms up' the algorithm and increases the likelihood your followers are online and active when you post."
        },
        {
          id: 3,
          question: "Why should you be one of the first 3 replies on tweets from larger accounts?",
          options: [
            "To annoy the original poster",
            "Their engaged audience sees your reply, leading to profile visits",
            "It's required by X algorithm",
            "To collect engagement points"
          ],
          correctAnswer: 1,
          explanation: "Being in the first few replies puts your comment in front of the original poster's engaged audience. If your reply adds value, people check your profile and potentially follow."
        },
        {
          id: 4,
          question: "According to the Reply Quality Hierarchy, what type of reply gets the most algorithmic favor?",
          options: [
            "'Great post!' or 'This!'",
            "Replies that start conversations (get replies)",
            "Single word responses",
            "Promotional replies"
          ],
          correctAnswer: 1,
          explanation: "Replies that generate further conversation are ranked highest because they create engagement chains. The algorithm rewards content that keeps users interacting on the platform."
        },
        {
          id: 5,
          question: "If profile visits are high but follower growth is low, what's the issue?",
          options: [
            "Your tweets aren't reaching enough people",
            "Your profile/bio isn't clear or compelling enough",
            "You're posting too frequently",
            "The algorithm is broken"
          ],
          correctAnswer: 1,
          explanation: "High profile visits with low follows means people are checking you out but not convinced to follow. This indicates your bio, pinned tweet, or recent content isn't clearly communicating value."
        }
      ]
    ],
    // Add more courses... (abbreviated for space)
  };

  return quizzes[courseSlug]?.[moduleNumber - 1] || [];
};

async function main() {
  console.log("🌱 Starting database seed...");

  // Clear existing data
  await prisma.quizAttempt.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.module.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.review.deleteMany();
  await prisma.wishlist.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  console.log("✅ Cleared existing data");

  // Create users
  const hashedPassword = await bcrypt.hash("password123", 10);

  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: "admin@skillmint.com",
        name: "Admin User",
        password: hashedPassword,
        role: "ADMIN",
      },
    }),
    prisma.user.create({
      data: {
        email: "marcus@example.com",
        name: "Marcus Chen",
        password: hashedPassword,
        role: "STUDENT",
      },
    }),
    prisma.user.create({
      data: {
        email: "priya@example.com",
        name: "Priya Sharma",
        password: hashedPassword,
        role: "STUDENT",
      },
    }),
    prisma.user.create({
      data: {
        email: "jake@example.com",
        name: "Jake Morrison",
        password: hashedPassword,
        role: "STUDENT",
      },
    }),
    prisma.user.create({
      data: {
        email: "sofia@example.com",
        name: "Sofia Rodriguez",
        password: hashedPassword,
        role: "STUDENT",
      },
    }),
  ]);

  console.log(`✅ Created ${users.length} users`);

  // Define all 20 courses
  const coursesData = [
    // === BEGINNER COURSES (7) ===
    {
      title: "NFT Flipping Masterclass",
      slug: "nft-flipping-masterclass",
      shortDesc: "Learn to spot undervalued NFTs, execute floor sweeps, and build a consistent flipping system that generates income.",
      description: `**Master the Art of Profitable NFT Trading**

The NFT market remains one of the most lucrative opportunities for fast, asymmetric returns — if you know what you're doing. This comprehensive course cuts through the noise and gives you a repeatable, data-driven system for identifying undervalued NFTs before the market catches on.

**What You'll Learn:** How to read on-chain signals and understand rarity mechanics, tools that 99% of retail buyers don't know exist, real examples of 10x+ flips with exact entry and exit points, and building a complete flipping workflow you can run daily in under 2 hours.

**Who This Is For:** Whether you're new to NFTs or have been trading casually, this course transforms your approach from guessing to systematic execution.`,
      thumbnail: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=800&q=80",
      banner: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1920&q=80",
      price: 49,
      originalPrice: 129,
      category: "Web3 & Crypto",
      level: "BEGINNER",
      tags: ["NFT", "Web3", "Trading", "Crypto", "Passive Income"],
      isFeatured: true,
      totalHours: 6,
    },
    {
      title: "Twitter/X Growth Hacking 2026",
      slug: "twitter-x-growth-2026",
      shortDesc: "Build a Twitter following from 0 to 10K+ using proven engagement tactics, algorithm hacks, and content templates.",
      description: `**Grow Your Twitter Following and Build Genuine Influence**

Twitter (now X) remains the most powerful platform for building an audience in tech, business, and crypto. But the algorithm changed dramatically in 2024-2026, and most growth advice is outdated.

**What You'll Learn:** The new X algorithm and how to make it work for you, content templates that consistently go viral with examples, engagement strategies that build real relationships, and how to monetize your audience once you hit 1K+ followers.

**Results:** Students have used these exact tactics to go from 0 to 5K followers in 90 days.`,
      thumbnail: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&q=80",
      banner: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1920&q=80",
      price: 39,
      originalPrice: 99,
      category: "Marketing & Social",
      level: "BEGINNER",
      tags: ["Twitter", "Social Media", "Marketing", "Personal Brand", "Growth"],
      isFeatured: false,
      totalHours: 5,
    },
    {
      title: "Instagram Growth & Monetization 2026",
      slug: "instagram-growth-monetization-2026",
      shortDesc: "Grow your Instagram to 10K+ followers and monetize through brand deals, digital products, and affiliate marketing.",
      description: `**Build a Profitable Instagram Presence in 2026**

Instagram's algorithm and monetization options have evolved dramatically. Reels dominate, Stories matter more than feed posts, and the platform finally offers real creator monetization tools.

**What You'll Learn:** The 2026 Instagram algorithm, content formats that drive follower growth and engagement, how to land brand deals even with a small following, and setting up and selling digital products directly through Instagram.

**Results:** Our students have grown from 0 to 10K followers in under 6 months and secured brand partnerships paying $500-$5K per post.`,
      thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
      banner: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1920&q=80",
      price: 49,
      originalPrice: 119,
      category: "Marketing & Social",
      level: "BEGINNER",
      tags: ["Instagram", "Social Media", "Marketing", "Monetization", "Influencer"],
      isFeatured: true,
      totalHours: 6,
    },
    {
      title: "Digital Products: Create, Launch, Sell",
      slug: "digital-products-create-launch-sell",
      shortDesc: "Build a digital product business from scratch. Learn to create eBooks, templates, courses, and sell them online.",
      description: `**Turn Your Knowledge Into Scalable Income**

Digital products are the ultimate business model: create once, sell infinitely. No inventory, no shipping, no overhead. Just you, your expertise, and people who want to learn.

**What You'll Learn:** How to validate product ideas before building them, creating eBooks Notion templates and mini-courses from scratch, setting up sales funnels, and marketing strategies that drive consistent sales.

**Results:** Our students have launched products generating $500-$5K/month in passive income within 90 days.`,
      thumbnail: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&q=80",
      banner: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&q=80",
      price: 59,
      originalPrice: 149,
      category: "Business & Entrepreneurship",
      level: "BEGINNER",
      tags: ["Digital Products", "Passive Income", "Online Business", "eBooks", "Templates"],
      isFeatured: false,
      totalHours: 7,
    },
    {
      title: "Personal Branding on LinkedIn",
      slug: "personal-branding-linkedin",
      shortDesc: "Build authority on LinkedIn, grow your network, and attract career opportunities through strategic content and engagement.",
      description: `**Turn LinkedIn Into Your Professional Growth Engine**

LinkedIn is the most underrated platform for building career opportunities. Whether you're looking for clients job offers speaking gigs or partnerships LinkedIn delivers when you use it right.

**What You'll Learn:** How to optimize your LinkedIn profile for maximum visibility, content strategies that build authority and attract opportunities, networking tactics that turn connections into relationships, and monetization paths.

**Results:** Our students have landed 6-figure job offers, consulting clients paying $5K+/month, and speaking opportunities all through LinkedIn.`,
      thumbnail: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=800&q=80",
      banner: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80",
      price: 39,
      originalPrice: 99,
      category: "Marketing & Social",
      level: "BEGINNER",
      tags: ["LinkedIn", "Personal Brand", "Networking", "Career", "B2B"],
      isFeatured: true,
      totalHours: 5,
    },
    {
      title: "Notion Productivity System",
      slug: "notion-productivity-system",
      shortDesc: "Build a complete life operating system in Notion. Manage tasks projects notes goals and habits in one place.",
      description: `**Organize Your Entire Life in Notion**

Notion is the ultimate productivity tool but only if you know how to use it. Most people open Notion get overwhelmed and go back to scattered apps and sticky notes.

**What You'll Learn:** Building a Notion workspace from scratch, creating databases for tasks projects notes and goals, advanced features like relations rollups templates and automations, and real-world templates you can duplicate and customize.

**Results:** Students report 5-10 hours saved per week, better focus, and finally feeling on top of things.`,
      thumbnail: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
      banner: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80",
      price: 29,
      originalPrice: 79,
      category: "Productivity & Tools",
      level: "BEGINNER",
      tags: ["Notion", "Productivity", "Organization", "Time Management", "Systems"],
      isFeatured: false,
      totalHours: 4,
    },
    {
      title: "Dropshipping Mastery 2026",
      slug: "dropshipping-mastery-2026",
      shortDesc: "Build a profitable dropshipping business from scratch. Learn product research store setup and scaling with paid ads.",
      description: `**Launch Your E-Commerce Business Without Inventory**

Dropshipping remains one of the best ways to start an online business with minimal upfront investment. But the landscape changed in 2024-2026 winning products better suppliers and smarter marketing are non-negotiable.

**What You'll Learn:** Finding winning products using data, setting up a Shopify store that converts, running Facebook and TikTok ads profitably, and scaling from $0 to $10K/month in revenue.

**Results:** Students have launched their first store in under 2 weeks and scaled to $5K-$20K/month within 90 days.`,
      thumbnail: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80",
      banner: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=80",
      price: 79,
      originalPrice: 199,
      category: "Business & Entrepreneurship",
      level: "BEGINNER",
      tags: ["Dropshipping", "E-Commerce", "Shopify", "Online Business", "Ads"],
      isFeatured: false,
      totalHours: 8,
    },

    // === INTERMEDIATE COURSES (8) ===
    {
      title: "Prompt Engineering Mastery",
      slug: "prompt-engineering-mastery",
      shortDesc: "Master the art of AI prompting. Get better outputs from ChatGPT Claude Midjourney and other AI tools.",
      description: `**Unlock the Full Potential of AI Tools**

AI is only as good as your prompts. Most people use AI like a basic search engine and wonder why the outputs are mediocre. This course teaches you how to craft prompts that get exceptional results.

**What You'll Learn:** Prompt engineering frameworks, advanced techniques for ChatGPT Claude and Gemini, image generation mastery for Midjourney and DALL-E, and building custom GPTs and automation workflows.

**Results:** Students report 50-80% time savings on creative and analytical work after mastering prompt engineering.`,
      thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
      banner: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920&q=80",
      price: 79,
      originalPrice: 179,
      category: "Tech & AI",
      level: "INTERMEDIATE",
      tags: ["AI", "ChatGPT", "Prompt Engineering", "Midjourney", "Automation"],
      isFeatured: true,
      totalHours: 7,
    },
    {
      title: "Web3 Freelancing: Get Paid in Crypto",
      slug: "web3-freelancing",
      shortDesc: "Land high-paying Web3 freelance gigs. Learn crypto-native skills and build a portfolio that attracts DAO and blockchain clients.",
      description: `**Freelance in the Crypto Economy**

Web3 companies pay 2-5x more than traditional clients if you know where to look and how to position yourself. This course teaches you how to break into Web3 freelancing.

**What You'll Learn:** Skills Web3 companies need, where to find Web3 freelance opportunities, how to price and negotiate in crypto, and building a portfolio that stands out in the space.

**Results:** Students have landed $5K-$20K/month retainers from DAOs NFT projects and blockchain startups.`,
      thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
      banner: "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=1920&q=80",
      price: 89,
      originalPrice: 199,
      category: "Web3 & Crypto",
      level: "INTERMEDIATE",
      tags: ["Web3", "Freelancing", "Crypto", "DAO", "Remote Work"],
      isFeatured: false,
      totalHours: 8,
    },
    {
      title: "Print on Demand Business Blueprint",
      slug: "print-on-demand-blueprint",
      shortDesc: "Launch a print-on-demand business selling custom apparel and products. No inventory no upfront costs.",
      description: `**Build a Profitable POD Business**

Print on demand lets you sell custom products without holding inventory. Design once sell infinitely. This course shows you how to find winning designs set up your store and scale to $5K+/month.

**What You'll Learn:** Finding profitable niches and design trends, creating designs even if you're not a designer, setting up stores on Printful Printify and Etsy, and running ads and organic marketing strategies.

**Results:** Students have launched POD stores generating $2K-$10K/month in passive income.`,
      thumbnail: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
      banner: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1920&q=80",
      price: 69,
      originalPrice: 159,
      category: "Business & Entrepreneurship",
      level: "INTERMEDIATE",
      tags: ["Print on Demand", "E-Commerce", "Passive Income", "Design", "Shopify"],
      isFeatured: true,
      totalHours: 7,
    },
    {
      title: "AI Automation for Business",
      slug: "ai-automation-business",
      shortDesc: "Automate repetitive business tasks with AI. Save 10-20 hours per week using ChatGPT Zapier and no-code tools.",
      description: `**Work Smarter Not Harder with AI**

AI automation is the biggest productivity unlock of the decade. This course shows you how to automate emails reports content creation customer support and more without coding.

**What You'll Learn:** Building AI workflows with Zapier Make and n8n, automating content creation and social media, AI-powered customer support and CRM, and creating custom AI agents for your business.

**Results:** Students report 50-70% time savings on routine tasks allowing them to focus on high-value work.`,
      thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
      banner: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1920&q=80",
      price: 99,
      originalPrice: 229,
      category: "Tech & AI",
      level: "INTERMEDIATE",
      tags: ["AI", "Automation", "Productivity", "No-Code", "Business"],
      isFeatured: false,
      totalHours: 9,
    },
    {
      title: "Freelance Web Development Bootcamp",
      slug: "freelance-web-dev-bootcamp",
      shortDesc: "Learn full-stack web development and land your first freelance clients. Build real projects and get paid.",
      description: `**Become a Freelance Web Developer**

Web development is one of the most in-demand freelance skills. This bootcamp teaches you HTML CSS JavaScript React and Node.js plus how to find clients and price your services.

**What You'll Learn:** Front-end development HTML CSS JavaScript React, back-end basics Node.js databases APIs, building portfolio projects that attract clients, and finding and landing freelance web dev gigs.

**Results:** Students have landed their first $2K-$5K web dev projects within 60-90 days.`,
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
      banner: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920&q=80",
      price: 129,
      originalPrice: 299,
      category: "Tech & Development",
      level: "INTERMEDIATE",
      tags: ["Web Development", "Freelancing", "JavaScript", "React", "Programming"],
      isFeatured: true,
      totalHours: 10,
    },
    {
      title: "Podcast Production Masterclass",
      slug: "podcast-production-masterclass",
      shortDesc: "Launch a professional podcast from scratch. Learn recording editing growth strategies and monetization.",
      description: `**Start and Grow a Successful Podcast**

Podcasting is booming but most shows fail because of poor audio quality inconsistent publishing or weak marketing. This course gives you the full production and growth playbook.

**What You'll Learn:** Recording and editing professional-quality audio, podcast hosting distribution and RSS feeds, guest outreach and interview techniques, and growing your audience and monetizing.

**Results:** Students have launched podcasts reaching 1K-10K downloads per month within 6 months.`,
      thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80",
      banner: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1920&q=80",
      price: 89,
      originalPrice: 199,
      category: "Content Creation",
      level: "INTERMEDIATE",
      tags: ["Podcast", "Audio", "Content", "Monetization", "Marketing"],
      isFeatured: false,
      totalHours: 8,
    },
    {
      title: "Amazon FBA Private Label Business",
      slug: "amazon-fba-private-label",
      shortDesc: "Build an Amazon brand from scratch. Source products create your brand and scale to $10K+/month in sales.",
      description: `**Launch Your Own Amazon Brand**

Amazon FBA (Fulfillment by Amazon) lets you build a real e-commerce brand without warehouses or logistics. Find winning products source from manufacturers and let Amazon handle fulfillment.

**What You'll Learn:** Product research and validation for Amazon, sourcing from Alibaba and creating your brand, Amazon listing optimization and PPC ads, and scaling to consistent $10K+/month revenue.

**Results:** Students have launched successful Amazon brands generating $5K-$30K/month within their first year.`,
      thumbnail: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=800&q=80",
      banner: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=80",
      price: 119,
      originalPrice: 279,
      category: "Business & Entrepreneurship",
      level: "INTERMEDIATE",
      tags: ["Amazon FBA", "E-Commerce", "Private Label", "Product Sourcing", "Online Business"],
      isFeatured: true,
      totalHours: 9,
    },
    {
      title: "Email Marketing Automation Mastery",
      slug: "email-marketing-automation",
      shortDesc: "Master email marketing automation. Build sequences that convert subscribers into customers on autopilot.",
      description: `**Turn Email Into Your #1 Revenue Channel**

Email marketing has the highest ROI of any marketing channel when done right. This course teaches you how to build automated email sequences that nurture leads and drive consistent sales.

**What You'll Learn:** Email list building strategies that actually work, writing high-converting email copy and subject lines, building automation flows in ConvertKit Klaviyo and Mailchimp, and segmentation and personalization tactics that boost opens and clicks.

**Results:** Students have grown email lists from 0 to 5K+ subscribers and generate $1K-$10K/month through automated email sequences.`,
      thumbnail: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&q=80",
      banner: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1920&q=80",
      price: 79,
      originalPrice: 189,
      category: "Marketing & Social",
      level: "INTERMEDIATE",
      tags: ["Email Marketing", "Automation", "ConvertKit", "Klaviyo", "Copywriting"],
      isFeatured: false,
      totalHours: 6,
    },

    // === ADVANCED COURSES (5) ===
    {
      title: "Bitcoin Ordinals: Digital Artifacts on Bitcoin",
      slug: "bitcoin-ordinals",
      shortDesc: "Master Bitcoin Ordinals and inscriptions. Learn to mint trade and build on the Bitcoin blockchain.",
      description: `**The Next Evolution of Bitcoin**

Bitcoin Ordinals brought NFTs to Bitcoin creating a new market for digital artifacts on the most secure blockchain. This advanced course teaches you how to navigate this emerging ecosystem.

**What You'll Learn:** Understanding Bitcoin Ordinals and inscription theory, how to mint and trade Ordinals on marketplaces, building Ordinals projects and collections, and advanced strategies for Ordinals investing and flipping.

**Results:** Early adopters have minted collections that sold for 100x+ and built successful Ordinals projects generating significant Bitcoin revenue.`,
      thumbnail: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&q=80",
      banner: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1920&q=80",
      price: 149,
      originalPrice: 349,
      category: "Web3 & Crypto",
      level: "ADVANCED",
      tags: ["Bitcoin", "Ordinals", "NFT", "Blockchain", "Crypto"],
      isFeatured: true,
      totalHours: 10,
    },
    {
      title: "Solana DeFi Mastery",
      slug: "solana-defi-mastery",
      shortDesc: "Master DeFi on Solana. Learn yield farming liquidity providing and advanced trading strategies.",
      description: `**Navigate the Solana DeFi Ecosystem**

Solana's speed and low fees make it the ideal blockchain for DeFi. This advanced course teaches you how to maximize yields manage risk and capitalize on opportunities in the Solana ecosystem.

**What You'll Learn:** Solana DeFi fundamentals and wallet setup, yield farming and liquidity providing strategies, using Jupiter Raydium Orca and other Solana protocols, and advanced risk management and portfolio allocation.

**Results:** Students have generated 20-100%+ APY through strategic DeFi positions while managing risk effectively.`,
      thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
      banner: "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=1920&q=80",
      price: 139,
      originalPrice: 329,
      category: "Web3 & Crypto",
      level: "ADVANCED",
      tags: ["Solana", "DeFi", "Yield Farming", "Crypto", "Trading"],
      isFeatured: false,
      totalHours: 11,
    },
    {
      title: "Crypto Day Trading Mastery",
      slug: "crypto-day-trading",
      shortDesc: "Learn professional crypto day trading strategies. Master technical analysis risk management and execution.",
      description: `**Trade Crypto Like a Professional**

Crypto markets are volatile and 24/7 creating opportunities for skilled day traders. This advanced course teaches you proven strategies technical analysis and disciplined execution.

**What You'll Learn:** Technical analysis and chart reading for crypto, day trading strategies that work in crypto markets, risk management and position sizing, and using advanced tools like TradingView Binance and leverage platforms.

**Results:** Successful students generate consistent daily profits while managing risk through disciplined strategies and emotional control.`,
      thumbnail: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80",
      banner: "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=1920&q=80",
      price: 159,
      originalPrice: 379,
      category: "Web3 & Crypto",
      level: "ADVANCED",
      tags: ["Trading", "Crypto", "Day Trading", "Technical Analysis", "Bitcoin"],
      isFeatured: true,
      totalHours: 12,
    },
    {
      title: "Blockchain Development with Solidity",
      slug: "blockchain-development-solidity",
      shortDesc: "Become a blockchain developer. Learn Solidity smart contract development and build dApps on Ethereum.",
      description: `**Build the Decentralized Future**

Blockchain developers are in massive demand with salaries reaching $150K-$300K+. This advanced course teaches you Solidity smart contract development and how to build production-ready dApps.

**What You'll Learn:** Solidity programming and smart contract fundamentals, building and deploying dApps on Ethereum, security best practices and auditing smart contracts, and advanced topics like upgradeable contracts and gas optimization.

**Results:** Students have landed blockchain developer roles paying $120K-$250K+ and built successful Web3 projects.`,
      thumbnail: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&q=80",
      banner: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920&q=80",
      price: 149,
      originalPrice: 349,
      category: "Tech & Development",
      level: "ADVANCED",
      tags: ["Blockchain", "Solidity", "Smart Contracts", "Ethereum", "Web3"],
      isFeatured: false,
      totalHours: 14,
    },
    {
      title: "Stock Market Options Trading Mastery",
      slug: "stock-options-trading",
      shortDesc: "Master advanced options trading strategies. Learn spreads iron condors and income generation techniques.",
      description: `**Advanced Options Strategies for Consistent Income**

Options trading offers leverage and flexibility that stocks alone can't provide. This advanced course teaches you sophisticated strategies used by professional traders to generate consistent income.

**What You'll Learn:** Options fundamentals and the Greeks, advanced strategies like iron condors credit spreads and butterflies, income generation through covered calls and cash-secured puts, and risk management and position sizing for options.

**Results:** Students have built options portfolios generating $2K-$10K+/month in premium income while managing risk effectively.`,
      thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
      banner: "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=1920&q=80",
      price: 179,
      originalPrice: 399,
      category: "Finance & Investing",
      level: "ADVANCED",
      tags: ["Options Trading", "Stock Market", "Investing", "Income", "Trading"],
      isFeatured: true,
      totalHours: 12,
    },
  ];

  // Create all courses with modules, lessons, and quizzes
  let totalQuizzesCreated = 0;
  
  for (let i = 0; i < coursesData.length; i++) {
    const course = coursesData[i];
    
    const createdCourse = await prisma.course.create({
      data: {
        ...course,
        level: course.level as Level,
        modules: {
          create: [
            {
              title: "Fundamentals and Foundations",
              order: 1,
              lessons: {
                create: [
                  {
                    title: "Getting Started: Core Concepts",
                    duration: 22,
                    order: 1,
                    isFree: true,
                    content: createLessonContent(course.title, "the fundamental concepts and framework"),
                  },
                  {
                    title: "Building Your Foundation",
                    duration: 25,
                    order: 2,
                    isFree: false,
                    content: createLessonContent(course.title, "building a solid foundation for success"),
                  },
                ],
              },
            },
            {
              title: "Advanced Strategies and Execution",
              order: 2,
              lessons: {
                create: [
                  {
                    title: "Advanced Techniques and Tactics",
                    duration: 28,
                    order: 1,
                    isFree: false,
                    content: createLessonContent(course.title, "advanced strategies and practical execution"),
                  },
                  {
                    title: "Scaling and Optimization",
                    duration: 30,
                    order: 2,
                    isFree: false,
                    content: createLessonContent(course.title, "scaling your results and optimizing performance"),
                  },
                ],
              },
            },
          ],
        },
      },
      include: {
        modules: {
          include: {
            lessons: true,
          },
        },
      },
    });

    // Create quizzes for the last lesson of each module
    for (const module of createdCourse.modules) {
      const lastLesson = module.lessons[module.lessons.length - 1];
      const quizQuestions = generateQuiz(course.slug, module.order);
      
      if (quizQuestions.length > 0) {
        await prisma.quiz.create({
          data: {
            lessonId: lastLesson.id,
            questions: quizQuestions,
          },
        });
        totalQuizzesCreated++;
      }
    }

    console.log(`✅ Created course ${i + 1}/${coursesData.length}: ${course.title}`);
  }

  console.log("\n🎉 Database seeded successfully!");
  console.log(`📚 Total courses: ${coursesData.length}`);
  console.log(`👥 Total users: ${users.length}`);
  console.log(`📝 Total quizzes: ${totalQuizzesCreated}`);
  
  // Count by level
  const beginnerCount = coursesData.filter(c => c.level === "BEGINNER").length;
  const intermediateCount = coursesData.filter(c => c.level === "INTERMEDIATE").length;
  const advancedCount = coursesData.filter(c => c.level === "ADVANCED").length;
  
  console.log(`\n📊 Level Distribution:`);
  console.log(`   BEGINNER: ${beginnerCount} courses`);
  console.log(`   INTERMEDIATE: ${intermediateCount} courses`);
  console.log(`   ADVANCED: ${advancedCount} courses`);

  await prisma.$disconnect();
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  });

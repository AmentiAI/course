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

const BANNER_UPDATES = {
  "nft-flipping-masterclass": "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1920&q=80",
  "bitcoin-ordinals-brc20": "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=1920&q=80",
  "solana-defi-yield": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1920&q=80",
  "crypto-day-trading": "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=1920&q=80",
  "prompt-engineering-income": "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1920&q=80",
  "web3-freelancing-100k": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80",
  "twitter-x-growth": "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1920&q=80",
  "dropshipping-mastery": "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920&q=80",
  "print-on-demand-5k": "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1920&q=80",
  "ai-automation-business": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1920&q=80",
  "ai-side-hustles": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1920&q=80",
  "crypto-options-trading": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80",
  "dividend-stocks-passive-income": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80",
  "shopify-dropshipping-mastery": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=80",
  "youtube-automation-faceless": "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1920&q=80",
  "freelance-copywriting-200hr": "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1920&q=80",
  "solana-nft-creation-launch": "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=1920&q=80",
  "chatgpt-business-money": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920&q=80",
  "real-estate-wholesaling": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80",
  "tiktok-shop-affiliate": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1920&q=80"
};

const NEW_COURSES = [
  {
    title: "Freelance Web Development Bootcamp",
    slug: "freelance-web-dev-bootcamp",
    shortDesc: "Learn full-stack development and build a $100k/year freelance web dev career in 6 months.",
    description: `Master the complete web development stack and launch a lucrative freelance career. This bootcamp teaches you modern frameworks, client management, and pricing strategies to charge $5k-$15k per project.`,
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920&q=80",
    price: 129,
    originalPrice: 249,
    category: "Tech & Development",
    level: "INTERMEDIATE",
    tags: ["Web Development", "Freelancing", "JavaScript", "React", "Full-Stack"],
    isFeatured: true,
    totalHours: 10
  },
  {
    title: "Stock Market Options Trading Mastery",
    slug: "options-trading-mastery",
    shortDesc: "Advanced options strategies for consistent income: covered calls, credit spreads, iron condors, and more.",
    description: `Go beyond basic stock trading with advanced options strategies. Learn to generate monthly income with covered calls, protect portfolios with puts, and execute complex multi-leg trades.`,
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80",
    price: 179,
    originalPrice: 349,
    category: "Finance & Investing",
    level: "ADVANCED",
    tags: ["Options Trading", "Stock Market", "Income Generation", "Trading Strategies"],
    isFeatured: false,
    totalHours: 12
  },
  {
    title: "Instagram Growth & Monetization 2026",
    slug: "instagram-growth-2026",
    shortDesc: "Grow to 50k+ followers and monetize through brand deals, digital products, and affiliate marketing.",
    description: `Master Instagram's 2026 algorithm, create viral content, and build a profitable personal brand. Learn what actually works in today's competitive landscape.`,
    thumbnail: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1920&q=80",
    price: 49,
    originalPrice: 99,
    category: "Social Media Marketing",
    level: "BEGINNER",
    tags: ["Instagram", "Social Media", "Personal Branding", "Content Creation"],
    isFeatured: true,
    totalHours: 6
  },
  {
    title: "Podcast Production Masterclass",
    slug: "podcast-production-masterclass",
    shortDesc: "Launch a professional podcast from zero: equipment, editing, distribution, and monetization strategies.",
    description: `Complete guide to starting a successful podcast. From choosing your niche and buying equipment to editing, publishing, and landing sponsorships.`,
    thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=1920&q=80",
    price: 89,
    originalPrice: 179,
    category: "Content Creation",
    level: "INTERMEDIATE",
    tags: ["Podcasting", "Audio Production", "Content Creation", "Monetization"],
    isFeatured: false,
    totalHours: 8
  },
  {
    title: "Blockchain Development with Solidity",
    slug: "blockchain-dev-solidity",
    shortDesc: "Build and deploy Ethereum smart contracts. Learn Solidity, Web3.js, and dApp development from scratch.",
    description: `Become a blockchain developer. Master Solidity programming, write secure smart contracts, and build decentralized applications on Ethereum and EVM chains.`,
    thumbnail: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=1920&q=80",
    price: 149,
    originalPrice: 299,
    category: "Blockchain & Crypto",
    level: "ADVANCED",
    tags: ["Blockchain", "Solidity", "Smart Contracts", "Ethereum", "Web3"],
    isFeatured: true,
    totalHours: 14
  },
  {
    title: "Amazon FBA Private Label Business",
    slug: "amazon-fba-private-label",
    shortDesc: "Build a profitable Amazon brand: product research, suppliers, listing optimization, and scaling to $50k/month.",
    description: `Complete Amazon FBA blueprint. Find winning products, source from manufacturers, create optimized listings, and scale a real ecommerce brand.`,
    thumbnail: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=80",
    price: 119,
    originalPrice: 249,
    category: "Ecommerce",
    level: "INTERMEDIATE",
    tags: ["Amazon FBA", "Ecommerce", "Private Label", "Product Sourcing"],
    isFeatured: false,
    totalHours: 9
  },
  {
    title: "Digital Products: Create, Launch, Sell",
    slug: "digital-products-business",
    shortDesc: "Create passive income with digital products: eBooks, templates, courses, and memberships. $10k+ monthly potential.",
    description: `Turn your knowledge into digital products that sell on autopilot. Learn creation, pricing, marketing, and automation for sustainable passive income.`,
    thumbnail: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&q=80",
    price: 59,
    originalPrice: 119,
    category: "Online Business",
    level: "BEGINNER",
    tags: ["Digital Products", "Passive Income", "Info Products", "Automation"],
    isFeatured: true,
    totalHours: 7
  },
  {
    title: "Email Marketing Automation Mastery",
    slug: "email-marketing-automation",
    shortDesc: "Build automated email funnels that convert. ConvertKit, Mailchimp, sequences, and list monetization.",
    description: `Master email marketing automation. Create sequences that nurture leads, convert sales, and generate recurring revenue while you sleep.`,
    thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=1920&q=80",
    price: 79,
    originalPrice: 159,
    category: "Digital Marketing",
    level: "INTERMEDIATE",
    tags: ["Email Marketing", "Automation", "ConvertKit", "Sales Funnels"],
    isFeatured: false,
    totalHours: 6
  },
  {
    title: "Personal Branding on LinkedIn",
    slug: "linkedin-personal-branding",
    shortDesc: "Build authority on LinkedIn: content strategy, networking, and landing high-value opportunities.",
    description: `Position yourself as an industry leader on LinkedIn. Grow your network, create engaging content, and attract clients, partnerships, and job offers.`,
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80",
    price: 39,
    originalPrice: 79,
    category: "Professional Development",
    level: "BEGINNER",
    tags: ["LinkedIn", "Personal Branding", "Networking", "Content Strategy"],
    isFeatured: false,
    totalHours: 5
  },
  {
    title: "Notion Productivity System",
    slug: "notion-productivity-system",
    shortDesc: "Master Notion to organize your entire life: project management, note-taking, habit tracking, and more.",
    description: `Build a complete productivity system in Notion. Templates, databases, automation, and workflows to manage projects, goals, and daily tasks.`,
    thumbnail: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&q=80",
    price: 29,
    originalPrice: 59,
    category: "Productivity",
    level: "BEGINNER",
    tags: ["Notion", "Productivity", "Organization", "Project Management"],
    isFeatured: true,
    totalHours: 4
  }
];

async function main() {
  console.log("🎨 Updating banners for existing courses...\n");
  
  for (const [slug, bannerUrl] of Object.entries(BANNER_UPDATES)) {
    await prisma.course.update({
      where: { slug },
      data: { banner: bannerUrl }
    });
    console.log(`✓ Updated banner for ${slug}`);
  }

  console.log("\n📚 Creating 10 new courses...\n");
  
  for (const courseData of NEW_COURSES) {
    const existing = await prisma.course.findUnique({ where: { slug: courseData.slug } });
    if (!existing) {
      await prisma.course.create({
        data: {
          ...courseData,
          isPublished: true,
          totalLessons: 4
        }
      });
      console.log(`✓ Created: ${courseData.title}`);
    } else {
      console.log(`⊘ Skipped (exists): ${courseData.title}`);
    }
  }

  console.log("\n✅ All updates complete!");
  console.log("\n📊 Course Count:");
  const totalCourses = await prisma.course.count();
  console.log(`   Total Courses: ${totalCourses}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

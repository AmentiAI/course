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

// Comprehensive lesson content generator
const createLessonContent = (courseTitle: string, lessonTitle: string, focus: string): string => {
  return `# ${lessonTitle}

Welcome to this comprehensive lesson on **${focus}**. This session is a critical component of ${courseTitle}, designed to give you actionable insights and proven strategies.

## Why This Matters

Understanding ${focus} is essential for anyone serious about mastering this field. The landscape has evolved dramatically, and what worked even six months ago may not be as effective today. This lesson gives you current, battle-tested tactics that are producing results right now.

## Key Learning Objectives

By the end of this lesson, you'll be able to:

- Understand the core principles behind ${focus}
- Identify common mistakes and how to avoid them
- Implement proven frameworks and systems
- Apply real-world strategies to your specific situation
- Measure and track your progress effectively

## Core Concepts

${focus} isn't just theory—it's about practical application. We'll break down complex concepts into simple, executable steps. You'll see real examples from successful practitioners, including specific numbers, metrics, and timelines.

### The Foundation

Every expert started where you are now. The difference between those who succeed and those who don't comes down to understanding these foundational principles. We'll cover:

1. **Strategic Framework**: The exact system top performers use
2. **Common Pitfalls**: Mistakes that waste time and money
3. **Optimization Techniques**: How to improve results systematically
4. **Scaling Strategies**: Taking good results and making them great

## Practical Application

Theory without application is useless. Throughout this lesson, you'll work through hands-on exercises designed to cement your understanding. Each exercise builds on the previous one, creating a complete system you can implement immediately.

### Real-World Examples

Let's look at three case studies from people who've successfully applied these exact strategies:

**Case Study 1**: Started from zero, applied these principles, achieved measurable results within 30 days.

**Case Study 2**: Struggled for months using outdated methods, switched to this approach, saw 10x improvement.

**Case Study 3**: Scaled from beginner to advanced using the frameworks taught in this course.

## Step-by-Step Implementation

Here's exactly what to do next:

1. Review the core concepts covered in this lesson
2. Complete the practical exercises (worksheet included)
3. Document your baseline metrics
4. Implement the strategies over the next 7 days
5. Track and measure your results
6. Iterate and optimize based on data

## Common Questions

**Q: How long will this take to show results?**  
A: Most students see initial results within 2-4 weeks of consistent application.

**Q: What if I don't have experience?**  
A: This lesson is designed for all levels. We start with fundamentals and build systematically.

**Q: Can I adapt this to my specific situation?**  
A: Absolutely. The frameworks are flexible and can be customized to your unique needs.

## What's Next

After completing this lesson:

- Download the resource pack and templates
- Join the community discussion (link in course dashboard)
- Move on to the next lesson when you've implemented these concepts
- Optional: Complete the quiz to test your understanding

## Your Action Plan

Don't just consume this content—implement it. Take these specific actions within the next 24 hours:

✓ Write down 3 key takeaways from this lesson  
✓ Identify 1 strategy you'll implement this week  
✓ Set up your tracking system  
✓ Schedule time blocks for implementation  

Remember: Knowledge without action is just entertainment. Let's make this count.

---

**Resources Mentioned:**
- Strategy Template (PDF)
- Implementation Checklist
- Tracking Spreadsheet
- Community Forum Link

**Estimated Implementation Time:** 2-3 hours  
**Recommended Review:** Weekly for first month

See you in the next lesson!
`;
};

// Generate realistic modules and lessons based on course duration
const generateCourseStructure = (courseTitle: string, totalHours: number, slug: string) => {
  const modulesCount = Math.ceil(totalHours / 2.5); // ~2.5 hours per module
  const modules: any[] = [];
  
  const moduleTemplates = [
    { title: "Fundamentals and Getting Started", lessons: ["Introduction and Overview", "Core Concepts Explained", "Setting Up Your Foundation", "Essential Tools and Resources"] },
    { title: "Strategy and Planning", lessons: ["Strategic Framework", "Planning Your Approach", "Setting Realistic Goals", "Creating Your Roadmap"] },
    { title: "Implementation and Execution", lessons: ["Step-by-Step Implementation", "Practical Techniques", "Common Pitfalls to Avoid", "Quality Control"] },
    { title: "Optimization and Scaling", lessons: ["Analyzing Your Results", "Optimization Strategies", "Scaling Your Success", "Automation and Systems"] },
    { title: "Advanced Tactics", lessons: ["Expert-Level Strategies", "Advanced Case Studies", "Competitive Advantages", "Cutting-Edge Techniques"] },
    { title: "Monetization and Growth", lessons: ["Revenue Strategies", "Growth Hacking", "Scaling Revenue", "Long-Term Sustainability"] },
    { title: "Mastery and Beyond", lessons: ["Mastering the Craft", "Teaching and Mentoring", "Building Authority", "Next Steps"] },
  ];
  
  const totalMinutes = totalHours * 60;
  const targetLessonsCount = Math.floor(totalMinutes / 20); // ~20 min per lesson
  const lessonsPerModule = Math.ceil(targetLessonsCount / modulesCount);
  
  for (let i = 0; i < modulesCount; i++) {
    const template = moduleTemplates[i % moduleTemplates.length];
    const lessons: any[] = [];
    
    for (let j = 0; j < lessonsPerModule; j++) {
      const lessonTemplate = template.lessons[j % template.lessons.length];
      const isFirstLesson = i === 0 && j === 0;
      const duration = 15 + Math.floor(Math.random() * 20); // 15-35 minutes
      
      lessons.push({
        title: `${lessonTemplate} ${j > 3 ? `(Part ${Math.floor(j / 4) + 1})` : ''}`.trim(),
        duration,
        order: j + 1,
        isFree: isFirstLesson,
        content: createLessonContent(courseTitle, lessonTemplate, `${lessonTemplate.toLowerCase()} for ${courseTitle}`),
      });
    }
    
    modules.push({
      title: `Module ${i + 1}: ${template.title}`,
      order: i + 1,
      lessons: { create: lessons },
    });
  }
  
  return modules;
};

async function main() {
  console.log("🌱 Starting comprehensive database seed with all 20 courses...");

  // Clear existing data
  await prisma.quizAttempt.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.module.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.review.deleteMany();
  await prisma.wishlist.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.lessonProgress.deleteMany();
  await prisma.course.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
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
        email: "instructor@skillmint.com",
        name: "Sarah Johnson",
        password: hashedPassword,
        role: "INSTRUCTOR",
        bio: "Experienced entrepreneur and online course creator with 10+ years in digital marketing.",
      },
    }),
    prisma.user.create({
      data: {
        email: "student@skillmint.com",
        name: "Alex Rivera",
        password: hashedPassword,
        role: "STUDENT",
      },
    }),
  ]);

  console.log(`✅ Created ${users.length} users`);

  // ALL 20 COURSES
  const coursesData = [
    // === BEGINNER COURSES (7) ===
    {
      title: "NFT Flipping Masterclass",
      slug: "nft-flipping-masterclass",
      shortDesc: "Learn to spot undervalued NFTs, execute floor sweeps, and build a consistent flipping system that generates income.",
      description: "Master the art of profitable NFT trading with data-driven strategies and proven frameworks.",
      thumbnail: "/courses/web3-thumb.svg",
      banner: "/courses/web3-banner.svg",
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
      description: "Grow your Twitter following and build genuine influence with cutting-edge strategies.",
      thumbnail: "/courses/social-thumb.svg",
      banner: "/courses/social-banner.svg",
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
      description: "Build a profitable Instagram presence with Reels, Stories, and creator monetization tools.",
      thumbnail: "/courses/social-thumb.svg",
      banner: "/courses/social-banner.svg",
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
      description: "Turn your knowledge into scalable income with digital products that sell on autopilot.",
      thumbnail: "/courses/marketing-thumb.svg",
      banner: "/courses/marketing-banner.svg",
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
      description: "Turn LinkedIn into your professional growth engine with authority-building strategies.",
      thumbnail: "/courses/social-thumb.svg",
      banner: "/courses/social-banner.svg",
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
      description: "Organize your entire life in Notion with databases, templates, and automation workflows.",
      thumbnail: "/courses/tech-thumb.svg",
      banner: "/courses/tech-banner.svg",
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
      description: "Launch your e-commerce business without inventory using proven dropshipping strategies.",
      thumbnail: "/courses/ecommerce-thumb.svg",
      banner: "/courses/ecommerce-banner.svg",
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
      description: "Unlock the full potential of AI tools with advanced prompt engineering techniques.",
      thumbnail: "/courses/tech-thumb.svg",
      banner: "/courses/tech-banner.svg",
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
      description: "Freelance in the crypto economy and earn 2-5x more than traditional freelancing.",
      thumbnail: "/courses/web3-thumb.svg",
      banner: "/courses/web3-banner.svg",
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
      description: "Build a profitable POD business selling custom products without holding inventory.",
      thumbnail: "/courses/ecommerce-thumb.svg",
      banner: "/courses/ecommerce-banner.svg",
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
      description: "Work smarter not harder with AI automation workflows that save time and increase productivity.",
      thumbnail: "/courses/tech-thumb.svg",
      banner: "/courses/tech-banner.svg",
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
      description: "Become a freelance web developer with HTML, CSS, JavaScript, React, and client acquisition skills.",
      thumbnail: "/courses/tech-thumb.svg",
      banner: "/courses/tech-banner.svg",
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
      description: "Start and grow a successful podcast with professional production and marketing strategies.",
      thumbnail: "/courses/marketing-thumb.svg",
      banner: "/courses/marketing-banner.svg",
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
      description: "Launch your own Amazon brand with product sourcing, branding, and scaling strategies.",
      thumbnail: "/courses/ecommerce-thumb.svg",
      banner: "/courses/ecommerce-banner.svg",
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
      description: "Turn email into your #1 revenue channel with automated sequences and high-converting copy.",
      thumbnail: "/courses/marketing-thumb.svg",
      banner: "/courses/marketing-banner.svg",
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
      description: "Navigate the Bitcoin Ordinals ecosystem and capitalize on digital artifacts on Bitcoin.",
      thumbnail: "/courses/web3-thumb.svg",
      banner: "/courses/web3-banner.svg",
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
      description: "Navigate the Solana DeFi ecosystem with yield farming and risk management strategies.",
      thumbnail: "/courses/web3-thumb.svg",
      banner: "/courses/web3-banner.svg",
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
      description: "Trade crypto like a professional with proven strategies and disciplined execution.",
      thumbnail: "/courses/finance-thumb.svg",
      banner: "/courses/finance-banner.svg",
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
      description: "Build the decentralized future with Solidity smart contract development and dApp creation.",
      thumbnail: "/courses/tech-thumb.svg",
      banner: "/courses/tech-banner.svg",
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
      description: "Advanced options strategies for consistent income with professional risk management.",
      thumbnail: "/courses/finance-thumb.svg",
      banner: "/courses/finance-banner.svg",
      price: 179,
      originalPrice: 399,
      category: "Finance & Investing",
      level: "ADVANCED",
      tags: ["Options Trading", "Stock Market", "Investing", "Income", "Trading"],
      isFeatured: true,
      totalHours: 12,
    },
  ];

  // Create courses with proper structure
  for (const courseData of coursesData) {
    const modules = generateCourseStructure(courseData.title, courseData.totalHours, courseData.slug);
    
    const course = await prisma.course.create({
      data: {
        ...courseData,
        level: courseData.level as Level,
        totalLessons: modules.reduce((sum, m) => sum + m.lessons.create.length, 0),
        modules: { create: modules },
      },
    });

    console.log(`✅ Created ${courseData.title} (${courseData.totalHours}h = ${course.totalLessons} lessons across ${modules.length} modules)`);
  }

  console.log("\n🎉 Database seeded successfully!");
  console.log(`📚 Total courses: ${coursesData.length}`);
  console.log(`👥 Total users: ${users.length}`);
  
  const beginnerCount = coursesData.filter(c => c.level === "BEGINNER").length;
  const intermediateCount = coursesData.filter(c => c.level === "INTERMEDIATE").length;
  const advancedCount = coursesData.filter(c => c.level === "ADVANCED").length;
  
  console.log(`\n📊 Level Distribution:`);
  console.log(`   BEGINNER: ${beginnerCount} courses`);
  console.log(`   INTERMEDIATE: ${intermediateCount} courses`);
  console.log(`   ADVANCED: ${advancedCount} courses`);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

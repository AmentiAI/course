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
  console.log("🌱 Starting comprehensive database seed...");

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

  // Course data
  const coursesData = [
    {
      title: "NFT Flipping Masterclass",
      slug: "nft-flipping-masterclass",
      shortDesc: "Learn to spot undervalued NFTs, execute floor sweeps, and build a consistent flipping system.",
      description: "Master the art of profitable NFT trading with data-driven strategies and proven frameworks.",
      thumbnail: "/courses/web3-thumb.svg",
      banner: "/courses/web3-banner.svg",
      price: 49,
      originalPrice: 129,
      category: "Web3 & Crypto",
      level: "BEGINNER",
      tags: ["NFT", "Web3", "Trading"],
      isFeatured: true,
      totalHours: 6,
    },
    {
      title: "Twitter/X Growth Hacking 2026",
      slug: "twitter-x-growth-2026",
      shortDesc: "Build a Twitter following from 0 to 10K+ using proven engagement tactics.",
      description: "Grow your Twitter following and build genuine influence with cutting-edge strategies.",
      thumbnail: "/courses/social-thumb.svg",
      banner: "/courses/social-banner.svg",
      price: 39,
      originalPrice: 99,
      category: "Social Media",
      level: "BEGINNER",
      tags: ["Twitter", "Social Media", "Growth"],
      isFeatured: true,
      totalHours: 5,
    },
    {
      title: "Shopify Dropshipping 2026",
      slug: "shopify-dropshipping-2026",
      shortDesc: "Build a profitable dropshipping store with proven product research and marketing strategies.",
      description: "Complete dropshipping blueprint from store setup to scaling past $10K/month.",
      thumbnail: "/courses/ecommerce-thumb.svg",
      banner: "/courses/ecommerce-banner.svg",
      price: 79,
      originalPrice: 199,
      category: "E-Commerce",
      level: "BEGINNER",
      tags: ["Shopify", "Dropshipping", "E-Commerce"],
      isFeatured: true,
      totalHours: 8,
    },
    {
      title: "AI Automation for Business",
      slug: "ai-automation-business",
      shortDesc: "Leverage ChatGPT, Make.com, and AI tools to automate your business workflows.",
      description: "Build AI-powered automation systems that save time and increase productivity.",
      thumbnail: "/courses/tech-thumb.svg",
      banner: "/courses/tech-banner.svg",
      price: 59,
      originalPrice: 149,
      category: "Technology",
      level: "INTERMEDIATE",
      tags: ["AI", "Automation", "ChatGPT"],
      isFeatured: true,
      totalHours: 7,
    },
    {
      title: "Crypto Trading Fundamentals",
      slug: "crypto-trading-basics",
      shortDesc: "Master crypto trading with technical analysis, risk management, and proven strategies.",
      description: "Learn to trade cryptocurrency profitably with comprehensive technical and fundamental analysis.",
      thumbnail: "/courses/finance-thumb.svg",
      banner: "/courses/finance-banner.svg",
      price: 69,
      originalPrice: 179,
      category: "Finance & Crypto",
      level: "INTERMEDIATE",
      tags: ["Crypto", "Trading", "Finance"],
      isFeatured: false,
      totalHours: 10,
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

    console.log(`✅ Created ${courseData.title} with ${modules.length} modules and ${course.totalLessons} lessons`);
  }

  console.log("\n🎉 Database seeded successfully!");
  console.log(`📚 Total courses: ${coursesData.length}`);
  console.log(`👥 Total users: ${users.length}`);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

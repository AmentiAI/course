import { NextResponse } from "next/server";
import { PrismaClient, Level } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

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

Every expert started where you are now. The difference between those who succeed and those who don't comes down to understanding these foundational principles.

## Practical Application

Theory without application is useless. Throughout this lesson, you'll work through hands-on exercises designed to cement your understanding.

## What's Next

After completing this lesson:
- Download the resource pack and templates
- Join the community discussion
- Move on to the next lesson when ready

Remember: Knowledge without action is just entertainment. Let's make this count.
`;
};

// Generate realistic modules and lessons
const generateCourseStructure = (courseTitle: string, totalHours: number) => {
  const modulesCount = Math.ceil(totalHours / 2.5);
  const modules: any[] = [];
  
  const moduleTemplates = [
    { title: "Fundamentals and Getting Started", lessons: ["Introduction and Overview", "Core Concepts Explained", "Setting Up Your Foundation", "Essential Tools"] },
    { title: "Strategy and Planning", lessons: ["Strategic Framework", "Planning Your Approach", "Setting Goals", "Creating Your Roadmap"] },
    { title: "Implementation", lessons: ["Step-by-Step Implementation", "Practical Techniques", "Common Pitfalls", "Quality Control"] },
    { title: "Optimization and Scaling", lessons: ["Analyzing Results", "Optimization Strategies", "Scaling Success", "Automation"] },
    { title: "Advanced Tactics", lessons: ["Expert Strategies", "Advanced Case Studies", "Competitive Advantages", "Cutting-Edge Techniques"] },
    { title: "Mastery", lessons: ["Mastering the Craft", "Teaching Others", "Building Authority", "Next Steps"] },
  ];
  
  const totalMinutes = totalHours * 60;
  const targetLessonsCount = Math.floor(totalMinutes / 20);
  const lessonsPerModule = Math.ceil(targetLessonsCount / modulesCount);
  
  for (let i = 0; i < modulesCount; i++) {
    const template = moduleTemplates[i % moduleTemplates.length];
    const lessons: any[] = [];
    
    for (let j = 0; j < lessonsPerModule; j++) {
      const lessonTemplate = template.lessons[j % template.lessons.length];
      const isFirstLesson = i === 0 && j === 0;
      const duration = 15 + Math.floor(Math.random() * 20);
      
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

export async function POST(request: Request) {
  try {
    const { secret } = await request.json();
    
    // Simple secret check (you should change this!)
    if (secret !== "seed-database-2026") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("🌱 Starting database seed...");

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

    // Create users
    const hashedPassword = await bcrypt.hash("password123", 10);
    await prisma.user.createMany({
      data: [
        { email: "admin@skillmint.com", name: "Admin User", password: hashedPassword, role: "ADMIN" },
        { email: "instructor@skillmint.com", name: "Sarah Johnson", password: hashedPassword, role: "INSTRUCTOR" },
        { email: "student@skillmint.com", name: "Alex Rivera", password: hashedPassword, role: "STUDENT" },
      ],
    });

    // Sample of courses (first 10 for speed)
    const coursesData = [
      { title: "NFT Flipping Masterclass", slug: "nft-flipping-masterclass", shortDesc: "Learn NFT trading", description: "Master NFT trading", thumbnail: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=800", banner: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop", price: 49, originalPrice: 129, category: "Web3 & Crypto", level: "BEGINNER" as Level, tags: ["NFT", "Web3"], isFeatured: true, totalHours: 6 },
      { title: "Twitter Growth Hacking", slug: "twitter-x-growth-2026", shortDesc: "Grow Twitter following", description: "Build Twitter audience", thumbnail: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800", banner: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop", price: 39, originalPrice: 99, category: "Marketing & Social", level: "BEGINNER" as Level, tags: ["Twitter", "Social"], isFeatured: false, totalHours: 5 },
      { title: "Shopify Dropshipping", slug: "dropshipping-mastery-2026", shortDesc: "Build dropshipping business", description: "Start dropshipping", thumbnail: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800", banner: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop", price: 79, originalPrice: 199, category: "E-Commerce", level: "BEGINNER" as Level, tags: ["Dropshipping"], isFeatured: false, totalHours: 8 },
    ];

    let created = 0;
    for (const courseData of coursesData) {
      const modules = generateCourseStructure(courseData.title, courseData.totalHours);
      
      await prisma.course.create({
        data: {
          ...courseData,
          totalLessons: modules.reduce((sum: number, m: any) => sum + m.lessons.create.length, 0),
          modules: { create: modules },
        },
      });
      created++;
    }

    return NextResponse.json({ 
      success: true, 
      message: `Seeded ${created} courses successfully!`,
      note: "This is a quick seed with 3 courses. For all 70 courses, update this endpoint."
    });

  } catch (error: any) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

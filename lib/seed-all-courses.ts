// Extracted from seed.ts for API use
import { prisma } from "@/lib/prisma";
import { Level } from "@prisma/client";
import bcrypt from "bcryptjs";
import { generateLessonContent, generateCourseIntroduction } from "./lesson-content-generator";

import coursesDataJSON from "../courses-data.json";

const coursesData = coursesDataJSON;

const generateCourseStructure = (
  courseTitle: string,
  courseDescription: string,
  category: string,
  level: Level,
  totalHours: number
) => {
  const modulesCount = Math.ceil(totalHours / 2.5);
  const modules: any[] = [];
  
  const moduleTemplates = [
    { title: "Fundamentals", lessons: ["Introduction", "Core Concepts", "Setup & Tools", "Essential Framework"] },
    { title: "Strategy", lessons: ["Strategic Framework", "Planning Process", "Goal Setting", "Roadmap Development"] },
    { title: "Implementation", lessons: ["Step-by-Step Process", "Key Techniques", "Common Pitfalls", "Quality Control"] },
    { title: "Optimization", lessons: ["Performance Analysis", "Optimization Strategies", "Scaling Methods", "Automation Systems"] },
    { title: "Advanced", lessons: ["Expert Strategies", "Real Case Studies", "Competitive Advantages", "Advanced Techniques"] },
    { title: "Mastery", lessons: ["Mastering the Craft", "Teaching Others", "Building Authority", "Long-term Success"] },
  ];
  
  const totalMinutes = totalHours * 60;
  const targetLessonsCount = Math.floor(totalMinutes / 20);
  const lessonsPerModule = Math.ceil(targetLessonsCount / modulesCount);
  
  let globalLessonIndex = 0;
  
  for (let i = 0; i < modulesCount; i++) {
    const template = moduleTemplates[i % moduleTemplates.length];
    const moduleTitle = `Module ${i + 1}: ${template.title}`;
    const lessons: any[] = [];
    
    for (let j = 0; j < lessonsPerModule; j++) {
      const lessonTemplate = template.lessons[j % template.lessons.length];
      const fullLessonTitle = `${lessonTemplate}${j > 3 ? ` (Part ${Math.floor(j / 4) + 1})` : ''}`.trim();
      
      // Use comprehensive content generator
      const content = generateLessonContent(
        courseTitle,
        category,
        fullLessonTitle,
        moduleTitle,
        globalLessonIndex
      );
      
      lessons.push({
        title: fullLessonTitle,
        duration: 15 + Math.floor(Math.random() * 20),
        order: j + 1,
        isFree: i === 0 && j === 0,
        content: content,
      });
      
      globalLessonIndex++;
    }
    
    modules.push({
      title: moduleTitle,
      order: i + 1,
      lessons: { create: lessons },
    });
  }
  
  return modules;
};

export async function seedAllCourses() {
  console.log("🌱 Starting comprehensive seed...");

  // Clear existing
  await prisma.quizAttempt.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.module.deleteMany();
  await prisma.discussionMessage.deleteMany();
  await prisma.discussion.deleteMany();
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
      { email: "admin@skillmint.com", name: "Admin", password: hashedPassword, role: "ADMIN" },
      { email: "instructor@skillmint.com", name: "Sarah", password: hashedPassword, role: "INSTRUCTOR" },
      { email: "student@skillmint.com", name: "Alex", password: hashedPassword, role: "STUDENT" },
    ],
  });

  // Create courses with discussions
  let created = 0;
  for (const courseData of coursesData) {
    const levelEnum = courseData.level as Level;
    const totalLessonsCount = Math.floor((courseData.totalHours * 60) / 20);
    
    // Generate comprehensive course introduction
    const introduction = generateCourseIntroduction(
      courseData.title,
      courseData.description,
      courseData.category,
      courseData.level,
      courseData.totalHours,
      totalLessonsCount
    );
    
    // Generate modules with detailed lesson content
    const modules = generateCourseStructure(
      courseData.title,
      courseData.description,
      courseData.category,
      levelEnum,
      courseData.totalHours
    );
    
    const course = await prisma.course.create({
      data: {
        ...courseData,
        level: levelEnum,
        introduction: introduction,
        totalLessons: modules.reduce((sum: number, m: any) => sum + m.lessons.create.length, 0),
        modules: { create: modules },
      },
    });
    
    // Create empty discussion for each course
    await prisma.discussion.create({
      data: {
        courseId: course.id,
      },
    });
    
    created++;
    console.log(`Created course ${created}: ${courseData.title} (with comprehensive content + discussion)`);
  }

  return { created, total: coursesData.length };
}

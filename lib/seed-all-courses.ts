// Extracted from seed.ts for API use
import { prisma } from "@/lib/prisma";
import { Level } from "@prisma/client";
import bcrypt from "bcryptjs";

import coursesDataJSON from "../courses-data.json";

const coursesData = coursesDataJSON;

const createLessonContent = (courseTitle: string, lessonTitle: string, focus: string): string => {
  return `# ${lessonTitle}\n\nWelcome to ${courseTitle}. This lesson covers ${focus}.\n\n## Key Points\n\nYou'll learn the fundamentals and best practices.\n\n## Next Steps\n\nApply what you learn immediately.`;
};

const generateCourseStructure = (courseTitle: string, totalHours: number) => {
  const modulesCount = Math.ceil(totalHours / 2.5);
  const modules: any[] = [];
  
  const moduleTemplates = [
    { title: "Fundamentals", lessons: ["Introduction", "Core Concepts", "Setup", "Tools"] },
    { title: "Strategy", lessons: ["Framework", "Planning", "Goals", "Roadmap"] },
    { title: "Implementation", lessons: ["Step by Step", "Techniques", "Pitfalls", "Quality"] },
    { title: "Optimization", lessons: ["Analysis", "Optimization", "Scaling", "Automation"] },
    { title: "Advanced", lessons: ["Expert Strategies", "Case Studies", "Advantages", "Techniques"] },
    { title: "Mastery", lessons: ["Mastering", "Teaching", "Authority", "Next Steps"] },
  ];
  
  const totalMinutes = totalHours * 60;
  const targetLessonsCount = Math.floor(totalMinutes / 20);
  const lessonsPerModule = Math.ceil(targetLessonsCount / modulesCount);
  
  for (let i = 0; i < modulesCount; i++) {
    const template = moduleTemplates[i % moduleTemplates.length];
    const lessons: any[] = [];
    
    for (let j = 0; j < lessonsPerModule; j++) {
      const lessonTemplate = template.lessons[j % template.lessons.length];
      lessons.push({
        title: `${lessonTemplate} ${j > 3 ? `(Part ${Math.floor(j / 4) + 1})` : ''}`.trim(),
        duration: 15 + Math.floor(Math.random() * 20),
        order: j + 1,
        isFree: i === 0 && j === 0,
        content: createLessonContent(courseTitle, lessonTemplate, lessonTemplate.toLowerCase()),
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

export async function seedAllCourses() {
  console.log("🌱 Starting comprehensive seed...");

  // Clear existing
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
      { email: "admin@skillmint.com", name: "Admin", password: hashedPassword, role: "ADMIN" },
      { email: "instructor@skillmint.com", name: "Sarah", password: hashedPassword, role: "INSTRUCTOR" },
      { email: "student@skillmint.com", name: "Alex", password: hashedPassword, role: "STUDENT" },
    ],
  });

  // Create courses
  let created = 0;
  for (const courseData of coursesData) {
    const modules = generateCourseStructure(courseData.title, courseData.totalHours);
    
    await prisma.course.create({
      data: {
        ...courseData,
        level: courseData.level as Level,
        totalLessons: modules.reduce((sum: number, m: any) => sum + m.lessons.create.length, 0),
        modules: { create: modules },
      },
    });
    created++;
    console.log(`Created course ${created}: ${courseData.title}`);
  }

  return { created, total: coursesData.length };
}

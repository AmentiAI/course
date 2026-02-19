import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as any);

async function verify() {
  const courses = await prisma.course.findMany({
    include: {
      modules: {
        include: {
          lessons: {
            include: {
              quiz: true,
            },
          },
        },
      },
    },
    orderBy: { level: 'asc' },
  });

  console.log("📋 COMPLETE COURSE LIST WITH BANNERS & QUIZZES\n");
  console.log("=" .repeat(80));
  
  const levels = { BEGINNER: [], INTERMEDIATE: [], ADVANCED: [] };
  
  courses.forEach(course => {
    levels[course.level].push(course);
  });

  ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'].forEach(level => {
    console.log(`\n🎯 ${level} COURSES (${levels[level].length})`);
    console.log("-".repeat(80));
    
    levels[level].forEach((course, idx) => {
      const quizCount = course.modules.reduce((acc, mod) => {
        return acc + mod.lessons.filter(l => l.quiz !== null).length;
      }, 0);
      
      console.log(`\n${idx + 1}. ${course.title}`);
      console.log(`   Level: ${course.level} | Price: $${course.price} | Hours: ${course.totalHours}`);
      console.log(`   Category: ${course.category}`);
      console.log(`   Featured: ${course.isFeatured ? '⭐ Yes' : 'No'}`);
      console.log(`   Banner: ${course.banner}`);
      console.log(`   Modules: ${course.modules.length} | Lessons: ${course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} | Quizzes: ${quizCount}`);
    });
  });

  console.log("\n" + "=".repeat(80));
  console.log("\n📊 SUMMARY STATISTICS\n");
  
  const totalQuizzes = courses.reduce((acc, c) => {
    return acc + c.modules.reduce((mAcc, m) => {
      return mAcc + m.lessons.filter(l => l.quiz !== null).length;
    }, 0);
  }, 0);
  
  console.log(`Total Courses: ${courses.length}`);
  console.log(`  - BEGINNER: ${levels.BEGINNER.length}`);
  console.log(`  - INTERMEDIATE: ${levels.INTERMEDIATE.length}`);
  console.log(`  - ADVANCED: ${levels.ADVANCED.length}`);
  console.log(`\nTotal Modules: ${courses.reduce((acc, c) => acc + c.modules.length, 0)}`);
  console.log(`Total Lessons: ${courses.reduce((acc, c) => acc + c.modules.reduce((mAcc, m) => mAcc + m.lessons.length, 0), 0)}`);
  console.log(`Total Quizzes: ${totalQuizzes}`);
  console.log(`\nFeatured Courses: ${courses.filter(c => c.isFeatured).length}`);
  console.log(`Price Range: $${Math.min(...courses.map(c => c.price))} - $${Math.max(...courses.map(c => c.price))}`);
  
  await prisma.$disconnect();
}

verify();

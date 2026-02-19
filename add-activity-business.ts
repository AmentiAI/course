import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_g8SvCD9MhLip@ep-green-mountain-ainx1go9-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require",
  ssl: { rejectUnauthorized: false },
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as any);

function randomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const BUSINESS_QUIZ_QUESTIONS = [
  {
    question: "What is the difference between revenue and profit?",
    options: [
      "They are the same thing",
      "Revenue is total income, profit is revenue minus expenses",
      "Profit is before taxes, revenue is after",
      "Revenue is cash only, profit includes credit"
    ],
    correctAnswer: 1,
    explanation: "Revenue is all money coming in from sales. Profit is what's left after subtracting all expenses - it's the actual money you keep."
  },
  {
    question: "What does 'LLC' stand for?",
    options: [
      "Limited Liability Company",
      "Local Legal Corporation",
      "Long-term License Contract",
      "Legal Liability Clearance"
    ],
    correctAnswer: 0,
    explanation: "LLC stands for Limited Liability Company - a business structure that protects personal assets from business liabilities."
  },
  {
    question: "What is a business 'value proposition'?",
    options: [
      "The company's stock price",
      "Annual revenue goal",
      "Why customers should choose you over competitors",
      "The mission statement"
    ],
    correctAnswer: 2,
    explanation: "A value proposition clearly explains what makes your product/service valuable and why customers should choose you instead of competitors."
  },
  {
    question: "What is 'cash flow' in business?",
    options: [
      "Total revenue",
      "Money moving in and out of the business",
      "Profit margin",
      "Investment capital"
    ],
    correctAnswer: 1,
    explanation: "Cash flow is the movement of money in and out of your business. Positive cash flow means more coming in than going out."
  }
];

const REVIEW_TEMPLATES = [
  { rating: 5, text: "Perfect {topic} training! Exactly what I needed to get started. Highly practical." },
  { rating: 5, text: "This {topic} course is comprehensive and well-structured. Best one I've found." },
  { rating: 4, text: "Great {topic} course. Learned a ton. A few sections could use more depth." },
  { rating: 5, text: "Incredibly valuable {topic} insights. Already implementing what I learned!" },
  { rating: 4, text: "Solid {topic} fundamentals. Good balance of theory and practice." },
  { rating: 5, text: "The {topic} strategies here work. Seeing real results in my business." },
  { rating: 5, text: "Best investment for learning {topic}. Clear, actionable, and results-oriented." },
  { rating: 4, text: "Quality {topic} content. Would have liked more case studies but overall excellent." },
  { rating: 5, text: "This {topic} course delivered beyond expectations. Worth every penny!" },
  { rating: 5, text: "Finally a {topic} course that's practical, not just theory. Game-changer!" }
];

async function main() {
  const businessSlugs = [
    'consulting-business-startup',
    'quickbooks-accounting-mastery',
    'sales-funnel-blueprint',
    'project-management-pmp-prep',
    'virtual-assistant-business',
    'nonprofit-startup-guide',
    'business-plan-funding',
    'legal-essentials-small-business',
    'customer-service-excellence',
    'franchise-business-guide'
  ];
  
  console.log("🎯 Adding quizzes to business courses...\n");
  
  for (const slug of businessSlugs) {
    const course = await prisma.course.findUnique({
      where: { slug },
      include: {
        modules: {
          include: {
            lessons: { orderBy: { order: 'asc' }, include: { quiz: true } }
          },
          orderBy: { order: 'asc' }
        }
      }
    });
    
    if (!course) continue;
    
    for (const module of course.modules) {
      const lastLesson = module.lessons[module.lessons.length - 1];
      if (lastLesson && !lastLesson.quiz) {
        await prisma.quiz.create({
          data: {
            lessonId: lastLesson.id,
            questions: BUSINESS_QUIZ_QUESTIONS
          }
        });
        console.log(`  ✓ ${course.title}`);
      }
    }
  }
  
  console.log("\n👥 Adding enrollments and reviews...\n");
  
  const students = await prisma.user.findMany({ where: { role: 'STUDENT' } });
  const startDate = new Date('2026-01-01');
  const endDate = new Date('2026-02-19');
  
  let totalEnrollments = 0;
  let totalReviews = 0;
  
  for (const slug of businessSlugs) {
    const course = await prisma.course.findUnique({ where: { slug } });
    if (!course) continue;
    
    const enrollmentCount = Math.floor(Math.random() * 980) + 20;
    const shuffled = [...students].sort(() => Math.random() - 0.5);
    const enrolled = shuffled.slice(0, Math.min(enrollmentCount, students.length));
    
    for (const student of enrolled) {
      await prisma.enrollment.create({
        data: {
          userId: student.id,
          courseId: course.id,
          enrolledAt: randomDate(startDate, endDate),
          progress: Math.floor(Math.random() * 100)
        }
      });
      totalEnrollments++;
    }
    
    const reviewCount = Math.floor(Math.random() * 16) + 5;
    const reviewers = enrolled.slice(0, reviewCount);
    
    for (const reviewer of reviewers) {
      const template = REVIEW_TEMPLATES[Math.floor(Math.random() * REVIEW_TEMPLATES.length)];
      const courseTopic = course.title.split(':')[0].split('|')[0].trim();
      const reviewText = template.text.replace('{topic}', courseTopic);
      
      await prisma.review.create({
        data: {
          userId: reviewer.id,
          courseId: course.id,
          rating: template.rating,
          comment: reviewText,
          createdAt: randomDate(startDate, endDate)
        }
      });
      totalReviews++;
    }
    
    console.log(`  ✓ ${course.title}: ${enrollmentCount} enrollments, ${reviewCount} reviews`);
  }
  
  console.log(`\n✅ Complete!`);
  console.log(`   Enrollments: ${totalEnrollments}`);
  console.log(`   Reviews: ${totalReviews}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

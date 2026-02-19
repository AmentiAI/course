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

const MONEY_QUIZ_QUESTIONS = [
  {
    question: "What is the most important factor in building sustainable income?",
    options: [
      "Getting rich quick",
      "Consistent action and learning from mistakes",
      "Having a lot of startup capital",
      "Knowing influential people"
    ],
    correctAnswer: 1,
    explanation: "Sustainable income comes from consistent effort, learning, and adapting. Quick schemes rarely work long-term."
  },
  {
    question: "What does 'scalable income' mean?",
    options: [
      "Income that grows with inflation",
      "Income that can increase without proportional time investment",
      "Income from multiple jobs",
      "Income adjusted for taxes"
    ],
    correctAnswer: 1,
    explanation: "Scalable income means you can earn more without working proportionally more hours. Examples: digital products, courses, rental properties."
  },
  {
    question: "Which is generally considered 'passive income'?",
    options: [
      "Freelancing hourly work",
      "Running a restaurant",
      "Dividend-paying stocks",
      "Consulting services"
    ],
    correctAnswer: 2,
    explanation: "Passive income is money earned with minimal ongoing effort. Dividends from stocks continue flowing once invested."
  },
  {
    question: "What is a common mistake new entrepreneurs make?",
    options: [
      "Starting before they feel 100% ready",
      "Not charging enough for their services",
      "Asking for customer feedback",
      "Testing ideas with minimal investment"
    ],
    correctAnswer: 1,
    explanation: "Many beginners undervalue their work and charge too little. This hurts profitability and sustainability."
  },
  {
    question: "What does 'diversifying income streams' mean?",
    options: [
      "Having money in different bank accounts",
      "Earning money from multiple sources",
      "Investing only in one business",
      "Saving money in different currencies"
    ],
    correctAnswer: 1,
    explanation: "Income diversification means earning from multiple sources (freelancing, investments, products) to reduce risk."
  }
];

const REVIEW_TEMPLATES = [
  { rating: 5, text: "This {topic} course completely changed my approach! Already seeing results." },
  { rating: 5, text: "Best {topic} resource I've found. Clear, practical, and immediately actionable." },
  { rating: 4, text: "Really solid {topic} training. Would have liked more advanced examples but great overall." },
  { rating: 5, text: "The {topic} strategies actually work! Made my first $500 within 3 weeks." },
  { rating: 4, text: "Great {topic} fundamentals. Perfect for beginners, though experienced folks might want more." },
  { rating: 5, text: "This {topic} course paid for itself in the first month. Incredible value!" },
  { rating: 5, text: "Finally a {topic} course that doesn't oversell. Real, honest, practical advice." },
  { rating: 4, text: "Very comprehensive {topic} guide. Takes work to implement, but worth it." },
  { rating: 5, text: "The {topic} techniques here are gold. Wish I found this years ago!" },
  { rating: 5, text: "Hands down the best {topic} training available. Don't hesitate, just buy it." },
  { rating: 4, text: "Solid {topic} course with actionable steps. Already making progress!" },
  { rating: 5, text: "This {topic} content is a game-changer. Totally exceeded expectations." },
  { rating: 5, text: "Perfect mix of theory and practice for {topic}. Highly recommend!" },
  { rating: 4, text: "Good {topic} course. Could use more examples but the core content is excellent." },
  { rating: 5, text: "Absolutely worth it! The {topic} knowledge here is invaluable." }
];

const MONEY_COURSE_SLUGS = [
  // Freelancing & Services
  "social-media-management-business",
  "translation-services-business",
  "resume-writing-career-coaching",
  "voiceover-artist-business",
  "proofreading-editing-services",
  "virtual-bookkeeping-business",
  "transcription-services-income",
  "grant-writing-nonprofits",
  "data-entry-business-automation",
  "online-tutoring-empire",
  // Content Creation
  "twitch-streaming-10k-month",
  "instagram-reels-monetization",
  "blogging-5k-month-passive",
  "youtube-shorts-revenue",
  "stock-photography-income",
  "digital-art-etsy-business",
  "kindle-publishing-business",
  "medium-partner-program",
  "substack-newsletter-revenue",
  "onlyfans-patreon-creator",
  // Ecommerce & Products
  "etsy-shop-50k-blueprint",
  "ebay-reselling-mastery",
  "amazon-wholesale-business",
  "handmade-crafts-business",
  "private-label-skincare",
  "import-export-trading",
  "shopify-aliexpress-dropshipping",
  "merch-by-amazon-tshirts",
  "subscription-box-business",
  "print-on-demand-apparel",
  // Investing & Trading
  "day-trading-stocks-income",
  "swing-trading-strategies",
  "dividend-income-portfolio",
  "real-estate-rental-income",
  "house-flipping-business",
  "reits-passive-real-estate",
  "peer-to-peer-lending-income",
  "covered-call-income-strategy",
  "index-fund-investing-wealth",
  "treasury-bills-bonds-income",
  // Side Hustles & Gigs
  "food-delivery-income-max",
  "rideshare-income-max",
  "taskrabbit-handy-business",
  "pet-sitting-dog-walking",
  "house-sitting-income",
  "mystery-shopping-side-hustle",
  "focus-groups-market-research",
  "flipping-furniture-profit",
  "garage-sale-flipping",
  "rent-car-on-turo"
];

async function main() {
  console.log("🎯 Adding quizzes to money-making courses...\n");
  
  let quizzesAdded = 0;
  
  for (const slug of MONEY_COURSE_SLUGS) {
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
    
    if (!course) {
      console.log(`  ⊘ Course not found: ${slug}`);
      continue;
    }
    
    for (const module of course.modules) {
      const lastLesson = module.lessons[module.lessons.length - 1];
      if (lastLesson && !lastLesson.quiz) {
        await prisma.quiz.create({
          data: {
            lessonId: lastLesson.id,
            questions: MONEY_QUIZ_QUESTIONS
          }
        });
        quizzesAdded++;
      }
    }
    console.log(`  ✓ ${course.title}`);
  }
  
  console.log(`\n✅ Added ${quizzesAdded} quizzes`);
  
  console.log("\n👥 Adding enrollments and reviews...\n");
  
  const students = await prisma.user.findMany({ where: { role: 'STUDENT' } });
  const startDate = new Date('2026-01-01');
  const endDate = new Date('2026-02-19');
  
  let totalEnrollments = 0;
  let totalReviews = 0;
  
  for (const slug of MONEY_COURSE_SLUGS) {
    const course = await prisma.course.findUnique({ where: { slug } });
    if (!course) continue;
    
    // Vary enrollment counts: 20-1000
    const enrollmentCount = Math.floor(Math.random() * 981) + 20;
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
    
    // 5-20 reviews per course
    const reviewCount = Math.floor(Math.random() * 16) + 5;
    const reviewers = enrolled.slice(0, reviewCount);
    
    for (const reviewer of reviewers) {
      const template = REVIEW_TEMPLATES[Math.floor(Math.random() * REVIEW_TEMPLATES.length)];
      // Extract topic from title (before colon or first few words)
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
  
  console.log(`\n✅ Activity complete!`);
  console.log(`   Total Quizzes: ${quizzesAdded}`);
  console.log(`   Total Enrollments: ${totalEnrollments}`);
  console.log(`   Total Reviews: ${totalReviews}`);
  
  const finalCourseCount = await prisma.course.count();
  console.log(`\n📊 Final course count: ${finalCourseCount}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

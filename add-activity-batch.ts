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
];

const MONEY_COURSE_SLUGS = [
  "social-media-management-business", "translation-services-business", "resume-writing-career-coaching",
  "voiceover-artist-business", "proofreading-editing-services", "virtual-bookkeeping-business",
  "transcription-services-income", "grant-writing-nonprofits", "data-entry-business-automation",
  "online-tutoring-empire", "twitch-streaming-10k-month", "instagram-reels-monetization",
  "blogging-5k-month-passive", "youtube-shorts-revenue", "stock-photography-income",
  "digital-art-etsy-business", "kindle-publishing-business", "medium-partner-program",
  "substack-newsletter-revenue", "onlyfans-patreon-creator", "etsy-shop-50k-blueprint",
  "ebay-reselling-mastery", "amazon-wholesale-business", "handmade-crafts-business",
  "private-label-skincare", "import-export-trading", "shopify-aliexpress-dropshipping",
  "merch-by-amazon-tshirts", "subscription-box-business", "print-on-demand-apparel",
  "day-trading-stocks-income", "swing-trading-strategies", "dividend-income-portfolio",
  "real-estate-rental-income", "house-flipping-business", "reits-passive-real-estate",
  "peer-to-peer-lending-income", "covered-call-income-strategy", "index-fund-investing-wealth",
  "treasury-bills-bonds-income", "food-delivery-income-max", "rideshare-income-max",
  "taskrabbit-handy-business", "pet-sitting-dog-walking", "house-sitting-income",
  "mystery-shopping-side-hustle", "focus-groups-market-research", "flipping-furniture-profit",
  "garage-sale-flipping", "rent-car-on-turo"
];

async function main() {
  console.log("👥 Adding enrollments and reviews (BATCH MODE)...\n");
  
  const allStudents = await prisma.user.findMany({ where: { role: 'STUDENT' } });
  console.log(`Found ${allStudents.length} students\n`);
  
  const startDate = new Date('2026-01-01');
  const endDate = new Date('2026-02-19');
  
  let totalEnrollments = 0;
  let totalReviews = 0;
  
  for (const slug of MONEY_COURSE_SLUGS) {
    const course = await prisma.course.findUnique({ where: { slug } });
    if (!course) continue;
    
    const existingEnrollments = await prisma.enrollment.findMany({
      where: { courseId: course.id },
      select: { userId: true }
    });
    const enrolledUserIds = new Set(existingEnrollments.map(e => e.userId));
    const availableStudents = allStudents.filter(s => !enrolledUserIds.has(s.id));
    
    const targetEnrollments = Math.floor(Math.random() * 981) + 20;
    const toEnroll = Math.min(targetEnrollments - existingEnrollments.length, availableStudents.length);
    
    if (toEnroll > 0) {
      const shuffled = [...availableStudents].sort(() => Math.random() - 0.5);
      const selectedStudents = shuffled.slice(0, toEnroll);
      
      // Batch create enrollments
      const enrollmentData = selectedStudents.map(s => ({
        userId: s.id,
        courseId: course.id,
        enrolledAt: randomDate(startDate, endDate),
        progress: Math.floor(Math.random() * 100)
      }));
      
      await prisma.enrollment.createMany({
        data: enrollmentData,
        skipDuplicates: true
      });
      
      totalEnrollments += toEnroll;
      
      // Reviews
      const existingReviews = await prisma.review.findMany({
        where: { courseId: course.id },
        select: { userId: true }
      });
      const reviewedUserIds = new Set(existingReviews.map(r => r.userId));
      
      const allEnrolled = [...existingEnrollments.map(e => allStudents.find(s => s.id === e.userId)), ...selectedStudents]
        .filter(s => s != null && !reviewedUserIds.has(s.id));
      
      const targetReviews = Math.floor(Math.random() * 16) + 5;
      const toReview = Math.min(targetReviews - existingReviews.length, allEnrolled.length);
      
      const reviewers = allEnrolled.slice(0, toReview);
      const courseTopic = course.title.split(':')[0].split('|')[0].trim();
      
      const reviewData = reviewers.map(r => {
        const template = REVIEW_TEMPLATES[Math.floor(Math.random() * REVIEW_TEMPLATES.length)];
        return {
          userId: r.id,
          courseId: course.id,
          rating: template.rating,
          comment: template.text.replace('{topic}', courseTopic),
          createdAt: randomDate(startDate, endDate)
        };
      });
      
      await prisma.review.createMany({
        data: reviewData,
        skipDuplicates: true
      });
      
      totalReviews += toReview;
      
      const finalEnroll = existingEnrollments.length + toEnroll;
      const finalReview = existingReviews.length + toReview;
      console.log(`  ✓ ${course.title}: ${finalEnroll} enrollments (+${toEnroll}), ${finalReview} reviews (+${toReview})`);
    }
  }
  
  console.log(`\n✅ Complete!`);
  console.log(`   New Enrollments: ${totalEnrollments}`);
  console.log(`   New Reviews: ${totalReviews}`);
  
  const finalCourseCount = await prisma.course.count();
  const finalEnrollmentCount = await prisma.enrollment.count();
  const finalReviewCount = await prisma.review.count();
  
  console.log(`\n📊 Database Totals:`);
  console.log(`   Courses: ${finalCourseCount}`);
  console.log(`   Enrollments: ${finalEnrollmentCount}`);
  console.log(`   Reviews: ${finalReviewCount}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

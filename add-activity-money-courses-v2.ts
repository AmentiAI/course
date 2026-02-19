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
  { rating: 4, text: "Solid {topic} course with actionable steps. Already making progress!" },
  { rating: 5, text: "This {topic} content is a game-changer. Totally exceeded expectations." },
  { rating: 5, text: "Perfect mix of theory and practice for {topic}. Highly recommend!" },
  { rating: 4, text: "Good {topic} course. Could use more examples but the core content is excellent." },
  { rating: 5, text: "Absolutely worth it! The {topic} knowledge here is invaluable." }
];

const MONEY_COURSE_SLUGS = [
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
  console.log("👥 Adding enrollments and reviews to 50 money-making courses...\n");
  
  const allStudents = await prisma.user.findMany({ where: { role: 'STUDENT' } });
  console.log(`Found ${allStudents.length} students in database\n`);
  
  const startDate = new Date('2026-01-01');
  const endDate = new Date('2026-02-19');
  
  let totalEnrollments = 0;
  let totalReviews = 0;
  let processedCourses = 0;
  
  for (const slug of MONEY_COURSE_SLUGS) {
    const course = await prisma.course.findUnique({ where: { slug } });
    if (!course) {
      console.log(`  ⊘ Course not found: ${slug}`);
      continue;
    }
    
    // Check existing enrollments
    const existingEnrollments = await prisma.enrollment.findMany({
      where: { courseId: course.id },
      select: { userId: true }
    });
    const existingUserIds = new Set(existingEnrollments.map(e => e.userId));
    
    // Filter out students who are already enrolled
    const availableStudents = allStudents.filter(s => !existingUserIds.has(s.id));
    
    // Target: 20-1000 enrollments per course
    const targetEnrollments = Math.floor(Math.random() * 981) + 20;
    const enrollmentsToAdd = Math.min(targetEnrollments - existingEnrollments.length, availableStudents.length);
    
    if (enrollmentsToAdd > 0) {
      // Shuffle and select students
      const shuffled = [...availableStudents].sort(() => Math.random() - 0.5);
      const selectedStudents = shuffled.slice(0, enrollmentsToAdd);
      
      // Add enrollments
      for (const student of selectedStudents) {
        try {
          await prisma.enrollment.create({
            data: {
              userId: student.id,
              courseId: course.id,
              enrolledAt: randomDate(startDate, endDate),
              progress: Math.floor(Math.random() * 100)
            }
          });
          totalEnrollments++;
        } catch (error) {
          // Skip duplicates silently
        }
      }
      
      // Add 5-20 reviews from enrolled students
      const allEnrolledUsers = [...existingEnrollments.map(e => allStudents.find(s => s.id === e.userId)), ...selectedStudents]
        .filter(s => s != null);
      
      // Check existing reviews
      const existingReviews = await prisma.review.findMany({
        where: { courseId: course.id },
        select: { userId: true }
      });
      const existingReviewUserIds = new Set(existingReviews.map(r => r.userId));
      
      const reviewersAvailable = allEnrolledUsers.filter(s => !existingReviewUserIds.has(s.id));
      const targetReviews = Math.floor(Math.random() * 16) + 5;
      const reviewsToAdd = Math.min(targetReviews - existingReviews.length, reviewersAvailable.length);
      
      const reviewers = reviewersAvailable.slice(0, reviewsToAdd);
      
      for (const reviewer of reviewers) {
        try {
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
        } catch (error) {
          // Skip duplicates silently
        }
      }
      
      const finalEnrollments = existingEnrollments.length + enrollmentsToAdd;
      const finalReviews = existingReviews.length + reviewsToAdd;
      console.log(`  ✓ ${course.title}: ${finalEnrollments} total enrollments (+${enrollmentsToAdd}), ${finalReviews} total reviews (+${reviewsToAdd})`);
    } else {
      console.log(`  ⊘ ${course.title}: Already has max enrollments`);
    }
    
    processedCourses++;
  }
  
  console.log(`\n✅ Activity complete!`);
  console.log(`   Courses Processed: ${processedCourses}/50`);
  console.log(`   New Enrollments Added: ${totalEnrollments}`);
  console.log(`   New Reviews Added: ${totalReviews}`);
  
  const finalCourseCount = await prisma.course.count();
  const finalEnrollmentCount = await prisma.enrollment.count();
  const finalReviewCount = await prisma.review.count();
  
  console.log(`\n📊 Database Totals:`);
  console.log(`   Total Courses: ${finalCourseCount}`);
  console.log(`   Total Enrollments: ${finalEnrollmentCount}`);
  console.log(`   Total Reviews: ${finalReviewCount}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

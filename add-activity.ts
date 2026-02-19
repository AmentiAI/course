import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_g8SvCD9MhLip@ep-green-mountain-ainx1go9-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require",
  ssl: { rejectUnauthorized: false },
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as any);

// Helper to generate random date between Jan 1, 2026 and Feb 19, 2026
function randomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const FIRST_NAMES = [
  "Alex", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Jamie", "Avery", "Cameron", "Drew",
  "Peyton", "Quinn", "Reese", "Skyler", "Parker", "Hayden", "Rowan", "Sage", "River", "Phoenix",
  "Dakota", "Harper", "Kendall", "Logan", "Blake", "Charlie", "Finley", "Kai", "Emerson", "Blake",
  "Sydney", "Ryan", "Dylan", "Jesse", "Alexis", "Bailey", "Devon", "Eden", "Ellis", "Frankie",
  "Gray", "Harley", "Indigo", "Justice", "Kelly", "Lane", "Marley", "Nico", "Ocean", "Payton"
];

const LAST_NAMES = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
  "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
  "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson",
  "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores",
  "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts"
];

const REVIEW_TEMPLATES = [
  { rating: 5, text: "Absolutely incredible course! {topic} was explained perfectly. Already seeing results!" },
  { rating: 5, text: "Best {topic} course I've taken. The instructor knows their stuff and explains complex concepts clearly." },
  { rating: 4, text: "Really solid course on {topic}. A few sections could be more detailed but overall very valuable." },
  { rating: 5, text: "This course changed my perspective on {topic}. Highly recommend to anyone serious about learning this." },
  { rating: 4, text: "Great content on {topic}. Well structured and easy to follow. Worth every penny." },
  { rating: 5, text: "Finally a course that teaches {topic} in a practical, actionable way. No fluff, just results." },
  { rating: 5, text: "Exceeded my expectations. The {topic} strategies actually work - I'm already making progress!" },
  { rating: 4, text: "Very comprehensive coverage of {topic}. Some lessons are longer than needed but good overall." },
  { rating: 5, text: "If you're serious about {topic}, this is the course to take. Clear, concise, and effective." },
  { rating: 5, text: "The best investment I've made in my education. {topic} finally makes sense to me now." },
  { rating: 4, text: "Solid course. The {topic} fundamentals are well taught. Would have liked more advanced examples." },
  { rating: 5, text: "Mind-blowing! I learned more about {topic} in this course than in months of YouTube tutorials." },
  { rating: 5, text: "Perfect for beginners and intermediates. The {topic} breakdown is crystal clear." },
  { rating: 4, text: "Good quality content. The {topic} section was particularly helpful. Minor audio issues in one module." },
  { rating: 5, text: "10/10 would recommend. This {topic} course is comprehensive and up-to-date." },
  { rating: 5, text: "Instructor clearly knows {topic} inside and out. Real-world examples make it easy to apply." },
  { rating: 4, text: "Great course on {topic}. Only complaint is I wish it was longer - wanted more content!" },
  { rating: 5, text: "Worth every cent. My {topic} skills improved dramatically after completing this course." },
  { rating: 5, text: "This course demystified {topic} for me. Now I feel confident implementing these strategies." },
  { rating: 4, text: "Excellent teaching style. The {topic} concepts are broken down into digestible chunks." }
];

async function main() {
  console.log("👥 Creating 50 student users...\n");
  
  const students = [];
  for (let i = 0; i < 50; i++) {
    const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 999)}@example.com`;
    
    const user = await prisma.user.create({
      data: {
        name: `${firstName} ${lastName}`,
        email,
        password: await bcrypt.hash("student123", 10),
        role: "STUDENT"
      }
    });
    students.push(user);
    if ((i + 1) % 10 === 0) console.log(`  Created ${i + 1}/50 users...`);
  }
  
  console.log(`\n✅ Created ${students.length} students\n`);
  
  const courses = await prisma.course.findMany();
  console.log(`📚 Found ${courses.length} courses\n`);
  
  const startDate = new Date('2026-01-01');
  const endDate = new Date('2026-02-19');
  
  console.log("📝 Creating enrollments (20-1000 per course)...\n");
  
  let totalEnrollments = 0;
  let totalReviews = 0;
  
  for (const course of courses) {
    // Random number of enrollments per course (20-1000)
    const enrollmentCount = Math.floor(Math.random() * 980) + 20;
    
    // Shuffle students and pick random subset
    const shuffled = [...students].sort(() => Math.random() - 0.5);
    const enrolled = shuffled.slice(0, Math.min(enrollmentCount, students.length));
    
    for (const student of enrolled) {
      const enrollDate = randomDate(startDate, endDate);
      
      await prisma.enrollment.create({
        data: {
          userId: student.id,
          courseId: course.id,
          enrolledAt: enrollDate,
          progress: Math.floor(Math.random() * 100)
        }
      });
      totalEnrollments++;
    }
    
    // Add 5-20 reviews per course from enrolled students
    const reviewCount = Math.floor(Math.random() * 16) + 5;
    const reviewers = enrolled.slice(0, reviewCount);
    
    for (const reviewer of reviewers) {
      const template = REVIEW_TEMPLATES[Math.floor(Math.random() * REVIEW_TEMPLATES.length)];
      const courseTopic = course.title.split(':')[0].split('|')[0].trim();
      const reviewText = template.text.replace('{topic}', courseTopic);
      const reviewDate = randomDate(startDate, endDate);
      
      await prisma.review.create({
        data: {
          userId: reviewer.id,
          courseId: course.id,
          rating: template.rating,
          comment: reviewText,
          createdAt: reviewDate
        }
      });
      totalReviews++;
    }
    
    console.log(`  ✓ ${course.title}: ${enrollmentCount} enrollments, ${reviewCount} reviews`);
  }
  
  console.log(`\n✅ Activity created!`);
  console.log(`   Total Enrollments: ${totalEnrollments}`);
  console.log(`   Total Reviews: ${totalReviews}`);
  console.log(`   Total Students: ${students.length}`);
  
  // Summary stats
  const avgEnrollment = Math.floor(totalEnrollments / courses.length);
  console.log(`\n📊 Stats:`);
  console.log(`   Avg Enrollments per Course: ${avgEnrollment}`);
  console.log(`   Avg Reviews per Course: ${Math.floor(totalReviews / courses.length)}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

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

const QUIZ_QUESTIONS = {
  creative: [
    { question: "What is the rule of thirds in composition?", options: ["Dividing image into 9 equal parts with gridlines", "Using 3 colors only", "Taking 3 shots of each scene", "Editing in 3 passes"], correctAnswer: 0, explanation: "The rule of thirds creates balanced, dynamic compositions by placing subjects at intersection points of a 3x3 grid." },
    { question: "Which file format preserves the most image quality?", options: ["JPEG", "PNG", "RAW", "GIF"], correctAnswer: 2, explanation: "RAW files contain unprocessed sensor data, preserving maximum quality and editing flexibility." },
    { question: "What does 'aperture' control in photography?", options: ["Shutter speed", "Light entering the lens", "Image color", "File size"], correctAnswer: 1, explanation: "Aperture is the opening in the lens that controls how much light hits the sensor, affecting exposure and depth of field." },
    { question: "What is 'white balance' in photography?", options: ["Brightness adjustment", "Color temperature correction", "Contrast setting", "Sharpness level"], correctAnswer: 1, explanation: "White balance adjusts colors to match the light source, ensuring whites appear white and colors look natural." }
  ],
  fitness: [
    { question: "What are the three macronutrients?", options: ["Protein, carbs, fats", "Vitamins, minerals, water", "Calories, fiber, sugar", "Sodium, potassium, iron"], correctAnswer: 0, explanation: "Protein, carbohydrates, and fats are the three macronutrients that provide energy and support bodily functions." },
    { question: "What is progressive overload?", options: ["Overtraining", "Gradually increasing workout difficulty", "Doing too many exercises", "Lifting maximum weight"], correctAnswer: 1, explanation: "Progressive overload means gradually increasing weight, reps, or intensity to continually challenge muscles and drive growth." },
    { question: "How much protein should most people consume per pound of body weight for muscle building?", options: ["0.3-0.5g", "0.8-1.2g", "2.0-3.0g", "4.0+ grams"], correctAnswer: 1, explanation: "Research suggests 0.8-1.2g of protein per pound of body weight is optimal for muscle building and recovery." },
    { question: "What is the best time to assess client progress?", options: ["Every workout", "Weekly", "Every 2-4 weeks", "Only at the end"], correctAnswer: 2, explanation: "Assessing every 2-4 weeks allows enough time for meaningful changes while staying accountable to goals." }
  ],
  design: [
    { question: "What does CMYK stand for?", options: ["Color, Magenta, Yellow, Key", "Cyan, Magenta, Yellow, Black", "Contrast, Mood, Yellow, Black", "Creative, Modern, Yellow, Key"], correctAnswer: 1, explanation: "CMYK (Cyan, Magenta, Yellow, Key/Black) is the color model used in printing." },
    { question: "What is kerning?", options: ["Image compression", "Space between letters", "Color blending", "Font weight"], correctAnswer: 1, explanation: "Kerning is adjusting the space between individual letter pairs for better visual balance." },
    { question: "Which design principle creates visual interest through differences?", options: ["Unity", "Contrast", "Repetition", "Proximity"], correctAnswer: 1, explanation: "Contrast creates visual interest by using opposing elements like light/dark, large/small, rough/smooth." },
    { question: "What is a 'color palette' in design?", options: ["Painting tool", "Selected set of colors for a project", "Design software", "RGB values"], correctAnswer: 1, explanation: "A color palette is a curated selection of colors that work harmoniously together in a design." }
  ],
  business: [
    { question: "What is A/B testing?", options: ["Testing two products", "Comparing two versions to see which performs better", "Alpha and beta testing", "Audience research"], correctAnswer: 1, explanation: "A/B testing compares two versions (A vs B) of something to determine which performs better based on data." },
    { question: "What does ROI stand for?", options: ["Return on Investment", "Rate of Income", "Revenue over Income", "Risk of Investment"], correctAnswer: 0, explanation: "ROI (Return on Investment) measures the profitability of an investment relative to its cost." },
    { question: "What is a 'conversion rate'?", options: ["Currency exchange", "Percentage of visitors who take desired action", "Sales growth rate", "Ad click percentage"], correctAnswer: 1, explanation: "Conversion rate is the percentage of visitors who complete a desired action (buy, sign up, download)." },
    { question: "What is 'organic traffic'?", options: ["Traffic from farms", "Unpaid search engine traffic", "Social media traffic", "Email traffic"], correctAnswer: 1, explanation: "Organic traffic comes from unpaid search engine results - people finding you through Google, Bing, etc." }
  ]
};

const REVIEW_TEMPLATES = [
  { rating: 5, text: "This {topic} course is outstanding! Clear, actionable, and I'm already seeing results." },
  { rating: 5, text: "Best {topic} course I've found. The instructor makes complex concepts easy to understand." },
  { rating: 4, text: "Really good {topic} training. A few sections could be more in-depth but overall excellent value." },
  { rating: 5, text: "Exactly what I needed to learn {topic}. Practical, well-structured, and engaging." },
  { rating: 4, text: "Solid {topic} course. Good mix of theory and practice. Would recommend." },
  { rating: 5, text: "This course transformed my {topic} skills. Worth every penny!" },
  { rating: 5, text: "Finally a {topic} course that doesn't waste time. Direct, practical, and effective." },
  { rating: 4, text: "Great {topic} content. Minor pacing issues but packed with value." },
  { rating: 5, text: "Best investment for learning {topic}. Clear explanations and real-world examples." },
  { rating: 5, text: "This {topic} course is comprehensive and beginner-friendly. Loved it!" }
];

async function main() {
  console.log("🎯 Adding quizzes to new courses...\n");
  
  const newCourseSlugs = [
    'photography-masterclass-complete',
    'graphic-design-figma-canva',
    'fitness-coach-certification',
    'music-production-ableton',
    'video-editing-premiere-pro',
    'excel-data-analysis-bootcamp',
    'public-speaking-presentations',
    'seo-mastery-2026-google',
    'creative-writing-novel-publishing',
    'ux-ui-design-certificate',
    'mobile-app-dev-ios-android',
    'remote-work-productivity',
    'interior-design-business',
    'google-ads-ppc-mastery',
    '3d-modeling-blender'
  ];
  
  for (const slug of newCourseSlugs) {
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
    
    // Determine quiz type
    let quizQuestions = QUIZ_QUESTIONS.business;
    if (course.category.includes('Creative') || course.category.includes('Arts') || course.category.includes('Photography') || course.category.includes('3D')) {
      quizQuestions = QUIZ_QUESTIONS.creative;
    } else if (course.category.includes('Fitness') || course.category.includes('Health')) {
      quizQuestions = QUIZ_QUESTIONS.fitness;
    } else if (course.category.includes('Design')) {
      quizQuestions = QUIZ_QUESTIONS.design;
    }
    
    for (const module of course.modules) {
      const lastLesson = module.lessons[module.lessons.length - 1];
      if (lastLesson && !lastLesson.quiz) {
        await prisma.quiz.create({
          data: {
            lessonId: lastLesson.id,
            questions: quizQuestions
          }
        });
        console.log(`  ✓ ${course.title} - Added quiz`);
      }
    }
  }
  
  console.log("\n👥 Adding enrollments and reviews to new courses...\n");
  
  const students = await prisma.user.findMany({ where: { role: 'STUDENT' } });
  const startDate = new Date('2026-01-01');
  const endDate = new Date('2026-02-19');
  
  let totalEnrollments = 0;
  let totalReviews = 0;
  
  for (const slug of newCourseSlugs) {
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

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_g8SvCD9MhLip@ep-green-mountain-ainx1go9-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require",
  ssl: { rejectUnauthorized: false },
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as any);

const NEW_COURSES = [
  {
    title: "Complete Photography Masterclass",
    slug: "photography-masterclass-complete",
    shortDesc: "Master DSLR/mirrorless photography: composition, lighting, editing. From beginner to pro photographer.",
    description: `Learn professional photography from the ground up. Master your camera settings, composition rules, lighting techniques, and Adobe Lightroom editing to create stunning images.

**What You'll Learn:**
- Camera fundamentals (aperture, shutter speed, ISO)
- Composition techniques that create compelling images
- Natural light and flash photography
- Portrait, landscape, and street photography
- Complete Adobe Lightroom workflow
- Building a photography business`,
    thumbnail: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1920&q=80",
    price: 89,
    originalPrice: 199,
    category: "Creative Arts",
    level: "BEGINNER",
    tags: ["Photography", "DSLR", "Lightroom", "Creative", "Visual Arts"],
    isFeatured: true,
    totalHours: 12,
    totalLessons: 4
  },
  {
    title: "Graphic Design with Figma & Canva",
    slug: "graphic-design-figma-canva",
    shortDesc: "Create professional designs for social media, websites, and brands. No experience needed.",
    description: `Become a graphic designer using free tools. Master Figma and Canva to create logos, social media graphics, presentations, and complete brand identities.

**Course Includes:**
- Design fundamentals (color theory, typography, layout)
- Figma advanced techniques
- Canva pro workflows
- Logo design process
- Social media templates
- Building a design portfolio`,
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1920&q=80",
    price: 59,
    originalPrice: 129,
    category: "Design",
    level: "BEGINNER",
    tags: ["Graphic Design", "Figma", "Canva", "Branding", "Visual Design"],
    isFeatured: false,
    totalHours: 8,
    totalLessons: 4
  },
  {
    title: "Fitness Coach Certification Online",
    slug: "fitness-coach-certification",
    shortDesc: "Become a certified personal trainer. Program design, nutrition, client management. Launch your fitness business.",
    description: `Complete fitness coaching certification course. Learn exercise science, nutrition fundamentals, program design, and how to build a thriving online or in-person training business.

**Certification Covers:**
- Exercise physiology and biomechanics
- Nutrition and meal planning
- Program design for different goals
- Client assessment and onboarding
- Online coaching business model
- Marketing your fitness services`,
    thumbnail: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80",
    price: 149,
    originalPrice: 299,
    category: "Health & Fitness",
    level: "INTERMEDIATE",
    tags: ["Fitness", "Personal Training", "Nutrition", "Coaching", "Health"],
    isFeatured: true,
    totalHours: 15,
    totalLessons: 4
  },
  {
    title: "Music Production in Ableton Live",
    slug: "music-production-ableton",
    shortDesc: "Produce professional music tracks from scratch. Electronic, hip-hop, pop production techniques.",
    description: `Learn to produce, mix, and master music in Ableton Live. From beat-making to final mastering, create professional-quality tracks in any genre.

**You'll Master:**
- Ableton Live interface and workflow
- Drum programming and sampling
- Synthesizer sound design
- Arrangement and song structure
- Mixing techniques
- Mastering fundamentals`,
    thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1920&q=80",
    price: 119,
    originalPrice: 249,
    category: "Music & Audio",
    level: "INTERMEDIATE",
    tags: ["Music Production", "Ableton", "Beat Making", "Audio Engineering"],
    isFeatured: false,
    totalHours: 14,
    totalLessons: 4
  },
  {
    title: "Video Editing Mastery: Premiere Pro",
    slug: "video-editing-premiere-pro",
    shortDesc: "Edit professional videos for YouTube, social media, and clients. Adobe Premiere Pro complete guide.",
    description: `Master Adobe Premiere Pro and become a professional video editor. Learn cutting, color grading, effects, audio mixing, and exporting for different platforms.

**Complete Training:**
- Premiere Pro workspace and tools
- Advanced cutting techniques
- Color grading workflows
- Motion graphics and effects
- Audio editing and mixing
- Export settings for every platform`,
    thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=1920&q=80",
    price: 99,
    originalPrice: 199,
    category: "Video Production",
    level: "INTERMEDIATE",
    tags: ["Video Editing", "Premiere Pro", "Post Production", "YouTube"],
    isFeatured: true,
    totalHours: 11,
    totalLessons: 4
  },
  {
    title: "Excel & Data Analysis Bootcamp",
    slug: "excel-data-analysis-bootcamp",
    shortDesc: "Master Excel, pivot tables, formulas, VBA automation, and data visualization. Career-boosting skills.",
    description: `Become an Excel power user. From basic formulas to advanced automation with VBA, learn the skills employers actually need.

**Skills You'll Gain:**
- Advanced formulas and functions
- Pivot tables and data analysis
- Power Query for data cleaning
- Dashboard creation
- VBA automation basics
- Data visualization best practices`,
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80",
    price: 79,
    originalPrice: 159,
    category: "Business & Data",
    level: "INTERMEDIATE",
    tags: ["Excel", "Data Analysis", "Spreadsheets", "Business Intelligence"],
    isFeatured: false,
    totalHours: 10,
    totalLessons: 4
  },
  {
    title: "Public Speaking & Presentations",
    slug: "public-speaking-presentations",
    shortDesc: "Overcome fear, deliver confident presentations, and become a compelling speaker. TEDx techniques included.",
    description: `Transform your public speaking from nervous to natural. Learn the techniques used by TED speakers to captivate audiences and deliver memorable presentations.

**Master the Art of:**
- Overcoming stage fright
- Structuring compelling narratives
- Body language and vocal technique
- Slide design that enhances (not distracts)
- Handling Q&A sessions
- Virtual presentation skills`,
    thumbnail: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1920&q=80",
    price: 69,
    originalPrice: 139,
    category: "Career Development",
    level: "BEGINNER",
    tags: ["Public Speaking", "Presentations", "Communication", "Confidence"],
    isFeatured: false,
    totalHours: 7,
    totalLessons: 4
  },
  {
    title: "SEO Mastery 2026: Rank #1 on Google",
    slug: "seo-mastery-2026-google",
    shortDesc: "Complete SEO course: keyword research, on-page, link building, technical SEO. Rank your website.",
    description: `Learn modern SEO strategies that actually work in 2026. From keyword research to technical optimization, master every aspect of search engine optimization.

**Complete SEO Training:**
- Keyword research with real tools
- On-page optimization techniques
- Content strategy for SEO
- Link building that works
- Technical SEO fundamentals
- Local SEO for businesses`,
    thumbnail: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80",
    price: 89,
    originalPrice: 179,
    category: "Digital Marketing",
    level: "INTERMEDIATE",
    tags: ["SEO", "Google", "Content Marketing", "Website Traffic"],
    isFeatured: true,
    totalHours: 9,
    totalLessons: 4
  },
  {
    title: "Creative Writing: Publish Your Novel",
    slug: "creative-writing-novel-publishing",
    shortDesc: "Write, edit, and publish your first novel. Story structure, character development, self-publishing guide.",
    description: `Turn your book idea into a published novel. Learn storytelling techniques, editing strategies, and the complete self-publishing process on Amazon KDP.

**From Idea to Published:**
- Story structure and plotting
- Character development
- Writing compelling dialogue
- Self-editing techniques
- Amazon KDP publishing
- Book marketing basics`,
    thumbnail: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=1920&q=80",
    price: 49,
    originalPrice: 99,
    category: "Writing & Publishing",
    level: "BEGINNER",
    tags: ["Creative Writing", "Novel", "Publishing", "Storytelling", "Author"],
    isFeatured: false,
    totalHours: 8,
    totalLessons: 4
  },
  {
    title: "UX/UI Design Professional Certificate",
    slug: "ux-ui-design-certificate",
    shortDesc: "User research, wireframing, prototyping in Figma. Build a portfolio and land UX jobs.",
    description: `Complete UX/UI design certification course. Learn user research, information architecture, wireframing, prototyping, and build a professional portfolio.

**Professional Training:**
- User research methods
- Information architecture
- Wireframing and prototyping
- Visual design principles
- Usability testing
- Portfolio building`,
    thumbnail: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1920&q=80",
    price: 129,
    originalPrice: 259,
    category: "Design",
    level: "INTERMEDIATE",
    tags: ["UX Design", "UI Design", "Figma", "Product Design", "User Research"],
    isFeatured: true,
    totalHours: 13,
    totalLessons: 4
  },
  {
    title: "Mobile App Development: iOS & Android",
    slug: "mobile-app-dev-ios-android",
    shortDesc: "Build real mobile apps with React Native. Deploy to App Store and Google Play.",
    description: `Learn mobile app development with React Native. Build cross-platform apps for iOS and Android from a single codebase and publish to both app stores.

**Build Real Apps:**
- React Native fundamentals
- Navigation and state management
- API integration
- Native device features
- App Store deployment
- Monetization strategies`,
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1920&q=80",
    price: 139,
    originalPrice: 279,
    category: "App Development",
    level: "ADVANCED",
    tags: ["Mobile Development", "React Native", "iOS", "Android", "App Store"],
    isFeatured: false,
    totalHours: 16,
    totalLessons: 4
  },
  {
    title: "Remote Work Productivity System",
    slug: "remote-work-productivity",
    shortDesc: "Maximize productivity working from home. Time management, focus techniques, work-life balance.",
    description: `Master remote work with proven productivity systems. Learn time management, focus techniques, and tools to thrive while working from home.

**Become a Remote Work Pro:**
- Pomodoro and time-blocking
- Focus and deep work strategies
- Remote collaboration tools
- Work-life balance techniques
- Home office setup
- Async communication mastery`,
    thumbnail: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&q=80",
    price: 39,
    originalPrice: 79,
    category: "Productivity",
    level: "BEGINNER",
    tags: ["Remote Work", "Productivity", "Time Management", "Work From Home"],
    isFeatured: false,
    totalHours: 5,
    totalLessons: 4
  },
  {
    title: "Interior Design Business Blueprint",
    slug: "interior-design-business",
    shortDesc: "Start your interior design business. Client acquisition, project management, pricing strategies.",
    description: `Launch a profitable interior design business. Learn how to find clients, manage projects, price your services, and build a brand in the interior design industry.

**Business Launch Training:**
- Finding your design niche
- Client acquisition strategies
- Project workflow and management
- Pricing and proposals
- Sourcing and vendor relationships
- Building your portfolio`,
    thumbnail: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1618221381711-42ca8ab6e908?w=1920&q=80",
    price: 99,
    originalPrice: 199,
    category: "Creative Business",
    level: "BEGINNER",
    tags: ["Interior Design", "Design Business", "Home Decor", "Freelancing"],
    isFeatured: false,
    totalHours: 9,
    totalLessons: 4
  },
  {
    title: "Google Ads & PPC Mastery",
    slug: "google-ads-ppc-mastery",
    shortDesc: "Master Google Ads, Facebook Ads, and paid advertising. Drive sales with profitable ad campaigns.",
    description: `Become a PPC expert. Learn to create, optimize, and scale Google Ads and Facebook Ads campaigns that actually drive ROI.

**Paid Advertising Mastery:**
- Google Ads campaign structure
- Keyword research for PPC
- Ad copywriting that converts
- Facebook Ads targeting
- Campaign optimization
- ROI tracking and analytics`,
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80",
    price: 109,
    originalPrice: 219,
    category: "Digital Advertising",
    level: "INTERMEDIATE",
    tags: ["Google Ads", "PPC", "Facebook Ads", "Paid Traffic", "Advertising"],
    isFeatured: true,
    totalHours: 11,
    totalLessons: 4
  },
  {
    title: "3D Modeling with Blender: Beginner to Pro",
    slug: "3d-modeling-blender",
    shortDesc: "Create 3D models, animations, and renders in Blender. From basics to professional portfolio pieces.",
    description: `Master Blender 3D from zero to professional. Learn modeling, texturing, lighting, animation, and rendering to create stunning 3D art and animations.

**Complete 3D Training:**
- Blender interface and navigation
- Hard surface and organic modeling
- UV mapping and texturing
- Lighting and materials
- Animation basics
- Rendering techniques`,
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=80",
    price: 79,
    originalPrice: 159,
    category: "3D & Animation",
    level: "BEGINNER",
    tags: ["3D Modeling", "Blender", "Animation", "3D Art", "Rendering"],
    isFeatured: false,
    totalHours: 12,
    totalLessons: 4
  }
];

async function main() {
  console.log("📚 Creating 15 new non-crypto courses...\n");
  
  let created = 0;
  let skipped = 0;
  
  for (const courseData of NEW_COURSES) {
    const existing = await prisma.course.findUnique({ where: { slug: courseData.slug } });
    
    if (!existing) {
      await prisma.course.create({
        data: {
          ...courseData,
          isPublished: true
        }
      });
      console.log(`✅ ${courseData.title} (${courseData.level}, $${courseData.price})`);
      created++;
    } else {
      console.log(`⊘ Skipped (exists): ${courseData.title}`);
      skipped++;
    }
  }
  
  console.log(`\n✅ Done!`);
  console.log(`   Created: ${created} courses`);
  console.log(`   Skipped: ${skipped} courses`);
  
  const totalCourses = await prisma.course.count();
  console.log(`\n📊 Total Courses: ${totalCourses}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_g8SvCD9MhLip@ep-green-mountain-ainx1go9-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require",
  ssl: { rejectUnauthorized: false },
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  console.log("📊 Checking existing courses...\n");
  const courses = await prisma.course.findMany({ select: { slug: true, title: true } });
  console.log(`Found ${courses.length} courses:\n`);
  courses.forEach(c => console.log(`  - ${c.slug}`));
  
  console.log("\n🎨 Adding banners to all existing courses...\n");
  
  // Generic banner assignments
  const bannerMap: Record<string, string> = {
    "nft": "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1920&q=80",
    "bitcoin": "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=1920&q=80",
    "crypto": "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=1920&q=80",
    "solana": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1920&q=80",
    "ai": "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1920&q=80",
    "trading": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80",
    "web": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920&q=80",
    "business": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80",
    "social": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1920&q=80",
    "ecommerce": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=80",
    "marketing": "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=1920&q=80",
    "freelance": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80"
  };
  
  for (const course of courses) {
    // Find matching banner based on slug keywords
    let banner = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&q=80"; // default
    for (const [keyword, url] of Object.entries(bannerMap)) {
      if (course.slug.includes(keyword)) {
        banner = url;
        break;
      }
    }
    
    await prisma.course.update({
      where: { slug: course.slug },
      data: { banner }
    });
    console.log(`✓ ${course.title}`);
  }
  
  console.log("\n✅ All courses updated with banners!");
  console.log(`\n📚 Total courses: ${courses.length}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

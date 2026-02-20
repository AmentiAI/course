const fs = require('fs');

const courses = [
  // Web3 & Crypto (10)
  { title: "NFT Flipping Masterclass", slug: "nft-flipping-masterclass", desc: "Learn to spot undervalued NFTs execute floor sweeps and build a consistent flipping system", category: "Web3 & Crypto", level: "BEGINNER", hours: 6, price: 49, original: 129, featured: true, tags: ["NFT", "Web3", "Trading"] },
  { title: "Bitcoin Ordinals Mastery", slug: "bitcoin-ordinals", desc: "Master Bitcoin Ordinals and inscriptions Learn to mint trade and build on Bitcoin", category: "Web3 & Crypto", level: "ADVANCED", hours: 10, price: 149, original: 349, featured: true, tags: ["Bitcoin", "Ordinals", "NFT"] },
  { title: "Solana DeFi Trading", slug: "solana-defi-mastery", desc: "Master DeFi on Solana Learn yield farming liquidity providing and advanced strategies", category: "Web3 & Crypto", level: "ADVANCED", hours: 11, price: 139, original: 329, featured: false, tags: ["Solana", "DeFi", "Trading"] },
  { title: "Crypto Day Trading", slug: "crypto-day-trading", desc: "Learn professional crypto day trading strategies Master technical analysis and execution", category: "Web3 & Crypto", level: "ADVANCED", hours: 12, price: 159, original: 379, featured: true, tags: ["Trading", "Crypto", "Technical Analysis"] },
  { title: "Blockchain Development with Solidity", slug: "blockchain-development-solidity", desc: "Become a blockchain developer Learn Solidity smart contracts and build dApps", category: "Web3 & Crypto", level: "ADVANCED", hours: 14, price: 149, original: 349, featured: false, tags: ["Blockchain", "Solidity", "Smart Contracts"] },
  { title: "Web3 Freelancing", slug: "web3-freelancing", desc: "Land high-paying Web3 freelance gigs Get paid in crypto and work with DAOs", category: "Web3 & Crypto", level: "INTERMEDIATE", hours: 8, price: 89, original: 199, featured: false, tags: ["Web3", "Freelancing", "Crypto"] },
  { title: "Cryptocurrency Fundamentals", slug: "crypto-fundamentals", desc: "Master cryptocurrency basics blockchain technology and digital asset investing", category: "Web3 & Crypto", level: "BEGINNER", hours: 5, price: 39, original: 99, featured: false, tags: ["Crypto", "Blockchain", "Investing"] },
  { title: "DeFi Yield Farming Strategies", slug: "defi-yield-farming", desc: "Maximize returns with advanced DeFi yield farming and liquidity strategies", category: "Web3 & Crypto", level: "INTERMEDIATE", hours: 9, price: 99, original: 229, featured: true, tags: ["DeFi", "Yield Farming", "Crypto"] },
  { title: "NFT Collection Launch Guide", slug: "nft-collection-launch", desc: "Launch your own NFT collection From art creation to smart contracts to marketing", category: "Web3 & Crypto", level: "INTERMEDIATE", hours: 10, price: 119, original: 279, featured: false, tags: ["NFT", "Launch", "Marketing"] },
  { title: "Smart Contract Auditing", slug: "smart-contract-auditing", desc: "Learn to audit and secure smart contracts Professional security analysis skills", category: "Web3 & Crypto", level: "ADVANCED", hours: 12, price: 169, original: 399, featured: true, tags: ["Smart Contracts", "Security", "Auditing"] },

  // Social Media & Marketing (15)
  { title: "Twitter/X Growth Hacking 2026", slug: "twitter-x-growth-2026", desc: "Build a Twitter following from 0 to 10K+ using proven engagement tactics", category: "Marketing & Social", level: "BEGINNER", hours: 5, price: 39, original: 99, featured: false, tags: ["Twitter", "Social Media", "Growth"] },
  { title: "Instagram Growth & Monetization", slug: "instagram-growth-monetization-2026", desc: "Grow Instagram to 10K+ and monetize through brand deals and digital products", category: "Marketing & Social", level: "BEGINNER", hours: 6, price: 49, original: 119, featured: true, tags: ["Instagram", "Monetization", "Social Media"] },
  { title: "TikTok Viral Content Mastery", slug: "tiktok-viral-content", desc: "Create viral TikTok content and build a massive engaged following fast", category: "Marketing & Social", level: "BEGINNER", hours: 5, price: 39, original: 99, featured: false, tags: ["TikTok", "Viral", "Content"] },
  { title: "YouTube Shorts Monetization", slug: "youtube-shorts-monetization", desc: "Monetize YouTube Shorts with views sponsorships and affiliate income", category: "Marketing & Social", level: "INTERMEDIATE", hours: 7, price: 69, original: 159, featured: true, tags: ["YouTube", "Shorts", "Monetization"] },
  { title: "LinkedIn Personal Branding", slug: "personal-branding-linkedin", desc: "Build authority on LinkedIn and attract career opportunities through content", category: "Marketing & Social", level: "BEGINNER", hours: 5, price: 39, original: 99, featured: true, tags: ["LinkedIn", "Personal Brand", "Career"] },
  { title: "Facebook Ads Mastery 2026", slug: "facebook-ads-mastery", desc: "Run profitable Facebook and Instagram ad campaigns with proven strategies", category: "Marketing & Social", level: "INTERMEDIATE", hours: 8, price: 89, original: 199, featured: false, tags: ["Facebook Ads", "Advertising", "Marketing"] },
  { title: "Google Ads for Beginners", slug: "google-ads-beginners", desc: "Master Google Ads from search campaigns to shopping ads and remarketing", category: "Marketing & Social", level: "BEGINNER", hours: 6, price: 59, original: 139, featured: false, tags: ["Google Ads", "PPC", "Marketing"] },
  { title: "SEO Fundamentals 2026", slug: "seo-fundamentals-2026", desc: "Rank on Google with modern SEO strategies keyword research and link building", category: "Marketing & Social", level: "BEGINNER", hours: 7, price: 49, original: 119, featured: true, tags: ["SEO", "Google", "Marketing"] },
  { title: "Email Marketing Automation", slug: "email-marketing-automation", desc: "Build automated email sequences that convert subscribers into customers", category: "Marketing & Social", level: "INTERMEDIATE", hours: 6, price: 79, original: 189, featured: false, tags: ["Email Marketing", "Automation", "Conversion"] },
  { title: "Content Marketing Strategy", slug: "content-marketing-strategy", desc: "Create and distribute valuable content that attracts and converts customers", category: "Marketing & Social", level: "INTERMEDIATE", hours: 8, price: 89, original: 199, featured: true, tags: ["Content Marketing", "Strategy", "Growth"] },
  { title: "Influencer Marketing Campaigns", slug: "influencer-marketing", desc: "Partner with influencers to drive brand awareness and sales effectively", category: "Marketing & Social", level: "INTERMEDIATE", hours: 7, price: 79, original: 179, featured: false, tags: ["Influencer", "Marketing", "Campaigns"] },
  { title: "Pinterest Marketing for Business", slug: "pinterest-marketing", desc: "Drive traffic and sales with Pinterest marketing strategies and visual content", category: "Marketing & Social", level: "BEGINNER", hours: 5, price: 49, original: 109, featured: false, tags: ["Pinterest", "Marketing", "Traffic"] },
  { title: "Snapchat Ads and Marketing", slug: "snapchat-marketing", desc: "Reach younger audiences with Snapchat ads and creative marketing campaigns", category: "Marketing & Social", level: "INTERMEDIATE", hours: 6, price: 69, original: 149, featured: false, tags: ["Snapchat", "Ads", "Marketing"] },
  { title: "Podcast Marketing and Growth", slug: "podcast-marketing", desc: "Grow your podcast audience and monetize through sponsorships and products", category: "Marketing & Social", level: "INTERMEDIATE", hours: 7, price: 79, original: 169, featured: false, tags: ["Podcast", "Marketing", "Growth"] },
  { title: "Affiliate Marketing Empire", slug: "affiliate-marketing-empire", desc: "Build passive income through affiliate marketing without creating products", category: "Marketing & Social", level: "INTERMEDIATE", hours: 9, price: 99, original: 229, featured: true, tags: ["Affiliate", "Passive Income", "Marketing"] },

  // E-Commerce & Business (15)
  { title: "Shopify Dropshipping 2026", slug: "dropshipping-mastery-2026", desc: "Build a profitable dropshipping business with product research and paid ads", category: "E-Commerce", level: "BEGINNER", hours: 8, price: 79, original: 199, featured: false, tags: ["Dropshipping", "Shopify", "E-Commerce"] },
  { title: "Amazon FBA Private Label", slug: "amazon-fba-private-label", desc: "Build an Amazon brand from scratch and scale to 10K+ per month", category: "E-Commerce", level: "INTERMEDIATE", hours: 9, price: 119, original: 279, featured: true, tags: ["Amazon FBA", "Private Label", "E-Commerce"] },
  { title: "Etsy Shop Empire", slug: "etsy-shop-empire", desc: "Build a profitable Etsy shop selling handmade vintage or digital products", category: "E-Commerce", level: "BEGINNER", hours: 6, price: 59, original: 139, featured: false, tags: ["Etsy", "Handmade", "E-Commerce"] },
  { title: "Print on Demand Business", slug: "print-on-demand-blueprint", desc: "Launch a print-on-demand business selling custom products without inventory", category: "E-Commerce", level: "INTERMEDIATE", hours: 7, price: 69, original: 159, featured: true, tags: ["Print on Demand", "POD", "E-Commerce"] },
  { title: "Amazon KDP Publishing", slug: "amazon-kdp-publishing", desc: "Publish and sell books on Amazon KDP and build passive royalty income", category: "E-Commerce", level: "BEGINNER", hours: 6, price: 49, original: 119, featured: false, tags: ["KDP", "Publishing", "Passive Income"] },
  { title: "eBay Reselling Profits", slug: "ebay-reselling", desc: "Find undervalued items and flip them for profit on eBay consistently", category: "E-Commerce", level: "BEGINNER", hours: 5, price: 39, original: 99, featured: false, tags: ["eBay", "Reselling", "Flipping"] },
  { title: "Wholesale Distribution Business", slug: "wholesale-distribution", desc: "Start a wholesale distribution business and work with retailers and brands", category: "E-Commerce", level: "INTERMEDIATE", hours: 10, price: 129, original: 299, featured: false, tags: ["Wholesale", "Distribution", "Business"] },
  { title: "Digital Products Empire", slug: "digital-products-create-launch-sell", desc: "Create and sell digital products like eBooks templates and courses online", category: "E-Commerce", level: "BEGINNER", hours: 7, price: 59, original: 149, featured: false, tags: ["Digital Products", "Passive Income", "Online"] },
  { title: "Subscription Box Business", slug: "subscription-box-business", desc: "Launch and scale a subscription box business with recurring revenue", category: "E-Commerce", level: "INTERMEDIATE", hours: 8, price: 99, original: 219, featured: false, tags: ["Subscription", "Recurring Revenue", "Business"] },
  { title: "WooCommerce Store Setup", slug: "woocommerce-ecommerce", desc: "Build a professional WooCommerce store on WordPress and start selling", category: "E-Commerce", level: "INTERMEDIATE", hours: 7, price: 79, original: 179, featured: false, tags: ["WooCommerce", "WordPress", "E-Commerce"] },
  { title: "Shopify App Development", slug: "shopify-app-development", desc: "Build and sell Shopify apps and earn recurring income from merchants", category: "E-Commerce", level: "ADVANCED", hours: 12, price: 149, original: 339, featured: false, tags: ["Shopify", "App Development", "SaaS"] },
  { title: "E-Commerce Email Funnels", slug: "ecommerce-email-funnels", desc: "Build automated email funnels that drive consistent e-commerce sales", category: "E-Commerce", level: "INTERMEDIATE", hours: 6, price: 69, original: 149, featured: false, tags: ["Email", "Funnels", "E-Commerce"] },
  { title: "Local Business Consulting", slug: "local-business-consulting", desc: "Start a consulting business helping local businesses grow and succeed", category: "Business", level: "INTERMEDIATE", hours: 8, price: 89, original: 199, featured: false, tags: ["Consulting", "Local Business", "Services"] },
  { title: "Business Plan Mastery", slug: "business-plan-mastery", desc: "Write compelling business plans that attract investors and secure funding", category: "Business", level: "BEGINNER", hours: 6, price: 49, original: 119, featured: false, tags: ["Business Plan", "Funding", "Startups"] },
  { title: "Virtual Assistant Business", slug: "virtual-assistant-business", desc: "Start a virtual assistant business and work remotely with global clients", category: "Business", level: "BEGINNER", hours: 5, price: 39, original: 89, featured: false, tags: ["Virtual Assistant", "Remote", "Services"] },

  // Tech & Development (12)
  { title: "Web Development Bootcamp", slug: "freelance-web-dev-bootcamp", desc: "Learn full-stack web development and land freelance clients fast", category: "Tech & Development", level: "INTERMEDIATE", hours: 10, price: 129, original: 299, featured: true, tags: ["Web Development", "Freelancing", "Coding"] },
  { title: "Python Automation Mastery", slug: "python-automation", desc: "Automate repetitive tasks and save hours every day with Python scripts", category: "Tech & Development", level: "INTERMEDIATE", hours: 9, price: 99, original: 229, featured: false, tags: ["Python", "Automation", "Coding"] },
  { title: "React & Next.js Development", slug: "react-nextjs-development", desc: "Build modern web applications with React and Next.js from scratch", category: "Tech & Development", level: "INTERMEDIATE", hours: 12, price: 139, original: 319, featured: true, tags: ["React", "Next.js", "Web Development"] },
  { title: "Mobile App Development", slug: "mobile-app-development", desc: "Build iOS and Android apps with React Native and launch on app stores", category: "Tech & Development", level: "INTERMEDIATE", hours: 14, price: 149, original: 349, featured: false, tags: ["Mobile", "Apps", "React Native"] },
  { title: "WordPress Development Pro", slug: "wordpress-development", desc: "Build custom WordPress themes and plugins and earn as a freelancer", category: "Tech & Development", level: "BEGINNER", hours: 8, price: 79, original: 179, featured: false, tags: ["WordPress", "Development", "PHP"] },
  { title: "Full Stack JavaScript", slug: "fullstack-javascript", desc: "Master full-stack JavaScript development with Node Express and MongoDB", category: "Tech & Development", level: "ADVANCED", hours: 16, price: 179, original: 399, featured: true, tags: ["JavaScript", "Full Stack", "Node.js"] },
  { title: "DevOps & Cloud Engineering", slug: "devops-cloud-engineering", desc: "Master DevOps practices AWS cloud and CI/CD pipelines for production", category: "Tech & Development", level: "ADVANCED", hours: 14, price: 159, original: 369, featured: false, tags: ["DevOps", "AWS", "Cloud"] },
  { title: "Data Science with Python", slug: "data-science-python", desc: "Analyze data build models and create insights with Python and libraries", category: "Tech & Development", level: "ADVANCED", hours: 15, price: 169, original: 389, featured: true, tags: ["Data Science", "Python", "Analytics"] },
  { title: "Cybersecurity Fundamentals", slug: "cybersecurity-fundamentals", desc: "Learn cybersecurity basics ethical hacking and how to protect systems", category: "Tech & Development", level: "INTERMEDIATE", hours: 10, price: 119, original: 269, featured: false, tags: ["Cybersecurity", "Hacking", "Security"] },
  { title: "SQL Database Mastery", slug: "sql-database-mastery", desc: "Master SQL databases queries and database design for applications", category: "Tech & Development", level: "BEGINNER", hours: 7, price: 69, original: 149, featured: false, tags: ["SQL", "Database", "Data"] },
  { title: "iOS App Development Swift", slug: "ios-app-development", desc: "Build native iOS apps with Swift and publish to the Apple App Store", category: "Tech & Development", level: "INTERMEDIATE", hours: 13, price: 139, original: 319, featured: false, tags: ["iOS", "Swift", "Mobile"] },
  { title: "Android App Development Kotlin", slug: "android-app-development", desc: "Build native Android apps with Kotlin and publish to Google Play Store", category: "Tech & Development", level: "INTERMEDIATE", hours: 13, price: 139, original: 319, featured: false, tags: ["Android", "Kotlin", "Mobile"] },

  // AI & Automation (8)
  { title: "AI Automation for Business", slug: "ai-automation-business", desc: "Automate business tasks with AI and save 10-20 hours per week", category: "Tech & AI", level: "INTERMEDIATE", hours: 9, price: 99, original: 229, featured: false, tags: ["AI", "Automation", "Business"] },
  { title: "ChatGPT Mastery & Prompts", slug: "prompt-engineering-mastery", desc: "Master ChatGPT prompt engineering for exceptional AI outputs", category: "Tech & AI", level: "INTERMEDIATE", hours: 7, price: 79, original: 179, featured: true, tags: ["ChatGPT", "AI", "Prompts"] },
  { title: "Midjourney AI Art Mastery", slug: "midjourney-ai-art", desc: "Create stunning AI art with Midjourney and monetize your creations", category: "Tech & AI", level: "BEGINNER", hours: 6, price: 59, original: 139, featured: false, tags: ["Midjourney", "AI Art", "Design"] },
  { title: "AI Content Creation", slug: "ai-content-creation", desc: "Create high-quality content faster using AI writing and generation tools", category: "Tech & AI", level: "BEGINNER", hours: 5, price: 49, original: 109, featured: false, tags: ["AI", "Content", "Writing"] },
  { title: "Machine Learning Basics", slug: "machine-learning-basics", desc: "Understand machine learning fundamentals and build your first ML models", category: "Tech & AI", level: "INTERMEDIATE", hours: 12, price: 129, original: 289, featured: true, tags: ["Machine Learning", "AI", "Python"] },
  { title: "AI Video Generation", slug: "ai-video-generation", desc: "Generate videos with AI tools like Runway Synthesia and Pictory", category: "Tech & AI", level: "INTERMEDIATE", hours: 7, price: 79, original: 169, featured: false, tags: ["AI", "Video", "Generation"] },
  { title: "Building AI Chatbots", slug: "building-ai-chatbots", desc: "Build intelligent chatbots for customer service and automation", category: "Tech & AI", level: "INTERMEDIATE", hours: 10, price: 119, original: 259, featured: false, tags: ["AI", "Chatbots", "Automation"] },
  { title: "AI Side Hustle Ideas", slug: "ai-side-hustle-ideas", desc: "Discover profitable side hustles powered by AI tools and automation", category: "Tech & AI", level: "BEGINNER", hours: 5, price: 39, original: 89, featured: true, tags: ["AI", "Side Hustle", "Income"] },

  // Finance & Investing (5)
  { title: "Stock Market Options Trading", slug: "stock-options-trading", desc: "Master advanced options trading strategies for consistent income", category: "Finance & Investing", level: "ADVANCED", hours: 12, price: 179, original: 399, featured: true, tags: ["Options", "Trading", "Stocks"] },
  { title: "Real Estate Investing 101", slug: "real-estate-investing", desc: "Start investing in real estate with rentals flips and wholesaling", category: "Finance & Investing", level: "BEGINNER", hours: 8, price: 89, original: 199, featured: false, tags: ["Real Estate", "Investing", "Property"] },
  { title: "Day Trading for Beginners", slug: "day-trading-beginners", desc: "Learn to day trade stocks with technical analysis and risk management", category: "Finance & Investing", level: "INTERMEDIATE", hours: 10, price: 129, original: 289, featured: true, tags: ["Day Trading", "Stocks", "Trading"] },
  { title: "Dividend Investing Strategy", slug: "dividend-investing", desc: "Build passive income through dividend stocks and long-term investing", category: "Finance & Investing", level: "BEGINNER", hours: 6, price: 59, original: 139, featured: false, tags: ["Dividends", "Investing", "Passive Income"] },
  { title: "Personal Finance Mastery", slug: "personal-finance-mastery", desc: "Take control of your money with budgeting saving and investing strategies", category: "Finance & Investing", level: "BEGINNER", hours: 5, price: 39, original: 89, featured: false, tags: ["Personal Finance", "Budgeting", "Money"] },

  // Productivity & Tools (5)
  { title: "Notion Productivity System", slug: "notion-productivity-system", desc: "Build a complete life operating system in Notion for maximum productivity", category: "Productivity & Tools", level: "BEGINNER", hours: 4, price: 29, original: 79, featured: false, tags: ["Notion", "Productivity", "Organization"] },
  { title: "Excel Advanced Formulas", slug: "excel-advanced-formulas", desc: "Master advanced Excel formulas PivotTables and data analysis techniques", category: "Productivity & Tools", level: "INTERMEDIATE", hours: 7, price: 69, original: 149, featured: false, tags: ["Excel", "Formulas", "Data"] },
  { title: "Time Management Mastery", slug: "time-management-mastery", desc: "Master time management techniques and multiply your productivity", category: "Productivity & Tools", level: "BEGINNER", hours: 4, price: 29, original: 69, featured: false, tags: ["Time Management", "Productivity", "Efficiency"] },
  { title: "Project Management PMP Prep", slug: "pmp-certification-prep", desc: "Prepare for PMP certification and master professional project management", category: "Productivity & Tools", level: "ADVANCED", hours: 20, price: 199, original: 449, featured: true, tags: ["PMP", "Project Management", "Certification"] },
  { title: "Airtable Business Systems", slug: "airtable-business-systems", desc: "Build powerful business systems and databases with Airtable no-code platform", category: "Productivity & Tools", level: "INTERMEDIATE", hours: 6, price: 59, original: 129, featured: false, tags: ["Airtable", "No-Code", "Systems"] },
];

// Map to banner images (Pexels - free, no API key needed, reliable CDN)
const categoryToImage = {
  "Web3 & Crypto": {
    banner: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop",
    thumb: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  "Marketing & Social": {
    banner: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop",
    thumb: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  "E-Commerce": {
    banner: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop",
    thumb: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  "Business": {
    banner: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop",
    thumb: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  "Tech & Development": {
    banner: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop",
    thumb: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  "Tech & AI": {
    banner: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop",
    thumb: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  "Finance & Investing": {
    banner: "https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop",
    thumb: "https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  "Productivity & Tools": {
    banner: "https://images.pexels.com/photos/7688465/pexels-photo-7688465.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop",
    thumb: "https://images.pexels.com/photos/7688465/pexels-photo-7688465.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
};

// Generate seed file content
const seedContent = `import { PrismaClient, Level } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as any);

// Comprehensive lesson content generator
const createLessonContent = (courseTitle: string, lessonTitle: string, focus: string): string => {
  return \`# \${lessonTitle}

Welcome to this comprehensive lesson on **\${focus}**. This session is a critical component of \${courseTitle}, designed to give you actionable insights and proven strategies.

## Why This Matters

Understanding \${focus} is essential for anyone serious about mastering this field. The landscape has evolved dramatically, and what worked even six months ago may not be as effective today. This lesson gives you current, battle-tested tactics that are producing results right now.

## Key Learning Objectives

By the end of this lesson, you'll be able to:

- Understand the core principles behind \${focus}
- Identify common mistakes and how to avoid them
- Implement proven frameworks and systems
- Apply real-world strategies to your specific situation
- Measure and track your progress effectively

## Core Concepts

\${focus} isn't just theory—it's about practical application. We'll break down complex concepts into simple, executable steps. You'll see real examples from successful practitioners, including specific numbers, metrics, and timelines.

### The Foundation

Every expert started where you are now. The difference between those who succeed and those who don't comes down to understanding these foundational principles. We'll cover:

1. **Strategic Framework**: The exact system top performers use
2. **Common Pitfalls**: Mistakes that waste time and money
3. **Optimization Techniques**: How to improve results systematically
4. **Scaling Strategies**: Taking good results and making them great

## Practical Application

Theory without application is useless. Throughout this lesson, you'll work through hands-on exercises designed to cement your understanding. Each exercise builds on the previous one, creating a complete system you can implement immediately.

### Real-World Examples

Let's look at three case studies from people who've successfully applied these exact strategies:

**Case Study 1**: Started from zero, applied these principles, achieved measurable results within 30 days.

**Case Study 2**: Struggled for months using outdated methods, switched to this approach, saw 10x improvement.

**Case Study 3**: Scaled from beginner to advanced using the frameworks taught in this course.

## Step-by-Step Implementation

Here's exactly what to do next:

1. Review the core concepts covered in this lesson
2. Complete the practical exercises (worksheet included)
3. Document your baseline metrics
4. Implement the strategies over the next 7 days
5. Track and measure your results
6. Iterate and optimize based on data

## Common Questions

**Q: How long will this take to show results?**  
A: Most students see initial results within 2-4 weeks of consistent application.

**Q: What if I don't have experience?**  
A: This lesson is designed for all levels. We start with fundamentals and build systematically.

**Q: Can I adapt this to my specific situation?**  
A: Absolutely. The frameworks are flexible and can be customized to your unique needs.

## What's Next

After completing this lesson:

- Download the resource pack and templates
- Join the community discussion (link in course dashboard)
- Move on to the next lesson when you've implemented these concepts
- Optional: Complete the quiz to test your understanding

## Your Action Plan

Don't just consume this content—implement it. Take these specific actions within the next 24 hours:

✓ Write down 3 key takeaways from this lesson  
✓ Identify 1 strategy you'll implement this week  
✓ Set up your tracking system  
✓ Schedule time blocks for implementation  

Remember: Knowledge without action is just entertainment. Let's make this count.

---

**Resources Mentioned:**
- Strategy Template (PDF)
- Implementation Checklist
- Tracking Spreadsheet
- Community Forum Link

**Estimated Implementation Time:** 2-3 hours  
**Recommended Review:** Weekly for first month

See you in the next lesson!
\`;
};

// Generate realistic modules and lessons based on course duration
const generateCourseStructure = (courseTitle: string, totalHours: number, slug: string) => {
  const modulesCount = Math.ceil(totalHours / 2.5); // ~2.5 hours per module
  const modules: any[] = [];
  
  const moduleTemplates = [
    { title: "Fundamentals and Getting Started", lessons: ["Introduction and Overview", "Core Concepts Explained", "Setting Up Your Foundation", "Essential Tools and Resources"] },
    { title: "Strategy and Planning", lessons: ["Strategic Framework", "Planning Your Approach", "Setting Realistic Goals", "Creating Your Roadmap"] },
    { title: "Implementation and Execution", lessons: ["Step-by-Step Implementation", "Practical Techniques", "Common Pitfalls to Avoid", "Quality Control"] },
    { title: "Optimization and Scaling", lessons: ["Analyzing Your Results", "Optimization Strategies", "Scaling Your Success", "Automation and Systems"] },
    { title: "Advanced Tactics", lessons: ["Expert-Level Strategies", "Advanced Case Studies", "Competitive Advantages", "Cutting-Edge Techniques"] },
    { title: "Monetization and Growth", lessons: ["Revenue Strategies", "Growth Hacking", "Scaling Revenue", "Long-Term Sustainability"] },
    { title: "Mastery and Beyond", lessons: ["Mastering the Craft", "Teaching and Mentoring", "Building Authority", "Next Steps"] },
  ];
  
  const totalMinutes = totalHours * 60;
  const targetLessonsCount = Math.floor(totalMinutes / 20); // ~20 min per lesson
  const lessonsPerModule = Math.ceil(targetLessonsCount / modulesCount);
  
  for (let i = 0; i < modulesCount; i++) {
    const template = moduleTemplates[i % moduleTemplates.length];
    const lessons: any[] = [];
    
    for (let j = 0; j < lessonsPerModule; j++) {
      const lessonTemplate = template.lessons[j % template.lessons.length];
      const isFirstLesson = i === 0 && j === 0;
      const duration = 15 + Math.floor(Math.random() * 20); // 15-35 minutes
      
      lessons.push({
        title: \`\${lessonTemplate} \${j > 3 ? \`(Part \${Math.floor(j / 4) + 1})\` : ''}\`.trim(),
        duration,
        order: j + 1,
        isFree: isFirstLesson,
        content: createLessonContent(courseTitle, lessonTemplate, \`\${lessonTemplate.toLowerCase()} for \${courseTitle}\`),
      });
    }
    
    modules.push({
      title: \`Module \${i + 1}: \${template.title}\`,
      order: i + 1,
      lessons: { create: lessons },
    });
  }
  
  return modules;
};

async function main() {
  console.log("🌱 Starting comprehensive database seed with ALL 70 COURSES...");

  // Clear existing data
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

  console.log("✅ Cleared existing data");

  // Create users
  const hashedPassword = await bcrypt.hash("password123", 10);

  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: "admin@skillmint.com",
        name: "Admin User",
        password: hashedPassword,
        role: "ADMIN",
      },
    }),
    prisma.user.create({
      data: {
        email: "instructor@skillmint.com",
        name: "Sarah Johnson",
        password: hashedPassword,
        role: "INSTRUCTOR",
        bio: "Experienced entrepreneur and online course creator with 10+ years in digital marketing.",
      },
    }),
    prisma.user.create({
      data: {
        email: "student@skillmint.com",
        name: "Alex Rivera",
        password: hashedPassword,
        role: "STUDENT",
      },
    }),
  ]);

  console.log(\`✅ Created \${users.length} users\`);

  // ALL 70 COURSES
  const coursesData = ${JSON.stringify(courses.map(c => ({
    title: c.title,
    slug: c.slug,
    shortDesc: c.desc,
    description: c.desc + ". Complete comprehensive training with real-world examples and actionable strategies.",
    thumbnail: categoryToImage[c.category].thumb,
    banner: categoryToImage[c.category].banner,
    price: c.price,
    originalPrice: c.original,
    category: c.category,
    level: c.level,
    tags: c.tags,
    isFeatured: c.featured,
    totalHours: c.hours,
  })), null, 2).replace(/"(https:\/\/[^"]+)"/g, '"$1"')};

  // Create courses with proper structure
  let totalLessons = 0;
  let totalModules = 0;
  
  for (const courseData of coursesData) {
    const modules = generateCourseStructure(courseData.title, courseData.totalHours, courseData.slug);
    
    const course = await prisma.course.create({
      data: {
        ...courseData,
        level: courseData.level as Level,
        totalLessons: modules.reduce((sum, m) => sum + m.lessons.create.length, 0),
        modules: { create: modules },
      },
    });

    totalLessons += course.totalLessons;
    totalModules += modules.length;
    console.log(\`✅ Created \${courseData.title} (\${courseData.totalHours}h = \${course.totalLessons} lessons across \${modules.length} modules)\`);
  }

  console.log("\\n🎉 Database seeded successfully!");
  console.log(\`📚 Total courses: \${coursesData.length}\`);
  console.log(\`📂 Total modules: \${totalModules}\`);
  console.log(\`📝 Total lessons: \${totalLessons}\`);
  console.log(\`👥 Total users: \${users.length}\`);
  
  const beginnerCount = coursesData.filter(c => c.level === "BEGINNER").length;
  const intermediateCount = coursesData.filter(c => c.level === "INTERMEDIATE").length;
  const advancedCount = coursesData.filter(c => c.level === "ADVANCED").length;
  
  console.log(\`\\n📊 Level Distribution:\`);
  console.log(\`   BEGINNER: \${beginnerCount} courses\`);
  console.log(\`   INTERMEDIATE: \${intermediateCount} courses\`);
  console.log(\`   ADVANCED: \${advancedCount} courses\`);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
`;

fs.writeFileSync('./prisma/seed.ts', seedContent);
console.log('✅ Generated seed.ts with all 70 courses!');
console.log(`Total courses: ${courses.length}`);

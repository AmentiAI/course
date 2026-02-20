// Generate 70 comprehensive course definitions

const courses = [
  // Web3 & Crypto (10)
  { title: "NFT Flipping Masterclass", slug: "nft-flipping-masterclass", category: "Web3 & Crypto", level: "BEGINNER", hours: 6, price: 49, original: 129, featured: true },
  { title: "Bitcoin Ordinals Mastery", slug: "bitcoin-ordinals", category: "Web3 & Crypto", level: "ADVANCED", hours: 10, price: 149, original: 349, featured: true },
  { title: "Solana DeFi Trading", slug: "solana-defi-mastery", category: "Web3 & Crypto", level: "ADVANCED", hours: 11, price: 139, original: 329, featured: false },
  { title: "Crypto Day Trading", slug: "crypto-day-trading", category: "Web3 & Crypto", level: "ADVANCED", hours: 12, price: 159, original: 379, featured: true },
  { title: "Blockchain Development with Solidity", slug: "blockchain-development-solidity", category: "Web3 & Crypto", level: "ADVANCED", hours: 14, price: 149, original: 349, featured: false },
  { title: "Web3 Freelancing", slug: "web3-freelancing", category: "Web3 & Crypto", level: "INTERMEDIATE", hours: 8, price: 89, original: 199, featured: false },
  { title: "Cryptocurrency Fundamentals", slug: "crypto-fundamentals", category: "Web3 & Crypto", level: "BEGINNER", hours: 5, price: 39, original: 99, featured: false },
  { title: "DeFi Yield Farming Strategies", slug: "defi-yield-farming", category: "Web3 & Crypto", level: "INTERMEDIATE", hours: 9, price: 99, original: 229, featured: true },
  { title: "NFT Collection Launch Guide", slug: "nft-collection-launch", category: "Web3 & Crypto", level: "INTERMEDIATE", hours: 10, price: 119, original: 279, featured: false },
  { title: "Smart Contract Auditing", slug: "smart-contract-auditing", category: "Web3 & Crypto", level: "ADVANCED", hours: 12, price: 169, original: 399, featured: true },

  // Social Media & Marketing (15)
  { title: "Twitter/X Growth Hacking 2026", slug: "twitter-x-growth-2026", category: "Marketing & Social", level: "BEGINNER", hours: 5, price: 39, original: 99, featured: false },
  { title: "Instagram Growth & Monetization", slug: "instagram-growth-monetization-2026", category: "Marketing & Social", level: "BEGINNER", hours: 6, price: 49, original: 119, featured: true },
  { title: "TikTok Viral Content Mastery", slug: "tiktok-viral-content", category: "Marketing & Social", level: "BEGINNER", hours: 5, price: 39, original: 99, featured: false },
  { title: "YouTube Shorts Monetization", slug: "youtube-shorts-monetization", category: "Marketing & Social", level: "INTERMEDIATE", hours: 7, price: 69, original: 159, featured: true },
  { title: "LinkedIn Personal Branding", slug: "personal-branding-linkedin", category: "Marketing & Social", level: "BEGINNER", hours: 5, price: 39, original: 99, featured: true },
  { title: "Facebook Ads Mastery 2026", slug: "facebook-ads-mastery", category: "Marketing & Social", level: "INTERMEDIATE", hours: 8, price: 89, original: 199, featured: false },
  { title: "Google Ads for Beginners", slug: "google-ads-beginners", category: "Marketing & Social", level: "BEGINNER", hours: 6, price: 59, original: 139, featured: false },
  { title: "SEO Fundamentals 2026", slug: "seo-fundamentals-2026", category: "Marketing & Social", level: "BEGINNER", hours: 7, price: 49, original: 119, featured: true },
  { title: "Email Marketing Automation", slug: "email-marketing-automation", category: "Marketing & Social", level: "INTERMEDIATE", hours: 6, price: 79, original: 189, featured: false },
  { title: "Content Marketing Strategy", slug: "content-marketing-strategy", category: "Marketing & Social", level: "INTERMEDIATE", hours: 8, price: 89, original: 199, featured: true },
  { title: "Influencer Marketing Campaigns", slug: "influencer-marketing", category: "Marketing & Social", level: "INTERMEDIATE", hours: 7, price: 79, original: 179, featured: false },
  { title: "Pinterest Marketing for Business", slug: "pinterest-marketing", category: "Marketing & Social", level: "BEGINNER", hours: 5, price: 49, original: 109, featured: false },
  { title: "Snapchat Ads and Marketing", slug: "snapchat-marketing", category: "Marketing & Social", level: "INTERMEDIATE", hours: 6, price: 69, original: 149, featured: false },
  { title: "Podcast Marketing and Growth", slug: "podcast-marketing", category: "Marketing & Social", level: "INTERMEDIATE", hours: 7, price: 79, original: 169, featured: false },
  { title: "Affiliate Marketing Empire", slug: "affiliate-marketing-empire", category: "Marketing & Social", level: "INTERMEDIATE", hours: 9, price: 99, original: 229, featured: true },

  // E-Commerce & Business (15)
  { title: "Shopify Dropshipping 2026", slug: "dropshipping-mastery-2026", category: "E-Commerce", level: "BEGINNER", hours: 8, price: 79, original: 199, featured: false },
  { title: "Amazon FBA Private Label", slug: "amazon-fba-private-label", category: "E-Commerce", level: "INTERMEDIATE", hours: 9, price: 119, original: 279, featured: true },
  { title: "Etsy Shop Empire", slug: "etsy-shop-empire", category: "E-Commerce", level: "BEGINNER", hours: 6, price: 59, original: 139, featured: false },
  { title: "Print on Demand Business", slug: "print-on-demand-blueprint", category: "E-Commerce", level: "INTERMEDIATE", hours: 7, price: 69, original: 159, featured: true },
  { title: "Amazon KDP Publishing", slug: "amazon-kdp-publishing", category: "E-Commerce", level: "BEGINNER", hours: 6, price: 49, original: 119, featured: false },
  { title: "eBay Reselling Profits", slug: "ebay-reselling", category: "E-Commerce", level: "BEGINNER", hours: 5, price: 39, original: 99, featured: false },
  { title: "Wholesale Distribution Business", slug: "wholesale-distribution", category: "E-Commerce", level: "INTERMEDIATE", hours: 10, price: 129, original: 299, featured: false },
  { title: "Digital Products Empire", slug: "digital-products-create-launch-sell", category: "E-Commerce", level: "BEGINNER", hours: 7, price: 59, original: 149, featured: false },
  { title: "Subscription Box Business", slug: "subscription-box-business", category: "E-Commerce", level: "INTERMEDIATE", hours: 8, price: 99, original: 219, featured: false },
  { title: "WooCommerce Store Setup", slug: "woocommerce-ecommerce", category: "E-Commerce", level: "INTERMEDIATE", hours: 7, price: 79, original: 179, featured: false },
  { title: "Shopify App Development", slug: "shopify-app-development", category: "E-Commerce", level: "ADVANCED", hours: 12, price: 149, original: 339, featured: false },
  { title: "E-Commerce Email Funnels", slug: "ecommerce-email-funnels", category: "E-Commerce", level: "INTERMEDIATE", hours: 6, price: 69, original: 149, featured: false },
  { title: "Local Business Consulting", slug: "local-business-consulting", category: "Business", level: "INTERMEDIATE", hours: 8, price: 89, original: 199, featured: false },
  { title: "Business Plan Mastery", slug: "business-plan-mastery", category: "Business", level: "BEGINNER", hours: 6, price: 49, original: 119, featured: false },
  { title: "Virtual Assistant Business", slug: "virtual-assistant-business", category: "Business", level: "BEGINNER", hours: 5, price: 39, original: 89, featured: false },

  // Tech & Development (12)
  { title: "Web Development Bootcamp", slug: "freelance-web-dev-bootcamp", category: "Tech & Development", level: "INTERMEDIATE", hours: 10, price: 129, original: 299, featured: true },
  { title: "Python Automation Mastery", slug: "python-automation", category: "Tech & Development", level: "INTERMEDIATE", hours: 9, price: 99, original: 229, featured: false },
  { title: "React & Next.js Development", slug: "react-nextjs-development", category: "Tech & Development", level: "INTERMEDIATE", hours: 12, price: 139, original: 319, featured: true },
  { title: "Mobile App Development", slug: "mobile-app-development", category: "Tech & Development", level: "INTERMEDIATE", hours: 14, price: 149, original: 349, featured: false },
  { title: "WordPress Development Pro", slug: "wordpress-development", category: "Tech & Development", level: "BEGINNER", hours: 8, price: 79, original: 179, featured: false },
  { title: "Full Stack JavaScript", slug: "fullstack-javascript", category: "Tech & Development", level: "ADVANCED", hours: 16, price: 179, original: 399, featured: true },
  { title: "DevOps & Cloud Engineering", slug: "devops-cloud-engineering", category: "Tech & Development", level: "ADVANCED", hours: 14, price: 159, original: 369, featured: false },
  { title: "Data Science with Python", slug: "data-science-python", category: "Tech & Development", level: "ADVANCED", hours: 15, price: 169, original: 389, featured: true },
  { title: "Cybersecurity Fundamentals", slug: "cybersecurity-fundamentals", category: "Tech & Development", level: "INTERMEDIATE", hours: 10, price: 119, original: 269, featured: false },
  { title: "SQL Database Mastery", slug: "sql-database-mastery", category: "Tech & Development", level: "BEGINNER", hours: 7, price: 69, original: 149, featured: false },
  { title: "iOS App Development Swift", slug: "ios-app-development", category: "Tech & Development", level: "INTERMEDIATE", hours: 13, price: 139, original: 319, featured: false },
  { title: "Android App Development Kotlin", slug: "android-app-development", category: "Tech & Development", level: "INTERMEDIATE", hours: 13, price: 139, original: 319, featured: false },

  // AI & Automation (8)
  { title: "AI Automation for Business", slug: "ai-automation-business", category: "Tech & AI", level: "INTERMEDIATE", hours: 9, price: 99, original: 229, featured: false },
  { title: "ChatGPT Mastery & Prompts", slug: "prompt-engineering-mastery", category: "Tech & AI", level: "INTERMEDIATE", hours: 7, price: 79, original: 179, featured: true },
  { title: "Midjourney AI Art Mastery", slug: "midjourney-ai-art", category: "Tech & AI", level: "BEGINNER", hours: 6, price: 59, original: 139, featured: false },
  { title: "AI Content Creation", slug: "ai-content-creation", category: "Tech & AI", level: "BEGINNER", hours: 5, price: 49, original: 109, featured: false },
  { title: "Machine Learning Basics", slug: "machine-learning-basics", category: "Tech & AI", level: "INTERMEDIATE", hours: 12, price: 129, original: 289, featured: true },
  { title: "AI Video Generation", slug: "ai-video-generation", category: "Tech & AI", level: "INTERMEDIATE", hours: 7, price: 79, original: 169, featured: false },
  { title: "Building AI Chatbots", slug: "building-ai-chatbots", category: "Tech & AI", level: "INTERMEDIATE", hours: 10, price: 119, original: 259, featured: false },
  { title: "AI Side Hustle Ideas", slug: "ai-side-hustle-ideas", category: "Tech & AI", level: "BEGINNER", hours: 5, price: 39, original: 89, featured: true },

  // Finance & Investing (5)
  { title: "Stock Market Options Trading", slug: "stock-options-trading", category: "Finance & Investing", level: "ADVANCED", hours: 12, price: 179, original: 399, featured: true },
  { title: "Real Estate Investing 101", slug: "real-estate-investing", category: "Finance & Investing", level: "BEGINNER", hours: 8, price: 89, original: 199, featured: false },
  { title: "Day Trading for Beginners", slug: "day-trading-beginners", category: "Finance & Investing", level: "INTERMEDIATE", hours: 10, price: 129, original: 289, featured: true },
  { title: "Dividend Investing Strategy", slug: "dividend-investing", category: "Finance & Investing", level: "BEGINNER", hours: 6, price: 59, original: 139, featured: false },
  { title: "Personal Finance Mastery", slug: "personal-finance-mastery", category: "Finance & Investing", level: "BEGINNER", hours: 5, price: 39, original: 89, featured: false },

  // Productivity & Tools (5)
  { title: "Notion Productivity System", slug: "notion-productivity-system", category: "Productivity & Tools", level: "BEGINNER", hours: 4, price: 29, original: 79, featured: false },
  { title: "Excel Advanced Formulas", slug: "excel-advanced-formulas", category: "Productivity & Tools", level: "INTERMEDIATE", hours: 7, price: 69, original: 149, featured: false },
  { title: "Time Management Mastery", slug: "time-management-mastery", category: "Productivity & Tools", level: "BEGINNER", hours: 4, price: 29, original: 69, featured: false },
  { title: "Project Management PMP Prep", slug: "pmp-certification-prep", category: "Productivity & Tools", level: "ADVANCED", hours: 20, price: 199, original: 449, featured: true },
  { title: "Airtable Business Systems", slug: "airtable-business-systems", category: "Productivity & Tools", level: "INTERMEDIATE", hours: 6, price: 59, original: 129, featured: false },
];

console.log(JSON.stringify(courses, null, 2));
console.log(`\nTotal courses: ${courses.length}`);

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_g8SvCD9MhLip@ep-green-mountain-ainx1go9-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require",
  ssl: { rejectUnauthorized: false },
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as any);

const MONEY_MAKING_COURSES = [
  // FREELANCING & SERVICES (10 courses)
  {
    title: "Social Media Management Business: $5k+/Month",
    slug: "social-media-management-business",
    shortDesc: "Build a profitable social media management agency serving local businesses and online brands.",
    description: `Launch your own social media management business and serve clients who need help growing their online presence. Learn to manage Instagram, Facebook, TikTok, and LinkedIn accounts professionally.

**What You'll Learn:**
- How to find and pitch clients (local businesses to influencers)
- Content creation, scheduling, and analytics tools
- Pricing packages: $500-$3,000 per client per month
- Scaling to multiple clients with automation
- Creating monthly reports that retain clients

This course teaches you to build a service business with low overhead and high profit margins. Perfect for anyone who spends time on social media and wants to monetize that skill.`,
    thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1920&q=80",
    price: 79,
    originalPrice: 158,
    category: "Freelancing & Services",
    level: "BEGINNER",
    tags: ["Social Media", "Freelancing", "Agency", "Marketing", "Client Services"],
    isFeatured: true,
    totalHours: 8
  },
  {
    title: "Translation Services: Earn $40-$80/Hour",
    slug: "translation-services-business",
    shortDesc: "Turn bilingual skills into a profitable freelance translation business with consistent clients.",
    description: `If you speak multiple languages, you're sitting on a goldmine. Professional translators earn $40-$80/hour for documents, websites, and business communications.

**What You'll Learn:**
- Setting up profiles on Upwork, Fiverr, and specialized platforms like ProZ
- Specializing in lucrative niches (legal, medical, technical)
- CAT tools (Translation Memory software) to work faster
- Building a client base that provides steady work
- Premium services: certified translations, localization, transcreation

Even without formal certification, you can start earning immediately. This course shows you how to position yourself professionally and land high-paying clients.`,
    thumbnail: "https://images.unsplash.com/photo-1513346940221-6f673d962e97?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1513346940221-6f673d962e97?w=1920&q=80",
    price: 49,
    originalPrice: 98,
    category: "Freelancing & Services",
    level: "BEGINNER",
    tags: ["Translation", "Freelancing", "Languages", "Remote Work"],
    isFeatured: false,
    totalHours: 6
  },
  {
    title: "Resume Writing & Career Coaching",
    slug: "resume-writing-career-coaching",
    shortDesc: "Help job seekers land dream jobs while earning $100-$500 per client.",
    description: `Career coaching and resume writing is a growing industry. Companies pay top dollar for talent, and job seekers invest in professional help to stand out.

**What You'll Learn:**
- Writing ATS-optimized resumes that pass automated filters
- LinkedIn profile optimization strategies
- Interview coaching and salary negotiation techniques
- Building a client acquisition funnel
- Pricing: $100-$500 per package depending on experience level

You'll learn the psychology of hiring managers, modern resume formats, and how to position any background positively. Great side hustle or full-time business.`,
    thumbnail: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1920&q=80",
    price: 59,
    originalPrice: 118,
    category: "Freelancing & Services",
    level: "BEGINNER",
    tags: ["Career Coaching", "Resume Writing", "Professional Services", "Business"],
    isFeatured: true,
    totalHours: 7
  },
  {
    title: "Voice-Over Artist Business Blueprint",
    slug: "voiceover-artist-business",
    shortDesc: "Start a voice-over business from home: audiobooks, commercials, explainer videos, and more.",
    description: `Voice-over work is in high demand for YouTube videos, audiobooks, commercials, e-learning, and podcasts. You don't need a professional studio to start earning.

**What You'll Learn:**
- Setting up a home recording studio for under $500
- Voice training techniques and script interpretation
- Finding work on Voices.com, ACX (audiobooks), Fiverr
- Pricing your services: $100-$400 per finished hour
- Building a demo reel that gets you hired

The audiobook market alone is worth billions. Learn to turn your voice into a profitable asset from the comfort of your home.`,
    thumbnail: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1920&q=80",
    price: 69,
    originalPrice: 138,
    category: "Freelancing & Services",
    level: "BEGINNER",
    tags: ["Voice Over", "Audiobooks", "Recording", "Creative Services"],
    isFeatured: false,
    totalHours: 8
  },
  {
    title: "Proofreading & Editing Services Income",
    slug: "proofreading-editing-services",
    shortDesc: "Start a proofreading business: work from anywhere, set your hours, earn $25-$50/hour.",
    description: `Writers, businesses, and students need proofreaders. This is one of the easiest freelance businesses to start—if you have strong grammar skills, you're qualified.

**What You'll Learn:**
- Finding clients on platforms like Scribendi, Gramlee, and Upwork
- Specializing in profitable niches (academic, business, fiction)
- Tools: Grammarly Premium, ProWritingAid, track changes
- Pricing models: per word, per hour, or per project
- Building long-term retainer clients

No certification required. Start taking on projects within days and build to a full-time income working from home.`,
    thumbnail: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1920&q=80",
    price: 39,
    originalPrice: 78,
    category: "Freelancing & Services",
    level: "BEGINNER",
    tags: ["Proofreading", "Editing", "Writing", "Freelancing"],
    isFeatured: false,
    totalHours: 5
  },
  {
    title: "Virtual Bookkeeping Business",
    slug: "virtual-bookkeeping-business",
    shortDesc: "Launch a profitable bookkeeping business: serve small businesses remotely, earn $500-$2,000/client monthly.",
    description: `Small businesses desperately need bookkeepers but can't afford full-time staff. Virtual bookkeeping is the perfect solution—and a perfect business for you.

**What You'll Learn:**
- QuickBooks Online and Xero mastery
- Monthly bookkeeping workflows: reconciliation, invoicing, reports
- Finding clients: local businesses, online entrepreneurs, consultants
- Pricing packages: $500-$2,000 per client per month
- Scaling to 10-20 clients with automation

No CPA required. Basic accounting knowledge is enough to start. This course shows you the exact systems successful bookkeepers use.`,
    thumbnail: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1920&q=80",
    price: 89,
    originalPrice: 178,
    category: "Freelancing & Services",
    level: "INTERMEDIATE",
    tags: ["Bookkeeping", "QuickBooks", "Accounting", "Small Business"],
    isFeatured: true,
    totalHours: 10
  },
  {
    title: "Transcription Services Income Stream",
    slug: "transcription-services-income",
    shortDesc: "Start a transcription business: convert audio to text, work from home, earn $15-$30/hour.",
    description: `Transcription is a reliable way to earn money from home. Podcasts, interviews, legal proceedings, and medical records all need transcription.

**What You'll Learn:**
- Getting started on Rev, TranscribeMe, and GoTranscript
- Increasing your typing speed and accuracy
- General vs. specialized transcription (legal, medical pay more)
- Tools and shortcuts to transcribe faster
- Building direct client relationships for better rates

Start earning within a week. Scale to $3,000+/month with experience and specialization.`,
    thumbnail: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=1920&q=80",
    price: 29,
    originalPrice: 58,
    category: "Freelancing & Services",
    level: "BEGINNER",
    tags: ["Transcription", "Typing", "Remote Work", "Data Entry"],
    isFeatured: false,
    totalHours: 4
  },
  {
    title: "Grant Writing for Nonprofits: $5k+ Per Grant",
    slug: "grant-writing-nonprofits",
    shortDesc: "Learn grant writing and help nonprofits secure funding while earning $75-$150/hour.",
    description: `Nonprofits need grants to survive, but most don't have skilled grant writers on staff. This creates a lucrative opportunity for freelancers.

**What You'll Learn:**
- Understanding the grant lifecycle and funder priorities
- Writing compelling proposals that win funding
- Finding grant opportunities for clients
- Pricing: $75-$150/hour or 5-10% of grant amount
- Building relationships with nonprofits who need ongoing help

Grant writers with experience can earn $100,000+ annually. This course gives you the foundation to enter this rewarding field.`,
    thumbnail: "https://images.unsplash.com/photo-1532619187608-e5375cab36aa?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1532619187608-e5375cab36aa?w=1920&q=80",
    price: 79,
    originalPrice: 158,
    category: "Freelancing & Services",
    level: "INTERMEDIATE",
    tags: ["Grant Writing", "Nonprofits", "Professional Writing", "Fundraising"],
    isFeatured: false,
    totalHours: 9
  },
  {
    title: "Data Entry Business Automation",
    slug: "data-entry-business-automation",
    shortDesc: "Build a data entry business using automation tools to maximize profit and minimize effort.",
    description: `Data entry is often seen as low-paying, but with the right approach and automation, you can build a scalable business.

**What You'll Learn:**
- Finding high-paying data entry gigs on Upwork and Freelancer
- Using automation tools to 10x your speed (Zapier, scripts)
- Outsourcing to VAs in the Philippines or India for leverage
- Specializing in profitable niches: real estate, e-commerce, CRM
- Building systems that run without constant hands-on work

Turn a simple skill into a business that generates income while you focus on scaling.`,
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80",
    price: 49,
    originalPrice: 98,
    category: "Freelancing & Services",
    level: "BEGINNER",
    tags: ["Data Entry", "Automation", "Outsourcing", "Business Systems"],
    isFeatured: false,
    totalHours: 6
  },
  {
    title: "Online Tutoring Empire: $50-$100/Hour",
    slug: "online-tutoring-empire",
    shortDesc: "Build an online tutoring business teaching students worldwide via Zoom and specialized platforms.",
    description: `Online tutoring has exploded. Parents pay premium rates for quality tutors, and you can teach from anywhere in the world.

**What You'll Learn:**
- Platforms: Wyzant, Chegg Tutors, VIPKid, Outschool
- Subjects that pay the most (SAT prep, coding, advanced math)
- Creating engaging virtual lessons
- Pricing: $50-$100/hour for specialized subjects
- Building a private client base outside platforms

Whether you're strong in math, science, languages, or test prep, you can build a tutoring business that earns $5,000-$10,000/month working part-time.`,
    thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&q=80",
    price: 69,
    originalPrice: 138,
    category: "Freelancing & Services",
    level: "BEGINNER",
    tags: ["Tutoring", "Education", "Online Teaching", "Remote Work"],
    isFeatured: true,
    totalHours: 8
  },

  // CONTENT CREATION (10 courses)
  {
    title: "Twitch Streaming to $10k/Month",
    slug: "twitch-streaming-10k-month",
    shortDesc: "Build a profitable Twitch channel: subs, donations, sponsorships, and brand deals.",
    description: `Twitch isn't just for gamers anymore. IRL streams, creative content, and just chatting categories are thriving. Learn to build an audience and monetize.

**What You'll Learn:**
- Stream setup: OBS, overlays, alerts, and hardware
- Growing your channel: networking, raids, content strategy
- Monetization: subscriptions, bits, donations, sponsorships
- Twitch Affiliate and Partner requirements
- Building a community that supports you financially

Top streamers make millions, but even mid-tier creators pull $5k-$10k/month. This course shows you the proven path.`,
    thumbnail: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1920&q=80",
    price: 89,
    originalPrice: 178,
    category: "Content Creation",
    level: "INTERMEDIATE",
    tags: ["Twitch", "Streaming", "Gaming", "Content Creation", "Community Building"],
    isFeatured: true,
    totalHours: 10
  },
  {
    title: "Instagram Reels Monetization Mastery",
    slug: "instagram-reels-monetization",
    shortDesc: "Create viral Instagram Reels and monetize through the Reels Bonus Program, brand deals, and affiliate links.",
    description: `Instagram Reels is the fastest way to grow on Instagram in 2026. Learn to create content that goes viral and turns views into dollars.

**What You'll Learn:**
- Reels algorithm secrets: what makes content go viral
- Editing apps and techniques for professional-looking Reels
- Reels Bonus Program: earning $100-$4,000 per month
- Landing brand deals and sponsorships
- Affiliate marketing through Reels

Even small accounts can earn thousands per month with the right strategy. This course gives you the blueprint.`,
    thumbnail: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1920&q=80",
    price: 59,
    originalPrice: 118,
    category: "Content Creation",
    level: "BEGINNER",
    tags: ["Instagram", "Reels", "Social Media", "Viral Content", "Influencer"],
    isFeatured: true,
    totalHours: 7
  },
  {
    title: "Blogging to $5k/Month Passive Income",
    slug: "blogging-5k-month-passive",
    shortDesc: "Build a profitable blog using SEO, affiliate marketing, and digital products for passive income.",
    description: `Blogging is far from dead. Strategic bloggers still earn $5,000-$50,000 per month through affiliate links, ads, and selling products.

**What You'll Learn:**
- Niche selection: finding profitable topics with low competition
- SEO keyword research and content optimization
- Monetization: ads (Mediavine, AdThrive), affiliate marketing, sponsored posts
- Building email lists for product launches
- Scaling content production with writers

This isn't get-rich-quick. It takes 6-12 months of consistent work. But once established, blogs generate income 24/7 with minimal maintenance.`,
    thumbnail: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&q=80",
    price: 79,
    originalPrice: 158,
    category: "Content Creation",
    level: "INTERMEDIATE",
    tags: ["Blogging", "SEO", "Passive Income", "Affiliate Marketing", "Content"],
    isFeatured: false,
    totalHours: 11
  },
  {
    title: "YouTube Shorts Revenue Strategy",
    slug: "youtube-shorts-revenue",
    shortDesc: "Monetize YouTube Shorts: ad revenue sharing, sponsorships, and audience building strategies.",
    description: `YouTube Shorts is YouTube's answer to TikTok, and creators are making serious money. The Shorts Fund and monetization features make it viable.

**What You'll Learn:**
- Creating binge-worthy Shorts that keep viewers watching
- YouTube Shorts algorithm and growth hacks
- Monetization: Shorts Fund, ad revenue, affiliate links
- Repurposing content across TikTok, Instagram, and YouTube
- Turning Shorts viewers into long-form subscribers

You don't need fancy equipment. Just your phone and the right strategy. Start earning from your first 1,000 subscribers.`,
    thumbnail: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=1920&q=80",
    price: 49,
    originalPrice: 98,
    category: "Content Creation",
    level: "BEGINNER",
    tags: ["YouTube", "Shorts", "Video Content", "Social Media", "Monetization"],
    isFeatured: false,
    totalHours: 6
  },
  {
    title: "Stock Photography Income Blueprint",
    slug: "stock-photography-income",
    shortDesc: "Earn passive income selling photos on Shutterstock, Adobe Stock, and Getty Images.",
    description: `If you have a camera (or even a smartphone), you can earn passive income from stock photography. Upload once, earn forever.

**What You'll Learn:**
- Which subjects and styles sell best (business, technology, lifestyle)
- Platforms: Shutterstock, Adobe Stock, Getty, Alamy
- Technical requirements: resolution, lighting, composition
- Model releases and legal considerations
- Scaling to hundreds or thousands of uploads for consistent income

Top contributors earn $500-$5,000/month in passive royalties. Build your portfolio and let it work for you.`,
    thumbnail: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1920&q=80",
    price: 39,
    originalPrice: 78,
    category: "Content Creation",
    level: "BEGINNER",
    tags: ["Photography", "Stock Photos", "Passive Income", "Creative Business"],
    isFeatured: false,
    totalHours: 5
  },
  {
    title: "Selling Digital Art on Etsy",
    slug: "digital-art-etsy-business",
    shortDesc: "Create and sell digital art, prints, and templates on Etsy for passive income.",
    description: `Digital art is one of the best products to sell online: no inventory, no shipping, instant delivery. Etsy is the perfect marketplace.

**What You'll Learn:**
- Creating digital products: wall art, planners, templates, stickers
- Etsy SEO: getting found in search results
- Pricing strategy and profit margins
- Mockups and product photos that convert
- Scaling with Print-on-Demand for physical products

Artists on Etsy earn anywhere from $500-$10,000/month. Once you upload a design, it can sell hundreds of times with zero additional work.`,
    thumbnail: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1920&q=80",
    price: 59,
    originalPrice: 118,
    category: "Content Creation",
    level: "BEGINNER",
    tags: ["Digital Art", "Etsy", "Printables", "Passive Income", "Design"],
    isFeatured: true,
    totalHours: 7
  },
  {
    title: "Kindle Publishing Business",
    slug: "kindle-publishing-business",
    shortDesc: "Self-publish books on Amazon Kindle: fiction, nonfiction, and low-content books for royalty income.",
    description: `Amazon's Kindle Direct Publishing (KDP) lets anyone become a published author and earn royalties. No publisher needed.

**What You'll Learn:**
- Choosing profitable niches and topics
- Writing or outsourcing content
- Cover design and formatting for KDP
- Kindle SEO and pricing strategies
- Low-content books: planners, journals, notebooks
- Marketing and getting reviews

Authors earn $500-$10,000/month once they have a catalog of books. Start with one and scale to dozens.`,
    thumbnail: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1920&q=80",
    price: 69,
    originalPrice: 138,
    category: "Content Creation",
    level: "INTERMEDIATE",
    tags: ["Kindle Publishing", "Self-Publishing", "Amazon KDP", "Passive Income", "Writing"],
    isFeatured: false,
    totalHours: 9
  },
  {
    title: "Medium Partner Program Success",
    slug: "medium-partner-program",
    shortDesc: "Earn $1,000-$5,000/month writing on Medium through the Partner Program.",
    description: `Medium pays writers directly based on engagement from paying members. No ads, no products—just write and earn.

**What You'll Learn:**
- Understanding Medium's algorithm and curation
- Writing headlines and hooks that get clicks
- Topics that perform well: tech, business, self-improvement, finance
- Optimizing for reading time and engagement
- Building a following and getting into publications

Top Medium writers earn $5,000-$10,000/month. Even part-time writers consistently hit $500-$2,000/month.`,
    thumbnail: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=1920&q=80",
    price: 39,
    originalPrice: 78,
    category: "Content Creation",
    level: "BEGINNER",
    tags: ["Medium", "Writing", "Blogging", "Content Creation", "Passive Income"],
    isFeatured: false,
    totalHours: 5
  },
  {
    title: "Substack Newsletter Revenue",
    slug: "substack-newsletter-revenue",
    shortDesc: "Build a paid newsletter on Substack: grow subscribers and earn recurring income.",
    description: `Substack makes it easy to monetize your writing through paid subscriptions. Writers are earning $5,000-$50,000/month from their newsletters.

**What You'll Learn:**
- Finding your niche and audience
- Free vs. paid content strategy
- Growing your email list organically
- Pricing: $5-$20/month or $50-$200/year
- Retention tactics to minimize churn

You don't need millions of subscribers. Just 500 paying subscribers at $10/month = $5,000/month recurring revenue.`,
    thumbnail: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=1920&q=80",
    price: 59,
    originalPrice: 118,
    category: "Content Creation",
    level: "INTERMEDIATE",
    tags: ["Substack", "Newsletter", "Email Marketing", "Subscription", "Writing"],
    isFeatured: true,
    totalHours: 8
  },
  {
    title: "OnlyFans & Patreon Creator Guide",
    slug: "onlyfans-patreon-creator",
    shortDesc: "Monetize exclusive content on OnlyFans and Patreon: fitness, art, coaching, adult content, and more.",
    description: `OnlyFans and Patreon let creators earn directly from fans. While OnlyFans is known for adult content, both platforms support any exclusive content.

**What You'll Learn:**
- Platform comparison: OnlyFans vs. Patreon
- Content ideas: fitness, cooking, art, music, coaching, exclusive videos
- Pricing tiers and subscription models
- Marketing and growing your subscriber base
- Retention: keeping fans subscribed month after month

Creators earn anywhere from $500 to $100,000+/month depending on niche and audience size. The key is offering value people can't get elsewhere.`,
    thumbnail: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=1920&q=80",
    price: 49,
    originalPrice: 98,
    category: "Content Creation",
    level: "INTERMEDIATE",
    tags: ["OnlyFans", "Patreon", "Subscription", "Creator Economy", "Monetization"],
    isFeatured: false,
    totalHours: 6
  },

  // ECOMMERCE & PRODUCTS (10 courses)
  {
    title: "Etsy Shop: $50k/Year Blueprint",
    slug: "etsy-shop-50k-blueprint",
    shortDesc: "Build a profitable Etsy shop selling handmade goods, vintage items, or digital products.",
    description: `Etsy is a $13 billion marketplace with millions of buyers looking for unique products. Build a shop that generates consistent income.

**What You'll Learn:**
- Product research: finding what sells on Etsy
- SEO optimization for Etsy search
- Product photography and listing optimization
- Digital products vs. physical goods
- Scaling with ads and marketing

Many sellers earn $50,000-$100,000/year part-time. The key is finding a profitable niche and optimizing for conversions.`,
    thumbnail: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1920&q=80",
    price: 79,
    originalPrice: 158,
    category: "Ecommerce",
    level: "BEGINNER",
    tags: ["Etsy", "Ecommerce", "Handmade", "Digital Products", "Online Store"],
    isFeatured: true,
    totalHours: 10
  },
  {
    title: "eBay Reselling Mastery",
    slug: "ebay-reselling-mastery",
    shortDesc: "Source products from thrift stores, garage sales, and liquidation and resell on eBay for profit.",
    description: `eBay reselling is one of the easiest ways to start making money. Buy low, sell high. People are making $3,000-$10,000/month.

**What You'll Learn:**
- What items to look for (electronics, vintage, collectibles, brand-name clothing)
- Sourcing: thrift stores, estate sales, liquidation pallets
- Pricing strategy and competitive analysis
- Shipping and handling best practices
- Scaling to a full-time business

Start with $100-$500 and flip your way to a full-time income. This course shows you exactly what to buy and where to find it.`,
    thumbnail: "https://images.unsplash.com/photo-1556742400-b5b7f7d37f56?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1556742400-b5b7f7d37f56?w=1920&q=80",
    price: 49,
    originalPrice: 98,
    category: "Ecommerce",
    level: "BEGINNER",
    tags: ["eBay", "Reselling", "Flipping", "Ecommerce", "Side Hustle"],
    isFeatured: false,
    totalHours: 6
  },
  {
    title: "Wholesale Products on Amazon",
    slug: "amazon-wholesale-business",
    shortDesc: "Buy wholesale products and resell on Amazon FBA for consistent profit margins.",
    description: `Amazon wholesale is lower risk than private label. You're selling established brands with existing demand.

**What You'll Learn:**
- Finding wholesale suppliers and getting approved
- Product research: what sells and what to avoid
- Amazon FBA setup and inventory management
- Pricing strategy and Buy Box optimization
- Scaling to $10,000-$50,000/month in revenue

Wholesale margins are slimmer (15-30%) but the risk is lower. Build a sustainable Amazon business without creating your own brand.`,
    thumbnail: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1920&q=80",
    price: 99,
    originalPrice: 198,
    category: "Ecommerce",
    level: "INTERMEDIATE",
    tags: ["Amazon", "Wholesale", "FBA", "Ecommerce", "Retail Arbitrage"],
    isFeatured: true,
    totalHours: 12
  },
  {
    title: "Handmade Crafts Business",
    slug: "handmade-crafts-business",
    shortDesc: "Turn your crafting hobby into profit: jewelry, candles, soaps, woodworking, and more.",
    description: `If you're good at making things, there's a market for it. Handmade products command premium prices.

**What You'll Learn:**
- Product development and pricing for profit
- Selling on Etsy, local markets, and craft fairs
- Building a brand and social media presence
- Inventory management and production scaling
- Wholesale to boutiques and retailers

Crafters earn $2,000-$10,000/month selling what they love to make. Turn your hobby into a real business.`,
    thumbnail: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=1920&q=80",
    price: 59,
    originalPrice: 118,
    category: "Ecommerce",
    level: "BEGINNER",
    tags: ["Handmade", "Crafts", "Etsy", "Small Business", "Creative"],
    isFeatured: false,
    totalHours: 7
  },
  {
    title: "Private Label Skincare Business",
    slug: "private-label-skincare",
    shortDesc: "Launch your own skincare brand using private label manufacturers and sell online.",
    description: `The skincare industry is worth billions. Private labeling lets you create your own brand without manufacturing everything yourself.

**What You'll Learn:**
- Finding private label manufacturers (US and international)
- Product selection: serums, moisturizers, masks, cleansers
- Branding, packaging, and design
- FDA regulations and labeling requirements
- Marketing on Amazon, Shopify, and social media

Build a brand that generates $5,000-$50,000/month. Profit margins are high (50-70%) in beauty and skincare.`,
    thumbnail: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1920&q=80",
    price: 129,
    originalPrice: 258,
    category: "Ecommerce",
    level: "ADVANCED",
    tags: ["Skincare", "Private Label", "Branding", "Ecommerce", "Beauty"],
    isFeatured: true,
    totalHours: 14
  },
  {
    title: "Import/Export Trading Business",
    slug: "import-export-trading",
    shortDesc: "Start an international trade business: source products globally and sell for profit.",
    description: `Import/export trading connects buyers and sellers across borders. Act as the middleman and earn on every transaction.

**What You'll Learn:**
- Finding international suppliers (Alibaba, trade shows)
- Understanding customs, tariffs, and shipping logistics
- Payment terms and trade financing
- Building relationships with buyers and sellers
- Profitable niches and market research

Traders earn commissions of 10-30% on deals. One good contract can generate $10,000-$100,000 in profit.`,
    thumbnail: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1920&q=80",
    price: 149,
    originalPrice: 298,
    category: "Ecommerce",
    level: "ADVANCED",
    tags: ["Import Export", "Trading", "International Business", "Wholesale"],
    isFeatured: false,
    totalHours: 16
  },
  {
    title: "Shopify + AliExpress Dropshipping",
    slug: "shopify-aliexpress-dropshipping",
    shortDesc: "Build a dropshipping store with Shopify and AliExpress: zero inventory, low startup costs.",
    description: `Dropshipping lets you sell products without holding inventory. When a customer orders, your supplier ships directly to them.

**What You'll Learn:**
- Setting up a professional Shopify store
- Finding winning products on AliExpress
- Facebook and Instagram ads for traffic
- Order fulfillment and customer service
- Scaling profitable products to $5,000-$20,000/month

Dropshipping requires low upfront investment ($200-$500) but can scale quickly with the right products and marketing.`,
    thumbnail: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=1920&q=80",
    price: 89,
    originalPrice: 178,
    category: "Ecommerce",
    level: "INTERMEDIATE",
    tags: ["Dropshipping", "Shopify", "AliExpress", "Ecommerce", "Online Store"],
    isFeatured: true,
    totalHours: 11
  },
  {
    title: "Merch by Amazon T-Shirt Business",
    slug: "merch-by-amazon-tshirts",
    shortDesc: "Design and sell custom t-shirts on Amazon with zero inventory or upfront costs.",
    description: `Merch by Amazon is a print-on-demand platform where you upload designs, Amazon produces and ships, and you earn royalties.

**What You'll Learn:**
- Getting accepted into Merch by Amazon
- Design tools: Photoshop, Canva, hiring designers
- Niche research and trending topics
- Optimizing listings for Amazon search
- Scaling to hundreds of designs for passive income

Successful sellers earn $1,000-$10,000/month in royalties. Upload designs once and earn forever.`,
    thumbnail: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=1920&q=80",
    price: 59,
    originalPrice: 118,
    category: "Ecommerce",
    level: "BEGINNER",
    tags: ["Merch by Amazon", "T-Shirts", "Print on Demand", "Passive Income", "Design"],
    isFeatured: false,
    totalHours: 7
  },
  {
    title: "Subscription Box Business",
    slug: "subscription-box-business",
    shortDesc: "Launch a subscription box: recurring revenue from curated products delivered monthly.",
    description: `Subscription boxes have taken over ecommerce. From beauty to snacks to pet products, people love monthly surprises.

**What You'll Learn:**
- Choosing your niche and target market
- Sourcing products and negotiating with suppliers
- Pricing for profit (typical margins: 40-60%)
- Subscription management and fulfillment
- Marketing and customer retention

Subscription businesses generate predictable recurring revenue. Build to $10,000-$50,000/month with 500-2,000 subscribers.`,
    thumbnail: "https://images.unsplash.com/photo-1550399504-8953e1a1f153?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1550399504-8953e1a1f153?w=1920&q=80",
    price: 119,
    originalPrice: 238,
    category: "Ecommerce",
    level: "ADVANCED",
    tags: ["Subscription Box", "Recurring Revenue", "Ecommerce", "Product Curation"],
    isFeatured: true,
    totalHours: 13
  },
  {
    title: "Print-on-Demand Apparel Mastery",
    slug: "print-on-demand-apparel",
    shortDesc: "Build a clothing brand with print-on-demand: no inventory, design once, earn forever.",
    description: `Print-on-demand (POD) lets you sell custom apparel without inventory risk. Printful, Printify, and others handle production and shipping.

**What You'll Learn:**
- Choosing POD platforms and products (t-shirts, hoodies, hats, leggings)
- Creating designs that sell
- Building a Shopify or Etsy store
- Marketing on social media and Pinterest
- Profit margins and pricing strategy

POD sellers earn $1,000-$20,000/month with successful brands. Start with minimal investment and scale as you validate demand.`,
    thumbnail: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1920&q=80",
    price: 69,
    originalPrice: 138,
    category: "Ecommerce",
    level: "BEGINNER",
    tags: ["Print on Demand", "Apparel", "Shopify", "Ecommerce", "Fashion"],
    isFeatured: false,
    totalHours: 8
  },

  // INVESTING & TRADING (10 courses)
  {
    title: "Day Trading Stocks for Income",
    slug: "day-trading-stocks-income",
    shortDesc: "Learn day trading strategies to generate daily income from stock market volatility.",
    description: `Day trading is buying and selling stocks within the same day to profit from short-term price movements. It's risky but can be highly profitable with the right education.

**What You'll Learn:**
- Technical analysis: charts, patterns, indicators
- Risk management and position sizing
- Finding volatile stocks with volume
- Trading psychology and discipline
- Setting up a day trading workstation

Successful day traders earn $500-$5,000+ per day, but it requires capital ($25,000 minimum for pattern day trading) and strict discipline.`,
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1920&q=80",
    price: 179,
    originalPrice: 358,
    category: "Finance & Investing",
    level: "ADVANCED",
    tags: ["Day Trading", "Stocks", "Trading", "Technical Analysis", "Income"],
    isFeatured: true,
    totalHours: 15
  },
  {
    title: "Swing Trading Strategies",
    slug: "swing-trading-strategies",
    shortDesc: "Hold stocks for days or weeks to capture larger price movements with less time commitment.",
    description: `Swing trading is perfect for people who can't watch the market all day. Hold positions for 2-10 days to capture bigger moves.

**What You'll Learn:**
- Identifying swing trading setups
- Chart patterns and technical indicators
- Risk management and stop-loss placement
- Fundamental catalysts (earnings, news)
- Balancing swing trading with a full-time job

Swing traders target 5-15% gains per trade. With $10,000-$50,000 capital, you can generate $1,000-$5,000/month.`,
    thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1920&q=80",
    price: 149,
    originalPrice: 298,
    category: "Finance & Investing",
    level: "INTERMEDIATE",
    tags: ["Swing Trading", "Stocks", "Trading", "Part-Time Income"],
    isFeatured: false,
    totalHours: 12
  },
  {
    title: "Dividend Income Portfolio",
    slug: "dividend-income-portfolio",
    shortDesc: "Build a portfolio of dividend-paying stocks for passive monthly income.",
    description: `Dividend investing is the ultimate passive income strategy. Buy quality stocks that pay regular dividends and watch your income grow.

**What You'll Learn:**
- Finding high-quality dividend stocks
- Dividend aristocrats and dividend kings
- REITs and BDCs for higher yields
- Dividend reinvestment strategies (DRIP)
- Building a $1,000-$5,000/month dividend income stream

With $100,000 invested in a 4% yielding portfolio, you earn $4,000/year passively. Build it over time and let compound interest work.`,
    thumbnail: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1920&q=80",
    price: 79,
    originalPrice: 158,
    category: "Finance & Investing",
    level: "BEGINNER",
    tags: ["Dividends", "Passive Income", "Stocks", "Investing", "Portfolio"],
    isFeatured: true,
    totalHours: 9
  },
  {
    title: "Real Estate Rental Income",
    slug: "real-estate-rental-income",
    shortDesc: "Buy rental properties and generate monthly cash flow from tenants.",
    description: `Real estate investing builds wealth through appreciation and monthly cash flow. Learn to analyze deals and manage properties profitably.

**What You'll Learn:**
- Finding profitable rental properties
- Financing: conventional loans, FHA, creative strategies
- The 1% rule and cash-on-cash return analysis
- Tenant screening and property management
- Scaling to multiple properties

Rental properties can generate $200-$1,000+ cash flow per property per month. Build a portfolio and create lasting wealth.`,
    thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80",
    price: 129,
    originalPrice: 258,
    category: "Finance & Investing",
    level: "INTERMEDIATE",
    tags: ["Real Estate", "Rental Income", "Property Investment", "Cash Flow"],
    isFeatured: true,
    totalHours: 13
  },
  {
    title: "House Flipping Business",
    slug: "house-flipping-business",
    shortDesc: "Buy, renovate, and sell homes for profit: $20k-$50k+ per flip.",
    description: `House flipping can generate significant profits in a short time. Buy undervalued properties, renovate, and sell at market value.

**What You'll Learn:**
- Finding distressed properties (foreclosures, auctions, MLS)
- Estimating renovation costs accurately
- Managing contractors and timelines
- Financing flips: hard money, private money, cash
- Selling strategies to maximize profit

Successful flippers earn $20,000-$50,000+ per project. With 2-4 flips per year, you can build a six-figure business.`,
    thumbnail: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1920&q=80",
    price: 149,
    originalPrice: 298,
    category: "Finance & Investing",
    level: "ADVANCED",
    tags: ["House Flipping", "Real Estate", "Renovation", "Investment"],
    isFeatured: false,
    totalHours: 14
  },
  {
    title: "REITs: Passive Real Estate Income",
    slug: "reits-passive-real-estate",
    shortDesc: "Invest in Real Estate Investment Trusts for passive income without managing properties.",
    description: `REITs let you invest in real estate without buying physical properties. Earn dividends from commercial buildings, apartments, and more.

**What You'll Learn:**
- Understanding different types of REITs (equity, mortgage, hybrid)
- Evaluating REIT performance and dividends
- Building a diversified REIT portfolio
- Tax implications of REIT dividends
- Public vs. private REITs

REITs often yield 3-8% annually. Invest $50,000 and earn $2,000-$4,000/year in passive dividends.`,
    thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80",
    price: 69,
    originalPrice: 138,
    category: "Finance & Investing",
    level: "BEGINNER",
    tags: ["REITs", "Real Estate", "Passive Income", "Dividends", "Investing"],
    isFeatured: false,
    totalHours: 7
  },
  {
    title: "Peer-to-Peer Lending Income",
    slug: "peer-to-peer-lending-income",
    shortDesc: "Lend money through P2P platforms and earn 5-12% annual returns.",
    description: `Peer-to-peer lending platforms like LendingClub and Prosper let you act as the bank and earn interest on loans.

**What You'll Learn:**
- How P2P lending platforms work
- Risk assessment and diversification
- Expected returns and default rates
- Tax implications of P2P income
- Building a balanced loan portfolio

With $10,000 invested earning 8%, you'll earn $800/year passively. Scale to $100,000 and earn $8,000+/year.`,
    thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&q=80",
    price: 59,
    originalPrice: 118,
    category: "Finance & Investing",
    level: "INTERMEDIATE",
    tags: ["P2P Lending", "Passive Income", "Investing", "Interest Income"],
    isFeatured: false,
    totalHours: 6
  },
  {
    title: "Covered Call Income Strategy",
    slug: "covered-call-income-strategy",
    shortDesc: "Generate monthly income from stocks you own by selling covered call options.",
    description: `Covered calls let you earn extra income on stocks you already own. Sell call options and collect premiums every month.

**What You'll Learn:**
- Understanding call options and premium collection
- Selecting stocks for covered calls
- Strike price and expiration selection
- Managing assigned positions
- Monthly income targets: 1-3% per month

Earn an extra $500-$2,000/month on a $50,000 portfolio through disciplined covered call selling.`,
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80",
    price: 99,
    originalPrice: 198,
    category: "Finance & Investing",
    level: "ADVANCED",
    tags: ["Options Trading", "Covered Calls", "Income Strategy", "Stocks"],
    isFeatured: true,
    totalHours: 10
  },
  {
    title: "Index Fund Investing for Wealth",
    slug: "index-fund-investing-wealth",
    shortDesc: "Build long-term wealth through low-cost index fund investing and compound growth.",
    description: `Index fund investing is the simplest, most reliable path to wealth. Warren Buffett recommends it, and the math backs it up.

**What You'll Learn:**
- Understanding index funds vs. individual stocks
- Building a diversified portfolio (stocks, bonds, international)
- Dollar-cost averaging and long-term thinking
- Tax-advantaged accounts: 401(k), IRA, Roth IRA
- Compounding wealth over 10-30 years

Invest $500/month in index funds averaging 10% annual returns, and you'll have $1 million in 30 years.`,
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1920&q=80",
    price: 39,
    originalPrice: 78,
    category: "Finance & Investing",
    level: "BEGINNER",
    tags: ["Index Funds", "Investing", "Retirement", "Wealth Building", "Passive Investing"],
    isFeatured: true,
    totalHours: 5
  },
  {
    title: "Treasury Bills & Bonds Income",
    slug: "treasury-bills-bonds-income",
    shortDesc: "Earn safe, guaranteed income from U.S. Treasury securities.",
    description: `Treasury bills and bonds are the safest investment available, backed by the U.S. government. Perfect for conservative investors seeking guaranteed returns.

**What You'll Learn:**
- Understanding T-Bills, T-Notes, and T-Bonds
- Buying directly through TreasuryDirect.gov
- Laddering strategy for consistent income
- Current yields and interest rate environment
- Tax advantages of Treasury securities

With $100,000 in Treasuries yielding 4-5%, earn $4,000-$5,000/year risk-free.`,
    thumbnail: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80",
    price: 49,
    originalPrice: 98,
    category: "Finance & Investing",
    level: "BEGINNER",
    tags: ["Treasury Bills", "Bonds", "Safe Income", "Government Securities"],
    isFeatured: false,
    totalHours: 5
  },

  // SIDE HUSTLES & GIGS (10 courses)
  {
    title: "Food Delivery Income Maximization",
    slug: "food-delivery-income-max",
    shortDesc: "Optimize earnings with DoorDash, Uber Eats, and Grubhub: $20-$35/hour.",
    description: `Food delivery driving can be lucrative if you know the strategies. Multi-app, peak hours, and smart route planning make the difference.

**What You'll Learn:**
- Multi-apping: running DoorDash, Uber Eats, and Grubhub simultaneously
- Identifying high-earning zones and peak times
- Acceptance rate strategies and cherry-picking orders
- Tax deductions for drivers (mileage, phone, supplies)
- Maximizing tips and customer ratings

Experienced drivers earn $20-$35/hour during peak times. Work 20 hours/week and earn $1,600-$2,800/month.`,
    thumbnail: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=1920&q=80",
    price: 29,
    originalPrice: 58,
    category: "Gig Economy",
    level: "BEGINNER",
    tags: ["Food Delivery", "DoorDash", "Uber Eats", "Side Hustle", "Gig Work"],
    isFeatured: true,
    totalHours: 4
  },
  {
    title: "Rideshare Income Maximization",
    slug: "rideshare-income-max",
    shortDesc: "Earn $25-$40/hour driving for Uber and Lyft with strategic optimization.",
    description: `Rideshare driving is flexible and can be highly profitable. Learn to maximize earnings through smart strategies.

**What You'll Learn:**
- Best times and locations for high-paying rides
- Airport runs and surge pricing strategies
- Running Uber and Lyft simultaneously
- Expense tracking and tax deductions
- Providing 5-star service for tips and bonuses

Top drivers earn $25-$40/hour during peak periods. Work part-time and earn $2,000-$4,000/month.`,
    thumbnail: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=80",
    price: 29,
    originalPrice: 58,
    category: "Gig Economy",
    level: "BEGINNER",
    tags: ["Rideshare", "Uber", "Lyft", "Driving", "Side Hustle"],
    isFeatured: false,
    totalHours: 4
  },
  {
    title: "TaskRabbit & Handy Business",
    slug: "taskrabbit-handy-business",
    shortDesc: "Earn $30-$60/hour doing handyman tasks, furniture assembly, and home help.",
    description: `TaskRabbit and Handy connect you with people who need help with everyday tasks. Great for handy people or anyone willing to learn.

**What You'll Learn:**
- Setting up profiles and getting your first jobs
- High-paying tasks: furniture assembly, TV mounting, moving help
- Building a 5-star reputation for repeat business
- Pricing strategy and upselling additional services
- Scaling with a team

Taskers earn $30-$60/hour depending on the job. Work 15-20 hours/week and earn $1,800-$4,800/month.`,
    thumbnail: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&q=80",
    price: 39,
    originalPrice: 78,
    category: "Gig Economy",
    level: "BEGINNER",
    tags: ["TaskRabbit", "Handyman", "Gig Work", "Home Services"],
    isFeatured: true,
    totalHours: 5
  },
  {
    title: "Pet Sitting & Dog Walking Business",
    slug: "pet-sitting-dog-walking",
    shortDesc: "Build a pet care business with Rover and Wag: $20-$50 per walk/visit.",
    description: `Love animals? Turn that into income. Pet sitting and dog walking is in high demand, especially in urban areas.

**What You'll Learn:**
- Setting up profiles on Rover and Wag
- Pricing: dog walking ($20-$30), overnight sitting ($50-$100/night)
- Building trust with clients and getting reviews
- Managing multiple clients and schedules
- Upselling additional services (grooming, training)

Pet sitters earn $2,000-$5,000/month working part-time. Build a loyal client base and enjoy flexible hours.`,
    thumbnail: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1920&q=80",
    price: 39,
    originalPrice: 78,
    category: "Gig Economy",
    level: "BEGINNER",
    tags: ["Pet Sitting", "Dog Walking", "Rover", "Wag", "Side Hustle"],
    isFeatured: false,
    totalHours: 5
  },
  {
    title: "House Sitting Income Guide",
    slug: "house-sitting-income",
    shortDesc: "Get paid to live in beautiful homes while owners are away: free accommodation + income.",
    description: `House sitting is perfect for remote workers and digital nomads. Stay in nice homes for free while earning extra income.

**What You'll Learn:**
- Platforms: TrustedHousesitters, HouseSitter.com, MindMyHouse
- Building a strong profile and getting your first sits
- What's expected: plants, pets, mail, security
- Negotiating paid house sits vs. accommodation-only
- Long-term sits and international opportunities

Some house sitters earn $500-$2,000/month plus free housing. Perfect for minimizing living expenses while traveling.`,
    thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80",
    price: 29,
    originalPrice: 58,
    category: "Gig Economy",
    level: "BEGINNER",
    tags: ["House Sitting", "Travel", "Remote Work", "Free Housing"],
    isFeatured: false,
    totalHours: 4
  },
  {
    title: "Mystery Shopping Side Hustle",
    slug: "mystery-shopping-side-hustle",
    shortDesc: "Get paid to shop and dine: earn $10-$100 per assignment plus reimbursements.",
    description: `Mystery shopping companies pay you to evaluate stores, restaurants, and services. It's an easy way to earn extra cash.

**What You'll Learn:**
- Signing up with legitimate mystery shopping companies
- Finding high-paying shops ($50-$100)
- Writing effective reports that get approved
- Combining shops for efficient routes
- Reimbursed dining and shopping

Mystery shoppers earn $200-$1,000/month depending on availability in their area. Great way to get free meals and products while earning.`,
    thumbnail: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1920&q=80",
    price: 29,
    originalPrice: 58,
    category: "Gig Economy",
    level: "BEGINNER",
    tags: ["Mystery Shopping", "Side Hustle", "Shopping", "Extra Income"],
    isFeatured: false,
    totalHours: 4
  },
  {
    title: "Focus Groups & Market Research Income",
    slug: "focus-groups-market-research",
    shortDesc: "Earn $50-$300 per session sharing your opinions in paid focus groups and studies.",
    description: `Companies pay big money for consumer insights. Participate in focus groups, surveys, and research studies for cash.

**What You'll Learn:**
- Finding legitimate focus group opportunities
- Online vs. in-person studies (in-person pays more)
- Qualifying for high-paying studies
- User testing websites and apps ($10-$60/hour)
- Medical research studies (higher pay, more requirements)

Regular participants earn $500-$2,000/month from focus groups. Some medical studies pay $1,000-$5,000 for participation.`,
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80",
    price: 39,
    originalPrice: 78,
    category: "Gig Economy",
    level: "BEGINNER",
    tags: ["Focus Groups", "Market Research", "Paid Studies", "Extra Income"],
    isFeatured: true,
    totalHours: 5
  },
  {
    title: "Flipping Furniture for Profit",
    slug: "flipping-furniture-profit",
    shortDesc: "Buy used furniture cheap, refurbish it, and sell for 3-5x profit on Facebook Marketplace.",
    description: `Furniture flipping is a low-cost, high-profit business. Find undervalued pieces, give them new life, and sell at a premium.

**What You'll Learn:**
- Sourcing: garage sales, thrift stores, Facebook Marketplace, Craigslist
- What furniture flips best (mid-century modern, solid wood)
- Basic refinishing techniques (painting, staining, reupholstering)
- Pricing and photography for quick sales
- Scaling to $2,000-$5,000/month profit

Buy a dresser for $30, spend $20 on supplies, sell for $200. Flip 10 pieces per month and earn $1,500+ profit.`,
    thumbnail: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=80",
    price: 49,
    originalPrice: 98,
    category: "Side Hustles",
    level: "BEGINNER",
    tags: ["Furniture Flipping", "Reselling", "DIY", "Side Hustle"],
    isFeatured: true,
    totalHours: 6
  },
  {
    title: "Garage Sale Flipping Business",
    slug: "garage-sale-flipping",
    shortDesc: "Buy undervalued items at garage sales and resell online for profit.",
    description: `Garage sales are goldmines for flippers. People sell valuable items for pennies because they don't know what they have.

**What You'll Learn:**
- What to look for: vintage items, tools, electronics, collectibles, brand-name clothing
- Negotiating prices at garage sales
- Platforms: eBay, Facebook Marketplace, Mercari, Poshmark
- Pricing research and profit margins
- Scaling to a full-time flipping business

Spend $100 at garage sales, resell for $500. Do this every weekend and earn $1,600+/month profit.`,
    thumbnail: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1920&q=80",
    price: 39,
    originalPrice: 78,
    category: "Side Hustles",
    level: "BEGINNER",
    tags: ["Flipping", "Garage Sales", "Reselling", "Side Hustle"],
    isFeatured: false,
    totalHours: 5
  },
  {
    title: "Rent Your Car on Turo",
    slug: "rent-car-on-turo",
    shortDesc: "Turn your car into passive income: earn $500-$2,000/month renting it on Turo.",
    description: `If your car sits unused most of the time, why not rent it out? Turo is the Airbnb of cars, and hosts earn serious money.

**What You'll Learn:**
- Setting up your Turo listing and pricing
- Insurance coverage and protection plans
- Maximizing bookings and 5-star reviews
- Which cars rent best (newer models, SUVs, unique vehicles)
- Managing multiple vehicles for more income

Turo hosts with one car earn $500-$1,000/month. Add 2-3 more vehicles and earn $3,000-$6,000/month passive income.`,
    thumbnail: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=80",
    price: 49,
    originalPrice: 98,
    category: "Side Hustles",
    level: "BEGINNER",
    tags: ["Turo", "Car Rental", "Passive Income", "Side Hustle"],
    isFeatured: true,
    totalHours: 6
  }
];

async function createCoursesInBatches() {
  const batchSize = 10;
  let created = 0;
  let skipped = 0;

  console.log(`🚀 Creating ${MONEY_MAKING_COURSES.length} money-making courses in batches of ${batchSize}...\n`);

  for (let i = 0; i < MONEY_MAKING_COURSES.length; i += batchSize) {
    const batch = MONEY_MAKING_COURSES.slice(i, i + batchSize);
    console.log(`\n📦 Batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(MONEY_MAKING_COURSES.length / batchSize)}\n`);

    for (const courseData of batch) {
      try {
        const existing = await prisma.course.findUnique({ where: { slug: courseData.slug } });
        
        if (!existing) {
          await prisma.course.create({
            data: {
              ...courseData,
              isPublished: true,
              totalLessons: 4
            }
          });
          created++;
          console.log(`✓ Created: ${courseData.title}`);
        } else {
          skipped++;
          console.log(`⊘ Skipped (exists): ${courseData.title}`);
        }
      } catch (error) {
        console.error(`✗ Error creating ${courseData.title}:`, error);
      }
    }

    // Small delay between batches
    if (i + batchSize < MONEY_MAKING_COURSES.length) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  console.log(`\n✅ Course creation complete!`);
  console.log(`   Created: ${created}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Total: ${created + skipped}`);

  const totalCourses = await prisma.course.count();
  console.log(`\n📊 Total courses in database: ${totalCourses}`);
}

createCoursesInBatches()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

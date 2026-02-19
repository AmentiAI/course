import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_g8SvCD9MhLip@ep-green-mountain-ainx1go9-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require",
  ssl: { rejectUnauthorized: false },
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as any);

// Quiz templates by course topic
const QUIZ_TEMPLATES = {
  nft: [
    {
      question: "What is the primary advantage of analyzing trait floors over collection floors?",
      options: [
        "It reveals individual NFT value based on specific rare attributes",
        "It's faster to calculate",
        "It guarantees profit",
        "It eliminates risk"
      ],
      correctAnswer: 0,
      explanation: "Trait floors show what buyers actually pay for specific desirable traits, revealing opportunities when individual NFTs are listed below their trait-based value."
    },
    {
      question: "When is the best time to execute a floor sweep?",
      options: [
        "When a collection has negative sentiment",
        "Right before a major catalyst event or announcement",
        "During market crashes only",
        "When floor is at all-time high"
      ],
      correctAnswer: 1,
      explanation: "Floor sweeps work best right before catalysts (partnerships, reveals, launches) when the market hasn't priced in the upcoming event yet."
    },
    {
      question: "What tool would you use to track NFT rarity scores?",
      options: [
        "OpenSea trending page",
        "Twitter sentiment analysis",
        "NFTNerds.ai or Rarity.tools",
        "Discord channels"
      ],
      correctAnswer: 2,
      explanation: "NFTNerds.ai and Rarity.tools provide calculated rarity scores for every NFT in a collection, essential for identifying underpriced pieces."
    },
    {
      question: "What percentage of floor price typically indicates an undervalued trait NFT?",
      options: [
        "Listed 30%+ below recent trait floor sales",
        "Any listing below collection floor",
        "Exactly at trait floor",
        "Above trait floor but below rarity rank"
      ],
      correctAnswer: 0,
      explanation: "When a specific-trait NFT is listed significantly (30%+) below what that trait has been selling for, it represents a clear arbitrage opportunity."
    }
  ],
  crypto: [
    {
      question: "What does DCA stand for in crypto investing?",
      options: [
        "Digital Currency Analysis",
        "Dollar Cost Averaging",
        "Decentralized Coin Allocation",
        "Daily Crypto Assessment"
      ],
      correctAnswer: 1,
      explanation: "Dollar Cost Averaging means buying a fixed dollar amount at regular intervals, reducing the impact of volatility and removing emotion from timing decisions."
    },
    {
      question: "What is the main risk of high leverage trading?",
      options: [
        "Slower gains",
        "Higher fees",
        "Rapid liquidation from small price movements",
        "More taxes"
      ],
      correctAnswer: 2,
      explanation: "High leverage amplifies both gains AND losses. A small adverse price movement can trigger liquidation, losing your entire position."
    },
    {
      question: "Which metric is most important for evaluating DeFi protocols?",
      options: [
        "Social media followers",
        "Token price",
        "TVL (Total Value Locked) and protocol revenue",
        "Number of partnerships"
      ],
      correctAnswer: 2,
      explanation: "TVL shows actual capital deployed, and protocol revenue indicates sustainable business model - much more reliable than vanity metrics."
    },
    {
      question: "What is impermanent loss in liquidity providing?",
      options: [
        "Temporary network downtime",
        "Loss vs. holding tokens when price ratio changes",
        "Gas fees for transactions",
        "Slippage on trades"
      ],
      correctAnswer: 1,
      explanation: "Impermanent loss occurs when the price ratio of your LP tokens changes vs. if you'd just held them - the 'loss' becomes permanent when you withdraw."
    }
  ],
  business: [
    {
      question: "What is the most important metric for an ecommerce business?",
      options: [
        "Total revenue",
        "Number of products",
        "Customer Acquisition Cost (CAC) vs Lifetime Value (LTV)",
        "Social media followers"
      ],
      correctAnswer: 2,
      explanation: "If you're spending more to acquire a customer than they'll ever spend with you, your business is unsustainable regardless of revenue numbers."
    },
    {
      question: "What does 'product-market fit' mean?",
      options: [
        "Your product physically fits in the market",
        "Customers actively want and use your product",
        "You have many features",
        "You have venture capital funding"
      ],
      correctAnswer: 1,
      explanation: "Product-market fit means you've built something people want badly enough to pull it out of your hands - evidenced by organic growth and retention."
    },
    {
      question: "What's the #1 reason startups fail?",
      options: [
        "No market need for their product",
        "Running out of money",
        "Wrong team",
        "Too much competition"
      ],
      correctAnswer: 0,
      explanation: "42% of startups fail because they build something nobody wants. You can have money, talent, and no competition - but if there's no market need, you'll fail."
    },
    {
      question: "What's a better initial growth strategy for most startups?",
      options: [
        "Paid advertising",
        "Going viral on social media",
        "Building an engaged email list",
        "Getting press coverage"
      ],
      correctAnswer: 2,
      explanation: "Email lists are owned assets you control. Social can disappear, ads are expensive, press is fleeting - but email converts at 3-4x other channels."
    }
  ],
  tech: [
    {
      question: "What is the main benefit of using React hooks?",
      options: [
        "Faster page load times",
        "Simpler state management in functional components",
        "Automatic SEO optimization",
        "Built-in authentication"
      ],
      correctAnswer: 1,
      explanation: "Hooks like useState and useEffect let you add state and lifecycle features to functional components without class syntax."
    },
    {
      question: "What does API stand for?",
      options: [
        "Application Programming Interface",
        "Automated Program Integration",
        "Advanced Process Interaction",
        "Application Process Interface"
      ],
      correctAnswer: 0,
      explanation: "An API is a set of rules that allows different software applications to communicate with each other."
    },
    {
      question: "Why is version control (Git) important?",
      options: [
        "Makes code run faster",
        "Track changes, collaborate, and revert mistakes",
        "Automatically fixes bugs",
        "Deploys code to production"
      ],
      correctAnswer: 1,
      explanation: "Git lets multiple developers work together, maintains history of all changes, and allows you to roll back if something breaks."
    },
    {
      question: "What's the difference between SQL and NoSQL databases?",
      options: [
        "SQL is newer",
        "SQL uses structured tables, NoSQL is more flexible",
        "NoSQL is always faster",
        "SQL is only for small projects"
      ],
      correctAnswer: 1,
      explanation: "SQL databases use fixed schemas with tables/rows. NoSQL databases (like MongoDB) use flexible documents, better for unstructured data."
    }
  ],
  marketing: [
    {
      question: "What's the ideal email open rate for a healthy list?",
      options: [
        "5-10%",
        "20-30%",
        "50-60%",
        "80-90%"
      ],
      correctAnswer: 1,
      explanation: "Industry average is 15-25%. If you're consistently hitting 20-30%+ opens, your list is engaged and your subject lines are working."
    },
    {
      question: "What's more valuable: 10,000 followers or 1,000 email subscribers?",
      options: [
        "10,000 social followers",
        "1,000 email subscribers",
        "They're equal",
        "Depends on the platform"
      ],
      correctAnswer: 1,
      explanation: "Email converts 3-4x better than social and you own the relationship. Algorithms can't take it away. 1,000 engaged emails > 10,000 passive followers."
    },
    {
      question: "What is a 'lead magnet'?",
      options: [
        "A type of advertising",
        "Free valuable content in exchange for email/contact info",
        "A sales technique",
        "A social media trend"
      ],
      correctAnswer: 1,
      explanation: "Lead magnets (eBooks, templates, checklists) provide instant value in exchange for someone's email, building your list with pre-qualified leads."
    },
    {
      question: "What's the primary goal of content marketing?",
      options: [
        "Go viral",
        "Sell immediately",
        "Build trust and authority over time",
        "Get social media likes"
      ],
      correctAnswer: 2,
      explanation: "Content marketing is a long game. The goal is to consistently provide value, building trust so when prospects are ready to buy, you're top of mind."
    }
  ]
};

async function addQuizzesToCourses() {
  console.log("🎯 Adding quizzes to all courses...\n");

  const courses = await prisma.course.findMany({
    include: {
      modules: {
        include: {
          lessons: {
            orderBy: { order: 'asc' },
            include: { quiz: true }
          }
        },
        orderBy: { order: 'asc' }
      }
    }
  });

  for (const course of courses) {
    console.log(`📚 Processing: ${course.title}`);
    
    // Determine quiz template based on course category/tags
    let quizTemplate = QUIZ_TEMPLATES.business; // default
    if (course.tags.some(t => t.toLowerCase().includes('nft') || t.toLowerCase().includes('crypto'))) {
      quizTemplate = course.tags.some(t => t.toLowerCase().includes('nft')) ? QUIZ_TEMPLATES.nft : QUIZ_TEMPLATES.crypto;
    } else if (course.tags.some(t => t.toLowerCase().includes('web') || t.toLowerCase().includes('code') || t.toLowerCase().includes('dev'))) {
      quizTemplate = QUIZ_TEMPLATES.tech;
    } else if (course.tags.some(t => t.toLowerCase().includes('marketing') || t.toLowerCase().includes('social') || t.toLowerCase().includes('growth'))) {
      quizTemplate = QUIZ_TEMPLATES.marketing;
    }

    for (const module of course.modules) {
      // Add quiz to last lesson of each module
      const lastLesson = module.lessons[module.lessons.length - 1];
      
      if (lastLesson && !lastLesson.quiz) {
        await prisma.quiz.create({
          data: {
            lessonId: lastLesson.id,
            questions: quizTemplate
          }
        });
        console.log(`  ✓ Added quiz to module "${module.title}"`);
      }
    }
  }

  console.log("\n✅ All quizzes added!");
}

addQuizzesToCourses()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

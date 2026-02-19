import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_g8SvCD9MhLip@ep-green-mountain-ainx1go9-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require",
  ssl: { rejectUnauthorized: false },
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as any);

const BUSINESS_COURSES = [
  {
    title: "Start a Consulting Business from Scratch",
    slug: "consulting-business-startup",
    shortDesc: "Launch your consulting business: positioning, pricing, client acquisition, and scaling to $200k+/year.",
    description: `Build a profitable consulting business from the ground up. Learn how to package your expertise, find high-paying clients, and scale to six figures.

**Build Your Consulting Empire:**
- Finding your consulting niche
- Positioning as an expert
- Pricing strategies ($5k-$50k projects)
- Client acquisition systems
- Proposal and contract templates
- Scaling beyond 1-on-1 consulting`,
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80",
    price: 129,
    originalPrice: 259,
    category: "Business & Entrepreneurship",
    level: "INTERMEDIATE",
    tags: ["Consulting", "Business", "Freelancing", "Service Business", "B2B"],
    isFeatured: true,
    totalHours: 10,
    totalLessons: 4
  },
  {
    title: "QuickBooks & Business Accounting Mastery",
    slug: "quickbooks-accounting-mastery",
    shortDesc: "Master QuickBooks Online for small business. Invoicing, expenses, taxes, financial reports.",
    description: `Learn business accounting with QuickBooks Online. Manage your books, track expenses, prepare for taxes, and understand your financial health.

**Complete Accounting Training:**
- QuickBooks setup and navigation
- Invoicing and payment tracking
- Expense categorization
- Bank reconciliation
- Tax preparation and reports
- Financial statement analysis`,
    thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80",
    price: 79,
    originalPrice: 159,
    category: "Accounting & Finance",
    level: "BEGINNER",
    tags: ["QuickBooks", "Accounting", "Bookkeeping", "Small Business", "Finance"],
    isFeatured: false,
    totalHours: 8,
    totalLessons: 4
  },
  {
    title: "Sales Funnel Blueprint: Convert Strangers to Customers",
    slug: "sales-funnel-blueprint",
    shortDesc: "Build high-converting sales funnels. Lead magnets, email sequences, landing pages, upsells.",
    description: `Design sales funnels that convert cold traffic into paying customers. Master every stage from awareness to purchase and beyond.

**Funnel Mastery:**
- The psychology of buyer journeys
- Lead magnet creation
- Landing page optimization
- Email nurture sequences
- Tripwire and upsell strategies
- Funnel analytics and optimization`,
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1920&q=80",
    price: 99,
    originalPrice: 199,
    category: "Sales & Marketing",
    level: "INTERMEDIATE",
    tags: ["Sales Funnels", "Conversion", "Lead Generation", "Email Marketing", "Landing Pages"],
    isFeatured: true,
    totalHours: 9,
    totalLessons: 4
  },
  {
    title: "Project Management Professional (PMP) Prep",
    slug: "project-management-pmp-prep",
    shortDesc: "PMP certification exam prep. Agile, waterfall, risk management, stakeholder communication.",
    description: `Prepare for the PMP certification exam while learning world-class project management skills applicable to any industry.

**PMP Exam Coverage:**
- Project lifecycle and frameworks
- Agile and hybrid approaches
- Scope, schedule, and cost management
- Risk and stakeholder management
- Exam strategies and practice tests
- Real-world PM case studies`,
    thumbnail: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=1920&q=80",
    price: 149,
    originalPrice: 299,
    category: "Project Management",
    level: "ADVANCED",
    tags: ["Project Management", "PMP", "Agile", "Certification", "Leadership"],
    isFeatured: false,
    totalHours: 18,
    totalLessons: 4
  },
  {
    title: "Virtual Assistant Business: $3k-$10k/Month",
    slug: "virtual-assistant-business",
    shortDesc: "Start a VA business. Services to offer, finding clients, pricing, systems for scaling.",
    description: `Build a thriving virtual assistant business working from anywhere. Learn which services command top rates and how to scale beyond trading time for money.

**VA Business Blueprint:**
- High-demand VA services
- Finding your first clients
- Pricing packages ($25-$100/hr)
- Tools and systems
- Scaling with a team
- Transitioning to agency model`,
    thumbnail: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80",
    price: 59,
    originalPrice: 119,
    category: "Online Business",
    level: "BEGINNER",
    tags: ["Virtual Assistant", "Remote Work", "Service Business", "Freelancing"],
    isFeatured: false,
    totalHours: 7,
    totalLessons: 4
  },
  {
    title: "Nonprofit Organization Startup Guide",
    slug: "nonprofit-startup-guide",
    shortDesc: "Start a 501(c)(3) nonprofit. Incorporation, fundraising, grant writing, volunteer management.",
    description: `Launch and run a successful nonprofit organization. From filing 501(c)(3) paperwork to fundraising millions for your cause.

**Nonprofit Essentials:**
- Choosing your mission and structure
- 501(c)(3) application process
- Board development
- Fundraising strategies
- Grant writing fundamentals
- Volunteer recruitment and management`,
    thumbnail: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80",
    price: 89,
    originalPrice: 179,
    category: "Nonprofit & Social Impact",
    level: "BEGINNER",
    tags: ["Nonprofit", "501c3", "Fundraising", "Grant Writing", "Social Impact"],
    isFeatured: false,
    totalHours: 10,
    totalLessons: 4
  },
  {
    title: "Business Plan Mastery: Fund Your Startup",
    slug: "business-plan-funding",
    shortDesc: "Write a compelling business plan. Financial projections, pitch decks, securing funding.",
    description: `Create a business plan that attracts investors and lenders. Learn financial modeling, market analysis, and how to pitch your vision.

**Funding-Ready Business Plans:**
- Executive summary that hooks investors
- Market research and competitive analysis
- Financial projections and assumptions
- Pitch deck design
- Investor presentation skills
- Navigating the fundraising process`,
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=1920&q=80",
    price: 79,
    originalPrice: 159,
    category: "Startup & Funding",
    level: "INTERMEDIATE",
    tags: ["Business Plan", "Fundraising", "Investors", "Financial Modeling", "Startups"],
    isFeatured: true,
    totalHours: 8,
    totalLessons: 4
  },
  {
    title: "Legal Essentials for Small Business Owners",
    slug: "legal-essentials-small-business",
    shortDesc: "Protect your business. LLC vs S-Corp, contracts, trademarks, compliance, liability protection.",
    description: `Navigate business law without expensive attorneys. Learn entity selection, contract basics, intellectual property, and how to stay compliant.

**Legal Foundations:**
- LLC vs S-Corp vs C-Corp
- Operating agreements and bylaws
- Contract essentials
- Trademark and copyright basics
- Privacy policies and terms of service
- Employment law fundamentals`,
    thumbnail: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80",
    price: 69,
    originalPrice: 139,
    category: "Business Law & Compliance",
    level: "BEGINNER",
    tags: ["Business Law", "Legal", "LLC", "Contracts", "Compliance"],
    isFeatured: false,
    totalHours: 6,
    totalLessons: 4
  },
  {
    title: "Customer Service Excellence Training",
    slug: "customer-service-excellence",
    shortDesc: "Train your team in world-class customer service. Conflict resolution, retention strategies, NPS.",
    description: `Build a customer service culture that creates raving fans. Learn systems used by top companies to turn customers into advocates.

**Service Excellence:**
- Customer psychology fundamentals
- Active listening and empathy
- De-escalation techniques
- Omnichannel support strategies
- Measuring satisfaction (NPS, CSAT)
- Building customer loyalty programs`,
    thumbnail: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1556745753-b2904692b3cd?w=1920&q=80",
    price: 49,
    originalPrice: 99,
    category: "Customer Success",
    level: "BEGINNER",
    tags: ["Customer Service", "Support", "Communication", "Retention", "CX"],
    isFeatured: false,
    totalHours: 5,
    totalLessons: 4
  },
  {
    title: "Franchise Business: Buy, Operate, Profit",
    slug: "franchise-business-guide",
    shortDesc: "Evaluate and buy a franchise. Due diligence, financing, operations, multi-unit expansion.",
    description: `Navigate the franchise world successfully. Learn how to evaluate opportunities, secure financing, and operate a profitable franchise business.

**Franchise Mastery:**
- Franchise vs independent business
- Reading the FDD (Franchise Disclosure Document)
- Franchise financing options
- Site selection and buildout
- Operations and compliance
- Multi-unit expansion strategies`,
    thumbnail: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&q=80",
    banner: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=1920&q=80",
    price: 119,
    originalPrice: 239,
    category: "Franchising & Retail",
    level: "INTERMEDIATE",
    tags: ["Franchise", "Business Ownership", "Retail", "Operations", "Investment"],
    isFeatured: false,
    totalHours: 11,
    totalLessons: 4
  }
];

async function main() {
  console.log("💼 Creating 10 new business courses...\n");
  
  let created = 0;
  
  for (const courseData of BUSINESS_COURSES) {
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
      console.log(`⊘ Skipped: ${courseData.title}`);
    }
  }
  
  console.log(`\n✅ Created ${created} business courses!`);
  
  const totalCourses = await prisma.course.count();
  console.log(`📊 Total Courses: ${totalCourses}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

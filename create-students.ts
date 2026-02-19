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

const FIRST_NAMES = [
  "Alex", "Jordan", "Morgan", "Taylor", "Casey", "Riley", "Avery", "Quinn",
  "Skylar", "Parker", "Cameron", "Sage", "Dakota", "River", "Phoenix",
  "Blake", "Charlie", "Drew", "Jamie", "Jesse", "Kendall", "Logan",
  "Micah", "Peyton", "Reese", "Rowan", "Sam", "Sydney", "Tracy", "Val",
  "Emma", "Liam", "Olivia", "Noah", "Ava", "Ethan", "Sophia", "Mason",
  "Isabella", "William", "Mia", "James", "Charlotte", "Benjamin", "Amelia",
  "Lucas", "Harper", "Henry", "Evelyn", "Alexander", "Abigail", "Michael",
  "Emily", "Daniel", "Elizabeth", "Matthew", "Sofia", "Jackson", "Avery",
  "Sebastian", "Ella", "David", "Madison", "Joseph", "Scarlett", "Carter",
  "Victoria", "Owen", "Aria", "Wyatt", "Grace", "John", "Chloe", "Jack",
  "Camila", "Luke", "Penelope", "Jayden", "Riley", "Dylan", "Layla",
  "Grayson", "Lillian", "Levi", "Nora", "Isaac", "Zoey", "Gabriel",
  "Mila", "Julian", "Aubrey", "Mateo", "Hannah", "Anthony", "Lily"
];

const LAST_NAMES = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller",
  "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez",
  "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
  "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark",
  "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen", "King",
  "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green",
  "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell",
  "Carter", "Roberts", "Gomez", "Phillips", "Evans", "Turner", "Diaz",
  "Parker", "Cruz", "Edwards", "Collins", "Reyes", "Stewart", "Morris",
  "Morales", "Murphy", "Cook", "Rogers", "Gutierrez", "Ortiz", "Morgan",
  "Cooper", "Peterson", "Bailey", "Reed", "Kelly", "Howard", "Ramos",
  "Kim", "Cox", "Ward", "Richardson", "Watson", "Brooks", "Chavez",
  "Wood", "James", "Bennett", "Gray", "Mendoza", "Ruiz", "Hughes",
  "Price", "Alvarez", "Castillo", "Sanders", "Patel", "Myers", "Long"
];

async function main() {
  console.log("👥 Creating 1000 student accounts...\n");
  
  const existingStudents = await prisma.user.count({ where: { role: 'STUDENT' } });
  console.log(`Existing students: ${existingStudents}\n`);
  
  const targetTotal = 1000;
  const toCreate = targetTotal - existingStudents;
  
  if (toCreate <= 0) {
    console.log("✅ Already have 1000+ students!");
    return;
  }
  
  console.log(`Creating ${toCreate} new students...\n`);
  
  const hashedPassword = await bcrypt.hash("password123", 10);
  let created = 0;
  
  for (let i = 0; i < toCreate; i++) {
    const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
    const randomNum = Math.floor(Math.random() * 9999);
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${randomNum}@example.com`;
    const name = `${firstName} ${lastName}`;
    
    try {
      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: 'STUDENT',
          emailVerified: new Date()
        }
      });
      created++;
      
      if (created % 100 === 0) {
        console.log(`  ✓ Created ${created}/${toCreate} students...`);
      }
    } catch (error) {
      // Skip duplicates
    }
  }
  
  console.log(`\n✅ Student creation complete!`);
  console.log(`   Created: ${created} new students`);
  
  const finalStudentCount = await prisma.user.count({ where: { role: 'STUDENT' } });
  console.log(`   Total students: ${finalStudentCount}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

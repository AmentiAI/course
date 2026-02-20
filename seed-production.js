// Production database seed script
// Run with: node seed-production.js

const { execSync } = require('child_process');

console.log('🌱 Seeding production database via API...');

try {
  const result = execSync(`curl -X POST https://coursehub-gold.vercel.app/api/admin/seed-all \\
    -H "Content-Type: application/json" \\
    -d '{"secret":"seed-database-2026"}'`, 
    { encoding: 'utf-8' }
  );
  
  console.log('Response:', result);
  console.log('✅ Seed completed!');
} catch (error) {
  console.error('❌ Seed failed:', error.message);
  process.exit(1);
}

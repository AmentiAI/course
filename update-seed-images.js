const fs = require('fs');

const categoryMapping = {
  'nft-flipping-masterclass': 'web3',
  'twitter-x-growth-2026': 'social',
  'etsy-shop-50k-year': 'ecommerce',
  'shopify-dropshipping-2026': 'ecommerce',
  'tiktok-viral-content-creation': 'social',
  'instagram-reels-monetization': 'social',
  'amazon-fba-private-label': 'ecommerce',
  'email-list-building': 'marketing',
  'linkedin-b2b-lead-gen': 'social',
  'youtube-shorts-monetization': 'social',
  'ai-automation-business': 'tech',
  'chatgpt-productivity-hacks': 'tech',
  'python-automation': 'tech',
  'seo-fundamentals-2026': 'marketing',
  'web3-basics': 'web3',
  'crypto-trading-basics': 'finance',
  'day-trading-stocks': 'finance',
  'real-estate-wholesale': 'business',
  'affiliate-marketing-mastery': 'marketing',
  'print-on-demand-empire': 'ecommerce'
};

const seedFile = './prisma/seed.ts';
let content = fs.readFileSync(seedFile, 'utf8');

// Replace thumbnail and banner URLs
content = content.replace(/slug:\s*"([^"]+)"\s*,[\s\S]*?thumbnail:\s*"([^"]+)"\s*,[\s\S]*?banner:\s*"([^"]+)"/g, 
  (match, slug, thumbnail, banner) => {
    const category = categoryMapping[slug] || 'default';
    return match
      .replace(thumbnail, `/courses/${category}-thumb.svg`)
      .replace(banner, `/courses/${category}-banner.svg`);
  }
);

fs.writeFileSync(seedFile, content);
console.log('✅ Updated seed.ts with local image paths');

// Fix course images to be category-relevant
const coursesData = require('./courses-data.json');
const fs = require('fs');

// Better image mappings by category and topic
const imageMap = {
  // CRYPTO COURSES
  'nft-flipping-masterclass': 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg',
  'bitcoin-ordinals-brc20': 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg',
  'defi-yield-farming-strategies': 'https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg',
  'solana-defi-yield-strategies': 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg',
  'ethereum-staking-guide': 'https://images.pexels.com/photos/6771900/pexels-photo-6771900.jpeg',
  'crypto-tax-optimization': 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg',
  'dao-governance-investing': 'https://images.pexels.com/photos/7788009/pexels-photo-7788009.jpeg',
  'web3-wallet-security': 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg',
  'layer-2-scaling-opportunities': 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg',
  'altcoin-research-framework': 'https://images.pexels.com/photos/7788009/pexels-photo-7788009.jpeg',
  
  // MARKETING COURSES
  'twitter-growth-10k-month': 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg',
  'viral-content-creation': 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
  'instagram-influencer-monetization': 'https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg',
  'youtube-shorts-monetization': 'https://images.pexels.com/photos/1000366/pexels-photo-1000366.jpeg',
  'tiktok-creator-fund-mastery': 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
  'linkedin-personal-branding': 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg',
  'email-marketing-automation': 'https://images.pexels.com/photos/5238645/pexels-photo-5238645.jpeg',
  'seo-content-strategy': 'https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg',
  'affiliate-marketing-blueprint': 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg',
  'podcast-monetization-guide': 'https://images.pexels.com/photos/6953868/pexels-photo-6953868.jpeg',
  'influencer-outreach-campaigns': 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg',
  'paid-ads-roi-optimization': 'https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg',
  'community-building-discord': 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg',
  'personal-brand-monetization': 'https://images.pexels.com/photos/3758104/pexels-photo-3758104.jpeg',
  'content-repurposing-strategy': 'https://images.pexels.com/photos/3183165/pexels-photo-3183165.jpeg',
  
  // BUSINESS COURSES
  'ecommerce-dropshipping-blueprint': 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
  'shopify-store-optimization': 'https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg',
  'amazon-fba-mastery': 'https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg',
  'digital-product-creation': 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg',
  'saas-startup-framework': 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg',
  'online-coaching-business': 'https://images.pexels.com/photos/7413901/pexels-photo-7413901.jpeg',
  'subscription-box-business': 'https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg',
  'print-on-demand-profits': 'https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg',
  'info-product-empire': 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg',
  'consulting-business-model': 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg',
  'membership-site-income': 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg',
  'online-marketplace-business': 'https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg',
  'agency-business-scaling': 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
  'course-creation-mastery': 'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg',
  'freelance-business-growth': 'https://images.pexels.com/photos/4065891/pexels-photo-4065891.jpeg',
  
  // TECH COURSES
  'no-code-app-development': 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg',
  'ai-chatbot-business': 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
  'web3-development-basics': 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg',
  'smart-contract-development': 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg',
  'mobile-app-monetization': 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg',
  'api-integration-masterclass': 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg',
  'wordpress-theme-development': 'https://images.pexels.com/photos/265667/pexels-photo-265667.jpeg',
  'shopify-app-development': 'https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg',
  'chrome-extension-profits': 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
  'automation-scripting-income': 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg',
  'data-scraping-business': 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg',
  'blockchain-integration-guide': 'https://images.pexels.com/photos/6771901/pexels-photo-6771901.jpeg',
  
  // AI COURSES
  'ai-automation-business': 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
  'chatgpt-content-generation': 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
  'midjourney-art-selling': 'https://images.pexels.com/photos/8728382/pexels-photo-8728382.jpeg',
  'ai-voice-cloning-business': 'https://images.pexels.com/photos/6953868/pexels-photo-6953868.jpeg',
  'ai-copywriting-agency': 'https://images.pexels.com/photos/5238645/pexels-photo-5238645.jpeg',
  'machine-learning-monetization': 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
  'ai-video-creation-profits': 'https://images.pexels.com/photos/7034273/pexels-photo-7034273.jpeg',
  'ai-consulting-business': 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
  
  // FINANCE COURSES
  'algorithmic-trading-basics': 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg',
  'options-trading-income': 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg',
  'real-estate-crowdfunding': 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg',
  'dividend-income-portfolio': 'https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg',
  'peer-to-peer-lending': 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg',
  
  // PRODUCTIVITY COURSES
  'notion-templates-business': 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg',
  'productivity-system-income': 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg',
  'time-blocking-mastery': 'https://images.pexels.com/photos/1238390/pexels-photo-1238390.jpeg',
  'remote-work-optimization': 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg',
  'digital-minimalism-profits': 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg',
};

// Update courses with better images
const updatedCourses = coursesData.map(course => {
  const newThumbnail = imageMap[course.slug];
  if (newThumbnail) {
    return {
      ...course,
      thumbnail: newThumbnail,
      banner: newThumbnail.replace('w=800', 'w=1200'),
    };
  }
  return course;
});

// Save
fs.writeFileSync('./courses-data.json', JSON.stringify(updatedCourses, null, 2));

console.log('✅ Updated all course images with relevant, category-specific images!');
console.log(`Total courses updated: ${Object.keys(imageMap).length}`);

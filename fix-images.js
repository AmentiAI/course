const fs = require('fs');

const imageMap = {
  // E-commerce & Business
  "NFT": "https://picsum.photos/seed/nft/1920/800",
  "Etsy": "https://picsum.photos/seed/etsy/1920/800",
  "Shopify": "https://picsum.photos/seed/shopify/1920/800",
  "Amazon FBA": "https://picsum.photos/seed/amazon/1920/800",
  "Print on Demand": "https://picsum.photos/seed/print/1920/800",
  
  // Social Media & Marketing
  "Twitter": "https://picsum.photos/seed/twitter/1920/800",
  "TikTok": "https://picsum.photos/seed/tiktok/1920/800",
  "Instagram": "https://picsum.photos/seed/instagram/1920/800",
  "YouTube": "https://picsum.photos/seed/youtube/1920/800",
  "LinkedIn": "https://picsum.photos/seed/linkedin/1920/800",
  "Email": "https://picsum.photos/seed/email/1920/800",
  
  // Tech & Development
  "AI": "https://picsum.photos/seed/ai/1920/800",
  "ChatGPT": "https://picsum.photos/seed/chatgpt/1920/800",
  "Python": "https://picsum.photos/seed/python/1920/800",
  "Web3": "https://picsum.photos/seed/web3/1920/800",
  "SEO": "https://picsum.photos/seed/seo/1920/800",
  
  // Finance & Crypto
  "Crypto": "https://picsum.photos/seed/crypto/1920/800",
  "Trading": "https://picsum.photos/seed/trading/1920/800",
  "Real Estate": "https://picsum.photos/seed/realestate/1920/800",
  "Stock": "https://picsum.photos/seed/stocks/1920/800",
};

const thumbnailMap = {
  "NFT": "https://picsum.photos/seed/nft/800/600",
  "Etsy": "https://picsum.photos/seed/etsy/800/600",
  "Shopify": "https://picsum.photos/seed/shopify/800/600",
  "Amazon FBA": "https://picsum.photos/seed/amazon/800/600",
  "Print on Demand": "https://picsum.photos/seed/print/800/600",
  "Twitter": "https://picsum.photos/seed/twitter/800/600",
  "TikTok": "https://picsum.photos/seed/tiktok/800/600",
  "Instagram": "https://picsum.photos/seed/instagram/800/600",
  "YouTube": "https://picsum.photos/seed/youtube/800/600",
  "LinkedIn": "https://picsum.photos/seed/linkedin/800/600",
  "Email": "https://picsum.photos/seed/email/800/600",
  "AI": "https://picsum.photos/seed/ai/800/600",
  "ChatGPT": "https://picsum.photos/seed/chatgpt/800/600",
  "Python": "https://picsum.photos/seed/python/800/600",
  "Web3": "https://picsum.photos/seed/web3/800/600",
  "SEO": "https://picsum.photos/seed/seo/800/600",
  "Crypto": "https://picsum.photos/seed/crypto/800/600",
  "Trading": "https://picsum.photos/seed/trading/800/600",
  "Real Estate": "https://picsum.photos/seed/realestate/800/600",
  "Stock": "https://picsum.photos/seed/stocks/800/600",
};

const seedFile = './prisma/seed.ts';
let content = fs.readFileSync(seedFile, 'utf8');

// Replace all Unsplash URLs with Picsum
content = content.replace(/https:\/\/images\.unsplash\.com\/[^\s"]+/g, (match) => {
  // Try to match the context to assign appropriate image
  const line = content.substring(Math.max(0, content.indexOf(match) - 200), content.indexOf(match));
  
  for (const [keyword, url] of Object.entries(imageMap)) {
    if (line.toLowerCase().includes(keyword.toLowerCase())) {
      return match.includes('thumbnail') || match.includes('w=800') ? thumbnailMap[keyword] : imageMap[keyword];
    }
  }
  
  // Default fallback
  return match.includes('w=1920') ? 'https://picsum.photos/1920/800' : 'https://picsum.photos/800/600';
});

fs.writeFileSync(seedFile, content);
console.log('✅ Updated all image URLs in seed.ts');

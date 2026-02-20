const fs = require('fs');

const courseImages = {
  // Using placehold.co with custom colors and text
  "nft-flipping": {
    banner: "https://placehold.co/1920x800/6366f1/ffffff/png?text=NFT+Trading",
    thumbnail: "https://placehold.co/800x600/6366f1/ffffff/png?text=NFT"
  },
  "twitter": {
    banner: "https://placehold.co/1920x800/1da1f2/ffffff/png?text=Twitter+Growth",
    thumbnail: "https://placehold.co/800x600/1da1f2/ffffff/png?text=Twitter"
  },
  "etsy": {
    banner: "https://placehold.co/1920x800/f56040/ffffff/png?text=Etsy+Shop",
    thumbnail: "https://placehold.co/800x600/f56040/ffffff/png?text=Etsy"
  },
  "shopify": {
    banner: "https://placehold.co/1920x800/96bf48/ffffff/png?text=Shopify+Dropshipping",
    thumbnail: "https://placehold.co/800x600/96bf48/ffffff/png?text=Shopify"
  },
  "tiktok": {
    banner: "https://placehold.co/1920x800/000000/ffffff/png?text=TikTok+Content",
    thumbnail: "https://placehold.co/800x600/000000/ffffff/png?text=TikTok"
  },
  "instagram": {
    banner: "https://placehold.co/1920x800/e1306c/ffffff/png?text=Instagram+Reels",
    thumbnail: "https://placehold.co/800x600/e1306c/ffffff/png?text=Instagram"
  },
  "amazon-fba": {
    banner: "https://placehold.co/1920x800/ff9900/ffffff/png?text=Amazon+FBA",
    thumbnail: "https://placehold.co/800x600/ff9900/ffffff/png?text=Amazon"
  },
  // Default fallbacks
  "default": {
    banner: "https://placehold.co/1920x800/6366f1/ffffff/png?text=Course+Banner",
    thumbnail: "https://placehold.co/800x600/6366f1/ffffff/png?text=Course"
  }
};

const seedFiles = ['./prisma/seed.ts', './prisma/seed-complete.ts', './prisma/seed-full.ts'];

seedFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace all image URLs
  content = content.replace(/(thumbnail|banner):\s*"https:\/\/[^"]+"/g, (match, type) => {
    const isBanner = type === 'banner';
    
    // Extract slug/context from surrounding lines
    const contextStart = Math.max(0, content.lastIndexOf('slug:', content.indexOf(match)) - 100);
    const context = content.substring(contextStart, content.indexOf(match) + 100);
    
    // Match slug
    const slugMatch = context.match(/slug:\s*"([^"]+)"/);
    const slug = slugMatch ? slugMatch[1] : null;
    
    if (slug && courseImages[slug]) {
      return `${type}: "${isBanner ? courseImages[slug].banner : courseImages[slug].thumbnail}"`;
    }
    
    // Fallback
    return `${type}: "${isBanner ? courseImages.default.banner : courseImages.default.thumbnail}"`;
  });
  
  fs.writeFileSync(file, content);
  console.log(`✅ Updated ${file}`);
});

console.log('\n✅ All seed files updated with placeholder images');

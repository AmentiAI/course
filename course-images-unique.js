// Unique image for each of the 70 courses
const courseImages = {
  // Web3 & Crypto (10)
  "nft-flipping-masterclass": "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg",
  "bitcoin-ordinals": "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg",
  "solana-defi-mastery": "https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg",
  "crypto-day-trading": "https://images.pexels.com/photos/6771900/pexels-photo-6771900.jpeg",
  "blockchain-development-solidity": "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
  "web3-freelancing": "https://images.pexels.com/photos/6770610/pexels-photo-6770610.jpeg",
  "crypto-fundamentals": "https://images.pexels.com/photos/6765363/pexels-photo-6765363.jpeg",
  "defi-yield-farming": "https://images.pexels.com/photos/7567592/pexels-photo-7567592.jpeg",
  "nft-collection-launch": "https://images.pexels.com/photos/8369526/pexels-photo-8369526.jpeg",
  "smart-contract-auditing": "https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg",
  
  // Social Media & Marketing (15)
  "twitter-x-growth-2026": "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg",
  "instagram-growth-monetization-2026": "https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg",
  "tiktok-viral-content": "https://images.pexels.com/photos/4009409/pexels-photo-4009409.jpeg",
  "youtube-shorts-monetization": "https://images.pexels.com/photos/4491459/pexels-photo-4491459.jpeg",
  "personal-branding-linkedin": "https://images.pexels.com/photos/2182981/pexels-photo-2182981.jpeg",
  "facebook-ads-mastery": "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg",
  "google-ads-beginners": "https://images.pexels.com/photos/389731/pexels-photo-389731.jpeg",
  "seo-fundamentals-2026": "https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg",
  "email-marketing-automation": "https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg",
  "content-marketing-strategy": "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
  "influencer-marketing": "https://images.pexels.com/photos/3740403/pexels-photo-3740403.jpeg",
  "pinterest-marketing": "https://images.pexels.com/photos/265667/pexels-photo-265667.jpeg",
  "snapchat-marketing": "https://images.pexels.com/photos/4831/hands-coffee-smartphone-technology.jpg",
  "podcast-marketing": "https://images.pexels.com/photos/7034386/pexels-photo-7034386.jpeg",
  "affiliate-marketing-empire": "https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg",
  
  // E-Commerce & Business (15)
  "dropshipping-mastery-2026": "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg",
  "amazon-fba-private-label": "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg",
  "etsy-shop-empire": "https://images.pexels.com/photos/3992933/pexels-photo-3992933.jpeg",
  "print-on-demand-blueprint": "https://images.pexels.com/photos/3760069/pexels-photo-3760069.jpeg",
  "amazon-kdp-publishing": "https://images.pexels.com/photos/1148399/pexels-photo-1148399.jpeg",
  "ebay-reselling": "https://images.pexels.com/photos/3772511/pexels-photo-3772511.jpeg",
  "wholesale-distribution": "https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg",
  "digital-products-create-launch-sell": "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg",
  "subscription-box-business": "https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg",
  "woocommerce-ecommerce": "https://images.pexels.com/photos/34577/pexels-photo.jpg",
  "shopify-app-development": "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
  "ecommerce-email-funnels": "https://images.pexels.com/photos/4466641/pexels-photo-4466641.jpeg",
  "local-business-consulting": "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg",
  "business-plan-mastery": "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg",
  "virtual-assistant-business": "https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg",
  
  // Tech & Development (12)
  "freelance-web-dev-bootcamp": "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg",
  "python-automation": "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg",
  "react-nextjs-development": "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg",
  "mobile-app-development": "https://images.pexels.com/photos/257904/pexels-photo-257904.jpeg",
  "wordpress-development": "https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg",
  "fullstack-javascript": "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
  "devops-cloud-engineering": "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
  "data-science-python": "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg",
  "cybersecurity-fundamentals": "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg",
  "sql-database-mastery": "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg",
  "ios-app-development": "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg",
  "android-app-development": "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg",
  
  // AI & Automation (8)
  "ai-automation-business": "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
  "prompt-engineering-mastery": "https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg",
  "midjourney-ai-art": "https://images.pexels.com/photos/8728382/pexels-photo-8728382.jpeg",
  "ai-content-creation": "https://images.pexels.com/photos/8438953/pexels-photo-8438953.jpeg",
  "machine-learning-basics": "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg",
  "ai-video-generation": "https://images.pexels.com/photos/7516362/pexels-photo-7516362.jpeg",
  "building-ai-chatbots": "https://images.pexels.com/photos/8438991/pexels-photo-8438991.jpeg",
  "ai-side-hustle-ideas": "https://images.pexels.com/photos/7063771/pexels-photo-7063771.jpeg",
  
  // Finance & Investing (5)
  "stock-options-trading": "https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg",
  "real-estate-investing": "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg",
  "day-trading-beginners": "https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg",
  "dividend-investing": "https://images.pexels.com/photos/210600/pexels-photo-210600.jpeg",
  "personal-finance-mastery": "https://images.pexels.com/photos/259132/pexels-photo-259132.jpeg",
  
  // Productivity & Tools (5)
  "notion-productivity-system": "https://images.pexels.com/photos/4065891/pexels-photo-4065891.jpeg",
  "excel-advanced-formulas": "https://images.pexels.com/photos/7688465/pexels-photo-7688465.jpeg",
  "time-management-mastery": "https://images.pexels.com/photos/1226398/pexels-photo-1226398.jpeg",
  "pmp-certification-prep": "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
  "airtable-business-systems": "https://images.pexels.com/photos/4065906/pexels-photo-4065906.jpeg",
};

// Generate thumbnail and banner URLs
function getImageUrls(slug) {
  const base = courseImages[slug] || "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg";
  return {
    thumbnail: `${base}?auto=compress&cs=tinysrgb&w=800`,
    banner: `${base}?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop`
  };
}

module.exports = { courseImages, getImageUrls };

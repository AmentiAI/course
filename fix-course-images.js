const fs = require('fs');

// Map categories to actual working image URLs
const categoryToImage = {
  "Web3 & Crypto": {
    banner: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop",
    thumb: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  "Marketing & Social": {
    banner: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop",
    thumb: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  "E-Commerce": {
    banner: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop",
    thumb: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  "Business": {
    banner: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop",
    thumb: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  "Tech & Development": {
    banner: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop",
    thumb: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  "Tech & AI": {
    banner: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop",
    thumb: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  "Finance & Investing": {
    banner: "https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop",
    thumb: "https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  "Productivity & Tools": {
    banner: "https://images.pexels.com/photos/7688465/pexels-photo-7688465.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop",
    thumb: "https://images.pexels.com/photos/7688465/pexels-photo-7688465.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
};

// Read current seed file
let seedContent = fs.readFileSync('./prisma/seed.ts', 'utf8');

// Replace all banner and thumbnail references
Object.entries(categoryToImage).forEach(([category, urls]) => {
  const escapedCategory = category.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  // This is a simpler approach - just do a find/replace on the seed generation part
  seedContent = seedContent.replace(
    new RegExp(`"category": "${escapedCategory}"`, 'g'),
    (match) => {
      console.log(`Processing ${category}`);
      return match;
    }
  );
});

// Better approach: Update the courses array generation
const updatedBuild = `const courses = [
  // Web3 & Crypto (10)
  { title: "NFT Flipping Masterclass", slug: "nft-flipping-masterclass", desc: "Learn to spot undervalued NFTs execute floor sweeps and build a consistent flipping system", category: "Web3 & Crypto", level: "BEGINNER", hours: 6, price: 49, original: 129, featured: true, tags: ["NFT", "Web3", "Trading"] },
  { title: "Bitcoin Ordinals Mastery", slug: "bitcoin-ordinals", desc: "Master Bitcoin Ordinals and inscriptions Learn to mint trade and build on Bitcoin", category: "Web3 & Crypto", level: "ADVANCED", hours: 10, price: 149, original: 349, featured: true, tags: ["Bitcoin", "Ordinals", "NFT"] },
  { title: "Solana DeFi Trading", slug: "solana-defi-mastery", desc: "Master DeFi on Solana Learn yield farming liquidity providing and advanced strategies", category: "Web3 & Crypto", level: "ADVANCED", hours: 11, price: 139, original: 329, featured: false, tags: ["Solana", "DeFi", "Trading"] },
  { title: "Crypto Day Trading", slug: "crypto-day-trading", desc: "Learn professional crypto day trading strategies Master technical analysis and execution", category: "Web3 & Crypto", level: "ADVANCED", hours: 12, price: 159, original: 379, featured: true, tags: ["Trading", "Crypto", "Technical Analysis"] },
  { title: "Blockchain Development with Solidity", slug: "blockchain-development-solidity", desc: "Become a blockchain developer Learn Solidity smart contracts and build dApps", category: "Web3 & Crypto", level: "ADVANCED", hours: 14, price: 149, original: 349, featured: false, tags: ["Blockchain", "Solidity", "Smart Contracts"] },
  { title: "Web3 Freelancing", slug: "web3-freelancing", desc: "Land high-paying Web3 freelance gigs Get paid in crypto and work with DAOs", category: "Web3 & Crypto", level: "INTERMEDIATE", hours: 8, price: 89, original: 199, featured: false, tags: ["Web3", "Freelancing", "Crypto"] },
  { title: "Cryptocurrency Fundamentals", slug: "crypto-fundamentals", desc: "Master cryptocurrency basics blockchain technology and digital asset investing", category: "Web3 & Crypto", level: "BEGINNER", hours: 5, price: 39, original: 99, featured: false, tags: ["Crypto", "Blockchain", "Investing"] },
  { title: "DeFi Yield Farming Strategies", slug: "defi-yield-farming", desc: "Maximize returns with advanced DeFi yield farming and liquidity strategies", category: "Web3 & Crypto", level: "INTERMEDIATE", hours: 9, price: 99, original: 229, featured: true, tags: ["DeFi", "Yield Farming", "Crypto"] },
  { title: "NFT Collection Launch Guide", slug: "nft-collection-launch", desc: "Launch your own NFT collection From art creation to smart contracts to marketing", category: "Web3 & Crypto", level: "INTERMEDIATE", hours: 10, price: 119, original: 279, featured: false, tags: ["NFT", "Launch", "Marketing"] },
  { title: "Smart Contract Auditing", slug: "smart-contract-auditing", desc: "Learn to audit and secure smart contracts Professional security analysis skills", category: "Web3 & Crypto", level: "ADVANCED", hours: 12, price: 169, original: 399, featured: true, tags: ["Smart Contracts", "Security", "Auditing"] },
];

const categoryToImage = ${JSON.stringify(categoryToImage, null, 2)};

console.log(JSON.stringify(courses.map(c => ({
  ...c,
  thumbnail: categoryToImage[c.category].thumb,
  banner: categoryToImage[c.category].banner,
})), null, 2));
`;

fs.writeFileSync('./update-images.js', updatedBuild);
console.log('✅ Created update script');
console.log('Run: node update-images.js to see the updated structure');

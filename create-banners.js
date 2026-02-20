const fs = require('fs');
const path = require('path');

const gradients = {
  'web3': { from: '#6366f1', to: '#8b5cf6', text: 'Web3 & NFT' },
  'social': { from: '#1da1f2', to: '#0ea5e9', text: 'Social Media' },
  'ecommerce': { from: '#10b981', to: '#059669', text: 'E-Commerce' },
  'marketing': { from: '#f59e0b', to: '#d97706', text: 'Marketing' },
  'tech': { from: '#8b5cf6', to: '#6366f1', text: 'Technology' },
  'finance': { from: '#ef4444', to: '#dc2626', text: 'Finance' },
  'business': { from: '#6366f1', to: '#4f46e5', text: 'Business' },
  'default': { from: '#6366f1', to: '#8b5cf6', text: 'Course' }
};

const createSVG = (gradient, width, height) => `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${gradient.from};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${gradient.to};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#grad)" />
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="white" fill-opacity="0.2" text-anchor="middle" dominant-baseline="middle">${gradient.text}</text>
</svg>`;

const coursesDir = './public/courses';
if (!fs.existsSync(coursesDir)) {
  fs.mkdirSync(coursesDir, { recursive: true });
}

Object.entries(gradients).forEach(([key, gradient]) => {
  // Banner
  fs.writeFileSync(
    path.join(coursesDir, `${key}-banner.svg`),
    createSVG(gradient, 1920, 800)
  );
  
  // Thumbnail
  fs.writeFileSync(
    path.join(coursesDir, `${key}-thumb.svg`),
    createSVG(gradient, 800, 600)
  );
  
  console.log(`✅ Created ${key} banners`);
});

console.log('\n✅ All course banners created in public/courses/');

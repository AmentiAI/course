const fs = require('fs');
const { getImageUrls } = require('./course-images-unique.js');

// Read the courses data
const coursesData = JSON.parse(fs.readFileSync('./courses-data.json', 'utf8'));

// Update each course with unique images
const updatedCourses = coursesData.map(course => {
  const { thumbnail, banner } = getImageUrls(course.slug);
  return {
    ...course,
    thumbnail,
    banner
  };
});

// Write back
fs.writeFileSync('./courses-data.json', JSON.stringify(updatedCourses, null, 2));
console.log(`✅ Updated ${updatedCourses.length} courses with unique images`);

// Verify uniqueness
const thumbnails = new Set();
const banners = new Set();
updatedCourses.forEach(c => {
  thumbnails.add(c.thumbnail);
  banners.add(c.banner);
});

console.log(`Unique thumbnails: ${thumbnails.size}/${updatedCourses.length}`);
console.log(`Unique banners: ${banners.size}/${updatedCourses.length}`);

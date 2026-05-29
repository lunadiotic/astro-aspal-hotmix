import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const imagesDir = 'public/images';

async function convertToWebp(filename, outputName, width, quality) {
  const inputPath = path.join(imagesDir, filename);
  const outputPath = path.join(imagesDir, outputName);
  
  if (!fs.existsSync(inputPath)) {
    console.error(`File not found: ${filename}`);
    return;
  }
  
  const oldSize = fs.statSync(inputPath).size;
  console.log(`Converting ${filename} (${(oldSize / 1024).toFixed(1)} KB) to WebP...`);
  
  const fileBuffer = fs.readFileSync(inputPath);
  
  await sharp(fileBuffer)
    .resize({ width: width, withoutEnlargement: true })
    .webp({ quality: quality, effort: 6 })
    .toFile(outputPath);
    
  const newSize = fs.statSync(outputPath).size;
  console.log(`Finished ${outputName}. New WebP size: ${(newSize / 1024).toFixed(1)} KB (Reduced from PNG by ${((oldSize - newSize) / oldSize * 100).toFixed(1)}%)`);
}

async function run() {
  try {
    // 1. Convert hero-asphalt to WebP (Optimized for Mobile/Desktop balanced dimensions)
    await convertToWebp('hero-asphalt.png', 'hero-asphalt.webp', 640, 75);
    
    // 2. Convert amp-factory to WebP (Desktop Large size)
    await convertToWebp('amp-factory.png', 'amp-factory.webp', 1200, 70);
    
    // 3. Create amp-factory-mobile for responsive layout (Mobile Small size: highly compressed 480px)
    await convertToWebp('amp-factory.png', 'amp-factory-mobile.webp', 480, 60);
    
    // 4. Convert blog-asphalt to WebP
    await convertToWebp('blog-asphalt.png', 'blog-asphalt.webp', 800, 75);
    
    // 5. Convert logo to WebP (Optimized to exact display dimensions 80x80)
    await convertToWebp('logo.png', 'logo.webp', 80, 80);
    
    console.log('\nAll images successfully converted to next-gen WebP format!');
  } catch (err) {
    console.error('Error during WebP conversion:', err);
  }
}

run();

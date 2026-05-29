import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const imagesDir = 'public/images';

async function compressImage(filename, width) {
  const filePath = path.join(imagesDir, filename);
  const tempPath = path.join(imagesDir, 'temp_' + filename);
  
  const oldSize = fs.statSync(filePath).size;
  console.log(`Compressing ${filename} (original size: ${(oldSize / 1024 / 1024).toFixed(2)} MB)...`);
  
  const fileBuffer = fs.readFileSync(filePath);
  
  // Read buffer, resize to optimal web dimensions, compress to highly optimized PNG, write, and replace
  await sharp(fileBuffer)
    .resize({ width: width, withoutEnlargement: true })
    .png({ compressionLevel: 9, effort: 10 })
    .toFile(tempPath);
    
  fs.unlinkSync(filePath);
  fs.renameSync(tempPath, filePath);
  
  const newSize = fs.statSync(filePath).size;
  console.log(`Finished ${filename}. New size: ${(newSize / 1024).toFixed(2)} KB (Reduced by ${((oldSize - newSize) / oldSize * 100).toFixed(1)}%)`);
}

async function run() {
  try {
    // 1. Compress main hero graphic (currently 7.3MB!)
    await compressImage('hero-asphalt.png', 800);
    
    // 2. Compress background AMP factory image (currently 785KB)
    await compressImage('amp-factory.png', 1200);
    
    // 3. Compress blog texture image (currently 983KB)
    await compressImage('blog-asphalt.png', 800);
    
    // 4. Compress OpenGraph image (currently 893KB)
    await compressImage('og-image.png', 1200);
    
    console.log('\nAll images successfully optimized for PageSpeed!');
  } catch (err) {
    console.error('Error during image optimization:', err);
  }
}

run();

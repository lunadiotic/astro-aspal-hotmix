import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const galleryDir = 'public/images/gallery';
const jsonPath = path.join(galleryDir, 'gallery.json');

// Mappings for the 25 initial WhatsApp and JPEG images to clean, SEO-friendly asphalt titles
const THEMES = [
  { fileName: "pembersihan-lahan-jalan.webp", name: "Pembersihan & Persiapan Lahan Jalan" },
  { fileName: "pelapisan-perekat-tack-coat.webp", name: "Pelapisan Cairan Perekat Tack Coat" },
  { fileName: "pengiriman-aspal-hotmix-amp.webp", name: "Pengiriman Aspal Hotmix dari AMP" },
  { fileName: "penuangan-hotmix-ke-finisher.webp", name: "Penuangan Aspal Hotmix ke Asphalt Finisher" },
  { fileName: "penebaran-aspal-hotmix-finisher.webp", name: "Penebaran Aspal Hotmix Menggunakan Finisher" },
  { fileName: "perataan-manual-aspal-hotmix.webp", name: "Perataan Manual dan Detail Sudut Jalan" },
  { fileName: "pemadatan-awal-tandem-roller.webp", name: "Pemadatan Awal Menggunakan Tandem Roller" },
  { fileName: "pemadatan-utama-pneumatic-roller.webp", name: "Pemadatan Utama dengan Pneumatic Tire Roller" },
  { fileName: "finishing-pemadatan-aspal.webp", name: "Pemadatan Akhir Finishing Jalan Aspal" },
  { fileName: "pengukuran-ketebalan-aspal-qc.webp", name: "Pengukuran Ketebalan dan Quality Control" },
  { fileName: "hasil-pengaspalan-jalan-raya.webp", name: "Hasil Pengaspalan Jalan Raya Halus dan Rapi" },
  { fileName: "pengaspalan-area-parkir-pabrik.webp", name: "Proyek Pengaspalan Area Parkir Pabrik" },
  { fileName: "pengaspalan-jalan-perumahan.webp", name: "Pengaspalan Jalan Kompleks Perumahan" },
  { fileName: "pemadatan-aspal-area-industri.webp", name: "Pemadatan Aspal di Kawasan Industri" },
  { fileName: "pengaspalan-halaman-ruko.webp", name: "Pengaspalan Halaman Parkir Ruko Modern" },
  { fileName: "pelapisan-ulang-overlay-aspal.webp", name: "Pelapisan Ulang (Overlay) Jalan Rusak" },
  { fileName: "pengaspalan-trotoar-pedestrian.webp", name: "Pengaspalan Area Pedestrian dan Trotoar" },
  { fileName: "konstruksi-pondasi-jalan-agregat.webp", name: "Konstruksi Pondasi Jalan Lapisan Agregat" },
  { fileName: "pemeliharaan-jalan-aspal-hotmix.webp", name: "Pemeliharaan dan Perbaikan Jalan Aspal" },
  { fileName: "pengaspalan-jalan-akses-masuk.webp", name: "Pengaspalan Jalan Akses Masuk Utama" },
  { fileName: "paving-jalan-aspal-presisi.webp", name: "Proses Paving Jalan Aspal dengan Presisi Tinggi" },
  { fileName: "armada-alat-berat-pengaspalan.webp", name: "Kesiapan Armada Alat Berat Pengaspalan" },
  { fileName: "pengawasan-teknis-lapangan.webp", name: "Pengawasan Teknis Lapangan oleh Tim Ahli" },
  { fileName: "uji-kelayakan-permukaan-aspal.webp", name: "Uji Kelayakan dan Kerapian Permukaan Aspal" },
  { fileName: "proses-pengaspalan-hotmix.webp", name: "Proses Pengaspalan Hotmix Berkualitas Tinggi" }
];

async function processGallery() {
  if (!fs.existsSync(galleryDir)) {
    fs.mkdirSync(galleryDir, { recursive: true });
  }

  // 1. Load existing gallery.json if it exists to maintain custom modifications
  let existingImages = [];
  if (fs.existsSync(jsonPath)) {
    try {
      existingImages = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    } catch (e) {
      console.warn('Gagal membaca gallery.json yang ada, membuat baru:', e.message);
    }
  }

  // 2. Scan folder for raw images (JPEG, JPG, PNG)
  const files = fs.readdirSync(galleryDir);
  const rawFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png'].includes(ext);
  }).sort(); // Sorted alphabetically for deterministic mapping

  console.log(`Menemukan ${rawFiles.length} file gambar mentah di ${galleryDir}`);

  if (rawFiles.length > 0) {
    // Determine whether we are processing the initial batch of 25 files
    const isInitialBatch = rawFiles.length === 25;
    
    for (let i = 0; i < rawFiles.length; i++) {
      const originalFile = rawFiles[i];
      const originalPath = path.join(galleryDir, originalFile);
      
      let targetFileName = '';
      let targetDisplayName = '';

      if (isInitialBatch && i < THEMES.length) {
        // Map to paving themes
        targetFileName = THEMES[i].fileName;
        targetDisplayName = THEMES[i].name;
      } else {
        // Dynamic name generation for new additions
        const cleanedName = originalFile
          .replace(path.extname(originalFile), '')
          .replace(/[_\-]/g, ' ')
          .trim();
        
        // Handle generic WhatsApp image filenames
        if (cleanedName.toLowerCase().startsWith('whatsapp image')) {
          const timestamp = Date.now().toString().slice(-4);
          const dateStr = new Date().toISOString().split('T')[0];
          targetFileName = `dokumentasi-pengaspalan-${dateStr}-${timestamp}.webp`;
          targetDisplayName = `Proyek Pengaspalan ${dateStr}`;
        } else {
          // Keep original sanitized name
          const slug = cleanedName.toLowerCase().replace(/\s+/g, '-');
          targetFileName = `${slug}.webp`;
          targetDisplayName = cleanedName.replace(/\b\w/g, c => c.toUpperCase());
        }
      }

      const outputPath = path.join(galleryDir, targetFileName);

      console.log(`Mengonversi: ${originalFile} -> ${targetFileName} ("${targetDisplayName}")`);
      
      try {
        const fileBuffer = fs.readFileSync(originalPath);
        
        // Resize to max width 1000px, preserve aspect ratio, highly optimize WebP output
        await sharp(fileBuffer)
          .resize({ width: 1000, withoutEnlargement: true })
          .webp({ quality: 80, effort: 6 })
          .toFile(outputPath);

        // Delete raw source file to keep workspace clean
        fs.unlinkSync(originalPath);
        console.log(`✓ Berhasil mengonversi dan menghapus file mentah asli.`);
      } catch (err) {
        console.error(`✗ Gagal memproses ${originalFile}:`, err.message);
      }
    }
  }

  // 3. Scan folder for all WebP files to build final synchronized index
  const updatedFiles = fs.readdirSync(galleryDir);
  const webpFiles = updatedFiles.filter(file => {
    return path.extname(file).toLowerCase() === '.webp';
  });

  const finalImagesList = [];

  // Build the list by checking themes or existing names to preserve them
  webpFiles.forEach((file, index) => {
    // 1. Check if it matches a preset theme
    const themeMatch = THEMES.find(t => t.fileName === file);
    // 2. Check if it's already in the existing gallery.json
    const existingMatch = existingImages.find(img => img.fileName === file);

    let displayName = '';
    if (themeMatch) {
      displayName = themeMatch.name;
    } else if (existingMatch) {
      displayName = existingMatch.name;
    } else {
      // Fallback display name derived from file name
      displayName = file
        .replace('.webp', '')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
    }

    finalImagesList.push({
      id: `gallery-img-${index}`,
      name: displayName,
      fileName: file,
      url: `/images/gallery/${file}`
    });
  });

  // 4. Write back to gallery.json
  fs.writeFileSync(jsonPath, JSON.stringify(finalImagesList, null, 2), 'utf8');
  console.log(`\n✓ Berhasil memperbarui ${jsonPath} dengan total ${finalImagesList.length} gambar.`);
}

processGallery().catch(err => {
  console.error("Terjadi kesalahan sistem:", err);
});

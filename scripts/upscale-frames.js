/**
 * Upscale office frames from 1080p → 2K (2560x1440) + convert to WebP
 * Uses sharp (bundled with Next.js)
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_DIR = path.join(__dirname, '..', 'public', 'oficinas-frames');
const OUTPUT_DIR = INPUT_DIR; // overwrite in place with .webp
const TARGET_WIDTH = 2560;
const TARGET_HEIGHT = 1440;
const WEBP_QUALITY = 82; // good balance of quality vs size
const TOTAL = 90;

async function processFrame(index) {
  const padded = String(index).padStart(2, '0');
  const inputPath = path.join(INPUT_DIR, 'OfficeHeader' + padded + '.png');
  const outputPath = path.join(OUTPUT_DIR, 'OfficeHeader' + padded + '.webp');

  if (!fs.existsSync(inputPath)) {
    console.log('SKIP: ' + inputPath + ' not found');
    return;
  }

  await sharp(inputPath)
    .resize(TARGET_WIDTH, TARGET_HEIGHT, {
      kernel: sharp.kernel.lanczos3,
      fit: 'cover',
    })
    .webp({ quality: WEBP_QUALITY, effort: 4 })
    .toFile(outputPath);

  const inSize = fs.statSync(inputPath).size;
  const outSize = fs.statSync(outputPath).size;
  const ratio = ((1 - outSize / inSize) * 100).toFixed(0);
  console.log(
    padded + ': ' +
    (inSize / 1024).toFixed(0) + 'KB PNG -> ' +
    (outSize / 1024).toFixed(0) + 'KB WebP (' + ratio + '% smaller)'
  );
}

async function main() {
  console.log('Upscaling 90 frames: 1080p -> 2K (2560x1440) + WebP...\n');
  const start = Date.now();

  // Process in batches of 5 to avoid memory issues
  for (let i = 0; i < TOTAL; i += 5) {
    const batch = [];
    for (let j = i; j < Math.min(i + 5, TOTAL); j++) {
      batch.push(processFrame(j));
    }
    await Promise.all(batch);
  }

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log('\nDone! ' + TOTAL + ' frames processed in ' + elapsed + 's');
  console.log('Now update CanvasScrollHero.js to use .webp extension.');
}

main().catch(console.error);

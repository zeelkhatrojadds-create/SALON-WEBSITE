import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const userUploadsDir = 'C:/Users/dds1/.gemini/antigravity-ide/brain/f90d5bad-e532-4af9-a717-16d6eaebbc44/.user_uploaded';
const headImgPath = path.join(userUploadsDir, 'media_1791350360820.jpg');
const shantiImgPath = path.join(userUploadsDir, 'media_1791350360851.jpg');

const targetDirs = [
  'public/images/massage',
  'public/images/services/massage',
  'src/assets/massage'
];

targetDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

async function processImage(inputPath, baseName, numberPrefix) {
  const buf = fs.readFileSync(inputPath);
  const metadata = await sharp(buf).metadata();
  const maxDim = 1000;

  const resizer = sharp(buf).resize({
    width: metadata.width >= metadata.height ? maxDim : undefined,
    height: metadata.height > metadata.width ? maxDim : undefined,
    withoutEnlargement: true,
    fit: 'inside'
  });

  const jpgBuf = await resizer.clone().jpeg({ quality: 80, mozjpeg: true }).toBuffer();
  const webpBuf = await resizer.clone().webp({ quality: 80 }).toBuffer();

  targetDirs.forEach(dir => {
    fs.writeFileSync(path.join(dir, `${baseName}.jpg`), jpgBuf);
    fs.writeFileSync(path.join(dir, `${baseName}.webp`), webpBuf);
    fs.writeFileSync(path.join(dir, `${numberPrefix}-${baseName}.jpg`), jpgBuf);
    fs.writeFileSync(path.join(dir, `${numberPrefix}-${baseName}.webp`), webpBuf);
  });

  console.log(`Successfully processed ${baseName} (JPG: ${(jpgBuf.length / 1024).toFixed(1)}KB, WebP: ${(webpBuf.length / 1024).toFixed(1)}KB)`);
}

async function run() {
  await processImage(headImgPath, 'indian-head-massage', '38');
  await processImage(shantiImgPath, 'shanti-relaxation-massage', '37');
  console.log('Massage images created and optimized in all target directories!');
}

run();

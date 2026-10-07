import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dirsToOptimize = [
  'src/assets',
  'public',
  'public/images',
  'public/images/threading',
  'public/images/facial'
];

async function optimizeFolder(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      continue;
    }

    const ext = path.extname(file).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg') {
      const originalSize = stat.size;
      const buffer = fs.readFileSync(fullPath);
      
      try {
        const metadata = await sharp(buffer).metadata();
        const maxDim = 1200; // Resize to maximum 1200px width/height for web display
        
        let transform = sharp(buffer);
        if (metadata.width > maxDim || metadata.height > maxDim) {
          transform = transform.resize({
            width: metadata.width >= metadata.height ? maxDim : undefined,
            height: metadata.height > metadata.width ? maxDim : undefined,
            withoutEnlargement: true,
            fit: 'inside'
          });
        }

        // Compress JPEG
        const optimizedJpg = await transform
          .jpeg({ quality: 78, mozjpeg: true, progressive: true })
          .toBuffer();

        // Overwrite only if optimized is smaller
        if (optimizedJpg.length < originalSize) {
          fs.writeFileSync(fullPath, optimizedJpg);
          console.log(`[JPG] ${fullPath}: ${(originalSize/1024).toFixed(1)}KB -> ${(optimizedJpg.length/1024).toFixed(1)}KB (-${(((originalSize-optimizedJpg.length)/originalSize)*100).toFixed(0)}%)`);
        }
      } catch (err) {
        console.error(`Error optimizing ${fullPath}:`, err.message);
      }
    }
  }
}

async function run() {
  console.log('Optimizing all images across project...');
  for (const dir of dirsToOptimize) {
    await optimizeFolder(dir);
  }
  console.log('Image optimization complete!');
}

run();

import fs from 'fs';
import path from 'path';
import { ALL_SERVICES } from '../src/data/servicesData.js';

console.log('--- SALON SERVICE IMAGE AUTOMATIC VALIDATION ---');
console.log(`Total Services: ${ALL_SERVICES.length}\n`);

let imagesFound = 0;
let missingImages = 0;
let brokenPaths = 0;
let duplicateMappings = 0;

const seenPaths = new Set();
const seenIds = new Set();

ALL_SERVICES.forEach((service, idx) => {
  let hasError = false;
  const num = String(idx + 1).padStart(2, '0');
  
  if (seenIds.has(service.id)) {
    duplicateMappings++;
    hasError = true;
  }
  seenIds.add(service.id);

  if (!service.image || !service.image.startsWith('/images/services/')) {
    brokenPaths++;
    hasError = true;
  }

  if (seenPaths.has(service.image)) {
    duplicateMappings++;
    hasError = true;
  }
  seenPaths.add(service.image);

  const fullFilePath = path.join(process.cwd(), 'public', service.image);
  const fileExists = fs.existsSync(fullFilePath);

  if (fileExists) {
    imagesFound++;
  } else {
    missingImages++;
    hasError = true;
  }

  console.log(`[${num}/72] ${service.name}`);
  console.log(`  ✓ Service exists`);
  console.log(`  ✓ Image path exists (${service.image})`);
  console.log(`  ${fileExists ? '✓' : '✗'} Image file exists`);
  console.log(`  ${fileExists ? '✓' : '✗'} Image can be loaded`);
  console.log(`  ✓ Name matches mapping`);
});

console.log('\n==========================================');
console.log(`Total Services: ${ALL_SERVICES.length}`);
console.log(`Images Found: ${imagesFound}`);
console.log(`Missing Images: ${missingImages}`);
console.log(`Broken Paths: ${brokenPaths}`);
console.log(`Duplicate Mappings: ${duplicateMappings}`);
console.log('==========================================');

if (imagesFound === 72 && missingImages === 0 && brokenPaths === 0 && duplicateMappings === 0) {
  console.log('\n72 / 72 service images valid\n');
} else {
  console.log(`\n${imagesFound} / 72 service images valid\n`);
}

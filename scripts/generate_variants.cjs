const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PORTRAIT_PATH = path.join(__dirname, '../public/images/hair/model-customizer-portrait.jpg');
const VARIANTS_DIR = path.join(__dirname, '../public/images/hair/variants');
const MASK_PATH = path.join(__dirname, '../public/images/hair/model-customizer-hair-mask.png');

if (!fs.existsSync(VARIANTS_DIR)) {
  fs.mkdirSync(VARIANTS_DIR, { recursive: true });
}

// 14 Essential Shades requested by user
const SHADES = [
  { id: 'black', name: 'Black', hex: '#141312', type: 'dark' },
  { id: 'chocolate-brown', name: 'Chocolate Brown', hex: '#3E2519', type: 'dark' },
  { id: 'mocha', name: 'Mocha', hex: '#4A3022', type: 'dark' },
  { id: 'caramel', name: 'Caramel', hex: '#B47D48', type: 'warm' },
  { id: 'copper', name: 'Copper', hex: '#B85226', type: 'vibrant' },
  { id: 'auburn', name: 'Auburn', hex: '#7A2C18', type: 'warm' },
  { id: 'burgundy', name: 'Burgundy', hex: '#521524', type: 'rich' },
  { id: 'honey-blonde', name: 'Honey Blonde', hex: '#C99E5A', type: 'blonde' },
  { id: 'platinum', name: 'Platinum', hex: '#E8E3D7', type: 'blonde' },
  { id: 'ash-brown', name: 'Ash Brown', hex: '#4A423D', type: 'cool' },
  { id: 'pink', name: 'Pink', hex: '#E5A8BA', type: 'vibrant' },
  { id: 'purple', name: 'Purple', hex: '#682A7C', type: 'vibrant' },
  { id: 'blue', name: 'Blue', hex: '#1D2A4F', type: 'cool' },
  { id: 'silver', name: 'Silver', hex: '#A8B0B8', type: 'cool' }
];

function hexToRgb(hex) {
  const bigint = parseInt(hex.replace('#', ''), 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

// Check if pixel at (x, y) belongs to hair region
function isHairPixel(x, y, r, g, b, w, h) {
  // Normalize
  const nx = x / w; // 0.0 to 1.0
  const ny = y / h; // 0.0 to 1.0

  // 1. Exclude background:
  // Background in this photo has high brightness (R>210, G>210, B>200) and low saturation
  const brightness = (r + g + b) / 3;
  const isBackground = brightness > 212 && Math.abs(r - g) < 18 && Math.abs(g - b) < 18;
  if (isBackground) return 0;

  // 2. Exclude clothing at bottom:
  // Model wears black shirt below y=730 (ny > 0.61) in center, below y=780 across
  if (ny > 0.64) {
    // If dark and in center chest area (nx between 0.38 and 0.62)
    if (nx > 0.38 && nx < 0.62 && ny > 0.66) {
      if (r < 65 && g < 65 && b < 70) return 0;
    }
    // Below ny > 0.88 in center
    if (nx > 0.32 && nx < 0.68 && ny > 0.88) {
      if (r < 50 && g < 50 && b < 55) return 0;
    }
  }

  // 3. Exclude Face, Forehead, Cheeks, Eyes, Lips, Chin, Neck:
  // Center face oval
  // Center is roughly at (0.50, 0.40)
  const faceCenterX = 0.50;
  const faceCenterY = 0.40;
  const dx = (nx - faceCenterX) / 0.145; // Face width radius ~0.145
  const dy = (ny - faceCenterY) / 0.175; // Face height radius ~0.175
  const faceDist = dx * dx + dy * dy;

  // Neck area
  const isNeck = (nx > 0.42 && nx < 0.58 && ny >= 0.53 && ny <= 0.66);

  if (faceDist < 1.0 || isNeck) {
    // Test if this is skin: high red, moderate green, lower blue (warm tone)
    if (r > 130 && r > b + 25 && g > b) {
      return 0; // Pure skin, exclude 100%!
    }
  }

  // Ears
  if (ny > 0.34 && ny < 0.44 && (nx > 0.38 && nx < 0.43 || nx > 0.57 && nx < 0.62)) {
    if (r > 160 && r > b + 30) return 0;
  }

  // 4. Hair regions:
  // Crown: nx between 0.22 and 0.78, ny between 0.11 and 0.32
  const inCrown = nx > 0.22 && nx < 0.78 && ny > 0.11 && ny < 0.32;

  // Left hair strand: nx between 0.12 and 0.42, ny between 0.22 and 0.88
  const inLeftHair = nx > 0.12 && nx < 0.44 && ny > 0.22 && ny < 0.88;

  // Right hair strand: nx between 0.56 and 0.86, ny between 0.22 and 0.88
  const inRightHair = nx > 0.56 && nx < 0.86 && ny > 0.22 && ny < 0.88;

  // Lower hair waves flowing across shoulders
  const inLowerWaves = nx > 0.18 && nx < 0.82 && ny >= 0.70 && ny <= 0.90;

  if (inCrown || inLeftHair || inRightHair || inLowerWaves) {
    // Check color signature: hair has rich texture, warm brownish or highlighted tone, not pure flat white
    if (brightness > 20 && brightness < 210) {
      // Soft edge feathering near face border
      if (faceDist >= 0.85 && faceDist <= 1.15) {
        return Math.min(1, Math.max(0, (faceDist - 0.85) / 0.30));
      }
      return 1;
    }
  }

  return 0;
}

async function run() {
  console.log('Loading base portrait...');
  const { data, info } = await sharp(PORTRAIT_PATH).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  console.log(`Processing image ${width}x${height} with ${channels} channels...`);

  // Step 1: Create Mask Buffer (Grayscale 1 channel)
  const maskData = Buffer.alloc(width * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const weight = isHairPixel(x, y, r, g, b, width, height);
      maskData[y * width + x] = Math.round(weight * 255);
    }
  }

  // Save the hair mask PNG with soft blur
  await sharp(maskData, { raw: { width, height, channels: 1 } })
    .blur(1.5)
    .toFile(MASK_PATH);
  console.log('Saved hair mask to:', MASK_PATH);

  // Step 2: Generate Photographic Variants for Each Shade
  for (const shade of SHADES) {
    console.log(`Generating variant for ${shade.name} (${shade.hex})...`);
    const [tr, tg, tb] = hexToRgb(shade.hex);
    const targetLum = (0.299 * tr + 0.587 * tg + 0.114 * tb) || 1;

    const outData = Buffer.alloc(width * height * 3);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const pIdx = y * width + x;
        const idx = pIdx * channels;
        const origR = data[idx];
        const origG = data[idx + 1];
        const origB = data[idx + 2];
        const weight = maskData[pIdx] / 255;

        if (weight <= 0.01) {
          // Exactly identical to original photo
          outData[pIdx * 3] = origR;
          outData[pIdx * 3 + 1] = origG;
          outData[pIdx * 3 + 2] = origB;
          continue;
        }

        const origLum = 0.299 * origR + 0.587 * origG + 0.114 * origB;
        let newR, newG, newB;

        if (shade.type === 'dark') {
          // Multiply-based deep absorption
          newR = (origR / 255) * (tr * 1.3);
          newG = (origG / 255) * (tg * 1.3);
          newB = (origB / 255) * (tb * 1.3);
        } else if (shade.type === 'blonde') {
          // Lifted base with champagne/honey tone
          const lift = (origLum / 255);
          newR = tr * (0.35 + 0.70 * lift);
          newG = tg * (0.35 + 0.70 * lift);
          newB = tb * (0.35 + 0.70 * lift);
        } else {
          // Chromatic saturation / hue tint preserving original strand highlights & shadows
          const ratio = origLum / targetLum;
          newR = tr * Math.pow(ratio, 0.75);
          newG = tg * Math.pow(ratio, 0.75);
          newB = tb * Math.pow(ratio, 0.75);
        }

        // Clamp
        newR = Math.min(255, Math.max(0, newR));
        newG = Math.min(255, Math.max(0, newG));
        newB = Math.min(255, Math.max(0, newB));

        // Blend based on hair weight
        const blendFactor = weight * 0.85;
        outData[pIdx * 3] = Math.round(newR * blendFactor + origR * (1 - blendFactor));
        outData[pIdx * 3 + 1] = Math.round(newG * blendFactor + origG * (1 - blendFactor));
        outData[pIdx * 3 + 2] = Math.round(newB * blendFactor + origB * (1 - blendFactor));
      }
    }

    const outPath = path.join(VARIANTS_DIR, `${shade.id}.jpg`);
    await sharp(outData, { raw: { width, height, channels: 3 } })
      .jpeg({ quality: 90 })
      .toFile(outPath);
  }

  console.log('All variants generated successfully!');
}

run().catch(console.error);

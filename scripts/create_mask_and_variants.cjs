const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PORTRAIT_PATH = path.join(__dirname, '../public/images/hair/model-customizer-portrait.jpg');
const VARIANTS_DIR = path.join(__dirname, '../public/images/hair/variants');
const MASK_PNG_PATH = path.join(__dirname, '../public/images/hair/model-customizer-hair-mask.png');

if (!fs.existsSync(VARIANTS_DIR)) {
  fs.mkdirSync(VARIANTS_DIR, { recursive: true });
}

// Exact SVG mask with feathered hair silhouette and face/neck cutout
const svgMask = `
<svg width="896" height="1200" viewBox="0 0 896 1200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" />
    </filter>
  </defs>
  <rect width="896" height="1200" fill="#000000" />
  
  <!-- Outer Hair Silhouette -->
  <path d="
    M 448 145
    C 340 145, 250 200, 220 310
    C 190 420, 165 580, 155 720
    C 145 840, 170 960, 230 1020
    C 280 1050, 360 1040, 400 950
    C 415 900, 395 820, 370 740
    C 345 660, 345 560, 355 450
    C 365 340, 385 240, 448 215
    C 511 240, 531 340, 541 450
    C 551 560, 551 660, 526 740
    C 501 820, 481 900, 496 950
    C 536 1040, 616 1050, 666 1020
    C 726 960, 751 840, 741 720
    C 731 580, 706 420, 676 310
    C 646 200, 556 145, 448 145
    Z
  " fill="#ffffff" filter="url(#soft)" />

  <!-- Cutout for Face, Forehead, Eyes, Nose, Mouth, Chin -->
  <path d="
    M 448 215
    C 395 215, 360 250, 350 330
    C 340 410, 345 490, 365 560
    C 385 620, 415 655, 448 660
    C 481 655, 511 620, 531 560
    C 551 490, 556 410, 546 330
    C 536 250, 501 215, 448 215
    Z
  " fill="#000000" filter="url(#soft)" />

  <!-- Center Neck and Blouse Cutout -->
  <polygon points="365,655 531,655 570,1200 325,1200" fill="#000000" filter="url(#soft)" />

  <!-- Outer background corners guarantee zero wall tinting -->
  <rect x="0" y="0" width="160" height="1200" fill="#000000" />
  <rect x="736" y="0" width="160" height="1200" fill="#000000" />
  <rect x="0" y="0" width="896" height="120" fill="#000000" />
</svg>
`;

const SHADES = [
  { id: 'black', name: 'Black', hex: '#141312', type: 'dark', intensity: 0.85 },
  { id: 'chocolate-brown', name: 'Chocolate Brown', hex: '#3E2519', type: 'dark', intensity: 0.85 },
  { id: 'mocha', name: 'Mocha', hex: '#4A3022', type: 'dark', intensity: 0.80 },
  { id: 'caramel', name: 'Caramel', hex: '#B47D48', type: 'warm', intensity: 0.85 },
  { id: 'copper', name: 'Copper', hex: '#B85226', type: 'vibrant', intensity: 0.90 },
  { id: 'auburn', name: 'Auburn', hex: '#7A2C18', type: 'warm', intensity: 0.85 },
  { id: 'burgundy', name: 'Burgundy', hex: '#521524', type: 'rich', intensity: 0.88 },
  { id: 'honey-blonde', name: 'Honey Blonde', hex: '#C99E5A', type: 'blonde', intensity: 0.85 },
  { id: 'platinum', name: 'Platinum', hex: '#E8E3D7', type: 'blonde', intensity: 0.85 },
  { id: 'ash-brown', name: 'Ash Brown', hex: '#4A423D', type: 'cool', intensity: 0.80 },
  { id: 'pink', name: 'Pink', hex: '#E5A8BA', type: 'vibrant', intensity: 0.85 },
  { id: 'purple', name: 'Purple', hex: '#682A7C', type: 'vibrant', intensity: 0.90 },
  { id: 'blue', name: 'Blue', hex: '#1D2A4F', type: 'cool', intensity: 0.85 },
  { id: 'silver', name: 'Silver', hex: '#A8B0B8', type: 'cool', intensity: 0.85 }
];

function hexToRgb(hex) {
  const bigint = parseInt(hex.replace('#', ''), 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

async function run() {
  console.log('Rendering SVG mask buffer...');
  const { data: maskBuffer, info: maskInfo } = await sharp(Buffer.from(svgMask))
    .resize(896, 1200)
    .removeAlpha()
    .grayscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data: origData, info } = await sharp(PORTRAIT_PATH).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // Precompute cleaned hair mask buffer
  const cleanedMask = Buffer.alloc(width * height);
  for (let i = 0; i < width * height; i++) {
    const pIdx = i * channels;
    const r = origData[pIdx];
    const g = origData[pIdx + 1];
    const b = origData[pIdx + 2];
    let maskVal = maskBuffer[i] / 255;

    const y = Math.floor(i / width);
    const x = i % width;

    // 1. Exclude Wall & Window Background:
    if (x < 195 || x > 715 || y < 135) {
      maskVal = 0;
    }
    if (x < 250 && y < 660) {
      maskVal = 0;
    }
    if (x > 675 && y < 500) {
      maskVal = 0;
    }
    if (r > 185 && g > 185 && b > 175) {
      maskVal = 0;
    }

    // 2. Exclude Black Silk Shirt:
    if (y > 720 && r < 45 && g < 45 && b < 50) {
      maskVal = 0;
    }

    // 3. Exclude Skin Tone:
    if (x > 340 && x < 556 && y > 230 && y < 700) {
      if (r > 140 && r > b + 25 && g > b) {
        maskVal = 0;
      }
    }

    cleanedMask[i] = Math.round(maskVal * 255);
  }

  // Save the cleaned mask as PNG for canvas client-side use
  await sharp(cleanedMask, { raw: { width, height, channels: 1 } }).png().toFile(MASK_PNG_PATH);
  console.log('Saved cleaned hair mask PNG:', MASK_PNG_PATH);

  for (const shade of SHADES) {
    console.log(`Generating variant: ${shade.name}...`);
    const [tr, tg, tb] = hexToRgb(shade.hex);
    const targetLum = 0.299 * tr + 0.587 * tg + 0.114 * tb || 1;
    const outData = Buffer.alloc(width * height * 3);

    for (let i = 0; i < width * height; i++) {
      const pIdx = i * channels;
      const r = origData[pIdx];
      const g = origData[pIdx + 1];
      const b = origData[pIdx + 2];
      const maskVal = cleanedMask[i] / 255;

      if (maskVal <= 0.01) {
        outData[i * 3] = r;
        outData[i * 3 + 1] = g;
        outData[i * 3 + 2] = b;
        continue;
      }

      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      let nr, ng, nb;

      if (shade.type === 'dark') {
        // Multiply pigment
        nr = (r / 255) * tr * 1.35;
        ng = (g / 255) * tg * 1.35;
        nb = (b / 255) * tb * 1.35;
      } else if (shade.type === 'blonde') {
        // High-lift blonde base
        const norm = lum / 255;
        nr = tr * (0.35 + 0.65 * norm);
        ng = tg * (0.35 + 0.65 * norm);
        nb = tb * (0.35 + 0.65 * norm);
      } else {
        // Vibrant / chromatic tint preserving strand highlights
        const scale = Math.pow(lum / targetLum, 0.70);
        nr = tr * scale;
        ng = tg * scale;
        nb = tb * scale;
      }

      // Clamp 0-255
      nr = Math.min(255, Math.max(0, nr));
      ng = Math.min(255, Math.max(0, ng));
      nb = Math.min(255, Math.max(0, nb));

      const alpha = maskVal * (shade.intensity || 0.85);
      outData[i * 3] = Math.round(nr * alpha + r * (1 - alpha));
      outData[i * 3 + 1] = Math.round(ng * alpha + g * (1 - alpha));
      outData[i * 3 + 2] = Math.round(nb * alpha + b * (1 - alpha));
    }

    const outPath = path.join(VARIANTS_DIR, `${shade.id}.jpg`);
    await sharp(outData, { raw: { width, height, channels: 3 } })
      .jpeg({ quality: 92 })
      .toFile(outPath);
  }

  console.log('All variants generated with perfect mask!');
}

run().catch(console.error);

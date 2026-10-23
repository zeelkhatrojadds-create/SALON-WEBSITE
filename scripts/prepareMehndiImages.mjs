import sharp from 'sharp';
import path from 'path';

async function processMehndiImages() {
  const dir = 'public/images/mehndi';

  // 1. Convert base images to optimized webp
  await sharp(path.join(dir, 'bridal-mehndi-hero.jpg'))
    .webp({ quality: 90 })
    .toFile(path.join(dir, 'bridal-mehndi-hero.webp'));

  await sharp(path.join(dir, 'mehndi-studio-card.jpg'))
    .webp({ quality: 90 })
    .toFile(path.join(dir, 'mehndi-studio-card.webp'));

  await sharp(path.join(dir, 'arabic-mehndi.jpg'))
    .webp({ quality: 90 })
    .toFile(path.join(dir, 'arabic-mehndi.webp'));

  // 2. Bridal Full Hand (Left hand focus from hero)
  await sharp(path.join(dir, 'bridal-mehndi-hero.jpg'))
    .extract({ left: 240, top: 280, width: 680, height: 480 })
    .resize(800, 600, { fit: 'cover' })
    .webp({ quality: 90 })
    .toFile(path.join(dir, 'bridal-full-hand.webp'));

  // 3. Indian Traditional Jaal & Forearm (Forearm intricacy from hero)
  await sharp(path.join(dir, 'bridal-mehndi-hero.jpg'))
    .extract({ left: 650, top: 240, width: 620, height: 480 })
    .resize(800, 600, { fit: 'cover' })
    .webp({ quality: 90 })
    .toFile(path.join(dir, 'indian-traditional-jaal.webp'));

  // 4. Arabic Floral Bel (Central diagonal roses from arabic-mehndi)
  await sharp(path.join(dir, 'arabic-mehndi.jpg'))
    .extract({ left: 350, top: 100, width: 750, height: 600 })
    .resize(800, 600, { fit: 'cover' })
    .webp({ quality: 90 })
    .toFile(path.join(dir, 'arabic-floral-bel.webp'));

  // 5. Finger Mehndi (Intricate finger rings and bands from card image)
  await sharp(path.join(dir, 'mehndi-studio-card.jpg'))
    .extract({ left: 160, top: 340, width: 480, height: 400 })
    .resize(800, 600, { fit: 'cover' })
    .webp({ quality: 90 })
    .toFile(path.join(dir, 'finger-rings-lace.webp'));

  // 6. Mandala Mehndi (Central wrist mandala crown from card image)
  await sharp(path.join(dir, 'mehndi-studio-card.jpg'))
    .extract({ left: 450, top: 440, width: 550, height: 440 })
    .resize(800, 600, { fit: 'cover' })
    .webp({ quality: 90 })
    .toFile(path.join(dir, 'mandala-palm-art.webp'));

  // 7. Minimalist Fine Line (Clean modern wrist & fingers overview from card)
  await sharp(path.join(dir, 'mehndi-studio-card.jpg'))
    .resize(800, 600, { fit: 'cover' })
    .webp({ quality: 90 })
    .toFile(path.join(dir, 'minimalist-fine-line.webp'));

  // 8. Back Hand Mehndi (Jeweled floral wrist & fingers from arabic)
  await sharp(path.join(dir, 'arabic-mehndi.jpg'))
    .resize(800, 600, { fit: 'cover' })
    .webp({ quality: 90 })
    .toFile(path.join(dir, 'backhand-cuff-chain.webp'));

  // 9. Feet & Ankle Anklet Payal Inspired (Rich pattern detail)
  await sharp(path.join(dir, 'bridal-mehndi-hero.jpg'))
    .extract({ left: 180, top: 400, width: 700, height: 360 })
    .resize(800, 600, { fit: 'cover' })
    .webp({ quality: 90 })
    .toFile(path.join(dir, 'bridal-feet-anklet.webp'));

  // 10. Engagement Elegance (Diamond ring and delicate floral finger lace)
  await sharp(path.join(dir, 'arabic-mehndi.jpg'))
    .extract({ left: 120, top: 280, width: 650, height: 550 })
    .resize(800, 600, { fit: 'cover' })
    .webp({ quality: 90 })
    .toFile(path.join(dir, 'engagement-elegance.webp'));

  // 11. Festival Sangeet (Celebration floral pattern)
  await sharp(path.join(dir, 'arabic-mehndi.jpg'))
    .extract({ left: 400, top: 120, width: 700, height: 500 })
    .resize(800, 600, { fit: 'cover' })
    .webp({ quality: 90 })
    .toFile(path.join(dir, 'festival-sangeet.webp'));

  console.log('All Mehndi images generated and optimized successfully!');
}

processMehndiImages().catch(console.error);

// GLAM GIRL BY JANKI — Master Category Registry
// Unified single source of truth for the 12 main service categories.
// Maps each high-level category card to its existing catalog services without duplicating categories.
// IMPORTANT: Eyebrow Threading belongs inside the main Threading category.

export const MAIN_SERVICE_CATEGORIES = [
  {
    id: 'threading',
    slug: 'threading',
    aliases: ['eyebrow', 'eyebrows', 'brow', 'brows', 'eyebrow-threading'],
    name: 'Threading',
    subtitle: 'Precision Eyebrow & Facial Hair Shaping',
    description: 'Clean, defined facial hair shaping using 100% sanitized organic cotton thread for eyebrows, upper lip, chin, forehead, and full face.',
    image: '/images/threading/eyebrow-threading.jpg',
    badge: 'ORGANIC THREAD',
    filter: (s) => s.category === 'threading'
  },
  {
    id: 'hair',
    slug: 'hair',
    name: 'Hair',
    subtitle: 'Cuts, Blowouts & Signature Styling',
    description: 'Precision haircuts, luxury wash and blowouts, and effortless couture styling customized for your hair texture and face shape.',
    image: '/images/hair-care/53-noor-signature-haircut.webp',
    badge: 'SIGNATURE HAIR',
    filter: (s) => ['hair-cut', 'hairstyling', 'hair-color', 'hair-treatments'].includes(s.category)
  },
  {
    id: 'hair-colour',
    slug: 'hair-colour',
    aliases: ['hair-color'],
    name: 'Hair Colour',
    subtitle: 'Balayage, Dimensional Lighting & Gloss',
    description: 'Master hand-painted Noor Balayage, radiant highlights, babylights, and gentle ammonia-free global colours.',
    image: '/images/hair-care/58-noor-balayage.webp',
    badge: 'HAUTE COLOUR',
    filter: (s) => s.category === 'hair-color'
  },
  {
    id: 'hair-treatments',
    slug: 'hair-treatments',
    aliases: ['hair-treatment'],
    name: 'Hair Treatments',
    subtitle: 'Deep Spas & Olaplex Bond Repair',
    description: 'Intensive restorative masks, Ayurvedic Kesariya hair spas, and structural Olaplex bond repair for luminous hair health.',
    image: '/images/hair-care/62-kesariya-hair-spa.webp',
    badge: 'RESTORATIVE CARE',
    filter: (s) => s.category === 'hair-treatments'
  },
  {
    id: 'skin-atelier',
    slug: 'skin-atelier',
    aliases: ['skin-care', 'the-skin-atelier', 'skincare', 'facial', 'facials'],
    name: 'The Skin Atelier',
    subtitle: 'Bespoke Facials & Clinical Botanical Skincare',
    description: 'Customized luxury facials, deep pore purification, brightening botanicals, and rejuvenating herbal skin therapies.',
    image: '/images/facial/special-glam-girl-facial.jpg',
    badge: 'THE SKIN ATELIER',
    filter: (s) => s.category === 'facial'
  },
  {
    id: 'waxing',
    slug: 'waxing',
    name: 'Waxing',
    subtitle: 'Gentle Strip & Stripless Smoothness',
    description: 'Ultra-gentle face and body waxing utilizing soothing botanical formulations for silky-smooth, long-lasting hair removal.',
    image: '/images/products/post-wax-calming-balm.webp',
    badge: 'SILKY SMOOTH',
    filter: (s) => s.category === 'waxing'
  },
  {
    id: 'makeup',
    slug: 'makeup',
    aliases: ['make-up'],
    name: 'Makeup',
    subtitle: 'HD Airbrush, Soft Glam & Event Makeovers',
    description: 'Camera-ready professional makeup artistry, red-carpet glam, sangeet looks, and flawless high-definition finishes.',
    image: '/images/facial/advanced-brightening-facial.jpg',
    badge: 'ARTISTRY MAKEUP',
    filter: (s) => s.category === 'makeup'
  },
  {
    id: 'eyelashes',
    slug: 'eyelashes',
    aliases: ['lashes', 'eyelash', 'lash'],
    name: 'Eyelashes',
    subtitle: 'Lash Lifts, Tints & Volume Extensions',
    description: 'Semi-permanent lash lifting, deep keratin tinting, and customized classic to dramatic mega-volume extensions.',
    image: '/images/lashes/lash-atelier-hero.jpg',
    badge: 'LASH ATELIER',
    filter: (s) => s.category === 'lashes' || s.name.toLowerCase().includes('lash')
  },
  {
    id: 'nails',
    slug: 'nails',
    aliases: ['nail-art', 'manicure', 'pedicure'],
    name: 'Nails and Nail Art',
    subtitle: 'Haute Manicures, Pedicures & 3D Couture',
    description: 'Clean gel manicures, relaxing foot pedicures, magnetic cat-eye finishes, and bespoke 3D hand-sculpted nail art.',
    image: '/images/nails/classic-manicure.webp',
    badge: 'NAIL ATELIER',
    filter: (s) => s.category === 'nails'
  },
  {
    id: 'mehndi',
    slug: 'mehndi',
    aliases: ['henna'],
    name: 'Mehndi',
    subtitle: '100% Rajasthani Organic Henna Artistry',
    description: 'Hand-piped natural henna couture ranging from traditional bridal tapestries to flowy Arabic bels and minimal motifs.',
    image: '/images/mehndi/mehndi-studio-card.webp',
    badge: 'ORGANIC HENNA',
    filter: (s) => s.category === 'henna' || s.id.includes('mehndi')
  },
  {
    id: 'bridal',
    slug: 'bridal',
    aliases: ['bridal-services', 'weddings'],
    name: 'Bridal',
    subtitle: 'Royal South-Asian Bridal Transformations',
    description: 'Complete royal wedding beauty including bespoke bridal mehndi, 16-hour airbrush makeup, and couture bridal updos.',
    image: '/images/mehndi/bridal-mehndi-hero.webp',
    badge: 'ROYAL BRIDAL',
    filter: (s) => s.name.toLowerCase().includes('bridal') || s.id.includes('bridal')
  },
  {
    id: 'spa',
    slug: 'spa',
    aliases: ['massage', 'spa-and-body', 'body-treatments', 'body'],
    name: 'Spa and Body',
    subtitle: 'Herbal Warm Oil Holistic Therapy',
    description: 'Traditional Shanti relaxation body massages and revitalizing Ayurvedic Indian head massages to melt away tension.',
    image: '/images/massage/37-shanti-relaxation-massage.webp',
    badge: 'HOLISTIC WELLNESS',
    filter: (s) => s.category === 'massage'
  }
];

/**
 * Finds a main category definition by its slug, ID, or alias.
 */
export function findMainCategory(param) {
  if (!param) return null;
  const target = String(param).toLowerCase().trim();
  return MAIN_SERVICE_CATEGORIES.find((cat) => {
    if (cat.id === target || cat.slug === target) return true;
    if (cat.aliases && cat.aliases.includes(target)) return true;
    return false;
  }) || null;
}

/**
 * Gets all active services belonging to a given category definition.
 */
export function getServicesForCategory(catDef, allServices = []) {
  if (!catDef || !catDef.filter) return [];
  return allServices.filter((s) => {
    if (s.active === false) return false;
    return catDef.filter(s);
  });
}

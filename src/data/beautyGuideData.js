/**
 * Beauty Guide Master Data & Educational Registry
 * GLAM GIRL BY JANKI — Pure Guidance & Knowledge Architecture
 * 
 * Strict Brand Aesthetics: Deep Black (#10110F), Forest Green (#263D2B),
 * Olive Green (#465640), Sage (#A8B5A0), Warm Cream (#F7F4ED).
 * Pure educational guidance — no medical claims, no guaranteed outcomes.
 */

export const BEAUTY_GUIDE_CATEGORIES = [
  {
    id: 'threading',
    slug: 'threading',
    name: 'Threading',
    subtitle: 'Precision Facial Hair Shaping & Definition',
    summary: 'Centuries-old hair removal technique using twisted organic antibacterial cotton thread for razor-sharp eyebrow arches and smooth facial contours.',
    about: 'Threading is an ancient hair removal artistry originating in Central and South Asia. An esthetician twists a clean loop of 100% organic cotton thread and rolls it across the skin, gently trapping and lifting individual hairs directly from the follicle. Unlike waxing or chemical depilatories, threading exerts zero chemical exposure on the skin and does not strip the epidermal layer, making it an ideal choice for sensitive facial areas.',
    typesOfServices: [
      { name: 'Eyebrow Threading', price: '$10 CAD', duration: '10–15 min', purpose: 'Custom brow shaping calibrated to your natural bone structure and facial symmetry.' },
      { name: 'Upper Lip Threading', price: '$8 CAD', duration: '5–10 min', purpose: 'Gentle removal of fine vellus and coarse hair along the upper lip line.' },
      { name: 'Chin & Jawline Threading', price: '$8 CAD', duration: '5–10 min', purpose: 'Targeted removal of stray or coarse hairs around the chin and mandibular curve.' },
      { name: 'Forehead Threading', price: '$8 CAD', duration: '5–10 min', purpose: 'Smooth refinement of the upper hairline for a clean, open brow frame.' },
      { name: 'Sideburns Threading', price: '$10 CAD', duration: '10 min', purpose: 'Soft blending and definition of temple and side hairline borders.' },
      { name: 'Full Face Threading', price: '$35 CAD', duration: '25–35 min', purpose: 'Complete facial hair grooming including brows, upper lip, chin, cheeks, and forehead.' },
      { name: 'Noor Royal Eyebrow Ritual', price: '$18 CAD', duration: '20 min', purpose: 'Precision shaping paired with soothing organic rosewater and cooling aloe vera compress.' }
    ],
    purposeAndBenefits: [
      'Allows ultra-precise line definition and clean brow architecture.',
      'Completely free of waxes, resins, artificial fragrances, and chemical depilatories.',
      'Does not peel or pull the top layer of skin, reducing the risk of lifting or burns.',
      'Safe for clients using topical retinoids or chemical exfoliants when performed gently.',
      'Hairs are lifted from the root, typically providing 2 to 4 weeks of smoothness.'
    ],
    beforeAppointment: [
      'Allow brows or facial hair to grow for at least 2 to 3 weeks before shaping for best results.',
      'Avoid heavy makeup, foundation, or facial oils around the treatment area on the day of your appointment.',
      'Inform your artist if you have recently undergone a chemical peel, microneedling, or laser treatment.',
      'If you have heightened pain sensitivity, schedule your appointment away from peak menstrual days.'
    ],
    stepByStepProcess: [
      { step: 1, title: 'Consultation & Mapping', detail: 'Your artist assesses your natural brow growth, facial symmetry, and discusses your desired fullness and shape.' },
      { step: 2, title: 'Sanitization & Skin Prep', detail: 'The treatment zone is gently cleansed with an antibacterial, non-alcoholic preparation.' },
      { step: 3, title: 'Precision Threading', detail: 'Using high-tensile organic cotton thread, the artist shapes clean lines with rhythmic, controlled movements.' },
      { step: 4, title: 'Trimming & Balancing', detail: 'Long brow hairs are gently brushed upwards and precision-trimmed to ensure uniform thickness.' },
      { step: 5, title: 'Soothing Aloe Compress', detail: 'A cool, pure organic aloe vera gel or rosewater compress is applied to calm temporary redness.' }
    ],
    timeAndPriceInfo: 'Services range from $8 to $35 CAD and take approximately 5 to 35 minutes depending on the target areas.',
    aftercareGuidance: [
      'Avoid touching, rubbing, or scratching the freshly threaded zone for at least 4 to 6 hours to keep open follicles clean.',
      'Refrain from applying heavily fragranced lotions, foundation, or tanning products for 12 hours.',
      'Avoid direct intense sun exposure, saunas, hot tubs, and heavy cardiovascular workouts for 12 hours.',
      'Apply pure aloe vera or a clean cool compress if mild transient erythema (redness) occurs.'
    ],
    safetyInformation: [
      'Hygiene: A fresh length of sanitized thread is used for every single client and discarded immediately.',
      'Contraindications: Threading should be postponed on active sunburns, open wounds, active cystic acne breakouts, or cold sores in the target area.',
      'Possible Reactions: Mild temporary redness or transient histamine bumps may appear; these typically subside within 30 to 60 minutes.'
    ],
    faqs: [
      { q: 'Does threading hurt more than waxing?', a: 'Sensation varies by individual pain tolerance. Most clients describe it as a rapid, localized pinching or light scratching. Unlike waxing, there is zero heat and no adhesive applied to the skin.' },
      { q: 'Can I get threaded if I use Retin-A or tretinoin?', a: 'Yes. Threading is generally considered the safest facial hair removal method for retinol and tretinoin users because it does not lift or peel the fragile stratum corneum.' },
      { q: 'How often should I get my eyebrows threaded?', a: 'Most clients visit every 2 to 4 weeks depending on their natural hair growth cycle and personal grooming preference.' }
    ],
    relatedCategories: ['waxing', 'skin-care', 'grooming']
  },
  {
    id: 'hair-care',
    slug: 'hair-care',
    name: 'Hair Care',
    subtitle: 'Structural Precision Cutting & Texture Enhancement',
    summary: 'Bespoke precision haircuts, split-end removal, deep clarifying washes, and texturizing cuts tailored to individual hair density and face shape.',
    about: 'Hair care encompasses professional cutting, trimming, wash rituals, and scalp cleansing designed to maintain hair follicle health, eliminate damaged ends, and enhance natural volume and movement. Every cut begins with an in-depth texture diagnosis to respect your daily styling routine and natural hair patterns.',
    typesOfServices: [
      { name: 'Noor Signature Haircut', price: '$45 CAD', duration: '45 min', purpose: 'Custom face-framing haircut with luxury wash, botanical conditioning, and salon blowout.' },
      { name: 'Classic Trim & Layering', price: '$35 CAD', duration: '35 min', purpose: 'Removal of split ends and weight distribution to restore bounce and manageability.' },
      { name: 'Deep Clarifying Wash & Blowout', price: '$30 CAD', duration: '30 min', purpose: 'Mineral residue removal, scalp massage, and sleek voluminous blowout.' },
      { name: 'Kids Precision Haircut', price: '$25 CAD', duration: '30 min', purpose: 'Gentle, patient haircut and styling for children under 12.' }
    ],
    purposeAndBenefits: [
      'Removes split, dry, and fractured ends before breakage travels up the hair shaft.',
      'Reduces heavy bulk while enhancing natural wave, curl, or straight hair texture.',
      'Promotes healthier-looking hair with enhanced shine and manageable daily styling.',
      'Improves scalp blood circulation through stimulating shampoo and conditioning massages.'
    ],
    beforeAppointment: [
      'Arrive with your hair in its natural state if you want your stylist to assess your natural curl or wave pattern.',
      'Collect reference photos that represent length, layering, or fringe styles you find appealing.',
      'Inform your stylist of recent chemical treatments, perms, or hair extensions.'
    ],
    stepByStepProcess: [
      { step: 1, title: 'Texture Diagnosis', detail: 'Assessing hair density, porosity, wave pattern, and face contour.' },
      { step: 2, title: 'Cleansing Wash', detail: 'Temperature-balanced clarifying shampoo and conditioning treatment.' },
      { step: 3, title: 'Sectioning & Wet Cut', detail: 'Precise sectioning and angle cutting according to chosen geometry.' },
      { step: 4, title: 'Blowout & Dry Detailing', detail: 'Drying hair to natural finish and refining weight balance while dry.' }
    ],
    timeAndPriceInfo: 'Hair care services range from $25 to $45 CAD and typically require 30 to 45 minutes.',
    aftercareGuidance: [
      'Use sulfate-free, color-safe shampoos to preserve hair moisture.',
      'Schedule maintenance trims every 6 to 8 weeks to prevent split ends from reforming.',
      'Apply heat protectant spray prior to using curling wands or flat irons.'
    ],
    safetyInformation: [
      'Tools: Professional shears and combs are sanitized between clients in high-grade hospital disinfectant.',
      'Skin Sensitivity: Notify your stylist if you have scalp psoriasis, eczema, or sensitive scalp tendencies.'
    ],
    faqs: [
      { q: 'How often should I cut my hair to grow it longer?', a: 'Getting a microscopic trim (dusting) every 8 to 10 weeks prevents split ends from snapping off, allowing you to retain actual length over time.' },
      { q: 'Is washing included in the haircut price?', a: 'Yes, full signature haircuts include a restorative shampoo, conditioning, and professional blowout.' }
    ],
    relatedCategories: ['hair-styling', 'hair-colour', 'hair-treatments']
  },
  {
    id: 'hair-styling',
    slug: 'hair-styling',
    name: 'Hair Styling',
    subtitle: 'Couture Updos, Hollywood Waves & Event Artistry',
    summary: 'Professional heat-styled looks, intricate bridal braids, formal updos, and long-lasting event blowouts designed for celebrations and special occasions.',
    about: 'Hair styling transforms dry hair into striking, camera-ready hairstyles for weddings, receptions, graduations, photoshoots, and festive gatherings. Stylists utilize specialized heat tools, texturizing powders, thermal protectants, and setting sprays to craft structured updos or soft, romantic waves that endure hours of movement.',
    typesOfServices: [
      { name: 'Bridal Updo & Floral Pinning', price: '$85 CAD', duration: '75 min', purpose: 'Sculpted royal updo with structural anchoring for dupattas, maang tikka, and fresh florals.' },
      { name: 'Hollywood Glam Waves', price: '$65 CAD', duration: '60 min', purpose: 'Smooth, high-gloss directional waves with red-carpet bounce and hold.' },
      { name: 'Textured Sangeet Braid', price: '$55 CAD', duration: '50 min', purpose: 'Bohemian braided look with paranda or hair jewel weaving.' },
      { name: 'Elegant Event Blowout', price: '$40 CAD', duration: '40 min', purpose: 'Bouncy round-brush blowout with lasting volume and silky movement.' }
    ],
    purposeAndBenefits: [
      'Provides secure, multi-hour hold suitable for high-energy dancing and outdoor events.',
      'Accommodates cultural hair accessories such as dupattas, matha patti, and heavy jewelry.',
      'Protects natural hair with professional thermal shields before heat contact.'
    ],
    beforeAppointment: [
      'Wash and dry hair completely the evening prior to your appointment (day-old hair holds curls better).',
      'Wear a button-down or zip-up top to avoid disturbing your finished hairstyle when dressing.',
      'Bring all accessories, jewelry, hair extensions, or flowers you wish to incorporate.'
    ],
    stepByStepProcess: [
      { step: 1, title: 'Texture Preparation', detail: 'Applying thermal shields, root lifters, and dry texturizing sprays.' },
      { step: 2, title: 'Heat Shaping', detail: 'Curling or straightening with calibrated ceramic tools.' },
      { step: 3, title: 'Structural Assembly', detail: 'Pinning, braiding, and securing foundations with high-durability grips.' },
      { step: 4, title: 'Accessory Placement & Seal', detail: 'Setting jewelry, veil anchors, and locking in finish with humidity-resistant spray.' }
    ],
    timeAndPriceInfo: 'Styling rituals range from $40 to $85 CAD and require 40 to 75 minutes.',
    aftercareGuidance: [
      'To undo updos: Remove bobby pins gently one by one; do not yank pins through hair.',
      'Comb out teased sections gently starting from the bottom tips and working up with a wide-tooth comb.',
      'Apply a drop of argan oil to hair ends to replenish moisture after heavy hairspray use.'
    ],
    safetyInformation: [
      'Thermal Safety: Heat tools are kept at safe temperature thresholds (maximum 380°F) to protect hair protein bonds.',
      'Scalp Comfort: Inform your stylist immediately if pins feel uncomfortably tight on your scalp.'
    ],
    faqs: [
      { q: 'Should I wash my hair on the morning of my updo?', a: 'Generally no. Hair washed 12 to 24 hours prior holds curls and pins significantly better than freshly washed, slippery hair.' },
      { q: 'Can you install clip-in hair extensions with my style?', a: 'Yes, 100% human hair extensions can be blended, curled, and styled seamlessly into your look.' }
    ],
    relatedCategories: ['hair-care', 'hair-colour', 'bridal']
  },
  {
    id: 'hair-colour',
    slug: 'hair-colour',
    name: 'Hair Colour',
    subtitle: 'Hand-Painted Balayage, Dimensional Lighting & Gloss',
    summary: 'Custom balayage, foil highlights, root blends, and ammonia-free global glosses customized to your skin undertone and hair porosity.',
    about: 'Hair colouring is both a technical science and visual artistry. By carefully balancing developer strength, lightener lifting action, and tone-neutralizing pigments, our colourists create seamless dimension from natural sunkissed sweeps to dramatic transformations. Ammonia-free glosses seal the cuticle for high-shine reflectivity.',
    typesOfServices: [
      { name: 'Noor Hand-Painted Balayage', price: '$150 CAD', duration: '120–180 min', purpose: 'Freehand dimensional highlights with soft, low-maintenance root regrowth.' },
      { name: 'Face-Framing Babylights & Money Piece', price: '$75 CAD', duration: '60–90 min', purpose: 'Delicate hairline micro-foils for instant brightness around the face.' },
      { name: 'Full Dimensional Highlights', price: '$120 CAD', duration: '120 min', purpose: 'Full-head foil placement for maximum multi-tonal depth and brightness.' },
      { name: 'Ammonia-Free Root Touch-up', price: '$55 CAD', duration: '60 min', purpose: '100% gray coverage or base tone maintenance along new growth.' }
    ],
    purposeAndBenefits: [
      'Adds optical depth, volume, and richness to monochromatic hair.',
      'Camouflages gray regrowth with soft, natural-looking blending.',
      'Enriched with protective plex bond builders to maintain hair fiber integrity.'
    ],
    beforeAppointment: [
      'Perform a mandatory 48-hour patch test if you have never had colour at our salon.',
      'Avoid washing hair for 24 hours prior to colour application; natural scalp oils protect against sensitivity.',
      'Disclose your full chemical hair history, including box dyes, metallic salts, or henna over the past 2 years.'
    ],
    stepByStepProcess: [
      { step: 1, title: 'Undertone Consultation', detail: 'Analyzing skin undertone, natural hair level, and target color feasibility.' },
      { step: 2, title: 'Sectioning & Formulation', detail: 'Mixing custom bond-building lightener and developer ratios.' },
      { step: 3, title: 'Color Application', detail: 'Applying foils or hand-painted balayage clay with precise brushstrokes.' },
      { step: 4, title: 'Toning & Acidic Rinse', detail: 'Neutralizing brassiness at the wash basin and locking the cuticle.' }
    ],
    timeAndPriceInfo: 'Colour services range from $55 to $150 CAD with durations between 60 to 180 minutes depending on length and complexity.',
    aftercareGuidance: [
      'Wait at least 48 to 72 hours before washing hair with water to allow pigment molecules to fully stabilize.',
      'Use sulfate-free purple or blue shampoos once a week to neutralize yellow or orange brassiness.',
      'Wash with cool or lukewarm water to prevent premature color fading.'
    ],
    safetyInformation: [
      'Patch Testing: A patch test behind the ear 48 hours prior is mandatory for all oxidative hair dyes.',
      'Henna Precaution: Chemical lightener over metallic-salt henna can cause extreme heat and breakage; full transparency is vital.'
    ],
    faqs: [
      { q: 'Will balayage ruin my hair texture?', a: 'When performed with professional bond protectors and appropriate developer levels, hair retains softness and elasticity.' },
      { q: 'How often do I need to touch up balayage?', a: 'Balayage grows out seamlessly without a harsh demarcation line; most clients touch up every 3 to 6 months.' }
    ],
    relatedCategories: ['hair-care', 'hair-treatments', 'hair-styling']
  },
  {
    id: 'hair-treatments',
    slug: 'hair-treatments',
    name: 'Hair Treatments',
    subtitle: 'Ayurvedic Scalp Spas & Molecular Bond Reconstruction',
    summary: 'Deeply restorative moisture masks, Ayurvedic Kesariya herbal hair spas, and molecular bond repair designed to reverse thermal and chemical stress.',
    about: 'Hair treatments are targeted therapeutic rituals formulated to address environmental damage, thermal heat exhaustion, chemical porosity, and scalp dryness. By infusing the cortex with essential lipids, ceramides, amino acids, and pure botanical extracts, these treatments help restore tensile strength, elasticity, and brilliant mirror shine.',
    typesOfServices: [
      { name: 'Kesariya Ayurvedic Hair Spa', price: '$55 CAD', duration: '60 min', purpose: 'Traditional warm herb-infused oil massage, steam infusion, and deep conditioning mask.' },
      { name: 'Olaplex Bond Reconstruction', price: '$65 CAD', duration: '45 min', purpose: 'Patented bis-aminopropyl diglycol dimaleate technology repairing broken disulfide bonds.' },
      { name: 'Deep Moisture Hydration Therapy', price: '$45 CAD', duration: '45 min', purpose: 'Intensive humectant and shea butter treatment restoring dry, brittle curls.' },
      { name: 'Scalp Clarifying Detox & Exfoliation', price: '$50 CAD', duration: '45 min', purpose: 'Micro-exfoliation clearing product buildup and soothing flaky, itchy scalps.' }
    ],
    purposeAndBenefits: [
      'Reconstructs damaged disulfide bonds broken by bleach, perms, or high heat.',
      'Deeply replenishes natural moisture in coarse, dry, or chemically processed strands.',
      'Soothes irritated scalp skin, clears clogged follicles, and reduces dry flakiness.'
    ],
    beforeAppointment: [
      'No special prep needed; arrive with unwashed hair if possible for scalp diagnostics.',
      'Inform your specialist if you suffer from severe scalp eczema or open abrasions.'
    ],
    stepByStepProcess: [
      { step: 1, title: 'Scalp & Porosity Check', detail: 'Evaluating scalp barrier and elasticity under magnification.' },
      { step: 2, title: 'Cleansing Wash', detail: 'Gentle clarifying wash to remove silicone and mineral barrier coatings.' },
      { step: 3, title: 'Treatment Infusion & Steam', detail: 'Applying restorative mask and utilizing warm ionic steam to open hair cuticles.' },
      { step: 4, title: 'Cold Rinse & Seal', detail: 'Cool water rinse to seal cuticles and trap restorative nutrients.' }
    ],
    timeAndPriceInfo: 'Treatments range from $45 to $65 CAD and run 45 to 60 minutes.',
    aftercareGuidance: [
      'Avoid washing hair for 48 hours to prolong nutrient absorption.',
      'Limit high-temperature blow dryers and flat irons for the first few days post-treatment.'
    ],
    safetyInformation: [
      'Allergy Awareness: Ayurvedic spa formulas contain natural nut and herbal oils (almond, sesame, amla). Notify your artist of any nut allergies.'
    ],
    faqs: [
      { q: 'How often should I get an Olaplex treatment?', a: 'For chemically lightened or heat-styled hair, a monthly bond reconstruction keeps hair strong and resilient.' }
    ],
    relatedCategories: ['hair-care', 'hair-colour', 'spa-and-body']
  },
  {
    id: 'skin-care',
    slug: 'skin-care',
    name: 'Skin Care & Facials',
    subtitle: 'Holistic Herbal Glow Therapies & Deep Purification',
    summary: 'Customized luxury facials, botanical extractions, brightening skin therapies, and antioxidant barrier support formulated for all skin types.',
    about: 'Our skin care and facial rituals combine time-honored Ayurvedic botanicals (saffron, turmeric, sandalwood) with modern gentle esthetic techniques. Each facial is personalized to your skin barrier state—cleansing deeply, gently clearing pores, replenishing depleted moisture, and restoring a vibrant, healthy radiance without aggressive trauma.',
    typesOfServices: [
      { name: 'Special Glam Girl Signature Facial', price: '$65 CAD', duration: '60 min', purpose: 'Full multi-step customized facial featuring deep cleanse, steam, gentle extractions, and herbal mask.' },
      { name: 'Advanced Brightening Botanical Facial', price: '$75 CAD', duration: '60 min', purpose: 'Saffron and niacinamide botanical infusion targeting dullness and uneven pigmentation.' },
      { name: 'Gold Radiance Glow Ritual', price: '$85 CAD', duration: '75 min', purpose: 'Royal luxury facial with antioxidant botanical extracts and lifting jade massage.' },
      { name: 'Charcoal Deep Pore Detox Facial', price: '$60 CAD', duration: '50 min', purpose: 'Activated bamboo charcoal and tea tree therapy balancing excess sebum and congestion.' },
      { name: 'Teen Gentle Clarifying Facial', price: '$50 CAD', duration: '45 min', purpose: 'Gentle educational skincare ritual balancing hormonal teenage skin.' }
    ],
    purposeAndBenefits: [
      'Gently decongests pores and removes dead surface cells without micro-tears.',
      'Promotes microcirculation and lymph drainage through relaxing facial massage.',
      'Soothes and reinforces the skin’s natural lipid moisture barrier.'
    ],
    beforeAppointment: [
      'Pause prescription retinoids (Retin-A), strong AHAs, and BHAs for 3 to 5 days prior.',
      'Avoid sun exposure, tanning beds, or sunburns leading up to your session.',
      'Disclose any history of cold sores, active dermatitis, or allergies to fruits/botanicals.'
    ],
    stepByStepProcess: [
      { step: 1, title: 'Skin Diagnosis', detail: 'Analyzing skin type, hydration levels, and areas of sensitivity.' },
      { step: 2, title: 'Double Cleansing', detail: 'Oil-based pre-cleanse followed by gentle balancing milk.' },
      { step: 3, title: 'Enzymatic Exfoliation', detail: 'Fruit enzyme exfoliation under gentle warm steam.' },
      { step: 4, title: 'Gentle Extractions', detail: 'Careful clearing of superficial comedones using sterile tools.' },
      { step: 5, title: 'Botanical Mask & Massage', detail: 'Custom mask application, lymphatic drainage massage, and SPF 30+ finish.' }
    ],
    timeAndPriceInfo: 'Facial therapies range from $50 to $85 CAD and require 45 to 75 minutes.',
    aftercareGuidance: [
      'Do not apply heavy makeup or foundation for 24 hours to allow pores to breathe.',
      'Avoid saunas, steam rooms, chlorine pools, and intense sweaty workouts for 24 hours.',
      'Apply broad-spectrum SPF 30+ daily, as newly exfoliated skin is sensitive to UV rays.'
    ],
    safetyInformation: [
      'Sanitation: All extraction tools and facial bowls undergo medical-grade autoclaving or chemical disinfection.',
      'Contraindications: Facials are not performed over active herpes simplex outbreaks, open wounds, or severe sunburns.'
    ],
    faqs: [
      { q: 'Will my face be red after a facial?', a: 'Mild temporary redness is normal after extractions or circulation-boosting massage, usually resolving within 2 to 4 hours.' },
      { q: 'Can I get a facial right before a major event?', a: 'We recommend scheduling deep cleansing facials 3 to 5 days before a major wedding or photoshoot for optimal skin calm and glow.' }
    ],
    relatedCategories: ['threading', 'waxing', 'makeup']
  },
  {
    id: 'waxing',
    slug: 'waxing',
    name: 'Waxing',
    subtitle: 'Ultra-Gentle Strip & Stripless Botanical Smoothness',
    summary: 'Hygienic body and facial hair removal utilizing temperature-controlled soothing waxes designed for delicate and sensitive skin.',
    about: 'Waxing offers prolonged hair-free smoothness by removing hair from the root using warmed resin-based or honey waxes. Over time and consistent sessions, hair typically regrows softer and finer. Our salon practices strict single-dip spatula hygiene and applies soothing botanical oils before and after every treatment.',
    typesOfServices: [
      { name: 'Full Legs Waxing', price: '$45 CAD', duration: '40 min', purpose: 'Complete hair removal from ankles to upper thighs.' },
      { name: 'Half Legs Waxing', price: '$25 CAD', duration: '25 min', purpose: 'Lower legs from ankle to just above the knee.' },
      { name: 'Full Arms Waxing', price: '$35 CAD', duration: '30 min', purpose: 'Full arms from wrists to shoulders including elbows.' },
      { name: 'Half Arms Waxing', price: '$22 CAD', duration: '20 min', purpose: 'Forearms from wrists to elbows.' },
      { name: 'Underarms Waxing', price: '$15 CAD', duration: '15 min', purpose: 'Fast, gentle hair removal for delicate underarm skin.' },
      { name: 'Full Face Waxing', price: '$35 CAD', duration: '30 min', purpose: 'Complete facial smoothing using ultra-gentle stripless hot wax.' }
    ],
    purposeAndBenefits: [
      'Leaves skin smooth for 3 to 6 weeks, lasting much longer than shaving.',
      'Helps prevent the coarse, blunt prickliness associated with razor regrowth.',
      'Provides a gentle mild surface exfoliation alongside hair removal.'
    ],
    beforeAppointment: [
      'Hair must be at least 1/4 inch long (the length of a grain of rice)—avoid shaving for 2 to 3 weeks prior.',
      'Gently exfoliate the target skin 24 hours before your appointment to prevent ingrown hairs.',
      'Do not apply body lotions, moisturizers, or oils on the day of your waxing session.',
      'Do not wax if you are taking oral isotretinoin (Accutane) or have taken it within the last 6 months.'
    ],
    stepByStepProcess: [
      { step: 1, title: 'Cleanse & Sanitize', detail: 'Purifying skin with pre-wax antiseptic lotion to remove surface oils.' },
      { step: 2, title: 'Pre-Wax Oil Barrier', detail: 'Applying a featherlight barrier oil so wax adheres to hair, not skin.' },
      { step: 3, title: 'Calibrated Application', detail: 'Applying warm wax in the direction of hair growth and removing swiftly.' },
      { step: 4, title: 'Post-Wax Calming', detail: 'Soothing freshly waxed follicles with cooling tea tree and lavender balm.' }
    ],
    timeAndPriceInfo: 'Services range from $15 to $45 CAD with treatment times from 15 to 45 minutes.',
    aftercareGuidance: [
      'Wear loose-fitting, soft cotton clothing to prevent friction and chafing against exposed pores.',
      'Avoid hot baths, hot tubs, saunas, and intense exercise for 24 to 48 hours.',
      'Begin gentle exfoliation 48 hours after waxing and continue 2 to 3 times weekly to prevent ingrowns.'
    ],
    safetyInformation: [
      'Strict Hygiene: Never double-dip! Every spatula is dipped once and immediately disposed of.',
      'Medical Contraindications: Waxing cannot be performed on skin treated with prescription retinoids within 7 days, or oral Accutane within 6 months.'
    ],
    faqs: [
      { q: 'How long does waxing last?', a: 'Most clients enjoy smooth skin for 3 to 5 weeks. Regrowth varies based on individual genetics and hormone cycles.' }
    ],
    relatedCategories: ['threading', 'skin-care', 'grooming']
  },
  {
    id: 'makeup',
    slug: 'makeup',
    name: 'Makeup',
    subtitle: 'High-Definition Airbrush, Royal Bridal & Soft Glam',
    summary: 'Professional cosmetic artistry, skin tone color matching, camera-ready contouring, and 16-hour sweat-resistant event transformations.',
    about: 'Professional makeup artistry elevates natural bone structure and facial harmony for momentous occasions. Utilizing high-end professional cosmetic lines, dermatologically tested primers, and hygienic application brushes, our artists design bespoke looks tailored to your outfit colors, photography lighting, and personal comfort.',
    typesOfServices: [
      { name: 'Shringar Royal Bridal HD Makeup', price: '$150 CAD', duration: '90 min', purpose: 'Full couture bridal makeup featuring waterproof airbrush base, 3D lashes, and 16-hour setting.' },
      { name: 'Sangeet & Reception Glam', price: '$95 CAD', duration: '60 min', purpose: 'Vibrant celebratory makeup with jewel-toned eye shading and radiant highlights.' },
      { name: 'Soft Glam Party Makeup', price: '$75 CAD', duration: '50 min', purpose: 'Naturally perfected complexion, soft smoky liner, and elegant nude lips.' },
      { name: 'Monochromatic Nude Event Look', price: '$65 CAD', duration: '45 min', purpose: 'Modern, minimalist editorial look highlighting skin luminosity.' }
    ],
    purposeAndBenefits: [
      'Formulated for 4K photography and videography without flash bounce-back or chalkiness.',
      'Waterproof, tear-resistant, and sweat-tested formulations suitable for long celebrations.',
      'Flawless color-matching celebrating diverse South-Asian and global skin undertones.'
    ],
    beforeAppointment: [
      'Arrive with clean, bare skin; complete your morning gentle skincare 30 minutes prior.',
      'Wear a button-up shirt so your finished makeup is not disturbed when changing into formal attire.',
      'Bring reference photos of your outfit, jewelry, and preferred eye or lip styles.'
    ],
    stepByStepProcess: [
      { step: 1, title: 'Skin Priming', detail: 'Balancing skin moisture and applying pore-smoothing, long-wear primer.' },
      { step: 2, title: 'Color Correction & Foundation', detail: 'Neutralizing discoloration and blending custom HD foundation.' },
      { step: 3, title: 'Eye Artistry & Lashes', detail: 'Creating custom eye look, eyeliner, and seamless lash band application.' },
      { step: 4, title: 'Contour, Blush & Lip Color', detail: 'Sculpting cheekbones and defining lips with waterproof liner and color.' },
      { step: 5, title: 'Ultra-Fine Setting Mist', detail: 'Locking makeup in place with professional humidity-barrier setting spray.' }
    ],
    timeAndPriceInfo: 'Makeup services range from $65 to $150 CAD and take between 45 to 90 minutes.',
    aftercareGuidance: [
      'Gently dissolve eye makeup and false lashes using an oil-based makeup remover or cleansing balm before bed.',
      'Do not aggressively pull false eyelashes; hold a damp cotton pad over the lash line to dissolve adhesive first.',
      'Double cleanse your skin thoroughly before sleeping to prevent clogged pores.'
    ],
    safetyInformation: [
      'Hygiene Protocols: Mascaras and lipsticks are applied with disposable wands. Palette surfaces are sterilized with 70% isopropyl alcohol.',
      'Sensitive Eyes: Inform your artist if you wear contact lenses or have easily irritated tear ducts.'
    ],
    faqs: [
      { q: 'Will my makeup hold up in summer heat or during tears?', a: 'Yes, our bridal and event formulations use professional waterproof and sweat-resistant setting technologies designed to last 12 to 16 hours.' }
    ],
    relatedCategories: ['skin-care', 'eyelashes', 'bridal']
  },
  {
    id: 'eyelashes',
    slug: 'eyelashes',
    name: 'Eyelashes',
    subtitle: 'Keratin Lash Lifts, Tints & Weightless Extensions',
    summary: 'Semi-permanent lash lifting, deep keratin tinting, and customized classic, hybrid, and volume eyelash extensions crafted from ultra-lightweight silk fibers.',
    about: 'Eyelash services enhance the frame of your eyes without daily mascara or eyelash curlers. A lash lift gently alters the natural hair curl at the root for an eye-opening upward sweep, while professional extensions bond individual synthetic silk fibers to single natural lashes for customizable length, fullness, and curl.',
    typesOfServices: [
      { name: 'Keratin Lash Lift & Deep Tint', price: '$55 CAD', duration: '60 min', purpose: 'Semi-permanent natural lash curl and mascara-dark tint lasting 6 to 8 weeks.' },
      { name: 'Classic Natural Lash Extensions', price: '$75 CAD', duration: '75 min', purpose: 'One-to-one extension application providing an elegant, mascara-like natural enhancement.' },
      { name: 'Hybrid Textured Wispy Extensions', price: '$90 CAD', duration: '90 min', purpose: 'Blend of classic and volume fans for soft, multidimensional density.' },
      { name: 'Dramatic Mega-Volume Set', price: '$120 CAD', duration: '105 min', purpose: 'Ultra-lightweight multi-lash fans creating intense, fluffy, red-carpet fullness.' }
    ],
    purposeAndBenefits: [
      'Accentuates eyes and saves significant morning makeup application time.',
      'Lash lifts use your own natural lashes with zero maintenance or fill appointments.',
      'Extensions are custom-mapped to prevent premature shedding or weight damage to natural lashes.'
    ],
    beforeAppointment: [
      'Arrive with completely bare eyes—no mascara, eyeliner, waterproof eye makeup, or oils.',
      'Remove contact lenses prior to your service; wear glasses to your appointment.',
      'Avoid caffeinated beverages immediately prior to your appointment to prevent fluttery eyelids.'
    ],
    stepByStepProcess: [
      { step: 1, title: 'Eye Consultation & Mapping', detail: 'Selecting curl type (C, D, L) and length calibrated to natural lash strength.' },
      { step: 2, title: 'Hydrogel Eye Pad Placement', detail: 'Protecting lower lashes with cooling hydrogel under-eye pads.' },
      { step: 3, title: 'Lash Cleansing & Primer', detail: 'Clearing natural oils from lash fibers to ensure maximum adhesive bonding.' },
      { step: 4, title: 'Precision Application / Perm', detail: 'Careful placement of lash lifts or single extension isolation.' },
      { step: 5, title: 'Curing & Gentle Brushing', detail: 'Nano-misting to cure adhesive and combing through with a clean spoolie.' }
    ],
    timeAndPriceInfo: 'Services range from $55 to $120 CAD and run 60 to 105 minutes.',
    aftercareGuidance: [
      'Keep lashes completely dry for the first 24 to 48 hours—avoid steam, showers, saunas, and tears.',
      'Never use oil-based eye makeup removers, cleansers, or serums near extension adhesive.',
      'Sleep on your back or on a silk/satin pillowcase to prevent crushing the lashes.',
      'Brush daily with a clean spoolie brush to maintain alignment.'
    ],
    safetyInformation: [
      'Adhesive Safety: Formaldehyde-free, medical-grade cyanoacrylate adhesives are used.',
      'Patch Testing: Recommended for clients with sensitive eyes or adhesive allergies prior to a full set.'
    ],
    faqs: [
      { q: 'Will lash extensions damage my natural lashes?', a: 'No, as long as extensions are applied by a certified technician using appropriate weight and length, and you do not pull or pluck them off at home.' }
    ],
    relatedCategories: ['threading', 'makeup', 'skin-care']
  },
  {
    id: 'nails',
    slug: 'nails',
    name: 'Nails & Nail Art',
    subtitle: 'Russian Cuticle Manicures, Pedicures & 3D Art',
    summary: 'Waterless precision cuticle care, long-wear gel polishes, magnetic cat-eye sheens, relaxing spa pedicures, and hand-sculpted 3D nail artistry.',
    about: 'Our nail studio focuses on healthy nail plate preservation alongside cutting-edge aesthetic finishes. From dry European cuticle refinement and fortifying builder gel overlays to magnetic velvet cat-eye designs and chrome sheens, every manicure is crafted with meticulous hygiene and artistic flair.',
    typesOfServices: [
      { name: 'Classic Russian Cuticle Manicure', price: '$35 CAD', duration: '45 min', purpose: 'Hardware cuticle cleaning, nail shaping, and long-lasting gel polish.' },
      { name: 'Royal Spa Relaxing Pedicure', price: '$45 CAD', duration: '50 min', purpose: 'Foot soak, callus smoothing, sugar scrub, cuticle care, and massage.' },
      { name: 'Builder Gel (BIAB) Natural Overlay', price: '$50 CAD', duration: '60 min', purpose: 'Strengthening natural nails with flexible, protective builder gel.' },
      { name: 'Magnetic Velvet Cat-Eye Gel', price: '$45 CAD', duration: '50 min', purpose: 'Multi-tonal reflective mineral pigments shifted with precision neodymium magnets.' },
      { name: '3D Hand-Sculpted Couture Nail Art', price: '$65 CAD', duration: '75 min', purpose: 'Custom 3D floral petals, chrome swirls, pearls, and gemstone embellishments.' }
    ],
    purposeAndBenefits: [
      'Reinforces thin, bendy, or brittle natural nails against accidental breaks.',
      'Chip-free high-gloss finishes lasting 3 to 4 weeks without peeling.',
      'Hygienic foot care promoting healthy skin texture and soft heels.'
    ],
    beforeAppointment: [
      'Do not clip or aggressively pick at your cuticles prior to your appointment.',
      'Inform your technician if you have existing acrylics or hard gel requiring safe removal.',
      'Bring inspiration photos for intricate custom nail art designs.'
    ],
    stepByStepProcess: [
      { step: 1, title: 'Shape & Length Filing', detail: 'Filing nails into chosen shape (almond, coffin, square, squoval).' },
      { step: 2, title: 'Dry Cuticle Refinement', detail: 'Gently lifting and clearing non-living cuticle tissue from the nail plate.' },
      { step: 3, title: 'Plate Dehydration & Base', detail: 'Balancing pH and curing flexible foundation gel.' },
      { step: 4, title: 'Color & Artistry Application', detail: 'Layering pigment, magnetic cat-eye effects, or 3D gel sculpting.' },
      { step: 5, title: 'High-Gloss Top Coat & Cuticle Oil', detail: 'Sealing with scratch-resistant top coat and nourishing with vitamin E oil.' }
    ],
    timeAndPriceInfo: 'Nail services range from $35 to $65 CAD and require 45 to 75 minutes.',
    aftercareGuidance: [
      'Apply cuticle oil twice daily to keep nail beds flexible and prevent lifting.',
      'Wear rubber gloves when washing dishes or using household cleaning chemicals.',
      'Never peel or pry gel polish off; always return for safe professional soaking and removal.'
    ],
    safetyInformation: [
      'Tool Sterilization: Metal implements undergo medical-grade autoclaving. Files and buffers are single-use or sanitized.',
      'Nail Health: We never file aggressively down onto natural nail plates.'
    ],
    faqs: [
      { q: 'What is Builder Gel (BIAB)?', a: 'Builder In A Bottle is a thick, flexible strengthening gel applied over natural nails to protect them from snapping while they grow out.' }
    ],
    relatedCategories: ['mehndi', 'spa-and-body', 'grooming']
  },
  {
    id: 'mehndi',
    slug: 'mehndi',
    name: 'Mehndi',
    subtitle: '100% Rajasthani Organic Henna Artistry',
    summary: 'Hand-piped natural henna couture ranging from traditional Indian bridal tapestries to flowy modern Arabic bels and delicate mandala motifs.',
    about: 'Mehndi (Henna) is an ancient ritual art form that holds deep cultural significance across South Asia, the Middle East, and North Africa. Made exclusively from finely milled leaves of the Lawsonia inermis plant, our chemical-free paste is mixed in-house with water, lemon juice, sugar, and organic essential oils. We strictly ban synthetic "black henna" containing toxic PPD.',
    typesOfServices: [
      { name: 'Simple Finger & Palm Accent Mehndi', price: '$15 CAD', duration: '15–20 min', purpose: 'Delicate ring patterns and minimalist floral fingertips.' },
      { name: 'One-Side Hand Mehndi', price: '$25 CAD', duration: '20–30 min', purpose: 'Graceful floral or mandala design covering one side of the hand.' },
      { name: 'Both-Side Hand Mehndi', price: '$60 CAD', duration: '60–90 min', purpose: 'Full palm and back-hand coverage for festive gatherings.' },
      { name: 'Traditional Arabic Bel Pattern', price: '$40 CAD', duration: '30–60 min', purpose: 'Flowing diagonal vine motifs with bold outlines and negative space.' },
      { name: 'Bespoke Royal Bridal Mehndi', price: '$250 CAD', duration: '4–8 hours', purpose: 'Intricate royal tapestries, dulha-dulhan portraits, doli scenes, and dense bridal filigree.' }
    ],
    purposeAndBenefits: [
      '100% natural plant-derived dye celebrating cultural heritage and joyful milestones.',
      'Pleasant cooling sensation and calming aromatherapeutic scent of natural lavender/cajeput oils.',
      'Rich, dark mahogany stain that matures naturally over 48 hours and lasts 1 to 2 weeks.'
    ],
    beforeAppointment: [
      'Wax, thread, or shave the target skin at least 24 to 48 hours prior to mehndi application.',
      'Shower and wash hands thoroughly with plain soap—do not apply lotions, oils, or moisturizers before your session.',
      'Wear comfortable clothing that leaves hands, wrists, or feet completely uncovered.'
    ],
    stepByStepProcess: [
      { step: 1, title: 'Skin Preparation', detail: 'Cleansing the skin with alcohol-free toner to remove surface lipids.' },
      { step: 2, title: 'Freehand Cone Piping', detail: 'Intricate hand-drawing using superfine-tip organic henna cones.' },
      { step: 3, title: 'Natural Drying', detail: 'Allowing the paste to set for 20 to 30 minutes until dry to the touch.' },
      { step: 4, title: 'Lemon-Sugar Sealant', detail: 'Gently dabbing warm lemon-sugar syrup to keep paste moist and active.' },
      { step: 5, title: 'Safe Oil Removal Guidance', detail: 'Instructing client to scrape off paste with oil after 4 to 8 hours.' }
    ],
    timeAndPriceInfo: 'Services range from $15 to $250+ CAD and run from 15 minutes to several hours for full bridal rituals.',
    aftercareGuidance: [
      'Keep the dried paste on your skin for at least 4 to 8 hours (or overnight) for maximum stain depth.',
      'Never wash dried henna paste off with water! Scrape it off gently using coconut oil or mustard oil.',
      'Avoid all water, dish soap, and harsh detergents for the first 12 to 24 hours after paste removal.',
      'Keep hands warm—natural body warmth significantly deepens the henna stain.'
    ],
    safetyInformation: [
      'Chemical-Free Guarantee: We never use toxic "black henna" or synthetic dye accelerators containing PPD (para-phenylenediamine), which cause chemical burns and permanent skin scarring.',
      'Allergy Precaution: Pure henna paste contains mild essential oils (lavender, cajeput). Notify your artist of any botanical sensitivities.'
    ],
    faqs: [
      { q: 'Why is my henna bright orange when I first scrape it off?', a: 'Natural henna always begins as bright pumpkin orange upon removal. As the natural lawsone dye oxidizes with oxygen over 24 to 48 hours, it gradually matures into a deep, rich reddish-brown or dark mahogany.' },
      { q: 'How long does a natural henna stain last?', a: 'Natural mehndi typically lasts between 7 to 14 days, gradually fading as your outer skin cells naturally exfoliate.' }
    ],
    relatedCategories: ['bridal', 'nails', 'skin-care']
  },
  {
    id: 'bridal',
    slug: 'bridal',
    name: 'Bridal Services',
    subtitle: 'Royal South-Asian Wedding Transformations',
    summary: 'Holistic wedding packages coordinating multi-day bridal mehndi, 16-hour airbrush makeup, couture hair updo sculpting, and jewelry anchoring.',
    about: 'Bridal beauty is a comprehensive, multi-step artistic collaboration designed to make every bride look and feel radiant, confident, and regal throughout her wedding festivities. From pre-wedding skin preparation and full bridal mehndi ceremonies to the final wedding morning dupatta setting and matha patti placement, every detail is meticulously orchestrated.',
    typesOfServices: [
      { name: 'Royal Wedding Morning Full Glam', price: '$250 CAD', duration: '2.5 hours', purpose: 'Full waterproof HD airbrush makeup, couture updo, dupatta draping, and jewelry setting.' },
      { name: 'Bridal Hands & Feet Mehndi Ceremony', price: '$350 CAD', duration: '5–8 hours', purpose: 'Intricate custom bridal mehndi covering both hands, forearms, and feet.' },
      { name: 'Sangeet / Mehendi Event Styling', price: '$150 CAD', duration: '90 min', purpose: 'Festive hair styling, soft glam makeup, and lehenga dupatta pinning.' },
      { name: 'Pre-Wedding Bridal Skin Glow Package', price: '$120 CAD', duration: '2 hours', purpose: 'Full face threading, brightening botanical facial, and nourishing body glow ritual.' }
    ],
    purposeAndBenefits: [
      'Harmonizes jewelry, outfit embroidery, and makeup into a unified royal aesthetic.',
      'Secure anchoring systems ensure heavy dupattas, veils, and jewelry remain firmly in place through hours of photography.',
      'Dermatologically tested long-wear products prevent shine or smudging under intense stage lighting.'
    ],
    beforeAppointment: [
      'Schedule a bridal hair and makeup consultation 2 to 3 months prior to finalize looks.',
      'Bring your actual bridal jewelry, dupatta, and outfit photos to consultations.',
      'Complete all waxing, threading, and deep facials at least 3 to 5 days before the wedding day.'
    ],
    stepByStepProcess: [
      { step: 1, title: 'Bridal Prep & Skin Hydration', detail: 'Calming skin with botanical mist and lightweight moisture base.' },
      { step: 2, title: 'Airbrush HD Makeup', detail: 'Flawless 16-hour base, precision contouring, and waterproof eye artistry.' },
      { step: 3, title: 'Hairstyle & Floral Architecture', detail: 'Sculpting bridal updo or waves with heavy pin anchoring.' },
      { step: 4, title: 'Jewelry & Dupatta Pinning', detail: 'Pinning matha patti, nath, heavy earrings, and precision dupatta pleating.' }
    ],
    timeAndPriceInfo: 'Bridal services range from $120 to $350+ CAD depending on the ceremony and service combination.',
    aftercareGuidance: [
      'Designate a bridesmaid or family member with a touch-up kit (blotting paper, lipstick, bobby pins).',
      'Remove dupattas carefully by unclipping safety pins one by one from beneath hair padding.'
    ],
    safetyInformation: [
      'Stress & Hydration: Wedding schedules can be demanding; stay well-hydrated and eat a light meal before your styling appointment begins.'
    ],
    faqs: [
      { q: 'When should I book my bridal beauty team?', a: 'We recommend booking your wedding date 4 to 8 months in advance, especially for peak wedding season (May through October).' }
    ],
    relatedCategories: ['makeup', 'mehndi', 'hair-styling']
  },
  {
    id: 'spa-and-body',
    slug: 'spa-and-body',
    name: 'Spa & Body Treatments',
    subtitle: 'Herbal Warm Oil Holistic Therapy & Tension Relief',
    summary: 'Traditional Shanti full-body relaxation massages, revitalizing Ayurvedic Indian head massages (Champi), and soothing herbal shoulder therapy.',
    about: 'Spa and body rituals at GLAM GIRL BY JANKI are grounded in traditional Indian holistic wellness and Ayurvedic principles. By warming organic herb-infused oils and employing rhythmic, calming effleurage, these treatments work to soothe muscle fatigue, encourage lymph drainage, release tension in the neck and shoulders, and restore inner equilibrium.',
    typesOfServices: [
      { name: 'Shanti Full Body Relaxation Massage', price: '$70 CAD', duration: '60 min', purpose: 'Full-body relaxation therapy using warm herbal oils to relieve stress and tension.' },
      { name: 'Ayurvedic Indian Head Massage (Champi)', price: '$35 CAD', duration: '30 min', purpose: 'Traditional marma-point scalp, neck, and shoulder massage encouraging hair growth and mental clarity.' },
      { name: 'Neck, Back & Shoulder Tension Relief', price: '$45 CAD', duration: '40 min', purpose: 'Targeted deep-tissue kneading to release desk fatigue and postural tension.' },
      { name: 'Herbal Body Polish & Skin Smoothing', price: '$85 CAD', duration: '60 min', purpose: 'Gentle sugar and almond oil body polish leaving skin velvet-soft.' }
    ],
    purposeAndBenefits: [
      'Promotes deep nervous system relaxation and stress reduction.',
      'Improves circulation and helps flush metabolic waste through lymphatic drainage.',
      'Ayurvedic head massage nourishes scalp follicles and relieves tension headaches.'
    ],
    beforeAppointment: [
      'Avoid heavy meals for at least 1 hour prior to your massage session.',
      'Inform your specialist of any muscle injuries, recent surgeries, pregnancy, or high blood pressure.',
      'Wear comfortable clothing; remove necklaces and heavy earrings before beginning.'
    ],
    stepByStepProcess: [
      { step: 1, title: 'Consultation & Oil Selection', detail: 'Discussing pressure preference and selecting warm herbal oil blends.' },
      { step: 2, title: 'Relaxation Breathing', detail: 'Gentle inhalation of calming lavender or sandalwood aromatherapy.' },
      { step: 3, title: 'Rhythmic Bodywork', detail: 'Applying warm oil with smooth, gliding strokes and gentle marma-point stimulation.' },
      { step: 4, title: 'Warm Towel Compress', detail: 'Warm moist towels gently wiping excess surface oil.' }
    ],
    timeAndPriceInfo: 'Body rituals range from $35 to $85 CAD and run 30 to 60 minutes.',
    aftercareGuidance: [
      'Drink plenty of room-temperature water throughout the rest of the day to stay hydrated.',
      'Leave nourishing herbal oils on hair or skin for a few hours before showering if possible.',
      'Avoid heavy physical strain or strenuous exercise immediately following your massage.'
    ],
    safetyInformation: [
      'Medical Contraindications: Massage is not recommended during acute fever, infectious skin conditions, unmanaged hypertension, or first-trimester pregnancy without physician consent.'
    ],
    faqs: [
      { q: 'Is Indian Head Massage (Champi) performed clothed?', a: 'Yes, head massages can be performed seated in comfortable everyday clothing, or draped on the massage table.' }
    ],
    relatedCategories: ['hair-treatments', 'skin-care', 'grooming']
  },
  {
    id: 'grooming',
    slug: 'grooming',
    name: 'Grooming',
    subtitle: 'Regular Facial Maintenance & Clean Refinement',
    summary: 'Fast, routine grooming touch-ups, brow maintenance, clean lip and chin hair removal, and express skincare for everyday confidence.',
    about: 'Grooming services are the routine maintenance rituals that keep everyday features clean, polished, and refreshed. Designed for quick convenience and maximum precision, our grooming menu offers fast, affordable walk-in and scheduled touch-ups including eyebrow cleanups, upper lip threading, and express facial hair refinement.',
    typesOfServices: [
      { name: 'Eyebrow Maintenance Cleanup', price: '$10 CAD', duration: '10 min', purpose: 'Quick cleanup of stray brow regrowth keeping your shape razor-sharp.' },
      { name: 'Upper Lip Grooming Cleanup', price: '$8 CAD', duration: '5 min', purpose: 'Gentle express threading of upper lip shadow.' },
      { name: 'Full Chin & Neck Cleanup', price: '$12 CAD', duration: '10 min', purpose: 'Clearing unwanted hairs from jawline and neck borders.' },
      { name: 'Sideburns Shaping & Blending', price: '$10 CAD', duration: '10 min', purpose: 'Softening and refining temple hair boundaries.' },
      { name: 'Express Facial Hair Grooming Bundle', price: '$22 CAD', duration: '15 min', purpose: 'Complete brow, upper lip, and chin grooming in a single session.' }
    ],
    purposeAndBenefits: [
      'Maintains consistent facial hygiene and polished, natural definition.',
      'Fast, efficient appointments easily fitted into lunch breaks or busy schedules.',
      'Regular upkeep makes each subsequent session faster and virtually painless.'
    ],
    beforeAppointment: [
      'No extensive prep required; arrive with clean skin free of heavy makeup around the target areas.'
    ],
    stepByStepProcess: [
      { step: 1, title: 'Sanitization', detail: 'Quick antiseptic skin wipe.' },
      { step: 2, title: 'Precision Cleanup', detail: 'Targeted threading or gentle wax strip removal.' },
      { step: 3, title: 'Cooling Soothe', detail: 'Soothing organic aloe vera or rosewater pat-down.' }
    ],
    timeAndPriceInfo: 'Grooming services range from $8 to $22 CAD and take 5 to 15 minutes.',
    aftercareGuidance: [
      'Avoid touching freshly groomed skin for 2 hours to keep follicles clear.',
      'Skip heavy liquid foundation immediately after facial hair grooming.'
    ],
    safetyInformation: [
      'Single-use, sterile materials for all facial touch-ups ensure safe, breakout-free maintenance.'
    ],
    faqs: [
      { q: 'How often should I do grooming maintenance?', a: 'Most clients visit every 2 to 3 weeks for express brow and lip cleanups.' }
    ],
    relatedCategories: ['threading', 'waxing', 'skin-care']
  }
];

/**
 * Helper to find a category guidance record by slug, id, or alias.
 */
export function findBeautyGuideCategory(param) {
  if (!param) return null;
  const target = String(param).toLowerCase().trim();
  return (
    BEAUTY_GUIDE_CATEGORIES.find((c) => {
      if (c.id === target || c.slug === target) return true;
      if (c.slug.replace(/[-_]/g, '') === target.replace(/[-_]/g, '')) return true;
      return false;
    }) || null
  );
}

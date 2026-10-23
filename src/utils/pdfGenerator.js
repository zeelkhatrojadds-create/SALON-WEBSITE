/**
 * GLAM GIRL BY JANKI — Ultra-Premium Editorial Beauty Menu Generator
 * Generates bespoke, art-directed A4 beauty magazine lookbooks
 * strictly following brand aesthetics, alternating color themes, and verified catalog data.
 */

import { jsPDF } from 'jspdf';

// Brand Palette (STRICT: Deep Black, Forest Green, Olive Green, Soft Sage, Warm Cream, White)
export const BRAND_COLORS = {
  black: [16, 17, 15],        // #10110F
  forestGreen: [38, 61, 43],   // #263D2B
  oliveGreen: [70, 86, 64],    // #465640
  softSage: [168, 181, 160],   // #A8B5A0
  warmCream: [247, 244, 237],  // #F7F4ED
  white: [255, 255, 255],      // #FFFFFF
  borderLight: [220, 225, 216],// #DCE1D8
  mutedOnLight: [107, 112, 104],// #6B7068
  mutedOnDark: [168, 181, 160] // #A8B5A0
};

/**
 * Safely format duration for PDF
 */
function formatDurationSafe(duration, durationDisplay) {
  if (durationDisplay) return durationDisplay;
  if (!duration) return 'Duration not specified';
  const str = String(duration).trim();
  if (!str) return 'Duration not specified';
  if (/^\d+$/.test(str)) {
    const mins = parseInt(str, 10);
    if (mins >= 60) {
      const hrs = Math.floor(mins / 60);
      const rem = mins % 60;
      return rem > 0 ? `${hrs}h ${rem}m (${mins} min)` : `${hrs} hr${hrs > 1 ? 's' : ''}`;
    }
    return `${mins} min`;
  }
  return str;
}

/**
 * Convert local image to base64 via Canvas for safe jsPDF embedding
 */
async function loadBase64Image(url, timeoutMs = 800) {
  if (typeof window === 'undefined') return null;
  return new Promise((resolve) => {
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      resolve(null);
    }, timeoutMs);

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      if (timedOut) return;
      clearTimeout(timer);
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.86);
        resolve({
          dataUrl,
          width: canvas.width,
          height: canvas.height
        });
      } catch (err) {
        resolve(null);
      }
    };
    img.onerror = () => {
      clearTimeout(timer);
      resolve(null);
    };
    img.src = url;
  });
}

/**
 * Draw running header on interior pages
 */
function drawPageHeader(doc, pageWidth, margin, isDarkPage = false) {
  const textColor = isDarkPage ? BRAND_COLORS.softSage : BRAND_COLORS.mutedOnLight;
  const lineColor = isDarkPage ? [55, 75, 60] : BRAND_COLORS.borderLight;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...textColor);
  doc.text('GLAM GIRL BY JANKI  •  THE BEAUTY MENU', margin, 13);

  doc.setFont('times', 'italic');
  doc.text('Ottawa, Canada  •  Atelier Collection', pageWidth - margin, 13, { align: 'right' });

  doc.setDrawColor(...lineColor);
  doc.setLineWidth(0.25);
  doc.line(margin, 16, pageWidth - margin, 16);
}

/**
 * Draw running footer on interior pages
 */
function drawPageFooter(doc, pageNum, totalPages, pageWidth, pageHeight, margin, isDarkPage = false) {
  const textColor = isDarkPage ? BRAND_COLORS.softSage : BRAND_COLORS.mutedOnLight;
  const lineColor = isDarkPage ? [55, 75, 60] : BRAND_COLORS.borderLight;

  doc.setDrawColor(...lineColor);
  doc.setLineWidth(0.25);
  doc.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...textColor);
  doc.text('All prices in Canadian Dollars (CAD). Advance reservation recommended.', margin, pageHeight - 10);

  doc.setFont('helvetica', 'bold');
  doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
}

/**
 * MASTER GENERATOR: Complete Editorial Beauty Menu (PDF)
 */
export async function generateBeautyMenuPDF({
  services = [],
  comboPackages = [],
  settings = {},
  editionTitle = 'Annual Atelier Edition'
}) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - (margin * 2);

  const salonName = settings.businessName || 'GLAM GIRL BY JANKI';
  const salonTagline = 'Your Beauty. Your Moment.';
  const salonAddress = settings.address || '405 Euphoria Crescent, Ottawa, ON K2J 7M7';
  const salonPhone = settings.phone || '+1 (616) 255-0549';
  const salonEmail = settings.email || 'Glamgirlbyjanki@gmail.com';
  const websiteUrl = 'https://glamgirlbyjanki.ca';
  const dateFormatted = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Pre-load cover photograph if available
  const coverImg = await loadBase64Image('/floral-booking.jpg', 600) || 
                   await loadBase64Image('/atelier-salon-interior.jpg', 600);

  // Track page theme for footer/header styling: 'light' | 'forest' | 'black'
  const pageThemes = ['light']; // Page 1 is cover (light cream)

  // =========================================================================
  // PAGE 1: THE COVER (A4 LUXURY EDITORIAL LOOKBOOK)
  // =========================================================================
  // Warm Cream Background
  doc.setFillColor(...BRAND_COLORS.warmCream);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Architectural Framing (Double Forest & Olive Border)
  doc.setDrawColor(...BRAND_COLORS.forestGreen);
  doc.setLineWidth(0.65);
  doc.rect(margin - 4, margin - 4, contentWidth + 8, pageHeight - (margin * 2) + 8);

  doc.setDrawColor(...BRAND_COLORS.oliveGreen);
  doc.setLineWidth(0.25);
  doc.rect(margin - 1.5, margin - 1.5, contentWidth + 3, pageHeight - (margin * 2) + 3);

  // Top Atelier Label
  let y = margin + 12;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...BRAND_COLORS.oliveGreen);
  doc.text('HAUTE BEAUTÉ  •  ATELIER  •  OTTAWA', pageWidth / 2, y, { align: 'center' });

  // Main Brand Wordmark (Oversized Editorial Serif)
  y += 14;
  doc.setFont('times', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(...BRAND_COLORS.black);
  doc.text(salonName, pageWidth / 2, y, { align: 'center' });

  // Center Line Divider
  y += 5;
  doc.setDrawColor(...BRAND_COLORS.forestGreen);
  doc.setLineWidth(0.4);
  doc.line(pageWidth / 2 - 20, y, pageWidth / 2 + 20, y);

  // Magazine Title: THE BEAUTY MENU
  y += 12;
  doc.setFont('times', 'italic');
  doc.setFontSize(18);
  doc.setTextColor(...BRAND_COLORS.forestGreen);
  doc.text('The Beauty Menu', pageWidth / 2, y, { align: 'center' });

  // Tagline
  y += 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...BRAND_COLORS.oliveGreen);
  doc.text(salonTagline, pageWidth / 2, y, { align: 'center' });

  // Center Cover Image / Framing
  y += 10;
  const imgBoxHeight = 115;
  const imgBoxWidth = contentWidth - 16;
  const imgBoxX = margin + 8;

  if (coverImg && coverImg.dataUrl) {
    try {
      // Subtle image border
      doc.setDrawColor(...BRAND_COLORS.forestGreen);
      doc.setLineWidth(0.4);
      doc.rect(imgBoxX - 1, y - 1, imgBoxWidth + 2, imgBoxHeight + 2);
      doc.addImage(coverImg.dataUrl, 'JPEG', imgBoxX, y, imgBoxWidth, imgBoxHeight);
    } catch (e) {
      // Graceful fallback frame
      doc.setFillColor(...BRAND_COLORS.forestGreen);
      doc.rect(imgBoxX, y, imgBoxWidth, imgBoxHeight, 'F');
      doc.setFont('times', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(...BRAND_COLORS.warmCream);
      doc.text('GLAM GIRL BY JANKI', pageWidth / 2, y + 55, { align: 'center' });
    }
  } else {
    // Elegant botanical vector placeholder box
    doc.setFillColor(...BRAND_COLORS.forestGreen);
    doc.rect(imgBoxX, y, imgBoxWidth, imgBoxHeight, 'F');
    doc.setFont('times', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(...BRAND_COLORS.warmCream);
    doc.text('GLAM GIRL BY JANKI', pageWidth / 2, y + 55, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...BRAND_COLORS.softSage);
    doc.text('Bespoke Beauty Rituals & Bridal Artistry', pageWidth / 2, y + 64, { align: 'center' });
  }

  // Cover Quote / Intro
  y += imgBoxHeight + 12;
  doc.setFont('times', 'italic');
  doc.setFontSize(10.5);
  doc.setTextColor(...BRAND_COLORS.black);
  doc.text('“A considered collection of beauty rituals, personalized treatments,', pageWidth / 2, y, { align: 'center' });
  y += 5.5;
  doc.text('and signature salon experiences—beautifully brought together.”', pageWidth / 2, y, { align: 'center' });

  // Bottom Metadata & Concierge Bar
  y = pageHeight - margin - 22;
  doc.setDrawColor(...BRAND_COLORS.borderLight);
  doc.setLineWidth(0.3);
  doc.line(margin + 12, y, pageWidth - margin - 12, y);

  y += 7;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...BRAND_COLORS.forestGreen);
  doc.text(editionTitle || `Official Atelier Collection  •  ${dateFormatted}`, pageWidth / 2, y, { align: 'center' });

  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...BRAND_COLORS.mutedOnLight);
  doc.text(`${salonAddress}  •  ${salonPhone}  •  ${websiteUrl}`, pageWidth / 2, y, { align: 'center' });

  // =========================================================================
  // GROUP ACTIVE SERVICES INTO CURATED EDITORIAL CATEGORIES
  // =========================================================================
  const activeServices = (services || []).filter(s => s && s.active !== false);

  // Canonical category ordering with introductory lines
  const categoryDefinitions = [
    {
      key: 'hair',
      title: 'HAIR COUTURE & CARE',
      intro: 'Precision cuts, holistic herbal oil infusions, and restorative gloss therapies designed around your hair texture.',
      filter: (s) => {
        const cat = String(s.category || s.categoryName || '').toLowerCase();
        return cat.includes('hair') || cat.includes('cut') || cat.includes('colour') || cat.includes('treatment');
      },
      theme: 'forest' // Deep Forest Green page background!
    },
    {
      key: 'skin',
      title: 'SKIN CARE & FACIAL ATELIER',
      intro: 'Botanical cleansing, cellular exfoliation, and sculpting massage for instant radiance and deep relaxation.',
      filter: (s) => {
        const cat = String(s.category || s.categoryName || '').toLowerCase();
        return cat.includes('facial') || cat.includes('skin');
      },
      theme: 'light' // Warm Cream background
    },
    {
      key: 'makeup-bridal',
      title: 'MAKEUP & BRIDAL ARTISTRY',
      intro: 'Artisanal henna couture, bridal makeovers, and red-carpet glam tailored to your celebration.',
      filter: (s) => {
        const cat = String(s.category || s.categoryName || '').toLowerCase();
        return cat.includes('makeup') || cat.includes('bridal') || cat.includes('henna') || cat.includes('mehndi');
      },
      theme: 'black' // Deep Black background!
    },
    {
      key: 'nails-waxing',
      title: 'NAILS, WAXING & GROOMING',
      intro: 'Delicate organic thread contouring, silky waxing, and refined manicures.',
      filter: (s) => {
        const cat = String(s.category || s.categoryName || '').toLowerCase();
        return cat.includes('nail') || cat.includes('wax') || cat.includes('thread') || cat.includes('lash');
      },
      theme: 'light' // Warm Cream background
    },
    {
      key: 'body-spa',
      title: 'HOLISTIC SPA & BODY RITUALS',
      intro: 'Restorative Ayurvedic body rituals designed to release tension and rejuvenate the senses.',
      filter: (s) => {
        const cat = String(s.category || s.categoryName || '').toLowerCase();
        return cat.includes('massage') || cat.includes('spa');
      },
      theme: 'forest' // Deep Forest Green background!
    }
  ];

  // Group active services ensuring every service appears exactly once
  const processedServiceIds = new Set();
  const categoryBatches = [];

  categoryDefinitions.forEach(catDef => {
    const matched = activeServices.filter(s => {
      const id = s.id || s.slug || s.name;
      if (processedServiceIds.has(id)) return false;
      if (catDef.filter(s)) {
        processedServiceIds.add(id);
        return true;
      }
      return false;
    });

    if (matched.length > 0) {
      categoryBatches.push({
        title: catDef.title,
        intro: catDef.intro,
        theme: catDef.theme,
        services: matched
      });
    }
  });

  // Catch any remaining active services
  const remainingServices = activeServices.filter(s => {
    const id = s.id || s.slug || s.name;
    return !processedServiceIds.has(id);
  });

  if (remainingServices.length > 0) {
    categoryBatches.push({
      title: 'ADDITIONAL SPECIALIZED TREATMENTS',
      intro: 'Bespoke beauty refinements and specialized salon services.',
      theme: 'light',
      services: remainingServices
    });
  }

  // =========================================================================
  // RENDER EDITORIAL SERVICE COLLECTIONS WITH ALTERNATING THEMES
  // =========================================================================
  let currentTheme = 'light';

  // Helper to start a fresh themed page
  const startThemedPage = (theme = 'light') => {
    doc.addPage();
    currentTheme = theme;
    pageThemes.push(theme);

    // Apply Background
    if (theme === 'forest') {
      doc.setFillColor(...BRAND_COLORS.forestGreen);
    } else if (theme === 'black') {
      doc.setFillColor(...BRAND_COLORS.black);
    } else {
      doc.setFillColor(...BRAND_COLORS.warmCream);
    }
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Subtle page border
    const isDark = theme === 'forest' || theme === 'black';
    const borderCol = isDark ? [55, 75, 60] : BRAND_COLORS.borderLight;
    doc.setDrawColor(...borderCol);
    doc.setLineWidth(0.3);
    doc.rect(margin - 2, margin - 2, contentWidth + 4, pageHeight - (margin * 2) + 4);

    drawPageHeader(doc, pageWidth, margin, isDark);
    return 24; // starting y
  };

  categoryBatches.forEach((batch, batchIdx) => {
    // Start on a new page for major category batch
    y = startThemedPage(batch.theme);
    const isDark = batch.theme === 'forest' || batch.theme === 'black';

    // Editorial Category Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...(isDark ? BRAND_COLORS.softSage : BRAND_COLORS.oliveGreen));
    doc.text(`COLLECTION 0${batchIdx + 1}`, margin + 2, y);

    y += 6;
    doc.setFont('times', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(...(isDark ? BRAND_COLORS.warmCream : BRAND_COLORS.black));
    doc.text(batch.title, margin + 2, y);

    y += 5.5;
    if (batch.intro) {
      doc.setFont('times', 'italic');
      doc.setFontSize(8.5);
      doc.setTextColor(...(isDark ? BRAND_COLORS.softSage : BRAND_COLORS.mutedOnLight));
      const introLines = doc.splitTextToSize(batch.intro, contentWidth - 4);
      doc.text(introLines, margin + 2, y);
      y += (introLines.length * 4.2) + 3;
    }

    // Divider Line
    doc.setDrawColor(...(isDark ? [70, 95, 75] : BRAND_COLORS.borderLight));
    doc.setLineWidth(0.3);
    doc.line(margin + 2, y, pageWidth - margin - 2, y);
    y += 5.5;

    // Render Services in Two-Column or Spacious Single Column
    batch.services.forEach((service) => {
      const priceText = `$${Number(service.price) || 0} CAD`;
      const durationText = formatDurationSafe(service.duration, service.durationDisplay);
      const desc = service.description ? String(service.description).trim() : '';

      // Estimate item height
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      const descLines = desc ? doc.splitTextToSize(desc, contentWidth - 36) : [];
      const itemHeight = Math.max(10, 6 + (descLines.length * 3.4));

      // Page break check
      if (y + itemHeight > pageHeight - 22) {
        y = startThemedPage(batch.theme);
      }

      // 1. Service Name (Left)
      doc.setFont('times', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(...(isDark ? BRAND_COLORS.warmCream : BRAND_COLORS.black));
      doc.text(service.name, margin + 2, y);

      // 2. Price (Right Aligned)
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(...(isDark ? BRAND_COLORS.softSage : BRAND_COLORS.forestGreen));
      doc.text(priceText, pageWidth - margin - 2, y, { align: 'right' });

      // 3. Duration & Dotted line
      y += 4;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(...(isDark ? BRAND_COLORS.softSage : BRAND_COLORS.mutedOnLight));
      doc.text(durationText, margin + 2, y);

      // Dotted leader
      doc.setDrawColor(...(isDark ? [60, 80, 65] : [210, 215, 205]));
      doc.setLineWidth(0.15);
      doc.setLineDashPattern([0.8, 1.2], 0);
      doc.line(margin + 35, y - 0.5, pageWidth - margin - 28, y - 0.5);
      doc.setLineDashPattern([], 0); // reset

      // 4. Description if available
      if (descLines.length > 0) {
        y += 3.8;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(...(isDark ? [215, 222, 210] : BRAND_COLORS.mutedOnLight));
        doc.text(descLines, margin + 2, y);
        y += (descLines.length * 3.4) + 2.5;
      } else {
        y += 4;
      }
    });
  });

  // =========================================================================
  // SIGNATURE PACKAGES PAGE (WHERE PUBLISHED PACKAGES EXIST)
  // =========================================================================
  const activePackages = (comboPackages || []).filter(p => p && p.active !== false);

  if (activePackages.length > 0) {
    y = startThemedPage('warmCream');
    const isDark = false;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...BRAND_COLORS.oliveGreen);
    doc.text('SIGNATURE CURATIONS', margin + 2, y);

    y += 6;
    doc.setFont('times', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(...BRAND_COLORS.black);
    doc.text('Exclusive Beauty Packages', margin + 2, y);

    y += 5.5;
    doc.setFont('times', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(...BRAND_COLORS.mutedOnLight);
    doc.text('Thoughtfully assembled combinations delivering comprehensive care with approved atelier savings.', margin + 2, y);

    y += 6;
    doc.setDrawColor(...BRAND_COLORS.borderLight);
    doc.setLineWidth(0.3);
    doc.line(margin + 2, y, pageWidth - margin - 2, y);
    y += 7;

    activePackages.forEach((pkg) => {
      const priceText = `$${Number(pkg.comboPrice) || 0} CAD`;
      const desc = pkg.description || '';
      const servicesIncluded = Array.isArray(pkg.servicesIncluded) ? pkg.servicesIncluded : [];
      const durationText = formatDurationSafe(pkg.duration, pkg.durationDisplay);
      const hasSavings = Number(pkg.savingsAmount) > 0;

      // Estimate card height
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      const descLines = desc ? doc.splitTextToSize(desc, contentWidth - 40) : [];
      const cardHeight = Math.max(22, 13 + (descLines.length * 3.5) + (servicesIncluded.length * 3.2));

      if (y + cardHeight > pageHeight - 22) {
        y = startThemedPage('warmCream');
      }

      // Editorial Card container
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(margin, y, contentWidth, cardHeight, 1.5, 1.5, 'F');
      doc.setDrawColor(...BRAND_COLORS.borderLight);
      doc.rect(margin, y, contentWidth, cardHeight, 'S');

      // Package Name
      doc.setFont('times', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(...BRAND_COLORS.black);
      doc.text(pkg.name, margin + 4, y + 6);

      // Price Tag
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(...BRAND_COLORS.forestGreen);
      doc.text(priceText, pageWidth - margin - 4, y + 6, { align: 'right' });

      // Duration & Savings Tag
      let metaY = y + 10;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(...BRAND_COLORS.oliveGreen);
      doc.text(`Duration: ${durationText}`, margin + 4, metaY);

      if (hasSavings) {
        doc.setFont('helvetica', 'bold');
        doc.text(`Save $${pkg.savingsAmount} CAD`, pageWidth - margin - 4, metaY, { align: 'right' });
      }

      let innerY = metaY + 4.5;
      if (descLines.length > 0) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(...BRAND_COLORS.mutedOnLight);
        doc.text(descLines, margin + 4, innerY);
        innerY += (descLines.length * 3.5) + 1.5;
      }

      if (servicesIncluded.length > 0) {
        servicesIncluded.forEach((inc) => {
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(7);
          doc.setTextColor(...BRAND_COLORS.forestGreen);
          doc.text(`✦  ${inc}`, margin + 6, innerY);
          innerY += 3.2;
        });
      }

      y += cardHeight + 5;
    });
  }

  // =========================================================================
  // CLOSING PAGE: THE INVITATION (PRESTIGE EDITORIAL FINALE)
  // =========================================================================
  y = startThemedPage('black'); // Deep black final luxury invitation page
  const isDark = true;

  // Architectural Center Frame
  const frameWidth = contentWidth - 16;
  const frameHeight = pageHeight - (margin * 2) - 20;
  const frameX = margin + 8;
  const frameY = margin + 10;

  doc.setDrawColor(...BRAND_COLORS.softSage);
  doc.setLineWidth(0.4);
  doc.rect(frameX, frameY, frameWidth, frameHeight);

  doc.setDrawColor(...BRAND_COLORS.forestGreen);
  doc.setLineWidth(0.2);
  doc.rect(frameX + 2, frameY + 2, frameWidth - 4, frameHeight - 4);

  // Invitation Header
  let inviteY = frameY + 25;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...BRAND_COLORS.softSage);
  doc.text('THE INVITATION', pageWidth / 2, inviteY, { align: 'center' });

  inviteY += 12;
  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...BRAND_COLORS.warmCream);
  doc.text('Your Next Beauty Moment Awaits', pageWidth / 2, inviteY, { align: 'center' });

  inviteY += 8;
  doc.setFont('times', 'italic');
  doc.setFontSize(10.5);
  doc.setTextColor(...BRAND_COLORS.softSage);
  doc.text('Discover your next salon experience with GLAM GIRL BY JANKI.', pageWidth / 2, inviteY, { align: 'center' });

  // Decorative Botanical Motif Rule
  inviteY += 10;
  doc.setDrawColor(...BRAND_COLORS.softSage);
  doc.setLineWidth(0.3);
  doc.line(pageWidth / 2 - 25, inviteY, pageWidth / 2 + 25, inviteY);

  // Manifesto Paragraph
  inviteY += 14;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...BRAND_COLORS.warmCream);
  const closingText = [
    'Every treatment at our Ottawa atelier is dedicated to precision, artistry,',
    'and relaxed elegance. We welcome you to experience personalized care',
    'designed exclusively around your unique beauty goals.'
  ];
  closingText.forEach(line => {
    doc.text(line, pageWidth / 2, inviteY, { align: 'center' });
    inviteY += 5;
  });

  // Studio Concierge & Booking Details Card
  inviteY += 12;
  doc.setFillColor(...BRAND_COLORS.forestGreen);
  const boxW = frameWidth - 24;
  const boxH = 46;
  const boxX = pageWidth / 2 - (boxW / 2);
  doc.roundedRect(boxX, inviteY, boxW, boxH, 1.5, 1.5, 'F');
  doc.setDrawColor(...BRAND_COLORS.softSage);
  doc.setLineWidth(0.25);
  doc.rect(boxX, inviteY, boxW, boxH, 'S');

  let boxTextY = inviteY + 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...BRAND_COLORS.warmCream);
  doc.text('ATELIER RESERVATIONS & CONCIERGE', pageWidth / 2, boxTextY, { align: 'center' });

  boxTextY += 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...BRAND_COLORS.softSage);
  doc.text(`Studio Location: ${salonAddress}`, pageWidth / 2, boxTextY, { align: 'center' });

  boxTextY += 5.5;
  doc.text(`Phone: ${salonPhone}  •  Email: ${salonEmail}`, pageWidth / 2, boxTextY, { align: 'center' });

  boxTextY += 5.5;
  doc.text('Hours: Monday – Saturday, 9:00 AM – 7:00 PM (By Appointment)', pageWidth / 2, boxTextY, { align: 'center' });

  boxTextY += 7;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...BRAND_COLORS.warmCream);
  doc.text(`Reserve Online 24/7: ${websiteUrl}/book-appointment`, pageWidth / 2, boxTextY, { align: 'center' });

  // Discreet Bottom Stamp
  inviteY = frameY + frameHeight - 16;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...BRAND_COLORS.softSage);
  doc.text(`Document Reference: GGJ-MENU-2026-V8  •  Generated: ${dateFormatted}`, pageWidth / 2, inviteY, { align: 'center' });

  inviteY += 4;
  doc.text('© GLAM GIRL BY JANKI. All rights reserved. Prices subject to change without notice.', pageWidth / 2, inviteY, { align: 'center' });

  // =========================================================================
  // APPLY UNIFIED PAGE NUMBERING & FOOTERS TO ALL PAGES EXCEPT COVER
  // =========================================================================
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 2; i <= totalPages; i++) {
    doc.setPage(i);
    const pageTheme = pageThemes[i - 1] || 'light';
    const isDarkPage = pageTheme === 'forest' || pageTheme === 'black';
    drawPageFooter(doc, i, totalPages, pageWidth, pageHeight, margin, isDarkPage);
  }

  return doc;
}

/**
 * GENERATE DEDICATED SEASONAL BEAUTY MENU (PDF)
 */
export async function generateSeasonalMenuPDF({
  seasonalHighlights = [],
  settings = {},
  seasonName = 'Autumn & Winter'
}) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - (margin * 2);

  const salonName = settings.businessName || 'GLAM GIRL BY JANKI';
  const salonAddress = settings.address || '405 Euphoria Crescent, Ottawa, ON K2J 7M7';
  const salonPhone = settings.phone || '+1 (616) 255-0549';
  const websiteUrl = 'https://glamgirlbyjanki.ca';

  // Background
  doc.setFillColor(...BRAND_COLORS.warmCream);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  doc.setDrawColor(...BRAND_COLORS.forestGreen);
  doc.setLineWidth(0.6);
  doc.rect(margin - 4, margin - 4, contentWidth + 8, pageHeight - (margin * 2) + 8);

  let y = margin + 28;
  doc.setFont('times', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(...BRAND_COLORS.black);
  doc.text(salonName, pageWidth / 2, y, { align: 'center' });

  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...BRAND_COLORS.forestGreen);
  doc.text(`${seasonName.toUpperCase()} BEAUTY MENU`, pageWidth / 2, y, { align: 'center' });

  y += 18;
  doc.setFont('times', 'italic');
  doc.setFontSize(14);
  doc.setTextColor(...BRAND_COLORS.black);
  doc.text('“Discover the season. Embrace your glow.”', pageWidth / 2, y, { align: 'center' });

  y += 12;
  seasonalHighlights.forEach((item) => {
    const orig = Number(item.originalPrice) || 0;
    const promo = item.promotionalPrice !== null ? Number(item.promotionalPrice) : null;
    const effective = promo !== null && promo > 0 ? promo : orig;

    doc.setFont('times', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...BRAND_COLORS.black);
    doc.text(item.title, margin + 4, y);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...BRAND_COLORS.forestGreen);
    doc.text(`$${effective} CAD`, pageWidth - margin - 4, y, { align: 'right' });

    y += 5;
    if (item.description) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...BRAND_COLORS.mutedOnLight);
      const lines = doc.splitTextToSize(item.description, contentWidth - 8);
      doc.text(lines, margin + 4, y);
      y += (lines.length * 3.6) + 4;
    }
  });

  return doc;
}

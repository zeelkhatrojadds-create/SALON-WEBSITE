import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Download, 
  Printer, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Check, 
  AlertCircle, 
  X, 
  Maximize2, 
  Minimize2,
  Calendar,
  Layers,
  ShieldCheck,
  RotateCcw,
  BookMarked,
  Grid,
  Clock,
  Tag
} from 'lucide-react';
import salonDB from '../../db/salonDatabase';
import './Luxury3DBeautyMenu.css';

// 12-page editorial content definitions mapping to 6 two-page spreads
export const BOOK_PAGES = [
  // Page 1: Atelier Welcome & Philosophy
  {
    pageNumber: 1,
    tag: 'ATELIER PROLOGUE',
    title: 'The Art of Self-Care',
    subtitle: 'Quiet luxury, thoughtful care & botanical precision',
    theme: 'cream',
    type: 'welcome'
  },
  // Page 2: Hair Couture & Care
  {
    pageNumber: 2,
    tag: 'COLLECTION 01',
    title: 'Hair Couture & Styling',
    subtitle: 'Precision cuts, blowouts & bespoke colour',
    theme: 'forest',
    type: 'services',
    categoryKey: 'hair'
  },
  // Page 3: Restorative Hair Treatments
  {
    pageNumber: 3,
    tag: 'COLLECTION 01 (CONT.)',
    title: 'Hair Spa & Restoration',
    subtitle: 'Ayurvedic herbal oils, keratin & restorative gloss',
    theme: 'cream',
    type: 'services',
    categoryKey: 'hair-spa'
  },
  // Page 4: Skin Care & Facials
  {
    pageNumber: 4,
    tag: 'COLLECTION 02',
    title: 'Skin Care & Facial Atelier',
    subtitle: 'Cellular rejuvenation & bespoke botanical facials',
    theme: 'cream',
    type: 'services',
    categoryKey: 'facial'
  },
  // Page 5: Makeup & Royal Bridal
  {
    pageNumber: 5,
    tag: 'COLLECTION 03',
    title: 'Makeup & Royal Bridal',
    subtitle: 'Airbrush bridal couture & red-carpet glam',
    theme: 'black',
    type: 'services',
    categoryKey: 'makeup'
  },
  // Page 6: Mehndi / Henna Artistry
  {
    pageNumber: 6,
    tag: 'COLLECTION 03 (CONT.)',
    title: 'Artisanal Mehndi Couture',
    subtitle: '100% organic Rajasthani henna & bespoke bridal palms',
    theme: 'cream',
    type: 'services',
    categoryKey: 'henna'
  },
  // Page 7: Nails & Lashes
  {
    pageNumber: 7,
    tag: 'COLLECTION 04',
    title: 'Nails & Lash Embellishment',
    subtitle: 'Russian manicure, gel extensions & lash lifts',
    theme: 'forest',
    type: 'services',
    categoryKey: 'nails'
  },
  // Page 8: Waxing & Threading
  {
    pageNumber: 8,
    tag: 'COLLECTION 04 (CONT.)',
    title: 'Waxing & Precision Shaping',
    subtitle: 'Organic facial thread contouring & silky waxing',
    theme: 'cream',
    type: 'services',
    categoryKey: 'waxing'
  },
  // Page 9: Holistic Spa & Body
  {
    pageNumber: 9,
    tag: 'COLLECTION 05',
    title: 'Holistic Spa & Body Rituals',
    subtitle: 'Ayurvedic head massage & full body therapies',
    theme: 'cream',
    type: 'services',
    categoryKey: 'massage'
  },
  // Page 10: Signature Curated Packages
  {
    pageNumber: 10,
    tag: 'SIGNATURE CURATIONS',
    title: 'Exclusive Beauty Packages',
    subtitle: 'Carefully combined treatments with verified savings',
    theme: 'black',
    type: 'packages'
  },
  // Page 11: Plan Your Salon Day
  {
    pageNumber: 11,
    tag: 'SALON ITINERARY',
    title: 'Plan Your Salon Day',
    subtitle: 'Treatment synergy, timing & preparation etiquette',
    theme: 'cream',
    type: 'itinerary'
  },
  // Page 12: The Invitation & Concierge
  {
    pageNumber: 12,
    tag: 'THE INVITATION',
    title: 'Your Next Beauty Moment',
    subtitle: 'Studio reservations, concierge & atelier policies',
    theme: 'forest',
    type: 'invitation'
  }
];

export default function LuxuryBeautyMenuPreviewSection() {
  const [services, setServices] = useState(() => salonDB.getServices());
  const [comboPackages, setComboPackages] = useState(() => salonDB.getActiveComboPackages());
  const [settings, setSettings] = useState(() => salonDB.getSettings());

  // 3D Magazine Navigation State
  const [isCoverOpen, setIsCoverOpen] = useState(false);
  const [currentSpread, setCurrentSpread] = useState(1); // 1 to 6
  const [mobilePage, setMobilePage] = useState(1);       // 1 to 12
  
  // Animation state
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState('next'); // 'next' | 'prev'
  const [sourceSpread, setSourceSpread] = useState(1);
  const [targetSpread, setTargetSpread] = useState(1);
  const [sourceMobilePage, setSourceMobilePage] = useState(1);
  const [targetMobilePage, setTargetMobilePage] = useState(1);

  // UI state
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState({ type: '', text: '' });
  const [isMobileView, setIsMobileView] = useState(false);

  const containerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  // Sync DB
  useEffect(() => {
    const sync = () => {
      setServices(salonDB.getServices());
      setComboPackages(salonDB.getActiveComboPackages());
      setSettings(salonDB.getSettings());
    };
    const unsub = salonDB.subscribe(sync);
    return () => unsub();
  }, []);

  // Screen size check for mobile single-page vs desktop spread
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 840);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filtered actual services partitioned for pages
  const catalogByPage = useMemo(() => {
    const list = services.filter(s => s && s.active !== false);
    return {
      hair: list.filter(s => {
        const cat = String(s.category || s.categoryName || '').toLowerCase();
        return cat.includes('hair') && (cat.includes('cut') || cat.includes('colour') || cat.includes('style'));
      }).slice(0, 7),
      'hair-spa': list.filter(s => {
        const cat = String(s.category || s.categoryName || '').toLowerCase();
        return cat.includes('treatment') || cat.includes('spa') || cat.includes('wash');
      }).slice(0, 7),
      facial: list.filter(s => {
        const cat = String(s.category || s.categoryName || '').toLowerCase();
        return cat.includes('facial') || cat.includes('skin');
      }).slice(0, 7),
      makeup: list.filter(s => {
        const cat = String(s.category || s.categoryName || '').toLowerCase();
        return cat.includes('makeup') || cat.includes('bridal');
      }).slice(0, 7),
      henna: list.filter(s => {
        const cat = String(s.category || s.categoryName || '').toLowerCase();
        return cat.includes('henna') || cat.includes('mehndi');
      }).slice(0, 7),
      nails: list.filter(s => {
        const cat = String(s.category || s.categoryName || '').toLowerCase();
        return cat.includes('nail') || cat.includes('lash');
      }).slice(0, 7),
      waxing: list.filter(s => {
        const cat = String(s.category || s.categoryName || '').toLowerCase();
        return cat.includes('wax') || cat.includes('thread');
      }).slice(0, 7),
      massage: list.filter(s => {
        const cat = String(s.category || s.categoryName || '').toLowerCase();
        return cat.includes('massage') || cat.includes('spa');
      }).slice(0, 6)
    };
  }, [services]);

  // Can Navigate checks
  const canGoPrev = isMobileView ? mobilePage > 1 : (isCoverOpen && currentSpread > 1);
  const canGoNext = isMobileView ? mobilePage < 12 : (!isCoverOpen || currentSpread < 6);

  // Turn page actions with REAL physical 3D rotation
  const handleOpenCover = () => {
    if (isFlipping) return;
    setIsCoverOpen(true);
    setCurrentSpread(1);
    setMobilePage(1);
  };

  const handleCloseCover = () => {
    if (isFlipping) return;
    setIsCoverOpen(false);
  };

  const handleNext = useCallback(() => {
    if (isFlipping) return;

    if (!isCoverOpen) {
      handleOpenCover();
      return;
    }

    if (isMobileView) {
      if (mobilePage >= 12) return;
      const nextPage = mobilePage + 1;
      setFlipDirection('next');
      setSourceMobilePage(mobilePage);
      setTargetMobilePage(nextPage);
      setIsFlipping(true);

      setTimeout(() => {
        setMobilePage(nextPage);
        setIsFlipping(false);
      }, 700);
      return;
    }

    // Desktop Spread
    if (currentSpread >= 6) return;
    const nextSpread = currentSpread + 1;
    setFlipDirection('next');
    setSourceSpread(currentSpread);
    setTargetSpread(nextSpread);
    setIsFlipping(true);

    setTimeout(() => {
      setCurrentSpread(nextSpread);
      setIsFlipping(false);
    }, 750);
  }, [isFlipping, isCoverOpen, isMobileView, mobilePage, currentSpread]);

  const handlePrev = useCallback(() => {
    if (isFlipping) return;
    if (!isCoverOpen) return;

    if (isMobileView) {
      if (mobilePage <= 1) {
        setIsCoverOpen(false);
        return;
      }
      const prevPage = mobilePage - 1;
      setFlipDirection('prev');
      setSourceMobilePage(mobilePage);
      setTargetMobilePage(prevPage);
      setIsFlipping(true);

      setTimeout(() => {
        setMobilePage(prevPage);
        setIsFlipping(false);
      }, 700);
      return;
    }

    // Desktop Spread
    if (currentSpread <= 1) {
      handleCloseCover();
      return;
    }

    const prevSpread = currentSpread - 1;
    setFlipDirection('prev');
    setSourceSpread(currentSpread);
    setTargetSpread(prevSpread);
    setIsFlipping(true);

    setTimeout(() => {
      setCurrentSpread(prevSpread);
      setIsFlipping(false);
    }, 750);
  }, [isFlipping, isCoverOpen, isMobileView, mobilePage, currentSpread]);

  // Jump to specific page via thumbnail
  const handleJumpToPage = (pageNum) => {
    if (isFlipping) return;
    setShowThumbnails(false);
    setIsCoverOpen(true);

    if (isMobileView) {
      if (pageNum === mobilePage) return;
      const dir = pageNum > mobilePage ? 'next' : 'prev';
      setFlipDirection(dir);
      setSourceMobilePage(mobilePage);
      setTargetMobilePage(pageNum);
      setIsFlipping(true);

      setTimeout(() => {
        setMobilePage(pageNum);
        setIsFlipping(false);
      }, 700);
    } else {
      const destSpread = Math.ceil(pageNum / 2);
      if (destSpread === currentSpread) return;
      const dir = destSpread > currentSpread ? 'next' : 'prev';
      setFlipDirection(dir);
      setSourceSpread(currentSpread);
      setTargetSpread(destSpread);
      setIsFlipping(true);

      setTimeout(() => {
        setCurrentSpread(destSpread);
        setIsFlipping(false);
      }, 750);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') {
        if (showThumbnails) setShowThumbnails(false);
        if (isFullscreen) setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, showThumbnails, isFullscreen]);

  // Touch Swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Master PDF Download Handler
  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    setFeedbackMsg({ type: '', text: '' });

    try {
      const { generateBeautyMenuPDF } = await import('../../utils/pdfGenerator');
      const doc = await generateBeautyMenuPDF({
        services,
        comboPackages,
        settings,
        editionTitle: settings.downloadableMenuVersion || 'Annual Atelier Edition • Fall / Winter 2026'
      });

      doc.save('Glam-Girl-By-Janki-Beauty-Menu.pdf');
      setFeedbackMsg({ type: 'success', text: 'Glam-Girl-By-Janki-Beauty-Menu.pdf downloaded successfully.' });
      setTimeout(() => setFeedbackMsg({ type: '', text: '' }), 5000);
    } catch (err) {
      console.error('PDF generation error:', err);
      setFeedbackMsg({ type: 'error', text: 'Unable to compile PDF. Please try again.' });
    } finally {
      setIsDownloading(false);
    }
  };

  // Print Menu
  const handlePrintMenu = () => {
    window.print();
  };

  // Fullscreen Toggle
  const toggleFullscreen = () => {
    setIsFullscreen(f => !f);
  };

  // Current page indexes for stationary pages
  const leftPageIndex = (currentSpread - 1) * 2 + 1; // 1, 3, 5, 7, 9, 11
  const rightPageIndex = leftPageIndex + 1;           // 2, 4, 6, 8, 10, 12

  // Pages to display during desktop flip
  let displayStationaryLeftPage = BOOK_PAGES[leftPageIndex - 1];
  let displayStationaryRightPage = BOOK_PAGES[rightPageIndex - 1];

  let turningLeafFrontPage = null;
  let turningLeafBackPage = null;

  if (isFlipping) {
    if (flipDirection === 'next') {
      // Turning Right to Left:
      // Left stays source Left; Right shows target Right underneath!
      displayStationaryLeftPage = BOOK_PAGES[(sourceSpread - 1) * 2];
      displayStationaryRightPage = BOOK_PAGES[(targetSpread - 1) * 2 + 1];
      turningLeafFrontPage = BOOK_PAGES[(sourceSpread - 1) * 2 + 1]; // Current Right page
      turningLeafBackPage = BOOK_PAGES[(targetSpread - 1) * 2];       // Target Left page
    } else {
      // Turning Left to Right:
      // Left shows target Left underneath; Right stays source Right!
      displayStationaryLeftPage = BOOK_PAGES[(targetSpread - 1) * 2];
      displayStationaryRightPage = BOOK_PAGES[(sourceSpread - 1) * 2 + 1];
      turningLeafFrontPage = BOOK_PAGES[(sourceSpread - 1) * 2];       // Current Left page
      turningLeafBackPage = BOOK_PAGES[(targetSpread - 1) * 2 + 1];    // Target Right page
    }
  }

  // Helper to render individual page interior content
  const renderPageContent = (pageData) => {
    if (!pageData) return null;

    return (
      <div 
        className={`w-full h-full p-6 sm:p-8 flex flex-col justify-between select-none relative overflow-hidden transition-colors ${
          pageData.theme === 'cream'
            ? 'bg-[#F7F4ED] text-[#10110F]'
            : pageData.theme === 'forest'
            ? 'bg-[#263D2B] text-[#F7F4ED]'
            : 'bg-[#10110F] text-[#F7F4ED]'
        }`}
      >
        {/* Subtle Paper Texture Lines */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.03),transparent_70%)] pointer-events-none" />

        {/* Page Top Running Header */}
        <div className="relative z-10 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b pb-2 mb-3 border-current/15 text-[8.5px] uppercase tracking-[0.24em] font-bold opacity-75">
              <span>{pageData.tag}</span>
              <span className="italic font-normal opacity-70">HAUTE BEAUTÉ ATELIER</span>
            </div>

            <h3 className="font-serif text-lg sm:text-2xl font-normal tracking-tight mb-1">
              {pageData.title}
            </h3>
            <p className="text-[10px] sm:text-[11px] opacity-75 italic mb-3 font-light leading-snug">
              {pageData.subtitle}
            </p>
          </div>

          {/* PAGE TYPE SPECIFIC CONTENT */}
          {pageData.type === 'welcome' && (
            <div className="space-y-4 pt-1 text-xs">
              <div className="w-full aspect-[16/10] rounded-[3px] overflow-hidden border border-current/20 shadow-xs">
                <img 
                  src="/atelier-salon-interior.webp" 
                  alt="GLAM GIRL Interior" 
                  className="w-full h-full object-cover" 
                  loading="lazy"
                />
              </div>
              <p className="font-serif italic text-xs sm:text-sm text-[#263D2B] leading-relaxed pt-1">
                “Every treatment takes time. Every detail makes a difference. At GLAM GIRL BY JANKI, we believe beautiful results cannot be rushed.”
              </p>
              <p className="text-[10.5px] opacity-70 font-light leading-relaxed">
                Dedicated exclusively to women's hair artistry, clinical facial rituals, and bridal couture in Ottawa, Canada.
              </p>
            </div>
          )}

          {pageData.type === 'services' && (
            <div className="space-y-2.5 pt-1 overflow-y-auto max-h-[46vh] sm:max-h-[50vh] pr-1">
              {(catalogByPage[pageData.categoryKey] || []).map((svc, i) => (
                <div key={i} className="text-xs group/item">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-serif font-medium truncate group-hover/item:text-[#A8B5A0] transition-colors">
                      {svc.name}
                    </span>
                    <span className="font-bold text-[11px] opacity-90 whitespace-nowrap">
                      ${svc.price} CAD
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[9px] opacity-60 pt-0.5">
                    <span>{svc.duration || svc.durationDisplay || 'Duration not specified'}</span>
                    <div className="flex-1 mx-2 border-b border-dotted border-current/20" />
                  </div>
                  {svc.description && (
                    <p className="text-[9px] opacity-65 line-clamp-1 font-light mt-0.5">
                      {svc.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {pageData.type === 'packages' && (
            <div className="space-y-3 pt-1 overflow-y-auto max-h-[46vh] sm:max-h-[50vh] pr-1">
              {comboPackages.slice(0, 3).map((pkg, i) => (
                <div key={i} className="bg-white/90 text-[#10110F] p-3 rounded-[3px] border border-[#DCE1D8] shadow-xs text-xs">
                  <div className="flex items-baseline justify-between">
                    <span className="font-serif font-bold text-sm">{pkg.name}</span>
                    <span className="font-bold text-[#263D2B]">${pkg.comboPrice} CAD</span>
                  </div>
                  <p className="text-[9.5px] text-[#6B7068] mt-1 line-clamp-2 leading-relaxed">
                    {pkg.description}
                  </p>
                  {pkg.savingsAmount > 0 && (
                    <span className="inline-block mt-1.5 text-[8.5px] font-bold text-[#263D2B] bg-[#F7F4ED] px-2 py-0.5 rounded">
                      Approved Savings: ${pkg.savingsAmount} CAD
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {pageData.type === 'itinerary' && (
            <div className="flex-1 flex flex-col justify-between pt-1 pb-1 text-xs">
              <div className="space-y-2.5">
                <div className="p-3 bg-white/85 rounded-lg border border-[#DCE1D8] shadow-2xs space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-serif font-bold text-xs text-[#10110F]">1. Consultation &amp; Assessment</p>
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#F7F4ED] text-[#263D2B]">15 Mins</span>
                  </div>
                  <p className="text-[10px] text-[#6B7068] leading-relaxed">
                    Personalized diagnostic of hair density, scalp condition &amp; skin sensitivity before starting treatment.
                  </p>
                </div>

                <div className="p-3 bg-white/85 rounded-lg border border-[#DCE1D8] shadow-2xs space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-serif font-bold text-xs text-[#10110F]">2. Synergy Sequence</p>
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#F7F4ED] text-[#263D2B]">Optimal Flow</span>
                  </div>
                  <p className="text-[10px] text-[#6B7068] leading-relaxed">
                    Combine threading first, followed by rejuvenating facials, finished with precision haircut &amp; blowouts.
                  </p>
                </div>

                <div className="p-3 bg-white/85 rounded-lg border border-[#DCE1D8] shadow-2xs space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-serif font-bold text-xs text-[#10110F]">3. Tiered Itinerary Advantage</p>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#263D2B] text-white">Save 10%–15%</span>
                  </div>
                  <p className="text-[10px] text-[#6B7068] leading-relaxed">
                    Select 3 or more treatments for 10% bundle privilege; 5 or more treatments for 15% VIP suite savings.
                  </p>
                </div>

                <div className="p-3 bg-white/85 rounded-lg border border-[#DCE1D8] shadow-2xs space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-serif font-bold text-xs text-[#10110F]">4. Aftercare &amp; Product Ritual</p>
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#F7F4ED] text-[#263D2B]">Home Ritual</span>
                  </div>
                  <p className="text-[10px] text-[#6B7068] leading-relaxed">
                    Receive verified home-care instructions and stylist-recommended products to sustain salon radiance.
                  </p>
                </div>
              </div>

              {/* Bottom Etiquette Note */}
              <div className="mt-2.5 p-2.5 rounded-lg bg-[#263D2B]/8 border border-[#263D2B]/15 text-[10px] text-[#263D2B] flex items-center justify-between">
                <span className="font-semibold">Atelier Sanctuary Etiquette</span>
                <span className="italic opacity-80">Private 1-on-1 Sessions • Unrushed Care</span>
              </div>
            </div>
          )}

          {pageData.type === 'invitation' && (
            <div className="flex-1 flex flex-col justify-between pt-1 pb-1 text-center">
              {/* Founder Quote */}
              <div className="py-1">
                <p className="font-serif italic text-xs sm:text-sm text-[#A8B5A0] leading-relaxed">
                  “We invite you to experience dedicated time, precision, and tranquility at our Ottawa studio.”
                </p>
                <p className="text-[9.5px] uppercase tracking-wider text-[#F7F4ED]/75 font-semibold mt-1">
                  — Janki Khatroja, Founder &amp; Master Stylist
                </p>
              </div>

              {/* Atelier Concierge Box */}
              <div className="p-3.5 bg-[#10110F]/70 border border-[#A8B5A0]/30 rounded-xl text-[10.5px] text-[#A8B5A0] space-y-2 text-left shadow-xs">
                <div className="flex items-center justify-between border-b border-[#A8B5A0]/20 pb-1.5">
                  <span className="font-bold text-[#F7F4ED] tracking-widest text-xs">ATELIER CONCIERGE</span>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#263D2B] text-emerald-200 border border-emerald-400/20 font-semibold">Ottawa Studio</span>
                </div>
                
                <div className="space-y-1">
                  <p className="flex items-start gap-2">
                    <span className="text-[#F7F4ED] font-semibold shrink-0">Address:</span> 
                    <span className="leading-snug">405 Euphoria Crescent, Ottawa, ON K2J 7M7</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-[#F7F4ED] font-semibold shrink-0">Direct Line:</span> 
                    <span className="font-mono text-[#F7F4ED] font-semibold">+1 (613) 255-0549</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-[#F7F4ED] font-semibold shrink-0">Inquiries:</span> 
                    <span>Glamgirlbyjanki@gmail.com</span>
                  </p>
                  <p className="flex items-center gap-2 text-[9.5px] opacity-80 pt-0.5">
                    <span className="text-[#F7F4ED] font-semibold shrink-0">Hours:</span> 
                    <span>Mon – Sat: 9:30 AM – 7:00 PM • Sun: By Appt</span>
                  </p>
                </div>

                <div className="pt-1.5 border-t border-[#A8B5A0]/20 flex items-center justify-between text-[9px] text-[#A8B5A0]">
                  <span>Strictly By Appointment</span>
                  <span>•</span>
                  <span>Cash &amp; E-Transfer</span>
                  <span>•</span>
                  <span>Women Only</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <Link 
                  to="/book-appointment"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#F7F4ED] hover:bg-white text-[#10110F] text-xs font-bold uppercase tracking-[0.16em] transition-all shadow-md cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#263D2B]" />
                  <span>BOOK APPOINTMENT</span>
                </Link>

                <div className="flex items-center justify-center gap-3 text-[10px] text-[#A8B5A0]">
                  <Link to="/plan-your-salon-day" className="hover:text-white underline">
                    Salon Day Planner
                  </Link>
                  <span>•</span>
                  <Link to="/treatment-confirmation" className="hover:text-white underline">
                    Aftercare Rituals
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Page Bottom Footer */}
        <div className="relative z-10 pt-3 border-t border-current/15 flex items-center justify-between text-[8px] sm:text-[9px] opacity-60">
          <span>GLAM GIRL BY JANKI • THE BEAUTY MENU</span>
          <span className="font-bold tracking-wider">Page {pageData.pageNumber} of 12</span>
        </div>
      </div>
    );
  };

  return (
    <section 
      aria-label="The GLAM GIRL 3D Interactive Beauty Menu"
      ref={containerRef}
      className={`w-full relative bg-[#10110F] text-[#F7F4ED] py-16 sm:py-24 transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-[99999] py-6 px-4 bg-[#10110F] overflow-y-auto flex flex-col justify-between' : 'overflow-hidden border-y border-[#263D2B]/50'
      }`}
    >
      {/* Background Subtle Ambient Bloom */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(38, 61, 43, 0.5) 0%, transparent 70%), radial-gradient(circle at 80% 80%, rgba(70, 86, 64, 0.3) 0%, transparent 60%)'
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(#263D2B_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* ========================================================================= */}
        {/* SECTION HEADER                                                            */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#263D2B]/70 border border-[#465640]/50 text-[#A8B5A0] text-[10.5px] font-bold uppercase tracking-[0.24em]">
            <Sparkles className="w-3.5 h-3.5 text-[#A8B5A0]" />
            <span>3D INTERACTIVE NOTEBOOK</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F7F4ED] font-normal tracking-tight leading-[1.12]">
            The GLAM GIRL{' '}
            <span className="italic font-normal text-[#A8B5A0]">
              Beauty Menu
            </span>
          </h2>

          <div className="w-14 h-[2px] bg-[#465640] rounded-full mx-auto" />

          <p className="font-sans text-xs sm:text-sm md:text-base text-[#A8B5A0] leading-relaxed font-light max-w-2xl mx-auto">
            Experience our 12-page luxury atelier notebook. Turn pages in realistic 3D, explore transparent CAD pricing, or download the print-ready A4 master guide.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 3D BOOK STAGE & SCENE                                                     */}
        {/* ========================================================================= */}
        <div 
          className="book-3d-scene w-full flex flex-col items-center justify-center my-4"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* 3D Magazine Container */}
          <div className="relative w-full max-w-[920px] min-h-[460px] sm:min-h-[540px] md:min-h-[600px] flex items-center justify-center">
            
            {/* ------------------------------------------------------------------- */}
            {/* SCENARIO A: CLOSED COVER STATE                                      */}
            {/* ------------------------------------------------------------------- */}
            {!isCoverOpen ? (
              <div 
                onClick={handleOpenCover}
                className="relative w-full max-w-[400px] aspect-[1/1.414] rounded-[6px] bg-[#263D2B] text-[#F7F4ED] shadow-2xl p-6 sm:p-9 flex flex-col justify-between cursor-pointer border border-[#465640] hover:scale-[1.02] transition-all duration-300 group select-none paper-edge-right notebook-stitched"
                style={{
                  background: 'linear-gradient(135deg, #263D2B 0%, #1c2e20 100%)'
                }}
              >
                {/* Book Spine Highlight Bar */}
                <div className="absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-black/40 to-transparent pointer-events-none rounded-l-[5px]" />
                <div className="book-ribbon" />

                {/* Cover Top */}
                <div className="text-center space-y-1.5 relative z-10 pt-2">
                  <span className="text-[9.5px] uppercase tracking-[0.28em] text-[#A8B5A0] font-bold block">
                    HAUTE BEAUTÉ • ATELIER
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#F7F4ED]">
                    GLAM GIRL
                  </h3>
                  <p className="text-[11px] tracking-[0.24em] uppercase text-[#A8B5A0] font-semibold">
                    BY JANKI
                  </p>
                  <div className="w-10 h-[1.5px] bg-[#A8B5A0] mx-auto mt-2" />
                </div>

                {/* Cover Center Salon Photo */}
                <div className="relative my-4 w-full aspect-[4/3] rounded-[3px] overflow-hidden border border-[#A8B5A0]/30 shadow-md">
                  <img 
                    src="/floral-booking.webp" 
                    alt="GLAM GIRL Atelier" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-xs">
                    <span className="px-4 py-2 rounded-full bg-[#F7F4ED] text-[#10110F] text-xs font-bold uppercase tracking-wider shadow-lg">
                      OPEN 3D NOTEBOOK
                    </span>
                  </div>
                </div>

                {/* Cover Bottom */}
                <div className="text-center space-y-1.5 relative z-10">
                  <p className="font-serif italic text-xl text-[#F7F4ED]">The Beauty Menu</p>
                  <p className="text-xs text-[#A8B5A0] tracking-wider font-light">Your Beauty. Your Moment.</p>
                  <span className="text-[8.5px] uppercase tracking-[0.22em] text-[#A8B5A0]/80 block pt-1">
                    Ottawa, Canada • 2026 Edition
                  </span>
                </div>

                {/* Subtle Click Dog-Ear */}
                <div className="page-corner-curl" title="Click to open" />
              </div>
            ) : (
              /* ----------------------------------------------------------------- */
              /* SCENARIO B: OPEN 3D MAGAZINE (DESKTOP TWO-PAGE SPREAD / MOBILE 1) */
              /* ----------------------------------------------------------------- */
              <div className="relative w-full flex items-center justify-center">
                
                {isMobileView ? (
                  // MOBILE SINGLE PAGE VIEW
                  <div className="relative w-full max-w-[390px] aspect-[1/1.414] rounded-[5px] shadow-2xl overflow-hidden border border-[#465640] paper-edge-right">
                    {/* Stationary Page on Mobile */}
                    {renderPageContent(
                      isFlipping
                        ? BOOK_PAGES[targetMobilePage - 1]
                        : BOOK_PAGES[mobilePage - 1]
                    )}

                    {/* Animated Turning Leaf on Mobile */}
                    {isFlipping && (
                      <div 
                        className={`absolute inset-0 ${
                          flipDirection === 'next' ? 'leaf-flipping-mobile-next' : 'leaf-flipping-mobile-prev'
                        }`}
                      >
                        <div className="leaf-face-front">
                          {renderPageContent(
                            flipDirection === 'next'
                              ? BOOK_PAGES[sourceMobilePage - 1]
                              : BOOK_PAGES[targetMobilePage - 1]
                          )}
                        </div>
                        <div className="leaf-face-back">
                          {renderPageContent(
                            flipDirection === 'next'
                              ? BOOK_PAGES[targetMobilePage - 1]
                              : BOOK_PAGES[sourceMobilePage - 1]
                          )}
                        </div>
                      </div>
                    )}

                    <div className="page-corner-curl" onClick={handleNext} title="Next Page" />
                    <div className="page-corner-curl-left" onClick={handlePrev} title="Previous Page" />
                  </div>
                ) : (
                  // DESKTOP TWO-PAGE SPREAD (LEFT + SPINE + RIGHT)
                  <div className="book-3d-stage relative flex w-full max-w-[900px] aspect-[1.414/1] rounded-[6px] shadow-2xl overflow-hidden border border-[#465640]/80">
                    
                    {/* LEFT STATIONARY PAGE */}
                    <div 
                      onClick={handlePrev}
                      className="relative w-1/2 h-full paper-edge-left cursor-pointer group/left"
                      title={canGoPrev ? "Click to turn to previous page" : "First page"}
                    >
                      {renderPageContent(displayStationaryLeftPage)}
                      {/* Spine Gutter Shadow Left */}
                      <div className="book-spine-gutter-left absolute top-0 bottom-0 right-0 w-8 pointer-events-none" />
                      {/* Left Page Turn Dog-Ear */}
                      {canGoPrev && (
                        <div className="page-corner-curl-left" onClick={(e) => { e.stopPropagation(); handlePrev(); }} />
                      )}
                    </div>

                    {/* CENTRAL SPINE HINGE & BOOKMARK RIBBON */}
                    <div className="relative w-[4px] bg-[#1a281d] z-30 shadow-inner">
                      <div className="book-ribbon" />
                    </div>

                    {/* RIGHT STATIONARY PAGE */}
                    <div 
                      onClick={handleNext}
                      className="relative w-1/2 h-full paper-edge-right cursor-pointer group/right"
                      title={canGoNext ? "Click to turn to next page" : "Last page"}
                    >
                      {renderPageContent(displayStationaryRightPage)}
                      {/* Spine Gutter Shadow Right */}
                      <div className="book-spine-gutter-right absolute top-0 bottom-0 left-0 w-8 pointer-events-none" />
                      {/* Right Page Turn Dog-Ear */}
                      {canGoNext && (
                        <div className="page-corner-curl" onClick={(e) => { e.stopPropagation(); handleNext(); }} />
                      )}
                    </div>

                    {/* 3D TURNING LEAF SIMULATION (DURING FLIP) */}
                    {isFlipping && (
                      <div 
                        className={`absolute top-0 bottom-0 w-1/2 overflow-hidden shadow-2xl pointer-events-none ${
                          flipDirection === 'next'
                            ? 'right-0 leaf-flipping-next'
                            : 'left-0 leaf-flipping-prev'
                        }`}
                      >
                        {/* Front Face of Turning Leaf */}
                        <div className="leaf-face-front">
                          {renderPageContent(turningLeafFrontPage)}
                          <div className={flipDirection === 'next' ? 'leaf-shadow-overlay-next-front' : 'leaf-shadow-overlay-prev-front'} />
                        </div>

                        {/* Back Face of Turning Leaf (Rotated 180deg) */}
                        <div className={flipDirection === 'next' ? 'leaf-face-back' : 'leaf-face-back-prev'}>
                          {renderPageContent(turningLeafBackPage)}
                          <div className={flipDirection === 'next' ? 'leaf-shadow-overlay-next-back' : 'leaf-shadow-overlay-prev-back'} />
                        </div>
                      </div>
                    )}

                  </div>
                )}

              </div>
            )}

          </div>

          {/* ===================================================================== */}
          {/* NOTEBOOK NAVIGATION CONTROLS BAR                                      */}
          {/* ===================================================================== */}
          <div className="w-full max-w-[800px] mt-6 sm:mt-8 p-3 rounded-full bg-[#18231a] border border-[#263D2B] shadow-xl flex flex-wrap items-center justify-between gap-3 text-xs">
            
            {/* Left Controls: Prev / Next / Counter */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                disabled={isFlipping || !canGoPrev}
                aria-label="Previous Page"
                className="p-2 rounded-full bg-[#263D2B] hover:bg-[#34523a] text-[#F7F4ED] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="font-mono text-xs font-bold tracking-wider px-2 text-[#A8B5A0]">
                {!isCoverOpen ? (
                  'COVER • 00 / 12'
                ) : isMobileView ? (
                  `${String(mobilePage).padStart(2, '0')} / 12`
                ) : (
                  `Pages ${String(leftPageIndex).padStart(2, '0')} – ${String(rightPageIndex).padStart(2, '0')} / 12`
                )}
              </span>

              <button
                type="button"
                onClick={handleNext}
                disabled={isFlipping || !canGoNext}
                aria-label="Next Page"
                className="p-2 rounded-full bg-[#263D2B] hover:bg-[#34523a] text-[#F7F4ED] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Center Controls: Cover & Thumbnails */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={isCoverOpen ? handleCloseCover : handleOpenCover}
                disabled={isFlipping}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#263D2B]/80 hover:bg-[#263D2B] text-[11px] font-medium text-[#F7F4ED] border border-[#465640]/60 transition-colors cursor-pointer disabled:opacity-40"
              >
                <BookMarked className="w-3.5 h-3.5 text-[#A8B5A0]" />
                <span>{isCoverOpen ? 'Close Cover' : 'Open Cover'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowThumbnails(s => !s)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#263D2B]/80 hover:bg-[#263D2B] text-[11px] font-medium text-[#F7F4ED] border border-[#465640]/60 transition-colors cursor-pointer"
              >
                <Grid className="w-3.5 h-3.5 text-[#A8B5A0]" />
                <span>Thumbnails</span>
              </button>
            </div>

            {/* Right Controls: PDF Download & Print & Fullscreen */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                aria-label="Download PDF Menu"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F7F4ED] hover:bg-white text-[#10110F] text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50"
              >
                {isDownloading ? (
                  <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Download className="w-3.5 h-3.5 text-[#263D2B]" />
                )}
                <span className="hidden sm:inline">Download PDF</span>
              </button>

              <button
                type="button"
                onClick={handlePrintMenu}
                aria-label="Print Menu"
                className="p-2 rounded-full bg-[#263D2B] hover:bg-[#34523a] text-[#A8B5A0] hover:text-[#F7F4ED] transition-colors cursor-pointer"
                title="Print Menu (A4)"
              >
                <Printer className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                className="p-2 rounded-full bg-[#263D2B] hover:bg-[#34523a] text-[#A8B5A0] hover:text-[#F7F4ED] transition-colors cursor-pointer"
                title="Toggle Fullscreen"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>

          </div>

          {/* Toast Notification Message */}
          {feedbackMsg.text && (
            <div 
              className={`mt-4 px-4 py-2 rounded-full text-xs flex items-center gap-2 animate-fadeIn ${
                feedbackMsg.type === 'success' 
                  ? 'bg-[#263D2B] text-[#F7F4ED] border border-[#A8B5A0]' 
                  : 'bg-red-950 text-red-200 border border-red-800'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-[#A8B5A0]" />
              <span>{feedbackMsg.text}</span>
            </div>
          )}

          {/* ===================================================================== */}
          {/* THUMBNAIL OVERVIEW DRAWER (ALL 12 PAGES)                              */}
          {/* ===================================================================== */}
          {showThumbnails && (
            <div className="w-full max-w-[880px] mt-6 p-5 rounded-2xl bg-[#162118] border border-[#263D2B] shadow-2xl animate-fadeIn">
              <div className="flex items-center justify-between border-b border-[#263D2B] pb-3 mb-4">
                <span className="font-serif text-sm text-[#F7F4ED]">
                  Jump to Page • Complete 12-Page Atelier Lookbook
                </span>
                <button
                  type="button"
                  onClick={() => setShowThumbnails(false)}
                  className="p-1 rounded-full text-[#A8B5A0] hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {BOOK_PAGES.map((page) => {
                  const isActive = isMobileView 
                    ? mobilePage === page.pageNumber 
                    : (isCoverOpen && (page.pageNumber === leftPageIndex || page.pageNumber === rightPageIndex));
                  return (
                    <button
                      key={page.pageNumber}
                      type="button"
                      disabled={isFlipping}
                      onClick={() => handleJumpToPage(page.pageNumber)}
                      className={`aspect-[1/1.4] rounded p-2 text-left transition-all border flex flex-col justify-between cursor-pointer ${
                        isActive
                          ? 'border-[#A8B5A0] ring-2 ring-[#A8B5A0]/40 scale-102 ' + (page.theme === 'cream' ? 'bg-[#F7F4ED] text-[#10110F]' : page.theme === 'forest' ? 'bg-[#263D2B] text-white' : 'bg-[#10110F] text-white')
                          : 'opacity-70 hover:opacity-100 border-[#263D2B] ' + (page.theme === 'cream' ? 'bg-[#F7F4ED] text-[#10110F]' : page.theme === 'forest' ? 'bg-[#263D2B] text-white' : 'bg-[#10110F] text-white')
                      }`}
                    >
                      <div className="text-[8px] uppercase font-bold tracking-wider truncate opacity-70">
                        {page.tag}
                      </div>
                      <div className="font-serif text-[10px] line-clamp-2 leading-tight">
                        {page.title}
                      </div>
                      <div className="text-[8px] font-mono opacity-60">
                        p.{String(page.pageNumber).padStart(2, '0')}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}

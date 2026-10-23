import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  Tag, 
  ShieldCheck, 
  X, 
  Eye,
  Info,
  Gift
} from 'lucide-react';
import salonDB from '../../db/salonDatabase';
import ScrollReveal from '../ScrollReveal/ScrollReveal';

const CATEGORY_TABS = [
  { id: 'all', label: 'All Packages' },
  { id: 'Hair Care', label: 'Hair Care Packages' },
  { id: 'Skin Care', label: 'Skin Care Packages' },
  { id: 'Hair Spa', label: 'Hair Spa Packages' },
  { id: 'Bridal', label: 'Bridal Treatment Packages' },
  { id: 'Makeup', label: 'Makeup Packages' },
  { id: 'Nail Care', label: 'Nail Care Packages' },
  { id: 'Waxing', label: 'Waxing Packages' },
  { id: 'Complete Beauty', label: 'Complete Beauty Packages' }
];

export default function TreatmentPackagesSection() {
  const navigate = useNavigate();
  const [packages, setPackages] = useState(() => salonDB.getActiveComboPackages());
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPackageForModal, setSelectedPackageForModal] = useState(null);

  // Sync with live database
  const refreshPackages = () => {
    try {
      const activePkgs = salonDB.getActiveComboPackages();
      setPackages(activePkgs);
    } catch (err) {
      console.warn('Error loading treatment packages:', err);
    }
  };

  useEffect(() => {
    refreshPackages();
    const unsub = salonDB.subscribe(() => {
      refreshPackages();
    });
    return () => unsub();
  }, []);

  // Filter packages based on selected category tab
  const filteredPackages = useMemo(() => {
    if (selectedCategory === 'all') return packages;

    const normTarget = selectedCategory.toLowerCase().trim();
    return packages.filter((pkg) => {
      const pkgCat = (pkg.categoryTag || '').toLowerCase().trim();
      // Handle Waxing / Spa & Body equivalency
      if (normTarget === 'waxing' && (pkgCat.includes('wax') || pkgCat.includes('body'))) return true;
      return pkgCat.includes(normTarget) || normTarget.includes(pkgCat);
    });
  }, [packages, selectedCategory]);

  return (
    <section id="treatment-combos" className="mt-20 sm:mt-28 lg:mt-32 pt-16 sm:pt-20 border-t border-[#DCE1D8] scroll-mt-24">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ===================================================================== */}
        {/* SECTION HEADER                                                        */}
        {/* ===================================================================== */}
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#DCE1D8] shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B]" />
            <span className="text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.26em] text-[#263D2B]">
              CURATED BEAUTY EXPERIENCES
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight leading-[1.12]">
            Treatment Combos & Packages
          </h2>

          {/* Subtle Decorative Forest Green Accent Line */}
          <div className="w-12 h-[2px] bg-[#263D2B] rounded-full mx-auto" />

          {/* Subtitle */}
          <p className="font-sans text-sm sm:text-base text-[#6B7068] leading-relaxed font-light max-w-2xl mx-auto pt-1">
            Discover thoughtfully paired beauty treatments designed around your beauty goals.
          </p>
        </ScrollReveal>

        {/* ===================================================================== */}
        {/* CATEGORY FILTER TABS                                                  */}
        {/* ===================================================================== */}
        <div className="mb-10 sm:mb-12 overflow-x-auto pb-2 scrollbar-none flex items-center justify-start sm:justify-center gap-2">
          {CATEGORY_TABS.map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id)}
                className={`whitespace-nowrap px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-[#263D2B] text-white shadow-sm'
                    : 'bg-white hover:bg-[#F7F4ED] text-[#6B7068] hover:text-[#10110F] border border-[#DCE1D8]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ===================================================================== */}
        {/* 3-COLUMN DESKTOP / 2-COLUMN TABLET / 1-COLUMN MOBILE PACKAGE GRID     */}
        {/* ===================================================================== */}
        {filteredPackages.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#DCE1D8] p-8 max-w-lg mx-auto">
            <Info className="w-8 h-8 text-[#263D2B] mx-auto mb-3" />
            <h3 className="font-serif text-lg text-[#10110F] mb-1">No Packages Available</h3>
            <p className="text-xs text-[#6B7068]">
              No active packages found in this category. Check back soon or browse all packages.
            </p>
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className="mt-4 px-4 py-2 rounded-xl bg-[#263D2B] text-white text-xs font-bold tracking-wider uppercase cursor-pointer"
            >
              View All Packages
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 items-stretch">
            {filteredPackages.map((pkg, idx) => {
              const hasDiscount = (pkg.savingsAmount || 0) > 0;
              const hasDuration = Boolean(pkg.durationDisplay);

              return (
                <ScrollReveal
                  key={pkg.id || pkg.slug || idx}
                  delay={idx * 40}
                  className="h-full flex"
                >
                  <div className="group w-full h-full bg-white rounded-3xl border border-[#DCE1D8] hover:border-[#263D2B] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1">
                    
                    {/* Top Package Media & Badges */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#EFECE4] flex-shrink-0">
                      <img
                        src={pkg.image || '/facial-atelier-clean.webp'}
                        alt={pkg.name}
                        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/facial-atelier-clean.webp';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#10110F]/70 via-[#10110F]/20 to-transparent pointer-events-none" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                        <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#263D2B] text-[10px] font-bold uppercase tracking-wider shadow-xs border border-[#DCE1D8]">
                          {pkg.categoryTag || 'Signature Package'}
                        </span>

                        {hasDiscount && (
                          <span className="px-2.5 py-1 rounded-full bg-[#263D2B] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs flex items-center gap-1">
                            <Gift className="w-3 h-3" />
                            <span>Save ${pkg.savingsAmount} CAD</span>
                          </span>
                        )}
                      </div>

                      {/* Bottom Image Overlay: Duration */}
                      {hasDuration && (
                        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium">
                          <Clock className="w-3.5 h-3.5 text-[#A8B5A0]" />
                          <span>{pkg.durationDisplay}</span>
                        </div>
                      )}
                    </div>

                    {/* Middle: Details & Services List */}
                    <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                      
                      {/* Name & Tagline */}
                      <div className="space-y-1.5">
                        {pkg.tagline && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#465640] block font-sans">
                            {pkg.tagline}
                          </span>
                        )}
                        <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#10110F] tracking-tight group-hover:text-[#263D2B] transition-colors leading-snug">
                          {pkg.name}
                        </h3>
                        <p className="font-sans text-xs sm:text-[13px] text-[#6B7068] leading-relaxed font-light line-clamp-2 pt-1">
                          {pkg.description}
                        </p>
                      </div>

                      {/* Included Services List */}
                      {pkg.services && pkg.services.length > 0 && (
                        <div className="pt-2 space-y-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#263D2B] block">
                            Included Treatments ({pkg.services.length}):
                          </span>
                          <ul className="space-y-1.5">
                            {pkg.services.map((srv, sIdx) => (
                              <li key={srv.id || sIdx} className="flex items-start gap-2 text-xs text-[#465640]">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#263D2B] flex-shrink-0 mt-0.5" />
                                <span className="font-medium truncate">{srv.name}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Pricing Summary Breakdown */}
                      <div className="pt-4 border-t border-[#DCE1D8] flex items-end justify-between mt-auto">
                        <div>
                          {hasDiscount && pkg.totalOriginalPrice > 0 && (
                            <div className="text-[11px] text-[#6B7068] line-through font-mono">
                              Total: ${pkg.totalOriginalPrice} CAD
                            </div>
                          )}
                          <div className="flex items-baseline gap-1.5">
                            <span className="font-serif text-2xl sm:text-3xl font-normal text-[#10110F]">
                              ${pkg.comboPrice}
                            </span>
                            <span className="text-xs font-bold text-[#263D2B] uppercase">CAD</span>
                          </div>
                        </div>

                        {hasDiscount && (
                          <div className="text-right">
                            <span className="text-[10px] font-bold text-[#263D2B] bg-[#263D2B]/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                              {pkg.savingsPercent}% OFF
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Dual CTA Buttons: View Details & Book Package */}
                      <div className="pt-4 flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => setSelectedPackageForModal(pkg)}
                          className="flex-1 py-3 px-3 rounded-[4px] border border-[#263D2B] text-[#263D2B] hover:bg-[#263D2B] hover:text-white text-[11px] font-bold uppercase tracking-wider transition-all duration-300 text-center cursor-pointer"
                        >
                          View Details
                        </button>

                        <Link
                          to={`/book-appointment?package=${pkg.id || pkg.slug}`}
                          className="flex-1 py-3 px-3 rounded-[4px] bg-[#263D2B] hover:bg-[#1C2E20] text-white text-[11px] font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg text-center flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>Book Package</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>

                    </div>

                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        )}

        {/* Bottom Helpful Navigation Prompt */}
        <div className="mt-14 sm:mt-16 text-center">
          <p className="text-xs text-[#6B7068] font-light mb-3">
            Looking for a completely bespoke itinerary or tailored consultation?
          </p>
          <Link
            to="/plan-your-salon-day"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#263D2B] hover:text-[#10110F] uppercase tracking-[0.18em] transition-colors"
          >
            <span>Plan Your Custom Salon Day</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

      {/* ===================================================================== */}
      {/* PACKAGE DETAILS MODAL                                                 */}
      {/* ===================================================================== */}
      {selectedPackageForModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
          onClick={() => setSelectedPackageForModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="bg-white rounded-3xl border border-[#DCE1D8] shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 relative animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedPackageForModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-center text-[#10110F] hover:bg-[#263D2B] hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Image */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-[#EFECE4] border border-[#DCE1D8]">
              <img
                src={selectedPackageForModal.image || '/facial-atelier-clean.webp'}
                alt={selectedPackageForModal.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#263D2B] text-[10px] font-bold uppercase tracking-wider border border-[#DCE1D8]">
                  {selectedPackageForModal.categoryTag}
                </span>
              </div>
            </div>

            {/* Modal Header */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#465640] block">
                {selectedPackageForModal.tagline}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#10110F]">
                {selectedPackageForModal.name}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#6B7068] leading-relaxed font-light pt-1">
                {selectedPackageForModal.description}
              </p>
            </div>

            {/* Key Metrics Pill Row */}
            <div className="grid grid-cols-2 gap-3 py-3 border-y border-[#DCE1D8]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#263D2B]" />
                <span className="text-xs text-[#465640] font-medium">
                  {selectedPackageForModal.durationDisplay || 'Approx. 90 mins'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#263D2B]" />
                <span className="text-xs text-[#465640] font-medium">
                  Payment: Pay at Salon (Cash)
                </span>
              </div>
            </div>

            {/* Included Services Breakdown */}
            {selectedPackageForModal.services && selectedPackageForModal.services.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#10110F]">
                  Services Included in this Package:
                </h4>
                <div className="space-y-2 bg-[#F7F4ED]/60 rounded-2xl p-4 border border-[#DCE1D8]">
                  {selectedPackageForModal.services.map((s) => (
                    <div key={s.id} className="flex items-start justify-between gap-3 text-xs">
                      <div className="space-y-0.5">
                        <span className="font-serif font-medium text-[#10110F] block">{s.name}</span>
                        <span className="text-[11px] text-[#6B7068]">{s.duration} • {s.categoryName || s.category}</span>
                      </div>
                      <span className="font-mono font-medium text-[#465640]">${s.price} CAD</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Package Benefits */}
            {selectedPackageForModal.benefits && selectedPackageForModal.benefits.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#10110F]">
                  Ritual Highlights:
                </h4>
                <ul className="space-y-1.5">
                  {selectedPackageForModal.benefits.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2 text-xs text-[#465640]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#263D2B] flex-shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Pricing & Booking CTA */}
            <div className="pt-4 border-t border-[#DCE1D8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                {selectedPackageForModal.savingsAmount > 0 && (
                  <div className="text-xs text-[#6B7068] line-through font-mono">
                    Total: ${selectedPackageForModal.totalOriginalPrice} CAD
                  </div>
                )}
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-normal text-[#10110F]">
                    ${selectedPackageForModal.comboPrice}
                  </span>
                  <span className="text-xs font-bold text-[#263D2B] uppercase">CAD</span>
                  {selectedPackageForModal.savingsAmount > 0 && (
                    <span className="text-xs font-bold text-[#263D2B] bg-[#263D2B]/10 px-2 py-0.5 rounded-md">
                      Save ${selectedPackageForModal.savingsAmount} CAD
                    </span>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  const targetPkg = selectedPackageForModal;
                  setSelectedPackageForModal(null);
                  navigate(`/book-appointment?package=${targetPkg.id || targetPkg.slug}`);
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-[4px] bg-[#263D2B] hover:bg-[#1C2E20] text-white text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book This Package</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}

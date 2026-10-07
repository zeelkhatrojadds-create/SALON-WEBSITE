import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  AlertCircle, 
  ShieldCheck,
  Check,
  ChevronRight
} from 'lucide-react';
import Breadcrumbs from '../components/services/Breadcrumbs';
import salonDB from '../db/salonDatabase';
import { CATEGORIES } from '../data/servicesData';
import ServiceCard from '../components/common/ServiceCard';
import ScrollReveal from '../components/ScrollReveal/ScrollReveal';

export default function CategoryPage() {
  const { category: categoryParam } = useParams();
  const navigate = useNavigate();
  const [servicesData, setServicesData] = useState(() => salonDB.getServices());
  const [categories, setCategories] = useState(() => salonDB.getCategories());

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [categoryParam]);

  useEffect(() => {
    const handleUpdate = () => {
      setServicesData(salonDB.getServices());
      setCategories(salonDB.getCategories());
    };
    const unsubscribe = salonDB.subscribe(handleUpdate);
    return () => unsubscribe();
  }, []);

  // Find category object
  const currentCategory = categories.find((c) => {
    const target = String(categoryParam || '').toLowerCase();
    const cSlug = String(c.slug || c.id || '').toLowerCase();
    const cId = String(c.id || '').toLowerCase();
    return cSlug === target || cId === target;
  });

  // If not found in CATEGORIES list, fallback to matching first service's categoryName
  const categoryId = currentCategory?.id || categoryParam;
  const categoryName = currentCategory?.name || (categoryParam ? categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1).replace(/-/g, ' ') : 'Category');
  const categoryDesc = currentCategory?.description || `Discover our bespoke ${categoryName.toLowerCase()} treatments designed for exquisite beauty and natural confidence.`;
  const categoryImage = currentCategory?.image;

  // Filter active treatments for this category
  const categoryTreatments = servicesData.filter((s) => {
    if (s.active === false) return false;
    const target = String(categoryId).toLowerCase();
    const sCat = String(s.category || '').toLowerCase();
    const sCatSlug = String(s.category || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return sCat === target || sCatSlug === target || sCatSlug === String(categoryParam).toLowerCase();
  });

  if (!currentCategory && categoryTreatments.length === 0) {
    return (
      <div className="min-h-screen bg-[#100C0D] text-[#F7F1E8] pt-32 pb-24 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="bg-[#1A1416] rounded-3xl p-8 sm:p-10 border border-[#CFA46A]/20 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-[#CFA46A]/10 text-[#CFA46A] flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-[#F7F1E8] mb-2">Category Not Found</h1>
            <p className="text-[#E0D5C7]/70 text-sm mb-6">
              The service category "{categoryParam}" could not be located in our salon database.
            </p>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#CFA46A] hover:bg-[#B88D57] text-[#100C0D] text-sm font-semibold tracking-wide transition-all shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Categories</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const categorySlug = currentCategory?.slug || categoryParam;

  return (
    <div className="min-h-screen bg-[#100C0D] text-[#F7F1E8] pt-24 sm:pt-28 pb-20 selection:bg-[#CFA46A] selection:text-[#100C0D]">
      {/* Editorial Header Section */}
      <div className="relative border-b border-[#CFA46A]/15 bg-gradient-to-b from-[#1C1417]/80 to-[#100C0D] pb-12 sm:pb-16 pt-4">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#CFA46A]/5 rounded-full blur-3xl pointer-events-none" />

        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" stagger={true}>
          <Breadcrumbs categoryName={categoryName} categorySlug={categorySlug} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-4">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#CFA46A]/10 border border-[#CFA46A]/30 text-[#CFA46A] text-xs font-semibold tracking-widest uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Dedicated Collection</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-wide text-[#F7F1E8] uppercase mb-4 leading-tight">
                {categoryName}
              </h1>

              <p className="text-[#E0D5C7]/80 text-base sm:text-lg max-w-2xl font-light leading-relaxed mb-6">
                {categoryDesc}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#E0D5C7]/70">
                <span className="px-3 py-1 rounded-md bg-[#251A1E] border border-white/5">
                  <strong className="text-[#CFA46A] font-semibold">{categoryTreatments.length}</strong> Signature Treatments Available
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#CFA46A]" /> Certified Beauty Specialists
                </span>
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#CFA46A]" /> 100% Organic & Gentle Formulas
                </span>
              </div>
            </div>

            {categoryImage && (
              <div className="lg:col-span-4 hidden lg:block">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-[#CFA46A]/20 shadow-2xl group">
                  <img
                    src={categoryImage}
                    alt={categoryName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#100C0D] via-transparent to-transparent opacity-60" />
                </div>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>

      {/* Main Treatments Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl text-[#F7F1E8]">
              All {categoryName} Treatments
            </h2>
            <p className="text-xs sm:text-sm text-[#E0D5C7]/60 mt-1">
              Select a treatment to view full details, included steps, and reserve your private appointment.
            </p>
          </div>

          <Link
            to="/services"
            className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#CFA46A] hover:text-[#E5B87E] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Categories</span>
          </Link>
        </div>

        {categoryTreatments.length === 0 ? (
          <div className="text-center py-16 bg-[#1A1416] rounded-2xl border border-white/5 p-8">
            <p className="text-[#E0D5C7]/70 mb-4">No treatments are currently available in this category.</p>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#CFA46A] text-[#100C0D] text-xs font-bold uppercase tracking-wider"
            >
              Browse All Services
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {categoryTreatments.map((treatment) => (
              <ServiceCard key={treatment.id} service={treatment} />
            ))}
          </div>
        )}

        {/* Other Categories Quick Navigation */}
        <div className="mt-20 pt-10 border-t border-white/10">
          <h3 className="font-serif text-xl sm:text-2xl text-[#F7F1E8] mb-6 text-center">
            Explore Other Salon Categories
          </h3>
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
            {categories
              .filter((c) => (c.slug || c.id) !== categorySlug)
              .map((c) => (
                <Link
                  key={c.id}
                  to={`/services/${c.slug || c.id}`}
                  className="px-4 py-2 rounded-full bg-[#1A1416] hover:bg-[#CFA46A]/15 border border-[#CFA46A]/20 hover:border-[#CFA46A] text-xs sm:text-sm text-[#E0D5C7] hover:text-[#CFA46A] transition-all"
                >
                  {c.name}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle, 
  Share2, 
  Check, 
  Heart,
  CheckCircle2
} from 'lucide-react';
import Breadcrumbs from '../components/services/Breadcrumbs';
import salonDB from '../db/salonDatabase';
import ScrollReveal from '../components/ScrollReveal/ScrollReveal';

export default function TreatmentDetailPage() {
  const { category: categoryParam, slug: slugParam } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [service, setService] = useState(null);
  const [category, setCategory] = useState(null);
  const [relatedServices, setRelatedServices] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIsLoading(true);

    const timer = setTimeout(() => {
      const searchKey = slugParam || categoryParam;
      const foundService = salonDB.getServiceBySlug(searchKey) || salonDB.getServiceById(searchKey);
      
      if (foundService && foundService.active !== false) {
        setService(foundService);
        const cat = salonDB.getCategoryBySlug(foundService.category || categoryParam);
        setCategory(cat);
        const related = salonDB.getRelatedServices(foundService.id, foundService.category, 4);
        setRelatedServices(related);
      } else {
        setService(null);
      }
      setIsLoading(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [categoryParam, slugParam]);

  // Subscribe to real-time database changes
  useEffect(() => {
    const handleDbChange = () => {
      const searchKey = slugParam || categoryParam;
      const foundService = salonDB.getServiceBySlug(searchKey) || salonDB.getServiceById(searchKey);
      if (foundService && foundService.active !== false) {
        setService(foundService);
        const cat = salonDB.getCategoryBySlug(foundService.category || categoryParam);
        setCategory(cat);
        const related = salonDB.getRelatedServices(foundService.id, foundService.category, 4);
        setRelatedServices(related);
      }
    };
    const unsubscribe = salonDB.subscribe(handleDbChange);
    return () => unsubscribe();
  }, [categoryParam, slugParam]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleBookNow = () => {
    if (!service) return;
    const bookingSlug = service.slug || service.id;
    navigate(`/book-appointment?service=${bookingSlug}`);
  };

  // Premium Skeleton Loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F4ED] text-[#10110F] pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-pulse">
        <div className="h-4 bg-[#DCE1D8] rounded w-64 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-7 aspect-[4/3] bg-white rounded-3xl border border-[#DCE1D8]" />
          <div className="lg:col-span-5 space-y-4">
            <div className="h-6 bg-[#DCE1D8] rounded w-24" />
            <div className="h-10 bg-[#DCE1D8] rounded w-3/4" />
            <div className="h-6 bg-[#DCE1D8] rounded w-1/3" />
            <div className="h-20 bg-white rounded-2xl w-full border border-[#DCE1D8]" />
            <div className="h-14 bg-[#263D2B]/20 rounded-2xl w-full" />
          </div>
        </div>
      </div>
    );
  }

  // Not Found State
  if (!service) {
    return (
      <div className="min-h-screen bg-[#F7F4ED] text-[#10110F] pt-32 pb-24 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#DCE1D8] shadow-xl">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-200">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#10110F] mb-2 uppercase">
              Service Not Found
            </h1>
            <p className="text-[#6B7068] text-sm mb-6 leading-relaxed font-sans">
              The beauty treatment you are looking for does not exist or may have been unlisted.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to={categoryParam ? `/services/${categoryParam}` : '/services'}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#263D2B] hover:bg-[#1C2E20] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{categoryParam ? `Back to ${categoryParam}` : 'Back to Services'}</span>
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#DCE1D8] hover:border-[#10110F] text-xs text-[#10110F] font-medium transition-all bg-white"
              >
                All Categories
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const categoryName = category?.name || service.categoryName || (service.category ? service.category.charAt(0).toUpperCase() + service.category.slice(1) : 'Services');
  const categorySlug = category?.slug || categoryParam || service.category;

  const whatsIncluded = service.whatsIncluded || [
    'Personalized consultation with master stylist',
    'Custom treatment using hypoallergenic products',
    'Soothing botanical finish and aftercare guidance'
  ];

  const benefits = service.benefits || [
    'Long-lasting clean finish with zero harsh irritation',
    'Natural skin tone enhancement and pore protection',
    'Executed by certified experienced aesthetician',
    'Private, sanitized luxury studio suite experience'
  ];

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#10110F] pt-24 sm:pt-28 pb-20 selection:bg-[#263D2B] selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clickable Breadcrumbs & Share Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8">
          <Breadcrumbs
            treatmentName={service.name}
            categoryName={categoryName}
            categorySlug={categorySlug}
          />

          <button
            onClick={handleShare}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs text-[#6B7068] hover:text-[#10110F] bg-white px-3.5 py-1.5 rounded-full border border-[#DCE1D8] transition-colors cursor-pointer shadow-2xs font-sans"
            title="Share this service link"
          >
            <Share2 className="w-3.5 h-3.5 text-[#263D2B]" />
            <span>{copied ? 'Link Copied!' : 'Share Service'}</span>
          </button>
        </div>

        {/* Hero Section: Left Image / Right Details */}
        <ScrollReveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          
          {/* LEFT: Large Treatment Image */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden border border-[#DCE1D8] bg-white shadow-xl group">
              <div className="aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden">
                <img
                  src={service.image || '/images/services/threading/07-sitara-full-face-threading.webp'}
                  alt={service.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                  }}
                />
              </div>

              {/* Gradient overlay for soft edges */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#10110F]/60 via-transparent to-transparent opacity-40 pointer-events-none" />

              {/* Top Badges */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <Link
                  to={`/services/${categorySlug}`}
                  className="px-3.5 py-1.5 rounded-full bg-[#F7F4ED]/95 backdrop-blur-md border border-[#DCE1D8] text-[#10110F] text-xs font-bold uppercase tracking-wider hover:bg-[#263D2B] hover:text-white transition-colors"
                >
                  {categoryName}
                </Link>
                {service.popular && (
                  <span className="px-3 py-1.5 rounded-full bg-[#263D2B] text-white text-xs font-bold uppercase tracking-wider shadow-md">
                    Most Popular
                  </span>
                )}
              </div>

              {/* Bottom Quick Feature Pill */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#10110F] bg-[#F7F4ED]/95 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl border border-[#DCE1D8] shadow-md font-sans">
                <div className="flex items-center gap-2 font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#263D2B] flex-shrink-0" />
                  <span>Sanitized & Private Suite</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium text-[#263D2B]">
                  <Sparkles className="w-3.5 h-3.5 text-[#263D2B] flex-shrink-0" />
                  <span>Master Artist Handled</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Editorial Content & Booking CTA */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            
            {/* Category Tag */}
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#263D2B] mb-2 font-sans">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{categoryName} Treatment</span>
            </div>

            {/* Treatment Title */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#10110F] tracking-tight mb-4 leading-tight">
              {service.name}
            </h1>

            {/* Price & Duration Header Box */}
            <div className="flex items-center gap-6 p-4 rounded-2xl bg-white border border-[#DCE1D8] mb-6 shadow-xs font-sans">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#6B7068] block">
                  Price
                </span>
                <span className="font-serif text-3xl sm:text-4xl text-[#10110F] font-normal">
                  ${service.price}
                </span>
              </div>

              <div className="w-px h-10 bg-[#DCE1D8]" />

              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#6B7068] block">
                  Duration
                </span>
                <div className="flex items-center gap-1.5 text-base sm:text-lg font-medium text-[#10110F]">
                  <Clock className="w-4 h-4 text-[#263D2B]" />
                  <span>Approx. {String(service.duration || '15 min').endsWith('min') ? service.duration : `${service.duration} min`}</span>
                </div>
              </div>
            </div>

            {/* Treatment Description */}
            <div className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#6B7068] mb-2 font-sans">
                Description
              </h2>
              <p className="text-sm sm:text-base text-[#6B7068] leading-relaxed font-sans font-normal">
                {service.description}
              </p>
            </div>

            {/* WHAT'S INCLUDED */}
            <div className="mb-8 p-5 rounded-2xl bg-white border border-[#DCE1D8] font-sans">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#10110F] mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#263D2B]" />
                <span>WHAT'S INCLUDED</span>
              </h3>
              <ul className="space-y-2.5">
                {whatsIncluded.map((item, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#10110F]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#263D2B] mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* PROMINENT CTA: BOOK THIS TREATMENT */}
            <div className="space-y-3 font-sans">
              <button
                onClick={handleBookNow}
                className="global-button w-full !py-4 !px-6 text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-3 shadow-lg cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>BOOK THIS TREATMENT</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <p className="text-[11px] text-center text-[#6B7068]">
                Direct instant reservation • No pre-payment fee required
              </p>
            </div>

          </div>
        </ScrollReveal>

        {/* Detailed Benefits & Quality Guarantee */}
        <ScrollReveal className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16 p-8 rounded-3xl bg-white border border-[#DCE1D8]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7F4ED] text-[#263D2B] text-xs font-bold tracking-wider uppercase mb-3 border border-[#DCE1D8] font-sans">
              <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
              <span>Treatment Details & Benefits</span>
            </div>
            <h3 className="font-serif text-2xl text-[#10110F] mb-4 font-normal">
              Why You'll Love This Treatment
            </h3>
            <p className="text-sm text-[#6B7068] leading-relaxed mb-6 font-sans">
              Every appointment at Glam Girl by Janki is tailored for delicate skin and maximum comfort. We take the time to evaluate your natural features and ensure flawless precision every time.
            </p>
            <div className="space-y-3 font-sans">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-[#10110F]">
                  <div className="w-5 h-5 rounded-full bg-[#263D2B]/10 text-[#263D2B] flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between border-t md:border-t-0 md:border-l border-[#DCE1D8] pt-6 md:pt-0 md:pl-8 font-sans">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#10110F] mb-2">
                Booking Information
              </h4>
              <p className="text-sm text-[#6B7068] leading-relaxed mb-4">
                Selecting <strong className="text-[#10110F]">"Book This Treatment"</strong> will automatically link this exact service into the booking schedule with its pricing (${service.price}) and duration ({String(service.duration || '15 min').endsWith('min') ? service.duration : `${service.duration} min`}) pre-loaded.
              </p>
              <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] space-y-2 text-xs text-[#10110F]">
                <div className="flex justify-between">
                  <span className="text-[#6B7068]">Selected Service:</span>
                  <span className="font-semibold text-[#10110F]">{service.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7068]">Duration:</span>
                  <span className="text-[#10110F]">{String(service.duration || '15 min').endsWith('min') ? service.duration : `${service.duration} min`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7068]">Confirmed Price:</span>
                  <span className="font-bold text-[#10110F]">${service.price}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#DCE1D8] flex items-center justify-between">
              <span className="text-xs text-[#6B7068]">Ready to pamper yourself?</span>
              <button
                onClick={handleBookNow}
                className="global-button inline-flex items-center gap-1.5 !px-4 !py-2 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                <span>Book Now</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* RELATED TREATMENTS: YOU MAY ALSO LIKE */}
        {relatedServices.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[#DCE1D8]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#263D2B] block mb-1 font-sans">
                  Complimentary Care
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#10110F] font-normal">
                  YOU MAY ALSO LIKE
                </h3>
                <p className="text-xs sm:text-sm text-[#6B7068] mt-1 font-sans">
                  Other popular treatments from the {categoryName} collection
                </p>
              </div>

              <Link
                to={`/services/${categorySlug}`}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#10110F] hover:text-[#263D2B] transition-colors font-sans"
              >
                <span>View All {categoryName}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedServices.map((item) => {
                const itemSlug = item.slug || item.id;
                const itemUrl = `/services/${categorySlug}/${itemSlug}`;
                const itemBookingUrl = `/book-appointment?service=${itemSlug}`;

                return (
                  <div
                    key={item.id}
                    className="group bg-white rounded-2xl border border-[#DCE1D8] hover:border-[#263D2B] overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xs font-sans"
                  >
                    <div>
                      <div className="relative aspect-[4/3] overflow-hidden bg-[#F7F4ED]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#10110F] text-xs font-bold border border-[#DCE1D8]">
                          ${item.price}
                        </div>
                        <div className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[11px] text-[#10110F] border border-[#DCE1D8]">
                          <Clock className="w-3 h-3 text-[#263D2B]" />
                          <span>{String(item.duration || '15 min').endsWith('min') ? item.duration : `${item.duration} min`}</span>
                        </div>
                      </div>

                      <div className="p-4">
                        <h4 className="font-serif text-base text-[#10110F] group-hover:text-[#263D2B] transition-colors mb-1 truncate font-normal">
                          <Link to={itemUrl}>
                            {item.name}
                          </Link>
                        </h4>
                        <p className="text-xs text-[#6B7068] line-clamp-2 leading-relaxed mb-3">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 pt-0 grid grid-cols-2 gap-2 border-t border-[#DCE1D8]">
                      <Link
                        to={itemUrl}
                        className="global-button-secondary !py-2 text-center text-[11px] font-bold"
                      >
                        Details
                      </Link>
                      <Link
                        to={itemBookingUrl}
                        className="global-button !py-2 text-center text-[11px] font-bold text-white"
                      >
                        Book
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

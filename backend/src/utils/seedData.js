import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Service from '../models/Service.js';
import Category from '../models/Category.js';
import TimeSlot from '../models/TimeSlot.js';
import Offer from '../models/Offer.js';
import Gallery from '../models/Gallery.js';
import Review from '../models/Review.js';
import Appointment from '../models/Appointment.js';

import { connectDB } from '../config/database.js';
import { DEFAULT_SALON_TIME_SLOTS } from './timeSlots.js';

dotenv.config();

const INITIAL_CATEGORIES = [
  { id: 'signature-combo', name: 'GLAM GIRL SIGNATURE COMBO', slug: 'signature-combo', icon: 'Sparkles', count: 7, description: 'Curated beauty treatments designed to smooth, glow, relax & enhance —giving you more of what you love in one indulgent experience.' },
  { id: 'lashes', name: 'Lashes', slug: 'lashes', icon: 'Eye', count: 11, description: 'Enhance your natural allure with our expert lash extensions, lifts & tints.' },
  { id: 'addon', name: 'ADD ON', slug: 'add-ons', icon: 'PlusCircle', count: 6, description: 'Enhance your color or chemical service with our selection of nourishing masks, intensive treatments, trims, and finishing touches.' },
  { id: 'threading', name: 'Threading', slug: 'threading', icon: 'Feather', count: 4, description: 'Precision cotton thread shaping for eyebrows, lip & full face.' },
  { id: 'waxing', name: 'Waxing', slug: 'waxing', icon: 'Sparkle', count: 4, description: 'Gentle stripless hard wax for smooth skin.' },
  { id: 'facial', name: 'Facial', slug: 'facial', icon: 'Sparkles', count: 4, description: 'Illuminating, rosewater & saffron luxury facials.' },
  { id: 'massage', name: 'Massage', slug: 'massage', icon: 'Flower2', count: 2, description: 'Relaxing head & body tension release.' },
  { id: 'henna', name: 'Henna', slug: 'henna', icon: 'Palette', count: 2, description: 'Organic bridal & party Mehndi designs.' },
  { id: 'makeup', name: 'Makeup', slug: 'makeup', icon: 'Wand2', count: 2, description: 'HD bridal & signature glam makeover.' },
  { id: 'hairstyling', name: 'Hairstyling', slug: 'hairstyling', icon: 'Sparkles', count: 2, description: 'Voluminous blowouts & waves.' },
  { id: 'haircut', name: 'Hair Cut', slug: 'hair-cut', icon: 'Scissors', count: 2, description: 'Precision haircuts & layers.' },
  { id: 'haircolor', name: 'Hair Color', slug: 'hair-color', icon: 'Droplets', count: 2, description: 'Balayage & root touchups.' },
  { id: 'hairtreatments', name: 'Hair Treatments', slug: 'hair-treatments', icon: 'Heart', count: 2, description: 'Herbal hair spa & repair rituals.' }
];

const INDIAN_INSPIRED_SERVICES = [
  { name: 'The Smooth Skin ritual', category: 'GLAM GIRL SIGNATURE COMBO', categoryName: 'GLAM GIRL SIGNATURE COMBO', description: 'Full arms + Full legs + Underarms + Eyebrows + Upperlip', price: 80, priceFrom: true, duration: '60 min', features: ['Full arms', 'Full legs', 'Underarms', 'Eyebrows', 'Upperlip'], image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80', popular: true, tag: 'Signature Combo' },
  { name: 'The Smooth Goddess ritual', category: 'GLAM GIRL SIGNATURE COMBO', categoryName: 'GLAM GIRL SIGNATURE COMBO', description: 'Full body waxing including Bikini lines', price: 130, priceFrom: true, duration: '75 min', features: ['Full body waxing', 'Bikini lines included'], image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80', popular: true, tag: 'Signature Combo' },
  { name: 'The Glow rituals', category: 'GLAM GIRL SIGNATURE COMBO', categoryName: 'GLAM GIRL SIGNATURE COMBO', description: 'Full arms + Full legs + Underarms + Eyebrows + Upperlip + Facial', price: 150, priceFrom: true, duration: '90 min', features: ['Full arms', 'Full legs', 'Underarms', 'Eyebrows', 'Upperlip', 'Facial'], image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80', popular: true, tag: 'Best Seller' },
  { name: 'The Ultimate Goddess ritual', category: 'GLAM GIRL SIGNATURE COMBO', categoryName: 'GLAM GIRL SIGNATURE COMBO', description: 'Full arms + Full legs + Underarms + Eyebrows + Upperlip + Facial + Body Massage', price: 220, priceFrom: true, duration: '120 min', features: ['Full arms', 'Full legs', 'Underarms', 'Eyebrows', 'Upperlip', 'Facial', 'Body Massage'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80', popular: true, tag: 'Ultimate Luxe' },
  { name: 'The Lash Luxe ritual', category: 'GLAM GIRL SIGNATURE COMBO', categoryName: 'GLAM GIRL SIGNATURE COMBO', description: 'Lash lifting + Tinting', price: 80, priceFrom: true, duration: '45 min', features: ['Lash lifting', 'Tinting'], image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80', tag: 'Signature Combo' },
  { name: 'The Perfect Brow ritual', category: 'GLAM GIRL SIGNATURE COMBO', categoryName: 'GLAM GIRL SIGNATURE COMBO', description: 'Brow lamination + Tinting', price: 80, priceFrom: true, duration: '45 min', features: ['Brow lamination', 'Tinting'], image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80', tag: 'Signature Combo' },
  { name: 'The Glam Eye ritual', category: 'GLAM GIRL SIGNATURE COMBO', categoryName: 'GLAM GIRL SIGNATURE COMBO', description: 'Brow lamination + Lash lifting + Eyelash & Eyebrows Tinting', price: 150, priceFrom: true, duration: '75 min', features: ['Brow lamination', 'Lash lifting', 'Eyelash & Eyebrows Tinting'], image: 'https://images.unsplash.com/photo-1512290900672-1f02e60938c5?auto=format&fit=crop&w=800&q=80', popular: true, tag: 'Signature Combo' },

  { name: 'Lash Lifting', category: 'Lashes', categoryName: 'Lashes', description: 'Gives natural, lasting curls to your eyelashes', price: 70, duration: '45 min', features: ['Natural lash curling', 'Keratin boost'], image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80' },
  { name: 'Lash Tinting', category: 'Lashes', categoryName: 'Lashes', description: 'Darkens and defines natural eyelashes', price: 20, duration: '25 min', features: ['Deep jet-black tint', 'Definition'], image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80' },
  { name: 'Classic eyelash extension', category: 'Lashes', categoryName: 'Lashes', description: 'Single extensions for natural, longer look', price: 100, duration: '75 min', features: ['1:1 extension', 'Natural finish'], image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80', popular: true, tag: 'Classic Look' },
  { name: 'Hybrid eyelash extension', category: 'Lashes', categoryName: 'Lashes', description: 'Blend of classic & volume extensions', price: 120, duration: '90 min', features: ['Wispy texture', 'Fuller line'], image: 'https://images.unsplash.com/photo-1512290900672-1f02e60938c5?auto=format&fit=crop&w=800&q=80', popular: true, tag: 'Popular' },
  { name: 'Volume eyelash extension', category: 'Lashes', categoryName: 'Lashes', description: 'Multiple extensions per natural lash for dramatic look', price: 150, duration: '105 min', features: ['Volume fans', 'Fluffy fullness'], image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80', popular: true, tag: 'Glamour' },
  { name: 'Mega volume eyelash extension', category: 'Lashes', categoryName: 'Lashes', description: 'High-density extension approach for max volume', price: 170, duration: '120 min', features: ['Mega density fans', 'Extreme volume'], image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80', tag: 'Ultimate Drama' },
  { name: 'Eyelash extension removal', category: 'Lashes', categoryName: 'Lashes', description: 'Safe, gentle removal preserving natural lashes', price: 50, duration: '30 min', features: ['Gentle dissolver', 'Protects natural lashes'], image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80' },
  { name: 'Classic eyelash 3 week refills', category: 'Lashes', categoryName: 'Lashes', description: 'Refill within 3 weeks', price: 60, duration: '45 min', features: ['Classic touchup', 'Replace outgrowns'], image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80' },
  { name: 'Hybrid eyelash 3 week refill', category: 'Lashes', categoryName: 'Lashes', description: 'Refill within 3 weeks', price: 70, duration: '60 min', features: ['Hybrid touchup', 'Texture refresh'], image: 'https://images.unsplash.com/photo-1512290900672-1f02e60938c5?auto=format&fit=crop&w=800&q=80' },
  { name: 'Volume eyelash 3 week refill', category: 'Lashes', categoryName: 'Lashes', description: 'Refill within 3 weeks', price: 80, duration: '60 min', features: ['Volume touchup', 'Replenish fans'], image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80' },
  { name: 'Mega volume eyelash 3 week refill', category: 'Lashes', categoryName: 'Lashes', description: 'Refill within 3 weeks', price: 90, duration: '75 min', features: ['Mega volume touchup', 'Full density reset'], image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80' },

  { name: 'Protein Hair mask', category: 'ADD ON', categoryName: 'ADD ON', description: 'Nourishing protein hair mask treatment', price: 15, duration: '15 min', features: ['Protein hair restoration', 'Nourishing mask'], image: '/service.img/HairSpa.jpg' },
  { name: 'Ultimate repair hair mask', category: 'ADD ON', categoryName: 'ADD ON', description: 'Intensive repair hair mask for deep conditioning', price: 20, duration: '15 min', features: ['Deep cuticle repair', 'Damage protection'], image: '/service.img/HairSpa.jpg' },
  { name: 'Smoothening hair mask', category: 'ADD ON', categoryName: 'ADD ON', description: 'Ultra-smoothing hair mask to tame frizz', price: 15, duration: '15 min', features: ['Anti-frizz formula', 'Moisture seal'], image: '/service.img/HairSpa.jpg' },
  { name: 'Anti-breakage strengthening scalp mask', category: 'ADD ON', categoryName: 'ADD ON', description: 'Strengthening scalp & hair mask', price: 25, duration: '20 min', features: ['Anti-breakage defense', 'Scalp fortification'], image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80' },
  { name: 'Wella Bond repair treatment', category: 'ADD ON', categoryName: 'ADD ON', description: 'Advanced Wella bond building treatment', price: 40, duration: '25 min', features: ['Wella Plex bond builder', 'Damage protection'], image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80', popular: true, tag: 'Recommended Add-On' },
  { name: 'Hair cut with any color service', category: 'ADD ON', categoryName: 'ADD ON', description: 'Discounted haircut add-on when paired with color service', price: 40, priceFrom: true, duration: '30 min', features: ['Discounted with color', 'Precision haircut trim'], image: '/service.img/Haircut&Styling.jpg', popular: true, tag: 'Value Add-On' },
  { name: 'Noor Brow Threading', category: 'Threading', categoryName: 'Threading', description: 'Precision cotton thread shaping for eyebrows', price: 10, duration: '15 min', features: ['Custom brow mapping', 'Aloe vera gel'], image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80', popular: true, tag: 'Best Seller' },
  { name: 'Gulab Upper Lip Threading', category: 'Threading', categoryName: 'Threading', description: 'Gentle rose-touch upper lip hair removal', price: 6, duration: '10 min', features: ['Sanitized thread', 'Rosewater soothing'], image: 'https://images.unsplash.com/photo-1512290900672-1f02e60938c5?auto=format&fit=crop&w=800&q=80' },
  { name: 'Sitara Full Face Threading', category: 'Threading', categoryName: 'Threading', description: 'Complete radiance full face threading ritual', price: 35, duration: '30 min', features: ['Full facial hair removal', 'Cucumber compress'], image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80', popular: true, tag: 'Popular' },

  { name: 'Noor Underarm Wax', category: 'Waxing', categoryName: 'Waxing', description: 'Clean, smooth underarm waxing leaving skin hair-free', price: 12, duration: '15 min', features: ['Stripless hard wax', 'Ingrown prevention'], image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80' },
  { name: 'Meera Full Legs Wax', category: 'Waxing', categoryName: 'Waxing', description: 'Complete leg hair removal', price: 45, duration: '45 min', features: ['Full leg coverage', 'Moisturizing oil'], image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80' },

  { name: 'Noor Glow Facial', category: 'Facial', categoryName: 'Facial', description: 'Illuminating glow facial for glass skin finish', price: 95, duration: '60 min', features: ['Deep cleansing', 'Gold serum infusion'], image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80', popular: true, tag: 'Most Loved' },
  { name: 'Gulab Radiance Facial', category: 'Facial', categoryName: 'Facial', description: 'Rosewater & herbal extract soothing facial', price: 110, duration: '60 min', features: ['Sandalwood polish', 'Rosewater mask'], image: 'https://images.unsplash.com/photo-1512290900672-1f02e60938c5?auto=format&fit=crop&w=800&q=80' },
  { name: 'Chandni Hydration Facial', category: 'Facial', categoryName: 'Facial', description: 'Moonlit deep moisture lock treatment', price: 105, duration: '60 min', features: ['Hyaluronic bath', 'Quartz massager'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80' },
  { name: 'Kesar Luxe Facial', category: 'Facial', categoryName: 'Facial', description: 'Saffron & gold leaf anti-aging facial ritual', price: 135, duration: '75 min', features: ['24K gold leaf mask', 'Saffron serum'], image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80', popular: true, tag: 'Luxe' },

  { name: 'Shanti Relaxation Massage', category: 'Massage', categoryName: 'Massage', description: 'Calming full body tension release ritual', price: 90, duration: '60 min', features: ['Essential oils', 'Deep relaxation'], image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80' },

  { name: 'ETHENIC BRIDE', category: 'Makeup', categoryName: 'Makeup', description: 'Royal traditional ethnic bridal package including HD makeup, traditional hair, outfit styling & jewelry placement', price: 400, duration: '180 min', features: ['Makeup', 'Traditional Hair', 'Outfit styling', 'Jwellary styling'], image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80', popular: true, tag: 'Royal Bridal' },
  { name: 'WHITE DRESS BRIDE', category: 'Makeup', categoryName: 'Makeup', description: 'Classic white gown bridal package including HD makeup, hair styling, gown outfit styling & fine jewelry placement', price: 350, duration: '180 min', features: ['Makeup', 'Hair', 'Outfit styling', 'Jwellary styling'], image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80', popular: true, tag: 'White Gown Bridal' },
  { name: 'BRIDAL SIDE FUNCTIONS', category: 'Makeup', categoryName: 'Makeup', description: 'Glamorous pre-wedding & side functions package featuring HD makeup, hair styling, outfit draping & jewelry placement', price: 300, duration: '150 min', features: ['Makeup', 'Hair', 'Outfit styling', 'Jwellary styling'], image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80', popular: true, tag: 'Side Functions' },
  { name: 'Shringar Bridal Makeup', category: 'Makeup', categoryName: 'Makeup', description: 'Luxury bridal makeover including lashes & touchups', price: 350, duration: '150 min', features: ['Airbrush 24-hr base', 'Dupatta draping'], image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80', popular: true, tag: 'Signature Bridal' },
  { name: 'Noor Signature Makeup', category: 'Makeup', categoryName: 'Makeup', description: 'Flawless camera-ready glow glam', price: 110, duration: '60 min', features: ['HD base', 'Eye couture'], image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80' },

  { name: 'Mehndi Classic Design', category: 'Henna', categoryName: 'Henna', description: 'Traditional organic henna pattern for hands', price: 35, duration: '30 min', features: ['100% organic henna', 'Rich stain sealant'], image: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=800&q=80' },
  { name: 'Shringar Bridal Mehndi', category: 'Henna', categoryName: 'Henna', description: 'Full bridal arms & feet detailed Henna masterpiece', price: 250, duration: '180 min', features: ['Bridal story motifs', 'Aftercare oil'], image: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=800&q=80', popular: true, tag: 'Bridal Couture' },

  { name: 'Noor Signature Haircut', category: 'Hair Cut', categoryName: 'Hair Cut', description: 'Customized precision haircut & style', price: 55, duration: '45 min', features: ['Precision cut', 'Blowout finish'], image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80', popular: true, tag: 'Best Seller' },

  { name: 'Noor Balayage', category: 'Hair Color', categoryName: 'Hair Color', description: 'Hand-painted sun-kissed highlights', price: 220, duration: '150 min', features: ['Olaplex bond builder', 'Gloss glaze'], image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80', popular: true, tag: 'Trending' },
  { name: 'Kesariya Hair Colour', category: 'Hair Color', categoryName: 'Hair Color', description: 'Full root touchup or global single process', price: 95, duration: '90 min', features: ['Ammonia-free formula', 'Root coverage'], image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80' },

  { name: 'Kesariya Hair Spa', category: 'Hair Treatments', categoryName: 'Hair Treatments', description: 'Royal herbal hair spa & scalp therapy', price: 85, duration: '60 min', features: ['Warm Brahmi oils', 'Herbal steam'], image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80' },
  { name: 'Noor Hair Repair Ritual', category: 'Hair Treatments', categoryName: 'Hair Treatments', description: 'Intensive bond repair & gloss shine seal', price: 130, duration: '75 min', features: ['Keratin smoothing', 'Deep cuticle repair'], image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80' }
];

export const seedDatabase = async () => {
  try {
    await connectDB();

    await User.deleteMany({});
    await Category.deleteMany({});
    await Service.deleteMany({});
    await TimeSlot.deleteMany({});
    await Offer.deleteMany({});
    await Gallery.deleteMany({});
    await Review.deleteMany({});
    await Appointment.deleteMany({});

    const adminUser = await User.create({
      name: 'Janki Khatroja',
      email: 'admin@girlookedforyou.ca',
      phone: '(613) 555-0182',
      password: 'admin123',
      role: 'admin'
    });

    await Category.insertMany(INITIAL_CATEGORIES);
    await Service.insertMany(INDIAN_INSPIRED_SERVICES);

    const timeSlots = DEFAULT_SALON_TIME_SLOTS.map((t, idx) => ({
      time: t,
      active: true,
      order: idx
    }));
    await TimeSlot.insertMany(timeSlots);

    await Offer.create([
      {
        title: 'New Client Radiance Package',
        description: 'Get 20% OFF your first Noor Glow Facial or Hair Repair Ritual.',
        discount: '20% OFF',
        active: true
      },
      {
        title: 'Bridal Shringar Special',
        description: 'Complimentary trial hairstyle with full Bridal Makeup booking.',
        discount: 'Free Trial',
        active: true
      }
    ]);

    await Gallery.create([
      { image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80', title: 'Studio Lounge', category: 'Salon Interior' },
      { image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80', title: 'Signature Balayage', category: 'Hair' },
      { image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80', title: 'Noor Glow Treatment', category: 'Facial' },
      { image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80', title: 'Bridal Makeup Look', category: 'Makeup' },
      { image: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=800&q=80', title: 'Organic Henna Art', category: 'Henna' }
    ]);

    await Review.create([
      { customerName: 'Priya Sharma', rating: 5, review: 'Best brow threading and facial in Ottawa! Janki is amazing.', status: 'approved' },
      { customerName: 'Emily Watson', rating: 5, review: 'The Noor Glow Facial transformed my skin completely!', status: 'approved' }
    ]);

    console.log('Database seeded successfully 100%.');
    return { success: true };
  } catch (error) {
    console.error('Seeding Error:', error.message);
    process.exit(1);
  }
};

if (process.argv[1].endsWith('seedData.js')) {
  seedDatabase().then(() => mongoose.connection.close());
}

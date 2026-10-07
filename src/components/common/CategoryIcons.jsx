import React from 'react';
import { 
  Scissors, 
  Sparkles, 
  Palette, 
  Flower2, 
  Heart, 
  Hand, 
  Sparkle, 
  ShieldCheck, 
  Clock, 
  Feather,
  Droplets,
  Wand2,
  Eye,
  PlusCircle
} from 'lucide-react';

export function CategoryIcon({ type, className = 'w-5 h-5' }) {
  switch (type) {
    case 'signature-combo':
      return <Sparkles className={className} />;
    case 'lashes':
      return <Eye className={className} />;
    case 'addon':
    case 'add-ons':
      return <PlusCircle className={className} />;
    case 'threading':
      return <Feather className={className} />;
    case 'waxing':
      return <Sparkle className={className} />;
    case 'facial':
      return <Sparkles className={className} />;
    case 'massage':
      return <Flower2 className={className} />;
    case 'henna':
      return <Palette className={className} />;
    case 'makeup':
      return <Wand2 className={className} />;
    case 'hairstyling':
      return <Sparkles className={className} />;
    case 'haircut':
      return <Scissors className={className} />;
    case 'haircolor':
      return <Droplets className={className} />;
    case 'hairtreatments':
      return <Heart className={className} />;
    // Fallback support for older legacy slugs
    case 'hair':
    case 'hair-care':
      return <Scissors className={className} />;
    case 'skin':
    case 'skin-care':
      return <Sparkles className={className} />;
    case 'nails':
    case 'nail-care':
      return <Hand className={className} />;
    case 'spa':
    case 'spa-wellness':
      return <Flower2 className={className} />;
    default:
      return <Sparkles className={className} />;
  }
}

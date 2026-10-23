/**
 * GLAM GIRL BY JANKI — Personal Dream Colour Collection Storage Manager
 * 
 * Handles persistent storage for saved shades, inspiration images, and personal notes.
 * Integrates with customer accounts when authenticated, with safe local browser fallback for guests.
 * Dispatches live cross-component sync events.
 */

import salonDB from '../db/salonDatabase';
import { 
  COLOUR_FAMILIES_CATALOGUE, 
  HAIR_COLOUR_TECHNIQUES, 
  COLOUR_INSPIRATION_GALLERY 
} from '../data/hairColourData';

const BASE_STORAGE_KEY = 'glam_dream_colour_collection';
const LEGACY_SHADES_KEY = 'glam_hair_shade_favorites';

export function getStorageKey() {
  try {
    const user = salonDB.getCurrentUser();
    if (user && (user.id || user.email)) {
      return `${BASE_STORAGE_KEY}_${user.id || user.email.replace(/[^a-zA-Z0-9]/g, '_')}`;
    }
  } catch (e) {
    // fallback to guest key
  }
  return `${BASE_STORAGE_KEY}_guest`;
}

/**
 * Reads the current saved collection from persistence.
 * Gracefully imports legacy favorites and ensures data integrity.
 */
export function getSavedDreamCollection() {
  const key = getStorageKey();
  let collection = { shades: [], inspirations: [] };

  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      collection = JSON.parse(raw);
      if (!Array.isArray(collection.shades)) collection.shades = [];
      if (!Array.isArray(collection.inspirations)) collection.inspirations = [];
    } else {
      // Check if we should import legacy shade favorites
      const legacyShades = localStorage.getItem(LEGACY_SHADES_KEY);
      if (legacyShades) {
        try {
          const parsed = JSON.parse(legacyShades);
          const imported = [];
          COLOUR_FAMILIES_CATALOGUE.forEach((family) => {
            family.shades.forEach((shade) => {
              if (parsed[shade.id]) {
                imported.push({
                  id: shade.id,
                  familyId: family.id,
                  familyName: family.name,
                  name: shade.name,
                  hex: shade.hex,
                  baseLevel: shade.baseLevel,
                  image: shade.image,
                  savedAt: new Date().toISOString(),
                  note: ''
                });
              }
            });
          });
          collection.shades = imported;
        } catch (e) {}
      }
    }
  } catch (err) {
    console.warn('Dream colour storage read error:', err);
    collection = { shades: [], inspirations: [] };
  }

  return collection;
}

/**
 * Saves collection to persistence and dispatches reactive update event
 */
function persistCollection(collection) {
  const key = getStorageKey();
  try {
    localStorage.setItem(key, JSON.stringify(collection));

    // Also update legacy shade map for backwards-compatibility
    const legacyMap = {};
    collection.shades.forEach((s) => {
      legacyMap[s.id] = true;
    });
    localStorage.setItem(LEGACY_SHADES_KEY, JSON.stringify(legacyMap));
  } catch (err) {
    console.warn('Dream colour storage save error:', err);
  }

  // Dispatch custom event for real-time reactivity across all page sections
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('glam_dream_colour_updated', {
        detail: { collection, timestamp: Date.now() }
      })
    );
  }
}

/**
 * Toggles or saves a shade in the dream collection
 */
export function toggleSaveShade(shade, familyId, familyName) {
  if (!shade || !shade.id) return false;
  const current = getSavedDreamCollection();
  const existsIndex = current.shades.findIndex((s) => s.id === shade.id);

  if (existsIndex >= 0) {
    // Remove shade
    current.shades.splice(existsIndex, 1);
    persistCollection(current);
    return false;
  } else {
    // Add shade
    const newShadeEntry = {
      id: shade.id,
      familyId: familyId || 'brunette',
      familyName: familyName || 'Brunette',
      name: shade.name,
      hex: shade.hex,
      baseLevel: shade.baseLevel || '',
      bestSkin: shade.bestSkin || '',
      recommendedTechnique: shade.recommendedTechnique || '',
      serviceId: shade.serviceId || 'noor-balayage',
      image: shade.image || '',
      savedAt: new Date().toISOString(),
      note: ''
    };
    current.shades.unshift(newShadeEntry);
    persistCollection(current);
    return true;
  }
}

/**
 * Checks if a shade is currently saved
 */
export function isShadeSaved(shadeId) {
  if (!shadeId) return false;
  const current = getSavedDreamCollection();
  return current.shades.some((s) => s.id === shadeId);
}

/**
 * Toggles or saves an inspiration image/technique in the dream collection
 */
export function toggleSaveInspiration(item) {
  if (!item || !item.id) return false;
  const current = getSavedDreamCollection();
  const existsIndex = current.inspirations.findIndex((insp) => insp.id === item.id);

  if (existsIndex >= 0) {
    // Remove inspiration
    current.inspirations.splice(existsIndex, 1);
    persistCollection(current);
    return false;
  } else {
    // Add inspiration
    const newInspiration = {
      id: item.id,
      type: item.type || 'technique',
      title: item.title || item.name || 'Hair Colour Look',
      techniqueName: item.techniqueName || item.name || 'Dimensional Technique',
      techniqueId: item.techniqueId || item.id || '',
      image: item.image || item.afterImage || '',
      vibe: item.vibe || item.categoryLabel || item.tagline || '',
      tones: item.tones || item.expectedResult || '',
      serviceId: item.serviceId || 'noor-balayage',
      sourceSection: item.sourceSection || 'Explore Colour Techniques',
      savedAt: new Date().toISOString(),
      note: ''
    };
    current.inspirations.unshift(newInspiration);
    persistCollection(current);
    return true;
  }
}

/**
 * Checks if an inspiration item is currently saved
 */
export function isInspirationSaved(itemId) {
  if (!itemId) return false;
  const current = getSavedDreamCollection();
  return current.inspirations.some((insp) => insp.id === itemId);
}

/**
 * Updates an optional personal note on a saved shade or inspiration
 */
export function updateItemNote(itemId, noteText, itemType = 'shade') {
  const current = getSavedDreamCollection();
  if (itemType === 'shade') {
    const item = current.shades.find((s) => s.id === itemId);
    if (item) {
      item.note = noteText;
      persistCollection(current);
      return true;
    }
  } else {
    const item = current.inspirations.find((insp) => insp.id === itemId);
    if (item) {
      item.note = noteText;
      persistCollection(current);
      return true;
    }
  }
  return false;
}

/**
 * Removes a specific item by ID
 */
export function removeSavedItem(itemId, itemType = 'shade') {
  const current = getSavedDreamCollection();
  if (itemType === 'shade') {
    current.shades = current.shades.filter((s) => s.id !== itemId);
  } else {
    current.inspirations = current.inspirations.filter((insp) => insp.id !== itemId);
  }
  persistCollection(current);
}

/**
 * Clears the entire dream collection
 */
export function clearDreamCollection() {
  const empty = { shades: [], inspirations: [] };
  persistCollection(empty);
  return empty;
}

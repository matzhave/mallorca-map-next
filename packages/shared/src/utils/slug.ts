// Mallorca Map - Slug Generation Utils

import type { Locale } from '../types';

/**
 * Transliteration map for special characters
 * Converts language-specific characters to ASCII equivalents
 */
const TRANSLITERATION_MAP: Record<string, string> = {
  // German
  'ä': 'ae',
  'ö': 'oe',
  'ü': 'ue',
  'ß': 'ss',
  'Ä': 'Ae',
  'Ö': 'Oe',
  'Ü': 'Ue',
  // Spanish
  'á': 'a',
  'é': 'e',
  'í': 'i',
  'ó': 'o',
  'ú': 'u',
  'ñ': 'n',
  'Á': 'A',
  'É': 'E',
  'Í': 'I',
  'Ó': 'O',
  'Ú': 'U',
  'Ñ': 'N',
  '¿': '',
  '¡': '',
  // French (for potential future use)
  'à': 'a',
  'â': 'a',
  'ç': 'c',
  'è': 'e',
  'ê': 'e',
  'ë': 'e',
  'î': 'i',
  'ï': 'i',
  'ô': 'o',
  'ù': 'u',
  'û': 'u',
  'ÿ': 'y',
  'æ': 'ae',
  'œ': 'oe',
  // Common symbols
  '&': 'and',
  '@': 'at',
  '%': 'percent',
  '+': 'plus',
  '=': 'equals',
  '<': 'lt',
  '>': 'gt',
  '|': 'or',
  '€': 'euro',
  '$': 'dollar',
  '£': 'pound',
};

/**
 * Transliterate special characters to ASCII
 */
function transliterate(text: string): string {
  return text
    .split('')
    .map((char) => TRANSLITERATION_MAP[char] || char)
    .join('');
}

/**
 * Generate a URL-friendly slug from a string
 * @param text - Input text to slugify
 * @param locale - Optional locale for language-specific handling
 * @returns URL-friendly slug
 * 
 * @example
 * generateSlug('Lievito Pizzeria Ponent Palma') // 'lievito-pizzeria-ponent-palma'
 * generateSlug('Café König München') // 'cafe-koenig-muenchen'
 * generateSlug('España - Mallorca 2024!') // 'espana-mallorca-2024'
 */
export function generateSlug(text: string, locale?: Locale): string {
  if (!text || typeof text !== 'string') {
    return '';
  }

  // 1. Trim and lowercase
  let slug = text.trim().toLowerCase();

  // 2. Transliterate special characters
  slug = transliterate(slug);

  // 3. Replace spaces and special chars with hyphens
  slug = slug
    .replace(/[\s_]+/g, '-') // spaces and underscores to hyphens
    .replace(/[^\w\-]+/g, '') // remove non-word chars except hyphens
    .replace(/\-\-+/g, '-') // replace multiple hyphens with single hyphen
    .replace(/^-+/, '') // trim hyphens from start
    .replace(/-+$/, ''); // trim hyphens from end

  // 4. Ensure maximum length (75 chars is SEO-friendly)
  if (slug.length > 75) {
    slug = slug.substring(0, 75).replace(/-[^-]*$/, ''); // cut at last complete word
  }

  return slug;
}

/**
 * Generate a unique slug with suffix if needed
 * @param baseSlug - Base slug to make unique
 * @param existingSlugs - Array of existing slugs to check against
 * @returns Unique slug with suffix if needed (-2, -3, etc.)
 * 
 * @example
 * generateUniqueSlug('pizza-restaurant', ['pizza-restaurant'])
 * // returns 'pizza-restaurant-2'
 */
export function generateUniqueSlug(
  baseSlug: string,
  existingSlugs: string[]
): string {
  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug;
  }

  let counter = 2;
  let uniqueSlug = `${baseSlug}-${counter}`;

  while (existingSlugs.includes(uniqueSlug)) {
    counter++;
    uniqueSlug = `${baseSlug}-${counter}`;
  }

  return uniqueSlug;
}

/**
 * Generate slugs for all locales
 * @param text - Input text
 * @returns Object with slug for each locale
 */
export function generateMultilingualSlug(text: string): {
  de: string;
  en: string;
  es: string;
} {
  const baseSlug = generateSlug(text);
  
  return {
    de: baseSlug,
    en: baseSlug,
    es: baseSlug,
  };
}

/**
 * Generate a slug with location suffix
 * Useful for places with same name in different locations
 * 
 * @example
 * generateSlugWithLocation('Pizza Roma', 'Palma')
 * // returns 'pizza-roma-palma'
 */
export function generateSlugWithLocation(
  name: string,
  location: string
): string {
  const nameSlug = generateSlug(name);
  const locationSlug = generateSlug(location);
  
  return `${nameSlug}-${locationSlug}`;
}

/**
 * Extract location from address for slug generation
 * Takes the city/area from an address string
 */
export function extractLocationFromAddress(address: string): string {
  // Common patterns in Mallorca addresses:
  // "Carrer dels Ocells, 13, Ponent, 07011 Palma"
  // Try to extract the city (usually last part after postal code)
  const parts = address.split(',').map((p) => p.trim());
  
  if (parts.length > 0) {
    const lastPart = parts[parts.length - 1];
    // Extract city after postal code (e.g., "07011 Palma" -> "Palma")
    const cityMatch = lastPart.match(/\d{5}\s+(.+)/);
    if (cityMatch && cityMatch[1]) {
      return cityMatch[1];
    }
    return lastPart;
  }
  
  return '';
}

/**
 * Validate if a string is a valid slug
 */
export function isValidSlug(slug: string): boolean {
  // Valid slug: lowercase, alphanumeric, hyphens only, no leading/trailing hyphens
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug) && slug.length > 0 && slug.length <= 100;
}

/**
 * Parse a slug back to a readable title
 * Note: This is lossy - special characters are lost
 * 
 * @example
 * parseSlugToTitle('pizza-restaurant-palma')
 * // returns 'Pizza Restaurant Palma'
 */
export function parseSlugToTitle(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}


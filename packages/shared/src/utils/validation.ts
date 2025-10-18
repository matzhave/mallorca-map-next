// Mallorca Map - Validation Utils

import { IMAGE_UPLOAD_LIMITS, VIDEO_UPLOAD_LIMITS } from '../constants';
import type { ValidationResult } from '../types';

/**
 * Validate email address
 * @example
 * validateEmail('test@example.com') // true
 * validateEmail('invalid-email') // false
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (international format)
 * Accepts: +34 123456789, +49 123 456789, 0034123456789
 */
export function validatePhone(phone: string): boolean {
  // Remove spaces and common separators
  const cleaned = phone.replace(/[\s\-()]/g, '');
  
  // Must start with + or 00, followed by country code and number
  const phoneRegex = /^(\+|00)\d{10,15}$/;
  return phoneRegex.test(cleaned);
}

/**
 * Validate URL
 * @example
 * validateUrl('https://example.com') // true
 * validateUrl('not-a-url') // false
 */
export function validateUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Validate image file
 * Checks file size and MIME type
 */
export function validateImageFile(
  file: File,
  maxSizeBytes: number = IMAGE_UPLOAD_LIMITS.MAX_SIZE_BYTES
): ValidationResult {
  const errors: string[] = [];

  // Check file size
  if (file.size > maxSizeBytes) {
    const maxMB = maxSizeBytes / (1024 * 1024);
    errors.push(`Bild darf maximal ${maxMB} MB groß sein`);
  }

  // Check MIME type
  if (!IMAGE_UPLOAD_LIMITS.ALLOWED_TYPES.includes(file.type)) {
    errors.push(
      `Bildformat nicht unterstützt. Erlaubt: ${IMAGE_UPLOAD_LIMITS.ALLOWED_TYPES.join(', ')}`
    );
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate video file
 * Checks file size and MIME type
 */
export function validateVideoFile(
  file: File,
  maxSizeBytes: number = VIDEO_UPLOAD_LIMITS.MAX_SIZE_BYTES
): ValidationResult {
  const errors: string[] = [];

  // Check file size
  if (file.size > maxSizeBytes) {
    const maxMB = maxSizeBytes / (1024 * 1024);
    errors.push(`Video darf maximal ${maxMB} MB groß sein`);
  }

  // Check MIME type
  if (!VIDEO_UPLOAD_LIMITS.ALLOWED_TYPES.includes(file.type)) {
    errors.push(
      `Videoformat nicht unterstützt. Erlaubt: ${VIDEO_UPLOAD_LIMITS.ALLOWED_TYPES.join(', ')}`
    );
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate business document (PDF or image)
 */
export function validateBusinessDocument(file: File): ValidationResult {
  const errors: string[] = [];
  const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
  const ALLOWED_TYPES = [
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png',
  ];

  // Check file size
  if (file.size > MAX_SIZE) {
    errors.push('Dokument darf maximal 10 MB groß sein');
  }

  // Check MIME type
  if (!ALLOWED_TYPES.includes(file.type)) {
    errors.push('Nur PDF oder Bilddateien (JPEG, PNG) erlaubt');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate password strength
 * Requirements:
 * - At least 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 */
export function validatePassword(password: string): ValidationResult {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Passwort muss mindestens 8 Zeichen lang sein');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Passwort muss mindestens einen Großbuchstaben enthalten');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Passwort muss mindestens einen Kleinbuchstaben enthalten');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Passwort muss mindestens eine Zahl enthalten');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate opening hours time format (HH:mm)
 * @example
 * validateTimeFormat('09:00') // true
 * validateTimeFormat('9:00') // false
 * validateTimeFormat('25:00') // false
 */
export function validateTimeFormat(time: string): boolean {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return timeRegex.test(time);
}

/**
 * Validate postal code (German or Spanish)
 * @example
 * validatePostalCode('07011') // true (Spanish)
 * validatePostalCode('80331') // true (German)
 */
export function validatePostalCode(postalCode: string): boolean {
  // German: 5 digits
  // Spanish: 5 digits
  const postalRegex = /^\d{5}$/;
  return postalRegex.test(postalCode);
}

/**
 * Validate coordinates
 * Latitude: -90 to 90
 * Longitude: -180 to 180
 */
export function validateCoordinates(
  latitude: number,
  longitude: number
): ValidationResult {
  const errors: string[] = [];

  if (latitude < -90 || latitude > 90) {
    errors.push('Breitengrad muss zwischen -90 und 90 liegen');
  }

  if (longitude < -180 || longitude > 180) {
    errors.push('Längengrad muss zwischen -180 und 180 liegen');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate rating value (1-5)
 */
export function validateRating(rating: number): boolean {
  return rating >= 1 && rating <= 5 && Number.isFinite(rating);
}

/**
 * Validate price (must be positive)
 */
export function validatePrice(price: number): boolean {
  return price >= 0 && Number.isFinite(price);
}

/**
 * Validate slug format
 * Must be lowercase, alphanumeric, hyphens only
 */
export function validateSlug(slug: string): ValidationResult {
  const errors: string[] = [];

  if (slug.length === 0) {
    errors.push('Slug darf nicht leer sein');
  }

  if (slug.length > 100) {
    errors.push('Slug darf maximal 100 Zeichen lang sein');
  }

  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!slugRegex.test(slug)) {
    errors.push(
      'Slug darf nur Kleinbuchstaben, Zahlen und Bindestriche enthalten'
    );
  }

  if (slug.startsWith('-') || slug.endsWith('-')) {
    errors.push('Slug darf nicht mit einem Bindestrich beginnen oder enden');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate claim data (Step 1)
 */
export function validateClaimStep1(data: {
  name: string;
  address: string;
  phone?: string;
  website?: string;
}): ValidationResult {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name muss mindestens 2 Zeichen lang sein');
  }

  if (!data.address || data.address.trim().length < 5) {
    errors.push('Adresse muss mindestens 5 Zeichen lang sein');
  }

  if (data.phone && !validatePhone(data.phone)) {
    errors.push('Telefonnummer ist ungültig');
  }

  if (data.website && !validateUrl(data.website)) {
    errors.push('Website-URL ist ungültig');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Sanitize HTML to prevent XSS
 * Basic sanitization - removes script tags and dangerous attributes
 * For production, use a library like DOMPurify
 */
export function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '')
    .replace(/javascript:/gi, '');
}

/**
 * Validate hex color code
 * @example
 * validateHexColor('#14B8C4') // true
 * validateHexColor('#FFF') // true
 * validateHexColor('blue') // false
 */
export function validateHexColor(color: string): boolean {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexRegex.test(color);
}

/**
 * Check if string contains only safe characters (alphanumeric + common punctuation)
 * Useful for user-generated content
 */
export function containsOnlySafeCharacters(text: string): boolean {
  // Allows: letters, numbers, spaces, common punctuation, umlauts, accents
  const safeRegex = /^[a-zA-Z0-9äöüßÄÖÜáéíóúñÁÉÍÓÚÑ\s.,!?;:()\-'"]+$/;
  return safeRegex.test(text);
}

/**
 * Validate business hours object
 */
export function validateBusinessHours(hours: {
  open: string;
  close: string;
  closed: boolean;
}): ValidationResult {
  const errors: string[] = [];

  if (!hours.closed) {
    if (!validateTimeFormat(hours.open)) {
      errors.push('Öffnungszeit hat ungültiges Format (HH:mm)');
    }

    if (!validateTimeFormat(hours.close)) {
      errors.push('Schließzeit hat ungültiges Format (HH:mm)');
    }

    // Check if closing time is after opening time
    if (
      validateTimeFormat(hours.open) &&
      validateTimeFormat(hours.close) &&
      hours.open >= hours.close
    ) {
      errors.push('Schließzeit muss nach Öffnungszeit liegen');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}


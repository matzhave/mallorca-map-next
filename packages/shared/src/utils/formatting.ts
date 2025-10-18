// Mallorca Map - Formatting Utils

import type { Locale, OpeningHours, OpeningHoursDay } from '../types';
import { CURRENCY_SYMBOL, DEFAULT_CURRENCY } from '../constants';

/**
 * Format price in cents to localized string
 * @param cents - Price in cents
 * @param currency - Currency code (default: EUR)
 * @param locale - Locale for formatting
 * @returns Formatted price string
 * 
 * @example
 * formatPrice(4700, 'EUR', 'de') // '47,00 €'
 * formatPrice(11700, 'EUR', 'en') // '€117.00'
 */
export function formatPrice(
  cents: number,
  currency: string = DEFAULT_CURRENCY,
  locale: Locale = 'de'
): string {
  const amount = cents / 100;
  
  const formatter = new Intl.NumberFormat(getIntlLocale(locale), {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(amount);
}

/**
 * Format price range
 * @example
 * formatPriceRange(2500, 4500, 'EUR', 'de') // '25 € - 45 €'
 */
export function formatPriceRange(
  minCents: number,
  maxCents: number,
  currency: string = DEFAULT_CURRENCY,
  locale: Locale = 'de'
): string {
  const min = formatPrice(minCents, currency, locale);
  const max = formatPrice(maxCents, currency, locale);
  
  const separator = locale === 'de' ? ' – ' : ' - ';
  return `${min}${separator}${max}`;
}

/**
 * Format distance in meters to human-readable string
 * @param meters - Distance in meters
 * @param locale - Locale for formatting
 * @returns Formatted distance string
 * 
 * @example
 * formatDistance(750, 'de') // '750 m'
 * formatDistance(2500, 'de') // '2,5 km'
 * formatDistance(15000, 'en') // '15 km'
 */
export function formatDistance(meters: number, locale: Locale = 'de'): string {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }

  const km = meters / 1000;
  const formatter = new Intl.NumberFormat(getIntlLocale(locale), {
    minimumFractionDigits: km % 1 === 0 ? 0 : 1,
    maximumFractionDigits: 1,
  });

  return `${formatter.format(km)} km`;
}

/**
 * Format duration in minutes to human-readable string
 * @param minutes - Duration in minutes
 * @param locale - Locale for formatting
 * @returns Formatted duration string
 * 
 * @example
 * formatDuration(45, 'de') // '45 Min.'
 * formatDuration(90, 'de') // '1 Std. 30 Min.'
 * formatDuration(120, 'en') // '2 hours'
 */
export function formatDuration(minutes: number, locale: Locale = 'de'): string {
  if (minutes < 60) {
    return locale === 'de'
      ? `${minutes} Min.`
      : locale === 'en'
      ? `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`
      : `${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
  }

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (mins === 0) {
    return locale === 'de'
      ? `${hours} Std.`
      : locale === 'en'
      ? `${hours} ${hours === 1 ? 'hour' : 'hours'}`
      : `${hours} ${hours === 1 ? 'hora' : 'horas'}`;
  }

  return locale === 'de'
    ? `${hours} Std. ${mins} Min.`
    : locale === 'en'
    ? `${hours}h ${mins}m`
    : `${hours}h ${mins}m`;
}

/**
 * Format opening hours day to readable string
 * @example
 * formatOpeningHoursDay({ open: '09:00', close: '22:00', closed: false })
 * // '09:00 - 22:00'
 */
export function formatOpeningHoursDay(
  day: OpeningHoursDay,
  locale: Locale = 'de'
): string {
  if (day.closed) {
    return locale === 'de'
      ? 'Geschlossen'
      : locale === 'en'
      ? 'Closed'
      : 'Cerrado';
  }

  return `${day.open} - ${day.close}`;
}

/**
 * Format opening hours for a specific weekday
 * @param hours - Opening hours object
 * @param weekday - Day index (0 = Monday, 6 = Sunday)
 * @param locale - Locale for formatting
 */
export function formatOpeningHoursForDay(
  hours: OpeningHours,
  weekday: 0 | 1 | 2 | 3 | 4 | 5 | 6,
  locale: Locale = 'de'
): string {
  const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;
  const dayName = dayNames[weekday];
  const dayHours = hours[dayName];

  return formatOpeningHoursDay(dayHours, locale);
}

/**
 * Format date to localized string
 * @example
 * formatDate(new Date('2024-06-15'), 'de') // '15.06.2024'
 * formatDate(new Date('2024-06-15'), 'en') // 'Jun 15, 2024'
 */
export function formatDate(date: Date | string, locale: Locale = 'de'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const formatter = new Intl.DateTimeFormat(getIntlLocale(locale), {
    year: 'numeric',
    month: locale === 'en' ? 'short' : '2-digit',
    day: '2-digit',
  });

  return formatter.format(dateObj);
}

/**
 * Format date with time
 * @example
 * formatDateTime(new Date('2024-06-15T20:00:00'), 'de')
 * // '15.06.2024, 20:00'
 */
export function formatDateTime(
  date: Date | string,
  locale: Locale = 'de'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const formatter = new Intl.DateTimeFormat(getIntlLocale(locale), {
    year: 'numeric',
    month: locale === 'en' ? 'short' : '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  return formatter.format(dateObj);
}

/**
 * Format time only
 * @example
 * formatTime(new Date('2024-06-15T20:30:00')) // '20:30'
 */
export function formatTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const formatter = new Intl.DateTimeFormat('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return formatter.format(dateObj);
}

/**
 * Format relative time (e.g., "2 hours ago")
 * @example
 * formatRelativeTime(new Date(Date.now() - 3600000), 'de') // 'vor 1 Stunde'
 */
export function formatRelativeTime(
  date: Date | string,
  locale: Locale = 'de'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 7) {
    return formatDate(dateObj, locale);
  }

  const rtf = new Intl.RelativeTimeFormat(getIntlLocale(locale), {
    numeric: 'auto',
  });

  if (diffDays > 0) {
    return rtf.format(-diffDays, 'day');
  }
  if (diffHours > 0) {
    return rtf.format(-diffHours, 'hour');
  }
  if (diffMin > 0) {
    return rtf.format(-diffMin, 'minute');
  }
  
  return locale === 'de'
    ? 'gerade eben'
    : locale === 'en'
    ? 'just now'
    : 'justo ahora';
}

/**
 * Format number with locale-specific separators
 * @example
 * formatNumber(1234567.89, 'de') // '1.234.567,89'
 * formatNumber(1234567.89, 'en') // '1,234,567.89'
 */
export function formatNumber(
  value: number,
  locale: Locale = 'de',
  decimals: number = 0
): string {
  const formatter = new Intl.NumberFormat(getIntlLocale(locale), {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return formatter.format(value);
}

/**
 * Format rating with stars
 * @example
 * formatRating(4.5) // '★★★★☆ 4.5'
 */
export function formatRating(rating: number): string {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const stars =
    '★'.repeat(fullStars) +
    (hasHalfStar ? '⯨' : '') +
    '☆'.repeat(emptyStars);

  return `${stars} ${rating.toFixed(1)}`;
}

/**
 * Format phone number for display
 * @example
 * formatPhoneNumber('+34971412882') // '+34 971 41 28 82'
 */
export function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, '');

  // Spanish mobile/landline format
  if (cleaned.startsWith('+34')) {
    const number = cleaned.substring(3);
    return `+34 ${number.replace(/(\d{3})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4')}`;
  }

  // German format
  if (cleaned.startsWith('+49')) {
    const number = cleaned.substring(3);
    return `+49 ${number.replace(/(\d{3,4})(\d+)/, '$1 $2')}`;
  }

  // Default: add space every 3-4 digits
  return cleaned.replace(/(\d{3,4})/g, '$1 ').trim();
}

/**
 * Format file size in bytes to human-readable string
 * @example
 * formatFileSize(1024) // '1 KB'
 * formatFileSize(2048000) // '2 MB'
 */
export function formatFileSize(bytes: number, locale: Locale = 'de'): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  const value = bytes / Math.pow(k, i);
  const formatted = new Intl.NumberFormat(getIntlLocale(locale), {
    maximumFractionDigits: 2,
  }).format(value);

  return `${formatted} ${sizes[i]}`;
}

/**
 * Get Intl locale string from our Locale type
 */
function getIntlLocale(locale: Locale): string {
  const localeMap: Record<Locale, string> = {
    de: 'de-DE',
    en: 'en-GB',
    es: 'es-ES',
  };
  
  return localeMap[locale] || 'de-DE';
}

/**
 * Truncate text with ellipsis
 * @example
 * truncateText('Very long description...', 50)
 * // 'Very long description...'
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }

  return text.substring(0, maxLength - 3).trim() + '...';
}


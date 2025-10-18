// Mallorca Map - Place Queries

import type {
  Place,
  PlaceWithCategory,
  SearchFilters,
  SearchResult,
  Locale,
} from '../types';
import { PAGINATION } from '../constants';

/**
 * Get place by ID with localized content
 * Note: This returns the structure - actual Supabase call should be made in the consuming app
 */
export function buildGetPlaceByIdQuery(id: string, locale: Locale) {
  return {
    table: 'places',
    select: `
      *,
      category:categories(*)
    `,
    filters: {
      id,
      is_active: true,
    },
    single: true,
    locale,
  };
}

/**
 * Get place by slug with localized content
 */
export function buildGetPlaceBySlugQuery(slug: string, locale: Locale) {
  const slugField = `slug_${locale}`;
  
  return {
    table: 'places',
    select: `
      *,
      category:categories(*)
    `,
    filters: {
      [slugField]: slug,
      is_active: true,
    },
    single: true,
    locale,
  };
}

/**
 * Build query for places by category with filters
 */
export function buildGetPlacesByCategoryQuery(
  categoryId: string,
  filters: SearchFilters,
  locale: Locale
) {
  const {
    query,
    open_now,
    rating_min,
    price_level,
    cuisine_type,
    latitude,
    longitude,
    radius,
    sort_by = 'relevance',
    sort_order = 'desc',
    limit = PAGINATION.DEFAULT_LIMIT,
    offset = PAGINATION.DEFAULT_OFFSET,
  } = filters;

  // Build filter conditions
  const conditions: Record<string, unknown> = {
    category_id: categoryId,
    is_active: true,
  };

  if (rating_min) {
    conditions.rating = { gte: rating_min };
  }

  if (price_level && price_level.length > 0) {
    conditions.price_level = { in: price_level };
  }

  if (cuisine_type && cuisine_type.length > 0) {
    conditions.cuisine_type = { in: cuisine_type };
  }

  // Build sort
  let orderBy: Array<{ column: string; ascending: boolean }> = [];
  
  switch (sort_by) {
    case 'rating':
      orderBy = [{ column: 'rating', ascending: sort_order === 'asc' }];
      break;
    case 'name':
      orderBy = [{ column: 'title', ascending: sort_order === 'asc' }];
      break;
    case 'price':
      orderBy = [{ column: 'price_from', ascending: sort_order === 'asc' }];
      break;
    case 'distance':
      // Distance sorting requires PostGIS query - handle in app
      orderBy = [];
      break;
    default:
      // Relevance: featured first, then by rating
      orderBy = [
        { column: 'featured', ascending: false },
        { column: 'rating', ascending: false },
      ];
  }

  return {
    table: 'places',
    select: `
      *,
      category:categories(*)
    `,
    filters: conditions,
    orderBy,
    limit,
    offset,
    locale,
    // Metadata for distance calculation
    userLocation: latitude && longitude ? { latitude, longitude } : null,
    radius,
    query, // For full-text search
    openNow: open_now,
  };
}

/**
 * Search places with full-text search
 */
export function buildSearchPlacesQuery(
  searchQuery: string,
  filters: SearchFilters,
  locale: Locale
) {
  const {
    category_id,
    rating_min,
    price_level,
    latitude,
    longitude,
    radius,
    limit = PAGINATION.DEFAULT_LIMIT,
    offset = PAGINATION.DEFAULT_OFFSET,
  } = filters;

  const conditions: Record<string, unknown> = {
    is_active: true,
  };

  if (category_id) {
    conditions.category_id = category_id;
  }

  if (rating_min) {
    conditions.rating = { gte: rating_min };
  }

  if (price_level && price_level.length > 0) {
    conditions.price_level = { in: price_level };
  }

  return {
    table: 'places',
    select: `
      *,
      category:categories(*)
    `,
    filters: conditions,
    search: {
      query: searchQuery,
      fields: ['title', 'description', 'location'],
    },
    limit,
    offset,
    locale,
    userLocation: latitude && longitude ? { latitude, longitude } : null,
    radius,
  };
}

/**
 * Get nearby places within radius
 */
export function buildGetNearbyPlacesQuery(
  latitude: number,
  longitude: number,
  radiusMeters: number,
  filters: Partial<SearchFilters> = {},
  locale: Locale
) {
  const {
    category_id,
    rating_min,
    limit = PAGINATION.DEFAULT_LIMIT,
  } = filters;

  const conditions: Record<string, unknown> = {
    is_active: true,
  };

  if (category_id) {
    conditions.category_id = category_id;
  }

  if (rating_min) {
    conditions.rating = { gte: rating_min };
  }

  return {
    table: 'places',
    select: `
      *,
      category:categories(*)
    `,
    filters: conditions,
    geoQuery: {
      latitude,
      longitude,
      radius: radiusMeters,
    },
    orderBy: [{ column: 'distance', ascending: true }],
    limit,
    locale,
  };
}

/**
 * Get similar places (by category and location)
 * Used for "Ähnliche Einträge" section
 */
export function buildGetSimilarPlacesQuery(
  placeId: string,
  categoryId: string,
  latitude: number | null,
  longitude: number | null,
  locale: Locale,
  limit: number = 5
) {
  const conditions: Record<string, unknown> = {
    category_id: categoryId,
    is_active: true,
    id: { neq: placeId }, // Exclude current place
  };

  return {
    table: 'places',
    select: `
      *,
      category:categories(*)
    `,
    filters: conditions,
    geoQuery:
      latitude && longitude
        ? {
            latitude,
            longitude,
            radius: 10000, // 10km radius
          }
        : null,
    orderBy: [
      { column: 'rating', ascending: false },
      { column: 'review_count', ascending: false },
    ],
    limit,
    locale,
  };
}

/**
 * Get featured places for homepage
 */
export function buildGetFeaturedPlacesQuery(
  locale: Locale,
  limit: number = 6
) {
  return {
    table: 'places',
    select: `
      *,
      category:categories(*)
    `,
    filters: {
      is_active: true,
      featured: true,
    },
    orderBy: [
      { column: 'rating', ascending: false },
      { column: 'review_count', ascending: false },
    ],
    limit,
    locale,
  };
}

/**
 * Get place count by category
 */
export function buildGetPlacesCountQuery(categoryId?: string) {
  const filters: Record<string, unknown> = {
    is_active: true,
  };

  if (categoryId) {
    filters.category_id = categoryId;
  }

  return {
    table: 'places',
    count: 'exact',
    filters,
  };
}

/**
 * Check if place is currently open
 * This is a helper to determine opening hours status
 * Should be run client-side with place.opening_hours data
 */
export function isPlaceOpenNow(openingHours: unknown): boolean {
  if (!openingHours || typeof openingHours !== 'object') {
    return false;
  }

  const hours = openingHours as Record<string, unknown>;
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, ...
  const dayNames = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];
  const dayName = dayNames[dayOfWeek];

  const dayHours = hours[dayName] as
    | { open: string; close: string; closed: boolean }
    | undefined;

  if (!dayHours || dayHours.closed) {
    return false;
  }

  const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;

  return currentTime >= dayHours.open && currentTime <= dayHours.close;
}

/**
 * Helper to extract localized field
 */
export function getLocalizedField<T extends Record<string, unknown>>(
  obj: T,
  fieldName: string,
  locale: Locale
): string | null {
  const localizedKey = `${fieldName}_${locale}`;
  const fallbackKey = fieldName;

  return (
    (obj[localizedKey] as string) ||
    (obj[fallbackKey] as string) ||
    null
  );
}


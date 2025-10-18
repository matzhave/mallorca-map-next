// Mallorca Map - Tours/Experiences Queries

import type { Locale, SearchFilters } from '../types';
import { PAGINATION } from '../constants';

/**
 * Tour/Experience-specific filters
 */
export interface TourFilters extends Partial<SearchFilters> {
    duration_hours_min?: number;
    duration_hours_max?: number;
    difficulty?: string[]; // easy, moderate, hard
    group_size_max?: number;
    includes_guide?: boolean;
    includes_transport?: boolean;
    suitable_for_children?: boolean;
}

/**
 * Get tour/experience by ID
 */
export function buildGetTourByIdQuery(id: string, locale: Locale) {
    return {
        table: 'experiences',
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
 * Get tour by slug
 */
export function buildGetTourBySlugQuery(slug: string, locale: Locale) {
    const slugField = `slug_${locale}`;

    return {
        table: 'experiences',
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
 * Get all tours with filters
 */
export function buildGetToursQuery(
    filters: TourFilters,
    locale: Locale
) {
    const {
        query,
        category_id,
        rating_min,
        latitude,
        longitude,
        radius,
        duration_hours_min,
        duration_hours_max,
        difficulty,
        group_size_max,
        includes_guide,
        includes_transport,
        suitable_for_children,
        sort_by = 'rating',
        sort_order = 'desc',
        limit = PAGINATION.DEFAULT_LIMIT,
        offset = PAGINATION.DEFAULT_OFFSET,
    } = filters;

    const conditions: Record<string, unknown> = {
        is_active: true,
        external_source: { in: ['viator', 'getyourguide', 'manual'] },
    };

    if (category_id) {
        conditions.category_id = category_id;
    }

    if (rating_min) {
        conditions.rating = { gte: rating_min };
    }

    if (duration_hours_min !== undefined) {
        conditions.duration_hours = { gte: duration_hours_min };
    }

    if (duration_hours_max !== undefined) {
        if (typeof conditions.duration_hours === 'object' && conditions.duration_hours !== null) {
            conditions.duration_hours = {
                ...(conditions.duration_hours as Record<string, unknown>),
                lte: duration_hours_max,
            };
        } else {
            conditions.duration_hours = { lte: duration_hours_max };
        }
    }

    if (difficulty && difficulty.length > 0) {
        conditions.difficulty = { in: difficulty };
    }

    if (group_size_max !== undefined) {
        conditions.max_group_size = { lte: group_size_max };
    }

    if (typeof includes_guide === 'boolean') {
        conditions.includes_guide = includes_guide;
    }

    if (typeof includes_transport === 'boolean') {
        conditions.includes_transport = includes_transport;
    }

    if (typeof suitable_for_children === 'boolean') {
        conditions.suitable_for_children = suitable_for_children;
    }

    let orderBy: Array<{ column: string; ascending: boolean }> = [];

    switch (sort_by) {
        case 'price':
            orderBy = [{ column: 'price_from', ascending: sort_order === 'asc' }];
            break;
        case 'duration':
            orderBy = [{ column: 'duration_hours', ascending: sort_order === 'asc' }];
            break;
        case 'title':
            orderBy = [{ column: 'title', ascending: sort_order === 'asc' }];
            break;
        default:
            orderBy = [
                { column: 'featured', ascending: false },
                { column: 'rating', ascending: false },
                { column: 'review_count', ascending: false },
            ];
    }

    return {
        table: 'experiences',
        select: `
      *,
      category:categories(*)
    `,
        filters: conditions,
        orderBy,
        limit,
        offset,
        locale,
        query,
        userLocation: latitude && longitude ? { latitude, longitude } : null,
        radius,
    };
}

/**
 * Search tours
 */
export function buildSearchToursQuery(
    searchQuery: string,
    filters: TourFilters,
    locale: Locale
) {
    const {
        category_id,
        rating_min,
        duration_hours_min,
        duration_hours_max,
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

    if (duration_hours_min !== undefined) {
        conditions.duration_hours = { gte: duration_hours_min };
    }

    if (duration_hours_max !== undefined) {
        if (typeof conditions.duration_hours === 'object' && conditions.duration_hours !== null) {
            conditions.duration_hours = {
                ...(conditions.duration_hours as Record<string, unknown>),
                lte: duration_hours_max,
            };
        } else {
            conditions.duration_hours = { lte: duration_hours_max };
        }
    }

    return {
        table: 'experiences',
        select: `
      *,
      category:categories(*)
    `,
        filters: conditions,
        search: {
            query: searchQuery,
            fields: ['title', 'description', 'location'],
        },
        orderBy: [
            { column: 'rating', ascending: false },
            { column: 'review_count', ascending: false },
        ],
        limit,
        offset,
        locale,
    };
}

/**
 * Get featured tours
 */
export function buildGetFeaturedToursQuery(
    locale: Locale,
    limit: number = 6
) {
    return {
        table: 'experiences',
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
 * Get tours by provider (Viator, GetYourGuide)
 */
export function buildGetToursByProviderQuery(
    provider: 'viator' | 'getyourguide',
    locale: Locale,
    limit: number = 20
) {
    return {
        table: 'experiences',
        select: `
      *,
      category:categories(*)
    `,
        filters: {
            is_active: true,
            external_source: provider,
        },
        orderBy: [
            { column: 'rating', ascending: false },
        ],
        limit,
        locale,
    };
}

/**
 * Get tours count
 */
export function buildGetToursCountQuery(filters?: Partial<TourFilters>) {
    const conditions: Record<string, unknown> = {
        is_active: true,
    };

    if (filters?.category_id) {
        conditions.category_id = filters.category_id;
    }

    if (filters?.difficulty && filters.difficulty.length > 0) {
        conditions.difficulty = { in: filters.difficulty };
    }

    return {
        table: 'experiences',
        count: 'exact',
        filters: conditions,
    };
}

/**
 * Check if tour is suitable for age group
 */
export function isTourSuitableForAge(
    minAge: number | null,
    maxAge: number | null,
    age: number
): boolean {
    if (minAge !== null && age < minAge) return false;
    if (maxAge !== null && age > maxAge) return false;
    return true;
}


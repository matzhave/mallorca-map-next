// Mallorca Map - Event Queries

import type {
    Event,
    EventWithCategory,
    EventFilters,
    SearchResult,
    Locale,
} from '../types';
import { PAGINATION } from '../constants';

/**
 * Get event by ID with localized content
 */
export function buildGetEventByIdQuery(id: string, locale: Locale) {
    return {
        table: 'events',
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
 * Get event by slug
 */
export function buildGetEventBySlugQuery(slug: string, locale: Locale) {
    const slugField = `slug_${locale}`;

    return {
        table: 'events',
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
 * Get events in date range with filters
 */
export function buildGetEventsInRangeQuery(
    fromDate: string,
    toDate: string,
    filters: EventFilters,
    locale: Locale
) {
    const {
        category_id,
        query,
        rating_min,
        latitude,
        longitude,
        radius,
        all_day,
        sort_by = 'start_date',
        sort_order = 'asc',
        limit = PAGINATION.DEFAULT_LIMIT,
        offset = PAGINATION.DEFAULT_OFFSET,
    } = filters;

    const conditions: Record<string, unknown> = {
        is_active: true,
        start_date: { gte: fromDate, lte: toDate },
    };

    if (category_id) {
        conditions.category_id = category_id;
    }

    if (rating_min) {
        conditions.rating = { gte: rating_min };
    }

    if (typeof all_day === 'boolean') {
        conditions.all_day = all_day;
    }

    let orderBy: Array<{ column: string; ascending: boolean }> = [];

    switch (sort_by) {
        case 'rating':
            orderBy = [{ column: 'rating', ascending: sort_order === 'asc' }];
            break;
        case 'price':
            orderBy = [{ column: 'price_from', ascending: sort_order === 'asc' }];
            break;
        default:
            orderBy = [
                { column: 'start_date', ascending: true },
                { column: 'start_time', ascending: true },
            ];
    }

    return {
        table: 'events',
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
 * Get upcoming events
 */
export function buildGetUpcomingEventsQuery(
    locale: Locale,
    limit: number = 20,
    categoryId?: string
) {
    const today = new Date().toISOString().split('T')[0];

    const conditions: Record<string, unknown> = {
        is_active: true,
        start_date: { gte: today },
    };

    if (categoryId) {
        conditions.category_id = categoryId;
    }

    return {
        table: 'events',
        select: `
      *,
      category:categories(*)
    `,
        filters: conditions,
        orderBy: [
            { column: 'start_date', ascending: true },
            { column: 'start_time', ascending: true },
            { column: 'featured', ascending: false },
        ],
        limit,
        locale,
    };
}

/**
 * Get featured events
 */
export function buildGetFeaturedEventsQuery(
    locale: Locale,
    limit: number = 6
) {
    const today = new Date().toISOString().split('T')[0];

    return {
        table: 'events',
        select: `
      *,
      category:categories(*)
    `,
        filters: {
            is_active: true,
            featured: true,
            start_date: { gte: today },
        },
        orderBy: [
            { column: 'start_date', ascending: true },
            { column: 'rating', ascending: false },
        ],
        limit,
        locale,
    };
}

/**
 * Get events by category
 */
export function buildGetEventsByCategoryQuery(
    categoryId: string,
    filters: EventFilters,
    locale: Locale
) {
    const {
        from_date,
        to_date,
        limit = PAGINATION.DEFAULT_LIMIT,
        offset = PAGINATION.DEFAULT_OFFSET,
    } = filters;

    const today = new Date().toISOString().split('T')[0];

    const conditions: Record<string, unknown> = {
        category_id: categoryId,
        is_active: true,
    };

    if (from_date && to_date) {
        conditions.start_date = { gte: from_date, lte: to_date };
    } else {
        conditions.start_date = { gte: today };
    }

    return {
        table: 'events',
        select: `
      *,
      category:categories(*)
    `,
        filters: conditions,
        orderBy: [
            { column: 'start_date', ascending: true },
            { column: 'featured', ascending: false },
        ],
        limit,
        offset,
        locale,
    };
}

/**
 * Search events
 */
export function buildSearchEventsQuery(
    searchQuery: string,
    filters: EventFilters,
    locale: Locale
) {
    const {
        category_id,
        from_date,
        to_date,
        limit = PAGINATION.DEFAULT_LIMIT,
        offset = PAGINATION.DEFAULT_OFFSET,
    } = filters;

    const today = new Date().toISOString().split('T')[0];

    const conditions: Record<string, unknown> = {
        is_active: true,
        start_date: { gte: from_date || today },
    };

    if (to_date && typeof conditions.start_date === 'object') {
        conditions.start_date = { ...conditions.start_date as object, lte: to_date };
    }

    if (category_id) {
        conditions.category_id = category_id;
    }

    return {
        table: 'events',
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
    };
}

/**
 * Get events count
 */
export function buildGetEventsCountQuery(categoryId?: string) {
    const today = new Date().toISOString().split('T')[0];

    const filters: Record<string, unknown> = {
        is_active: true,
        start_date: { gte: today },
    };

    if (categoryId) {
        filters.category_id = categoryId;
    }

    return {
        table: 'events',
        count: 'exact',
        filters,
    };
}

/**
 * Check if event is happening today
 */
export function isEventToday(event: Event): boolean {
    if (!event.start_date) return false;

    const today = new Date().toISOString().split('T')[0];
    return event.start_date === today;
}

/**
 * Check if event is upcoming (within next 7 days)
 */
export function isEventUpcoming(event: Event): boolean {
    if (!event.start_date) return false;

    const today = new Date();
    const eventDate = new Date(event.start_date);
    const diffDays = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    return diffDays >= 0 && diffDays <= 7;
}


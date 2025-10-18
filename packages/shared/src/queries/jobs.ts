// Mallorca Map - Job Queries

import type { Locale, SearchFilters } from '../types';
import { PAGINATION } from '../constants';

/**
 * Job-specific filters
 */
export interface JobFilters extends Partial<SearchFilters> {
  job_type?: string[]; // full-time, part-time, freelance, internship
  salary_min?: number;
  salary_max?: number;
  remote_possible?: boolean;
  experience_level?: string[]; // entry, mid, senior
  company?: string;
}

/**
 * Get job by ID
 */
export function buildGetJobByIdQuery(id: string, locale: Locale) {
  return {
    table: 'jobs',
    select: `
      *,
      category:categories(*),
      company:companies(*)
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
 * Get job by slug
 */
export function buildGetJobBySlugQuery(slug: string, locale: Locale) {
  const slugField = `slug_${locale}`;
  
  return {
    table: 'jobs',
    select: `
      *,
      category:categories(*),
      company:companies(*)
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
 * Get all active jobs with filters
 */
export function buildGetJobsQuery(
  filters: JobFilters,
  locale: Locale
) {
  const {
    query,
    category_id,
    job_type,
    salary_min,
    salary_max,
    remote_possible,
    experience_level,
    company,
    latitude,
    longitude,
    radius,
    sort_by = 'created_at',
    sort_order = 'desc',
    limit = PAGINATION.DEFAULT_LIMIT,
    offset = PAGINATION.DEFAULT_OFFSET,
  } = filters;

  const conditions: Record<string, unknown> = {
    is_active: true,
    expires_at: { gte: new Date().toISOString() },
  };

  if (category_id) {
    conditions.category_id = category_id;
  }

  if (job_type && job_type.length > 0) {
    conditions.job_type = { in: job_type };
  }

  if (salary_min !== undefined) {
    conditions.salary_from = { gte: salary_min };
  }

  if (salary_max !== undefined) {
    conditions.salary_to = { lte: salary_max };
  }

  if (typeof remote_possible === 'boolean') {
    conditions.remote_possible = remote_possible;
  }

  if (experience_level && experience_level.length > 0) {
    conditions.experience_level = { in: experience_level };
  }

  if (company) {
    conditions.company = company;
  }

  let orderBy: Array<{ column: string; ascending: boolean }> = [];
  
  switch (sort_by) {
    case 'salary':
      orderBy = [{ column: 'salary_from', ascending: sort_order === 'asc' }];
      break;
    case 'title':
      orderBy = [{ column: 'title', ascending: sort_order === 'asc' }];
      break;
    default:
      // Default: newest first, featured at top
      orderBy = [
        { column: 'is_featured', ascending: false },
        { column: 'created_at', ascending: false },
      ];
  }

  return {
    table: 'jobs',
    select: `
      *,
      category:categories(*),
      company:companies(*)
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
 * Search jobs
 */
export function buildSearchJobsQuery(
  searchQuery: string,
  filters: JobFilters,
  locale: Locale
) {
  const {
    category_id,
    job_type,
    remote_possible,
    limit = PAGINATION.DEFAULT_LIMIT,
    offset = PAGINATION.DEFAULT_OFFSET,
  } = filters;

  const conditions: Record<string, unknown> = {
    is_active: true,
    expires_at: { gte: new Date().toISOString() },
  };

  if (category_id) {
    conditions.category_id = category_id;
  }

  if (job_type && job_type.length > 0) {
    conditions.job_type = { in: job_type };
  }

  if (typeof remote_possible === 'boolean') {
    conditions.remote_possible = remote_possible;
  }

  return {
    table: 'jobs',
    select: `
      *,
      category:categories(*),
      company:companies(*)
    `,
    filters: conditions,
    search: {
      query: searchQuery,
      fields: ['title', 'description', 'company_name', 'location'],
    },
    orderBy: [
      { column: 'is_featured', ascending: false },
      { column: 'created_at', ascending: false },
    ],
    limit,
    offset,
    locale,
  };
}

/**
 * Get featured jobs
 */
export function buildGetFeaturedJobsQuery(
  locale: Locale,
  limit: number = 6
) {
  return {
    table: 'jobs',
    select: `
      *,
      category:categories(*),
      company:companies(*)
    `,
    filters: {
      is_active: true,
      is_featured: true,
      expires_at: { gte: new Date().toISOString() },
    },
    orderBy: [
      { column: 'created_at', ascending: false },
    ],
    limit,
    locale,
  };
}

/**
 * Get jobs by company
 */
export function buildGetJobsByCompanyQuery(
  companyId: string,
  locale: Locale,
  limit: number = 20
) {
  return {
    table: 'jobs',
    select: `
      *,
      category:categories(*)
    `,
    filters: {
      company_id: companyId,
      is_active: true,
      expires_at: { gte: new Date().toISOString() },
    },
    orderBy: [
      { column: 'created_at', ascending: false },
    ],
    limit,
    locale,
  };
}

/**
 * Get jobs count
 */
export function buildGetJobsCountQuery(filters?: Partial<JobFilters>) {
  const conditions: Record<string, unknown> = {
    is_active: true,
    expires_at: { gte: new Date().toISOString() },
  };

  if (filters?.category_id) {
    conditions.category_id = filters.category_id;
  }

  if (filters?.job_type && filters.job_type.length > 0) {
    conditions.job_type = { in: filters.job_type };
  }

  return {
    table: 'jobs',
    count: 'exact',
    filters: conditions,
  };
}

/**
 * Check if job is expiring soon (within 7 days)
 */
export function isJobExpiringSoon(expiresAt: string): boolean {
  const expiryDate = new Date(expiresAt);
  const now = new Date();
  const diffDays = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  return diffDays >= 0 && diffDays <= 7;
}

/**
 * Check if job has expired
 */
export function isJobExpired(expiresAt: string): boolean {
  return new Date(expiresAt) < new Date();
}


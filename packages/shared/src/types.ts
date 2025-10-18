// Mallorca Map - Shared Types
// Auto-generated from Supabase schema + custom types

import { Database } from '@repo/supabase';

// ============================================================================
// Database Types (from Supabase)
// ============================================================================

export type Place = Database['public']['Tables']['places']['Row'];
export type PlaceInsert = Database['public']['Tables']['places']['Insert'];
export type PlaceUpdate = Database['public']['Tables']['places']['Update'];

export type Event = Database['public']['Tables']['events']['Row'];
export type EventInsert = Database['public']['Tables']['events']['Insert'];
export type EventUpdate = Database['public']['Tables']['events']['Update'];

export type Experience = Database['public']['Tables']['experiences']['Row'];
export type ExperienceInsert = Database['public']['Tables']['experiences']['Insert'];
export type ExperienceUpdate = Database['public']['Tables']['experiences']['Update'];

export type Category = Database['public']['Tables']['categories']['Row'];
export type CategoryInsert = Database['public']['Tables']['categories']['Insert'];
export type CategoryUpdate = Database['public']['Tables']['categories']['Update'];

export type BusinessProfile = Database['public']['Tables']['business_profiles']['Row'];
export type BusinessProfileInsert = Database['public']['Tables']['business_profiles']['Insert'];
export type BusinessProfileUpdate = Database['public']['Tables']['business_profiles']['Update'];

export type BusinessClaim = Database['public']['Tables']['business_claims']['Row'];
export type BusinessClaimInsert = Database['public']['Tables']['business_claims']['Insert'];
export type BusinessClaimUpdate = Database['public']['Tables']['business_claims']['Update'];

export type BusinessSubscription = Database['public']['Tables']['business_subscriptions']['Row'];
export type BusinessSubscriptionInsert = Database['public']['Tables']['business_subscriptions']['Insert'];
export type BusinessSubscriptionUpdate = Database['public']['Tables']['business_subscriptions']['Update'];

export type BusinessPlan = Database['public']['Tables']['business_plans']['Row'];
export type BusinessPlanInsert = Database['public']['Tables']['business_plans']['Insert'];
export type BusinessPlanUpdate = Database['public']['Tables']['business_plans']['Update'];

export type BusinessAddon = Database['public']['Tables']['business_addons']['Row'];
export type BusinessAddonInsert = Database['public']['Tables']['business_addons']['Insert'];
export type BusinessAddonUpdate = Database['public']['Tables']['business_addons']['Update'];

export type UserReview = Database['public']['Tables']['user_reviews']['Row'];
export type UserReviewInsert = Database['public']['Tables']['user_reviews']['Insert'];
export type UserReviewUpdate = Database['public']['Tables']['user_reviews']['Update'];

// Note: AI Providers and Email Templates will be added in future migrations
// export type AIProvider = Database['public']['Tables']['ai_providers']['Row'];
// export type EmailTemplate = Database['public']['Tables']['email_templates']['Row'];

// ============================================================================
// Custom Extended Types
// ============================================================================

export interface PlaceWithCategory extends Place {
    category?: Category;
    tags?: PlaceTag[];
    distance?: number; // in meters, calculated dynamically
}

export interface EventWithCategory extends Event {
    category?: Category;
    distance?: number;
}

export interface ExperienceWithCategory extends Experience {
    category?: Category;
    distance?: number;
}

// ============================================================================
// OpeningHours Types
// ============================================================================

export interface OpeningHoursDay {
    open: string; // HH:mm format
    close: string; // HH:mm format
    closed: boolean;
}

export interface OpeningHours {
    monday: OpeningHoursDay;
    tuesday: OpeningHoursDay;
    wednesday: OpeningHoursDay;
    thursday: OpeningHoursDay;
    friday: OpeningHoursDay;
    saturday: OpeningHoursDay;
    sunday: OpeningHoursDay;
    special_dates?: Record<string, OpeningHoursDay>; // ISO date string as key
    public_holidays_closed?: boolean;
}

export interface OpeningHoursStatus {
    is_open: boolean;
    next_change: Date | null;
    next_change_status: 'opens' | 'closes' | null;
}

// ============================================================================
// Search & Filter Types
// ============================================================================

export interface SearchFilters {
    query?: string;
    category_id?: string;
    subcategory_ids?: string[];
    open_now?: boolean;
    rating_min?: number;
    price_level?: number[];
    cuisine_type?: string[];
    latitude?: number;
    longitude?: number;
    radius?: number; // in meters
    sort_by?: 'relevance' | 'rating' | 'distance' | 'price' | 'name' | 'created_at' | 'title' | 'salary' | 'duration';
    sort_order?: 'asc' | 'desc';
    limit?: number;
    offset?: number;
}

export interface EventFilters extends Omit<SearchFilters, 'open_now'> {
    from_date?: string; // ISO date
    to_date?: string; // ISO date
    all_day?: boolean;
}

export interface SearchResult<T> {
    items: T[];
    total: number;
    has_more: boolean;
    page: number;
}

// ============================================================================
// Coordinates & Geo Types
// ============================================================================

export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface Bounds {
    northeast: Coordinates;
    southwest: Coordinates;
}

export interface PlaceTag {
    id: string;
    slug: string;
    label_de: string;
    label_en: string;
    label_es: string;
    tag_kind: string;
    icon?: string;
    color?: string;
}

// ============================================================================
// Business Claim Flow Types
// ============================================================================

export interface ClaimStep1Data {
    place_id: string;
    name: string;
    address: string;
    phone: string;
    website: string;
    description: string;
}

export interface ClaimStep2Data {
    opening_hours: OpeningHours;
}

export interface ClaimStep3Data {
    images: File[];
    videos: File[];
}

export interface ClaimStep4Data {
    business_license_file: File;
    proof_photo_file: File;
}

export interface ClaimStep5Data {
    plan_key: 'starter' | 'pro' | 'business';
    billing_interval: 'monthly' | 'annual';
}

export interface ClaimPayload {
    step1: ClaimStep1Data;
    step2: ClaimStep2Data;
    step3: ClaimStep3Data;
    step4: ClaimStep4Data;
    step5: ClaimStep5Data;
}

// ============================================================================
// Localization Types
// ============================================================================

export type Locale = 'de' | 'en' | 'es';

export interface LocalizedString {
    de: string;
    en: string;
    es: string;
}

export interface LocalizedContent {
    title: LocalizedString;
    description: LocalizedString;
    slug: LocalizedString;
}

// ============================================================================
// API Response Types
// ============================================================================

export interface ApiResponse<T = unknown> {
    data: T | null;
    error: ApiError | null;
    metadata?: {
        page?: number;
        per_page?: number;
        total?: number;
        has_more?: boolean;
    };
}

export interface ApiError {
    code: string;
    message: string;
    details?: Record<string, unknown>;
}

// ============================================================================
// Platform Stats Types
// ============================================================================

export interface PlatformStats {
    total_entries: number;
    total_reviews: number;
    total_places: number;
    total_events: number;
    total_experiences: number;
    total_business_users: number;
    computed_at: string;
}

// ============================================================================
// Image & Media Types
// ============================================================================

export interface ImageMetadata {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
    title?: string;
    phash?: string;
    storage_path?: string;
}

export interface VideoMetadata {
    url: string;
    thumbnail_url?: string;
    duration_seconds?: number;
    mime_type?: string;
    storage_path?: string;
}

// ============================================================================
// Scraping & Import Types
// ============================================================================

export interface ScraperConfig {
    parser_type: 'html' | 'json' | 'xml' | 'ai';
    selectors?: Record<string, string>;
    ai_extraction_prompt?: string;
}

export interface ImportPreview {
    items: Array<{
        title?: string;
        description?: string;
        start_date?: string;
        end_date?: string;
        location_name?: string;
        location_address?: string;
        price?: string;
        currency?: string;
        image_url?: string;
        [key: string]: unknown;
    }>;
    suggested_selectors?: Record<string, string>;
    confidence_score?: number;
}

// ============================================================================
// Notification Types
// ============================================================================

export interface NotificationPreferences {
    email_marketing: boolean;
    email_updates: boolean;
    push_nearby_events: boolean;
    push_favorite_updates: boolean;
}

// ============================================================================
// User Profile Types (für Community Features)
// ============================================================================

export interface UserProfile {
    id: string;
    display_name?: string;
    avatar_url?: string;
    bio?: string;
    favorite_places: string[];
    visited_places: string[];
    reviews_count: number;
    photos_count: number;
    points: number;
    badges: string[];
    created_at: string;
}

// ============================================================================
// Validation Result Types
// ============================================================================

export interface ValidationResult {
    valid: boolean;
    errors: string[];
}


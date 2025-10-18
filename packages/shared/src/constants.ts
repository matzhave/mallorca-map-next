// Mallorca Map - Shared Constants

import type { Locale } from './types';

// ============================================================================
// Localization
// ============================================================================

export const SUPPORTED_LOCALES: readonly Locale[] = ['de', 'en', 'es'] as const;
export const DEFAULT_LOCALE: Locale = 'de';

export const LOCALE_NAMES: Record<Locale, string> = {
  de: 'Deutsch',
  en: 'English',
  es: 'Español',
};

export const LOCALE_FLAGS: Record<Locale, string> = {
  de: '🇩🇪',
  en: '🇬🇧',
  es: '🇪🇸',
};

// ============================================================================
// Categories (with lucide-react icon names)
// ============================================================================

export const CATEGORIES = {
  TOURS: {
    key: 'tours',
    icon: 'Compass',
    slug: {
      de: 'touren-erlebnisse',
      en: 'tours-experiences',
      es: 'tours-experiencias',
    },
    name: {
      de: 'Touren & Erlebnisse',
      en: 'Tours & Experiences',
      es: 'Tours & Experiencias',
    },
  },
  EVENTS: {
    key: 'events',
    icon: 'Calendar',
    slug: {
      de: 'events-partys',
      en: 'events-parties',
      es: 'eventos-fiestas',
    },
    name: {
      de: 'Events & Partys',
      en: 'Events & Parties',
      es: 'Eventos & Fiestas',
    },
  },
  FOOD: {
    key: 'food',
    icon: 'UtensilsCrossed',
    slug: {
      de: 'essen-trinken',
      en: 'food-drink',
      es: 'comida-bebida',
    },
    name: {
      de: 'Essen & Trinken',
      en: 'Food & Drink',
      es: 'Comida & Bebida',
    },
  },
  SIGHTS: {
    key: 'sights',
    icon: 'Landmark',
    slug: {
      de: 'sehenswuerdigkeiten',
      en: 'sights',
      es: 'lugares-interes',
    },
    name: {
      de: 'Sehenswürdigkeiten',
      en: 'Sights',
      es: 'Lugares de Interés',
    },
  },
  SERVICES: {
    key: 'services',
    icon: 'Wrench',
    slug: {
      de: 'dienstleistungen',
      en: 'services',
      es: 'servicios',
    },
    name: {
      de: 'Dienstleistungen',
      en: 'Services',
      es: 'Servicios',
    },
  },
  PLACES: {
    key: 'places',
    icon: 'MapPin',
    slug: {
      de: 'orte',
      en: 'places',
      es: 'lugares',
    },
    name: {
      de: 'Orte',
      en: 'Places',
      es: 'Lugares',
    },
  },
  JOBS: {
    key: 'jobs',
    icon: 'Briefcase',
    slug: {
      de: 'jobs',
      en: 'jobs',
      es: 'trabajos',
    },
    name: {
      de: 'Jobs',
      en: 'Jobs',
      es: 'Trabajos',
    },
  },
  COMMUNITY: {
    key: 'community',
    icon: 'Users',
    slug: {
      de: 'community',
      en: 'community',
      es: 'comunidad',
    },
    name: {
      de: 'Community',
      en: 'Community',
      es: 'Comunidad',
    },
  },
  CLASSIFIEDS: {
    key: 'classifieds',
    icon: 'ShoppingBag',
    slug: {
      de: 'kleinanzeigen',
      en: 'classifieds',
      es: 'anuncios',
    },
    name: {
      de: 'Kleinanzeigen',
      en: 'Classifieds',
      es: 'Anuncios',
    },
  },
  NEWS: {
    key: 'news',
    icon: 'Newspaper',
    slug: {
      de: 'nachrichten',
      en: 'news',
      es: 'noticias',
    },
    name: {
      de: 'Nachrichten',
      en: 'News',
      es: 'Noticias',
    },
  },
} as const;

// ============================================================================
// Business Plans
// ============================================================================

export const BUSINESS_PLANS = {
  STARTER: {
    key: 'starter',
    name: 'Starter',
    monthly_price_cents: 4700, // 47€
    annual_price_cents: 47000, // 470€ (2 Monate gratis)
    sort_order: 1,
  },
  PRO: {
    key: 'pro',
    name: 'Pro',
    monthly_price_cents: 11700, // 117€
    annual_price_cents: 117000, // 1170€ (2 Monate gratis)
    sort_order: 2,
    recommended: true,
  },
  BUSINESS: {
    key: 'business',
    name: 'Business',
    monthly_price_cents: 29700, // 297€
    annual_price_cents: 297000, // 2970€ (2 Monate gratis)
    sort_order: 3,
  },
} as const;

export const CLAIM_FEE_CENTS = 1900; // 19€

// ============================================================================
// Business Features (für Pakete-Matrix)
// ============================================================================

export const BUSINESS_FEATURES = [
  { key: 'edit_content', label: { de: 'Texte, Bilder und Details bearbeiten', en: 'Edit texts, images and details', es: 'Editar textos, imágenes y detalles' } },
  { key: 'remove_similar', label: { de: 'Ähnliche Einträge entfernen', en: 'Remove similar entries', es: 'Eliminar entradas similares' } },
  { key: 'standard_page', label: { de: 'Standard-Landingpage', en: 'Standard landing page', es: 'Página de destino estándar' } },
  { key: 'category_visibility', label: { de: 'Sichtbarkeit in der Kategorie', en: 'Visibility in category', es: 'Visibilidad en categoría' } },
  { key: 'ad_free', label: { de: 'Werbefreier Eintrag', en: 'Ad-free entry', es: 'Entrada sin publicidad' } },
  { key: 'create_events', label: { de: 'Angebote & Events erstellen', en: 'Create offers & events', es: 'Crear ofertas y eventos' } },
  { key: 'enhanced_similar_visibility', label: { de: 'Erhöhte Sichtbarkeit in "Ähnliche Anbieter"', en: 'Enhanced visibility in "Similar providers"', es: 'Mayor visibilidad en "Proveedores similares"' } },
  { key: 'enhanced_search_ranking', label: { de: 'Erhöhte Platzierung in Suchergebnissen', en: 'Enhanced search ranking', es: 'Mayor posicionamiento en búsqueda' } },
  { key: 'seo_page_designer', label: { de: 'SEO-optimierte Landingpage mit Page Designer', en: 'SEO-optimized landing page with page designer', es: 'Página SEO con diseñador' } },
  { key: 'lead_generation', label: { de: 'Leadgenerierung auf der Landingpage', en: 'Lead generation on landing page', es: 'Generación de leads' } },
  { key: 'website_builder', label: { de: 'Drag-and-Drop Website-Baukasten', en: 'Drag-and-drop website builder', es: 'Constructor web drag-and-drop' } },
  { key: 'homepage_ad', label: { de: 'Rotierende Startseitenanzeige als Business-Partner', en: 'Rotating homepage ad as business partner', es: 'Anuncio rotativo en página principal' } },
  { key: 'review_dispute', label: { de: 'Einspruchsmöglichkeit bei Bewertungen', en: 'Review dispute option', es: 'Opción de disputa de reseñas' } },
  { key: 'max_visibility', label: { de: 'Maximale Sichtbarkeit in allen Bereichen', en: 'Maximum visibility in all areas', es: 'Máxima visibilidad en todas las áreas' } },
] as const;

// Plan Feature Matrix
export const PLAN_FEATURES: Record<string, string[]> = {
  starter: ['edit_content', 'remove_similar', 'standard_page', 'category_visibility'],
  pro: ['edit_content', 'remove_similar', 'standard_page', 'category_visibility', 'ad_free', 'create_events', 'enhanced_similar_visibility', 'enhanced_search_ranking'],
  business: ['edit_content', 'remove_similar', 'standard_page', 'category_visibility', 'ad_free', 'create_events', 'enhanced_similar_visibility', 'enhanced_search_ranking', 'seo_page_designer', 'lead_generation', 'website_builder', 'homepage_ad', 'review_dispute', 'max_visibility'],
};

// ============================================================================
// Business Addons
// ============================================================================

export const BUSINESS_ADDONS = {
  JOB_TOP_PIN_7D: {
    key: 'job_top_pin_7d',
    type: 'one_time' as const,
    duration_days: 7,
    price_cents: 1900, // 19€
    name: { de: 'Job 7 Tage fixieren', en: 'Pin job for 7 days', es: 'Fijar trabajo 7 días' },
  },
  CLASSIFIED_HIGHLIGHT_3D: {
    key: 'classified_highlight_3d',
    type: 'one_time' as const,
    duration_days: 3,
    price_cents: 900, // 9€
    name: { de: 'Kleinanzeige 3 Tage highlighten', en: 'Highlight classified for 3 days', es: 'Destacar anuncio 3 días' },
  },
  EVENT_FEATURED_7D: {
    key: 'event_featured_7d',
    type: 'one_time' as const,
    duration_days: 7,
    price_cents: 2900, // 29€
    name: { de: 'Event 7 Tage featured', en: 'Feature event for 7 days', es: 'Destacar evento 7 días' },
  },
} as const;

// ============================================================================
// Price Levels
// ============================================================================

export const PRICE_LEVELS = {
  1: { symbol: '€', label: { de: 'Günstig', en: 'Budget', es: 'Económico' } },
  2: { symbol: '€€', label: { de: 'Moderat', en: 'Moderate', es: 'Moderado' } },
  3: { symbol: '€€€', label: { de: 'Gehoben', en: 'Upscale', es: 'Elevado' } },
  4: { symbol: '€€€€', label: { de: 'Luxus', en: 'Luxury', es: 'Lujo' } },
} as const;

// ============================================================================
// Rating Levels
// ============================================================================

export const RATING_LEVELS = [
  { value: 4.5, label: { de: '4,5+ Sterne', en: '4.5+ stars', es: '4,5+ estrellas' } },
  { value: 4.0, label: { de: '4+ Sterne', en: '4+ stars', es: '4+ estrellas' } },
  { value: 3.5, label: { de: '3,5+ Sterne', en: '3.5+ stars', es: '3,5+ estrellas' } },
  { value: 3.0, label: { de: '3+ Sterne', en: '3+ stars', es: '3+ estrellas' } },
] as const;

// ============================================================================
// Cuisine Types (for Food category)
// ============================================================================

export const CUISINE_TYPES = [
  { key: 'italian', label: { de: 'Italienisch', en: 'Italian', es: 'Italiana' } },
  { key: 'spanish', label: { de: 'Spanisch', en: 'Spanish', es: 'Española' } },
  { key: 'mediterranean', label: { de: 'Mediterran', en: 'Mediterranean', es: 'Mediterránea' } },
  { key: 'asian', label: { de: 'Asiatisch', en: 'Asian', es: 'Asiática' } },
  { key: 'german', label: { de: 'Deutsch', en: 'German', es: 'Alemana' } },
  { key: 'french', label: { de: 'Französisch', en: 'French', es: 'Francesa' } },
  { key: 'mexican', label: { de: 'Mexikanisch', en: 'Mexican', es: 'Mexicana' } },
  { key: 'japanese', label: { de: 'Japanisch', en: 'Japanese', es: 'Japonesa' } },
  { key: 'indian', label: { de: 'Indisch', en: 'Indian', es: 'India' } },
  { key: 'vegetarian', label: { de: 'Vegetarisch', en: 'Vegetarian', es: 'Vegetariana' } },
  { key: 'vegan', label: { de: 'Vegan', en: 'Vegan', es: 'Vegana' } },
  { key: 'seafood', label: { de: 'Meeresfrüchte', en: 'Seafood', es: 'Mariscos' } },
  { key: 'steakhouse', label: { de: 'Steakhouse', en: 'Steakhouse', es: 'Asador' } },
  { key: 'cafe', label: { de: 'Café', en: 'Cafe', es: 'Cafetería' } },
  { key: 'bakery', label: { de: 'Bäckerei', en: 'Bakery', es: 'Panadería' } },
] as const;

// ============================================================================
// Currency
// ============================================================================

export const DEFAULT_CURRENCY = 'EUR';
export const CURRENCY_SYMBOL: Record<string, string> = {
  EUR: '€',
  USD: '$',
  GBP: '£',
};

// ============================================================================
// Distance Units
// ============================================================================

export const DISTANCE_UNITS = {
  METRIC: 'metric' as const,
  IMPERIAL: 'imperial' as const,
};

export const DISTANCE_RANGES = [
  { value: 1000, label: { de: '1 km', en: '1 km', es: '1 km' } },
  { value: 2500, label: { de: '2,5 km', en: '2.5 km', es: '2,5 km' } },
  { value: 5000, label: { de: '5 km', en: '5 km', es: '5 km' } },
  { value: 10000, label: { de: '10 km', en: '10 km', es: '10 km' } },
  { value: 25000, label: { de: '25 km', en: '25 km', es: '25 km' } },
] as const;

// ============================================================================
// Mallorca Coordinates (Center)
// ============================================================================

export const MALLORCA_CENTER = {
  latitude: 39.6953,
  longitude: 3.0176,
};

export const MALLORCA_BOUNDS = {
  northeast: { latitude: 39.9626, longitude: 3.4788 },
  southwest: { latitude: 39.2613, longitude: 2.3088 },
};

// ============================================================================
// Image Upload Limits
// ============================================================================

export const IMAGE_UPLOAD_LIMITS = {
  MAX_SIZE_BYTES: 50 * 1024 * 1024, // 50MB
  MAX_COUNT_STARTER: 5,
  MAX_COUNT_PRO: 20,
  MAX_COUNT_BUSINESS: -1, // unlimited
  ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic'],
};

export const VIDEO_UPLOAD_LIMITS = {
  MAX_SIZE_BYTES: 250 * 1024 * 1024, // 250MB
  MAX_COUNT_STARTER: 0,
  MAX_COUNT_PRO: 3,
  MAX_COUNT_BUSINESS: -1, // unlimited
  ALLOWED_TYPES: ['video/mp4', 'video/quicktime', 'video/webm'],
};

// ============================================================================
// Email Template Keys
// ============================================================================

export const EMAIL_TEMPLATES = {
  WELCOME: 'welcome',
  EMAIL_VERIFICATION: 'email_verification',
  PASSWORD_RESET: 'password_reset',
  CLAIM_EMAIL_VERIFICATION: 'claim_email_verification',
  CLAIM_APPROVED: 'claim_approved',
  CLAIM_REJECTED: 'claim_rejected',
  SUBSCRIPTION_CONFIRMED: 'subscription_confirmed',
  SUBSCRIPTION_CANCELLED: 'subscription_cancelled',
  SUBSCRIPTION_EXPIRING_SOON: 'subscription_expiring_soon',
  REVIEW_VERIFICATION: 'review_verification',
  REVIEW_APPROVED: 'review_approved',
  REVIEW_RESPONSE: 'review_response',
} as const;

// ============================================================================
// AI Task Keys
// ============================================================================

export const AI_TASKS = {
  DESCRIPTION_REWRITE_DE: 'description_rewrite_de',
  DESCRIPTION_REWRITE_EN: 'description_rewrite_en',
  DESCRIPTION_REWRITE_ES: 'description_rewrite_es',
  EVENT_EXTRACTION: 'event_extraction',
  CATEGORY_SUGGESTION: 'category_suggestion',
  SCRAPER_SELECTOR_GENERATION: 'scraper_selector_generation',
  IMAGE_MODERATION: 'image_moderation',
  REVIEW_SENTIMENT_ANALYSIS: 'review_sentiment_analysis',
  REVIEW_SPAM_DETECTION: 'review_spam_detection',
} as const;

// ============================================================================
// Pagination
// ============================================================================

export const PAGINATION = {
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
  DEFAULT_OFFSET: 0,
};

// ============================================================================
// Cache TTL (in seconds)
// ============================================================================

export const CACHE_TTL = {
  PLATFORM_STATS: 3600, // 1 hour
  CATEGORIES: 86400, // 24 hours
  PLACE_DETAIL: 300, // 5 minutes
  SEARCH_RESULTS: 60, // 1 minute
  OPENING_HOURS_CHECK: 60, // 1 minute
};

// ============================================================================
// Rate Limits
// ============================================================================

export const RATE_LIMITS = {
  API_GENERAL: { requests: 100, window: 60 }, // 100 req/min
  API_SEARCH: { requests: 30, window: 60 }, // 30 req/min
  API_SCRAPER: { requests: 10, window: 3600 }, // 10 req/hour
  REVIEW_SUBMIT: { requests: 5, window: 86400 }, // 5 per day
};

// ============================================================================
// External URLs
// ============================================================================

export const EXTERNAL_URLS = {
  VIATOR_AFFILIATE: 'https://www.viator.com',
  GETYOURGUIDE_AFFILIATE: 'https://www.getyourguide.com',
  OPENTABLE: 'https://www.opentable.com',
  GOOGLE_MAPS_BASE: 'https://www.google.com/maps',
};

// ============================================================================
// Social Media
// ============================================================================

export const SOCIAL_MEDIA = {
  FACEBOOK: 'https://facebook.com/mallorcamap',
  INSTAGRAM: 'https://instagram.com/mallorcamap',
  TWITTER: 'https://twitter.com/mallorcamap',
  YOUTUBE: 'https://youtube.com/@mallorcamap',
};

// ============================================================================
// Contact
// ============================================================================

export const CONTACT = {
  EMAIL: 'info@mallorca-map.com',
  SUPPORT_EMAIL: 'support@mallorca-map.com',
  BUSINESS_EMAIL: 'business@mallorca-map.com',
};


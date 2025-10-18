-- ============================================================================
-- Mallorca Map - Initial Database Schema
-- Version: 1.0.0
-- Created: 2024
-- Description: Complete schema for all 10 categories with performance optimization
-- ============================================================================

-- ============================================================================
-- CORE TABLES
-- Extensions are enabled in 00000_enable_extensions.sql
-- ============================================================================

-- Categories (Hierarchical)
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  
  -- Multilingual
  slug varchar(100) NOT NULL UNIQUE,
  slug_de varchar(100) NOT NULL,
  slug_en varchar(100) NOT NULL,
  slug_es varchar(100) NOT NULL,
  name_de varchar(255) NOT NULL,
  name_en varchar(255) NOT NULL,
  name_es varchar(255) NOT NULL,
  description_de text,
  description_en text,
  description_es text,
  
  -- Display
  icon varchar(50), -- lucide-react icon name
  color varchar(7), -- hex color
  sort_order integer DEFAULT 0,
  
  -- Status
  is_active boolean DEFAULT true,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes for categories
CREATE INDEX idx_categories_parent_id ON categories(parent_id);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_active ON categories(is_active) WHERE is_active = true;
CREATE INDEX idx_categories_sort ON categories(sort_order);

-- ============================================================================
-- PLACES (Restaurants, Locations, Services, Sights)
-- ============================================================================

CREATE TABLE places (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  
  -- Content (Multilingual)
  title varchar(255) NOT NULL,
  title_de varchar(255),
  title_en varchar(255),
  title_es varchar(255),
  description text,
  description_de text,
  description_en text,
  description_es text,
  slug_de varchar(150) UNIQUE,
  slug_en varchar(150) UNIQUE,
  slug_es varchar(150) UNIQUE,
  
  -- Location
  formatted_address text,
  street varchar(255),
  postal_code varchar(10),
  city varchar(100),
  region varchar(100),
  country varchar(2) DEFAULT 'ES',
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  coordinates geography(POINT, 4326), -- PostGIS for geo queries
  google_place_id varchar(255) UNIQUE,
  
  -- Contact
  phone varchar(50),
  email varchar(255),
  website varchar(500),
  
  -- Business Info
  cuisine_type varchar(100),
  price_level smallint CHECK (price_level BETWEEN 1 AND 4),
  opening_hours jsonb,
  
  -- Media (JSONB for imported, denormalized primary for performance)
  images jsonb DEFAULT '[]'::jsonb,
  primary_image_url varchar(500),
  
  -- Ratings (Denormalized for performance)
  rating decimal(3,2) CHECK (rating >= 0 AND rating <= 5),
  review_count integer DEFAULT 0,
  google_rating decimal(3,2),
  google_review_count integer DEFAULT 0,
  google_reviews jsonb DEFAULT '[]'::jsonb, -- Imported reviews as JSONB
  
  -- SEO
  meta_title_de varchar(60),
  meta_title_en varchar(60),
  meta_title_es varchar(60),
  meta_description_de varchar(160),
  meta_description_en varchar(160),
  meta_description_es varchar(160),
  
  -- Status
  is_active boolean DEFAULT true,
  is_featured boolean DEFAULT false,
  featured_until timestamptz,
  
  -- Analytics (Denormalized for performance)
  view_count integer DEFAULT 0,
  click_count integer DEFAULT 0,
  
  -- Import Info
  external_source varchar(50), -- 'google_places', 'manual'
  external_id varchar(255),
  last_synced_at timestamptz,
  
  -- Business Ownership
  claimed boolean DEFAULT false,
  claimed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  claimed_at timestamptz,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Performance Indexes for places
CREATE INDEX idx_places_category ON places(category_id);
CREATE INDEX idx_places_coordinates ON places USING GIST(coordinates);
CREATE INDEX idx_places_rating ON places(rating DESC NULLS LAST) WHERE is_active = true;
CREATE INDEX idx_places_featured ON places(is_featured, rating DESC) WHERE is_active = true AND is_featured = true;
CREATE INDEX idx_places_active ON places(is_active) WHERE is_active = true;
CREATE INDEX idx_places_google_place_id ON places(google_place_id) WHERE google_place_id IS NOT NULL;
CREATE INDEX idx_places_claimed ON places(claimed_by) WHERE claimed = true;
CREATE INDEX idx_places_city ON places(city) WHERE city IS NOT NULL;

-- Full-text search indexes (GIN for performance)
CREATE INDEX idx_places_fts_de ON places USING GIN(to_tsvector('german', coalesce(title_de, '') || ' ' || coalesce(description_de, '')));
CREATE INDEX idx_places_fts_en ON places USING GIN(to_tsvector('english', coalesce(title_en, '') || ' ' || coalesce(description_en, '')));
CREATE INDEX idx_places_fts_es ON places USING GIN(to_tsvector('spanish', coalesce(title_es, '') || ' ' || coalesce(description_es, '')));

-- Trigram index for fuzzy search
CREATE INDEX idx_places_title_trgm ON places USING GIN(title gin_trgm_ops);

-- ============================================================================
-- EVENTS
-- ============================================================================

CREATE TABLE events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  place_id uuid REFERENCES places(id) ON DELETE SET NULL,
  
  -- Content
  title varchar(255) NOT NULL,
  title_de varchar(255),
  title_en varchar(255),
  title_es varchar(255),
  description text,
  description_de text,
  description_en text,
  description_es text,
  slug_de varchar(150) UNIQUE,
  slug_en varchar(150) UNIQUE,
  slug_es varchar(150) UNIQUE,
  
  -- Event Details
  start_date date NOT NULL,
  start_time time,
  end_date date,
  end_time time,
  all_day boolean DEFAULT false,
  recurrence jsonb, -- For recurring events
  
  -- Location (if not linked to place)
  location_name varchar(255),
  location_address text,
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  coordinates geography(POINT, 4326),
  
  -- Pricing
  price_from decimal(10, 2),
  price_to decimal(10, 2),
  currency varchar(3) DEFAULT 'EUR',
  is_free boolean DEFAULT false,
  booking_url varchar(500),
  
  -- Media
  images jsonb DEFAULT '[]'::jsonb,
  primary_image_url varchar(500),
  
  -- Ratings
  rating decimal(3,2) CHECK (rating >= 0 AND rating <= 5),
  review_count integer DEFAULT 0,
  
  -- Status
  is_active boolean DEFAULT true,
  is_featured boolean DEFAULT false,
  
  -- Analytics
  view_count integer DEFAULT 0,
  click_count integer DEFAULT 0,
  
  -- Import
  external_source varchar(50),
  external_id varchar(255),
  
  -- Business
  created_by_business_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes for events
CREATE INDEX idx_events_category ON events(category_id);
CREATE INDEX idx_events_place ON events(place_id);
CREATE INDEX idx_events_dates ON events(start_date, start_time) WHERE is_active = true;
-- Removed CURRENT_DATE from predicate (not immutable) - filter in queries instead
CREATE INDEX idx_events_upcoming ON events(start_date ASC) WHERE is_active = true;
CREATE INDEX idx_events_coordinates ON events USING GIST(coordinates);
CREATE INDEX idx_events_featured ON events(is_featured, start_date) WHERE is_active = true AND is_featured = true;
CREATE INDEX idx_events_fts_de ON events USING GIN(to_tsvector('german', coalesce(title_de, '') || ' ' || coalesce(description_de, '')));

-- ============================================================================
-- EXPERIENCES (Tours)
-- ============================================================================

CREATE TABLE experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  
  -- Content
  title varchar(255) NOT NULL,
  title_de varchar(255),
  title_en varchar(255),
  title_es varchar(255),
  description text,
  description_de text,
  description_en text,
  description_es text,
  slug_de varchar(150) UNIQUE,
  slug_en varchar(150) UNIQUE,
  slug_es varchar(150) UNIQUE,
  
  -- Tour Details
  duration_hours decimal(4, 2),
  duration_text varchar(100),
  difficulty varchar(50), -- easy, moderate, hard
  max_group_size integer,
  min_age integer,
  max_age integer,
  
  -- Inclusions
  includes_guide boolean DEFAULT false,
  includes_transport boolean DEFAULT false,
  includes_meals boolean DEFAULT false,
  includes_equipment boolean DEFAULT false,
  suitable_for_children boolean DEFAULT false,
  wheelchair_accessible boolean DEFAULT false,
  
  -- Location
  departure_point text,
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  coordinates geography(POINT, 4326),
  
  -- Pricing
  price_from decimal(10, 2),
  currency varchar(3) DEFAULT 'EUR',
  booking_url varchar(500) NOT NULL,
  
  -- Media
  images jsonb DEFAULT '[]'::jsonb,
  primary_image_url varchar(500),
  
  -- Ratings
  rating decimal(3,2) CHECK (rating >= 0 AND rating <= 5),
  review_count integer DEFAULT 0,
  
  -- Provider
  provider varchar(50) NOT NULL, -- 'viator', 'getyourguide', 'manual'
  provider_product_code varchar(255),
  commission_rate decimal(4, 2), -- for affiliate
  
  -- Status
  is_active boolean DEFAULT true,
  is_featured boolean DEFAULT false,
  
  -- Analytics
  view_count integer DEFAULT 0,
  booking_count integer DEFAULT 0,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  UNIQUE(provider, provider_product_code)
);

-- Indexes for experiences
CREATE INDEX idx_experiences_category ON experiences(category_id);
CREATE INDEX idx_experiences_provider ON experiences(provider, provider_product_code);
CREATE INDEX idx_experiences_rating ON experiences(rating DESC NULLS LAST) WHERE is_active = true;
CREATE INDEX idx_experiences_coordinates ON experiences USING GIST(coordinates);
CREATE INDEX idx_experiences_difficulty ON experiences(difficulty) WHERE is_active = true;
CREATE INDEX idx_experiences_price ON experiences(price_from);
CREATE INDEX idx_experiences_fts_de ON experiences USING GIN(to_tsvector('german', coalesce(title_de, '') || ' ' || coalesce(description_de, '')));

-- ============================================================================
-- JOBS
-- ============================================================================

CREATE TABLE jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  
  -- Content
  title varchar(255) NOT NULL,
  description text NOT NULL,
  slug varchar(150) UNIQUE,
  
  -- Job Details
  job_type varchar(50) NOT NULL, -- full-time, part-time, freelance, internship
  experience_level varchar(50), -- entry, mid, senior
  employment_type varchar(50), -- permanent, temporary, contract
  remote_possible boolean DEFAULT false,
  
  -- Location
  location_name varchar(255),
  address text,
  postal_code varchar(10),
  city varchar(100),
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  coordinates geography(POINT, 4326),
  
  -- Salary
  salary_from decimal(10, 2),
  salary_to decimal(10, 2),
  salary_currency varchar(3) DEFAULT 'EUR',
  salary_period varchar(20), -- hourly, monthly, yearly
  salary_visible boolean DEFAULT true,
  
  -- Application
  application_url varchar(500),
  application_email varchar(255),
  
  -- Company (flexible: Business OR Text)
  company_name varchar(255) NOT NULL,
  company_logo_url varchar(500),
  company_website varchar(500),
  
  -- Status
  is_active boolean DEFAULT true,
  is_featured boolean DEFAULT false,
  featured_until timestamptz,
  expires_at timestamptz NOT NULL,
  
  -- Analytics
  view_count integer DEFAULT 0,
  application_count integer DEFAULT 0,
  
  -- Import
  external_source varchar(50), -- 'inselradio', 'mallorcajobs', 'manual'
  external_id varchar(255),
  
  -- Posted by (User OR Business)
  posted_by_user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  posted_by_business_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  CONSTRAINT check_posted_by CHECK (
    (posted_by_user_id IS NOT NULL AND posted_by_business_id IS NULL) OR
    (posted_by_user_id IS NULL AND posted_by_business_id IS NOT NULL)
  )
);

-- Indexes for jobs
CREATE INDEX idx_jobs_category ON jobs(category_id);
CREATE INDEX idx_jobs_type_level ON jobs(job_type, experience_level) WHERE is_active = true;
-- Note: Can't use now() in partial index (not immutable)
-- Filter in application layer instead
CREATE INDEX idx_jobs_expires ON jobs(expires_at DESC) WHERE is_active = true;
CREATE INDEX idx_jobs_featured ON jobs(is_featured, created_at DESC) WHERE is_active = true AND is_featured = true;
CREATE INDEX idx_jobs_city ON jobs(city) WHERE city IS NOT NULL;
CREATE INDEX idx_jobs_coordinates ON jobs USING GIST(coordinates);
CREATE INDEX idx_jobs_posted_by_user ON jobs(posted_by_user_id);
CREATE INDEX idx_jobs_posted_by_business ON jobs(posted_by_business_id);
CREATE INDEX idx_jobs_fts ON jobs USING GIN(to_tsvector('simple', title || ' ' || description || ' ' || company_name));

-- ============================================================================
-- CLASSIFIEDS (Kleinanzeigen)
-- ============================================================================

CREATE TABLE classifieds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Content
  title varchar(255) NOT NULL,
  description text NOT NULL,
  slug varchar(150) UNIQUE,
  
  -- Item Details
  condition varchar(50), -- new, like_new, good, fair, poor
  price decimal(10, 2) NOT NULL,
  currency varchar(3) DEFAULT 'EUR',
  is_negotiable boolean DEFAULT true,
  
  -- Location
  location_name varchar(255),
  postal_code varchar(10),
  city varchar(100),
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  coordinates geography(POINT, 4326),
  
  -- Media
  images jsonb DEFAULT '[]'::jsonb,
  primary_image_url varchar(500),
  
  -- Contact
  contact_name varchar(255),
  contact_phone varchar(50),
  contact_email varchar(255),
  show_phone boolean DEFAULT true,
  show_email boolean DEFAULT true,
  
  -- Status
  status varchar(50) DEFAULT 'active', -- active, sold, reserved, expired
  is_featured boolean DEFAULT false,
  featured_until timestamptz,
  expires_at timestamptz NOT NULL,
  
  -- Analytics
  view_count integer DEFAULT 0,
  contact_count integer DEFAULT 0,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes for classifieds
CREATE INDEX idx_classifieds_category ON classifieds(category_id);
CREATE INDEX idx_classifieds_user ON classifieds(user_id);
CREATE INDEX idx_classifieds_status ON classifieds(status, created_at DESC) WHERE status = 'active';
CREATE INDEX idx_classifieds_featured ON classifieds(is_featured, created_at DESC) WHERE is_featured = true AND status = 'active';
CREATE INDEX idx_classifieds_city ON classifieds(city);
CREATE INDEX idx_classifieds_coordinates ON classifieds USING GIST(coordinates);
CREATE INDEX idx_classifieds_price ON classifieds(price);
CREATE INDEX idx_classifieds_expires ON classifieds(expires_at);
CREATE INDEX idx_classifieds_fts ON classifieds USING GIN(to_tsvector('simple', title || ' ' || description));

-- ============================================================================
-- COMMUNITY
-- ============================================================================

CREATE TABLE community (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Content
  title varchar(255) NOT NULL,
  description text NOT NULL,
  slug varchar(150) UNIQUE,
  
  -- Community Details
  type varchar(50) NOT NULL, -- whatsapp_group, telegram_group, meetup, club, association
  member_count integer DEFAULT 0,
  is_private boolean DEFAULT false,
  language varchar(50), -- de, en, es, multilingual
  
  -- Links
  join_url varchar(500),
  website varchar(500),
  social_media jsonb DEFAULT '{}'::jsonb,
  
  -- Location (for meetups)
  location_name varchar(255),
  address text,
  city varchar(100),
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  coordinates geography(POINT, 4326),
  
  -- Schedule (for regular meetings)
  schedule jsonb,
  next_meeting_at timestamptz,
  
  -- Media
  logo_url varchar(500),
  cover_image_url varchar(500),
  images jsonb DEFAULT '[]'::jsonb,
  
  -- Status
  is_active boolean DEFAULT true,
  is_verified boolean DEFAULT false, -- Admin-verified
  
  -- Analytics
  view_count integer DEFAULT 0,
  join_click_count integer DEFAULT 0,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes for community
CREATE INDEX idx_community_category ON community(category_id);
CREATE INDEX idx_community_user ON community(user_id);
CREATE INDEX idx_community_type ON community(type) WHERE is_active = true;
CREATE INDEX idx_community_verified ON community(is_verified) WHERE is_verified = true;
CREATE INDEX idx_community_city ON community(city);
CREATE INDEX idx_community_coordinates ON community USING GIST(coordinates);
CREATE INDEX idx_community_next_meeting ON community(next_meeting_at);
CREATE INDEX idx_community_fts ON community USING GIN(to_tsvector('simple', title || ' ' || description));

-- ============================================================================
-- NEWS
-- ============================================================================

CREATE TABLE news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  
  -- Content
  title_de varchar(255) NOT NULL,
  title_en varchar(255),
  title_es varchar(255),
  summary_de text,
  summary_en text,
  summary_es text,
  content_de text,
  content_en text,
  content_es text,
  slug_de varchar(150) UNIQUE,
  slug_en varchar(150) UNIQUE,
  slug_es varchar(150) UNIQUE,
  
  -- Media
  featured_image_url varchar(500),
  images jsonb DEFAULT '[]'::jsonb,
  
  -- Meta
  author_name varchar(255),
  published_at timestamptz NOT NULL DEFAULT now(),
  
  -- Analytics
  view_count integer DEFAULT 0,
  share_count integer DEFAULT 0,
  
  -- Source
  source_name varchar(255), -- "Mallorca Zeitung", "Inselradio"
  source_url varchar(500),
  external_id varchar(255),
  
  -- Status
  is_active boolean DEFAULT true,
  is_featured boolean DEFAULT false,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes for news
CREATE INDEX idx_news_category ON news(category_id);
CREATE INDEX idx_news_published ON news(published_at DESC) WHERE is_active = true;
CREATE INDEX idx_news_featured ON news(is_featured, published_at DESC) WHERE is_active = true AND is_featured = true;
CREATE INDEX idx_news_source ON news(source_name, external_id);
CREATE INDEX idx_news_fts_de ON news USING GIN(to_tsvector('german', coalesce(title_de, '') || ' ' || coalesce(content_de, '')));
CREATE INDEX idx_news_fts_en ON news USING GIN(to_tsvector('english', coalesce(title_en, '') || ' ' || coalesce(content_en, '')));

-- Auto-update updated_at trigger for all tables
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_places_updated_at BEFORE UPDATE ON places FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_experiences_updated_at BEFORE UPDATE ON experiences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_classifieds_updated_at BEFORE UPDATE ON classifieds FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_community_updated_at BEFORE UPDATE ON community FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


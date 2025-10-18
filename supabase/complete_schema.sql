-- ============================================================================
-- Enable Required Extensions
-- Supabase Best Practice: Extensions go into 'extensions' schema by default
-- We need to make the functions/types available in 'public' schema
-- ============================================================================

-- Extensions should already be enabled via Dashboard
-- This ensures they're in the right schema
CREATE SCHEMA IF NOT EXISTS extensions;

-- Enable PostGIS (provides geography type and spatial functions)
CREATE EXTENSION IF NOT EXISTS postgis SCHEMA extensions;

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" SCHEMA extensions;

-- Enable trigram for fuzzy text search
CREATE EXTENSION IF NOT EXISTS pg_trgm SCHEMA extensions;

-- Enable unaccent for accent-insensitive search
CREATE EXTENSION IF NOT EXISTS unaccent SCHEMA extensions;

-- ============================================================================
-- Make extension functions available in public schema
-- This is the CORRECT way for Supabase
-- ============================================================================

-- Create public wrapper for uuid_generate_v4
CREATE OR REPLACE FUNCTION public.uuid_generate_v4()
RETURNS uuid
LANGUAGE SQL
IMMUTABLE
AS $$
  SELECT extensions.uuid_generate_v4();
$$;

-- Set search_path to find PostGIS functions
ALTER DATABASE postgres SET search_path TO public, extensions;

-- For current session
SET search_path TO public, extensions;
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
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
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
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
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
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
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
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
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
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
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
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
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
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
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
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
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

-- ============================================================================
-- Mallorca Map - Business & User Tables
-- Version: 1.0.0
-- Description: Business profiles, subscriptions, reviews, media, tags
-- ============================================================================

-- ============================================================================
-- BUSINESS TABLES
-- ============================================================================

-- Business Profiles
CREATE TABLE business_profiles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Company Info
  company_name varchar(255),
  contact_name varchar(255),
  first_name varchar(100),
  last_name varchar(100),
  email varchar(255) NOT NULL,
  phone varchar(50),
  
  -- Address
  address text,
  postal_code varchar(10),
  city varchar(100),
  country varchar(2) DEFAULT 'ES',
  
  -- Tax
  tax_id varchar(50), -- VAT number
  
  -- Stripe
  stripe_customer_id varchar(255) UNIQUE,
  
  -- Status
  status varchar(50) DEFAULT 'active', -- active, suspended, cancelled
  onboarding_completed_at timestamptz,
  
  -- Metadata
  metadata jsonb DEFAULT '{}'::jsonb,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_business_profiles_user ON business_profiles(user_id);
CREATE INDEX idx_business_profiles_stripe ON business_profiles(stripe_customer_id) WHERE stripe_customer_id IS NOT NULL;
CREATE INDEX idx_business_profiles_status ON business_profiles(status);

-- Business Plans
CREATE TABLE business_plans (
  plan_key varchar(50) PRIMARY KEY, -- starter, pro, business
  name varchar(100) NOT NULL,
  description text,
  
  -- Pricing
  monthly_price_cents integer NOT NULL,
  annual_price_cents integer, -- NULL if not available
  currency varchar(3) DEFAULT 'EUR',
  
  -- Stripe Price IDs
  stripe_price_id_monthly varchar(255),
  stripe_price_id_annual varchar(255),
  
  -- Display
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  is_recommended boolean DEFAULT false,
  
  -- Metadata
  metadata jsonb DEFAULT '{}'::jsonb,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Business Plan Features
CREATE TABLE business_plan_features (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  plan_key varchar(50) NOT NULL REFERENCES business_plans(plan_key) ON DELETE CASCADE,
  feature_key varchar(100) NOT NULL,
  feature_value jsonb, -- For feature-specific values (e.g., max_images: 20)
  is_enabled boolean DEFAULT true,
  
  created_at timestamptz DEFAULT now(),
  
  UNIQUE(plan_key, feature_key)
);

CREATE INDEX idx_plan_features_plan ON business_plan_features(plan_key);

-- Business Subscriptions
CREATE TABLE business_subscriptions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_profile_id uuid NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
  plan_key varchar(50) NOT NULL REFERENCES business_plans(plan_key) ON DELETE RESTRICT,
  
  -- Billing
  billing_interval varchar(20) NOT NULL, -- monthly, annual
  price_cents integer NOT NULL,
  currency varchar(3) DEFAULT 'EUR',
  
  -- Stripe
  stripe_subscription_id varchar(255) UNIQUE,
  stripe_customer_id varchar(255),
  stripe_subscription_item_id varchar(255),
  
  -- Period
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean DEFAULT false,
  canceled_at timestamptz,
  
  -- Trial
  trial_start timestamptz,
  trial_end timestamptz,
  
  -- Status
  status varchar(50) DEFAULT 'active', -- active, past_due, canceled, trialing, incomplete
  
  -- Metadata
  metadata jsonb DEFAULT '{}'::jsonb,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_subscriptions_business ON business_subscriptions(business_profile_id);
CREATE INDEX idx_subscriptions_stripe ON business_subscriptions(stripe_subscription_id);
CREATE INDEX idx_subscriptions_status ON business_subscriptions(status);
CREATE INDEX idx_subscriptions_period_end ON business_subscriptions(current_period_end) WHERE status = 'active';

-- Business Addons (for one-time purchases)
CREATE TABLE business_addons (
  addon_key varchar(50) PRIMARY KEY,
  name varchar(100) NOT NULL,
  description text,
  addon_type varchar(50) NOT NULL, -- one_time, recurring
  
  -- Pricing
  base_price_cents integer NOT NULL,
  currency varchar(3) DEFAULT 'EUR',
  duration_days integer, -- For featured listings, etc.
  
  -- Stripe
  stripe_price_id varchar(255),
  
  -- Display
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  
  -- Metadata
  metadata jsonb DEFAULT '{}'::jsonb,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Business Addon Purchases
CREATE TABLE business_addon_purchases (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_profile_id uuid NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
  addon_key varchar(50) NOT NULL REFERENCES business_addons(addon_key) ON DELETE RESTRICT,
  
  -- Target (what entity is this addon for?)
  entity_type varchar(50), -- job, classified, event
  entity_id uuid,
  
  -- Period
  active_from timestamptz,
  active_to timestamptz,
  scheduled_start_at timestamptz, -- For future activation
  
  -- Payment
  stripe_payment_intent_id varchar(255),
  stripe_checkout_session_id varchar(255),
  price_paid_cents integer NOT NULL,
  currency varchar(3) DEFAULT 'EUR',
  
  -- Status
  status varchar(50) DEFAULT 'active', -- pending, active, expired, cancelled
  
  -- Metadata
  metadata jsonb DEFAULT '{}'::jsonb,
  
  -- Timestamps
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_addon_purchases_business ON business_addon_purchases(business_profile_id);
CREATE INDEX idx_addon_purchases_entity ON business_addon_purchases(entity_type, entity_id);
CREATE INDEX idx_addon_purchases_status ON business_addon_purchases(status);
CREATE INDEX idx_addon_purchases_active ON business_addon_purchases(active_from, active_to) WHERE status = 'active';

-- Business Claims (for claiming existing places)
CREATE TABLE business_claims (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_profile_id uuid NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
  place_id uuid NOT NULL REFERENCES places(id) ON DELETE CASCADE,
  
  -- Claim Steps Data
  step_1_data jsonb, -- Basic info
  step_2_data jsonb, -- Opening hours
  step_3_data jsonb, -- Images/videos metadata
  step_4_data jsonb, -- Verification docs metadata
  step_5_data jsonb, -- Plan selection
  
  -- Verification
  verification_status varchar(50) DEFAULT 'pending', -- pending, approved, rejected
  verification_notes text,
  verified_at timestamptz,
  verified_by uuid REFERENCES auth.users(id),
  
  -- Payment
  payment_status varchar(50) DEFAULT 'unpaid', -- unpaid, processing, paid, refunded
  claim_fee_cents integer DEFAULT 1900, -- 19€
  stripe_payment_intent_id varchar(255),
  stripe_checkout_session_id varchar(255),
  
  -- Status
  status varchar(50) DEFAULT 'draft', -- draft, awaiting_payment, pending_review, approved, rejected, cancelled
  submitted_at timestamptz,
  approved_at timestamptz,
  rejected_at timestamptz,
  cancelled_at timestamptz,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  UNIQUE(business_profile_id, place_id)
);

CREATE INDEX idx_claims_business ON business_claims(business_profile_id);
CREATE INDEX idx_claims_place ON business_claims(place_id);
CREATE INDEX idx_claims_status ON business_claims(status);
CREATE INDEX idx_claims_verification ON business_claims(verification_status) WHERE verification_status = 'pending';

-- Business Claim Documents (verification uploads)
CREATE TABLE business_claim_documents (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  claim_id uuid NOT NULL REFERENCES business_claims(id) ON DELETE CASCADE,
  
  -- Document Info
  document_type varchar(50) NOT NULL, -- business_license, proof_photo
  file_name varchar(255) NOT NULL,
  mime_type varchar(100) NOT NULL,
  file_size_bytes integer NOT NULL,
  
  -- Storage
  storage_bucket varchar(100) DEFAULT 'claim-documents',
  storage_path varchar(500) NOT NULL,
  
  -- Hashes (for deduplication)
  sha256_hash varchar(64),
  phash varchar(64), -- For images
  
  -- Metadata
  metadata jsonb DEFAULT '{}'::jsonb,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

CREATE INDEX idx_claim_documents_claim ON business_claim_documents(claim_id);
CREATE INDEX idx_claim_documents_type ON business_claim_documents(document_type);

-- ============================================================================
-- REVIEWS & MEDIA
-- ============================================================================

-- User Reviews (separate from imported Google reviews)
CREATE TABLE user_reviews (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Entity (polymorphic)
  entity_type varchar(50) NOT NULL, -- place, event, experience
  entity_id uuid NOT NULL,
  
  -- User Info
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  display_name varchar(100),
  user_avatar_url varchar(500),
  
  -- Review Content
  rating smallint NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title varchar(255),
  comment text,
  language varchar(10), -- de, en, es
  
  -- Verification
  email varchar(255) NOT NULL,
  email_hash varchar(64) NOT NULL, -- SHA-256 for privacy
  email_verified boolean DEFAULT false,
  verification_token uuid,
  verified_at timestamptz,
  
  -- Moderation
  status varchar(50) DEFAULT 'pending', -- pending, approved, rejected, flagged
  moderation_notes text,
  moderated_at timestamptz,
  moderated_by uuid REFERENCES auth.users(id),
  
  -- Helpful votes
  helpful_count integer DEFAULT 0,
  not_helpful_count integer DEFAULT 0,
  
  -- Response (from business)
  business_response text,
  business_responded_at timestamptz,
  business_responded_by uuid REFERENCES auth.users(id),
  
  -- Meta
  submitter_ip inet,
  user_agent text,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_reviews_entity ON user_reviews(entity_type, entity_id);
CREATE INDEX idx_reviews_user ON user_reviews(user_id) WHERE user_id IS NOT NULL;
CREATE INDEX idx_reviews_email_hash ON user_reviews(email_hash);
CREATE INDEX idx_reviews_status ON user_reviews(status);
CREATE INDEX idx_reviews_verification ON user_reviews(verification_token) WHERE email_verified = false;
CREATE INDEX idx_reviews_created ON user_reviews(created_at DESC);

-- Review Media (photos/videos uploaded with reviews)
CREATE TABLE review_media (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  review_id uuid NOT NULL REFERENCES user_reviews(id) ON DELETE CASCADE,
  
  -- Media Info
  media_type varchar(20) NOT NULL, -- image, video
  file_name varchar(255) NOT NULL,
  mime_type varchar(100) NOT NULL,
  file_size_bytes integer NOT NULL,
  
  -- Image/Video Details
  width integer,
  height integer,
  duration_seconds integer, -- For videos
  
  -- Storage
  storage_bucket varchar(100) DEFAULT 'review-media',
  storage_path varchar(500) NOT NULL,
  public_url varchar(500) NOT NULL,
  
  -- Hashes
  sha256_hash varchar(64),
  phash varchar(64), -- Perceptual hash for images
  
  -- Moderation
  status varchar(50) DEFAULT 'pending', -- pending, approved, rejected
  moderation_notes text,
  
  -- Metadata
  metadata jsonb DEFAULT '{}'::jsonb,
  
  -- Timestamps
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_review_media_review ON review_media(review_id);
CREATE INDEX idx_review_media_status ON review_media(status);
CREATE INDEX idx_review_media_phash ON review_media(phash) WHERE phash IS NOT NULL;

-- ============================================================================
-- TAGS (Flexible tagging system)
-- ============================================================================

CREATE TABLE tags (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Tag Info
  slug varchar(100) NOT NULL UNIQUE,
  name_de varchar(100) NOT NULL,
  name_en varchar(100) NOT NULL,
  name_es varchar(100) NOT NULL,
  description_de text,
  description_en text,
  description_es text,
  
  -- Type
  tag_type varchar(50), -- cuisine, amenity, activity, feature, etc.
  
  -- Display
  icon varchar(50),
  color varchar(7),
  sort_order integer DEFAULT 0,
  
  -- Status
  is_active boolean DEFAULT true,
  usage_count integer DEFAULT 0, -- Denormalized for performance
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_tags_slug ON tags(slug);
CREATE INDEX idx_tags_type ON tags(tag_type) WHERE is_active = true;
CREATE INDEX idx_tags_usage ON tags(usage_count DESC);

-- Entity Tags (junction table for polymorphic tagging)
CREATE TABLE entity_tags (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tag_id uuid NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  
  -- Entity (polymorphic)
  entity_type varchar(50) NOT NULL, -- place, event, experience, job, etc.
  entity_id uuid NOT NULL,
  
  -- Meta
  added_by uuid REFERENCES auth.users(id),
  added_at timestamptz DEFAULT now(),
  
  UNIQUE(tag_id, entity_type, entity_id)
);

CREATE INDEX idx_entity_tags_tag ON entity_tags(tag_id);
CREATE INDEX idx_entity_tags_entity ON entity_tags(entity_type, entity_id);

-- ============================================================================
-- USER FEATURES
-- ============================================================================

-- User Favorites (polymorphic)
CREATE TABLE user_favorites (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Entity (polymorphic)
  entity_type varchar(50) NOT NULL, -- place, event, experience, job, etc.
  entity_id uuid NOT NULL,
  
  -- Optional: Collections/Lists
  collection_name varchar(100),
  notes text,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  
  UNIQUE(user_id, entity_type, entity_id)
);

CREATE INDEX idx_favorites_user ON user_favorites(user_id);
CREATE INDEX idx_favorites_entity ON user_favorites(entity_type, entity_id);
CREATE INDEX idx_favorites_collection ON user_favorites(user_id, collection_name) WHERE collection_name IS NOT NULL;

-- User Profiles (extended profile info)
CREATE TABLE user_profiles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Profile Info
  display_name varchar(100),
  bio text,
  avatar_url varchar(500),
  cover_image_url varchar(500),
  
  -- Location
  city varchar(100),
  country varchar(2),
  
  -- Stats (Denormalized)
  review_count integer DEFAULT 0,
  photo_count integer DEFAULT 0,
  favorite_count integer DEFAULT 0,
  points integer DEFAULT 0, -- Gamification
  
  -- Badges (Gamification)
  badges jsonb DEFAULT '[]'::jsonb,
  
  -- Preferences
  language varchar(10) DEFAULT 'de',
  notification_preferences jsonb DEFAULT '{}'::jsonb,
  
  -- Privacy
  is_public boolean DEFAULT true,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_user_profiles_user ON user_profiles(user_id);
CREATE INDEX idx_user_profiles_public ON user_profiles(is_public) WHERE is_public = true;

-- ============================================================================
-- ANALYTICS
-- ============================================================================

-- Analytics Events (with partitioning for scalability)
CREATE TABLE analytics_events (
  id uuid DEFAULT uuid_generate_v4(),
  
  -- Event Info
  event_type varchar(50) NOT NULL, -- view, click, search, booking_attempt, etc.
  entity_type varchar(50), -- place, event, experience, etc.
  entity_id uuid,
  
  -- User Info
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id uuid,
  
  -- Request Info
  ip_address inet,
  user_agent text,
  referrer text,
  
  -- Geo (from IP)
  country varchar(2),
  city varchar(100),
  
  -- Additional Data
  metadata jsonb DEFAULT '{}'::jsonb,
  
  -- Timestamp (PARTITION KEY)
  created_at timestamptz DEFAULT now() NOT NULL,
  
  PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);

CREATE INDEX idx_analytics_entity ON analytics_events(entity_type, entity_id, created_at);
CREATE INDEX idx_analytics_user ON analytics_events(user_id, created_at) WHERE user_id IS NOT NULL;
CREATE INDEX idx_analytics_event_type ON analytics_events(event_type, created_at);

-- Create partitions for the next 12 months (add more as needed)
CREATE TABLE analytics_events_2024_01 PARTITION OF analytics_events
  FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');
CREATE TABLE analytics_events_2024_02 PARTITION OF analytics_events
  FOR VALUES FROM ('2024-02-01') TO ('2024-03-01');
-- ... (would continue for all months)

-- Update triggers
CREATE TRIGGER update_business_profiles_updated_at BEFORE UPDATE ON business_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_business_subscriptions_updated_at BEFORE UPDATE ON business_subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_business_claims_updated_at BEFORE UPDATE ON business_claims FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_reviews_updated_at BEFORE UPDATE ON user_reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tags_updated_at BEFORE UPDATE ON tags FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- Mallorca Map - Row Level Security (RLS) Policies
-- Version: 1.0.0
-- Description: Security policies for all tables
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE places ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE classifieds ENABLE ROW LEVEL SECURITY;
ALTER TABLE community ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_plan_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_addon_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_claim_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE entity_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- Helper Functions
-- ============================================================================

-- Check if user is admin
-- Note: Cannot be IMMUTABLE because it depends on auth.uid() (session state)
-- STABLE is correct: result is stable within a single statement
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
    AND raw_user_meta_data->>'role' = 'admin'
  );
END;
$$;

-- Check if user owns business profile
CREATE OR REPLACE FUNCTION owns_business_profile(profile_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM business_profiles
    WHERE id = profile_id
    AND user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- Check if user has active subscription
CREATE OR REPLACE FUNCTION has_active_subscription()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM business_subscriptions bs
    JOIN business_profiles bp ON bs.business_profile_id = bp.id
    WHERE bp.user_id = auth.uid()
    AND bs.status = 'active'
    AND bs.current_period_end >= now()
  );
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- ============================================================================
-- CATEGORIES - Public Read
-- ============================================================================

CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  USING (is_active = true);

CREATE POLICY "Categories are editable by admins"
  ON categories FOR ALL
  USING (is_admin());

-- ============================================================================
-- PLACES - Public Read, Owner/Admin Write
-- ============================================================================

CREATE POLICY "Places are viewable by everyone"
  ON places FOR SELECT
  USING (is_active = true);

CREATE POLICY "Places are insertable by admins"
  ON places FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Places are editable by owner"
  ON places FOR UPDATE
  USING (
    is_admin() OR
    (claimed = true AND claimed_by = auth.uid())
  );

CREATE POLICY "Places are deletable by admins"
  ON places FOR DELETE
  USING (is_admin());

-- ============================================================================
-- EVENTS - Public Read, Owner/Admin Write
-- ============================================================================

CREATE POLICY "Events are viewable by everyone"
  ON events FOR SELECT
  USING (is_active = true);

CREATE POLICY "Events are insertable by authenticated users"
  ON events FOR INSERT
  WITH CHECK (
    auth.role() = 'authenticated' AND
    (is_admin() OR created_by_business_id = auth.uid())
  );

CREATE POLICY "Events are editable by creator or admin"
  ON events FOR UPDATE
  USING (
    is_admin() OR
    created_by_business_id = auth.uid()
  );

CREATE POLICY "Events are deletable by creator or admin"
  ON events FOR DELETE
  USING (
    is_admin() OR
    created_by_business_id = auth.uid()
  );

-- ============================================================================
-- EXPERIENCES - Public Read, Admin Write (imported data)
-- ============================================================================

CREATE POLICY "Experiences are viewable by everyone"
  ON experiences FOR SELECT
  USING (is_active = true);

CREATE POLICY "Experiences are manageable by admins"
  ON experiences FOR ALL
  USING (is_admin());

-- ============================================================================
-- JOBS - Public Read, Owner/Admin Write
-- ============================================================================

CREATE POLICY "Jobs are viewable by everyone"
  ON jobs FOR SELECT
  USING (
    is_active = true AND
    expires_at >= now()
  );

CREATE POLICY "Jobs are insertable by authenticated users"
  ON jobs FOR INSERT
  WITH CHECK (
    auth.role() = 'authenticated' AND
    (posted_by_user_id = auth.uid() OR posted_by_business_id = auth.uid())
  );

CREATE POLICY "Jobs are editable by poster"
  ON jobs FOR UPDATE
  USING (
    is_admin() OR
    posted_by_user_id = auth.uid() OR
    posted_by_business_id = auth.uid()
  );

CREATE POLICY "Jobs are deletable by poster"
  ON jobs FOR DELETE
  USING (
    is_admin() OR
    posted_by_user_id = auth.uid() OR
    posted_by_business_id = auth.uid()
  );

-- ============================================================================
-- CLASSIFIEDS - Public Read, Owner/Admin Write
-- ============================================================================

CREATE POLICY "Classifieds are viewable by everyone"
  ON classifieds FOR SELECT
  USING (
    status = 'active' AND
    expires_at >= now()
  );

CREATE POLICY "Classifieds are insertable by authenticated users"
  ON classifieds FOR INSERT
  WITH CHECK (
    auth.role() = 'authenticated' AND
    user_id = auth.uid()
  );

CREATE POLICY "Classifieds are editable by owner"
  ON classifieds FOR UPDATE
  USING (
    is_admin() OR
    user_id = auth.uid()
  );

CREATE POLICY "Classifieds are deletable by owner"
  ON classifieds FOR DELETE
  USING (
    is_admin() OR
    user_id = auth.uid()
  );

-- ============================================================================
-- COMMUNITY - Public Read, Owner/Admin Write
-- ============================================================================

CREATE POLICY "Community entries are viewable by everyone"
  ON community FOR SELECT
  USING (is_active = true);

CREATE POLICY "Community entries are insertable by authenticated users"
  ON community FOR INSERT
  WITH CHECK (
    auth.role() = 'authenticated' AND
    user_id = auth.uid()
  );

CREATE POLICY "Community entries are editable by owner"
  ON community FOR UPDATE
  USING (
    is_admin() OR
    user_id = auth.uid()
  );

CREATE POLICY "Community entries are deletable by owner"
  ON community FOR DELETE
  USING (
    is_admin() OR
    user_id = auth.uid()
  );

-- ============================================================================
-- NEWS - Public Read, Admin Write
-- ============================================================================

CREATE POLICY "News are viewable by everyone"
  ON news FOR SELECT
  USING (is_active = true);

CREATE POLICY "News are manageable by admins"
  ON news FOR ALL
  USING (is_admin());

-- ============================================================================
-- BUSINESS PROFILES - Owner Read/Write
-- ============================================================================

CREATE POLICY "Business profiles are viewable by owner"
  ON business_profiles FOR SELECT
  USING (
    is_admin() OR
    user_id = auth.uid()
  );

CREATE POLICY "Business profiles are insertable by authenticated users"
  ON business_profiles FOR INSERT
  WITH CHECK (
    auth.role() = 'authenticated' AND
    user_id = auth.uid()
  );

CREATE POLICY "Business profiles are editable by owner"
  ON business_profiles FOR UPDATE
  USING (
    is_admin() OR
    user_id = auth.uid()
  );

-- ============================================================================
-- BUSINESS SUBSCRIPTIONS - Owner Read, System Write
-- ============================================================================

CREATE POLICY "Subscriptions are viewable by owner"
  ON business_subscriptions FOR SELECT
  USING (
    is_admin() OR
    EXISTS (
      SELECT 1 FROM business_profiles
      WHERE id = business_subscriptions.business_profile_id
      AND user_id = auth.uid()
    )
  );

-- No INSERT/UPDATE/DELETE policies - handled by backend/webhooks only

-- ============================================================================
-- BUSINESS PLANS - Public Read
-- ============================================================================

CREATE POLICY "Business plans are viewable by everyone"
  ON business_plans FOR SELECT
  USING (is_active = true);

CREATE POLICY "Business plans are manageable by admins"
  ON business_plans FOR ALL
  USING (is_admin());

-- ============================================================================
-- BUSINESS PLAN FEATURES - Public Read
-- ============================================================================

CREATE POLICY "Plan features are viewable by everyone"
  ON business_plan_features FOR SELECT
  USING (true);

CREATE POLICY "Plan features are manageable by admins"
  ON business_plan_features FOR ALL
  USING (is_admin());

-- ============================================================================
-- BUSINESS ADDONS - Public Read
-- ============================================================================

CREATE POLICY "Addons are viewable by everyone"
  ON business_addons FOR SELECT
  USING (is_active = true);

CREATE POLICY "Addons are manageable by admins"
  ON business_addons FOR ALL
  USING (is_admin());

-- ============================================================================
-- BUSINESS ADDON PURCHASES - Owner Read
-- ============================================================================

CREATE POLICY "Addon purchases are viewable by owner"
  ON business_addon_purchases FOR SELECT
  USING (
    is_admin() OR
    EXISTS (
      SELECT 1 FROM business_profiles
      WHERE id = business_addon_purchases.business_profile_id
      AND user_id = auth.uid()
    )
  );

-- ============================================================================
-- BUSINESS CLAIMS - Owner Read/Write
-- ============================================================================

CREATE POLICY "Claims are viewable by owner"
  ON business_claims FOR SELECT
  USING (
    is_admin() OR
    EXISTS (
      SELECT 1 FROM business_profiles
      WHERE id = business_claims.business_profile_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Claims are insertable by business owners"
  ON business_claims FOR INSERT
  WITH CHECK (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM business_profiles
      WHERE id = business_claims.business_profile_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Claims are editable by owner before submission"
  ON business_claims FOR UPDATE
  USING (
    (
      EXISTS (
        SELECT 1 FROM business_profiles
        WHERE id = business_claims.business_profile_id
        AND user_id = auth.uid()
      )
      AND status IN ('draft', 'awaiting_payment')
    )
    OR is_admin()
  );

-- ============================================================================
-- BUSINESS CLAIM DOCUMENTS - Owner Read
-- ============================================================================

CREATE POLICY "Claim documents are viewable by owner and admin"
  ON business_claim_documents FOR SELECT
  USING (
    is_admin() OR
    EXISTS (
      SELECT 1 FROM business_claims bc
      JOIN business_profiles bp ON bc.business_profile_id = bp.id
      WHERE bc.id = business_claim_documents.claim_id
      AND bp.user_id = auth.uid()
    )
  );

CREATE POLICY "Claim documents are insertable by owner"
  ON business_claim_documents FOR INSERT
  WITH CHECK (
    auth.role() = 'authenticated' AND
    (
      created_by = auth.uid() OR
      EXISTS (
        SELECT 1 FROM business_claims bc
        JOIN business_profiles bp ON bc.business_profile_id = bp.id
        WHERE bc.id = business_claim_documents.claim_id
        AND bp.user_id = auth.uid()
      )
    )
  );

-- ============================================================================
-- USER REVIEWS - Public Read (approved), Owner Write
-- ============================================================================

CREATE POLICY "Approved reviews are viewable by everyone"
  ON user_reviews FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Users can view their own reviews"
  ON user_reviews FOR SELECT
  USING (
    user_id = auth.uid() OR
    is_admin()
  );

CREATE POLICY "Reviews are insertable by anyone"
  ON user_reviews FOR INSERT
  WITH CHECK (true); -- Email verification required separately

CREATE POLICY "Users can edit their own reviews before approval"
  ON user_reviews FOR UPDATE
  USING (
    (user_id = auth.uid() AND status = 'pending') OR
    is_admin()
  );

-- ============================================================================
-- REVIEW MEDIA - Public Read (if review approved)
-- ============================================================================

CREATE POLICY "Review media is viewable if review approved"
  ON review_media FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_reviews
      WHERE id = review_media.review_id
      AND status = 'approved'
    )
    OR is_admin()
  );

-- ============================================================================
-- TAGS - Public Read, Admin Write
-- ============================================================================

CREATE POLICY "Tags are viewable by everyone"
  ON tags FOR SELECT
  USING (is_active = true);

CREATE POLICY "Tags are manageable by admins"
  ON tags FOR ALL
  USING (is_admin());

-- ============================================================================
-- ENTITY TAGS - Public Read, Admin Write
-- ============================================================================

CREATE POLICY "Entity tags are viewable by everyone"
  ON entity_tags FOR SELECT
  USING (true);

CREATE POLICY "Entity tags are manageable by admins"
  ON entity_tags FOR ALL
  USING (is_admin());

-- ============================================================================
-- USER FAVORITES - Owner Only
-- ============================================================================

CREATE POLICY "Favorites are viewable by owner"
  ON user_favorites FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Favorites are insertable by owner"
  ON user_favorites FOR INSERT
  WITH CHECK (
    auth.role() = 'authenticated' AND
    user_id = auth.uid()
  );

CREATE POLICY "Favorites are deletable by owner"
  ON user_favorites FOR DELETE
  USING (user_id = auth.uid());

-- ============================================================================
-- USER PROFILES - Public Read (if public), Owner Write
-- ============================================================================

CREATE POLICY "Public profiles are viewable by everyone"
  ON user_profiles FOR SELECT
  USING (is_public = true);

CREATE POLICY "Users can view their own profile"
  ON user_profiles FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can create their own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (
    auth.role() = 'authenticated' AND
    user_id = auth.uid()
  );

CREATE POLICY "Users can edit their own profile"
  ON user_profiles FOR UPDATE
  USING (user_id = auth.uid());

-- ============================================================================
-- ANALYTICS EVENTS - Insert Only (System)
-- ============================================================================

CREATE POLICY "Analytics can be inserted by anyone"
  ON analytics_events FOR INSERT
  WITH CHECK (true); -- Anonymous tracking allowed

CREATE POLICY "Analytics are viewable by admins"
  ON analytics_events FOR SELECT
  USING (is_admin());

-- ============================================================================
-- STORAGE BUCKETS RLS (Supabase Storage)
-- ============================================================================

-- Note: These are created via Supabase Dashboard or API, not SQL
-- But documented here for reference:

/*
Bucket: claim-documents
- RLS: ON
- SELECT: authenticated users (owner of claim)
- INSERT: authenticated users (owner of claim)
- DELETE: admins only

Bucket: review-media
- RLS: ON
- SELECT: public (if review approved)
- INSERT: anyone (with moderation)
- DELETE: admins only

Bucket: place-images
- RLS: ON
- SELECT: public
- INSERT: admins, business owners (claimed places)
- DELETE: admins, business owners

Bucket: user-avatars
- RLS: ON
- SELECT: public
- INSERT: authenticated users (own avatar)
- UPDATE: authenticated users (own avatar)
- DELETE: authenticated users (own avatar)
*/

-- ============================================================================
-- Mallorca Map - Seed Data
-- Version: 1.0.0
-- Description: Initial categories, plans, and test data
-- ============================================================================

-- ============================================================================
-- MAIN CATEGORIES (10 Categories)
-- Using INSERT ... ON CONFLICT for idempotency
-- ============================================================================

-- First, ensure we can insert (delete if exists, but preserve IDs if possible)
INSERT INTO categories (slug, slug_de, slug_en, slug_es, name_de, name_en, name_es, description_de, description_en, description_es, icon, color, sort_order, is_active) VALUES
('tours', 'touren-erlebnisse', 'tours-experiences', 'tours-experiencias', 
 'Touren & Erlebnisse', 'Tours & Experiences', 'Tours & Experiencias',
 'Entdecke die besten Touren und Erlebnisse auf Mallorca', 'Discover the best tours and experiences in Mallorca', 'Descubre los mejores tours y experiencias en Mallorca',
 'Compass', '#14B8C4', 1, true),

('events', 'events-partys', 'events-parties', 'eventos-fiestas',
 'Events & Partys', 'Events & Parties', 'Eventos & Fiestas',
 'Die angesagtesten Events und Partys der Insel', 'The hottest events and parties on the island', 'Los eventos y fiestas más populares de la isla',
 'Calendar', '#FF6B6B', 2, true),

('food', 'essen-trinken', 'food-drink', 'comida-bebida',
 'Essen & Trinken', 'Food & Drink', 'Comida & Bebida',
 'Die besten Restaurants, Cafés und Bars', 'The best restaurants, cafes and bars', 'Los mejores restaurantes, cafés y bares',
 'UtensilsCrossed', '#F4A460', 3, true),

('sights', 'sehenswuerdigkeiten', 'sights', 'lugares-interes',
 'Sehenswürdigkeiten', 'Sights', 'Lugares de Interés',
 'Entdecke die schönsten Sehenswürdigkeiten', 'Discover the most beautiful sights', 'Descubre los lugares más bellos',
 'Landmark', '#9B59B6', 4, true),

('services', 'dienstleistungen', 'services', 'servicios',
 'Dienstleistungen', 'Services', 'Servicios',
 'Alle Services und Dienstleister auf Mallorca', 'All services and service providers in Mallorca', 'Todos los servicios y proveedores en Mallorca',
 'Wrench', '#3498DB', 5, true),

('places', 'orte', 'places', 'lugares',
 'Orte', 'Places', 'Lugares',
 'Besondere Orte und Locations', 'Special places and locations', 'Lugares y ubicaciones especiales',
 'MapPin', '#2ECC71', 6, true),

('jobs', 'jobs', 'jobs', 'trabajos',
 'Jobs', 'Jobs', 'Trabajos',
 'Aktuelle Stellenangebote auf Mallorca', 'Current job offers in Mallorca', 'Ofertas de trabajo actuales en Mallorca',
 'Briefcase', '#E67E22', 7, true),

('community', 'community', 'community', 'comunidad',
 'Community', 'Community', 'Comunidad',
 'Gruppen, Treffen und Community-Events', 'Groups, meetings and community events', 'Grupos, encuentros y eventos comunitarios',
 'Users', '#1ABC9C', 8, true),

('classifieds', 'kleinanzeigen', 'classifieds', 'anuncios',
 'Kleinanzeigen', 'Classifieds', 'Anuncios',
 'Kaufen und verkaufen auf Mallorca', 'Buy and sell in Mallorca', 'Comprar y vender en Mallorca',
 'ShoppingBag', '#95A5A6', 9, true),

('news', 'nachrichten', 'news', 'noticias',
 'Nachrichten', 'News', 'Noticias',
 'Aktuelle Nachrichten aus Mallorca', 'Current news from Mallorca', 'Noticias actuales de Mallorca',
 'Newspaper', '#34495E', 10, true)
ON CONFLICT (slug) DO UPDATE SET
  name_de = EXCLUDED.name_de,
  name_en = EXCLUDED.name_en,
  name_es = EXCLUDED.name_es,
  description_de = EXCLUDED.description_de,
  description_en = EXCLUDED.description_en,
  description_es = EXCLUDED.description_es,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

-- ============================================================================
-- FOOD SUB-CATEGORIES
-- ============================================================================

DO $$
DECLARE
  food_cat_id uuid;
BEGIN
  SELECT id INTO food_cat_id FROM categories WHERE slug = 'food';
  
  INSERT INTO categories (parent_id, slug, slug_de, slug_en, slug_es, name_de, name_en, name_es, icon, sort_order) VALUES
  (food_cat_id, 'restaurants', 'restaurants', 'restaurants', 'restaurantes', 'Restaurants', 'Restaurants', 'Restaurantes', 'UtensilsCrossed', 1),
  (food_cat_id, 'cafes', 'cafes', 'cafes', 'cafeterias', 'Cafés', 'Cafes', 'Cafeterías', 'Coffee', 2),
  (food_cat_id, 'bars', 'bars', 'bars', 'bares', 'Bars & Clubs', 'Bars & Clubs', 'Bares & Clubs', 'Wine', 3),
  (food_cat_id, 'beach-clubs', 'beach-clubs', 'beach-clubs', 'clubes-playa', 'Beach Clubs', 'Beach Clubs', 'Clubes de Playa', 'Palmtree', 4)
  ON CONFLICT (slug) DO NOTHING;
END $$;

-- ============================================================================
-- BUSINESS PLANS
-- ============================================================================

INSERT INTO business_plans (plan_key, name, description, monthly_price_cents, annual_price_cents, sort_order, is_recommended) VALUES
('starter', 'Starter', 'Grundfunktionen für gepflegte Inhalte und Basis-Sichtbarkeit', 4700, 47000, 1, false),
('pro', 'Pro', 'Empfohlen für die meisten Unternehmen mit Events und erhöhter Reichweite', 11700, 117000, 2, true),
('business', 'Business', 'Maximale Sichtbarkeit, Page Designer und Leadgenerierung', 29700, 297000, 3, false)
ON CONFLICT (plan_key) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  monthly_price_cents = EXCLUDED.monthly_price_cents,
  annual_price_cents = EXCLUDED.annual_price_cents,
  updated_at = now();

-- ============================================================================
-- BUSINESS PLAN FEATURES
-- ============================================================================

-- Starter Features
-- Delete existing features first to ensure clean state
DELETE FROM business_plan_features WHERE plan_key IN ('starter', 'pro', 'business');

INSERT INTO business_plan_features (plan_key, feature_key, feature_value) VALUES
('starter', 'edit_content', '{"enabled": true}'::jsonb),
('starter', 'max_images', '5'::jsonb),
('starter', 'max_videos', '0'::jsonb),
('starter', 'remove_similar', '{"enabled": true}'::jsonb),
('starter', 'standard_page', '{"enabled": true}'::jsonb),
('starter', 'category_visibility', '{"enabled": true}'::jsonb),
('starter', 'analytics', '{"level": "basic"}'::jsonb);

-- Pro Features (all Starter + more)
INSERT INTO business_plan_features (plan_key, feature_key, feature_value) VALUES
('pro', 'edit_content', '{"enabled": true}'::jsonb),
('pro', 'max_images', '20'::jsonb),
('pro', 'max_videos', '3'::jsonb),
('pro', 'remove_similar', '{"enabled": true}'::jsonb),
('pro', 'standard_page', '{"enabled": true}'::jsonb),
('pro', 'category_visibility', '{"enabled": true}'::jsonb),
('pro', 'ad_free', '{"enabled": true}'::jsonb),
('pro', 'create_events', '{"max_per_month": 5}'::jsonb),
('pro', 'enhanced_similar_visibility', '{"boost": 1.5}'::jsonb),
('pro', 'enhanced_search_ranking', '{"boost": 1.5}'::jsonb),
('pro', 'analytics', '{"level": "advanced"}'::jsonb);

-- Business Features (all Pro + more)
INSERT INTO business_plan_features (plan_key, feature_key, feature_value) VALUES
('business', 'edit_content', '{"enabled": true}'::jsonb),
('business', 'max_images', '-1'::jsonb), -- unlimited
('business', 'max_videos', '-1'::jsonb), -- unlimited
('business', 'remove_similar', '{"enabled": true}'::jsonb),
('business', 'standard_page', '{"enabled": true}'::jsonb),
('business', 'category_visibility', '{"enabled": true}'::jsonb),
('business', 'ad_free', '{"enabled": true}'::jsonb),
('business', 'create_events', '{"max_per_month": -1}'::jsonb), -- unlimited
('business', 'enhanced_similar_visibility', '{"boost": 2.0}'::jsonb),
('business', 'enhanced_search_ranking', '{"boost": 2.0}'::jsonb),
('business', 'seo_page_designer', '{"enabled": true}'::jsonb),
('business', 'lead_generation', '{"enabled": true}'::jsonb),
('business', 'website_builder', '{"enabled": true}'::jsonb),
('business', 'homepage_ad', '{"enabled": true, "slots": 3}'::jsonb),
('business', 'review_dispute', '{"enabled": true}'::jsonb),
('business', 'max_visibility', '{"enabled": true}'::jsonb),
('business', 'api_access', '{"enabled": true}'::jsonb),
('business', 'priority_support', '{"enabled": true}'::jsonb),
('business', 'analytics', '{"level": "premium"}'::jsonb);

-- ============================================================================
-- BUSINESS ADDONS
-- ============================================================================

INSERT INTO business_addons (addon_key, name, description, addon_type, base_price_cents, duration_days, sort_order) VALUES
('job_top_pin_7d', 'Job 7 Tage fixieren', 'Dein Job bleibt 7 Tage ganz oben in den Suchergebnissen', 'one_time', 1900, 7, 1),
('job_top_pin_30d', 'Job 30 Tage fixieren', 'Dein Job bleibt 30 Tage ganz oben in den Suchergebnissen', 'one_time', 4900, 30, 2),
('classified_highlight_3d', 'Kleinanzeige 3 Tage highlighten', 'Deine Anzeige wird 3 Tage farblich hervorgehoben', 'one_time', 900, 3, 3),
('classified_highlight_7d', 'Kleinanzeige 7 Tage highlighten', 'Deine Anzeige wird 7 Tage farblich hervorgehoben', 'one_time', 1900, 7, 4),
('event_featured_7d', 'Event 7 Tage featured', 'Dein Event erscheint 7 Tage in der Featured-Sektion', 'one_time', 2900, 7, 5),
('event_featured_30d', 'Event 30 Tage featured', 'Dein Event erscheint 30 Tage in der Featured-Sektion', 'one_time', 7900, 30, 6)
ON CONFLICT (addon_key) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  base_price_cents = EXCLUDED.base_price_cents,
  updated_at = now();

-- ============================================================================
-- COMMON TAGS
-- ============================================================================

-- Cuisine Tags
-- Delete existing tags first
DELETE FROM tags WHERE tag_type IN ('cuisine', 'amenity', 'activity');

INSERT INTO tags (slug, name_de, name_en, name_es, tag_type, icon, sort_order) VALUES
('italian', 'Italienisch', 'Italian', 'Italiana', 'cuisine', '🇮🇹', 1),
('spanish', 'Spanisch', 'Spanish', 'Española', 'cuisine', '🇪🇸', 2),
('mediterranean', 'Mediterran', 'Mediterranean', 'Mediterránea', 'cuisine', '🌊', 3),
('asian', 'Asiatisch', 'Asian', 'Asiática', 'cuisine', '🥢', 4),
('german', 'Deutsch', 'German', 'Alemana', 'cuisine', '🇩🇪', 5),
('french', 'Französisch', 'French', 'Francesa', 'cuisine', '🇫🇷', 6),
('vegetarian', 'Vegetarisch', 'Vegetarian', 'Vegetariana', 'cuisine', '🥗', 7),
('vegan', 'Vegan', 'Vegan', 'Vegana', 'cuisine', '🌱', 8),
('seafood', 'Meeresfrüchte', 'Seafood', 'Mariscos', 'cuisine', '🦐', 9),
('pizza', 'Pizza', 'Pizza', 'Pizza', 'cuisine', '🍕', 10),
('sushi', 'Sushi', 'Sushi', 'Sushi', 'cuisine', '🍣', 11),
('tapas', 'Tapas', 'Tapas', 'Tapas', 'cuisine', '🍷', 12);

-- Amenity Tags
INSERT INTO tags (slug, name_de, name_en, name_es, tag_type, icon, sort_order) VALUES
('parking', 'Parkplatz', 'Parking', 'Aparcamiento', 'amenity', '🅿️', 1),
('wifi', 'WLAN', 'WiFi', 'WiFi', 'amenity', '📶', 2),
('outdoor-seating', 'Außenbereich', 'Outdoor Seating', 'Terraza', 'amenity', '🪑', 3),
('wheelchair-accessible', 'Rollstuhlgerecht', 'Wheelchair Accessible', 'Accesible', 'amenity', '♿', 4),
('pet-friendly', 'Haustiere erlaubt', 'Pet Friendly', 'Se admiten mascotas', 'amenity', '🐕', 5),
('kids-friendly', 'Kinderfreundlich', 'Kids Friendly', 'Apto para niños', 'amenity', '👶', 6),
('air-conditioned', 'Klimatisiert', 'Air Conditioned', 'Aire acondicionado', 'amenity', '❄️', 7),
('credit-cards', 'Kartenzahlung', 'Credit Cards', 'Tarjetas', 'amenity', '💳', 8);

-- Activity Tags
INSERT INTO tags (slug, name_de, name_en, name_es, tag_type, icon, sort_order) VALUES
('beach', 'Strand', 'Beach', 'Playa', 'activity', '🏖️', 1),
('hiking', 'Wandern', 'Hiking', 'Senderismo', 'activity', '🥾', 2),
('cycling', 'Radfahren', 'Cycling', 'Ciclismo', 'activity', '🚴', 3),
('water-sports', 'Wassersport', 'Water Sports', 'Deportes acuáticos', 'activity', '🏄', 4),
('sailing', 'Segeln', 'Sailing', 'Vela', 'activity', '⛵', 5),
('diving', 'Tauchen', 'Diving', 'Buceo', 'activity', '🤿', 6),
('golf', 'Golf', 'Golf', 'Golf', 'activity', '⛳', 7),
('wellness', 'Wellness', 'Wellness', 'Bienestar', 'activity', '💆', 8);

-- ============================================================================
-- TEST DATA (Optional - only for development)
-- ============================================================================

-- You can add test places, events, etc. here for development
-- This section would be removed or commented out for production

/*
-- Example test place
INSERT INTO places (
  category_id,
  title, title_de, title_en, title_es,
  description_de,
  slug_de, slug_en, slug_es,
  formatted_address,
  city,
  latitude, longitude,
  coordinates,
  cuisine_type,
  price_level,
  rating,
  review_count,
  is_active,
  is_featured
)
SELECT
  id,
  'Test Restaurant Palma',
  'Test Restaurant Palma',
  'Test Restaurant Palma',
  'Test Restaurante Palma',
  'Ein wunderbares Testrestaurant in Palma de Mallorca',
  'test-restaurant-palma',
  'test-restaurant-palma',
  'test-restaurante-palma',
  'Carrer de Sant Miquel, 07002 Palma',
  'Palma',
  39.5695,
  2.6500,
  ST_SetSRID(ST_MakePoint(2.6500, 39.5695), 4326)::geography,
  'mediterranean',
  3,
  4.5,
  127,
  true,
  true
FROM categories WHERE slug = 'food' AND parent_id IS NULL;
*/

-- Grant necessary permissions (if needed)
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;


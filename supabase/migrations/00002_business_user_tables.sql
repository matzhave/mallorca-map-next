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
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
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
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
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
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
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
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
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
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
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
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
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
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
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
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
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
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
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
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
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
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
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
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
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
  id uuid DEFAULT gen_random_uuid(),
  
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


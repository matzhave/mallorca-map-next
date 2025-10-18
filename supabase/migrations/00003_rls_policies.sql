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


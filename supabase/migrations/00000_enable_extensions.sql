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
-- Configure search_path for PostGIS types
-- ============================================================================

-- Set search_path so PostGIS types (geography, geometry) are found
ALTER DATABASE postgres SET search_path TO public, extensions;

-- For current session
SET search_path TO public, extensions;

-- Note: We use gen_random_uuid() instead of uuid_generate_v4()
-- gen_random_uuid() is built into Postgres 13+ (no extension needed)

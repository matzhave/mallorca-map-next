-- ============================================================================
-- Mallorca Map - Seed Data
-- Version: 1.0.0
-- Description: Initial categories, plans, and test data
-- ============================================================================

-- ============================================================================
-- MAIN CATEGORIES (10 Categories)
-- Using TRUNCATE + INSERT for clean state
-- ============================================================================

-- Clean slate: Remove all existing data (CASCADE deletes dependent rows)
TRUNCATE TABLE categories CASCADE;

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
 'Newspaper', '#34495E', 10, true);

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

TRUNCATE TABLE business_addons CASCADE;

INSERT INTO business_addons (addon_key, name, description, addon_type, base_price_cents, duration_days, sort_order) VALUES
('job_top_pin_7d', 'Job 7 Tage fixieren', 'Dein Job bleibt 7 Tage ganz oben in den Suchergebnissen', 'one_time', 1900, 7, 1),
('job_top_pin_30d', 'Job 30 Tage fixieren', 'Dein Job bleibt 30 Tage ganz oben in den Suchergebnissen', 'one_time', 4900, 30, 2),
('classified_highlight_3d', 'Kleinanzeige 3 Tage highlighten', 'Deine Anzeige wird 3 Tage farblich hervorgehoben', 'one_time', 900, 3, 3),
('classified_highlight_7d', 'Kleinanzeige 7 Tage highlighten', 'Deine Anzeige wird 7 Tage farblich hervorgehoben', 'one_time', 1900, 7, 4),
('event_featured_7d', 'Event 7 Tage featured', 'Dein Event erscheint 7 Tage in der Featured-Sektion', 'one_time', 2900, 7, 5),
('event_featured_30d', 'Event 30 Tage featured', 'Dein Event erscheint 30 Tage in der Featured-Sektion', 'one_time', 7900, 30, 6);

-- ============================================================================
-- COMMON TAGS
-- ============================================================================

-- Cuisine Tags
TRUNCATE TABLE tags CASCADE;

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


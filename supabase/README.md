# 🗄️ Mallorca Map - Database Migrations

## Struktur

```
supabase/
├── migrations/
│   ├── 00001_initial_schema.sql      # Core tables (categories, places, events, etc.)
│   ├── 00002_business_user_tables.sql # Business, reviews, tags, analytics
│   ├── 00003_rls_policies.sql         # Row Level Security policies
│   └── 00004_seed_data.sql            # Categories, plans, tags
├── complete_schema.sql                # Combined file for quick setup
└── deploy-migrations.sh               # Deployment script

## 🚀 Quick Setup

### Option 1: Supabase Dashboard (Empfohlen für erste Migration)

1. Öffne https://supabase.com/dashboard/project/fyoorhyebgihxykunvvt
2. Gehe zu **SQL Editor**
3. Öffne `supabase/complete_schema.sql`
4. Kopiere den gesamten Inhalt
5. Füge ihn im SQL Editor ein
6. Klicke auf **Run** (oder CMD+Enter)
7. Warte ~30-60 Sekunden bis alles durchgelaufen ist

### Option 2: Via CLI

```bash
# Supabase CLI installieren (falls noch nicht)
brew install supabase/tap/supabase

# Login
supabase login

# Migrations deployen
./supabase/deploy-migrations.sh
```

### Option 3: Manuelle Migration

```bash
# Einzelne Migrations in richtiger Reihenfolge ausführen
psql "postgresql://postgres:23-mS!S.upabase@db.fyoorhyebgihxykunvvt.supabase.co:5432/postgres" \
  -f supabase/migrations/00001_initial_schema.sql

psql "postgresql://postgres:23-mS!S.upabase@db.fyoorhyebgihxykunvvt.supabase.co:5432/postgres" \
  -f supabase/migrations/00002_business_user_tables.sql

# ... etc
```

---

## 📊 Schema Übersicht

### Core Tables (10 Entity Types)

1. **places** - Restaurants, Locations, Services, Sights
2. **events** - Events & Partys
3. **experiences** - Tours (Viator, GetYourGuide)
4. **jobs** - Job Listings
5. **classifieds** - Kleinanzeigen
6. **community** - Groups, Meetups
7. **news** - News Articles
8. **categories** - Hierarchical categories (10 main + subcategories)

### Business Tables

- **business_profiles** - Company info
- **business_subscriptions** - Active subscriptions
- **business_plans** - Plan definitions (Starter, Pro, Business)
- **business_plan_features** - Feature matrix
- **business_addons** - One-time purchases (Top Pin, Featured, etc.)
- **business_addon_purchases** - Purchase records
- **business_claims** - Claiming existing places (5-step flow)
- **business_claim_documents** - Verification uploads

### User & Social Tables

- **user_profiles** - Extended user info
- **user_reviews** - User-generated reviews
- **review_media** - Photos/videos with reviews
- **user_favorites** - Favorited items
- **tags** - Flexible tagging system
- **entity_tags** - Tag assignments (polymorphic)

### Analytics

- **analytics_events** - Event tracking (partitioned by month)

---

## 🔐 Security

**Row Level Security (RLS)** ist auf **allen Tabellen aktiviert**.

### Public Read Tables:
- `categories`, `business_plans`, `business_plan_features`, `business_addons`
- `tags`

### Conditional Public Read:
- `places` (only `is_active = true`)
- `events` (only `is_active = true`)
- `experiences` (only `is_active = true`)
- `jobs` (only `is_active = true AND expires_at >= now()`)
- `classifieds` (only `status = 'active' AND expires_at >= now()`)
- `community` (only `is_active = true`)
- `news` (only `is_active = true`)
- `user_reviews` (only `status = 'approved'`)

### Owner-Only Tables:
- `user_favorites`, `user_profiles` (own data)
- `business_profiles`, `business_subscriptions` (own business)
- `business_claims` (own claims)

### Admin-Only:
- Full access to all tables for users with `raw_user_meta_data->>'role' = 'admin'`

---

## 🗺️ PostGIS & Geo Queries

**PostGIS Extension** ist aktiviert für effiziente Geo-Queries.

### Wichtige Indexes:

```sql
-- Spatial Indexes (GIST)
CREATE INDEX idx_places_coordinates ON places USING GIST(coordinates);
CREATE INDEX idx_events_coordinates ON events USING GIST(coordinates);
-- ... etc
```

### Beispiel-Query (Nearby Places):

```sql
SELECT 
  id, 
  title,
  ST_Distance(coordinates, ST_SetSRID(ST_MakePoint(2.6500, 39.5695), 4326)::geography) as distance_meters
FROM places
WHERE 
  is_active = true
  AND ST_DWithin(
    coordinates,
    ST_SetSRID(ST_MakePoint(2.6500, 39.5695), 4326)::geography,
    5000 -- 5km radius
  )
ORDER BY distance_meters
LIMIT 20;
```

---

## 🔍 Full-Text Search

**GIN Indexes** für performante Full-Text Search.

### Beispiel-Query (Search Places):

```sql
SELECT 
  id, 
  title_de,
  ts_rank(
    to_tsvector('german', coalesce(title_de, '') || ' ' || coalesce(description_de, '')),
    to_tsquery('german', 'restaurant & pizza')
  ) as rank
FROM places
WHERE 
  is_active = true
  AND to_tsvector('german', coalesce(title_de, '') || ' ' || coalesce(description_de, '')) 
      @@ to_tsquery('german', 'restaurant & pizza')
ORDER BY rank DESC
LIMIT 20;
```

---

## 📈 Performance Optimierungen

### 1. Denormalisierte Felder

Für häufige Queries sind einige Felder denormalisiert:

- `places.primary_image_url` (statt immer JSON parsen)
- `places.review_count`, `places.rating` (statt COUNT/AVG Query)
- `tags.usage_count` (statt COUNT auf entity_tags)
- `user_profiles.review_count`, `photo_count`, etc.

### 2. Composite Indexes

```sql
-- Für: "Featured places mit guter Bewertung"
CREATE INDEX idx_places_featured ON places(is_featured, rating DESC) 
WHERE is_active = true AND is_featured = true;

-- Für: "Upcoming events sortiert nach Datum"
CREATE INDEX idx_events_upcoming ON events(start_date) 
WHERE is_active = true AND start_date >= CURRENT_DATE;
```

### 3. Partial Indexes

Nur aktive/relevante Daten indexieren:

```sql
CREATE INDEX idx_jobs_expires ON jobs(expires_at) 
WHERE is_active = true AND expires_at >= now();
```

### 4. Partitioning

`analytics_events` ist nach Monat partitioniert für bessere Performance bei großen Datenmengen:

```sql
CREATE TABLE analytics_events_2024_01 PARTITION OF analytics_events
  FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');
```

---

## 🔄 TypeScript Types Generieren

Nach dem Deployment der Migrations:

```bash
# Via Supabase CLI
supabase gen types typescript --project-id fyoorhyebgihxykunvvt > packages/supabase/src/types.ts

# Oder direkt via API
curl "https://fyoorhyebgihxykunvvt.supabase.co/rest/v1/" \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY" \
  | npx openapi-typescript - --output packages/supabase/src/types.ts
```

---

## 🧪 Testing

### Test Connection

```typescript
import { supabase } from '@repo/supabase';

const { data, error } = await supabase
  .from('categories')
  .select('*')
  .limit(10);

console.log('Categories:', data);
```

### Test RLS

```typescript
// Should return only active places
const { data } = await supabase
  .from('places')
  .select('*')
  .limit(5);

// Should fail (no auth)
const { error } = await supabase
  .from('business_profiles')
  .insert({ email: 'test@example.com' });

console.log('Expected error:', error);
```

---

## 📝 Migration Workflow (für Zukunft)

### Neue Migration erstellen:

```bash
# Timestamp-basiert
TIMESTAMP=$(date +"%Y%m%d%H%M%S")
touch supabase/migrations/${TIMESTAMP}_your_migration_name.sql
```

### Migration Struktur:

```sql
-- ============================================================================
-- Migration: Add xyz feature
-- Created: 2024-01-15
-- ============================================================================

BEGIN;

-- Your changes here
ALTER TABLE places ADD COLUMN new_field varchar(255);
CREATE INDEX idx_places_new_field ON places(new_field);

-- Update RLS if needed
DROP POLICY IF EXISTS "..." ON places;
CREATE POLICY "..." ON places FOR SELECT USING (...);

COMMIT;
```

---

## 🚨 Troubleshooting

### Problem: Migration fails mit "relation already exists"

**Lösung:** Schema wurde bereits deployed. Überspringe diese Migration oder droppe Tabelle zuerst:

```sql
DROP TABLE IF EXISTS table_name CASCADE;
```

### Problem: RLS blockiert Queries

**Lösung:** Check policies:

```sql
-- Siehe alle Policies für eine Tabelle
SELECT * FROM pg_policies WHERE tablename = 'places';

-- Temporär RLS deaktivieren (nur für Testing!)
ALTER TABLE places DISABLE ROW LEVEL SECURITY;
```

### Problem: Slow queries

**Lösung:** Check `EXPLAIN ANALYZE`:

```sql
EXPLAIN ANALYZE
SELECT * FROM places WHERE city = 'Palma' LIMIT 20;
```

Ggf. Index hinzufügen:

```sql
CREATE INDEX idx_places_city ON places(city);
```

---

## 📚 Weitere Ressourcen

- [Supabase Docs](https://supabase.com/docs)
- [PostGIS Docs](https://postgis.net/documentation/)
- [PostgreSQL Performance](https://www.postgresql.org/docs/current/performance-tips.html)
- [RLS Best Practices](https://supabase.com/docs/guides/auth/row-level-security)


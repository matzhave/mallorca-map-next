# 🚀 Supabase Schema Deployment - Anleitung

## ✅ Einfachste Methode: Supabase Dashboard (5 Minuten)

### Schritt 1: Öffne SQL Editor
1. Gehe zu https://supabase.com/dashboard/project/fyoorhyebgihxykunvvt
2. Login mit `supabase@botzilla-studio.com` / `supabase@botzilla-studio.com`
3. Klicke links auf **SQL Editor**

### Schritt 2: Schema ausführen
1. Klicke auf **New Query**
2. Öffne die Datei `supabase/complete_schema.sql` in deinem Editor
3. Kopiere den **gesamten Inhalt** (CMD+A, CMD+C)
4. Füge ihn im SQL Editor ein (CMD+V)
5. Klicke auf **Run** (oder CMD+Enter)

### Schritt 3: Warten
- ⏳ Execution dauert ~30-60 Sekunden
- ✅ Du siehst grüne Häkchen wenn fertig
- ❌ Bei Fehlern siehst du rote Error Messages

### Schritt 4: Verifizieren
1. Klicke links auf **Table Editor**
2. Du solltest jetzt folgende Tabellen sehen:
   - categories
   - places
   - events
   - experiences
   - jobs
   - classifieds
   - community
   - news
   - business_profiles
   - business_subscriptions
   - business_plans
   - user_reviews
   - tags
   - user_favorites
   - analytics_events
   - (und mehr...)

3. Klicke auf **categories** → Du solltest 10 Hauptkategorien sehen

---

## 🔄 Alternative: Via Supabase CLI

```bash
# 1. Supabase CLI installieren
brew install supabase/tap/supabase

# 2. Login
supabase login

# 3. Project linken
supabase link --project-ref fyoorhyebgihxykunvvt

# 4. Schema deployen
supabase db push --db-url "postgresql://postgres.fyoorhyebgihxykunvvt:[PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"
```

**Problem:** Die exakte Connection URL muss aus dem Dashboard kopiert werden.

---

## 📞 Connection Details aus Dashboard holen

1. Gehe zu https://supabase.com/dashboard/project/fyoorhyebgihxykunvvt/settings/database
2. Unter **Connection string** → **URI** kopieren
3. Format: `postgresql://postgres.[REF]:[PASSWORD]@[HOST]:[PORT]/postgres`
4. Trage in `CREDENTIALS.md` ein (Zeile 23-24)

---

## ❓ Bei Problemen

**Error: "relation already exists"**
→ Schema wurde schon deployed. Entweder:
  - Tabellen droppen: `DROP TABLE IF EXISTS table_name CASCADE;`
  - Oder: Neue Datenbank erstellen im Dashboard

**Error: "permission denied"**
→ Check ob du mit Service Role Key verbunden bist

**Error: "extension does not exist"**
→ Extensions müssen evtl. manuell aktiviert werden:
  1. Dashboard → Database → Extensions
  2. Aktiviere: postgis, uuid-ossp, pg_trgm, unaccent

---

## ✅ Nach erfolgreichem Deployment

```bash
# TypeScript Types generieren
cd /Users/matthiasschmeisser/Library/Mobile\ Documents/com~apple~CloudDocs/Projects/mallorca-map-next
bun run generate:types
```

**Dann kann ich weitermachen mit der App-Entwicklung!** 🎉


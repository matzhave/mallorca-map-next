# 🔧 Monorepo Troubleshooting - Mallorca Map

> **Häufige Probleme und ihre professionellen Lösungen**

---

## ⚠️ WICHTIG: Entwicklungs-Prinzipien

**Bevor du ein Problem "umgehst"**, lies bitte:  
📖 [`DEVELOPMENT_PRINCIPLES.md`](./DEVELOPMENT_PRINCIPLES.md)

**TL;DR:** Keine Pfusch-Lösungen! Probleme werden an der Root Cause gelöst.

---

## 🔴 Problem #1: "Cannot find module '@repo/xyz'"

### Symptom:
```
Type error: Cannot find module '@repo/supabase' or its corresponding type declarations.
```

### Root Cause:
TypeScript kann Workspace-Packages nicht finden weil:
1. Package nicht als Dependency gelistet
2. Packages werden in falscher Reihenfolge gebaut
3. TypeScript paths nicht korrekt konfiguriert

### ✅ Professionelle Lösung:

#### Schritt 1: Explizite Dependencies
Wenn Package A Package B nutzt, **muss** B in A's `package.json` sein:

```json
// packages/shared/package.json
{
  "dependencies": {
    "@repo/supabase": "workspace:*"  // ← KRITISCH!
  }
}
```

#### Schritt 2: Package Exports
Jedes Package braucht korrekte `exports` in `package.json`:

```json
{
  "exports": {
    ".": "./src/index.ts",
    "./client": "./src/client.ts",
    "./types": "./src/types.ts"
  },
  "main": "./src/index.ts",
  "types": "./src/index.ts"
}
```

#### Schritt 3: Next.js Transpiling
In `apps/web/next.config.mjs`:

```javascript
const nextConfig = {
  // Transpile workspace packages
  transpilePackages: ['@repo/shared', '@repo/supabase'],
  
  // Webpack config for .ts imports
  webpack: (config) => {
    config.resolve.extensionAlias = {
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
      '.cjs': ['.cts', '.cjs'],
    };
    return config;
  },
};
```

#### Schritt 4: Verify Lokal
```bash
bun install  # Re-install dependencies
bun run build  # Should succeed
```

### ❌ FALSCHE "Lösungen":
- ❌ Relative Imports (`../../packages/shared/...`) - bricht Monorepo-Struktur
- ❌ Code duplizieren - verletzt DRY
- ❌ Package weglassen - fehlt dann später

---

## 🔴 Problem #2: "Module not found: Can't resolve '@repo/shared/i18n'"

### Symptom:
```
Module not found: Can't resolve '@repo/shared/i18n'
```

### Root Cause:
Deep imports (`@repo/shared/i18n/de.json`) funktionieren nicht out-of-the-box.

### ✅ Professionelle Lösung:

#### Option A: Re-export im Package (EMPFOHLEN)
```typescript
// packages/shared/src/index.ts
export { default as deTranslations } from './i18n/de.json';
export { default as enTranslations } from './i18n/en.json';
export { default as esTranslations } from './i18n/es.json';
```

Dann importieren:
```typescript
import { deTranslations } from '@repo/shared';
```

#### Option B: Wildcard Exports (für viele Files)
```json
// packages/shared/package.json
{
  "exports": {
    ".": "./src/index.ts",
    "./i18n/*": "./src/i18n/*.json"
  }
}
```

**Wichtig:** Braucht `resolveJsonModule: true` in `tsconfig.json`!

---

## 🔴 Problem #3: Next.js 15 "params is not a Promise"

### Symptom:
```
Type 'Promise<{ lang: string; }>' is not assignable to '{ lang: string; }'
```

### Root Cause:
Next.js 15 hat **Breaking Change**: `params` und `searchParams` sind jetzt Promises!

### ✅ Professionelle Lösung:

```typescript
// ❌ FALSCH (Next.js 14)
export default async function Page({
  params
}: {
  params: { lang: string };
}) {
  const { lang } = params;
}

// ✅ RICHTIG (Next.js 15)
export default async function Page({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;  // ← await!
}
```

**Gilt für:**
- `page.tsx` - params & searchParams
- `layout.tsx` - params
- `route.ts` (API Routes) - params

---

## 🔴 Problem #4: PostGIS "geography type does not exist"

### Symptom:
```
ERROR: type "geography" does not exist
```

### Root Cause:
PostGIS Extension wurde nicht aktiviert oder ist im falschen Schema.

### ✅ Professionelle Lösung:

#### Schritt 1: Extension aktivieren (Supabase Dashboard)
1. Dashboard → Database → Extensions
2. Suche "postgis"
3. Toggle **ON** (im `public` Schema!)

#### Schritt 2: search_path setzen (SQL)
```sql
ALTER DATABASE postgres SET search_path TO public, extensions;
SET search_path TO public, extensions;
```

#### Schritt 3: gen_random_uuid() nutzen (nicht uuid_generate_v4)
```sql
-- ❌ FALSCH (braucht uuid-ossp extension)
id uuid PRIMARY KEY DEFAULT uuid_generate_v4()

-- ✅ RICHTIG (Postgres 13+ built-in)
id uuid PRIMARY KEY DEFAULT gen_random_uuid()
```

**Warum?** `gen_random_uuid()` ist in Postgres built-in, keine Extension nötig!

---

## 🔴 Problem #5: Build funktioniert lokal, aber nicht auf Server

### Symptom:
```bash
# Lokal:
bun run build  # ✅ Erfolg

# Server (GitHub Actions):
bun run build  # ❌ Fehler
```

### Root Cause:
- Unterschiedliche Bun/Node Versionen
- Fehlende Dependencies auf Server
- Environment Variables fehlen
- Cache-Probleme

### ✅ Professionelle Lösung:

#### Check 1: Dependencies
```bash
# Auf Server (SSH):
cd /app/mallorca-map-next
bun install  # Alle dependencies neu installieren
```

#### Check 2: Turbo Cache löschen
```bash
bun run clean
rm -rf apps/web/.next
bun run build
```

#### Check 3: Environment Variables
```bash
# Server braucht .env.local Files!
cat apps/web/.env.local
# Sollte SUPABASE_URL enthalten
```

#### Check 4: TypeScript Config
```json
// packages/shared/tsconfig.json
{
  "compilerOptions": {
    "resolveJsonModule": true,  // ← Für JSON imports!
    "esModuleInterop": true
  }
}
```

---

## 🔴 Problem #6: "duplicate key value violates unique constraint"

### Symptom (bei Supabase Migrations):
```
ERROR: duplicate key value violates unique constraint "categories_pkey"
```

### Root Cause:
Migration wurde teilweise ausgeführt und dann abgebrochen.

### ✅ Professionelle Lösung:

#### Option A: Idempotente Migrations (EMPFOHLEN)
```sql
-- Statt einfachem INSERT:
INSERT INTO categories (...) VALUES (...);

-- Nutze ON CONFLICT:
INSERT INTO categories (...) VALUES (...)
ON CONFLICT (slug) DO UPDATE SET
  name_de = EXCLUDED.name_de,
  updated_at = now();
```

#### Option B: TRUNCATE vor INSERT (für Seed Data)
```sql
-- Nur für initialen Seed Data!
TRUNCATE TABLE categories CASCADE;
INSERT INTO categories (...) VALUES (...);
```

#### Option C: Fresh Database
1. Supabase Dashboard → Settings → General
2. Delete Project (oder Pause + Reset)
3. Neues Projekt erstellen
4. Migrations von Grund auf deployen

**Wichtig:** Option C nur wenn A & B nicht funktionieren!

---

## 📋 Deployment Checklist

**Vor JEDEM git push:**

- [ ] `bun install` ausgeführt
- [ ] `bun run build` erfolgreich lokal ✅
- [ ] `bun run type-check` ohne Errors ✅
- [ ] `bun run lint` ohne Warnings ✅
- [ ] `.env.local` Files korrekt (nicht committed!)
- [ ] Dependencies in `package.json` aktuell
- [ ] Turbo Cache gelöscht (`bun run clean`)

---

## 🛠️ Debug Commands

### Monorepo Dependencies prüfen:
```bash
# Zeige alle workspace dependencies
bun pm ls --all

# Zeige spezifisches Package
bun pm ls @repo/supabase
```

### TypeScript Module Resolution testen:
```bash
cd apps/web
node -e "console.log(require.resolve('@repo/supabase'))"
# Sollte Pfad zu packages/supabase/src/index.ts zeigen
```

### Turbo Cache analysieren:
```bash
turbo run build --dry-run
# Zeigt welche Tasks gecached sind
```

### Next.js Build Debug:
```bash
cd apps/web
DEBUG=* next build 2>&1 | grep -i "module\|error"
```

---

## 📚 Weitere Hilfe

- **Turbo Docs:** https://turbo.build/repo/docs
- **Next.js Monorepo:** https://nextjs.org/docs/app/building-your-application/configuring/monorepo
- **Bun Workspaces:** https://bun.sh/docs/install/workspaces

---

**Letzte Aktualisierung:** 18. Oktober 2024  
**Bei neuen Problemen:** Dokumentiere sie hier!


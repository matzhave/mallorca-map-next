# 🎯 Mallorca Map - Entwicklungs-Prinzipien

> **Diese Prinzipien sind NICHT verhandelbar. Sie definieren wie wir dieses Projekt bauen.**

---

## 🏆 Kern-Prinzipien

### 1. **Keine Kompromisse. Niemals.**

❌ **NIEMALS:**
- Pfusch-Lösungen wählen, nur weil etwas nicht sofort funktioniert
- Abkürzungen nehmen, die später Probleme verursachen
- "Quick Fixes" die technische Schulden erzeugen
- Workarounds implementieren statt Root Cause zu lösen

✅ **IMMER:**
- Die professionelle, skalierbare Lösung wählen
- State-of-the-Art Best Practices folgen
- Bei Problemen: Ursache finden und richtig lösen
- Langfristig denken, nicht kurzfristig

### 2. **Qualität vor Geschwindigkeit**

> "Wenn es einen richtigen Weg gibt und einen schnellen Weg - wir gehen den richtigen."

- Code muss wartbar, testbar und dokumentiert sein
- Performance-Optimierungen von Anfang an
- Skalierbarkeit ist Pflicht, nicht optional
- Security ist nicht verhandelbar

### 3. **Probleme lösen, nicht umgehen**

Wenn etwas nicht funktioniert:

1. **Analysieren:** Was ist die Root Cause?
2. **Recherchieren:** Wie lösen es Profis?
3. **Implementieren:** Die beste Lösung, auch wenn komplex
4. **Dokumentieren:** Warum und wie

**Beispiel aus diesem Projekt:**
- Problem: PostGIS `geography` Type nicht gefunden
- ❌ Falsch: Einfach `latitude/longitude` Spalten nutzen (funktioniert, aber nicht optimal)
- ✅ Richtig: PostGIS korrekt konfigurieren (extensions Schema, search_path, etc.)

### 4. **Konsistenz über alles**

- **Ein** Weg für Auth (Supabase Auth)
- **Ein** State Management Pattern
- **Ein** Styling System (Tailwind + shadcn/ui)
- **Ein** Daten-Fetching Pattern (Supabase Client)

Keine Mixe aus verschiedenen Ansätzen!

---

## 📐 Architektur-Prinzipien

### Monorepo Structure

```
✅ Shared Package: Alles was Web UND Mobile nutzen
  - Types, Constants, Utils
  - Business Logic
  - Queries (Query Builder, nicht direkte Calls)
  - i18n Translations

✅ App-Specific: UI, Routing, Platform-spezifisch
  - Web: React Components (HTML/CSS)
  - Mobile: React Native Components (Views)
```

### Database Design

- **Normalisierung:** 3NF Standard, gezielte Denormalisierung nur für Performance
- **Indexing:** Composite Indexes für häufige Query-Patterns
- **RLS:** Row Level Security auf ALLEN Tabellen
- **Types:** PostGIS für Geo, JSONB für flexible Daten
- **Migrations:** Versioniert, idempotent, dokumentiert

### Code Quality

```typescript
// ❌ SCHLECHT: Keine Types, kryptische Namen
const d = await db.from('t').select('*');

// ✅ GUT: Type-safe, beschreibend, dokumentiert
const { data: activeRestaurants, error } = await supabase
  .from('places')
  .select('id, title, rating, coordinates')
  .eq('category_id', categoryId)
  .eq('is_active', true)
  .order('rating', { ascending: false })
  .limit(20);
```

---

## 🔐 Security-First

### Authentication
- Supabase Auth (Battle-tested, secure)
- JWT Tokens (httpOnly cookies)
- RLS Policies (Defense in Depth)

### Data Validation
- Input Validation auf Server UND Client
- Sanitization für User-Generated Content
- Rate Limiting auf allen Public Endpoints

### Privacy (DSGVO)
- Email-Hashes statt Klartext
- IP-Anonymisierung nach 30 Tagen
- User kann Daten exportieren & löschen
- Opt-in für Tracking

---

## 🚀 Performance-First

### Optimization Hierarchy

1. **Database Level**
   - Indexes auf häufig gefilterte Spalten
   - Denormalisierte Counts (view_count, review_count)
   - Partitioned Tables (analytics_events)
   - Query Optimization (EXPLAIN ANALYZE)

2. **API Level**
   - Edge Functions für Compute
   - Caching (Redis, CDN)
   - Pagination überall
   - Rate Limiting

3. **Frontend Level**
   - Next.js ISR/SSR
   - Image Optimization
   - Code Splitting
   - Lazy Loading

### Performance Budgets

- **Lighthouse Score:** >90 (Mobile & Desktop)
- **LCP:** <2.5s
- **FID:** <100ms
- **CLS:** <0.1
- **Bundle Size:** <200KB (Initial)

---

## 📊 Skalierbarkeit

### Von Tag 1 designed für:

- **100.000+ Einträge** (Places, Events, etc.)
- **1.000.000+ Reviews**
- **10.000+ concurrent Users**
- **100+ req/s** ohne Performance-Degradation

### Wie erreichen wir das?

- ✅ Database Indexes (GIN, GIST, Composite)
- ✅ Partitioned Tables (Analytics)
- ✅ CDN für Static Assets
- ✅ Redis für Caching
- ✅ Edge Functions für Compute
- ✅ Horizontal Scaling (Supabase, Hetzner)

---

## 🧪 Testing-Kultur

### Was wir testen:

- **Unit Tests:** Utils, Helpers, Pure Functions (Vitest)
- **Integration Tests:** API Routes, DB Queries
- **E2E Tests:** Kritische Flows (Playwright)
  - Claim Flow (5 Steps)
  - Search & Filter
  - Detail Page Load
  - Review Submission

### Coverage Goals:

- Utils: >90%
- Queries: >80%
- Components: >70%
- E2E: Kritische Paths 100%

---

## 📚 Dokumentation

### Jede Feature braucht:

1. **Code Comments:** Warum, nicht Was
2. **JSDoc:** Für Public APIs
3. **README:** Für komplexe Module
4. **Architecture Docs:** Für Design Decisions

### Beispiel:

```typescript
/**
 * Calculate distance between two points using Haversine formula
 * 
 * @param lat1 - Latitude of first point (decimal degrees)
 * @param lng1 - Longitude of first point (decimal degrees)
 * @param lat2 - Latitude of second point (decimal degrees)
 * @param lng2 - Longitude of second point (decimal degrees)
 * @returns Distance in meters
 * 
 * @example
 * calculateDistance(39.5696, 2.6502, 39.6953, 3.0176)
 * // returns ~39000 (39km between Palma and Magaluf)
 * 
 * @see https://en.wikipedia.org/wiki/Haversine_formula
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  // Implementation...
}
```

---

## 🎨 Design System

### Farben

```css
--primary: #1DAAB9 (Türkis - rgb(29, 170, 185))
--secondary: #FFF5E6 (Beige/Crema - rgb(255, 245, 230))
```

**Hero Gradient:**
```
bg-gradient-to-br from-primary/10 via-secondary to-primary/5
```
*Von mallorca-map.com übernommen - sanfter Verlauf*

### Typography

- **Font:** Inter (Variable Font)
- **Scale:** Fluid Typography (clamp)
- **Line Height:** 1.5 (Body), 1.2 (Headings)

### Spacing

- **Scale:** 4px Base (0.25rem)
- **Container:** max-w-7xl (1280px)
- **Grid:** 12 Columns

### Components

- **shadcn/ui** für Web (Radix-based, Accessible)
- **NativeWind** für Mobile (Tailwind-syntax)
- **Consistent Props API** (alle Components)

---

## 🔄 Development Workflow

### Git Workflow

```bash
# Feature Branch
git checkout -b feature/new-feature

# Entwickeln, committen (conventional commits)
git commit -m "feat(web): add homepage hero section"
git commit -m "fix(shared): correct slug generation for Spanish"

# Type-Check & Lint BEVOR Push
bun run type-check
bun run lint

# Push
git push origin feature/new-feature

# PR → Review → Merge to main → Auto-Deploy
```

### Code Review Checklist

- [ ] TypeScript Errors: 0
- [ ] ESLint Warnings: 0
- [ ] Tests: Alle grün
- [ ] Performance: Keine Regressions
- [ ] Security: Keine neuen Vulnerabilities
- [ ] Accessibility: WCAG 2.1 AA
- [ ] Dokumentation: Updated

---

## 🚨 Was wir NIEMALS tun

### ❌ Anti-Patterns

1. **`any` Type verwenden** → Immer typen!
2. **Inline Styles** → Tailwind Classes nutzen
3. **Direct DB Access im Frontend** → Immer über Queries
4. **Secrets im Code** → Env Variables
5. **console.log in Production** → Proper Logging (Sentry)
6. **Unvalidated User Input** → Zod/Validation Libraries
7. **Missing Error Handling** → Try-Catch, Error Boundaries
8. **Hardcoded Strings** → i18n Keys
9. **Magic Numbers** → Named Constants
10. **Copy-Paste Code** → DRY Principle

---

## 🎓 Lernen & Verbessern

### Wenn du auf ein Problem stößt:

1. **Verstehe das Problem** (5-10 Min Recherche)
2. **Finde die Best Practice** (Dokumentation lesen)
3. **Implementiere richtig** (auch wenn länger dauert)
4. **Dokumentiere die Lösung** (für Zukunft)

### Tech Debt Management

- **NIEMALS:** "Ich fixe es später"
- **IMMER:** Jetzt richtig machen ODER
- **Ticket erstellen** mit klarer Beschreibung & Priorität

---

## 📋 Definition of Done

### Eine Feature ist FERTIG wenn:

- ✅ Funktioniert in allen 3 Sprachen (DE/EN/ES)
- ✅ Funktioniert auf Web UND Mobile (wenn applicable)
- ✅ TypeScript kompiliert ohne Errors
- ✅ Tests vorhanden und grün
- ✅ Responsive (Mobile, Tablet, Desktop)
- ✅ Accessible (Keyboard Navigation, Screen Reader)
- ✅ Dokumentiert (Code Comments, README wenn nötig)
- ✅ Performant (kein Lazy Loading Fehler, optimierte Queries)
- ✅ Secure (Input Validation, RLS Policies)
- ✅ Deployed zu Staging & getestet

---

## 💪 Warum diese Prinzipien?

> **"Wir bauen Mallorca Map nicht für heute, sondern für die nächsten 10 Jahre."**

### Langfristige Vision:

- **100.000+ Users/Monat**
- **1.000+ Business Subscriptions**
- **10.000+ Einträge** (Places, Events, Tours)
- **Erweiterbar** (neue Kategorien, Features, Sprachen)
- **Wartbar** (Team kann in 2 Jahren noch verstehen)
- **Skalierbar** (von Mallorca → Ibiza, Menorca, etc.)

**Deshalb:** Jede Entscheidung heute beeinflusst unseren Erfolg morgen.

---

## ✅ Commitment

**Jeder der an diesem Projekt arbeitet committed sich:**

1. Diesen Prinzipien zu folgen
2. Code Reviews ernst zu nehmen
3. Bei Unsicherheit zu fragen, nicht zu raten
4. Probleme zu lösen, nicht zu verstecken
5. Qualität über Quantität

---

**Letzte Aktualisierung:** 18. Oktober 2024  
**Status:** AKTIV & BINDEND für alle Contributors


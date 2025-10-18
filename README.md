# 🗺️ Mallorca Map - Full-Stack Monorepo

> **Die #1 Plattform für Mallorca - Touren, Events, Restaurants, Jobs & mehr**

**Status:** 🚧 In aktiver Entwicklung  
**Tech Stack:** Next.js 15 + React Native Expo + Supabase  
**Sprachen:** Deutsch, English, Español

---

## ⚠️ WICHTIG: Entwicklungs-Prinzipien

**Dieses Projekt wird nach höchsten Qualitätsstandards entwickelt:**

✅ **Keine Kompromisse** - Professionell, skalierbar, wartbar  
✅ **State-of-the-Art** - Moderne Best Practices  
✅ **Langfristig** - Gebaut für 10+ Jahre  

📖 **Vollständige Prinzipien:** [`DEVELOPMENT_PRINCIPLES.md`](./DEVELOPMENT_PRINCIPLES.md)

---

## 🏗️ Architektur

Modern Turborepo setup für Mallorca Map mit Next.js (Web) und React Native (Mobile).

## Struktur

```
mallorca-map-next/
├── apps/
│   ├── web/              # Next.js 15 Web App
│   └── mobile/           # React Native Expo App
├── packages/
│   ├── typescript-config/  # Shared TS Configs
│   ├── supabase/          # Shared Supabase Client + Types
│   └── shared/            # Common Utils, i18n
└── turbo.json
```

## Setup

```bash
# Dependencies installieren
bun install

# Beide Apps parallel starten
bun run dev

# Build (production)
bun run build
```

## Apps

- **Web**: Next.js 15 mit App Router, SSR/ISR, Tailwind CSS, shadcn/ui
- **Mobile**: React Native Expo mit NativeWind

## Shared Packages

- `@repo/typescript-config`: TypeScript Konfigurationen
- `@repo/supabase`: Supabase Client & Types
- `@repo/shared`: Utils, Helpers, i18n

## Environment

### Lokal (Development)
Erstelle `.env.local` in `apps/web/` und `apps/mobile/`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tjmorebgbxfqyxketbwr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**Wichtig:** `.env.local` ist in `.gitignore` und wird nie committed!

### Staging/Production Server
`.env.local` ist **dauerhaft auf dem Server** unter:
- `/app/mallorca-map-next/apps/web/.env.local`

**Secrets ändern?** Siehe [`DEPLOYMENT.md`](./DEPLOYMENT.md) → "Secrets/Environment Variables ändern"

## Tech Stack

- **Monorepo**: Turborepo
- **Web**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **Mobile**: React Native, Expo, NativeWind
- **Backend**: Supabase
- **Package Manager**: Bun

---

## 🚀 Deployment

### Staging Environment

**URL:** `https://staging.mallorca-map.com`  
**Auth:** `admin / 9963`

### ⚠️ WICHTIGSTE REGEL: NUR DU MACHST GIT PUSH!

Warum? Das Deployment geht **AUTOMATISCH LIVE** nach Push!
- ❌ **Claude darf NICHT** `git push` machen
- ✅ **NUR du entscheidest** wann live deployed wird

### Deployment Flow (⭐ READ THIS!)

```
📌 SCHRITT 1️⃣: Claude arbeitet
├─ Code entwickeln & testen
├─ Lokal testen: bun run build ✅
└─ Git commits vorbereiten (ABER NICHT PUSHEN!)

📌 SCHRITT 2️⃣: Du reviewst & entscheidest
├─ "Sieht gut aus!"
└─ Du machst: git push origin main

📌 SCHRITT 3️⃣: GitHub Actions (automatisch)
├─ bun install
├─ bun run build
├─ sudo systemctl restart
└─ ✅ Live!

📌 SCHRITT 4️⃣: Claude (optional)
└─ Health-Checks & Report
```

### Deploy durchführen

```bash
# 1. Claude entwickelt & committet (lokal)
git add .
git commit -m "feature: xyz"

# 2. Claude sagt: "Bereit zum Push!"

# 3. DU SELBST machst den Push:
git push origin main

# 4. GitHub Actions läuft automatisch
# ✅ Website ist live!
```

**Das war's!** Deployment ist vollautomatisch über GitHub Actions.

---

## 📚 Dokumentation

### 🔴 **PFLICHTLEKTÜRE:**
- **`DEVELOPMENT_PRINCIPLES.md`** - Entwicklungs-Prinzipien (BINDEND!)
- **`.cursorrules`** - Cursor AI Rules mit Prinzipien

### Technische Dokumentation:
- **`ARCHITECTURE.md`** - Tiefe technische Doku
- **`QUICKSTART.md`** - Schnelleinstieg für Entwickler
- **`DEPLOYMENT.md`** - Detaillierte Deployment-Anleitung
- **`MONOREPO_GUIDE.md`** - Monorepo Best Practices
- **`MONOREPO_TROUBLESHOOTING.md`** - 🔧 **Häufige Probleme & Lösungen** (NEU!)
- **`supabase/README.md`** - Datenbank Schema & Migrations

### Deployment:
- **`.github/workflows/deploy-staging.yml`** - GitHub Actions Config
- **`deploy/SSH_SETUP.md`** - SSH für Ausnahmefälle
- **`deploy/STAGING_AUTH.md`** - Staging Environment Auth

---

## 🧪 Testing

```bash
# Type-Check
bun run type-check

# Linting
bun run lint

# Full Build
bun run build

# Clean Build
bun run clean
```

---

## 🆘 Support

- Schau in `QUICKSTART.md` für häufige Aufgaben
- Lese `ARCHITECTURE.md` für technische Details
- Check `DEPLOYMENT.md` für Deployment-Details
- SSH Issues: `deploy/SSH_SETUP.md`


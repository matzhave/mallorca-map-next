# Mallorca Map Next - Monorepo

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

Erstelle `.env.local` in `apps/web/` und `apps/mobile/`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://ayetwgaainiskwqvgubd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

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
**Auth:** `staging / 9963`

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

- **`.cursorrules`** - Cursor AI Richtlinien & Tech Stack
- **`ARCHITECTURE.md`** - Tiefe technische Doku
- **`QUICKSTART.md`** - Schnelleinstieg für Entwickler
- **`DEPLOYMENT.md`** - Detaillierte Deployment-Anleitung
- **`.github/workflows/deploy-staging.yml`** - GitHub Actions Config
- **`deploy/SSH_SETUP.md`** - SSH für Ausnahmefälle

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


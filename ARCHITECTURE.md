# Mallorca Map - Architektur & Systeme

Vollständige Dokumentation aller Systeme, die in diesem Projekt verwendet werden.

---

## 📚 Inhaltsverzeichnis

1. [Monorepo Struktur](#monorepo-struktur)
2. [Web App (Next.js 15)](#web-app-nextjs-15)
3. [Mobile App (React Native + Expo)](#mobile-app-react-native--expo)
4. [Shared Packages](#shared-packages)
5. [Build System (Turborepo)](#build-system-turborepo)
6. [Styling (Tailwind + shadcn/ui)](#styling-tailwind--shadcnui)
7. [Internationalisierung (i18n)](#internationalisierung-i18n)
8. [Backend (Supabase)](#backend-supabase)
9. [Deployment](#deployment)

---

## Monorepo Struktur

### Was ist ein Monorepo?

Ein **Monorepo** ist ein einzelnes Git Repository, das mehrere in sich geschlossene Projekte (Apps + Packages) enthält. Vorteile:

✅ **Code Sharing:** Shared Code zwischen Web und Mobile  
✅ **Atomic Commits:** Alle Dependencies zusammen updaten  
✅ **Single Source of Truth:** Eine Quelle für Übersetzungen, Utils, etc.  
✅ **Optimierte Builds:** Nur betroffene Packages rebuilden  

### Arbeitsbereich-Struktur

```
mallorca-map-next/                    # ROOT WORKSPACE
├── apps/                             # Standalone Applications
│   ├── web/                         # 🌐 Web App (Next.js)
│   │   └── package.json            # "@repo/web"
│   └── mobile/                      # 📱 Mobile App (Expo)
│       └── package.json            # "@repo/mobile"
│
├── packages/                         # Shared Code Libraries
│   ├── shared/                      # 📦 Common Utils & i18n
│   │   └── package.json            # "@repo/shared"
│   ├── supabase/                    # 🗄️ DB Client
│   │   └── package.json            # "@repo/supabase"
│   └── typescript-config/           # ⚙️ TS Configs
│       └── package.json            # "@repo/typescript-config"
│
├── package.json                     # ROOT Config
├── turbo.json                       # Turborepo Pipeline
└── bun.lock                         # Dependency Lock
```

### Workspace Dependencies

```json
// apps/web/package.json
{
  "dependencies": {
    "@repo/shared": "workspace:*",
    "@repo/supabase": "workspace:*"
  }
}

// apps/mobile/package.json
{
  "dependencies": {
    "@repo/shared": "workspace:*",
    "@repo/supabase": "workspace:*"
  }
}
```

Die `workspace:*` Referenzen verlinken auf lokale Packages statt externe npm-Packages.

---

## Web App (Next.js 15)

### Was ist Next.js?

**Next.js** ist ein React Framework für Production mit:
- **SSR** (Server-Side Rendering): Seiten auf dem Server rendern
- **ISR** (Incremental Static Regeneration): Statische Seiten dynamisch updaten
- **File-based Routing:** Keine Router-Konfiguration nötig
- **API Routes:** Backend im gleichen Projekt

### App Router vs Pages Router

Dieses Projekt nutzt den **App Router** (neueste Methode):

```
apps/web/src/app/
├── layout.tsx              # Root Layout
├── [lang]/                 # Dynamic Segment (de, en, es)
│   ├── layout.tsx         # Sprach-spezifisches Layout
│   └── page.tsx           # Index-Seite (/de, /en, /es)
└── globals.css            # Globale Styles
```

### SSR vs ISR vs SSG

| Methode | Wann rendern | Wann cachen | Use-Case |
|---------|--------------|-------------|----------|
| **SSR** | Bei jedem Request | Nicht gecacht | Personalisierte Inhalte |
| **ISR** | On-demand | Für X Sekunden | Blog Posts, Product Pages |
| **SSG** | Build-Zeit | Permanent | Landing Pages |

### Dynamic Routing mit [lang]

```typescript
// apps/web/src/app/[lang]/layout.tsx

export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export default function LanguageLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}
```

Dies generiert statische Seiten für `/de`, `/en`, und `/es` beim Build.

### Wichtige Next.js Konzepte

#### 1. Server Components (Standard)
```typescript
// ✅ Server Component - Läuft auf dem Server
export default async function ServerComponent() {
  const data = await fetch('...'); // ✅ Möglich auf Server
  return <div>{data}</div>;
}
```

#### 2. Client Components
```typescript
// ❌ Client Component - Muss explizit markiert sein
'use client';

import { useState } from 'react';

export function ClientComponent() {
  const [count, setCount] = useState(0); // ✅ Nur im Client
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

#### 3. Metadata
```typescript
// SEO & Social Media
export const metadata: Metadata = {
  title: 'Mallorca Map',
  description: 'Dein Guide für Mallorca',
  openGraph: {
    title: 'Mallorca Map',
    description: '...',
    images: ['/og-image.jpg'],
  },
};
```

### Performance Optimierungen

#### Image Optimization
```typescript
import Image from 'next/image';

export function OptimizedImage() {
  return (
    <Image
      src="/image.jpg"
      alt="Description"
      width={400}
      height={300}
      priority // Lazy-load Bilder
    />
  );
}
```

#### Code Splitting
```typescript
// Nur laden wenn nötig
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./Heavy'), {
  loading: () => <div>Loading...</div>,
});
```

---

## Mobile App (React Native + Expo)

### Was ist React Native?

**React Native** ist ein Framework um Apps mit JavaScript für iOS + Android zu schreiben.

**Expo** ist eine Plattform die React Native Development vereinfacht:
- 📱 Live Reload
- 🛠️ Built-in Dev Tools
- 🚀 Easy Publishing
- 🔧 Keine Native Code nötig

### Native Stack Navigator

```typescript
// apps/mobile/app/_layout.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="index" component={HomeScreen} />
        <Stack.Screen name="details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### NativeWind (Tailwind für Mobile)

**NativeWind** bringt Tailwind CSS zu React Native:

```typescript
// ✅ Tailwind Classes funktionieren auf Mobile
import { View, Text } from 'react-native';

export function Card() {
  return (
    <View className="bg-white p-4 rounded-lg shadow-md">
      <Text className="text-lg font-bold text-primary">Title</Text>
      <Text className="text-gray-600">Description</Text>
    </View>
  );
}
```

### Unterschiede Web vs Mobile

| Feature | Web | Mobile |
|---------|-----|--------|
| HTML | Ja | Nein (Native Views) |
| CSS | Ja | Nur Tailwind via NativeWind |
| Navigation | URL-based | Stack Navigator |
| Storage | localStorage | Async Storage |
| Network | Fetch | Fetch + React Query |
| Gestures | Click/Hover | Swipe/Pinch/LongPress |

---

## Shared Packages

### @repo/shared

**Enthält:** Utils, Helpers, Internationalisierung

#### i18n (Internationalisierung)

```
packages/shared/src/i18n/
├── de.json    # Deutsch
├── en.json    # English
└── es.json    # Español
```

**Format:**
```json
{
  "home.title": "Willkommen bei Mallorca Map",
  "home.subtitle": "Dein Guide für Mallorca",
  "nav.activities": "Erlebnisse",
  "nav.events": "Events",
  "nav.guide": "Guide"
}
```

**Verwendung (Web):**
```typescript
import { useTranslations } from 'next-intl';

export function HomePage() {
  const t = useTranslations();
  
  return (
    <div>
      <h1>{t('home.title')}</h1>
      <p>{t('home.subtitle')}</p>
    </div>
  );
}
```

#### Utils

```typescript
// packages/shared/src/utils/date.ts
export function formatDate(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale).format(date);
}

// packages/shared/src/utils/string.ts
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
```

**Verwendung:**
```typescript
import { formatDate, slugify } from '@repo/shared';

const formatted = formatDate(new Date(), 'de');
const slug = slugify('Meine Event Title');
```

### @repo/supabase

**Enthält:** Supabase Client Init + Generated Types

```typescript
// packages/supabase/src/client.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// packages/supabase/src/types.ts
// Auto-generated from Supabase database
export interface Database {
  public: {
    Tables: {
      activities: { /* ... */ };
      events: { /* ... */ };
    };
  };
}
```

**Verwendung:**
```typescript
import { supabase } from '@repo/supabase';

const { data, error } = await supabase
  .from('activities')
  .select('*')
  .limit(10);
```

### @repo/typescript-config

**Enthält:** Gemeinsame TypeScript Konfigurationen

```json
// packages/typescript-config/base.json
{
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  }
}

// packages/typescript-config/nextjs.json
{
  "extends": "./base.json",
  "compilerOptions": {
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "preserve"
  }
}
```

**Verwendung:**
```json
// apps/web/tsconfig.json
{
  "extends": "@repo/typescript-config/nextjs.json"
}
```

---

## Build System (Turborepo)

### Was ist Turborepo?

**Turborepo** ist ein High-Performance Build System für Monorepos:
- 🚀 Parallele Task-Execution
- 💾 Intelligente Caching
- 📊 Build-Zeit Tracking
- 🔄 Dependency-aware Execution

### Task Pipeline

```json
// turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "type-check": {
      "dependsOn": ["^type-check"]
    }
  }
}
```

**Bedeutung:**
- `dependsOn: ["^build"]` = Erst die Dependencies builden
- `outputs: [...]` = Diese Dateien cachen
- `cache: false` = Nicht cachen (für dev)
- `persistent: true` = Dev Server läuft dauerhaft

### Execution Flow

```
bun run build
  ├─ packages/typescript-config:build
  ├─ packages/shared:build
  ├─ packages/supabase:build
  │  └─ apps/web:build (wartet auf packages)
  └─ apps/mobile:build (wartet auf packages)
```

### Commands

```bash
# Parallel alle Dev Server starten
bun run dev

# Parallel alle Apps builden
bun run build

# Lint in allen Packages
bun run lint

# Type-Check in allen Packages
bun run type-check

# Clean Build Artifacts
bun run clean
```

---

## Styling (Tailwind + shadcn/ui)

### Was ist Tailwind CSS?

**Tailwind CSS** ist ein Utility-First CSS Framework:

```html
<!-- Statt Custom CSS -->
<style>
  .card { background: white; padding: 1rem; border-radius: 0.5rem; }
</style>
<div class="card">...</div>

<!-- Tailwind: Direkt HTML Classes -->
<div class="bg-white p-4 rounded-lg">...</div>
```

**Vorteile:**
- ✅ Schneller zu schreiben
- ✅ Konsistente Design Tokens
- ✅ Kleinere CSS Bundles (nur genutzte Classes)
- ✅ Responsive Design Built-in
- ✅ Dark Mode Support

### Tailwind Konfiguration

```typescript
// tailwind.config.ts
const config: Config = {
  darkMode: ['class'], // dark: prefix nutzen
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#14B8C4',      // Teal
        secondary: '#F4EDE4',    // Beige
        accent: '#FF6B6B',       // Red
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
```

### Responsive Design

```html
<!-- Mobile first! -->
<div class="text-sm md:text-base lg:text-lg">
  Dieser Text ist auf Mobile klein, Tablet mittel, Desktop groß
</div>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <!-- 1 Spalte Mobile, 2 Spalten Tablet, 3 Desktop -->
</div>

<div class="hidden md:block">
  <!-- Nur auf Tablet+ sichtbar -->
</div>
```

### Breakpoints

```
sm: 640px    (Small phones)
md: 768px    (Tablets)
lg: 1024px   (Laptops)
xl: 1280px   (Desktops)
2xl: 1536px  (Large screens)
```

### shadcn/ui

**shadcn/ui** sind vorgefertigte, komponierbare React Components:

```typescript
// Komponenten importieren von @/components/ui/
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export function MyComponent() {
  return (
    <Card>
      <h2>Mein Card</h2>
      <Input placeholder="Gib was ein" />
      <Button>Speichern</Button>
    </Card>
  );
}
```

**Verfügbare Components:**
- Button
- Card
- Input
- Dialog
- Dropdown Menu
- Tabs
- Alert
- Badge
- Skeleton
- Und mehr...

---

## Internationalisierung (i18n)

### next-intl Library

**next-intl** ist ein i18n Library spezialisiert auf Next.js:

```typescript
// apps/web/src/i18n.ts
import { getRequestConfig } from 'next-intl/server';
import { deTranslations, enTranslations } from '@repo/shared';

export const locales = ['de', 'en', 'es'] as const;

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !locales.includes(locale as any)) {
    locale = 'de'; // Fallback zu Deutsch
  }

  const messages =
    locale === 'de'
      ? deTranslations
      : locale === 'en'
        ? enTranslations
        : esTranslations;

  return { messages, locale };
});
```

### URL Structure

```
https://mallorca-map.com/de        → Deutsch
https://mallorca-map.com/en        → English
https://mallorca-map.com/es        → Español
```

### In Komponenten nutzen

```typescript
'use client';

import { useTranslations } from 'next-intl';

export function Navigation() {
  const t = useTranslations();

  return (
    <nav>
      <a href="/activities">{t('nav.activities')}</a>
      <a href="/events">{t('nav.events')}</a>
      <a href="/guide">{t('nav.guide')}</a>
    </nav>
  );
}
```

### Neue Sprachen hinzufügen

1. **Neue JSON-Datei:** `packages/shared/src/i18n/fr.json`
2. **Strings hinzufügen:**
   ```json
   {
     "home.title": "Bienvenue à Mallorca Map",
     "nav.activities": "Activités"
   }
   ```
3. **Locale hinzufügen:**
   ```typescript
   export const locales = ['de', 'en', 'es', 'fr'] as const;
   ```
4. **Routing Update:**
   ```typescript
   export function generateStaticParams() {
     return locales.map((locale) => ({ lang: locale }));
   }
   ```

---

## Backend (Supabase)

### Was ist Supabase?

**Supabase** ist ein open-source Firebase Alternative mit:
- **PostgreSQL Database:** Vollständiges relationales DB
- **Realtime API:** Echtzeit-Updates
- **Authentication:** Built-in User Management
- **Storage:** File Upload & Management
- **Vector Search:** AI-powered Search

### Database Structure (Beispiel)

```sql
-- activities table
CREATE TABLE activities (
  id UUID PRIMARY KEY,
  title VARCHAR,
  description TEXT,
  category VARCHAR,
  location POINT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- events table
CREATE TABLE events (
  id UUID PRIMARY KEY,
  title VARCHAR,
  date DATE,
  time TIME,
  location VARCHAR,
  price DECIMAL,
  created_at TIMESTAMP
);
```

### Client Usage

```typescript
import { supabase } from '@repo/supabase';

// READ
const { data, error } = await supabase
  .from('activities')
  .select('*')
  .eq('category', 'hiking')
  .limit(10);

// CREATE
const { data, error } = await supabase
  .from('activities')
  .insert([
    {
      title: 'Wanderung',
      description: 'Schöne Wanderung...',
      category: 'hiking',
    },
  ]);

// UPDATE
const { data, error } = await supabase
  .from('activities')
  .update({ title: 'Neue Wanderung' })
  .eq('id', activity_id);

// DELETE
const { error } = await supabase
  .from('activities')
  .delete()
  .eq('id', activity_id);

// REALTIME
const subscription = supabase
  .on(
    'postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'activities' },
    (payload) => {
      console.log('New activity:', payload.new);
    }
  )
  .subscribe();
```

### Environment Variables

```env
# apps/web/.env.local
NEXT_PUBLIC_SUPABASE_URL=https://ayetwgaainiskwqvgubd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
```

**Warum NEXT_PUBLIC?**
Diese Variablen sind öffentlich (Client-Side), daher die `NEXT_PUBLIC_` Prefix.

---

## Deployment

### Staging Environment

**URL:** `https://staging.mallorca-map.com`  
**Auth:** HTTP Basic Auth (staging / 9963)  
**Sicherheit:** 3-Layer Protection

Siehe `deploy/STAGING_AUTH.md` für Details.

### Production Deployment (Beispiel)

```bash
# 1. Commit & Push
git add .
git commit -m "feat: new feature"
git push origin main

# 2. SSH zum Server
ssh deploy@mallorca-map.com

# 3. Deploy
cd /app/mallorca-map-next
git pull origin main
bun install
bun run build

# 4. Restart Service
sudo systemctl restart mallorca-map-web
sudo systemctl restart mallorca-map-mobile

# 5. Nginx Reload
sudo nginx -t && sudo systemctl reload nginx
```

### Build Optimizations

```bash
# Production Build
bun run build

# Output Größe prüfen
ls -lh apps/web/.next/standalone

# Type-Check vor Deploy
bun run type-check

# Lint prüfen
bun run lint
```

---

## 📊 Abhängigkeitsgraph

```
@repo/typescript-config (Base)
    ↓
@repo/shared (Utils + i18n)
@repo/supabase (DB Client)
    ↓ ↓
apps/web (Next.js)
apps/mobile (Expo)
```

Alle Apps hängen von den Shared Packages ab. Updatest du `@repo/shared`, müssen alle Apps neu gebuildet werden.

---

## 🚀 Zusammenfassung

| Bereich | Technologie | Zweck |
|---------|-------------|-------|
| **Monorepo** | Turborepo + Bun | Orchestration & Package Management |
| **Web Frontend** | Next.js 15 + React | Server-rendered Web App |
| **Mobile Frontend** | React Native + Expo | Cross-Platform Mobile App |
| **Styling** | Tailwind CSS + shadcn/ui | Konsistentes Design System |
| **i18n** | next-intl + Custom JSON | Multi-Language Support |
| **Backend** | Supabase (PostgreSQL) | Database + Realtime API |
| **Deployment** | Nginx + Systemd | Production Hosting |

---

## 📖 Further Reading

- [Turborepo Docs](https://turbo.build/)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Expo Docs](https://docs.expo.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Supabase Docs](https://supabase.com/docs)
- [next-intl](https://next-intl-docs.vercel.app/)

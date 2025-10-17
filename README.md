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


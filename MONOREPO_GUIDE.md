# 🏗️ Monorepo Development Guide - Mallorca Map

## Übersicht

Dieses Projekt ist ein **Monorepo** mit einem freigegebenen Paket (`@repo/shared`) und zwei Apps:
- **Web App** (`apps/web`) - Next.js 15, Browser-basiert
- **Mobile App** (`apps/mobile`) - React Native + Expo, native iOS/Android

**Kernprinzip:** _Teile die Logik zwischen Apps, halte die UI platform-spezifisch._

---

## 🧠 Mental Model

```
┌─────────────────────────────────────────┐
│         @repo/shared                    │
│  (Gehirn - Logik, Types, Daten)        │
│                                         │
│  • Types & Interfaces                   │
│  • Business Logic                       │
│  • Supabase Queries                     │
│  • i18n Strings                         │
│  • Constants & Enums                    │
└─────────────────────────────────────────┘
           ↙                     ↘
    ┌──────────────┐      ┌──────────────┐
    │ apps/web     │      │apps/mobile   │
    │              │      │              │
    │ • React Cmp  │      │• RN Cmp      │
    │ • shadcn/ui  │      │• NativeWind  │
    │ • Tailwind   │      │• Tailwind    │
    │ • Pages      │      │• Screens     │
    │ • Routing    │      │• Navigator   │
    └──────────────┘      └──────────────┘
```

---

## ✅ Was in `@repo/shared` gehört

### 1. Type Definitions

```typescript
// packages/shared/src/types.ts
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  category: 'hiking' | 'beach' | 'culture';
  difficulty: 'easy' | 'medium' | 'hard';
}

export type Result<T> = { data: T } | { error: string };
```

**✅ Grund:** Beide Apps verwenden die gleichen Datentypen.

### 2. Geschäftslogik & Berechnungen

```typescript
// packages/shared/src/utils/mathUtils.ts
export function calculateDistance(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  // Haversine formula
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) *
    Math.sin(dLng / 2);
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

export function formatPrice(price: number, currency: string = 'EUR'): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency,
  }).format(price);
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

**✅ Grund:** Diese Funktionen sind platform-agnostisch.

### 3. Datenbank-Operationen

```typescript
// packages/shared/src/services/activityService.ts
import { supabase } from '@repo/supabase';
import { Activity } from '../types';

export async function fetchActivities(): Promise<Activity[]> {
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .order('title');

  if (error) throw error;
  return data as Activity[];
}

export async function createActivity(
  activity: Omit<Activity, 'id'>
): Promise<Activity> {
  const { data, error } = await supabase
    .from('activities')
    .insert([activity])
    .select()
    .single();

  if (error) throw error;
  return data as Activity;
}

export function subscribeToActivities(
  callback: (activity: Activity) => void
) {
  return supabase
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'activities' },
      (payload) => callback(payload.new as Activity)
    )
    .subscribe();
}
```

**✅ Grund:** DB-Queries sind identisch für beide Apps.

### 4. Internationalisierung (i18n)

```json
// packages/shared/src/i18n/de.json
{
  "common.loading": "Lädt...",
  "common.error": "Fehler",
  "common.save": "Speichern",
  "activity.title": "Aktivität",
  "activity.difficulty": "Schwierigkeit",
  "activity.difficulty.easy": "Leicht",
  "activity.difficulty.medium": "Mittel",
  "activity.difficulty.hard": "Schwer"
}
```

**✅ Grund:** Übersetzungen sind gleich für beide Plattformen.

### 5. Constants & Enums

```typescript
// packages/shared/src/constants.ts
export const SUPPORTED_LANGUAGES = ['de', 'en', 'es'] as const;
export const ACTIVITY_CATEGORIES = ['hiking', 'beach', 'culture'] as const;
export const DIFFICULTY_LEVELS = ['easy', 'medium', 'hard'] as const;

export const APP_CONFIG = {
  API_URL: 'https://api.mallorca-map.com',
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  MAX_UPLOAD_SIZE: 5 * 1024 * 1024, // 5MB
} as const;
```

**✅ Grund:** Diese Werte sind überall gleich.

---

## ❌ Was NICHT in `@repo/shared` gehört

### ❌ 1. UI-Komponenten

```typescript
// ❌ FALSCH - Bitte NICHT in @repo/shared!
// packages/shared/src/components/Button.tsx
export function Button({ children }) {
  return <button>{children}</button>;
}
```

**Grund:** Web nutzt HTML `<button>`, Mobile nutzt `<TouchableOpacity>`. Nicht kompatibel!

**✅ Richtig:** Separate Komponenten pro App

```typescript
// apps/web/src/components/Button.tsx
import { Button as UiButton } from '@/components/ui/button';

export function Button({ children, onClick }) {
  return <UiButton onClick={onClick}>{children}</UiButton>;
}
```

```typescript
// apps/mobile/components/Button.tsx
import { TouchableOpacity, Text } from 'react-native';

export function Button({ children, onPress }) {
  return (
    <TouchableOpacity className="bg-primary px-4 py-2 rounded" onPress={onPress}>
      <Text className="text-white font-bold">{children}</Text>
    </TouchableOpacity>
  );
}
```

### ❌ 2. Pages & Screens

```typescript
// ❌ FALSCH
// packages/shared/src/pages/Home.tsx - NEIN!

// ✅ Richtig
// apps/web/src/app/[lang]/page.tsx - Ja!
// apps/mobile/app/index.tsx - Ja!
```

**Grund:** Routing ist völlig unterschiedlich zwischen Next.js und Expo Router.

### ❌ 3. Styling

```typescript
// ❌ FALSCH
// packages/shared/src/styles/card.css
// oder packages/shared/src/components/Card.tsx mit Tailwind

// ✅ Richtig
// apps/web/src/components/Card.tsx mit Tailwind
// apps/mobile/components/Card.tsx mit NativeWind
```

**Grund:** Web nutzt Tailwind CSS, Mobile nutzt NativeWind. Unterschiedliche Systeme!

### ❌ 4. Navigation/Routing

```typescript
// ❌ FALSCH
// packages/shared/src/router.ts - Bitte nicht!

// ✅ Richtig
// apps/web/src/app/[lang]/... - Next.js File-based Routing
// apps/mobile/app/_layout.tsx - Expo Navigator
```

**Grund:** Jede Platform hat ein eigenes Routing-System.

### ❌ 5. Platform-APIs

```typescript
// ❌ FALSCH - Platform APIs gehören nicht in shared!
export function getScreenSize() {
  return window.innerHeight; // ❌ window existiert nur im Browser!
}

// ✅ Richtig - Abstraktion erstellen
export interface ScreenProvider {
  getHeight(): number;
}

// Web Implementierung
export class WebScreenProvider implements ScreenProvider {
  getHeight() {
    return window.innerHeight;
  }
}

// Mobile Implementierung
import { Dimensions } from 'react-native';
export class MobileScreenProvider implements ScreenProvider {
  getHeight() {
    return Dimensions.get('window').height;
  }
}
```

---

## 🔄 Feature Development Workflow

### Szenario: Neue "Events" Seite bauen

**Schritt 1: Types in Shared**
```typescript
// packages/shared/src/types.ts
export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  attendees: number;
}
```

**Schritt 2: DB Service in Shared**
```typescript
// packages/shared/src/services/eventService.ts
export async function fetchEvents() {
  return supabase.from('events').select('*');
}
```

**Schritt 3: i18n Keys in Shared (ALLE 3!)**
```json
// packages/shared/src/i18n/de.json
{ "events.title": "Veranstaltungen", "events.date": "Datum" }

// packages/shared/src/i18n/en.json
{ "events.title": "Events", "events.date": "Date" }

// packages/shared/src/i18n/es.json
{ "events.title": "Eventos", "events.date": "Fecha" }
```

**Schritt 4: Web Component**
```typescript
// apps/web/src/components/EventCard.tsx
import { Event } from '@repo/shared';
import { Card } from '@/components/ui/card';

export function EventCard({ event }: { event: Event }) {
  return (
    <Card className="p-4 hover:shadow-lg">
      <h3 className="font-bold text-lg">{event.title}</h3>
      <p className="text-gray-600">{event.date}</p>
    </Card>
  );
}
```

**Schritt 5: Web Page**
```typescript
// apps/web/src/app/[lang]/events/page.tsx
import { fetchEvents } from '@repo/shared';
import { EventCard } from '@/components/EventCard';

export default async function EventsPage() {
  const events = await fetchEvents();
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">Events</h1>
      <div className="grid gap-4">
        {events.map(e => <EventCard key={e.id} event={e} />)}
      </div>
    </div>
  );
}
```

**Schritt 6: Mobile Component**
```typescript
// apps/mobile/components/EventCard.tsx
import { Event } from '@repo/shared';
import { View, Text } from 'react-native';

export function EventCard({ event }: { event: Event }) {
  return (
    <View className="bg-white p-4 rounded-lg mb-3">
      <Text className="font-bold text-lg">{event.title}</Text>
      <Text className="text-gray-600">{event.date}</Text>
    </View>
  );
}
```

**Schritt 7: Mobile Screen**
```typescript
// apps/mobile/app/events.tsx
import { useEffect, useState } from 'react';
import { fetchEvents, Event } from '@repo/shared';
import { EventCard } from '@/components/EventCard';
import { ScrollView } from 'react-native';

export default function EventsScreen() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);

  return (
    <ScrollView className="flex-1 p-4">
      {events.map(e => <EventCard key={e.id} event={e} />)}
    </ScrollView>
  );
}
```

**Schritt 8: Test**
```bash
bun run type-check  # Keine TypeScript Fehler?
bun run build       # Beide Apps bauen?
```

✅ **Fertig!** Die neue Seite funktioniert auf Web & Mobile.

---

## 📊 Entscheidungsbaum

Wenn du unsicher bist, wo Code hin gehört:

```
┌─ "Ist es UI/Komponenten/Styling?"
│  ├─ JA → App-spezifisch (apps/web oder apps/mobile)
│  └─ NEIN ↓
│
├─ "Ist es eine Page oder Screen?"
│  ├─ JA → App-spezifisch
│  └─ NEIN ↓
│
├─ "Ist es Routing/Navigation?"
│  ├─ JA → App-spezifisch
│  └─ NEIN ↓
│
├─ "Nutzt es window, document, oder Mobile-APIs?"
│  ├─ JA → App-spezifisch (oder abstrahieren)
│  └─ NEIN ↓
│
└─ → @repo/shared ✅
```

---

## 🧪 Testen für beide Apps

```bash
# 1. Type Check
bun run type-check

# 2. Linting
bun run lint

# 3. Production Build
bun run build

# 4. Dev Server (beide parallel)
bun run dev
```

---

## 📋 Checkliste für PRs

Vor dem Commit, stelle sicher:

- [ ] Types sind in `@repo/shared/src/types.ts`
- [ ] Logik ist in `@repo/shared/src/utils/`
- [ ] i18n Keys sind in **ALLEN 3** JSON-Dateien (DE, EN, ES)
- [ ] Web Components sind in `apps/web/src/components/`
- [ ] Mobile Components sind in `apps/mobile/components/`
- [ ] Keine UI in `@repo/shared`!
- [ ] `bun run type-check` passes
- [ ] `bun run build` succeeds für beide Apps

---

## 🚨 Häufige Fehler

### Fehler 1: UI Code in @repo/shared

```typescript
// ❌ FALSCH
// packages/shared/src/components/Button.tsx
export function Button() { return <button>...</button>; }

// ✅ RICHTIG
// Separate Buttons in apps/web und apps/mobile
```

### Fehler 2: Platform APIs ohne Abstraktion

```typescript
// ❌ FALSCH
// packages/shared/src/utils/screen.ts
export function getHeight() { return window.innerHeight; }

// ✅ RICHTIG
// Abstraktion + App-spezifische Implementierungen
```

### Fehler 3: Incomplette i18n

```typescript
// ❌ FALSCH
// Nur in de.json, nicht in en.json und es.json

// ✅ RICHTIG
// Alle Keys in ALLEN 3 Sprachen
```

### Fehler 4: Tailwind/NativeWind gemischt

```typescript
// ❌ FALSCH
// packages/shared/src/components/Card.tsx
export function Card() {
  return <div className="p-4">...</div>; // Tailwind in shared!
}

// ✅ RICHTIG
// apps/web/src/components/Card.tsx
export function Card() {
  return <div className="bg-white p-4">...</div>; // ✅ Web only
}

// apps/mobile/components/Card.tsx
export function Card() {
  return <View className="bg-white p-4">...</View>; // ✅ Mobile only
}
```

---

## 💡 Pro-Tipps

### 1. Großzügige Types
```typescript
// Besser:
export type ActivityCategory = 'hiking' | 'beach' | 'culture';
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

// Statt Magic Strings überall
```

### 2. Services für DB-Logik
```typescript
// packages/shared/src/services/
// ├── activityService.ts
// ├── eventService.ts
// └── userService.ts

// Dadurch ist DB-Logik zentral und einfach zu testen
```

### 3. Utils Module
```typescript
// packages/shared/src/utils/
// ├── format.ts (formatDate, formatPrice, etc.)
// ├── validate.ts (validateEmail, etc.)
// ├── math.ts (calculateDistance, etc.)
// └── date.ts (dateHelpers)

// Immer organisiert nach Aufgabe, nicht nach App
```

### 4. Constants File
```typescript
// Ein zentraler Ort für alle Konstanten
// packages/shared/src/constants.ts
export const CATEGORIES = ['hiking', 'beach', ...] as const;
export const MAX_TITLE_LENGTH = 100;
// etc.

// Statt überall Magic Numbers
```

---

## 📚 Weitere Ressourcen

- `.cursorrules` - Detaillierte AI-Richtlinien
- `ARCHITECTURE.md` - Tiefe Architektur-Doku
- `QUICKSTART.md` - Schnelleinstieg für Entwickler
- `deploy/STAGING_AUTH.md` - Deployment-Infos

---

**Version:** 1.0  
**Last Updated:** Oktober 2025  
**Autor:** Dein Monorepo Team

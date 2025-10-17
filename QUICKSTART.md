# Quick Start Guide - Mallorca Map

Schnelleinstieg für Entwickler, die mit diesem Projekt arbeiten.

---

## 🚀 Erste Schritte (5 Minuten)

### 1. Repository klonen
```bash
git clone https://github.com/your-org/mallorca-map-next.git
cd mallorca-map-next
```

### 2. Dependencies installieren
```bash
# Mit Bun (empfohlen)
bun install

# Oder mit npm
npm install
```

### 3. Development Server starten
```bash
# Startet Web (Port 3000) und Mobile Dev Server
bun run dev
```

✅ **Fertig!** Öffne http://localhost:3000/de im Browser.

---

## 📁 Wo Findet Man Was?

```
mallorca-map-next/
├── apps/web/                          🌐 Die Website
│   ├── src/app/[lang]/                Seiten (Routing)
│   ├── src/components/                React Components
│   └── src/i18n.ts                    Mehrsprachigkeit
│
├── apps/mobile/                       📱 Mobile App
│   └── app/                           Native Screens
│
├── packages/shared/                   📦 Gemeinsamer Code
│   ├── src/i18n/                      Übersetzungen (JSON)
│   └── src/utils/                     Helper Functions
│
├── .cursorrules                       ⭐ AI-Richtlinien
├── ARCHITECTURE.md                    📚 Technische Doku
└── QUICKSTART.md                      👈 Diese Datei
```

---

## 🎯 Häufige Aufgaben

### Neue Seite zur Website hinzufügen

1. **Datei erstellen:**
```bash
touch apps/web/src/app/\[lang\]/my-page/page.tsx
```

2. **Component schreiben:**
```typescript
// apps/web/src/app/[lang]/my-page/page.tsx
'use client';

import { useTranslations } from 'next-intl';

export default function MyPage() {
  const t = useTranslations();

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">{t('mypage.title')}</h1>
      <p className="text-gray-600 mt-2">{t('mypage.description')}</p>
    </div>
  );
}
```

3. **Übersetzungen hinzufügen:**
```json
// packages/shared/src/i18n/de.json
{
  "mypage.title": "Meine Seite",
  "mypage.description": "Beschreibung hier..."
}
```

4. **Zu anderen Sprachen hinzufügen:**
```json
// packages/shared/src/i18n/en.json
{
  "mypage.title": "My Page",
  "mypage.description": "Description here..."
}
```

✅ Seite ist unter `/de/my-page`, `/en/my-page`, `/es/my-page` verfügbar!

---

### UI-Component erstellen

1. **Component File:**
```typescript
// apps/web/src/components/MyCard.tsx
import { ReactNode } from 'react';

interface MyCardProps {
  title: string;
  children?: ReactNode;
}

export function MyCard({ title, children }: MyCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-bold mb-3">{title}</h2>
      {children}
    </div>
  );
}
```

2. **Im Page nutzen:**
```typescript
import { MyCard } from '@/components/MyCard';

export function MyPage() {
  return (
    <MyCard title="Mein Card">
      <p>Inhalt hier...</p>
    </MyCard>
  );
}
```

✅ Component ist typsicher und reusable!

---

### Daten aus Datenbank abrufen

```typescript
// apps/web/src/app/[lang]/activities/page.tsx
import { supabase } from '@repo/supabase';

export default async function ActivitiesPage() {
  // Server Component - Fetch ist OK!
  const { data: activities, error } = await supabase
    .from('activities')
    .select('*')
    .limit(10);

  if (error) {
    console.error('Fehler:', error);
    return <div>Fehler beim Laden...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {activities?.map((activity) => (
        <div key={activity.id} className="bg-white p-4 rounded-lg">
          <h3 className="font-bold">{activity.title}</h3>
          <p className="text-sm text-gray-600">{activity.description}</p>
        </div>
      ))}
    </div>
  );
}
```

✅ Daten sind SSR - SEO-freundlich und schnell!

---

### Styling mit Tailwind

```typescript
// Responsive Design
<div className="text-sm md:text-base lg:text-lg">Responsive Text</div>

// Grid Layout
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Cards */}
</div>

// Dark Mode
<div className="bg-white dark:bg-slate-900 text-black dark:text-white">
  Content
</div>

// Flex Layout
<div className="flex items-center justify-between">
  <span>Left</span>
  <span>Right</span>
</div>
```

**Wichtige Klassen:**
- `p-4` = Padding 1rem
- `m-4` = Margin 1rem
- `gap-4` = Abstand zwischen Items
- `rounded-lg` = Border Radius
- `shadow-md` = Schatten
- `hover:bg-gray-100` = Hover Effekt

👉 Siehe [Tailwind Docs](https://tailwindcss.com/docs) für mehr!

---

### Button/Input komponenten verwenden

```typescript
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function MyForm() {
  return (
    <div className="space-y-4">
      <Input placeholder="Name eingeben..." />
      <Button>Speichern</Button>
      <Button variant="outline">Abbrechen</Button>
    </div>
  );
}
```

**Verfügbare UI Components:**
- `Button`
- `Input`
- `Card`
- `Dialog`
- `Tabs`
- `Badge`
- `Alert`
- `Dropdown`

👉 Alle im Folder `apps/web/src/components/ui/`

---

## 🧪 Testen vor dem Commit

```bash
# Type-Check (schnell)
bun run type-check

# Linting
bun run lint

# Production Build (vollständig)
bun run build

# ✅ Kein Fehler? Commit!
git add .
git commit -m "feat: deine änderung"
git push origin main
```

---

## 🐛 Häufige Probleme

### "Module not found"
```bash
# Lösung 1: Dependencies neu installieren
bun install

# Lösung 2: Cache clearen
bun run clean
bun install
bun run dev
```

### "Type errors"
```bash
# Check TypeScript
bun run type-check

# Meist sind es Import-Fehler oder falsche Typen
```

### "Styling funktioniert nicht"
- Stelle sicher, dass `globals.css` in `layout.tsx` importiert ist
- Clear Browser Cache (Cmd+Shift+Delete)
- Restart Dev Server: `Ctrl+C` und `bun run dev`

### "i18n Keys nicht definiert"
- Add die Keys zu **ALLEN 3 JSON Dateien** (de.json, en.json, es.json)
- Check dass der Key-Pfad korrekt ist: `"section.key"`

---

## 📚 Dokumentation Übersicht

| Datei | Inhalt |
|-------|--------|
| **.cursorrules** | Cursor AI Richtlinien & Tech Stack |
| **ARCHITECTURE.md** | Tiefe technische Doku |
| **QUICKSTART.md** | Diese Datei - Schnelleinstieg |
| **deploy/STAGING_AUTH.md** | Passwortschutz Setup |
| **README.md** | Projekt Überblick |

---

## 🎓 Learning Resources

### Wenn du neu bist in:

**Next.js:**
- [Next.js Crash Course](https://www.youtube.com/watch?v=ZjAqacIm9iI)
- [Official Docs](https://nextjs.org/docs)

**React:**
- [React Beta Docs](https://react.dev/)
- [Component Pattern](https://react.dev/learn/components-and-props)

**TypeScript:**
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React + TypeScript](https://react.dev/learn/typescript)

**Tailwind CSS:**
- [Tailwind Tutorials](https://tailwindcss.com/docs)
- [Interactive Examples](https://play.tailwindcss.com/)

**Monorepo/Turborepo:**
- [Turborepo Handbook](https://turbo.build/repo/docs/handbook)

---

## 🚀 Deployment

### Staging (Test) Environment
```bash
# Änderungen committen
git add .
git commit -m "deine message"
git push origin main

# SSH zum Server
ssh user@staging.mallorca-map.com

# Auf Server
cd /app/mallorca-map-next
git pull origin main
bun install && bun run build
sudo systemctl restart mallorca-map

# Testen
curl -u staging:9963 https://staging.mallorca-map.com/de
```

---

## 💡 Pro-Tipps

1. **Imports nutzen:** `@/` statt `../../../`
   ```typescript
   // ❌ Falsch
   import { Component } from '../../../components/Component';
   
   // ✅ Richtig
   import { Component } from '@/components/Component';
   ```

2. **Types immer definieren:**
   ```typescript
   // ❌ Falsch
   export function MyComponent(props) { }
   
   // ✅ Richtig
   interface MyComponentProps {
     title: string;
     count?: number;
   }
   export function MyComponent({ title, count }: MyComponentProps) { }
   ```

3. **Client/Server trennen:**
   ```typescript
   // Server Component (default) - für Datenbank-Queries
   export default async function Page() {
     const data = await fetch(...);
     return <Display data={data} />;
   }
   
   // Client Component - für Interaktivität
   'use client';
   function Display({ data }) {
     const [state, setState] = useState();
     return ...;
   }
   ```

4. **Immer alle Sprachen übersetzen:**
   - de.json, en.json, es.json
   - Sonst zeigt die App Fehler wenn User andere Sprache wählt

5. **Performance:** 
   - Nutze `next/image` statt `<img>`
   - `dynamic()` für große Components
   - Server Components für Daten

---

## ✉️ Fragen?

Wenn du steckenbleibst:
1. Check `.cursorrules` für Tech Stack Info
2. Lese `ARCHITECTURE.md` für tiefe Erklärungen
3. Schau die Code-Beispiele in bestehenden Components
4. Frage Claude/ChatGPT mit Cursor!

---

**Happy Coding!** 🎉

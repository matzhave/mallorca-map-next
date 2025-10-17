# 📚 Dokumentations-Übersicht - Mallorca Map

Hier ist eine Übersicht aller Dokumentationsdateien und wo du was findest:

---

## 📖 Dateien im Überblick

### 1. **🚀 QUICKSTART.md** (Für schnelle Anfragen)
- **Zielgruppe:** Neue Entwickler, Quick-Lookup
- **Inhalt:** 
  - Setup & Installation
  - Häufige Aufgaben (neue Seite, Component, Styling)
  - Checkliste für Features
  - Monorepo-Strategie (kurz)
- **Wann lesen:** "Wie mache ich schnell X?"

### 2. **🏗️ MONOREPO_GUIDE.md** (Hauptreferenz - NEU!)
- **Zielgruppe:** Alle Entwickler
- **Inhalt:**
  - Mental Model (Gehirn = Shared, Augen = Apps)
  - Detaillierte Regeln: Was in `@repo/shared`?
  - Was NICHT in `@repo/shared`?
  - Praktisches Beispiel: Feature-Entwicklung (Events)
  - Entscheidungsbaum für Code-Placement
  - Häufige Fehler & Lösungen
  - Pro-Tipps & Best Practices
- **Wann lesen:** "Wo gehört dieser Code hin?"

### 3. **📋 ARCHITECTURE.md** (Detaillierte Dokumentation)
- **Zielgruppe:** Tech-Leads, Architecture Review
- **Inhalt:**
  - Monorepo-Konzepte erklärt
  - Jede Technology deep-dive (Next.js, React Native, etc.)
  - Turborepo Pipeline
  - Styling-Systeme
  - i18n Implementation
  - Backend (Supabase)
  - Deployment
  - **NEU:** Shared vs App-Spezifisch (kritisch!)
- **Wann lesen:** "Wie funktioniert das System insgesamt?"

### 4. **.cursorrules** (AI-Richtlinien - UPDATED!)
- **Zielgruppe:** AI-Tools (Claude, ChatGPT, etc.) & Referenz
- **Inhalt:**
  - Tech Stack Übersicht
  - Commands & Deployment
  - **NEU:** Shared Package-Strategie mit Beispielen
  - **NEU:** Feature Development Checkliste
  - Code-Konventionen
  - Häufige Probleme
- **Wann lesen:** Immer! Das ist die Quelle für AI-Assistenten.

### 5. **README.md** (Projekt-Überblick)
- **Zielgruppe:** Repository-Besucher
- **Inhalt:** Features, Tech Stack, Links zu anderen Docs

### 6. **deploy/STAGING_AUTH.md** (Deployment)
- **Zielgruppe:** DevOps, Deploy-Prozess
- **Inhalt:** Passwortschutz, Staging-Deployment

---

## 🎯 Entscheidungshilfe: Welche Datei lesen?

```
Ich bin neu im Projekt
  → QUICKSTART.md (5 Min)
  
Ich weiß nicht, wo Code hin gehört
  → MONOREPO_GUIDE.md (Entscheidungsbaum)
  
Ich will das System verstehen
  → ARCHITECTURE.md (30 Min deep-dive)
  
Ich bin ein AI-Tool (Claude, etc.)
  → .cursorrules (wird automatisch gelesen)
  
Ich muss deployen
  → deploy/STAGING_AUTH.md
```

---

## 🔑 Kritische Konzepte (In ALLEN Dateien erwähnt)

### ✅ SHARED PACKAGE (@repo/shared) enthält:
1. **Types** - `User`, `Activity`, `Event`, etc.
2. **Logik** - Berechnungen, Validierung, Formatierung
3. **DB Queries** - Supabase fetch-Funktionen
4. **i18n** - Übersetzungen (DE, EN, ES)
5. **Constants** - CATEGORIES, LOCALES, CONFIG

### ❌ APP-SPEZIFISCH (nicht in shared):
1. **UI Components** - unterschiedlich für Web & Mobile!
2. **Pages/Screens** - Platform-spezifisches Routing
3. **Styling** - Tailwind (Web) vs NativeWind (Mobile)
4. **Navigation** - URL-based (Web) vs Stack (Mobile)
5. **Platform APIs** - window, document, Dimensions

---

## 📊 Feature Development Workflow (überall dokumentiert)

1. Define Types in `@repo/shared/src/types.ts`
2. Add Logic in `@repo/shared/src/utils/`
3. Add DB queries in `@repo/shared/src/services/`
4. Add i18n Keys in `@repo/shared/src/i18n/` (ALL 3 JSON files!)
5. Create Web Component in `apps/web/src/components/`
6. Create Web Page in `apps/web/src/app/[lang]/...`
7. Create Mobile Component in `apps/mobile/components/`
8. Create Mobile Screen in `apps/mobile/app/...`
9. Test: `bun run type-check && bun run build`

---

## 🧪 Wichtige Commands (überall referenziert)

```bash
bun run dev              # Both apps parallel
bun run build            # Production build
bun run type-check       # TypeScript check
bun run lint             # ESLint check
bun run clean            # Clean artifacts
```

---

## 🚀 Was sich geändert hat (Oktober 2025)

✅ `.cursorrules` erweitert um:
- Shared vs App-Spezifisch (kritische Regel!)
- Feature Development Checkliste
- Praktische Beispiele (Activity-Feature)

✅ `ARCHITECTURE.md` erweitert um:
- Shared vs App-Spezifisch (tiefe Erklärung)
- Entscheidungsbaum
- Häufige Fehler mit Lösungen

✅ `QUICKSTART.md` erweitert um:
- Monorepo-Strategie (kurze Version)
- Feature Development Checkliste

✅ **NEU:** `MONOREPO_GUIDE.md`
- Komplette Referenzkarte
- Mental Model visualisiert
- Entscheidungsbaum für Code-Placement
- Feature Development Workflow (Szenario)
- Pro-Tipps & Best Practices

---

## 📌 Häufige Fragen

**F: Wo gehört dieser Code hin?**  
A: Siehe MONOREPO_GUIDE.md → Entscheidungsbaum

**F: Ich bin neu im Projekt, wo fange ich an?**  
A: Lese zuerst QUICKSTART.md (5 Min), dann MONOREPO_GUIDE.md

**F: Wie baue ich ein neues Feature für beide Apps?**  
A: Folge dem Workflow in MONOREPO_GUIDE.md → Feature Development Workflow

**F: Warum funktioniert mein Code in Web nicht in Mobile?**  
A: Du hast wahrscheinlich Platform-spezifischen Code in @repo/shared. Siehe Häufige Fehler.

**F: Ich bin ein AI-Tool, welche Datei sollte ich lesen?**  
A: .cursorrules! Die enthält alle wichtigen Richtlinien.

---

## 📚 Learning Path (für AI-Tools)

1. Lese `.cursorrules` komplett (diese ist deine Bibel!)
2. Bei Unsicherheit: Schau in MONOREPO_GUIDE.md
3. Bei Fragen zur Architektur: ARCHITECTURE.md
4. Bei Setup/Quick-Tasks: QUICKSTART.md
5. Bei Deployment: deploy/STAGING_AUTH.md

---

**Version:** 1.0  
**Last Updated:** Oktober 2025  
**Status:** Alle Dokumentation ist aktuell und konsistent! ✅


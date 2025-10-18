# 🚀 Mallorca Map - Quick Start Guide

> Für Entwickler die **sofort loslegen** wollen

---

## ⚠️ ZUERST LESEN!

📖 **[DEVELOPMENT_PRINCIPLES.md](./DEVELOPMENT_PRINCIPLES.md)** - Unsere Entwicklungs-Prinzipien

**TL;DR:** Keine Pfusch-Lösungen. Immer professionell, skalierbar, state-of-the-art.

---

## ⚡ Setup (5 Minuten)

### 1. Repository clonen
\`\`\`bash
git clone https://github.com/your-username/mallorca-map-next.git
cd mallorca-map-next
\`\`\`

### 2. Dependencies installieren
\`\`\`bash
bun install
\`\`\`

### 3. Environment Variables
\`\`\`bash
# Web App
cp apps/web/.env.local.example apps/web/.env.local
# Credentials sind bereits drin!

# Mobile App  
cp apps/mobile/.env.local.example apps/mobile/.env.local
\`\`\`

### 4. Dev Server starten
\`\`\`bash
bun run dev
\`\`\`

**Öffne:** http://localhost:3000/de

---

## 📖 Weitere Docs

- **`README.md`** - Projekt Overview
- **`ARCHITECTURE.md`** - Tiefe technische Details
- **`MONOREPO_GUIDE.md`** - Monorepo Best Practices
- **`DEPLOYMENT.md`** - Deployment Guide

---

**Happy Coding! 🚀**

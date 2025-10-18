# 🚀 Deployment Guide - Mallorca Map

Vollständige Dokumentation zum Deployment der Staging-Umgebung.

---

## ⭐ Quick Summary

**Hauptweg:** GitHub Actions (automatisch)  
**Nebenweg:** SSH (nur für Checks & Fixes)

---

## 📌 Deployment Flow

### Standard Deployment (Hauptweg)

```
1️⃣ Du lokal
   ├─ Code-Änderungen machen
   └─ git add . && git commit -m "..."
   ❌ NICHT pushen!

2️⃣ Du zu Claude
   └─ "Deploy die neue Version!"

3️⃣ Claude
   ├─ git push origin main (mit GitHub Token)
   └─ GitHub Actions triggert automatisch

4️⃣ GitHub Actions (automatisch!)
   ├─ Checkout Code
   ├─ Setup SSH Key
   ├─ Deploy zu Server:
   │  ├─ cd /app/mallorca-map-next
   │  ├─ git pull origin main
   │  ├─ bun install
   │  ├─ bun run build (nutzt .env.local auf Server)
   │  ├─ sudo systemctl restart mallorca-map-staging
   │  └─ sudo nginx -t && reload
   └─ Health Check

5️⃣ Claude (optional)
   ├─ SSH: Logs checken
   ├─ SSH: Status prüfen
   └─ Report: "✅ Deployed & OK!"

✅ Live auf https://staging.mallorca-map.com
```

### 🔐 Environment Variables Management

**Lösung:** `.env.local` ist **dauerhaft auf dem Server** gespeichert!

**Vorteile:**
- ✅ Secrets nur auf Server (maximale Sicherheit)
- ✅ Keine Secrets in GitHub/Git
- ✅ Schnelleres Deployment (keine Übertragung nötig)
- ✅ Einmalig setup, läuft dann für immer

**Location:** `/app/mallorca-map-next/apps/web/.env.local`

---

## 🔴 SSH (NUR für Ausnahmefälle!)

SSH wird **NICHT** für reguläres Deployment verwendet!

SSH wird nur benutzt für:

### ✅ Logs prüfen
```bash
sudo journalctl -u mallorca-map-staging -f
sudo journalctl -u mallorca-map-staging --lines=50
```

### ✅ Prozess-Status
```bash
ps aux | grep node
sudo systemctl status mallorca-map-staging
```

### ✅ Pakete updaten
```bash
sudo apt update && sudo apt upgrade
```

### ✅ Nginx-Config testen
```bash
sudo nginx -t
sudo systemctl reload nginx
```

### ✅ Secrets/Environment Variables ändern
Wenn du später Supabase Keys oder andere Secrets ändern musst:
```bash
# SSH zum Server
ssh -i mallorca-map-deploy-key root@49.13.205.128

# Edit .env.local
cd /app/mallorca-map-next/apps/web
nano .env.local

# Speichern: Ctrl+O, Enter, Ctrl+X

# Neu builden & restart
cd /app/mallorca-map-next
bun run build
pm2 restart mallorca-map-staging
# oder:
sudo systemctl restart mallorca-map-staging
```

**Wichtig:** `.env.local` ist in `.gitignore` und wird **NIEMALS** zu Git committed!

### ✅ Emergency-Fixes
Falls GitHub Actions kaputt ist - dann via SSH manuell deployen:
```bash
cd /app/mallorca-map-next
git pull origin main
bun install && bun run build
sudo systemctl restart mallorca-map-staging
```

---

## 📋 GitHub Actions Workflow

Die Konfiguration befindet sich in: `.github/workflows/deploy-staging.yml`

### Was der Workflow macht:

1. **Trigger:** Bei jedem `git push` zu `main`
2. **SSH Setup:** Private Key aus GitHub Secrets
3. **Server Deploy:** SSH Befehl ausführen
4. **Health Check:** Website antwortet?
5. **Report:** Success/Failure

### Secrets (GitHub Settings)

```
DEPLOY_SSH_KEY     → Private SSH Key
GH_TOKEN          → GitHub Token (optional)
```

---

## 🧪 Testing

### Test 1: Website erreichbar?
```bash
curl -u staging:9963 https://staging.mallorca-map.com/de
```

### Test 2: Passwortschutz aktiv?
```bash
# Sollte 401 geben (ohne Auth)
curl -I https://staging.mallorca-map.com/de

# Sollte 200 geben (mit Auth)
curl -u staging:9963 -I https://staging.mallorca-map.com/de
```

### Test 3: Service läuft?
```bash
ssh root@49.13.205.128 "sudo systemctl status mallorca-map-staging"
```

---

## ❌ Was NICHT zu tun ist

### ❌ Direkt SSH zum Deployen nutzen
```bash
# FALSCH! Nicht machen!
ssh root@49.13.205.128 "cd /app && git pull && bun build"
```
→ Immer über GitHub Actions!

### ❌ Manuell auf den Server pushen
```bash
# FALSCH!
git add . && git commit && git push  # ← OK
# ABER dann nicht via SSH deployen!
```
→ GitHub Actions macht das automatisch!

### ❌ GitHub umgehen
```bash
# FALSCH! Nicht direkt SSH deployen!
ssh root@49.13.205.128 "cd /app/mallorca-map-next && git pull && bun build"
```
→ Immer GitHub Push + GitHub Actions!

---

## 🆘 Troubleshooting

### GitHub Actions fehlgeschlagen?

1. Schau die Logs in GitHub an:
   - Repo → Actions → Letzte Workflow
   - Logs expandieren

2. Häufige Fehler:
   - SSH Key falsch → Check GitHub Secrets
   - Server offline → Check Hetzner Console
   - Build fehlgeschlagen → Check `bun run build` lokal

### Website nicht erreichbar?

```bash
# SSH Check
ssh root@49.13.205.128

# Service Status
sudo systemctl status mallorca-map-staging

# Logs
sudo journalctl -u mallorca-map-staging -f

# Nginx
sudo nginx -t
sudo systemctl status nginx
```

### Passwortschutz weg?

Das passiert wenn Nginx-Config nicht reloaded wurde. Deploy nochmal:

```bash
# Oder manuell SSH:
ssh root@49.13.205.128 "sudo systemctl reload nginx"
```

---

## 📊 Deployment Checklist

Vor jedem Deploy:

- [ ] Code lokal getestet (`bun run build`)
- [ ] `bun run type-check` erfolgreich
- [ ] Git Commits sauber
- [ ] GitHub Secrets vorhanden
- [ ] SSH Key in GitHub Secrets hinterlegt

Nach jedem Deploy:

- [ ] GitHub Actions erfolgreich (grüner Haken)
- [ ] Website antwortet mit 200 (mit Auth)
- [ ] Logs checken (keine Errors)
- [ ] Passwortschutz funktioniert

---

## 📚 Links

- **GitHub Secrets:** https://github.com/[org]/mallorca-map-next/settings/secrets/actions
- **GitHub Actions:** https://github.com/[org]/mallorca-map-next/actions
- **Staging URL:** https://staging.mallorca-map.com
- **SSH Setup:** `deploy/SSH_SETUP.md`
- **Architecture:** `ARCHITECTURE.md`

---

## 🎓 Die Regel (WICHTIG!)

> **GitHub Actions = Hauptkanal**  
> **SSH = Ausnahmen & Checks**

Nie SSH für Deployments verwenden! GitHub Actions ist der Single Source of Truth!

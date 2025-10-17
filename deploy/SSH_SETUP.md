# 🔐 SSH-Setup Guide für Mallorca Map Deployments

Sichere SSH-Key-basierte Authentifizierung für automatisierte Deployments.

---

## 🎯 Ziel

Nach diesem Setup:
- ✅ Passwortlose SSH-Verbindung zum Server
- ✅ Automatisierte Deployments ohne Passwort-Prompt
- ✅ Sichere Verwaltung von Credentials
- ✅ Deployment-Skripte können ohne Interaktion laufen

---

## 📋 Schritt-für-Schritt Setup

### Schritt 1: SSH-Key-Paar generieren (LOCAL)

```bash
# Wechsle in .ssh Verzeichnis
cd ~/.ssh

# Generiere SSH-Key Paar (Ed25519 - moderner & sicherer)
ssh-keygen -t ed25519 -C "mallorca-map@deployment" -f mallorca-map-staging

# ODER RSA falls Ed25519 nicht verfügbar:
# ssh-keygen -t rsa -b 4096 -C "mallorca-map@deployment" -f mallorca-map-staging

# Benutze KEIN Passwort (leer lassen!)
# Just press Enter für Passphrase
```

**Resultat:**
- `~/.ssh/mallorca-map-staging` (PRIVATE KEY - geheim!)
- `~/.ssh/mallorca-map-staging.pub` (PUBLIC KEY - auf Server)

### Schritt 2: Public Key auf Server kopieren

```bash
# Methode 1: Mit ssh-copy-id (EMPFOHLEN)
ssh-copy-id -i ~/.ssh/mallorca-map-staging.pub user@staging.mallorca-map.com

# Methode 2: Manuell
cat ~/.ssh/mallorca-map-staging.pub | ssh user@staging.mallorca-map.com \
  "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"

# Methode 3: Direkt in Hosting-Panel einfügen (wenn vorhanden)
cat ~/.ssh/mallorca-map-staging.pub
# → Copy & Paste ins Control Panel
```

### Schritt 3: SSH Config einrichten (LOCAL)

```bash
# Öffne/erstelle SSH-Config
nano ~/.ssh/config

# Füge diesen Block hinzu:
```

```
Host staging-mallorca
    HostName staging.mallorca-map.com
    User deploy
    IdentityFile ~/.ssh/mallorca-map-staging
    IdentitiesOnly yes
    StrictHostKeyChecking accept-new
```

```bash
# Speichern: Ctrl+O, Enter, Ctrl+X

# Korrekte Permissions setzen
chmod 600 ~/.ssh/config
```

### Schritt 4: Test SSH-Verbindung

```bash
# Sollte ohne Passwort funktionieren
ssh staging-mallorca

# Sollte zeigen:
# "Welcome to [server]..."

# Exit
exit
```

---

## 📝 Credentials Datei (SICHER!)

Erstelle lokal eine `.env.deployment` Datei:

```bash
# Im Projekt-Root
nano .env.deployment
```

```env
# Server Staging
STAGING_HOST=staging-mallorca
STAGING_USER=deploy
STAGING_PORT=22
STAGING_PATH=/app/mallorca-map-next
STAGING_SSH_KEY=~/.ssh/mallorca-map-staging

# Domain
STAGING_DOMAIN=staging.mallorca-map.com

# Auth Credentials
STAGING_AUTH_USER=staging
STAGING_AUTH_PASS=9963

# Next.js
NEXT_PUBLIC_SUPABASE_URL=https://ayetwgaainiskwqvgubd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
```

**⚠️ WICHTIG:**
```bash
# Nicht ins Git!
echo ".env.deployment" >> .gitignore
```

---

## 🔄 Automatisiertes Deployment Skript

```bash
#!/bin/bash
# deploy-staging.sh

set -e

# Lade Environment Variablen
source ~/.env.deployment

echo "╔════════════════════════════════════════════════════════════╗"
echo "║     🚀 Mallorca Map - Staging Deploy                      ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# 1. Git Push
echo "📋 Step 1: Push to Git..."
git add .
git commit -m "🚀 deployment: $(date +%s)" || echo "ℹ️  Nothing to commit"
git push origin main
echo "✅ Git pushed!"
echo ""

# 2. SSH Deploy
echo "📋 Step 2: SSH to server and deploy..."
ssh -i $STAGING_SSH_KEY $STAGING_USER@$STAGING_HOST << 'REMOTE_SCRIPT'
cd $STAGING_PATH
git pull origin main
bun install
bun run build
sudo systemctl restart mallorca-map-staging
sudo nginx -t && sudo systemctl reload nginx
echo "✅ Deploy successful!"
REMOTE_SCRIPT

echo ""
echo "✅ All done! 🎉"
```

---

## 🔒 Server-Side Setup (Einmalig)

### Auf dem Server ausführen:

```bash
# SSH zum Server
ssh deploy@staging.mallorca-map.com

# Wechsle zu Root für System-Setup
sudo -i

# Deployment-Skript installieren
sudo bash < <(curl -fsSL https://raw.githubusercontent.com/your-org/mallorca-map-next/main/deploy/deploy-staging-auth.sh)

# Next.js Service einrichten (falls noch nicht)
sudo systemctl restart mallorca-map-staging

# Permissions setzen
sudo chown -R deploy:deploy /app/mallorca-map-next

exit
```

---

## 📋 Checkliste

- [ ] SSH-Key Paar generiert (`mallorca-map-staging` + `.pub`)
- [ ] Public Key auf Server kopiert
- [ ] SSH Config eingerichtet (`~/.ssh/config`)
- [ ] SSH Verbindung getestet (`ssh staging-mallorca`)
- [ ] `.env.deployment` Datei erstellt (local only!)
- [ ] `.env.deployment` zu `.gitignore` hinzugefügt
- [ ] Deployment-Skript getestet
- [ ] Server-Side Setup durchgeführt

---

## 🔐 Sicherheits-Best-Practices

### DO ✅
- [ ] Private Key (`mallorca-map-staging`) lokal speichern & schützen
- [ ] Public Key (`.pub`) auf Server speichern
- [ ] SSH-Key verwenden statt Passwort
- [ ] `~/.ssh/config` nutzen für einfache Verwaltung
- [ ] Credentials in `.env.deployment` (nicht in Git!)
- [ ] Ed25519 Keys verwenden (moderner als RSA)
- [ ] SSH Key regelmäßig wechseln (z.B. jährlich)

### DON'T ❌
- ❌ Private Key ins Git committen!
- ❌ Private Key via Email/Chat teilen
- ❌ Passwort-Auth für Deployments nutzen
- ❌ Credentials im Code speichern
- ❌ Root für Deployments verwenden
- ❌ SSH-Keys mehrfach verwenden (ein Key pro Server)

---

## 🧪 Testing

```bash
# Test SSH-Verbindung
ssh staging-mallorca "echo 'SSH Works!'"

# Test Deployment ohne echten Deploy
bash deploy-staging.sh --dry-run

# Test Passwortschutz
curl -u staging:9963 https://staging.mallorca-map.com/de

# Check Nginx
ssh staging-mallorca "sudo nginx -t"

# Check Prozesse
ssh staging-mallorca "ps aux | grep node"
```

---

## 🆘 Fehlerbehebung

### "Permission denied (publickey)"
```bash
# Check ob Public Key auf Server existiert
ssh staging-mallorca "cat ~/.ssh/authorized_keys"

# Key wieder hinzufügen
ssh-copy-id -i ~/.ssh/mallorca-map-staging.pub user@staging.mallorca-map.com
```

### "Could not open a connection to your authentication agent"
```bash
# SSH Agent starten
eval "$(ssh-agent -s)"

# Key zum Agent hinzufügen
ssh-add ~/.ssh/mallorca-map-staging

# Testen
ssh staging-mallorca
```

### Keine Verbindung möglich
```bash
# Debug SSH
ssh -vvv staging-mallorca

# Check Firewall
ssh staging-mallorca "sudo ufw status"

# Check SSH Service
ssh staging-mallorca "sudo systemctl status ssh"
```

---

## 📚 Weitere Ressourcen

- [SSH.com - Best Practices](https://www.ssh.com/academy/ssh/public-key-authentication)
- [OpenSSH Manual](https://man.openbsd.org/ssh)
- [GitHub SSH Setup](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

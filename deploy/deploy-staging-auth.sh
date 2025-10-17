#!/bin/bash

# 🔐 ALL-IN-ONE Deployment Script für Staging Auth
# 
# Verwendung:
#   ssh user@staging.mallorca-map.com
#   curl -fsSL https://raw.githubusercontent.com/your-org/mallorca-map-next/main/deploy/deploy-staging-auth.sh | sudo bash
#
# ODER lokal downloaden und ausführen:
#   chmod +x deploy/deploy-staging-auth.sh
#   sudo ./deploy/deploy-staging-auth.sh

set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║     🔐 Staging Passwortschutz - Vollständiges Setup       ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Variablen
HTPASSWD_FILE="/etc/nginx/.htpasswd_staging"
NGINX_CONF_DIR="/etc/nginx/sites-available"
NGINX_CONF_LINK="/etc/nginx/sites-enabled"
DOMAIN="staging.mallorca-map.com"
USERNAME="staging"
PASSWORD="9963"
NGINX_CONF="$NGINX_CONF_DIR/$DOMAIN.conf"

echo "📋 Schritt 1: Prüfe Voraussetzungen..."

# Check ob auf Server
if ! whoami | grep -q root; then
    echo "❌ Fehler: Muss als root/sudo ausgeführt werden!"
    echo "   Versuche: sudo ./deploy/deploy-staging-auth.sh"
    exit 1
fi

# Check ob htpasswd installiert
if ! command -v htpasswd &> /dev/null; then
    echo "⚠️  htpasswd nicht installiert - installiere apache2-utils..."
    if [ -f /etc/os-release ]; then
        . /etc/os-release
        if [ "$ID" = "debian" ] || [ "$ID" = "ubuntu" ]; then
            apt-get update
            apt-get install -y apache2-utils
        fi
    fi
fi

# Check ob nginx installiert
if ! command -v nginx &> /dev/null; then
    echo "❌ Fehler: Nginx ist nicht installiert!"
    exit 1
fi

echo "✅ Voraussetzungen erfüllt!"
echo ""

# ============================================================
# SCHRITT 2: Erstelle htpasswd Datei
# ============================================================
echo "📋 Schritt 2: Erstelle Passwortdatei..."

htpasswd -cb "$HTPASSWD_FILE" "$USERNAME" "$PASSWORD"
chmod 644 "$HTPASSWD_FILE"
chown www-data:www-data "$HTPASSWD_FILE"

echo "✅ Passwortdatei erstellt: $HTPASSWD_FILE"
echo "   Benutzer: $USERNAME"
echo "   Passwort: $PASSWORD"
echo ""

# ============================================================
# SCHRITT 3: Backup alte Nginx Konfiguration
# ============================================================
if [ -f "$NGINX_CONF" ]; then
    echo "📋 Schritt 3: Backup alte Nginx-Konfiguration..."
    cp "$NGINX_CONF" "$NGINX_CONF.backup.$(date +%s)"
    echo "✅ Backup erstellt!"
else
    echo "ℹ️  Keine alte Nginx-Konfiguration gefunden"
fi
echo ""

# ============================================================
# SCHRITT 4: Erstelle neue Nginx Konfiguration
# ============================================================
echo "📋 Schritt 4: Schreibe neue Nginx-Konfiguration..."

cat > "$NGINX_CONF" << 'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name staging.mallorca-map.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name staging.mallorca-map.com;

    # SSL Configuration (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/staging.mallorca-map.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/staging.mallorca-map.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Maximale Suchmaschinen-Blockade
    add_header X-Robots-Tag "noindex, nofollow, noarchive, noimageindex, nosnippet, notranslate" always;
    add_header Cache-Control "no-cache, no-store, must-revalidate, max-age=0, private" always;
    add_header Pragma "no-cache" always;
    add_header Expires "0" always;

    # HTTP Basic Authentication für Staging (PRIMÄRER SCHUTZ)
    auth_basic "Staging-Umgebung - Passwort erforderlich";
    auth_basic_user_file /etc/nginx/.htpasswd_staging;

    # Reverse Proxy to Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Gzip
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss application/rss+xml font/truetype font/opentype application/vnd.ms-fontobject image/svg+xml;
}
EOF

echo "✅ Nginx-Konfiguration erstellt!"
echo ""

# ============================================================
# SCHRITT 5: Symlink in sites-enabled
# ============================================================
if [ ! -L "$NGINX_CONF_LINK/$DOMAIN.conf" ]; then
    echo "📋 Schritt 5: Erstelle Symlink in sites-enabled..."
    ln -sf "$NGINX_CONF" "$NGINX_CONF_LINK/$DOMAIN.conf"
    echo "✅ Symlink erstellt!"
else
    echo "ℹ️  Symlink existiert bereits"
fi
echo ""

# ============================================================
# SCHRITT 6: Nginx Konfiguration testen
# ============================================================
echo "📋 Schritt 6: Teste Nginx-Konfiguration..."

if nginx -t; then
    echo "✅ Nginx-Konfiguration ist gültig!"
else
    echo "❌ Fehler in Nginx-Konfiguration!"
    echo "   Versuche alte Version zu restoren..."
    if [ -f "$NGINX_CONF.backup.$(date +%s)" ]; then
        cp "$NGINX_CONF.backup.$(date +%s)" "$NGINX_CONF"
    fi
    exit 1
fi
echo ""

# ============================================================
# SCHRITT 7: Nginx neuladen
# ============================================================
echo "📋 Schritt 7: Lade Nginx neu..."

systemctl reload nginx

if systemctl is-active --quiet nginx; then
    echo "✅ Nginx ist aktiv!"
else
    echo "❌ Nginx-Fehler!"
    systemctl status nginx
    exit 1
fi
echo ""

# ============================================================
# SCHRITT 8: Test
# ============================================================
echo "📋 Schritt 8: Teste Passwortschutz..."
echo ""

echo "🔍 Test 1: Ohne Passwort (sollte 401 geben):"
curl -s -o /dev/null -w "Status: %{http_code}\n" https://staging.mallorca-map.com/de || echo "   (SSL-Warnung ist OK)"
echo ""

echo "🔍 Test 2: Mit Passwort (sollte 200 geben):"
curl -s -o /dev/null -w "Status: %{http_code}\n" -u staging:9963 https://staging.mallorca-map.com/de || echo "   (SSL-Warnung ist OK)"
echo ""

# ============================================================
# ABSCHLUSS
# ============================================================
echo "╔════════════════════════════════════════════════════════════╗"
echo "║            ✅ Setup abgeschlossen!                        ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "🔐 Passwortschutz aktiv für:"
echo "   URL: https://staging.mallorca-map.com"
echo "   Benutzer: $USERNAME"
echo "   Passwort: $PASSWORD"
echo ""
echo "📝 Konfiguration in:"
echo "   $NGINX_CONF"
echo "   $HTPASSWD_FILE"
echo ""
echo "🔗 Backup der alten Konfiguration:"
ls -1 "$NGINX_CONF.backup."* 2>/dev/null | tail -1 || echo "   (keine)"
echo ""
echo "🧪 Manueller Test:"
echo "   curl -u staging:9963 https://staging.mallorca-map.com/de"
echo ""

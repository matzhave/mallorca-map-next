#!/bin/bash

# Script zur Einrichtung des Passwortschutzes für die Staging-Umgebung
# 
# Verwendung:
#   chmod +x deploy/setup-staging-auth.sh
#   ./deploy/setup-staging-auth.sh
#
# Das Skript erstellt eine .htpasswd_staging Datei für die Nginx-Authentifizierung

set -e

HTPASSWD_FILE="/etc/nginx/.htpasswd_staging"
USERNAME="admin"

echo "╔════════════════════════════════════════════════════════════╗"
echo "║     Setup Passwortschutz für Staging (Nginx Auth)         ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "Dies erstellt einen Passwortschutz für https://staging.mallorca-map.com"
echo "Benutzername: $USERNAME"
echo ""

# Prüfe ob htpasswd installiert ist
if ! command -v htpasswd &> /dev/null; then
    echo "❌ Fehler: 'htpasswd' ist nicht installiert."
    echo "   Auf Debian/Ubuntu: sudo apt-get install apache2-utils"
    echo "   Auf macOS: brew install httpd"
    exit 1
fi

# Prüfe ob Datei bereits existiert
if [ -f "$HTPASSWD_FILE" ]; then
    echo "⚠️  Warnung: $HTPASSWD_FILE existiert bereits"
    read -p "Möchtest du es überschreiben? (j/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Jj]$ ]]; then
        echo "Abgebrochen."
        exit 0
    fi
fi

# Interaktiv Passwort eingeben
echo "Bitte gib ein sicheres Passwort ein (wird nicht angezeigt):"
htpasswd -c "$HTPASSWD_FILE" "$USERNAME"

echo ""
echo "✅ Passwortschutz erfolgreich eingerichtet!"
echo "   Datei: $HTPASSWD_FILE"
echo "   Benutzername: $USERNAME"
echo ""
echo "🔄 Nginx neuladen (falls noch nicht geschehen):"
echo "   sudo systemctl reload nginx"
echo ""
echo "Zum Testen:"
echo "   curl -u $USERNAME:DEIN_PASSWORT https://staging.mallorca-map.com/de"

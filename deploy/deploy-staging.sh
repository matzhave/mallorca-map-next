#!/bin/bash

# 🚀 Mallorca Map - Staging Deployment Script
# 
# Verwendung:
#   chmod +x deploy/deploy-staging.sh
#   ./deploy/deploy-staging.sh
#
# Voraussetzung: SSH-Setup durchgeführt (siehe deploy/SSH_SETUP.md)

set -e

# Farben für Output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ============================================================
# CONFIG
# ============================================================

# Versuche .env.deployment zu laden
if [ -f ~/.env.deployment ]; then
    export $(cat ~/.env.deployment | grep -v '#' | xargs)
else
    echo -e "${RED}❌ Fehler: ~/.env.deployment nicht gefunden!${NC}"
    echo ""
    echo "Bitte erstelle die Datei nach deploy/SSH_SETUP.md"
    exit 1
fi

# Setze Defaults falls nicht in .env
STAGING_HOST=${STAGING_HOST:-staging-mallorca}
STAGING_USER=${STAGING_USER:-deploy}
STAGING_PATH=${STAGING_PATH:-/app/mallorca-map-next}
STAGING_SSH_KEY=${STAGING_SSH_KEY:-~/.ssh/mallorca-map-staging}

# ============================================================
# FUNKTIONEN
# ============================================================

log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_header() {
    echo ""
    echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║${NC}     🚀 Mallorca Map Staging Deployment"
    echo -e "${BLUE}║${NC}     $(date '+%Y-%m-%d %H:%M:%S')"
    echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

# ============================================================
# VALIDATION
# ============================================================

validate_environment() {
    log_info "Validiere Umgebung..."
    
    # Check ob wir im Projekt-Root sind
    if [ ! -f "package.json" ]; then
        log_error "Nicht im Projekt-Root! Führe das Skript von mallorca-map-next/ aus."
        exit 1
    fi
    
    # Check ob SSH-Key existiert
    if [ ! -f "$STAGING_SSH_KEY" ]; then
        log_error "SSH-Key nicht gefunden: $STAGING_SSH_KEY"
        log_info "Folge deploy/SSH_SETUP.md"
        exit 1
    fi
    
    # Check ob SSH-Verbindung möglich ist
    if ! ssh -i "$STAGING_SSH_KEY" -o ConnectTimeout=5 $STAGING_HOST "echo 'OK'" &>/dev/null; then
        log_error "SSH-Verbindung zu $STAGING_HOST fehlgeschlagen!"
        exit 1
    fi
    
    log_success "Umgebung OK"
    echo ""
}

# ============================================================
# LOCAL BUILD
# ============================================================

build_local() {
    log_info "Schritt 1: Type-Check & Build (lokal)..."
    
    if ! bun run type-check; then
        log_error "Type-Check fehlgeschlagen!"
        exit 1
    fi
    
    if ! bun run build; then
        log_error "Build fehlgeschlagen!"
        exit 1
    fi
    
    log_success "Build erfolgreich"
    echo ""
}

# ============================================================
# GIT PUSH
# ============================================================

git_push() {
    log_info "Schritt 2: Git Push..."
    
    # Check ob Git installiert
    if ! command -v git &> /dev/null; then
        log_error "Git ist nicht installiert!"
        exit 1
    fi
    
    # Check ob Änderungen
    if [ -z "$(git status --porcelain)" ]; then
        log_warning "Keine lokalen Änderungen zum Committen"
    else
        log_info "Committe Änderungen..."
        git add .
        git commit -m "🚀 deployment: $(date +%s)" || true
    fi
    
    # Push
    log_info "Pushe zu main..."
    git push origin main
    
    log_success "Git Push erfolgreich"
    echo ""
}

# ============================================================
# SERVER DEPLOY
# ============================================================

deploy_server() {
    log_info "Schritt 3: Deploy auf Server..."
    
    # Remote Deployment Script
    DEPLOY_SCRIPT=$(cat <<'REMOTE'
set -e

echo "📋 Remote Deploy startet..."
echo ""

# Wechsle zu App-Verzeichnis
cd $STAGING_PATH

# Git Pull
echo "📋 Git Pull..."
git pull origin main
echo "✅ Done"
echo ""

# Dependencies
echo "📋 Bun Install..."
bun install
echo "✅ Done"
echo ""

# Build
echo "📋 Production Build..."
bun run build
echo "✅ Done"
echo ""

# Service Restart
echo "📋 Restart Service..."
sudo systemctl restart mallorca-map-staging
echo "✅ Done"
echo ""

# Nginx Reload
echo "📋 Nginx Config Check..."
sudo nginx -t
echo "✅ Config valid"
echo ""

echo "📋 Reload Nginx..."
sudo systemctl reload nginx
echo "✅ Done"
echo ""

# Health Check
echo "📋 Health Check..."
if curl -s -u staging:9963 https://staging.mallorca-map.com/de | grep -q "Willkommen"; then
    echo "✅ Website responsive!"
else
    echo "⚠️  Website nicht erreichbar - check logs"
fi
REMOTE
    )

    # Führe Remote Script aus
    ssh -i "$STAGING_SSH_KEY" $STAGING_HOST bash << EOF
$DEPLOY_SCRIPT
EOF

    log_success "Server Deploy erfolgreich"
    echo ""
}

# ============================================================
# TESTS
# ============================================================

run_tests() {
    log_info "Schritt 4: Tests..."
    
    echo "🧪 Test 1: Website HTTP Status"
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -u staging:9963 https://staging.mallorca-map.com/de)
    if [ "$HTTP_CODE" = "200" ]; then
        log_success "Website antwortet mit 200 OK"
    else
        log_warning "Website antwortet mit HTTP $HTTP_CODE"
    fi
    echo ""
    
    echo "🧪 Test 2: Passwortschutz"
    if curl -s -o /dev/null -w "%{http_code}" https://staging.mallorca-map.com/de | grep -q "401"; then
        log_success "Passwortschutz aktiv"
    else
        log_warning "Passwortschutz Status unklar"
    fi
    echo ""
    
    echo "🧪 Test 3: Service Status"
    if ssh -i "$STAGING_SSH_KEY" $STAGING_HOST "sudo systemctl is-active --quiet mallorca-map-staging"; then
        log_success "Service ist aktiv"
    else
        log_warning "Service Status unklar"
    fi
    echo ""
}

# ============================================================
# MAIN
# ============================================================

main() {
    print_header
    
    # 1. Validation
    validate_environment
    
    # 2. Local Build
    build_local
    
    # 3. Git Push
    git_push
    
    # 4. Server Deploy
    deploy_server
    
    # 5. Tests
    run_tests
    
    # Final Summary
    echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║${NC}            ✅ DEPLOYMENT ERFOLGREICH! 🎉"
    echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo "🔗 Live URL:"
    echo "   https://staging.mallorca-map.com"
    echo ""
    echo "🔐 Anmeldedaten:"
    echo "   User: staging"
    echo "   Pass: 9963"
    echo ""
    echo "📊 Logs prüfen:"
    echo "   ssh $STAGING_HOST 'sudo journalctl -u mallorca-map-staging -f'"
    echo ""
}

# Fehlerbehandlung
trap 'log_error "Deployment abgebrochen!"; exit 1' ERR

# Ausführung
main "$@"


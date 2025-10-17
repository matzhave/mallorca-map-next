#!/usr/bin/env bash
set -euo pipefail

# Deployment script for staging.mallorca-map.com
# Usage: bash deploy/deploy-staging.sh

SERVER_HOST="49.13.205.128"
SERVER_USER="root"
SERVER_PASS="Mallorca2025!Secure"
DEPLOY_PATH="/var/www/mallorca-map-next"

echo "🚀 Deploying to staging.mallorca-map.com"

# 1. Build Web App
echo "📦 Building Web App..."
cd "$(dirname "$0")/.."
cd apps/web
bun install
bun run build

# 2. Create remote directory
echo "📁 Creating remote directory..."
sshpass -p "$SERVER_PASS" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_HOST \
  "mkdir -p $DEPLOY_PATH/apps/web"

# 3. Copy files to server
echo "📤 Copying files to server..."
sshpass -p "$SERVER_PASS" rsync -avz --delete \
  .next/standalone/ \
  $SERVER_USER@$SERVER_HOST:$DEPLOY_PATH/apps/web/

sshpass -p "$SERVER_PASS" rsync -avz --delete \
  .next/static \
  $SERVER_USER@$SERVER_HOST:$DEPLOY_PATH/apps/web/.next/

sshpass -p "$SERVER_PASS" rsync -avz --delete \
  public/ \
  $SERVER_USER@$SERVER_HOST:$DEPLOY_PATH/apps/web/public/

# 4. Copy ecosystem config
sshpass -p "$SERVER_PASS" scp ecosystem.config.cjs \
  $SERVER_USER@$SERVER_HOST:$DEPLOY_PATH/apps/web/

# 5. Setup Nginx
echo "🌐 Setting up Nginx..."
sshpass -p "$SERVER_PASS" scp ../../deploy/nginx-staging.conf \
  $SERVER_USER@$SERVER_HOST:/etc/nginx/sites-available/staging.mallorca-map.com

sshpass -p "$SERVER_PASS" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_HOST \
  "ln -sf /etc/nginx/sites-available/staging.mallorca-map.com /etc/nginx/sites-enabled/ && \
   nginx -t && \
   systemctl reload nginx"

# 6. Install SSL Certificate (if not exists)
echo "🔒 Setting up SSL..."
sshpass -p "$SERVER_PASS" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_HOST \
  "if [ ! -f /etc/letsencrypt/live/staging.mallorca-map.com/fullchain.pem ]; then \
     certbot --nginx -d staging.mallorca-map.com --non-interactive --agree-tos --email admin@mallorca-map.com; \
   fi"

# 7. Start PM2
echo "🚀 Starting PM2..."
sshpass -p "$SERVER_PASS" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_HOST \
  "cd $DEPLOY_PATH/apps/web && \
   pm2 delete mallorca-map-staging 2>/dev/null || true && \
   pm2 start ecosystem.config.cjs && \
   pm2 save"

echo "✅ Deployment complete!"
echo "🌍 https://staging.mallorca-map.com"


#!/bin/bash
# ============================================================================
# Deploy Schema to Supabase via SQL Editor
# ============================================================================

set -e

PROJECT_REF="fyoorhyebgihxykunvvt"
SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5b29yaHllYmdpaHh5a3VudnZ0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDc5NjY4OSwiZXhwIjoyMDc2MzcyNjg5fQ.OsHOxnmQD4VxSthVjl-pn31LeniDytH7fopGc2J8vdU"

echo "🚀 Deploying Mallorca Map Schema to Supabase..."
echo ""

# Check if psql is installed
if ! command -v psql &> /dev/null; then
    echo "❌ psql not found. Installing PostgreSQL client..."
    brew install postgresql@15
fi

echo "📋 Attempting connection with different methods..."
echo ""

# Method 1: Try direct connection (Port 5432)
echo "Method 1: Direct Connection (Port 5432)..."
PGPASSWORD="23-mS!S.upabase" psql \
  "host=db.fyoorhyebgihxykunvvt.supabase.co port=5432 dbname=postgres user=postgres sslmode=require" \
  -f supabase/complete_schema.sql 2>&1 | head -20

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    exit 0
fi

echo ""
echo "Method 2: Pooler Connection (Port 6543)..."
PGPASSWORD="23-mS!S.upabase" psql \
  "host=aws-0-eu-central-1.pooler.supabase.com port=6543 dbname=postgres user=postgres.fyoorhyebgihxykunvvt sslmode=require" \
  -f supabase/complete_schema.sql 2>&1 | head -20

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    exit 0
fi

echo ""
echo "❌ Automatic deployment failed."
echo ""
echo "📝 Please deploy manually:"
echo "   1. Open: https://supabase.com/dashboard/project/fyoorhyebgihxykunvvt/sql/new"
echo "   2. Copy content from: supabase/complete_schema.sql"
echo "   3. Paste and click 'Run'"
echo ""


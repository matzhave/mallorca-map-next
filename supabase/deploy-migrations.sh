#!/bin/bash
# ============================================================================
# Mallorca Map - Deploy Migrations to Supabase
# ============================================================================

set -e

echo "🚀 Deploying Mallorca Map Database Schema to Supabase..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Supabase Project Details
PROJECT_REF="fyoorhyebgihxykunvvt"
API_URL="https://fyoorhyebgihxykunvvt.supabase.co"

echo -e "${BLUE}📊 Project: ${PROJECT_REF}${NC}"
echo ""

# Check if supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo -e "${RED}❌ Supabase CLI not found. Installing...${NC}"
    brew install supabase/tap/supabase
fi

echo -e "${GREEN}✅ Supabase CLI found${NC}"
echo ""

# Login to Supabase (if not already logged in)
echo "🔐 Checking Supabase authentication..."
if ! supabase projects list &> /dev/null; then
    echo "Please login to Supabase:"
    supabase login
fi

echo -e "${GREEN}✅ Authenticated${NC}"
echo ""

# Link project (if not already linked)
if [ ! -f ".supabase/config.toml" ]; then
    echo "🔗 Linking to Supabase project..."
    supabase link --project-ref $PROJECT_REF
else
    echo -e "${GREEN}✅ Project already linked${NC}"
fi

echo ""

# Apply migrations
echo "📦 Applying migrations..."
echo ""

for migration in supabase/migrations/*.sql; do
    filename=$(basename "$migration")
    echo -e "${BLUE}   Applying: ${filename}${NC}"
    
    # Apply migration via CLI
    supabase db push --db-url "postgresql://postgres:23-mS!S.upabase@db.fyoorhyebgihxykunvvt.supabase.co:5432/postgres" --file "$migration"
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}   ✅ ${filename} applied successfully${NC}"
    else
        echo -e "${RED}   ❌ Error applying ${filename}${NC}"
        exit 1
    fi
    echo ""
done

echo ""
echo -e "${GREEN}🎉 All migrations applied successfully!${NC}"
echo ""
echo "📝 Next steps:"
echo "1. Generate TypeScript types: bun run generate-types"
echo "2. Test database access: bun run test-db"
echo "3. Start development: bun run dev"
echo ""


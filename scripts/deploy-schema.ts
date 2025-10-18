#!/usr/bin/env bun
// ============================================================================
// Deploy Database Schema to Supabase
// ============================================================================

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';

const SUPABASE_URL = 'https://fyoorhyebgihxykunvvt.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5b29yaHllYmdpaHh5a3VudnZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3OTY2ODksImV4cCI6MjA3NjM3MjY4OX0.shJZIcWCb8oceY2a-pUJI746jxBCcylNsCZiL_Rc8WI';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function deploySchema() {
  console.log('🚀 Deploying Mallorca Map Database Schema...\n');

  try {
    // Read complete schema file
    const schemaPath = join(process.cwd(), 'supabase', 'complete_schema.sql');
    const schema = readFileSync(schemaPath, 'utf-8');

    console.log('📄 Schema file loaded');
    console.log(`   Size: ${(schema.length / 1024).toFixed(2)} KB`);
    console.log(`   Lines: ${schema.split('\n').length}\n`);

    // Split into individual statements (simple split by semicolon)
    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    console.log(`📦 Found ${statements.length} SQL statements\n`);
    console.log('⏳ Executing migrations (this may take 1-2 minutes)...\n');

    // Execute via Postgres connection
    // Note: Supabase REST API doesn't support arbitrary SQL execution
    // We need to use the PostgreSQL connection string

    const { exec } = require('child_process');
    const { promisify } = require('util');
    const execAsync = promisify(exec);

    const DB_URL = 'postgresql://postgres:23-mS!S.upabase@db.fyoorhyebgihxykunvvt.supabase.co:5432/postgres';

    // Execute schema via psql
    const command = `psql "${DB_URL}" < "${schemaPath}"`;
    
    const { stdout, stderr } = await execAsync(command);

    if (stderr && !stderr.includes('NOTICE')) {
      console.error('❌ Error:', stderr);
      process.exit(1);
    }

    console.log('✅ Schema deployed successfully!\n');
    console.log(stdout);

    // Verify deployment
    console.log('🔍 Verifying deployment...\n');

    const { data: categories, error } = await supabase
      .from('categories')
      .select('slug, name_de')
      .limit(10);

    if (error) {
      console.error('❌ Verification failed:', error);
      process.exit(1);
    }

    console.log('✅ Categories created:');
    categories?.forEach(cat => {
      console.log(`   - ${cat.slug}: ${cat.name_de}`);
    });

    console.log('\n🎉 Database setup complete!\n');
    console.log('📝 Next steps:');
    console.log('   1. Generate TypeScript types: bun run generate:types');
    console.log('   2. Start development: bun run dev\n');

  } catch (error) {
    console.error('❌ Deployment failed:', error);
    process.exit(1);
  }
}

deploySchema();


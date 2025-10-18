#!/usr/bin/env bun
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    'https://pccxksnmczlkyhumhcvd.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjY3hrc25tY3psa3lodW1oY3ZkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDgwMDI3OCwiZXhwIjoyMDc2Mzc2Mjc4fQ.-Qps0MK7-PjozZgwi9vUST9cIGJ2SnvwDzEfMmrFhjk'
);

// Check supabase_migrations table
const { data, error } = await supabase
    .from('supabase_migrations')
    .select('*')
    .order('version');

console.log('\n📊 Migrations in DB:\n');
console.log(data);
console.log('\n');

// Check categories with RLS bypassed
const { data: cats, error: catErr } = await supabase
    .from('categories')
    .select('id, slug, name_de');

console.log('Categories:', cats?.length, catErr);


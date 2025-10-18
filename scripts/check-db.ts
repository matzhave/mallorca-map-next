#!/usr/bin/env bun
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    'https://tjmorebgbxfqyxketbwr.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqbW9yZWJnYnhmcXl4a2V0YndyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDgwMDgzMywiZXhwIjoyMDc2Mzc2ODMzfQ.rmw9BBcZ3jWavtIz-195r-hptZGwo8i6FxJ-iIWJKIk'
);

// Check all tables
const { data: categories, error: catError } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order');

const { data: places, error: placesError } = await supabase
    .from('places')
    .select('id, title')
    .limit(5);

const { data: plans, error: plansError } = await supabase
    .from('business_plans')
    .select('*');

console.log('\n📊 Database Status:\n');
console.log(`Categories: ${categories?.length || 0} rows`, catError || '✅');
console.log(`Places: ${places?.length || 0} rows`, placesError || '✅');
console.log(`Business Plans: ${plans?.length || 0} rows`, plansError || '✅');
console.log('\nCategories:', categories?.map(c => `${c.slug} (${c.name_de})`));


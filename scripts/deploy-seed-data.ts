#!/usr/bin/env bun
// Deploy Seed Data directly via Supabase Client
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    'https://pccxksnmczlkyhumhcvd.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjY3hrc25tY3psa3lodW1oY3ZkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDgwMDI3OCwiZXhwIjoyMDc2Mzc2Mjc4fQ.-Qps0MK7-PjozZgwi9vUST9cIGJ2SnvwDzEfMmrFhjk'
);

async function deploySeedData() {
    console.log('🌱 Deploying seed data...\n');

    // 1. Insert Categories
    console.log('📁 Inserting categories...');

    const categories = [
        { slug: 'tours', slug_de: 'touren-erlebnisse', slug_en: 'tours-experiences', slug_es: 'tours-experiencias', name_de: 'Touren & Erlebnisse', name_en: 'Tours & Experiences', name_es: 'Tours & Experiencias', icon: 'Compass', color: '#1DAAB9', sort_order: 1 },
        { slug: 'events', slug_de: 'events-partys', slug_en: 'events-parties', slug_es: 'eventos-fiestas', name_de: 'Events & Partys', name_en: 'Events & Parties', name_es: 'Eventos & Fiestas', icon: 'Calendar', color: '#1DAAB9', sort_order: 2 },
        { slug: 'food', slug_de: 'essen-trinken', slug_en: 'food-drink', slug_es: 'comida-bebida', name_de: 'Essen & Trinken', name_en: 'Food & Drink', name_es: 'Comida & Bebida', icon: 'UtensilsCrossed', color: '#F4A460', sort_order: 3 },
        { slug: 'sights', slug_de: 'sehenswuerdigkeiten', slug_en: 'sights', slug_es: 'lugares-interes', name_de: 'Sehenswürdigkeiten', name_en: 'Sights', name_es: 'Lugares de Interés', icon: 'Landmark', color: '#9B59B6', sort_order: 4 },
        { slug: 'services', slug_de: 'dienstleistungen', slug_en: 'services', slug_es: 'servicios', name_de: 'Dienstleistungen', name_en: 'Services', name_es: 'Servicios', icon: 'Wrench', color: '#3498DB', sort_order: 5 },
        { slug: 'places', slug_de: 'orte', slug_en: 'places', slug_es: 'lugares', name_de: 'Orte', name_en: 'Places', name_es: 'Lugares', icon: 'MapPin', color: '#2ECC71', sort_order: 6 },
        { slug: 'jobs', slug_de: 'jobs', slug_en: 'jobs', slug_es: 'trabajos', name_de: 'Jobs', name_en: 'Jobs', name_es: 'Trabajos', icon: 'Briefcase', color: '#E67E22', sort_order: 7 },
        { slug: 'community', slug_de: 'community', slug_en: 'community', slug_es: 'comunidad', name_de: 'Community', name_en: 'Community', name_es: 'Comunidad', icon: 'Users', color: '#1ABC9C', sort_order: 8 },
        { slug: 'classifieds', slug_de: 'kleinanzeigen', slug_en: 'classifieds', slug_es: 'anuncios', name_de: 'Kleinanzeigen', name_en: 'Classifieds', name_es: 'Anuncios', icon: 'ShoppingBag', color: '#95A5A6', sort_order: 9 },
        { slug: 'news', slug_de: 'nachrichten', slug_en: 'news', slug_es: 'noticias', name_de: 'Nachrichten', name_en: 'News', name_es: 'Noticias', icon: 'Newspaper', color: '#34495E', sort_order: 10 },
    ];

    const { data: catData, error: catError } = await supabase
        .from('categories')
        .upsert(categories, { onConflict: 'slug' })
        .select();

    if (catError) {
        console.error('❌ Error inserting categories:', catError);
        process.exit(1);
    }

    console.log(`✅ ${catData.length} categories inserted\n`);

    // 2. Insert Business Plans
    console.log('💼 Inserting business plans...');

    const plans = [
        { plan_key: 'starter', name: 'Starter', monthly_price_cents: 4700, annual_price_cents: 47000, sort_order: 1 },
        { plan_key: 'pro', name: 'Pro', monthly_price_cents: 11700, annual_price_cents: 117000, sort_order: 2, is_recommended: true },
        { plan_key: 'business', name: 'Business', monthly_price_cents: 29700, annual_price_cents: 297000, sort_order: 3 },
    ];

    const { data: planData, error: planError } = await supabase
        .from('business_plans')
        .upsert(plans, { onConflict: 'plan_key' })
        .select();

    if (planError) {
        console.error('❌ Error inserting plans:', planError);
        process.exit(1);
    }

    console.log(`✅ ${planData.length} plans inserted\n`);

    console.log('🎉 Seed data deployed successfully!\n');
    console.log('📝 Next: Generate TypeScript types');
}

deploySeedData();


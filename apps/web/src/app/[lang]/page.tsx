import { useTranslations } from 'next-intl';
import { supabase } from '@repo/supabase';

export default function HomePage() {
  const t = useTranslations('common');

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary/10 to-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <h1 className="text-5xl font-bold text-foreground">
            {t('welcome')}
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Dein umfassender Guide für Mallorca - Erlebnisse, Events, Restaurants und mehr
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 bg-card rounded-lg shadow-lg border border-border">
              <h2 className="text-2xl font-semibold mb-2 text-primary">
                {t('experiences')}
              </h2>
              <p className="text-muted-foreground">
                Entdecke unvergessliche Touren und Aktivitäten
              </p>
            </div>

            <div className="p-6 bg-card rounded-lg shadow-lg border border-border">
              <h2 className="text-2xl font-semibold mb-2 text-primary">
                {t('events')}
              </h2>
              <p className="text-muted-foreground">
                Die besten Veranstaltungen und Partys
              </p>
            </div>

            <div className="p-6 bg-card rounded-lg shadow-lg border border-border">
              <h2 className="text-2xl font-semibold mb-2 text-primary">
                {t('guide')}
              </h2>
              <p className="text-muted-foreground">
                Restaurants, Strände und Geheimtipps
              </p>
            </div>
          </div>

          <div className="mt-12 p-6 bg-secondary rounded-lg">
            <p className="text-sm text-muted-foreground">
              ✅ Next.js 15 mit Server-Side Rendering
            </p>
            <p className="text-sm text-muted-foreground">
              ✅ Turborepo Monorepo Setup
            </p>
            <p className="text-sm text-muted-foreground">
              ✅ Supabase Integration
            </p>
            <p className="text-sm text-muted-foreground">
              ✅ Mehrsprachig (DE/EN/ES)
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}


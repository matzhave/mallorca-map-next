import { useTranslations } from 'next-intl';
import { supabase } from '@repo/supabase';

export default async function HomePage({
    params,
}: {
    params: { lang: string };
}) {
    // Fetch categories to test DB connection
    const { data: categories } = await supabase
        .from('categories')
        .select('*')
        .is('parent_id', null)
        .order('sort_order')
        .limit(10);

    // Fetch platform stats
    const { data: stats } = await supabase
        .from('places')
        .select('id', { count: 'exact', head: true });

    return (
        <div className="min-h-screen bg-gradient-to-b from-secondary to-white">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                        <span className="text-primary font-semibold">
                            ⭐ Die #1 Mallorca Plattform
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                        Entdecke Mallorca
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Die besten Erlebnisse, Events und Dienstleister auf der Insel
                    </p>

                    {/* Search Bar Placeholder */}
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-2xl p-6">
                            <input
                                type="text"
                                placeholder="z. B. Bootstour Palma, Beach Club, Restaurant"
                                className="w-full px-6 py-4 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <button className="w-full mt-4 px-6 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors">
                                Suchen
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto mb-16">
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                        <div className="text-4xl font-bold text-primary mb-2">
                            {stats?.count || 0}
                        </div>
                        <div className="text-gray-600">Einträge</div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                        <div className="text-4xl font-bold text-primary mb-2">0</div>
                        <div className="text-gray-600">Bewertungen</div>
                    </div>
                </div>

                {/* Categories */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-8">
                        Kategorien entdecken
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {categories?.map((category) => (
                            <a
                                key={category.id}
                                href={`/${params.lang}/${category.slug_de}`}
                                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow group"
                            >
                                <div
                                    className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl"
                                    style={{ backgroundColor: category.color || '#14B8C4' }}
                                >
                                    {/* Icon würde hier hin */}
                                    📍
                                </div>
                                <div className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                                    {category.name_de}
                                </div>
                                <div className="text-sm text-gray-500 mt-1">0 Einträge</div>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Simple Footer */}
                <footer className="text-center text-gray-600 text-sm pt-16 border-t">
                    <p>© 2024 Mallorca Map. Alle Rechte vorbehalten.</p>
                    <div className="mt-4 space-x-4">
                        <a href="/de/impressum" className="hover:text-primary">
                            Impressum
                        </a>
                        <a href="/de/datenschutz" className="hover:text-primary">
                            Datenschutz
                        </a>
                        <a href="/de/agb" className="hover:text-primary">
                            AGB
                        </a>
                    </div>
                </footer>
            </div>
        </div>
    );
}

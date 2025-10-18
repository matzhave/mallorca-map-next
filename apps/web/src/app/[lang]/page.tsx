import { supabase } from '@repo/supabase';
import { getTranslations } from 'next-intl/server';
import { Calendar, MapPin, Clock, Euro, Star } from 'lucide-react';
import Image from 'next/image';

// Mock category data - später aus DB
const categoryItems = [
    {
        id: '1',
        name: 'Wassersport',
        icon: '🌊',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80',
        count: 45,
        color: '#14B8C4',
    },
    {
        id: '2',
        name: 'Events & Partys',
        icon: '🎉',
        image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&q=80',
        count: 78,
        color: '#F97316',
    },
    {
        id: '3',
        name: 'Restaurants',
        icon: '🍽️',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80',
        count: 156,
        color: '#EF4444',
    },
    {
        id: '4',
        name: 'Strände',
        icon: '🏖️',
        image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&q=80',
        count: 32,
        color: '#10B981',
    },
    {
        id: '5',
        name: 'Wandern',
        icon: '🥾',
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=80',
        count: 67,
        color: '#8B5CF6',
    },
    {
        id: '6',
        name: 'Sehenswürdigkeiten',
        icon: '🏛️',
        image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&q=80',
        count: 89,
        color: '#F59E0B',
    },
    {
        id: '7',
        name: 'Wellness & Spa',
        icon: '💆',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&q=80',
        count: 23,
        color: '#EC4899',
    },
    {
        id: '8',
        name: 'Beach Clubs',
        icon: '🍹',
        image: 'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?w=400&q=80',
        count: 41,
        color: '#06B6D4',
    },
    {
        id: '9',
        name: 'Bootstouren',
        icon: '⛵',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80',
        count: 34,
        color: '#3B82F6',
    },
    {
        id: '10',
        name: 'Shopping',
        icon: '🛍️',
        image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&q=80',
        count: 52,
        color: '#A855F7',
    },
];

// Mock trending data - später aus DB
const trendingItems = [
    {
        id: '1',
        title: 'Sonnenuntergang Bootstour',
        category: 'Wassersport',
        image:
            'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
        badge: 'Bestseller',
        badgeColor: 'bg-orange-500',
        rating: 4.9,
        location: 'Puerto de Sóller',
        duration: '3 Stunden',
        price: '65',
    },
    {
        id: '2',
        title: 'Tradicional Fiesta de Sant Joan',
        category: 'Events',
        image:
            'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
        badge: 'Trending',
        badgeColor: 'bg-pink-500',
        rating: 4.8,
        location: 'Ciutadella',
        duration: 'Ganztägig',
        price: 'Kostenlos',
    },
    {
        id: '3',
        title: 'Es Trenc Beach Day',
        category: 'Natur',
        image:
            'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80',
        badge: 'Geheimtipp',
        badgeColor: 'bg-emerald-500',
        rating: 4.7,
        location: 'Es Trenc',
        duration: 'Flexibel',
        price: '15',
    },
    {
        id: '4',
        title: 'Sa Foradada Sunset Hike',
        category: 'Wandern',
        image:
            'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
        badge: 'Neu',
        badgeColor: 'bg-blue-500',
        rating: 4.8,
        location: 'Deià',
        duration: '4 Stunden',
        price: '25',
    },
];

export default async function HomePage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const t = await getTranslations({ locale: lang });

    // Fetch data with error handling - gracefully degrade if DB is unavailable
    let placesCount: number | null = null;

    // For development/preview: Use mock data if Supabase is not configured
    const hasSupabaseConfig =
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co';

    if (hasSupabaseConfig) {
        try {
            const { count } = await supabase
                .from('places')
                .select('*', { count: 'exact', head: true });
            placesCount = count;
        } catch (error) {
            console.warn('Failed to fetch places count:', error);
        }
    } else {
        // Mock data for development
        placesCount = 420;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F5F9FA] to-white">
            {/* Hero Section */}
            <section className="relative pb-20 pt-12">
                <div className="container relative mx-auto px-4">
                    {/* Badge */}
                    <div className="mb-6 flex justify-center">
                        <div className="inline-flex items-center gap-2 rounded-full bg-[#E3F5F7] px-4 py-2">
                            <Star className="h-4 w-4 fill-primary text-primary" />
                            <span className="text-sm font-semibold text-[#0B5C66]">
                                {t('home.hero_tagline')}
                            </span>
                        </div>
                    </div>

                    {/* Heading */}
                    <div className="mb-12 text-center">
                        <h1 className="mb-4 text-5xl font-bold leading-tight text-[#1A3B47] md:text-6xl lg:text-7xl">
                            {t('home.hero_title')}
                        </h1>
                        <p className="mx-auto max-w-2xl text-xl text-gray-600 md:text-2xl">
                            {t('home.hero_subtitle')}
                        </p>
                    </div>

                    {/* Search Box */}
                    <div className="mx-auto max-w-4xl">
                        <div className="rounded-3xl bg-white p-6 shadow-2xl">
                            {/* Input Row */}
                            <div className="mb-4 flex flex-col gap-3 md:flex-row">
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        placeholder={t('home.search_placeholder')}
                                        className="h-14 w-full rounded-xl border border-gray-200 px-4 pl-12 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                        <svg
                                            className="h-5 w-5 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <button className="flex h-14 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 text-gray-700 transition-colors hover:bg-gray-50 md:w-auto">
                                    <Calendar className="h-5 w-5" />
                                    <span className="text-base">
                                        {t('home.select_date')}
                                    </span>
                                </button>
                            </div>

                            {/* Search Button */}
                            <button className="h-14 w-full rounded-xl bg-primary font-semibold text-white shadow-lg transition-all duration-200 hover:bg-primary/90 hover:shadow-xl">
                                <span className="text-base">
                                    {t('home.search_button')}
                                </span>
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="mt-8 grid grid-cols-2 gap-4 px-4 md:gap-6">
                            <div className="rounded-2xl bg-white p-6 text-center shadow-lg">
                                <div className="mb-1 text-3xl font-bold text-[#1A3B47] md:text-4xl">
                                    {placesCount !== null ? placesCount.toLocaleString('de-DE') : '–'}
                                </div>
                                <div className="text-sm text-gray-600 md:text-base">
                                    {t('home.stats_entries')}
                                </div>
                            </div>
                            <div className="rounded-2xl bg-white p-6 text-center shadow-lg">
                                <div className="mb-1 text-3xl font-bold text-[#1A3B47] md:text-4xl">
                                    361.614
                                </div>
                                <div className="text-sm text-gray-600 md:text-base">
                                    {t('home.stats_reviews')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-4">
                    {/* Section Header */}
                    <div className="mb-8 text-center md:mb-12">
                        <h2 className="mb-3 text-3xl font-bold text-[#1A3B47] md:text-4xl">
                            {t('home.popular_categories')}
                        </h2>
                        <p className="text-lg text-gray-600">
                            Entdecke die beliebtesten Kategorien auf Mallorca
                        </p>
                    </div>

                    {/* Categories Grid - 5 per row on desktop */}
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 md:gap-6">
                        {categoryItems.map((category) => (
                            <div
                                key={category.id}
                                className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl"
                            >
                                {/* Background Image */}
                                <div className="relative h-48">
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        className="object-cover brightness-75 transition-all duration-500 group-hover:scale-110 group-hover:brightness-50"
                                    />
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                </div>

                                {/* Content */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                                    {/* Icon */}
                                    <div className="mb-3 text-5xl transition-transform duration-300 group-hover:scale-125">
                                        {category.icon}
                                    </div>

                                    {/* Name */}
                                    <h3 className="mb-2 text-lg font-bold text-white drop-shadow-lg">
                                        {category.name}
                                    </h3>

                                    {/* Count */}
                                    <div className="rounded-full bg-white/90 px-3 py-1 backdrop-blur-sm">
                                        <span className="text-sm font-semibold text-gray-900">
                                            {category.count} Einträge
                                        </span>
                                    </div>
                                </div>

                                {/* Hover Arrow */}
                                <div className="absolute right-3 top-3 translate-x-10 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                                    <div className="rounded-full bg-white/90 p-2 backdrop-blur-sm">
                                        <svg
                                            className="h-5 w-5 text-gray-900"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trending Section */}
            <section className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    {/* Section Header */}
                    <div className="mb-8 text-center md:mb-12">
                        <h2 className="mb-3 text-3xl font-bold text-[#1A3B47] md:text-4xl">
                            {t('home.trending_title')}
                        </h2>
                        <p className="text-lg text-gray-600">
                            {t('home.trending_subtitle')}
                        </p>
                    </div>

                    {/* Trending Cards Grid */}
                    <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {trendingItems.map((item) => (
                            <div
                                key={item.id}
                                className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl"
                            >
                                {/* Image Container */}
                                <div className="relative h-52 overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {/* Badge */}
                                    <div
                                        className={`absolute left-3 top-3 rounded-full ${item.badgeColor} px-3 py-1 text-xs font-semibold text-white shadow-lg`}
                                    >
                                        {item.badge}
                                    </div>
                                    {/* Rating */}
                                    <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 shadow-lg backdrop-blur-sm">
                                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                        <span className="text-xs font-bold text-gray-900">
                                            {item.rating}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    {/* Category */}
                                    <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
                                        {item.category}
                                    </div>

                                    {/* Title */}
                                    <h3 className="mb-3 text-lg font-bold text-gray-900 transition-colors group-hover:text-primary">
                                        {item.title}
                                    </h3>

                                    {/* Meta Info */}
                                    <div className="mb-4 space-y-2 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-gray-400" />
                                            <span>{item.location}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-gray-400" />
                                                <span>{item.duration}</span>
                                            </div>
                                            <div className="flex items-center gap-1 font-semibold text-gray-900">
                                                {item.price === 'Kostenlos' ? (
                                                    <span className="text-emerald-600">
                                                        {item.price}
                                                    </span>
                                                ) : (
                                                    <>
                                                        <Euro className="h-4 w-4" />
                                                        <span>{item.price}</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* CTA Button */}
                                    <button className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-gray-200 bg-white py-2.5 font-semibold text-gray-900 transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white">
                                        <svg
                                            className="h-4 w-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                        <span>{t('home.learn_more')}</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* View All Button */}
                    <div className="flex justify-center">
                        <button className="flex items-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-8 py-3 font-semibold text-gray-900 transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white">
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                            <span>{t('home.view_all')}</span>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

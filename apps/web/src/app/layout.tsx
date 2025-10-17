import type { Metadata } from 'next';
import { locales } from '@/i18n';

export const metadata: Metadata = {
    title: 'Mallorca Map',
    description: 'Dein Guide für Mallorca - Erlebnisse, Events, Restaurants und mehr',
};

export function generateStaticParams() {
    return locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}


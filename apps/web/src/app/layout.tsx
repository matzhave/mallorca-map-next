import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
    title: {
        default: 'Mallorca Map - Dein Guide für Mallorca',
        template: '%s | Mallorca Map',
    },
    description: 'Entdecke die besten Erlebnisse, Events und Dienstleister auf Mallorca',
    keywords: [
        'Mallorca',
        'Restaurants',
        'Events',
        'Touren',
        'Urlaub',
        'Reise',
        'Guide',
    ],
    authors: [{ name: 'Mallorca Map' }],
    creator: 'Mallorca Map',
    publisher: 'Mallorca Map',
    metadataBase: new URL('https://mallorca-map.com'),
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="de" className={inter.variable} suppressHydrationWarning>
            <body className="antialiased">{children}</body>
        </html>
    );
}


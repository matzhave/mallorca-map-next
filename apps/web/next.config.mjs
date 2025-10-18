import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['@repo/shared', '@repo/supabase'],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.supabase.co',
            },
            {
                protocol: 'https',
                hostname: 'maps.googleapis.com',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
        ],
    },
    experimental: {
        optimizePackageImports: ['@repo/shared', 'lucide-react'],
    },
};

export default withNextIntl(nextConfig);

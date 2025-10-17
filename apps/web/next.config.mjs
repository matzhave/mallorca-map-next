import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    reactStrictMode: true,
    images: {
        domains: ['ayetwgaainiskwqvgubd.supabase.co'],
    },
    typedRoutes: true,
};

export default withNextIntl(nextConfig);


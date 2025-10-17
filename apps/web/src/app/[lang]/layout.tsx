import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import '@/globals.css';

export function generateStaticParams() {
    return locales.map((locale) => ({ lang: locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;

    // Validate locale
    if (!locales.includes(lang as any)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(lang);

    const messages = await getMessages();

    return (
        <html lang={lang}>
            <body>
                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}


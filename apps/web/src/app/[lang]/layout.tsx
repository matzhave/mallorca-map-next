import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import '@/globals.css';

export function generateStaticParams() {
    return locales.map((locale) => ({ lang: locale }));
}

export default async function LocaleLayout({
    children,
    params: { lang },
}: {
    children: React.ReactNode;
    params: { lang: string };
}) {
    // Validate locale
    if (!locales.includes(lang as any)) {
        notFound();
    }

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


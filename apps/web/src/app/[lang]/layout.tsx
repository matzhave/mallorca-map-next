import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';

export function generateStaticParams() {
    return locales.map((locale) => ({ lang: locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { lang: string };
}) {
    const { lang } = params;

    // Validate locale
    if (!locales.includes(lang as any)) {
        notFound();
    }

    let messages;
    try {
        messages = (await import(`@repo/shared/i18n/${lang}.json`)).default;
    } catch (error) {
        notFound();
    }

    return (
        <NextIntlClientProvider locale={lang} messages={messages}>
            {children}
        </NextIntlClientProvider>
    );
}

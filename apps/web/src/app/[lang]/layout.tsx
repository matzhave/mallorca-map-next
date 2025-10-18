import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import { deTranslations, enTranslations, esTranslations } from '@repo/shared';

export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

// Translation map
const translations = {
  de: deTranslations,
  en: enTranslations,
  es: esTranslations,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>; // Next.js 15: params is a Promise
}) {
  const { lang } = await params;

  // Validate locale
  if (!locales.includes(lang as any)) {
    notFound();
  }

  const messages = translations[lang as keyof typeof translations];

  return (
    <NextIntlClientProvider locale={lang} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

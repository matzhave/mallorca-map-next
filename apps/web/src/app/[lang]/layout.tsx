import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import { deTranslations, enTranslations, esTranslations } from '@repo/shared';
import { TopBar } from '@/components/layout/TopBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { Footer } from '@/components/layout/Footer';

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
      <div className="flex min-h-screen flex-col">
        <TopBar locale={lang} />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer locale={lang} />
        <BottomNav locale={lang} />
      </div>
    </NextIntlClientProvider>
  );
}

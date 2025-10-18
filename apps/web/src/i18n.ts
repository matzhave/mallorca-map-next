// Mallorca Map - i18n Configuration

import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { deTranslations, enTranslations, esTranslations } from '@repo/shared';

export const locales = ['de', 'en', 'es'] as const;
export const defaultLocale = 'de' as const;

export type Locale = (typeof locales)[number];

// Translation map
const translations = {
  de: deTranslations,
  en: enTranslations,
  es: esTranslations,
};

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return {
    messages: translations[locale as Locale],
  };
});

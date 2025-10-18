// Mallorca Map - i18n Configuration

import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { deTranslations, enTranslations, esTranslations } from '@repo/shared';

export const locales = ['de', 'en', 'es'] as const;
export const defaultLocale = 'de' as const;

export type Locale = (typeof locales)[number];

const messages = {
  de: deTranslations,
  en: enTranslations,
  es: esTranslations,
};

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  // If invalid, use default locale instead of throwing 404
  const validLocale = (locale && locales.includes(locale as any)) 
    ? locale 
    : defaultLocale;

  return {
    locale: validLocale as string,
    messages: messages[validLocale as Locale],
  };
});

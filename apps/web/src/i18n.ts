import { getRequestConfig } from 'next-intl/server';
import { deTranslations, enTranslations, esTranslations } from '@repo/shared';

export const locales = ['de', 'en', 'es'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  
  // Fallback to 'de' if locale is undefined
  if (!locale || !locales.includes(locale as any)) {
    locale = 'de';
  }

  const messages =
    locale === 'de'
      ? deTranslations
      : locale === 'en'
        ? enTranslations
        : esTranslations;

  return {
    messages,
    locale,
  };
});


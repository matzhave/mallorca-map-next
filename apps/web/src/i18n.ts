import { getRequestConfig } from 'next-intl/server';
import { deTranslations, enTranslations, esTranslations } from '@repo/shared';

export const locales = ['de', 'en', 'es'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
    const messages =
        locale === 'de'
            ? deTranslations
            : locale === 'en'
                ? enTranslations
                : esTranslations;

    return {
        messages,
    };
});


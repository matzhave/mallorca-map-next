import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'always',
});

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Already has a locale prefix
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return intlMiddleware(request);
  }

  // Smart language detection for root and non-prefixed paths
  const detectedLocale = detectLanguage(request);
  
  return NextResponse.redirect(
    new URL(`/${detectedLocale}${pathname === '/' ? '' : pathname}`, request.url)
  );
}

function detectLanguage(request: NextRequest): string {
  // 1. Get browser language preference from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language') || '';
  const browserLang = acceptLanguage.split(',')[0]?.split('-')[0]?.toLowerCase();

  // 2. Get country from IP using Cloudflare headers (works on staging too)
  const country = request.headers.get('cf-ipcountry')?.toUpperCase();

  // 3. Spain (Mallorca) → Spanish
  if (country === 'ES') {
    return 'es';
  }

  // 4. DACH countries (Germany, Austria, Switzerland) → German
  if (['DE', 'AT', 'CH'].includes(country || '')) {
    return 'de';
  }

  // 5. German browser language → German
  if (browserLang === 'de') {
    return 'de';
  }

  // 6. Spanish browser language → Spanish
  if (browserLang === 'es') {
    return 'es';
  }

  // 7. Default to German
  return defaultLocale;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};


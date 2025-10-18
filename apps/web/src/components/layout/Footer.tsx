'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Facebook, Instagram, Mail } from 'lucide-react';

interface FooterProps {
  locale: string;
}

export function Footer({ locale }: FooterProps) {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/50">
      <div className="container px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold">Mallorca Map</h3>
            <p className="text-sm text-muted-foreground">
              {t('home.subtitle')}
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="mailto:info@mallorca-map.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="font-semibold">{t('common.categories')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={`/${locale}/tours`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('common.tours')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/events`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('common.events')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/food`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('common.food')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/experiences`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('common.experiences')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Business */}
          <div className="space-y-3">
            <h4 className="font-semibold">{t('business.title')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={`/${locale}/business/claim`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('business.claim_listing')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/business/pricing`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('business.pricing')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/business/dashboard`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h4 className="font-semibold">{t('common.legal')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={`/${locale}/about`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('common.about')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/privacy`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('common.privacy')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/terms`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('common.terms')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/contact`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('common.contact')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} Mallorca Map. {t('common.all_rights_reserved')}
          </p>
        </div>
      </div>
    </footer>
  );
}


'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Menu, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from './LanguageSwitcher';

interface TopBarProps {
  locale: string;
}

export function TopBar({ locale }: TopBarProps) {
  const t = useTranslations();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <span className="text-lg font-bold text-white">M</span>
          </div>
          <span className="hidden font-bold text-lg sm:inline-block">
            Mallorca Map
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link
            href={`/${locale}/tours`}
            className="transition-colors hover:text-primary"
          >
            {t('common.tours')}
          </Link>
          <Link
            href={`/${locale}/events`}
            className="transition-colors hover:text-primary"
          >
            {t('common.events')}
          </Link>
          <Link
            href={`/${locale}/food`}
            className="transition-colors hover:text-primary"
          >
            {t('common.food')}
          </Link>
          <Link
            href={`/${locale}/experiences`}
            className="transition-colors hover:text-primary"
          >
            {t('common.experiences')}
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-2">
          {/* Search Button (Desktop) */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:inline-flex"
            aria-label={t('common.search')}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Language Switcher */}
          <LanguageSwitcher currentLocale={locale} />

          {/* Login Button */}
          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex"
            asChild
          >
            <Link href={`/${locale}/login`}>
              <User className="mr-2 h-4 w-4" />
              {t('common.login')}
            </Link>
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}


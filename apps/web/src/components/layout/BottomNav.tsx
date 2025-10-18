'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Home, Compass, Calendar, Utensils, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  locale: string;
}

export function BottomNav({ locale }: BottomNavProps) {
  const t = useTranslations();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === `/${locale}${path}`;

  const navItems = [
    {
      href: '',
      label: t('common.home'),
      icon: Home,
    },
    {
      href: '/tours',
      label: t('common.tours'),
      icon: Compass,
    },
    {
      href: '/events',
      label: t('common.events'),
      icon: Calendar,
    },
    {
      href: '/food',
      label: t('common.food'),
      icon: Utensils,
    },
    {
      href: '/profile',
      label: t('common.profile'),
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white md:hidden">
      <div className="grid h-16 grid-cols-5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={`/${locale}${item.href}`}
              className={cn(
                'flex flex-col items-center justify-center space-y-1 transition-colors',
                active
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-primary'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}


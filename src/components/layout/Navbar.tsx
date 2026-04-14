import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Menu } from 'lucide-react';

import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';

type NavbarProps = {
  locale: string;
};

const getLocalizedHref = (locale: string, path: string) => {
  if (locale === 'fr') {
    return path;
  }

  if (path === '/') {
    return '/en';
  }

  return `/en${path}`;
};

export const Navbar = async ({ locale }: NavbarProps) => {
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const links = [
    { href: '/menu', label: tNav('menu') },
    { href: '/notre-histoire', label: tNav('story') },
    { href: '/epicerie', label: tNav('epicerie') },
    { href: '/vins-bieres', label: tNav('winesBeers') },
    { href: '/contact', label: tNav('contact') },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-brand-black/10 bg-brand-cream">
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 md:px-10">
        <div className="flex items-center">
          <Link href={getLocalizedHref(locale, '/')} className="font-serif text-xl font-bold text-brand-black">
            Mow&apos;s Deli
          </Link>
        </div>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={getLocalizedHref(locale, link.href)}
                className="font-sans text-sm uppercase tracking-widest text-brand-black transition hover:text-brand-red"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <div className="md:hidden" aria-label="Open navigation menu">
            <Menu className="h-5 w-5 text-brand-black" />
          </div>
          <LanguageSwitcher />
        </div>
      </nav>
    </header>
  );
};

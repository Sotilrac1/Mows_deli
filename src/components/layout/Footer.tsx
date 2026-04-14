import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { siteConfig } from '@/data/site';

type FooterProps = {
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

export const Footer = async ({ locale }: FooterProps) => {
  const tFooter = await getTranslations({ locale, namespace: 'footer' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const footerLinks = [
    { href: '/menu', label: tNav('menu') },
    { href: '/notre-histoire', label: tNav('story') },
    { href: '/epicerie', label: tNav('epicerie') },
    { href: '/vins-bieres', label: tNav('winesBeers') },
    { href: '/contact', label: tNav('contact') },
  ];

  return (
    <footer className="bg-brand-black text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-14 md:grid-cols-3 md:px-10">
        <div className="space-y-4">
          <p className="font-serif text-2xl">Mow&apos;s Deli</p>
          <p className="max-w-xs font-sans text-sm text-white/80">{tFooter('tagline')}</p>
          <div className="flex gap-4 font-sans text-sm uppercase tracking-wider">
            <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="hover:text-brand-red">
              Instagram
            </a>
            <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer" className="hover:text-brand-red">
              Facebook
            </a>
          </div>
        </div>

        <div className="space-y-3 font-sans text-sm">
          <p className="font-mono uppercase tracking-widest text-white/70">{tFooter('addressLabel')}</p>
          <p>{siteConfig.address.street}</p>
          <p>
            {siteConfig.address.postalCode} {siteConfig.address.city}
          </p>
          <p className="pt-2 font-mono uppercase tracking-widest text-white/70">{tFooter('hoursLabel')}</p>
          <p>{tFooter('hoursPlaceholder')}</p>
        </div>

        <div className="space-y-3">
          <p className="font-mono text-sm uppercase tracking-widest text-white/70">{tFooter('linksLabel')}</p>
          <ul className="space-y-2 font-sans text-sm">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={getLocalizedHref(locale, link.href)} className="transition hover:text-brand-red">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/20">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-6 py-4 text-xs text-white/80 md:flex-row md:items-center md:justify-between md:px-10">
          <p>
            &copy; {new Date().getFullYear()} Mow&apos;s Deli. {tFooter('rights')}
          </p>
          <Link href={getLocalizedHref(locale, '/mentions-legales')} className="uppercase tracking-widest hover:text-brand-red">
            {tFooter('legal')}
          </Link>
        </div>
      </div>
    </footer>
  );
};

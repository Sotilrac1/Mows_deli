import type { MetadataRoute } from 'next';

import { siteConfig } from '@/data/site';

const routes = [
  { path: '', priority: 1.0, changeFrequency: 'monthly' as const },
  { path: '/menu', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/notre-histoire', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/epicerie', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/vins-bieres', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/mentions-legales', priority: 0.7, changeFrequency: 'monthly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.flatMap((route) => {
    const frPath = route.path;
    const enPath = route.path === '' ? '/en' : `/en${route.path}`;

    return [
      {
        url: `${siteConfig.url}${frPath}`,
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      },
      {
        url: `${siteConfig.url}${enPath}`,
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      },
    ];
  });
}

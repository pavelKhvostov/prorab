import type { MetadataRoute } from 'next';

const SITE_URL = 'https://prorab.example'; // [КОНТЕНТ] — боевой домен

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}

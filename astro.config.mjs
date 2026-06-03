import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';

export default defineConfig({
  site: 'https://gestoo.cl',
  trailingSlash: 'ignore',
  security: {
    checkOrigin: true,
  },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {},
    },
  },
  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-CL',
          en: 'en-US',
        },
      },
      serialize: (entry) => ({
        ...entry,
        changefreq: entry.changefreq ?? 'weekly',
        priority: entry.priority ?? 0.7,
        lastmod: entry.lastmod ?? new Date().toISOString(),
      }),
    }),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
  ],
});
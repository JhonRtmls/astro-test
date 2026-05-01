import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://jhonrtmls.github.io',
  base: '/astro-test',
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
    // Configuración recomendada para Astro 6.1
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {},
    },
  },
  integrations: [mdx(), sitemap()],
});

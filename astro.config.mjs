import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://gestoo.cl',
  base: '/astro-test',
  trailingSlash: 'never',
  security: {
    checkOrigin: true,
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

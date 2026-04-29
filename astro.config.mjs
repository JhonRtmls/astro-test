import { defineConfig } from 'astro/config';

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
});

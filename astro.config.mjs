import { defineConfig } from 'astro/config';

export default defineConfig({
  // Update this to your custom domain before launch.
  site: 'https://cakule-iz-kuzine.vercel.app',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  i18n: {
    defaultLocale: 'hr',
    locales: ['hr', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});

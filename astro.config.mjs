import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

export default defineConfig({
  site: 'https://alecasgari.com',
  vite: {
    server:  { host: true, allowedHosts: true },
    preview: { host: true, allowedHosts: true }
  },

  integrations: [react(), sitemap()]
});
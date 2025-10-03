import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

export default defineConfig({
  vite: {
    server:  { host: true, allowedHosts: true },
    preview: { host: true, allowedHosts: true }
  },

  integrations: [react()]
});
// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    resolve: {
      alias: {
        'tina-client': fileURLToPath(new URL('./tina/__generated__/client.ts', import.meta.url)),
        '~': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
});
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false, // Ensures we can customize variables in src/styles/global.css cleanly
    }),
  ],
  output: 'static',
});

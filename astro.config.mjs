// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
export default defineConfig({
  site: 'https://prime-ime.github.io',
  output: 'static',
  trailingSlash: 'always',
  compressHTML: true,
  vite: { plugins: [tailwindcss()] },
  integrations: [react()],
});

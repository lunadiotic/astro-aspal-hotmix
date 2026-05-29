import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://jasapengaspalanamp.com', // Production URL (silakan ganti ke domain asli Anda saat deploy)
	build: {
		inlineStylesheets: 'always', // Inlines all CSS directly into HTML to eliminate critical request chain
	},
	integrations: [
		tailwind({
			applyBaseStyles: false, // Ensures we can customize variables in src/styles/global.css cleanly
		}),
		sitemap(),
	],
	output: 'static',
});

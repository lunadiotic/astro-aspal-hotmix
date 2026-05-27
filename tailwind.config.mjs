/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          hover: 'rgb(var(--color-primary-hover) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'rgb(var(--color-secondary) / <alpha-value>)',
        },
        brand: {
          dark: 'rgb(var(--color-brand-dark) / <alpha-value>)',
          light: 'rgb(var(--color-brand-light) / <alpha-value>)',
        },
      },
      boxShadow: {
        'glow-primary': '0 15px 30px -5px rgb(var(--color-primary) / 0.3), 0 10px 15px -6px rgb(var(--color-primary) / 0.2)',
        'glow-secondary': '0 15px 30px -5px rgb(var(--color-secondary) / 0.3), 0 10px 15px -6px rgb(var(--color-secondary) / 0.2)',
        'antigravity': '0 20px 40px -15px rgba(15, 23, 42, 0.08), 0 15px 25px -10px rgba(15, 23, 42, 0.04)',
        'antigravity-hover': '0 30px 60px -15px rgba(15, 23, 42, 0.15), 0 20px 35px -10px rgba(15, 23, 42, 0.08)',
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Wotfard"', 'Futura', '-apple-system', 'sans-serif'],
        sriracha: ['"Sriracha"', 'cursive'],
        reenie: ['"Reenie"', 'cursive'],
      },
      colors: {
        background: 'var(--color-background)',
        'background-blured': 'var(--color-background-blured)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        tertiary: 'var(--color-tertiary)',
        'syntax-bg': 'var(--color-syntax-bg)',
        'syntax-highlight': 'var(--color-syntax-highlight)',
        text: 'var(--color-text)',
        icons: 'var(--color-icons)',
        'home-bg-light': 'var(--color-home-bg-light)',
        'home-bg-dark': 'var(--color-home-bg-dark)',
        red: 'var(--color-red)',
        gray: {
          100: 'var(--color-gray-100)',
          200: 'var(--color-gray-200)',
          300: 'var(--color-gray-300)',
          400: 'var(--color-gray-400)',
          500: 'var(--color-gray-500)',
          600: 'var(--color-gray-600)',
          700: 'var(--color-gray-700)',
          900: 'var(--color-gray-900)',
          1000: 'var(--color-gray-1000)',
        },
        'text-block': {
          success: 'var(--color-text-block-success)',
          info: 'var(--color-text-block-info)',
          warning: 'var(--color-text-block-warning)',
          danger: 'var(--color-text-block-danger)',
          primary: 'var(--color-text-block-primary)',
        },
        'text-block-border': {
          success: 'var(--color-text-block-border-success)',
          info: 'var(--color-text-block-border-info)',
          warning: 'var(--color-text-block-border-warning)',
          danger: 'var(--color-text-block-border-danger)',
          primary: 'var(--color-text-block-border-primary)',
        },
        code: {
          0: 'var(--color-code-0)',
          1: 'var(--color-code-1)',
          2: 'var(--color-code-2)',
          3: 'var(--color-code-3)',
          4: 'var(--color-code-4)',
          5: 'var(--color-code-5)',
          6: 'var(--color-code-6)',
          7: 'var(--color-code-7)',
        },
      },
      screens: {
        phone: '376px',
        tablet: '768px',
        desktop: '992px',
      },
      maxWidth: {
        layout: '1200px',
      },
      transitionProperty: {
        theme:
          'color, background-color, border-color, box-shadow, fill, stroke',
      },
      transitionDuration: {
        theme: '350ms',
      },
    },
  },
  plugins: [],
};

export default config;

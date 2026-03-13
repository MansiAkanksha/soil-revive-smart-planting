import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';
import tailwindcssAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)',
        input: 'var(--color-input)',
        ring: 'var(--color-ring)',
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        primary: {
          DEFAULT: 'var(--color-primary)',
          foreground: 'var(--color-primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          foreground: 'var(--color-secondary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          foreground: 'var(--color-accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)',
          foreground: 'var(--color-destructive-foreground)',
        },
        success: {
          DEFAULT: 'var(--color-success)',
          foreground: 'var(--color-success-foreground)',
        },
        warning: {
          DEFAULT: 'var(--color-warning)',
          foreground: 'var(--color-warning-foreground)',
        },
        error: {
          DEFAULT: 'var(--color-error)',
          foreground: 'var(--color-error-foreground)',
        },
        muted: {
          DEFAULT: 'var(--color-muted)',
          foreground: 'var(--color-muted-foreground)',
        },
        card: {
          DEFAULT: 'var(--color-card)',
          foreground: 'var(--color-card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--color-popover)',
          foreground: 'var(--color-popover-foreground)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        heading: ['Crimson Pro', 'serif'],
        body: ['Source Sans 3', 'sans-serif'],
        caption: ['Nunito Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
        '144': '36rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      boxShadow: {
        'earth-sm': '0 2px 4px rgba(45, 80, 22, 0.08)',
        earth: '0 4px 8px rgba(45, 80, 22, 0.12)',
        'earth-md': '0 6px 12px rgba(45, 80, 22, 0.14)',
        'earth-lg': '0 12px 24px rgba(45, 80, 22, 0.16)',
        'earth-xl': '0 24px 48px rgba(45, 80, 22, 0.18)',
      },
      transitionTimingFunction: {
        organic: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        growth: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [typography, forms, tailwindcssAnimate],
};
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,less}'],
  theme: {
    extend: {
      animation: {
        'spin-2s': 'spin 2s linear infinite',
        'spin-3s': 'spin 3s linear infinite',
        'spin-fast': 'spin 0.5s linear infinite',
        'spin-slow': 'spin 10s linear infinite',
      },
    },
  },
} satisfies Config;

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: { borderRadius: { xl: '12px', '2xl': '16px' } },
  },
  darkMode: 'class',
  plugins: [],
};

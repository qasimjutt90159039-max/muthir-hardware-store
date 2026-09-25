/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#F97316',
          orangeDark: '#C2410C',
          black: '#111111',
          surface: '#1A1A1A',
          surfaceLight: '#262626',
          bgLight: '#F7F7F5',
          gray: '#6B7280',
          border: '#E5E7EB',
          darkBorder: '#333333',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Chakra Petch', 'Oswald', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'industrial': '0 4px 20px -2px rgba(17, 17, 17, 0.1), 0 2px 6px -1px rgba(17, 17, 17, 0.06)',
        'industrial-lg': '0 10px 25px -3px rgba(17, 17, 17, 0.2), 0 4px 10px -2px rgba(17, 17, 17, 0.1)',
        'orange-glow': '0 0 15px rgba(249, 115, 22, 0.35)',
      },
    },
  },
  plugins: [],
}

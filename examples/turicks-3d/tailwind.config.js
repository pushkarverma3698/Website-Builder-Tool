/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void:    '#0A0A14',
        purple:  '#7B61FF',
        glow:    '#A78BFA',
        cyan:    '#22D3EE',
        success: '#10B981',
        danger:  '#EF4444',
        node:    '#2A2A3A',
      },
      fontFamily: {
        sans: ['Sora', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


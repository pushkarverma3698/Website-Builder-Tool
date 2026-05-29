/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void:    '{{palette.background}}',
        accent:  '{{palette.accent}}',
        glow:    '{{palette.accent}}cc',
        cyan:    '#22D3EE',
        success: '#10B981',
        danger:  '#EF4444',
        node:    '#2A2A3A',
      },
      fontFamily: {
        sans: ['{{typography.heading0}}', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

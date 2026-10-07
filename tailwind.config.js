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
          espresso: '#100C0D',
          ivory: '#F7F1E8',
          gold: '#CFA46A',
          'gold-light': '#E5C492',
          beige: '#E8D8C4',
          muted: '#6F5542',
          charcoal: '#1A1617',
          border: 'rgba(207, 164, 106, 0.2)',
          pink: '#CFA46A',
          'pink-hover': '#E5C492',
          'pink-muted': '#E8D8C4',
          'pink-light': '#F7F1E8',
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        accent: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -5px rgba(0, 0, 0, 0.4), 0 0 15px rgba(207, 164, 106, 0.1)',
        'gold-glow': '0 0 20px rgba(207, 164, 106, 0.25)',
      }
    },
  },
  plugins: [],
}

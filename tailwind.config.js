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
          bg: '#F7F4ED',
          'bg-secondary': '#FFFFFF',
          black: '#10110F',
          espresso: '#10110F',
          charcoal: '#10110F',
          forest: '#263D2B',
          'forest-hover': '#1C2E20',
          olive: '#465640',
          sage: '#A8B5A0',
          'soft-sage': '#A8B5A0',
          cream: '#F7F4ED',
          white: '#FFFFFF',
          text: '#6B7068',
          border: '#DCE1D8',
          ivory: '#F7F4ED',
          beige: '#F7F4ED',
          muted: '#6B7068',
          // Strict Black & Green Theme (No Pink, Gold, or Orange)
          pink: '#263D2B',
          'pink-hover': '#1C2E20',
          'pink-light': '#F7F4ED',
          'pink-soft': '#DCE1D8',
          'pink-muted': '#A8B5A0',
          'pink-deep': '#263D2B',
          'pink-border': '#DCE1D8',
          gold: '#263D2B',
          'gold-light': '#F7F4ED',
          'gold-muted': '#A8B5A0',
          orange: '#263D2B',
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        accent: ['"Playfair Display"', 'Georgia', 'serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -5px rgba(16, 17, 15, 0.06), 0 0 15px rgba(38, 61, 43, 0.04)',
        'forest-glow': '0 0 20px rgba(38, 61, 43, 0.15)',
      }
    },
  },
  plugins: [],
}

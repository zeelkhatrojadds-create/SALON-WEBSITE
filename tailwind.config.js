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
          pink: '#D83A75',
          'pink-hover': '#C02964',
          'pink-dark': '#A31F52',
          'pink-light': '#FDF2F7',
          'pink-soft': '#FCE7F0',
          'pink-muted': '#E8A3BE',
          ivory: '#FAF7F2',
          'ivory-dark': '#F2ECE4',
          cream: '#FFFDF9',
          gold: '#C59A45',
          'gold-light': '#F5E6C4',
          espresso: '#23181C',
          charcoal: '#392C32',
          muted: '#7A6B72',
          border: '#EFE7E4',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        script: ['"Great Vibes"', '"Alex Brush"', 'cursive', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(216, 58, 117, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'card': '0 10px 30px -5px rgba(42, 30, 36, 0.06), 0 4px 10px -2px rgba(0, 0, 0, 0.03)',
        'hover': '0 20px 35px -8px rgba(216, 58, 117, 0.15), 0 8px 16px -4px rgba(42, 30, 36, 0.06)',
        'glow': '0 0 25px rgba(216, 58, 117, 0.35)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'scale-up': 'scaleUp 0.3s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 3s infinite ease-in-out',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.03)', opacity: '0.9' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}

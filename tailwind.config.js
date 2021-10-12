module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    letterSpacing: {
      widest: '.5em',
    },
    fontFamily: {
      sora: ['Sora', 'sans-serif'],
    },
    width: { '2/7': '28.5714286%' },
    minHeight: { 80: '80%', 810: '810px' },
    maxHeight: { 80: '80%', 810: '810px' },
    minWidth: {
      0: '0',
      '1/6': '16.666666%',
      '1/4': '25%',
      '1/2': '50%',
      66: '66%',
      '3/4': '75%',
      full: '100%',
    },
    maxWidth: {
      0: '0',
      '1/6': '16.666666%',
      '1/4': '25%',
      '1/2': '50%',
      66: '66%',
      '3/4': '75%',
      full: '100%',
    },

    extend: {
      backgroundImage: {
        'hero-image':
          "url('/jonathan-pielmayer-Gn64mz9hTqE-unsplash - large.jpg')",
      },
      outline: {
        green: '3px solid rgb(16, 185, 129)',
      },
      animation: {
        enter: 'enter 200ms ease-out',
        leave: 'leave 150ms ease-in forwards',
      },
      keyframes: {
        enter: {
          '0%': { transform: 'scale(0.9)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        leave: {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '100%': { transform: 'scale(0.9)', opacity: 0 },
        },
      },
      zIndex: {
        n10: '-10',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['jakarta'],
      },
      colors: {
        // ...
        dark: {
          900: '#202443',
          800: '#252849',
          700: '#2A2F54',
        },
        // ...
      },
    },
    keyframes: {
      fadeIn: {
        '0%': { transform: 'translateY(-18px)' },
        '25%': { transform: 'translateY(5px)' },
        '50%': { transform: 'translateY(10px)' },
        '75%': { transform: 'translateY(15px)' },
        '100%': { transform: 'translateY(`30px)' },
      },
      ping: {
        '75%': { transform: 'scale(2)', opacity: 0 },
        '100%': { transform: 'scale(2)', opacity: 0 },
      },
      pulse: {
        '0%': { opacity: '1' },
        '100%': { opacity: '1' },
        '50%': { opacity: '0.5' },
      },
      spin: {
        from: { transform: 'rotate(0deg)'},
        to: { transform: 'rotate(360deg)' }
      },
    },
    animation: {
      fadeIn: 'fadeIn 0.6s ease-in',
      ping: 'ping 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      spin: 'spin 1s linear infinite',
    },

  },
  plugins: [],
}

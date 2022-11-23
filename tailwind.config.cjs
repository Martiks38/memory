/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        red: '0 0 6px 3px #cd0303',
      },
      fontFamily: {
        inherit: 'inherit',
        DwarvenAxe: ['DwarvenAxe', 'sans-serif'],
      },
      margin: {
        '30px': '30px',
      },
      maxWidth: {
        75: '1200px',
      },
      textColor: {
        redDD: '#cd0300',
        creamDD: '#c6b173',
      },
      borderColor: {
        redDD: '#ce0300',
      },
    },
  },
  plugins: [],
}

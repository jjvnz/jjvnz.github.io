/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html'],
  theme: {
    extend: {
      colors: {
        carbon:  '#0A0C12',
        crust:   '#13161E',
        edge:    '#1F232C',
        copper:  '#D9814A',
        cloud:   '#F0F2F6',
        mist:    '#E0E4EC',
        shale:   '#9AA3B8',
        magenta: '#A78BFA',
        verd:    '#52AC8C',
        rust:    '#D47A7A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
};

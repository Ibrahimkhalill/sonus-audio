/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blush: '#F4E3DE',   // page background
        cream: '#FCF3F0',   // cards / raised surfaces
        rose: '#EBCEC6',    // secondary panels
        line: '#E2C7BF',    // hairlines
        ink: '#1B1513',     // primary text, dark buttons
        muted: '#8E7B76',   // secondary text
        coral: '#D25B45',   // accent
        'coral-hover': '#BC4E39',
        'on-coral': '#FFF7F4',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      borderRadius: { '4xl': '2rem', '5xl': '2.5rem' },
      boxShadow: {
        soft: '0 24px 60px -20px rgba(120, 70, 55, 0.22)',
        card: '0 12px 32px -12px rgba(120, 70, 55, 0.18)',
      },
    },
  },
  plugins: [],
};

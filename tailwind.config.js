/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-white': '#FFFFFF',
        'brand-black': '#000000',
        'brand-dark-gray': '#1A1A1A',
        'brand-gray': '#333333',
        'brand-light-gray': '#E5E5E5',
        'brand-secondary': '#111111',
        'brand-accent': 'rgba(255,255,255,0.05)',
        'brand-glow': 'rgba(255,255,255,0.1)',
        'brand-blue': '#3B82F6',
        'brand-blue-light': '#60A5FA',
        'brand-purple': '#8B5CF6',
        'brand-purple-light': '#A78BFA',
        'brand-emerald': '#10B981',
        'brand-orange': '#F59E0B',
        'brand-rose': '#EF4444',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'h1': ['clamp(48px, 8vw, 72px)', '1.1'],
        'h2': ['clamp(36px, 6vw, 56px)', '1.15'],
        'h3': ['clamp(24px, 4vw, 32px)', '1.2'],
        'body': ['clamp(16px, 2.5vw, 18px)', '1.75'],
        'body-sm': ['clamp(14px, 2vw, 16px)', '1.6'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '112': '28rem',
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
      borderRadius: {
        'sm': '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        DEFAULT: '0.375rem',
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.1)',
        'medium': '0 4px 25px rgba(0, 0, 0, 0.15)',
        'glow': '0 0 20px rgba(255, 255, 255, 0.05)',
        'inner-glow': 'inset 0 0 20px rgba(255, 255, 255, 0.02)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'glass-hover': '0 12px 40px rgba(0, 0, 0, 0.15)',
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '16px',
      },
      screens: {
        'xs': '475px',
        'tall': { 'raw': '(min-height: 800px)' },
      },
    },
  },
  plugins: [],
}
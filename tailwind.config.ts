import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // OGM Brand Colors
        ogm: {
          // Primary colors
          white: '#FFFFFF',
          cream: '#F8F6F2',
          offWhite: '#FEFEFE',

          // Gold gradient colors
          goldDark: '#C9A227',
          gold: '#D4AF37',
          goldLight: '#F4E77C',
          goldPale: '#F9F1C8',

          // Metallic variations
          champagne: '#F7E7CE',
          bronze: '#CD7F32',
          copper: '#B87333',

          // Warm grays
          gray100: '#F5F5F0',
          gray200: '#E8E8E0',
          gray300: '#D4D4C8',
          gray400: '#A8A898',
          gray500: '#8B8B7A',
          gray600: '#6B6B5A',
          gray700: '#4A4A3E',
          gray800: '#2D2D25',
          gray900: '#1A1A18',

          // Accent colors
          agave: '#7A8B6E',
          aged: '#8B7355',
          richBrown: '#6B5B4F',
          deepBrown: '#4A3728',
        },
      },
      fontFamily: {
        goldenbook: ['var(--font-goldenbook)', 'Times New Roman', 'Georgia', 'serif'],
        raleway: ['var(--font-raleway)', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        hero: ['clamp(4rem, 12vw, 12rem)', { lineHeight: '0.9', letterSpacing: '0.05em' }],
        h1: ['clamp(2.5rem, 6vw, 4rem)', { lineHeight: '1.1', letterSpacing: '0.02em' }],
        h2: ['clamp(1.8rem, 4vw, 2.5rem)', { lineHeight: '1.2', letterSpacing: '0.01em' }],
        h3: ['clamp(1.5rem, 3vw, 2rem)', { lineHeight: '1.3', letterSpacing: '0.02em' }],
        subtitle: ['clamp(1.2rem, 3vw, 2rem)', { lineHeight: '1.3', letterSpacing: '0.2em' }],
        body: ['clamp(1rem, 2.5vw, 1.25rem)', { lineHeight: '1.6', letterSpacing: '0.01em' }],
        caption: ['clamp(0.875rem, 2vw, 1rem)', { lineHeight: '1.4', letterSpacing: '0.05em' }],
        small: ['clamp(0.75rem, 1.5vw, 0.875rem)', { lineHeight: '1.4', letterSpacing: '0.03em' }],
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #C9A227 0%, #D4AF37 25%, #F4E77C 50%, #D4AF37 75%, #C9A227 100%)',
        'gradient-gold-subtle': 'linear-gradient(135deg, #C9A227 0%, #D4AF37 50%, #C9A227 100%)',
      },
      boxShadow: {
        'gold-subtle': '0 2px 10px rgba(212, 175, 55, 0.2)',
        'gold-medium': '0 4px 20px rgba(212, 175, 55, 0.3)',
        'gold-strong': '0 8px 30px rgba(212, 175, 55, 0.4)',
      },
    },
  },
  plugins: [],
};
export default config;

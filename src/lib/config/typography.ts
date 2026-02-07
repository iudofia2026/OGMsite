/**
 * OGM Official Font Scheme
 *
 * Premium typography system for OGM brand
 */

export const fontScheme = {
  // =============================================================================
  // OGM OFFICIAL FONTS
  // =============================================================================

  ogmFonts: {
    // Primary brand font - Goldenbook
    primary: {
      family: 'Goldenbook',
      weights: ['300', '400', '700', '800', '900'] as const,
      style: 'normal' as const,
      fallback: '"Times New Roman", Georgia, serif',
      usage: ['hero', 'headings', 'logo', 'primary-text'] as const,
    },

    // Secondary brand font - Raleway
    secondary: {
      family: 'Raleway',
      weights: ['100', '300', '400', '500', '600', '700', '800', '900'] as const,
      style: 'normal' as const,
      fallback: '"Helvetica Neue", Arial, sans-serif',
      usage: ['subtitles', 'navigation', 'buttons', 'ui'] as const,
    },

    // Body text font - Use Raleway for consistency
    body: {
      family: 'Raleway',
      weights: ['300', '400', '500', '600', '700'] as const,
      style: 'normal' as const,
      fallback: '"Helvetica Neue", Arial, sans-serif',
      usage: ['body', 'descriptions', 'content'] as const,
    },

    // Accent/display font - Use Raleway for consistency
    accent: {
      family: 'Raleway',
      weights: ['100', '300', '400', '600', '700', '900'] as const,
      style: 'normal' as const,
      fallback: '"Helvetica Neue", Arial, sans-serif',
      usage: ['captions', 'labels', 'metadata'] as const,
    },
  },

  // =============================================================================
  // TYPOGRAPHY SCALE
  // =============================================================================

  scale: {
    hero: {
      fontSize: 'clamp(4rem, 12vw, 12rem)',
      lineHeight: '0.9',
      fontWeight: '900',
      letterSpacing: '0.05em',
      fontFamily: 'var(--font-primary)',
    },
    h1: {
      fontSize: 'clamp(2.5rem, 6vw, 4rem)',
      lineHeight: '1.1',
      fontWeight: '700',
      letterSpacing: '0.02em',
      fontFamily: 'var(--font-primary)',
    },
    h2: {
      fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
      lineHeight: '1.2',
      fontWeight: '600',
      letterSpacing: '0.01em',
      fontFamily: 'var(--font-secondary)',
    },
    h3: {
      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
      lineHeight: '1.3',
      fontWeight: '500',
      letterSpacing: '0.02em',
      fontFamily: 'var(--font-secondary)',
    },
    subtitle: {
      fontSize: 'clamp(1.2rem, 3vw, 2rem)',
      lineHeight: '1.3',
      fontWeight: '400',
      letterSpacing: '0.2em',
      textTransform: 'uppercase' as const,
      fontFamily: 'var(--font-secondary)',
    },
    body: {
      fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
      lineHeight: '1.6',
      fontWeight: '400',
      letterSpacing: '0.01em',
      fontFamily: 'var(--font-body)',
    },
    caption: {
      fontSize: 'clamp(0.875rem, 2vw, 1rem)',
      lineHeight: '1.4',
      fontWeight: '400',
      letterSpacing: '0.05em',
      fontFamily: 'var(--font-accent)',
    },
    small: {
      fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
      lineHeight: '1.4',
      fontWeight: '300',
      letterSpacing: '0.03em',
      fontFamily: 'var(--font-accent)',
    },
  },
} as const;

export type FontScheme = typeof fontScheme;

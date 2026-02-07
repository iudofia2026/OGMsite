/**
 * OGM Official Color Scheme
 *
 * White and Gold Theme - Premium Tequila Brand
 * Based on luxury spirits industry color psychology
 */

export const colorScheme = {
  // =============================================================================
  // PRIMARY COLOR PALETTE - WHITE & GOLD
  // =============================================================================

  primary: {
    // Core brand colors
    white: '#FFFFFF',
    cream: '#F8F6F2',
    offWhite: '#FEFEFE',

    // Gold gradient colors - from dark to light
    goldDark: '#C9A227',
    goldPrimary: '#D4AF37',
    goldLight: '#F4E77C',
    goldPale: '#F9F1C8',

    // Metallic variations
    champagne: '#F7E7CE',
    bronze: '#CD7F32',
    copper: '#B87333',
  },

  // =============================================================================
  // NEUTRAL COLOR PALETTE
  // =============================================================================

  neutral: {
    // Warm grays that complement gold
    warmGray100: '#F5F5F0',
    warmGray200: '#E8E8E0',
    warmGray300: '#D4D4C8',
    warmGray400: '#A8A898',
    warmGray500: '#8B8B7A',
    warmGray600: '#6B6B5A',
    warmGray700: '#4A4A3E',
    warmGray800: '#2D2D25',
    warmGray900: '#1A1A18',
  },

  // =============================================================================
  // ACCENT COLOR PALETTE
  // =============================================================================

  accent: {
    // Earth tones for tequila connection
    agaveGreen: '#7A8B6E',
    agedBrown: '#8B7355',
    richBrown: '#6B5B4F',
    deepBrown: '#4A3728',

    // Subtle highlights
    highlightGold: '#FFD700',
    shimmer: '#FFF8DC',
    glow: '#FFFACD',
  },

  // =============================================================================
  // SEMANTIC COLOR PALETTE
  // =============================================================================

  semantic: {
    // Status colors (warm toned to match brand)
    success: '#7A8B6E', // Muted green
    warning: '#D4AF37', // Gold
    error: '#C53030', // Warm red
    info: '#7A9BA8', // Muted blue

    // Interactive states
    hover: '#F4E77C',
    focus: '#D4AF37',
    active: '#C9A227',
    disabled: '#D4D4C8',
  },

  // =============================================================================
  // GRADIENT DEFINITIONS
  // =============================================================================

  gradients: {
    // Hero background
    heroBackground: 'linear-gradient(135deg, #FFFFFF 0%, #F8F6F2 50%, #FFFFFF 100%)',

    // Hero title
    heroTitle: 'linear-gradient(135deg, #C9A227 0%, #D4AF37 25%, #F4E77C 50%, #D4AF37 75%, #C9A227 100%)',

    // Primary button
    buttonPrimary: 'linear-gradient(135deg, #C9A227 0%, #D4AF37 50%, #C9A227 100%)',
    buttonPrimaryHover: 'linear-gradient(135deg, #D4AF37 0%, #F4E77C 50%, #D4AF37 100%)',

    // Subtle overlays
    overlayGold: 'radial-gradient(circle at 30% 70%, rgba(212, 175, 55, 0.08) 0%, transparent 50%)',
    overlayGold2: 'radial-gradient(circle at 70% 30%, rgba(212, 175, 55, 0.05) 0%, transparent 50%)',
    overlayShimmer: 'radial-gradient(circle at 50% 50%, rgba(244, 231, 124, 0.03) 0%, transparent 70%)',
  },

  // =============================================================================
  // SHADOW DEFINITIONS
  // =============================================================================

  shadows: {
    // Gold-themed shadows
    goldSubtle: '0 2px 10px rgba(212, 175, 55, 0.2)',
    goldMedium: '0 4px 20px rgba(212, 175, 55, 0.3)',
    goldStrong: '0 8px 30px rgba(212, 175, 55, 0.4)',

    // Standard shadows
    subtle: '0 2px 8px rgba(0, 0, 0, 0.05)',
    medium: '0 4px 16px rgba(0, 0, 0, 0.1)',
    strong: '0 8px 32px rgba(0, 0, 0, 0.15)',

    // Inner shadows for depth
    insetGold: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    insetSubtle: 'inset 0 1px 3px rgba(0, 0, 0, 0.05)',
  },

  // =============================================================================
  // TYPOGRAPHY COLOR PAIRS
  // =============================================================================

  typography: {
    // Headings
    headingPrimary: '#D4AF37',
    headingSecondary: '#8B7355',
    headingTertiary: '#6B5B4F',

    // Body text
    textPrimary: '#4A4A3E',
    textSecondary: '#6B6B5A',
    textTertiary: '#8B8B7A',
    textLight: '#A8A898',

    // Links
    linkPrimary: '#D4AF37',
    linkHover: '#C9A227',

    // On backgrounds
    onWhite: '#4A4A3E',
    onGold: '#FFFFFF',
    onDark: '#FFFFFF',
  },

  // =============================================================================
  // COMPONENT SPECIFIC COLORS
  // =============================================================================

  components: {
    // Hero section
    hero: {
      background: '#FFFFFF',
      title: '#D4AF37',
      subtitle: '#8B7355',
      description: '#6B5B4F',
      buttonText: '#FFFFFF',
      buttonBackground: '#D4AF37',
    },

    // Navigation
    navigation: {
      background: 'rgba(255, 255, 255, 0.95)',
      text: '#4A4A3E',
      textHover: '#D4AF37',
      border: 'rgba(212, 175, 55, 0.2)',
    },

    // Cards
    card: {
      background: '#FFFFFF',
      border: 'rgba(212, 175, 55, 0.15)',
      shadow: '0 4px 20px rgba(212, 175, 55, 0.1)',
    },

    // Forms
    form: {
      background: '#FFFFFF',
      border: '#E8E8E0',
      borderFocus: '#D4AF37',
      text: '#4A4A3E',
      placeholder: '#A8A898',
    },
  },
} as const;

export type ColorScheme = typeof colorScheme;

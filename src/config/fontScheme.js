/**
 * OGM Official Font Scheme
 *
 * Premium typography system for OGM brand
 * Update the font family names below to match your official OGM fonts
 */

const FontScheme = {
    // =============================================================================
    // OGM OFFICIAL FONTS
    // =============================================================================

    ogmFonts: {
        // Primary brand font - Goldenbook
        primary: {
            family: 'Goldenbook',
            weights: ['300', '400', '700', '800', '900'],
            style: 'normal',
            fallback: '"Times New Roman", Georgia, serif',
            usage: ['hero', 'headings', 'logo', 'primary-text']
        },

        // Secondary brand font - Raleway
        secondary: {
            family: 'Raleway',
            weights: ['100', '300', '400', '500', '600', '700', '800', '900'],
            style: 'normal',
            fallback: '"Helvetica Neue", Arial, sans-serif',
            usage: ['subtitles', 'navigation', 'buttons', 'ui']
        },

        // Body text font - Use Raleway for consistency
        body: {
            family: 'Raleway',
            weights: ['300', '400', '500', '600', '700'],
            style: 'normal',
            fallback: '"Helvetica Neue", Arial, sans-serif',
            usage: ['body', 'descriptions', 'content']
        },

        // Accent/display font - Use Raleway for consistency
        accent: {
            family: 'Raleway',
            weights: ['100', '300', '400', '600', '700', '900'],
            style: 'normal',
            fallback: '"Helvetica Neue", Arial, sans-serif',
            usage: ['captions', 'labels', 'metadata']
        }
    },

    // =============================================================================
    // WEB FONT FALLBACKS (Current Setup)
    // =============================================================================

    webFonts: {
        serif: '"Playfair Display", "Times New Roman", Georgia, serif',
        sansSerif: '"Inter", "Helvetica Neue", Arial, sans-serif',
        editorial: '"Crimson Pro", "Times New Roman", Georgia, serif',
        monospace: '"SF Mono", Monaco, "Cascadia Code", monospace'
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
            fontFamily: 'var(--font-primary)'
        },
        h1: {
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            lineHeight: '1.1',
            fontWeight: '700',
            letterSpacing: '0.02em',
            fontFamily: 'var(--font-primary)'
        },
        h2: {
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            lineHeight: '1.2',
            fontWeight: '600',
            letterSpacing: '0.01em',
            fontFamily: 'var(--font-secondary)'
        },
        h3: {
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            lineHeight: '1.3',
            fontWeight: '500',
            letterSpacing: '0.02em',
            fontFamily: 'var(--font-secondary)'
        },
        subtitle: {
            fontSize: 'clamp(1.2rem, 3vw, 2rem)',
            lineHeight: '1.3',
            fontWeight: '400',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-secondary)'
        },
        body: {
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            lineHeight: '1.6',
            fontWeight: '400',
            letterSpacing: '0.01em',
            fontFamily: 'var(--font-body)'
        },
        caption: {
            fontSize: 'clamp(0.875rem, 2vw, 1rem)',
            lineHeight: '1.4',
            fontWeight: '400',
            letterSpacing: '0.05em',
            fontFamily: 'var(--font-accent)'
        },
        small: {
            fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
            lineHeight: '1.4',
            fontWeight: '300',
            letterSpacing: '0.03em',
            fontFamily: 'var(--font-accent)'
        }
    },

    // =============================================================================
    // FONT LOADING CONFIGURATION
    // =============================================================================

    loading: {
        // Font display strategies
        display: {
            critical: 'swap',     // Hero fonts
            important: 'swap',    // Headings
            body: 'swap',         // Body text
            optional: 'optional'  // Accent fonts
        },

        // Preload configuration
        preload: [
            {
                family: 'OGM Primary',
                weights: ['700', '900'],
                priority: 'high'
            },
            {
                family: 'OGM Secondary',
                weights: ['400', '500', '600'],
                priority: 'medium'
            },
            {
                family: 'OGM Body',
                weights: ['400', '500'],
                priority: 'medium'
            }
        ]
    },

    // =============================================================================
    // CSS CUSTOM PROPERTIES
    // =============================================================================

    getCSSVariables: function() {
        return `
            :root {
                /* OGM Font Families */
                --font-primary: "${this.ogmFonts.primary.family}", ` +
                               `${this.ogmFonts.primary.fallback};
                --font-secondary: "${this.ogmFonts.secondary.family}", ` +
                                 `${this.ogmFonts.secondary.fallback};
                --font-body: "${this.ogmFonts.body.family}", ` +
                             `${this.ogmFonts.body.fallback};
                --font-accent: "${this.ogmFonts.accent.family}", ` +
                              `${this.ogmFonts.accent.fallback};

                /* Typography Scale */
                --font-size-hero: ${this.scale.hero.fontSize};
                --font-size-h1: ${this.scale.h1.fontSize};
                --font-size-h2: ${this.scale.h2.fontSize};
                --font-size-h3: ${this.scale.h3.fontSize};
                --font-size-subtitle: ${this.scale.subtitle.fontSize};
                --font-size-body: ${this.scale.body.fontSize};
                --font-size-caption: ${this.scale.caption.fontSize};
                --font-size-small: ${this.scale.small.fontSize};

                /* Line Heights */
                --line-height-hero: ${this.scale.hero.lineHeight};
                --line-height-h1: ${this.scale.h1.lineHeight};
                --line-height-h2: ${this.scale.h2.lineHeight};
                --line-height-h3: ${this.scale.h3.lineHeight};
                --line-height-subtitle: ${this.scale.subtitle.lineHeight};
                --line-height-body: ${this.scale.body.lineHeight};
                --line-height-caption: ${this.scale.caption.lineHeight};
                --line-height-small: ${this.scale.small.lineHeight};

                /* Letter Spacing */
                --letter-spacing-hero: ${this.scale.hero.letterSpacing};
                --letter-spacing-h1: ${this.scale.h1.letterSpacing};
                --letter-spacing-h2: ${this.scale.h2.letterSpacing};
                --letter-spacing-h3: ${this.scale.h3.letterSpacing};
                --letter-spacing-subtitle: ${this.scale.subtitle.letterSpacing};
                --letter-spacing-body: ${this.scale.body.letterSpacing};
                --letter-spacing-caption: ${this.scale.caption.letterSpacing};
                --letter-spacing-small: ${this.scale.small.letterSpacing};

                /* Font Weights */
                --font-weight-light: 300;
                --font-weight-normal: 400;
                --font-weight-medium: 500;
                --font-weight-semibold: 600;
                --font-weight-bold: 700;
                --font-weight-black: 900;
            }
        `;
    },

    // =============================================================================
    // FONT FACE DECLARATIONS (To be used with local fonts)
    // =============================================================================

    getFontFaceCSS: function() {
        return `
            /* OGM Primary Font */
            @font-face {
                font-family: 'OGM Primary';
                src: url('/fonts/ogm-primary-light.woff2') format('woff2'),
                     url('/fonts/ogm-primary-light.woff') format('woff');
                font-weight: 300;
                font-style: normal;
                font-display: swap;
            }

            @font-face {
                font-family: 'OGM Primary';
                src: url('/fonts/ogm-primary-regular.woff2') format('woff2'),
                     url('/fonts/ogm-primary-regular.woff') format('woff');
                font-weight: 400;
                font-style: normal;
                font-display: swap;
            }

            @font-face {
                font-family: 'OGM Primary';
                src: url('/fonts/ogm-primary-medium.woff2') format('woff2'),
                     url('/fonts/ogm-primary-medium.woff') format('woff');
                font-weight: 500;
                font-style: normal;
                font-display: swap;
            }

            @font-face {
                font-family: 'OGM Primary';
                src: url('/fonts/ogm-primary-semibold.woff2') format('woff2'),
                     url('/fonts/ogm-primary-semibold.woff') format('woff');
                font-weight: 600;
                font-style: normal;
                font-display: swap;
            }

            @font-face {
                font-family: 'OGM Primary';
                src: url('/fonts/ogm-primary-bold.woff2') format('woff2'),
                     url('/fonts/ogm-primary-bold.woff') format('woff');
                font-weight: 700;
                font-style: normal;
                font-display: swap;
            }

            @font-face {
                font-family: 'OGM Primary';
                src: url('/fonts/ogm-primary-black.woff2') format('woff2'),
                     url('/fonts/ogm-primary-black.woff') format('woff');
                font-weight: 900;
                font-style: normal;
                font-display: swap;
            }

            /* OGM Secondary Font */
            @font-face {
                font-family: 'OGM Secondary';
                src: url('/fonts/ogm-secondary-regular.woff2') format('woff2'),
                     url('/fonts/ogm-secondary-regular.woff') format('woff');
                font-weight: 400;
                font-style: normal;
                font-display: swap;
            }

            @font-face {
                font-family: 'OGM Secondary';
                src: url('/fonts/ogm-secondary-medium.woff2') format('woff2'),
                     url('/fonts/ogm-secondary-medium.woff') format('woff');
                font-weight: 500;
                font-style: normal;
                font-display: swap;
            }

            @font-face {
                font-family: 'OGM Secondary';
                src: url('/fonts/ogm-secondary-semibold.woff2') format('woff2'),
                     url('/fonts/ogm-secondary-semibold.woff') format('woff');
                font-weight: 600;
                font-style: normal;
                font-display: swap;
            }

            @font-face {
                font-family: 'OGM Secondary';
                src: url('/fonts/ogm-secondary-bold.woff2') format('woff2'),
                     url('/fonts/ogm-secondary-bold.woff') format('woff');
                font-weight: 700;
                font-style: normal;
                font-display: swap;
            }

            /* OGM Body Font */
            @font-face {
                font-family: 'OGM Body';
                src: url('/fonts/ogm-body-light.woff2') format('woff2'),
                     url('/fonts/ogm-body-light.woff') format('woff');
                font-weight: 300;
                font-style: normal;
                font-display: swap;
            }

            @font-face {
                font-family: 'OGM Body';
                src: url('/fonts/ogm-body-regular.woff2') format('woff2'),
                     url('/fonts/ogm-body-regular.woff') format('woff');
                font-weight: 400;
                font-style: normal;
                font-display: swap;
            }

            @font-face {
                font-family: 'OGM Body';
                src: url('/fonts/ogm-body-medium.woff2') format('woff2'),
                     url('/fonts/ogm-body-medium.woff') format('woff');
                font-weight: 500;
                font-style: normal;
                font-display: swap;
            }

            @font-face {
                font-family: 'OGM Body';
                src: url('/fonts/ogm-body-semibold.woff2') format('woff2'),
                     url('/fonts/ogm-body-semibold.woff') format('woff');
                font-weight: 600;
                font-style: normal;
                font-display: swap;
            }

            /* OGM Accent Font */
            @font-face {
                font-family: 'OGM Accent';
                src: url('/fonts/ogm-accent-regular.woff2') format('woff2'),
                     url('/fonts/ogm-accent-regular.woff') format('woff');
                font-weight: 400;
                font-style: normal;
                font-display: swap;
            }

            @font-face {
                font-family: 'OGM Accent';
                src: url('/fonts/ogm-accent-semibold.woff2') format('woff2'),
                     url('/fonts/ogm-accent-semibold.woff') format('woff');
                font-weight: 600;
                font-style: normal;
                font-display: swap;
            }

            @font-face {
                font-family: 'OGM Accent';
                src: url('/fonts/ogm-accent-bold.woff2') format('woff2'),
                     url('/fonts/ogm-accent-bold.woff') format('woff');
                font-weight: 700;
                font-style: normal;
                font-display: swap;
            }

            @font-face {
                font-family: 'OGM Accent';
                src: url('/fonts/ogm-accent-black.woff2') format('woff2'),
                     url('/fonts/ogm-accent-black.woff') format('woff');
                font-weight: 900;
                font-style: normal;
                font-display: swap;
            }
        `;
    }
};

module.exports = FontScheme;

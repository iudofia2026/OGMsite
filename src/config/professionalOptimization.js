/**
 * Professional Optimization Standards for OGM Website
 *
 * Based on premium tequila industry analysis (818 Tequila)
 * These standards ensure enterprise-level quality and performance
 */

const ProfessionalOptimization = {

    // =============================================================================
    // FONT LOADING OPTIMIZATION
    // =============================================================================

    fontLoading: {
        // Strategy: Preload critical fonts to prevent layout shift
        preloadFonts: [
            {
                family: 'Playfair Display',
                weights: ['400', '700', '900'],
                formats: ['woff2', 'woff'],
                display: 'swap',
                priority: 'high' // For hero section
            },
            {
                family: 'Inter',
                weights: ['300', '400', '500', '600'],
                formats: ['woff2', 'woff'],
                display: 'swap',
                priority: 'medium' // For body text
            },
            {
                family: 'Crimson Pro',
                weights: ['400', '600'],
                formats: ['woff2', 'woff'],
                display: 'swap',
                priority: 'low' // For editorial content
            }
        ],

        // Fallback strategy
        fallbackStacks: {
            serif: '"Playfair Display", "Times New Roman", Georgia, serif',
            sansSerif: '"Inter", "Helvetica Neue", Arial, sans-serif',
            editorial: '"Crimson Pro", "Times New Roman", Georgia, serif',
            monospace: '"SF Mono", Monaco, "Cascadia Code", monospace'
        },

        // Performance optimization
        loadingStrategy: {
            critical: 'preload', // Hero fonts
            important: 'preconnect', // Supporting fonts
            deferred: 'lazy' // Optional fonts
        }
    },

    // =============================================================================
    // TYPOGRAPHY HIERARCHY SYSTEM
    // =============================================================================

    typography: {
        // Based on 818's premium positioning strategy
        scale: {
            hero: {
                fontSize: 'clamp(4rem, 12vw, 12rem)',
                lineHeight: '0.9',
                fontWeight: '900',
                letterSpacing: '0.05em',
                fontFamily: 'var(--font-primary-serif)'
            },
            h1: {
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                lineHeight: '1.1',
                fontWeight: '700',
                letterSpacing: '0.02em',
                fontFamily: 'var(--font-primary-serif)'
            },
            h2: {
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                lineHeight: '1.2',
                fontWeight: '600',
                letterSpacing: '0.01em',
                fontFamily: 'var(--font-secondary-sans)'
            },
            subtitle: {
                fontSize: 'clamp(1.2rem, 3vw, 2rem)',
                lineHeight: '1.3',
                fontWeight: '300',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-secondary-sans)'
            },
            body: {
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                lineHeight: '1.6',
                fontWeight: '400',
                letterSpacing: '0.01em',
                fontFamily: 'var(--font-body-serif)'
            },
            caption: {
                fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                lineHeight: '1.4',
                fontWeight: '400',
                letterSpacing: '0.05em',
                fontFamily: 'var(--font-secondary-sans)'
            }
        },

        // Responsive breakpoints for typography
        breakpoints: {
            mobile: '768px',
            tablet: '1024px',
            desktop: '1440px'
        }
    },

    // =============================================================================
    // PERFORMANCE OPTIMIZATION
    // =============================================================================

    performance: {
        // Critical rendering path optimization
        criticalCSS: [
            'typography',
            'layout',
            'hero-section',
            'navigation'
        ],

        // Image optimization
        images: {
            formats: ['avif', 'webp', 'jpg'],
            sizes: {
                hero: '1920x1080',
                background: '1440x900',
                thumbnail: '400x400'
            },
            loading: 'lazy', // Except hero images
            quality: {
                hero: 85,
                background: 75,
                thumbnail: 70
            }
        },

        // JavaScript optimization
        javascript: {
            bundling: 'code-splitting',
            loading: 'defer',
            minification: true,
            treeshaking: true
        },

        // CSS optimization
        css: {
            purging: true,
            minification: true,
            criticalInline: true,
            deferNonCritical: true
        }
    },

    // =============================================================================
    // ACCESSIBILITY STANDARDS
    // =============================================================================

    accessibility: {
        // WCAG 2.1 AA compliance
        colorContrast: {
            normal: '4.5:1',
            large: '3:1',
            nonText: '3:1'
        },

        // Focus management
        focus: {
            visible: true,
            logical: true,
            trapped: true // For modals
        },

        // Semantic HTML requirements
        semantics: {
            headingHierarchy: true,
            landmarkRoles: true,
            altText: 'descriptive',
            ariaLabels: 'meaningful'
        },

        // Motion preferences
        motion: {
            respectPreferences: true,
            providePauseControls: true,
            avoidFlashing: true
        }
    },

    // =============================================================================
    // BROWSER SUPPORT MATRIX
    // =============================================================================

    browserSupport: {
        // Premium brand targets modern browsers
        targets: [
            'Chrome >= 90',
            'Firefox >= 90',
            'Safari >= 14',
            'Edge >= 90',
            'iOS >= 14',
            'Android >= 90'
        ],

        // Graceful degradation strategies
        fallbacks: {
            cssCustomProperties: 'postcss-custom-properties',
            cssGrid: 'flexbox-fallback',
            webpImages: 'jpg-fallback'
        }
    },

    // =============================================================================
    // SEO OPTIMIZATION
    // =============================================================================

    seo: {
        // Technical SEO requirements
        meta: {
            title: 'unique-per-page',
            description: 'compelling-under-160',
            openGraph: 'complete',
            structuredData: 'json-ld'
        },

        // Performance metrics targets
        coreWebVitals: {
            lcp: '<2.5s', // Largest Contentful Paint
            fid: '<100ms', // First Input Delay
            cls: '<0.1', // Cumulative Layout Shift
            ttfb: '<600ms' // Time to First Byte
        },

        // Content strategy
        content: {
            headingStructure: 'hierarchical',
            internalLinking: 'strategic',
            imageOptimization: 'complete',
            mobileFirst: true
        }
    }
};

// Export for use across the application
module.exports = ProfessionalOptimization;
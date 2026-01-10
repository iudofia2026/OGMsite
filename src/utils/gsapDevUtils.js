/**
 * GSAP Development Utilities
 *
 * This module provides utilities for debugging GSAP animations during development.
 * These utilities should only be used in development mode.
 */

class GSAPDevUtils {
    static isDevelopment() {
        return (
            process.env.NODE_ENV === 'development' ||
            window.location.hostname === 'localhost' ||
            window.location.hostname === '127.0.0.1'
        );
    }

    /**
     * GSAP ScrollTrigger configuration with optional debug markers
     * @param {Object} config - ScrollTrigger configuration object
     * @param {boolean} showMarkers - Whether to show debug markers (default: false)
     * @returns {Object} - Complete ScrollTrigger configuration
     */
    static createScrollTriggerConfig(config, showMarkers = false) {
        const baseConfig = {
            trigger: config.trigger || '.scroll-container',
            start: config.start || 'top top',
            end: config.end,
            scrub: config.scrub !== undefined ? config.scrub : true,
            pin: config.pin,
            invalidateOnRefresh:
                config.invalidateOnRefresh !== undefined ? config.invalidateOnRefresh : true,
            ...config
        };

        // Add markers only if explicitly requested and in development
        if (showMarkers && this.isDevelopment()) {
            baseConfig.markers = true;
        }

        return baseConfig;
    }

    /**
     * Development-only ScrollTrigger configuration with markers enabled
     * Use this during development to see scroll trigger boundaries
     */
    static createDevScrollTriggerConfig(config) {
        return this.createScrollTriggerConfig(config, true);
    }

    /**
     * Production-ready ScrollTrigger configuration with markers disabled
     * Use this for production builds
     */
    static createProdScrollTriggerConfig(config) {
        return this.createScrollTriggerConfig(config, false);
    }

    /**
     * Toggle GSAP markers on/off for runtime debugging
     * Call this from browser console: GSAPDevUtils.toggleMarkers()
     */
    static toggleMarkers() {
        if (typeof ScrollTrigger !== 'undefined') {
            const triggers = ScrollTrigger.getAll();
            triggers.forEach(trigger => {
                trigger.vars.markers = !trigger.vars.markers;
                trigger.refresh();
            });
            // eslint-disable-next-line no-console
            console.log(`GSAP markers ${triggers[0]?.vars.markers ? 'enabled' : 'disabled'}`);
        }
    }

    /**
     * Console log all active ScrollTriggers for debugging
     */
    static debugScrollTriggers() {
        if (typeof ScrollTrigger !== 'undefined') {
            const triggers = ScrollTrigger.getAll();
            // eslint-disable-next-line no-console
            console.log('Active ScrollTriggers:', triggers);
            triggers.forEach((trigger, index) => {
                // eslint-disable-next-line no-console
                console.log(`Trigger ${index}:`, {
                    trigger: trigger.vars.trigger,
                    start: trigger.vars.start,
                    end: trigger.vars.end,
                    markers: trigger.vars.markers
                });
            });
        }
    }

    /**
     * Enable development mode markers for all scroll triggers
     * Call this to enable markers for existing animations
     */
    static enableDevMode() {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.getAll().forEach(trigger => {
                trigger.vars.markers = true;
                trigger.refresh();
            });
            // eslint-disable-next-line no-console
            console.log('Development mode enabled - GSAP markers visible');
        }
    }

    /**
     * Disable development mode markers for all scroll triggers
     * Call this to clean up markers for production
     */
    static disableDevMode() {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.getAll().forEach(trigger => {
                trigger.vars.markers = false;
                trigger.refresh();
            });
            // eslint-disable-next-line no-console
            console.log('Development mode disabled - GSAP markers hidden');
        }
    }
}

// Export for Node.js environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GSAPDevUtils;
}

// Make available globally in browser for console debugging
if (typeof window !== 'undefined') {
    window.GSAPDevUtils = GSAPDevUtils;
}

/**
 * GSAP Development Utilities (Client-side)
 *
 * Browser-compatible utilities for debugging GSAP animations.
 * Include this file only during development.
 */

class GSAPDevUtils {
    static isDevelopment() {
        return window.location.hostname === 'localhost' ||
               window.location.hostname === '127.0.0.1' ||
               window.location.search.includes('debug=true');
    }

    /**
     * GSAP ScrollTrigger configuration with optional debug markers
     * @param {Object} config - ScrollTrigger configuration object
     * @param {boolean} showMarkers - Whether to show debug markers (default: false)
     * @returns {Object} - Complete ScrollTrigger configuration
     */
    static createScrollTriggerConfig(config, showMarkers = false) {
        const baseConfig = {
            trigger: config.trigger || ".scroll-container",
            start: config.start || "top top",
            end: config.end,
            scrub: config.scrub !== undefined ? config.scrub : true,
            pin: config.pin,
            invalidateOnRefresh: config.invalidateOnRefresh !== undefined ? config.invalidateOnRefresh : true,
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
     */
    static createDevScrollTriggerConfig(config) {
        return this.createScrollTriggerConfig(config, true);
    }

    /**
     * Production-ready ScrollTrigger configuration with markers disabled
     */
    static createProdScrollTriggerConfig(config) {
        return this.createScrollTriggerConfig(config, false);
    }

    /**
     * Toggle GSAP markers on/off for runtime debugging
     * Usage from console: GSAPDevUtils.toggleMarkers()
     */
    static toggleMarkers() {
        if (typeof ScrollTrigger !== 'undefined') {
            const triggers = ScrollTrigger.getAll();
            triggers.forEach(trigger => {
                trigger.vars.markers = !trigger.vars.markers;
                trigger.refresh();
            });
            const isEnabled = triggers[0]?.vars.markers;
            console.log(`🎯 GSAP markers ${isEnabled ? 'enabled' : 'disabled'}`);
            return isEnabled;
        }
    }

    /**
     * Console log all active ScrollTriggers for debugging
     */
    static debugScrollTriggers() {
        if (typeof ScrollTrigger !== 'undefined') {
            const triggers = ScrollTrigger.getAll();
            console.group('🔍 Active ScrollTriggers');
            console.log(`Found ${triggers.length} triggers`);
            triggers.forEach((trigger, index) => {
                console.log(`Trigger ${index + 1}:`, {
                    trigger: trigger.vars.trigger,
                    start: trigger.vars.start,
                    end: trigger.vars.end,
                    markers: trigger.vars.markers,
                    pin: trigger.vars.pin,
                    scrub: trigger.vars.scrub
                });
            });
            console.groupEnd();
            return triggers;
        }
    }

    /**
     * Enable development mode markers for all scroll triggers
     */
    static enableDevMode() {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.getAll().forEach(trigger => {
                trigger.vars.markers = true;
                trigger.refresh();
            });
            console.log('🚧 Development mode enabled - GSAP markers visible');
        }
    }

    /**
     * Disable development mode markers for all scroll triggers
     */
    static disableDevMode() {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.getAll().forEach(trigger => {
                trigger.vars.markers = false;
                trigger.refresh();
            });
            console.log('✨ Development mode disabled - GSAP markers hidden');
        }
    }

    /**
     * Show helpful debugging commands in console
     */
    static showHelp() {
        console.log(`
🎬 GSAP Development Utilities Help:

Available commands:
• GSAPDevUtils.toggleMarkers()     - Toggle debug markers on/off
• GSAPDevUtils.enableDevMode()     - Show all markers
• GSAPDevUtils.disableDevMode()    - Hide all markers
• GSAPDevUtils.debugScrollTriggers() - List all ScrollTriggers
• GSAPDevUtils.showHelp()          - Show this help

URL Parameters:
• Add ?debug=true to URL to enable development mode
        `);
    }
}

// Make available globally for console debugging
window.GSAPDevUtils = GSAPDevUtils;

// Auto-enable dev mode if debug parameter is present
if (GSAPDevUtils.isDevelopment() && window.location.search.includes('debug=true')) {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            GSAPDevUtils.enableDevMode();
            console.log('🎯 Auto-enabled GSAP debug mode via URL parameter');
        }, 1000);
    });
}
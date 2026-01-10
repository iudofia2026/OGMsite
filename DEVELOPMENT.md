# Development Guide

This guide covers development-specific features and debugging tools for the OGMsite project.

## GSAP Debug Markers

The project includes a comprehensive system for managing GSAP ScrollTrigger debug markers that helps during development without cluttering the production build.

### Quick Enable/Disable Methods

#### Method 1: URL Parameter (Recommended)
Add `?debug=true` to any URL to enable debug markers:
```
http://localhost:3000/?debug=true
```

#### Method 2: Console Commands
Open browser console and use these commands:

```javascript
// Enable debug markers for all ScrollTriggers
GSAPDevUtils.enableDevMode()

// Disable debug markers
GSAPDevUtils.disableDevMode()

// Toggle markers on/off
GSAPDevUtils.toggleMarkers()

// List all active ScrollTriggers
GSAPDevUtils.debugScrollTriggers()

// Show help with all available commands
GSAPDevUtils.showHelp()
```

#### Method 3: Direct Functions
If `GSAPDevUtils` is not available, use these direct functions:

```javascript
// Enable markers
ScrollTrigger.getAll().forEach(trigger => {
    trigger.vars.markers = true;
    trigger.refresh();
});

// Disable markers
ScrollTrigger.getAll().forEach(trigger => {
    trigger.vars.markers = false;
    trigger.refresh();
});
```

### Development Utilities Files

#### `/public/js/gsap-dev-utils.js`
- Browser-compatible GSAP debugging utilities
- Automatically loaded in development mode
- Provides console commands for runtime debugging
- Auto-enables markers when `?debug=true` is in URL

#### `/src/utils/gsapDevUtils.js`
- Node.js compatible utilities for server-side use
- Can be used for build-time configurations
- Provides helper functions for creating ScrollTrigger configs

### How the System Works

1. **Production Mode**: No debug markers are shown, clean user experience
2. **Development Mode**: Markers can be enabled via URL parameter or console commands
3. **Auto-Detection**: System automatically detects localhost/development environment
4. **Runtime Control**: Toggle markers on/off without page reload

### Adding New ScrollTrigger Animations

When adding new GSAP animations, use the helper function to ensure proper marker handling:

```javascript
// Instead of this:
gsap.to(element, {
    x: 100,
    scrollTrigger: {
        trigger: ".my-trigger",
        start: "top center",
        end: "bottom center",
        scrub: true,
        markers: true  // Don't hardcode this!
    }
});

// Use this:
gsap.to(element, {
    x: 100,
    scrollTrigger: createScrollTriggerConfig({
        trigger: ".my-trigger",
        start: "top center",
        end: "bottom center",
        scrub: true
    })
});
```

### Debug Marker Components

The debug markers that were removed from production are these visual indicators:

```html
<!-- Start marker (green) -->
<div class="gsap-marker-start" style="border-color: green; font-size: 16px; color: green; ...">start</div>

<!-- End marker (red) -->
<div class="gsap-marker-end" style="border-color: red; font-size: 16px; color: red; ...">end</div>

<!-- Scroller start marker -->
<div class="gsap-marker-scroller-start" style="border-color: green; ...">scroller-start</div>

<!-- Scroller end marker -->
<div class="gsap-marker-scroller-end" style="border-color: red; ...">scroller-end</div>
```

These markers show:
- **Green lines**: Where ScrollTrigger starts
- **Red lines**: Where ScrollTrigger ends
- **Position indicators**: Exact scroll positions for trigger points

### Troubleshooting

#### Markers not showing?
1. Check if you're in development mode: `window.location.hostname`
2. Try the URL parameter method: `?debug=true`
3. Manually enable: `GSAPDevUtils.enableDevMode()`

#### Markers won't disappear?
1. Try: `GSAPDevUtils.disableDevMode()`
2. Refresh the page
3. Remove `?debug=true` from URL

#### ScrollTrigger not working?
1. List all triggers: `GSAPDevUtils.debugScrollTriggers()`
2. Check console for errors
3. Verify element selectors exist in DOM

### Best Practices

1. **Never hardcode `markers: true`** in production code
2. **Use the helper functions** for consistent behavior
3. **Test both with and without markers** during development
4. **Remove `?debug=true`** before sharing URLs with others
5. **Document any custom ScrollTrigger animations** you add

## Environment Configuration

The project automatically detects the environment:

- **Development**: `localhost`, `127.0.0.1`, or `?debug=true` parameter
- **Production**: All other domains

You can override environment detection by setting the `NODE_ENV` environment variable.
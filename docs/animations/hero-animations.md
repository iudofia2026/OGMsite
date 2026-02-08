# OGM Homepage Hero Animations Documentation

## Overview

The OGM homepage features a sophisticated array of hero animations designed to create an immersive, premium brand experience. These animations work in harmony to enhance visual appeal while maintaining optimal performance. The implementation combines CSS keyframe animations, React components, and JavaScript for an engaging user experience.

### Animation Philosophy
- **Subtle Elegance**: All animations are designed to be gentle and sophisticated, avoiding distracting effects
- **Performance-First**: GPU-accelerated transforms and optimized CSS properties ensure smooth 60fps performance
- **Layered Depth**: Multiple animation layers create visual hierarchy and depth
- **Brand Consistency**: All animations complement the OGM premium tequila brand aesthetic

## Individual Animation Details

### 1. Gentle Background Zoom (hero-background-wrapper)

**Purpose**: Creates a subtle, cinematic breathing effect on the hero background image to add life and movement without distraction.

**Technical Implementation**:
```css
.hero-background-wrapper {
  animation: subtle-zoom 45s ease-in-out infinite;
}

@keyframes subtle-zoom {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.03);
  }
}
```

**Animation Timing**:
- Duration: 45 seconds (very slow, subtle)
- Easing: ease-in-out (smooth acceleration/deceleration)
- Iteration: infinite (continuous loop)

**Performance Considerations**:
- Uses `transform: scale()` for GPU acceleration
- Next.js Image component with `willChange: 'transform'` for browser optimization hints
- Minimal impact on layout (no reflows)

**File Locations**:
- `/Users/iudofia/Documents/GitHub/OGMsite/src/app/page.tsx` (lines 36-47)
- Applied to: Hero background image wrapper

**Maintenance Notes**:
- **Adjust intensity**: Modify scale values (1.03 = 3% zoom)
- **Change timing**: Update 45s duration for faster/slower zoom
- **Pause on hover**: Add `animation-play-state: paused` on hover if needed

---

### 2. Ambient Light Rays (light-ray elements)

**Purpose**: Creates sophisticated, golden ambient lighting effects that simulate premium studio lighting and add depth to the hero section.

**Technical Implementation**:
Three individual light ray elements with unique animations:

```css
.light-ray {
  position: absolute;
  background: linear-gradient(
    to bottom,
    rgba(255, 215, 0, 0.03) 0%,
    rgba(255, 215, 0, 0.01) 50%,
    transparent 100%
  );
  filter: blur(30px);
  pointer-events: none;
  transform-origin: top center;
}
```

**Individual Ray Specifications**:

**Ray 1 (Left)**:
```css
.ray-1 {
  top: 0;
  left: 5%;
  width: 200px;
  height: 100%;
  animation: ray-drift-1 90s ease-in-out infinite;
  opacity: 0.4;
}
```

**Ray 2 (Right)**:
```css
.ray-2 {
  top: 0;
  right: 10%;
  width: 180px;
  height: 100%;
  animation: ray-drift-2 75s ease-in-out infinite;
  animation-delay: -30s;
  opacity: 0.3;
}
```

**Ray 3 (Center)**:
```css
.ray-3 {
  top: 0;
  left: 45%;
  width: 150px;
  height: 100%;
  animation: ray-drift-3 80s ease-in-out infinite;
  animation-delay: -50s;
  opacity: 0.35;
}
```

**Animation Timing**:
- Ray 1: 90s cycle
- Ray 2: 75s cycle (-30s offset)
- Ray 3: 80s cycle (-50s offset)
- Different durations create non-repeating patterns

**Performance Considerations**:
- `pointer-events: none` prevents interaction overhead
- GPU-accelerated transforms and opacity changes
- Blur filter applied once, not animated
- Z-index layering prevents layout interference

**File Locations**:
- `/Users/iudofia/Documents/GitHub/OGMsite/src/app/page.tsx` (lines 49-123)
- Container: `.absolute.inset-0.z-3.pointer-events-none.overflow-hidden`

**Maintenance Notes**:
- **Adjust intensity**: Modify opacity values (0.3-0.5 range)
- **Change positioning**: Update left/right percentages and widths
- **Customize movement**: Modify transform values in keyframes
- **Color adjustment**: Update rgba values in gradient

---

### 3. Text Shadow Breathing (breathing-shadow class)

**Purpose**: Adds a subtle, golden glow animation to text elements that creates emphasis and premium feel without being distracting.

**Technical Implementation**:
```css
.breathing-shadow {
  animation: shadow-breathe 8s ease-in-out infinite;
}

@keyframes shadow-breathe {
  0%, 100% {
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
  }
  50% {
    text-shadow: 0 0 30px rgba(255, 215, 0, 0.3), 0 0 40px rgba(255, 215, 0, 0.1);
  }
}
```

**Animation Timing**:
- Duration: 8 seconds (moderate, noticeable but not rapid)
- Easing: ease-in-out (smooth transitions)
- Peak intensity: Mid-cycle (50%)

**Performance Considerations**:
- Text shadow changes are moderately expensive (paint operation)
- Optimized with minimal shadow blur radius changes
- No transform/position changes (layout-stable)

**File Locations**:
- `/Users/iudofia/Documents/GitHub/OGMsite/src/app/page.tsx` (lines 125-137)
- Applied to: "Coming This Spring" subtitle text

**Maintenance Notes**:
- **Intensity control**: Adjust rgba opacity values
- **Speed adjustment**: Modify 8s duration
- **Color customization**: Change rgba(255, 215, 0) to different gold tones
- **Disable on mobile**: Consider reducing animation complexity on smaller screens

---

### 4. Bottle Reflection Effects (bottle-reflection class)

**Purpose**: Creates sophisticated studio lighting effects on the scrolling bottle component, simulating professional product photography lighting.

**Technical Implementation**:
Two pseudo-element layers with animated radial gradients:

```css
.bottle-reflection::before {
  content: '';
  position: absolute;
  inset: -10%;
  background: radial-gradient(
    ellipse at 30% 20%,
    rgba(255, 215, 0, 0.08) 0%,
    transparent 50%
  );
  animation: studio-lighting 12s ease-in-out infinite;
  pointer-events: none;
  filter: blur(20px);
  z-index: -1;
}

.bottle-reflection::after {
  content: '';
  position: absolute;
  inset: -5%;
  background: radial-gradient(
    ellipse at 70% 80%,
    rgba(255, 200, 100, 0.05) 0%,
    transparent 40%
  );
  animation: fill-light 15s ease-in-out infinite;
  animation-delay: -6s;
  pointer-events: none;
  filter: blur(15px);
  z-index: -1;
}
```

**Studio Lighting Animation**:
```css
@keyframes studio-lighting {
  0%, 100% {
    opacity: 0.3;
    transform: translateX(0) translateY(0) scale(1);
  }
  50% {
    opacity: 0.6;
    transform: translateX(10px) translateY(-5px) scale(1.1);
  }
}
```

**Fill Light Animation**:
```css
@keyframes fill-light {
  0%, 100% {
    opacity: 0.2;
    transform: translateX(0) translateY(0);
  }
  50% {
    opacity: 0.5;
    transform: translateX(-8px) translateY(5px);
  }
}
```

**Animation Timing**:
- Studio light: 12s cycle
- Fill light: 15s cycle (-6s offset)
- Different cycles create dynamic, non-repeating lighting effects

**Performance Considerations**:
- Pseudo-elements separate from main content (no layout impact)
- GPU-accelerated transforms and opacity
- Blur filters are static (not animated)
- Z-index layering ensures proper visual hierarchy

**File Locations**:
- `/Users/iudofia/Documents/GitHub/OGMsite/src/components/ScrollingBottle.tsx` (lines 11-63)
- Applied to: `.hero-bottle` element

**Maintenance Notes**:
- **Intensity**: Adjust opacity values and gradient alpha channels
- **Positioning**: Modify ellipse position percentages
- **Speed**: Change duration values (12s, 15s)
- **Coverage**: Adjust `inset` values for larger/smaller light areas

---

### 5. Signature Reveal Animation

**Purpose**: Creates an elegant, delayed signature appearance that adds a personal, premium touch to the hero section.

**Technical Implementation**:
Two-stage animation with container fade-in and clip-path reveal:

```css
.signature-container {
  animation: signatureFadeIn 0.5s ease-out 1.2s forwards;
}

@keyframes signatureFadeIn {
  to {
    opacity: 1;
  }
}

.signature-wrapper {
  overflow: hidden;
  position: relative;
}

.signature-image {
  clip-path: inset(0 100% 0 0);
  animation: revealSignature 3s ease-out 1.5s forwards;
}

@keyframes revealSignature {
  to {
    clip-path: inset(0 0% 0 0);
  }
}
```

**Animation Timing**:
- Container fade: 0.5s duration, 1.2s delay
- Signature reveal: 3s duration, 1.5s delay
- Total sequence: ~4.5 seconds from page load

**Performance Considerations**:
- Clip-path animation is GPU-accelerated
- Transform-free (layout-stable)
- Staggered timing creates smooth reveal sequence

**File Locations**:
- `/Users/iudofia/Documents/GitHub/OGMsite/src/app/page.tsx` (lines 8-33)
- HTML structure: Lines 202-216

**Maintenance Notes**:
- **Reveal direction**: Modify clip-path values for different wipe directions
- **Timing adjustment**: Change delay values (1.2s, 1.5s)
- **Speed**: Modify duration values (0.5s, 3s)
- **Initial state**: Change starting opacity and clip-path values

---

## Technical Details

### CSS Animations Summary

| Animation | Type | Duration | Easing | GPU Accelerated |
|-----------|------|----------|---------|-----------------|
| Background Zoom | Transform | 45s | ease-in-out | Yes |
| Light Rays | Transform + Opacity | 75-90s | ease-in-out | Yes |
| Text Shadow Breathing | Text Shadow | 8s | ease-in-out | Partial |
| Bottle Reflection | Transform + Opacity | 12-15s | ease-in-out | Yes |
| Signature Reveal | Clip-path | 3s | ease-out | Yes |

### Performance Optimizations

1. **GPU Acceleration**:
   - All transform-based animations use GPU-accelerated properties
   - `willChange: 'transform'` hints browser optimization
   - Minimal animation of paint-heavy properties

2. **Layout Stability**:
   - No width/height animations (no reflows)
   - Positioned elements don't affect document flow
   - Fixed/absolute positioning prevents layout shifts

3. **Optimized Properties**:
   - Transforms over position changes
   - Opacity over visibility changes
   - Clip-path over width/height animations

4. **Resource Management**:
   - Next.js Image optimization for background
   - Lazy loading for below-fold content
   - Efficient event listener handling

### Z-Index Layering

```css
z-0   /* Background image wrapper */
z-3   /* Ambient light rays */
z-10  /* Logo and signature */
z-40  /* Scrolling bottle */
z-[9999] /* Navigation overlay */
z-[10000] /* Navigation close button */
```

### Animation Timing Functions

- **ease-in-out**: Smooth acceleration and deceleration (most animations)
- **ease-out**: Quick start, smooth deceleration (signature reveal)
- **linear**: Constant speed (Instagram button rotation)

---

## Maintenance Guide

### Modifying Animation Speed

**To make animations faster**:
```css
/* Example: Make background zoom 2x faster */
.hero-background-wrapper {
  animation: subtle-zoom 22.5s ease-in-out infinite; /* was 45s */
}
```

**To make animations slower**:
```css
/* Example: Make text breathing 2x slower */
.breathing-shadow {
  animation: shadow-breathe 16s ease-in-out infinite; /* was 8s */
}
```

### Adjusting Animation Intensity

**Background Zoom Intensity**:
```css
@keyframes subtle-zoom {
  50% {
    transform: scale(1.05); /* Increase for more zoom */
  }
}
```

**Light Ray Opacity**:
```css
.ray-1 {
  opacity: 0.6; /* Increase for brighter rays */
}
```

**Text Shadow Intensity**:
```css
@keyframes shadow-breathe {
  50% {
    text-shadow: 0 0 40px rgba(255, 215, 0, 0.5), /* Stronger glow */
                 0 0 60px rgba(255, 215, 0, 0.2);
  }
}
```

### Browser Compatibility

**Supported Browsers**:
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (clip-path prefix may be needed for older versions)
- Mobile iOS: Full support
- Mobile Android: Full support

**Fallbacks**:
- Clip-path: Provide alternative fade-in for older browsers
- Backdrop-filter: Solid background fallback
- CSS Grid: Flexbox fallback for navigation

### Debugging Animations

**Chrome DevTools**:
1. Open DevTools (F12)
2. Go to Elements panel
3. Select animated element
4. View computed styles and active animations
5. Use "Animations" panel to see timeline

**Performance Profiling**:
1. Open DevTools Performance panel
2. Start recording
3. Interact with page
4. Stop recording and analyze frames
5. Look for long tasks (>50ms)

### Common Issues and Solutions

**Animation Jank**:
- Ensure GPU acceleration (transform, opacity)
- Reduce layout thrashing (avoid animating layout properties)
- Use `willChange` sparingly

**Mobile Performance**:
- Consider reducing animation complexity on mobile
- Use `prefers-reduced-motion` media query
- Test on actual devices, not simulators

**Timing Conflicts**:
- Check animation-delay values
- Ensure z-index layering is correct
- Verify CSS specificity

---

## File Structure Reference

```
OGMsite/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Hero section + signature styles
│   │   └── globals.css                 # Global styles + Instagram button
│   └── components/
│       ├── ScrollingBottle.tsx         # Bottle reflection animations
│       └── Navigation.tsx              # Navigation animations
├── public/
│   ├── js/
│   │   └── heroBackground.js           # Canvas background animation
│   └── images/
│       ├── ogm background.png          # Hero background image
│       └── OGM_signature-wht.svg       # Signature image
└── docs/
    └── animations/
        └── hero-animations.md          # This documentation
```

## Additional Notes

### Responsive Considerations
- All animations are viewport-relative (vw/vh units)
- Mobile devices may benefit from reduced animation complexity
- Test across different screen sizes and orientations

### Accessibility
- Respect `prefers-reduced-motion` setting for users with motion sensitivity
- Ensure animations don't interfere with screen readers
- Maintain sufficient color contrast during animations

### Future Enhancements
- Consider adding scroll-triggered animations
- Interactive elements could have hover states
- Seasonal animation themes could be implemented
- Performance monitoring and optimization tracking

---

### 6. Navigation Menu Animations

**Purpose**: Creates a sophisticated, multi-stage navigation overlay with smooth entrance animations and interactive hamburger menu transformation.

**Technical Implementation**:
The navigation system includes several sophisticated animations:

**Hamburger Menu Transformation**:
```css
/* SVG path animations for hamburger to X transformation */
.line.line-top-bottom {
  stroke-dasharray: isOpen ? '20 300' : '12 63';
  stroke-dashoffset: isOpen ? '-32.42' : '0';
  transition: 'stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
               stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1),
               stroke 300ms ease-out';
}

/* Icon rotation */
svg {
  transition: transform 600ms ease-out;
  transform: isOpen ? 'rotate(-45deg)' : 'rotate(0deg)';
}
```

**Overlay Entrance Animations**:
```css
/* Main overlay fade */
.nav-overlay {
  transition: opacity 500ms ease-out;
  opacity: isOpen ? 1 : 0;
  visibility: isOpen ? 'visible' : 'invisible';
}

/* Staggered content entrance */
.logo {
  opacity: isOpen ? 1 : 0;
  transform: isOpen ? 'translateY(0)' : 'translateY(-20px)';
  transition: all 500ms ease-out;
  transition-delay: isOpen ? '0.1s' : '0s';
}

.nav-links li {
  opacity: isOpen ? 1 : 0;
  transform: isOpen ? 'translateX(0)' : 'translateX(-30px)';
  transition: all 500ms ease-out;
  transition-delay: isOpen ? '0.2s + (index * 0.08s)' : '0s';
}
```

**Animation Timing**:
- Hamburger transformation: 600ms
- Overlay fade: 500ms
- Content stagger: 0.1s - 0.6s (sequential)
- Color transitions: 300ms

**Performance Considerations**:
- GPU-accelerated transforms
- Cubic-bezier easing for smooth feel
- Staggered delays prevent simultaneous layout thrashing
- `backdrop-filter: blur(10px)` for modern glass effect

**File Locations**:
- `/Users/iudofia/Documents/GitHub/OGMsite/src/components/Navigation.tsx` (lines 122-270)
- Scroll-based color changing (lines 22-63)

**Maintenance Notes**:
- **Stagger timing**: Modify `transitionDelay` calculations
- **Menu colors**: Update `menuColor` state based on scroll sections
- **Animation speed**: Adjust duration values (500ms, 600ms)
- **Easing**: Modify cubic-bezier values for different feel

---

### 7. Instagram Button Rotating Text

**Purpose**: Creates an engaging, animated Instagram button with rotating text and icon transitions.

**Technical Implementation**:
```css
.instagram-button .button__text {
  animation: text-rotation 8s linear infinite;
}

.instagram-button .button__text span {
  transform: rotate(calc(18deg * var(--index)));
}

@keyframes text-rotation {
  to {
    rotate: 360deg;
  }
}

.instagram-button:hover {
  background: linear-gradient(135deg, /* gold gradient */);
  transform: scale(1.05);
  transition: background 300ms, transform 200ms;
}

/* Icon swap animation */
.instagram-button:hover .button__icon:first-child {
  transform: translate(150%, -150%);
  transition: transform 0.3s ease-in-out;
}

.instagram-button:hover .button__icon--copy {
  transform: translate(0);
  transition: transform 0.3s ease-in-out 0.1s;
}
```

**Animation Timing**:
- Text rotation: 8s continuous loop
- Hover scale: 200ms
- Background transition: 300ms
- Icon swap: 300ms with 100ms stagger

**Performance Considerations**:
- Continuous rotation uses GPU acceleration
- Minimal repaint impact (transform-based)
- Hover effects are transient

**File Locations**:
- `/Users/iudofia/Documents/GitHub/OGMsite/src/app/globals.css` (lines 191-283)
- Component: `/Users/iudofia/Documents/GitHub/OGMsite/src/components/InstagramButton.tsx`

**Maintenance Notes**:
- **Rotation speed**: Change 8s duration
- **Icon swap timing**: Adjust 0.1s delay
- **Hover effects**: Modify scale and gradient values
- **Accessibility**: Consider `prefers-reduced-motion` for rotation

---

### 8. Scrolling Bottle Centering Animation

**Purpose**: Creates a smooth, scroll-based centering animation that moves the bottle from right to center as user scrolls.

**Technical Implementation**:
```javascript
// JavaScript-based scroll animation
const handleScroll = () => {
  const scrollY = window.scrollY;
  const centerStart = 402;
  const centerEnd = 700;

  if (scrollY >= centerStart && scrollY <= centerEnd) {
    const progress = (scrollY - centerStart) / (centerEnd - centerStart);
    const translateX = 420 - (420 * progress); // 420px to 0px
    const scale = 1 + (0.15 * progress); // 1 to 1.15

    bottle.style.transform = `translateX(${translateX}px) translateY(-30px) scale(${scale})`;
  }
};
```

**Animation Timing**:
- Scroll range: 402px - 700px (298px scroll distance)
- Translation: 420px → 0px (right to center)
- Scale: 1.0 → 1.15 (15% enlargement)
- Uses `requestAnimationFrame` for smooth 60fps

**Performance Considerations**:
- GPU-accelerated transform properties
- Throttled via requestAnimationFrame
- Only animates during specific scroll range
- Position switching (fixed → absolute) optimizes performance

**File Locations**:
- `/Users/iudofia/Documents/GitHub/OGMsite/src/components/ScrollingBottle.tsx` (lines 92-154)
- Initial load animation: lines 169-173

**Maintenance Notes**:
- **Centering range**: Modify centerStart/centerEnd values
- **Starting position**: Change 420px translateX
- **Scale amount**: Adjust 0.15 multiplier
- **Animation smoothness**: requestAnimationFrame already optimized

---

### 9. Bottle Image Transition (Wipe Effect)

**Purpose**: Creates smooth transitions between different bottle variants using GSAP clip-path animations.

**Technical Implementation**:
```javascript
// GSAP-based wipe transition
const transitionBottle = (newSrc) => {
  // Set up layers - OLD on top (wipes away), NEW on bottom (revealed)
  topImg.src = oldSrc;
  bottomImg.src = newSrc;

  // Animate the wipe
  gsap.to(topBottle, {
    clipPath: 'inset(100% 0 0 0)', // Wipes from top to bottom
    duration: 0.5,
    ease: 'power2.inOut',
    onComplete: () => {
      topImg.src = newSrc; // Reset for next transition
      gsap.set(topBottle, { clearProps: 'clipPath' });
    }
  });
};
```

**Animation Timing**:
- Transition duration: 500ms
- Easing: power2.inOut (smooth acceleration/deceleration)
- Minimal debounce: 5ms for responsive transitions

**Performance Considerations**:
- GSAP ScrollTrigger optimization
- GPU-accelerated clip-path animations
- Multiple redundant triggers prevent missed transitions
- FastScrollEnd optimization for rapid scrolling

**File Locations**:
- `/Users/iudofia/Documents/GitHub/OGMsite/src/components/ScrollingBottle.tsx` (lines 176-334)

**Maintenance Notes**:
- **Transition speed**: Modify 0.5s duration
- **Wipe direction**: Change clip-path values
- **Trigger sensitivity**: Adjust debounce timing
- **Easing**: Experiment with different GSAP ease functions

---

## Additional Animation Systems

### GSAP ScrollTrigger Animations

**File**: `/Users/iudofia/Documents/GitHub/OGMsite/public/js/animations.js`

**Purpose**: Provides scroll-based animations for product showcases and about sections.

**Key Features**:
- Desktop: Vertical scroll behavior
- Mobile: Horizontal scroll behavior
- IntersectionObserver for bottle animations
- Smooth scroll-to functionality

**Performance Optimizations**:
- MatchMedia for responsive breakpoints
- Throttled resize handlers (150ms)
- GPU acceleration with `force3D: true`
- IntersectionObserver instead of constant polling

---

## Technical Details

### CSS Animations Summary (Extended)

| Animation | Type | Duration | Easing | GPU Accelerated | Location |
|-----------|------|----------|---------|-----------------|----------|
| Background Zoom | Transform | 45s | ease-in-out | Yes | page.tsx |
| Light Rays | Transform + Opacity | 75-90s | ease-in-out | Yes | page.tsx |
| Text Shadow Breathing | Text Shadow | 8s | ease-in-out | Partial | page.tsx |
| Bottle Reflection | Transform + Opacity | 12-15s | ease-in-out | Yes | ScrollingBottle.tsx |
| Signature Reveal | Clip-path | 3s | ease-out | Yes | page.tsx |
| Navigation Overlay | Opacity + Transform | 500-600ms | cubic-bezier | Yes | Navigation.tsx |
| Instagram Button | Rotate + Transform | 8s loop | linear | Yes | globals.css |
| Bottle Centering | Transform | Scroll-based | - | Yes | ScrollingBottle.tsx |
| Bottle Transition | Clip-path | 500ms | power2.inOut | Yes | ScrollingBottle.tsx |

### Performance Optimizations (Extended)

1. **GPU Acceleration**:
   - All transform-based animations use GPU-accelerated properties
   - `willChange: 'transform'` hints browser optimization
   - `force3D: true` in GSAP animations
   - Minimal animation of paint-heavy properties

2. **Layout Stability**:
   - No width/height animations (no reflows)
   - Positioned elements don't affect document flow
   - Fixed/absolute positioning prevents layout shifts

3. **Optimized Properties**:
   - Transforms over position changes
   - Opacity over visibility changes
   - Clip-path over width/height animations
   - `requestAnimationFrame` for smooth scroll handling

4. **Resource Management**:
   - Next.js Image optimization for backgrounds
   - Lazy loading for below-fold content
   - Efficient event listener handling with cleanup
   - Throttled/debounced scroll handlers

5. **GSAP Optimization**:
   - MatchMedia for responsive behavior
   - ScrollTrigger fastScrollEnd for rapid scrolling
   - IntersectionObserver over constant polling
   - Proper cleanup and kill() calls

---

## Advanced Configuration

### Modifying Navigation Animation Stagger

```css
/* Current stagger formula: 0.2s + (index * 0.08s) */
/* To make faster: */
transition-delay: isOpen ? `${0.1 + index * 0.04}s` : '0s';

/* To make slower: */
transition-delay: isOpen ? `${0.3 + index * 0.12}s` : '0s';
```

### Customizing Bottle Centering Range

```javascript
// In ScrollingBottle.tsx, modify these values:
const centerStart = 402;  // When animation starts
const centerEnd = 700;    // When animation ends
// Range: 700 - 402 = 298px scroll distance
```

### Adjusting Instagram Button Rotation

```css
/* Current: 8s for full rotation */
/* Faster: */
animation: text-rotation 4s linear infinite;

/* Slower: */
animation: text-rotation 12s linear infinite;
```

---

## Browser Compatibility (Extended)

**Supported Browsers**:
- Chrome/Edge: Full support (all animations)
- Firefox: Full support (backdrop-filter may need prefix)
- Safari: Full support (clip-path prefix may be needed for older versions)
- Mobile iOS: Full support (iOS 14+ for backdrop-filter)
- Mobile Android: Full support (Chrome 90+)

**Specific Considerations**:
- `backdrop-filter`: Safari may need `-webkit-backdrop-filter`
- `clip-path`: Firefox/IE may need `clip-path: url(#clip-path-reference)`
- `rotate`: CSS `rotate()` property supported in modern browsers only
- GSAP: Works back to IE11 with proper polyfills

**Fallbacks**:
- Clip-path: Provide alternative fade-in for older browsers
- Backdrop-filter: Solid background fallback
- CSS Grid: Flexbox fallback for navigation
- CSS rotate: Transform rotate fallback

---

## File Structure Reference (Updated)

```
OGMsite/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Hero section + signature styles
│   │   └── globals.css                 # Global styles + Instagram button
│   └── components/
│       ├── ScrollingBottle.tsx         # Bottle animations + transitions
│       ├── Navigation.tsx              # Navigation animations
│       └── InstagramButton.tsx         # Instagram button component
├── public/
│   ├── js/
│   │   ├── animations.js               # GSAP scroll animations
│   │   └── heroBackground.js           # Canvas background animation
│   └── images/
│       ├── ogm background.png          # Hero background image
│       └── OGM_signature-wht.svg       # Signature image
└── docs/
    └── animations/
        └── hero-animations.md          # This documentation
```

---

## Performance Monitoring

### Measuring Animation Performance

**Chrome DevTools**:
1. Open DevTools (F12)
2. Go to Performance panel
3. Start recording
4. Interact with page
5. Stop recording and analyze frames
6. Look for:
   - Long tasks (>50ms)
   - Frame rate drops (below 60fps)
   - Layout thrashing
   - Paint complexity

**Key Metrics**:
- FPS: Should maintain 60fps during animations
- CPU Usage: Should stay below 30% during smooth animations
- GPU Memory: Monitor for excessive memory usage
- Network: Ensure animations don't block resource loading

---

## Troubleshooting Guide

### Animation Not Starting

**Problem**: Animations don't play on page load
**Solutions**:
- Check if client-side hydration is complete
- Verify CSS is loaded (check network tab)
- Ensure JavaScript has executed (console logs)
- Check for CSS specificity conflicts

### Choppy Animations

**Problem**: Animations are not smooth
**Solutions**:
- Verify GPU acceleration is active
- Reduce animation complexity
- Check for competing animations
- Ensure proper cleanup of event listeners
- Test with reduced motion preferences

### Mobile Performance Issues

**Problem**: Animations slow on mobile
**Solutions**:
- Reduce animation complexity on mobile
- Use `prefers-reduced-motion` media query
- Optimize image sizes
- Test on actual devices (not simulators)
- Consider reducing number of concurrent animations

---

**Last Updated**: February 8, 2026
**Maintained By**: OGM Development Team
**Version**: 2.0.0 (Extended Documentation)
# Background Image Filter Components

This document outlines the reusable CSS filter components for darkening and enhancing background images in the OGM website.

## Available Filter Classes

### CSS Filter-Based Components

#### `.bg-filter-subtle-darken`
- **Brightness**: 85% (slight darkening)
- **Contrast**: 105% (minimal contrast boost)
- **Use Case**: Very subtle darkening for images that need minimal adjustment
- **Example**: Light backgrounds where text needs slightly better readability

#### `.bg-filter-darken`
- **Brightness**: 70% (moderate darkening)
- **Contrast**: 110% (slight contrast boost)
- **Use Case**: Standard darkening for most background images
- **Example**: Currently applied to the agave background image

#### `.bg-filter-darken-more`
- **Brightness**: 50% (significant darkening)
- **Contrast**: 120% (noticeable contrast boost)
- **Use Case**: Very bright images that need substantial darkening
- **Example**: Bright outdoor scenes or light-colored images

### Overlay-Based Components

#### `.bg-overlay-subtle`
- **Overlay**: 15% black transparency
- **Use Case**: Minimal darkening with overlay approach
- **Advantage**: More consistent across different image types

#### `.bg-overlay-dark`
- **Overlay**: 30% black transparency
- **Use Case**: Standard darkening with overlay method
- **Advantage**: Uniform darkening regardless of original image brightness

#### `.bg-overlay-darker`
- **Overlay**: 50% black transparency
- **Use Case**: Heavy darkening for very bright images
- **Advantage**: Strong text readability improvement

## Usage Examples

### Method 1: Direct CSS Filter (Recommended)
```css
.bg-img-1 {
    background-image: url("/images/agave.png");
    filter: brightness(0.7) contrast(1.1); /* Using bg-filter-darken values */
}
```

### Method 2: Filter Class Application
```html
<div class="bg-img-1 bg-filter-darken">
    <!-- Content -->
</div>
```

### Method 3: Overlay Application
```html
<div class="section-1-l bg-overlay-dark">
    <div class="bg-img-1"></div>
    <div class="content-parent">
        <!-- Content automatically appears above overlay -->
    </div>
</div>
```

## Technical Implementation

### Filter Method
- **Pros**: Direct image manipulation, single element
- **Cons**: May affect child elements if not carefully managed
- **Best For**: Background images that don't contain interactive elements

### Overlay Method
- **Pros**: Doesn't affect child elements, more predictable
- **Cons**: Requires additional pseudo-element
- **Best For**: Complex layouts with interactive content over backgrounds

## Current Applications

### Agave Background (section-1-l)
- **Image**: `/images/agave.png`
- **Filter**: `brightness(0.7) contrast(1.1)`
- **Result**: Darkened agave with enhanced contrast for better text readability

## Adding New Filters

To create custom filter variations:

```css
.bg-filter-custom {
    filter: brightness(0.6) contrast(1.15) saturate(1.1);
}

.bg-overlay-custom {
    position: relative;
}

.bg-overlay-custom::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1;
    pointer-events: none;
}
```

## Best Practices

1. **Test on Multiple Images**: Different source images may need different filter strengths
2. **Consider Text Contrast**: Ensure sufficient contrast for text readability
3. **Mobile Testing**: Filters may appear differently on mobile devices
4. **Performance**: CSS filters are GPU-accelerated but use sparingly on many elements
5. **Fallbacks**: Consider providing fallbacks for older browsers if needed

## Browser Support

- **CSS Filters**: Supported in all modern browsers (IE 10+)
- **Pseudo-element Overlays**: Universal browser support
- **GPU Acceleration**: Modern browsers optimize filter rendering
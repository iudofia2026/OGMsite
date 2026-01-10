# Background Images Directory

This directory contains all background images used in the OGM tequila website, organized by section and ingredient.

## Current Background Images

### Tequila Ingredient Backgrounds

#### `agave.png` (Premium Reposado - section-1-l)
- **Used in**: `.bg-img-1`
- **Section**: Premium Reposado text section (gold theme)
- **Image**: Close-up of agave plant leaves with golden tones
- **Positioning**: `50% 50%` (centered)
- **Size**: `cover` (full coverage)
- **Filter**: `brightness(0.7) contrast(1.1)` (darkened for text readability)

#### `jalapeno.jpg` (Jalapeño Reposado - section-3-l)
- **Used in**: `.bg-img-2`
- **Section**: Jalapeño Reposado text section (red theme)
- **Image**: Fresh green jalapeños growing on plant
- **Positioning**: `50% 50%` (centered)
- **Size**: `130%` (zoomed in for detail)
- **Filter**: `brightness(0.7) contrast(1.1)` (darkened for text readability)

#### `gingerlime.png` (Ginger Lime - section-2-r)
- **Used in**: `.bg-img-3`
- **Section**: Ginger Lime Reposado text section (teal theme)
- **Image**: Fresh ginger root and limes in woven basket
- **Positioning**: `40% 50%` (shifted right for optimal composition)
- **Size**: `120%` (moderately zoomed)
- **Filter**: `brightness(0.7) contrast(1.1)` (darkened for text readability)

### Legacy Background Images (Original)

#### `img-bg-1.jpg`
- **Status**: Replaced by agave.png
- **Original use**: Generic background for Premium section

#### `img-bg-2.jpg`
- **Status**: Unused (ginger lime uses custom positioning)
- **Original use**: Generic background

#### `img-bg-3.jpg`
- **Status**: Replaced by jalapeno.jpg
- **Original use**: Generic background for Jalapeño section

## File Organization

```
/public/images/backgrounds/
├── README.md                 # This documentation
├── agave.png                # Premium Reposado background
├── jalapeno.jpg             # Jalapeño Reposado background
├── gingerlime.png           # Ginger Lime background
├── img-bg-1.jpg            # Legacy background 1
├── img-bg-2.jpg            # Legacy background 2
└── img-bg-3.jpg            # Legacy background 3
```

## CSS Implementation

All backgrounds use consistent darkening filters for text readability:

```css
filter: brightness(0.7) contrast(1.1);
```

### Background Size Guidelines
- **cover**: Standard fit (maintains aspect ratio, fills container)
- **120%**: Moderate zoom (good for detailed ingredients)
- **130%**: Close zoom (intimate view of single ingredients)

### Positioning Guidelines
- **50% 50%**: Standard centering
- **Custom positioning**: Used when specific image elements need to be highlighted

## Adding New Backgrounds

When adding new ingredient backgrounds:

1. **Place file** in `/public/images/backgrounds/`
2. **Update CSS** with appropriate `.bg-img-X` class
3. **Apply consistent filter**: `brightness(0.7) contrast(1.1)`
4. **Test positioning** for optimal text readability
5. **Update this README** with new image details

## Design Principles

- **Ingredient Authenticity**: Use real photos of tequila ingredients
- **Visual Consistency**: Apply uniform darkening filters
- **Text Readability**: Ensure sufficient contrast for overlaid text
- **Brand Connection**: Images should reinforce the artisanal, natural brand story
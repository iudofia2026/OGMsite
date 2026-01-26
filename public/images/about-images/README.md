# About Images - Optimization Guide

This directory contains the three images used in the about section containers.

## Required Images

1. **about-1.jpg** - For the first about container (about-1 .about-right)
2. **about-2.jpg** - For the second about container (about-2 .about-left)
3. **about-3.jpg** - For the third about container (about-3 .about-right)

## Image Optimization

For optimal performance, you should create multiple formats of each image:

### Recommended Formats (in order of preference):
1. **AVIF** (`.avif`) - Best compression, modern browsers
2. **WebP** (`.webp`) - Good compression, wide browser support
3. **JPEG** (`.jpg`) - Fallback for older browsers

### Recommended Settings:

- **Dimensions**: 400x600px (2:3 aspect ratio) or higher for retina displays
- **Quality**: 75-85% (balance between quality and file size)
- **Format**: Progressive JPEG for better perceived loading

### Quick Optimization Commands

#### Using ImageMagick (if installed):
```bash
# Convert to WebP (quality 80)
convert about-1.jpg -quality 80 about-1.webp

# Convert to AVIF (quality 75)
convert about-1.jpg -quality 75 about-1.avif

# Resize and optimize JPEG
convert about-1.jpg -resize 400x600 -quality 85 -strip -interlace Plane about-1.jpg
```

#### Using Sharp (Node.js - recommended):
```bash
npm install --save-dev sharp
node optimize-about-images.js
```

#### Using Online Tools:
- [Squoosh.app](https://squoosh.app/) - Google's image compression tool
- [CloudConvert](https://cloudconvert.com/) - Convert to WebP/AVIF
- [TinyPNG](https://tinypng.com/) - JPEG compression

### File Size Targets:
- **AVIF**: ~30-50KB per image
- **WebP**: ~40-70KB per image
- **JPEG**: ~60-100KB per image

### Best Practices:
1. ✅ Use progressive JPEG encoding
2. ✅ Strip EXIF data to reduce file size
3. ✅ Use appropriate dimensions (400x600px base, 800x1200px for retina)
4. ✅ Optimize for 75-85% quality
5. ✅ Create all three formats (AVIF, WebP, JPEG)
6. ✅ Test loading performance in browser DevTools

## Current Implementation

The HTML uses `<picture>` elements with format fallbacks:
- Browser tries AVIF first (best compression)
- Falls back to WebP (good compression)
- Falls back to JPEG (universal support)

Images are lazy-loaded and use `decoding="async"` for non-blocking rendering.

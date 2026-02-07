# OGM Fonts Setup Guide

## Adding OGM Official Fonts

1. **Prepare Your Font Files**
   - Convert your OGM fonts to WOFF2 and WOFF formats for web optimization
   - Organize them by weight (300, 400, 500, 600, 700, 900)
   - Name them following this convention:
     - `ogm-primary-light.woff2` / `ogm-primary-light.woff`
     - `ogm-primary-regular.woff2` / `ogm-primary-regular.woff`
     - `ogm-primary-medium.woff2` / `ogm-primary-medium.woff`
     - etc.

2. **Add Font Files**
   - Place your converted font files in this directory: `/public/fonts/`

3. **Update Font Configuration**
   - Edit `/src/config/fontScheme.js`
   - Replace the placeholder font names with your actual OGM font names in the `ogmFonts` object:

```javascript
ogmFonts: {
    primary: {
        family: 'YOUR_OGM_PRIMARY_FONT_NAME', // e.g., 'Montserrat', 'Bebas Neue'
        weights: ['300', '400', '500', '600', '700', '900'],
        // ... rest of config
    },
    secondary: {
        family: 'YOUR_OGM_SECONDARY_FONT_NAME',
        // ... rest of config
    },
    // ... etc
}
```

4. **Update Font Face Declarations**
   - In `/src/config/fontScheme.js`, update the `getFontFaceCSS()` function
   - Replace the font file names to match your actual font files
   - Update the font-family names to match your OGM font names

5. **Import in CSS**
   - The font variables will be automatically imported through the CSS
   - Make sure the layout includes the font face declarations

## Font Conversion Tools

If your fonts are in TTF or OTF format, use these tools to convert:

- **Online**: Transfonter (https://transfonter.org/)
- **Desktop**: FontSquirrel (https://www.fontsquirrel.com/tools/webfont-generator)
- **CLI**: pyftsubset (Python)

## Current Setup

The site currently uses web fonts as fallbacks:
- Primary: Playfair Display (serif)
- Secondary: Inter (sans-serif)
- Body: Crimson Pro (editorial serif)

Once OGM fonts are added, they will replace these web fonts.

## Testing

After adding fonts:
1. Clear browser cache
2. Hard refresh the page (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
3. Check browser DevTools Network tab to confirm fonts are loading
4. Verify typography looks correct across different screen sizes

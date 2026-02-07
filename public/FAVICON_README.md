# OGM Favicon Requirements

## Current Status
❌ **Favicon files need to be created**

## Required Files
The following favicon files need to be created and placed in the `/public` directory:

### Essential Files
- `favicon.ico` - Traditional favicon (16x16, 32x32 embedded)
- `favicon-16x16.png` - Small favicon for browser tabs
- `favicon-32x32.png` - Standard favicon for desktop browsers
- `apple-touch-icon.png` - iOS home screen icon (180x180)

### Design Recommendations

#### Option 1: "OGM" Text Logo
- **Style**: Bold, premium serif typography (Playfair Display)
- **Colors**: Gold gradient (#d4af37 to #f4e77c)
- **Background**: Black or transparent
- **Character**: Modern, sophisticated

#### Option 2: Tequila Bottle Silhouette
- **Style**: Simplified bottle outline
- **Colors**: Gold silhouette on black background
- **Details**: Clean, minimal, recognizable at small sizes

#### Option 3: Agave Leaf Design
- **Style**: Stylized agave plant element
- **Colors**: Teal (#008080) or gold (#d4af37)
- **Background**: Black for contrast

#### Option 4: Premium "O" Monogram
- **Style**: Elegant "O" with premium styling
- **Typography**: Playfair Display or similar serif
- **Colors**: Gold gradient with subtle effects

## Brand Colors
- **Primary Gold**: #d4af37
- **Light Gold**: #f4e77c
- **Teal**: #008080
- **Red**: #c53030
- **Black**: #000000

## Technical Specifications

### Sizes Required
- **16x16px** - Browser tab favicon
- **32x32px** - Desktop browser favicon
- **180x180px** - iOS touch icon
- **ICO format** - Multi-size ICO file (16x16, 32x32)

### Quality Guidelines
- **Vector-based** preferred for scalability
- **High contrast** for visibility at small sizes
- **Brand consistent** with OGM premium positioning
- **Simple design** that works at 16x16 pixels

## Implementation
Once favicon files are created:
1. Place files in `/public` directory
2. Files are already referenced in `layout.ejs`
3. `site.webmanifest` is configured
4. No additional code changes needed

## Tools for Creation
- **Figma** - Professional design tool
- **Canva** - Quick favicon generator
- **Adobe Illustrator** - Vector design
- **Favicon.io** - Online favicon generator
- **RealFaviconGenerator** - Comprehensive favicon solution

---

**Status**: Favicon markup is implemented, image files needed.
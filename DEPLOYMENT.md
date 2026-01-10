# OGM Tequila Website - Deployment Guide

This document provides instructions for deploying the OGM Tequila website to Vercel and maintaining the codebase.

## 🚀 Vercel Deployment

### Prerequisites
1. Node.js 14+ installed locally
2. Vercel CLI installed: `npm i -g vercel`
3. Vercel account connected to your GitHub repository

### Quick Deploy
```bash
# Deploy to preview
npm run preview

# Deploy to production
npm run deploy
```

### Manual Deployment Steps
1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```

### Environment Configuration
The site automatically detects production environment through `NODE_ENV=production`.

## 📋 Pre-Deployment Checklist

### Code Quality
- [ ] Run linting: `npm run lint`
- [ ] Fix linting issues: `npm run lint:fix`
- [ ] Format code: `npm run format`
- [ ] Check formatting: `npm run format:check`
- [ ] Run full check: `npm run check`

### Performance Optimization
- [ ] Professional fonts loaded with `font-display: swap`
- [ ] Background images optimized with proper filters
- [ ] GSAP animations optimized for production
- [ ] Critical CSS inlined for above-the-fold content
- [ ] Debug markers disabled in production

### Accessibility
- [ ] WCAG 2.1 AA contrast ratios maintained
- [ ] Focus management implemented
- [ ] Semantic HTML structure preserved
- [ ] Alt text provided for all images
- [ ] Motion preferences respected

## 🛠️ Development Scripts

```bash
# Development
npm run dev          # Start with nodemon
npm start           # Start production server

# Code Quality
npm run lint        # Check for linting issues
npm run lint:fix    # Fix auto-fixable linting issues
npm run format      # Format code with Prettier
npm run format:check # Check if code is properly formatted
npm run check       # Run both lint and format check

# Deployment
npm run vercel-build # Build for Vercel (with linting/formatting)
npm run preview     # Deploy preview to Vercel
npm run deploy      # Deploy to production on Vercel
npm run precommit   # Run before commits (quality checks)
```

## 📁 Project Structure

```
OGMsite/
├── src/
│   ├── controllers/         # MVC Controllers
│   ├── models/             # Data Models
│   ├── views/              # EJS Templates
│   ├── routes/             # Express Routes
│   ├── config/             # Configuration Files
│   └── utils/              # Utility Functions
├── public/
│   ├── css/                # Stylesheets
│   ├── js/                 # Client-side JavaScript
│   └── images/             # Assets
├── vercel.json             # Vercel Configuration
├── .eslintrc.js            # ESLint Configuration
├── .prettierrc.js          # Prettier Configuration
└── package.json            # Dependencies and Scripts
```

## 🎨 Professional Standards Applied

### Typography System
- **Primary Serif**: Playfair Display (900, 700, 400)
- **Secondary Sans**: Inter (600, 500, 400, 300)
- **Body Serif**: Crimson Pro (600, 400)
- **Monospace**: SF Mono, Monaco, Cascadia Code

### Performance Features
- Font loading optimization with `font-display: swap`
- Image optimization with modern formats (AVIF, WebP fallbacks)
- GPU-accelerated animations
- Critical CSS inlining
- Core Web Vitals optimization

### Browser Support
- Chrome >= 90
- Firefox >= 90
- Safari >= 14
- Edge >= 90
- iOS >= 14
- Android >= 90

## 🔧 Configuration Files

### `vercel.json`
- Optimized caching headers
- Security headers applied
- Static asset routing
- Function timeout configuration

### `.eslintrc.js`
- Production-ready linting rules
- GSAP globals configured
- Console logging controlled
- Code quality standards enforced

### `.prettierrc.js`
- Consistent code formatting
- File-specific overrides
- Professional formatting standards

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check linting errors: `npm run lint`
   - Verify Node.js version compatibility
   - Ensure all dependencies installed: `npm install`

2. **Font Loading Issues**:
   - Verify Google Fonts URLs
   - Check `font-display: swap` implementation
   - Confirm fallback font stacks

3. **GSAP Animation Issues**:
   - Ensure ScrollTrigger is loaded
   - Check for conflicting CSS transforms
   - Verify development vs production mode detection

### Debug Commands

```bash
# Check for JavaScript errors
npm run lint

# Verify formatting
npm run format:check

# Test production build
NODE_ENV=production npm start

# Enable GSAP debug markers (browser console)
GSAPDevUtils.enableDevMode()
```

## 📈 Performance Metrics Targets

Based on professional optimization standards:

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **TTFB (Time to First Byte)**: < 600ms

## 🔒 Security Features

- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy configured
- Content Security Policy ready

## 📞 Support

For deployment issues or questions about the premium branding implementation:
1. Check this deployment guide
2. Review `/src/config/professionalOptimization.js` for standards
3. Consult `/src/design-inspiration/818-tequila-analysis.md` for design rationale

---

✅ **Site is ready for Vercel deployment with premium branding standards applied!**
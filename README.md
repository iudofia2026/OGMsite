# OGM - Premium Tequila Website

A modern, premium tequila brand website built with Next.js 14, TypeScript, and Tailwind CSS.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **MVC Architecture** - Organized code structure

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Home page
│   └── globals.css   # Global styles with OGM branding
├── components/       # Reusable React components
├── controllers/      # Business logic (MVC)
├── lib/              # Utilities & configurations
│   └── config/       # Color schemes, typography
└── models/           # Data models & types
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
# Create production build
npm run build

# Start production server
npm start
```

## OGM Brand Assets

All brand assets (images, fonts) are located in the `public/` directory:
- `public/images/` - Product images, logos, backgrounds
- `public/fonts/` - Goldenbook and Raleway font files

## MVC Pattern

This project follows the Model-View-Controller pattern:

- **Models** (`src/models/`) - Data structures and types
- **Views** (`src/app/`, `src/components/`) - React components
- **Controllers** (`src/controllers/`) - Business logic and data retrieval

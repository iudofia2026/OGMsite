# Development Toggles Documentation

## Overview
This document explains how to temporarily disable the loading screen and age verification for local development.

## Quick Setup

### 1. Environment Configuration
The toggles are controlled via environment variables in `.env.local`:

```env
# Set to 'false' to disable components, 'true' (or remove) to enable
NEXT_PUBLIC_ENABLE_LOADING_SCREEN=false
NEXT_PUBLIC_ENABLE_AGE_VERIFICATION=false
```

### 2. Toggle States

| Variable | Value | Effect |
|----------|-------|--------|
| `NEXT_PUBLIC_ENABLE_LOADING_SCREEN` | `false` | Skips the loading screen entirely |
| `NEXT_PUBLIC_ENABLE_LOADING_SCREEN` | `true` or undefined | Shows normal loading screen |
| `NEXT_PUBLIC_ENABLE_AGE_VERIFICATION` | `false` | Bypasses age verification modal |
| `NEXT_PUBLIC_ENABLE_AGE_VERIFICATION` | `true` or undefined | Shows normal age verification |

## How It Works

### Loading Screen Toggle
- **File Modified**: `src/components/AgeVerification.tsx`
- **Logic**: Sets initial `isLoading` state based on environment variable
- **Behavior**: When disabled, immediately proceeds to age verification

### Age Verification Toggle
- **File Modified**: `src/components/AppWrapper.tsx`
- **Logic**: Sets initial state to "verified" when disabled
- **Behavior**: When disabled, main content shows immediately

## Usage Instructions

### Enable Development Mode (Skip Both)
1. Create/edit `.env.local` in project root:
```env
NEXT_PUBLIC_ENABLE_LOADING_SCREEN=false
NEXT_PUBLIC_ENABLE_AGE_VERIFICATION=false
```

2. Restart development server:
```bash
npm run dev
```

3. Site now loads directly to main content

### Re-enable Production Behavior
1. Either remove variables from `.env.local` or set to `true`:
```env
NEXT_PUBLIC_ENABLE_LOADING_SCREEN=true
NEXT_PUBLIC_ENABLE_AGE_VERIFICATION=true
```

2. Restart development server

### Partial Disable Examples
```env
# Skip only loading screen, keep age verification
NEXT_PUBLIC_ENABLE_LOADING_SCREEN=false
NEXT_PUBLIC_ENABLE_AGE_VERIFICATION=true

# Skip only age verification, keep loading screen
NEXT_PUBLIC_ENABLE_LOADING_SCREEN=true
NEXT_PUBLIC_ENABLE_AGE_VERIFICATION=false
```

## Important Notes

### Production Safety
- Environment variables are prefixed with `NEXT_PUBLIC_` so they're accessible in client-side code
- Production deployments should NOT include `.env.local`
- Default behavior (when variables are undefined) is to show both screens

### Development Workflow
- Changes take effect after server restart
- No code changes needed, only environment variable updates
- Image preloading still works regardless of toggle state

### Reverting Changes
To restore original behavior, simply:
1. Delete `.env.local` file, OR
2. Set both variables to `true`, OR
3. Comment out the variable lines

## Implementation Details

### AppWrapper Changes
- Added `enableAgeVerification` boolean from environment
- Conditionally initializes state based on toggle
- Age verification modal only renders when enabled

### AgeVerification Changes
- Added `enableLoadingScreen` boolean from environment
- Conditionally sets initial loading state
- Loading screen bypassed when disabled

### No Changes Required In
- `LoadingScreen.tsx` - Still works normally when called
- `page.tsx` - Main content logic unchanged
- `layout.tsx` - Image preloading preserved

## For Other Agents

**Quick Enable Dev Mode:**
```bash
echo "NEXT_PUBLIC_ENABLE_LOADING_SCREEN=false" > .env.local
echo "NEXT_PUBLIC_ENABLE_AGE_VERIFICATION=false" >> .env.local
npm run dev
```

**Quick Restore Normal Mode:**
```bash
rm .env.local
npm run dev
```

The toggles are designed to be non-destructive and easily reversible for rapid development iteration.
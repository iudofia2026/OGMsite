# OGM Site Documentation

## Available Documentation

### Development Tools
- **[Development Toggles](./development-toggles.md)** - How to disable loading screen and age verification for local development

## Quick Reference

### Skip Loading/Age Verification for Development
```bash
# Create .env.local with:
echo "NEXT_PUBLIC_ENABLE_LOADING_SCREEN=false" > .env.local
echo "NEXT_PUBLIC_ENABLE_AGE_VERIFICATION=false" >> .env.local
npm run dev
```

### Restore Normal Behavior
```bash
rm .env.local
npm run dev
```

For detailed instructions, see [Development Toggles](./development-toggles.md).
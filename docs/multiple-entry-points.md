# Multiple Entry Points

## Overview

Learn how to structure your project when you need multiple JavaScript or CSS entry points.

## Configuration

Modify your `config.ts` to include multiple entry points:

```typescript
export const CONFIG = {
  ENTRY_POINTS: [
    "src/pages/home.js",
    "src/pages/about.js",
    "src/pages/contact.js",
  ],
  // ... other config
};
```

## Usage

1. Create separate files for each page
2. Update your Webflow page settings
3. Add the appropriate script tags to each page

## Best Practices

- Keep shared code in common modules
- Use dynamic imports for code splitting
- Consider performance implications

# CSS Integration Guide

## Understanding Dual Script CSS

Due to Webflow's limitations with JavaScript execution in certain contexts, we need a dual-script approach for CSS. While not ideal, this solution provides the best balance of functionality and simplicity.

## Designer Setup

Add these lines to your Webflow project:

```html
<link rel="stylesheet" href="{YOUR VERCEL PROJECT URL}/styles/out.css" />
<link rel="stylesheet" href="http://localhost:6545/styles/index.css" />
```

> **Note**: Webflow's JavaScript restrictions prevent us from implementing dynamic script switching.

## How It Works

### File Priority

1. The Vercel-deployed CSS loads first (production version)
2. The local development CSS loads second (development version)

### Example Scenarios

#### Scenario 1: Property Override

```css
/* Production (Vercel) */
.body {
  background-color: red;
}

/* Development (Local) */
.body {
  background-color: black;
}

/* Result: background will be black */
```

#### Scenario 2: Commented Properties

```css
/* Production (Vercel) */
.body {
  background-color: red;
}

/* Development (Local) */
.body {
  /* background-color: black; */
}

/* Result: background will be red */
```

## Troubleshooting

If you encounter styling conflicts:

1. Comment out all related styles
2. Deploy to clear production styles
3. Reimplement styles in your local file

This approach ensures clean style implementation without conflicts.

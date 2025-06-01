import { globEagerPlugin } from "./plugins/glob";

export const CONFIG = {
  bun: {
    entrypoints: ["src/app.js", "src/styles/index.css"],
    outdir: "dist",
    experimentalCss: true,
    sourcemap: "external",
    target: "browser",
    format: "iife",
    minify: process.env.NODE_ENV === "production",
    plugins: [globEagerPlugin()],
  },
  // Build configuration

  // Server Info for websocket
  SERVE_PORT: 6545,
  SERVE_ORIGIN: `http://localhost:6545`,
};

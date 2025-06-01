import { CONFIG } from "./config";
import type { BuildConfig } from "bun";
// console.log(process.env.NODE_ENV);

async function build() {
  console.log("📦 Building production bundle...");
  try {
    await Bun.build({
      ...(CONFIG.bun as BuildConfig),
    });
    console.log("✅ Build complete!");
  } catch (error) {
    console.error("❌ Build failed:", error);
    process.exit(1);
  }
}

build();

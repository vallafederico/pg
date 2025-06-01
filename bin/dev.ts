import { watch } from "fs";
import { ServerWebSocket } from "bun";
import { generateResponse } from "./generateResponse";
import { liveReloadCode } from "./live-reload";
import { CONFIG } from "./config";
import type { BuildConfig } from "bun";

// Keep track of the latest build result
// console.log(process.env.NODE_ENV);

let currentBuildResult: any = null;
const clients = new Set<ServerWebSocket<unknown>>();

// Separate build function
async function rebuildFiles() {
  console.log("🔄 Rebuilding...");
  try {
    const result = await Bun.build({
      ...(CONFIG.bun as BuildConfig),
    });

    // Inject live reload code into JS files\
    for (const output of result.outputs) {
      if (output.path.endsWith(".js")) {
        const content = await Bun.file(output.path).text();
        await Bun.write(
          output.path,
          content +
            "\n" +
            liveReloadCode.replace("PORT_NUMBER", CONFIG.SERVE_PORT.toString())
        );
      }
    }

    currentBuildResult = result;
    clients.forEach((client) => client.send("reload"));
    console.log("✅ Build complete");
  } catch (error) {
    console.error("❌ Build failed:", error);
  }
}

// Start the server once
const server = Bun.serve({
  port: CONFIG.SERVE_PORT,
  fetch(req) {
    const url = new URL(req.url);

    // Handle WebSocket connections
    if (url.pathname === "/_reload") {
      const upgraded = server.upgrade(req);
      if (!upgraded) {
        return new Response("Failed to upgrade", { status: 400 });
      }
      return;
    }

    return generateResponse(url.pathname, currentBuildResult?.outputs || []);
  },
  websocket: {
    open(ws) {
      clients.add(ws);
    },
    close(ws) {
      clients.delete(ws);
    },
    message() {},
  },
});

console.log(`Server running at ${CONFIG.SERVE_ORIGIN}`);

// Watch for changes and only rebuild
watch("src", { recursive: true }, async (event, filename) => {
  console.log(`File ${filename} has been ${event}`);
  await rebuildFiles();
});

// Initial build
rebuildFiles();

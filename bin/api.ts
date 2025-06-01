import { serve } from "bun";
import { readdir } from "fs/promises";
import { join } from "path";

const API_DIR = join(import.meta.dir, "..", "api");

// Cache for loaded route handlers
const routeHandlers = new Map<string, any>();

function generateHtml(routes: string[]) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>API Routes</title>
        <style>
          body { font-family: system-ui; padding: 2rem; max-width: 800px; margin: 0 auto; }
          h1 { color: #333; }
          ul { list-style: none; padding: 0; }
          li { 
            margin: 1rem 0;
            padding: 1rem;
            background: #f5f5f5;
            border-radius: 4px;
          }
          a { 
            color: #0066cc;
            text-decoration: none;
            display: block;
          }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <h1>Available API Routes</h1>
        <ul>
          ${routes
            .map(
              (route) => `
            <li>
              <a href="${route}">${route}</a>
            </li>
          `
            )
            .join("")}
        </ul>
      </body>
    </html>
  `;
}

// Load all API routes dynamically
async function loadRoutes() {
  const files = await readdir(API_DIR);

  for (const file of files) {
    if (file.endsWith(".ts")) {
      const routePath = `/api/${file.replace(".ts", "")}`;
      const module = await import(`../api/${file}`);
      routeHandlers.set(routePath, module);
      console.log(`📡 Loaded route: ${routePath}`);
    }
  }
}

const server = serve({
  port: 6546,
  async fetch(request) {
    const url = new URL(request.url);

    // Redirect root to /api
    if (url.pathname === "/") {
      return new Response(null, {
        status: 302,
        headers: { Location: "/api" },
      });
    }

    // Serve index page at /api
    if (url.pathname === "/api") {
      const html = generateHtml(Array.from(routeHandlers.keys()));
      return new Response(html, {
        headers: { "Content-Type": "text/html" },
      });
    }

    const handler = routeHandlers.get(url.pathname);
    if (handler) {
      const method = request.method;
      if (handler[method]) {
        return handler[method](request);
      }
      return new Response(`Method ${method} not allowed`, { status: 405 });
    }

    return new Response("Not Found", { status: 404 });
  },
});

await loadRoutes();
console.log(`🚀 API Server running on http://localhost:${server.port}`);

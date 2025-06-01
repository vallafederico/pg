interface BuildOutput {
  path: string;
}

function generateIndexHtml(outputs: BuildOutput[]) {
  const links = outputs
    .map((output) => {
      const relativePath = output.path.split("/dist/")[1];
      return `<li><a href="/${relativePath}">${relativePath}</a></li>`;
    })
    .join("\n");

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Generated Files</title>
        <style>
          body { font-family: system-ui; padding: 2rem; }
          a { color: #0066cc; text-decoration: none; }
          a:hover { text-decoration: underline; }
          ul { list-style: none; padding: 0; }
          li { margin: 0.5rem 0; }
        </style>
      </head>
      <body>
        <h2>Generated Files:</h2>
        <ul>${links}</ul>
      </body>
    </html>
  `;
}

export function generateResponse(filePath: string, outputs: BuildOutput[]) {
  // Ignore favicon requests
  if (filePath === "/favicon.ico") {
    return new Response(null, { status: 204 });
  }

  // Serve index page
  if (filePath === "/") {
    const html = generateIndexHtml(outputs);
    return new Response(html, {
      headers: { "Content-Type": "text/html" },
    });
  }

  // Serve files from dist
  const file = Bun.file(`dist${filePath}`);
  const contentType =
    {
      ".js": "application/javascript",
      ".css": "text/css",
      ".html": "text/html",
    }[filePath.match(/\.[^.]+$/)?.[0] || ""] || "text/plain";

  return new Response(file, {
    headers: {
      "Content-Type": contentType,
    },
  });
}

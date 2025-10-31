import express, { type Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs/promises";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve any public documents placed in server/public/documents at
// http://<host>:<port>/documents/<filename>
// Place your PDFs (resume, certificates) into server/public/documents/
// and they'll be available publicly.
app.use(
  "/documents",
  express.static(path.resolve(import.meta.dirname, "public", "documents")),
);

// Debug helper: list files available from the server/public/documents folder.
// Useful to verify the server actually sees the files when debugging 404s
// from the client. This does not modify existing behavior.
app.get("/documents/debug", async (_req: Request, res: Response) => {
  const folder = path.resolve(import.meta.dirname, "public", "documents");
  const result: Record<string, string[] | string> = { files: [], folder };
  try {
    result.files = await fs.readdir(folder);
  } catch (e: any) {
    result.files = [];
  }
  res.json(result);
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    // reusePort is not supported on some platforms (notably some Windows
    // Node builds) and can cause ENOTSUP. Only enable it when running on
    // non-windows platforms.
    ...(process.platform === 'win32' ? {} : { reusePort: true }),
  }, () => {
    log(`serving on port ${port}`); 
    log('localhost:5000');
  });
})();

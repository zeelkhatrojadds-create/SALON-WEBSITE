import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import zlib from 'zlib';

function devCompressionPlugin() {
  return {
    name: 'vite-dev-compression',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const acceptEncoding = req.headers['accept-encoding'] || '';
        if (!acceptEncoding.includes('gzip')) return next();

        const originalWrite = res.write;
        const originalEnd = res.end;
        const chunks = [];

        res.write = function (chunk, ...args) {
          if (chunk) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
          return true;
        };

        res.end = function (chunk, ...args) {
          if (chunk) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
          const body = Buffer.concat(chunks);
          const contentType = res.getHeader('content-type') || '';
          const shouldCompress = /text|javascript|json|html|css|xml|svg/i.test(String(contentType)) && body.length > 512;

          if (shouldCompress && !res.getHeader('content-encoding') && !res.headersSent) {
            try {
              const compressed = zlib.gzipSync(body);
              res.setHeader('Content-Encoding', 'gzip');
              res.removeHeader('Content-Length');
              res.setHeader('Content-Length', compressed.length);
              originalEnd.call(res, compressed);
              return;
            } catch {
              // fallback
            }
          }
          originalEnd.call(res, body);
        };

        next();
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  appType: 'spa',
  plugins: [react(), devCompressionPlugin()],
  build: {
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1200,
  },
  server: {
    host: true,
    port: 5173,
    strictPort: false,
    cors: true,
  },
  preview: {
    host: true,
    port: 5173,
  },
});


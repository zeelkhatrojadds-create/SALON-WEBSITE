import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }
            if (id.includes('canvas-confetti')) {
              return 'vendor-confetti';
            }
            return 'vendor-libs';
          }
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    cors: true,
  },
  preview: {
    host: true,
    port: 5173,
  },
});

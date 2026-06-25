import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Dev server proxies the API and the WebSocket handshake to the Spring Boot backend so the
// browser only ever talks to the Vite origin (no CORS friction in dev). In production the app
// is built to static files and points at VITE_API_BASE_URL / VITE_WS_URL directly.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': { target: 'http://localhost:8080', changeOrigin: true },
      '/ws': { target: 'http://localhost:8080', changeOrigin: true, ws: true },
    },
  },
});

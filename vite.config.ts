
import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    'process.env': process.env
  },
  server: {
    // Fixed: historyApiFallback is not a valid property in Vite's ServerOptions.
    // Vite handles SPA fallback automatically in development mode.
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  }
});

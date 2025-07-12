import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  plugins: [angular()],
  optimizeDeps: {
    // Add problematic dependencies here if needed
    exclude: ['chunk-SVVIGFXE', 'chunk-5R4IA4WV'],
    include: ['rxjs', '@angular/core'],
  },
  server: {
    port: 4200, // Default Angular dev server port
    strictPort: true,
  },
  build: {
    target: 'es2022', // Modern browser support
  },
});

import { defineConfig } from 'vite'
import {resolve} from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  root: 'src/public',
  build: {
    outDir: '../../dist/compiled/src',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@rograph": resolve(__dirname, "src/public/components/rograph"),
      "@ui": resolve(__dirname, "src/public/components/ui"),
      "@svg": resolve(__dirname, "src/public/svg"),
    }
  },
  esbuild: 
  {
    keepNames: true
  }
})

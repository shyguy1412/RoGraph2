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
      "@components": resolve(__dirname, "src/public/components"),
      "@blocks": resolve(__dirname, "src/public/components/blocks"),
      "@svg": resolve(__dirname, "src/public/svg"),
      "assets": resolve(__dirname, "src/public/assets"),
    }
  },
  esbuild: 
  {
    keepNames: true
  }
})

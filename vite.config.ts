import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  root: 'src',
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  },
  plugins: [vue({
    template: {
      compilerOptions: {
        isCustomElement: (tag) => /.*?-.*?/.test(tag)
      }
    }
  })]
})

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/resource_api': {
        target: 'http://localhost:8081',
        rewrite: path => path.replace(/^\/resource_api/, ''),
        changeOrigin: true
      },
      '/authorize_api': {
        target: 'http://localhost:8080',
        rewrite: path => path.replace(/^\/authorize_api/, ''),
        changeOrigin: true
      }
    }
  },
})

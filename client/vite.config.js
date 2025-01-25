import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: '/src/components',
      assets: '/src/assets',
      pages: '/src/pages',
      utils: '/src/utils',
    },
  },
  server: {
    proxy: {
      '/api': {
        // Proxy /api requests to http://localhost:5100/api
        target: 'http://localhost:5100/api',
        changeOrigin: true, // Change the origin of the host header to the target URL
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})

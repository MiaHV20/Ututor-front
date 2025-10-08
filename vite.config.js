import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  // 👇 Agregamos esta parte para redirigir peticiones al backend (proxy)
  server: {
    proxy: {
      '/api': {
        target: 'http://lb-prod-656082431.us-east-1.elb.amazonaws.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  // 👇 Esta parte agrega el proxy para redirigir las peticiones de /api al balanceador
  server: {
    proxy: {
      '/api': {
        target: 'https://lb-prod-656082431.us-east-1.elb.amazonaws.com',
        changeOrigin: true,
        secure: false, // permite SSL self-signed si el balanceador no tiene certificado público
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})

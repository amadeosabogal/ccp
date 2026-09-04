import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      },
      '/api-ccb': {
        target: 'https://congregacaocristanobrasil.org.br',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api-ccb/, ''),
        headers: {
          'Referer': 'https://congregacaocristanobrasil.org.br/relatorio',
          'Origin': 'https://congregacaocristanobrasil.org.br'
        },
        cookieDomainRewrite: "localhost"
      }
    }
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path para GitHub Pages: /bhadott-studio/
// Para deploy em domínio próprio (bhadott.studio), mude para: base: '/'
export default defineConfig({
  plugins: [react()],
  base: '/bhadott-studio/',
  build: {
    // Separar chunks para melhor cache e performance
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion'],
          icons: ['lucide-react'],
        },
      },
    },
    // Avisar se chunks ficarem muito grandes
    chunkSizeWarningLimit: 600,
  },
})

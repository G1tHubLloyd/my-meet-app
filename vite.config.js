import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages configuration (only use in production)
  base: process.env.NODE_ENV === 'production' ? '/my-meet-app/' : '/',
  build: {
    // Optimize for better Lighthouse score
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['recharts'],
        },
      },
    },
  },
  // Optimize images and assets
  assetsInclude: ['**/*.woff', '**/*.woff2'],
})

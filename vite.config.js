import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    sourcemap: true // eval istifadə olunmur, adi source-map yaradılır
  },
  server: {
    sourcemapIgnoreList: () => true // CSP ilə bağlı warningləri azaldır
  },
  esbuild: {
    // eval-dan qaçmaq üçün inline source-map istifadə et
    sourcemap: 'inline'
  }
})

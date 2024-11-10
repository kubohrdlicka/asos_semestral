import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const viteEnv = {}
Object.keys(process.env).forEach((key) => {
  if (key.startsWith(`VITE_`)) {
    viteEnv[`import.meta.env.${key}`] = process.env[key]
  }
})

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
  server: {
    watch: {
      usePolling: true
    }
  },
  define: viteEnv
})

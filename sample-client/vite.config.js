// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.js'),
      name: 'Analytics',
      formats: ['umd'],
      fileName: 'analytics'
    },
  },
})

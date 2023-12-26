import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    envPrefix: 'MAIN_VITE_',
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "src/renderer/src/assets/scss/variables.scss";
          `,
        },
      },
    },
    plugins: [react()],
  },
})

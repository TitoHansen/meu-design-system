/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { playwright } from '@vitest/browser-playwright'

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => {
  if (mode === 'lib') {
    return {
      plugins: [
        react(),
        dts({
          insertTypesEntry: true,
          include: ['src/components', 'src/tokens.ts', 'src/index.ts'],
        }),
      ],
      build: {
        lib: {
          entry: path.resolve(dirname, 'src/index.ts'),
          name: 'MeuDesignSystem',
          fileName: 'index',
          formats: ['es'],
        },
        rollupOptions: {
          external: ['react', 'react-dom'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
            },
          },
        },
      },
    }
  }

  return {
    plugins: [react()],
    test: {
      projects: [{
        extends: true,
        plugins: [storybookTest({ configDir: path.join(dirname, '.storybook') })],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }],
          },
        },
      }],
    },
  }
})
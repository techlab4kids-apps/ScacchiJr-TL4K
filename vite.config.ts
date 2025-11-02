import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      base: './', // Imposta il percorso base relativo per il deployment
      build: {
        outDir: 'dist',
        assetsDir: 'assets',
        copyPublicDir: true, // Assicura che la cartella public (con locales e config.json) venga copiata
        // Imposta il percorso base per il deployment
        rollupOptions: {
          output: {
            assetFileNames: (assetInfo) => {
              if (assetInfo.name.endsWith('.css')) {
                return 'css/[name][extname]';
              }
              return 'assets/[name][extname]';
            }
          }
        }
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});

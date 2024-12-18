import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import beautify from 'vite-plugin-beautify';
import pug from '@vituum/vite-plugin-pug';
import vituum from 'vituum';

export default defineConfig({
  css: {
    devSourcemap: true,
  },
  build: {
    assetsInlineLimit: 0,
    emptyOutDir: true,
    modulePreload: {
      polyfill: false,
    },
    rollupOptions: {
      output: {
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: ({ names, originalFileNames }) => {
          if (/\.(css)$/.test(names)) {
            return 'assets/css/[name][extname]';
          }
          if (/\.(jpg|jpeg|svg|png|webp|gif)$/.test(names)) {
            const originalPath = originalFileNames[0].replace('src/images/', '');
            return `assets/images/${originalPath}`;
          }

          return 'assets/other/[name][extname]';
        },
      },
    },
  },
  plugins: [
    vituum({
      input: ['./src/styles/styles.{css,scss}', './src/scripts/main.{js,ts}'],
      imports: {
        paths: ['./src/styles/components/**'],
      },
    }),
    pug(),
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
    }),
    beautify({
      inDir: './dist',
      html: {
        enabled: true,
        glob: '**/*.html',
        options: {
          indent_size: 2,
          inline: [],
          content_unformatted: ['pre', 'textarea', 'script'],
        },
      },
      js: {
        enabled: false,
      },
      css: {
        enabled: false,
      },
    }),
  ],
});

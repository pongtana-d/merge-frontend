import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import beautify from 'vite-plugin-beautify';
import checker from 'vite-plugin-checker';
import nodeFs from 'node:fs';
import nodePath from 'node:path';
import pug from '@vituum/vite-plugin-pug';
import sizeOf from 'image-size';

import vituum from 'vituum';

export default defineConfig({
  server: {
    host: '0.0.0.0',
  },
  css: {
    devSourcemap: true,
  },
  build: {
    assetsInlineLimit: 0,
    cssMinify: false,
    emptyOutDir: true,
    modulePreload: {
      polyfill: false,
    },
    rollupOptions: {
      output: {
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: ({ names, originalFileNames }) => {
          if (originalFileNames?.length) {
            const originalPath = originalFileNames[0].match(/src\/(images|styles)\/(.*\/)[^/]*$/)?.[2] || '';
            if (/\.(css)$/.test(names)) {
              return `assets/css/${originalPath}[name][extname]`;
            }
            if (/\.(jpg|jpeg|svg|png|webp|gif)$/.test(names)) {
              return `assets/images/${originalPath}[name][extname]`;
            }
          }

          return 'assets/[name][extname]';
        },
      },
    },
  },
  plugins: [
    vituum({
      input: ['./src/styles/styles.{css,scss}', './src/scripts/main.{js,ts}'],
      imports: {
        paths: ['./src/styles/components/**', './src/styles/pages/**'],
      },
    }),
    checker({
      stylelint: {
        lintCommand: 'stylelint src/styles/**/*.scss --allow-empty-input',
      },
      typescript: true,
    }),
    pug({
      globals: {
        _nodeFs: nodeFs,
        _nodePath: nodePath,
        _sizeOf: sizeOf,
      },
    }),
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
      webp: { quality: 80 },
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
        enabled: true,
      },
    }),
  ],
});

import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://seoservicesmiami.com',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false, // We'll handle this in global.css
    }),
    sitemap({
      filter: (page) => page !== 'https://seoservicesmiami.com/404/',
    }),
  ],
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
    assets: '_assets',
    assetsPrefix: '/',
  },
  vite: {
    build: {
      cssMinify: 'lightningcss',
      cssCodeSplit: true,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          // Manual chunk splitting for better caching
          manualChunks: (id) => {
            // Vendor chunks for better caching
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'vendor-react';
              }
              if (id.includes('framer-motion')) {
                return 'vendor-framer';
              }
              return 'vendor';
            }
          },
          // Asset naming for better caching
          assetFileNames: 'assets/[name].[hash][extname]',
          chunkFileNames: 'chunks/[name].[hash].js',
          entryFileNames: 'entry/[name].[hash].js',
        },
      },
      // Target modern browsers for smaller bundles
      target: 'es2020',
      // Increase chunk size warning limit
      chunkSizeWarningLimit: 1000,
    },
    // Optimize dependencies
    optimizeDeps: {
      include: ['react', 'react-dom', 'framer-motion'],
    },
    // Enable CSS preprocessing optimizations
    css: {
      devSourcemap: false,
    },
  },
  image: {
    domains: ['seoservicesmiami.com'],
    remotePatterns: [{ protocol: 'https' }],
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  compressHTML: true,
  // Prefetch links on hover for better perceived performance
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  // Experimental features for better performance
  experimental: {
    contentCollectionCache: true,
  },
});

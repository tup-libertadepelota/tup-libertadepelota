import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicons/favicon.ico',
        'favicons/favicon.svg',
        'favicons/apple-touch-icon.png',
      ],
      manifest: {
        id: '/',
        name: 'LibertaDEpelota',
        short_name: 'LibertaDEpelota',
        description: 'Aplicacion para consultar informacion de partidos de futbol.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#111827',
        theme_color: '#00ff9c',
        orientation: 'portrait',
        icons: [
          {
            src: '/favicons/web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/favicons/web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
    }),
  ],
});

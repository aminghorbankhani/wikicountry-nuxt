import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    strict: true,
  },
  build: {
    // transpile: ['@fortawesome'],
  },
  app: {
    head: {
      title: 'WikiCountries',
      meta: [
        { name: 'msapplication-TileColor', content: '#da532c' },
        { name: 'theme-color', content: '#ffffff' },
      ],
      link: [
        { rel: 'apple-touch-icon', size: '180x180', href: '/apple-touch-icon.png' },
        {
          rel: 'icon', type: 'image/png', size: '32x32', href: '/favicon-32x32.png',
        },
        {
          rel: 'icon', type: 'image/png', size: '16x16', href: '/favicon-16x16.png',
        },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },
});

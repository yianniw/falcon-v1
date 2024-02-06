// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    https: true
  },
  modules: [
    '@nuxtjs/supabase',
    'nuxt-icon',
  ],
  css: [
    '~/assets/css/main.css',
  ],

  supabase: {
    redirect: true,
    redirectOptions: {
      login: '/login',
      callback: '/confirm'
    }
  },

  // hot-reload when modifying css in <style> sections
  vite: {
    server: {
      watch: {
        usePolling: true, 
      },
    },
  },
})

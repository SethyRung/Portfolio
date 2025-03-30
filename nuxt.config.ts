export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxt/ui",
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxtjs/google-fonts",
    "@vueuse/nuxt",
    "@vueuse/motion/nuxt",
    "motion-v/nuxt",
    "@nuxt/image",
  ],

  colorMode: {
    preference: "light",
  },

  googleFonts: {
    download: true,
    families: {
      "Public Sans": [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
  },

  css: ["~/assets/css/main.css"],

  runtimeConfig: {
    public: {
      available: 1,
    },
  },

  content: {
    renderer: {
      anchorLinks: false,
    },
    preview: {
      api: "https://api.nuxt.studio",
      dev: true,
    },
  },

  compatibilityDate: "2025-02-28",
});

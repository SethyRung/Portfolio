import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  modules: [
    "@nuxt/ui",
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxtjs/google-fonts",
    "@vueuse/nuxt",
    "motion-v/nuxt",
    "@nuxt/image",
    "motion-v/nuxt",
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  colorMode: {
    preference: "light",
  },

  googleFonts: {
    download: true,
    families: {
      "Public Sans": [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
  },

  css: ["~/app/assets/css/main.css"],

  runtimeConfig: {
    resendApiKey: "",
    email: "",
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

  icon: {
    customCollections: [
      {
        prefix: "icons",
        dir: "./assets/icons",
      },
    ],
  },

  compatibilityDate: "2025-02-28",
});

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: [
    "@nuxt/ui",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@vueuse/nuxt",
    "@nuxt/test-utils/module",
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    resendApiKey: "",
    email: "",
    public: {
      siteUrl: "http://localhost:3000",
    },
  },
});

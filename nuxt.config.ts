import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2024-11-27",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/ui", "@nuxt/eslint", "@nuxt/fonts", "@vueuse/nuxt"],
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
  colorMode: {
    preference: "light",
  },
});

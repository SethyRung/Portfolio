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
    "@nuxtjs/seo",
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    resendApiKey: "",
    email: "",
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  site: {
    name: "Sethy Rung",
    description:
      "Portfolio of Sethy Rung, a Full Stack Developer creating beautiful, responsive web applications with modern technologies like Nuxt 4, Vue 3, and Tailwind CSS.",
    defaultLocale: "en",
  },
  seo: {
    redirectToCanonicalSiteUrl: false,
  },
  schemaOrg: {
    identity: {
      type: "Person",
      name: "Sethy Rung",
      jobTitle: "Full Stack Developer",
      description:
        "Full Stack Developer creating beautiful, responsive web applications with modern technologies and clean code practices.",
    },
  },
});

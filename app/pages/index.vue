<script setup lang="ts">
const config = useRuntimeConfig();
const siteUrl = config.public.siteUrl as string;

const ogImageUrl = `${siteUrl}/og-image.png`;

useSeoMeta({
  title: "Sethy Rung - Full Stack Developer",
  ogTitle: "Sethy Rung - Full Stack Developer",
  description:
    "Portfolio of Sethy Rung, a Full Stack Developer creating beautiful, responsive web applications with modern technologies like Nuxt 4, Vue 3, and Tailwind CSS.",
  ogDescription:
    "Portfolio of Sethy Rung, a Full Stack Developer creating beautiful, responsive web applications with modern technologies like Nuxt 4, Vue 3, and Tailwind CSS.",
  ogImage: ogImageUrl,
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterTitle: "Sethy Rung - Full Stack Developer",
  twitterDescription:
    "Portfolio of Sethy Rung, a Full Stack Developer creating beautiful, responsive web applications with modern technologies.",
  twitterImage: ogImageUrl,
  keywords:
    "Sethy Rung, Full Stack Developer, Web Developer, Vue.js, Nuxt, Frontend, Backend, Portfolio, Web Development",
  author: "Sethy Rung",
});

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sethy Rung",
  url: siteUrl,
  jobTitle: "Full Stack Developer",
  description:
    "Full Stack Developer creating beautiful, responsive web applications with modern technologies and clean code practices.",
  knowsAbout: [
    "Frontend Development",
    "Backend Development",
    "Web Development",
    "Vue.js",
    "Nuxt",
    "TypeScript",
    "Tailwind CSS",
  ],
  sameAs: [],
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Sethy Rung - Full Stack Developer Portfolio",
  url: siteUrl,
  description:
    "Portfolio of Sethy Rung, a Full Stack Developer creating beautiful, responsive web applications with modern technologies and clean code practices.",
  author: {
    "@type": "Person",
    name: "Sethy Rung",
  },
};

useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify(personSchema),
    },
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify(webSiteSchema),
    },
  ],
});
</script>

<template>
  <div class="min-h-screen">
    <SectionHero />
    <SectionAbout />
    <SectionProjects />
    <SectionSkills />
    <SectionResume />
    <SectionContact />
  </div>
</template>

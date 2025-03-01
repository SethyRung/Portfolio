<template>
  <section class="w-full mx-auto py-24 p-4 md:p-12 lg:p-20 relative">
    <div v-motion-slide-bottom class="flex flex-col items-center">
      <h2
        class="my-6 text-[48px] tablet:text-[56px] computer:text-[96px] font-semibold text-center leading-[1.15]"
      >
        Full-stack <br />
        Web
        <span
          class="bg-gradient-to-r from-emerald-600 to-emerald-300 bg-clip-text text-transparent"
        >
          Developer
        </span>
      </h2>
      <p
        class="max-w-[488px] text-center text-md tablet:text-xl text-neutral-800"
      >
        My goal is write
        <span class="text-neutral-950 font-semibold">
          maintainable, clean and understandable code
        </span>
        to process development was enjoyable
      </p>
      <div class="mt-6 flex flex-wrap justify-center gap-2">
        <NuxtLink
          v-for="social in socialLink"
          :key="social.link"
          :to="social.link"
          class="min-w-10 h-10 px-3 text-[0px] hover:text-sm transition-all text-white bg-neutral-950 rounded-full flex justify-center items-center gap-0 hover:gap-1"
        >
          <Icon :name="social.icon" size="14" />
          {{ social.title }}
        </NuxtLink>
      </div>
    </div>
    <InteractiveGridPattern
      v-motion-fade
      class="[mask-image:radial-gradient(350px_circle_at_center,white,transparent)] -z-10 inset-0"
    />
  </section>
</template>

<script lang="ts" setup>
import InteractiveGridPattern from "@/components/Backgrounds/InteractiveGridPattern.vue";
const socialLink: { title: string; link: string; icon: string }[] = [
  {
    title: "Github",
    link: "https://github.com/SethyRung",
    icon: "i-lucide-github",
  },
  {
    title: "Linkedin",
    link: "https://www.linkedin.com/in/sethy-rung-146709299/",
    icon: "i-lucide-linkedin",
  },
  {
    title: "Email",
    link: "mailto:rungsethyhk@gmail.com",
    icon: "i-lucide-mail",
  },
];
</script>

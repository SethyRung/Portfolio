<script setup lang="ts">
import gsap from "gsap";
import ScrollSmoother from "gsap/ScrollSmoother";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";

onMounted(() => {
  gsap.registerPlugin(ScrollSmoother, ScrollTrigger, ScrollToPlugin);
})
</script>

<template>
  <UApp>
    <LoadingScreen />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

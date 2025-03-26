<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <div
      ref="loader"
      class="w-screen h-screen fixed inset-0 z-[100000] bg-neutral-950 flex justify-center items-center"
    >
      <div class="loader"></div>
    </div>
  </UApp>
</template>
<script setup lang="ts">
useHead({
  title: "Sethy Rung",
});

const loaderRef = templateRef("loader");
const loaderSize = useElementSize(loaderRef);

const motion = useMotion(loaderRef);
const nuxtApp = useNuxtApp();

nuxtApp.hook("app:mounted", () => {
  motion.apply({ y: 0 });
});

nuxtApp.hook("page:start", () => {
  motion.apply({
    y: 0,
    transition: {
      type: "spring",
      stiffness: 250,
      damping: 25,
      mass: 0.5,
    },
  });
});

nuxtApp.hook("page:finish", () => {
  setTimeout(() => {
    motion.apply({
      y: -loaderSize.height.value,
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 25,
        mass: 0.5,
      },
    });
  }, 1500);
});
</script>
<style scoped>
.loader {
  width: 4px;
  color: oklch(0.696 0.17 162.48);
  aspect-ratio: 1;
  border-radius: 50%;
  box-shadow: 19px -19px 0 0px, 38px -19px 0 0px, 57px -19px 0 0px, 19px 0 0 5px,
    38px 0 0 5px, 57px 0 0 5px, 19px 19px 0 0px, 38px 19px 0 0px,
    57px 19px 0 0px;
  transform: translateX(-38px);
  animation: l26 2s infinite linear;
}
@keyframes l26 {
  12.5% {
    box-shadow: 19px -19px 0 0px, 38px -19px 0 0px, 57px -19px 0 5px,
      19px 0 0 5px, 38px 0 0 0px, 57px 0 0 5px, 19px 19px 0 0px, 38px 19px 0 0px,
      57px 19px 0 0px;
  }
  25% {
    box-shadow: 19px -19px 0 5px, 38px -19px 0 0px, 57px -19px 0 5px,
      19px 0 0 0px, 38px 0 0 0px, 57px 0 0 0px, 19px 19px 0 0px, 38px 19px 0 5px,
      57px 19px 0 0px;
  }
  50% {
    box-shadow: 19px -19px 0 5px, 38px -19px 0 5px, 57px -19px 0 0px,
      19px 0 0 0px, 38px 0 0 0px, 57px 0 0 0px, 19px 19px 0 0px, 38px 19px 0 0px,
      57px 19px 0 5px;
  }
  62.5% {
    box-shadow: 19px -19px 0 0px, 38px -19px 0 0px, 57px -19px 0 0px,
      19px 0 0 5px, 38px 0 0 0px, 57px 0 0 0px, 19px 19px 0 0px, 38px 19px 0 5px,
      57px 19px 0 5px;
  }
  75% {
    box-shadow: 19px -19px 0 0px, 38px -19px 0 5px, 57px -19px 0 0px,
      19px 0 0 0px, 38px 0 0 0px, 57px 0 0 5px, 19px 19px 0 0px, 38px 19px 0 0px,
      57px 19px 0 5px;
  }
  87.5% {
    box-shadow: 19px -19px 0 0px, 38px -19px 0 5px, 57px -19px 0 0px,
      19px 0 0 0px, 38px 0 0 5px, 57px 0 0 0px, 19px 19px 0 5px, 38px 19px 0 0px,
      57px 19px 0 0px;
  }
}
</style>

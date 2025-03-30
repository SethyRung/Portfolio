<template>
  <header
    class="h-14 px-4 md:px-12 lg:px-20 sticky top-0 z-[99999] @container/header flex items-center justify-between bg-white/80 shadow-sm backdrop-blur-lg"
  >
    <NuxtLink to="/" class="font-bold">
      <span class="text-primary-500">Sethy</span> Rung
    </NuxtLink>
    <UNavigationMenu :items="items" class="w-fit hidden @md/header:flex" />
    <UButton
      icon="i-lucide-menu"
      color="neutral"
      variant="ghost"
      class="@md/header:hidden"
      @click="isOpen = !isOpen"
    />
    <USlideover v-model:open="isOpen" title="Sethy Rung" :ui="{ body: 'py-0' }">
      <template #title>
        <h2 class="font-bold">
          <span class="text-primary-500">Sethy</span> Rung
        </h2>
      </template>
      <template #body>
        <UNavigationMenu
          :items="items"
          orientation="vertical"
          :ui="{
            item: 'not-last:border-b border-gray-300',
            link: 'h-10 bg-white',
          }"
        />
      </template>
    </USlideover>
  </header>
</template>

<script lang="ts" setup>
import type { NavigationMenuItem } from "@nuxt/ui";

const isOpen = ref<boolean>(false);
const route = useRoute();
watch(route, () => {
  isOpen.value = false;
});

const items = reactive<NavigationMenuItem[]>([
  {
    label: "Home",
    to: "/",
  },
  {
    label: "About me",
    to: "/about-me",
  },
  {
    label: "Contact me",
    to: "/contact-me",
  },
]);
</script>

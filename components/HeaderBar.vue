<template>
  <header
    ref="header"
    class="h-14 px-4 md:px-12 lg:px-20 sticky top-0 z-[99999] @container/header flex items-center justify-between bg-white/80 shadow-sm backdrop-blur-lg"
  >
    <NuxtLink to="/" class="font-bold"> Sethy Rung </NuxtLink>
    <UNavigationMenu :items="items" class="w-fit hidden @md/header:flex" />
    <UButton
      icon="i-lucide-menu"
      color="neutral"
      variant="ghost"
      class="@md/header:hidden"
      @click="isOpen = !isOpen"
    />
    <USlideover v-model:open="isOpen" title="Sethy Rung" :ui="{ body: 'py-0' }">
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

const headerRef = templateRef("header");
const { height } = useElementSize(headerRef);
const { y } = useWindowScroll({
  behavior: "smooth",
});

const findOffsetTop = (element: HTMLElement) => {
  return element.offsetTop - (height.value + 16);
};

const handleNavigationSelect = (e: CustomEvent) => {
  isOpen.value = false;
  items.forEach((item) => {
    if (item.label === e.detail.originalEvent.srcElement.textContent) {
      if (!item.value) {
        y.value = 0;
        return;
      }
      const element = document.getElementById(item.value);
      if (element) {
        y.value = findOffsetTop(element);
      }
    }
  });
};

const isOpen = ref<boolean>(false);
const items = reactive<NavigationMenuItem[]>([
  {
    label: "Home",
    value: "hero-section",
    onSelect: handleNavigationSelect,
  },
  {
    label: "About me",
    value: "about-me",
    onSelect: handleNavigationSelect,
  },
  {
    label: "Skills",
    value: "skills",
    onSelect: handleNavigationSelect,
  },
  {
    label: "Projects",
    value: "projects",
    onSelect: handleNavigationSelect,
  },
]);

onMounted(() => {
  const elementList = items.map((item, index) => {
    const element = item.value ? document.getElementById(item.value) : null;
    const startOfElement = element ? findOffsetTop(element) : undefined;
    const endOfElement = element ? element.offsetHeight : undefined;
    return {
      index: index,
      startOfElement: startOfElement,
      endOfElement: endOfElement,
    };
  });

  const handleActiveLink = (value: number) => {
    value = Math.ceil(value);
    items.forEach((item, index) => {
      const currentElement = elementList[index];
      item.active =
        currentElement.startOfElement !== undefined &&
        currentElement.endOfElement !== undefined &&
        currentElement.startOfElement <= value &&
        value <= currentElement.endOfElement;
    });
  };

  watch(y, handleActiveLink, { immediate: true });
});
</script>

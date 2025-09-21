<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollSmoother);

const wrapperRef = useTemplateRef("wrapperRef");
const contentRef = useTemplateRef("contentRef");
let scrollSmoother: ScrollSmoother | null = null;

onMounted(() => {
  if (wrapperRef.value && contentRef.value) {
    scrollSmoother = ScrollSmoother.create({
      wrapper: wrapperRef.value,
      content: contentRef.value,
      smooth: 1.5,
      effects: true,
      normalizeScroll: true,
      ignoreMobileResize: true,
    });
  }
});

onBeforeUnmount(() => {
  if (scrollSmoother) {
    scrollSmoother.kill();
    scrollSmoother = null;
  }
});
</script>

<template>
  <div
    ref="wrapperRef"
    class="fixed top-0 left-0 w-full h-full overflow-hidden"
  >
    <div
      ref="contentRef"
      class="absolute top-0 left-0 w-full will-change-transform"
    >
      <slot />
    </div>
  </div>
</template>

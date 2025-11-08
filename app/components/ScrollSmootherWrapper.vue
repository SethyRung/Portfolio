<script setup lang="ts">
import ScrollSmoother from "gsap/ScrollSmoother";

let scrollSmoother: ScrollSmoother | null = null;

onMounted(() => {
  scrollSmoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.5,
  });
});

onBeforeUnmount(() => {
  if (scrollSmoother) {
    scrollSmoother.kill();
    scrollSmoother = null;
  }
});
</script>

<template>
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <slot></slot>
    </div>
  </div>
</template>

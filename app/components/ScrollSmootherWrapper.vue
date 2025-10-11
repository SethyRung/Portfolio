<script setup lang="ts">
const { ScrollSmoother } = useGSAP();

const wrapperRef = useTemplateRef("wrapperRef");
const contentRef = useTemplateRef("contentRef");

let scrollSmoother: ScrollSmoother | null = null;

onMounted(() => {
  if (wrapperRef.value && contentRef.value) {
    scrollSmoother = ScrollSmoother.create({
      wrapper: wrapperRef.value,
      content: contentRef.value,
      smooth: 1.5,
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
      <slot></slot>
    </div>
  </div>
</template>

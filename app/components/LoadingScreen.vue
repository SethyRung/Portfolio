<script setup lang="ts">
import gsap from "gsap";

const progressContainerRef = useTemplateRef("progressContainerRef")
const progressIndicatorRef = useTemplateRef("progressIndicatorRef")

const progress = ref(0);
let progressInterval: number;
const isShow = ref(true)

onMounted(() => {
  if (!progressContainerRef.value || !progressIndicatorRef.value)
    return;

  progressInterval = setInterval(() => {
    if (progress.value < 90) {
      progress.value += Math.round(Math.random() * 10);
    } else {
      progress.value = 100;
      clearInterval(progressInterval)
    }

    gsap.to(progressIndicatorRef.value, {
      width: `${progress.value}%`
    })

    if (progress.value === 100) {
      const tl = gsap.timeline();

      tl.to(progressIndicatorRef.value, {
        height: "100vh",
        position: "absolute",
        left: 0,
        bottom: 0,
        delay: 0.5,
        ease: "power2.out"
      }).to(progressContainerRef.value, {
        yPercent: -100,
        ease: "power1.inOut",
        onComplete: () => {
          isShow.value = false
          tl.kill()
        }
      })
    }
  }, 150);
})

</script>

<template>
  <div v-if="isShow" ref="progressContainerRef" class="bg-default fixed inset-0 z-[9999]">
    <div class="size-full flex flex-col justify-end items-end gap-2 relative">
      <div class="px-10 text-4xl font-semibold font-geist flex items-center gap-1">
        <p class="text-amber-500 text-2xl">%</p>
        <p>{{ progress }}</p>
      </div>

      <div class="w-full bg-muted">
        <div ref="progressIndicatorRef" class="bg-amber-500 w-0 h-6"></div>
      </div>
    </div>
  </div>
</template>

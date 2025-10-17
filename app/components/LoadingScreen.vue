<script setup lang="ts">
const loadingProgress = ref(0);
const isHiding = ref(false);
const shouldShow = ref(true);
const nuxtApp = useNuxtApp();

const PROGRESS_STEPS = 60;
const PROGRESS_DURATION = 2000;
const HIDE_DELAY = 300;

let currentStep = 0;
const progressInterval = setInterval(() => {
  currentStep++;
  loadingProgress.value = Math.min(
    Math.round((currentStep / PROGRESS_STEPS) * 110),
    100,
  );

  if (currentStep >= PROGRESS_STEPS) {
    clearInterval(progressInterval);
  }
}, PROGRESS_DURATION / PROGRESS_STEPS);

nuxtApp.hook("app:mounted", () => {
  setTimeout(() => {
    clearInterval(progressInterval);
    loadingProgress.value = 100;
  }, PROGRESS_DURATION);
});

const { gsap } = useGSAP();

const loadingRef = useTemplateRef("loadingRef");
const progressBarRef = useTemplateRef("progressBarRef");
const loadingTextRef = useTemplateRef("loadingTextRef");

const hideLoadingScreen = () => {
  if (!loadingRef.value || isHiding.value) return;

  isHiding.value = true;

  const tl = gsap.timeline({
    onComplete: () => {
      shouldShow.value = false;
    },
  });

  if (progressBarRef.value) {
    tl.to(progressBarRef.value, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: "power2.inOut",
    }, 0);
  }

  if (loadingTextRef.value) {
    tl.to(loadingTextRef.value, {
      opacity: 0,
      y: 20,
      duration: 0.4,
      ease: "power2.inOut",
    }, 0.1);
  }

  tl.to(loadingRef.value, {
    opacity: 0,
    duration: 0.6,
    ease: "power2.inOut",
  }, 0.3);
};

watch(loadingProgress, (newValue) => {
  if (newValue === 100 && !isHiding.value) {
    setTimeout(hideLoadingScreen, HIDE_DELAY);
  }
});

onMounted(() => {
  if (loadingRef.value) {
    gsap.set(loadingRef.value, { opacity: 1, visibility: "visible" });
  }
});

onBeforeUnmount(() => {
  gsap.killTweensOf("*");
});
</script>

<template>
  <div
    v-if="shouldShow"
    ref="loadingRef"
    class="fixed inset-0 z-[9999] flex items-center justify-center bg-default"
    role="progressbar"
  >
    <div class="text-center max-w-xs mx-auto px-8">
      <div ref="progressBarRef" class="relative w-full h-px mb-8">
        <div
          class="absolute top-0 left-0 h-full transition-none bg-inverted"
          :style="{ width: `${loadingProgress}%` }"
        />
      </div>

      <div
        ref="loadingTextRef"
        class="text-sm font-mono tracking-wide text-highlighted"
        aria-live="polite"
      >
        INITIALIZING... {{ loadingProgress }}%
      </div>
    </div>
  </div>
</template>

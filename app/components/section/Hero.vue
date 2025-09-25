<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { animateText } from "~/lib/animations";

gsap.registerPlugin(ScrollToPlugin);

const nameRef = useTemplateRef("nameRef");
const titleRef = useTemplateRef("titleRef");
const subtitleRef = useTemplateRef("subtitleRef");
const ctaRef = useTemplateRef("ctaRef");

onMounted(() => {
  // Set initial states for timeline animations
  if (titleRef.value) {
    gsap.set(titleRef.value, { opacity: 0, y: 30, scale: 0.95 });
  }
  if (subtitleRef.value) {
    gsap.set(subtitleRef.value, { opacity: 0, y: 30, scale: 0.98 });
  }
  if (ctaRef.value) {
    gsap.set(ctaRef.value, { opacity: 0, y: 30, scale: 0.9 });
  }

  const tl = gsap.timeline();

  // Animate name with text animation
  if (nameRef.value) {
    animateText(nameRef.value, "Sethy Rung", 0.5);
  }

  // Animate title with enhanced easing
  if (titleRef.value) {
    tl.to(titleRef.value, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      delay: 0.5,
      ease: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    });
  }

  // Animate subtitle
  if (subtitleRef.value) {
    tl.to(
      subtitleRef.value,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: "cubic-bezier(0.23, 1, 0.32, 1)",
      },
      "-=0.5",
    );
  }

  // Animate CTA buttons with bounce effect
  if (ctaRef.value) {
    tl.to(
      ctaRef.value,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
      },
      "-=0.4",
    );
  }

  // Fallback: make content visible after 3 seconds if animations don't work
  setTimeout(() => {
    if (titleRef.value) gsap.set(titleRef.value, { opacity: 1, y: 0 });
    if (subtitleRef.value) gsap.set(subtitleRef.value, { opacity: 1, y: 0 });
    if (ctaRef.value) gsap.set(ctaRef.value, { opacity: 1, y: 0 });
  }, 3000);
});

onBeforeUnmount(() => {
  // Cleanup any ongoing animations
  gsap.killTweensOf([titleRef.value, subtitleRef.value, ctaRef.value]);
});

function scrollToSection(sectionId: string) {
  const section = document.getElementById(sectionId);
  if (section) {
    gsap.to(window, {
      scrollTo: {
        y: section,
        offsetY: 0,
      },
      duration: 1,
      ease: "power3.inOut",
    });
  }
}
</script>

<template>
  <section
    id="hero"
    class="min-h-screen flex items-center justify-center relative bg-default overflow-hidden"
  >
    <!-- Decorative elements -->
    <div class="absolute top-10 left-10 w-24 h-24 animate-pulse">
      <DecorativeCircle />
    </div>
    <div class="absolute top-32 right-16 w-16 h-16 animate-pulse delay-1000">
      <DecorativeTriangle />
    </div>
    <div class="absolute bottom-32 left-20 w-20 h-20 animate-pulse delay-500">
      <DecorativeHexagon />
    </div>
    <div class="absolute top-1/2 right-10 w-32 h-32 animate-pulse delay-700">
      <DecorativeLines />
    </div>
    <div class="absolute bottom-20 right-32 w-24 h-12 animate-pulse delay-300">
      <DecorativeWave />
    </div>
    <div class="absolute top-1/4 left-1/4 w-20 h-20 animate-pulse delay-1200">
      <DecorativeDots />
    </div>

    <div class="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 z-10">
      <div class="max-w-4xl mx-auto text-center">
        <div ref="nameRef" class="text-default"></div>

        <h2
          ref="titleRef"
          class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-highlighted mb-6 opacity-0 px-2"
          style="
            font-size: clamp(32px, 5vw, 64px);
            transform: translateY(2rem) scale(0.95);
          "
        >
          Full Stack Developer
        </h2>

        <p
          ref="subtitleRef"
          class="text-base sm:text-lg text-toned mb-8 max-w-2xl mx-auto leading-relaxed opacity-0 px-4"
          style="transform: translateY(2rem) scale(0.98)"
        >
          Creating beautiful, responsive web applications with modern
          technologies and clean code practices.
        </p>

        <div
          ref="ctaRef"
          class="opacity-0 px-4"
          style="transform: translateY(2rem) scale(0.9)"
        >
          <div class="flex gap-4 justify-center items-center">
            <UButton
              label="Get In Touch"
              size="xl"
              color="neutral"
              class="w-40 h-11 justify-center"
              @click="scrollToSection('contact')"
            />
            <UButton
              label="View My Work"
              size="xl"
              color="neutral"
              variant="outline"
              class="w-40 h-11 justify-center"
              @click="scrollToSection('projects')"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div
      class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted animate-bounce"
    >
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </div>
  </section>
</template>

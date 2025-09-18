<script setup lang="ts">
import { titleCase } from "scule";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const navigation = {
  main: [
    { name: "Home", href: "home" },
    { name: "About", href: "about" },
    { name: "Projects", href: "projects" },
    { name: "Skills", href: "skills" },
    { name: "Contact", href: "contact" },
  ],
  social: [
    {
      name: "GitHub",
      href: "https://github.com",
      icon: "i-simple-icons-github",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: "i-simple-icons-linkedin",
    },
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: "i-simple-icons-x",
    },
  ],
};

const scrollToSection = (sectionId: string) => {
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
};

const scrollToTop = () => {
  gsap.to(window, {
    scrollTo: {
      y: 0,
    },
    duration: 1,
    ease: "power3.inOut",
  });
};
</script>

<template>
  <footer class="border-t border-default bg-default">
    <div class="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
      <div class="py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Logo and description -->
          <div class="md:col-span-2">
            <div class="flex items-center space-x-2 mb-4">
              <div
                class="w-8 h-8 bg-inverted rounded flex items-center justify-center"
              >
                <span class="text-inverted font-bold text-sm"> SR </span>
              </div>
              <span class="font-semibold text-lg text-default">
                Sethy Rung
              </span>
            </div>
            <p class="text-sm text-toned max-w-md">
              A clean, modern portfolio built with Nuxt.js, Tailwind CSS, and
              GSAP. Focused on creating beautiful, performant web experiences.
            </p>
          </div>

          <!-- Navigation -->
          <div>
            <h3 class="text-sm font-semibold text-default mb-4">Navigation</h3>
            <ul class="space-y-2">
              <li v-for="item in navigation.main" :key="item.name">
                <button
                  @click="scrollToSection(item.href)"
                  class="text-sm text-toned hover:text-default transition-colors"
                >
                  {{ item.name }}
                </button>
              </li>
            </ul>
          </div>

          <!-- Theme & Connect -->
          <div>
            <h3 class="text-sm font-semibold text-default mb-4">Theme</h3>
            <div class="flex items-center space-x-3 mb-6">
              <span class="text-sm text-toned">
                {{ titleCase($colorMode.value) }}
              </span>
              <UColorModeSwitch color="neutral" size="lg" />
            </div>

            <h3 class="text-sm font-semibold text-default mb-4">Connect</h3>
            <div class="flex space-x-4">
              <a
                v-for="item in navigation.social"
                :key="item.name"
                :href="item.href"
                target="_blank"
                rel="noopener noreferrer"
                class="text-muted hover:text-toned transition-colors"
                :aria-label="item.name"
              >
                <UIcon :name="item.icon" class="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div class="mt-8 pt-8 border-t border-default">
          <div
            class="flex flex-col sm:flex-row justify-between items-center gap-4"
          >
            <p class="text-sm text-toned">
              © {{ new Date().getFullYear() }} Sethy Rung. All rights reserved.
            </p>
            <UButton
              label="Back to top"
              trailing-icon="i-lucide-arrow-up"
              color="neutral"
              @click="scrollToTop"
            />
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

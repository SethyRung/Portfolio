<script setup lang="ts">
const { gsap } = useGSAP();

const headerRef = useTemplateRef("headerRef");
const mobileMenuRef = useTemplateRef("mobileMenuRef");
const isMenuOpen = ref(false);
const isMenuVisible = ref(false);

const navigation = [
  { name: "Home", to: "hero" },
  { name: "About", to: "about" },
  { name: "Projects", to: "projects" },
  { name: "Skills", to: "skills" },
  { name: "Resume", to: "resume" },
];

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
    isMenuOpen.value = false;
  }
};

const toggleMobileMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Animate mobile menu open/close
watch(isMenuOpen, (newValue) => {
  if (mobileMenuRef.value) {
    if (newValue) {
      // Show menu and start opening animation
      isMenuVisible.value = true;

      // Set initial state
      gsap.set(mobileMenuRef.value, {
        opacity: 0,
        height: 0,
        y: -20,
        display: "block",
      });

      // Menu opening animation
      gsap.fromTo(
        mobileMenuRef.value,
        {
          opacity: 0,
          height: 0,
          y: -20,
        },
        {
          opacity: 1,
          height: "auto",
          y: 0,
          duration: 0.3,
          ease: "power2.out",
          onStart: () => {
            if (mobileMenuRef.value) {
              mobileMenuRef.value.style.display = "block";
            }
          },
        },
      );

      // Animate menu items with stagger
      const menuItems = mobileMenuRef.value.querySelectorAll(
        ".space-y-1 button, .space-y-1 div > button",
      );
      gsap.fromTo(
        menuItems,
        {
          opacity: 0,
          x: -20,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.1,
          delay: 0.1,
          ease: "power2.out",
        },
      );
    } else {
      // Menu closing animation
      gsap.to(mobileMenuRef.value, {
        opacity: 0,
        height: 0,
        y: -20,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          isMenuVisible.value = false;
        },
      });
    }
  }
});

// Close mobile menu when clicking outside
onClickOutside(mobileMenuRef, (event: MouseEvent) => {
  if (
    headerRef.value &&
    !headerRef.value.contains(event.target as Node) &&
    isMenuOpen.value
  ) {
    isMenuOpen.value = false;
  }
});
</script>

<template>
  <header
    ref="headerRef"
    class="fixed top-0 w-full z-50 border-b border-default bg-default/75 backdrop-blur-sm"
  >
    <div class="w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center">
          <button
            class="flex items-center space-x-2 text-inverted hover:text-dimmed transition-colors"
            @click="scrollToSection('home')"
          >
            <div
              class="w-8 h-8 bg-inverted rounded flex items-center justify-center"
            >
              <span class="text-inverted font-bold text-sm">SR</span>
            </div>
            <span class="font-semibold text-lg text-default"> Sethy Rung </span>
          </button>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-4">
          <UButton
            v-for="item in navigation"
            :key="item.name"
            color="neutral"
            variant="link"
            active-class="font-extrabold"
            @click="scrollToSection(item.to)"
          >
            {{ item.name }}
          </UButton>
          <UButton
            label="Get in Touch"
            color="neutral"
            class="ml-2"
            @click="scrollToSection('contact')"
          />
        </nav>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <UButton
            :icon="isMenuOpen ? 'i-lucide-x' : 'i-lucide-menu'"
            color="neutral"
            variant="ghost"
            @click="toggleMobileMenu"
          />
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div
        ref="mobileMenuRef"
        class="md:hidden border-t border-default overflow-hidden relative z-50"
        :style="{ display: isMenuVisible ? 'block' : 'none' }"
      >
        <div class="space-y-1 px-2 pb-3 pt-2">
          <UButton
            v-for="item in navigation"
            :key="item.name"
            color="neutral"
            variant="link"
            block
            class="justify-start"
            active-class="font-extrabold"
            @click="scrollToSection(item.to)"
          >
            {{ item.name }}
          </UButton>
          <div class="px-3 py-2">
            <UButton
              label="Get in Touch"
              color="neutral"
              block
              @click="scrollToSection('contact')"
            />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

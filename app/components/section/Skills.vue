<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animateStaggerOnScroll, animateOnScroll } from "~/lib/animations";

gsap.registerPlugin(ScrollTrigger);

const skillsSection = ref<HTMLElement>();
const categoryHeaders = ref<HTMLElement[]>([]);
const techCards = ref<HTMLElement[]>([]);

onMounted(() => {
  // Set initial hidden state for all elements
  gsap.set(skillsSection.value?.querySelector("h2"), {
    opacity: 0,
    y: 50,
  });

  gsap.set(skillsSection.value?.querySelector("p"), {
    opacity: 0,
    y: 30,
  });

  gsap.set(categoryHeaders.value, {
    opacity: 0,
    y: 40,
  });

  gsap.set(techCards.value, {
    opacity: 0,
    y: 60,
    scale: 0.9,
  });

  // Animate section title
  const titleElement = skillsSection.value?.querySelector("h2");
  if (titleElement) {
    animateOnScroll(titleElement, {
      delay: 0.2,
      duration: 0.8,
      ease: "power3.out"
    });
  }

  // Animate subtitle
  const subtitleElement = skillsSection.value?.querySelector("p");
  if (subtitleElement) {
    animateOnScroll(subtitleElement, {
      delay: 0.4,
      duration: 0.8,
      ease: "power3.out"
    });
  }

  // Animate category headers
  if (categoryHeaders.value.length > 0) {
    animateStaggerOnScroll(categoryHeaders.value, {
      delay: 0.6,
      stagger: 0.15,
      duration: 0.6,
      ease: "power2.out"
    });
  }

  // Animate tech cards with stagger
  if (techCards.value.length > 0) {
    gsap.fromTo(
      techCards.value,
      {
        opacity: 0,
        y: 60,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.05,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: skillsSection.value,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
});

const frontends = [
  { name: "Vue.js", icon: "i-simple-icons-vuedotjs" },
  { name: "Nuxt.js", icon: "i-simple-icons-nuxtdotjs" },
  { name: "React", icon: "i-simple-icons-react" },
  { name: "Next.js", icon: "i-simple-icons-nextdotjs" },
  { name: "TypeScript", icon: "i-simple-icons-typescript" },
  { name: "Tailwind CSS", icon: "i-simple-icons-tailwindcss" },
  { name: "Vite", icon: "i-simple-icons-vite" },
  { name: "GSAP", icon: "i-simple-icons-gsap" },
];

const backends = [
  { name: "Spring Boot", icon: "i-simple-icons-springboot" },
  { name: "Express", icon: "i-simple-icons-express" },
  { name: "NestJS", icon: "i-simple-icons-nestjs" },
  { name: "FastAPI", icon: "i-simple-icons-fastapi" },
];

const databases = [
  { name: "PostgreSQL", icon: "i-simple-icons-postgresql" },
  { name: "MongoDB", icon: "i-simple-icons-mongodb" },
  { name: "MySQL", icon: "i-simple-icons-mysql" },
];

const tools = [
  { name: "Docker", icon: "i-simple-icons-docker" },
  { name: "Git", icon: "i-simple-icons-git" },
  { name: "GitHub", icon: "i-simple-icons-github" },
  { name: "GitLab", icon: "i-simple-icons-gitlab" },
  { name: "Vercel", icon: "i-simple-icons-vercel" },
  { name: "Render", icon: "i-simple-icons-render" },
  { name: "Directus", icon: "i-simple-icons-directus" },
];
</script>

<template>
  <section id="skills" ref="skillsSection" class="py-20 bg-muted/10">
    <div class="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-default mb-4">
            Tech <span class="text-highlighted">Stack</span>
          </h2>
          <p class="text-xl text-toned max-w-2xl mx-auto">
            Technologies I love working with
          </p>
        </div>

        <div class="space-y-16">
          <div class="space-y-8">
            <div ref="categoryHeaders" class="flex items-center space-x-3">
              <UIcon name="i-lucide-monitor" class="w-6 h-6 text-blue-500" />
              <h3 class="text-2xl font-bold text-default">Frontend</h3>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <div
                v-for="tech in frontends"
                :key="tech.name"
                ref="techCards"
                class="group relative bg-background rounded-xl p-6 border border-muted transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-highlighted/30"
              >
                <div class="flex flex-col items-center space-y-3">
                  <UIcon
                    :name="tech.icon"
                    class="w-12 h-12 text-default"
                    :alt="`${tech.name} icon`"
                  />
                  <h4 class="font-semibold text-default">{{ tech.name }}</h4>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-8">
            <div ref="categoryHeaders" class="flex items-center space-x-3">
              <UIcon name="i-lucide-server" class="w-6 h-6 text-green-500" />
              <h3 class="text-2xl font-bold text-default">Backend</h3>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <div
                v-for="tech in backends"
                :key="tech.name"
                ref="techCards"
                class="group relative bg-background rounded-xl p-6 border border-muted transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-highlighted/30"
              >
                <div class="flex flex-col items-center space-y-3">
                  <UIcon
                    :name="tech.icon"
                    class="w-12 h-12 text-default"
                    :alt="`${tech.name} icon`"
                  />
                  <h4 class="font-semibold text-default">{{ tech.name }}</h4>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-8">
            <div ref="categoryHeaders" class="flex items-center space-x-3">
              <UIcon name="i-lucide-database" class="w-6 h-6 text-purple-500" />
              <h3 class="text-2xl font-bold text-default">Database</h3>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <div
                v-for="tech in databases"
                :key="tech.name"
                ref="techCards"
                class="group relative bg-background rounded-xl p-6 border border-muted transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-highlighted/30"
              >
                <div class="flex flex-col items-center space-y-3">
                  <UIcon
                    :name="tech.icon"
                    class="w-12 h-12 text-default"
                    :alt="`${tech.name} icon`"
                  />
                  <h4 class="font-semibold text-default">{{ tech.name }}</h4>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-8">
            <div ref="categoryHeaders" class="flex items-center space-x-3">
              <UIcon name="i-lucide-wrench" class="w-6 h-6 text-orange-500" />
              <h3 class="text-2xl font-bold text-default">Tools</h3>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <div
                v-for="tech in tools"
                :key="tech.name"
                ref="techCards"
                class="group relative bg-background rounded-xl p-6 border border-muted transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-highlighted/30"
              >
                <div class="flex flex-col items-center space-y-3">
                  <UIcon
                    :name="tech.icon"
                    class="w-12 h-12 text-default"
                    :alt="`${tech.name} icon`"
                  />
                  <h4 class="font-semibold text-default">{{ tech.name }}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

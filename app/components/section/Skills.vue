<script setup lang="ts">
const { gsap, ScrollTrigger } = useGSAP();

const { width } = useWindowSize();
const isMobile = computed(() => width.value < 768);

const animateOnScroll = (element: HTMLElement, animation = {}) => {
  // Set initial state
  gsap.set(element, {
    opacity: 0,
    y: 50,
  });

  gsap.to(element, {
    opacity: 1,
    y: 0,
    duration: 1,
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
    ...animation,
  });
};

// Inline animateStaggerOnScroll function
const animateStaggerOnScroll = (elements: HTMLElement[], animation = {}) => {
  if (isMobile.value) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              elements,
              { opacity: 0, y: 50 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                ...animation,
              },
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    if (elements.length > 0) {
      observer.observe(elements[0]!);
    }
  } else {
    gsap.fromTo(
      elements,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: elements[0],
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        ...animation,
      },
    );
  }
};

const skillsSection = useTemplateRef("skillsSection");
const categoryName = useTemplateRef("categoryName");
const techCards = useTemplateRef("techCards");

const categories = [
  {
    name: "Frontend",
    techs: [
      { name: "Vue.js", icon: "i-simple-icons-vuedotjs", color: "#4FC08D" },
      { name: "Nuxt.js", icon: "i-simple-icons-nuxtdotjs", color: "#00DC82" },
      { name: "React", icon: "i-simple-icons-react", color: "#61DAFB" },
      { name: "Next.js", icon: "i-simple-icons-nextdotjs", color: "#000000" },
      {
        name: "TypeScript",
        icon: "i-simple-icons-typescript",
        color: "#3178C6",
      },
      {
        name: "Tailwind CSS",
        icon: "i-simple-icons-tailwindcss",
        color: "#06B6D4",
      },
      { name: "GSAP", icon: "i-simple-icons-gsap", color: "#0AE448" },
    ],
  },
  {
    name: "Backend",
    techs: [
      {
        name: "Spring Boot",
        icon: "i-simple-icons-springboot",
        color: "#6DB33F",
      },
      { name: "Express", icon: "i-simple-icons-express", color: "#000000" },
      { name: "NestJS", icon: "i-simple-icons-nestjs", color: "#E0234E" },
      { name: "FastAPI", icon: "i-simple-icons-fastapi", color: "#009688" },
    ],
  },
  {
    name: "Database",
    techs: [
      {
        name: "PostgreSQL",
        icon: "i-simple-icons-postgresql",
        color: "#4169E1",
      },
      { name: "MongoDB", icon: "i-simple-icons-mongodb", color: "#47A248" },
    ],
  },
  {
    name: "Tools",
    techs: [
      { name: "Docker", icon: "i-simple-icons-docker", color: "#2496ED" },
      { name: "Vite", icon: "i-simple-icons-vite", color: "#646CFF" },
      { name: "Git", icon: "i-simple-icons-git", color: "#F05032" },
      { name: "GitHub", icon: "i-simple-icons-github", color: "#181717" },
      { name: "GitLab", icon: "i-simple-icons-gitlab", color: "#FC6D26" },
      { name: "Vercel", icon: "i-simple-icons-vercel", color: "#000000" },
      { name: "Render", icon: "i-simple-icons-render", color: "#000000" },
      { name: "Directus", icon: "i-simple-icons-directus", color: "#263238" },
    ],
  },
];

onMounted(() => {
  const h2Element = skillsSection.value?.querySelector("h2");
  if (h2Element) {
    gsap.set(h2Element, {
      opacity: 0,
      y: 50,
    });
  }

  const pElement = skillsSection.value?.querySelector("p");
  if (pElement) {
    gsap.set(pElement, {
      opacity: 0,
      y: 30,
    });
  }

  gsap.set(categoryName.value, {
    opacity: 0,
    y: 40,
  });

  gsap.set(techCards.value, {
    opacity: 0,
    y: 60,
    scale: 0.9,
  });

  const titleElement = skillsSection.value?.querySelector("h2");
  if (titleElement) {
    animateOnScroll(titleElement, {
      delay: 0.2,
      duration: 0.8,
      ease: "power3.out",
    });
  }

  const subtitleElement = skillsSection.value?.querySelector("p");
  if (subtitleElement) {
    animateOnScroll(subtitleElement, {
      delay: 0.4,
      duration: 0.8,
      ease: "power3.out",
    });
  }

  if (categoryName.value && categoryName.value.length > 0) {
    animateStaggerOnScroll(categoryName.value, {
      delay: 0.6,
      stagger: 0.15,
      duration: 0.6,
      ease: "power2.out",
    });
  }

  if (techCards.value && techCards.value.length > 0) {
    gsap.fromTo(
      techCards.value,
      {
        opacity: 0,
        y: 60,
        scale: 0.9,
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
      },
    );
  }
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
});
</script>

<template>
  <section id="skills" ref="skillsSection" class="py-20">
    <div class="text-center mb-16">
      <h2 class="text-4xl md:text-5xl font-bold text-default mb-4">
        Tech <span class="text-highlighted">Stack</span>
      </h2>
      <p class="text-xl text-toned max-w-2xl mx-auto">
        Technologies I love working with
      </p>
    </div>

    <div class="space-y-16">
      <div
        v-for="category in categories"
        :key="category.name"
        class="space-y-8"
      >
        <h3 ref="categoryName" class="text-2xl font-bold text-default">
          {{ category.name }}
        </h3>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="tech in category.techs"
            :key="tech.name"
            ref="techCards"
            class="group relative rounded-xl p-6 border border-muted transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-highlighted/30"
          >
            <div class="flex flex-col items-center space-y-3">
              <UIcon
                :name="tech.icon"
                class="w-12 h-12"
                :alt="`${tech.name} icon`"
                :style="{
                  color: $colorMode.preference === 'light' ? tech.color : '',
                }"
              />
              <h4 class="font-semibold text-default">
                {{ tech.name }}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const sectionTitle = useTemplateRef("sectionTitle");
const sectionSubtitle = useTemplateRef("sectionSubtitle");
const categoryTitles = useTemplateRef("categoryTitles");
const techCards = useTemplateRef("techCards");

const expandedCard = ref<string | null>(null);

const colorMode = useColorMode();
const isLight = computed(() => colorMode.preference === "light");

const skillsData = computed(() => [
  {
    name: "Frontend",
    techs: [
      {
        name: "Vue.js",
        icon: "i-simple-icons-vuedotjs",
        color: "#4FC08D",
        description:
          "Building reactive user interfaces with Vue 3 Composition API, reactive state management, and component architecture",
        projects: [
          "Portfolio 2025 - Personal portfolio with GSAP animations",
          "The Angkor Times - News platform with Vue 3 Composition API",
          "Asset Management - Admin dashboard with TypeScript",
          "Chongkran - Recipe web app with authentication system",
        ],
      },
      {
        name: "Nuxt.js",
        icon: "i-simple-icons-nuxtdotjs",
        color: "#00DC82",
        description:
          "Server-side rendering, static site generation, and full-stack Vue applications with SEO optimization",
        projects: [
          "Portfolio 2025 - Modern portfolio with Nuxt 4 and Nuxt UI",
          "The Angkor Times - News website with SSR pagination and Directus",
          "Asset Management - Frontend with TypeScript and Pinia",
          "Chongkran - Full-stack recipe platform with Nuxt 3",
          "Flutter Docs - Documentation site with Nuxt Content",
          "Nuxt Boilerplate - Production-ready starter template",
        ],
      },
      {
        name: "React",
        icon: "i-simple-icons-react",
        color: "#61DAFB",
        description:
          "Component-based architecture with modern hooks, state management, and performance optimization",
        projects: [
          "Movie Website - Movie discovery app with TypeScript and Vite",
        ],
      },
      {
        name: "TypeScript",
        icon: "i-simple-icons-typescript",
        color: "#3178C6",
        description:
          "Type-safe JavaScript development with advanced type patterns, interfaces, and generic programming",
        projects: [
          "Asset Management - Type-safe frontend with Nuxt 3",
          "Movie Website - TypeScript React application",
          "Nuxt Boilerplate - Pre-configured TypeScript setup",
        ],
      },
      {
        name: "Tailwind CSS",
        icon: "i-simple-icons-tailwindcss",
        color: "#06B6D4",
        description:
          "Utility-first CSS framework with responsive design, custom animations, and component systems",
        projects: [
          "Portfolio 2025 - Custom animations and responsive design",
          "The Angkor Times - News platform with Nuxt UI integration",
          "Asset Management - Admin interface with Tailwind",
          "Chongkran - Recipe app with custom components",
          "Movie Website - Modern UI with Tailwind",
          "Flutter Docs - Documentation site styling",
        ],
      },
      {
        name: "GSAP",
        icon: "i-simple-icons-gsap",
        color: "#0AE448",
        description:
          "High-performance animation library with timeline control, scroll-based animations, and 3D transforms",
        projects: [
          "Portfolio 2025 - Scroll-triggered animations and interactions",
        ],
      },
    ],
  },
  {
    name: "Backend",
    techs: [
      {
        name: "Spring Boot",
        icon: "i-simple-icons-springboot",
        color: "#6DB33F",
        description:
          "Java framework for building REST APIs, microservices, and enterprise applications with Spring Security",
        projects: [
          "Asset Management - REST API backend with PostgreSQL integration",
        ],
      },
      {
        name: "NestJS",
        icon: "i-simple-icons-nestjs",
        color: "#E0234E",
        description:
          "Progressive Node.js framework with TypeScript support, dependency injection, and modular architecture",
        projects: [
          "Chongkran - Recipe API with JWT authentication and meal planning",
        ],
      },
      {
        name: "Directus",
        icon: "i-simple-icons-directus",
        color: isLight.value ? "#263238" : "#FFFFFF",
        description:
          "Headless CMS with automatic API generation, extensible architecture, and real-time collaboration",
        projects: [
          "The Angkor Times - Content management with author publishing and admin approval",
        ],
      },
    ],
  },
  {
    name: "Database",
    techs: [
      {
        name: "PostgreSQL",
        icon: "i-simple-icons-postgresql",
        color: "#4169E1",
        description:
          "Advanced relational database with complex queries, indexing strategies, and JSON support",
        projects: [
          "The Angkor Times - News content and user management",
          "Asset Management - Asset tracking and user roles",
        ],
      },
      {
        name: "Microsoft SQL Server",
        icon: "i-simple-icons-microsoftsqlserver",
        color: "#CC2927",
        description:
          "Enterprise relational database with stored procedures, reporting, and business intelligence",
        projects: [
          "Mart Management System - Desktop app with stored procedures and reporting",
        ],
      },
      {
        name: "MongoDB",
        icon: "i-simple-icons-mongodb",
        color: "#47A248",
        description: "NoSQL, aggregation pipelines, schema design",
        projects: ["Chongkran - Recipe app deployment"],
      },
    ],
  },
  {
    name: "Tools",
    techs: [
      {
        name: "Vite",
        icon: "i-vscode-icons-file-type-vite",
        color: "#646CFF",
        description:
          "Next-generation build tool with instant hot module replacement and optimized production bundles",
        projects: [
          "Movie Website - React TypeScript application",
          "Nuxt Boilerplate - Optimized development setup",
        ],
      },
      {
        name: "Docker",
        icon: "i-simple-icons-docker",
        color: "#2496ED",
        description: "Containerization, Docker Compose, multi-stage builds",
        projects: ["Development environments", "Production deployments"],
      },
      {
        name: "Git",
        icon: "i-simple-icons-git",
        color: "#F05032",
        description:
          "Version control system with branching strategies, collaboration workflows, and automation",
        projects: [
          "Portfolio 2025 - Version control and deployment",
          "The Angkor Times - Multi-repo project management",
          "Asset Management - Frontend/backend coordination",
          "Chongkran - Full-stack project collaboration",
        ],
      },
      {
        name: "GitHub",
        icon: "i-simple-icons-github",
        color: isLight.value ? "#181717" : "#FFFFFF",
        description:
          "Code hosting platform with collaborative features, CI/CD automation, and project management",
        projects: [
          "All projects - Code hosting and version control",
          "Portfolio 2025 - Automated deployment via GitHub Actions",
          "Open source contributions and project documentation",
        ],
      },
      {
        name: "Vercel",
        icon: "i-simple-icons-vercel",
        color: isLight.value ? "#000000" : "#FFFFFF",
        description:
          "Serverless deployment platform with edge computing, analytics, and performance optimization",
        projects: [
          "Portfolio 2025 - Production deployment",
          "The Angkor Times - News platform hosting",
          "Asset Management - Frontend deployment",
          "Chongkran - Recipe app deployment",
          "Movie Website - React app deployment",
          "Flutter Docs - Documentation site hosting",
        ],
      },
    ],
  },
  {
    name: "Desktop",
    techs: [
      {
        name: "C#",
        icon: "i-vscode-icons-file-type-csharp2",
        color: "#239120",
        description:
          "Object-oriented programming language for building Windows applications and enterprise software",
        projects: [
          "Mart Management System - Desktop application with WinForms",
        ],
      },
      {
        name: ".NET Framework",
        icon: "i-simple-icons-dotnet",
        color: "#5C2D91",
        description:
          "Development platform for building Windows applications with comprehensive framework libraries",
        projects: ["Mart Management System - WinForms desktop application"],
      },
    ],
  },
]);

const toggleCardFlip = (techName: string) => {
  expandedCard.value = expandedCard.value === techName ? null : techName;
};

onMounted(() => {
  if (
    !sectionTitle.value ||
    !sectionSubtitle.value ||
    !categoryTitles.value ||
    !techCards.value
  ) {
    return;
  }

  gsap.from(sectionTitle.value, {
    opacity: 0,
    ease: "power2.out",
    scrollTrigger: {
      trigger: sectionTitle.value,
      end: "top 50%",
      scrub: true,
    },
  });

  gsap.from(sectionSubtitle.value, {
    opacity: 0,
    ease: "power2.out",
    scrollTrigger: {
      trigger: sectionSubtitle.value,
      end: "top 50%",
      scrub: true,
    },
  });

  categoryTitles.value.forEach((title) => {
    gsap.from(title, {
      opacity: 0,
      y: 30,
      ease: "power2.out",
      scrollTrigger: {
        trigger: title,
        start: "top 90%",
        end: "top 50%",
        scrub: true,
      },
    });
  });

  techCards.value.forEach((card) => {
    gsap.from(card, {
      scale: 0.9,
      rotationY: 15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        end: "top 50%",
        scrub: true,
      },
    });
  });
});

onBeforeUnmount(() => {
  ScrollTrigger.killAll();
});
</script>

<template>
  <section id="skills" ref="skillsSection" class="py-20 md:py-32">
    <div class="text-center mb-16">
      <h2
        ref="sectionTitle"
        class="text-4xl lg:text-5xl font-bold text-foreground mb-4"
      >
        Tech Stack
      </h2>
      <p
        ref="sectionSubtitle"
        class="text-lg text-muted-foreground max-w-2xl mx-auto"
      >
        Technologies I love working with, each mastered through real-world
        projects
      </p>
    </div>

    <div class="space-y-12">
      <div v-for="category in skillsData" :key="category.name">
        <h3
          ref="categoryTitles"
          class="text-2xl font-semibold text-foreground text-center mb-8"
        >
          {{ category.name }}
        </h3>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <div
            v-for="tech in category.techs"
            :key="tech.name"
            ref="techCards"
            class="relative w-full h-48 cursor-pointer"
            @click="toggleCardFlip(tech.name)"
          >
            <div
              class="absolute inset-0 w-full h-full transition-transform duration-700"
              :class="expandedCard === tech.name ? 'rotate-y-180' : ''"
              style="transform-style: preserve-3d"
            >
              <div class="absolute inset-0 w-full h-full backface-hidden">
                <UCard
                  class="h-full group transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  :ui="{
                    body: 'bg-muted/50 backdrop-blur-sm h-full flex flex-col items-center justify-center',
                  }"
                >
                  <ClientOnly>
                    <UIcon
                      :name="tech.icon"
                      class="w-12 h-12 transition-transform duration-300 group-hover:scale-110"
                      :style="{
                        color: tech.color,
                      }"
                    />
                  </ClientOnly>

                  <h4
                    class="mt-3 text-lg font-semibold text-foreground text-center"
                  >
                    {{ tech.name }}
                  </h4>
                </UCard>
              </div>

              <div
                class="absolute inset-0 w-full h-full rotate-y-180 backface-hidden"
              >
                <UCard
                  class="h-full overflow-y-auto"
                  :ui="{
                    body: 'backdrop-blur-sm p-4',
                  }"
                >
                  <div class="space-y-4">
                    <h4
                      class="text-lg font-semibold text-foreground text-center"
                    >
                      {{ tech.name }}
                    </h4>

                    <p class="text-sm text-muted-foreground leading-relaxed">
                      {{ tech.description }}
                    </p>

                    <div v-if="tech.projects && tech.projects.length > 0">
                      <h5 class="text-sm font-semibold text-foreground mb-2">
                        Featured in:
                      </h5>
                      <div class="flex flex-wrap gap-1">
                        <span
                          v-for="project in tech.projects"
                          :key="project"
                          class="px-2 py-1 bg-primary/10 text-primary dark:text-primary/80 rounded-md text-xs"
                        >
                          {{ project }}
                        </span>
                      </div>
                    </div>
                  </div>
                </UCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

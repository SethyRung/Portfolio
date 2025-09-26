<script setup lang="ts">
const { gsap, ScrollTrigger } = useGSAP();

type Project = {
  id: number;
  title: string;
  description: string;
  category: string;
  icon: string;
  techStack: string[];
  githubUrl: string;
  demoUrl: string;
};

const sectionRef = useTemplateRef("sectionRef");
const projectCardsContainerRef = useTemplateRef("projectCardsContainerRef");

onMounted(() => {
  if (sectionRef.value) {
    const header = sectionRef.value.querySelector("h2");
    const subtitle = sectionRef.value.querySelector("p");

    gsap.fromTo(
      header,
      { y: 80, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.value,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      },
    );

    gsap.fromTo(
      subtitle,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.value,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }

  if (projectCardsContainerRef.value) {
    const projectCards = Array.from(projectCardsContainerRef.value.children);

    gsap.set(projectCards, { opacity: 0, y: 60, scale: 0.95 });

    gsap.to(projectCards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      stagger: 0.15,
      delay: 0.4,
      ease: "power3.out",
      scrollTrigger: {
        trigger: projectCards[0],
        start: "top 85%",
        end: "bottom 60%",
        toggleActions: "play none none reverse",
      },
    });

    projectCards.forEach((card) => {
      if (!card) return;

      const mouseEnterHandler = () => {
        gsap.to(card, {
          y: -8,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const mouseLeaveHandler = () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      card.addEventListener("mouseenter", mouseEnterHandler);
      card.addEventListener("mouseleave", mouseLeaveHandler);
    });
  }
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
});

const projects: Project[] = [
  {
    id: 1,
    title: "Portfolio 2025",
    description:
      "My personal portfolio website built with Nuxt.js, showcasing my skills, projects, and experience as a full-stack developer.",
    category: "Web / Personal",
    icon: "i-lucide-laptop",
    techStack: [
      "Nuxt 3",
      "Vue 3",
      "Tailwind CSS",
      "Nuxt UI",
      "Inspira UI",
      "Vercel",
    ],
    githubUrl: "https://github.com/SethyRung/Portfolio",
    demoUrl: "https://sethyrung.vercel.app",
  },
  {
    id: 2,
    title: "The Angkor Times",
    description:
      "A modern news website powered by Nuxt.js and Directus. It supports author publishing, admin approval, dynamic navigation, and efficient SSR pagination.",
    category: "Web / News",
    icon: "i-lucide-newspaper",
    techStack: [
      "Nuxt 3",
      "Vue 3 (Composition API)",
      "Tailwind CSS",
      "Nuxt UI",
      "Nuxt Directus Module",
      "Directus",
      "PostgreSQL",
    ],
    githubUrl: "https://github.com/SethyRung/The-Angkor-Times",
    demoUrl: "https://the-angkor-times.vercel.app",
  },
  {
    id: 3,
    title: "Asset Management",
    description:
      "An asset management system with Nuxt.js frontend and Spring Boot backend. Supports managing assets, categories, and user roles with a clean admin interface.",
    category: "Web / Management",
    icon: "i-lucide-bar-chart-3",
    techStack: [
      "Nuxt 3",
      "Vue 3 (Composition API)",
      "TypeScript",
      "Tailwind CSS",
      "Pinia",
      "Spring Boot",
      "PostgreSQL",
    ],
    githubUrl: "https://github.com/SethyRung/Asset-Management-Frontend",
    demoUrl: "https://asset-management-sethyrung.vercel.app",
  },
  {
    id: 4,
    title: "Chongkran",
    description:
      "A recipe web app where users can browse, search, and manage recipes. Includes favorites, shopping list generation, meal planning, authentication, and admin approval.",
    category: "Web / Food",
    icon: "i-lucide-utensils",
    techStack: [
      "Nuxt 3 (Vue 3 + Vite)",
      "Pinia",
      "Tailwind CSS",
      "Nuxt UI",
      "NestJS (Backend)",
      "JWT Authentication",
    ],
    githubUrl: "https://github.com/SethyRung/Chongkran-Frontend",
    demoUrl: "https://chongkran.vercel.app/",
  },
  {
    id: 5,
    title: "Movie Website",
    description:
      "A movie discovery website built with React, TypeScript, and Vite. Provides an interface to explore movies, view details, and practice frontend development.",
    category: "Web / Entertainment",
    icon: "i-lucide-film",
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    githubUrl: "https://github.com/SethyRung/Movie-Website-React",
    demoUrl: "https://sethyrung-movie-react.vercel.app",
  },
  {
    id: 6,
    title: "Flutter Docs",
    description:
      "A beautifully crafted documentation website for Flutter. Provides a modern, developer-friendly UI and smooth editing workflow.",
    category: "Web / Documentation",
    icon: "i-lucide-book-open",
    techStack: ["Nuxt 3", "Nuxt Content", "Nuxt UI", "Tailwind CSS", "Vue 3"],
    githubUrl: "https://github.com/SethyRung/Flutter-Docs",
    demoUrl: "https://flutter-docs.vercel.app/",
  },
  {
    id: 7,
    title: "Mart Management System",
    description:
      "A desktop application for managing mart operations including products, customers, suppliers, sales, and inventory. Features reporting and database stored procedures for improved performance.",
    category: "Desktop / Management",
    icon: "i-lucide-store",
    techStack: ["C#", ".NET Framework / WinForms", "Microsoft SQL Server"],
    githubUrl: "https://github.com/SethyRung/Mart-Management-System",
    demoUrl: "",
  },
  {
    id: 8,
    title: "Nuxt Boilerplate",
    description:
      "A pre-configured Nuxt.js starter template designed to kickstart web development projects with TypeScript, modern styling, and essential development scripts.",
    category: "Web / Boilerplate",
    icon: "i-lucide-zap",
    techStack: [
      "Nuxt 3",
      "Vue 3",
      "TypeScript",
      "CSS / Tailwind (optional)",
      "ESLint",
      "Prettier",
    ],
    githubUrl: "https://github.com/SethyRung/Nuxt-Boilerplate",
    demoUrl: "",
  },
];
</script>

<template>
  <section id="projects" ref="sectionRef" class="py-20">
    <div class="text-center mb-20">
      <h2 class="text-4xl md:text-5xl font-bold text-default mb-4">
        My <span class="text-highlighted">Projects</span>
      </h2>
      <p class="text-lg text-toned max-w-2xl mx-auto leading-relaxed">
        A showcase of my recent work and contributions to various projects
      </p>
    </div>

    <div
      ref="projectCardsContainerRef"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <UCard
        v-for="project in projects"
        :key="project.id"
        :ui="{
          root: 'group flex flex-col',
          body: 'flex-1',
        }"
      >
        <template #header>
          <div class="flex items-start justify-between card-header">
            <div class="flex items-center space-x-3">
              <div
                class="w-12 h-12 rounded-lg bg-inverted flex items-center justify-center flex-shrink-0"
              >
                <UIcon :name="project.icon" class="size-6 text-inverted" />
              </div>
              <div>
                <UBadge :label="project.category" variant="soft" />
                <h3
                  class="text-lg font-bold text-default group-hover:text-primary transition-colors leading-tight"
                >
                  {{ project.title }}
                </h3>
              </div>
            </div>
          </div>
        </template>

        <template #default>
          <p class="text-toned text-sm mb-6 line-clamp-3 leading-relaxed">
            {{ project.description }}
          </p>

          <div class="flex flex-wrap gap-2 mb-6">
            <UBadge
              v-for="tech in project.techStack"
              :key="tech"
              :label="tech"
              color="neutral"
              variant="subtle"
            />
          </div>
        </template>

        <template #footer>
          <div class="flex items-center justify-between">
            <div class="flex space-x-2">
              <UButton
                :to="project.githubUrl"
                target="_blank"
                variant="ghost"
                size="sm"
                icon="i-lucide-github"
                color="neutral"
              />
              <UButton
                v-if="!!project.demoUrl"
                :to="project.demoUrl"
                target="_blank"
                variant="ghost"
                size="sm"
                icon="i-lucide-external-link"
                color="neutral"
              />
            </div>
          </div>
        </template>
      </UCard>
    </div>
  </section>
</template>

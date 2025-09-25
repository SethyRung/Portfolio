<script setup lang="ts">
import {
  animateText,
  animateStaggerOnScroll,
  animateOnScroll,
} from "~/lib/animations";

const { gsap, ScrollTrigger } = useGSAP();

const experienceItemsRef = useTemplateRef("experienceItemsRef");
const educationRef = useTemplateRef("educationRef");
const downloadCtaRef = useTemplateRef("downloadCtaRef");
const titleRef = useTemplateRef("titleRef");
const subtitleRef = useTemplateRef("subtitleRef");

const experience = [
  {
    id: 1,
    title: "Junior Frontend Developer",
    company: "InnoBlock Technology",
    period: "2025 – Present",
    description:
      "Contributing to the TTGreen Project, a sustainability and carbon management platform.",
    responsibilities: [
      "Developing frontend features using Vue 3 + TypeScript + Tailwind CSS v4",
      "Building reusable UI components (e.g., TTGreenButton, TTGreenPopover)",
      "Collaborating with designers and backend developers for smooth integration",
      "Enhancing user experience with modern UI practices and responsive design",
      "Working on sustainability-focused features for carbon management",
    ],
    technologies: ["Vue 3", "Nuxt.js", "Tailwind CSS"],
  },
  {
    id: 2,
    title: "Young Credit Bureau Program",
    company: "Credit Bureau Cambodia (CBC)",
    period: "2024 – 2025",
    description:
      "Contributed to various projects focusing on credit bureau systems and security.",
    responsibilities: [
      "Contributed to PE Agent migration using Nuxt.js + Spring Boot",
      "Developed Cross-Border Platform for Cambodia ↔ Korea credit reports",
      "Worked on CBC Mini App using Nuxt.js + AMK Mobile App",
      "Gained real-world experience in API integration and secure backend design",
    ],
    technologies: [
      "Vue 3",
      "Nuxt.js",
      "Tailwind CSS",
      "Spring Boot",
      "Fast API",
    ],
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "Personal Projects",
    period: "2024 – Present",
    description:
      "Developing various full-stack applications to showcase technical skills and creativity.",
    responsibilities: [
      "Portfolio Website: Nuxt.js + Tailwind v4 + GSAP, hosted on Vercel",
      "Recipe Web App: Nuxt.js + NestJS + MongoDB with authentication & recipe management",
      "News Website: Nuxt + Directus CMS with banners, ads, and dynamic navigation",
    ],
    technologies: ["Nuxt.js", "Next.js", "NestJS", "Spring Boot", "Directus"],
  },
];

const education = [
  {
    id: 1,
    degree: "Bachelor of Science in Computer Science",
    institution: "Royal University of Phnom Penh",
    period: "2019 - 2023",
    description:
      "Graduated with honors, specializing in software engineering and web technologies.",
  },
];

const downloadResume = () => {
  const link = document.createElement("a");
  link.href = "/files/resume.pdf";
  link.download = "sethy-rung-resume.pdf";
  link.click();
};

onMounted(() => {
  if (titleRef.value) {
    animateText(titleRef.value, "Resume", 0.3);
  }

  if (subtitleRef.value) {
    gsap.fromTo(
      subtitleRef.value,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.6,
        ease: "power2.out",
      },
    );
  }

  if (experienceItemsRef.value) {
    const items = Array.isArray(experienceItemsRef.value)
      ? experienceItemsRef.value
      : [experienceItemsRef.value];
    animateStaggerOnScroll(items, {
      delay: 0.8,
      duration: 0.6,
    });
  }

  if (educationRef.value) {
    animateOnScroll(educationRef.value, {
      delay: 1.2,
      duration: 0.8,
    });
  }

  if (downloadCtaRef.value) {
    gsap.fromTo(
      downloadCtaRef.value,
      {
        opacity: 0,
        scale: 0.9,
        y: 30,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        delay: 1.4,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: downloadCtaRef.value,
          start: "top 85%",
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
  <section
    id="resume"
    ref="sectionRef"
    class="py-20 bg-muted/10 relative overflow-hidden"
  >
    <div class="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-default mb-4">
            <span ref="titleRef" class="text-highlighted">Resume</span>
          </h2>
          <p ref="subtitleRef" class="text-xl text-toned max-w-2xl mx-auto">
            Download my resume or view my professional experience and education
          </p>
        </div>

        <div class="space-y-12">
          <div class="space-y-8">
            <div class="flex items-center space-x-3 mb-6">
              <h3 class="text-2xl font-bold text-default">
                Professional Experience
              </h3>
            </div>

            <div class="space-y-6">
              <div
                v-for="exp in experience"
                :key="exp.id"
                ref="experienceItemsRef"
                class="bg-background rounded-xl p-6 border border-muted hover:border-highlighted/30 transition-all duration-300 hover:shadow-lg"
              >
                <div
                  class="flex flex-col md:flex-row md:items-start md:justify-between mb-4"
                >
                  <div>
                    <h4 class="text-xl font-bold text-default mb-1">
                      {{ exp.title }}
                    </h4>
                    <p class="text-highlighted font-medium">
                      {{ exp.company }}
                    </p>
                  </div>
                  <div
                    class="flex items-center space-x-2 text-sm text-toned mt-2 md:mt-0"
                  >
                    <UIcon name="i-lucide-calendar" class="w-4 h-4" />
                    <span>{{ exp.period }}</span>
                  </div>
                </div>

                <p class="text-toned mb-4">{{ exp.description }}</p>

                <div class="space-y-2">
                  <h5 class="font-medium text-default">
                    Key Responsibilities:
                  </h5>
                  <ul class="space-y-1">
                    <li
                      v-for="responsibility in exp.responsibilities"
                      :key="responsibility"
                      class="flex items-start space-x-2 text-sm text-toned"
                    >
                      <div
                        class="w-1.5 h-1.5 bg-highlighted rounded-full mt-2 flex-shrink-0"
                      ></div>
                      <span>{{ responsibility }}</span>
                    </li>
                  </ul>
                </div>

                <div class="flex flex-wrap gap-2 mt-4">
                  <span
                    v-for="tech in exp.technologies"
                    :key="tech"
                    class="px-2 py-1 bg-muted/50 text-toned text-xs rounded-md"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-8">
            <div ref="educationRef" class="space-y-6">
              <div class="flex items-center space-x-3 mb-6">
                <h3 class="text-2xl font-bold text-default">Education</h3>
              </div>

              <div
                v-for="edu in education"
                :key="edu.id"
                class="rounded-xl p-6 border border-muted"
              >
                <h4 class="text-lg font-bold text-default mb-1">
                  {{ edu.degree }}
                </h4>
                <p class="text-highlighted font-medium mb-2">
                  {{ edu.institution }}
                </p>
                <div
                  class="flex items-center space-x-2 text-sm text-toned mb-3"
                >
                  <UIcon name="i-lucide-calendar" class="w-4 h-4" />
                  <span>{{ edu.period }}</span>
                </div>
                <p class="text-sm text-toned">{{ edu.description }}</p>
              </div>
            </div>

            <div
              ref="downloadCtaRef"
              class="group relative border border-muted rounded-2xl p-8 text-center transition-all duration-500 hover:border-gray-300 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] overflow-hidden"
            >
              <div class="relative z-10">
                <div
                  class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl mb-6 group-hover:border-blue-300 transition-all duration-300 group-hover:scale-105 shadow-sm"
                >
                  <UIcon
                    name="i-lucide-file-down"
                    class="w-10 h-10 text-blue-600 group-hover:text-blue-700 transition-colors"
                  />
                </div>

                <h3 class="text-2xl font-bold text-default mb-3 tracking-tight">
                  Download Resume
                </h3>

                <p
                  class="text-toned text-base mb-6 max-w-md mx-auto leading-relaxed"
                >
                  Access a detailed PDF version of my professional experience,
                  skills, and contact information.
                </p>

                <!-- Professional button -->
                <div class="inline-flex">
                  <UButton
                    label="Download PDF"
                    trailing-icon="i-lucide-download"
                    size="lg"
                    variant="solid"
                    class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 border-0"
                    @click="downloadResume"
                  />
                </div>

                <div
                  class="mt-6 flex items-center justify-center space-x-6 text-sm text-toned"
                >
                  <div class="flex items-center space-x-2">
                    <UIcon name="i-lucide-file-text" class="w-4 h-4" />
                    <span>PDF Format</span>
                  </div>
                  <div class="w-px h-4 bg-gray-300"></div>
                  <div class="flex items-center space-x-2">
                    <UIcon name="i-lucide-hard-drive" class="w-4 h-4" />
                    <span>~200 KB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

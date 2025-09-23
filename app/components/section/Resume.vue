<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = useTemplateRef("sectionRef");
const experienceItemsRef = ref<HTMLElement[]>([]);
const educationRef = useTemplateRef("educationRef");
const downloadCtaRef = useTemplateRef("downloadCtaRef");

const setExperienceItemRef = (el: HTMLElement) => {
  if (el) experienceItemsRef.value.push(el);
};

onMounted(() => {
  if (sectionRef.value) {
    const header = sectionRef.value.querySelector("h2");
    const subtitle = sectionRef.value.querySelector("p");

    gsap.fromTo(
      header,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
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
      { x: 50, opacity: 0 },
      {
        x: 0,
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

  experienceItemsRef.value.forEach((item, index) => {
    const isEven = index % 2 === 0;
    const startX = isEven ? -100 : 100;

    gsap.fromTo(
      item,
      {
        x: startX,
        opacity: 0,
        scale: 0.95,
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: index * 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      },
    );
  });

  if (educationRef.value) {
    gsap.fromTo(
      educationRef.value,
      {
        x: -80,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: educationRef.value,
          start: "top 85%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }

  if (downloadCtaRef.value) {
    gsap.fromTo(
      downloadCtaRef.value,
      {
        y: 50,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: 0.8,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: downloadCtaRef.value,
          start: "top 85%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
});
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
            <span class="text-highlighted">Resume</span>
          </h2>
          <p class="text-xl text-toned max-w-2xl mx-auto">
            Download my resume or view my professional experience and education
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div class="lg:col-span-2 space-y-8">
            <div class="flex items-center space-x-3 mb-6">
              <h3 class="text-2xl font-bold text-default">
                Professional Experience
              </h3>
            </div>

            <div class="space-y-6">
              <div
                v-for="exp in experience"
                :key="exp.id"
                :ref="setExperienceItemRef"
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
                class="bg-background rounded-xl p-6 border border-muted"
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
              class="bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <UIcon
                name="i-lucide-file-text"
                class="w-12 h-12 text-highlighted mx-auto mb-4"
              />
              <h4 class="text-lg font-bold text-default mb-2">
                Download Resume
              </h4>
              <p class="text-toned text-sm mb-4">
                Get a detailed PDF version of my resume
              </p>
              <UButton
                label="Download PDF"
                trailing-icon="i-lucide-download"
                size="lg"
                @click="downloadResume"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

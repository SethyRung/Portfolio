<script setup lang="ts">
const { gsap, ScrollTrigger } = useGSAP();

const experience = [
  {
    id: 1,
    position: "Junior Frontend Developer",
    company: "InnoBlock Technology",
    startDate: "2025-01-01",
    endDate: null,
    location: "Remote",
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
    website: "https://www.innoblocktech.com/",
  },
  {
    id: 2,
    position: "Young Credit Bureau Program",
    company: "Credit Bureau Cambodia (CBC)",
    startDate: "2023-11-01",
    endDate: "2024-12-31",
    location: "Phnom Penh, Cambodia",
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
    website: "https://www.creditbureau.com.kh/",
  },
  {
    id: 3,
    position: "Full Stack Developer",
    company: "Personal Projects",
    startDate: "2024-01-01",
    endDate: null,
    location: "Phnom Penh, Cambodia",
    description:
      "Developing various full-stack applications to showcase technical skills and creativity.",
    responsibilities: [
      "Portfolio Website: Nuxt.js + Tailwind v4 + GSAP, hosted on Vercel",
      "Recipe Web App: Nuxt.js + NestJS + MongoDB with authentication & recipe management",
      "News Website: Nuxt + Directus CMS with banners, ads, and dynamic navigation",
    ],
    technologies: ["Nuxt.js", "Next.js", "NestJS", "Spring Boot", "Directus"],
    website: null,
  },
];

const education = [
  {
    id: 1,
    degree: "Bachelor of Science in Computer Science",
    institution: "Royal University of Phnom Penh",
    period: "2019 - 2023",
    description:
      "Successfully completed the requirements for and was awarded the Bachelor of Science degree from the Royal University of Phnom Penh (RUPP).",
  },
];

const downloadResume = () => {
  const link = document.createElement("a");
  link.href = "/files/resume.pdf";
  link.download = "sethy-rung-resume.pdf";
  link.click();
};

const animateTimelineItems = () => {
  const items = document.querySelectorAll("[data-timeline-item]");

  items.forEach((item, index) => {
    gsap.fromTo(
      item,
      {
        opacity: 0,
        x: index % 2 === 0 ? -50 : 50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        delay: index * 0.1,
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    );
  });
};

const animateEducationSection = () => {
  const educationCard = document.querySelector("[data-education-card]");
  const educationHeader = document.querySelector("[data-education-header]");

  gsap.fromTo(
    educationHeader,
    {
      opacity: 0,
      y: -30,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.2,
      scrollTrigger: {
        trigger: educationHeader,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    },
  );

  gsap.fromTo(
    educationCard,
    {
      opacity: 0,
      scale: 0.9,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      delay: 0.4,
      scrollTrigger: {
        trigger: educationCard,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    },
  );
};

const animateResumeSection = () => {
  const resumeCard = document.querySelector("[data-resume-card]");
  const resumeHeader = document.querySelector("[data-resume-header]");

  gsap.fromTo(
    resumeHeader,
    {
      opacity: 0,
      y: -30,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.3,
      scrollTrigger: {
        trigger: resumeHeader,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    },
  );

  gsap.fromTo(
    resumeCard,
    {
      opacity: 0,
      scale: 0.9,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      delay: 0.5,
      scrollTrigger: {
        trigger: resumeCard,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    },
  );
};

onMounted(() => {
  animateTimelineItems();
  animateEducationSection();
  animateResumeSection();
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
});
</script>

<template>
  <section id="resume" class="py-20 bg-default dark:bg-dark-800">
    <div class="container mx-auto px-4">
      <div class="max-w-6xl mx-auto">
        <div class="mb-16">
          <h2 class="text-4xl font-bold text-center mb-4">
            Professional Experience
          </h2>
          <p
            class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-center"
          >
            My journey through the tech industry, building innovative solutions
          </p>

          <div class="relative mt-12">
            <div
              class="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-accented transform -translate-x-1/2"
            ></div>

            <div class="space-y-8 md:space-y-12">
              <div
                v-for="(exp, index) in experience"
                :key="exp.id"
                data-timeline-item
                class="relative"
              >
                <div
                  :class="[
                    'flex items-center',
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse',
                  ]"
                >
                  <div class="md:w-1/2 px-4">
                    <UCard
                      class="rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <div class="flex items-start justify-between mb-4">
                        <div>
                          <h3 class="text-xl font-semibold">
                            {{ exp.position }}
                          </h3>
                          <p class="text-green-500 font-medium">
                            {{ exp.company }}
                          </p>
                        </div>
                        <UButton
                          v-if="exp.website"
                          icon="i-lucide-external-link"
                          :to="exp.website"
                          target="_blank"
                          color="neutral"
                          variant="link"
                        />
                      </div>

                      <div
                        class="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-4"
                      >
                        <div class="flex items-center space-x-1">
                          <UIcon name="i-lucide-calendar" class="w-4 h-4" />
                          <span>
                            {{
                              new Date(exp.startDate).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                },
                              )
                            }}
                            -
                            {{
                              exp.endDate
                                ? new Date(exp.endDate).toLocaleDateString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "long",
                                    },
                                  )
                                : "Present"
                            }}
                          </span>
                        </div>
                        <div class="flex items-center space-x-1">
                          <UIcon name="i-lucide-map-pin" class="w-4 h-4" />
                          <span>{{ exp.location }}</span>
                        </div>
                      </div>

                      <p class="text-gray-700 dark:text-gray-300 mb-4">
                        {{ exp.description }}
                      </p>

                      <div
                        v-if="
                          exp.responsibilities &&
                          exp.responsibilities.length > 0
                        "
                        class="mb-4"
                      >
                        <h4
                          class="font-medium text-gray-900 dark:text-gray-100 mb-2"
                        >
                          Key Responsibilities:
                        </h4>
                        <ul class="space-y-1">
                          <li
                            v-for="responsibility in exp.responsibilities"
                            :key="responsibility"
                            class="flex items-start space-x-2 text-sm"
                          >
                            <div
                              class="w-1.5 h-1.5 bg-accent-600 rounded-full mt-2 flex-shrink-0"
                            ></div>
                            <span>{{ responsibility }}</span>
                          </li>
                        </ul>
                      </div>

                      <div class="flex flex-wrap gap-2">
                        <UBadge
                          v-for="tech in exp.technologies"
                          :key="tech"
                          :label="tech"
                          variant="subtle"
                        />
                      </div>
                    </UCard>
                  </div>

                  <div class="hidden md:flex md:w-1/2 justify-center relative">
                    <div
                      class="absolute top-1/2 left-0 right-0 h-0.5 bg-accented"
                    ></div>
                    <div
                      class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold z-10 shadow-lg"
                    >
                      {{ index + 1 }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-16">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="h-full flex flex-col">
              <div class="text-center mb-6" data-education-header>
                <h3
                  class="text-2xl font-bold flex items-center justify-center space-x-2 mb-4"
                >
                  <UIcon
                    name="i-lucide-graduation-cap"
                    class="w-6 h-6 text-accent-600"
                  />
                  <span>Education</span>
                </h3>
                <p class="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  Academic background and qualifications
                </p>
              </div>

              <div class="max-w-xl mx-auto h-full flex flex-col gap-4">
                <UCard
                  v-for="edu in education"
                  :key="edu.id"
                  data-education-card
                  :ui="{
                    root: 'flex-1 flex flex-col shadow-lg hover:shadow-xl transition-all duration-300',
                    header: 'flex justify-between',
                    body: 'flex-1',
                  }"
                >
                  <template #header>
                    <div>
                      <h4
                        class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1"
                      >
                        {{ edu.degree }}
                      </h4>
                      <p
                        class="text-accent-600 dark:text-accent-400 font-medium"
                      >
                        {{ edu.institution }}
                      </p>
                    </div>
                    <div
                      class="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400"
                    >
                      <UIcon name="i-lucide-calendar" class="w-4 h-4" />
                      <span>{{ edu.period }}</span>
                    </div>
                  </template>

                  <p
                    class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4"
                  >
                    {{ edu.description }}
                  </p>

                  <template #footer>
                    <div
                      class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400"
                    >
                      <UIcon
                        name="i-lucide-award"
                        class="w-4 h-4 text-accent-600"
                      />
                      <span>Graduated</span>
                    </div>
                  </template>
                </UCard>
              </div>
            </div>

            <div class="h-full flex flex-col">
              <div class="text-center mb-6" data-resume-header>
                <h3
                  class="text-2xl font-bold flex items-center justify-center space-x-2 mb-4"
                >
                  <UIcon
                    name="i-lucide-download"
                    class="w-6 h-6 text-accent-600"
                  />
                  <span>Get My Resume</span>
                </h3>
                <p class="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  Download a comprehensive PDF version
                </p>
              </div>

              <div class="max-w-xl mx-auto flex-grow">
                <UCard
                  data-resume-card
                  :ui="{
                    root: 'flex-1 flex flex-col shadow-lg hover:shadow-xl transition-all duration-300',
                    header: 'flex justify-between',
                    body: 'flex-1',
                  }"
                >
                  <template #header>
                    <div>
                      <h4
                        class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1"
                      >
                        Professional Resume
                      </h4>
                      <p
                        class="text-accent-600 dark:text-accent-400 font-medium"
                      >
                        Complete career overview
                      </p>
                    </div>
                    <div
                      class="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400"
                    >
                      <UIcon name="i-lucide-file-text" class="w-4 h-4" />
                      <span>PDF</span>
                    </div>
                  </template>

                  <p
                    class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4"
                  >
                    Comprehensive document detailing my professional experience,
                    technical skills, educational background, and notable
                    projects. Perfect for recruitment and partnership
                    opportunities.
                  </p>

                  <template #footer>
                    <div class="flex items-center justify-between">
                      <div
                        class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400"
                      >
                        <UIcon
                          name="i-lucide-download"
                          class="w-4 h-4 text-accent-600"
                        />
                        <span>~200 KB</span>
                      </div>
                      <UButton
                        label="Download"
                        trailing-icon="i-lucide-download"
                        size="xs"
                        @click="downloadResume"
                      />
                    </div>
                  </template>
                </UCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

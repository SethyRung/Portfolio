<template>
  <section class="w-full max-w-5xl px-4 md:px-12 lg:px-20 mx-auto">
    <h2 class="mb-3 font-bold text-4xl text-center">FAQ</h2>
    <p class="mb-8 italic text-center">Things I get asked a lot</p>
    <UTabs :items orientation="horizontal">
      <template #content="{ item }">
        <UAccordion
          trailing-icon="lucide:plus"
          :items="item.questions"
          :ui="{
            item: 'mb-2 group px-4 transform-gpu rounded-xl border border-gray-200 last:border-b transition duration-500 will-change-transform hover:bg-white/[0.075]',
            trailingIcon:
              'group-data-[state=closed]:rotate-0 group-data-[state=open]:rotate-135',
          }"
        />
      </template>
    </UTabs>
  </section>
</template>

<script lang="ts" setup>
const items = ref([
  {
    label: "Personal",
    questions: [
      {
        label: "What inspired you to become a developer?",
        content:
          "I've always been fascinated by how technology and creativity intersect to solve real-world problems. Growing up, I loved tinkering and experimenting with code, which eventually led me to pursue a career where I could build functional, user-friendly, and visually appealing solutions. It's the perfect blend of logic and imagination for me.",
      },
      {
        label: "What types of projects do you enjoy working on the most?",
        content:
          "I thrive on projects that challenge me to think outside the box—whether it's crafting a sleek web application, designing an intuitive user interface, or solving complex functionality issues.",
      },
      {
        label: "How do you approach a new project?",
        content:
          "I start by understanding the goals and needs of the project—whether it's from a client brief or my own vision. Then, I sketch out ideas, research best practices, and plan the architecture or design. I like to iterate quickly, test often, and refine based on feedback to ensure the final product is both effective and polished.",
      },
      {
        label: "Can you work with a team or do you prefer solo projects?",
        content:
          "I'm comfortable with both! I've collaborated with designers, developers, and clients on team projects, valuing clear communication and shared goals. At the same time, I love the freedom of solo projects where I can take full ownership of the process from concept to completion.",
      },
      {
        label: "Are you open to remote work?",
        content:
          "Yes! I am fully comfortable working remotely and have experience collaborating with teams using tools like Microsoft Teams, ClickUp...",
      },
      {
        label: "What's your process for handling feedback or revisions?",
        content:
          "I welcome feedback as a chance to improve. I listen carefully to understand the perspective, ask clarifying questions if needed, and then implement changes thoughtfully. My goal is to align the final product with the vision while keeping the quality high.",
      },
      {
        label: "Do you design as well, or only develop?",
        content:
          "While I focus mainly on development, I do create clean and intuitive UI layouts using tools like Figma. For advanced design work, I usually collaborate with designers or use UI libraries to maintain consistency.",
      },
      {
        label: "What do you do in your free time?",
        content:
          "I enjoy coding personal projects, learning new technologies, and occasionally playing mobile and PC games to relax and stay sharp.",
      },
    ],
  },
  {
    label: "Service",
    questions: [
      {
        label: "Can you teach me how to make a website?",
        content:
          "I don't offer courses at the moment, but I can recommend resources and advice to help you get the most out of your learning.",
      },
      {
        label: "Do you work on both front-end and back-end development?",
        content:
          "Yes, I'm a full-stack developer, so I handle both! On the front-end, I craft responsive, user-friendly interfaces using frameworks like Vue, React or Nuxt.js. On the back-end, I build robust systems with tools like Nest.js, Spring Boot, and databases such as MongoDB or PostgreSQL. Whether it's designing what users see or powering what runs behind the scenes, I've got it covered.",
      },
    ],
  },
]);
</script>

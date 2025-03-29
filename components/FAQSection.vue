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
        label: "What do you enjoy most about this work?",
        content:
          "I love learning new things and being able to create just about anything from scratch, creating beautiful things that people will use and appreciate.",
      },
      {
        label: "Hobbies outside of work?",
        content:
          "I love what I do, so I usually spend a lot of time working on personal projects, photography, etc. I'm also a big sports fan. I often go to the gym and I recently started climbing!",
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
    ],
  },
]);
</script>

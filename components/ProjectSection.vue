<template>
  <section class="@container/project mt-16 px-4 md:px-12 lg:px-20">
    <h2 class="mb-3 font-bold text-4xl text-end">Projects</h2>
    <p class="mb-8 italic text-end">A list of projects I've worked on</p>
    <div
      class="mb-20 grid grid-cols-[repeat(auto-fit,_minmax(288px,_1fr))] md:grid-cols-[repeat(auto-fit,_minmax(360px,_1fr))] lg:grid-cols-[repeat(auto-fit,_minmax(420px,_1fr))] gap-4"
    >
      <ProjectCard
        v-for="project in projects"
        :key="project.id"
        :project="project"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import ProjectCard from "./Cards/ProjectCard.vue";

const { data: projects } = await useAsyncData(
  () => {
    return queryCollection("projects").all();
  },
  {
    transform: (projects) =>
      projects.map(({ id, title, meta, path }) => ({
        id,
        name: title,
        release: meta.release as string,
        image: meta.image as string,
        path,
      })),
  }
);
</script>

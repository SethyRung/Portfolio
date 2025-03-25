<template>
  <article
    v-if="page"
    class="nuxt-content max-w-screen py-10 px-4 md:px-12 lg:px-20 overflow-x-auto"
  >
    <UBadge
      :label="page.meta.release as string"
      variant="subtle"
      class="mb-4"
    />
    <h1>{{ page.title }}</h1>
    <p>{{ page.description }}</p>
    <NuxtImg :src="page.meta.image as string" />
    <hr />
    <ContentRenderer :value="page" />
  </article>
</template>

<script lang="ts" setup>
const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("projects").path(route.path).first();
});

if (!page.value)
  throw createError({
    statusCode: 404,
    fatal: true,
  });
</script>

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
    <div class="mb-4 flex justify-between items-center gap-4 flex-wrap">
      <h1 class="!mb-0">{{ page.title }}</h1>
      <UButton
        v-if="page.meta.url"
        :to="page.meta.url as string"
        variant="subtle"
        size="xs"
        color="warning"
      >
        Explore Now
      </UButton>
    </div>
    <p>{{ page.description }}</p>

    <NuxtImg :src="page.meta.image as string" class="my-8" />
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

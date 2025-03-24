<template>
  <article v-if="page" class="nuxt-content py-10 px-4 md:px-12 lg:px-20">
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

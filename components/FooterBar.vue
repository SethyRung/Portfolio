<template>
  <footer class="px-4 md:px-12 lg:px-20 mb-16 pb-6 flex flex-col gap-4">
    <div class="linebreak"></div>
    <p class="text-center">
      © 2025,
      <NuxtLink to="/" class="font-bold hover:underline">
        <span class="text-primary-500">Sethy</span> Rung
      </NuxtLink>
      - All rights reserved.
    </p>
  </footer>
</template>

<script lang="ts" setup></script>
<style scoped>
.linebreak {
  position: relative;
  left: 0;
  top: 0;
  right: 0;
  bottom: auto;
  width: 100%;
  height: 1px;
  margin: 0 auto;
  background-image: linear-gradient(
    96.18deg,
    rgba(50, 50, 50, 0) 10%,
    rgba(100, 100, 100, 0.24) 50%,
    rgba(50, 50, 50, 0) 90%
  );
}
</style>

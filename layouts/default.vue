<template>
  <div class="text-neutral-950 font-public-sans">
    <HeaderBar />
    <main>
      <slot></slot>
    </main>
  </div>
</template>
<script lang="ts" setup>
import HeaderBar from "~/components/HeaderBar.vue";
</script>

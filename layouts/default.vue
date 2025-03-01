<template>
  <div
    class="w-screen min-h-screen max-h-screen overflow-x-hidden overflow-y-auto relative text-neutral-950 font-public-sans"
  >
    <HeaderBar />
    <main>
      <slot></slot>
    </main>
  </div>
</template>
<script lang="ts" setup>
import HeaderBar from "~/components/HeaderBar.vue";
</script>

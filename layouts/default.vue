<template>
  <div class="text-neutral-950 font-public-sans">
    <HeaderBar />
    <main>
      <slot></slot>
    </main>
    <FooterBar />
  </div>
</template>
<script lang="ts" setup>
import HeaderBar from "~/components/HeaderBar.vue";
import FooterBar from "~/components/FooterBar.vue";
</script>

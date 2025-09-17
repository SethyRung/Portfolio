<template>
  <div class="space-y-8 py-16">
    <HeroSection />
    <SkillSection />
    <ProjectSection />
    <FAQSection />
  </div>
</template>
<script setup lang="ts">
import HeroSection from "~/components/HeroSection.vue";
import SkillSection from "~/components/SkillSection.vue";
import ProjectSection from "~/components/ProjectSection.vue";
import FAQSection from "~/components/FAQSection.vue";
</script>

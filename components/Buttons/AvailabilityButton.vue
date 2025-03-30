<template>
  <div
    class="px-2.5 py-1.5 flex items-center gap-1.5 rounded-full transition-colors text-sm text-red-500 ring ring-inset ring-red-500/25 bg-red-500/10 hover:bg-red-500/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
  >
    <span class="relative flex size-3">
      <span
        class="absolute inline-flex size-full animate-ping rounded-full opacity-75"
        :class="currentAvailability!.color"
      ></span>
      <span
        class="relative inline-flex size-3 scale-90 rounded-full"
        :class="currentAvailability!.bgColor"
      ></span>
    </span>
    <span
      class="ml-2 text-sm font-medium"
      :class="currentAvailability!.textColor"
    >
      {{ currentAvailability!.message }}
    </span>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();

const currentAvailability = computed(() => {
  return [
    {
      status: "available",
      message: "Available for hire",
      color: "bg-green-600/80",
      bgColor: "bg-green-500/80",
      textColor: "text-green-500/80",
    },
    {
      status: "unavailable",
      message: "Not available for hire",
      color: "bg-red-500",
      bgColor: "bg-red-400",
      textColor: "text-red-400",
    },
  ][config.public.available ? 0 : 1];
});
</script>

<script setup lang="ts">
const dots = ref([
  { x: 10, y: 15, size: 2 },
  { x: 25, y: 30, size: 1.5 },
  { x: 40, y: 20, size: 2.5 },
  { x: 60, y: 35, size: 1.8 },
  { x: 75, y: 25, size: 2.2 },
  { x: 85, y: 45, size: 1.6 },
  { x: 15, y: 50, size: 2.8 },
  { x: 35, y: 65, size: 1.4 },
  { x: 55, y: 70, size: 2.1 },
  { x: 70, y: 80, size: 1.9 },
  { x: 20, y: 85, size: 2.3 },
  { x: 45, y: 90, size: 1.7 },
  { x: 80, y: 60, size: 2.6 },
  { x: 30, y: 40, size: 1.5 },
  { x: 65, y: 55, size: 2.0 },
  { x: 90, y: 75, size: 1.8 },
  { x: 12, y: 70, size: 2.4 },
  { x: 48, y: 45, size: 1.6 },
  { x: 78, y: 85, size: 2.2 },
  { x: 58, y: 25, size: 1.9 },
]);
</script>

<template>
  <svg
    className="absolute pointer-events-none"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    {dots.map((dot, i) => (
    <circle
      key="{i}"
      cx="{dot.x}"
      cy="{dot.y}"
      r="{dot.size}"
      fill="currentColor"
      className="text-toned opacity-20 dark:opacity-30"
    />
    ))}
  </svg>
</template>

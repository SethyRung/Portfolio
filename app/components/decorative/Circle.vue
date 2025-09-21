<script setup lang="ts"></script>

<template>
  <svg
    className="absolute pointer-events-none"
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="100"
      cy="100"
      r="80"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className="text-muted opacity-30 dark:opacity-50"
    />
    <circle
      cx="100"
      cy="100"
      r="60"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.5"
      className="text-toned opacity-20 dark:opacity-30"
    />
    <circle
      cx="100"
      cy="100"
      r="40"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.5"
      className="text-default opacity-10 dark:opacity-20"
    />
  </svg>
</template>

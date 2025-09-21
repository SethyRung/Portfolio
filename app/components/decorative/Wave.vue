<script setup lang="ts"></script>

<template>
  <svg
    className="absolute pointer-events-none"
    viewBox="0 0 200 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0,50 Q50,20 100,50 T200,50 L200,100 L0,100 Z"
      fill="currentColor"
      className="text-accented opacity-5 dark:opacity-10"
    />
    <path
      d="M0,50 Q50,30 100,50 T200,50"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className="text-muted opacity-25 dark:opacity-40"
    />
  </svg>
</template>

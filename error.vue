<template>
  <section class="w-screen h-screen flex items-center justify-center bg-white">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-sm text-center">
        <h1
          class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-emerald-500"
        >
          {{ statusCode }}
        </h1>
        <p
          class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl"
        >
          {{ errorMessage }}
        </p>
        <p class="mb-4 text-lg font-light text-gray-500">
          {{ errorDescription }}
        </p>
        <button
          class="my-4 px-5 py-2.5 inline-flex text-white text-sm text-center bg-emerald-500 hover:bg-emerald-600 font-medium rounded-lg"
          @click="handleError"
        >
          Back to Homepage
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";

const { error } = defineProps({
  error: {
    type: Object as () => NuxtError,
    default: undefined,
  },
});

const statusCode = computed(() => (error?.statusCode === 404 ? 404 : 500));
const errorMessage = computed(() =>
  error?.statusCode === 404 ? "Not Found" : "Internal Server Error."
);
const errorDescription = computed(() =>
  error?.statusCode === 404
    ? "Whoops! That page doesn’t exist."
    : "We are already working to solve the problem."
);

const handleError = () => clearError({ redirect: "/" });
</script>

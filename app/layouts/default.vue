<script setup lang="ts"></script>

<template>
  <div class="bg-default font-geist relative">
    <AppHeader />
    <ScrollSmootherWrapper>
      <main>
        <slot></slot>
      </main>
      <AppFooter />
    </ScrollSmootherWrapper>
  </div>
</template>
